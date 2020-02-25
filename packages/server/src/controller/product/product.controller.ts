import { BodyParams, Controller, Delete, Get, PathParams, Post, Put, Required, Status } from '@tsed/common';
import { Description, Summary } from '@tsed/swagger';
import { NotFound } from 'ts-httpexceptions';
import { ProductService } from '../../service/product/product.service';
import { Product } from '../../domain/product/product';


@Controller('/products')
export class ProductController {

  constructor(private productService: ProductService) {

  }

  @Get('/')
  @Summary('Return all products')
  @Status(200, {description: 'Success', type: Product, collectionType: Array})
  async getAllProducts(): Promise<Product[]> {
    return this.productService.findAll({});
  }

  @Get('/:id')
  @Summary('Return a product from his ID')
  @Status(200, {description: 'Success', type: Product})
  async get(@Required() @PathParams('id') id: number): Promise<Product> {

    const product = await this.productService.findById(id);

    if (product) {
      return product;
    }

    throw new NotFound('Product not found');
  }

  @Post('/')
  @Summary('Create a new Product')
  @Status(201, {description: 'Created', type: Product})
  save(@Description('Product model')
       @BodyParams() product: Product) {
    return this.productService.save(product);
  }

  @Put('/:id')
  @Summary('Update product information')
  @Status(200, {description: 'Success', type: Product})
  async update(@PathParams('id') @Required() id: number,
               @BodyParams() product: Product): Promise<Product> {

    product.id = id;

    return this.productService.save(product);
  }

  @Delete('/:id')
  @Summary('Remove a product.')
  @Status(204, {description: 'No content'})
  async remove(@PathParams('id') id: number): Promise<void> {
    await this.productService.remove(id);
  }
}
