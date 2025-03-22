import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Appointment } from '../../../../core/models/appointment.model';
import { EmailService } from '../../../../core/services/email.service';
import { addAppointment } from '../../../state/appointment.actions';

@Component({
  selector: 'app-appointment-form',
  template: `
    <form [formGroup]="appointmentForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <input matInput placeholder="Patient Name" formControlName="patientName" required>
        <mat-error *ngIf="appointmentForm.get('patientName')?.hasError('required')">Required</mat-error>
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Email" formControlName="email" required>
        <mat-error *ngIf="appointmentForm.get('email')?.hasError('email')">Invalid email</mat-error>
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Phone Number" formControlName="phoneNumber" required>
        <mat-error *ngIf="appointmentForm.get('phoneNumber')?.hasError('pattern')">10 digits required</mat-error>
      </mat-form-field>
      <mat-form-field>
        <input matInput [matDatepicker]="picker" placeholder="Appointment Date" formControlName="appointmentDate" required>
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Time Slot</mat-label>
        <mat-select formControlName="timeSlot" required>
          <mat-option *ngFor="let slot of timeSlots" [value]="slot">{{ slot }}</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Status</mat-label>
        <mat-select formControlName="status" required>
          <mat-option *ngFor="let status of statuses" [value]="status">{{ status }}</mat-option>
        </mat-select>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit" [disabled]="appointmentForm.invalid">Book Appointment</button>
    </form>
  `
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm: FormGroup;
  timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00'];
  statuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private emailService: EmailService
  ) {
    this.appointmentForm = this.fb.group({
      patientName: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      appointmentDate: ['', Validators.required],
      timeSlot: ['', Validators.required],
      status: ['Pending', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.appointmentForm.valid) {
      const appointment: Appointment = {
        ...this.appointmentForm.value,
        id: Math.random().toString(36).substr(2, 9),
        appointmentDate: this.formatDate(this.appointmentForm.value.appointmentDate)
      };
      this.store.dispatch(addAppointment({ appointment }));
      this.emailService.sendConfirmationEmail(appointment).subscribe();
      this.appointmentForm.reset({ status: 'Pending' });
    }
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;
  }
}