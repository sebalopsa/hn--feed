import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  getFeed() {
    return lastValueFrom(this.http.get('http://localhost:3000/stories'));
  }

  deleteStory(objectID: string) {
    return lastValueFrom(
      this.http.patch(`http://localhost:3000/stories/${objectID}`, {
        deleted: true,
      })
    );
  }
}
