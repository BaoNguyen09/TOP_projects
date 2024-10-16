export class ToDoList {
    static counter = 0;

    constructor(items, header) {
        this.id = ToDoList.counter++;
        this.items = items;
        this.header = header;
    }

    print() {
        console.log(`List Header: ${this.header}(${this.id})`);
        for (let item of this.items) {
            item.print();
        }
    }

    addItem(item) {
        this.items.push(item);
    }

    changeHeader(header) {
        this.header = header;
    }
}