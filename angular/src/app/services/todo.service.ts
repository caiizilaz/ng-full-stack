import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../class/config';

@Injectable()
export class TodoService {
  constructor(
    private http: Http,
    private config: Config) { }
  addItem(item) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.config.api}todos/create`, item, { headers: headers })
      .map(res => res.json());
  }
  getItem() {
    return this.http.get(`${this.config.api}todos/read`)
      .map(res => res.json());
  }
  deleteItem(id) {
    return this.http.delete(`${this.config.api}todos/delete/${id}`)
      .map(res => res.json());
  }
  updateItem(item) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(`${this.config.api}todos/update`, item, { headers: headers })
      .map(res => res.json());
  }
}
