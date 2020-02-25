import { ProductService } from '../../../../../main/server/src/service/product/product.service';
import { TestContext } from '@tsed/testing';
import { ProductRepository } from '../../../../../main/server/src/respository/product/product.repository';

describe('ProductService', () => {
  let service: ProductService;
  let locals: any;
  let productSpy: any;
  let productSpyList: any;
  let productSpyRemove: any;
  let productDefault: any;
  beforeEach(TestContext.create);
  afterEach(TestContext.reset);
  beforeEach( async () => {
    productDefault = Object.assign( {
      name: 'AAAAA',
      quantity: 200,
      price: 500,
      description: 'BBBBB',
      username: 'CCCCC',
      password: 'DDDDD',
      image: 'EEEEE',
      modifiedDate: new Date()
    });

    productSpy = jest.fn().mockReturnValue(Promise.resolve(productDefault));
    productSpyList = jest.fn().mockReturnValue(Promise.resolve([productDefault]));
    productSpyRemove = jest.fn();
    locals = [
      {
        provide: ProductRepository,
        use: {
          save: productSpy,
          findOne: productSpy,
          find: productSpyList,
          delete: productSpyRemove
        }
      }
    ];
    service = await TestContext.invoke<ProductService>(ProductService, locals);
  });

  describe('Product creation', () => {
    it('should validate when name field is empty', async () => {
      productDefault.name = '';
      await service.save(productDefault)
        .catch(e => expect(e.message).toEqual('Missing name field'));
    });

    it('should validate when quantity field is null', async () => {
      productDefault.quantity = null;
      await service.save(productDefault).catch(e => {
        expect(e.message).toEqual('Missing quantity field');
      });
    });
    it('should validate when price field is null', async () => {
      productDefault.price = null;
      await service.save(productDefault).catch(e => {
        expect(e.message).toEqual('Missing price field');
      });
    });

    it('should validate when quantity description is null', async () => {
      productDefault.description = null;
      await service.save(productDefault).catch(e => {
        expect(e.message).toEqual('Missing description field');
      });
    });
    it('should save valid user to db', async () => {
      await service.save(productDefault)
        .then(savedProduct => {
          expect(savedProduct).toEqual(productDefault);
          expect(productSpy).toHaveBeenCalledTimes(1);
        });
    });

  });

  describe('Get product information', () => {
    it('should find product by id', async () => {
      await service.findById(123)
        .then(product => {
          expect(product).toEqual(productDefault);
          expect(productSpy).toHaveBeenCalledTimes(1);
        });
    });

    it('should find all product', async () => {
      await service.findAll({})
        .then(res => {
          expect(res.length).toEqual(1);
          expect(res[0]).toEqual(productDefault);
          expect(productSpyList).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe('Get product information', () => {
    it('should find product by id', async () => {
      await service.findById(123)
        .then(product => {
          expect(product).toEqual(productDefault);
          expect(productSpy).toHaveBeenCalledTimes(1);
        });
    });

    it('should find all product', async () => {
      await service.findAll({})
        .then(res => {
          expect(res.length).toEqual(1);
          expect(res[0]).toEqual(productDefault);
          expect(productSpyList).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe('Remove product information', () => {
    it('should remove product by id', async () => {
      await service.remove(123)
        .then(product => {
          expect(productSpyRemove).toHaveBeenCalledTimes(1);
        });
    });
  });
});
