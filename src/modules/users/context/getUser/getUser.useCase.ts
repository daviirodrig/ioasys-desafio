import { UserRepository } from '@modules/users/repository/user.repository';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GetUserUseCase {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
  ) {}
  private readonly logger = new Logger(GetUserUseCase.name);

  async execute(id: string) {
    const user = await this.userRepo.findById(id);

    if (!user) {
      this.logger.log(`Get failed: ${id} does not exists`);
      throw new NotFoundException('id does not exists');
    }

    return user;
  }
}
