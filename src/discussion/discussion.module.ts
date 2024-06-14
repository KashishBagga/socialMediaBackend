import { Module } from "@nestjs/common";
import { DiscussionController } from "./discussion.controller";
import { DiscussionService } from "./discussion.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Discussion, DiscussionSchema } from "./discussion.schema";
import { AuthModule } from "src/auth/auth.module";
import { MulterModule } from "@nestjs/platform-express";

@Module({
    imports: [MongooseModule.forFeature([{name: Discussion.name, schema: DiscussionSchema}]), 
        AuthModule,  
        MulterModule.register({
            dest: './uploads', // Directory where files will be stored
        }),],
    controllers : [DiscussionController],
    providers : [DiscussionService],
    exports : [DiscussionService]
})
export class DiscussionModule {}