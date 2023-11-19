
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import Loader from "../components/Loader"
import Island from "../models/Island"
const Home = () => {
  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43.4];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -6.5, -43.4];
    }

    return [screenScale, screenPosition];
  };

  const [screenScale, screenPosition] = adjustIslandForScreenSize()

  return (
    <section className="w-full h-screen relative">
     {/*  <div className="absolute top-28 left-0 right-0  z-10 flex
        items-center justify-center">
      

      </div> */}
      <Canvas className="w-full h-screen bg-transparent"
        camera={ {near: 0.1, far: 1000, }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight  />
          <ambientLight  />
          <pointLight  />
          <spotLight  />
          <hemisphereLight  />
          <Island 
            scale={screenScale}
            position={screenPosition}
            rotation={[1, 4.5, 0]}
          />
        </Suspense>
      </Canvas>
    </section>
  )
}

export default Home