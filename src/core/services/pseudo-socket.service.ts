import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, switchMap, timer } from 'rxjs';
import { DEFAULT_SOCKET_INTERVAL } from '../constants';

/**
 * This service imitates a socket connection.
 */
@Injectable({
  providedIn: 'root',
})
export class PseudoSocketService {
  private interval$: BehaviorSubject<number> = new BehaviorSubject<number>(DEFAULT_SOCKET_INTERVAL);

  /**
   * Returns data stream
   */
  public getDataStream(): Observable<number> {
    return this.interval$.pipe(
      switchMap((intervalValue: number) => timer(0, intervalValue))
    );
  }

  /**
   * Sets interval for data generation.
   *
   * @param interval
   */
  public setInterval(interval: number): void {
    this.interval$.next(interval);
  }
}
