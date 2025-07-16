const AppWrapper = ({ children }: { children: React.ReactNode }) => (
  <main className='max-w-xl mx-auto p-6 bg-gray-50 min-h-screen'>
    <h1 className='text-2xl font-bold mb-4'>Syndica Todo App</h1>
    {children}
  </main>
);

export default AppWrapper;
