// ======================================
// MODERN TEAMS HRMS
// AUTH GUARD SYSTEM
// ======================================



// GET CURRENT USER

async function getCurrentUser(){


    const {data,error} = 
    await supabaseClient.auth.getUser();



    if(error || !data.user){


        window.location.href="login.html";

        return null;


    }


    return data.user;


}






// GET PROFILE DATA


async function getProfile(){


    const user = await getCurrentUser();



    if(!user){

        return null;

    }





    const { data: profile, error } = await supabaseClient
  .from("profiles")
  .select("*")
  .eq("email", user.email)
  .single();

console.log("AUTH USER:", user);
console.log("PROFILE:", profile);
console.log("PROFILE ERROR:", error);





    if(error){


        console.log(
        "Profile Error",
        error
        );


        return null;


    }





    return profile;



}








// =============================
// ADMIN PAGE PROTECTION
// =============================


async function adminGuard(){



const profile =
await getProfile();




if(!profile){


window.location.href="login.html";


return;


}





if(profile.role !== "admin"){



alert(
"You are not allowed here"
);



window.location.href=
"employee.html";


}



}









// =============================
// EMPLOYEE PAGE PROTECTION
// =============================


async function employeeGuard(){



const profile =
await getProfile();




if(!profile){


window.location.href="login.html";


return;


}





if(profile.role !== "employee"){



alert(
"You are not allowed here"
);



window.location.href=
"admin.html";


}



}









// =============================
// LOGOUT
// =============================


async function logout(){



await supabaseClient.auth.signOut();



window.location.href=
"login.html";


}