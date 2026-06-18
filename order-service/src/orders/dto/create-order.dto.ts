import { IsInt, IsString, IsOptional, IsArray, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @IsInt()
  @Type(() => Number)
  productId!: number;

  @IsString()
  name!: string;

  @IsNumber()
  @Type(() => Number)
  price!: number;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  quantity!: number;
}

export class CreateOrderDto {
  @IsInt()
  @Type(() => Number)
  userId!: number;

  @IsString()
  customer!: string;

  @IsString()
  phone!: string;

  @IsString()
  address!: string;

  @IsString()
  city!: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsString()
  payment!: string;

  @IsNumber()
  @Type(() => Number)
  totalAmount!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items!: OrderItemDto[];
}