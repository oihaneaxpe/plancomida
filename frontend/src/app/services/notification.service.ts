import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notyf = new Notyf({
    duration: 3000,
    position: { x: 'right', y: 'top' },
    types: [
      {
        type: 'success',
        background: '#4caf50',
        icon: {
          className: 'material-icons',
          tagName: 'i',
          text: 'check_circle',
        }
      },
      {
        type: 'error',
        background: '#f44336',
        icon: {
          className: 'material-icons',
          tagName: 'i',
          text: 'error',
        }
      }
    ]
  });

  showSuccess(message: string): void {
    this.notyf.success(message);
  }

  showError(message: string): void {
    this.notyf.error(message);
  }
}
