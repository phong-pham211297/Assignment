import { Category } from './../../models/category/index';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  //#region Props

  // MOCK: mock categories
  public categories: Category[] = [
    {
      id: 1,
      title: 'Top Games',
      link: '',
      isActive: true,
    },
    {
      id: 2,
      title: 'New Games',
      link: '',
      isActive: false,
    },
    {
      id: 3,
      title: 'Slots',
      link: '',
      isActive: false,
    },
    {
      id: 4,
      title: 'Jackpots',
      link: '',
      isActive: false,
    },
    {
      id: 5,
      title: 'Live',
      link: '',
      isActive: false,
    },
    {
      id: 6,
      title: 'Blackjack',
      link: '',
      isActive: false,
    },
    {
      id: 7,
      title: 'Roulette',
      link: '',
      isActive: false,
    },
    {
      id: 8,
      title: 'Table',
      link: '',
      isActive: false,
    },
    {
      id: 9,
      title: 'Poker',
      link: '',
      isActive: false,
    },
    {
      id: 10,
      title: 'Other',
      link: '',
      isActive: false,
    },
  ];
  //#endregion

  //#region Constructor
  public constructor() {}

  //#endregion

  //#region Methods

  // Trigger when component inits
  public ngOnInit(): void {}

  // Trigger when link click
  public handleCategoryClick(id: number): void {
    if (!id) {
      return;
    }

    this.categories = this.categories.map((category: Category) => {
      category.isActive = category?.id === id;

      return category;
    });

    return;
  }

  //#endregion
}
