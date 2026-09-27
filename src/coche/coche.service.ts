import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Coche } from './interface/coche.interface.js';
import { InjectModel } from '@nestjs/mongoose';
import { CocheDto } from './dto/coche.dto.js';
import { InfoData } from './interface/info-data.interface.js';

@Injectable()
export class CocheService {
    constructor(
        @InjectModel('Coche')
        private cocheModel: Model<Coche>,
    ) {}

    async addCoche(cocheDto: CocheDto): Promise<any> {
        const coche = new this.cocheModel(cocheDto);
        return coche.save();
    }

    async getCoches(): Promise<Coche[]> {
        return this.cocheModel.find();
    }
    async getCochesPaginated(
        page: number,
        limit: number,
    ): Promise<{ data: Coche[]; info: InfoData }> {
        const skip = (page - 1) * limit;

        const coches = await this.cocheModel.find().skip(skip).limit(limit).exec();

        const total = await this.cocheModel.countDocuments();

        const totalPages = Math.ceil(total / limit);
        return {
            data: coches,
            info: {
                total,
                pageSize: limit,
                page,
                totalPages: totalPages,
            },
        };
    }

    async getCoche(idCoche: string): Promise<Coche | null> {
        return this.cocheModel.findById(idCoche);
    }

    async getCochesByTitle(
        name: string,
        pagee: number,
        limitt: number,
    ): Promise<{ data: Coche[]; info: InfoData }> {
        const page: number = pagee;
        const limit: number = limitt;
        const skip = (page - 1) * limit;
        const regex = new RegExp(name, 'i');

        const coches = await this.cocheModel
            .find({ title: { $regex: regex } })
            .skip(skip)
            .limit(limit)
            .exec();

        const total = await this.cocheModel.countDocuments();

        const totalPages = Math.ceil(total / limit);
        return {
            data: coches,
            info: {
                total,
                pageSize: limit,
                page,
                totalPages: totalPages,
            },
        };
    }

    async updateCoche(
        id: string,
        cocheDto: Partial<CocheDto>,
    ): Promise<Coche | null> {
        return this.cocheModel.findByIdAndUpdate(id, cocheDto, { new: true });
    }
    async updatePatchCoche(
        id: string,
        cocheDto: Partial<CocheDto>,
    ): Promise<Coche | null> {
        return this.cocheModel.findByIdAndUpdate(
            id,
            { $set: cocheDto },
            { new: true },
        );
    }

    async deleteCoche(idCoche: string): Promise<Coche | null> {
        //return this.cocheModel.findByIdAndDelete(idCoche);
        return this.cocheModel.findById(idCoche);
    }


}
