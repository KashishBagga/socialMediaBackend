import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { DiscussionModule } from './discussion/discussion.module';

@Module({
  imports: [AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/mydatabase'),
    UsersModule,
    DiscussionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
