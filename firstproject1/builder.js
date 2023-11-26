let form=document.querySelector('#myForm');
let itemList=document.querySelectorAll('#itemList');
 const userName=document.getElementById("username");
 const userEmail=document.getElementById('useremail');
 const userNumber=document.getElementById('userNumber');
 const date=document.getElementById('date');
 const time = document.getElementById('time');

form.addEventListener('submit',(e)=>{
     e.preventDefault();
     const userdata={
        userName:userName.value,
        userEmail:userEmail.value,
        userNumber:userNumber.value,
        date:date.value,
        time:time.value
     }
     displayapoint(userdata);
     const userdataStringfy=JSON.stringify(userdata);
     const userkey=userEmail.value;
     localStorage.setItem(userkey,userdataStringfy);
     userstorage=JSON.parse(localStorage.getItem(userkey));
     
     form.reset();

});

function displaySavedata(){
    for(let ket of localStorage){
        if(localStorage.hasOwnProperty(key)){
            const data=JSON.parse(localStorage.getItem(key));
            displayapoint(data);
        }
    }
}
function displayapoint(data){
let li=document.createElement('li');
let text =document.createTextNode(`Name &{data.userName}-Email{data.userEmail}-NUmber ${data.userNumber}- date ${data.date}- time{data.time}`);
li.className = 'list-group';
li.id=data.userEmail;
li.appendChild(text);

let deletebtn=document.createElement('button');
deletebtn.className = 'delete';
deletebtn.appendChild(document.createTextNode('delete'));
li.appendChild(deletebtn);

deletebtn.addEventListener('click',(e)=>{
    const target=e.target.parentElement;
    const key =target.id;
    localStorage.removeItem(key);
    target.parentElement.removeChild(target);
});

let editbtn=document.createElement('button');
editbtn.className='edit';
editbtn.appendChild(document.createTextNode("edit"));


editbtn.addEventListener('click',(e)=>{
    const target=e.target.parentElement;
    const key =target.id;
    const prevEle=JSON.parse(localStorage.getItem(key));
    userName.value=prevEle.userName;
    userEmail.value=prevEle.userEmail;
    userNumber.value=prevEle.userNumber;
    date.value=prevEle.date;
    time.value=prevEle.time;
    localStorage.removeItem(key);
    target.parentElement.removeChild(target);
});

itemList.appendChild(li);
}
displaySavedata();
