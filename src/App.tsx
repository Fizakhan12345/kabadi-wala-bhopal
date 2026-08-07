import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ScrapRatesCard } from "./components/ScrapRatesCard";
import { AIEstimator } from "./components/AIEstimator";
import { HowItWorks } from "./components/HowItWorks";
import { PickupBookingForm } from "./components/PickupBookingForm";
import { ServiceAreas } from "./components/ServiceAreas";
import { CommercialScrap } from "./components/CommercialScrap";
import { TrustSection } from "./components/TrustSection";
import { FAQ } from "./components/FAQ";
import { BlogSection } from "./components/BlogSection";
import { Footer } from "./components/Footer";
import { MobileBottomBar } from "./components/MobileBottomBar";
import { CallModal } from "./components/CallModal";
import { AdminDashboard } from "./components/AdminDashboard";
import { LocalAreaDetailModal } from "./components/LocalAreaDetailModal";
import { ServiceDetailModal } from "./components/ServiceDetailModal";
import { BlogDetailModal } from "./components/BlogDetailModal";
import { SEOSchemaManager } from "./components/SEOSchemaManager";
import { LocalAreaPage } from "./components/LocalAreaPage";
import { BHOPAL_SERVICE_AREAS } from "./data/serviceAreas";
import { ScrapItemRate } from "./types";

export default function App() {
  const [activeAreaSlug, setActiveAreaSlug] = useState<string | null>(null);
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [selectedAreaForModal, setSelectedAreaForModal] = useState<string | null>(null);
  const [selectedServiceModal, setSelectedServiceModal] = useState<string | null>(null);
  const [selectedBlogModal, setSelectedBlogModal] = useState<string | null>(null);
  const [selectedAreaForForm, setSelectedAreaForForm] = useState<string>("MP Nagar (Maharana Pratap Nagar)");

  // Handle URL Pathname on mount
  useEffect(() => {
    const path = window.location.pathname.replace(/^\/|\/$/g, "");
    if (path) {
      const matchedArea = BHOPAL_SERVICE_AREAS.find((a) => a.slug === path || a.id === path);
      if (matchedArea) {
        setActiveAreaSlug(matchedArea.slug);
      }
    }

    const handlePopState = () => {
      const p = window.location.pathname.replace(/^\/|\/$/g, "");
      const matched = BHOPAL_SERVICE_AREAS.find((a) => a.slug === p || a.id === p);
      if (matched) {
        setActiveAreaSlug(matched.slug);
      } else {
        setActiveAreaSlug(null);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleNavigateToArea = (slug: string) => {
    setActiveAreaSlug(slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      window.history.pushState({}, "", `/${slug}/`);
    } catch (e) {
      // Ignore if pushState fails in sandbox
    }
  };

  const handleBackToHome = () => {
    setActiveAreaSlug(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      window.history.pushState({}, "", "/");
    } catch (e) {
      // Ignore if pushState fails in sandbox
    }
  };

  const handleOpenBooking = () => {
    if (activeAreaSlug) {
      // If on local area page, navigate back to home and scroll to booking form
      setActiveAreaSlug(null);
      setTimeout(() => {
        const bookingElement = document.getElementById("booking");
        if (bookingElement) {
          bookingElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const bookingElement = document.getElementById("booking");
      if (bookingElement) {
        bookingElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleSelectArea = (areaName: string) => {
    setSelectedAreaForForm(areaName);
    handleOpenBooking();
  };

  const handleSelectScrapItem = (item: ScrapItemRate) => {
    setSelectedServiceModal(item.name);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* Inject SEO JSON-LD Schemas */}
      <SEOSchemaManager />

      {/* Navigation Header */}
      <Header
        onOpenBooking={handleOpenBooking}
        onOpenCallModal={() => setCallModalOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Conditional Rendering: Local Area Landing Page OR Main Home Page */}
      {activeAreaSlug ? (
        <main>
          <LocalAreaPage
            areaSlug={activeAreaSlug}
            onOpenBooking={handleOpenBooking}
            onNavigateToArea={handleNavigateToArea}
            onBackToHome={handleBackToHome}
          />
        </main>
      ) : (
        <main>
          {/* High Conversion Hero Section */}
          <Hero
            onOpenBooking={handleOpenBooking}
            onSelectArea={handleSelectArea}
          />

          {/* Live Scrap Rates Section */}
          <ScrapRatesCard
            onSelectScrapItemForBooking={handleSelectScrapItem}
          />

          {/* AI Instant Scrap Estimator & Photo Scanner */}
          <AIEstimator />

          {/* 3 Step Process Guide */}
          <HowItWorks />

          {/* Doorstep Scrap Pickup Booking Form */}
          <PickupBookingForm
            initialArea={selectedAreaForForm}
          />

          {/* Local Service Areas in Bhopal */}
          <ServiceAreas
            onSelectAreaForPickup={handleSelectArea}
            onNavigateToArea={handleNavigateToArea}
          />

          {/* Commercial & Bulk Scrap Section */}
          <CommercialScrap />

          {/* Recycling & Educational Blog Section */}
          <BlogSection
            onSelectBlog={(blogId) => setSelectedBlogModal(blogId)}
          />

          {/* Google Reviews & Trust Section */}
          <TrustSection />

          {/* FAQ Accordion */}
          <FAQ />
        </main>
      )}

      {/* Footer */}
      <Footer onNavigateToArea={handleNavigateToArea} />

      {/* Mobile Sticky Bottom CTA Bar */}
      <MobileBottomBar onOpenBooking={handleOpenBooking} />

      {/* Quick Contact Modal */}
      <CallModal
        isOpen={callModalOpen}
        onClose={() => setCallModalOpen(false)}
      />

      {/* Admin Management Dashboard */}
      <AdminDashboard
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />

      {/* Local Area Specification Modal */}
      <LocalAreaDetailModal
        areaName={selectedAreaForModal}
        onClose={() => setSelectedAreaForModal(null)}
        onBookPickup={(area) => {
          handleSelectArea(area);
        }}
      />

      {/* Service Specification Modal */}
      <ServiceDetailModal
        serviceId={selectedServiceModal}
        onClose={() => setSelectedServiceModal(null)}
        onBookService={(serviceTitle) => {
          handleOpenBooking();
        }}
      />

      {/* Educational Recycling Blog Modal */}
      <BlogDetailModal
        blogId={selectedBlogModal}
        onClose={() => setSelectedBlogModal(null)}
        onBookPickup={handleOpenBooking}
      />
    </div>
  );
}
