import { Component, OnInit } from '@angular/core';
import { Announcement } from '../model/announcement';
import { AnnouncementService } from '../services/announcement.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

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

  public onAddAnnouncement(addForm: NgForm): void {
    document.getElementById('add-announcement-form')!.click();
    this.announcementService.addAnnouncement(addForm.value).subscribe({
      next: (response: Announcement) => {
        console.log(response);
        this.getAnnouncements();
        addForm.reset();
        },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    });
  }

  public onOpenModal(mode: string, announcement?: Announcement): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#addAnnouncementModal');
    container!.appendChild(button);
    button.click();
  }
}
