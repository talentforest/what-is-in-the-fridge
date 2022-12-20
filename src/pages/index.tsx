import Head from 'next/head';
import tw from 'tailwind-styled-components';

export default function Home() {
  return (
    <div>
      <Head>
        <title>What is in the fridge?</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </div>
  );
}

const Title = tw.h1`
  text-2xl 
  font-bold 
`;
