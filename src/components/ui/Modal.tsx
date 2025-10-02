import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export function Modal({ isOpen, onClose, title, children, maxWidth = 'lg' }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className={`relative inline-block w-full ${maxWidthClasses[maxWidth]} transform rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 text-left shadow-2xl transition-all align-middle`}>
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">{title}</h2>
              <button
                onClick={onClose}
                className="p-1 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Content */}
          <div className={title ? 'p-6' : 'p-6'}>
            {children}
          </div>

          {/* Close button when no title */}
          {!title && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}