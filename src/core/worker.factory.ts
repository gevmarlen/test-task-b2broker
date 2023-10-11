/**
 * WorkerFactory class.
 */
export class WorkerFactory {
  public get(): Worker {
    return new Worker(new URL('./web.worker', import.meta.url));
  }
}
