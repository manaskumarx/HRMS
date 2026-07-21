// =================================
// MODERN TEAMS HRMS
// EMPLOYEE ANNOUNCEMENTS
// READ ONLY
// =================================



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
No Announcements
</h3>

<p>
Company announcements will appear here.
</p>


</div>

`;


return;

}






data.forEach(item=>{

// AUTO MARK READ
markAsRead(item.id);
    
container.innerHTML += `


<div class="announcement-card">



${item.image_url ? `

<img 
src="${item.image_url}"
class="announcement-image">

` : ""}



<h3>

${item.title}

</h3>



<p>

${item.description}

</p>




<p>

Priority:

<span class="priority ${item.priority.toLowerCase()}">

${item.priority}

</span>


</p>





<small>

${new Date(item.created_at)
.toLocaleDateString("en-IN")}

</small>



</div>



`;



});



}


async function markAsRead(id){


const {data:userData}=await supabaseClient
.auth
.getUser();


if(!userData.user){
return;
}


const userId=userData.user.id;



// check already read

const {data:exist}=await supabaseClient

.from("announcement_reads")

.select("id")

.eq("announcement_id",id)

.eq("user_id",userId)

.single();



if(exist){

return;

}





// save read

const {error}=await supabaseClient

.from("announcement_reads")

.insert({

announcement_id:id,

user_id:userId

});




if(error){

console.log(
"Read Error:",
error
);

}


}


loadAnnouncements();
