import { UserRepository } from '@modules/users/repository/user.repository';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserRequestBodyDTO } from '@shared/dtos/user/updateUserRequestBody.dto';
import { User } from '@shared/entities/user.entity';
import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
    @Inject('ENCRYPT_PROVIDER') private encryption: BcryptProvider,
  ) {}
  private readonly logger = new Logger(UpdateUserUseCase.name);

  async execute(
    id: string,
    { email, displayName, password }: UpdateUserRequestBodyDTO,
  ): Promise<User> {
    const savedUser = await this.userRepo.findById(id);

    if (!savedUser) {
      this.logger.log(`Update failed: ${id} does not exists`);
      throw new NotFoundException('id does not exists');
    }
    if (password) {
      const passwordHash = this.encryption.createHash(password);
      await this.userRepo.updateUser(id, {
        email,
        displayName,
        passwordHash,
      });
      const updatedUser = await this.userRepo.findById(id);
      return updatedUser;
    } else {
      await this.userRepo.updateUser(id, {
        email,
        displayName,
      });
      const updatedUser = await this.userRepo.findById(id);
      return updatedUser;
    }
  }
}
