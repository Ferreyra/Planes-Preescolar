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
export class FechasComponent {
  private planesService = inject(PlanesService);
  private fbs = inject(FirebaseService);
  
  private holydays: DocumentData | undefined;
  public dateMax: Date;
  public dateMin: Date;
  private rangeSelect?: DateRange<Date>;
  
  public dateRange = new FormGroup({
    start: new FormControl<Date | null>(null, Validators.required),
    end: new FormControl<Date | null>(null, Validators.required),
  });

  constructor () {
    this.dateMin = this.planesService.dateMin;
    this.dateMax = this.planesService.dateMax;
    this.holydays = this.planesService.holydays;
    console.log(this.holydays)
  }

  weekendDisable: (date: Date | null) => boolean = (date: Date | null) => {
    if (!date) {
      return false;
    }
    const day = date.getDay();
    if (day === 0 || day === 6)
      return false;
    else
      if( this.holydays ) {
        const diaMes = date.getDate();
        const month = date.getMonth() + 1;
        const mes = this.holydays[month]
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
        if( this.holydays ) {
          const date = cellDate.getDate();
          const month = cellDate.getMonth() + 1;
          const mes = this.holydays[month]
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
