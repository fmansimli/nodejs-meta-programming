export class Logger {
  static log(message: string): void {
    console.log(message);
  }

  static error(error: any) {
    console.error(error);
  }
}
