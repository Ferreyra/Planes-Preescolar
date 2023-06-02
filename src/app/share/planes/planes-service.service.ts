import { Injectable, signal } from '@angular/core';

import { Actividad } from './actividad-interface';

@Injectable({
  providedIn: 'root'
})

export class PlanesService {
  public actividadInicial: string = '';
  public actividades = signal<Actividad[]>([]);

  constructor() { }
  
  public rangeSelected(inicio: Date, fin: Date) {
    if (!inicio || !fin) return
    let cambioFechas: boolean = false;
    const localInicio = localStorage.getItem('rangeStar')
    if(localInicio) {
      if (localInicio !== inicio.toDateString()) {
        localStorage.setItem('rangeStar', inicio.toDateString())
        cambioFechas = true;
      }
    } else {
      localStorage.setItem('rangeStar', inicio.toDateString())
      cambioFechas = true;
    }
    const localFin = localStorage.getItem('rangeEnd')
    if(localFin) {
      if (localFin !== fin.toDateString()) {
        localStorage.setItem('rangeEnd', fin.toDateString())
        cambioFechas = true;
      }
    } else {
      localStorage.setItem('rangeEnd', fin.toDateString())
      cambioFechas = true;
    }
    if(cambioFechas) {
      let weekdaysCount = 0;
      let indexDate = new Date(inicio);
      this.actividades.set([])
      while (indexDate <= fin) {
        const dayOfWeek = indexDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Ignora domingos (0) y sábados (6)
          weekdaysCount++;
          this.actividades.update( (actividad) => {
            const date = new Date(indexDate.toDateString());
            actividad.push({texto: '', fecha: date})
            return actividad
          })
        }
        indexDate.setDate(indexDate.getDate() + 1); // Incrementa un día
      }
      console.log(this.actividades())
    }
  }
  
}
