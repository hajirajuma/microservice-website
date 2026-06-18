import {IsString, IsNumber, IsNotEmpty,Min} from 'class-validator';
export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string | undefined;
  
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    price: number | undefined;

    imageUrl: string | undefined;
    imageBase64?: string | undefined;
  

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    quantity: number | undefined;

    @IsString()
    @IsNotEmpty()
    description: string | undefined;
  


  }