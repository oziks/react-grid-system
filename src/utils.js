/* global window */

import { useState, useEffect } from 'react';
import { getConfiguration } from './config';

const getViewPort = (source) => {
  if (source && source.current && source.current.clientWidth) {
    return source.current.clientWidth;
  }
  if (typeof window !== 'undefined' && window.innerWidth) {
    return window.innerWidth;
  }
  return null;
};

export const screenClasses = ['xs', 'sm', 'md', 'lg', 'xl'];

export const useScreenClass = (source) => {
  const [screenClass, setScreenClass] = useState(getConfiguration().defaultScreenClass);

  useEffect(() => {
    function handleWindowResized() {
      const { breakpoints, defaultScreenClass } = getConfiguration();
      let newScreenClass = defaultScreenClass;

      const viewport = getViewPort(source);
      if (viewport) {
        newScreenClass = 'xs';
        if (newScreenClass[0] && viewport >= breakpoints[0]) newScreenClass = 'sm';
        if (breakpoints[1] && viewport >= breakpoints[1]) newScreenClass = 'md';
        if (breakpoints[2] && viewport >= breakpoints[2]) newScreenClass = 'lg';
        if (breakpoints[3] && viewport >= breakpoints[3]) newScreenClass = 'xl';
      }
      setScreenClass(newScreenClass);
    }

    window.addEventListener('resize', handleWindowResized, false);
    handleWindowResized();

    return () => {
      window.removeEventListener('resize', handleWindowResized, false);
    };
  });

  return screenClass;
};
