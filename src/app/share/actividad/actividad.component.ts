import { Component, Input, NgZone, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs';

@Component({
  selector: 'actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.scss']
})
export class ActividadComponent {
  public checked: boolean = false;
  public formGroupName: string;

  constructor (private _ngZone: NgZone) {
    this.formGroupName= `${this.activityDate.getDate()}() ${this.activityDate.getMonth()}`;
  }
  
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  @Input() activityDate!: Date;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

}
