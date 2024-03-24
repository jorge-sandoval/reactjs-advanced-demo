export default function cssClass(...classes: unknown[]) {
  return classes.filter((c) => typeof c === 'string').join(' ');
}