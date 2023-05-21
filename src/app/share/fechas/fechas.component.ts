import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateRange, MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
  selector: 'fechas-rango',
  templateUrl: './fechas.component.html',
  styleUrls: ['./fechas.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FechasComponent implements OnInit{
  
  public range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();
      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'dias-festivos' : '';
    }
    return '';
  };

  // @ViewChild('picker') picker!: MatDateRangePicker<Date>;
  constructor() { }

  ngOnInit(): void {
    // this.onDateRangeChange()
    // this.picker.stateChanges.subscribe(this.onDateRangeChange)
  }

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

  onDateRangeChange(): void {   // range: DateRange<Date>
  // const weekdaysCount = this.diasLaborales(range);
  // console.log(`Días laborables en el rango: ${weekdaysCount}`);
    console.log(this.range)
  }

}
