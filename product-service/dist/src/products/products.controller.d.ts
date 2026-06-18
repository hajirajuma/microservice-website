import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<{
        name: string;
        description: string;
        price: number;
        imageUrl: string;
        quantity: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    findAll(): Promise<{
        name: string;
        description: string;
        price: number;
        imageUrl: string;
        quantity: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        description: string;
        price: number;
        imageUrl: string;
        quantity: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    } | null>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        name: string;
        description: string;
        price: number;
        imageUrl: string;
        quantity: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    reduceStock(id: string, body: {
        quantity: number;
    }): Promise<{
        name: string;
        description: string;
        price: number;
        imageUrl: string;
        quantity: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    remove(id: string): Promise<{
        name: string;
        description: string;
        price: number;
        imageUrl: string;
        quantity: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
}
