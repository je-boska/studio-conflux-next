import BlockContent, {
  BlockContentProps,
} from '@sanity/block-content-to-react';
import Link from 'next/link';
import Meta from '../components/Meta';
import { getImprint } from '../queries/imprint';

export default function Imprint({ imprint }: { imprint: BlockContentProps }) {
  return (
    <>
      <Meta title='Imprint' />
      <div className='absolute top-4 left-4 z-10'>
        <Link href='/' scroll={false}>
          <h3 className='cursor-pointer text-2xl text-white'>←</h3>
        </Link>
      </div>
      <BlockContent className='imprint' blocks={imprint} />
    </>
  );
}

export async function getStaticProps() {
  const imprint: BlockContentProps = await getImprint();
  return {
    props: { imprint },
    revalidate: 60 * 60,
  };
}
