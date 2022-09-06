import { Component } from '@angular/core';
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

  isToday(date: string | Date) {
    date = new Date(date);
    let today = new Date();
    return (
      date.getDate() == today.getDate() &&
      date.getMonth() == today.getMonth() &&
      date.getFullYear() == today.getFullYear()
    );
  }

  isYesterday(date: string | Date) {
    date = new Date(date);

    let yesterdayDate = new Date().getDate() - 1;

    let yesterday = new Date();
    yesterday.setDate(yesterdayDate);

    return (
      date.getDate() == yesterday.getDate() &&
      date.getMonth() == yesterday.getMonth() &&
      date.getFullYear() == yesterday.getFullYear()
    );
  }
}
