import { FormControl } from '@angular/forms';

export interface ControlPanelForm {
  interval: FormControl<number | null>;
  dataSize: FormControl<number | null>;
  additionalIds: FormControl<string | null>;
}
