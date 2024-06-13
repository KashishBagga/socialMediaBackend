import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "src/users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";


@Module({
    imports: [
      PassportModule,
        JwtModule.register({
          secret: 'secretkey', // Replace with your secret key
          signOptions: { expiresIn: '365d' }, // Adjust expiresIn as needed
        }),
        UsersModule
      ],
    controllers : [AuthController],
    providers : [AuthService, JwtStrategy],
    exports: [AuthService]
})

export class AuthModule {}