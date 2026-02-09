import Image from 'next/image';
import { Button } from '@/components';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

type PageItem = number | '...';

const getMobilePages = (currentPage: number, totalPages: number): PageItem[] => {
  const pages: PageItem[] = [];

  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  pages.push(1);

  if (currentPage <= 2) {
    pages.push(2);
    pages.push('...');
    pages.push(totalPages);
    return pages;
  }

  if (currentPage >= totalPages - 1) {
    pages.push('...');
    pages.push(totalPages - 1);
    pages.push(totalPages);
    return pages;
  }

  pages.push(currentPage);
  pages.push('...');
  pages.push(totalPages);

  return pages;
};

const getDesktopPages = (_currentPage: number, totalPages: number): PageItem[] => {
  const pages: PageItem[] = [];

  const max = Math.min(5, totalPages);

  for (let i = 1; i <= max; i++) {
    pages.push(i);
  }

  if (totalPages > 5) {
    pages.push('...');
    pages.push(totalPages);
  }

  return pages;
};

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const changePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const mobilePages = getMobilePages(currentPage, totalPages);
  const desktopPages = getDesktopPages(currentPage, totalPages);

  return (
    <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-full gap-4 px-4 py-[9.5px]"
      >
        <Image src="/assets/images/icon-caret-left.svg" alt="Previous" width={6} height={6} />
        <p className="hidden text-sm leading-[150%] md:block">Prev</p>
      </Button>

      <div className="flex items-center gap-2 md:hidden">
        {mobilePages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`m-ellipsis-${index}`} className="px-2 text-gray-400">
                ...
              </span>
            );
          }

          const isActive = currentPage === page;

          return (
            <Button
              key={`m-${page}`}
              onClick={() => changePage(page)}
              variant="ghost"
              className={`flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-transparent ${
                isActive
                  ? 'bg-[#201F24] text-[#FFFFFF] hover:bg-[#201F24]'
                  : 'border border-[#98908B] bg-transparent text-[#201F24] hover:bg-[#F0F0F0]'
              } `}
            >
              {page}
            </Button>
          );
        })}
      </div>

      <div className="hidden items-center gap-2 md:flex">
        {desktopPages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`d-ellipsis-${index}`} className="px-2 text-gray-400">
                ...
              </span>
            );
          }

          const isActive = currentPage === page;

          return (
            <Button
              key={`d-${page}`}
              onClick={() => changePage(page)}
              variant="ghost"
              className={`flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-transparent ${
                isActive
                  ? 'bg-[#201F24] text-[#FFFFFF] hover:bg-[#201F24]'
                  : 'border border-[#98908B] bg-transparent text-[#201F24] hover:bg-[#F0F0F0]'
              } `}
            >
              {page}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-full gap-4 px-4 py-[9.5px]"
      >
        <p className="hidden text-sm leading-[150%] md:block">Next</p>
        <Image src="/assets/images/icon-caret-right.svg" alt="Next" width={6} height={6} />
      </Button>
    </div>
  );
};
