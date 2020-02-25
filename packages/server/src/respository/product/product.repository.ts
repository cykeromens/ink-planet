import { EntityManager, getConnection } from 'typeorm';
import { Product } from '../../domain/product/product';
import { Injectable } from '@tsed/di';
import { AfterRoutesInit } from '@tsed/common';
import { $log } from 'ts-log-debug';


@Injectable()
export class ProductRepository implements AfterRoutesInit {

  private entityManager: EntityManager;

  constructor() {
  }

  $afterRoutesInit() {
    this.entityManager = getConnection().manager;
  }

  async save(product: Product): Promise<Product> {
    await this.entityManager.save(product);
    $log.debug('Saved a new product with id: ',  product.id);
    return product;
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.entityManager.findOne(Product, id);
    $log.debug('Product by id: ', product);
    return product;
  }

  async find(query?: any): Promise<Product[]> {
    const products = await this.entityManager.find(Product, query);
    $log.debug('Loaded products: ', products);
    return products;
  }
  async delete(id: number): Promise<number> {
    const products = await this.entityManager.delete(Product, id);
    $log.debug('Remove product by id: ', id);
    return products.affected;
  }
}
