import { UserRepository } from '@modules/users/repository/user.repository';
import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
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

  private readonly logger = new Logger(CreateUserUseCase.name);

  async execute({
    email,
    displayName,
    password,
  }: CreateUserRequestBodyDTO): Promise<User> {
    const savedUser = await this.userRepo.findByEmail(email);

    if (savedUser) {
      this.logger.log(`Creation failed: ${email} already exists`);
      throw new ConflictException(`Creation failed: ${email} already exists`);
    }

    const hashedPass = this.encryption.createHash(password);

    const user = await this.userRepo.createUser({
      displayName: displayName,
      email: email,
      passwordHash: hashedPass,
    });

    this.logger.log(`Creation success: ${email}`);

    return user;
  }
}
