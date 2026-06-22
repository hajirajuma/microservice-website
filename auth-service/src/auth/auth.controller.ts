import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PrismaService } from 'src/prisma.service';

@Controller('auth')
export class AuthController {
  
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('verify')
  @UseGuards(JwtAuthGuard)
  verify(@Request() req: any) {
    return req.user;
  }

  @Get('customers')
  findAllCustomers(){
    return this.prisma.user.findMany({
      where: {
        role: 'USER'
      }
    })
  }

  @Post('register')
  async register(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.register(createAuthDto.email, createAuthDto.password, 'USER');
  }

  @Post('login')
  async login(@Body() loginDto: CreateAuthDto) {
    return await this.authService.login(loginDto.email, loginDto.password);
  }

  
}
