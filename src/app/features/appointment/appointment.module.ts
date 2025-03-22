import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppointmentEffects } from '../state/appointment.effects';
import { appointmentReducer } from '../state/appointment.reducer';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { AppointmentDashboardComponent } from './components/appointment-dashboard/appointment-dashboard.component';
import { AppointmentCalendarComponent } from './components/appointment-calendar/appointment-calendar.component';

@NgModule({
  declarations: [
    AppointmentFormComponent,
    AppointmentDashboardComponent,
    AppointmentCalendarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    StoreModule.forFeature('appointments', appointmentReducer),
    EffectsModule.forFeature([AppointmentEffects])
  ],
  exports: [AppointmentDashboardComponent]
})
export class AppointmentModule {}