import { footerNav, isNavGroup, primaryNav, type NavItem } from './navigation';

/** Every internal href referenced by the header navigation. */
export function getPrimaryNavHrefs(): string[] {
  const hrefs: string[] = [];
  for (const item of primaryNav as NavItem[]) {
    if (isNavGroup(item)) {
      for (const link of item.items) {
        if (!link.external) hrefs.push(link.href);
      }
    } else if (!item.external) {
      hrefs.push(item.href);
    }
  }
  return hrefs;
}

/** Every internal href referenced by the footer navigation. */
export function getFooterNavHrefs(): string[] {
  return Object.values(footerNav)
    .flat()
    .map((link) => link.href);
}
