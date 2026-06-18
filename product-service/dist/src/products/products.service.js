"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const supabase_js_1 = require("@supabase/supabase-js");
require("dotenv/config");
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(name, price, imageUrl, quantity, description, imageBase64) {
        try {
            let finalImageUrl = imageUrl;
            const SUPABASE_URL = process.env.SUPABASE_URL;
            const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
            console.log('SUPABASE_URL =', SUPABASE_URL);
            console.log('SUPABASE_SERVICE_KEY =', SUPABASE_SERVICE_KEY);
            if (!finalImageUrl && imageBase64) {
                const SUPABASE_URL = process.env.SUPABASE_URL;
                const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
                if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
                    throw new Error('Supabase credentials are not configured on server');
                }
                const supabase = (0, supabase_js_1.createClient)(SUPABASE_URL, SUPABASE_SERVICE_KEY, { auth: { persistSession: false } });
                const matches = imageBase64.match(/^data:(.+);base64,(.+)$/);
                if (!matches)
                    throw new Error('Invalid imageBase64 format');
                const contentType = matches[1];
                const b64 = matches[2];
                const buffer = Buffer.from(b64, 'base64');
                const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
                const { error: uploadError } = await supabase.storage.from('Products').upload(filename, buffer, { contentType });
                if (uploadError) {
                    console.error('Supabase upload error:', uploadError);
                    throw uploadError;
                }
                const { data: publicData } = supabase.storage.from('Products').getPublicUrl(filename);
                if (!publicData || !publicData.publicUrl) {
                    console.error('Supabase getPublicUrl error: No public URL returned');
                    throw new Error('No public URL returned');
                }
                finalImageUrl = publicData.publicUrl;
            }
            const product = await this.prisma.product.create({
                data: {
                    name,
                    price,
                    imageUrl: finalImageUrl,
                    quantity,
                    description,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });
            return product;
        }
        catch (error) {
            console.error('Full error object:', error);
            if (error instanceof Error) {
                console.error('Message:', error.message);
                console.error('Meta:', error.meta);
            }
            throw error;
        }
    }
    async findAll() {
        return this.prisma.product.findMany();
    }
    async findOne(id) {
        return this.prisma.product.findUnique({ where: { id } });
    }
    async update(id, name, price, imageUrl, quantity) {
        return this.prisma.product.update({ where: { id }, data: { name, price, imageUrl, quantity } });
    }
    async remove(id) {
        return this.prisma.product.delete({ where: { id } });
    }
    async reduceStock(id, quantity) {
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product)
            throw new Error('Product not found');
        if (product.quantity < quantity)
            throw new Error('Insufficient stock');
        return this.prisma.product.update({ where: { id }, data: { quantity: product.quantity - quantity } });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map