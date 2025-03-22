export interface Appointment {
    id?: string;
    patientName: string;
    email: string;
    phoneNumber: string;
    appointmentDate: string; // Format: dd-mm-yyyy
    timeSlot: string;
    status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  }