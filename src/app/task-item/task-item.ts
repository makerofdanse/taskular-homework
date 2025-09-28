import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-task-item',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './task-item.html',
    styleUrl: './task-item.css',
})
export class TaskItem {
    @Input() task: any;
    @Output() deleted = new EventEmitter<number>();
    @Output() toggled = new EventEmitter<number>();
    @Output() editStarted = new EventEmitter<number>();
    @Output() editSaved = new EventEmitter<{ id: number; text: string }>();
    @Output() editCanceled = new EventEmitter<number>();

    onDelete() {
        this.deleted.emit(this.task.id);
    }
    onToggle() {
        this.toggled.emit(this.task.id);
    }
    onStartEdit() {
        this.editStarted.emit(this.task.id);
    }
    onSaveEdit() {
        this.editSaved.emit({ id: this.task.id, text: this.task.editText });
    }
    onCancelEdit() {
        this.editCanceled.emit(this.task.id);
    }
}
