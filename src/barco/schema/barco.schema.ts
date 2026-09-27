import { Schema } from 'mongoose';
import {BarcoDocument} from '../interface/barco.interface.js';

export const BarcoSchema: Schema = new Schema<BarcoDocument>(
  {
    name: { type: String, required: true },
    year: { type: Number, required: true },
    model: { type: String, required: true },
    motor: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { versionKey: false, timestamps: true },
);
