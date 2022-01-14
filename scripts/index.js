import { navbar } from "../components/navbar.js";
import { getUser } from "../scripts/getUser.js";
 document.querySelector("#container").innerHTML=navbar();
let input= document.querySelector("#search-input");
input.addEventListener("keypress",searchUser);


async function searchUser(event){
   if(event.key=="Enter"){
       let query=input.value;
        let response= getUser(query);
       response.then((res)=>{
           console.log(res)
           getRepos(res.repos_url)
          document.querySelector("#profile-img").src=res.avatar_url;
          document.querySelector("#UserProfileImg").src=res.avatar_url;
          document.querySelector("#name").textContent=res.name;
          document.querySelector("#userName").textContent=res.login;
          document.querySelector("#userBio").textContent=res.bio;
          document.querySelector("#follower").textContent=res.followers+"followers";
          document.querySelector("#following").textContent=res.following+"following";
          document.querySelector("#location").textContent=res.location;

       })
       console.log(query)
   }
}

async function getRepos(repoUrl){
 try{
    let req= await fetch(repoUrl);
    let data=  await req.json();
     showRepos(data);
 }
 catch(err){
     console.log(err)
 }
}

function showRepos(data){
    let parent= document.querySelector("#repoListDiv");
    parent.innerHTML="";
    console.log(data)
    data.map((elem)=>{
      
        let childDiv= document.createElement("div");
        childDiv.setAttribute("class","childDiv");
        let repoName= document.createElement("p");
        repoName.textContent=elem.name;
        repoName.addEventListener("click",()=>{
            window.location.href=elem.html_url;
        })
        let aboutRepoDiv= document.createElement("div");
        aboutRepoDiv.setAttribute("class","aboutDiv");
        let repoLang= document.createElement("p");
        repoLang.textContent=elem.language;
        let repoTime=document.createElement("p");
        repoTime.textContent=elem.updated_at;
        aboutRepoDiv.append(repoLang,repoTime);
        childDiv.append(repoName,aboutRepoDiv);
        parent.append(childDiv);
    })
}