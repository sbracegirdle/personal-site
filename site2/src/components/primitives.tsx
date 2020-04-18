import React from 'react';

export const classes = (...clazz: string[]) => clazz && clazz.filter(i => !!i).join(' ');
const c = classes;

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
