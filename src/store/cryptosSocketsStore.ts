import { getCryptos } from "./cryptosAxiosStore";

const cryptosHandlers = new Map<string, Array<(value: number) => void>>();

const loadCryptos = async () => {
  if (cryptosHandlers.size !== 0) {
    const names = [...cryptosHandlers.keys()].map((c) => c);
    const crypros = await getCryptos(names);

    Object.entries(crypros).forEach(([key, value]) => {
      const handlers = cryptosHandlers.get(key) ?? [];

      handlers.forEach((fn) => fn(value.USD));
    });
  }
};

export const  subscribeToCrypto = (crypto: string, cb: (value: number) => void) => {
  const subscribers = cryptosHandlers.get(crypto) || [];

  cryptosHandlers.set(crypto, [...subscribers, cb]);
};

export const  unsubscribeFromCrypto = (crypto: string) => {
  cryptosHandlers.delete(crypto);
};

setInterval(loadCryptos, 3000);
