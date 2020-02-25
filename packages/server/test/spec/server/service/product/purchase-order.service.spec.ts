import { TestContext } from '@tsed/testing';
import { PurchaseOrderService } from '../../../../../main/server/src/service/product/purchase-order.service';
import { PurchaseOrderRepository } from '../../../../../main/server/src/respository/product/purchase-order.repository';

describe('PurchaseOrderService', () => {
  let service: PurchaseOrderService;
  let locals: any;
  let purchaseOrderSpy: any;
  let purchaseOrderSpyList: any;
  let purchaseOrderSpyRemove: any;
  let purchaseOrderDefault: any;
  beforeEach(TestContext.create);
  afterEach(TestContext.reset);
  beforeEach( async () => {

    purchaseOrderDefault = Object.assign({
      description: 'BBBBB',
      shippingAddress: 'CCCCC',
      purchasedBy: 'DDDDD',
      orders: [{product: {name: 'AAAA', quantity: 40}, quantity: '5', }]
    });

    purchaseOrderSpy = jest.fn().mockReturnValue(Promise.resolve(purchaseOrderDefault));
    purchaseOrderSpyList = jest.fn().mockReturnValue(Promise.resolve([purchaseOrderDefault]));
    purchaseOrderSpyRemove = jest.fn();
    locals = [
      {
        provide: PurchaseOrderRepository,
        use: {
          save: purchaseOrderSpy,
          findOne: purchaseOrderSpy,
          find: purchaseOrderSpyList,
          delete: purchaseOrderSpyRemove
        }
      }
    ];
    service = await TestContext.invoke<PurchaseOrderService>(PurchaseOrderService, locals);
  });

  describe('PurchaseOrder creation', () => {
    it('should validate when quantity field when null', async () => {
      purchaseOrderDefault.quantity = null;
      await service.save(purchaseOrderDefault).catch(e => {
        expect(e.message).toEqual('Missing quantity field');
      });
    });
    it('should validate when shippingAddress field is null', async () => {
      purchaseOrderDefault.shippingAddress = null;
      await service.save(purchaseOrderDefault).catch(e => {
        expect(e.message).toEqual('Missing shipping address field');
      });
    });

    it('should save valid user to db', async () => {
      await service.save(purchaseOrderDefault)
        .then(savedPurchaseOrder => {
          expect(savedPurchaseOrder).toEqual(purchaseOrderDefault);
          expect(purchaseOrderSpy).toHaveBeenCalledTimes(1);
        });
    });

  });

  describe('Get purchaseOrder information', () => {
    it('should find purchaseOrder by id', async () => {
      await service.findById(123)
        .then(purchaseOrder => {
          expect(purchaseOrder).toEqual(purchaseOrderDefault);
          expect(purchaseOrderSpy).toHaveBeenCalledTimes(1);
        });
    });

    it('should find all purchaseOrder', async () => {
      await service.findAll({})
        .then(res => {
          expect(res.length).toEqual(1);
          expect(res[0]).toEqual(purchaseOrderDefault);
          expect(purchaseOrderSpyList).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe('Get purchaseOrder information', () => {
    it('should find purchaseOrder by id', async () => {
      await service.findById(123)
        .then(purchaseOrder => {
          expect(purchaseOrder).toEqual(purchaseOrderDefault);
          expect(purchaseOrderSpy).toHaveBeenCalledTimes(1);
        });
    });

    it('should find all purchaseOrder', async () => {
      await service.findAll({})
        .then(res => {
          expect(res.length).toEqual(1);
          expect(res[0]).toEqual(purchaseOrderDefault);
          expect(purchaseOrderSpyList).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe('CheckOrderQuantityInStock purchaseOrder information', () => {
    it('should do nothing when Order quantity is less than available quantity', async () => {
      await PurchaseOrderService.checkStock(purchaseOrderDefault.orders[0])
        .then(valid => {
          expect(valid).toBe(true);
        });
    });

    it('should throw exception when Order quantity is greater than available quantity', async () => {

      purchaseOrderDefault.orders[0].quantity = purchaseOrderDefault.quantity + 1;
      await PurchaseOrderService.checkStock(purchaseOrderDefault.orders[0])
        .catch(e => {
          expect(e.message).toBe('Out of stock!');
        });
    });
  });

  describe('Remove purchaseOrder information', () => {
    it('should remove purchaseOrder by id', async () => {
      await service.remove(123)
        .then(purchaseOrder => {
          expect(purchaseOrderSpyRemove).toHaveBeenCalledTimes(1);
        });
    });
  });
});
