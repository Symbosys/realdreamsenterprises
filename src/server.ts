import {
  AdminLogin,
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "./actions/admin.action";
import {
  getLivePricingData,
  getAllBrandsWithPricing,
  createBrand,
  updateBrand,
  deleteBrand,
  createPricingItem,
  updatePricingItem,
  deletePricingItem,
  updatePricingNotes,
} from "./actions/pricing.action";
import {
  getActiveServingLocations,
  getAllServingLocations,
  createServingLocation,
  updateServingLocation,
  deleteServingLocation,
} from "./actions/location.action";
import {
  getActiveClients,
  getAllClients,
  createClient,
  updateClient,
  deleteClient,
} from "./actions/client.action";
import {
  submitEnquiry,
  getEnquiries,
  updateEnquiry,
  addFollowUpLog,
  deleteEnquiry,
} from "./actions/enquiry.action";
import { uploadImageToCloudinary, deleteImageFromCloudinary } from "./actions/upload.action";
import { getDashboardStats } from "./actions/dashboard.action";
import {
  getActiveGalleryImages,
  getAllGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} from "./actions/gallery.action";
import { getAllWebConfig, bulkUpsertWebConfig } from "./actions/webconfig.action";
import {
  getActiveTestimonials,
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "./actions/testimonial.action";
import {
  getActiveTeamMembers,
  getAllTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "./actions/team.action";
import { prisma } from "./config/prisma";
import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const parsed = JSON.parse(body);
    return parsed.unhandled === true && parsed.message === "HTTPError";
  } catch {
    return false;
  }
}

function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown): Promise<Response> {
    const url = new URL(request.url);

    // Image Upload to Cloudinary API Endpoint
    if (url.pathname === "/api/upload" && request.method === "POST") {
      try {
        const body = await request.json();
        if (!body.image) {
          return jsonResponse({ success: false, message: "No image payload provided" }, 400);
        }
        const result = await uploadImageToCloudinary(body.image, body.folder);
        return jsonResponse({ success: true, url: result.url, public_id: result.public_id });
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Failed to upload image" }, 500);
      }
    }

    // Delete Image from Cloudinary API Endpoint
    if (url.pathname === "/api/upload" && request.method === "DELETE") {
      try {
        const body = await request.json();
        if (!body.url) {
          return jsonResponse({ success: false, message: "No image URL provided" }, 400);
        }
        const result = await deleteImageFromCloudinary(body.url);
        return jsonResponse(result);
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Failed to delete image" }, 500);
      }
    }

    // Admin Create endpoint
    if ((url.pathname === "/api/admins/create" || url.pathname === "/api/admins") && request.method === "POST") {
      try {
        const body = await request.json();
        const response = await createAdmin(body);
        return jsonResponse(response, response.success ? 201 : 400);
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Invalid request body" }, 400);
      }
    }

    // Admin Login
    if ((url.pathname === "/api/admin/login" || url.pathname === "/api/admins/login") && request.method === "POST") {
      try {
        const { email, password } = await request.json();
        const response = await AdminLogin(email, password);
        return jsonResponse(response, response.success ? 200 : 401);
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Invalid request body" }, 400);
      }
    }

    // get All Admins
    if (url.pathname === "/api/admins" && request.method === "GET") {
      try {
        const data = await getAllAdmins();
        return jsonResponse({ success: true, message: "All admins fetched successfully", data });
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Failed to fetch admins" }, 500);
      }
    }

    // dynamic matching for /api/admins/:id (PUT, PATCH, DELETE)
    const adminIdMatch = url.pathname.match(/^\/api\/admins\/(\d+)$/);
    if (adminIdMatch) {
      const adminId = parseInt(adminIdMatch[1], 10);

      // update Admin
      if (request.method === "PUT" || request.method === "PATCH") {
        try {
          const body = await request.json();
          const response = await updateAdmin(adminId, body);
          return jsonResponse(response, response.success ? 200 : 400);
        } catch (error: any) {
          return jsonResponse({ success: false, message: error.message || "Invalid request body" }, 400);
        }
      }

      // delete Admin
      if (request.method === "DELETE") {
        try {
          const response = await deleteAdmin(adminId);
          return jsonResponse(response, response.success ? 200 : 404);
        } catch (error: any) {
          return jsonResponse({ success: false, message: error.message || "Failed to delete admin" }, 500);
        }
      }
    }

    // --- BRAND & LIVE PRICING ENDPOINTS ---

    // Public live pricing endpoint
    if (url.pathname === "/api/pricing/live" && request.method === "GET") {
      try {
        const data = await getLivePricingData();
        return jsonResponse({ success: true, data });
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Failed to fetch live pricing" }, 500);
      }
    }

    // Admin brands & pricing list endpoint
    if (url.pathname === "/api/pricing/brands" && request.method === "GET") {
      try {
        const data = await getAllBrandsWithPricing();
        return jsonResponse({ success: true, data });
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Failed to fetch brands" }, 500);
      }
    }

    // Create Brand
    if (url.pathname === "/api/pricing/brands" && request.method === "POST") {
      try {
        const body = await request.json();
        const brand = await createBrand(body);
        return jsonResponse({ success: true, message: "Brand created successfully", data: brand }, 201);
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Failed to create brand" }, 400);
      }
    }

    // Dynamic brand ID endpoints (/api/pricing/brands/:id)
    const brandIdMatch = url.pathname.match(/^\/api\/pricing\/brands\/(\d+)$/);
    if (brandIdMatch) {
      const brandId = parseInt(brandIdMatch[1], 10);
      if (request.method === "PUT" || request.method === "PATCH") {
        try {
          const body = await request.json();
          const brand = await updateBrand(brandId, body);
          return jsonResponse({ success: true, message: "Brand updated successfully", data: brand });
        } catch (error: any) {
          return jsonResponse({ success: false, message: error.message || "Failed to update brand" }, 400);
        }
      }
      if (request.method === "DELETE") {
        try {
          const result = await deleteBrand(brandId);
          return jsonResponse(result);
        } catch (error: any) {
          return jsonResponse({ success: false, message: error.message || "Failed to delete brand" }, 500);
        }
      }
    }

    // Create Pricing Item
    if (url.pathname === "/api/pricing/items" && request.method === "POST") {
      try {
        const body = await request.json();
        const item = await createPricingItem(body);
        return jsonResponse({ success: true, message: "Pricing item created successfully", data: item }, 201);
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Failed to create pricing item" }, 400);
      }
    }

    // Dynamic pricing item ID endpoints (/api/pricing/items/:id)
    const pricingItemIdMatch = url.pathname.match(/^\/api\/pricing\/items\/(\d+)$/);
    if (pricingItemIdMatch) {
      const itemId = parseInt(pricingItemIdMatch[1], 10);
      if (request.method === "PUT" || request.method === "PATCH") {
        try {
          const body = await request.json();
          const item = await updatePricingItem(itemId, body);
          return jsonResponse({ success: true, message: "Pricing item updated successfully", data: item });
        } catch (error: any) {
          return jsonResponse({ success: false, message: error.message || "Failed to update pricing item" }, 400);
        }
      }
      if (request.method === "DELETE") {
        try {
          const result = await deletePricingItem(itemId);
          return jsonResponse(result);
        } catch (error: any) {
          return jsonResponse({ success: false, message: error.message || "Failed to delete pricing item" }, 500);
        }
      }
    }

    // Update Pricing Notes
    if (url.pathname === "/api/pricing/notes" && request.method === "PUT") {
      try {
        const body = await request.json();
        const notes = await updatePricingNotes(body.notes || []);
        return jsonResponse({ success: true, message: "Pricing notes updated successfully", data: notes });
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Failed to update pricing notes" }, 400);
      }
    }

    // --- SERVING LOCATION ENDPOINTS ---

    // Public active serving locations
    if (url.pathname === "/api/serving-locations/active" && request.method === "GET") {
      try {
        const data = await getActiveServingLocations();
        return jsonResponse({ success: true, data });
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Failed to fetch locations" }, 500);
      }
    }

    // Admin all serving locations
    if (url.pathname === "/api/serving-locations" && request.method === "GET") {
      try {
        const data = await getAllServingLocations();
        return jsonResponse({ success: true, data });
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Failed to fetch locations" }, 500);
      }
    }

    // Create location
    if (url.pathname === "/api/serving-locations" && request.method === "POST") {
      try {
        const body = await request.json();
        const location = await createServingLocation(body);
        return jsonResponse({ success: true, message: "Location created successfully", data: location }, 201);
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Failed to create location" }, 400);
      }
    }

    // Dynamic location ID endpoints (/api/serving-locations/:id)
    const locationIdMatch = url.pathname.match(/^\/api\/serving-locations\/(\d+)$/);
    if (locationIdMatch) {
      const locationId = parseInt(locationIdMatch[1], 10);
      if (request.method === "PUT" || request.method === "PATCH") {
        try {
          const body = await request.json();
          const location = await updateServingLocation(locationId, body);
          return jsonResponse({ success: true, message: "Location updated successfully", data: location });
        } catch (error: any) {
          return jsonResponse({ success: false, message: error.message || "Failed to update location" }, 400);
        }
      }
      if (request.method === "DELETE") {
        try {
          const result = await deleteServingLocation(locationId);
          return jsonResponse(result);
        } catch (error: any) {
          return jsonResponse({ success: false, message: error.message || "Failed to delete location" }, 500);
        }
      }
    }

    // --- MY CLIENTS ENDPOINTS ---

    // Public active clients endpoint
    if (url.pathname === "/api/my-clients/active" && request.method === "GET") {
      try {
        const data = await getActiveClients();
        return jsonResponse({ success: true, data });
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Failed to fetch active clients" }, 500);
      }
    }

    // Admin all clients endpoint
    if (url.pathname === "/api/my-clients" && request.method === "GET") {
      try {
        const data = await getAllClients();
        return jsonResponse({ success: true, data });
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Failed to fetch clients" }, 500);
      }
    }

    // Create client endpoint
    if ((url.pathname === "/api/my-clients/create" || url.pathname === "/api/my-clients") && request.method === "POST") {
      try {
        const body = await request.json();
        const client = await createClient(body);
        return jsonResponse({ success: true, message: "Client created successfully", data: client }, 201);
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Failed to create client" }, 400);
      }
    }

    // Dynamic client ID endpoints (/api/my-clients/:id)
    const clientIdMatch = url.pathname.match(/^\/api\/my-clients\/(\d+)$/);
    if (clientIdMatch) {
      const clientId = parseInt(clientIdMatch[1], 10);
      if (request.method === "PUT" || request.method === "PATCH") {
        try {
          const body = await request.json();
          const client = await updateClient(clientId, body);
          return jsonResponse({ success: true, message: "Client updated successfully", data: client });
        } catch (error: any) {
          return jsonResponse({ success: false, message: error.message || "Failed to update client" }, 400);
        }
      }
      if (request.method === "DELETE") {
        try {
          const result = await deleteClient(clientId);
          return jsonResponse(result);
        } catch (error: any) {
          return jsonResponse({ success: false, message: error.message || "Failed to delete client" }, 500);
        }
      }
    }

    // --- ENQUIRY & LEAD CRM ENDPOINTS ---

    // Public Submit Enquiry
    if (url.pathname === "/api/enquiries" && request.method === "POST") {
      try {
        const body = await request.json();
        const enquiry = await submitEnquiry(body);
        return jsonResponse({ success: true, message: "Enquiry submitted successfully", data: enquiry }, 201);
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Failed to submit enquiry" }, 400);
      }
    }

    // Admin Paginated Enquiries Query
    if (url.pathname === "/api/enquiries" && request.method === "GET") {
      try {
        const page = parseInt(url.searchParams.get("page") || "1", 10);
        const limit = parseInt(url.searchParams.get("limit") || "10", 10);
        const status = (url.searchParams.get("status") || "ALL") as any;
        const priority = (url.searchParams.get("priority") || "ALL") as any;
        const assignedToAdminIdParam = url.searchParams.get("assignedToAdminId");
        const assignedToAdminId = assignedToAdminIdParam
          ? assignedToAdminIdParam === "ALL"
            ? "ALL"
            : parseInt(assignedToAdminIdParam, 10)
          : undefined;
        const search = url.searchParams.get("search") || undefined;
        const startDate = url.searchParams.get("startDate") || undefined;
        const endDate = url.searchParams.get("endDate") || undefined;

        const data = await getEnquiries({ page, limit, status, priority, assignedToAdminId, search, startDate, endDate });
        return jsonResponse({ success: true, ...data });
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Failed to fetch enquiries" }, 500);
      }
    }

    // Add Follow-Up Log to Enquiry (/api/enquiries/:id/follow-ups)
    const followUpMatch = url.pathname.match(/^\/api\/enquiries\/(\d+)\/follow-ups$/);
    if (followUpMatch && request.method === "POST") {
      try {
        const enquiryId = parseInt(followUpMatch[1], 10);
        const body = await request.json();
        const followUp = await addFollowUpLog(enquiryId, body);
        return jsonResponse({ success: true, message: "Follow-up log added successfully", data: followUp }, 201);
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Failed to add follow-up log" }, 400);
      }
    }

    // Dynamic Enquiry ID endpoints (/api/enquiries/:id)
    const enquiryIdMatch = url.pathname.match(/^\/api\/enquiries\/(\d+)$/);
    if (enquiryIdMatch) {
      const enquiryId = parseInt(enquiryIdMatch[1], 10);
      if (request.method === "PUT" || request.method === "PATCH") {
        try {
          const body = await request.json();
          const enquiry = await updateEnquiry(enquiryId, body);
          return jsonResponse({ success: true, message: "Enquiry updated successfully", data: enquiry });
        } catch (error: any) {
          return jsonResponse({ success: false, message: error.message || "Failed to update enquiry" }, 400);
        }
      }
      if (request.method === "DELETE") {
        try {
          const result = await deleteEnquiry(enquiryId);
          return jsonResponse(result);
        } catch (error: any) {
          return jsonResponse({ success: false, message: error.message || "Failed to delete enquiry" }, 500);
        }
      }
    }

    // --- DASHBOARD STATS ENDPOINT ---
    if (url.pathname === "/api/dashboard/stats" && request.method === "GET") {
      try {
        const data = await getDashboardStats();
        return jsonResponse({ success: true, data });
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Failed to fetch dashboard stats" }, 500);
      }
    }

    // --- WEBCONFIG ENDPOINTS ---

    // Public: get all config
    if (url.pathname === "/api/webconfig" && request.method === "GET") {
      try {
        const data = await getAllWebConfig();
        return jsonResponse({ success: true, data });
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Failed to fetch web config" }, 500);
      }
    }

    // Admin: bulk upsert config
    if (url.pathname === "/api/webconfig" && request.method === "PUT") {
      try {
        const body = await request.json();
        if (!body.entries || !Array.isArray(body.entries)) {
          return jsonResponse({ success: false, message: "entries array is required" }, 400);
        }
        const result = await bulkUpsertWebConfig(body.entries);
        return jsonResponse({ success: true, message: `Saved ${result.count} config entries`, data: result });
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Failed to update web config" }, 400);
      }
    }

    // --- GALLERY ENDPOINTS ---

    // Public active gallery endpoint
    if (url.pathname === "/api/gallery/active" && request.method === "GET") {
      try {
        const data = await getActiveGalleryImages();
        return jsonResponse({ success: true, data });
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Failed to fetch gallery" }, 500);
      }
    }

    // Admin all gallery images endpoint
    if (url.pathname === "/api/gallery" && request.method === "GET") {
      try {
        const data = await getAllGalleryImages();
        return jsonResponse({ success: true, data });
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Failed to fetch gallery images" }, 500);
      }
    }

    // Create gallery image
    if ((url.pathname === "/api/gallery/create" || url.pathname === "/api/gallery") && request.method === "POST") {
      try {
        const body = await request.json();
        const item = await createGalleryImage(body);
        return jsonResponse({ success: true, message: "Gallery image added successfully", data: item }, 201);
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Failed to add gallery image" }, 400);
      }
    }

    // Dynamic gallery ID endpoints (/api/gallery/:id)
    const galleryIdMatch = url.pathname.match(/^\/api\/gallery\/(\d+)$/);
    if (galleryIdMatch) {
      const galleryId = parseInt(galleryIdMatch[1], 10);
      if (request.method === "PUT" || request.method === "PATCH") {
        try {
          const body = await request.json();
          const item = await updateGalleryImage(galleryId, body);
          return jsonResponse({ success: true, message: "Gallery image updated successfully", data: item });
        } catch (error: any) {
          return jsonResponse({ success: false, message: error.message || "Failed to update gallery image" }, 400);
        }
      }
      if (request.method === "DELETE") {
        try {
          const result = await deleteGalleryImage(galleryId);
          return jsonResponse(result);
        } catch (error: any) {
          return jsonResponse({ success: false, message: error.message || "Failed to delete gallery image" }, 500);
        }
      }
    }

    // --- TESTIMONIAL ENDPOINTS ---
    if (url.pathname === "/api/testimonials/active" && request.method === "GET") {
      try {
        const data = await getActiveTestimonials();
        return jsonResponse({ success: true, data });
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Failed to fetch active testimonials" }, 500);
      }
    }

    if (url.pathname === "/api/testimonials" && request.method === "GET") {
      try {
        const data = await getAllTestimonials();
        return jsonResponse({ success: true, data });
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Failed to fetch testimonials" }, 500);
      }
    }

    if (url.pathname === "/api/testimonials" && request.method === "POST") {
      try {
        const body = await request.json();
        const testimonial = await createTestimonial(body);
        return jsonResponse({ success: true, message: "Testimonial created successfully", data: testimonial }, 201);
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Failed to create testimonial" }, 400);
      }
    }

    const testimonialIdMatch = url.pathname.match(/^\/api\/testimonials\/(\d+)$/);
    if (testimonialIdMatch) {
      const testimonialId = parseInt(testimonialIdMatch[1], 10);
      if (request.method === "PUT" || request.method === "PATCH") {
        try {
          const body = await request.json();
          const testimonial = await updateTestimonial(testimonialId, body);
          return jsonResponse({ success: true, message: "Testimonial updated successfully", data: testimonial });
        } catch (error: any) {
          return jsonResponse({ success: false, message: error.message || "Failed to update testimonial" }, 400);
        }
      }
      if (request.method === "DELETE") {
        try {
          const result = await deleteTestimonial(testimonialId);
          return jsonResponse(result);
        } catch (error: any) {
          return jsonResponse({ success: false, message: error.message || "Failed to delete testimonial" }, 500);
        }
      }
    }

    // --- TEAM MEMBER ENDPOINTS ---
    if (url.pathname === "/api/team-members/active" && request.method === "GET") {
      try {
        const data = await getActiveTeamMembers();
        return jsonResponse({ success: true, data });
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Failed to fetch active team members" }, 500);
      }
    }

    if (url.pathname === "/api/team-members" && request.method === "GET") {
      try {
        const data = await getAllTeamMembers();
        return jsonResponse({ success: true, data });
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Failed to fetch team members" }, 500);
      }
    }

    if (url.pathname === "/api/team-members" && request.method === "POST") {
      try {
        const body = await request.json();
        const member = await createTeamMember(body);
        return jsonResponse({ success: true, message: "Team member created successfully", data: member }, 201);
      } catch (error: any) {
        return jsonResponse({ success: false, message: error.message || "Failed to create team member" }, 400);
      }
    }

    const teamMemberIdMatch = url.pathname.match(/^\/api\/team-members\/(\d+)$/);
    if (teamMemberIdMatch) {
      const memberId = parseInt(teamMemberIdMatch[1], 10);
      if (request.method === "PUT" || request.method === "PATCH") {
        try {
          const body = await request.json();
          const member = await updateTeamMember(memberId, body);
          return jsonResponse({ success: true, message: "Team member updated successfully", data: member });
        } catch (error: any) {
          return jsonResponse({ success: false, message: error.message || "Failed to update team member" }, 400);
        }
      }
      if (request.method === "DELETE") {
        try {
          const result = await deleteTeamMember(memberId);
          return jsonResponse(result);
        } catch (error: any) {
          return jsonResponse({ success: false, message: error.message || "Failed to delete team member" }, 500);
        }
      }
    }

    const serverEntry = await getServerEntry();
    const res = await serverEntry.fetch(request, env, ctx);
    return await normalizeCatastrophicSsrResponse(res);
  },
};
