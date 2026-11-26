import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardStats } from '../../services/adminService.js';
import { PUBLIC_WEBSITE_URL } from '../../config/env.js';
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  GraduationCap, 
  Star, 
  ArrowRight, 
  RefreshCw, 
  Phone, 
  Mail,
  ExternalLink,
  Plus,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import Loader from '../../components/common/Loader.jsx';

export default function AdminOverview() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState({
    stats: {
      totalEnquiries: 0,
      pendingEnquiries: 0,
      contactedEnquiries: 0,
      enrolledStudents: 0,
      verifiedTestimonials: 0,
      totalTestimonials: 0,
    },
    recentEnquiries: [],
  });
  const [error, setError] = useState(null);

  const fetchStats = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const res = await getDashboardStats();
      if (res.success) {
        setData({
          stats: res.stats,
          recentEnquiries: res.recentEnquiries,
        });
        setError(null);
      } else {
        setError(res.error || 'Failed to load statistics from database.');
      }
    } catch (err) {
      console.error('[AdminOverview] Error fetching stats:', err);
      setError('An unexpected error occurred while communicating with Supabase.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'enrolled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <GraduationCap className="w-3 h-3" />
            <span>Enrolled</span>
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <CheckCircle2 className="w-3 h-3" />
            <span>Contacted</span>
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3" />
            <span>Pending</span>
          </span>
        );
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <Loader size="md" text="Loading Academy Analytics..." />
      </div>
    );
  }

  const { stats, recentEnquiries } = data;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header and Refresh Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-navy">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-navy/60 mt-1 font-medium">
            Live student pipeline and academy moderation metrics synced with Supabase PostgreSQL.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchStats(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-cream-300 text-xs font-semibold text-navy hover:bg-cream-200 transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Updating...' : 'Refresh Data'}</span>
          </button>

          <Link
            to="/testimonials?new=true"
            className="btn-yellow px-4 py-2 text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Testimonial</span>
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={() => fetchStats()}
            className="underline font-bold text-amber-900 cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* Metric Cards Grid (5 balanced cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Total Enquiries */}
        <div className="bg-white p-4 rounded-2xl border border-cream-300 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-navy/60">
              Total Enquiries
            </span>
            <div className="p-2 rounded-lg bg-navy/5 text-navy">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-black text-navy">
            {stats.totalEnquiries}
          </div>
          <span className="text-[11px] text-navy/50 font-medium mt-1 block">
            All-time leads
          </span>
        </div>

        {/* Pending Action */}
        <div className="bg-white p-4 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
              Needs Follow-Up
            </span>
            <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-black text-amber-700">
            {stats.pendingEnquiries}
          </div>
          <span className="text-[11px] text-amber-800/70 font-medium mt-1 block">
            Pending demo requests
          </span>
        </div>

        {/* Contacted */}
        <div className="bg-white p-4 rounded-2xl border border-blue-200 bg-blue-50/20 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800">
              In Discussion
            </span>
            <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-black text-blue-700">
            {stats.contactedEnquiries}
          </div>
          <span className="text-[11px] text-blue-800/70 font-medium mt-1 block">
            Contacted leads
          </span>
        </div>

        {/* Enrolled */}
        <div className="bg-white p-4 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              Enrolled
            </span>
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-black text-emerald-700">
            {stats.enrolledStudents}
          </div>
          <span className="text-[11px] text-emerald-800/70 font-medium mt-1 block">
            Active admissions
          </span>
        </div>

        {/* Testimonials */}
        <div className="bg-white p-4 rounded-2xl border border-cream-300 shadow-sm col-span-2 md:col-span-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-navy/60">
              Reviews
            </span>
            <div className="p-2 rounded-lg bg-yellow/20 text-navy">
              <Star className="w-4 h-4 fill-yellow text-navy" />
            </div>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-black text-navy">
            {stats.verifiedTestimonials}
            <span className="text-sm font-sans font-normal text-navy/50">
              /{stats.totalTestimonials}
            </span>
          </div>
          <span className="text-[11px] text-navy/50 font-medium mt-1 block">
            Verified / Total
          </span>
        </div>
      </div>

      {/* Main Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Recent Enquiries Box (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-cream-300 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-cream-300 mb-4">
              <div>
                <h2 className="font-serif text-lg font-bold text-navy">
                  Recent Demo Enquiries
                </h2>
                <p className="text-xs text-navy/60">
                  Latest prospective students requesting free demo sessions
                </p>
              </div>
              <Link
                to="/enquiries"
                className="text-xs font-bold text-navy hover:text-yellow-dark flex items-center gap-1 transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentEnquiries.length === 0 ? (
              <div className="py-12 text-center text-xs text-navy/50 font-medium">
                No demo enquiries recorded yet.
              </div>
            ) : (
              <div className="divide-y divide-cream-300/60">
                {recentEnquiries.map((enquiry) => (
                  <div key={enquiry.id} className="py-3.5 flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-navy truncate">
                          {enquiry.full_name}
                        </span>
                        {getStatusBadge(enquiry.status)}
                      </div>
                      <div className="text-xs text-navy/60 mt-0.5 truncate">
                        {enquiry.preferred_course || 'General'} {enquiry.grade_level ? `• Grade ${enquiry.grade_level}` : ''}
                      </div>
                      <div className="text-[11px] text-navy/40 mt-0.5">
                        {formatDate(enquiry.created_at)}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {enquiry.phone && (
                        <a
                          href={`https://wa.me/${enquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hello ${enquiry.full_name}, thank you for your demo enquiry at Lingua Franca regarding ${enquiry.preferred_course || 'our courses'}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Contact via WhatsApp"
                          className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {enquiry.email && (
                        <a
                          href={`mailto:${enquiry.email}`}
                          title="Send Email"
                          className="p-2 rounded-xl bg-navy/5 text-navy hover:bg-navy/10 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-cream-300 mt-4">
            <Link
              to="/enquiries"
              className="w-full py-2.5 rounded-xl bg-cream border border-cream-300 text-xs font-bold text-navy flex items-center justify-center gap-2 hover:bg-cream-200 transition-colors"
            >
              <span>Manage All Demo Enquiries</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Academy Hub & Quick Actions (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Management Hub */}
          <div className="bg-white rounded-3xl border border-cream-300 p-6 shadow-sm space-y-4">
            <div>
              <h3 className="font-serif text-base font-bold text-navy">
                Academy Quick Actions
              </h3>
              <p className="text-xs text-navy/60">
                Shortcuts for everyday academy administration
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <Link
                to="/enquiries"
                className="w-full p-3 rounded-2xl border border-cream-300 hover:border-navy/30 bg-cream/30 hover:bg-cream text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-navy text-yellow shadow-sm">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-navy group-hover:text-navy-light">
                      Enquiries Pipeline
                    </h4>
                    <p className="text-[11px] text-navy/50">
                      {stats.pendingEnquiries} pending follow-ups
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-navy/40 group-hover:text-navy group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link
                to="/testimonials"
                className="w-full p-3 rounded-2xl border border-cream-300 hover:border-navy/30 bg-cream/30 hover:bg-cream text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-yellow text-navy shadow-sm">
                    <Star className="w-4 h-4 fill-navy" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-navy group-hover:text-navy-light">
                      Testimonial Moderation
                    </h4>
                    <p className="text-[11px] text-navy/50">
                      {stats.verifiedTestimonials} published reviews
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-navy/40 group-hover:text-navy group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link
                to="/testimonials?new=true"
                className="w-full p-3 rounded-2xl border border-cream-300 hover:border-navy/30 bg-cream/30 hover:bg-cream text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 shadow-sm">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-navy group-hover:text-navy-light">
                      Add New Review
                    </h4>
                    <p className="text-[11px] text-navy/50">
                      Post student or parent feedback
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-navy/40 group-hover:text-navy group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>

            <div className="pt-3 border-t border-cream-300/80">
              <a
                href={PUBLIC_WEBSITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-navy text-cream text-xs font-bold flex items-center justify-center gap-2 hover:bg-navy-light transition-colors shadow-sm"
              >
                <span>View Live Academy Website</span>
                <ExternalLink className="w-3.5 h-3.5 text-yellow" />
              </a>
            </div>
          </div>

          {/* Direct WhatsApp Info Card */}
          <div className="bg-emerald-50/60 rounded-3xl border border-emerald-200 p-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                WA
              </div>
              <div>
                <h4 className="text-xs font-bold text-emerald-950">Academy WhatsApp</h4>
                <p className="text-[11px] text-emerald-800/80 font-mono">+91 91672 17749</p>
              </div>
            </div>
            <p className="text-xs text-emerald-900/80 leading-relaxed">
              Customers submit demo enquiries directly through WhatsApp and the database. You can reply instantly via the Enquiries table.
            </p>
            <a
              href="https://wa.me/919167217749"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline inline-flex items-center gap-1"
            >
              <span>Open Academy WhatsApp</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
