import { Jackpot } from './../models/jackpot/index';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  //#region Properties

  private HOST_NAME = 'http://localhost:4200/assets/json/';
  //#endregion

  //#region Methods
  public constructor(public http: HttpClient) {}

  // Get list game
  public getListGame(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.HOST_NAME}games/games.json`);
  }

  // Get list jackpot
  public getListJackpot(): Observable<Jackpot[]> {
    return this.http.get<Jackpot[]>(`${this.HOST_NAME}jackpots/jackpots.json`);
  }
  //#endregion
}
