import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Sizes } from '@shared/enum/sizes.enum';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateProductRequestBodyDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(1)
  price: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(1)
  storage: number;

  @ApiProperty({ isArray: true, enum: Sizes })
  @IsOptional()
  @IsArray()
  @IsEnum(Sizes, { each: true })
  @ArrayMinSize(1)
  sizes: Sizes[];
}
