export class TodoError extends Error {
  constructor(public code: string) {
    super(code);
  }

  static notFound() {
    return new TodoError('Todo not found');
  }
}
