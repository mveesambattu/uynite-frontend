import React from 'react';

type ContentProps = {
  children: React.ReactNode;
};

const Content: React.FC<ContentProps> = ({ children }) => {
  return (
    <div className="w-1/2 bg-white rounded shadow-md flex items-center justify-center  justify-center h-full">
      {children}
    </div>
  );
};

export default Content;
