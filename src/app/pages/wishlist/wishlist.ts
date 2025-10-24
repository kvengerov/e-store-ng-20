import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCard } from '../../components/product-card/product-card';
import { WishlistStore } from '../../stores/wishlist-store';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardContent, MatCardActions } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [
    ProductCard,
    MatButton,
    MatIcon,
    MatCard,
    MatCardContent,
    MatCardActions,
    RouterLink,
  ],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-gray-900">My Wishlist</h1>
        <div class="flex items-center gap-4">
          <span class="text-lg text-gray-600">{{ wishlistCount() }} items</span>
          @if (!isEmpty()) {
            <button mat-button color="warn" (click)="clearWishlist()">
              <mat-icon>clear_all</mat-icon>
              Clear All
            </button>
          }
        </div>
      </div>

      @if (isEmpty()) {
        <mat-card class="text-center py-12">
          <mat-card-content>
            <mat-icon class="text-6xl text-gray-400 mb-4">favorite_border</mat-icon>
            <h2 class="text-2xl font-semibold text-gray-600 mb-2">Your wishlist is empty</h2>
            <p class="text-gray-500 mb-6">Start adding items you love to your wishlist!</p>
            <mat-card-actions class="justify-center">
              <button mat-raised-button color="primary" routerLink="/products">
                <mat-icon>shopping_bag</mat-icon>
                Browse Products
              </button>
            </mat-card-actions>
          </mat-card-content>
        </mat-card>
      } @else {
        <div class="responsive-grid">
          @for (product of wishlistItems(); track product.id) {
            <app-product-card
              [product]="product"
              (addToCartClicked)="addToCart($event)"
            />
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .responsive-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }
  `]
})
export default class WishlistPage implements OnInit {
  private wishlistStore = inject(WishlistStore);

  wishlistItems = this.wishlistStore.items;
  wishlistCount = this.wishlistStore.count;
  isEmpty = this.wishlistStore.isEmpty;

  ngOnInit() {
    this.wishlistStore.loadFromStorage();
  }

  addToCart(product: Product): void {
    console.log('Add to cart:', product);
  }

  clearWishlist(): void {
    this.wishlistStore.clearWishlist();
    this.wishlistStore.saveToStorage();
  }
}
