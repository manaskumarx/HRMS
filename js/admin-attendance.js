// ===============================
// ADMIN ATTENDANCE JS
// ===============================

function formatWorkingHours(hours){

    if(hours == null){
        return "-";
    }

    const totalMinutes = Math.round(hours * 60);

    const h = Math.floor(totalMinutes / 60);

    const m = totalMinutes % 60;

    return `${h}h ${m}m`;

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



function formatBreak(minutes){

    if(minutes == null || minutes === 0){
        return "0m";
    }

    const h = Math.floor(minutes / 60);
    const m = minutes % 60;

    if(h > 0){
        return `${h}h ${m}m`;
    }

    return `${m}m`;

}

function getStatusClass(status){

    switch(status){

        case "Present":
            return "status-present";

        case "Absent":
            return "status-absent";

        case "Late":
            return "status-late";

        default:
            return "status-present";
    }

}





// ===============================
// LOAD ATTENDANCE
// ===============================


async function loadAttendance(){


let searchText =
document
.getElementById("attendanceSearch")
.value
.toLowerCase();



let selectedDate =
document
.getElementById("attendanceDate")
.value;



let selectedDepartment =
document
.getElementById("attendanceDepartment")
.value;





let query = supabaseClient
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





// DATE FILTER

if(selectedDate){

query =
query.eq(
"attendance_date",
selectedDate
);

}





const {data,error}=await query;



if(error){

console.log(error);
return;

}




let filteredData = data;






// EMPLOYEE SEARCH

if(searchText){


filteredData =
filteredData.filter(att=>{


let name =
att.profiles?.full_name
?.toLowerCase()
|| "";



return name.includes(searchText);


});


}





// DEPARTMENT FILTER


if(
selectedDepartment &&
selectedDepartment !== "All Departments"
){


filteredData =
filteredData.filter(att=>{


return att.profiles?.department
=== selectedDepartment;


});


}






renderAttendance(filteredData);



}








// ===============================
// SHOW TABLE DATA
// ===============================


function renderAttendance(data){


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

${new Date(att.attendance_date).toLocaleDateString(
"en-IN",
{
day:"2-digit",
month:"short",
year:"numeric"
}
)}

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
${formatBreak(att.total_break_minutes)}
</td>

<td>
<span class="${getStatusClass(att.status)}">
${att.status || "Present"}
</span>
</td>

</tr>


`;



});


}




document
.getElementById(
"attendanceTableBody"
)
.innerHTML = rows;


}







// ===============================
// BUTTON EVENTS
// ===============================


document.addEventListener(
"DOMContentLoaded",
()=>{



const searchBtn =
document.getElementById(
"attendanceSearchBtn"
);



if(searchBtn){


searchBtn.addEventListener(
"click",
()=>{


console.log(
"Attendance Search Clicked"
);


loadAttendance();


});


}





const resetBtn =
document.getElementById(
"resetAttendanceBtn"
);



if(resetBtn){


resetBtn.addEventListener(
"click",
()=>{


document.getElementById(
"attendanceDate"
).value="";



document.getElementById(
"attendanceSearch"
).value="";



document.getElementById(
"attendanceDepartment"
).value="";



loadAttendance();


});


}

loadAttendance();



});
