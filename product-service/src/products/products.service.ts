import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    name: string,
    price: number,
    imageUrl: string,
    quantity: number,
    description: string,
    imageBase64?: string,
  ) {
    try {
      let finalImageUrl = imageUrl;

      const SUPABASE_URL = process.env.SUPABASE_URL;
      const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

console.log('SUPABASE_URL =', SUPABASE_URL);
console.log('SUPABASE_SERVICE_KEY =', SUPABASE_SERVICE_KEY);

      if (!finalImageUrl && imageBase64) {
        const SUPABASE_URL = process.env.SUPABASE_URL as string;
        const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY as string;
        if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
          throw new Error('Supabase credentials are not configured on server');
        }

        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, { auth: { persistSession: false } });

        const matches = imageBase64.match(/^data:(.+);base64,(.+)$/);
        if (!matches) throw new Error('Invalid imageBase64 format');
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
    } catch (error) {
      console.error('Full error object:', error);
      if (error instanceof Error) {
        console.error('Message:', error.message);
        console.error('Meta:', (error as any).meta);
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(id: number) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async update(id: number, name: string, price: number, imageUrl: string, quantity: number) {
    return this.prisma.product.update({ where: { id }, data: { name, price, imageUrl, quantity } });
  }

  async remove(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }

  async reduceStock(id: number, quantity: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new Error('Product not found');
    if (product.quantity < quantity) throw new Error('Insufficient stock');

    return this.prisma.product.update({ where: { id }, data: { quantity: product.quantity - quantity } });
  }
}