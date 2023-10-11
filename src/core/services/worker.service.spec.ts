import { TestBed } from '@angular/core/testing';
import { WorkerService } from './worker.service';
import { DataItem, PseudoSocketService } from '../../core';

describe('WorkerService', () => {
  let workerService: WorkerService;
  let pseudoSocketService: PseudoSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkerService, PseudoSocketService],
    });
    workerService = TestBed.inject(WorkerService);
    pseudoSocketService = TestBed.inject(PseudoSocketService);
  });

  it('should be created', () => {
    expect(workerService).toBeTruthy();
  });

  it('should set data size', () => {
    const dataSize = 10;
    workerService.setDataSize(dataSize);
    expect((workerService as any).dataSize).toBe(dataSize);
  });

  it('should set additional ids', () => {
    const additionalIds = ['id1', 'id2'];
    workerService.setAdditionalIds(additionalIds);
    expect((workerService as any).additionalIds).toEqual(additionalIds);
  });

  it('should run task', () => {
    const message = { dataSize: 5, additionalIds: [] };
    (workerService as any).worker.postMessage = jest.fn();
    workerService.runTask(message);
    expect((workerService as any).worker.postMessage).toHaveBeenCalledWith(message);
  });

  it('should return result observable', () => {
    const resultData: DataItem[] = [
      new DataItem('1', 1, 1.5, 'red', { id: 'child1', color: 'blue' }),
      new DataItem('2', 2, 2.5, 'green', { id: 'child2', color: 'yellow' }),
    ];

    let receivedResult: DataItem[] = [];
    workerService.getResult().subscribe((result) => {
      receivedResult = result;
    });

    const messageEvent = new MessageEvent('message', {
      data: resultData,
    });
    (workerService as any).worker.onmessage(messageEvent);

    expect(receivedResult).toEqual(resultData);
  });
});
