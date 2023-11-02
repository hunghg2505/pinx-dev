export function validateHTML(htmlString: any) {
  const testHtml = /<(?:"[^"]"["']|'[^']'["']|[^"'>])+>/g.test(htmlString);
  return testHtml;
}
