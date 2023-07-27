export const getMetaData = async (url: string) => {
  try {
    const response: any = await fetch(`/api/seo-url?url=${url}`.trim()).then((r) => r.json());

    return response?.meta;
  } catch {}
};
