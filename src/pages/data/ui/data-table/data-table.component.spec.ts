import { DataItem } from '@/core';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { DataTableComponent } from './data-table.component';

@Component({
  selector: 'app-test-host',
  template: '<app-data-table [data]="data"></app-data-table>',
})
class TestHostComponent {
  data: DataItem[] = [];
}

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataTableComponent, TestHostComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.debugElement.children[0].componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set input data correctly', () => {
    const testData: DataItem[] = [
      new DataItem('1', 1, 1.5, 'red', { id: '1',  color: 'red' }),
      new DataItem('2', 2, 2.5, 'blue', { id: '2',  color: 'blue' }),
    ];

    fixture.componentInstance.data = testData;
    fixture.detectChanges();

    expect(component.data).toEqual(testData);
  });

  it('should render the correct number of rows', () => {
    const testData: DataItem[] = [
      new DataItem('1', 1, 1.5, 'red', { id: '1',  color: 'red' }),
      new DataItem('2', 2, 2.5, 'blue', { id: '2',  color: 'blue' }),
    ];

    fixture.componentInstance.data = testData;
    fixture.detectChanges();

    const tableRows = fixture.nativeElement.querySelectorAll('.data-table__row');

    expect(tableRows.length).toBe(testData.length * 2);
  });

  it('should call trackByFn for each item in data', () => {
    const trackBySpy = jest.spyOn(component, 'trackByFn');
    const testData: DataItem[] = [
      new DataItem('1', 1, 1.5, 'red', { id: '1',  color: 'red' }),
      new DataItem('2', 2, 2.5, 'blue', { id: '2',  color: 'blue' }),
    ];

    fixture.componentInstance.data = testData;
    fixture.detectChanges();

    expect(trackBySpy).toHaveBeenCalledTimes(testData.length);
  });

  it('should apply correct background color style for color cells', () => {
    fixture.componentInstance.data = [
      new DataItem('1', 1, 1.5, 'red', { id: '1',  color: 'red' }),
    ];
    fixture.detectChanges();

    const colorCell = fixture.nativeElement.querySelector('.data-table__cell:nth-child(4) span');
    expect(colorCell.style.backgroundColor).toBe('red');
  });

  it('should bind data correctly to the template', () => {
    fixture.componentInstance.data = [
      new DataItem('1', 1, 1.5, 'red', {id: '1', color: 'red'}),
      new DataItem('2', 2, 2.5, 'blue', {id: '2', color: 'blue'}),
    ];
    fixture.detectChanges();

    const firstRowCells = fixture.nativeElement.querySelector('.data-table__row').querySelectorAll('.data-table__cell');
    expect(firstRowCells[0].textContent.trim()).toBe('1');
    expect(firstRowCells[1].textContent.trim()).toBe('1');
  });
});
