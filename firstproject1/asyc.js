console.log(`person1 ticket`);
console.log(`person2 ticket`);

const premovie= async()=>{
    const wifeBringTicket =new Promise((resolve, reject)=>{
        setTimeout(()=> resolve('ticket'),3000);
    })

    let ticket;
    try{
    ticket = await wifeBringTicket;
    console.log(`wife:i got ${ticket}`);
    console.log(`husband:shall we go in`);
    console.log(`wife: i am hungry`);
    
    const getpopCorn=new Promise((resolve, reject)=>{
        setTimeout(()=> resolve('POPCORN'));
    })

    const getbutter=new Promise((resolve, reject)=>{
        setTimeout(()=> resolve('BUTTER POPCORN'));
    })

    const getColdDrinks=new Promise((resolve, reject)=>{
        setTimeout(()=> resolve('COLD DRINKS'));
    })
    
    let [popCorn,butter,coldDrinks]=await Promise.all([getpopCorn,getbutter,getColdDrinks]);

    console.log(`${[popCorn,butter,coldDrinks]}`);
    
    }catch{
       ticket=`sad face`;
    } 
return ticket;
}
premovie().then((m)=>{
    console.log(m);
})
console.log(`person4 ticket`);
console.log(`person5 ticket`);