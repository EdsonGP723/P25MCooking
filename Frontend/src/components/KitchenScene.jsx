import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";

// Componente para partículas de vapor que flotan sobre la estufa
function SteamParticles() {
  const count = 5;
  const meshRef = useRef();
  
  // Guardamos las posiciones iniciales y velocidades de cada partícula
  const [particles] = useState(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 0.4,
      y: Math.random() * 1.5,
      z: (Math.random() - 0.5) * 0.4,
      speed: 0.01 + Math.random() * 0.015,
      scale: 0.03 + Math.random() * 0.04
    }));
  });

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.children.forEach((child, index) => {
      const p = particles[index];
      // Elevamos la partícula
      p.y += p.speed;
      // Añadimos un leve bamboleo horizontal (ondulación)
      p.x += Math.sin(p.y * 5) * 0.002;
      
      // Si sube demasiado, la reiniciamos abajo
      if (p.y > 1.8) {
        p.y = 0;
        p.x = (Math.random() - 0.5) * 0.3;
      }
      
      child.position.set(p.x, p.y, p.z);
      // Hacemos que se desvanezca al subir (escala menor)
      const scaleFactor = Math.max(0, 1 - p.y / 1.8) * p.scale;
      child.scale.setScalar(scaleFactor);
    });
  });

  return (
    <group ref={meshRef} position={[-0.5, 1.0, -3.75]}>
      {particles.map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.3} 
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// Componente del gato calicó/moteado en estilo Voxel Art Detallado (Sentado)
function SpottedCat({ position, rotation }) {
  const catRef = useRef();

  // Colores de la paleta del gato calicó
  const colors = {
    white: "#ffffff",
    black: "#2d312e",
    orange: "#d48a55",
    pink: "#fca5a5",
    collar: "#b41340",
    bell: "#e9c46a"
  };

  // Animaciones estilo voxel (bamboleos rítmicos y discretos)
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (catRef.current) {
      // Cola voxel articulada: oscila robóticamente de lado a lado
      const tail = catRef.current.getObjectByName("catTail");
      if (tail) {
        tail.rotation.z = Math.sin(time * 3) * 0.25;
        tail.rotation.x = Math.cos(time * 2) * 0.1;
      }
      // Cabeza voxel: cabeceo ligero y rotación Y
      const head = catRef.current.getObjectByName("catHead");
      if (head) {
        head.rotation.y = Math.sin(time * 1.2) * 0.08;
        head.rotation.x = Math.sin(time * 0.6) * 0.03 + 0.05; // Levemente agachada
        head.position.y = 0.34 + Math.sin(time * 2.4) * 0.006; // Bote rítmico (respiración)
      }
    }
  });

  return (
    <group ref={catRef} position={position} rotation={rotation}>
      {/* ================= PATAS DELANTERAS (De pie) ================= */}
      {/* Pata delantera izquierda (Blanca con garra) */}
      <mesh castShadow receiveShadow position={[0.06, 0.1, 0.05]}>
        <boxGeometry args={[0.04, 0.2, 0.04]} />
        <meshStandardMaterial color={colors.white} roughness={0.8} />
      </mesh>
      <mesh castShadow position={[0.08, 0.015, 0.05]}>
        <boxGeometry args={[0.06, 0.03, 0.04]} />
        <meshStandardMaterial color={colors.white} roughness={0.8} />
      </mesh>

      {/* Pata delantera derecha (Blanca con garra) */}
      <mesh castShadow receiveShadow position={[0.06, 0.1, -0.05]}>
        <boxGeometry args={[0.04, 0.2, 0.04]} />
        <meshStandardMaterial color={colors.white} roughness={0.8} />
      </mesh>
      <mesh castShadow position={[0.08, 0.015, -0.05]}>
        <boxGeometry args={[0.06, 0.03, 0.04]} />
        <meshStandardMaterial color={colors.white} roughness={0.8} />
      </mesh>

      {/* ================= PATAS TRASERAS (Plegadas al sentarse) ================= */}
      {/* Muslo izquierdo (Naranja) */}
      <mesh castShadow receiveShadow position={[-0.06, 0.07, 0.09]}>
        <boxGeometry args={[0.12, 0.14, 0.05]} />
        <meshStandardMaterial color={colors.orange} roughness={0.8} />
      </mesh>
      {/* Garra trasera izquierda (Blanca) */}
      <mesh castShadow position={[-0.02, 0.015, 0.09]}>
        <boxGeometry args={[0.06, 0.03, 0.05]} />
        <meshStandardMaterial color={colors.white} roughness={0.8} />
      </mesh>

      {/* Muslo derecho (Negro) */}
      <mesh castShadow receiveShadow position={[-0.06, 0.07, -0.09]}>
        <boxGeometry args={[0.12, 0.14, 0.05]} />
        <meshStandardMaterial color={colors.black} roughness={0.8} />
      </mesh>
      {/* Garra trasera derecha (Blanca) */}
      <mesh castShadow position={[-0.02, 0.015, -0.09]}>
        <boxGeometry args={[0.06, 0.03, 0.05]} />
        <meshStandardMaterial color={colors.white} roughness={0.8} />
      </mesh>

      {/* ================= CUERPO / TORSO VERTICAL ================= */}
      {/* Torso inferior (Blanco) */}
      <mesh castShadow receiveShadow position={[-0.03, 0.11, 0]}>
        <boxGeometry args={[0.14, 0.14, 0.14]} />
        <meshStandardMaterial color={colors.white} roughness={0.8} />
      </mesh>
      {/* Torso medio (Mancha naranja) */}
      <mesh castShadow receiveShadow position={[-0.03, 0.21, 0]}>
        <boxGeometry args={[0.142, 0.08, 0.142]} />
        <meshStandardMaterial color={colors.orange} roughness={0.8} />
      </mesh>
      {/* Torso superior / Pecho (Blanco) */}
      <mesh castShadow receiveShadow position={[-0.02, 0.28, 0]}>
        <boxGeometry args={[0.13, 0.08, 0.13]} />
        <meshStandardMaterial color={colors.white} roughness={0.8} />
      </mesh>

      {/* Manchas traseras salientes (detalles voxel) */}
      <mesh castShadow position={[-0.105, 0.18, 0.03]}>
        <boxGeometry args={[0.02, 0.08, 0.06]} />
        <meshStandardMaterial color={colors.black} roughness={0.8} />
      </mesh>
      <mesh castShadow position={[-0.105, 0.24, -0.03]}>
        <boxGeometry args={[0.02, 0.06, 0.05]} />
        <meshStandardMaterial color={colors.orange} roughness={0.8} />
      </mesh>

      {/* Pecho esponjoso (Blanco al frente) */}
      <mesh castShadow position={[0.048, 0.24, 0]}>
        <boxGeometry args={[0.02, 0.1, 0.08]} />
        <meshStandardMaterial color={colors.white} roughness={0.8} />
      </mesh>

      {/* ================= COLLAR Y CASCABEL ================= */}
      {/* Collar rojo */}
      <mesh castShadow position={[-0.015, 0.325, 0]}>
        <boxGeometry args={[0.122, 0.02, 0.122]} />
        <meshStandardMaterial color={colors.collar} roughness={0.6} />
      </mesh>
      {/* Cascabel dorado */}
      <mesh castShadow position={[0.05, 0.32, 0]}>
        <boxGeometry args={[0.025, 0.025, 0.025]} />
        <meshStandardMaterial color={colors.bell} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* ================= CABEZA DETALLADA ================= */}
      <group name="catHead" position={[-0.015, 0.34, 0]}>
        {/* Cráneo base */}
        <mesh castShadow position={[0, 0.09, 0]}>
          <boxGeometry args={[0.13, 0.13, 0.13]} />
          <meshStandardMaterial color={colors.white} roughness={0.8} />
        </mesh>

        {/* Mancha negra en la cabeza (lado derecho) */}
        <mesh castShadow position={[-0.01, 0.121, -0.04]}>
          <boxGeometry args={[0.12, 0.072, 0.06]} />
          <meshStandardMaterial color={colors.black} roughness={0.8} />
        </mesh>
        {/* Mancha naranja en la cabeza (lado izquierdo) */}
        <mesh castShadow position={[-0.01, 0.121, 0.04]}>
          <boxGeometry args={[0.12, 0.072, 0.06]} />
          <meshStandardMaterial color={colors.orange} roughness={0.8} />
        </mesh>

        {/* Hocico blanco */}
        <mesh castShadow position={[0.065, 0.06, 0]}>
          <boxGeometry args={[0.02, 0.05, 0.06]} />
          <meshStandardMaterial color={colors.white} roughness={0.8} />
        </mesh>
        {/* Nariz rosa */}
        <mesh position={[0.076, 0.075, 0]}>
          <boxGeometry args={[0.01, 0.012, 0.015]} />
          <meshStandardMaterial color={colors.pink} roughness={0.8} />
        </mesh>

        {/* Ojo Izquierdo (Detallado) */}
        {/* Esclerótica blanca */}
        <mesh position={[0.061, 0.09, 0.035]}>
          <boxGeometry args={[0.004, 0.026, 0.02]} />
          <meshStandardMaterial color={colors.white} roughness={0.5} />
        </mesh>
        {/* Iris verde */}
        <mesh position={[0.062, 0.09, 0.035]}>
          <boxGeometry args={[0.003, 0.02, 0.014]} />
          <meshStandardMaterial color="#4ade80" roughness={0.4} />
        </mesh>
        {/* Pupila negra */}
        <mesh position={[0.063, 0.09, 0.035]}>
          <boxGeometry args={[0.003, 0.014, 0.008]} />
          <meshStandardMaterial color="#000000" roughness={0.1} />
        </mesh>
        {/* Brillo del ojo */}
        <mesh position={[0.064, 0.094, 0.037]}>
          <boxGeometry args={[0.002, 0.004, 0.004]} />
          <meshStandardMaterial color={colors.white} roughness={0.1} />
        </mesh>
        {/* Párpado (Naranja, coincide con su mancha) */}
        <mesh position={[0.063, 0.103, 0.035]}>
          <boxGeometry args={[0.004, 0.006, 0.022]} />
          <meshStandardMaterial color={colors.orange} roughness={0.8} />
        </mesh>

        {/* Ojo Derecho (Detallado) */}
        {/* Esclerótica blanca */}
        <mesh position={[0.061, 0.09, -0.035]}>
          <boxGeometry args={[0.004, 0.026, 0.02]} />
          <meshStandardMaterial color={colors.white} roughness={0.5} />
        </mesh>
        {/* Iris verde */}
        <mesh position={[0.062, 0.09, -0.035]}>
          <boxGeometry args={[0.003, 0.02, 0.014]} />
          <meshStandardMaterial color="#4ade80" roughness={0.4} />
        </mesh>
        {/* Pupila negra */}
        <mesh position={[0.063, 0.09, -0.035]}>
          <boxGeometry args={[0.003, 0.014, 0.008]} />
          <meshStandardMaterial color="#000000" roughness={0.1} />
        </mesh>
        {/* Brillo del ojo */}
        <mesh position={[0.064, 0.094, -0.033]}>
          <boxGeometry args={[0.002, 0.004, 0.004]} />
          <meshStandardMaterial color={colors.white} roughness={0.1} />
        </mesh>
        {/* Párpado (Negro, coincide con su mancha) */}
        <mesh position={[0.063, 0.103, -0.035]}>
          <boxGeometry args={[0.004, 0.006, 0.022]} />
          <meshStandardMaterial color={colors.black} roughness={0.8} />
        </mesh>

        {/* Oreja Izquierda (Naranja por fuera, rosa por dentro) */}
        <mesh castShadow position={[-0.02, 0.175, 0.045]}>
          <boxGeometry args={[0.04, 0.05, 0.03]} />
          <meshStandardMaterial color={colors.orange} roughness={0.8} />
        </mesh>
        <mesh position={[-0.01, 0.175, 0.045]}>
          <boxGeometry args={[0.025, 0.035, 0.01]} />
          <meshStandardMaterial color={colors.pink} roughness={0.8} />
        </mesh>

        {/* Oreja Derecha (Negra por fuera, rosa por dentro) */}
        <mesh castShadow position={[-0.02, 0.175, -0.045]}>
          <boxGeometry args={[0.04, 0.05, 0.03]} />
          <meshStandardMaterial color={colors.black} roughness={0.8} />
        </mesh>
        <mesh position={[-0.01, 0.175, -0.045]}>
          <boxGeometry args={[0.025, 0.035, 0.01]} />
          <meshStandardMaterial color={colors.pink} roughness={0.8} />
        </mesh>

        {/* Bigotes */}
        <mesh position={[0.065, 0.05, 0.06]} rotation={[0, 0.1, 0]}>
          <boxGeometry args={[0.005, 0.008, 0.08]} />
          <meshStandardMaterial color="#b8c1ba" roughness={0.8} />
        </mesh>
        <mesh position={[0.065, 0.05, -0.06]} rotation={[0, -0.1, 0]}>
          <boxGeometry args={[0.005, 0.008, 0.08]} />
          <meshStandardMaterial color="#b8c1ba" roughness={0.8} />
        </mesh>
      </group>

      {/* ================= COLA ARTICULADA ================= */}
      {/* Cola base que sale de atrás */}
      <mesh castShadow position={[-0.1, 0.04, 0]}>
        <boxGeometry args={[0.06, 0.04, 0.04]} />
        <meshStandardMaterial color={colors.white} roughness={0.8} />
      </mesh>

      {/* Grupo de cola que oscila dinámicamente */}
      <group name="catTail" position={[-0.13, 0.04, 0]}>
        {/* Segmento 1 (Subida inclinada - Naranja) */}
        <mesh castShadow position={[-0.03, 0.04, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <boxGeometry args={[0.04, 0.1, 0.04]} />
          <meshStandardMaterial color={colors.orange} roughness={0.8} />
        </mesh>
        {/* Segmento 2 (Subida vertical - Negro) */}
        <mesh castShadow position={[-0.055, 0.12, 0]}>
          <boxGeometry args={[0.04, 0.08, 0.04]} />
          <meshStandardMaterial color={colors.black} roughness={0.8} />
        </mesh>
        {/* Segmento 3 (Punta - Blanca) */}
        <mesh castShadow position={[-0.055, 0.17, 0]}>
          <boxGeometry args={[0.04, 0.04, 0.04]} />
          <meshStandardMaterial color={colors.white} roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}

// El escenario 3D de la cocina
function Kitchen() {
  const groupRef = useRef();

  // Rotación suave y automática de la cocina entera
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Rotación base continua sobre el eje Y (vertical)
      groupRef.current.rotation.y = time * 0.05;
      // Mantenemos X y Z en 0 para que el suelo esté perfectamente horizontal y alineado
      groupRef.current.rotation.x = 0;
      groupRef.current.rotation.z = 0;
    }
  });

  // Colores de la paleta del proyecto (definidos en index.css)
  const colors = {
    primaryDeep: "#3a5a40",      // Verde oscuro de gabinetes inferiores
    primaryMedium: "#588157",    // Verde medio para detalles
    primaryLight: "#84a98c",     // Verde salvia/claro para la nevera
    creamBase: "#f0f4f1",        // Off-white para las paredes
    floorColor: "#cad2c5",       // Color grisáceo/arena para el piso
    woodColor: "#a3704c",        // Madera cálida para repisas y taburete
    counterTop: "#ffffff",       // Mármol/blanco para encimeras
    metal: "#b8c1ba",            // Fregadero, campana, tiradores
    stove: "#1a1c1a",            // Vitrocerámica oscura
  };

  return (
    <group ref={groupRef} rotation={[0, -Math.PI / 4, 0]} position={[0, -0.8, 0]}>
      {/* 1. SUELO */}
      <mesh receiveShadow position={[0, -0.1, 0]}>
        <boxGeometry args={[8, 0.2, 8]} />
        <meshStandardMaterial color={colors.floorColor} roughness={0.8} />
      </mesh>

      {/* 2. PAREDES (Estilo Isométrico en L) */}
      {/* Pared Izquierda */}
      <mesh receiveShadow position={[-4.1, 2.5, 0]}>
        <boxGeometry args={[0.2, 5, 8.2]} />
        <meshStandardMaterial color={colors.creamBase} roughness={0.9} />
      </mesh>
      {/* Pared Derecha (Fondo) */}
      <mesh receiveShadow position={[0, 2.5, -4.1]}>
        <boxGeometry args={[8.2, 5, 0.2]} />
        <meshStandardMaterial color={colors.creamBase} roughness={0.9} />
      </mesh>

      {/* 3. MUEBLES INFERIORES (L-shape) */}
      {/* Mueble del lateral izquierdo */}
      <mesh castShadow receiveShadow position={[-3.1, 0.75, -0.5]}>
        <boxGeometry args={[1.8, 1.5, 7.0]} />
        <meshStandardMaterial color={colors.primaryDeep} roughness={0.5} />
      </mesh>
      {/* Encimera Lateral Izquierdo */}
      <mesh castShadow position={[-3.1, 1.55, -0.5]}>
        <boxGeometry args={[1.9, 0.1, 7.1]} />
        <meshStandardMaterial color={colors.counterTop} roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Mueble del lateral derecho/fondo */}
      <mesh castShadow receiveShadow position={[-0.25, 0.75, -3.1]}>
        <boxGeometry args={[3.9, 1.5, 1.8]} />
        <meshStandardMaterial color={colors.primaryDeep} roughness={0.5} />
      </mesh>
      {/* Encimera Lateral Derecho */}
      <mesh castShadow position={[-0.20, 1.55, -3.1]}>
        <boxGeometry args={[3.9, 0.1, 1.9]} />
        <meshStandardMaterial color={colors.counterTop} roughness={0.2} metalness={0.1} />
      </mesh>

      {/* 4. ELECTRODOMÉSTICOS Y DETALLES */}
      {/* Refrigerador */}
      <group position={[2.5, 1.85, -3.2]}>
        {/* Cuerpo */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.5, 3.7, 1.6]} />
          <meshStandardMaterial color={colors.primaryLight} roughness={0.4} />
        </mesh>
        {/* Puerta superior */}
        <mesh castShadow position={[0, 0.9, 0.82]}>
          <boxGeometry args={[1.4, 1.6, 0.05]} />
          <meshStandardMaterial color={colors.primaryLight} roughness={0.3} />
        </mesh>
        {/* Puerta inferior */}
        <mesh castShadow position={[0, -0.8, 0.82]}>
          <boxGeometry args={[1.4, 1.6, 0.05]} />
          <meshStandardMaterial color={colors.primaryLight} roughness={0.3} />
        </mesh>
        {/* Manijas de la nevera */}
        <mesh position={[-0.5, 0.9, 0.88]}>
          <cylinderGeometry args={[0.03, 0.03, 0.6]} />
          <meshStandardMaterial color={colors.metal} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-0.5, -0.4, 0.88]}>
          <cylinderGeometry args={[0.03, 0.03, 0.6]} />
          <meshStandardMaterial color={colors.metal} metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Estufa (Vitrocerámica) */}
      <mesh position={[-0.5, 1.61, -3.1]}>
        <boxGeometry args={[1.8, 0.02, 1.2]} />
        <meshStandardMaterial color={colors.stove} roughness={0.1} />
      </mesh>
      
      {/* Campana Extractora */}
      <group position={[-0.5, 3.6, -3.1]}>
        {/* Tubo de extracción */}
        <mesh castShadow>
          <cylinderGeometry args={[0.2, 0.2, 1.8, 16]} />
          <meshStandardMaterial color={colors.metal} metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Campana */}
        <mesh castShadow position={[0, -0.8, 0]}>
          <coneGeometry args={[0.9, 0.6, 4]} rotation={[0, Math.PI / 4, 0]} />
          <meshStandardMaterial color={colors.metal} metalness={0.7} roughness={0.3} />
        </mesh>
      </group>

      {/* Fregadero */}
      <group position={[-3.1, 1.61, 0.5]}>
        {/* Fosa */}
        <mesh>
          <boxGeometry args={[1.0, 0.01, 1.5]} />
          <meshStandardMaterial color="#2d312e" roughness={0.5} />
        </mesh>
        {/* Grifo / Faucet */}
        <group position={[-0.4, 0, 0]}>
          {/* Base */}
          <mesh castShadow position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.4]} />
            <meshStandardMaterial color={colors.metal} metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Cuello curvo */}
          <mesh castShadow position={[0.15, 0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.03, 0.03, 0.3]} />
            <meshStandardMaterial color={colors.metal} metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh castShadow position={[0.3, 0.35, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.1]} />
            <meshStandardMaterial color={colors.metal} metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* 5. DECORACIONES Y DETALLES DEL HOGAR */}
      {/* Repisas de Madera en la Pared Izquierda */}
      <group position={[-3.9, 3.2, -0.8]}>
        <mesh castShadow>
          <boxGeometry args={[0.2, 0.1, 3.5]} />
          <meshStandardMaterial color={colors.woodColor} roughness={0.8} />
        </mesh>
        {/* Frasco decorativo 1 */}
        <mesh castShadow position={[0, 0.25, -1.0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.4, 16]} />
          <meshStandardMaterial color="#ccd5ae" transparent opacity={0.8} roughness={0.1} />
        </mesh>
        {/* Frasco decorativo 2 */}
        <mesh castShadow position={[0, 0.25, -0.5]}>
          <cylinderGeometry args={[0.1, 0.1, 0.3, 16]} />
          <meshStandardMaterial color="#faedcd" transparent opacity={0.8} roughness={0.1} />
        </mesh>
        {/* Plantita en maceta */}
        <group position={[0, 0.1, 0.8]}>
          {/* Maceta */}
          <mesh castShadow>
            <cylinderGeometry args={[0.15, 0.1, 0.25]} />
            <meshStandardMaterial color="#d4a373" roughness={0.9} />
          </mesh>
          {/* Hojas */}
          <mesh castShadow position={[0, 0.2, 0]}>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshStandardMaterial color={colors.primaryMedium} roughness={0.9} />
          </mesh>
          <mesh castShadow position={[0.05, 0.15, 0.1]}>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshStandardMaterial color={colors.primaryDeep} roughness={0.9} />
          </mesh>
          {/* Hojas colgantes */}
          <mesh castShadow position={[-0.05, 0.05, 0.15]}>
            <boxGeometry args={[0.08, 0.3, 0.08]} />
            <meshStandardMaterial color={colors.primaryMedium} roughness={0.9} />
          </mesh>
        </group>
      </group>

      {/* Una plantita colgante grande en la esquina */}
      <group position={[-3.8, 4.3, -3.8]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.25, 0.18, 0.35]} />
          <meshStandardMaterial color="#c49a6c" roughness={0.9} />
        </mesh>
        {/* Hojas abundantes */}
        <mesh castShadow position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshStandardMaterial color={colors.primaryMedium} roughness={0.8} />
        </mesh>
        <mesh castShadow position={[0.1, 0, 0.25]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshStandardMaterial color={colors.primaryDeep} roughness={0.8} />
        </mesh>
        <mesh castShadow position={[-0.15, -0.1, 0.2]}>
          <boxGeometry args={[0.1, 0.6, 0.1]} />
          <meshStandardMaterial color={colors.primaryDeep} roughness={0.8} />
        </mesh>
        <mesh castShadow position={[0.2, -0.2, -0.1]}>
          <boxGeometry args={[0.08, 0.5, 0.08]} />
          <meshStandardMaterial color={colors.primaryMedium} roughness={0.8} />
        </mesh>
      </group>

      {/* Sartén/Olla en la estufa */}
      <group position={[-0.5, 1.6, -3.1]}>
        <mesh castShadow position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 24]} />
          <meshStandardMaterial color="#4a5759" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Mango de la olla */}
        <mesh castShadow position={[0.5, 0.18, 0]}>
          <boxGeometry args={[0.4, 0.05, 0.1]} />
          <meshStandardMaterial color={colors.stove} roughness={0.5} />
        </mesh>
      </group>

      {/* Taburete */}
      <group position={[1.2, 0.3, 1.8]}>
        {/* Asiento redondo de madera */}
        <mesh castShadow position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.12, 16]} />
          <meshStandardMaterial color={colors.woodColor} roughness={0.7} />
        </mesh>
        {/* Patas (4 cilindros delgados) */}
        <mesh castShadow position={[-0.3, 0, -0.3]} rotation={[0.1, 0, -0.1]}>
          <cylinderGeometry args={[0.04, 0.02, 0.9]} />
          <meshStandardMaterial color={colors.primaryDeep} roughness={0.6} />
        </mesh>
        <mesh castShadow position={[0.3, 0, -0.3]} rotation={[0.1, 0, 0.1]}>
          <cylinderGeometry args={[0.04, 0.02, 0.9]} />
          <meshStandardMaterial color={colors.primaryDeep} roughness={0.6} />
        </mesh>
        <mesh castShadow position={[-0.3, 0, 0.3]} rotation={[-0.1, 0, -0.1]}>
          <cylinderGeometry args={[0.04, 0.02, 0.9]} />
          <meshStandardMaterial color={colors.primaryDeep} roughness={0.6} />
        </mesh>
        <mesh castShadow position={[0.3, 0, 0.3]} rotation={[-0.1, 0, 0.1]}>
          <cylinderGeometry args={[0.04, 0.02, 0.9]} />
          <meshStandardMaterial color={colors.primaryDeep} roughness={0.6} />
        </mesh>
      </group>

      {/* Gato moteado de estilo Voxel encima del taburete */}
      <SpottedCat position={[1.2, 0.81, 1.8]} rotation={[0, -Math.PI / 6, 0]} />

      {/* Partículas de vapor flotantes */}
      <SteamParticles />
    </group>
  );
}

