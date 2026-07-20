// ===============================
// ADMIN ATTENDANCE JS
// ===============================


function formatWorkingHours(hours){

    if(!hours){
        return "-";
    }


    let h = Math.floor(hours);

    let m = Math.round(
        (hours-h)*60
    );


    return `${h} Hours ${m} Minutes`;

}





function formatTime(time){

    if(!time){
        return "-";
    }


    return new Date(time)
    .toLocaleTimeString(
        "en-IN",
        {
        hour:"2-digit",
        minute:"2-digit",
        hour12:true
        }
    );

}





async function loadAttendance(){



const {data,error}=

await supabaseClient
.from("attendance")
.select(`
*,
profiles(
full_name,
email,
department
)
`)
.order(
"attendance_date",
{
ascending:false
}
);




if(error){

console.log(error);
return;

}




let rows="";



if(!data || data.length===0){

rows=`

<tr>

<td colspan="6">

No Attendance Found

</td>

</tr>

`;

}

else{


data.forEach(att=>{


rows += `


<tr>

<td>

${att.profiles?.full_name || "Unknown"}

</td>


<td>

${att.attendance_date}

</td>


<td>

${formatTime(att.check_in)}

</td>



<td>

${formatTime(att.check_out)}

</td>




<td>

${formatWorkingHours(att.working_hours)}

</td>




<td>

${att.status || "Present"}

</td>



</tr>


`;


});


}




document
.getElementById("attendanceTableBody")
.innerHTML=rows;



}




loadAttendance();