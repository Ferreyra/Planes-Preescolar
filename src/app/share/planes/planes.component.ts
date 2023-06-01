import { Component, NgZone, effect, ViewChild, inject } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs'

import { PlanesService } from './planes-service.service';
import { Actividad } from './actividad-interface';

@Component({
  selector: 'actividades',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.scss'],
})
export class PlanesComponent {
  public actividadInicial: string = '';
  private planesService = inject(PlanesService)
  public activities: Actividad[] = [];
  private activitiesEffect = effect(() => {
    this.activities = this.planesService.actividades()
  })

  constructor (private _ngZone: NgZone) {}
  
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

}
