import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { filter, map, shareReplay } from 'rxjs';

import { ReportsService } from '../../services/reports.service';

export const multi = [
  {
    name: 'Germany',
    series: [
      {
        name: '1990',
        value: 62000000,
      },
      {
        name: '2010',
        value: 73000000,
      },
      {
        name: '2011',
        value: 89400000,
      },
    ],
  },

  {
    name: 'USA',
    series: [
      {
        name: '1990',
        value: 250000000,
      },
      {
        name: '2010',
        value: 309000000,
      },
      {
        name: '2011',
        value: 311000000,
      },
    ],
  },

  {
    name: 'France',
    series: [
      {
        name: '1990',
        value: 58000000,
      },
      {
        name: '2010',
        value: 50000020,
      },
      {
        name: '2011',
        value: 58000000,
      },
    ],
  },
  {
    name: 'UK',
    series: [
      {
        name: '1990',
        value: 57000000,
      },
      {
        name: '2010',
        value: 62000000,
      },
    ],
  },
];

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

type Series = {
  name: string;
  value: number;
};

type ChartData = {
  name: string;
  series: Series[];
};

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    NgxChartsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    AsyncPipe,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  providers: [provideMomentDateAdapter(MY_FORMATS)],
})
export class MainPageComponent implements OnInit {
  form = new FormGroup({
    date: new FormControl(moment()),
    dealer: new FormControl(''),
  });

  multi: ChartData[] = [];
  view: [number, number] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Sales';
  timeline: boolean = true;

  colorScheme = {
    name: 'Variation',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  private readonly data$ = this.reportsService.getData().pipe(shareReplay());
  dealers$ = this.data$.pipe(
    map((data) => data.map((d) => d.Dealer)),
    map((dealers) => Array.from(new Set(dealers)))
  );

  dates$ = this.data$.pipe(
    map((data) => data.map((d) => d.Date)),
    map((dates) => Array.from(new Set(dates)))
  );

  constructor(private reportsService: ReportsService) {
    // Object.assign(this, { multi });
  }

  ngOnInit(): void {}

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  setMonthAndYear(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.form.controls.date.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.form.controls.date.setValue(ctrlValue);
    datepicker.close();
  }

  onGetData(): void {
    const date = moment(this.form.getRawValue().date).format('yyyy-MM');
    const dealer = this.form.getRawValue().dealer;

    this.data$
      .pipe(
        map((data) =>
          data.filter((d) => d.Date.includes(date) && d.Dealer === dealer)
        ),
        map((data) => {
          return [
            {
              name: dealer!,
              series: data.map(
                (item) =>
                  ({ name: item.Date, value: item.SalesActualsDaily } as Series)
              ),
            },
          ];
        })
      )
      .subscribe({
        next: (results: ChartData[]) => {
          console.log(results);
          this.multi = [...results];
        },
        error: (e) => console.error,
      });
  }
}
