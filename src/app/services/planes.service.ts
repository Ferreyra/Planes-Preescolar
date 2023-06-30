import { Injectable, inject, signal } from '@angular/core';

import { FirebaseService } from './firebase.service';
import { DocumentData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class PlanesService {
  private fbs = inject(FirebaseService);
  public holydays: DocumentData | undefined;
  public dateMin!: Date;
  public dateMax!: Date;
  public cicloEscolar: string = '';
  public dateActivities = signal<Date[]>([]);
 
  constructor() {
    this.getCiclo();
    this.diasFestivos();
  }
 
  private async diasFestivos() {
    // Cambiar fn usando try catch para manejo de error
    this.cicloEscolar = `${ this.dateMin.getFullYear() }-${ this.dateMax.getFullYear() }`;
    const docSnapShot = await this.fbs.docFirebase('Calendarios', this.cicloEscolar);    
    this.holydays = docSnapShot.data();
  }

  private getCiclo() {
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
  
  public rangeSelected(start: string, end: string) {

    let cambioFechas: boolean = false;
    const rangeStored = localStorage.getItem('rangeStore');
    if( rangeStored ) {
      const { startStored, endStored } = JSON.parse(rangeStored)
      if ( startStored !== start ) {
        cambioFechas = true;
      } else if ( endStored !== end ) {
        cambioFechas = true;
      }
    } else {
      cambioFechas = true;
    }
    
    if( cambioFechas ) {
      const startStored = start;
      const endStored = end;
      localStorage.setItem('rangeStore', JSON.stringify({ startStored, endStored }))
      // let weekdaysCount = 0;
      let indexDate = new Date(start);
      const rangeEnd = new Date(end)
      this.dateActivities.set([]);
      while (indexDate <= rangeEnd) {
        const dayOfWeek = indexDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Ignora domingos (0) y sábados (6)
          if( this.holydays ) {
            const diaMes = indexDate.getDate();
            const month = indexDate.getMonth() + 1;
            const mes = this.holydays[month];
            if( mes ){
              const festivo = mes.find((festivo: number) => festivo === diaMes);
              if( !festivo ) {
                // weekdaysCount++;
                this.dateActivities.update( (date) => {
                  const _date = new Date(indexDate.toDateString());
                  date.push( _date )
                  return date
                })
              }
            }
          } else {
            // weekdaysCount++;
            this.dateActivities.update( (date) => {
              const _date = new Date(indexDate.toDateString());
              date.push( _date )
              return date
            })
          }
        }
        indexDate.setDate(indexDate.getDate() + 1);
      }
    }
    console.log({actividades: this.dateActivities()})
  }
  
}
