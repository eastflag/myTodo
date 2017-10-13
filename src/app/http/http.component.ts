import {Component, OnInit} from "@angular/core";
import {AppService} from "../app.service";
import {TodoVo} from "../domain/todo.vo";

@Component({
  templateUrl: './http.component.html',
  styleUrls: ['./http.component.scss']
})
export class HttpComponent implements OnInit {
  newTodo: TodoVo;
  todoList = [];
  // 취소시 복원하기 위한 데이터를 저장하는 컬렉션 :  number 에는 todo_id 저장
  tempTodoList: Map<number, TodoVo> = new Map<number, TodoVo>();

  constructor(private appService: AppService) {
    this.newTodo = new TodoVo();
  }

  ngOnInit(): void {
    this.getTodoList();
  }

  getTodoList() {
    console.log('getTodoList');
    this.appService.getTodoList()
      .then(data => {
        this.todoList = data;
      });
  }

  add_todo() {
    this.appService.addTodo(this.newTodo)
      .then(data => {
        this.todoList.unshift(data);
      });

    this.newTodo = new TodoVo();
  }

  update(item: TodoVo) {
    this.appService.updateTodo(item)
      .then((data: TodoVo) => {
        item.isFinished = data.isFinished;
        item.todo = data.todo;
        // 에디터 상태 복원
        item.isEdited = false;
      });
  }

  delete(todoVo: TodoVo) {
    const result = confirm(todoVo.todo + '을(를) 삭제하시겠습니까?');
    if (result) {
      this.appService.deleteTodo(todoVo.todo_id)
        .then(data => {
          this.todoList.forEach((item, index) => {
            if (item.todo_id === todoVo.todo_id) {
              this.todoList.splice(index, 1);
            }
          });
        });
    }
  }

  save(todoVo: TodoVo) {
    todoVo.isEdited = true;

    let tempTodo = new TodoVo();
    tempTodo.isFinished = todoVo.isFinished;
    tempTodo.todo = todoVo.todo;
    this.tempTodoList.set(todoVo.todo_id, tempTodo);
  }

  restore(todoVo: TodoVo) {
    todoVo.isEdited = false;

    let tempTodo = this.tempTodoList.get(todoVo.todo_id);
    todoVo.isFinished = tempTodo.isFinished;
    todoVo.todo = tempTodo.todo;
  }
}
