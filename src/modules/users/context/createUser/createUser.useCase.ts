import { UserRepository } from '@modules/users/repository/user.repository';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserRequestBodyDTO } from '@shared/dtos/user/createUserRequestBody.dto';
import { User } from '@shared/entities/user.entity';
import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
    @Inject('ENCRYPT_PROVIDER') private encryption: BcryptProvider,
  ) {}

  async execute({
    email,
    username,
    password,
  }: CreateUserRequestBodyDTO): Promise<User> {
    const savedUser = await this.userRepo.findByEmail(email);

    if (savedUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPass = this.encryption.createHash(password);

    const user = await this.userRepo.createUser({
      username: username,
      email: email,
      passwordHash: hashedPass,
    });

    return user;
  }
}
