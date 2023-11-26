let form=document.getElementById('myForm');
let itemList=document.getElementById('itemList');

const userName=document.getElementById('username');
const userEmail=document.getElementById('useremail');
const userNumber=document.getElementById('usernumber');
const date=document.getElementById('date');
const time = document.getElementById('time');


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const userdata={
        userName:userName.value,
        userEmail:userEmail.value,
        userNumber:userNumber.value,
        date:date.value,
        time:time.value
    };
    axios.post('https://crudcrud.com/api/7a344abd160d47888bd7c1e629b021c1/appointmentData',userdata)
    .then(res=>{displayapoint(userdata)})
    .catch(err=>{console.log(err)});

});


function displaySavedItems() {
  axios.get('https://crudcrud.com/api/7a344abd160d47888bd7c1e629b021c1/appointmentData')
  .then(res=>{ 
    for(var i=0; i<res.data.length; i++){
      displayapoint(res.data[i]);
    }
  })
  .catch(err=>console.log(err));
    
  }

//displaying the user
function displayapoint(data){
    let li=document.createElement('li');
    let text=document.createTextNode( `Name=${data.userName} -- Email =${data.userEmail} -- number=${data.userNumber} -- date ${data.date} time ${data.time}`);
    li.id=data._id;
    li.appendChild(text);
    li.className='list-group-item';

    let deletebtn=document.createElement('button');
    deletebtn.className='delete btn btn-danger';
    deletebtn.appendChild(document.createTextNode("Delete"));
    //delete button
    deletebtn.addEventListener("click",(e)=>{
        const target =e.target.parentElement;
        const key=target.id;
        axios.delete(`https://crudcrud.com/api/7a344abd160d47888bd7c1e629b021c1/appointmentData/${key}`)
        .then(()=>{
        target.parentElement.removeChild(target);
        })
        .catch(err => console.log(err));
    });
    //edit button
    let editbtn=document.createElement('button');
    editbtn.className='edit btn btn-info';
    editbtn.appendChild(document.createTextNode("Edit"));

    
    //edit button and reverse the input fields
    editbtn.addEventListener("click",(e)=>{
    const target=e.target.parentElement;
    const key=target.id;
    //moving to input field
    axios.get(`https://crudcrud.com/api/7a344abd160d47888bd7c1e629b021c1/appointmentData/${key}`)
    .then((res) => {
        const data = res.data;
        userName.value = data.userName;
        userEmail.value = data.userEmail;
        userNumber.value = data.userNumber;
        date.value = data.date;
        time.value = data.time;
    })
    .catch((err) => console.log(err));;
    
    axios.delete(`https://crudcrud.com/api/7a344abd160d47888bd7c1e629b021c1/appointmentData/${key}`)
    .then(()=>{
    target.parentElement.removeChild(target);
    })
    .catch(err => console.log(err));
    });

    li.appendChild(deletebtn);
    li.appendChild(editbtn);
    itemList.appendChild(li);
    
}
displaySavedItems();