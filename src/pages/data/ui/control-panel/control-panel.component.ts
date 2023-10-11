import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DEFAULT_DATA_SIZE, DEFAULT_SOCKET_INTERVAL } from '@/core';
import { debounceTime, distinctUntilChanged, map, Subject, takeUntil } from 'rxjs';
import { ADDITIONAL_IDS_VALIDATION_PATTERN, ControlPanelForm } from '../../core';

/**
 * Control panel component
 */
@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlPanelComponent implements OnInit, OnDestroy {
  public controlPanelForm: FormGroup<ControlPanelForm> = new FormGroup<ControlPanelForm>({
    interval: new FormControl(DEFAULT_SOCKET_INTERVAL, Validators.required),
    dataSize: new FormControl(DEFAULT_DATA_SIZE, Validators.required),
    additionalIds: new FormControl('', Validators.pattern(ADDITIONAL_IDS_VALIDATION_PATTERN)),
  });

  private destroy$: Subject<void> = new Subject<void>();

  @Output() public intervalChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() public dataSizeChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() public additionalIdsChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  public ngOnInit(): void {
    this.controlPanelForm.get('interval')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
      )
      .subscribe((interval: number | null): void => {
        if (interval && this.controlPanelForm.get('interval')?.valid) {
          this.intervalChange.emit(interval);
        }
      });

    this.controlPanelForm.get('dataSize')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
      )
      .subscribe((dataSize: number | null): void => {
        this.dataSizeChange.emit(dataSize ?? 0);
      });

    this.controlPanelForm.get('additionalIds')?.valueChanges
      .pipe(
        debounceTime(300),
        map((additionalIds: string | null): string[] => {
          if (additionalIds && this.controlPanelForm.get('additionalIds')?.valid) {
            return additionalIds.split(',').reduce((ids: string[], id: string) => {
              const idTrimmed: string = id.trim();

              if (idTrimmed !== '') {
                ids.push(idTrimmed);
              }

              return ids;
            }, [])
          }

          return [];
        }),
        distinctUntilChanged((a: string[], b: string[]): boolean => JSON.stringify(a) === JSON.stringify(b)),
        takeUntil(this.destroy$),
      )
      .subscribe((additionalIds: string[]): void => {
        this.additionalIdsChange.emit(additionalIds);
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Returns validation messages for the field
   *
   * @param fieldKey
   */
  public getValidationMessage(fieldKey: keyof ControlPanelForm): string[] {
    const errors: { [key: string]: string } | undefined | null = this.controlPanelForm.get(fieldKey)?.errors;

    if (errors) {
      return Object.keys(errors).map((key: string): string => `controlPanelForm.${fieldKey}.validation.${key}`);
    }

    return [];
  }
}
