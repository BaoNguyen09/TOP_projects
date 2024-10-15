export class ToDoItem {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    print() {
        console.log(`${this.title} + ${this.description} + ${this.dueDate} + ${this.priority}`);
    }
}