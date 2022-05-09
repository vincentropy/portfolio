/**
 * Remove some host prefixes such as www ww2 etc.
 * This helps create unique ids for organizations based on web links.
 */
export function cleanHost(host: string): string {
  let clean = host.replace(/^w+[1-9]*\./, '');
  // TODO: this would break for blog.com but. Could use official list of top-level domains.
  clean = clean.replace(/^blog\./, '');
  return clean;
}

/**
 * Grab the short hostname from a link. Excluding www. w3. etc.
 * This helps create unique ids for organizations based on web links.
 */
export function urlToHost(url: string): string {
  try {
    const host = new URL(url).host;
    return cleanHost(host);
  } catch (e) {
    return '';
  }
}
