import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CocheDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsString()
  motor: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
