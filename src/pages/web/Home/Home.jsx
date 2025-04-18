import React from 'react'
import Header from '../../../components/web/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import VendorBenefits from './components/VendorBenefits'
import CustomerBenefits from './components/CustomerBenefits'
import AppDownload from './components/AppDownload'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from '../../../components/web/Footer'

function Home() {
    return (
        <>
            <div className="font-sans text-gray-800">
                <Header />
                <Hero />
                <Features />
                {/* <HowItWorks /> */}
                {/* <VendorBenefits /> */}
                {/* <CustomerBenefits /> */}
                <AppDownload />
                {/* <Testimonials /> */}
                {/* <FAQ /> */}
                {/* <Contact /> */}
                <Footer />
            </div>
        </>
    )
}

export default Home
