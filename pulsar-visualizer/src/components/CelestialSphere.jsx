import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
export default function CelestialSphere() {
  const textureUrl = "../../public/data/SphereTexture.png";
  const texture = useLoader(THREE.TextureLoader, textureUrl);
  return (
    //TODO: Find a more permanent rotation solution than this.
    <mesh rotation={[Math.PI / 3, Math.PI / 1.2, -Math.PI / 2]}>
      <sphereGeometry args={[100, 64, 64]} />
      <meshBasicMaterial
        side={THREE.BackSide}
        map={texture}
        color={"#555555"}
      />
    </mesh>
  );
}
