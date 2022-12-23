import { Component, OnInit } from '@angular/core';
import { Announcement } from '../model/announcement';
import { AnnouncementService } from '../services/announcement.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  public announcements: Announcement[] = [];
  public latestAnnouncement!: Announcement | undefined;

  constructor(private announcementService: AnnouncementService) {
  }

  ngOnInit() {
    this.getAnnouncements();
  }

  public getAnnouncements(): void {
    this.announcementService.getAnnouncements().subscribe({
      next: (response: Announcement[]) => {
        this.announcements = response;
        this.announcements.sort((f1, f2) => new Date(f2.creationDateTime).getTime() - new Date(f1.creationDateTime).getTime());
        this.announcements.sort((f1, f2) => f2.status === 'closed' ? -1 : 1)
        this.latestAnnouncement = this.announcements[0]
        this.announcements.splice(0,1)
        },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

}
