import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { raDecToCartesian } from "../utils";

export default function PulsarPoints({ pulsars, filters }) {
  const ref = useRef();

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.001;
  });

  const filtered = useMemo(() => {
    return pulsars.filter(
      (p) =>
        p.period >= filters.minPeriod &&
        p.period <= filters.maxPeriod &&
        p.distance >= filters.minDistance &&
        p.distance <= filters.maxDistance
    );
  }, [pulsars, filters]);

  return (
    <group ref={ref}>
      {filtered.map(({ name, ra, dec }) => {
        const [x, y, z] = raDecToCartesian(ra, dec);
        return (
          <mesh key={name} position={[x, y, z]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial emissive="cyan" emissiveIntensity={1} />
          </mesh>
        );
      })}
    </group>
  );
}
