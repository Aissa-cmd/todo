const addNewItemButton = document.querySelector(".todo-input-add-button");
const toDoItemsFilters = document.querySelector("#filter-todo-items");
const addNewItemText = document.querySelector("#todo-input-field");
const toDoItemsFromLocalStorage = JSON.parse(window.localStorage.getItem("todoItems"));
let toDoItemsToLocalStorage = [];
const newToDoItem = {
    // peoperties
    parentElement: document.querySelector(".todo-items-list"),
    itemDivContainer: null,

    // methods
    createItemContainer: function (containerClassList) {
        let itemContaianer = document.createElement("div");
        // itemContaianer.classList.add(containerClassList);
        itemContaianer.classList = [...containerClassList].join(" ");
        this.itemDivContainer = itemContaianer;
    },

    createItem: function (itemContent) {
        let item = document.createElement("li");
        item.classList.add("todo-item");
        item.textContent = itemContent;
        this.itemDivContainer.appendChild(item);
    },

    createItemButtons: function (className, buttonIcon) {
        let button = document.createElement("button");
        button.classList.add(className);
        button.innerHTML = buttonIcon;
        this.itemDivContainer.appendChild(button);
    },

    manageItemCreation: function (classL, content) {
        this.createItemContainer(classL);
        this.createItem(content);
        this.createItemButtons("item-check", '<i class="fas fa-check"></i>');
        this.createItemButtons("item-remove", '<i class="fas fa-trash-alt"></i>');
        this.parentElement.appendChild(this.itemDivContainer);
    },
};

window.addEventListener("keydown", function (e) {
    if (e.keyCode == 13 && addNewItemText.value) {
        newToDoItem.manageItemCreation(["item-container"], addNewItemText.value);
        addNewItemText.value = "";
    }
});

// toDoItemsFilters.addEventListener("change", function () {
//     let itemsToFilter = [...document.querySelectorAll(".item-container")];
//     if (toDoItemsFilters.value == "checked") {
//         for (let j = 0; j < itemsToFilter.length; j++) {
//             if (!itemsToFilter[j].classList.contains("item-checked")) {
//                 itemsToFilter[j].classList.add("item-hide-display");
//             }
//         }
//     } else if (toDoItemsFilters.value == "all") {
//         for (let j = 0; j < itemsToFilter.length; j++) {
//             if (itemsToFilter[j].classList.contains("item-hide-display")) {
//                 itemsToFilter[j].classList.remove("item-hide-display");
//             }
//         }
//     } else if (toDoItemsFilters.value == "unchecked") {
//         for (let j = 0; j < itemsToFilter.length; j++) {
//             if (itemsToFilter[j].classList.contains("item-checked")) {
//                 itemsToFilter[j].classList.add("item-hide-display");
//             }
//         }
//     }
// });

document.addEventListener("DOMContentLoaded", function () {
    addNewItemText.focus();
    for (let i = 0; i < toDoItemsFromLocalStorage.length; i++) {
        newToDoItem.manageItemCreation(toDoItemsFromLocalStorage[i].itemParentClassList, toDoItemsFromLocalStorage[i].itemTextContent);
    }
});

window.addEventListener("unload", function () {
    let items = [...document.querySelectorAll(".todo-item")];
    for (let i = 0; i < items.length; i++) {
        let objItem = {
            itemTextContent: items[i].textContent,
            itemClassList: [...items[i].classList],
            itemParentClassList: [...items[i].parentNode.classList],
        };
        toDoItemsToLocalStorage.push(objItem);
    }
    window.localStorage.setItem("todoItems", JSON.stringify(toDoItemsToLocalStorage));
});

addNewItemButton.addEventListener("click", function () {
    if (addNewItemText.value) {
        newToDoItem.manageItemCreation(["item-container"], addNewItemText.value);
        addNewItemText.value = "";
    }
});

window.addEventListener("click", function (e) {
    if (e.target.classList.contains("item-check")) {
        e.target.parentNode.classList.toggle("item-checked");
    } else if (e.target.classList.contains("item-remove")) {
        e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    }
});
