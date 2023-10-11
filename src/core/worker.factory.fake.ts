/**
 * WorkerFactory fake class.
 * For testing purposes. [https://github.com/nrwl/nx/issues/5697]
 */
export class WorkerFactory {
  public get(): Worker {
    return new Worker('' as unknown as URL);
  }
}

class Worker {
  private readonly onmessage: (msg: string) => void;

  constructor(
    private url: URL,
  ) {
    this.onmessage = () => {};
  }

  postMessage(msg: string): void {
    this.onmessage(msg);
  }
}
