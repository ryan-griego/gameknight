import React from 'react';

export default function CarouselThumbnail(props) {
  return (
    <div key={props.image} className="thumbnail-container align-self-center">
      <img className="thumbnail p-2 pointer" src={props.image} onClick={() => props.selectMainImage(props.image)} alt="" />
    </div>
  );
}
