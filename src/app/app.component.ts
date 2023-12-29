import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'todo_list';

  taskObj!: Task;
  taskList: Task[] = [];
  tagsList: string[] = [
    'Health',
    'Hobby',
    'Holiday',
    'Fun',
    'Market',
    'Eduction',
    'Travel',
  ];
  filterType: string = '';
  selectedTags: string = '';
  originalData: Task[] = [];
  constructor() {
    this.taskObj = new Task();
    const localData = localStorage.getItem('advTodoApp');
    if (localData != null) {
      this.taskList = JSON.parse(localData);
      this.originalData = this.taskList;
    }
  }

  creatNewTask() {
    // debugger;
    const task = JSON.stringify(this.taskObj);
    const parsTask = JSON.parse(task);
    this.taskList.push(parsTask);
    localStorage.setItem('advTodoApp', JSON.stringify(this.taskList));
    this.originalData = this.taskList;
  }
  onComplte() {
    debugger;
    const newData = this.taskList;
    localStorage.setItem('advTodoApp', JSON.stringify(this.taskList));
    this.originalData = this.taskList;
  }
  onRemove(index: number) {
    this.taskList.splice(index, 1);
    localStorage.setItem('advTodoApp', JSON.stringify(this.taskList));
    this.originalData = this.taskList;
  }
  getArryFromCommaSeperatedString(value: string): string[] {
    const arr = value.split(',');
    return arr;
  }
  setFilter(type) {
    this.filterType = type;
    this.selectedTags = '';
    if (this.filterType == 'showCompleted') {
      this.taskList = this.originalData.filter((m) => m.isComplete == true);
    } else {
      this.taskList = this.originalData;
    }
  }
  filterTeg(tagName) {
    this.selectedTags = tagName;
    const filterData = this.originalData.filter((item) => {
      return item.tags.includes(tagName);
    });
    this.taskList = filterData;
  }
}
export class Task {
  taskName!: string;
  dueDate!: string;
  tags!: string;
  isComplete!: Boolean;
  constructor() {
    this.taskName = '';
    this.dueDate = '';
    this.tags = '';
    this.isComplete = false;
  }
}
