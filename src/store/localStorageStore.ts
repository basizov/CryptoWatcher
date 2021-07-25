import { ICrypto } from "@/models/ICrypto";

enum  ELocalStorageTypes {
  CRYPTOS_LIST = 'cryptosList'
}

export const getFromLocalStorage = () => {
  const jsonData = localStorage.getItem(ELocalStorageTypes.CRYPTOS_LIST);

  if (jsonData) {
    const cryptos: ICrypto[] = JSON.parse(jsonData);

    return (cryptos);
  }
  return [];
};

export const setToLocalStorage = (cryptos: ICrypto[]) => {
  localStorage.setItem(ELocalStorageTypes.CRYPTOS_LIST, JSON.stringify(cryptos));
};
