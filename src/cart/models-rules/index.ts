import { Cart, CartItem } from '../models';

/**
 * @param {Cart} cart
 * @returns {number}
 */
export function calculateCartTotal(cart): number {
  return cart ? cart.items.reduce((acc: number, { count }: CartItem) => {
    return acc += 100 * count;
  }, 0) : 0;
}
