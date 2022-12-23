import tw from 'tailwind-styled-components';

const Loading = () => {
  return (
    <LoadingBox>
      <div
        className='animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full'
        role='status'
        aria-label='loading'
      >
        <span className='sr-only'>Loading...</span>
      </div>
    </LoadingBox>
  );
};

const LoadingBox = tw.div`
  flex 
  justify-center
  items-center
  text-blue-dark
  w-full
  h-2/3
  pb-10
`;

export default Loading;
