import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
// import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from 'src/modules/users/users.schema';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  // async validateUser(email: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOneByEmail(email);
  //   if (user && bcrypt.compareSync(pass, user.password)) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(user: any) {
    console.log("user", user)
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    const newUser = await this.usersService.create({
      ...user,
      password: hashedPassword,
    });
    return user;
  }
}
