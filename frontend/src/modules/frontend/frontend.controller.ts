import { Controller, Get, Inject, Req } from '@nestjs/common';
import * as opentracing from 'opentracing';

import { ApiClient, ApiResponse } from '../api/api.interface';
import { ApiService } from '../api/api.service';
import { AuthorDto, BookDto, BooksAndAuthorsDto } from './frontend.dto';
import { JAEGER_CLIENT } from '../jaeger/jaeger.provider';

@Controller('api/v1/details')
export class FrontendController {
  private readonly authorsApi: ApiClient;
  private readonly booksApi: ApiClient;

  constructor(
    @Inject(JAEGER_CLIENT)
    private readonly tracer,
    apiService: ApiService,
  ) {
    this.authorsApi = apiService.getAuthorsApi();
    this.booksApi = apiService.getBooksApi();
  }

  @Get('/')
  async getBooksAndAuthors(@Req() req): Promise<BooksAndAuthorsDto> {
    const span = this.tracer.startSpan('get books and authors', {
      childOf: req.span,
    });

    const headers = {};
    this.tracer.inject(span, opentracing.FORMAT_HTTP_HEADERS, headers);

    const { data: authors }: ApiResponse<AuthorDto[]> =
      await this.authorsApi.get('/', { headers });

    // show how to do a log in the span
    span.log({
      event: 'testing name',
      message: `this is a log message for testing name`,
    });

    // show how to set a baggage item for context propagation (be careful is expensive)
    span.setBaggageItem('my-baggage', 'my-baggage');

    let books: any = [];
    try {
      books = await this.booksApi.get('/', {
        headers,
      });
      console.log(books);
    } catch {
      span.setTag('get books error', true);
    }

    span.finish();

    return { authors, books };
  }
}
