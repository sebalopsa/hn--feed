import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.scss'],
})
export class FeedListComponent {
  items: any[] = [];
  constructor(public dataSrv: DataService) {
    this.items = dataSrv.getFeed();
  }

  goToUrl(url: string) {
    if (url) window.open(url, '_blank');
  }
  delete() {}
}
