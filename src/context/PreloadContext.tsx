import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { refreshScrollTriggers } from '../utils/smoothScroll';

interface PreloadContextType {
  isPreloaded: boolean;
  completePreload: () => void;
  replayPreload: () => void;
  shouldReplay: boolean;
  acknowledgeReplay: () => void;
}

const PreloadContext = createContext<PreloadContextType>({
  isPreloaded: true,
  completePreload: () => {},
  replayPreload: () => {},
  shouldReplay: false,
  acknowledgeReplay: () => {},
});

export const PreloadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isPreloaded, setIsPreloaded] = useState<boolean>(true);
  const [shouldReplay, setShouldReplay] = useState<boolean>(false);

  const completePreload = useCallback(() => {
    setIsPreloaded(true);
    setShouldReplay(false);
    // Refresh all GSAP ScrollTriggers now that the preloader has docked to the navbar
    refreshScrollTriggers();
  }, []);

  const replayPreload = useCallback(() => {
    setIsPreloaded(false);
    setShouldReplay(true);
  }, []);

  const acknowledgeReplay = useCallback(() => {
    setShouldReplay(false);
  }, []);

  return (
    <PreloadContext.Provider
      value={{
        isPreloaded,
        completePreload,
        replayPreload,
        shouldReplay,
        acknowledgeReplay,
      }}
    >
      {children}
    </PreloadContext.Provider>
  );
};

export const usePreload = (): PreloadContextType => {
  return useContext(PreloadContext);
};
