export class CompanyNotCreatedException extends Error {
  constructor(public readonly id: string) {
    super(`Company ${id} was not creater`);
  }
}
