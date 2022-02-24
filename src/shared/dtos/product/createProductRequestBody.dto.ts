import { ApiProperty } from '@nestjs/swagger';
import { Sizes } from '@shared/enum/sizes.enum';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

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

  @ApiProperty({ isArray: true, enum: Sizes })
  @IsNotEmpty()
  @IsArray()
  @IsEnum(Sizes, { each: true })
  @ArrayMinSize(1)
  sizes: Sizes[];
}
