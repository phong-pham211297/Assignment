import { GetDataService } from './../../services/get-data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, mergeMap, Subscription, tap, forkJoin, filter } from 'rxjs';
import { Game } from '../../models/game';
import { ActivatedRoute } from '@angular/router';
import { Jackpot } from '../../models/jackpot';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  //#region Properties

  // Games data
  public games: Game[] = [];

  // Page subscription
  private _subcription: Subscription = new Subscription();

  // Current category
  public currentCategory: string = '';
  //#endregion

  //#region Methods
  public constructor(
    public getDataService: GetDataService,
    public activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    const getCurrentCategorySubscription = this.activatedRoute.queryParams
      .pipe(
        tap((params) => {
          this.currentCategory = params['category'];
        }),
        mergeMap(() => {
          return forkJoin([
            this.getDataService.getListGame(),
            this.getDataService.getListJackpot(),
          ]);
        }),
        map(([listGame, listJackpot]) => {
          const listGameCustom = listGame.map((game: Game) => {
            const jackpotMatched = listJackpot.find(
              (jackpot: Jackpot) => jackpot?.game === game?.id
            );

            return { ...game, jackpot: jackpotMatched?.amount } as Game;
          });

          return listGameCustom.filter((game: any) => {
            if (
              game.categories.find(
                (category: any) => category === this.currentCategory
              )
            ) {
              return true;
            }

            return false;
          }) as Game[];
        })
      )
      .subscribe((games: Game[]) => {
        console.log(games);
        this.games = games;
      });

    this._subcription.add(getCurrentCategorySubscription);
  }

  public ngOnDestroy(): void {
    if (this._subcription && !this._subcription.closed) {
      this._subcription.unsubscribe();
    }
  }
  //#endregion
}
