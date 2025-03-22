import { createReducer, on } from '@ngrx/store';
import * as AppointmentActions from './appointment.actions';
import { Appointment } from '../../core/models/appointment.model';

export interface AppointmentState {
  appointments: Appointment[];
}

const initialState: AppointmentState = {
  appointments: []
};

export const appointmentReducer = createReducer(
  initialState,
  on(AppointmentActions.loadAppointmentsSuccess, (state, { appointments }) => ({
    ...state,
    appointments
  })),
  on(AppointmentActions.addAppointment, (state, { appointment }) => ({
    ...state,
    appointments: [...state.appointments, appointment]
  })),
  on(AppointmentActions.updateAppointment, (state, { appointment }) => ({
    ...state,
    appointments: state.appointments.map(a => a.id === appointment.id ? appointment : a)
  })),
  on(AppointmentActions.deleteAppointment, (state, { id }) => ({
    ...state,
    appointments: state.appointments.filter(a => a.id !== id)
  }))
);