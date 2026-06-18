import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsString, IsNumber, IsOptional, Min } from 'class-validator';
export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsNumber()
    @IsOptional()
    @Min(0)
    price?: number;

    @IsString()
    @IsOptional()
    imageUrl?: string;

    @IsNumber()
    @IsOptional()
    @Min(0)
    quantity?: number;

}
