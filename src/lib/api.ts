// src/lib/api.ts
const API_BASE_URL = 'http://localhost:8081/api';

export const myCorpApi = {
  // 1. Fetch Career Roster
  getJobs: async () => {
    const res = await fetch(`${API_BASE_URL}/jobs`);
    if (!res.ok) throw new Error('Mainframe Connection Failed');
    return res.json();
  },

  // 2. Identity Creation (Sign Up)
  signup: async (formData: any) => {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error('Identity Initialization Failed');
    return res.json();
  },

  // 3. Identity Handshake (Login)
  login: async (credentials: any) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) throw new Error('Unauthorized Identity');
    return res.json();
  },

  // 4. Register New Subsidiary (Primary Onboarding)
  registerSubsidiary: async (formData: any) => {
    const res = await fetch(`${API_BASE_URL}/subsidiaries/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error('Registration Protocol Denied');
    return res.json();
  },

  // 🛰️ 5. THE TRACKER: Get Company by Email
  // Connects the logged-in user to their subsidiary record
  getCompanyByEmail: async (email: string) => {
    const res = await fetch(`${API_BASE_URL}/subsidiaries/my-entity/${email}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error('Registry Lookup Failed');
    return res.json();
  },

  // 🚀 6. THE MODIFIER: Update Subsidiary Details (User Dashboard)
  updateSubsidiary: async (id: number, formData: any) => {
    const res = await fetch(`${API_BASE_URL}/subsidiaries/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error('Update Protocol Failed');
    return res.json();
  },

  // --- 🏛️ ADMIN COMMAND CENTER PROTOCOLS ---

  // 7. Intelligence Grid: Fetch Users + Linked Company Data
  getAdminUserGrid: async () => {
    // UPDATED to match your AuthController @GetMapping("/admin/intelligence")
    const res = await fetch(`${API_BASE_URL}/auth/admin/intelligence`); 
    if (!res.ok) throw new Error('Registry Intelligence Access Denied');
    return res.json();
  },

  // 8. Inquiry Inbox: Fetch all Contact Form Messages
  getAdminMessages: async () => {
    const res = await fetch(`${API_BASE_URL}/admin/messages`);
    if (!res.ok) throw new Error('Message Archive Access Denied');
    return res.json();
  },

  // 9. Audit Protocol: Update Subsidiary Status (PATCH)
  auditSubsidiary: async (id: number, status: string) => {
    const res = await fetch(`${API_BASE_URL}/admin/audit/${id}?status=${status}`, {
      method: 'PATCH',
    });
    if (!res.ok) throw new Error('Audit Transmission Failed');
    return res.json();
  },

  // 10. Admin: Fetch Raw Subsidiary Registry
  getAllSubsidiaries: async () => {
    const res = await fetch(`${API_BASE_URL}/subsidiaries`);
    if (!res.ok) throw new Error('Access Denied to Registry');
    return res.json();
  },

  // --- 🚀 PUBLIC UPLINK PROTOCOLS ---

  // 11. Public Contact Form Submission
  sendPublicInquiry: async (messageData: any) => {
    const res = await fetch(`${API_BASE_URL}/public/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageData),
    });
    if (!res.ok) throw new Error('Inquiry Transmission Interrupted');
    return res.json();
  }
};