import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.less'
})
export class ReportsComponent {
  constructor(public navService: NavigationService
              , private notificationService: NotificationService
    ) { }

}
