let lastDate= new Date(2000,1,11,4,2,0,0);
const user=[{
    title:"POST1",
    body:"THIS IS POST1"
}];

function updateActivtyTime(){
    return new Promise((resolve, reject) =>{
        const active=new Date();
        resolve(active);
    },1000)
}

function createPost1(){
    return new Promise((resolve, reject) =>{
       setTimeout(()=>{
        const post=[]
        user.push({title:"POST2",body:"THIS IS POST2"});
        resolve();
        updateActivtyTime();
       },2000)
    })
}
function createPost2(){
    return new Promise((resolve, reject) =>{
        setTimeout(()=>{
            user.push({title:"POST3",body:"THIS IS POST3"});
            resolve();
            updateActivtyTime();
        },2000) 
    },)
}
function deletePost1(){
    return new Promise((resolve, reject) =>{
        if(user.length==0){
            reject("NO USERS FOUND");
        }else{
            user.pop(user.length-1);
            console.log(user.length);
            resolve();
        }
    },1000)
}
Promise.all([createPost1(),createPost2(),updateActivtyTime()]).then((updateActivtyTime)=>{
    console.log(`Before creating post ${lastDate}`);
    user.map((data)=>{
        console.log(`${data.title}, ${data.body}`);
    })
    console.log(`After creating post ${updateActivtyTime}`);
})
