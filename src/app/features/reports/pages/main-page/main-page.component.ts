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
import { filter, map, shareReplay, tap } from 'rxjs';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {}
