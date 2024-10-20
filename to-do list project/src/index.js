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
// let items1 = [item5, item6, item7, item8];

// let list1 = new ToDoList(items, "List of tasks 1");
// let list2 = new ToDoList(items1, "List of tasks 2");
// let list3 = new ToDoList(items, "List of tasks 3");
// let list4 = new ToDoList(items, "List of tasks 4");
// let lists = [list1, list2, list3, list4];

// let project = new Project(lists, "Project 1", "No note");
// project.changeTitle("title changed!");
// project.print();

let divItems = document.querySelector(".items");
let ulItems = document.createElement("ul");

// List all items in a list
for (let item of items) {
    let divItem = document.createElement("li");
    divItem.textContent = `${item.title}; priority: ${item.priority}; note: ${item.description}`;
    divItem.dataset.id = `item: ${item.id}`;
    ulItems.append(divItem);
}
divItems.appendChild(ulItems);

// function for add item button
// let addItem = document.querySelector(".addItem");
// addItem.addEventListener("click", () => {
//     let divItem = document.createElement("li");
//     divItem.textContent = item5.title;
//     divItem.dataset.id = `item: ${item5.id}`;
//     ulItems.append(divItem);
// });
let addItem = () => {
    // console.log(e);
    let title = document.querySelector("#item_input").value;
    if (title) {
        let priority = document.querySelector("#priority").value;
        let description = document.querySelector("#description").value;
        let newItem = new ToDoItem(title, description, "today", priority);
        let divItem = document.createElement("li");
        // create checkbox for each item
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "status";
        checkbox.value = "done";
        checkbox.onchange = (e) => {
            console.log(checkbox.value);
        }
        divItem.append(checkbox);

        let textNode = document.createTextNode(` ${newItem.title}; priority: ${newItem.priority}; note: ${newItem.description}`);

        divItem.appendChild(textNode);
        divItem.dataset.id = `item: ${newItem.id}`;
        ulItems.append(divItem);
        document.querySelector("input").value = '';
    }
    
};

let btn = document.querySelector("#addItem");
btn.addEventListener("click", addItem);