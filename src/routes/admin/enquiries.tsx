import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  MessageSquare,
  Search,
  Filter,
  RefreshCw,
  Calendar,
  UserCheck,
  Clock,
  Phone,
  Mail,
  MapPin,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  X,
  FileText,
  Send,
  Trash2,
  Edit2,
  Tag,
} from "lucide-react";
import {
  useGetEnquiries,
  useUpdateEnquiry,
  useAddFollowUp,
  useDeleteEnquiry,
  EnquiryData,
  EnquiryStatusType,
  EnquiryPriorityType,
} from "@/api/enquiry.api";
import { useGetAdmins } from "@/api/admin.api";

export const Route = createFileRoute("/admin/enquiries")({
  component: AdminEnquiriesPage,
});

function AdminEnquiriesPage() {
  // Query parameters state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number>(10);
  const [statusFilter, setStatusFilter] = useState<EnquiryStatusType | "ALL">("ALL");
  const [priorityFilter, setPriorityFilter] = useState<EnquiryPriorityType | "ALL">("ALL");
  const [assignedAdminFilter, setAssignedAdminFilter] = useState<number | "ALL">("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [jumpPage, setJumpPage] = useState("");

  const { data: enquiryResponse, isLoading, isRefetching, refetch } = useGetEnquiries({
    page,
    limit,
    status: statusFilter,
    priority: priorityFilter,
    assignedToAdminId: assignedAdminFilter,
    search: searchTerm,
    startDate,
    endDate,
  });

  const { data: adminList = [] } = useGetAdmins();

  const updateEnquiryMutation = useUpdateEnquiry();
  const addFollowUpMutation = useAddFollowUp();
  const deleteEnquiryMutation = useDeleteEnquiry();

  const [successToast, setSuccessToast] = useState("");
  const [errorToast, setErrorToast] = useState("");

  // Detail / Follow-up Modal State
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryData | null>(null);

  // Follow-up Log Form State inside Modal
  const [followUpNotes, setFollowUpNotes] = useState("");
  const [newStatus, setNewStatus] = useState<EnquiryStatusType>("IN_FOLLOWUP");
  const [newPriority, setNewPriority] = useState<EnquiryPriorityType>("MEDIUM");
  const [newAssignedAdminId, setNewAssignedAdminId] = useState<number | null>(null);
  const [nextFollowUpDate, setNextFollowUpDate] = useState("");

  const enquiries = enquiryResponse?.items || [];
  const totalItems = enquiryResponse?.total || 0;
  const totalPages = enquiryResponse?.totalPages || 1;
  const currentPage = enquiryResponse?.currentPage || 1;

  const handleOpenDetailModal = (enquiry: EnquiryData) => {
    setSelectedEnquiry(enquiry);
    setNewStatus(enquiry.status);
    setNewPriority(enquiry.priority);
    setNewAssignedAdminId(enquiry.assignedToAdminId);
    setNextFollowUpDate(
      enquiry.nextFollowUpDate
        ? new Date(enquiry.nextFollowUpDate).toISOString().split("T")[0]
        : ""
    );
    setFollowUpNotes("");
  };

  const handleAddFollowUpLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;
    if (!followUpNotes.trim()) {
      setErrorToast("Please enter follow-up notes.");
      return;
    }

    try {
      // 1. Add follow-up log entry
      await addFollowUpMutation.mutateAsync({
        enquiryId: selectedEnquiry.id,
        input: {
          notes: followUpNotes,
          status: newStatus,
          scheduledFollowUpDate: nextFollowUpDate || null,
        },
      });

      // 2. Update lead assigned admin and priority if changed
      await updateEnquiryMutation.mutateAsync({
        id: selectedEnquiry.id,
        input: {
          status: newStatus,
          priority: newPriority,
          assignedToAdminId: newAssignedAdminId,
          nextFollowUpDate: nextFollowUpDate || null,
        },
      });

      setSuccessToast(`Follow-up logged for ${selectedEnquiry.enquiryNumber}!`);
      setSelectedEnquiry(null);
      setTimeout(() => setSuccessToast(""), 3500);
    } catch (err: any) {
      setErrorToast(err.message || "Failed to log follow-up.");
    }
  };

  const handleDeleteEnquiry = async (enquiry: EnquiryData) => {
    if (!confirm(`Delete enquiry ${enquiry.enquiryNumber} from ${enquiry.name}?`)) return;
    try {
      await deleteEnquiryMutation.mutateAsync(enquiry.id);
      setSuccessToast(`Enquiry ${enquiry.enquiryNumber} deleted.`);
      setTimeout(() => setSuccessToast(""), 3500);
    } catch (err: any) {
      setErrorToast(err.message || "Failed to delete enquiry.");
    }
  };

  const handleJumpPageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseInt(jumpPage, 10);
    if (!isNaN(p) && p >= 1 && p <= totalPages) {
      setPage(p);
      setJumpPage("");
    } else {
      setErrorToast(`Please enter a valid page number between 1 and ${totalPages}.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-ember" /> Customer Enquiries & Lead CRM
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage project brief submissions, assign sales admins, schedule follow-ups, and track lead conversion.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => refetch()}
            className="p-2 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            title="Refresh List"
          >
            <RefreshCw className={`h-4 w-4 ${isRefetching ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successToast && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs font-bold text-emerald-400">
          <CheckCircle2 className="h-5 w-5 shrink-0" /> {successToast}
        </div>
      )}
      {errorToast && (
        <div className="flex items-center justify-between rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-xs font-bold text-destructive">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 shrink-0" /> {errorToast}
          </div>
          <button type="button" onClick={() => setErrorToast("")} className="p-1 text-destructive hover:opacity-80 cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Search, Filter & Limit Bar */}
      <div className="p-4 rounded-xl border border-border/80 bg-card space-y-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search reference (REQ-XXXX), customer, phone, location..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-ember"
            />
          </div>
        </div>

        {/* Filter Selectors Row */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-border/60">
          <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
            <Filter className="h-3.5 w-3.5 text-ember" /> Filters:
          </span>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as any);
              setPage(1);
            }}
            className="px-3 py-1.5 text-xs rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-ember"
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">New Lead</option>
            <option value="CONTACTED">Contacted</option>
            <option value="IN_FOLLOWUP">In Follow-Up</option>
            <option value="PROPOSAL_SENT">Proposal Sent</option>
            <option value="WON">Won (Customer)</option>
            <option value="LOST">Lost</option>
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => {
              setPriorityFilter(e.target.value as any);
              setPage(1);
            }}
            className="px-3 py-1.5 text-xs rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-ember"
          >
            <option value="ALL">All Priorities</option>
            <option value="LOW">Low Priority</option>
            <option value="MEDIUM">Medium Priority</option>
            <option value="HIGH">High Priority</option>
            <option value="URGENT">Urgent Priority</option>
          </select>

          {/* Assigned Admin Filter */}
          <select
            value={assignedAdminFilter === "ALL" ? "ALL" : assignedAdminFilter}
            onChange={(e) => {
              setAssignedAdminFilter(e.target.value === "ALL" ? "ALL" : Number(e.target.value));
              setPage(1);
            }}
            className="px-3 py-1.5 text-xs rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-ember"
          >
            <option value="ALL">All Admins</option>
            <option value={0}>Unassigned Leads</option>
            {adminList.map((adm) => (
              <option key={adm.id} value={adm.id}>
                {adm.name} ({adm.email})
              </option>
            ))}
          </select>

          {/* Start Date & End Date Filters */}
          <div className="flex flex-wrap items-center gap-1.5 border-l border-border/60 pl-3">
            <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-ember" /> Date Range:
            </span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setPage(1);
              }}
              className="px-2 py-1 text-xs rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-ember"
              title="Start Date"
            />
            <span className="text-xs text-muted-foreground">to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setPage(1);
              }}
              className="px-2 py-1 text-xs rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-ember"
              title="End Date"
            />
            {(startDate || endDate) && (
              <button
                type="button"
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                  setPage(1);
                }}
                className="px-2 py-1 rounded bg-muted text-[10px] font-bold text-muted-foreground hover:text-foreground hover:bg-destructive/20 transition-colors cursor-pointer"
              >
                Clear Dates
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="rounded-xl border border-border/80 bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="border-b border-border/60 bg-muted/40 text-muted-foreground uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Ref # & Date</th>
                <th className="py-3.5 px-4">Customer Info</th>
                <th className="py-3.5 px-4">Requirement</th>
                <th className="py-3.5 px-4">Status & Priority</th>
                <th className="py-3.5 px-4">Assigned Admin</th>
                <th className="py-3.5 px-4">Next Follow-Up</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 font-medium">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs text-muted-foreground">
                    <RefreshCw className="h-5 w-5 animate-spin mx-auto mb-2 text-ember" />
                    Loading enquiries...
                  </td>
                </tr>
              ) : enquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs text-muted-foreground">
                    No customer enquiries found matching the selected filters.
                  </td>
                </tr>
              ) : (
                enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-extrabold text-foreground text-xs">{enq.enquiryNumber}</span>
                        <p className="text-[10px] text-muted-foreground">
                          {new Date(enq.createdAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                        </p>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div>
                        <p className="font-bold text-foreground">{enq.name}</p>
                        {enq.companyName && <p className="text-[10px] text-muted-foreground">{enq.companyName}</p>}
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                          <span className="flex items-center gap-0.5"><Phone className="h-3 w-3 text-ember" /> {enq.phone}</span>
                          <span className="flex items-center gap-0.5"><Mail className="h-3 w-3" /> {enq.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-muted text-foreground border border-border/60">
                          <Tag className="h-3 w-3 text-ember" /> {enq.requirementType || "General Quote"}
                        </span>
                        {enq.projectLocation && (
                          <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" /> {enq.projectLocation}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-extrabold ${
                            enq.status === "NEW"
                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                              : enq.status === "WON"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                              : enq.status === "LOST"
                              ? "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                          }`}
                        >
                          {enq.status}
                        </span>
                        <div>
                          <span className="text-[9px] font-bold text-muted-foreground uppercase">
                            Priority: {enq.priority}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {enq.assignedAdmin ? (
                        <div className="flex items-center gap-1.5 text-xs text-foreground font-semibold">
                          <UserCheck className="h-3.5 w-3.5 text-ember" />
                          <span>{enq.assignedAdmin.name}</span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-amber-400 font-semibold italic">Unassigned</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {enq.nextFollowUpDate ? (
                        <span className="text-xs font-bold text-ember flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {new Date(enq.nextFollowUpDate).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                        </span>
                      ) : (
                        <span className="text-[10px] text-muted-foreground">Not Scheduled</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenDetailModal(enq)}
                          className="px-2.5 py-1 rounded border border-border bg-card text-muted-foreground hover:text-foreground hover:border-ember transition-colors cursor-pointer text-xs font-bold flex items-center gap-1"
                          title="Manage Lead & Log Follow-up"
                        >
                          <Edit2 className="h-3.5 w-3.5 text-ember" /> Manage Lead
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteEnquiry(enq)}
                          className="p-1.5 rounded border border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors cursor-pointer"
                          title="Delete Lead"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-border/60 bg-muted/20 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <div>
              Showing <span className="font-bold text-foreground">{(currentPage - 1) * limit + (totalItems > 0 ? 1 : 0)}</span> to{" "}
              <span className="font-bold text-foreground">{Math.min(currentPage * limit, totalItems)}</span> of{" "}
              <span className="font-bold text-foreground">{totalItems}</span> Enquiries
            </div>

            {/* Limit Selector (10, 25, 50) shifted to bottom */}
            <div className="flex items-center gap-2 border-l border-border/60 pl-4">
              <span className="text-xs font-bold text-muted-foreground whitespace-nowrap">
                Show Limit:
              </span>
              <div className="flex items-center gap-1">
                {[10, 25, 50].map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => {
                      setLimit(l);
                      setPage(1);
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-extrabold transition-colors cursor-pointer ${
                      limit === l
                        ? "bg-ember text-white shadow-sm"
                        : "bg-card text-muted-foreground border border-border hover:bg-muted"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Direct Page Jump Input */}
            <form onSubmit={handleJumpPageSubmit} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-semibold">Go to Page:</span>
              <input
                type="number"
                min={1}
                max={totalPages}
                placeholder={`${currentPage}`}
                value={jumpPage}
                onChange={(e) => setJumpPage(e.target.value)}
                className="w-14 px-2 py-1 text-xs rounded border border-border bg-background text-foreground text-center focus:outline-none focus:border-ember"
              />
              <button
                type="submit"
                className="px-2 py-1 rounded bg-muted text-xs font-bold hover:bg-ember hover:text-white transition-colors cursor-pointer"
              >
                Go
              </button>
            </form>

            {/* Prev / Next Pagination Controls */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded border border-border bg-card text-muted-foreground hover:text-foreground disabled:opacity-40 cursor-pointer"
                title="Previous Page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-xs font-bold px-2 text-foreground">
                {currentPage} / {totalPages}
              </span>
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded border border-border bg-card text-muted-foreground hover:text-foreground disabled:opacity-40 cursor-pointer"
                title="Next Page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Follow-up & Lead Management Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-6 my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-ember/10 text-ember border border-ember/30">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-foreground flex items-center gap-2">
                    Enquiry {selectedEnquiry.enquiryNumber}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Submitted on {new Date(selectedEnquiry.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Customer Details Box */}
            <div className="p-4 rounded-xl border border-border/80 bg-muted/20 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">Customer Name</span>
                  <p className="font-extrabold text-foreground text-sm">{selectedEnquiry.name}</p>
                  {selectedEnquiry.companyName && (
                    <p className="text-xs text-muted-foreground font-semibold">{selectedEnquiry.companyName}</p>
                  )}
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">Contact Details</span>
                  <p className="text-xs text-foreground font-bold flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5 text-ember" /> {selectedEnquiry.phone}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5" /> {selectedEnquiry.email}
                  </p>
                </div>
              </div>

              {selectedEnquiry.projectLocation && (
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">Project Location</span>
                  <p className="text-xs text-foreground font-semibold flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-ember" /> {selectedEnquiry.projectLocation}
                  </p>
                </div>
              )}

              <div>
                <span className="text-[10px] uppercase font-bold text-muted-foreground">Requirement Brief</span>
                <p className="text-xs text-foreground bg-background p-3 rounded-lg border border-border/60 leading-relaxed font-medium mt-1">
                  "{selectedEnquiry.message}"
                </p>
              </div>
            </div>

            {/* Lead Assignment & Status Control */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Assign Admin</label>
                <select
                  value={newAssignedAdminId || 0}
                  onChange={(e) => setNewAssignedAdminId(Number(e.target.value) || null)}
                  className="w-full p-2 text-xs rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-ember font-semibold"
                >
                  <option value={0}>-- Unassigned --</option>
                  {adminList.map((adm) => (
                    <option key={adm.id} value={adm.id}>
                      {adm.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Lead Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as EnquiryStatusType)}
                  className="w-full p-2 text-xs rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-ember font-semibold"
                >
                  <option value="NEW">NEW</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="IN_FOLLOWUP">IN_FOLLOWUP</option>
                  <option value="PROPOSAL_SENT">PROPOSAL_SENT</option>
                  <option value="WON">WON</option>
                  <option value="LOST">LOST</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Priority</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as EnquiryPriorityType)}
                  className="w-full p-2 text-xs rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-ember font-semibold"
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                  <option value="URGENT">URGENT</option>
                </select>
              </div>
            </div>

            {/* Historical Follow-Up Log Timeline */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase text-muted-foreground tracking-wider flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-ember" /> Follow-Up Activity Timeline
              </h4>

              <div className="max-h-44 overflow-y-auto space-y-2.5 pr-2">
                {selectedEnquiry.followUps && selectedEnquiry.followUps.length > 0 ? (
                  selectedEnquiry.followUps.map((log) => (
                    <div key={log.id} className="p-3 rounded-lg border border-border/70 bg-background text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                        <span className="font-bold text-foreground">
                          {log.admin?.name || "Admin Staff"}
                        </span>
                        <span>{new Date(log.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span>
                      </div>
                      <p className="text-foreground font-medium">{log.notes}</p>
                      {log.scheduledFollowUpDate && (
                        <p className="text-[10px] text-ember font-bold">
                          Next Scheduled: {new Date(log.scheduledFollowUpDate).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground italic py-3 text-center border border-dashed border-border/60 rounded-lg">
                    No previous follow-up notes logged yet.
                  </p>
                )}
              </div>
            </div>

            {/* Log New Follow-Up Form */}
            <form onSubmit={handleAddFollowUpLog} className="space-y-3 pt-3 border-t border-border/60">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  Log New Follow-Up Notes *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Record customer discussion, quoted prices, site requirements, or next action plan..."
                  value={followUpNotes}
                  onChange={(e) => setFollowUpNotes(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  Next Scheduled Follow-Up Date
                </label>
                <input
                  type="date"
                  value={nextFollowUpDate}
                  onChange={(e) => setNextFollowUpDate(e.target.value)}
                  className="w-full p-2 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-4 py-2 rounded-lg border border-border text-xs font-bold hover:bg-muted cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={addFollowUpMutation.isPending || updateEnquiryMutation.isPending}
                  className="px-4 py-2 rounded-lg bg-ember text-xs font-bold text-white hover:bg-ember/90 cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Send className="h-3.5 w-3.5" /> Save Follow-Up Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
