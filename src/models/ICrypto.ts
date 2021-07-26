export interface  ICrypto {
  id: string;
  name: string;
  price: string;
};

export interface  IUSD  {
  USD: number
}

export interface  IAPICrypto {
  [key: string]: IUSD
};
