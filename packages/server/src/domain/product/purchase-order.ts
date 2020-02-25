import { Default, Enum, Format, Property, PropertyType, Required } from '@tsed/common';
import { PurchaseStatusEnum } from './enum/product-status.enum';
import { BaseEntity, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order';
import { User } from '../user/user';


@Entity()
export class PurchaseOrder extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PropertyType(User)
  @Required()
  @OneToOne(type => User)
  purchasedBy: User;

  @Property()
  @Required()
  shippingAddress: string;

  @Property()
  @Required()
  description: string;

  @Property()
  @Default(this.calculateTotal)
  totalAmount: number;

  @Required()
  @PropertyType(Order)
  @OneToMany(type => Order, order => order.purchaseOrder, { eager: true })
  orders: Order[];

  @Enum(PurchaseStatusEnum)
  @Default(PurchaseStatusEnum.NEW_ORDER)
  status: PurchaseStatusEnum;

  @Format('date-time')
  @Default(Date.now)
  @Property()
  purchaseDate: Date = new Date();

  calculateTotal(): number {
    return this.orders.map(order => order.total).reduce((a, b) => a + b, 0);
  }
}
