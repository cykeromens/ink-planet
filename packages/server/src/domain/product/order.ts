import { BaseEntity, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product';
import { Default, Property, Required } from '@tsed/common';
import { PurchaseOrder } from './purchase-order';

@Entity()
export class Order extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Product)
  @JoinColumn()
  product: Product;

  @ManyToOne(type => PurchaseOrder, purchaseOrder => purchaseOrder.orders)
  purchaseOrder: PurchaseOrder;

  @Property()
  @Required()
  quantity: number;

  @Property()
  @Default(this.getTotal)
  total?: number;

  getTotal(): number {
    return this.product.price * this.quantity;
  }
}
