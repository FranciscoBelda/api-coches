import { Module } from '@nestjs/common';
import { BarcoController } from './barco.controller.js';
import { BarcoService } from './barco.service.js';
import {MongooseModule} from "@nestjs/mongoose";
import {BarcoSchema} from "./schema/barco.schema.js";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Barco', schema: BarcoSchema }]),
    ],
  controllers: [BarcoController],
  providers: [BarcoService]
})
export class BarcoModule {}
