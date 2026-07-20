// ======================================
// MODERN TEAMS HRMS LOGIN
// ======================================


const loginBtn = document.getElementById("loginBtn");


loginBtn.addEventListener("click", async()=>{


    const email =
    document.getElementById("email").value.trim();


    const password =
    document.getElementById("password").value.trim();



    const message =
    document.getElementById("message");



    console.log("Login button clicked");



    const {data,error}=

    await supabaseClient.auth.signInWithPassword({

        email:email,

        password:password

    });



    if(error){


        console.log("Login Error:",error);


        message.innerText =
        error.message;


        return;


    }



    console.log("Login Success");

    console.log("USER ID:",data.user.id);

    console.log("EMAIL:",data.user.email);





    // GET PROFILE

    const {data:profile,error:profileError}=

    await supabaseClient

    .from("profiles")

    .select("*")

    .eq("id",data.user.id)

    .single();




    console.log("PROFILE:",profile);

    console.log("PROFILE ERROR:",profileError);





    if(profileError || !profile){


        console.log(profileError);


        message.innerText =
        "Profile not found";


        return;


    }





    // ROLE REDIRECT


    if(profile.role==="admin"){


        window.location.href="admin.html";


    }


    else if(profile.role==="employee"){


        window.location.href="employee.html";


    }


    else{


        message.innerText =
        "Role not assigned";


    }



});