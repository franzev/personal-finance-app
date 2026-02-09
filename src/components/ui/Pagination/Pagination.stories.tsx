import { useState } from 'react';
import type { Story } from '@ladle/react';
import { Pagination } from './Pagination';

export const Default: Story = () => {
  const [page, setPage] = useState(1);
  return (
    <div>
      <p className="text-muted-foreground mb-2 text-sm">Current page: {page}</p>
      <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
    </div>
  );
};

export const FewPages: Story = () => {
  const [page, setPage] = useState(1);
  return <Pagination currentPage={page} totalPages={3} onPageChange={setPage} />;
};

export const SinglePage: Story = () => {
  const [page, setPage] = useState(1);
  return <Pagination currentPage={page} totalPages={1} onPageChange={setPage} />;
};

export const ManyPages: Story = () => {
  const [page, setPage] = useState(5);
  return <Pagination currentPage={page} totalPages={20} onPageChange={setPage} />;
};
