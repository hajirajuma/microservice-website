import { PrismaService } from "../prisma.service";
import 'dotenv/config';
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(name: string, price: number, imageUrl: string, quantity: number, description: string, imageBase64?: string): Promise<{
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
    findOne(id: number): Promise<{
        name: string;
        description: string;
        price: number;
        imageUrl: string;
        quantity: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    } | null>;
    update(id: number, name: string, price: number, imageUrl: string, quantity: number): Promise<{
        name: string;
        description: string;
        price: number;
        imageUrl: string;
        quantity: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    remove(id: number): Promise<{
        name: string;
        description: string;
        price: number;
        imageUrl: string;
        quantity: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    reduceStock(id: number, quantity: number): Promise<{
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
