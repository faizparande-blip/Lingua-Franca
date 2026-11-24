import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  getAdminTestimonials, 
  createTestimonial, 
  updateTestimonial, 
  toggleTestimonialVerification, 
  deleteTestimonial 
} from '../../services/adminService.js';
import { 
  Star, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  X, 
  AlertCircle,
  Eye,
  Check
} from 'lucide-react';
import Loader from '../../components/common/Loader.jsx';

export default function AdminTestimonials() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Filter: 'all', 'verified', 'unverified'
  const [filter, setFilter] = useState('all');

  // Modal State: null | 'create' | testimonial object for edit
  const [modalMode, setModalMode] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    rating: 5,
    text: '',
    avatar: '',
    is_verified: true,
  });
  const [formError, setFormError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Delete State
  const [deletingId, setDeletingId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toggle in-progress map
  const [togglingIds, setTogglingIds] = useState({});

  const fetchTestimonials = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const res = await getAdminTestimonials();
      if (res.success) {
        setTestimonials(res.data);
        setError(null);
      } else {
        setError(res.error || 'Failed to fetch testimonials.');
      }
    } catch (err) {
      console.error('[AdminTestimonials] Error fetching:', err);
      setError('An error occurred while loading testimonials.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Check URL query param ?new=true to open modal automatically
  useEffect(() => {
    if (searchParams.get('new') === 'true') {
      openCreateModal();
      searchParams.delete('new');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams]);

  const openCreateModal = () => {
    setFormData({
      name: '',
      course: '',
      rating: 5,
      text: '',
      avatar: '',
      is_verified: true,
    });
    setFormError('');
    setModalMode('create');
  };

  const openEditModal = (t) => {
    setFormData({
      id: t.id,
      name: t.name || '',
      course: t.course || '',
      rating: t.rating || 5,
      text: t.text || '',
      avatar: t.avatar || '',
      is_verified: Boolean(t.is_verified),
    });
    setFormError('');
    setModalMode('edit');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim() || !formData.course.trim() || !formData.text.trim()) {
      setFormError('Student name, course, and review text are all required.');
      return;
    }

    setIsSaving(true);
    try {
      if (modalMode === 'create') {
        const res = await createTestimonial(formData);
        if (res.success) {
          setTestimonials((prev) => [res.data, ...prev]);
          setModalMode(null);
        } else {
          setFormError(res.error || 'Failed to create testimonial.');
        }
      } else if (modalMode === 'edit') {
        const res = await updateTestimonial(formData.id, formData);
        if (res.success) {
          setTestimonials((prev) =>
            prev.map((t) => (t.id === formData.id ? res.data : t))
          );
          setModalMode(null);
        } else {
          setFormError(res.error || 'Failed to update testimonial.');
        }
      }
    } catch (err) {
      console.error('[AdminTestimonials] Save error:', err);
      setFormError('An unexpected error occurred.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleVerification = async (id, currentStatus) => {
    const newStatus = !currentStatus;
    setTogglingIds((prev) => ({ ...prev, [id]: true }));

    try {
      const res = await toggleTestimonialVerification(id, newStatus);
      if (res.success) {
        setTestimonials((prev) =>
          prev.map((t) => (t.id === id ? { ...t, is_verified: newStatus } : t))
        );
      } else {
        alert(res.error || 'Failed to update verification status.');
      }
    } catch (err) {
      console.error('[AdminTestimonials] Toggle error:', err);
      alert('An error occurred while updating.');
    } finally {
      setTogglingIds((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    setIsDeleting(true);

    try {
      const res = await deleteTestimonial(deletingId);
      if (res.success) {
        setTestimonials((prev) => prev.filter((t) => t.id !== deletingId));
        setDeletingId(null);
      } else {
        alert(res.error || 'Failed to delete testimonial.');
      }
    } catch (err) {
      console.error('[AdminTestimonials] Delete error:', err);
      alert('An error occurred while deleting.');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredList = testimonials.filter((t) => {
    if (filter === 'verified') return t.is_verified === true;
    if (filter === 'unverified') return t.is_verified === false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-navy">
            Testimonials
          </h1>
          <p className="text-xs sm:text-sm text-navy/60 mt-1 font-medium">
            Moderate student feedback, add new reviews, and control which testimonials appear publicly.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => fetchTestimonials(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-cream-300 text-xs font-semibold text-navy hover:bg-cream-200 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>

          <button
            onClick={openCreateModal}
            className="btn-yellow px-4 py-2 text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Testimonial</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-3 rounded-2xl border border-cream-300 shadow-sm flex items-center gap-2">
        {[
          { id: 'all', label: `All Reviews (${testimonials.length})` },
          { id: 'verified', label: `Published (${testimonials.filter((t) => t.is_verified).length})` },
          { id: 'unverified', label: `Hidden / Draft (${testimonials.filter((t) => !t.is_verified).length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === tab.id
                ? 'bg-navy text-yellow shadow-sm'
                : 'bg-cream text-navy/70 hover:bg-cream-200 hover:text-navy'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Grid */}
      {loading ? (
        <div className="p-12 flex justify-center">
          <Loader size="md" text="Loading Testimonials..." />
        </div>
      ) : error ? (
        <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-xs flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={() => fetchTestimonials()}
            className="font-bold underline cursor-pointer"
          >
            Retry
          </button>
        </div>
      ) : filteredList.length === 0 ? (
        <div className="bg-white rounded-3xl border border-cream-300 p-12 text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-cream flex items-center justify-center text-navy/40 font-bold">
            0
          </div>
          <h3 className="font-serif text-lg font-bold text-navy">No Testimonials Found</h3>
          <p className="text-xs text-navy/60 max-w-sm mx-auto">
            {filter !== 'all'
              ? 'No testimonials match this filter.'
              : 'No testimonials currently exist. Click "Add Testimonial" to create your first review.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredList.map((t) => (
            <div
              key={t.id}
              className={`bg-white rounded-3xl border p-5 shadow-sm flex flex-col justify-between transition-all ${
                t.is_verified ? 'border-cream-300' : 'border-amber-200 bg-amber-50/10'
              }`}
            >
              <div className="space-y-3">
                {/* Top Status & Rating */}
                <div className="flex items-center justify-between">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= (t.rating || 5)
                            ? 'text-yellow fill-yellow'
                            : 'text-cream-300'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Verification Status Badge */}
                  <button
                    onClick={() => handleToggleVerification(t.id, t.is_verified)}
                    disabled={togglingIds[t.id]}
                    title="Click to toggle publish status"
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                      t.is_verified
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                    }`}
                  >
                    {t.is_verified ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Published</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3" />
                        <span>Hidden</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Review Quote */}
                <p className="text-xs text-navy/80 italic leading-relaxed line-clamp-4">
                  "{t.text}"
                </p>

                {/* Student Info */}
                <div className="flex items-center gap-3 pt-2 border-t border-cream-300/60">
                  {t.avatar ? (
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-9 h-9 rounded-full object-cover border border-cream-300"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-navy text-yellow flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                      {t.name.slice(0, 2)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h4 className="font-bold text-navy text-xs truncate">
                      {t.name}
                    </h4>
                    <p className="text-[11px] text-navy/60 truncate">
                      {t.course}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-cream-300/80 mt-4">
                <button
                  onClick={() => handleToggleVerification(t.id, t.is_verified)}
                  disabled={togglingIds[t.id]}
                  className="text-[11px] font-semibold text-navy/70 hover:text-navy cursor-pointer"
                >
                  {t.is_verified ? 'Unpublish' : 'Publish to Website'}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(t)}
                    title="Edit Testimonial"
                    className="p-1.5 rounded-lg bg-navy/5 text-navy hover:bg-navy/10 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeletingId(t.id)}
                    title="Delete Testimonial"
                    className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Testimonial Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 border border-cream-300 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-cream-300">
              <span className="font-serif text-lg font-bold text-navy">
                {modalMode === 'create' ? 'Add New Testimonial' : 'Edit Testimonial'}
              </span>
              <button
                onClick={() => setModalMode(null)}
                className="p-1.5 rounded-lg text-navy/50 hover:text-navy hover:bg-cream transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase font-bold text-navy/70 tracking-wider mb-1">
                  Student / Parent Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Sarah Johnson"
                  className="w-full px-3.5 py-2.5 bg-cream/30 border border-cream-300 rounded-xl text-xs text-navy focus:bg-white focus:border-navy focus:ring-1 focus:ring-navy"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-navy/70 tracking-wider mb-1">
                  Course or Program *
                </label>
                <input
                  type="text"
                  required
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  placeholder="e.g., Cambridge IGCSE English"
                  className="w-full px-3.5 py-2.5 bg-cream/30 border border-cream-300 rounded-xl text-xs text-navy focus:bg-white focus:border-navy focus:ring-1 focus:ring-navy"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-navy/70 tracking-wider mb-1">
                  Rating (1 to 5 Stars)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= formData.rating
                            ? 'text-yellow fill-yellow'
                            : 'text-cream-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-navy ml-2">
                    {formData.rating} / 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-navy/70 tracking-wider mb-1">
                  Review Text *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  placeholder="Share the student's review of Ms. Ayeshabi Saheb's instruction..."
                  className="w-full px-3.5 py-2.5 bg-cream/30 border border-cream-300 rounded-xl text-xs text-navy focus:bg-white focus:border-navy focus:ring-1 focus:ring-navy leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-navy/70 tracking-wider mb-1">
                  Avatar Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full px-3.5 py-2.5 bg-cream/30 border border-cream-300 rounded-xl text-xs text-navy focus:bg-white focus:border-navy focus:ring-1 focus:ring-navy"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_verified}
                    onChange={(e) => setFormData({ ...formData, is_verified: e.target.checked })}
                    className="w-4 h-4 rounded text-navy accent-navy focus:ring-navy border-cream-300"
                  />
                  <span className="text-xs font-semibold text-navy">
                    Publish immediately (visible to visitors on website)
                  </span>
                </label>
              </div>

              <div className="pt-4 border-t border-cream-300 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  disabled={isSaving}
                  className="btn-outline px-4 py-2 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="btn-navy px-5 py-2 text-xs font-bold cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : modalMode === 'create' ? 'Create Testimonial' : 'Save Changes'}
                </button>
              </div>
            </form>
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
              Delete Testimonial?
            </h3>
            <p className="text-xs text-navy/60">
              This review will be permanently deleted from Supabase.
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
