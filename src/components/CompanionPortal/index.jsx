import { memo, useRef, lazy, Suspense, useMemo } from "react";
import { Canvas, useFrame} from "@react-three/fiber";
import { Preload, useGLTF, BakeShadows } from '@react-three/drei';
const CompanionPortalModel = lazy(() => import("../../models/companionPortal"));
import PortalCompanionCubeGLTF from '../../assets/3D/cube_companion.glb'

const companionProps = {
    scale: [0.47, 0.47, 0.47],
    position: [0, 0, 3.7],
};

const ModelCompanionCube = memo(() => {
    const { nodes, materials } = useGLTF(PortalCompanionCubeGLTF, true, true);
    const memoizedNodes = useMemo(() => nodes, [nodes]);
    const memoizedMaterials = useMemo(() => materials, [materials]);
    const companionRef = useRef();

    let frameCount = 0;
    useFrame(() => {
        if (++frameCount % 4 !== 0) return; // Update every 4th frame
        if(companionRef.current) companionRef.current.rotation.y += 0.007;
    });

    return (
        <>
            <Suspense fallback={null}>
                <CompanionPortalModel
                    companionRef={companionRef}
                    nodes={memoizedNodes}
                    materials={memoizedMaterials}
                    {...companionProps}
                />
            </Suspense>
        </>
    );
});

const CubePortal = () => {
    const isMobile = window.innerWidth < 768;

    if (isMobile) return null;

    return (
        <Canvas dpr={[1, 1.5]} gl={{ antialias: true }} camera={{ near: 0.1, far: 1000 }} style={{width: '100%'}} >
            <ambientLight intensity={0.8} />
            <directionalLight position={[2, 5, 0]} color={0xB275FB} intensity={0.5} />
            <pointLight position={[-0.5, 0, 4.1]}
                color={0xB275FB}
                intensity={0.2}
                distance={1}
                decay={1}
            />
            <pointLight position={[0.5, 0, 4.1]}
                color={0x4AC0FF}
                intensity={0.2}
                distance={1}
                decay={1}
            />
            <ModelCompanionCube />
            <BakeShadows />
            <Preload all />
        </Canvas>
    )
}

export default memo(CubePortal)