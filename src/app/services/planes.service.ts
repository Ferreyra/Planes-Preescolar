import { Injectable, OnInit, inject, signal } from '@angular/core';

import { Actividad } from '../../interfaces/actividad-interface';
import { FirebaseService } from './firebase.service';
import { DocumentData } from '@angular/fire/firestore';
import { DateRange } from '@angular/material/datepicker';

@Injectable({
  providedIn: 'root'
})

export class PlanesService {
  private calendario: DocumentData | undefined;
  public actividadInicial: string = '';
  public actividades = signal<Actividad[]>([]);
 
  // constructor() {}
  
  public rangeSelected(range: DateRange<Date>) {

    let cambioFechas: boolean = false;
    const rangeStore = localStorage.getItem('rangeStore')
    if( rangeStore ) {
      const rs = (JSON.parse(rangeStore) as DateRange<Date>)
      if ( rs.start! !== range.start!) {
        cambioFechas = true;
      }
      if (rs.end! !== range.end!) {
        cambioFechas = true;
      }
    } else {
      cambioFechas = true;
    }
    
    if( cambioFechas ) {
      localStorage.setItem('rangeStore', JSON.stringify(range))
      let weekdaysCount = 0;
      let indexDate = new Date(range.start!);
      this.actividades.set([])

      while (indexDate <= range.end!) {
        const dayOfWeek = indexDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Ignora domingos (0) y sábados (6)
          if( this.calendario ) {
            const diaMes = indexDate.getDate();
            const month = indexDate.getMonth() + 1;
            const mes = this.calendario[month];
            if( mes ){
              const festivo = mes.find((festivo: number) => festivo === diaMes);
              if( festivo ) console.log('festivo', festivo)
              if( !festivo ) {
                weekdaysCount++;
                this.actividades.update( (actividad) => {
                  const date = new Date(indexDate.toDateString());
                  actividad.push({texto: '', fecha: date})
                  return actividad
                })
              }
            }
          } else {
            weekdaysCount++;
            this.actividades.update( (actividad) => {
              const date = new Date(indexDate.toDateString());
              actividad.push({texto: '', fecha: date})
              return actividad
            })
          }
        }
        indexDate.setDate(indexDate.getDate() + 1);
      }
    }
  }
  
}
