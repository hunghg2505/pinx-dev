import React from 'react';

import Script from 'next/script';

const Schema = ({ schema }: any) => {
  if (!schema) {
    return null;
  }

  return (
    <Script
      id='script_home'
      strategy='afterInteractive'
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
};

export default Schema;
