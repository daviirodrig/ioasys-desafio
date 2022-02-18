import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateProductRequestBodyDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  storage: number;
}
