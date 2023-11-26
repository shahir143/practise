let form = document.getElementById('myForm');
let Pending = document.getElementById('taskpending');
let Completed = document.getElementById('taskcompleted');

const todoTask = document.getElementById('item');
const todoActivity = document.getElementById('Description');
const baseURL=`https://crudcrud.com/api/09916ac406e44c1a89724f95efb56e90`

form.addEventListener('submit',formSubmit);

async function formSubmit(e){
    try{
        e.preventDefault();
    const task = {
        todoTask: todoTask.value,
        todoActivity: todoActivity.value
    };
    const response= await axios.post(`${baseURL}/pendingtask`,task);

    displaypending(response.data);
    }
    catch(err){
        console.log(err)
    }
}

async function displaypending(task) {
    let li = document.createElement('li');
    let deleteBtn = document.createElement('button');
    let doneBtn = document.createElement('button');
    let editBtn = document.createElement('button');

    li.className = 'list-group-item';
    deleteBtn.className='btn btn-danger';
    editBtn.className = 'btn btn-info edit';
    doneBtn.className = 'btn btn-primary done';

    let text = document.createTextNode(`${task.todoTask} - ${task.todoActivity}`);
    li.id = task._id;
    li.appendChild(text);

    deleteBtn.appendChild(document.createTextNode('Delete'));
    doneBtn.appendChild(document.createTextNode('Done'));
    editBtn.appendChild(document.createTextNode('Edit'));

    deleteBtn.addEventListener('click', (e) => {
        const key = e.target.parentElement.id;
        axios
            .delete(`${baseURL}/pendingtask/${key}`)
            .then((res) => deleteElement(key))
            .catch((err) => console.log(err));
    });

    doneBtn.addEventListener('click', async (e) => {
        try{
            const key = e.target.parentElement.id;
            const data=await axios.get(`${baseURL}/pendingtask/${key}`)
            const {todoTask,todoActivity}=data.data;
            const task={
            todoTask:todoTask,
            todoActivity:todoActivity
        }
        await axios
            .delete(`${baseURL}/pendingtask/${key}`)
            
        const completed =await axios.post(`${baseURL}/donetask`,task)
            displaycompleted(completed.data)
            deleteElement(key);
    }
        catch(err) {
            console.log(err);
        }
    });

    editBtn.addEventListener('click', async(e) => {
        try{
            const key =e.target.parentElement.id;
        axios
            .get(`${baseURL}/pendingtask/${key}`)
            .then((res) => {
                const prevdata = res.data;
                todoTask.value = prevdata.todoTask;
                todoActivity.value = prevdata.todoActivity;
            })
            .catch((err) => console.log(err));
        await axios
            .delete(`${baseURL}/pendingtask/${key}`)
            deleteElement(key);
        }catch(err) {
            console.log(err);
        }
    });

    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    Pending.appendChild(li);
}
 function displaycompleted(data){
    let li=document.createElement('li');
    let text=document.createTextNode(`${data.todoTask}- ${data.todoActivity}`);
    li.appendChild(text);
    li.id=data._id;
    Completed.appendChild(li);
 }
 function deleteElement(id){
    const li=document.getElementById(id);
    li.parentElement.removeChild(li);
 }
 window.addEventListener('DOMContentLoaded',()=>{
    axios
    .get(`${baseURL}/pendingtask`)
    .then((res)=>{
        for(var i=0; i<res.data.length; i++){
            displaypending(res.data[i]);
        }
    })
    .catch(err=>console.error(err));

    axios
    .get(`${baseURL}/donetask`)
    .then((res)=>{
        for(var i=0; i<res.data.length; i++){
            console.log(res.data[i]);
            displaycompleted(res.data[i]);
        }})
    .catch((err)=>console.error(err));
 })
 