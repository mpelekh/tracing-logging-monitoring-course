export class Author {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  language: string;

  constructor(id: string) {
    this.id = id;
  }

  public withFirstName(firstName: string): Author {
    firstName = firstName;
    return this;
  }

  public withLastName(lastName: string): Author {
    this.lastName = lastName;
    return this;
  }

  public withLanguage(lang: string): Author {
    this.language = lang;
    return this;
  }

  public withAddress(address: string): Author {
    this.address = address;
    return this;
  }
}
