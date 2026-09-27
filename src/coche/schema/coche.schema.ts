import { Schema } from 'mongoose';
import { AnimeDocument } from '../interface/anime.interface';

export const AnimeSchema: Schema = new Schema<AnimeDocument>(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { versionKey: false, timestamps: true },
);
