import api from "@/api";

export const  getCryptos = async (cryptoNames: string[]) => {
  const params = new URLSearchParams();

  params.append('fsyms', cryptoNames.join(','));
  params.append('tsyms', 'USD');
  const cryptos = await api.Cryptos.list(params);

  console.log(cryptos);
  return (cryptos);
}
