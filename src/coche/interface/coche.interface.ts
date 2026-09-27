export interface Anime {
  title: string;
  image: string;
  year: number;
  genre: string;
  author: string;
  price: number;
}

export interface AnimeDocument extends Anime, Document {}
