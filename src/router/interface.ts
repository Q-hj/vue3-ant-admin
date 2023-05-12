export interface Route {
  id: number;
  pid: number | null;
  name: string;
  path?: string;
  icon?: string;
  redirect?: string;
}
