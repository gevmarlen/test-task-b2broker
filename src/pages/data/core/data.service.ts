import { Injectable } from '@angular/core';
import { DataItem, WorkerService } from '@/core';
import { Observable } from 'rxjs';

/**
 * Service for data page
 */
@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(
    private readonly workerService: WorkerService,
  ) {
  }

  /**
   * Get data from worker
   */
  public getData(): Observable<DataItem[]> {
    return this.workerService.getResult();
  }

  /**
   * Set data size for worker generator
   *
   * @param size
   */
  public setDataSize(size: number): void {
    this.workerService.setDataSize(size);
  }

  /**
   * Set additional ids for worker
   *
   * @param additionalIds
   */
  public updateAdditionalIds(additionalIds: string[]): void {
    this.workerService.setAdditionalIds(additionalIds);
  }
}
