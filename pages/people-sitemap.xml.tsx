import { API_PATH } from '@api/constant';
import { PREFIX_API_PIST } from '@api/request';
import { ICustomerInfo } from '@components/Post/service';

function generateSiteMap(users: ICustomerInfo[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${users
        .map((item) => {
          return `
            <url>
              <loc>${`https://pinex.vn/profile/${item?.id}`}</loc>
            </url>
            <url>
              <loc>${`https://pinex.vn/en/profile/${item?.id}`}</loc>
            </url>`;
        })
        .join('')}
   </urlset>
  `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: any) {
  // We make an API call to gather the URLs for our site
  const response: any = await (await fetch(`${PREFIX_API_PIST}${API_PATH.KOL}/?size=9999`)).json();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(response?.data?.list);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
