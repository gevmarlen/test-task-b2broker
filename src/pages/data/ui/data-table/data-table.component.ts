import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DataItem, MAX_DATA_SIZE_FOR_VIEW } from '@/core';

/**
 * Data table component
 */
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent {
  @Input() public data: DataItem[] = [];

  public maxDataSizeForView: number = MAX_DATA_SIZE_FOR_VIEW;

  /**
   * Track by function
   *
   * @param index - Index
   * @param item - Data
   */
  public trackByFn(index: number, item: DataItem): string {
    return index.toString();
  }
}
