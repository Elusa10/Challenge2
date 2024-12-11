
let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

const itemInput = document.getElementById('itemInput');
const addItemBtn = document.getElementById('addItemBtn');
const clearListBtn = document.getElementById('clearListBtn');
const shoppingListContainer = document.getElementById('shoppingList');

// Function to render the shopping list
function renderList() {
    shoppingListContainer.innerHTML = '';
    shoppingList.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = item.name;
        listItem.className = item.purchased ? 'purchased' : '';
        listItem.addEventListener('click', () => togglePurchased(index));
        listItem.contentEditable = "true";
        listItem.addEventListener('blur', () => editItem(index, listItem.textContent));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeItem(index);
        });

        listItem.appendChild(deleteBtn);
        shoppingListContainer.appendChild(listItem);
    });

    // Save to local storage
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Add an item to the list
function addItem() {
    const itemName = itemInput.value.trim();
    if (itemName) {
        shoppingList.push({ name: itemName, purchased: false });
        itemInput.value = '';
        renderList();
    }
}

function togglePurchased(index) {
    shoppingList[index].purchased = !shoppingList[index].purchased;
    renderList();
}

// Remove an item
function removeItem(index) {
    shoppingList.splice(index, 1);
    renderList();
}

// Edit an item
function editItem(index, newName) {
    shoppingList[index].name = newName.trim() || shoppingList[index].name;
    renderList();
}

// Clear the list
function clearList() {
    shoppingList = [];
    renderList();
}

addItemBtn.addEventListener('click', addItem);
clearListBtn.addEventListener('click', clearList);
itemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addItem();
    }
});

renderList();
