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
    imports: [TaskForm, TaskItem, DragDropModule],
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App {
    protected readonly title = signal('taskular-homework');

    tasks: Task[] = [];
    nextId = 1;
    filter: 'all' | 'active' | 'completed' = 'all';

    addTask(text: string) {
        if (text.trim()) {
            this.tasks.push({ id: this.nextId++, text, completed: false });
        }
    }

    deleteTask(id: number) {
        this.tasks = this.tasks.filter((todo) => todo.id !== id);
    }

    toggleTask(id: number) {
        const todo = this.tasks.find((t) => t.id === id);
        if (todo) todo.completed = !todo.completed;
    }

    clearCompleted() {
        this.tasks = this.tasks.filter((todo) => !todo.completed);
    }

    setFilter(filter: 'all' | 'active' | 'completed') {
        this.filter = filter;
    }

    get filteredTasks() {
        return this.tasks.filter((todo) => {
            if (this.filter === 'active') return !todo.completed;
            if (this.filter === 'completed') return todo.completed;
            return true;
        });
    }

    get hasCompletedTasks(): boolean {
        return this.tasks.some((t) => t.completed);
    }

    drop(event: CdkDragDrop<Task[]>) {
        moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    }

    startEdit(id: number) {
        const todo = this.tasks.find((t) => t.id === id);
        if (todo) {
            todo.editing = true;
            todo.editText = todo.text;
        }
    }

    saveEdit(id: number, newText: string) {
        const todo = this.tasks.find((t) => t.id === id);
        if (todo && newText.trim()) {
            todo.text = newText;
            todo.editing = false;
        }
    }

    cancelEdit(id: number) {
        const todo = this.tasks.find((t) => t.id === id);
        if (todo) todo.editing = false;
    }
}
