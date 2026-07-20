// =================================
// ADMIN LEAVE MANAGEMENT
// =================================


let currentAdmin = null;



// ================================
// GET ADMIN PROFILE
// ================================

async function getAdmin(){


const {data:userData} =
await supabaseClient.auth.getUser();



if(!userData.user){

window.location.href="login.html";
return;

}



const {data:profile,error}=

await supabaseClient
.from("profiles")
.select("*")
.eq(
"email",
userData.user.email
)
.maybeSingle();



if(error){

console.log(error);
return;

}


currentAdmin = profile;


loadLeaveRequests();


}






// ================================
// LOAD LEAVE REQUESTS
// ================================


async function loadLeaveRequests(){
const {data,error}=

await supabaseClient
.from("leave_requests")
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



const table =
document.getElementById(
"leaveTableBody"
);



table.innerHTML="";





if(!data || data.length===0){


table.innerHTML=`

<tr>

<td colspan="7">

No Leave Requests Found

</td>

</tr>

`;

return;


}




for (const item of data) {


const {data:employee}=await supabaseClient
.from("profiles")
.select("full_name,department")
.eq(
"id",
item.employee_id
)
.maybeSingle();



table.innerHTML += `

<tr>
<td>
${employee?.full_name || "-"}
</td>

<td>

${item.leave_type}

</td>



<td>

${item.reason}

</td>



<td>

${item.from_date}

</td>



<td>

${item.to_date}

</td>



<td>

<span class="status ${item.status.toLowerCase()}">

${item.status}

</span>

</td>



<td>



${
item.status==="Pending"

?

`

<button 
class="approve-btn"
onclick="updateLeave('${item.id}','Approved')">

Approve

</button>


<button 
class="reject-btn"
onclick="updateLeave('${item.id}','Rejected')">

Reject

</button>

`

:

"-"

}



</td>


</tr>



`;



};





}









// ================================
// UPDATE STATUS
// ================================


async function updateLeave(id,status){



if(!currentAdmin){

alert("Admin not loaded");

return;

}





const {error}=

await supabaseClient
.from("leave_requests")
.update({

status:status,

approved_by:
currentAdmin.id

})
.eq(
"id",
id
);





if(error){

alert(error.message);

return;

}





alert(
"Leave "+status+" Successfully"
);



loadLeaveRequests();



}









// ================================
// FILTER STATUS
// ================================


document
.getElementById("leaveStatusFilter")
.addEventListener(
"change",
function(){


filterLeaves();


});





async function filterLeaves(){


const status =
document.getElementById(
"leaveStatusFilter"
).value;



let query = supabaseClient
.from("leave_requests")
.select("*")
.order(
"created_at",
{
ascending:false
}
);



if(status !== "All"){


query =
query.eq(
"status",
status
);


}



const {data,error}=await query;



if(error){

console.log(error);
return;

}



const table =
document.getElementById(
"leaveTableBody"
);


table.innerHTML="";



for(const item of data){


const {data:employee}=await supabaseClient
.from("profiles")
.select("full_name")
.eq(
"id",
item.employee_id
)
.maybeSingle();




table.innerHTML += `

<tr>

<td>
${employee?.full_name || "-"}
</td>


<td>
${item.leave_type}
</td>


<td>
${item.reason}
</td>


<td>
${item.from_date}
</td>


<td>
${item.to_date}
</td>


<td>
${item.status}
</td>


<td>

${
item.status==="Pending"

?

`

<button onclick="updateLeave('${item.id}','Approved')">
Approve
</button>


<button onclick="updateLeave('${item.id}','Rejected')">
Reject
</button>

`

:

"-"

}

</td>

</tr>

`;



}



}

getAdmin();