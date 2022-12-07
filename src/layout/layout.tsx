import Nav from './Nav';

export default function Layout({ children }: any) {
  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  );
}
