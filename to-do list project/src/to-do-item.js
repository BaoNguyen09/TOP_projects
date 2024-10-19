export class ToDoItem {
    static counter = 0;

    constructor(title, description, dueDate, priority, status) {
        this.id = ToDoItem.counter++;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = false;
    }

    print() {
        console.log(`${this.title}(${this.id}) + ${this.description} + ${this.dueDate} + ${this.priority}`);
    }

    changeTitle(title) {
        this.title = title;
    }

    changeDescription(desc) {
        this.description = desc;
    }

    changeDueDate(dueDate) {
        this.dueDate = dueDate;
    }

    changePriority(priority) {
        this.priority = priority;
    }

    changeStatus() {
        this.status = !this.status;
    }
}