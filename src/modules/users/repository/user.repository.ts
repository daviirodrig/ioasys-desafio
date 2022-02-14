import { CreateUserDTO } from '@shared/dtos/user/createUser.dto';
import { UpdateUserDTO } from '@shared/dtos/user/updateUser.dto';
import { User } from '@shared/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({ email });
    return user;
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const user = this.create(createUserDTO);

    return this.save(user);
  }

  async updateUser(id: string, updateUserDTO: UpdateUserDTO): Promise<User> {
    return this.save({ id: id, ...updateUserDTO });
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.findById(id);

    return this.softRemove(user);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.findOne(id);
  }
}
