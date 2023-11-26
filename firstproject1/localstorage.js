let form = document.querySelector("#myForm");
let itemList = document.querySelector("#itemList");

const userExpenses = document.getElementById('expenses');
const userDescription = document.getElementById('description');
const userCategory = document.getElementById('category');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let obj = {
        userExpenses: userExpenses.value,
        userDescription: userDescription.value, 
        userCategory: userCategory.value, 
    }

    displayExpenses(obj);
    const userKey = userDescription.value
    const userStringify = JSON.stringify(obj);
    localStorage.setItem(userKey, userStringify);
    form.reset();
});

function displayData() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
            const data = JSON.parse(localStorage.getItem(key));
            displayExpenses(data); 
        }
    }
}

function displayExpenses(data) { 
    let li = document.createElement('li');
    li.className = 'list-group-item'; 
    li.id=data.userDescription;
    li.appendChild(document.createTextNode(`${data.userExpenses} - ${data.userCategory} - ${data.userDescription}`));

    let deleteBtn = document.createElement('button');
    deleteBtn.className = "btn btn-danger";
    deleteBtn.appendChild(document.createTextNode("Delete"));
    li.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', (e) => {
        const target = e.target.parentElement;
        const key = target.id;
        localStorage.removeItem(key);
        target.parentElement.removeChild(target);
    });

    let editBtn = document.createElement('button');
    editBtn.className = 'btn btn-info';
    editBtn.appendChild(document.createTextNode("Edit"));

    editBtn.addEventListener('click', (e) => {
        const target = e.target.parentElement;
        const key = target.id; 
        const prevData = JSON.parse(localStorage.getItem(key));
        userDescription.value = prevData.userDescription;
        userCategory.value = prevData.userCategory;
        userExpenses.value = prevData.userExpenses;
        localStorage.removeItem(key);
        target.parentElement.removeChild(target);
    });

    li.appendChild(editBtn);
    itemList.appendChild(li);
}

displayData();
