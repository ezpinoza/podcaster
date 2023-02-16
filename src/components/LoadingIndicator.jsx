import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function LoadingIndicator() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, [location.pathname]);

  if (!loading) {
    return null;
  }

  return (
    <div className="loading-indicator">
      <span>Loading...</span>
    </div>
  );
}

export default LoadingIndicator;
