import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import * as AppointmentActions from './appointment.actions';
import { AppointmentService } from '../../core/services/appointment.service';

@Injectable()
export class AppointmentEffects {
  constructor(
    private actions$: Actions,
    private appointmentService: AppointmentService
  ) {}

  loadAppointments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppointmentActions.loadAppointments),
      mergeMap(() =>
        this.appointmentService.getAppointments().pipe(
          map(appointments => AppointmentActions.loadAppointmentsSuccess({ appointments }))
        )
      )
    )
  );
}