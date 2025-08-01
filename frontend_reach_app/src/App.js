import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import './App.css';

/*
  Top-level app for the prototype.
  - Sidebar navigation as per Figma: Dashboard, Devices, Analytics, Firmware and Apps, Users, More (+badge), Config Server (active)
  - Multi-page: routes include /dashboard, /devices, /analytics, /firmware-apps, /users, /more, /config-server
  - Theme toggler and basic dark/light theming support (per template)
*/

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <Router>
      <div className="full-screen-container row" style={{minHeight: "100vh"}}>
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="logo-container" style={{marginTop: 16, marginBottom: 8, display: 'flex', alignItems: 'center'}}>
            <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/563db0db-a273-4361-8b20-6ac9b03dee60" alt="Logo" style={{height: "26px"}} />
            <span style={{
              fontWeight: 700, fontSize: "24px", color: "#21272a", marginLeft: 8
            }}>Company</span>
          </div>
          <hr className="divider" />
          <nav className="menu">
            <NavLink className="menu-item" to="/dashboard">
              <img className="icon" src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/6f36e53a-c54e-40de-b151-93b6ebb1d7a5" alt="Dashboard" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink className="menu-item" to="/devices">
              <img className="icon" src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/012ba87b-f576-4faa-ae88-12ebf81edcb1" alt="Devices" />
              <span>Devices</span>
            </NavLink>
            <NavLink className="menu-item" to="/analytics">
              <img className="icon" src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/ee0ee0ba-b8bd-4136-9a37-aa99c13a2ebd" alt="Analytics" />
              <span>Analytics</span>
            </NavLink>
            <NavLink className="menu-item" to="/firmware-apps">
              <img className="icon" src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f3b2ad27-8828-4aef-b7b7-4b7829be835f" alt="Firmware and Apps" />
              <span>Firmware and Apps</span>
            </NavLink>
            <NavLink className="menu-item" to="/users">
              <img className="icon" src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/c66e1fe9-1cff-40a4-8817-9fec9db7c88a" alt="Users" />
              <span>Users</span>
            </NavLink>
            <NavLink className="menu-item" to="/more">
              <img className="icon" src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/5b64c2e8-2bd7-4fb0-adc2-0dd24431821a" alt="More" />
              <span>More</span>
              <span className="badge">4</span>
              <img className="icon" src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/54a7d4f2-efba-49be-bae7-c54b6cabb6f0" alt="Chevron Down" />
            </NavLink>
            <NavLink className="menu-item active" to="/config-server">
              <span>Config Server</span>
            </NavLink>
          </nav>
        </aside>
        {/* Main Area: Header + Routes */}
        <main className="frame card" style={{flex: 1, minHeight: "100vh", marginLeft: 0, display: "flex", flexDirection: "column"}}>
          <div style={{ position: 'relative', minHeight: 80 }}>
            {/* Accessible theme toggle */}
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              style={{ position: 'absolute', top: 20, right: 20}}
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
            <Header/>
          </div>
          {/* Routes */}
          <div style={{ flex:1, display:'flex', flexDirection:'column' }}>
            <Routes>
              <Route path="/" element={<Navigate to="/config-server" replace />} />
              <Route path="/dashboard" element={<PlaceholderScreen title="Dashboard" />} />
              <Route path="/devices" element={<PlaceholderScreen title="Devices" />} />
              <Route path="/analytics" element={<PlaceholderScreen title="Analytics" />} />
              <Route path="/firmware-apps" element={<PlaceholderScreen title="Firmware and Apps" />} />
              <Route path="/users" element={<PlaceholderScreen title="Users" />} />
              <Route path="/more" element={<PlaceholderScreen title="More" />} />
              <Route path="/config-server/*" element={<ConfigServerLayout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

// Sidebar does not move; only content area changes.
// --- Header/Avatar area ---
function Header() {
  // Directly matches Figma: right-aligned, user avatar and name/role.
  return (
    <header className="header-group" style={{
      height: "80px", borderBottom: "1px solid var(--border-color)",
      background: "var(--bg-secondary)", padding: "16px 32px",
      display: "flex", alignItems: "center", justifyContent: "flex-end"
    }}>
      <div style={{display:'flex', alignItems:'center', gap:16}}>
        <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/bad260a8-6989-4393-936c-32ba3af2afcf" alt="User" style={{
          height:24, width:24, borderRadius: '50%' }} />
        <div>
          <div style={{fontWeight: 500, fontSize:16, color:"var(--text-primary)"}}>John.doe</div>
          <div style={{fontWeight: 500, fontSize:14, color:"var(--text-secondary)"}}>Super user</div>
        </div>
      </div>
    </header>
  );
}

