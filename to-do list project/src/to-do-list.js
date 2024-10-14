class ToDoList {

    constructor(items, header) {
        this.items = items;
        this.header = header;
    }

    addItem(item) {
        this.items.push(item);
    }

    changeHeader(header) {
        this.header = header;
    }
}