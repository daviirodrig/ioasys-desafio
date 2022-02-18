import { UserRepository } from '@modules/users/repository/user.repository';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStratey } from './local.strategy';
import config from '@config/env';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: config.jwtSecret,
      signOptions: { expiresIn: '1h' },
    }),
    BcryptProvider,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    { provide: 'ENCRYPT_PROVIDER', useClass: BcryptProvider },
    AuthService,
    LocalStratey,
    JwtStrategy,
  ],
})
export class AuthModule {}
