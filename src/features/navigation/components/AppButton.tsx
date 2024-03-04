import React from 'react';

interface AppButtonProps {
  onClick: () => void;
  logo: string;
  module: string;
  title: string;
  active: boolean;
}

const fixedClass = 'group w-20 h-20 flex items-center justify-center';

const AppButton: React.FC<AppButtonProps> = ({ onClick, logo, module, title, active }) => {
  return (
    <button className={`w-20 h-20 space-y-2 ${active ? 'font-medium text-gray-600' : 'text-gray-500'}`} onClick={onClick}>
      <div className={`${fixedClass} ${active ? 'border-gray-300 bg-serene-50' : 'border-gray-200 hover:bg-serene-50'}`}>
        <img src={logo} width={56} alt={`Logo for ${module}`}/>
      </div>
      <div className="text-sm">{title}</div>
    </button>
  );
};

export default AppButton;
