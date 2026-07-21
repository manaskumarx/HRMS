// ======================================
// MODERN TEAMS HRMS
// SMART REALTIME NOTIFICATION SYSTEM
// ======================================

let currentUserId = null;

// ======================================
// LOAD NOTIFICATION COUNT
// ======================================

async function loadNotificationCount() {

    const { data: userData } = await supabaseClient.auth.getUser();

    if (!userData.user) return;

    currentUserId = userData.user.id;

    // Current User Role
    const { data: profile } = await supabaseClient
        .from("profiles")
        .select("role")
        .eq("id", currentUserId)
        .single();

    if (!profile) return;

    // Active Announcements
    let announcementQuery = supabaseClient
        .from("announcements")
        .select("id")
        .eq("status", "active");

    // Optional Role Based
    // if(profile.role==="employee"){
    //     announcementQuery=announcementQuery.eq("target","employee");
    // }

    const { data: announcements } = await announcementQuery;

    // Read Records
    const { data: reads } = await supabaseClient
        .from("announcement_reads")
        .select("announcement_id")
        .eq("user_id", currentUserId);

    const readIds = reads ? reads.map(r => r.announcement_id) : [];

    const unread = announcements
        ? announcements.filter(a => !readIds.includes(a.id)).length
        : 0;

    updateBadge(unread);
}

// ======================================
// UPDATE BADGE
// ======================================

function updateBadge(count) {

    const badge = document.getElementById("notificationCount");

    if (!badge) return;

   if (count > 0) {

    badge.innerText = count > 99 ? "99+" : count;

    badge.classList.add("show");

} else {

    badge.classList.remove("show");

}

}

// ======================================
// OPEN PAGE
// ======================================

async function openNotifications() {

    if (!currentUserId) {

        const { data } = await supabaseClient.auth.getUser();

        currentUserId = data.user.id;

    }

    const { data: profile } = await supabaseClient
        .from("profiles")
        .select("role")
        .eq("id", currentUserId)
        .single();

    if (profile.role === "admin") {

        window.location.href = "admin-announcements.html";

    } else {

        window.location.href = "employee-announcements.html";

    }

}

// ======================================
// REALTIME LISTENER
// ======================================

function startRealtimeNotifications() {

    supabaseClient

        .channel("announcement-channel")

        .on(

            "postgres_changes",

            {

                event: "*",

                schema: "public",

                table: "announcements"

            },

            () => {

                console.log("Realtime Announcement Update");

                loadNotificationCount();

            }

        )

        .subscribe();

}

// ======================================
// START
// ======================================

loadNotificationCount();

startRealtimeNotifications();
