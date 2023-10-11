import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DataItem, PseudoSocketService } from '@/core';
import { Observable } from 'rxjs';
import { DataService } from '../core';

/**
 * Data component
 */
@Component({
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataComponent implements OnInit {
  public data$: Observable<DataItem[]> = new Observable<DataItem[]>();

  constructor(
    private readonly dataService: DataService,
    private readonly pseudoSocketService: PseudoSocketService,
  ) {
  }

  public ngOnInit(): void {
    this.data$ = this.dataService.getData();
  }

  /**
   * Interval change handler
   *
   * @param interval - interval in ms
   */
  public onIntervalChange(interval: number): void {
    this.pseudoSocketService.setInterval(interval);
  }

  /**
   * Data size change handler
   *
   * @param dataSize - array size
   */
  public onDataSizeChange(dataSize: number): void {
    this.dataService.setDataSize(dataSize);
  }

  /**
   * Additional ids change handler
   *
   * @param additionalIds - array of ids
   */
  public onUpdateAdditionalIds(additionalIds: string[]): void {
    this.dataService.updateAdditionalIds(additionalIds);
  }
}
