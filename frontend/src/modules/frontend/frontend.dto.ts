export class BookDto {
  id: string;
  title: string;
  pages: number;
  authorId: string;
}

export class AuthorDto {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  language: string;
}

export class BooksAndAuthorsDto {
  books: BookDto[];
  authors: AuthorDto[];
}
