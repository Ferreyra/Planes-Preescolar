import { Component, EventEmitter, Output, ViewEncapsulation, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateRange, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { PlanesService } from '../planes/planes-service.service';

@Component({
  selector: 'fechas-rango',
  templateUrl: './fechas.component.html',
  styleUrls: ['./fechas.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FechasComponent {
  public planesService = inject(PlanesService)
  
  public range = new FormGroup({
    start: new FormControl<Date | null>(null, Validators.required),
    end: new FormControl<Date | null>(null, Validators.required),
  });

  weekendDisable: (date: Date | null) => boolean =
  (date: Date | null) => {
    if (!date) {
      return false;
    }
    const day = date.getDay();
    if (day === 0 || day === 6)
      return false;
    return true;
  };

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // conso le.log(cellDate.getMonth())
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const weekend = cellDate.getDay();
      if (weekend === 0 || weekend === 6)
        return 'fin-de-semana'
      else {
        const date = cellDate.getDate();
        return date === 1 || date === 5 || date === 15 ? 'dias-festivos' : '';
      }
    }
    return '';
  };

  onDateRangeChange(): void {
    if (!this.range.value.start || !this.range.value.end)
      return;
    // const rangeInputs = new DateRange(this.range.value.start, this.range.value.end);
    this.planesService.rangeSelected(this.range.value.start, this.range.value.end)
  }

}
