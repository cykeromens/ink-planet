import { EntityManager, getConnection } from 'typeorm';
import { Injectable } from '@tsed/di';
import { AfterRoutesInit } from '@tsed/common';
import { $log } from 'ts-log-debug';
import { PurchaseOrder } from '../../domain/product/purchase-order';


@Injectable()
export class PurchaseOrderRepository implements AfterRoutesInit {

  private entityManager: EntityManager;

  constructor() {
  }

  $afterRoutesInit() {
    this.entityManager = getConnection().manager;
  }

  async save(purchase: PurchaseOrder): Promise<PurchaseOrder> {
    await this.entityManager.save(purchase);
    $log.debug('Saved a new purchase with id: ',  purchase.id);
    return purchase;
  }

  async findOne(id: number): Promise<PurchaseOrder> {
    const purchase = await this.entityManager.findOne(PurchaseOrder, id);
    $log.debug('PurchaseOrder by id: ', purchase);
    return purchase;
  }

  async find(query?: any): Promise<PurchaseOrder[]> {
    const purchases = await this.entityManager.find(PurchaseOrder, query);
    $log.debug('Loaded purchases: ', purchases);
    return purchases;
  }
  async delete(id: number): Promise<number> {
    const purchases = await this.entityManager.delete(PurchaseOrder, id);
    $log.debug('Remove purchase by id: ', id);
    return purchases.affected;
  }
}
