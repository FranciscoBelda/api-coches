import { Schema } from 'mongoose';
import {CocheDocument} from '../interface/coche.interface.js';

export const CocheSchema: Schema = new Schema<CocheDocument>(
  {
    name: { type: String, required: true },
    year: { type: Number, required: true },
    model: { type: String, required: true },
    motor: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { versionKey: false, timestamps: true },
);
