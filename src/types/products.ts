export interface IProduct {
  createdAt: string;
  title: string;
  image: string;
  price: string;
  popular: boolean;
  new: boolean;
  inStock: boolean;
  contract: boolean;
  exclusive: boolean;
  sale: boolean;
  id: string;
  quantity?: number;
}

export interface IState {
  products: IProduct[];
  productsInCard: IProduct[];
}
