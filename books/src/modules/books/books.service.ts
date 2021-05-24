import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Book } from './books.model';
import { AuthorDto, CreateBookInput } from './books.dto';
import { ApiService } from '../api/api.service';
import { ApiClient, ApiResponse } from '../api/api.interface';

@Injectable()
export class BooksService {
  private readonly books: Map<string, Book>;
  private readonly authorsApi: ApiClient;

  constructor(apiService: ApiService) {
    this.books = new Map<string, Book>();
    this.authorsApi = apiService.getAuthorsApi();
  }

  getBooks(): Book[] {
    return Array.from(this.books.values());
  }

  findById(id: string): Book {
    return this.books.get(id);
  }

  async create({ title, pages, authorId }: CreateBookInput): Promise<Book> {
    const author = await this.getAutor(authorId);
    if (!author) {
      throw new BadRequestException('Author not found');
    }

    const id = uuid();
    const book = new Book(id)
      .withTitle(title)
      .withPages(pages)
      .withAuthorId(authorId);

    this.books.set(id, book);
    return book;
  }

  private async getAutor(authorId: string): Promise<AuthorDto> {
    const { data }: ApiResponse<AuthorDto> = await this.authorsApi.get(
      `/${authorId}`,
    );
    return data;
  }
}
