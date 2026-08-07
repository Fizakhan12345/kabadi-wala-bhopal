import React, { useState, useEffect } from "react";
import { PickupBookingRequest } from "../types";
import { Users, Phone, MessageCircle, CheckCircle2, Clock, X, RefreshCw, Search, Shield, Filter, MapPin, Calendar, FileText } from "lucide-react";

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [leads, setLeads] = useState<PickupBookingRequest[]>([]);
  const [stats, setStats] = useState<{
    totalLeads: number;
    pendingLeads: number;
    completedLeads: number;
    totalCallClicks: number;
    totalWhatsappClicks: number;
  }>({
    totalLeads: 0,
    pendingLeads: 0,
    completedLeads: 0,
    totalCallClicks: 48,
    totalWhatsappClicks: 112,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      const leadsRes = await fetch("/api/leads");
      if (leadsRes.ok) {
        const data = await leadsRes.json();
        if (data.leads) {
          setLeads(data.leads);
        }
      }

      const statsRes = await fetch("/api/admin/stats");
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch (err) {
      console.error("Error fetching admin leads:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAdminData();
    }
  }, [isOpen]);

  const handleUpdateStatus = async (leadId: string, newStatus: "PENDING" | "CONTACTED" | "COMPLETED" | "CANCELLED") => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  if (!isOpen) return null;

  const filteredLeads = leads.filter((lead) => {
    const matchesFilter = filterStatus === "ALL" || lead.status === filterStatus;
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.mobile.includes(searchQuery) ||
      lead.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.scrapCategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 text-white rounded-3xl max-w-5xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-slate-800 my-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#0F766E] rounded-xl text-white">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black">Kabadiwala Bhopal - Lead Admin Panel</h2>
              <p className="text-xs text-slate-400">Real-time Scrap Pickup Requests, Lead Status & Click Analytics</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchAdminData}
              disabled={isLoading}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-teal-400" : ""}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Analytics Overview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Total Enquiries</span>
            <div className="text-2xl font-black text-white">{stats.totalLeads}</div>
            <p className="text-[10px] text-teal-400 flex items-center gap-1">
              <Users className="w-3 h-3" /> Live Database
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-1">
            <span className="text-[10px] font-bold text-amber-400 uppercase">Pending Pickup</span>
            <div className="text-2xl font-black text-amber-300">{stats.pendingLeads}</div>
            <p className="text-[10px] text-amber-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Requires Action
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-1">
            <span className="text-[10px] font-bold text-emerald-400 uppercase">Call Clicks</span>
            <div className="text-2xl font-black text-emerald-300">{stats.totalCallClicks}</div>
            <p className="text-[10px] text-emerald-400 flex items-center gap-1">
              <Phone className="w-3 h-3" /> 88716 00497 Clicks
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-1">
            <span className="text-[10px] font-bold text-teal-400 uppercase">WhatsApp Clicks</span>
            <div className="text-2xl font-black text-teal-300">{stats.totalWhatsappClicks}</div>
            <p className="text-[10px] text-teal-400 flex items-center gap-1">
              <MessageCircle className="w-3 h-3" /> Direct Chats
            </p>
          </div>
        </div>

        {/* Search & Status Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-800/50 p-3 rounded-2xl border border-slate-800">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search customer name, mobile, locality..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:border-teal-500"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3" /> Status:
            </span>
            {["ALL", "PENDING", "CONTACTED", "COMPLETED"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors ${
                  filterStatus === st
                    ? "bg-[#0F766E] text-white"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Leads Table / Card List */}
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {filteredLeads.length === 0 ? (
            <div className="text-center py-10 bg-slate-800/40 rounded-2xl border border-slate-800 space-y-2">
              <FileText className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-slate-400">No leads found matching criteria.</p>
            </div>
          ) : (
            filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 space-y-3 hover:border-teal-500 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/80 pb-2.5">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base">{lead.name}</span>
                      <span className="text-xs text-teal-400 font-mono font-bold bg-teal-950 px-2 py-0.5 rounded-md border border-teal-800">
                        📞 {lead.mobile}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-emerald-400" /> {lead.locality}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {lead.pickupDate || "Today"} ({lead.preferredTimeSlot || "Morning"})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase border ${
                        lead.status === "PENDING"
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                          : lead.status === "CONTACTED"
                          ? "bg-blue-500/20 text-blue-300 border-blue-500/40"
                          : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                      }`}
                    >
                      {lead.status || "PENDING"}
                    </span>
                  </div>
                </div>

                {/* Scrap Info & Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Category & Weight:</span>
                    <p className="font-semibold text-teal-200">
                      {lead.scrapCategory} ({lead.estimatedWeightKg ? `~${lead.estimatedWeightKg} kg` : "Standard"})
                    </p>
                  </div>

                  <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Address / Notes:</span>
                    <p className="font-semibold text-slate-300 truncate">
                      {lead.address || "Doorstep Address Provided"}
                    </p>
                  </div>
                </div>

                {/* Status Action Buttons */}
                <div className="pt-1 flex flex-wrap items-center justify-between gap-2 border-t border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${lead.mobile}`}
                      className="text-xs bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call Customer
                    </a>

                    <a
                      href={`https://wa.me/91${lead.mobile.replace(/\D/g, "")}?text=Hi%20${encodeURIComponent(lead.name)},%20this%20is%20Kabadiwala%20Bhopal%20regarding%20your%20scrap%20pickup%20request.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-[#25D366] hover:bg-emerald-500 text-slate-950 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" /> WhatsApp
                    </a>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px]">
                    <button
                      onClick={() => handleUpdateStatus(lead.id, "CONTACTED")}
                      className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold px-2.5 py-1 rounded-md"
                    >
                      Mark Contacted
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(lead.id, "COMPLETED")}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2.5 py-1 rounded-md"
                    >
                      Mark Completed
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
