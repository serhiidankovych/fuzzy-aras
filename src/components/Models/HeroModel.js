import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "./Loader";

const Earth = () => {
  const earth = useGLTF("./models/model.gltf");

  return (
    <primitive object={earth.scene} scale={2.2} position-y={1} rotation-y={1} />
  );
};

const HeroModel = () => {
  return (
    <Canvas
      style={{
        width: "550px",
        height: "400px",
      }}
      shadows
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        near: 0.1,
        far: 500,
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />

        <Preload all />
      </Suspense>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
    </Canvas>
  );
};

export default HeroModel;
