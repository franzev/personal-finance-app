'use client';

import React, { useState, useEffect } from 'react';
import { Button, Card, Input } from '@/components';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import Image from 'next/image';
import { useTransactions } from '@/hooks/useFinanceData';
import { TRANSACTION_CATEGORIES, SORT_OPTIONS } from '@/lib/constants/constants';
import { useTransactionFilters } from '@/hooks/useTransactionFilters';
import { usePagination } from '@/hooks/usePagination';
import { Pagination, TransactionRow } from '@/components';

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Transactions');
  const [sortBy, setSortBy] = useState<'latest' | 'oldest' | 'highest' | 'lowest' | 'a-z' | 'z-a'>(
    'latest',
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isCategorySelectOpen, setIsCategorySelectOpen] = useState(false);
  const [isSortSelectOpen, setIsSortSelectOpen] = useState(false);

  const { data: transactions = [], isLoading } = useTransactions();

  const filteredAndSortedTransactions = useTransactionFilters({
    transactions,
    searchTerm,
    selectedCategory,
    sortBy,
  });

  const { paginatedItems: paginatedTransactions, totalPages } = usePagination({
    items: filteredAndSortedTransactions,
    currentPage,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="bg-[#F8F4F0] p-4 pb-[68px] sm:pb-[90px] md:p-8 md:pb-8">
      <div className="mx-auto max-w-[1440px]">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 md:mb-8 md:text-3xl">Transactions</h1>

        <Card className="p-5 md:p-8">
          <div className="mb-6 w-full overflow-hidden">
            <div className="flex w-full flex-row items-stretch justify-between gap-4 sm:items-center">
              <div className="w-full sm:flex-1 lg:max-w-[320px]">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search transaction"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-[45px] pr-12"
                  />
                  <Image
                    src="/assets/images/icon-search.svg"
                    alt="Search"
                    width={14}
                    height={14}
                    className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 opacity-50"
                  />
                </div>
              </div>

              <div className="flex min-w-0 shrink-0 flex-row gap-3 sm:gap-6">
                <div className="relative flex flex-row items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="size-[45px] rounded-lg bg-transparent p-0 hover:bg-gray-100 focus-visible:ring-0 focus-visible:ring-offset-0 sm:hidden"
                    aria-label="Open category filter"
                    aria-haspopup="listbox"
                    aria-expanded={isCategorySelectOpen}
                    onClick={() => setIsCategorySelectOpen(true)}
                  >
                    <Image
                      src="/assets/images/icon-filter-mobile.svg"
                      alt=""
                      width={18}
                      height={16}
                      className="shrink-0"
                    />
                  </Button>

                  <span className="hidden text-xs font-medium text-gray-500 sm:inline">
                    Sort by
                  </span>
                  <Select
                    value={sortBy}
                    onValueChange={(value) => {
                      setSortBy(value as typeof sortBy);
                      setIsSortSelectOpen(false);
                    }}
                    open={isSortSelectOpen}
                    onOpenChange={setIsSortSelectOpen}
                  >
                    <SelectTrigger
                      aria-label="Sort by"
                      className="focus-visible:ring-primary-200 data-[state=open]:border-primary-300 pointer-events-none absolute inset-0 h-0 w-0 justify-between rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 opacity-0 shadow-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 sm:pointer-events-auto sm:static sm:flex sm:h-[45px] sm:w-[115px] sm:opacity-100 md:w-[130px] lg:w-[150px]"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent
                      align="end"
                      className="min-w-[164px] rounded-2xl border border-gray-200 bg-white py-1 shadow-[0px_16px_40px_rgba(15,23,42,0.15)]"
                    >
                      {SORT_OPTIONS.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          showIndicator={false}
                          className="border-b border-gray-200 px-4 py-2 text-sm text-gray-600 last:border-b-0 data-[highlighted]:bg-gray-100 data-[state=checked]:font-semibold data-[state=checked]:text-gray-900"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative flex flex-row items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="size-[45px] rounded-lg bg-transparent p-0 hover:bg-gray-100 focus-visible:ring-0 focus-visible:ring-offset-0 sm:hidden"
                    aria-label="Open sort options"
                    aria-haspopup="listbox"
                    aria-expanded={isSortSelectOpen}
                    onClick={() => setIsSortSelectOpen(true)}
                  >
                    <Image
                      src="/assets/images/icon-sort-mobile.svg"
                      alt=""
                      width={16}
                      height={15}
                      className="shrink-0"
                    />
                  </Button>
                  <span className="hidden text-xs font-medium text-gray-500 sm:inline">
                    Category
                  </span>
                  <Select
                    value={selectedCategory}
                    onValueChange={(value) => {
                      setSelectedCategory(value);
                      setIsCategorySelectOpen(false);
                    }}
                    open={isCategorySelectOpen}
                    onOpenChange={setIsCategorySelectOpen}
                  >
                    <SelectTrigger
                      aria-label="Category"
                      className="focus-visible:ring-primary-200 data-[state=open]:border-primary-300 pointer-events-none absolute inset-0 h-0 w-0 justify-between rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 opacity-0 shadow-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 sm:pointer-events-auto sm:static sm:flex sm:h-[45px] sm:w-[140px] sm:opacity-100 md:w-[160px] lg:w-[180px]"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TRANSACTION_CATEGORIES.map((category) => (
                        <SelectItem
                          key={category}
                          value={category}
                          showIndicator={false}
                          className="border-b border-gray-200 px-4 py-2 text-sm text-gray-600 last:border-b-0 data-[highlighted]:bg-gray-100 data-[state=checked]:font-semibold data-[state=checked]:text-gray-900"
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="hidden grid-cols-4 border-b border-gray-200 px-0 pt-2 pb-3 text-xs text-gray-500 sm:grid">
              <div>Recipient / Sender</div>
              <div>Category</div>
              <div>Transaction Date</div>
              <div className="text-right">Amount</div>
            </div>

            <div>
              {isLoading ? (
                <div className="space-y-4 py-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                    <div key={i} className="h-[60px] animate-pulse rounded bg-gray-200" />
                  ))}
                </div>
              ) : paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((transaction, index) => (
                  <TransactionRow key={index} transaction={transaction} />
                ))
              ) : (
                <div className="py-12 text-center">
                  <p className="text-gray-500">No transactions found</p>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
