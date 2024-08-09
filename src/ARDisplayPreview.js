import React, { useEffect } from 'react';

const ARDisplayPreview = () => {
  useEffect(() => {
    const loadScript = (url) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.onload = resolve;
        script.onerror = () => {
          console.error(`Failed to load script: ${url}`);
          reject(new Error(`Failed to load script: ${url}`));
        };
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
      document.querySelectorAll('script[src="/js/aframe.min.js"], script[src="/js/aframe-ar.js"]').forEach(script => {
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
        <a-entity
          gltf-model="url(/path/to/your/model.glb)"
          scale="0.5 0.5 0.5"
          position="0 0 0"
        ></a-entity>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>
  );
};

export default ARDisplayPreview;
