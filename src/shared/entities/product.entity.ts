import { ApiProperty } from '@nestjs/swagger';
import { Sizes } from '@shared/enum/sizes.enum';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Admin } from './admin.entity';

@Entity('products')
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: () => Admin })
  @ManyToOne(() => Admin)
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  price: number;

  @ApiProperty()
  @Column()
  storage: number;

  @ApiProperty()
  @Column('text', { array: true })
  sizes: Sizes[];

  @CreateDateColumn({ name: 'created_at' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  @Exclude()
  deletedAt: Date;
}
