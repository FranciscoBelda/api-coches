import { Schema } from 'mongoose';
import {AvionDocument} from '../interface/avion.interface.js';

export const AvionSchema: Schema = new Schema<AvionDocument>(
  {
    name: { type: String, required: true },
    year: { type: Number, required: true },
    model: { type: String, required: true },
    motor: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { versionKey: false, timestamps: true },
);
