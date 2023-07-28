/* eslint-disable unicorn/prefer-module */
// import { parse } from 'node-html-parser';

// import { getMeta } from '@utils/common';

// @ts-ignore
// const nodeFetch = require('node-fetch');

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    // Process a POST request
    // if (!req.query?.url) {
    //   throw new Error('URL is required');
    // }
    // if (req.query?.url.includes('tiktok')) {
    //   const rest = await nodeFetch(`https://www.tiktok.com/oembed?url=${new URL(req.query?.url)}`, {
    //     mode: 'no-cors',
    //   }).then((res: any) => res.json());
    //   const formatMetaTiktok = [
    //     { property: 'og:site_name', content: rest?.provider_name || 'Tiktok' },
    //     { property: 'og:url', content: req.query?.url || '' },
    //     { property: 'og:image', content: rest?.thumbnail_url || '' },
    //     { property: 'og:title', content: rest?.author_name || '' },
    //     { property: 'og:description', content: rest?.title || 'Tiktok' },
    //     { property: 'og:site_name', content: rest?.provider_name || 'Tiktok' },
    //     { property: 'og:site_name', content: rest?.provider_name || 'Tiktok' },
    //   ];
    //   res.status(200).json({ message: 'SUCCESS', meta: formatMetaTiktok });
    // }
    // const rest = await nodeFetch(new URL(req.query?.url), { mode: 'no-cors' }).then((res: any) =>
    //   res.text(),
    // );
    // const root = parse(rest);
    // const meta = getMeta(root);
    // res.status(200).json({ message: 'SUCCESS', meta });
  } else {
    // Handle any other HTTP method
    res.status(401).json({ message: 'FAILED', meta: [] });
  }
}
