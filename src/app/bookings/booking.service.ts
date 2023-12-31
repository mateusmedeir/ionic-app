import { Injectable } from '@angular/core';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private _bookings: Booking[] = [
    {
      id: 'xyz',
      placeId: 'p1',
      userId: 'abc',
      placeTitle: 'Manhattan Mansion',
      guestNumber: 2
    }
  ];

  get bookings() {
    return [...this._bookings];
  }

  cancelBooking(bookingId: string) {
    this._bookings = this._bookings.filter(booking => booking.id === bookingId);
  }

  constructor() { }
}
