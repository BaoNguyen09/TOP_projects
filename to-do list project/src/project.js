class Project {
    static counter = 0;

    constructor(lists, title, note) {
        this.id = Project.counter++;
        this.lists = lists;
        this.title = title;
        this.note = note;
    }

    print() {
        console.log(`This is project: ${this.title}(${this.id}). Here are some notes: \n${this.note}`);
        for (let list of this.lists) {
            list.print();
        }
    }

    addList(list) {
        this.lists.push(list);
    }

    changeTitle(title) {
        this.title = title;
    }

    editNote(note) {
        this.note = note;
    }
}

export { Project }