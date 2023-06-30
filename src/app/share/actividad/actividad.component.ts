import { Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild, inject } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.scss']
})
export class ActividadComponent implements OnInit{
  private _ngZone = inject(NgZone);
  private fb = inject(FormBuilder);
  public checked: boolean = false;
  public form = this.fb.group({
    actividad: ['', Validators.required],
    fecha: [new Date(), Validators.required],
    materiales: [''],
  });
  public date = new Date();

  ngOnInit () {
    console.log(this.activityForm)
    this.date = this.activityForm.value.fecha
    this.form.patchValue( this.activityForm.value.fecha )
    // this.formActivity.emit(this.form)
  }
  
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  @Input() activityForm!: AbstractControl;
  // @Input() formGroupName!: string;
  // @Output() formActivity = new EventEmitter();

  triggerResize(): void {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

}
