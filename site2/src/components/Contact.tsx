import React from 'react';
import {ContentBlock, JumboHeading, LinkButton} from './primitives';

export default () => (
  <ContentBlock className="Projects" id="contact">
    <JumboHeading className="" text="black">
      Contact
    </JumboHeading>
    <div className="my-3 flex flex-col md:flex-row justify-center">
      <LinkButton
        style="primary"
        className="btn m-2"
        href="https://www.linkedin.com/in/simon-bracegirdle/"
        target="_blank"
        rel="noreferrer noopener">
        <i className="fab fa-fw fa-linkedin mx-2"></i>
        <span>LinkedIn</span>
      </LinkButton>
      <LinkButton
        style="primary"
        className="btn btn-xl btn-outline-primary m-2"
        href="https://github.com/sbracegirdle"
        target="_blank"
        rel="noreferrer noopener">
        <i className="fab fa-fw fa-github mx-2"></i>
        <span>Github</span>
      </LinkButton>
      <LinkButton
        style="primary"
        className="btn btn-xl btn-outline-primary m-2"
        href="mailto:sbracegirdle@gmail.com"
        target="_blank"
        rel="noreferrer noopener">
        <i className="fas fa-envelope mx-2"></i>
        <span>Email</span>
      </LinkButton>
    </div>
  </ContentBlock>
);
