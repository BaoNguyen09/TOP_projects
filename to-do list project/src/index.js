import { Project } from "./project";
import { ToDoItem } from "./to-do-item";
import { ToDoList } from "./to-do-list";

let item1 = new ToDoItem("title 1", "description", "today", "4");
let item2 = new ToDoItem("title 2", "description", "today", "4");
let item3 = new ToDoItem("title 3", "description", "today", "4");
let item4 = new ToDoItem("title 4", "description", "today", "4");
let item5 = new ToDoItem("title 1", "description", "today", "4");
let item6 = new ToDoItem("title 2", "description", "today", "4");
let item7 = new ToDoItem("title 3", "description", "today", "4");
let item8 = new ToDoItem("title 4", "description", "today", "4");
let items = [item1, item2, item3, item4];
let items1 = [item5, item6, item7, item8];

let list1 = new ToDoList(items, "List of tasks 1");
let list2 = new ToDoList(items1, "List of tasks 2");
let list3 = new ToDoList(items, "List of tasks 3");
let list4 = new ToDoList(items, "List of tasks 4");
let lists = [list1, list2, list3, list4];

let project = new Project(lists, "Project 1", "No note");
project.changeTitle("title changed!");
project.print();
