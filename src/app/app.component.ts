import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  //#region Properties
  public title = 'assignment';
  //#endregion

  //#region Methods
  public constructor() {}

  public ngOnInit(): void {}
  //#endregion
}
