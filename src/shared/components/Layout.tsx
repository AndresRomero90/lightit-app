import { Header } from './Header';

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className='flex flex-col justify-start min-h-screen'>
      <Header />
      <main className='bg-blue-300 grow px-8 py-16 flex flex-col items-center'>
        {children}
      </main>
    </div>
  );
};
