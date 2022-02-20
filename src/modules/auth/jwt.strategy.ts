import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import config from '@config/env';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRepository } from '@modules/admins/repository/admins.repository';
import { UserRepository } from '@modules/users/repository/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
    @InjectRepository(AdminRepository) private adminRepo: AdminRepository,
  ) {
    super({
      jwtFromRequest: (req) => {
        if (!req || !req.cookies) return null;
        return req.cookies['access_token'];
      },
      ignoreExpiration: false,
      secretOrKey: config.jwtSecret,
    });
  }

  async validate(payload) {
    const user = await this.userRepo.findById(payload.sub);
    const admin = await this.adminRepo.findByUser(user);

    if (!user) {
      // User deleted account and jwt didn't expire
      return null;
    }

    if (admin) {
      return {
        id: payload.sub,
        email: payload.email,
        isAdmin: true,
        adminId: admin.id,
      };
    }

    return {
      id: payload.sub,
      email: payload.email,
      isAdmin: false,
    };
  }
}
