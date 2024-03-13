export function parseLinkHeader(linkHeader: string = ''): {
  first?: string,
  prev?: string,
  next?: string,
} {
  if (!linkHeader) return {}
  const links = linkHeader.split(",")
  const parsedLinks = {};
  links.forEach((link: string) => {
    const url = link.match(/<(.*)>/)?.[1];
    const rel = link.match(/rel="(.*)"/)?.[1];
    parsedLinks[rel] = url;
  })
  return parsedLinks
}