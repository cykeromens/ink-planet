import { Inject, Service } from '@tsed/common';
import { PurchaseOrder } from '../../domain/product/purchase-order';
import { PurchaseOrderRepository } from '../../respository/product/purchase-order.repository';
import { ApiError } from '../../utils/error';
import { Order } from '../../domain/product/order';

@Service()
export class PurchaseOrderService {


  constructor(private purchaseOrderRepository: PurchaseOrderRepository) {
  }

  async save(purchaseOrder: PurchaseOrder): Promise<PurchaseOrder> {
    PurchaseOrderService.validate(purchaseOrder);
    return await this.purchaseOrderRepository.save(purchaseOrder);
  }

  async findAll(query: any): Promise<PurchaseOrder[]> {
    return await this.purchaseOrderRepository
      .find(query);
  }

  async findById(id: number): Promise<PurchaseOrder> {
    return await this.purchaseOrderRepository.findOne(id);
  }

  async remove(id: number) {
    return await this.purchaseOrderRepository.delete(id);
  }

  static async checkStock(order: Order) {
    if (!(order.product.quantity >= order.quantity))
      throw new ApiError('Out of stock!');
    return order.product.quantity >= order.quantity;
  }

  static validate(purchaseOrder: PurchaseOrder) {
    if (!(purchaseOrder.orders.length > 0)) throw new ApiError('No Order was added', 400);
    if (!purchaseOrder.purchasedBy) throw new ApiError('PurchaseBy is required', 400);
    if (!purchaseOrder.shippingAddress) throw new ApiError('Missing shipping address field', 400);
  }
}
