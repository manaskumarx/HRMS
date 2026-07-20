let currentUser;



async function loadAdminProfile(){


const {
data:{
user
}

}=await supabaseClient.auth.getUser();



if(!user)
return;



currentUser=user;




const {

data:profile,

error

}=await supabaseClient

.from("profiles")

.select("*")

.eq(
"id",
user.id
)

.single();





if(error){

console.log(error);

return;

}




document.getElementById(
"profileName"
).innerText =

profile.full_name || "Admin";




document.getElementById(
"profileRole"
).innerText =

profile.role || "admin";





document.getElementById(
"fullName"
).value =

profile.full_name || "";





document.getElementById(
"email"
).value =

profile.email || user.email;




document.getElementById(
"phone"
).value =

profile.phone || "";





document.getElementById(
"department"
).value =

profile.department || "";





document.getElementById(
"designation"
).value =

profile.designation || "";





document.getElementById(
"role"
).value =

profile.role || "admin";






if(profile.photo_url){

document.getElementById(
"profilePhoto"
).src =
profile.photo_url;

}



}







document

.getElementById(
"updateProfile"
)

.addEventListener(

"click",

async()=>{


const updates={


full_name:
document.getElementById("fullName").value,


phone:
document.getElementById("phone").value,


department:
document.getElementById("department").value,


designation:
document.getElementById("designation").value


};



const {

error

}=await supabaseClient

.from("profiles")

.update(updates)

.eq(
"id",
currentUser.id
);




if(error){

alert(error.message);

}

else{

document.getElementById(
"profileMessage"
).innerText =
"Profile Updated Successfully ✅";


}



});






loadAdminProfile();