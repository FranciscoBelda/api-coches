export interface Coche {
  name: string;
  year: number;
  model: string;
  motor: string;
  price: number;
}

export interface CocheDocument extends Coche, Document {}
