import { Controller, Get } from '@nestjs/common';

import { ApiClient, ApiResponse } from '../api/api.interface';
import { ApiService } from '../api/api.service';
import { AuthorDto, BookDto, BooksAndAuthorsDto } from './frontend.dto';

@Controller('api/v1/details')
export class FrontendController {
  private readonly authorsApi: ApiClient;
  private readonly booksApi: ApiClient;

  constructor(apiService: ApiService) {
    this.authorsApi = apiService.getAuthorsApi();
    this.booksApi = apiService.getBooksApi();
  }

  @Get('/')
  async getBooksAndAuthors(): Promise<BooksAndAuthorsDto> {
    const { data: authors }: ApiResponse<AuthorDto[]> =
      await this.authorsApi.get('/');

    const { data: books }: ApiResponse<BookDto[]> = await this.booksApi.get(
      '/',
    );
    return { authors, books };
  }
}
