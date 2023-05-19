import { Component, NgZone, ViewChild, ViewEncapsulation } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormControl, FormGroup } from '@angular/forms';
import { take } from 'rxjs'
import { DateRange, MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
  selector: 'actividades',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlanesComponent {

  constructor (private _ngZone: NgZone) {}
  
  public range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  public dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();
      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'dias-festivos' : '';
    }
    return '';
  };

  @ViewChild('autosize')
  autosize!: CdkTextareaAutosize;

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

  onDateRangeChange(event: Event): void {   // range: DateRange<Date>
    // const weekdaysCount = this.diasLaborales(range);
    // console.log(`Días laborables en el rango: ${weekdaysCount}`);
    console.log('e', event)
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

}
