import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.less'
})
export class BlogComponent {
  constructor(public navService: NavigationService
              , private notificationService: NotificationService
    ) { }
}
