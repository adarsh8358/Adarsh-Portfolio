import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Object from './Object'
import { Bloom, EffectComposer, ToneMapping } from '@react-three/postprocessing'

const Animation = () => {
    const speed = 0.8; // Change this value to control speed

    return (
        <>
            <Canvas flat camera={{ fov: 35 }}>
                <OrbitControls />
                <ambientLight />
                <Object speed={speed} />
                <EffectComposer>
                    <Bloom
                        mipmapBlur
                        intensity={5.0}
                        luminanceThreshold={0}
                        luminanceSmoothing={0}
                    />
                    <ToneMapping adaptive />
                </EffectComposer>
            </Canvas>
        </>
    )
}

export default Animation