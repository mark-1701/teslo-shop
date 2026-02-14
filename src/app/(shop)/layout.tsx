import { Footer, TopMenu } from '@components';
import { Sidebar } from '@/src/components/ui/sidebar/Sidebar';

export default async function ShopLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="min-h-screen">
        <TopMenu />
        <Sidebar />

        <div className="px-0 sm:px-7">{children}</div>

        <Footer />
      </main>
    </>
  );
}
