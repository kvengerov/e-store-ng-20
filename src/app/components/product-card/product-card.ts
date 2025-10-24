import { Component, input, output, inject, computed } from '@angular/core';
import { Product } from '../../models/product';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { WishlistStore } from '../../stores/wishlist-store';

@Component({
  selector: 'app-product-card',
  imports: [
    MatButton,
    MatIcon,
    MatIconButton
  ],
  template: `
    <div class="bg-white cursor-pointer rounded-xl shadow-lg overflow-hidden flex flex-col h-full relative">
      <img class="w-full h-[300px] object-contain rounded-t-xl" [src]="product().image" [alt]="product().name"/>

      <button
        mat-icon-button
        class="wishlist-btn"
        (click)="toggleWishlist()"
        [attr.aria-label]="isInWishlist() ? 'Remove from wishlist' : 'Add to wishlist'"
      >
        <mat-icon [class.text-red-500]="isInWishlist()" [class.text-gray-500]="!isInWishlist()">
          {{ isInWishlist() ? 'favorite' : 'favorite_border' }}
        </mat-icon>
      </button>

      <div class="p-5 flex flex-col flex-1">
        <h3 class="text-lg font-semibold text-gray-900 mb-2 leading-tight">
          {{ product().name }}
        </h3>
        <p class="text-sm text-gray-600 mb-4 flex-1 leading-relaxed">
          {{ product().description }}
        </p>

        <div class="text-sm font-medium mb-4">
          {{ product().inStock ? 'In Stock' : 'OutStock' }}
        </div>

        <div class="flex item-center justify-between mt-auto">
          <span class="text-2xl font-bold text-gray-900">
            \${{ product().price }}
          </span>
          <button class="flex items-center gap-2" matButton="filled" (click)="addToCartClicked.emit(product())">
            <mat-icon>shopping_cart</mat-icon>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `,
  styles: `
    .wishlist-btn {
      position: absolute !important;
      top: 8px !important;
      right: 8px !important;
      background-color: rgba(255, 255, 255, 0.8) !important;
      border-radius: 50% !important;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
      transition: background-color 0.2s ease !important;
    }

    .wishlist-btn:hover {
      background-color: white !important;
    }

    .wishlist-btn .mat-icon {
      font-size: 20px !important;
      width: 20px !important;
      height: 20px !important;
    }

    .wishlist-btn .mat-icon.text-red-500 {
      color: #ef4444 !important;
    }

    .wishlist-btn .mat-icon.text-gray-500 {
      color: #6b7280 !important;
    }
  `
})
export class ProductCard {
  product = input.required<Product>();
  addToCartClicked = output<Product>();

  private wishlistStore = inject(WishlistStore);

  isInWishlist = computed(() =>
    this.wishlistStore.isInWishlist(this.product().id)
  );

  toggleWishlist() {
    this.wishlistStore.toggleWishlist(this.product());
  }
}
