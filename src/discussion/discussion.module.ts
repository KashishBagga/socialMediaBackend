import { Module } from "@nestjs/common";
import { DiscussionController } from "./discussion.controller";
import { DiscussionService } from "./discussion.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Discussion, DiscussionSchema } from "./discussion.schema";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [MongooseModule.forFeature([{name: Discussion.name, schema: DiscussionSchema}]), AuthModule],
    controllers : [DiscussionController],
    providers : [DiscussionService],
    exports : [DiscussionService]
})
export class DiscussionModule {}