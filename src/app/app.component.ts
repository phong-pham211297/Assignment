import { Subscription } from 'rxjs';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  //#region Properties
  public title = 'assignment';

  // Page subscription
  private _subcription: Subscription = new Subscription();
  //#endregion

  //#region Methods
  public constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {}

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {}

  public ngOnDestroy(): void {
    if (this._subcription && !this._subcription.closed) {
      this._subcription.unsubscribe();
    }
  }
  //#endregion
}
