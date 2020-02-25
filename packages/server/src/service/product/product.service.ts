import { Service } from '@tsed/common';
import { Product } from '../../domain/product/product';
import { ProductRepository } from '../../respository/product/product.repository';
import { ApiError } from '../../utils/error';

@Service()
export class ProductService {

  constructor(private productRepository: ProductRepository) {
  }

  async save(product: Product): Promise<Product> {
    ProductService.validate(product);
    return await this.productRepository.save(product);
  }

  async findAll(query: any): Promise<Product[]> {
    return await this.productRepository
      .find(query);
  }

  async findById(id: number): Promise<Product> {
    return await this.productRepository.findOne(id);
  }

  async remove(id: number) {
    await this.productRepository.delete(id);
  }

  private static validate(product: Product) {
    if (!product.name) throw new ApiError('Missing name field', 400);
    if (!product.price) throw new ApiError('Missing price field', 400);
    if (!product.quantity) throw new ApiError('Missing quantity field', 400);
    if (!product.description) throw new ApiError('Missing description field', 400);
  }
}
