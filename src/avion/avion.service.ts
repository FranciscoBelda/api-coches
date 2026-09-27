import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Avion } from './interface/avion.interface.js';
import { InjectModel } from '@nestjs/mongoose';
import { AvionDto } from './dto/avion.dto.js';
import { InfoData } from './interface/info-data.interface.js';

@Injectable()
export class AvionService {
    constructor(
        @InjectModel('Avion')
        private avionModel: Model<Avion>,
    ) {}

    async addAvion(avionDto: AvionDto): Promise<any> {
        const avion = new this.avionModel(avionDto);
        return avion.save();
    }

    async getAvions(): Promise<Avion[]> {
        return this.avionModel.find();
    }
    async getAvionsPaginated(
        page: number,
        limit: number,
    ): Promise<{ data: Avion[]; info: InfoData }> {
        const skip = (page - 1) * limit;

        const avions = await this.avionModel.find().skip(skip).limit(limit).exec();

        const total = await this.avionModel.countDocuments();

        const totalPages = Math.ceil(total / limit);
        return {
            data: avions,
            info: {
                total,
                pageSize: limit,
                page,
                totalPages: totalPages,
            },
        };
    }

    async getAvion(idAvion: string): Promise<Avion | null> {
        return this.avionModel.findById(idAvion);
    }

    async getAvionsByTitle(
        name: string,
        pagee: number,
        limitt: number,
    ): Promise<{ data: Avion[]; info: InfoData }> {
        const page: number = pagee;
        const limit: number = limitt;
        const skip = (page - 1) * limit;
        const regex = new RegExp(name, 'i');

        const avions = await this.avionModel
            .find({ title: { $regex: regex } })
            .skip(skip)
            .limit(limit)
            .exec();

        const total = await this.avionModel.countDocuments();

        const totalPages = Math.ceil(total / limit);
        return {
            data: avions,
            info: {
                total,
                pageSize: limit,
                page,
                totalPages: totalPages,
            },
        };
    }

    async updateAvion(
        id: string,
        avionDto: Partial<AvionDto>,
    ): Promise<Avion | null> {
        return this.avionModel.findByIdAndUpdate(id, avionDto, { new: true });
    }
    async updatePatchAvion(
        id: string,
        avionDto: Partial<AvionDto>,
    ): Promise<Avion | null> {
        return this.avionModel.findByIdAndUpdate(
            id,
            { $set: avionDto },
            { new: true },
        );
    }

    async deleteAvion(idAvion: string): Promise<Avion | null> {
        //return this.avionModel.findByIdAndDelete(idAvion);
        return this.avionModel.findById(idAvion);
    }

}
