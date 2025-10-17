import { Injectable, signal } from '@angular/core';
import { Product } from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _items = signal<Product[]>([]);
  items = this._items.asReadonly();

  add(product: Product): void {
    const current = this._items();
    this._items.set([...current, product]);
  }

  remove(id: string): void {
    this._items.update(items => items.filter(p => p.id !== id));
  }

  clear(): void {
    this._items.set([]);
  }

  total = () => this._items().reduce((sum, p) => sum + p.price, 0);
}
