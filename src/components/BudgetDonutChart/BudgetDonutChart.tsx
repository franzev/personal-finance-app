'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export interface BudgetCategory {
  name: string;
  spent: number;
  limit: number;
  color: string;
}

interface BudgetDonutChartProps {
  categories: BudgetCategory[];
  totalSpent: number;
  totalLimit: number;
  className?: string;
}

export default function BudgetDonutChart({
  categories,
  totalSpent,
  totalLimit,
  className = '',
}: BudgetDonutChartProps) {
  const chartData = categories.map((cat) => ({
    name: cat.name,
    value: cat.spent,
    color: cat.color,
  }));

  return (
    <div className={`relative ${className}`}>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={75}
            outerRadius={95}
            paddingAngle={0}
            dataKey="value"
            strokeWidth={0}
            startAngle={90}
            endAngle={-270}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl leading-none font-bold text-gray-900">
            ${Math.round(totalSpent).toLocaleString('en-US')}
          </p>
          <p className="mt-2 text-xs text-gray-500">
            of ${Math.round(totalLimit).toLocaleString('en-US')} limit
          </p>
        </div>
      </div>
    </div>
  );
}

interface BudgetLegendProps {
  categories: BudgetCategory[];
}

export function BudgetLegend({ categories }: BudgetLegendProps) {
  return (
    <div className="mt-6 space-y-0">
      {categories.map((category, index) => (
        <div
          key={category.name}
          className={`flex items-center justify-between ${
            index < categories.length - 1 ? 'mb-3 border-b border-gray-200 pb-3' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-1 shrink-0 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <span className="text-sm text-gray-600">{category.name}</span>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-gray-900">${category.spent.toFixed(2)}</p>
            <p className="text-xs text-gray-500">of ${category.limit.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

interface BudgetChartWithLegendProps {
  categories: BudgetCategory[];
  totalSpent: number;
  totalLimit: number;
  className?: string;
}

export function BudgetChartWithLegend({
  categories,
  totalSpent,
  totalLimit,
  className = '',
}: BudgetChartWithLegendProps) {
  return (
    <div className={className}>
      <BudgetDonutChart categories={categories} totalSpent={totalSpent} totalLimit={totalLimit} />
      <BudgetLegend categories={categories} />
    </div>
  );
}
