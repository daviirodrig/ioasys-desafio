import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray } from 'class-validator';

export class CreateOrderRequestBodyDTO {
  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => String)
  products: string[];
}
