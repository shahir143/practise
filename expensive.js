let form = document.getElementById('myForm');
let productLists = document.getElementById('productList');
let totalCart = document.getElementById('totalcart');

const cost = document.getElementById('cost');
const productName = document.getElementById('productName');
const baseURL = `https://crudcrud.com/api/91f7b227f90947adab80f9e1b53dd09e`;

form.addEventListener('submit', submitForm);

async function submitForm(e) {
    e.preventDefault();
    try {
        const list = {
            cost: cost.value,
            productName: productName.value
        }
        const response = await axios.post(`${baseURL}/products`, list);
        displayProducts(response.data); //displaying the data

        //sending to local Stroage
        const userKey=response.data._id;
        localStorage.setItem(userKey, JSON.stringify(response.data));
        form.reset();
    } catch (e) {
        console.log(e);
    }
}

async function displayProducts(product) {
    let li = document.createElement('li');
    let deleteBtn = document.createElement('button');

    li.className = 'list-group-item';
    deleteBtn.className = 'btn btn-danger';

    let text = document.createTextNode(`${product.cost} - ${product.productName} `);
    li.id = product._id;
    li.appendChild(text);

    deleteBtn.appendChild(document.createTextNode('Delete'));

    deleteBtn.addEventListener('click', (e) => {
        const key = e.target.parentElement.id;
        axios
            .delete(`${baseURL}/products/${key}`)
            .then(() => {
                deleteElement(key);
                totalCartItems().then(total => {
                    updateTotalCart(total);
                });
            })
            .catch((err) => console.log(err));
    });
    li.appendChild(deleteBtn);
    productLists.appendChild(li);

    totalCartItems().then(total => {
        updateTotalCart(total);
    });
}

function deleteElement(id) {
    let li = document.getElementById(id);
    li.parentElement.removeChild(li);
    localStorage.removeItem(id);
}

async function totalCartItems() {
    try {
        const res = await axios.get(`${baseURL}/products`)
        let total = 0;
        for (var i = 0; i < res.data.length; i++) {
            total += parseInt(res.data[i].cost);
        }
        return total;
    } catch (err) {
        console.log(err);
    }
}


function updateTotalCart(total) {
    totalCart.innerHTML = `<div id="changesize"><B>Total cost of Products</B>  RS ${total}</div>`;
}

window.addEventListener('DOMContentLoaded', (e) => {
    axios.get(`${baseURL}/products`)
        .then((res) => {
            res.data.forEach(displayProducts);
            totalCartItems().then(total => {
                updateTotalCart(total);
            });
        }).catch((err) => {
            console.log(err);
        });
})
