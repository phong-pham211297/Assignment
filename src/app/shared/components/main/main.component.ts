import { GetDataService } from './../../services/get-data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, mergeMap, Subscription } from 'rxjs';
import { forkJoin } from 'rxjs';
import { Game } from '../../models/game';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  //#region Properties

  // Page subscription
  private _subcription: Subscription = new Subscription();
  //#endregion

  //#region Methods
  public constructor(public getDataService: GetDataService) {}

  public ngOnInit(): void {
    const getGameDataSubcription = forkJoin([
      this.getDataService.getListGame(),
      this.getDataService.getListJackpot(),
    ])
      .pipe(
        map(([listGame, listJackpot]) => {
          return listGame.map((game: Game) => {
            const jackpotMatched = listJackpot.find(
              (jackpot) => jackpot?.game === game?.id
            );

            console.log(jackpotMatched);
            return { ...game, jackpot: jackpotMatched?.amount };
          });
        })
      )
      .subscribe((data) => console.log(data));

    this._subcription.add(getGameDataSubcription);
  }

  public ngOnDestroy(): void {
    if (this._subcription && !this._subcription.closed) {
      this._subcription.unsubscribe();
    }
  }
  //#endregion
}
