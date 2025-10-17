import { Component, computed, inject, input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCard } from '../../components/product-card/product-card';
import { CartService } from '../../services/cart-service';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatListItem, MatNavList } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { ProductService } from '../../services/product-service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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

        @if (productService.loading()) {
          <p>Loading…</p>
        }
        @if (productService.error()) {
          <p class="error">{{ productService.error() }}</p>
        }

        @if (!productService.loading() && !productService.error()) {
          <p class="text-base text-gray-600 mb-6">
            {{ filteredProducts().length }} products found
          </p>
          <div class="responsive-grid">
            @for (product of filteredProducts(); track trackById(product)) {
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
  productService = inject(ProductService);
  cartService = inject(CartService);
  bp = inject(BreakpointObserver);

  category = input<string>('all');
  categories = this.productService.categories;
  filteredProducts = this.productService.filteredBy(this.category);

  activeSlug = computed(() => (this.category() || 'all').toLowerCase());
  categoriesVM = computed(() =>
    this.categories().map(label => ({
      label,
      slug: label.toLowerCase(),
      count: this.productService.countByCategory(label)
    }))
  );
  sidenavMode = computed(() =>
    this.bp.isMatched(Breakpoints.Medium) || this.bp.isMatched(Breakpoints.Large) || this.bp.isMatched(Breakpoints.XLarge)
      ? 'side'
      : 'over'
  );
  sidenavOpened = computed(() => this.sidenavMode() === 'side');



  ngOnInit() {
    this.productService.load();
    console.log(this.filteredProducts());
  }

  addToCart(product: Product): void {
    this.cartService.add(product);
    console.log(this.cartService.items());
  }

  trackById = (p: Product) => p.id;
  trackByCat = (_: number, c: { slug: string }) => c.slug;
  isActive = (slug: string) => slug === this.activeSlug();
}
