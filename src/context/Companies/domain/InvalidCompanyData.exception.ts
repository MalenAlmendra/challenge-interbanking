export class InvalidCompanyDataException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidCompanyDataException';
  }
}
