import { Stage, useAnimations } from "@react-three/drei";
import React, { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three-stdlib/loaders/GLTFLoader";


type AvatarProps = {
  avatarModel: THREE.Group;
  animations: THREE.AnimationClip[];
};

const ModelAvatar = ({ avatarModel,animations }: AvatarProps) => {
  const { ref, mixer, actions, names } = useAnimations(
    animations,
    avatarModel
  );
  const gltfLoader = new GLTFLoader();

  const LoadAnimation = (_poseURL: string) => {
    gltfLoader.load(_poseURL, (gltf) => {
      var animationAction = mixer?.clipAction((gltf as any).animations[0]);

      // setActiveAction(animationAction);
      if (animationAction) {
        // animationAction?.reset().fadeOut(0.25).stop();
        // animationAction?.reset().fadeIn(0.25).play();
        //setAction(animationAction);
        console.log(_poseURL);
      }
    });
  };


  useEffect(() => {
    actions[names[0]]?.reset().fadeIn(0.25).play();
    console.log(actions[names[0]],  avatarModel);
  }, []);

  return (
    <>
 
                  {/* <div  className={"annotation"}>
                    <span style={{ fontSize: "1.5em" }}>🥲</span>
                  </div> */}
                
      <primitive ref={ref} object={avatarModel} />;
    </>
  );
};

export default ModelAvatar;
