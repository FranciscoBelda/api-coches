export interface Barco {
  name: string;
  year: number;
  model: string;
  motor: string;
  price: number;
}

export interface BarcoDocument extends Barco, Document {}
