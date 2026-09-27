export interface Avion {
  name: string;
  year: number;
  model: string;
  motor: string;
  price: number;
}

export interface AvionDocument extends Avion, Document {}
