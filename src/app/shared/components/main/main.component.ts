import { GetDataService } from './../../services/get-data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  map,
  mergeMap,
  Subscription,
  tap,
  forkJoin,
  filter,
  Subject,
} from 'rxjs';
import { Game } from '../../models/game';
import { ActivatedRoute, Router } from '@angular/router';
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

  // Plus jackpot
  public plusJackpot: number = 0;

  // GetList Subject
  public getListSubject: Subject<any> = new Subject();

  // GetList observable
  public getListObservable = this.getListSubject.asObservable();
  //#endregion

  //#region Methods
  public constructor(
    public getDataService: GetDataService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {}

  public ngOnInit(): void {
    const topNew = ['top', 'new'];

    const getListSubscription = this.getListObservable
      .pipe(
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

            const matchedCategory = topNew
              .filter((item) => game?.categories.includes(item))
              .filter((item) => item !== this.currentCategory);

            if (matchedCategory && matchedCategory?.length) {
              game.ribbon = matchedCategory.toString().toUpperCase();
            }

            if (!jackpotMatched) {
              return {
                ...game,
              } as Game;
            }

            return {
              ...game,
              jackpot: (jackpotMatched?.amount || 0) + this.plusJackpot,
            } as Game;
          });

          return listGameCustom.filter((game: any) => {
            if (!this.currentCategory) {
              return true;
            }

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
        this.games = games;
      });

    const getCurrentCategorySubscription = this.activatedRoute.queryParams
      .pipe(
        tap((params) => {
          if (!params) {
            this.currentCategory = '';
          } else {
            this.currentCategory = params['category'];
          }
        })
      )
      .subscribe(() => {
        this.getListSubject.next(0);
      });

    this.increseJackpotInterval();
    this._subcription.add(getCurrentCategorySubscription);
    this._subcription.add(getListSubscription);
  }

  public increseJackpotInterval(): void {
    setInterval(() => {
      const increaseNumber = Math.floor(Math.random() * 100);
      this.plusJackpot += increaseNumber;

      this.getListSubject.next(1);
    }, 3000);

    return;
  }

  public ngOnDestroy(): void {
    if (this._subcription && !this._subcription.closed) {
      this._subcription.unsubscribe();
    }
  }
  //#endregion
}
