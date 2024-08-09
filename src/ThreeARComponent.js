import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import FileUpload from './FileUpload'; // Import FileUpload

const ThreeARComponent = () => {
  const [modelUrl, setModelUrl] = useState(null);

  useEffect(() => {
    let camera, scene, renderer, controls;
    let reticle, controller;
    const loader = new GLTFLoader();

    const init = () => {
      // Create the scene
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xeeeeee);

      // Set up the camera
      camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
      scene.add(camera);

      // Set up the renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.xr.enabled = true;
      renderer.xr.setReferenceSpaceType('local'); // Set the reference space type to 'local'
      document.body.appendChild(renderer.domElement);

      // Add AR button
      document.body.appendChild(ARButton.createButton(renderer));

      // Add a light
      const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
      light.position.set(0.5, 1, 0.25);
      scene.add(light);

      // Set up reticle for placing objects
      reticle = new THREE.Mesh(
        new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
        new THREE.MeshBasicMaterial()
      );
      reticle.matrixAutoUpdate = false;
      reticle.visible = false;
      scene.add(reticle);

      // Set up the controller for touch events
      controller = renderer.xr.getController(0);
      controller.addEventListener('select', onSelect);
      scene.add(controller);

      // Set up controls
      controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 1.6, 0);
      controls.update();

      window.addEventListener('resize', onWindowResize, false);
    };

    const onSelect = () => {
      if (modelUrl) {
        loader.load(modelUrl, (gltf) => {
          const model = gltf.scene;
          model.position.setFromMatrixPosition(reticle.matrix);
          model.scale.multiplyScalar(0.5);
          scene.add(model);
        });
      } else {
        const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.setFromMatrixPosition(reticle.matrix);
        mesh.scale.multiplyScalar(0.5);
        scene.add(mesh);
      }
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const animate = () => {
      renderer.setAnimationLoop(render);
    };

    const render = (timestamp, frame) => {
      if (frame) {
        const referenceSpace = renderer.xr.getReferenceSpace();
        const session = renderer.xr.getSession();
        const xrViewerPose = frame.getViewerPose(referenceSpace);

        if (xrViewerPose) {
          const view = xrViewerPose.views[0];
          const viewport = session.renderState.baseLayer.getViewport(view);
          renderer.setSize(viewport.width, viewport.height);
        }
      }

      reticle.visible = false;
      if (frame) {
        const hitTestResults = frame.getHitTestResults(controller);

        if (hitTestResults.length > 0) {
          const hit = hitTestResults[0];
          const referenceSpace = renderer.xr.getReferenceSpace();
          const hitPose = hit.getPose(referenceSpace);

          reticle.visible = true;
          reticle.matrix.fromArray(hitPose.transform.matrix);
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize, false);
      document.body.removeChild(renderer.domElement);
    };
  }, [modelUrl]);

  return (
    <div>
      <FileUpload onUpload={setModelUrl} />
    </div>
  );
};

export default ThreeARComponent;
