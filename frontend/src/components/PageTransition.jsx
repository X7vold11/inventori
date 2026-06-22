import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTransition({ children }) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState('enter');
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPathRef.current) {
      // Start exit animation
      setTransitionStage('exit');
      prevPathRef.current = location.pathname;

      const exitTimer = setTimeout(() => {
        setDisplayChildren(children);
        setTransitionStage('enter');
      }, 200);

      return () => clearTimeout(exitTimer);
    } else {
      setDisplayChildren(children);
    }
  }, [location.pathname, children]);

  const getStyle = () => {
    if (transitionStage === 'exit') {
      return {
        opacity: 0,
        transform: 'translateY(8px)',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 1, 1)',
      };
    }
    // enter
    return {
      opacity: 1,
      transform: 'translateY(0)',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    };
  };

  return (
    <div style={getStyle()}>
      {displayChildren}
    </div>
  );
}

