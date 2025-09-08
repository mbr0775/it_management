'use client';

import Overview from './Overview';
import Companies from './Companies';
import HRContacts from './HRContacts';
import AddCompanyModal from './AddCompanyModal';
import EditCompanyModal from './EditCompanyModal';
import AddHRModal from './AddHRModal';
import EditHRModal from './EditHRModal';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vijkyxwhfijdxmeizwzw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpamt5eHdoZmlqZHhtZWl6d3p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczMjI1NjUsImV4cCI6MjA3Mjg5ODU2NX0.9usmCPahHk2qCQezIKWUz4gQ3zYsFJ4vALu9WveuaO4';

export default function Dashboard() {
  const supabase = createClient(supabaseUrl, supabaseKey);

  const [tab, setTab] = useState('overview');
  const [companies, setCompanies] = useState([]);
  const [hrs, setHrs] = useState([]);
  const [search, setSearch] = useState('');
  const [showAddCompany, setShowAddCompany] = useState(false);
  const [showAddHR, setShowAddHR] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [editingHR, setEditingHR] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  // Load data from Supabase
  useEffect(() => {
    async function loadData() {
      const { data: companiesData, error: cError } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });

      if (cError) {
        console.error('Error fetching companies:', cError);
      } else {
        setCompanies(companiesData || []);
      }

      const { data: hrsData, error: hError } = await supabase
        .from('hrs')
        .select('*')
        .order('created_at', { ascending: false });

      if (hError) {
        console.error('Error fetching HR contacts:', hError);
      } else {
        setHrs(hrsData || []);
      }
    }

    loadData();
  }, []);

  // CRUD for companies
  const addCompany = (newCompany) => {
    setCompanies([newCompany, ...companies]);
  };

  const editCompany = async (updatedCompany) => {
    const { error } = await supabase
      .from('companies')
      .update(updatedCompany)
      .eq('id', updatedCompany.id);

    if (error) {
      console.error('Error updating company:', error);
    } else {
      setCompanies(companies.map((c) => (c.id === updatedCompany.id ? updatedCompany : c)));
    }
  };

  const deleteCompany = async (id) => {
    const { error } = await supabase
      .from('companies')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting company:', error);
    } else {
      setCompanies(companies.filter((c) => c.id !== id));
    }
  };

  // CRUD for HR
  const addHR = (newHR) => {
    setHrs([newHR, ...hrs]);
  };

  const editHR = async (updatedHR) => {
    const { error } = await supabase
      .from('hrs')
      .update(updatedHR)
      .eq('id', updatedHR.id);

    if (error) {
      console.error('Error updating HR:', error);
    } else {
      setHrs(hrs.map((h) => (h.id === updatedHR.id ? updatedHR : h)));
    }
  };

  const deleteHR = async (id) => {
    const { error } = await supabase
      .from('hrs')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting HR:', error);
    } else {
      setHrs(hrs.filter((h) => h.id !== id));
    }
  };

  // Mark contacted/applied
  const toggleContacted = async (id) => {
    const company = companies.find((c) => c.id === id);
    if (!company) return;
    const newValue = !company.contacted;

    const { error } = await supabase
      .from('companies')
      .update({ contacted: newValue })
      .eq('id', id);

    if (error) {
      console.error('Error toggling contacted:', error);
    } else {
      setCompanies(companies.map((c) => (c.id === id ? { ...c, contacted: newValue } : c)));
    }
  };

  const toggleApplied = async (id) => {
    const company = companies.find((c) => c.id === id);
    if (!company) return;
    const newValue = !company.applied;

    const { error } = await supabase
      .from('companies')
      .update({ applied: newValue })
      .eq('id', id);

    if (error) {
      console.error('Error toggling applied:', error);
    } else {
      setCompanies(companies.map((c) => (c.id === id ? { ...c, applied: newValue } : c)));
    }
  };

  // Filtered lists
  const filteredCompanies = companies.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.industry?.toLowerCase().includes(search.toLowerCase()) ||
    c.description?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredHrs = hrs.filter((h) =>
    h.name?.toLowerCase().includes(search.toLowerCase()) ||
    h.company?.toLowerCase().includes(search.toLowerCase()) ||
    h.jobTitle?.toLowerCase().includes(search.toLowerCase())
  );

  // Overview stats - Using actual data instead of hardcoded values
  const totalCompanies = companies.length;
  const companiesContacted = companies.filter((c) => c.contacted || c.applied).length;
  const hrContacts = hrs.length;
  const recentActivity = companies.filter((c) => 
    new Date(c.created_at).toDateString() === new Date().toDateString()
  ).length;

  // Export to CSV (companies)
  const exportToCSV = () => {
    const csvContent = [
      ['Name', 'Industry', 'Size', 'Founded', 'Location', 'Website', 'Phone', 'Email', 'Status', 'Description', 'ApplicationNotes', 'Contacted', 'Applied'],
      ...companies.map((c) => [
        c.name || '',
        c.industry || '',
        c.size || '',
        c.founded || '',
        c.location || '',
        c.website || '',
        c.phone || '',
        c.email || '',
        c.status || '',
        c.description || '',
        c.application_notes || '',
        c.contacted || false,
        c.applied || false,
      ]),
    ]
      .map((row) => row.map(field => `"${field}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'companies.csv');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to Excel (companies) - Using dynamic import
  const exportToExcel = async () => {
    try {
      // Dynamic import to avoid SSR issues
      const XLSX = await import('xlsx');
      const ws = XLSX.utils.json_to_sheet(companies);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Companies');
      XLSX.writeFile(wb, 'companies.xlsx');
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      alert('Excel export failed. Please install xlsx package: npm install xlsx');
    }
  };

  // Import file (CSV or Excel)
  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    
    if (file.name.endsWith('.csv')) {
      reader.onload = async (event) => {
        try {
          const text = event.target.result;
          const lines = text.split('\n').slice(1); // Skip header
          const newCompanies = lines
            .filter((line) => line.trim())
            .map((line) => {
              // Simple CSV parsing (handles quoted fields)
              const fields = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
              const cleanFields = fields.map(field => field.replace(/^"|"$/g, ''));
              
              return {
                name: cleanFields[0] || '',
                industry: cleanFields[1] || '',
                size: cleanFields[2] || '',
                founded: cleanFields[3] || '',
                location: cleanFields[4] || '',
                website: cleanFields[5] || '',
                phone: cleanFields[6] || '',
                email: cleanFields[7] || '',
                status: cleanFields[8] || '',
                description: cleanFields[9] || '',
                application_notes: cleanFields[10] || '',
                contacted: cleanFields[11] === 'true',
                applied: cleanFields[12] === 'true',
                created_at: new Date().toISOString(),
              };
            });

          const { data: inserted, error } = await supabase
            .from('companies')
            .insert(newCompanies)
            .select();

          if (error) throw error;

          setCompanies([...companies, ...inserted]);
        } catch (error) {
          console.error('Error importing CSV:', error);
          alert('Error importing CSV file');
        } finally {
          setShowMenu(false);
        }
      };
      reader.readAsText(file);
    } else if (file.name.endsWith('.xlsx')) {
      reader.onload = async (event) => {
        try {
          // Dynamic import to avoid SSR issues
          const XLSX = await import('xlsx');
          const data = event.target.result;
          const wb = XLSX.read(data, { type: 'binary' });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const importedData = XLSX.utils.sheet_to_json(ws);
          const newCompanies = importedData.map((c) => {
            delete c.id; // Ignore imported id
            return {
              ...c,
              application_notes: c.applicationNotes || c.application_notes,
              created_at: new Date().toISOString(),
            };
          });

          const { data: inserted, error } = await supabase
            .from('companies')
            .insert(newCompanies)
            .select();

          if (error) throw error;

          setCompanies([...companies, ...inserted]);
        } catch (error) {
          console.error('Error importing Excel:', error);
          alert('Excel import failed. Please install xlsx package: npm install xlsx');
        } finally {
          setShowMenu(false);
        }
      };
      reader.readAsBinaryString(file);
    }
    
    // Clear the input
    e.target.value = '';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">IT Job Management Platform</h1>
              <p className="text-sm text-gray-500">Comprehensive database for IT companies and opportunities</p>
            </div>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center gap-3 w-full lg:w-auto relative">
            <div className="flex-1 relative">
              <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search companies, roles, contacts"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
            
            {/* Buttons on larger screens */}
            <div className="hidden md:flex items-center gap-3">
              <label className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                Import
                <input type="file" hidden onChange={handleImport} accept=".csv,.xlsx" />
              </label>

              <button 
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Export
              </button>
            </div>

            {/* Hamburger on small screens */}
            <div className="md:hidden relative">
              <button 
                className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setShowMenu(!showMenu)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-2 z-10 w-40">
                  <label className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                    Import
                    <input type="file" hidden onChange={handleImport} accept=".csv,.xlsx" />
                  </label>

                  <button 
                    onClick={() => { exportToCSV(); setShowMenu(false); }}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg w-full transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Export
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="flex">
          <button
            onClick={() => setTab('overview')}
            className={`flex-1 px-6 py-4 text-sm font-medium rounded-l-lg transition-colors ${
              tab === 'overview' 
                ? 'bg-white text-gray-900 border-b-2 border-blue-600' 
                : 'bg-gray-50 text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setTab('companies')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              tab === 'companies' 
                ? 'bg-white text-gray-900 border-b-2 border-blue-600' 
                : 'bg-gray-50 text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            Companies
          </button>
          <button
            onClick={() => setTab('hr')}
            className={`flex-1 px-6 py-4 text-sm font-medium rounded-r-lg transition-colors ${
              tab === 'hr' 
                ? 'bg-white text-gray-900 border-b-2 border-blue-600' 
                : 'bg-gray-50 text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            HR Contacts
          </button>
        </div>
      </div>

      <main>
        {tab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards - Now using actual data */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Companies */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-600">Total Companies</h3>
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{totalCompanies}</div>
                <p className="text-xs text-gray-500">{totalCompanies === 0 ? 'Start by adding companies' : 'Total companies in database'}</p>
              </div>

              {/* Companies Contacted/Applied */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-600">Applied/Contacted</h3>
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{companiesContacted}</div>
                <p className="text-xs text-gray-500">{totalCompanies > 0 ? `${Math.round((companiesContacted/totalCompanies)*100)}% of total companies` : 'No activity yet'}</p>
              </div>

              {/* HR Contacts */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-600">HR Contacts</h3>
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{hrContacts}</div>
                <p className="text-xs text-gray-500">{hrContacts === 0 ? 'Start by adding HR contacts' : 'Total HR contacts in database'}</p>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-600">Today's Activity</h3>
                  <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{recentActivity}</div>
                <p className="text-xs text-gray-500">{recentActivity === 0 ? 'No new entries today' : 'New entries today'}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Quick Actions</h2>
                <p className="text-sm text-gray-500">Manage your IT job database efficiently</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setShowAddCompany(true)}
                  className="flex items-center gap-3 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="font-medium">Add New Company</span>
                </button>

                <button
                  onClick={() => setTab('companies')}
                  className="flex items-center gap-3 p-4 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                  <span className="font-medium">Browse Companies</span>
                </button>

                <button
                  onClick={() => setShowAddHR(true)}
                  className="flex items-center gap-3 p-4 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <span className="font-medium">Add HR Contact</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {tab === 'companies' && (
          <Companies
            filteredCompanies={filteredCompanies}
            toggleApplied={toggleApplied}
            toggleContacted={toggleContacted}
            setEditingCompany={setEditingCompany}
            deleteCompany={deleteCompany}
            setShowAddCompany={setShowAddCompany}
          />
        )}

        {tab === 'hr' && (
          <HRContacts
            filteredHrs={filteredHrs}
            setEditingHR={setEditingHR}
            deleteHR={deleteHR}
            setShowAddHR={setShowAddHR}
          />
        )}
      </main>

      {/* Modals */}
      {showAddCompany && (
        <AddCompanyModal 
          addCompany={addCompany} 
          setShowAddCompany={setShowAddCompany} 
        />
      )}

      {editingCompany && (
        <EditCompanyModal 
          editCompany={editCompany} 
          editingCompany={editingCompany} 
          setEditingCompany={setEditingCompany} 
        />
      )}

      {showAddHR && (
        <AddHRModal 
          addHR={addHR} 
          setShowAddHR={setShowAddHR} 
          companies={companies} 
        />
      )}

      {editingHR && (
        <EditHRModal 
          editHR={editHR} 
          editingHR={editingHR} 
          setEditingHR={setEditingHR} 
          companies={companies} 
        />
      )}
    </div>
  );
}