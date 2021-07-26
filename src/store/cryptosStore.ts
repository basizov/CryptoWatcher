import api from "@/api";

const getAxiosParams = (cryptoNames: string[]) => {
  const params = new URLSearchParams();

  params.append('fsyms', cryptoNames.join(','));
  params.append('tsyms', 'USD');
  return (params);
}

export const  getCryptos = async (cryptoNames: string[]) => {
  const cryptos = await api.Cryptos.list(getAxiosParams(cryptoNames));

  return (cryptos);
}
