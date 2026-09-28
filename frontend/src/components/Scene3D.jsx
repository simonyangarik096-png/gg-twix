import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, Center } from '@react-three/drei';
import { Suspense, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

// Առանձին մոդելի կոմպոնենտ — ավտոմատ նորմալացնում է չափը
function Model({
  path,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onClick,
  targetSize = 2  // Ուզած չափը (միավորներով)
}) {
  const { scene } = useGLTF(path);

  // Հաշվում ենք մոդելի չափսը և նորմալացնում
  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);

    // Ամենամեծ չափսը
    const maxDim = Math.max(size.x, size.y, size.z);

    // Հաշվում ենք scale-ը → որ maxDim-ը հավասար լինի targetSize-ին
    return targetSize / maxDim;
  }, [scene, targetSize]);

  return (
    <primitive
      object={scene}
      position={position}
      scale={scale}
      rotation={rotation}
      onClick={onClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    />
  );
}

// Hero-ի scene — լոգոն կենտրոնում
function HeroScene() {
  const navigate = useNavigate();

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={80} color="#FF33FA" />
      <pointLight position={[-5, 5, 5]} intensity={80} color="#0BFFFF" />
      <pointLight position={[0, -5, 5]} intensity={50} color="#ffffff" />

      <Suspense fallback={null}>
        <Center>
          <Model
            path="/models/gg-twix-logo.glb"
            targetSize={2.5}
            onClick={() => navigate('/')}
          />
        </Center>
      </Suspense>

      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={15}
        autoRotate
        autoRotateSpeed={0.5}
      />

      <Environment preset="city" />
    </>
  );
}

// Product-ի scene
function ProductScene({ model = 'logo' }) {
  const navigate = useNavigate();

  const config = {
    tv: {
      path: '/models/tv.glb',
      targetSize: 3,
      onClick: () => window.open('https://youtube.com/@evayanagrigoryans', '_blank')
    },
    console: {
      path: '/models/console.glb',
      targetSize: 3,
      onClick: () => navigate('/game')
    },
    logo: {
      path: '/models/gg-twix-logo.glb',
      targetSize: 2.5,
      onClick: () => navigate('/')
    }
  };

  const current = config[model] || config.logo;

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 7]} intensity={2} />
      <pointLight position={[-5, 2, -3]} intensity={2} color="#FF33FA" />
      <pointLight position={[5, 2, -3]} intensity={2} color="#0BFFFF" />

      <Suspense fallback={null}>
        <Center>
          <Model
            path={current.path}
            targetSize={current.targetSize}
            onClick={current.onClick}
          />
        </Center>
      </Suspense>

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        autoRotate
        autoRotateSpeed={1.5}
        enableZoom={true}
        minDistance={3}
        maxDistance={12}
      />

      <Environment preset="city" />
    </>
  );
}

export default function Scene3D({ height = '100vh', model }) {
  return (
    <div style={{ width: '100%', height }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        {model ? <ProductScene model={model} /> : <HeroScene />}
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/gg-twix-logo.glb');
useGLTF.preload('/models/tv.glb');
useGLTF.preload('/models/console.glb');