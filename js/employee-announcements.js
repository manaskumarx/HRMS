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





loadAnnouncements();