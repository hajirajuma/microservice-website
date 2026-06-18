import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import axios from 'axios';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateOrderDto) {
    // Reduce product stock in product-service before creating the order
    try {
      await Promise.all(
        (dto.items || []).map((item) =>
          axios.patch(`http://product-service:3002/products/${item.productId}/reduce-stock`, {
            quantity: item.quantity,
          }),
        ),
      );
    } catch (err) {
      // Bubble up error to caller to avoid creating an order when stock update fails
      throw new Error(`Failed to reduce product stock: ${(err as any).message || err}`);
    }

    return this.prisma.order.create({
      data: {
        userId: dto.userId,
        customer: dto.customer,
        phone: dto.phone,
        address: dto.address,
        city: dto.city,
        notes: dto.notes,
        payment: dto.payment,
        totalAmount: dto.totalAmount,
        items: {
          create: dto.items,
        },
      },
      include: {
        items: true,
      },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        items: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.order.findUnique({
      where: { id },

      include: {
        items: true,
      },
    });
  }
}