export function isActivePath(pathname: string, href: string): boolean {
  return href === "/projects"
    ? pathname === href || pathname.startsWith(`${href}/`)
    : pathname === href;
}