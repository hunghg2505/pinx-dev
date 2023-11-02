async function getSeoDataFromLink(url: string) {
  try {
    if (!url) {
      throw new Error('URL is required');
    }

    if (url.includes('tiktok')) {
      const rest: any = await fetch(`https://www.tiktok.com/oembed?url=${new URL(url)}`).then(
        (res: any) => res.json(),
      );

      const formatMetaTiktok = [
        { property: 'og:site_name', content: rest?.provider_name || 'Tiktok' },
        { property: 'og:url', content: url || '' },
        { property: 'og:image', content: rest?.thumbnail_url || '' },
        { property: 'og:title', content: rest?.author_name || '' },
        { property: 'og:description', content: rest?.title || 'Tiktok' },
        { property: 'og:site_name', content: rest?.provider_name || 'Tiktok' },
      ];

      return formatMetaTiktok;
    }

    const rest = await fetch(new URL(url)).then((res: any) => res.text());

    const doc = new DOMParser().parseFromString(rest as string, 'text/html');

    const metas: any = doc.querySelectorAll('meta');

    const summary = [];

    for (const meta of metas) {
      const tempsum: any = {};
      const attributes = meta.getAttributeNames();
      for (const attribute of attributes) {
        tempsum[attribute] = meta.getAttribute(attribute);
      }
      summary.push(tempsum);
    }
    return summary;
  } catch {
    return [
      {
        property: 'og:url',
        content: url,
      },
    ];
  }
}

export { getSeoDataFromLink };
