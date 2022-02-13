import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@modules/users/users.module';
import config from '@config/env';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.dbHost,
      port: config.dbPort,
      database: config.dbName,
      username: config.dbUser,
      password: config.dbPass,
      entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
