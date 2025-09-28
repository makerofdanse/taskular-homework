import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-task-form',
    imports: [FormsModule],
    templateUrl: './task-form.html',
    styleUrl: './task-form.css',
})
export class TaskForm {
    newTask = '';
    @Output() taskAdded = new EventEmitter<string>();

    add() {
        this.taskAdded.emit(this.newTask);
        this.newTask = '';
    }
}
