import AppWrapper from './AppWrapper';

interface ErrorProps {
  message: string;
}

const Error = ({ message }: ErrorProps) => (
  <AppWrapper>
    <div className='py-4 text-red-600'>{message}</div>
  </AppWrapper>
);

export default Error;
