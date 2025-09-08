'use client';

export default function EditCompanyModal({ editCompany, editingCompany, setEditingCompany }) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-800/30 backdrop-blur-lg flex items-center justify-center" style={{
      backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23667eea;stop-opacity:0.3" /><stop offset="50%" style="stop-color:%23764ba2;stop-opacity:0.2" /><stop offset="100%" style="stop-color:%23f093fb;stop-opacity:0.3" /></linearGradient></defs><rect width="100%" height="100%" fill="url(%23grad1)"/><circle cx="200" cy="200" r="150" fill="%23ffffff" opacity="0.1"/><circle cx="800" cy="300" r="100" fill="%23ffffff" opacity="0.05"/><circle cx="300" cy="700" r="120" fill="%23ffffff" opacity="0.08"/><circle cx="700" cy="800" r="80" fill="%23ffffff" opacity="0.06"/></svg>')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-[700px] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg text-black">Edit Company</h2>
          <button onClick={() => setEditingCompany(null)} className="text-gray-500 hover:text-gray-700 text-xl">
            ×
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const updatedCompany = {
              id: editingCompany.id,
              name: formData.get('name'),
              industry: formData.get('industry'),
              size: formData.get('size'),
              founded: formData.get('founded'),
              location: formData.get('location'),
              website: formData.get('website'),
              phone: formData.get('phone'),
              email: formData.get('email'),
              status: formData.get('status'),
              description: formData.get('description'),
              applicationNotes: formData.get('applicationNotes'),
              contacted: editingCompany.contacted,
              applied: editingCompany.applied,
              created_at: editingCompany.created_at,
            };
            editCompany(updatedCompany);
            setEditingCompany(null);
          }}
          className="grid grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-gray-700 font-medium mb-2">Company Name *</label>
            <input name="name" defaultValue={editingCompany.name} required className="w-full border border-gray-300 p-2 rounded-md text-gray-700" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Industry *</label>
            <select name="industry" defaultValue={editingCompany.industry} required className="w-full border border-gray-300 p-2 rounded-md text-gray-700">
              <option value="">Select industry</option>
              <option>Software Development</option>
              <option>Technology Consulting</option>
              <option>Financial Services</option>
              <option>Healthcare</option>
              <option>E-commerce</option>
              <option>Manufacturing</option>
              <option>Education</option>
              <option>Marketing & Advertising</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Company Size</label>
            <select name="size" defaultValue={editingCompany.size} className="w-full border border-gray-300 p-2 rounded-md text-gray-700">
              <option value="">Select company size</option>
              <option>1-10</option>
              <option>11-50</option>
              <option>51-200</option>
              <option>201-500</option>
              <option>501-1000</option>
              <option>1001-5000</option>
              <option>5000+</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Founded Year</label>
            <input name="founded" defaultValue={editingCompany.founded} className="w-full border border-gray-300 p-2 rounded-md text-gray-700" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Location</label>
            <input name="location" defaultValue={editingCompany.location} className="w-full border border-gray-300 p-2 rounded-md text-gray-700" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Website</label>
            <input name="website" defaultValue={editingCompany.website} className="w-full border border-gray-300 p-2 rounded-md text-gray-700" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone</label>
            <input name="phone" defaultValue={editingCompany.phone} className="w-full border border-gray-300 p-2 rounded-md text-gray-700" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Contact Email</label>
            <input name="email" defaultValue={editingCompany.email} className="w-full border border-gray-300 p-2 rounded-md text-gray-700" />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-2">Status</label>
            <select name="status" defaultValue={editingCompany.status} className="w-full border border-gray-300 p-2 rounded-md text-gray-700">
              <option value="">Select status</option>
              <option>Active</option>
              <option>Partnered</option>
              <option>Prospective</option>
              <option>Applied</option>
              <option>Interviewed</option>
              <option>Not Interested</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea name="description" defaultValue={editingCompany.description} rows="3" className="w-full border border-gray-300 p-2 rounded-md text-gray-700" />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-2">Application Notes</label>
            <textarea name="applicationNotes" defaultValue={editingCompany.applicationNotes} rows="3" className="w-full border border-gray-300 p-2 rounded-md text-gray-700" />
          </div>
          <div className="col-span-2 flex justify-end space-x-2">
            <button type="button" onClick={() => setEditingCompany(null)} className="bg-gray-500 text-white px-4 py-2 rounded w-full sm:w-auto">
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}