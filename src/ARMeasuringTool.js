import React, { useEffect } from 'react';

const ARMeasuringTool = () => {
  useEffect(() => {
    const loadScript = (url) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const loadScripts = async () => {
      try {
        await loadScript('/js/aframe.min.js');
        await loadScript('/js/aframe-ar.js');
      } catch (error) {
        console.error('Failed to load scripts:', error);
      }
    };

    loadScripts();

    return () => {
      document.querySelectorAll('script[src^="/js/aframe.min.js"], script[src^="/js/aframe-ar.js"]').forEach(script => {
        script.remove();
      });
    };
  }, []);

  return (
    <a-scene
      vr-mode-ui="enabled: false"
      embedded
      arjs="sourceType: webcam; debugUIEnabled: false;"
    >
      <a-marker preset="hiro">
        <a-box position="0 0.5 0" material="color: red;"></a-box>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>
  );
};

export default ARMeasuringTool;
