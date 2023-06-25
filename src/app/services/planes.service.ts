import { Injectable, OnInit, inject, signal } from '@angular/core';

import { Actividad } from '../../interfaces/actividad-interface';
import { FirebaseService } from './firebase.service';
import { DocumentData } from '@angular/fire/firestore';
import { DateRange } from '@angular/material/datepicker';

@Injectable({
  providedIn: 'root'
})

export class PlanesService {
  private fbs = inject(FirebaseService);
  public holydays: DocumentData | undefined;
  public dateMin!: Date;
  public dateMax!: Date;
  public actividades = signal<Actividad[]>([]);
 
  constructor() {
    this.cicloEscolar();
    this.diasFestivos();
  }

  private async diasFestivos() {
    // Cambiar fn usando try catch para manejo de error
    const ciclo = `${ this.dateMin.getFullYear() }-${ this.dateMax.getFullYear() }`;
    const docSnapShot = await this.fbs.docFirebase('Calendarios', ciclo);    
    this.holydays = docSnapShot.data();
  }

  private cicloEscolar() {
    const today: Date = new Date(Date.now());
    let fMax = '07/31/';
    let fMin = '08/01/';
    if( today.getMonth() > 6 ) {
      fMax += today.getFullYear() + 1;
      fMin += today.getFullYear();
      this.dateMax = new Date( fMax )   // meses 0-6
      this.dateMin = new Date( fMin )    // meses 7-12
    } else {
      fMax += today.getFullYear();
      fMin += today.getFullYear() - 1;
      this.dateMax = new Date( fMax )   // meses 0-6
      this.dateMin = new Date( fMin )    // meses 7-12
    }
  }
  
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
      this.actividades.set([]);
      while (indexDate <= range.end!) {
        const dayOfWeek = indexDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Ignora domingos (0) y sábados (6)
          if( this.holydays ) {
            const diaMes = indexDate.getDate();
            const month = indexDate.getMonth() + 1;
            const mes = this.holydays[month];
            if( mes ){
              const festivo = mes.find((festivo: number) => festivo === diaMes);
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
    console.log({actividades: this.actividades()})
  }
  
}
