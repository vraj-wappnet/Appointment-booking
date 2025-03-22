import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppointmentState } from './appointment.reducer';

// Feature selector to get the appointment state
export const selectAppointmentState = createFeatureSelector<AppointmentState>('appointments');

// Selector to get all appointments
export const selectAppointments = createSelector(
  selectAppointmentState,
  (state: AppointmentState) => state.appointments
);