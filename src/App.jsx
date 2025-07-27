import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import './App.css';

// Lazy load heavy components
const Intro = React.lazy(() => import('./components/Intro'));
const Portfolio = React.lazy(() => import('./components/Portfolio'));
const Planets = React.lazy(() => import('./components/Planets'));
const Asteroids = React.lazy(() => import('./components/Asteroids'));

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Loading fallback component
const LoadingFallback = () => (
  <div className="loading-fallback">
    <div className="spinner"></div>
    <p>Loading space...</p>
  </div>
);

// Simple 3D scene component
const Scene = () => (
  <Canvas
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
    }}
    shadows
    camera={{ position: [0, 0, 100], fov: 75 }}
    gl={{ antialias: true }}
  >
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -100, 0]}>
      <planeGeometry args={[1000, 1000]} />
      <shadowMaterial opacity={0.2} />
    </mesh>
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} />
    <Suspense fallback={null}>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
      />
      <Planets />
      <Asteroids />
    </Suspense>
  </Canvas>
);

function App() {
  const [appState, setAppState] = useState({
    showIntro: true,
    isLoading: true,
  });

  useEffect(() => {
    // Simulate loading time for assets
    const loadingTimer = setTimeout(() => {
      setAppState(prev => ({ ...prev, isLoading: false }));
    }, 2000);

    // Auto-hide intro after 10 seconds
    const introTimer = setTimeout(() => {
      setAppState(prev => ({ ...prev, showIntro: false }));
    }, 30000);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(introTimer);
    };
  }, []);

  if (appState.isLoading) {
    return <LoadingFallback />;
  }

  return (
    <ErrorBoundary>
      <div className="App">
        <Scene />
        <div className="content">
          <Suspense fallback={<LoadingFallback />}>
            {appState.showIntro ? <Intro /> : <Portfolio />}
          </Suspense>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;

