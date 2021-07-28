const cryptosHandlers = new Map<string, Array<(value: number) => void>>();
const socket = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${process.env.VUE_APP_API_KEY}`);
const AGGREGATE_INDEX = '5';

interface ISocketData {
  TYPE: string;
  FROMSYMBOL: string;
  PRICE?: number;
}

interface ISocketMessage {
  action: string;
  subs: string[];
}

socket.addEventListener('message', (e: MessageEvent<string>) => {
  const {
    TYPE: type,
    FROMSYMBOL: currentCrypto,
    PRICE: price,
  } = JSON.parse(e.data) as ISocketData;

  if (type === AGGREGATE_INDEX) {
    const handlers = cryptosHandlers.get(currentCrypto) || [];

    if (price) {
      handlers.forEach((fn) => fn(price));
    }
  }
});

const sendToWebSocket = (message: ISocketMessage) => {
  const stringifyMessage = JSON.stringify(message);

  if (socket.readyState === WebSocket.OPEN) {
    socket.send(stringifyMessage);
  } else {
    socket.addEventListener('open', () => {
      socket.send(stringifyMessage);
    }, { once: true });
  }
};

const subscribeToCryptoOnWebSocket = (crypto: string, wallet = 'USD') => {
  const message: ISocketMessage = {
    action: 'SubAdd',
    subs: [`5~CCCAGG~${crypto}~${wallet}`]
  };

  sendToWebSocket(message);
}

const unsubscribeFromCryptoOnWebSocket = (crypto: string, wallet = 'USD') => {
  const message: ISocketMessage = {
    action: 'SubRemove',
    subs: [`5~CCCAGG~${crypto}~${wallet}`]
  };

  sendToWebSocket(message);
}

export const  subscribeToCrypto = (crypto: string, cb: (value: number) => void) => {
  const subscribers = cryptosHandlers.get(crypto) || [];

  cryptosHandlers.set(crypto, [...subscribers, cb]);
  subscribeToCryptoOnWebSocket(crypto);
};

export const  unsubscribeFromCrypto = (crypto: string) => {
  cryptosHandlers.delete(crypto);
  unsubscribeFromCryptoOnWebSocket(crypto);
};
