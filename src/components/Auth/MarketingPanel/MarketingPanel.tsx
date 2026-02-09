'use client';

export function MarketingPanel() {
  return (
    <div className="p-5 lg:flex lg:w-2/5 xl:w-2/5">
      <div className="relative h-full w-full overflow-hidden rounded-lg bg-[#201f24]">
        <div className="absolute top-6 left-6 z-10 lg:top-8 lg:left-8 xl:top-10 xl:left-10">
          <h1 className="text-xl font-bold text-white lg:text-2xl">finance</h1>
        </div>

        <div className="flex items-center justify-center">
          <img
            src="/assets/images/illustration-authentication.svg"
            alt="Finance illustration"
            className="h-full w-full"
          />
        </div>

        <div className="absolute right-6 bottom-6 left-6 z-10 max-w-md lg:right-8 lg:bottom-8 lg:left-8 xl:right-10 xl:bottom-10 xl:left-10">
          <h2 className="mb-4 text-2xl font-bold text-white lg:mb-6 lg:text-3xl">
            Keep track of your money and save for your future
          </h2>
          <p className="text-sm text-white lg:text-base">
            Personal finance app puts you in control of your spending. Track transactions, set
            budgets, and add to savings pots easily.
          </p>
        </div>
      </div>
    </div>
  );
}
