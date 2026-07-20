let currentUser = null;


// =====================
// LOAD PROFILE
// =====================

async function loadEmployeeProfile(){


const {data:userData,error:userError}
=
await supabaseClient.auth.getUser();



if(userError || !userData.user){

window.location.href="login.html";
return;

}



currentUser = userData.user;




const {data:profile,error}
=
await supabaseClient
.from("profiles")
.select("*")
.eq(
"id",
currentUser.id
)
.maybeSingle();




if(error){

console.log(error);
return;

}



if(!profile){

console.log("Profile not found");
return;

}




// =====================
// PROFILE CARD
// =====================


document.getElementById("employeeName")
.innerText =
profile.full_name || "Employee";



document.getElementById("employeeRole")
.innerText =
profile.role || "Employee";



document.getElementById("employeeDepartment")
.innerText =
profile.department || "Not Assigned";





// =====================
// UPDATE FORM
// =====================


document.getElementById("name")
.value =
profile.full_name || "";



document.getElementById("email")
.value =
profile.email || currentUser.email;



document.getElementById("phone")
.value =
profile.phone || "";



document.getElementById("address")
.value =
profile.address || "";






// =====================
// COMPANY DETAILS
// =====================


document.getElementById("department")
.innerText =
profile.department || "-";



document.getElementById("designation")
.innerText =
profile.designation || "-";



document.getElementById("employeeId")
.innerText =
profile.id;



if(profile.created_at){

document.getElementById("joiningDate")
.innerText =
new Date(profile.created_at)
.toLocaleDateString("en-IN");

}






// =====================
// PROFILE IMAGE
// =====================


if(profile.profile_image){


document.getElementById("employeeImage")
.src =
profile.profile_image;


}





}








// =====================
// UPDATE PROFILE
// =====================


document
.getElementById("updateProfileBtn")
.addEventListener(
"click",
async()=>{



const updates={


full_name:

document.getElementById("name").value,



phone:

document.getElementById("phone").value,



address:

document.getElementById("address").value



};






const {error}
=
await supabaseClient
.from("profiles")
.update(updates)
.eq(
"id",
currentUser.id
);





if(error){


document.getElementById("profileMessage")
.innerText =
error.message;


return;


}




document.getElementById("profileMessage")
.innerText =
"Profile Updated Successfully ✅";





});









// =====================
// CHANGE PASSWORD
// =====================


document
.getElementById("changePasswordBtn")
.addEventListener(
"click",
async()=>{


const password =
document.getElementById("newPassword")
.value;




if(!password){

alert("Enter new password");
return;

}




const {error}
=
await supabaseClient.auth.updateUser({

password:password

});




if(error){

alert(error.message);

return;

}



alert(
"Password Changed Successfully"
);



});








loadEmployeeProfile();