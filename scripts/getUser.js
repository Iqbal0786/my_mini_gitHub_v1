async function getUser(user){
    try{
         let req= await fetch(`https://api.github.com/users/${user}`);
         let data= await req.json();
         return data;
    }
    catch(err){
        console.log(err)
    }
}
export {getUser};