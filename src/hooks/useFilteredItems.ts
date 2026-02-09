import { useMemo } from 'react';
import { SortOption } from '@/lib/types';

interface SearchConfig<T> {
  getSearchableText: (item: T) => string;
  searchTerm: string;
}

interface CategoryConfig<T> {
  getCategory: (item: T) => string;
  selectedCategory: string;
  allCategoriesValue: string;
}

interface SortConfig<T> {
  sortBy: SortOption;
  sortHandlers?: Partial<Record<SortOption, (a: T, b: T) => number>>;
  getDate?: (item: T) => string;
  getAmount?: (item: T) => number;
  getName?: (item: T) => string;
}

interface UseFilteredItemsProps<T> {
  items: T[];
  search?: SearchConfig<T>;
  category?: CategoryConfig<T>;
  sort: SortConfig<T>;
}

export const useFilteredItems = <T>({
  items,
  search,
  category,
  sort,
}: UseFilteredItemsProps<T>): T[] => {
  return useMemo(() => {
    let filtered = items;

    if (search && search.searchTerm) {
      filtered = filtered.filter((item) =>
        search.getSearchableText(item).toLowerCase().includes(search.searchTerm.toLowerCase()),
      );
    }

    if (category && category.selectedCategory !== category.allCategoriesValue) {
      filtered = filtered.filter(
        (item) => category.getCategory(item) === category.selectedCategory,
      );
    }

    const sorted = [...filtered];

    if (sort.sortHandlers?.[sort.sortBy]) {
      sorted.sort(sort.sortHandlers[sort.sortBy]!);
      return sorted;
    }

    switch (sort.sortBy) {
      case 'latest':
        if (sort.getDate) {
          sorted.sort(
            (a, b) => new Date(sort.getDate!(b)).getTime() - new Date(sort.getDate!(a)).getTime(),
          );
        }
        break;
      case 'oldest':
        if (sort.getDate) {
          sorted.sort(
            (a, b) => new Date(sort.getDate!(a)).getTime() - new Date(sort.getDate!(b)).getTime(),
          );
        }
        break;
      case 'highest':
        if (sort.getAmount) {
          sorted.sort((a, b) => sort.getAmount!(b) - sort.getAmount!(a));
        }
        break;
      case 'lowest':
        if (sort.getAmount) {
          sorted.sort((a, b) => sort.getAmount!(a) - sort.getAmount!(b));
        }
        break;
      case 'a-z':
        if (sort.getName) {
          sorted.sort((a, b) => sort.getName!(a).localeCompare(sort.getName!(b)));
        }
        break;
      case 'z-a':
        if (sort.getName) {
          sorted.sort((a, b) => sort.getName!(b).localeCompare(sort.getName!(a)));
        }
        break;
    }

    return sorted;
  }, [items, search, category, sort]);
};
