import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CocheModule } from './coche/coche.module.js';
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {AvionModule} from "./avion/avion.module.js";
import {BarcoModule} from "./barco/barco.module.js";

@Module({
  imports: [
      ConfigModule.forRoot(),
      MongooseModule.forRoot(process.env.URI as string),
      CocheModule,
      AvionModule,
      BarcoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
