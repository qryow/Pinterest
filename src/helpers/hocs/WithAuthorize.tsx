import React from 'react';

type ComponentType<P> = React.ComponentType<P>;

interface WithAuthorizeProps<P> {
  ComponentForAuthorized: ComponentType<P>;
  ComponentForUnauthorized: ComponentType<P>;
}

export const WithAuthorize = <P extends object>(
  isAuth: boolean,
  { ComponentForAuthorized, ComponentForUnauthorized }: WithAuthorizeProps<P> 
) => {
  const componentWrapper: React.FC<P> = (props) => (
    isAuth ? <ComponentForAuthorized {...props} /> : <ComponentForUnauthorized {...props} />
  );
  return componentWrapper;
};
