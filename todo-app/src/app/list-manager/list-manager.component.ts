import { Component, OnInit } from '@angular/core';
import {TodoListService} from '../services/todo-list.service';
import {TodoItem} from '../interfaces/todo-item';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-list-manager',
  templateUrl: './list-manager.component.html',
  styleUrls: ['./list-manager.component.scss']
})
export class ListManagerComponent implements OnInit {
  public todoList$: Observable<TodoItem[]>;

  constructor(private todoListService: TodoListService) {}

  ngOnInit(): void {
    this.todoList$ = this.todoListService.getTodoList();
  }

  addItem(title: string) {
    this.todoListService.addItem({title});
  }

  removeItem(item: TodoItem) {
    this.todoListService.removeItem(item);
  }
}
