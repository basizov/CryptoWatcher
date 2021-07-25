import { IUrlParams, UrlParamsType } from "@/models/IUrlParams";

export const getUrlParams = () => {
  const urlSearcgParams = new URLSearchParams(window.location.search);
  const urlEntries = urlSearcgParams.entries();
  const urlParams = Object.fromEntries(urlEntries) as UrlParamsType;

  return {
    ...urlParams
  }
};

export const setUrlParams = (params: IUrlParams) => {
  const { filter, page } = params;

  window.history.pushState(
    null,
    document.title,
    `${window.location.pathname}?filter=${filter}&page=${page}`
  );
};
