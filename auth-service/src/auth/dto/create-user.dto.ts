import { IsEmail,IsString,MinLength} from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string | undefined;
  
    @IsString()
    @MinLength(8)
    password: string | undefined;

}