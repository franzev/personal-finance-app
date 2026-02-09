import type { Story } from '@ladle/react';
import BudgetDonutChart, { BudgetLegend, BudgetChartWithLegend } from './BudgetDonutChart';
import type { BudgetCategory } from './BudgetDonutChart';

const sampleCategories: BudgetCategory[] = [
  { name: 'Entertainment', spent: 25.0, limit: 50.0, color: '#277C78' },
  { name: 'Bills', spent: 750.0, limit: 750.0, color: '#82C9D7' },
  { name: 'Dining Out', spent: 67.5, limit: 75.0, color: '#F2CDAC' },
  { name: 'Personal Care', spent: 32.0, limit: 100.0, color: '#626070' },
];

export const Default: Story = () => (
  <div className="w-80">
    <BudgetDonutChart categories={sampleCategories} totalSpent={874.5} totalLimit={975.0} />
  </div>
);

export const Legend: Story = () => (
  <div className="w-80">
    <BudgetLegend categories={sampleCategories} />
  </div>
);

export const ChartWithLegend: Story = () => (
  <div className="w-80">
    <BudgetChartWithLegend categories={sampleCategories} totalSpent={874.5} totalLimit={975.0} />
  </div>
);
