import React from 'react';

interface ScrollProps {
  children: JSX.Element
}

const Scroll = (props: ScrollProps) => {
  return( 
    <div style={{overflowY: 'scroll', height:'70vh'}}>
      {props.children}
    </div>	
  );
}

export default Scroll;