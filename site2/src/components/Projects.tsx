import React from 'react';
import {ContentBlock, JumboHeading, LinkButton} from './primitives';

export default () => (
  <ContentBlock className="Projects bg-gray-700 text-white" id="projects" border>
    <JumboHeading className="" text="gray-500">
      Projects
    </JumboHeading>
    <div className="grid-cols-1 md:grid-cols-2 gap-5 grid my-5">
      <div className="col-span-1">
        <h2 className="text-3xl m-2">B2Me Australia</h2>
        <p className="lead m-2">
          B2Me is a services finding marketplace that helps you to find people that you can trust from your community.
        </p>
        <LinkButton
          style="primary-inverse"
          className="btn btn-xl btn-outline-light m-2"
          href="https://b2me.com.au"
          target="_blank"
          rel="noopener noreferrer">
          <i className="fas fa-link mr-2"></i>
          b2me.com.au
        </LinkButton>
      </div>
      <div className="col-span-1">
        <h2 className="text-3xl m-2">Personal site</h2>
        <p className="lead m-2">The source code for this site.</p>
        <LinkButton
          style="primary-inverse"
          className="btn btn-xl btn-outline-light m-2"
          href="https://github.com/sbracegirdle/personal-site"
          target="_blank"
          rel="noopener noreferrer">
          <i className="fab fa-github mr-2"></i>
          github.com
        </LinkButton>
      </div>
      <div className="col-span-1">
        <h2 className="text-3xl m-2">VS code snippets</h2>
        <p className="lead m-2">
          A collection of handy snippets that I use with VS Code primarily for JavaScript, CSS and Python.
        </p>
        <LinkButton
          style="primary-inverse"
          className="btn btn-xl btn-outline-light m-2"
          href="https://github.com/sbracegirdle/snippets"
          target="_blank"
          rel="noopener noreferrer">
          <i className="fab fa-github mr-2"></i>
          github.com
        </LinkButton>
      </div>
      <div className="col-span-1">
        <h2 className="text-3xl m-2">Lockedbox</h2>
        <p className="lead m-2">
          Lockedbox is a small tool to make it very difficult to access a secret (e.g. Steam or Netflix password),
          except at a given time of day or week.
        </p>
        <LinkButton
          style="primary-inverse"
          className="btn btn-xl btn-outline-light m-2"
          href="https://github.com/sbracegirdle/lockedbox"
          target="_blank"
          rel="noopener noreferrer">
          <i className="fab fa-github mr-2"></i>
          github.com
        </LinkButton>
      </div>
    </div>
  </ContentBlock>
);
