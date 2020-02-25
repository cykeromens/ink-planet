import { Default, Format, Property, Required } from '@tsed/common';

import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Property()
  @Required()
  name: string;

  @Property()
  description: string;

  @Property()
  @Required()
  quantity: number;

  @Property()
  @Required()
  price: number;

  @Property()
  images?: string [];

  @Format('date-time')
  @Default(Date.now)
  @Property()
  modifiedDate: Date = new Date();
}
