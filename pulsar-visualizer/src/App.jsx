import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import PulsarPoints from "/components/PulsarPoints.jsx";
import Controls from "/components/Controls.jsx";

export default function App() {
  const [pulsars, setPulsars] = useState([]);
  const [filters, setFilters] = useState({
    minPeriod: 0.001,
    maxPeriod: 1,
    minDistance: 0,
    maxDistance: 10,
  });

  useEffect(() => {
    fetch("/data/pulsars.json")
      .then((res) => res.json())
      .then(setPulsars)
      .catch(console.error);
  }, []);

  return (
    <>
      <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} />
        <Stars />
        <PulsarPoints pulsars={pulsars} filters={filters} />
        <OrbitControls />
      </Canvas>
      <Controls filters={filters} setFilters={setFilters} />
    </>
  );
}
