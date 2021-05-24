export class AuthorDto {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  language: string;
}

export class CreateAuthorInput {
  firstName: string;
  lastName: string;
  address: string;
  language: string;
}
