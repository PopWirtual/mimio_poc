import { Environment, Html, OrbitControls, Stage, StatsGl } from "@react-three/drei";
import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import ModelAvatar from "./models-component/model-avatar";
import { Canvas, useFrame } from "@react-three/fiber";
import { GLTF } from "three-stdlib";

export type RoomRenderProps = {
  modelsAvatars: GLTF[];
  modelsPositions: THREE.Vector3[];
  emoteIndex :number;
};

const RoomRender = ({ modelsAvatars, modelsPositions,emoteIndex }: RoomRenderProps) => {

  const emotion =["Sad","สวัสดี","รักนะ"]
  useEffect(() => {
    // actions[names[0]]?.reset().fadeIn(0.5).play();
  }, [modelsAvatars, modelsPositions,emoteIndex]);

  const shuffleEmote = () => {
    var _ran = Math.random() * (6- 1) + 1;
    if(_ran>5) return true
    return false;

  };
  return (
    <>
      <Canvas
        style={{ width: "100vw", height: "100vh" }}
        orthographic
        shadows
        dpr={[1, 2]}
        camera={{ position: [10, 10, 10], zoom: 100 }}
        
      >
        <StatsGl />
        <Suspense fallback={null}>
        <Environment preset="city" />
          <Stage
            intensity={0.5}
            // preset="rembrandt"
            shadows={{
              type: "accumulative",
              color: "white",
              colorBlend: 8,
              opacity: 1,
              mapSize: 2048 * 2048,
            }}
            adjustCamera={false}
            environment="city"
            scale={new THREE.Vector3(10, 0, 10)}
            castShadow={true}
            //  position={new THREE.Vector3(10, 10, 10)}
            center={{ disable: true }}
            
          >
            {modelsAvatars?.map((value, index) => (
              <group position={modelsPositions[index]} key={index}>
                {/* <Annotation position={[0, 0, -0]}>
                  <span style={{ fontSize: "1.5em" }}>🌕</span> Aglaia
                </Annotation> */}
                {/* <span style={{ fontSize: '1.5em' }}>🌖</span> */}
                {/* <EmotionUI key={index} ></EmotionUI> */}
                {/* <EmotionUI 
                position={[0,2.4,0]}
                
                >
                  <div className="annotation"></div>
                  <span style={{ fontSize: '.2em' }}>🌖</span>
                </EmotionUI> */}
                <Html
                  
                  // transform
                  occlude
                  position={[-0.2,2.2,.2]}
                >
                  <div className={"annotation"}
                  style={{
                    transition: "all 0.2s",
                    opacity: emoteIndex===index ? 1 : 0,
                     transform: `scale(${emoteIndex===index ? 1 : 0.25})`,
                  }}
                  >
                    <span style={{ fontSize: '5em' }}>🥲 </span>
                    {/* {shuffleEmote()?<><span style={{ fontSize: '5em' }}>🥲 </span></>:<><span style={{ fontSize: '1em' }}>สดใส</span></>} */}
                    </div>
                </Html>
                <ModelAvatar
                  key={index}
                  avatarModel={value.scene}
                  animations={value.animations}
                ></ModelAvatar>
              </group>
            ))}
          </Stage>
        </Suspense>
        <OrbitControls
        makeDefault
        minAzimuthAngle={0}
        maxAzimuthAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 3}
        enableZoom={true}
        enablePan={true}
        zoomSpeed={0.3}
      />
      </Canvas>
    </>
  );
};

function EmotionUI({ children, ...props }: any,isVisible:boolean) {
  const ref = useRef<any>();
  // This holds the local occluded state
  const [isOccluded, setOccluded] = useState(false);
  const [isInRange, setInRange] = useState(true);
  // const isVisible = isInRange && !isOccluded;
  // Test distance
  const vec = new THREE.Vector3();
  useFrame((state) => {
    if (!ref.current) return;
    const range =
      state.camera.position.distanceTo(ref.current.getWorldPosition(vec)) <= 10;
    if (range !== isInRange) setInRange(range);
  });
  return (
    <group ref={ref}>
      {/* <Html
        // 3D-transform contents
        transform
        // Hide contents "behind" other meshes
        occlude
        // Tells us when contents are occluded (or not)
        onOcclude={setOccluded}
        // We just interpolate the visible state into css opacity and transforms
        style={{
          transition: "all 0.2s",
          opacity: isVisible ? 1 : 0,
          transform: `scale(${isVisible ? 1 : 0.25})`,
        }}
        {...props}
      >
        {children}
   
      </Html> */}
       <Html
        {...props}
        transform
        occlude="blending"
        style={{
          transition: "all 0.2s",
          // opacity: isVisible ? 1 : 0,
          transform: `scale(5})`,
          backgroundColor: "transparent"
        }}
       >
        {children}
      </Html>
    </group>
  );
}

export default RoomRender;
