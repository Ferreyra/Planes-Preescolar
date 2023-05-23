import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateRange, MatCalendarCellClassFunction, MatDateRangeInput, MatDateRangePicker } from '@angular/material/datepicker';

@Component({
  selector: 'fechas-rango',
  templateUrl: './fechas.component.html',
  styleUrls: ['./fechas.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FechasComponent {
  
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

  diasLaborales(range: DateRange<Date>): number {
    if (!range.start || !range.end) {
      return 0;
    }
    let weekdaysCount = 0;
    let currentDate = new Date(range.start);
    while (currentDate <= range.end) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Ignora domingos (0) y sábados (6)
        weekdaysCount++;
      }
      currentDate.setDate(currentDate.getDate() + 1); // Incrementa un día
    }
    return weekdaysCount;
  }

  onDateRangeChange(): void {
    if (!this.range.value.start || !this.range.value.end)
      return
    const rangeSeleted = new DateRange(this.range.value.start, this.range.value.end)
    const weekdaysCount = this.diasLaborales(rangeSeleted);
    console.log(`Días laborables en el rango: ${weekdaysCount}`);
  }

}
