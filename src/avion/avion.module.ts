import { Module } from '@nestjs/common';
import { AvionController } from './avion.controller.js';
import { AvionService } from './avion.service.js';
import {MongooseModule} from "@nestjs/mongoose";
import {AvionSchema} from "./schema/avion.schema.js";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Avion', schema: AvionSchema }]),
    ],
  controllers: [AvionController],
  providers: [AvionService]
})
export class AvionModule {}
