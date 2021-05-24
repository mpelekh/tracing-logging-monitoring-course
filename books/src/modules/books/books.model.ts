export class Book {
  id: string;
  title: string;
  pages: number;
  authorId: string;

  public constructor(id: string) {
    this.id = id;
  }

  public withTitle(title: string): Book {
    this.title = title;
    return this;
  }

  public withAuthorId(authorId: string): Book {
    this.authorId = authorId;
    return this;
  }

  public withPages(pages: number): Book {
    this.pages = pages;
    return this;
  }
}
