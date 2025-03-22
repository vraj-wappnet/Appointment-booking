import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailService {
  constructor(private http: HttpClient) {}

  sendConfirmationEmail(appointment: any): Observable<any> {
    // Mock email service (replace with real API)
    console.log(`Sending email to ${appointment.email} for appointment on ${appointment.appointmentDate}`);
    return of({ success: true });
  }
}