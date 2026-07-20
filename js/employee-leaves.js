// ======================================
// MODERN TEAMS HRMS
// EMPLOYEE LEAVES JS
// ======================================


let currentEmployee = null;



// ===============================
// LOAD CURRENT EMPLOYEE
// ===============================


async function loadMyLeaves(){


    const {data:userData,error:userError} =
    await supabaseClient.auth.getUser();



    if(userError || !userData.user){

        window.location.href="login.html";
        return;

    }



    const email =
    userData.user.email;




    const {data:profile,error} =
    await supabaseClient
    .from("profiles")
    .select("*")
    .eq("email",email)
    .maybeSingle();




    if(error){

        console.log(error);
        return;

    }


currentEmployee = profile;

if(!currentEmployee){
alert("Employee not found");
return;
}

loadLeaves();

}







// ===============================
// LOAD LEAVE HISTORY
// ===============================

async function loadLeaves(){

    if(!currentEmployee){
        console.log("Employee not loaded");
        return;
    }


    const {data,error}=await supabaseClient
    .from("leave_requests")
    .select("*")
    .eq(
        "employee_id",
        currentEmployee.id
    )
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
    document.getElementById("leaveHistoryBody");


    table.innerHTML="";


    if(!data || data.length===0){

        table.innerHTML=`

        <tr>
        <td colspan="5">
        No Leave Records
        </td>
        </tr>

        `;

        return;

    }



    data.forEach(leave=>{


        table.innerHTML += `

        <tr>

        <td>${leave.leave_type}</td>

        <td>${leave.from_date}</td>

        <td>${leave.to_date}</td>

        <td>${leave.reason}</td>

        <td>${leave.status}</td>


        </tr>

        `;


    });


}

// ===============================
// APPLY LEAVE
// ===============================


document
.getElementById("applyLeaveBtn")
.addEventListener(
"click",
async()=>{


    if(!currentEmployee){

        alert("Employee data not loaded");
        return;

    }



    const leaveType =
    document.getElementById("leaveType").value;



    const fromDate =
    document.getElementById("fromDate").value;



    const toDate =
    document.getElementById("toDate").value;



    const reason =
    document.getElementById("leaveReason").value.trim();





    if(
        !leaveType ||
        !fromDate ||
        !toDate ||
        !reason
    ){

        alert("Please fill all details");
        return;

    }




    const leaveData = {


        employee_id:
        currentEmployee.id,


        leave_type:
        leaveType,


        from_date:
        fromDate,


        to_date:
        toDate,


        reason:
        reason,


        status:
        "Pending"


    };





    const {data,error} = await supabaseClient
    .from("leave_requests")
    .insert([leaveData])
    .select();





    if(error){

        console.log("Leave Insert Error:", error);

        alert(error.message);

        return;

    }





    document.getElementById("leaveMessage").innerText =
    "Leave Applied Successfully";



    alert("✅ Leave Applied Successfully");





    // Clear Form

    document.getElementById("leaveType").value="";
    
    document.getElementById("fromDate").value="";

    document.getElementById("toDate").value="";

    document.getElementById("leaveReason").value="";





    // Refresh Leave History

    await loadLeaves();



});


// ===============================
// FILTER
// ===============================

document
.getElementById("leaveHistoryFilter")
.addEventListener(
"change",
async function(){


const value = this.value;


if(value === "All"){

    await loadLeaves();

    return;

}





const {data,error}=await supabaseClient
.from("leave_requests")
.select("*")
.eq(
"employee_id",
currentEmployee.id
)
.eq(
"status",
value
)
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
document.getElementById("leaveHistoryBody");


table.innerHTML="";



if(!data || data.length===0){


table.innerHTML=`

<tr>
<td colspan="5">
No Leave Records
</td>
</tr>

`;

return;


}




data.forEach(leave=>{


table.innerHTML += `

<tr>

<td>${leave.leave_type}</td>

<td>${leave.from_date}</td>

<td>${leave.to_date}</td>

<td>${leave.reason}</td>

<td>${leave.status}</td>

</tr>

`;


});


});


loadMyLeaves();