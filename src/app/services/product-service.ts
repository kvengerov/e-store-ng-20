import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  private _products = signal<Product[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  products = this._products.asReadonly();
  loading = this._loading.asReadonly();
  error = this._error.asReadonly();


  load(): void {
    if (this._products().length || this._loading()) return; // идемпотентно
    this._loading.set(true);
    this.http.get<Product[]>('/assets/products.json').subscribe({
      next: (data) => this._products.set(data),
      error: (e) => this._error.set(e?.message ?? 'Failed to load products.json'),
      complete: () => this._loading.set(false),
    });
  }

  reload(): void {
    this._products.set([]);
    this._error.set(null);
    this.load();
  }

  categories = computed(() => {
    const set = new Set(this._products().map(p => p.category));
    return ['All', ...Array.from(set).sort()];
  });

  filteredBy = (category: () => string) => computed(() => {
    const cat = (category() || '').toLowerCase();
    if (!cat || cat === 'all') return this._products();
    return this._products().filter(p => p.category.toLowerCase() === cat);
  });

  countsByCategory = computed(() => {
    const map = new Map<string, number>();
    for (const p of this.products()) {
      const key = (p.category ?? '').toLowerCase();
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    return map;
  });

  countByCategory(label: string): number {
    const slug = (label ?? '').toLowerCase();
    if (!slug || slug === 'all') return this.products().length;
    return this.countsByCategory().get(slug) ?? 0;
  }

}
