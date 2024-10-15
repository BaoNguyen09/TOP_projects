export class ToDoList {

    constructor(items, header) {
        this.items = items;
        this.header = header;
    }

    print() {
        console.log(`List Header: ${this.header}`);
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