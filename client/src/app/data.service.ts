import { Injectable } from '@angular/core';
import DATA from '../assets/data.json';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  data = DATA;
  getFeed() {
    return this.data;
  }
}
