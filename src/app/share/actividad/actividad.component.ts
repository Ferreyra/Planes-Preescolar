import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { CommonModule, DatePipe } from '@angular/common';
import { take } from 'rxjs';

@Component({
  selector: 'actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.scss']
})
export class ActividadComponent {
  public checked: boolean = false;

  constructor (private _ngZone: NgZone) {}
  
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  @Input() activityDate!: Date;
  @Input() formGroupName!: string;
  
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

}
