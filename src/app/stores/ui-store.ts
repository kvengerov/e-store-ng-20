import { signalStore, withComputed, withState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

export type UIState = {}

export const UIStore = signalStore(
  {
    providedIn: 'root',
  },
  withState<UIState>({}),
  withComputed(() => {
    const bp = inject(BreakpointObserver);

    return {
      sidenavMode: computed(() =>
        bp.isMatched(Breakpoints.Medium) ||
        bp.isMatched(Breakpoints.Large) ||
        bp.isMatched(Breakpoints.XLarge)
          ? 'side'
          : 'over'
      ),
      sidenavOpened: computed(() => {
        const mode = bp.isMatched(Breakpoints.Medium) ||
                    bp.isMatched(Breakpoints.Large) ||
                    bp.isMatched(Breakpoints.XLarge);
        return mode;
      })
    };
  })
);
