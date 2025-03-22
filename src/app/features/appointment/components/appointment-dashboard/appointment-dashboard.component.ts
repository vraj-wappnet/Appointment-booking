import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Appointment } from '../../../../core/models/appointment.model';
import { deleteAppointment, loadAppointments, updateAppointment } from '../../../state/appointment.actions';
import { selectAppointments } from '../../../state/appointment.selectors';

@Component({
  selector: 'app-appointment-dashboard',
  template: `
    <mat-table [dataSource]="appointments$ | async">
      <ng-container matColumnDef="patientName">
        <mat-header-cell *matHeaderCellDef>Patient Name</mat-header-cell>
        <mat-cell *matCellDef="let appointment">{{ appointment.patientName }}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="email">
        <mat-header-cell *matHeaderCellDef>Email</mat-header-cell>
        <mat-cell *matCellDef="let appointment">{{ appointment.email }}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="appointmentDate">
        <mat-header-cell *matHeaderCellDef>Date</mat-header-cell>
        <mat-cell *matCellDef="let appointment">{{ appointment.appointmentDate }}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="timeSlot">
        <mat-header-cell *matHeaderCellDef>Time</mat-header-cell>
        <mat-cell *matCellDef="let appointment">{{ appointment.timeSlot }}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="status">
        <mat-header-cell *matHeaderCellDef>Status</mat-header-cell>
        <mat-cell *matCellDef="let appointment">
          <mat-select [(value)]="appointment.status" (selectionChange)="updateStatus(appointment)">
            <mat-option *ngFor="let status of statuses" [value]="status">{{ status }}</mat-option>
          </mat-select>
        </mat-cell>
      </ng-container>
      <ng-container matColumnDef="actions">
        <mat-header-cell *matHeaderCellDef>Actions</mat-header-cell>
        <mat-cell *matCellDef="let appointment">
          <button mat-button color="warn" (click)="deleteAppointment(appointment.id)">Cancel</button>
        </mat-cell>
      </ng-container>
      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
    </mat-table>
    <app-appointment-form></app-appointment-form>
    <app-appointment-calendar [appointments]="appointments$ | async"></app-appointment-calendar>
  `
})
export class AppointmentDashboardComponent implements OnInit {
  appointments$: Observable<Appointment[]>;
  displayedColumns = ['patientName', 'email', 'appointmentDate', 'timeSlot', 'status', 'actions'];
  statuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];

  constructor(private store: Store) {
    this.appointments$ = this.store.select(selectAppointments);
  }

  ngOnInit() {
    this.store.dispatch(loadAppointments());
  }

  updateStatus(appointment: Appointment) {
    this.store.dispatch(updateAppointment({ appointment }));
  }

  deleteAppointment(id: string) {
    this.store.dispatch(deleteAppointment({ id }));
  }
}