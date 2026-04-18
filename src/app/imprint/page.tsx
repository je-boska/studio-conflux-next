import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { getImprint } from '@/sanity';

export const metadata = {
  title: 'Imprint — Studio Conflux',
};

export const revalidate = 86400;

export default async function Imprint() {
  const body = await getImprint();

  return (
    <main className='relative max-w-2xl mx-auto my-20 px-4'>
      <div className='absolute -top-12 left-0'>
        <Link
          href='/'
          className='text-2xl opacity-70 hover:opacity-100 transition-opacity'
        >
          ←
        </Link>
      </div>
      <div className='imprint'>
        <PortableText value={body} />
      </div>
    </main>
  );
}
