import {Component, OnInit} from "@angular/core";
import {AppService} from "../app.service";

@Component({
  templateUrl: './http.component.html',
  styleUrls: ['./http.component.scss']
})
export class HttpComponent implements OnInit {
  todo: string;
  todoList = [];

  constructor(private appService: AppService) {

  }

  ngOnInit(): void {
    this.getTodoList();
  }

  getTodoList() {
    this.appService.getTodoList()
      .then(data => {
        this.todoList = data;
      });
  }

  add_todo() {
    var params = {
      todo: this.todo,
    };

    this.appService.addTodo(params)
      .then(data => {
        console.log(data);
        this.getTodoList();
      });

    this.todo = null;
  }

  getCurrentDate(): string {
    const date = new Date();
    return date.getFullYear() + "-" + (this.addZero(date.getMonth() + 1)) + "-" + this.addZero(date.getDate()) + " "
      + this.addZero(date.getHours()) + ":" + this.addZero(date.getMinutes()) + ":" + this.addZero(date.getSeconds());
  }

  addZero(digit: number): string {
      // digit 가 문자가 아니라 숫자이다 digit.length로는 안됨.
      if (digit < 10) {
        return "0" + digit;
      } else {
        return "" + digit;
      }
  }

  update(item: any) {
    item.isFinished = !item.isFinished;

    var params = {
      isFinished: item.isFinished,
      todo_id: item.todo_id
    };
    this.appService.updateTodo(params)
      .then(data => {
        console.log(data);
        this.getTodoList();
      });
  }

  delete(item: any) {
    const result = confirm(item.todo + '을(를) 삭제하시겠습니까?');
    if (result) {
      var params = {
        todo_id: item.todo_id
      };
      this.appService.deleteTodo(params)
        .then(data => {
          this.getTodoList();
        });
    }
  }
}
