import React from 'react';

export default function HeaderVideo() {

  return (
    <div>
      <div className="videoContainer">
        <div className="hero d-flex align-items-center justify-content-center">
          <div className="overlay"></div>

          <div className="hero-text container d-flex flex-wrap justify-content-center">
            <h1 className="col-12 text-uppercase p-0 text-center text-size-4 hero-text-header">Game On</h1>
            <h3 className="col-12 text-center hero-text-sub-header">Our favorite games on sale</h3>
          </div>
          <div className="header-video">
            <video autoPlay loop muted>
              <source src="videos/board-zoom.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );

}
