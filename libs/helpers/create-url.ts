export const createUrl = (url: string, nsp?: string) => {
  if (nsp == null) {
    return url;
  }

  const protocolIndex = url.indexOf('://');

  if (protocolIndex > -1) {
    const protocol = url.slice(0, protocolIndex);
    const path = [url.slice(protocolIndex), nsp].join('/').replaceAll('//', '/');

    url = protocol + path;
  }

  return url;
};
