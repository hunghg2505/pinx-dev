import { NextPageContext } from 'next';

import { fetchAllPostFromServer } from '@components/Post/service';
import { formatMsgPost, getHostName } from '@utils/common';

function generateSiteMap(host: string, listSlug: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${listSlug
        .map((item) => {
          return `
            <url>
              <loc>${host}/${item}</loc>
            </url>`;
        })
        .join('')}
   </urlset>
  `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ req, res }: NextPageContext) {
  if (!req || !res) {
    return;
  }

  const host = getHostName(req.headers);
  // We make an API call to gather the URLs for our site
  const response: any = await fetchAllPostFromServer();
  const listSlug: string[] = [];

  for await (const item of response.data) {
    const slug = formatMsgPost(item.slug);

    if (!item.slug.includes('&')) {
      listSlug.push(slug);
    }
  }

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(host, listSlug);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
