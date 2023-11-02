export const getQueryFromUrl = () => {
  try {
    if (!location.search) {
      return {};
    }

    const search = location.search.slice(1);
    return JSON.parse(
      '{"' +
        decodeURI(search).replaceAll('"', '\\"').replaceAll('&', '","').replaceAll('=', '":"') +
        '"}',
    );
  } catch {
    return {};
  }
};
