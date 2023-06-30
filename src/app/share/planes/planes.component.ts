import { Component, NgZone, effect, ViewChild, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { DateRange } from '@angular/material/datepicker';
import { take } from 'rxjs'

import { PlanesService } from '../../services/planes.service';

@Component({
  selector: 'actividades',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.scss'],
})
export class PlanesComponent {
  private _ngZone = inject(NgZone)
  private fb = inject(FormBuilder)
  private planesService = inject(PlanesService);
  
  public activityFormGroupName!: string;
  public showCierre = false;

  public planForm: FormGroup = this.fb.group( {
    actividadInicial: ['', Validators.required],
    dateRange: [ DateRange, Validators.required],
    activitiesForm: this.fb.array([]),
    cierre: ['', Validators.required],
    observaciones: ['', Validators.required],
    // jardinId: ['', Validators.required],
  })

  private activitiesEffect = effect(() => {
    ( this.planForm.get('activitiesForm') as FormArray ).clear();
    this.planesService.dateActivities().forEach( (date) => {
      this.addActivityForm( date );
      // ( this.planForm.get('activitiesForm') as FormArray ).push( activityFromGroup )
    });
    if(this.planForm.get('dateRange')?.valid) {
      this.showCierre = true;
    }
    /* this.activities.forEach( (activity) => {
      this.activityFormGroupName = activity.fecha.toLocaleDateString();
    }) */
    this.setRange();
  })

  constructor() {
    this.planForm.patchValue({dateRange: null})
  }

  addActivityForm(dateActivity: Date) {  
    const activityFromGroup: FormGroup = this.fb.group({
      fecha: [dateActivity, Validators.required],
      actividad: ['', Validators.required],
      materiales: ['']
    });
    ( this.planForm.get('activitiesForm') as FormArray ).push( activityFromGroup );
  }

  get activitiesForm() {
    return (this.planForm.get('activitiesForm') as FormArray).controls
  }
  /* activitiesForm$() {
    return from(this.planForm.get('activitiesForm'))
  } */
  setRange() {
    const rangeStore = localStorage.getItem('rangeStore')
    if( rangeStore ) {
      this.planForm.patchValue({dateRange: JSON.parse(rangeStore) as DateRange<Date>})
    }
  }

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

}
