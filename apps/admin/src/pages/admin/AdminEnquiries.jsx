import React, { useState, useEffect, useMemo } from 'react';
import { 
  getAdminEnquiries, 
  updateEnquiryStatus, 
  deleteEnquiry 
} from '../../services/adminService.js';
import { 
  Search, 
  Filter, 
  RefreshCw, 
  Phone, 
  Mail, 
  Trash2, 
  Eye, 
  Clock, 
  CheckCircle2, 
  GraduationCap, 
  X,
  AlertCircle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import Loader from '../../components/common/Loader.jsx';

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Detail Modal
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  // Delete Confirmation Modal
  const [deletingId, setDeletingId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Status updating map: id -> boolean
  const [updatingIds, setUpdatingIds] = useState({});

  const fetchEnquiries = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const res = await getAdminEnquiries({ search: searchTerm, status: statusFilter });
      if (res.success) {
        setEnquiries(res.data);
        setError(null);
      } else {
        setError(res.error || 'Failed to fetch enquiries.');
      }
    } catch (err) {
      console.error('[AdminEnquiries] Error fetching:', err);
      setError('An error occurred while loading enquiries.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEnquiries();
  };

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingIds((prev) => ({ ...prev, [id]: true }));
    try {
      const res = await updateEnquiryStatus(id, newStatus);
      if (res.success) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
        }
      } else {
        alert(res.error || 'Failed to update status.');
      }
    } catch (err) {
      console.error('[AdminEnquiries] Status update failed:', err);
      alert('An error occurred while updating status.');
    } finally {
      setUpdatingIds((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    setIsDeleting(true);

    try {
      const res = await deleteEnquiry(deletingId);
      if (res.success) {
        setEnquiries((prev) => prev.filter((item) => item.id !== deletingId));
        if (selectedEnquiry && selectedEnquiry.id === deletingId) {
          setSelectedEnquiry(null);
        }
        setDeletingId(null);
      } else {
        alert(res.error || 'Failed to delete enquiry.');
      }
    } catch (err) {
      console.error('[AdminEnquiries] Delete error:', err);
      alert('An error occurred while deleting.');
    } finally {
      setIsDeleting(false);
    }
  };

  const counts = useMemo(() => {
    return {
      all: enquiries.length,
      pending: enquiries.filter((e) => e.status === 'pending').length,
      contacted: enquiries.filter((e) => e.status === 'contacted').length,
      enrolled: enquiries.filter((e) => e.status === 'enrolled').length,
    };
  }, [enquiries]);

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'enrolled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Enrolled</span>
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Contacted</span>
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3.5 h-3.5" />
            <span>Pending</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-navy">
            Demo Enquiries
          </h1>
          <p className="text-xs sm:text-sm text-navy/60 mt-1 font-medium">
            Manage prospective student leads, update enrollment status, and reply via WhatsApp.
          </p>
        </div>

        <button
          onClick={() => fetchEnquiries(true)}
          disabled={refreshing}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-cream-300 text-xs font-semibold text-navy hover:bg-cream-200 transition-colors shadow-sm self-start sm:self-auto cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
        </button>
      </div>

      {/* Filter Tabs and Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-cream-300 shadow-sm space-y-4">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-cream-300 pb-3">
          {[
            { id: 'all', label: 'All Leads' },
            { id: 'pending', label: 'Pending Action' },
            { id: 'contacted', label: 'Contacted' },
            { id: 'enrolled', label: 'Enrolled' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === tab.id
                  ? 'bg-navy text-yellow shadow-sm'
                  : 'bg-cream text-navy/70 hover:bg-cream-200 hover:text-navy'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-navy/40" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by student name, email, phone number, or course..."
              className="w-full pl-10 pr-4 py-2.5 bg-cream/30 border border-cream-300 rounded-xl text-xs text-navy placeholder-navy/40 focus:bg-white focus:border-navy focus:ring-1 focus:ring-navy"
            />
          </div>
          <button
            type="submit"
            className="btn-navy px-4 py-2.5 text-xs font-bold cursor-pointer shrink-0"
          >
            Search
          </button>
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                fetchEnquiries();
              }}
              className="btn-outline px-3 py-2.5 text-xs font-semibold cursor-pointer shrink-0"
            >
              Clear
            </button>
          )}
        </form>
      </div>

      {/* Main List / Table */}
      {loading ? (
        <div className="p-12 flex justify-center">
          <Loader size="md" text="Loading Enquiries from Database..." />
        </div>
      ) : error ? (
        <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-xs flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={() => fetchEnquiries()}
            className="font-bold underline cursor-pointer"
          >
            Retry
          </button>
        </div>
      ) : enquiries.length === 0 ? (
        <div className="bg-white rounded-3xl border border-cream-300 p-12 text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-cream flex items-center justify-center text-navy/40 font-bold">
            0
          </div>
          <h3 className="font-serif text-lg font-bold text-navy">No Enquiries Found</h3>
          <p className="text-xs text-navy/60 max-w-sm mx-auto">
            {searchTerm || statusFilter !== 'all'
              ? 'No enquiry records match your active search and filter criteria.'
              : 'There are currently no demo enquiries recorded in the database.'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-cream-300 shadow-sm overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-cream border-b border-cream-300 text-navy font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Student & Details</th>
                  <th className="py-3.5 px-4">Course & Grade</th>
                  <th className="py-3.5 px-4">Received On</th>
                  <th className="py-3.5 px-4">Pipeline Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-300/70">
                {enquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-cream/40 transition-colors">
                    {/* Student Info */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-navy text-sm">
                        {enquiry.full_name}
                      </div>
                      <div className="text-navy/60 font-mono text-[11px] mt-0.5">
                        {enquiry.phone || 'No phone'}
                      </div>
                      <div className="text-navy/50 text-[11px] truncate max-w-xs">
                        {enquiry.email}
                      </div>
                    </td>

                    {/* Course */}
                    <td className="py-4 px-4">
                      <span className="font-semibold text-navy">
                        {enquiry.preferred_course || 'General Enquiry'}
                      </span>
                      {enquiry.grade_level && (
                        <span className="block text-[11px] text-navy/60">
                          Grade: {enquiry.grade_level}
                        </span>
                      )}
                      {enquiry.preferred_timing && (
                        <span className="block text-[10px] text-navy/40 mt-0.5">
                          Timing: {enquiry.preferred_timing}
                        </span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-navy/70 whitespace-nowrap">
                      {formatDate(enquiry.created_at)}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-4 px-4">
                      <div className="relative inline-block">
                        <select
                          value={enquiry.status || 'pending'}
                          disabled={updatingIds[enquiry.id]}
                          onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                          className="appearance-none pl-3 pr-8 py-1.5 rounded-xl text-xs font-bold border border-cream-300 bg-white hover:bg-cream cursor-pointer transition-colors focus:ring-1 focus:ring-navy focus:border-navy"
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="enrolled">Enrolled</option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-navy/50" />
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        {enquiry.phone && (
                          <a
                            href={`https://wa.me/${enquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Hello ${enquiry.full_name}, thank you for your demo enquiry at Lingua Franca regarding ${enquiry.preferred_course || 'our language courses'}. Ms. Ayeshabi Saheb requested us to follow up with you.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Chat on WhatsApp"
                            className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {enquiry.email && (
                          <a
                            href={`mailto:${enquiry.email}?subject=${encodeURIComponent(
                              `Lingua Franca - Demo Session for ${enquiry.full_name}`
                            )}`}
                            title="Send Email"
                            className="p-2 rounded-xl bg-navy/5 text-navy hover:bg-navy/10 transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </a>
                        )}

                        <button
                          onClick={() => setSelectedEnquiry(enquiry)}
                          title="View Full Details"
                          className="p-2 rounded-xl bg-navy/5 text-navy hover:bg-navy/10 transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setDeletingId(enquiry.id)}
                          title="Delete Enquiry"
                          className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden divide-y divide-cream-300">
            {enquiries.map((enquiry) => (
              <div key={enquiry.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-navy text-sm">
                      {enquiry.full_name}
                    </h3>
                    <p className="text-xs text-navy/60 font-mono">
                      {enquiry.phone || 'No phone'}
                    </p>
                  </div>
                  {getStatusBadge(enquiry.status)}
                </div>

                <div className="bg-cream/40 p-3 rounded-xl space-y-1 text-xs">
                  <p className="font-semibold text-navy">
                    {enquiry.preferred_course || 'General'}
                    {enquiry.grade_level ? ` • Grade ${enquiry.grade_level}` : ''}
                  </p>
                  <p className="text-[11px] text-navy/50">
                    Received: {formatDate(enquiry.created_at)}
                  </p>
                </div>

                {/* Status Picker & Actions */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <div className="relative">
                    <select
                      value={enquiry.status || 'pending'}
                      disabled={updatingIds[enquiry.id]}
                      onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                      className="appearance-none pl-3 pr-7 py-1.5 rounded-xl text-xs font-bold border border-cream-300 bg-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="enrolled">Enrolled</option>
                    </select>
                    <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-navy/50" />
                  </div>

                  <div className="flex items-center gap-1.5">
                    {enquiry.phone && (
                      <a
                        href={`https://wa.me/${enquiry.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-emerald-50 text-emerald-700"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedEnquiry(enquiry)}
                      className="p-2 rounded-xl bg-navy/5 text-navy"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeletingId(enquiry.id)}
                      className="p-2 rounded-xl bg-red-50 text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 border border-cream-300 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-cream-300">
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold text-navy">
                  Enquiry Record
                </span>
                {getStatusBadge(selectedEnquiry.status)}
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 rounded-lg text-navy/50 hover:text-navy hover:bg-cream transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="block text-[10px] uppercase font-bold text-navy/50 tracking-wider">
                  Student Name
                </span>
                <span className="text-base font-bold text-navy">
                  {selectedEnquiry.full_name}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-navy/50 tracking-wider">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="font-medium text-navy hover:underline break-all"
                  >
                    {selectedEnquiry.email}
                  </a>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-navy/50 tracking-wider">
                    Phone / WhatsApp
                  </span>
                  <a
                    href={`https://wa.me/${selectedEnquiry.phone?.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono font-bold text-emerald-700 hover:underline"
                  >
                    {selectedEnquiry.phone || '—'}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-navy/50 tracking-wider">
                    Preferred Course
                  </span>
                  <span className="font-semibold text-navy">
                    {selectedEnquiry.preferred_course || 'Not specified'}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-navy/50 tracking-wider">
                    Grade Level
                  </span>
                  <span className="font-semibold text-navy">
                    {selectedEnquiry.grade_level || 'Not specified'}
                  </span>
                </div>
              </div>

              {selectedEnquiry.preferred_timing && (
                <div>
                  <span className="block text-[10px] uppercase font-bold text-navy/50 tracking-wider">
                    Preferred Timing / Schedule
                  </span>
                  <span className="font-medium text-navy">
                    {selectedEnquiry.preferred_timing}
                  </span>
                </div>
              )}

              {selectedEnquiry.notes && (
                <div>
                  <span className="block text-[10px] uppercase font-bold text-navy/50 tracking-wider">
                    Student / Parent Notes
                  </span>
                  <div className="mt-1 p-3 bg-cream/50 rounded-xl border border-cream-300 text-navy whitespace-pre-wrap">
                    {selectedEnquiry.notes}
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-cream-300 text-[11px] text-navy/50 flex justify-between">
                <span>Submitted: {formatDate(selectedEnquiry.created_at)}</span>
                <span className="font-mono">ID: {selectedEnquiry.id.slice(0, 8)}...</span>
              </div>
            </div>

            {/* Quick Actions in Modal */}
            <div className="pt-3 border-t border-cream-300 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {selectedEnquiry.phone && (
                  <a
                    href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hello ${selectedEnquiry.full_name}, thank you for reaching out to Lingua Franca!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-yellow px-3 py-2 text-xs font-bold inline-flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                )}
                {selectedEnquiry.email && (
                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="btn-outline px-3 py-2 text-xs font-bold inline-flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email</span>
                  </a>
                )}
              </div>

              <button
                onClick={() => setSelectedEnquiry(null)}
                className="btn-navy px-4 py-2 text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 border border-red-200 shadow-2xl text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-navy">
              Delete Enquiry?
            </h3>
            <p className="text-xs text-navy/60">
              This will permanently delete this lead from Supabase PostgreSQL. This action cannot be undone.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDeletingId(null)}
                disabled={isDeleting}
                className="btn-outline flex-1 py-2 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="btn-navy bg-red-600 hover:bg-red-700 text-white flex-1 py-2 text-xs font-bold cursor-pointer"
              >
                {isDeleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
