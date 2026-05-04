export type Book = {
  id: number;
  title: string;
  author: string;
  price: number;
  cover: string;
  description: string;
  isbn: string;
};

export const books: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 10.0,
    cover: "https://m.media-amazon.com/images/I/51Bm6JUCscL._SY522_.jpg",
    description:
      "A classic novel set in the Roaring Twenties, exploring themes of wealth, class, and the elusive American Dream through the mysterious Jay Gatsby.",
    isbn: "978-0743273565",
  },
  {
    id: 2,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    price: 12.0,
    cover: "https://m.media-amazon.com/images/I/61cfToP7pgL._SL1500_.jpg",
    description:
      "Holden Caulfield, a cynical teenager, navigates New York City after being expelled from prep school, searching for authenticity in a 'phony' world.",
    isbn: "978-0316769488",
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 15.0,
    cover: "https://m.media-amazon.com/images/I/51lVvSDLQJL._SY522_.jpg",
    description:
      "A profound exploration of racial injustice and the loss of innocence in the American South, seen through the eyes of young Scout Finch.",
    isbn: "978-0061120084",
  },
  {
    id: 4,
    title: "1984",
    author: "George Orwell",
    price: 11.5,
    cover: "https://m.media-amazon.com/images/I/61ZewDE3beL._SL1200_.jpg",
    description:
      "A chilling dystopian vision of a totalitarian future where Big Brother is always watching and independent thought is a crime.",
    isbn: "978-0451524935",
  },
  {
    id: 5,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: 9.0,
    cover: "https://m.media-amazon.com/images/I/71Q1tPupKjL._SL1500_.jpg",
    description:
      "Elizabeth Bennet navigates the complexities of social status, marriage, and family in 19th-century England, eventually finding love with the proud Mr. Darcy.",
    isbn: "978-0141439518",
  },
  {
    id: 6,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    price: 14.0,
    cover: "https://m.media-amazon.com/images/I/71jD4jMityL._SL1500_.jpg",
    description:
      "Bilbo Baggins, a home-loving hobbit, is swept into an epic adventure with dwarves and a wizard to reclaim a lost treasure from a fearsome dragon.",
    isbn: "978-0547928227",
  },
  {
    id: 7,
    title: "Brave New World",
    author: "Aldous Huxley",
    price: 13.0,
    cover: "https://m.media-amazon.com/images/I/81zE42gT3xL._SL1500_.jpg",
    description:
      "A provocative look at a future society where technology and conditioning have eliminated pain and conflict, but at the cost of freedom and individuality.",
    isbn: "978-0060850524",
  },
  {
    id: 8,
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    price: 10.5,
    cover: "https://m.media-amazon.com/images/I/61l8LHt4MeL._SL1500_.jpg",
    description:
      "In a world where books are banned and 'firemen' burn them, Guy Montag begins to question his role in maintaining a mindless, hedonistic society.",
    isbn: "978-1451673319",
  },
  {
    id: 9,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 12.5,
    cover: "https://m.media-amazon.com/images/I/61HAE8zahLL._SL1500_.jpg",
    description:
      "Santiago, a shepherd boy, travels across the desert in search of treasure buried near the Pyramids, learning to follow his heart and find his Personal Legend.",
    isbn: "978-0062315007",
  },
  {
    id: 10,
    title: "Dune",
    author: "Frank Herbert",
    price: 16.0,
    cover: "https://m.media-amazon.com/images/I/81ym3QUd3KL._SL1500_.jpg",
    description:
      "Set on the desert planet Arrakis, Paul Atreides navigates political intrigue and prophecy in this sweeping epic of ecology, religion, and power.",
    isbn: "978-0441172719",
  },
];
