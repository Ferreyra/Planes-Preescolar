import { Component, OnDestroy, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateRange, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { PlanesService } from '../../services/planes.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'fechas-rango',
  templateUrl: './fechas.component.html',
  styleUrls: ['./fechas.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FechasComponent implements OnInit{
  private planesService = inject(PlanesService);
  private fbs = inject(FirebaseService);
  
  private calendario: DocumentData | undefined;
  public dateMax: Date = new Date('07/31/2023');
  public dateMin: Date = new Date('08/01/2022');
  private rangeSelect?: DateRange<Date>;
  
  public dateRange = new FormGroup({
    start: new FormControl<Date | null>(null, Validators.required),
    end: new FormControl<Date | null>(null, Validators.required),
  });

  constructor () {
    const today: Date = new Date(Date.now());
    if( today.getMonth() > 6 ) {
      this.dateMax.setFullYear( today.getFullYear() + 1 )
      this.dateMin.setFullYear( today.getFullYear() )
    }
  }

  ngOnInit(): void {
    this.fbs.docFirebase('Calendarios', '2022-2023')
      .then( docSnapShot => {
        this.calendario = docSnapShot.data();
      })
  }

  weekendDisable: (date: Date | null) => boolean =
  (date: Date | null) => {
    if (!date) {
      return false;
    }
    const day = date.getDay();
    if (day === 0 || day === 6)
      return false;
    else
      if( this.calendario ) {
        const diaMes = date.getDate();
        const month = date.getMonth() + 1;
        const mes = this.calendario[month]
        if( mes ){
          const found = mes.find((festivo: number) => festivo === diaMes);
          return found ? false : true        
        } else 
          return true;
      } else
      return true;
  };

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const weekend = cellDate.getDay();
      if (weekend === 0 || weekend === 6)
        return 'fin-de-semana'
      else {
        if( this.calendario ) {
          const date = cellDate.getDate();
          const month = cellDate.getMonth() + 1;
          const mes = this.calendario[month]
          if( mes ){
            let found = mes.find((festivo: number) => festivo === date)             
            return found ? 'dias-festivos' : '';            
          }
        }
      }
    }
    return '';
  };

  onDateRangeChange(): void {
    if (this.dateRange.invalid) return;    
    this.planesService.rangeSelected((this.dateRange.value) as DateRange<Date>)
  }

}
