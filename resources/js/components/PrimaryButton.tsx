import React from 'react';
import { Unlock } from 'lucide-react';

interface PrimaryButtonProps {
    disabled?: boolean;
    icon?: React.ReactNode;
    text?: string;
    // children: React.ReactNode;
    // children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ onClick, className, icon, text, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-1 xs:gap-1 sm:gap-2 whitespace-nowrap transition-colors duration-200 text-xs ${className}`}
    >
      {icon}
      {text && <span className="inline">{text}</span>}
    </button>
  );
};

export default PrimaryButton;
