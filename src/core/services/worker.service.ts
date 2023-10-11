import { WorkerFactory } from '../worker.factory';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DEFAULT_DATA_SIZE, PseudoSocketService } from '@/core';
import { DataItem, WorkerGeneratorConfig } from '../models';

/**
 * Worker service.
 */
@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  private readonly worker: Worker;
  private resultSubject: Subject<any> = new Subject<any>();
  private dataSize: number = DEFAULT_DATA_SIZE;
  private additionalIds: string[] = [];

  constructor(
    private readonly pseudoSocketService: PseudoSocketService,
  ) {
    this.worker = new WorkerFactory().get();

    this.pseudoSocketService.getDataStream().subscribe((): void => {
      this.runTask({
        dataSize: this.dataSize,
        additionalIds: this.additionalIds,
      });
    });

    this.worker.onmessage = (event: MessageEvent<DataItem[]>): void => {
      this.resultSubject.next(event.data);
    };
  }

  /**
   * Sets data array size.
   *
   * @param size
   */
  public setDataSize(size: number): void {
    this.dataSize = size;
  }

  /**
   * Sets additional ids array
   *
   * @param additionalIds
   */
  public setAdditionalIds(additionalIds: string[]): void {
    this.additionalIds = additionalIds;
  }

  /**
   * Runs task in the worker.
   *
   * @param message
   */
  public runTask(message: WorkerGeneratorConfig): void {
    if (this.worker) {
      this.worker.postMessage(message);
    }
  }

  /**
   * Returns result observable stream from the worker.
   */
  public getResult(): Observable<DataItem[]> {
    return this.resultSubject.asObservable();
  }
}
