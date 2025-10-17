import { Component, input, output } from '@angular/core';
import { Product } from '../../models/product';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-product-card',
  imports: [
    MatButton,
    MatIcon
  ],
  template: `
    <div class="bg-white cursor-pointer rounded-xl shadow-lg overflow-hidden flex flex-col h-full">
      <img class="w-full h-[300px] object-contain rounded-t-xl" [src]="product().image" [alt]="product().name"/>

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
  styles: ``
})
export class ProductCard {
  product = input.required<Product>();
  addToCartClicked = output<Product>()
}
