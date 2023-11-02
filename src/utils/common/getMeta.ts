export const getMeta = (doc: any) => {
  const metas: any = doc.querySelectorAll('meta');

  const summary = [];

  for (const meta of metas) {
    const property = meta.getAttribute('property');
    const content = meta.getAttribute('content');

    if (property && content) {
      summary.push({
        property,
        content,
      });
    }
  }

  return summary;
};
