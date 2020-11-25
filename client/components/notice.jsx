import React from 'react';

export default function Notice(props) {
  const { name } = props.product;
  return (
    <div className='notice-container d-flex justify-content-center col-12 p-0'>
      <div className={`${props.display} slide-down`}>
        <p className="text-center m-0 align-self-center notice-p">{`${name} has been added
          to your `}
        <span
          className="font-weight-bold pointer"
          onClick={() => props.view('cart')
          }>
            cart.
        </span>
        </p>
      </div>
    </div>
  );
}
