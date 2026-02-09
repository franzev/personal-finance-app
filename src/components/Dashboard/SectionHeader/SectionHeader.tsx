import Link from 'next/link';
import Image from 'next/image';

interface SectionHeaderProps {
  title: string;
  href?: string;
  linkText?: string;
}

export function SectionHeader({ title, href, linkText = 'See Details' }: SectionHeaderProps) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className="text-xl font-bold text-[#201F24]">{title}</h2>
      {href && (
        <Link
          href={href}
          className="flex items-center gap-3 text-sm text-[#696868] transition-colors hover:text-[#201F24]"
        >
          {linkText}
          <Image src="/assets/images/icon-caret-right.svg" alt="" width={6} height={11} />
        </Link>
      )}
    </div>
  );
}
