import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  item: String;
  itemList: any;
  constructor(
    private todoService: TodoService,
    private flashMessages: FlashMessagesService
  ) { }
  ngOnInit() {
    this.todoService.getItem().subscribe(data => {
      this.itemList = data;
    });
  }
  onAddItemSubmit() {
    const item = {
      item: this.item
    }
    this.item = undefined;
    this.todoService.addItem(item).subscribe(data => {
      this.chkFlash(data);
    });
  }
  onDeleteItem(id) {
    this.todoService.deleteItem(id).subscribe(data => {
      this.chkFlash(data);
    });
  }
  toggleSuccess(i) {
    const item = {
      _id: i._id,
      success: !i.success
    }
    this.todoService.updateItem(item).subscribe(data => {
      this.itemList = data.todo;
    });
  }
  chkFlash(data) {
    if (data.success) {
      this.itemList = data.todo;
      this.flashMessages.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
    } else {
      this.flashMessages.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
    }
  }
}
