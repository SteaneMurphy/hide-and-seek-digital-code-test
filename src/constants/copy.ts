export const SITE_NAME = "BookHaven";

export const HEADER = {
  CART_LINK: "Cart",
  CART_ARIA_LABEL: "View shopping cart",
} as const;

export const BUTTONS = {
  ADD_TO_CART: "Add to Cart",
  REMOVE: "Remove",
} as const;

export const CART_PAGE = {
  TITLE: "Your Cart",
  EMPTY: "Your cart is empty.",
  EMPTY_CTA: "Continue shopping",
  TOTAL: "Total",
} as const;

export const ERROR_PAGE = {
  TITLE: "Something went wrong",
  MESSAGE: "We hit an unexpected error loading this page. Please try again.",
  RETRY: "Try again",
} as const;
