import { Injectable } from '@angular/core';
import {TodoItem} from '../interfaces/todo-item';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private todoListRef: AngularFireList<TodoItem>;
  private todoList: Observable<TodoItem[]>;

  constructor(private db: AngularFireDatabase) {
    this.todoListRef = db.list('/todoList');
  }

  getTodoList(): Observable<TodoItem[]> {
    this.todoList = this.todoListRef.valueChanges().pipe(
        map(changes =>
          changes.map(c => ({ title: c.title, completed: c.completed, url: c.url })))
    );

    return this.todoList;
  }

  addItem(item: TodoItem): void {
    this.todoListRef.push(item);
  }

  removeItem(item: TodoItem): void {
    this.todoListRef.remove(item.title);
  }
}
