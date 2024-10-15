class Project {

    constructor(lists, title, note) {
        this.lists = lists;
        this.title = title;
        this.note = note;
    }

    print() {
        console.log(`This is project: ${this.title}. Here are some notes: \n${this.note}`);
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