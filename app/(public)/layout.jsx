'use client' // This file already uses client components like Navbar
import { AuthProvider } from '@/context/AuthContext'; // 1. Import the provider
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PublicLayout({ children }) {

    return (
        <AuthProvider> {/* 2. Wrap your entire layout with AuthProvider */}
            <Banner />
            <Navbar />
            {children}
            <Footer />
        </AuthProvider>
    );
}