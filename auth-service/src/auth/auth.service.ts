import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class AuthService {
  User: any;
  constructor(
    private jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async register(
email: string, password: string, p0: string,
    
  ) {
      try {
    const hashedPassword = await bcrypt.hash(password, 10);

   const user =  await (this.prisma as any).user.create({
    data: {
      
      email,
      password: hashedPassword,
      role: 'USER',
    },
   });
    
    console.log('User Created succefully:', user);
    
    return { message: 'User registered successfully' };
  } catch (error: any) {
    console.error('Registration error:', error);
    if (error?.code === 'P2002') {
      return { message: 'Email already exists', statuscode: 400 };
    }
    throw error;
  }
}

  async login(email: string, password: string) {
    const user = await (this.prisma as any).user.findUnique({
      where: { email },
    })

    if (!user) return { message: 'Invalid credentials' };

    const isMatch = await bcrypt.compare(password, user.password as any);

    if (!isMatch) return { message: 'Invalid credentials' };

    const token = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
      role: (user as any).role,
    });

    return {
      access_token: token,
    };
  }
  
}