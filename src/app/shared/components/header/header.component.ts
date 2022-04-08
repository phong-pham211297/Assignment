import { Category } from './../../models/category/index';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  //#region Props

  // MOCK: mock categories
  public categories: Category[] = [
    {
      id: 1,
      title: 'Top Games',
      link: 'top',
      isActive: true,
    },
    {
      id: 2,
      title: 'New Games',
      link: 'new',
      isActive: false,
    },
    {
      id: 3,
      title: 'Slots',
      link: 'slots',
      isActive: false,
    },
    {
      id: 4,
      title: 'Jackpots',
      link: 'jackpots',
      isActive: false,
    },
    {
      id: 5,
      title: 'Live',
      link: 'live',
      isActive: false,
    },
    {
      id: 6,
      title: 'Blackjack',
      link: 'blackjack',
      isActive: false,
    },
    {
      id: 7,
      title: 'Roulette',
      link: 'roulette',
      isActive: false,
    },
    {
      id: 8,
      title: 'Table',
      link: 'table',
      isActive: false,
    },
    {
      id: 10,
      title: 'Other',
      link: '',
      isActive: false,
      children: [
        {
          id: 11,
          title: 'Ball',
          link: 'ball',
          isActive: false,
        },
        {
          id: 12,
          title: 'Virtual',
          link: 'virtual',
          isActive: false,
        },
        {
          id: 13,
          title: 'Fun',
          link: 'fun',
          isActive: false,
        },
      ],
    },
    {
      id: 9,
      title: 'Poker',
      link: 'poker',
      isActive: false,
    },
  ];

  // Navbar expand state
  public isCollapsed = false;

  // Current category
  public currentCategory = '';

  // Page subscription
  private _subcription: Subscription = new Subscription();
  //#endregion

  //#region Constructor
  public constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {}

  //#endregion

  //#region Methods

  // Trigger when component inits
  public ngOnInit(): void {
    const getCurrentCategorySubscription =
      this.activatedRoute.queryParams.subscribe((params) => {
        this.currentCategory = params['category'];
      });

    this._subcription.add(getCurrentCategorySubscription);
  }

  public handleLinkClick(event: MouseEvent, category: Category) {
    if (!category) {
      return;
    }

    if (!category.children || !category.children.length) {
      this.router.navigate(['/'], {
        queryParams: { category: category?.link },
      });
    }

    if (category.children && category.children.length) {
      event.preventDefault();
    }

    return;
  }

  public ngOnDestroy(): void {
    if (this._subcription && !this._subcription.closed) {
      this._subcription.unsubscribe();
    }
  }
  //#endregion
}
