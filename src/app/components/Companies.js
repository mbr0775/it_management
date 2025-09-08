'use client';

export default function Companies({ filteredCompanies, toggleApplied, toggleContacted, setEditingCompany, deleteCompany, setShowAddCompany }) {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Companies</h1>
            <p className="text-gray-600">Manage IT companies offering job opportunities</p>
          </div>
          <button 
            onClick={() => setShowAddCompany(true)} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium"
          >
            <span className="text-lg">+</span>
            Add Company
          </button>
        </div>

        <div className="space-y-4">
          {filteredCompanies && filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <div key={company.id} className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                <div className="flex justify-between items-start gap-3">
                  <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                    <div className="bg-blue-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs sm:text-sm font-bold">🏢</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-bold text-gray-900">{company.name}</h2>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          company.status === 'Active' ? 'bg-blue-100 text-blue-800' :
                          company.status === 'Partnered' ? 'bg-green-100 text-green-800' :
                          company.status === 'Applied' ? 'bg-yellow-100 text-yellow-800' :
                          company.status === 'Interviewed' ? 'bg-purple-100 text-purple-800' :
                          company.status === 'Not Interested' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {company.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        {company.industry && <span>{company.industry}</span>}
                        {company.industry && company.size && <span>•</span>}
                        {company.size && <span>{company.size} employees</span>}
                        {(company.industry || company.size) && company.founded && <span>•</span>}
                        {company.founded && <span>Founded {company.founded}</span>}
                      </div>
                      
                      {company.description && (
                        <p className="text-gray-700 mb-4 leading-relaxed">{company.description}</p>
                      )}
                      
                      <div className="mt-4 space-y-3">
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          {company.location && (
                            <div className="flex items-center gap-1">
                              <span>📍</span>
                              <span>{company.location}</span>
                            </div>
                          )}
                          {company.website && (
                            <div className="flex items-center gap-1">
                              <span>🌐</span>
                              <a href={company.website} className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                                Website
                              </a>
                            </div>
                          )}
                          {company.phone && (
                            <div className="flex items-center gap-1">
                              <span>📞</span>
                              <span>{company.phone}</span>
                            </div>
                          )}
                          {company.email && (
                            <div className="flex items-center gap-1">
                              <span>✉️</span>
                              <a href={`mailto:${company.email}`} className="text-blue-600 hover:text-blue-800 break-all">
                                {company.email}
                              </a>
                            </div>
                          )}
                        </div>
                        
                        <div className="w-full mt-2">
                          {(company.applied === true || company.applied === 'true') ? (
                            <div className="flex justify-center">
                              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Applied
                              </span>
                            </div>
                          ) : (
                            <button
                              onClick={() => toggleApplied(company.id)}
                              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors sm:w-auto sm:ml-auto sm:block"
                            >
                              Apply
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-1 sm:gap-2 flex-shrink-0">
                    <button 
                      onClick={() => setEditingCompany(company)} 
                      className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit company"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => deleteCompany(company.id)} 
                      className="p-1.5 sm:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete company"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
              <p className="text-gray-600 mb-4">Get started by adding your first company</p>
              <button 
                onClick={() => setShowAddCompany(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Add Company
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}