import {Component, OnInit} from '@angular/core';
import { Announcement } from './model/announcement';
import { HttpErrorResponse } from '@angular/common/http';
import { AnnouncementService } from './services/announcement.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public latestAnnouncements: Announcement[] = [];
  
  constructor(private announcementService: AnnouncementService) {
  }

  ngOnInit() {
    this.getAnnouncements();
  }

  public getAnnouncements(): void {
    this.announcementService.getAnnouncements().subscribe({
      next: (response: Announcement[]) => {
        var announcement: Announcement[]
        announcement = response;
        announcement.sort((f1, f2) => new Date(f2.creationDateTime).getTime() - new Date(f1.creationDateTime).getTime());
        announcement.sort((f1, f2) => f2.status === 'closed' ? -1 : 1)
        this.latestAnnouncements = announcement.slice(0,2)
        },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
}
