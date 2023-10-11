import { DataItem, WorkerService } from '../../../core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let workerService: WorkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        {
          provide: WorkerService,
          useValue: {
            getResult: jest.fn(),
            setDataSize: jest.fn(),
            setAdditionalIds: jest.fn(),
          },
        },
      ],
    });

    service = TestBed.inject(DataService);
    workerService = TestBed.inject(WorkerService) as WorkerService;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call workerService.getResult() when calling getData()', () => {
    const testData: DataItem[] = [
      new DataItem('1', 1, 1.5, '#FFFFFF', { id: 'child-1', color: '#000000' })
    ];
    (workerService.getResult as jest.Mock).mockReturnValue(of(testData));

    let result: DataItem[] | undefined;
    service.getData().subscribe(data => {
      result = data;
    });

    expect(result).toEqual(testData);
    expect(workerService.getResult).toHaveBeenCalled();
  });

  it('should call workerService.setDataSize() when calling setDataSize()', () => {
    const size = 10;
    service.setDataSize(size);

    expect(workerService.setDataSize).toHaveBeenCalledWith(size);
  });

  it('should call workerService.setAdditionalIds() when calling updateAdditionalIds()', () => {
    const additionalIds: string[] = ['id1', 'id2'];
    service.updateAdditionalIds(additionalIds);

    expect(workerService.setAdditionalIds).toHaveBeenCalledWith(additionalIds);
  });
});
