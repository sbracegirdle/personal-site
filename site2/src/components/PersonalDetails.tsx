import React from 'react';
import {ContentBlock, JumboHeading} from './primitives';

const PersonalDetails = () => {
  return (
    <ContentBlock className="PersonalDetails bg-purple-700" border>
      <img
        className="PersonalDetails-photo rounded-full text-center m-3 mx-auto "
        style={{width: '15rem', height: '15rem'}}
        src="simon.jpg"
      />
      <JumboHeading className="" text="white">
        Simon Bracegirdle
      </JumboHeading>
      <div className="PersonalDetails-role text-white text-xl text-center my-1 mt-4">
        Development / Cloud / DevOps / Web
      </div>
      <div className="PersonalDetails-location text-white text-center my-1">
        <i className="fas fa-map-marker-alt mr-2"></i>
        <span>Perth, Western Australia</span>
      </div>
    </ContentBlock>
  );
};

export default PersonalDetails;
