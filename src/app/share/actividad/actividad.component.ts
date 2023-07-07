import { Component, Input, NgZone, OnInit, ViewChild, inject } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.scss']
})
export class ActividadComponent implements OnInit {
  private _ngZone = inject(NgZone);
  public date!: Date;
  public form!: FormGroup;

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  @Input() activityForm!: AbstractControl;

  ngOnInit () {
    this.form = ( this.activityForm as FormGroup )
    this.date = this.form.controls['fecha'].value
  }
  
  get requiereMateriales (): boolean {
    if( this.form.controls['requiereMateriales'].value === true ) {
      this.form.controls['materiales'].setValidators( [Validators.required, Validators.minLength(6)] );
    } else {
      this.form.controls['materiales'].clearValidators();
    }
    return this.form.controls['requiereMateriales'].value
  } 

  triggerResize(): void {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

}
