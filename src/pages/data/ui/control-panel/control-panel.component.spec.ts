import { DEFAULT_DATA_SIZE, DEFAULT_SOCKET_INTERVAL } from '@/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ControlPanelComponent } from './control-panel.component';

describe('ControlPanelComponent', () => {
  let component: ControlPanelComponent;
  let fixture: ComponentFixture<ControlPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlPanelComponent],
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls with default values', () => {
    expect(component.controlPanelForm.get('interval')?.value).toBe(DEFAULT_SOCKET_INTERVAL);
    expect(component.controlPanelForm.get('dataSize')?.value).toBe(DEFAULT_DATA_SIZE);
    expect(component.controlPanelForm.get('additionalIds')?.value).toBe('');
  });

  it('should emit interval change event when interval control value changes', fakeAsync(() => {
    const intervalChangeSpy = jest.spyOn(component.intervalChange, 'emit');
    component.controlPanelForm.get('interval')?.setValue(1000);
    fixture.detectChanges();

    tick(300);

    expect(intervalChangeSpy).toHaveBeenCalledWith(1000);
  }));

  it('should emit data size change event when data size control value changes', fakeAsync(() => {
    const dataSizeChangeSpy = jest.spyOn(component.dataSizeChange, 'emit');
    component.controlPanelForm.get('dataSize')?.setValue(500);
    fixture.detectChanges();

    tick(300);

    expect(dataSizeChangeSpy).toHaveBeenCalledWith(500);
  }));

  it('should emit additional IDs change event when additional IDs control value changes', fakeAsync(() => {
    const additionalIdsChangeSpy = jest.spyOn(component.additionalIdsChange, 'emit');
    component.controlPanelForm.get('additionalIds')?.setValue('id1, id2, id3');
    fixture.detectChanges();

    tick(300);

    expect(additionalIdsChangeSpy).toHaveBeenCalledWith(['id1', 'id2', 'id3']);
  }));

  it('should return validation error messages for interval control', () => {
    component.controlPanelForm.get('interval')?.setErrors({ required: true });
    expect(component.getValidationMessage('interval')).toEqual(['controlPanelForm.interval.validation.required']);
  })

  it('should return validation error messages for additional IDs control', () => {
    component.controlPanelForm.get('additionalIds')?.setValue('id1 id2, id3');
    expect(component.getValidationMessage('additionalIds')).toEqual(['controlPanelForm.additionalIds.validation.pattern']);
  });
});
