import { Module } from '@nestjs/common';
import { CreateUserController } from '@modules/users/context/createUser/createUser.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';
import { CreateUserUseCase } from './context/createUser/createUser.useCase';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), BcryptProvider],
  providers: [
    { provide: 'ENCRYPT_PROVIDER', useClass: BcryptProvider },
    CreateUserUseCase,
  ],
  controllers: [CreateUserController],
})
export class UsersModule {}
