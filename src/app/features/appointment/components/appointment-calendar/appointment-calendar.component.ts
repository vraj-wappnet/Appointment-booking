import { Component, Input } from '@angular/core';
import { Appointment } from '../../../../core/models/appointment.model';

@Component({
  selector: 'app-appointment-calendar',
  template: `
    <h2>Calendar View</h2>
    <div *ngFor="let appointment of appointments">
      {{ appointment.appointmentDate }} - {{ appointment.timeSlot }}: {{ appointment.patientName }} ({{ appointment.status }})
    </div>
  `
})
export class AppointmentCalendarComponent {
  @Input() appointments: Appointment[] = [];
}