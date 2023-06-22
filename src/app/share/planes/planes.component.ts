import { Component, NgZone, effect, ViewChild, inject, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs'

import { DocumentData } from '@angular/fire/firestore';

import { PlanesService } from '../../services/planes.service';
import { Actividad } from '../../../interfaces/actividad-interface';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateRange } from '@angular/material/datepicker';

@Component({
  selector: 'actividades',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.scss'],
})
export class PlanesComponent implements OnInit{
  private _ngZone = inject(NgZone)
  private planesService = inject(PlanesService);
  private fbs = inject(FirebaseService);
  private fb = inject(FormBuilder)

  private calendario: DocumentData | undefined;
  // public actividadInicial: string = '';
  public activities: Actividad[] = [];

  public planForm: FormGroup = this.fb.group( {
    actividadInicial: ['', Validators.required],
    jardinId: ['', Validators.required],
    fechasRango: [ DateRange, Validators.required],
    cierre: ['', Validators.required],
    observaciones: ['', Validators.required],
  })

  private activitiesEffect = effect(() => {
    this.activities = this.planesService.actividades()
  })
  
  ngOnInit(): void {
    this.fbs.docFirebase('Calendarios', '2022-2023')
      .then( docSnapShot => {
        this.calendario = docSnapShot.data();
        console.log(this.calendario)
      })
  }
  
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

}
