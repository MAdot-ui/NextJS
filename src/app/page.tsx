import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Rent a house - Home',
};

const RootPage = () => {
  return (
    <>
      <h2>Hello from Nextjs</h2>
      <Link href="/houses">Navigate to house list</Link>
    </>
  );
};

export default RootPage;
