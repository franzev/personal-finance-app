import Image from 'next/image';

export function AuthHeader() {
  return (
    <header className="block bg-[#201F24] py-6 lg:hidden" aria-label="Authentication header">
      <div className="flex justify-center">
        <Image src="/assets/images/logo-large.svg" alt="Finance" width={122} height={22} priority />
      </div>
    </header>
  );
}
