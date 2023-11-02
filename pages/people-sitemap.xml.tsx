import { NextPageContext } from 'next';

import { KOL } from '@api/constant';
import { PREFIX_API_IP_PIST } from '@api/request';
import { getHostName } from '@utils/common';
import { PROFILE_V2 } from 'src/constant/route';

function generateSiteMap(host: string, listSlug: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${listSlug
        .map((slug) => {
          return `
            <url>
              <loc>${host}${slug}</loc>
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
  const response: any = await (await fetch(`${PREFIX_API_IP_PIST}${KOL}/?size=9999`)).json();

  const listSlug: string[] = [];
  for await (const item of response?.data?.list) {
    const slug = PROFILE_V2(item?.displayName, item?.id);

    listSlug.push(slug);
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
