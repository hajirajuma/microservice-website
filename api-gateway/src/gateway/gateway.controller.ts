import { Controller, Get, Post, Patch, Delete, Param, Body, Headers, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';


@Controller()
export class GatewayController {
    @Get('auth/verify')
    async verify(@Headers('Authorization') token: string) {
        const response = await axios.get('http://localhost:3001/auth/verify', {
            headers: { Authorization: token },
        });
        return response.data;
    }
    @Get('products')
    async getProducts() {
        const response = await axios.get(
            'http://localhost:3002/products',
        );
        return response.data;
    }
        @Get('products/:id')
    async getProduct(@Param('id') id: number) {
        const response = await axios.get(
            `http://localhost:3002/products/${id}`,
        );
        return response.data;
    }

        @Get('admin/summary')
        async getAdminSummary() {
            // products
            const productsResp = await axios.get('http://localhost:3002/products');
            const productsCount = Array.isArray(productsResp.data) ? productsResp.data.length : 0;

            // customers (attempt, fall back to 0)
                let customersCount = 0;
                try {
                    // auth-service exposes customers at /auth/customers
                    const usersResp = await axios.get('http://localhost:3001/auth/customers');
                    customersCount = Array.isArray(usersResp.data) ? usersResp.data.length : 0;
                } catch (e) {
                    customersCount = 0;
                }

            // orders & revenue (attempt, fall back to 0)
            let ordersCount = 0;
            let totalRevenue = 0;
            try {
                // call order-service directly (it runs on 3004)
                const ordersResp = await axios.get('http://localhost:3004/orders');
                if (Array.isArray(ordersResp.data)) {
                    ordersCount = ordersResp.data.length;
                    totalRevenue = ordersResp.data.reduce((sum: number, o: any) => sum + (o.totalAmount || o.total || 0), 0);
                }
            } catch (e) {
                ordersCount = 0;
                totalRevenue = 0;
            }

            return {
                productsCount,
                ordersCount,
                customersCount,
                totalRevenue,
            };
        }
    @Post('register')
    async register(@Body() body: any) {
        const response = await axios.post(
            'http://localhost:3001/auth/register',
            body,
        );
        return response.data;
    }

    @Get('customers')
    async getCustomers() {
        const response = await axios.get('http://localhost:3001/auth/customers');
        return response.data;
    }
    @Post('login')
    async login(@Body() body: any) {
        const response = await axios.post(
            'http://localhost:3001/auth/login',
            body,
        );
        return response.data;
    }

    @Post('products')
    async createProduct(@Body() body: any, @Headers('Authorization') token: string) {
        const user = await this.verifyToken(token);
        if (user.role !== 'ADMIN') {
            throw new UnauthorizedException(
                'Admin access required',
            );
        }
        const response = await axios.post(
            'http://localhost:3002/products',
            body,
        );
        return response.data;
    }

    @Post('orders')
async createOrder(
  @Body() body: any,
) {
  const response = await axios.post(
    'http://localhost:3004/orders',
    body,
  );

  return response.data;
}

@Get('orders')
async getOrders() {
  const response = await axios.get(
    'http://localhost:3004/orders',
  );

  return response.data;
}

    @Patch('products/:id')
    async updateProduct(@Param('id') id: number, @Body() body: any, @Headers('Authorization') token: string) {
        const user = await this.verifyToken(token);
        if (user.role !== 'ADMIN') {
            throw new UnauthorizedException(
                'Admin access required',
            );
        }
        return axios.patch(
            `http://localhost:3002/products/${id}`,
            body,
        );
    }
   
    @Delete('products/:id')
    async deleteProduct(@Param('id') id: number, @Headers('Authorization') token: string) {
        const user = await this.verifyToken(token);
        if (user.role !== 'ADMIN') {
            throw new UnauthorizedException(
                'Admin access required',
            );
        }
        return axios.delete(
            `http://localhost:3002/products/${id}`
        );
    }

    private async verifyToken(token: string): Promise<any> {
        try {
            const response = await axios.get(
                'http://localhost:3001/auth/verify',
                {
                    headers: {
                        Authorization: token,
                    },
                },
            );
            return response.data;
        } catch (error) {
            throw new UnauthorizedException();
        }

    }

}
