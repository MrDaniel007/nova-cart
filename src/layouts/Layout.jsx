import { useState } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'   
import { Outlet } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop';

export default function Layout() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <main className="pt-12">
        <Outlet context={{ searchQuery, setSearchQuery }} />
      </main>
      <ScrollToTop />
      <Footer />
    </div>
  )
}