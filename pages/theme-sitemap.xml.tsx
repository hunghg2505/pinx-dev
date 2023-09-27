import { NextPageContext } from 'next';

import { API_PATH } from '@api/constant';
import { PREFIX_API_COMMUNITY, PREFIX_API_PIST } from '@api/request';
import { getHostName, slugify } from '@utils/common';

function generateSiteMap(host: string, listSlugs: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!--We manually set the two URLs we know already-->
      ${listSlugs
        .map((slug) => {
          return `
            <url>
              <loc>${host}/${slug}</loc>
            </url>
          `;
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
  const listSlug: string[] = [];
  const dataTheme: any = await (
    await fetch(`${PREFIX_API_PIST}${API_PATH.PUBLIC_ALL_THEME}`)
  ).json();

  for await (const item of dataTheme?.data) {
    const data: any = await (
      await fetch(`${PREFIX_API_COMMUNITY}${API_PATH.PUBLIC_GET_THEME_DETAIL_V2(item?.code)}`)
    ).json();

    const slug = 'chu-de/' + data?.data?.code?.toLowerCase() + '-' + slugify(data?.data?.name);
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
