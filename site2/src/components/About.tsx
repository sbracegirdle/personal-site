import React from 'react';
import {ContentBlock, JumboHeading} from './primitives';

const Bullet = () => {
  return <span className="mr-2">⯁</span>;
};

export default () => (
  <ContentBlock className="About" id="about" border>
    <JumboHeading className="" text="black">
      About
    </JumboHeading>
    <p className="About-lead my-4">
      Hi! I'm <em>Simon</em>, a consultant and software developer with over 15 years experience from Perth, Western
      Australia. I specialise in a broad range of technology and methodologies including, but not limited to:
    </p>
    <ul>
      <li className="my-2 mx-4">
        <Bullet /> Front-end application architecture and web application development (including; React, HTML, CSS,
        Redux)
      </li>
      <li className="my-2 mx-4">
        <Bullet /> AWS and Google Cloud Platform architecture and development. AWS Certified Solution Architect
        Associate (experienced with; Lambda, S3, API Gateway, Cloudfront, ECS, DynamoDB, CDK, CloudFormation etc)
      </li>
      <li className="my-2 mx-4">
        <Bullet /> REST API design and application development on Java (Spring, Hibernate, etc), NodeJS (Express) and
        Python (Flask) stacks
      </li>
      <li className="my-2 mx-4">
        <Bullet /> SQL and NoSQL data model and query design (Postgres, DynamoDB)
      </li>
      <li className="my-2 mx-4">
        <Bullet /> Data analysis and basic machine learning (Python, Numpy, Pandas, Matplotlib, Scikitlearn, Pytorch)
      </li>
      <li className="my-2 mx-4">Running agile teams via Scrum and Kanban</li>
    </ul>
    <p className="About-lead my-4">
      <span>I am currently working as a Consultant at </span>
      <a
        className="underline text-orange-500 hover:text-orange-300"
        href="https://mechanicalrock.io"
        target="_blank"
        rel="noopener noreferrer">
        Mechanical Rock
      </a>
      <span> and with startup </span>
      <a
        className="underline text-orange-500 hover:text-orange-300"
        href="https://www.b2me.com.au"
        target="_blank"
        rel="noopener noreferrer">
        B2Me Australia
      </a>
      <span>.</span>
    </p>
  </ContentBlock>
);
