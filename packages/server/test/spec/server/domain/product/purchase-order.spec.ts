import { inject } from '@tsed/testing';
import { PurchaseOrder } from '../../../../../main/server/src/domain/product/purchase-order';
import { PurchaseOrderRepository } from '../../../../../main/server/src/respository/product/purchase-order.repository';
import { ProductRepository } from '../../../../../main/server/src/respository/product/product.repository';
import { Product } from '../../../../../main/server/src/domain/product/product';
import { PurchaseStatusEnum } from '../../../../../main/server/src/domain/product/enum/product-status.enum';
import { Order } from '../../../../../main/server/src/domain/product/order';


describe('Purchase-Order', () => {
    let purchaseOrderRepository: PurchaseOrderRepository;
    const productDefault = new Product();
    const purchaseOrderDefault = new PurchaseOrder();
    const order = new Order();

    beforeEach(inject([ProductRepository, PurchaseOrderRepository],
      async (productRepository: ProductRepository, orderRepository: PurchaseOrderRepository) => {
          purchaseOrderRepository = orderRepository;

          Object.assign( {
              name: 'AAAAA',
              quantity: 200,
              price: 500,
              description: 'BBBBB',
              username: 'CCCCC',
              password: 'DDDDD',
              image: 'EEEEE',
              modifiedDate: new Date()
          }, productDefault);

          const product = await productRepository.save(productDefault);
          Object.assign({
              quantity: 500,
              product: product,
              shippingAddress: 'CCCCC',
              purchasedBy: 'DDDDD',
              orders: []
          }, order);

          Object.assign({
              price: 500,
              description: 'BBBBB',
              shippingAddress: 'CCCCC',
              purchasedBy: 'DDDDD',
              orders: []
          }, purchaseOrderDefault);

    }));

    it('should create new purchase order when order is provided', async () => {
        // GIVEN
        purchaseOrderDefault.orders[0] = order;

        // WHEN
        const savedPurchaseOrder = await purchaseOrderRepository.save(purchaseOrderDefault);

        // THEN
        // expect(purchaseOrderDefault.orders[0].total).toEqual(savedPurchaseOrder.totalAmount * 10);
        expect(purchaseOrderDefault.orders[0].product).toEqual(savedPurchaseOrder);
        expect(purchaseOrderDefault.status).toEqual(PurchaseStatusEnum.NEW_ORDER);
    });

    // it('should find all products in db', async () => {
    //     // GIVEN
    //     const user = new productRepository(productStub);
    //     await user.save();
    //
    //     // WHEN
    //     const list = await productRepository.find({});
    //     // THEN
    //     expect(list).to.be.an('array');
    //     expect(list.length).to.be.equal(1);
    // });
});
