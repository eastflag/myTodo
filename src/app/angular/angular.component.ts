import {Component} from "@angular/core";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translate(0, 0)'})),
      transition('void => *', [
        style({transform: 'translate(-100%, 0)'}),
        animate(1000)
      ]),
      transition('* => void', [
        animate(1000, style({transform: 'translate(0, -100%)', opacity: '0'}))
      ])
    ])
  ]
})
export class AngularComponent {
  todo: string;
  todoList = [];

  add_todo() {
    const item = {
      isFinished: false,
      todo: this.todo,
      created: this.getCurrentDate(),
      updated: this.getCurrentDate()
    };

    this.todoList.push(item);

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
    item.updated = this.getCurrentDate();
  }

  delete(index: number) {
    const result = confirm('삭제하시겠습니까?');
    if (result) {
      this.todoList.splice(index, 1);
    }
  }
}