// --- Config Server Demo/Screen (main landing) ---
function ConfigServerLayout() {
  // Contains the mockup main screen table and layout, as per wires and html assets
  return (
    <div style={{padding:'40px 0 0 24px'}}>
      <h1 className="heading">Config Server</h1>
      {/* Tabs */}
      <div className="tabs" style={{ marginBottom: 16 }}>
        <button className="tab active">Profile</button>
        <button className="tab">Rules</button>
      </div>
      {/* Subheader */}
      <div style={{marginBottom:16}}>
        <div style={{fontWeight:700,fontSize:20}}>Config Server</div>
      </div>
      {/* Table (header row) */}
      <div className="row" style={{gap:40, marginTop:40}}>
        <TableHeader title="Profile Name" />
        <TableHeader title="Enter repository URL" />
        <TableHeader title="Description" />
        <TableHeader title="Created Date" filter="/images/5ec00e4e-518f-40dd-aa79-8c7270a2d613" />
        <TableHeader title="Modified Date" filter="/images/bd813393-d261-4a2f-9b0a-88810905a296" />
        <div style={{background:'#ccc',padding:16,borderRadius:4}}><div style={{fontWeight:500,fontSize:16}}>Actions</div></div>
      </div>
      {/* Just a single example row for illustration. Expand as per requirements/UI */}
      <div className="row" style={{marginTop:48}}>
        <div style={{fontSize:14, paddingRight:32}}>TEstProfile</div>
        <div style={{fontWeight:500, color:'#da1e28', paddingRight:32}}>High</div>
        <div style={{fontSize:14,paddingRight:32}}>TEstProfile</div>
        <div style={{fontSize:14,paddingRight:32}}>17 Feb 2025, 11:00:00</div>
        <div style={{fontSize:14,paddingRight:32}}>17 Feb 2025, 11:00:00</div>
        <div style={{display:"flex",gap:16,alignItems:"center"}}>
          <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/99a02f3a-57f2-4b8a-8af3-36e5588e2814" alt="Edit" style={{height:18,width:18}} />
          <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f380cc29-2f67-44c8-a9a8-3377a992a513" alt="Delete" style={{height:18,width:18,marginLeft:8}} />
        </div>
      </div>
      <div style={{marginTop:42, textAlign:'center', color:'var(--text-secondary)', fontSize:16}}>Add Profile to add rules</div>
    </div>
  );
}

function TableHeader({title, filter}) {
  return (
    <div style={{background:'#ccc', padding:16, borderRadius:4}}>
      <span style={{fontWeight:500, fontSize:16}}>{title}
        {filter &&
          <img src={`https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/${filter.replace(/^\/+images\//,'')}`} alt="Filter" style={{marginLeft:6, height:16, width:16, verticalAlign:'middle'}} />}
      </span>
    </div>
  );
}

function PlaceholderScreen({title}) {
  // Public route placeholder for routes not yet implemented
  return (
    <div style={{
      flex:1,
      textAlign:'center',
      color:'var(--color-text-muted)',
      fontSize:32,
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
    }}>
      <span>{title} Page - Under Construction</span>
    </div>
  );
}

function NotFound() {
  return (
    <div style={{
      flex:1,
      minHeight:400,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      fontSize:24,
      color:'#da1e28'
    }}>404 - Not Found</div>
  );
}

export default App;
