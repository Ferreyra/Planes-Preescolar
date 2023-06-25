import { Component, NgZone, effect, ViewChild, inject, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs'

import { DocumentData } from '@angular/fire/firestore';

import { PlanesService } from '../../services/planes.service';
import { Actividad } from '../../../interfaces/actividad-interface';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateRange } from '@angular/material/datepicker';

@Component({
  selector: 'actividades',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.scss'],
})
export class PlanesComponent implements OnInit{
  private _ngZone = inject(NgZone)
  private planesService = inject(PlanesService);
  private fb = inject(FormBuilder)
  
  private fbs = inject(FirebaseService);
  private calendario: DocumentData | undefined;
  public actividadFormGroup!: string;

  public activities: Actividad[] = []; 

  public planForm: FormGroup = this.fb.group( {
    actividadInicial: ['', Validators.required],
    // jardinId: ['', Validators.required],
    dateRange: [ DateRange, Validators.required],
    activitiesForm: new FormArray([]),
    cierre: ['', Validators.required],
    observaciones: ['', Validators.required],
  })

  private activitiesEffect = effect(() => {
    this.activities = this.planesService.actividades();
    this.activities.forEach( (activity) => {
      this.actividadFormGroup = activity.fecha.toLocaleDateString()
      this.addActivityForm( activity.fecha )
    })
    this.setRange();
  })
  
  ngOnInit(): void {    
  }

  addActivityForm(fecha: Date) {    
    ( this.planForm.get('activitiesForm') as FormArray ).push(
      new FormGroup({
        fecha: new FormControl( fecha, Validators.required ),
        actividad: new FormControl( '', Validators.required ),
        materiales: new FormControl( '' )
      })
    )
  }
  
  get activitiesForm() {
    debugger
    return ( this.planForm.get('activitiesForm') as FormArray ).controls
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
