import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(
      createProductDto.name || '',
      createProductDto.price || 0,
      createProductDto.imageUrl || '',
      createProductDto.quantity || 0,
      createProductDto.description || '',
      createProductDto.imageBase64,
    );
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(
      +id,
      updateProductDto.name || '',
      updateProductDto.price || 0,
      updateProductDto.imageUrl || '',
      updateProductDto.quantity || 0,
    );
  }

  @Patch(':id/reduce-stock')
  reduceStock(
    @Param('id') id: string,
    @Body() body: { quantity: number },
  ) {
    return this.productsService.reduceStock(+id, body.quantity);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}

