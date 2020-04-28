import React from 'react';
import {ContentBlock, JumboHeading, ListItem, ExternalLink, Paragraph, Link} from './primitives';

export default () => (
  <ContentBlock className="About" id="about" border>
    <JumboHeading className="" text="black">
      About
    </JumboHeading>
    <Paragraph>
      Hi! I'm <em>Simon</em>, a consultant and software developer from Perth, Western Australia. Some of the things that
      I do are:
    </Paragraph>
    <ul>
      <ListItem>
        Front-end application web app development and architecture (Progressive Web Apps, React, CSS, etc)
      </ListItem>
      <ListItem>
        Cloud development, DevOps and architecture. AWS certified x2 (experienced with; Lambda, S3, API Gateway,
        Cloudfront, ECS, DynamoDB, CDK, CloudFormation, Google Cloud and more)
      </ListItem>
      <ListItem>Technical leadership in development teams through pairing and encouragement of best practice</ListItem>
      <ListItem>REST API and GraphQL design and application development (Node, Java, Python)</ListItem>
      <ListItem>Test-first enthusiast (BDD, TDD)</ListItem>
      <ListItem>Database modelling and query design (Postgres, DynamoDB)</ListItem>
      <ListItem>
        Data analysis and basic machine learning (Python, Numpy, Pandas, Matplotlib, Scikitlearn, Pytorch)
      </ListItem>
      <ListItem>Running agile teams (Scrum, Kanban)</ListItem>
    </ul>
    <Paragraph>
      <span>I am currently working as a Consultant at </span>
      <ExternalLink href="https://mechanicalrock.io">Mechanical Rock</ExternalLink>
      <span> and with startup </span>
      <ExternalLink href="https://www.b2me.com.au">B2Me Australia</ExternalLink>
      <span>.</span>
    </Paragraph>
    <Paragraph>
      Please check out my <Link to="/blog">blog</Link>!
    </Paragraph>
  </ContentBlock>
);
