import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.scss'],
})
export class FeedListComponent {
  items: any[] = [];
  constructor(public api: ApiService) {
    this.refreshFeed();
  }

  refreshFeed() {
    this.api.getFeed().then((data) => (this.items = data as any[]));
  }

  goToUrl(url: string) {
    if (url) window.open(url, '_blank');
  }
  delete(id: string) {
    if (confirm(`Deleting story ${id}. Are you sure?`)) {
      this.api.deleteStory(id).then(() => this.refreshFeed());
    }
  }
}
