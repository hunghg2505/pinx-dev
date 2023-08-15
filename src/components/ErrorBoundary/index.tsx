import React, { Component, ReactNode } from 'react';

import Text from '@components/UI/Text';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // public componentDidCatch(error: Error, errorInfo: ErrorInfo) {}

  public render() {
    if (this.state.hasError) {
      return (
        <div className='flex h-[100vh] flex-col content-center items-center justify-center bg-[#f8f8f8] p-10'>
          <div className='flex flex-col items-center justify-center'>
            <img
              loading='lazy'
              src='/static/images/notFound.png'
              className='h-[191px] w-[246px]'
              alt=''
            />
            <Text type='body-22-bold' color='neutral-1' className='mb-[8px]'>
              Sorry.. there was an error
            </Text>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
