import { Product } from '../models/product';
import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { ProductService } from '../services/product-service';

export type EcommerceState = {
  category: string;
}

export const EcommerceStore = signalStore(
  {
    providedIn: 'root',
  },
  withState<EcommerceState>({
    category: 'all',
  }),
  withComputed(({category}) => {
    const productService = inject(ProductService);

    return {
      products: productService.products,
      loading: productService.loading,
      error: productService.error,
      categories: productService.categories,
      filteredProducts: computed(() => {
        const cat = category().toLowerCase();
        if (!cat || cat === 'all') return productService.products();
        return productService.products().filter(p => p.category.toLowerCase() === cat);
      })
    };
  }),
  withMethods((store) => {
    const productService = inject(ProductService);

    return {
      setCategory: signalMethod<string>((category: string) => {
        patchState(store, { category });
      }),
      loadProducts: signalMethod<void>(() => {
        productService.load();
      }),
      reloadProducts: signalMethod<void>(() => {
        productService.reload();
      })
    };
  }),
)
