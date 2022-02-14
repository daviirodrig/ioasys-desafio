import { UserRepository } from '@modules/users/repository/user.repository';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
  ) {}
  private readonly logger = new Logger(DeleteUserUseCase.name);

  async execute(id: string) {
    const savedUser = await this.userRepo.findById(id);

    if (!savedUser) {
      this.logger.log(`Delete failed: ${id} does not exists`);
      throw new NotFoundException('id does not exists');
    }

    this.userRepo.deleteUser(id);
    this.logger.log(`Soft-deleted user ${id}`);
  }
}
