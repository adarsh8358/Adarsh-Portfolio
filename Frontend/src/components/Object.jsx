import React, { useRef } from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

const Object = ({ speed = 1 }) => {
    const tex = useTexture('/designe.png')
    const roti = useRef()

    useFrame((state, delta) => {
        if (roti.current) {
            roti.current.rotation.y += delta * speed
        }
    })

    return (
        <group rotation={[0, 1.4, 0.5]}>
            <mesh ref={roti}>
                <cylinderGeometry args={[1, 1, 1, 60, 60, true]} />
                <meshStandardMaterial map={tex} side={THREE.DoubleSide} />
            </mesh>
        </group>
    )
}

export default Object