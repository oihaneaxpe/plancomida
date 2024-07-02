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
        },
        className: 'custom-notyf-success'
      },
      {
        type: 'error',
        background: '#f44336',
        icon: {
          className: 'material-icons',
          tagName: 'i',
          text: 'error',
        },
        className: 'custom-notyf-error'
      }
    ]
  });

  showNotification(type: 'success' | 'error' | 'warning', title: string, description: string): void {
    let icon = '';
    let className = '';

    switch (type) {
      case 'success':
        icon = 'check_circle';
        className = 'custom-notyf-success';
        break;
      case 'error':
        icon = 'error';
        className = 'custom-notyf-error';
        break;
      case 'warning':
        icon = 'warning';
        className = 'custom-notyf-warning';
        break;
      default:
        break;
    }

    const options = {
      message: `
        <div class="custom-notyf-message">
          <div class="custom-notyf-content">
            <div class="custom-notyf-title">
              <i class="material-icons">${icon}</i>
              ${title}
            </div>
            <div class="custom-notyf-description">${description}</div>
          </div>
        </div>
      `,
      className: className,
      closeWith: ['click'], // Permite cerrar haciendo clic en cualquier lugar del mensaje
      dismissible: false // Evita que se cierre automáticamente
    };

    this.notyf.open(options);
  }

  showSuccess(message: string): void {
    this.notyf.success({
      message,
      icon: '<i class="material-icons">check_circle</i>',
      className: 'custom-notyf-success'
    });
  }

  showError(message: string): void {
    this.notyf.error({
      message,
      icon: '<i class="material-icons">error</i>',
      className: 'custom-notyf-error'
    });
  }

  showWarning(message: string): void {
    this.notyf.error({
      message,
      icon: '<i class="material-icons">warning</i>',
      className: 'custom-notyf-warning'
    });
  }
}
