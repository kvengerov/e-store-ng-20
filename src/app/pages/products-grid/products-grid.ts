import { Component, computed, inject, input, OnInit, effect } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCard } from '../../components/product-card/product-card';
import { CartService } from '../../services/cart-service';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatListItem, MatNavList } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { EcommerceStore } from '../../stores/ecommerce-store';
import { UIStore } from '../../stores/ui-store';

@Component({
  selector: 'app-products-grid',
  imports: [
    ProductCard,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    MatNavList,
    MatListItem,
    RouterLink,
    TitleCasePipe,
    RouterLinkActive,
  ],
  template: `
    <mat-sidenav-container class="h-full">
      <mat-sidenav [mode]="sidenavMode()" [opened]="sidenavOpened()" aria-label="Product categories">
        <div class="p-6">
          <h2 class="text-lg text-gray-900">Categories</h2>
          <mat-nav-list>
            @for (cat of categoriesVM(); track trackByCat($index, cat)) {
              <a mat-list-item
                 class="my-2"
                 routerLinkActive="active"
                 [routerLink]="['/products', cat.slug]"
                 [attr.aria-current]="isActive(cat.slug) ? 'page' : null"
              >
                <span matListItemTitle class="font-medium">
                  {{ cat.label | titlecase }}
                </span>
                @if (cat.count != null) {
                  <span matListItemMeta class="font-medium flex items-center">{{ cat.count }}</span>
                }
              </a>
            }
          </mat-nav-list>
        </div>
      </mat-sidenav>
      <mat-sidenav-content class="bg-gray-100 p-6">
        <h1 class="text-2xl font-bold text-gray-900">
          {{ category() | titlecase }}
        </h1>

        @if (store.loading()) {
          <p>Loading…</p>
        }
        @if (store.error()) {
          <p class="error">{{ store.error() }}</p>
        }

        @if (!store.loading() && !store.error()) {
          <p class="text-base text-gray-600 mb-6">
            {{ store.filteredProducts().length }} products found
          </p>
          <div class="responsive-grid">
            @for (product of store.filteredProducts(); track trackById(product)) {
              <app-product-card [product]="product" (addToCartClicked)="addToCart($event)"/>
            }
          </div>
        }
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: ``
})
export default class ProductsGrid implements OnInit {
  cartService = inject(CartService);
  store = inject(EcommerceStore);
  uiStore = inject(UIStore);

  category = input<string>('all');
  categories = this.store.categories;

  activeSlug = computed(() => (this.category() || 'all').toLowerCase());
  categoriesVM = computed(() =>
    this.categories().map(label => ({
      label,
      slug: label.toLowerCase(),
      count: this.getCountByCategory(label)
    }))
  );
  sidenavMode = this.uiStore.sidenavMode;
  sidenavOpened = this.uiStore.sidenavOpened;

  constructor() {
    effect(() => {
      this.store.setCategory(this.category());
    });
  }

  ngOnInit() {
    this.store.loadProducts();
  }

  addToCart(product: Product): void {
    this.cartService.add(product);
    console.log(this.cartService.items());
  }

  getCountByCategory(label: string): number {
    const slug = (label ?? '').toLowerCase();
    if (!slug || slug === 'all') return this.store.products().length;
    return this.store.products().filter(p => p.category.toLowerCase() === slug).length;
  }

  trackById = (p: Product) => p.id;
  trackByCat = (_: number, c: { slug: string }) => c.slug;
  isActive = (slug: string) => slug === this.activeSlug();
}
