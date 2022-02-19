import { Admin } from '@shared/entities/admin.entity';
import { User } from '@shared/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
  async findByUser(id: User): Promise<Admin | undefined> {
    const admin = await this.findOne({ user: id });

    return admin;
  }
}
