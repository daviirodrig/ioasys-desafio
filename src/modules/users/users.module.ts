import { Module } from '@nestjs/common';
import { CreateUserController } from '@modules/users/context/createUser/createUser.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';
import { CreateUserUseCase } from './context/createUser/createUser.useCase';
import { UpdateUserController } from './context/updateUser/updateUser.controller';
import { UpdateUserUseCase } from './context/updateUser/updateUser.useCase';
import { DeleteUserUseCase } from './context/deleteUser/deleteUser.useCase';
import { DeleteUserController } from './context/deleteUser/deleteUser.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), BcryptProvider],
  providers: [
    { provide: 'ENCRYPT_PROVIDER', useClass: BcryptProvider },
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
  controllers: [
    CreateUserController,
    UpdateUserController,
    DeleteUserController,
  ],
})
export class UsersModule {}
