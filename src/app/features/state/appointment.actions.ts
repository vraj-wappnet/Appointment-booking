import { createAction, props } from '@ngrx/store';
import { Appointment } from '../../core/models/appointment.model';

export const loadAppointments = createAction('[Appointment] Load Appointments');
export const loadAppointmentsSuccess = createAction(
  '[Appointment] Load Appointments Success',
  props<{ appointments: Appointment[] }>()
);
export const addAppointment = createAction(
  '[Appointment] Add Appointment',
  props<{ appointment: Appointment }>()
);
export const updateAppointment = createAction(
  '[Appointment] Update Appointment',
  props<{ appointment: Appointment }>()
);
export const deleteAppointment = createAction(
  '[Appointment] Delete Appointment',
  props<{ id: string }>()
);