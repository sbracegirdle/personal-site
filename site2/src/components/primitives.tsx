import React from 'react';
import {Link as ReachLink} from '@reach/router';

export const classes = (...clazz: string[]) => clazz && clazz.filter(i => !!i).join(' ');
const c = classes;

const Bullet = () => {
  return (
    <span className="mr-2">
      <i className="fas fa-caret-right"></i>
    </span>
  );
};

export const Paragraph = ({children}: {children: React.ReactNode}) => <p className="my-4">{children}</p>;
export const H1 = ({children}: {children: React.ReactNode}) => <p className="my-4 text-2xl">{children}</p>;
export const H2 = ({children}: {children: React.ReactNode}) => <p className="my-4 text-2xl font-bold">{children}</p>;
export const H3 = ({children}: {children: React.ReactNode}) => <p className="my-4 text-xl font-bold">{children}</p>;
export const H4 = ({children}: {children: React.ReactNode}) => <p className="my-4 font-bold">{children}</p>;
export const ListItem = ({children}: {children: React.ReactNode}) => (
  <li className="my-2 mx-4">
    <Bullet />
    <span>{children}</span>
  </li>
);
export const InlineCode = ({children}: {children: React.ReactNode}) => (
  <code className="py-1 px-2 rounded my-1 inline bg-gray-800 text-purple-300 monospace">{children}</code>
);

export const Code = ({value}: {value: string; language: string}) => (
  <pre className="py-2 px-3 rounded m-1 overflow-auto bg-gray-800 text-purple-300 monospace">
    <code className="">
      {/* {language}
      <br /> */}
      {value}
    </code>
  </pre>
);

export const ExternalLink = ({
  href,
  children,
  className,
  target,
  rel
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}) => (
  <a
    className={`${className || ''} underline text-orange-500 hover:text-orange-700`}
    href={href}
    target={target || '_blank'}
    rel={rel || 'noopener noreferrer'}>
    {children}
  </a>
);

export const Link = (props: any) => (
  <ReachLink {...props} className={`${props.className || ''} underline text-orange-500 hover:text-orange-700`} />
);

export const JumboHeading = ({
  className,
  children,
  text = 'black'
}: {
  className: string;
  children: React.ReactNode;
  text: string | undefined;
}) => {
  return (
    <div className={c('JumboHeading', className)}>
      <h1 className={`PersonalDetails-name text-${text} text-4xl md:text-6xl text-center m-4 uppercase`}>{children}</h1>
      <div className={`PersonalDetails-seperator rounded text-center bg-${text} m-4 w-6 h-1 mx-auto`}>&nbsp;</div>
    </div>
  );
};

export const ContentBlock = ({
  className,
  children,
  border = false,
  id
}: {
  className: string | undefined;
  children: React.ReactNode | undefined;
  border?: boolean;
  id?: string | undefined;
}) => {
  return (
    <div
      id={id}
      className={`ContentBlock ${border ? 'border-b-4 border-purple-900' : ''} px-3 md:px-4 py-4 text-lg ${
        className || ''
      }`}>
      <div className="max-w-9 mx-auto">{children}</div>
    </div>
  );
};

const buttonStyles: {[name: string]: string} = {
  white: 'hover:bg-white hover:text-black border-white',
  primary: 'text-purple-700 hover:bg-purple-700 hover:text-white border-purple-700',
  'primary-inverse':
    'text-white bg-purple-700 hover:bg-transparent text-white border-purple-700 hover:border-purple-600'
};

export const LinkButton = ({
  className,
  children,
  href,
  target,
  style = 'white',
  rel
}: {
  className?: string | undefined;
  children: React.ReactNode | undefined;
  href: string;
  target?: string | undefined;
  style?: string | undefined;
  rel?: string | undefined;
}) => {
  return (
    <a
      className={`${className || ''} Button px-3 py-2 inline-flex flex-row items-baseline rounded ${
        buttonStyles[style]
      } border border-1 `}
      href={href}
      target={target}
      rel={rel}>
      {children}
    </a>
  );
};
