// ===========================
// MODERN TEAMS HRMS
// ===========================

const SUPABASE_URL = "https://hdxbdrndajvnsrrsfkiq.supabase.co";


const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkeGJkcm5kYWp2bnNycnNma2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzNjk0NjYsImV4cCI6MjA5OTk0NTQ2Nn0.Kcp_nIHfVF4kQendMsxns_OeaCPO_CV-0-64UDiwD6U";


const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);


console.log("✅ Supabase Connected");