import { Product } from '../models/product';
import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { produce } from 'immer';
import { MatSnackBar } from '@angular/material/snack-bar';

export type WishlistState = {
  items: Product[];
  loading: boolean;
}

export const WishlistStore = signalStore(
  {
    providedIn: 'root',
  },
  withState<WishlistState>({
    items: [],
    loading: false,
  }),
  withComputed(({items}) => ({
    count: computed(() => items().length),
    isEmpty: computed(() => items().length === 0),
    itemIds: computed(() => items().map(item => item.id)),
  })),
  withMethods((store) => {
    const snackBar = inject(MatSnackBar);

    return {
      addToWishlist: signalMethod<Product>((product: Product) => {
        patchState(store, (state) =>
          produce(state, (draft) => {
            const existingItem = draft.items.find(item => item.id === product.id);
            if (!existingItem) {
              draft.items.push(product);
              snackBar.open(`"${product.name}" added to wishlist`, 'Close', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
              });
            }
          })
        );
        try {
          localStorage.setItem('wishlist', JSON.stringify(store.items()));
        } catch (error) {
          console.error('Failed to save wishlist to storage:', error);
        }
      }),

      removeFromWishlist: signalMethod<string>((productId: string) => {
        const product = store.items().find(item => item.id === productId);
        patchState(store, (state) =>
          produce(state, (draft) => {
            draft.items = draft.items.filter(item => item.id !== productId);
          })
        );
        if (product) {
          snackBar.open(`"${product.name}" removed from wishlist`, 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
        try {
          localStorage.setItem('wishlist', JSON.stringify(store.items()));
        } catch (error) {
          console.error('Failed to save wishlist to storage:', error);
        }
      }),

      toggleWishlist: signalMethod<Product>((product: Product) => {
        const isInWishlist = store.items().some(item => item.id === product.id);
        patchState(store, (state) =>
          produce(state, (draft) => {
            const existingIndex = draft.items.findIndex(item => item.id === product.id);
            if (existingIndex >= 0) {
              draft.items.splice(existingIndex, 1);
            } else {
              draft.items.push(product);
            }
          })
        );

        const message = isInWishlist
          ? `"${product.name}" removed from wishlist`
          : `"${product.name}" added to wishlist`;
        snackBar.open(message, 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        try {
          localStorage.setItem('wishlist', JSON.stringify(store.items()));
        } catch (error) {
          console.error('Failed to save wishlist to storage:', error);
        }
      }),

      isInWishlist: (productId: string) => {
        return store.items().some(item => item.id === productId);
      },

      clearWishlist: signalMethod<void>(() => {
        patchState(store, (state) =>
          produce(state, (draft) => {
            draft.items = [];
          })
        );
        snackBar.open('Wishlist cleared', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        try {
          localStorage.setItem('wishlist', JSON.stringify(store.items()));
        } catch (error) {
          console.error('Failed to save wishlist to storage:', error);
        }
      }),

      loadFromStorage: signalMethod<void>(() => {
        try {
          const stored = localStorage.getItem('wishlist');
          if (stored) {
            const items = JSON.parse(stored);
            patchState(store, { items });
          }
        } catch (error) {
          console.error('Failed to load wishlist from storage:', error);
        }
      }),

      saveToStorage: signalMethod<void>(() => {
        try {
          localStorage.setItem('wishlist', JSON.stringify(store.items()));
        } catch (error) {
          console.error('Failed to save wishlist to storage:', error);
        }
      })
    };
  })
);
