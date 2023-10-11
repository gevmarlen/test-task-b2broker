import { TestBed } from '@angular/core/testing';
import { PseudoSocketService } from '@/core';
import { BehaviorSubject } from 'rxjs';

describe('PseudoSocketService', () => {
  let service: PseudoSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PseudoSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return data stream with the specified interval', () => {
    const interval: number = 1000;
    const dataStream = service.getDataStream();
    let emittedValue: number | null = null;

    const subscription = dataStream.subscribe((value) => {
      emittedValue = value;
    });

    service.setInterval(interval);

    setTimeout(() => {
      expect(emittedValue).toBe(0);
    }, 0);

    setTimeout(() => {
      expect(emittedValue).toBe(1);
      subscription.unsubscribe();
    }, interval + 1);
  });

  it('should set the interval for data generation', () => {
    const interval: number = 2000;
    service.setInterval(interval);
    const intervalSubject = service['interval$'] as BehaviorSubject<number>; // Access private variable directly

    expect(intervalSubject.getValue()).toBe(interval);
  });
});
