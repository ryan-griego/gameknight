import React from 'react';

export default function HeaderVideo() {
  if (screen.width > 1024) {
    return (
      <div>
        <div className="video-overlay"></div>
        <div className="hero d-flex align-items-center justify-content-center">
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
    );
  } else {
    return (
      <div className="hero d-flex align-items-center justify-content-center">
        <div className="hero-text container d-flex flex-wrap justify-content-center">
          <h1 className="col-12 text-uppercase p-0 text-center text-size-4 permanent-marker">Play Well</h1>
          <h3 className="col-12 text-center hero-text-sub-header">Only the best is good enough</h3>
        </div>
        <div className="header-gif">
          <img className="header-gif" src="images/Hero Video-Technicali-hb.gif" />

        </div>
      </div>
    );
  }

}
