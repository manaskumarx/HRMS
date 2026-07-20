// =====================================
// MODERN TEAMS HRMS
// ADMIN ANNOUNCEMENTS
// =====================================



async function loadAnnouncements(){


const {data,error}=await supabaseClient
.from("announcements")
.select("*")
.order(
"created_at",
{
ascending:false
}
);



if(error){

console.log(error);
return;

}



const container =
document.getElementById(
"announcementContainer"
);



container.innerHTML="";



if(!data || data.length===0){


container.innerHTML=`

<div class="announcement-card">

<h3>
No Announcements Found
</h3>

<p>
Announcements will appear here.
</p>

</div>

`;

return;

}





data.forEach(item=>{


container.innerHTML += `


<div class="announcement-card">


<h3>
${item.title}
</h3>


<p>
${item.description}
</p>


<p>
Priority:
<b>
${item.priority || "Normal"}
</b>
</p>



<small>

${new Date(item.created_at)
.toLocaleDateString("en-IN")}

</small>



</div>



`;



});



}









// =====================================
// CREATE ANNOUNCEMENT
// =====================================



document
.getElementById(
"createAnnouncementBtn"
)
.addEventListener(
"click",
async()=>{





const title =
document.getElementById(
"announcementTitle"
).value.trim();



const description =
document.getElementById(
"announcementDescription"
).value.trim();



const priority =
document.getElementById(
"announcementPriority"
).value;






if(!title || !description){


alert(
"Please fill all details"
);

return;


}






const {data:userData}=

await supabaseClient.auth.getUser();





const {data:admin}=await supabaseClient
.from("profiles")
.select("id")
.eq(
"email",
userData.user.email
)
.maybeSingle();







const {error}=await supabaseClient
.from("announcements")
.insert({

title:title,

description:description,

priority:priority,

created_by:admin.id

});







if(error){

alert(error.message);

return;

}







document.getElementById(
"announcementMessage"
)
.innerText =
"Announcement Published Successfully";




document.getElementById(
"announcementTitle"
).value="";



document.getElementById(
"announcementDescription"
).value="";




loadAnnouncements();



});







loadAnnouncements();