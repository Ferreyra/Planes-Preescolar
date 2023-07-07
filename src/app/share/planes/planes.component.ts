import { Component, NgZone, effect, ViewChild, inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { DateRange } from '@angular/material/datepicker';
import { take } from 'rxjs'

import { PlanesService } from '../../services/planes.service';

@Component({
  selector: 'actividades',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.scss'],
})
export class PlanesComponent implements OnInit{
  private _ngZone = inject(NgZone)
  private fb = inject(FormBuilder)
  private planesService = inject(PlanesService);
  
  public activityFormGroupName!: string;
  public showCierre = false;

  public planForm: FormGroup = this.fb.group( {
    // jardinId       : ['', Validators.required],
    actividadInicial: ['', [Validators.required, Validators.minLength(8)]],
    activitiesForm  : this.fb.array([]),
    cicloEscolar    : ['', Validators.required],
    cierre          : ['', [Validators.required, Validators.minLength(8)]],
    dateRange       : [ DateRange, Validators.required], 
    observaciones   : ['', [Validators.required, Validators.minLength(8)]],
  })

  private activitiesEffect = effect(() => {
    ( this.planForm.get('activitiesForm') as FormArray ).clear();
    this.planesService.dateActivities().forEach( (date) => {
      this.addActivityForm( date );
    });
    if(this.planForm.get('dateRange')?.valid) {
      this.showCierre = true;
    }
    this.setRange();
  })

  constructor() {
    this.planForm.patchValue( {dateRange: null} )
  }

  ngOnInit(): void {
    this.planForm.patchValue( {cicloEscolar: this.planesService.cicloEscolar} )
  }

  addActivityForm(dateActivity: Date) {  
    const activityFormGroup: FormGroup = this.fb.group({
      actividad: ['', [Validators.required, Validators.minLength(8)]],
      fecha: [dateActivity, Validators.required],
      materiales: [''],
      requiereMateriales: [false],
    });
    this.activitiesForm.push( activityFormGroup );
  }

  get activitiesForm() {
    return (this.planForm.controls['activitiesForm'] as FormArray)
  }

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
