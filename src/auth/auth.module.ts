import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "src/modules/users/users.module";

@Module({
    imports: [
        JwtModule.register({
          secret: 'YOUR_SECRET_KEY', // Replace with your secret key
          signOptions: { expiresIn: '365d' }, // Adjust expiresIn as needed
        }),
        UsersModule
      ],
    controllers : [AuthController],
    providers : [AuthService],
    exports: [AuthService]
})

export class AuthModule {}