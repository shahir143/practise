let form = document.getElementById('myForm');
let tables1 = document.getElementById('table1-items');
let tables2 = document.getElementById('table2-items');
let tables3 = document.getElementById('table3-items');

const itemName = document.getElementById('item');
const itemCost = document.getElementById('itemCost');
const tablenumber= document.getElementById('table');
const baseURL=`https://crudcrud.com/api/13108e1e45774157bb31c86fbb655616`

form.addEventListener('submit',formSubmit);

async function formSubmit(e){
    try{
        e.preventDefault();
    const orders = {
        itemName:itemName.value,
        itemCost:itemCost.value,
        tablenumber:tablenumber.value,
    };
    const response= await axios.post(`${baseURL}/orders`,orders);

    displayOrders(response.data);
    itemName.value="";
    itemCost.value="";
    
    }
    catch(err){
        console.log(err)
    }
}
async function displayOrders(task) {
    let li = document.createElement('li');
    let deleteBtn = document.createElement('button');
    let editBtn = document.createElement('button');

    li.className = 'list-group-item';
    deleteBtn.className='btn btn-danger';
    editBtn.className = 'btn btn-info edit';

    let text = document.createTextNode(`${task.itemName} - ${task.itemCost} `);
    li.id = task._id;
    li.appendChild(text);

    deleteBtn.appendChild(document.createTextNode('Delete'));
    editBtn.appendChild(document.createTextNode('Edit'));

    deleteBtn.addEventListener('click', (e) => {
        const key = e.target.parentElement.id;
        axios
            .delete(`${baseURL}/orders/${key}`)
            .then((res) => deleteElement(key))
            .catch((err) => console.log(err));
    });


    editBtn.addEventListener('click', async(e) => {
        try{
            const key =e.target.parentElement.id;
        axios
            .get(`${baseURL}/orders/${key}`)
            .then((res) => {
                const prevdata = res.data;
                itemName.value=prevdata.itemName,
                 itemCost.value=prevdata.itemCost,
                 tablenumber.value=prevdata.tablenumber
            })
            .catch((err) => console.log(err));
        await axios
            .delete(`${baseURL}/orders/${key}`)
            deleteElement(key);
        }catch(err) {
            console.log(err);
        }
    });

    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    if (task.tablenumber === "Table1") {
        tables1.appendChild(li);
    } else if (task.tablenumber === "Table2") {
        tables2.appendChild(li);
    } else if (task.tablenumber === "Table3") {
        tables3.appendChild(li);
    }
    
}
function deleteElement(id){
    const li=document.getElementById(id);
    li.parentElement.removeChild(li);
 }
 window.addEventListener('DOMContentLoaded',()=>{
    axios
    .get(`${baseURL}/orders`)
    .then(res=>{
        for(var i=0; i<res.data.length; i++){
            displayOrders(res.data[i]);
        }
    })
    .catch(err=>console.error(err));
});
