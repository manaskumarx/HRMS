// ======================================
// MODERN TEAMS HRMS
// ADMIN EMPLOYEE MANAGEMENT
// ======================================


console.log("Admin Employee JS Loaded");



let allEmployees = [];





// ================================
// LOAD EMPLOYEES
// ================================


async function loadEmployees(){



const {data,error}=

await supabaseClient
.from("profiles")
.select("*")
.order(
"created_at",
{
ascending:false
}
);




if(error){

console.log(
"Employee Load Error:",
error
);

return;

}




console.log(
"Employees Loaded:",
data
);



allEmployees=data;


displayEmployees(data);



}







// ================================
// DISPLAY EMPLOYEES
// ================================


function displayEmployees(employees){



const table =
document.getElementById(
"employeeTable"
);



if(!table){

console.log(
"employeeTable not found"
);

return;

}



table.innerHTML="";





if(!employees || employees.length===0){


table.innerHTML=`

<tr>

<td colspan="6">

No Employees Found

</td>

</tr>

`;

return;


}






employees.forEach(emp=>{



table.innerHTML += `


<tr>


<td>
${emp.full_name || "-"}
</td>



<td>
${emp.email || "-"}
</td>



<td>
${emp.department || "-"}
</td>



<td>
${emp.phone || "-"}
</td>



<td>
${emp.role || "-"}
</td>



<td>


<button

class="delete-btn"

onclick="deleteEmployee('${emp.id}')">

Delete

</button>


</td>


</tr>


`;



});



}











// ================================
// ADD EMPLOYEE
// ================================



const addBtn =
document.getElementById(
"addEmployeeBtn"
);




if(addBtn){



addBtn.addEventListener(
"click",
async()=>{



console.log(
"ADD BUTTON CLICKED"
);





const employeeData={



full_name:
document.getElementById(
"fullName"
).value.trim(),




email:
document.getElementById(
"email"
).value.trim(),





password:
document.getElementById(
"password"
).value.trim(),





phone:
document.getElementById(
"phone"
).value.trim(),





department:
document.getElementById(
"department"
).value.trim(),





designation:
document.getElementById(
"designation"
).value.trim(),





role:
document.getElementById(
"role"
).value



};






console.log(
"Employee Data:",
employeeData
);







if(
!employeeData.full_name ||
!employeeData.email ||
!employeeData.password
){


alert(
"Name Email Password required"
);


return;


}









const {data,error}=

await supabaseClient.functions.invoke(

"create-employee",

{

body:employeeData

}

);







console.log(
"FUNCTION DATA:",
data
);



console.log(
"FUNCTION ERROR:",
error
);









if(error){



alert(
"❌ "+error.message
);


return;



}





alert("✅ Employee Created Successfully");

document.getElementById(
"employeeMessage"
).innerText =
"Employee Created Successfully";


await loadEmployees();






// clear form


document
.querySelectorAll(
"input"
)
.forEach(input=>{


if(
input.type !== "button"
){

input.value="";

}


});








await loadEmployees();





}


);



}

else{


console.log(
"Add Employee Button Not Found"
);


}









// ================================
// DELETE EMPLOYEE
// ================================



async function deleteEmployee(id){



const confirmDelete =
confirm(
"Delete this employee?"
);



if(!confirmDelete)
return;





const {error}=

await supabaseClient
.from("profiles")
.delete()
.eq(
"id",
id
);





if(error){


alert(
error.message
);


return;


}





alert(
"Employee Deleted"
);



loadEmployees();



}









// ================================
// SEARCH
// ================================



const search =
document.getElementById(
"searchEmployee"
);




if(search){



search.addEventListener(
"input",
(e)=>{



const value =
e.target.value.toLowerCase();





const filtered =
allEmployees.filter(emp=>



(emp.full_name || "")
.toLowerCase()
.includes(value)



||



(emp.email || "")
.toLowerCase()
.includes(value)



);



displayEmployees(filtered);



});



}








// ================================
// START
// ================================


loadEmployees();