// Contenedor principal que renderiza el canvas y configura luces, cámara y controles
export default function KitchenScene() {
  return (
    <div className="w-full h-[500px] bg-radial from-surface-container-high/50 to-surface rounded-lg overflow-hidden relative cursor-grab active:cursor-grabbing">
      {/* Botón indicador flotante de interactividad */}
      <div className="absolute bottom-4 left-4 z-10 bg-surface-container-lowest/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-outline-variant/30 text-xs text-on-surface-variant flex items-center gap-1.5 select-none shadow-sm pointer-events-none">
        <svg className="w-3.5 h-3.5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
        <span>Arrastra para rotar la cocina</span>
      </div>

      <Canvas
        shadows
        camera={{ position: [6, 5, 6], fov: 45 }}
        gl={{ antialias: true }}
      >
        {/* Luz ambiente: proporciona una iluminación suave general sin sombras */}
        <ambientLight intensity={0.6} />

        {/* Luz Direccional Principal (Sol): proyecta sombras nítidas */}
        <directionalLight
          castShadow
          position={[5, 8, 5]}
          intensity={1.2}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={20}
          shadow-camera-left={-5}
          shadow-camera-right={5}
          shadow-camera-top={5}
          shadow-camera-bottom={-5}
        />

        {/* Luz de relleno azulada suave del lado opuesto */}
        <directionalLight 
          position={[-4, 3, -4]} 
          intensity={0.4} 
          color="#d8e2dc" 
        />

        {/* Punto de luz cálido focalizado (por ejemplo, luz interior o campana) */}
        <pointLight 
          position={[-0.5, 3.0, -3.1]} 
          intensity={1.0} 
          distance={5} 
          color="#ffefcd" 
        />

        {/* El modelo de la cocina */}
        <Kitchen />

        {/* Sombras de contacto suaves en el piso */}
        <ContactShadows 
          position={[0, -0.9, 0]} 
          opacity={0.6} 
          scale={10} 
          blur={2.5} 
          far={2} 
        />

        {/* Controles para interactuar con el mouse */}
        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          minDistance={4}
          maxDistance={10}
          minPolarAngle={Math.PI / 6} // Evita ver desde abajo del suelo
          maxPolarAngle={Math.PI / 2.2} // Evita ver plano horizontal perfecto
        />
      </Canvas>
    </div>
  );
}
