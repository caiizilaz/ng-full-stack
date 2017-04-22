import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {
  constructor(private http: Http) { }
  addItem(item) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/todos/create', item, { headers: headers })
      .map(res => res.json());
  }
  getItem() {
    return this.http.get('http://localhost:3000/todos/read')
      .map(res => res.json());
  }
  deleteItem(id) {
    return this.http.delete('http://localhost:3000/todos/delete/' + id)
      .map(res => res.json());
  }
  updateItem(item) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/todos/update', item, { headers: headers })
      .map(res => res.json());
  }
}
