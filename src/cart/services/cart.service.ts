import { Injectable, Inject } from '@nestjs/common';
import { InjectClient } from 'nest-postgres';
import { Client } from 'pg';

import { v4 } from 'uuid';

import { Cart } from '../models';

@Injectable()
export class CartService {
  constructor(@Inject('PG') private pg: Client) {}

  async findByUserId(userId: string) {
    const QUERY_SELECT = 'SELECT id, status, product_id, count FROM carts, cart_items WHERE carts.id = cart_items.cart_id AND carts.user_id=$1';

    const carts = await this.pg.query(QUERY_SELECT, [userId]);

    if (carts.rows.length === 0) {
      return
    }

    return {
      id: carts.rows[0]['id'],
      items: carts.rows,
    }
  }

  async createByUserId(userId: string) {
    const QUERY_INSERT_CART = `INSERT INTO carts (user_id, status) VALUES ($1, $2) RETURNING *`;
    const QUERY_INSERT_CART_ITEM = `INSERT INTO cart_items (cart_id, product_id, count) VALUES ($1, $2, $3) RETURNING *`;

    const cart = await this.pg.query(QUERY_INSERT_CART, [userId, 'OPEN']);
    const cart_item = await this.pg.query(QUERY_INSERT_CART_ITEM, [cart.rows[0].id, 'd1003e61-1111-4b7d-bd40-beeef964edba', 0]);

    return { id: cart.rows[0].id, items: [{ id: cart.rows[0].id, status: cart.rows[0].status, product_id: cart_item.rows[0].product_id, count: cart_item.rows[0].count }], status: cart.rows[0].status };
  }

  async findOrCreateByUserId(userId: string) {
    const carts = await this.findByUserId(userId);

    if (carts) {
      return carts;
    }

    return await this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { count }) {
    const QUERY_CART_SELECT_ID = 'SELECT id FROM carts WHERE user_id=$1';
    const id = await this.pg.query(QUERY_CART_SELECT_ID, [userId]);

    if (id.rows[0].id) {
      const QUERY_CART_ITEMS_UPDATE = 'UPDATE cart_items SET count=$1 WHERE cart_id=$2';
      await this.pg.query(QUERY_CART_ITEMS_UPDATE, [count, id.rows[0].id] );

      return await this.findByUserId(userId)
    }

    return
  }

  async removeByUserId(userId) {
    const QUERY_GET_ID = 'SELECT id FROM carts WHERE user_id=$1';
    const QUERY_DELETE_CART_ITEMS = 'DELETE FROM cart_items WHERE cart_id=$1';
    const QUERY_DELETE_CARTS = 'DELETE FROM carts WHERE id=$1';

    const id = await this.pg.query(QUERY_GET_ID, [userId]);

    await this.pg.query(QUERY_DELETE_CART_ITEMS, [id.rows[0].id]);
    await this.pg.query(QUERY_DELETE_CARTS, [id.rows[0].id]);
  }

}
