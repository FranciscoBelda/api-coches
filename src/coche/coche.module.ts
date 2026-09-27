import { Module } from '@nestjs/common';
import { CocheController } from './coche.controller.js';
import { CocheService } from './coche.service.js';
import {MongooseModule} from "@nestjs/mongoose";
import {CocheSchema} from "./schema/coche.schema.js";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Coche', schema: CocheSchema }]),
    ],
  controllers: [CocheController],
  providers: [CocheService]
})
export class CocheModule {}
