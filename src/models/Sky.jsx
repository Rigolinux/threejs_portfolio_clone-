/* eslint-disable react/no-unknown-property */
import { useGLTF } from "@react-three/drei"

import SkyScene from "../assets/3d/sky.glb"
import { useRef } from 'react';
import { useFrame } from "@react-three/fiber";

const Sky = ({isRotating}) => {
    const sky = useGLTF(SkyScene);
    const skyRef = useRef();

    useFrame((_,delta) => {
        if(isRotating) {
            skyRef.current.rotation.y += 0.025 * delta;
        }
    })

  return (
    <mesh ref={skyRef}>
        <primitive object={sky.scene} />
    </mesh>
  )
}

export default Sky