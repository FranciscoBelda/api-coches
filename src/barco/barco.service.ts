import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Barco } from './interface/barco.interface.js';
import { InjectModel } from '@nestjs/mongoose';
import { BarcoDto } from './dto/barco.dto.js';
import { InfoData } from './interface/info-data.interface.js';

@Injectable()
export class BarcoService {
    constructor(
        @InjectModel('Barco')
        private barcoModel: Model<Barco>,
    ) {}

    async addBarco(barcoDto: BarcoDto): Promise<any> {
        const barco = new this.barcoModel(barcoDto);
        return barco.save();
    }

    async getBarcos(): Promise<Barco[]> {
        return this.barcoModel.find();
    }
    async getBarcosPaginated(
        page: number,
        limit: number,
    ): Promise<{ data: Barco[]; info: InfoData }> {
        const skip = (page - 1) * limit;

        const barcos = await this.barcoModel.find().skip(skip).limit(limit).exec();

        const total = await this.barcoModel.countDocuments();

        const totalPages = Math.ceil(total / limit);
        return {
            data: barcos,
            info: {
                total,
                pageSize: limit,
                page,
                totalPages: totalPages,
            },
        };
    }

    async getBarco(idBarco: string): Promise<Barco | null> {
        return this.barcoModel.findById(idBarco);
    }

    async getBarcosByTitle(
        name: string,
        pagee: number,
        limitt: number,
    ): Promise<{ data: Barco[]; info: InfoData }> {
        const page: number = pagee;
        const limit: number = limitt;
        const skip = (page - 1) * limit;
        const regex = new RegExp(name, 'i');

        const barcos = await this.barcoModel
            .find({ title: { $regex: regex } })
            .skip(skip)
            .limit(limit)
            .exec();

        const total = await this.barcoModel.countDocuments();

        const totalPages = Math.ceil(total / limit);
        return {
            data: barcos,
            info: {
                total,
                pageSize: limit,
                page,
                totalPages: totalPages,
            },
        };
    }

    async updateBarco(
        id: string,
        barcoDto: Partial<BarcoDto>,
    ): Promise<Barco | null> {
        return this.barcoModel.findByIdAndUpdate(id, barcoDto, { new: true });
    }
    async updatePatchBarco(
        id: string,
        barcoDto: Partial<BarcoDto>,
    ): Promise<Barco | null> {
        return this.barcoModel.findByIdAndUpdate(
            id,
            { $set: barcoDto },
            { new: true },
        );
    }

    async deleteBarco(idBarco: string): Promise<Barco | null> {
        //return this.barcoModel.findByIdAndDelete(idBarco);
        return this.barcoModel.findById(idBarco);
    }

}
