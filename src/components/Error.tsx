import AppWrapper from './AppWrapper';

const Error = ({ message }: { message: string }) => (
  <AppWrapper>
    <div className='py-4 text-red-600'>{message}</div>
  </AppWrapper>
);

export default Error;
