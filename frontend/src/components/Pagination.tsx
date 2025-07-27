import React from "react";
import clsx from "clsx";
import { CustomText } from "./CustomText";
import leftArrow from "../assets/leftArrow.svg";
import rightArrow from "../assets/rightArrow.svg";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  className = "",
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const canPrevious = currentPage > 0;
  const canNext = currentPage < totalPages - 1;

  // Always show first, last, and pages around current
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 3; // Pages to show around current

    // Always show first page
    if (totalPages > 0) {
      pages.push(0);
    }

    // Show pages around current
    const start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages - 1, start + maxVisible - 1);

    for (let i = start; i <= end; i++) {
      if (i > 0 && i < totalPages - 1) {
        pages.push(i);
      }
    }

    // Always show last page if different from first
    if (totalPages > 1) {
      pages.push(totalPages - 1);
    }

    // Filter duplicates and sort
    return [...new Set(pages)].sort((a, b) => a - b);
  };

  const renderPageNumbers = () => {
    const pages = getPageNumbers();
    const elements = [];

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];

      // Add ellipsis if gap between pages
      if (i > 0 && pages[i] - pages[i - 1] > 1) {
        elements.push(
          <span key={`ellipsis-${i}`} className="px-2 text-gray-500">
            ...
          </span>
        );
      }

      elements.push(
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={clsx(
            "px-3 py-1 rounded-lg text-sm font-medium h-10 w-10",
            currentPage === page
              ? "bg-brand_50 text-brand_600"
              : "text-gray_500"
          )}
        >
          {page + 1}
        </button>
      );
    }

    return elements;
  };

  return (
    <div
      className={clsx(
        "mt-6 flex flex-col sm:flex-row items-center justify-end gap-3",
        className
      )}
    >
      <button
        className="flex items-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canPrevious}
      >
        <img src={leftArrow} alt="Previous Page" />
        <CustomText variant="textSemiBold" className="pl-2">
          Previous
        </CustomText>
      </button>

      <div className="flex items-center gap-1 mx-2 sm:mx-4 flex-wrap justify-center">
        {renderPageNumbers()}
      </div>

      <button
        className="flex items-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canNext}
      >
        <CustomText variant="textSemiBold" className="pr-2">
          Next
        </CustomText>
        <img src={rightArrow} alt="Next Page" />
      </button>
    </div>
  );
};
