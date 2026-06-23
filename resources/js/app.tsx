import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import '../css/app.css';
import BasicLayout from './layouts/Basic';
import DashboardLayout from './layouts/dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Toaster from './components/Toaster';
import Home from './pages/Home';
import Services from './pages/Services';
import Contacts from './pages/Contacts';
import Priver from './pages/Priver';
import Appointments from './pages/Appointments';
import AppointmentsNew from './pages/appointmentsNew';
import AppointmentsDetails from './pages/appointmentsDetails';
import AppointmentsAll from './pages/appointmentsAll';
import AppointmentsCalendar from './pages/AppointmentsCalendar';
import AdminLogin from './pages/AdminLogin';
import AppointmentsDetailsAdmin from './pages/appointmentsDetailsAdmin';

const App: React.FC = () => {
    return (
            <BrowserRouter>
                <Toaster />
                <Routes>
                    {/* Routes publiques */}
                    <Route path="/" element={<BasicLayout><Home /></BasicLayout>} />
                    <Route path="/services" element={<BasicLayout><Services /></BasicLayout>} />
                    <Route path="/contacts" element={<BasicLayout><Contacts /></BasicLayout>} />
                    <Route path="/priver" element={<BasicLayout><Priver /></BasicLayout>} />
                    {/* <Route path="/login" element={<Login />} /> */}
                    <Route path="/adminlogin" element={<AdminLogin />} />

                    {/* Routes protégées */}
                    <Route path="/appointments" element={<BasicLayout><Appointments /></BasicLayout>} />
                    <Route path="/appointments/new" element={<BasicLayout><AppointmentsNew /></BasicLayout>} />
                    <Route path="/appointments/details/:id" element={<BasicLayout><AppointmentsDetails /></BasicLayout>} />
                    <Route path="/dashboard.tuxedos.host" element={
                        <ProtectedRoute admin>
                            <DashboardLayout><AppointmentsAll /></DashboardLayout>
                        </ProtectedRoute>
                    } />
                    <Route path="/dashboard.tuxedos.host/calendar" element={
                        <ProtectedRoute admin>
                            <DashboardLayout><AppointmentsCalendar /></DashboardLayout>
                        </ProtectedRoute>
                    } />
                    <Route path="/dashboard.tuxedos.host/:id" element={
                        <ProtectedRoute admin>
                            <DashboardLayout><AppointmentsDetailsAdmin /></DashboardLayout>
                        </ProtectedRoute>
                    } />
                </Routes>
            </BrowserRouter>
    );
};

ReactDOM.createRoot(document.getElementById('app')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
