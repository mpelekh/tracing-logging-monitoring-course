import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Author } from './authors.model';
import { authorsInitData } from './authors.constants';
import { CreateAuthorInput } from './authors.dto';

@Injectable()
export class AuthorsService {
  private readonly authors: Map<string, Author>;

  constructor() {
    this.authors = new Map();

    authorsInitData.forEach(({ id, firstName, lastName, language, address }) =>
      this.authors.set(
        id,
        new Author(id)
          .withFirstName(firstName)
          .withLastName(lastName)
          .withLanguage(language)
          .withAddress(address),
      ),
    );
  }

  public getAuthors(): Author[] {
    return Array.from(this.authors.values());
  }

  public findById(id: string): Author {
    return this.authors.get(id);
  }

  public create({
    firstName,
    lastName,
    language,
    address,
  }: CreateAuthorInput): Author {
    const id = uuid();
    const author = new Author(id)
      .withFirstName(firstName)
      .withLastName(lastName)
      .withLanguage(language)
      .withAddress(address);

    this.authors.set(id, author);
    return author;
  }
}
