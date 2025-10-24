import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { WishlistStore } from './stores/wishlist-store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  template: `
    <app-header class="z-10 relative"/>
    <div class="h-[calc(100%-64px)] overflow-auto">
      <router-outlet/>
    </div>
  `,
  styles: [],
})
export class App implements OnInit {
  protected readonly title = signal('e-store-ng-20');

  private wishlistStore = inject(WishlistStore);

  ngOnInit() {
    this.wishlistStore.loadFromStorage();
  }
}
