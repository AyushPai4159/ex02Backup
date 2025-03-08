import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CreateLinkService } from '../../create-link.service';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { URLObject } from '/workspaces/ex02-link-share-ayushTheunc/src/app/create-link.service';

export interface ShowSubmission {
  data: URLObject[];
}

@Component({
  selector: 'app-show-all',
  imports: [AsyncPipe],
  templateUrl: './show-all.component.html',
  styleUrl: './show-all.component.css',
})
export class ShowAllComponent implements OnInit {
  constructor(private service: CreateLinkService) {}

  submittedValues: WritableSignal<ShowSubmission | null> = signal(null);

  ngOnInit() {
    this.service.getAllResources().subscribe((config) => {
      console.log(config);
      this.submittedValues.set({ data: config });
    });
  }
}
