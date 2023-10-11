import { ControlPanelComponent } from '@/pages/data/ui/control-panel';
import { DataTableComponent } from '@/pages/data/ui/data-table';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DataComponent } from './data.component';
import { first, of } from 'rxjs';
import { DataService } from '../core';
import { DataItem, PseudoSocketService } from '@/core';

describe('DataComponent', () => {
  let component: DataComponent;
  let fixture: ComponentFixture<DataComponent>;
  let mockDataService: jest.Mocked<DataService>;
  let mockPseudoSocketService: jest.Mocked<PseudoSocketService>;

  beforeEach(() => {
    mockDataService = {
      getData: jest.fn(),
      setDataSize: jest.fn(),
      updateAdditionalIds: jest.fn(),
    } as any;

    mockPseudoSocketService = {
      setInterval: jest.fn(),
    } as any;

    TestBed.configureTestingModule({
      declarations: [DataComponent, ControlPanelComponent, DataTableComponent],
      imports: [TranslateModule.forRoot(), ReactiveFormsModule],
      providers: [
        { provide: DataService, useValue: mockDataService },
        { provide: PseudoSocketService, useValue: mockPseudoSocketService },
      ],
    });

    fixture = TestBed.createComponent(DataComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data on initialization', fakeAsync(() => {
    const testData: DataItem[] = [
      new DataItem('1', 1, 1.5, 'red', { id: 'child1', color: 'blue' }),
      new DataItem('2', 2, 2.5, 'green', { id: 'child2', color: 'yellow' }),
    ];
    mockDataService.getData.mockReturnValue(of(testData));

    fixture.detectChanges();

    tick(300);

    expect(mockDataService.getData).toHaveBeenCalled();

    component.data$.pipe(first()).subscribe((data) => expect(data).toEqual(testData));
  }));

  it('should call PseudoSocketService.setInterval when onIntervalChange is called', () => {
    const interval = 1000;

    component.onIntervalChange(interval);

    expect(mockPseudoSocketService.setInterval).toHaveBeenCalledWith(interval);
  });

  it('should call DataService.setDataSize when onDataSizeChange is called', () => {
    const dataSize = 50;

    component.onDataSizeChange(dataSize);

    expect(mockDataService.setDataSize).toHaveBeenCalledWith(dataSize);
  });

  it('should call DataService.updateAdditionalIds when onUpdateAdditionalIds is called', () => {
    const additionalIds: string[] = ['3', '4'];

    component.onUpdateAdditionalIds(additionalIds);

    expect(mockDataService.updateAdditionalIds).toHaveBeenCalledWith(additionalIds);
  });
});
