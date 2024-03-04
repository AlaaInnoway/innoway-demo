import React from 'react';
import logo from '../features/navigation/assets/home.svg'
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <div className="flex">
      <Sidebar logo={logo} title='Home' open={true} setOpen={() => null} />
      <div className="flex-1 z-10">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
