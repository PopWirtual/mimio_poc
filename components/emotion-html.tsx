import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import React, { useRef, useState } from 'react'
import * as THREE from "three";
type Props = {
props : any
}

export const EmotionUIES = (children : any,{props}: Props) => {
    const ref = useRef<any>()
    // This holds the local occluded state
    const [isOccluded, setOccluded] = useState()
    const [isInRange, setInRange] = useState(false)
    const isVisible = isInRange && !isOccluded
    // Test distance
    const vec = new THREE.Vector3()
    useFrame((state) => {
    if(!ref.current) return;
      const range = state.camera.position.distanceTo(ref.current.getWorldPosition(vec)) <= 10
      if (range !== isInRange) setInRange(range)
    })
  return (
    <group ref={ref}>
        <Html
          // 3D-transform contents
          transform
          // Hide contents "behind" other meshes
          occlude
          // Tells us when contents are occluded (or not)
          onOcclude={setOccluded}
          // We just interpolate the visible state into css opacity and transforms
          style={{ transition: 'all 0.2s', opacity: isVisible ? 1 : 0, transform: `scale(${isVisible ? 1 : 0.25})` }}
        //   geometry={
        //     /** The geometry is optional, it allows you to use any shape.
        //      *  By default it would be a plane. We need round edges here ...
        //      */
        //     // <roundedPlaneGeometry args={[1.66, 0.47, 0.24]} />
        //   }
          {...props}>
          {children}
          {/* {children.map((item: any)=><>{item}</>)} */}
          
        </Html>
      </group>
  )
}


// function Annotation({ children, ...props }) {
//     return (
//       <Html
//         {...props}
//         transform
//         occlude="blending"
//         geometry={
//           /** The geometry is optional, it allows you to use any shape.
//            *  By default it would be a plane. We need round edges here ...
//            */
//         //   <roundedPlaneGeometry args={[1.66, 0.47, 0.24]} />
//         }>
//         <div className="annotation">{children}</div>
//       </Html>
//     )
//   }