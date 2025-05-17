'use client';

import type React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-6">
      <div className="flex items-center gap-2 flex-wrap">
        {/* Left Arrow */}
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex items-center justify-center w-9 h-9 rounded-full disabled:opacity-30"
        >
          <ChevronLeft className="w-4 h-4 text-black" />
        </button>

        {/* Page Numbers */}
        {pages.map((page) => (
          // biome-ignore lint/a11y/useButtonType: <explanation>
<button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex items-center justify-center w-9 h-9 rounded-full ${
              page === currentPage ? 'bg-blue-500 text-white' : 'text-black'
            }`}
          >
            {page}
          </button>
        ))}

        {/* Right Arrow */}
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex items-center justify-center w-9 h-9 rounded-full disabled:opacity-30"
        >
          <ChevronRight className="w-4 h-4 text-black" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
