import { Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
import { RouterLink } from '@angular/router';
import { WishlistStore } from '../../stores/wishlist-store';

@Component({
  selector: 'app-header-actions',
  imports: [
    MatButton,
    MatIconButton,
    MatIcon,
    MatBadge,
    RouterLink,
  ],
  template: `
    <div class="flex items-center gap-2">
      @if (wishlistCount() > 0) {
        <button
          matIconButton
          routerLink="/wishlist"
          [matBadge]="wishlistCount()"
          matBadgeColor="warn"
          matBadgeSize="small"
        >
          <mat-icon>favorite</mat-icon>
        </button>
      } @else {
        <button
          matIconButton
          routerLink="/wishlist"
        >
          <mat-icon>favorite</mat-icon>
        </button>
      }
      <button matIconButton>
        <mat-icon>shopping_cart</mat-icon>
      </button>
      <button matButton>
        Sing In
      </button>
      <button matButton="filled">
        Sign Up
      </button>
    </div>
  `,
  styles: ``
})
export class HeaderActions {
  private wishlistStore = inject(WishlistStore);

  wishlistCount = this.wishlistStore.count;
}
