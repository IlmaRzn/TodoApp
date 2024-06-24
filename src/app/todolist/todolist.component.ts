import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

interface Task {
  taskName: string;
  isCompleted: boolean;
  isEditing: boolean;
}

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent {
  taskArray: Task[] = [{ taskName: 'hello', isCompleted: false, isEditing: false }];
  displayedColumns: string[] = ['task', 'completed', 'edit', 'delete'];
  taskName: string = '';
  dataSource:MatTableDataSource<Task>

  constructor(){
    this.dataSource = new MatTableDataSource<Task>(this.taskArray)
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    const newTask: Task = {
    taskName: this.taskName,
    isCompleted: false,
    isEditing: false
  };

  this.taskArray.push(newTask);
  this.dataSource.data = this.taskArray
  console.log('new task added',newTask)
  form.resetForm();
  this.taskName = '';

  console.log('task array', this.taskArray)
  }

  onDelete(index: number) {
    if (index >= 0 && index < this.taskArray.length) {
      this.taskArray.splice(index, 1);
      this.dataSource.data = this.taskArray
    }
  }

  onCheck(task: Task) {
    task.isCompleted = !task.isCompleted;
    this.dataSource.data = this.taskArray
  }

  onEdit(task: Task) {
    task.isEditing = !task.isEditing;
    if (!task.isEditing) {
      console.log(`Task updated: ${task.taskName}`);
    }
  }
}
