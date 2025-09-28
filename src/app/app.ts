import { Component, signal } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { TaskForm } from './task-form/task-form';
import { TaskItem } from './task-item/task-item';

interface Task {
    id: number;
    text: string;
    completed: boolean;
    editing?: boolean;
    editText?: string;
}

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [TaskForm, TaskItem, DragDropModule],
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App {
    protected readonly title = signal('Taskular');
    protected readonly hasCompletedTasks = signal(false);

    tasks: Task[] = [];
    nextId = 1;
    filter: 'all' | 'active' | 'completed' = 'all';

    addTask(text: string) {
        if (text.trim()) {
            this.tasks.push({ id: this.nextId++, text, completed: false });
            this.updateHasCompletedTasks();
        }
    }

    deleteTask(id: number) {
        this.tasks = this.tasks.filter((task) => task.id !== id);
        this.updateHasCompletedTasks();
    }

    toggleTask(id: number) {
        const task = this.tasks.find((t) => t.id === id);
        if (task) task.completed = !task.completed;
        this.updateHasCompletedTasks();
    }

    clearCompleted() {
        this.tasks = this.tasks.filter((task) => !task.completed);
        this.updateHasCompletedTasks();
    }

    setFilter(filter: 'all' | 'active' | 'completed') {
        this.filter = filter;
    }

    get filteredTasks() {
        return this.tasks.filter((task) => {
            if (this.filter === 'active') return !task.completed;
            if (this.filter === 'completed') return task.completed;
            return true;
        });
    }

    private updateHasCompletedTasks() {
        this.hasCompletedTasks.set(this.tasks.some((t) => t.completed));
    }

    drop(event: CdkDragDrop<Task[]>) {
        moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    }

    startEdit(id: number) {
        const task = this.tasks.find((t) => t.id === id);
        if (task) {
            task.editing = true;
            task.editText = task.text;
        }
    }

    saveEdit(id: number, newText: string) {
        const task = this.tasks.find((t) => t.id === id);
        if (task && newText.trim()) {
            task.text = newText;
            task.editing = false;
        }
    }

    cancelEdit(id: number) {
        const task = this.tasks.find((t) => t.id === id);
        if (task) task.editing = false;
    }
}
