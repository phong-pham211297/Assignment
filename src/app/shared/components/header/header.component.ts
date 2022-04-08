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
      link: '/top',
      isActive: true,
    },
    {
      id: 2,
      title: 'New Games',
      link: '/new',
      isActive: false,
    },
    {
      id: 3,
      title: 'Slots',
      link: '/slots',
      isActive: false,
    },
    {
      id: 4,
      title: 'Jackpots',
      link: '/jackpots',
      isActive: false,
    },
    {
      id: 5,
      title: 'Live',
      link: '/live',
      isActive: false,
    },
    {
      id: 6,
      title: 'Blackjack',
      link: '/blackjack',
      isActive: false,
    },
    {
      id: 7,
      title: 'Roulette',
      link: '/roulette',
      isActive: false,
    },
    {
      id: 8,
      title: 'Table',
      link: '/table',
      isActive: false,
    },
    {
      id: 9,
      title: 'Poker',
      link: '/poker',
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
          link: '/ball',
          isActive: false,
        },
        {
          id: 12,
          title: 'Virtual',
          link: '/virtual',
          isActive: false,
        },
        {
          id: 13,
          title: 'Fun',
          link: '/fun',
          isActive: false,
        },
      ],
    },
  ];

  // Navbar expand state
  public isCollapsed = false;
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

    this.categories = this.changeActiveCategory(this.categories, id);

    return;
  }

  public changeActiveCategory(categories: Category[], id: number): Category[] {
    return categories.map((category: Category) => {
      category.isActive = category?.id === id;

      if (category.children && category.children.length) {
        category.children = this.changeActiveCategory(category?.children, id);
      }

      return category;
    });
  }

  public handleLinkClick(event: any, category: Category) {
    if (!category) {
      return;
    }

    if (category.children && category.children.length) {
      event.preventDefault();
    }

    return;
  }

  //#endregion
}
