import { UserRepository } from '@modules/users/repository/user.repository';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@shared/entities/user.entity';
import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
    @Inject('ENCRYPT_PROVIDER') private encryption: BcryptProvider,
    private jwtService: JwtService,
  ) {}

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepo.findByEmail(email);
    let hash = user?.passwordHash;

    if (!user) {
      hash = this.encryption.createHash(Math.random().toString(36));
      throw new UnauthorizedException();
      // Mitigate timing attack to enumerate emails
    }

    const passEquals = await this.encryption.compareHash(password, hash);
    if (user && passEquals) {
      return user;
    }
    return null;
  }
}
