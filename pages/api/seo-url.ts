/* eslint-disable unicorn/prefer-module */
import { parse } from 'node-html-parser';

import { getMeta } from '@utils/common';

// @ts-ignore
const nodeFetch = require('node-fetch');

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    // Process a POST request

    if (!req.query?.url) {
      throw new Error('URL is required');
    }

    const rest = await nodeFetch(new URL(req.query?.url), { mode: 'no-cors' }).then((res: any) =>
      res.text(),
    );
    const root = parse(rest);

    const meta = getMeta(root);

    res.status(200).json({ message: 'SUCCESS', meta });
  } else {
    // Handle any other HTTP method
    res.status(401).json({ message: 'FAILED', meta: [] });
  }
}
