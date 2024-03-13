import React, { ReactNode } from 'react';

// Utility function to generate ID from heading text
const generateId = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

interface WithHeadingIdProps {
  children: ReactNode;
}

export const withHeadingId: React.FC<WithHeadingIdProps> = ({ children }) => {
  return (
    <>
      {React.Children.map(children, (child) => {
        // Make sure we are dealing with a React element and its type is a string
        if (React.isValidElement(child) && typeof child.type === 'string') {
          // Now we can safely check if this is a heading element
          if (/^h[1-6]$/i.test(child.type)) {
            // Process the element as a heading
            const textContent: string = React.Children.toArray(
              child.props.children
            ).reduce((acc: string, child: ReactNode): string => {
              if (typeof child === 'string') return acc + child;
              if (React.isValidElement(child) && child.props) {
                // Recursively process any children of this child
                return (
                  acc + React.Children.toArray(child.props.children).join('')
                );
              }
              return acc;
            }, '');

            const id: string = generateId(textContent);

            return React.cloneElement(
              child,
              {
                ...child.props,
                id: id,
                className: `${child.props.className || ''} group`,
              },
              <>
                <a
                  href={`#${id}`}
                  aria-hidden='true'
                  className='anchor -ml-6 mr-2 hidden group-hover:block'
                >
                  #
                </a>
                {child.props.children}
              </>
            );
          }
        }
        // Return the child unchanged if it's not a valid heading element
        return child;
      })}
    </>
  );
};
