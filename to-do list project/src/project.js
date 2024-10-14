class Project {

    constructor(lists, title, note) {
        this.lists = lists;
        this.title = title;
        this.note = note;
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