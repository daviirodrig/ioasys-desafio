import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';
import { ProductsModule } from '@modules/products/products.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, AuthModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
