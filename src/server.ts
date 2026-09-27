import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { Server } from 'http';

let cachedServer: Server;

async function bootstrap() {
    if (!cachedServer) {
        const expressApp = express();
        const nestApp = await NestFactory.create(
            AppModule,
            new ExpressAdapter(expressApp),
        );

        nestApp.enableCors();
        await nestApp.init();
        cachedServer = expressApp;
    }
    return cachedServer;
}

// Export the handler for Vercel Serverless
export default async function handler(req: any, res: any) {
    const server = await bootstrap();
    return server(req, res);
}
