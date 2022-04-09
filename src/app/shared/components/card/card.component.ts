import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../models/game';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  //#region Properties

  // Input game information
  @Input() game!: Game;

  // Is focus state
  public isFocused: boolean = false;

  //#endregion

  //#region Constructor
  public constructor() {}

  //#endregion

  //#region Methods
  public ngOnInit(): void {}

  public onMouseEnter(): void {
    this.isFocused = true;
  }

  public onMouseLeave(): void {
    this.isFocused = false;
  }
  //#endregion
}
