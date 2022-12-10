import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Fundraise } from '../model/fundraise';
import { FundraisesService } from '../services/fundraises.service';

@Component({
  selector: 'app-fundraises',
  templateUrl: './fundraises.component.html',
  styleUrls: ['./fundraises.component.css']
})
export class FundraisesComponent implements OnInit {
  public fundraises: Fundraise[] = [];
  public totalFundsRaised: number = 0;
  public totalPeopleHelped: number = 0;
  public totalFundraisesCompleted: number = 0;
  public totalWebsiteVisits: number = 0;

  constructor(private fundraiseService: FundraisesService) { }

  ngOnInit() {
    this.getFundraises();
  }

  public getFundraises(): void {
    this.fundraiseService.getFundraises().subscribe({
      next: (response: Fundraise[]) => {
        this.fundraises = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public calculateTillFundraise(fundraise: Fundraise): string {
    var toEndTime = new Date(fundraise.endingDate).getTime() - new Date().getTime();
    var toStartTime = new Date(fundraise.startingDate).getTime() - new Date().getTime();
    if (String(toStartTime) < String(0)) {
      if (String(toEndTime) < String(0)) {
        return 'Ended ' + Math.abs(Math.floor(toEndTime / (1000 * 60 * 60 * 24))) + ' days ago.'
      } else {
        return 'Ending in ' + Math.abs(Math.floor(toEndTime / (1000 * 60 * 60 * 24))) + ' days.'
      }
    } else {
      return 'Starting in ' + Math.abs(Math.floor(toStartTime / (1000 * 60 * 60 * 24))) + ' days.'
    }
  }
}