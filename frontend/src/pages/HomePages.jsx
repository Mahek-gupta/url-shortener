import React from 'react';
import Navbar from '../components/Navbar';
import ShortenForm from '../components/ShortenForm'; // Part of Hero section
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import AnalyticsPreview from '../components/AnalyticsPreview';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast'; // For notifications
import Hero from '../components/Hero';


const HomePages = () => {
  return (
    <div className="min-h-screen bg-dark-bg text-dark-text font-sans ">
      <Toaster position="top-right" />
      {/* <Navbar /> */}
 <div className=" md:pt-19 pt-16">
     
<Hero/>
      <Features />
      <HowItWorks />
      <AnalyticsPreview />
      <Testimonials />
      <CTA />
      </div>
      <Footer />
    </div>
   
  );
};

export default HomePages;












