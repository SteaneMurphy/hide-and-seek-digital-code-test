export const ROUTES = {
  HOME: "/",
  CART: "/cart",
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
