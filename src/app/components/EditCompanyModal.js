'use client';

export default function EditCompanyModal({ editCompany, editingCompany, setEditingCompany }) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-800/30 backdrop-blur-lg flex items-center justify-center z-50" style={{
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
              job_title: formData.get('jobTitle'),
              industry: formData.get('industry'),
              size: formData.get('size'),
              founded: formData.get('founded'),
              location: formData.get('location'),
              website: formData.get('website'),
              phone: formData.get('phone'),
              email: formData.get('email'),
              status: formData.get('status'),
              description: formData.get('description'),
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
            <input 
              name="name" 
              defaultValue={editingCompany.name} 
              required 
              className="w-full border border-gray-300 p-2 rounded-md text-gray-700 placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Job Title</label>
            <input 
              name="jobTitle" 
              defaultValue={editingCompany.job_title} 
              placeholder="e.g. Software Developer, Data Analyst"
              className="w-full border border-gray-300 p-2 rounded-md text-gray-700 placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Industry</label>
            <select 
              name="industry" 
              defaultValue={editingCompany.industry} 
              className="w-full border border-gray-300 p-2 rounded-md text-gray-700"
            >
              <option value="">Select industry</option>
              <option value="Aerospace & Defense">Aerospace & Defense</option>
              <option value="Agriculture & Food">Agriculture & Food</option>
              <option value="Automotive">Automotive</option>
              <option value="Aviation">Aviation</option>
              <option value="Banking & Finance">Banking & Finance</option>
              <option value="Biotechnology">Biotechnology</option>
              <option value="Construction & Real Estate">Construction & Real Estate</option>
              <option value="Consulting">Consulting</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Education">Education</option>
              <option value="Energy & Utilities">Energy & Utilities</option>
              <option value="Engineering">Engineering</option>
              <option value="Entertainment & Media">Entertainment & Media</option>
              <option value="Financial Services">Financial Services</option>
              <option value="Government & Public Sector">Government & Public Sector</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Hospitality & Tourism">Hospitality & Tourism</option>
              <option value="Insurance">Insurance</option>
              <option value="Internet & Technology">Internet & Technology</option>
              <option value="Legal Services">Legal Services</option>
              <option value="Logistics & Transportation">Logistics & Transportation</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Marketing & Advertising">Marketing & Advertising</option>
              <option value="Mining & Metals">Mining & Metals</option>
              <option value="Non-profit">Non-profit</option>
              <option value="Oil & Gas">Oil & Gas</option>
              <option value="Pharmaceuticals">Pharmaceuticals</option>
              <option value="Retail">Retail</option>
              <option value="Software Development">Software Development</option>
              <option value="Sports & Recreation">Sports & Recreation</option>
              <option value="Technology Consulting">Technology Consulting</option>
              <option value="Telecommunications">Telecommunications</option>
              <option value="Textiles & Apparel">Textiles & Apparel</option>
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
            <input 
              name="founded" 
              defaultValue={editingCompany.founded} 
              placeholder="e.g. 2020"
              className="w-full border border-gray-300 p-2 rounded-md text-gray-700 placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Location</label>
            <input 
              name="location" 
              defaultValue={editingCompany.location} 
              placeholder="City, State/Country"
              className="w-full border border-gray-300 p-2 rounded-md text-gray-700 placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Website</label>
            <input 
              name="website" 
              defaultValue={editingCompany.website} 
              type="url"
              placeholder="https://company.com"
              className="w-full border border-gray-300 p-2 rounded-md text-gray-700 placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone</label>
            <input 
              name="phone" 
              defaultValue={editingCompany.phone} 
              type="tel"
              placeholder="+974-xxxx-xxxx"
              className="w-full border border-gray-300 p-2 rounded-md text-gray-700 placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Contact Email</label>
            <input 
              name="email" 
              defaultValue={editingCompany.email} 
              type="email"
              placeholder="hr@company.com"
              className="w-full border border-gray-300 p-2 rounded-md text-gray-700 placeholder:text-gray-400"
            />
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
            <textarea 
              name="description" 
              defaultValue={editingCompany.description} 
              rows="3" 
              placeholder="Brief description of the company..."
              className="w-full border border-gray-300 p-2 rounded-md text-gray-700 placeholder:text-gray-400"
            />
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