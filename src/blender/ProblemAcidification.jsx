import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("./model-3d/final.glb");
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Sketchfab_model"
          position={[-2.256, 49.215, 4.378]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group
                name="Cube030_183"
                position={[20.857, -2.88, -9.133]}
                rotation={[-0.428, -1.562, -0.434]}
                scale={[1.01, 0.738, 0.916]}
              />
              <group
                name="Cube146_276"
                position={[17.932, 6.081, -26.997]}
                rotation={[Math.PI / 2, 0, Math.PI / 2]}
                scale={[0.953, 1, 0.953]}
              />
              <group
                name="Cube147_277"
                position={[17.875, 5.503, -25.024]}
                rotation={[Math.PI / 2, 0, Math.PI / 2]}
                scale={[0.953, 1, 0.953]}
              />
              <group
                name="Cube182_176"
                position={[21.899, 16.823, -27.626]}
                rotation={[-3.083, -1.509, -3.088]}
                scale={[1.108, 0.738, 0.916]}
              />
              <group
                name="Cylinder002_192"
                position={[22.554, -4.055, 1.058]}
                rotation={[0, 1.106, 0]}
                scale={[1, 30, 1]}
              />
              <group
                name="Cylinder004_194"
                position={[1.425, 2.947, -40.611]}
                rotation={[0, 0.844, 0]}
                scale={[1, 30, 1]}
              />
              <group
                name="Cylinder010_55"
                position={[34.284, -15.292, -47.859]}
                scale={0.621}
              >
                <mesh
                  name="Object_125"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_125.geometry}
                  material={materials["Sea.Water"]}
                />
              </group>
              <group
                name="Cylinder011_198"
                position={[-3.502, -10.988, -35.299]}
                rotation={[0.172, 0.665, -0.275]}
                scale={[0.583, 17.504, 0.583]}
              />
              <group
                name="Cylinder012_72"
                position={[9.432, 37.089, -26.79]}
                rotation={[-0.452, 0.095, -0.409]}
              />
              <group
                name="Cylinder_190"
                position={[0.013, 2.167, 0.012]}
                scale={[1, 30, 1]}
              />
              <group
                name="Icosphere001_281"
                position={[49.174, -44.729, 12.363]}
                scale={3.146}
              >
                <mesh
                  name="Object_593"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_593.geometry}
                  material={materials["Stone.Small.01"]}
                />
              </group>
              <group
                name="Icosphere002_282"
                position={[39.407, -44.729, 3.347]}
                rotation={[0, -1.461, 0]}
                scale={1.904}
              >
                <mesh
                  name="Object_595"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_595.geometry}
                  material={materials["Stone.Small.01"]}
                />
              </group>
              <group
                name="Icosphere003_283"
                position={[37.654, -47.046, 10.693]}
                rotation={[-1.15, 1.117, 0.46]}
                scale={1.302}
              >
                <mesh
                  name="Object_597"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_597.geometry}
                  material={materials["Stone.Small.02"]}
                />
              </group>
              <group
                name="Icosphere004_284"
                position={[32.533, -47.046, 13.978]}
                rotation={[-0.226, 0.96, 0.831]}
                scale={1.166}
              >
                <mesh
                  name="Object_599"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_599.geometry}
                  material={materials["Stone.Small.02"]}
                />
              </group>
              <group
                name="Icosphere005_285"
                position={[-29.299, -44.729, 12.507]}
                rotation={[-1.271, 0, 0]}
                scale={3.146}
              >
                <mesh
                  name="Object_601"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_601.geometry}
                  material={materials["Stone.Small.01"]}
                />
              </group>
              <group
                name="Icosphere006_286"
                position={[-32.806, -44.729, 7.689]}
                rotation={[Math.PI, -0.742, Math.PI]}
                scale={2.905}
              >
                <mesh
                  name="Object_603"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_603.geometry}
                  material={materials["Stone.Small.02"]}
                />
              </group>
              <group
                name="Icosphere007_287"
                position={[43.733, -46.515, -65.982]}
                rotation={[-0.319, 0.989, -2.128]}
                scale={3.146}
              >
                <mesh
                  name="Object_605"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_605.geometry}
                  material={materials["Stone.Small.01"]}
                />
              </group>
              <group
                name="Icosphere008_288"
                position={[35.363, -44.729, -65.275]}
                rotation={[Math.PI, -0.742, Math.PI]}
                scale={1.901}
              >
                <mesh
                  name="Object_607"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_607.geometry}
                  material={materials["Stone.Small.02"]}
                />
              </group>
              <group
                name="Icosphere009_289"
                position={[31.344, -44.931, -59.108]}
                rotation={[Math.PI, -0.742, Math.PI]}
                scale={2.397}
              >
                <mesh
                  name="Object_609"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_609.geometry}
                  material={materials["Stone.Small.01"]}
                />
              </group>
              <group
                name="Icosphere010_290"
                position={[-29.94, -46.515, -64.684]}
                rotation={[2.313, -0.405, -1.756]}
                scale={3.939}
              >
                <mesh
                  name="Object_611"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_611.geometry}
                  material={materials["Stone.Small.02"]}
                  position={[0.516, 0.117, -0.402]}
                />
              </group>
              <group
                name="Plane015_29"
                position={[-31.926, -46.108, -51.741]}
                rotation={[0, 0.259, -Math.PI / 2]}
              >
                <mesh
                  name="Object_73"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_73.geometry}
                  material={materials["Leaves.000"]}
                />
              </group>
              <group
                name="Plane016_30"
                position={[-32.959, -46.108, -50.55]}
                rotation={[0, 0.259, -Math.PI / 2]}
              >
                <mesh
                  name="Object_75"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_75.geometry}
                  material={materials["Leaves.000"]}
                />
              </group>
              <group
                name="Plane017_31"
                position={[-30.632, -46.108, -48.795]}
                rotation={[0, 0.259, -Math.PI / 2]}
                scale={0.829}
              >
                <mesh
                  name="Object_77"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_77.geometry}
                  material={materials["Leaves.000"]}
                />
              </group>
              <group
                name="Plane018_32"
                position={[-20.503, -46.108, -15.234]}
                rotation={[0, -0.831, -Math.PI / 2]}
              >
                <mesh
                  name="Object_79"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_79.geometry}
                  material={materials["Leaves.000"]}
                />
              </group>
              <group
                name="Plane019_33"
                position={[-22.037, -46.108, -15.6]}
                rotation={[0, -0.831, -Math.PI / 2]}
              >
                <mesh
                  name="Object_81"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_81.geometry}
                  material={materials["Leaves.000"]}
                />
              </group>
              <group
                name="Plane020_34"
                position={[-22.518, -46.108, -12.725]}
                rotation={[0, -0.831, -Math.PI / 2]}
                scale={0.829}
              >
                <mesh
                  name="Object_83"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_83.geometry}
                  material={materials["Leaves.000"]}
                />
              </group>
              <group
                name="Plane021_35"
                position={[-20.4, -46.108, -11.36]}
                rotation={[0, -0.831, -Math.PI / 2]}
              >
                <mesh
                  name="Object_85"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_85.geometry}
                  material={materials["Leaves.000"]}
                />
              </group>
              <group
                name="Plane022_36"
                position={[-22.912, -45.193, -16.296]}
                rotation={[0, 1.323, -Math.PI / 2]}
              >
                <mesh
                  name="Object_87"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_87.geometry}
                  material={materials["Leaves.000"]}
                />
              </group>
              <group
                name="Plane023_37"
                position={[-36.071, -46.708, 11.046]}
                rotation={[0, 0.259, -Math.PI / 2]}
              >
                <mesh
                  name="Object_89"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_89.geometry}
                  material={materials["Leaves.000"]}
                />
              </group>
              <group
                name="Plane024_38"
                position={[-37.104, -46.708, 12.238]}
                rotation={[0, 0.259, -Math.PI / 2]}
              >
                <mesh
                  name="Object_91"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_91.geometry}
                  material={materials["Leaves.000"]}
                />
              </group>
              <group
                name="Plane025_39"
                position={[-34.776, -46.708, 13.993]}
                rotation={[0, 0.259, -Math.PI / 2]}
                scale={0.829}
              >
                <mesh
                  name="Object_93"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_93.geometry}
                  material={materials["Leaves.000"]}
                />
              </group>
              <group
                name="Plane026_40"
                position={[43.97, -46.708, 16.311]}
                rotation={[0, 0.774, -Math.PI / 2]}
              >
                <mesh
                  name="Object_95"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_95.geometry}
                  material={materials["Leaves.000"]}
                />
              </group>
              <group
                name="Plane027_41"
                position={[43.658, -46.708, 17.856]}
                rotation={[0, 0.774, -Math.PI / 2]}
              >
                <mesh
                  name="Object_97"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_97.geometry}
                  material={materials["Leaves.000"]}
                />
              </group>
              <group
                name="Plane028_42"
                position={[46.548, -46.708, 18.238]}
                rotation={[0, 0.774, -Math.PI / 2]}
                scale={0.829}
              >
                <mesh
                  name="Object_99"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_99.geometry}
                  material={materials["Leaves.000"]}
                />
              </group>
              <group
                name="Plane029_43"
                position={[35.702, -46.708, 7.349]}
                rotation={[-Math.PI, 1.486, Math.PI / 2]}
                scale={0.707}
              >
                <mesh
                  name="Object_101"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_101.geometry}
                  material={materials["Leaves.000"]}
                />
              </group>
              <group
                name="Plane030_44"
                position={[36.405, -46.708, 8.215]}
                rotation={[-Math.PI, 1.486, Math.PI / 2]}
                scale={0.707}
              >
                <mesh
                  name="Object_103"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_103.geometry}
                  material={materials["Leaves.000"]}
                />
              </group>
              <group
                name="Plane031_45"
                position={[37.913, -46.708, 6.809]}
                rotation={[-Math.PI, 1.486, Math.PI / 2]}
                scale={0.586}
              >
                <mesh
                  name="Object_105"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_105.geometry}
                  material={materials["Leaves.000"]}
                />
              </group>
              <group
                name="Plane032_46"
                position={[33.705, -46.708, -28.738]}
                rotation={[-Math.PI, -0.077, Math.PI / 2]}
                scale={0.707}
              >
                <mesh
                  name="Object_107"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_107.geometry}
                  material={materials["Leaves.000"]}
                />
              </group>
              <group
                name="Plane033_47"
                position={[34.576, -46.708, -29.435]}
                rotation={[-Math.PI, -0.077, Math.PI / 2]}
                scale={0.707}
              >
                <mesh
                  name="Object_109"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_109.geometry}
                  material={materials["Leaves.000"]}
                />
              </group>
              <group
                name="Plane034_48"
                position={[33.182, -46.708, -30.954]}
                rotation={[-Math.PI, -0.077, Math.PI / 2]}
                scale={0.586}
              >
                <mesh
                  name="Object_111"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_111.geometry}
                  material={materials["Leaves.000"]}
                />
              </group>
              <group
                name="Plane035_49"
                position={[37.87, -46.708, -23.371]}
                rotation={[-Math.PI, 0.211, Math.PI / 2]}
                scale={1.014}
              >
                <mesh
                  name="Object_113"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_113.geometry}
                  material={materials["Leaves.000"]}
                />
              </group>
              <group
                name="Plane036_50"
                position={[39.35, -46.708, -23.973]}
                rotation={[-Math.PI, 0.211, Math.PI / 2]}
                scale={1.014}
              >
                <mesh
                  name="Object_115"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_115.geometry}
                  material={materials["Leaves.000"]}
                />
              </group>
              <group
                name="Plane037_51"
                position={[38.053, -46.708, -26.628]}
                rotation={[-Math.PI, 0.211, Math.PI / 2]}
                scale={0.84}
              >
                <mesh
                  name="Object_117"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_117.geometry}
                  material={materials["Leaves.000"]}
                />
              </group>
              <group
                name="Plane038_52"
                position={[41.152, -46.708, -69.704]}
                rotation={[Math.PI, -0.703, Math.PI / 2]}
                scale={1.014}
              >
                <mesh
                  name="Object_119"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_119.geometry}
                  material={materials["Leaves.000"]}
                />
              </group>
              <group
                name="Plane039_53"
                position={[41.579, -46.708, -71.245]}
                rotation={[Math.PI, -0.703, Math.PI / 2]}
                scale={1.014}
              >
                <mesh
                  name="Object_121"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_121.geometry}
                  material={materials["Leaves.000"]}
                />
              </group>
              <group
                name="Plane040_54"
                position={[38.684, -46.708, -71.838]}
                rotation={[-Math.PI, -0.703, Math.PI / 2]}
                scale={0.84}
              >
                <mesh
                  name="Object_123"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_123.geometry}
                  material={materials["Leaves.000"]}
                />
              </group>
              <group
                name="Plane041_56"
                position={[37.879, -38.111, -5.252]}
                rotation={[0, 0.059, -Math.PI / 2]}
              >
                <mesh
                  name="Object_127"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_127.geometry}
                  material={materials["Material.008"]}
                />
                <mesh
                  name="Object_128"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_128.geometry}
                  material={materials["Material.002"]}
                />
                <mesh
                  name="Object_129"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_129.geometry}
                  material={materials.Roof}
                />
              </group>
              <group
                name="Plane042_57"
                position={[34.284, -34.053, -10.831]}
                rotation={[0.039, 0.017, -1.537]}
              >
                <mesh
                  name="Object_131"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_131.geometry}
                  material={materials["Material.009"]}
                />
                <mesh
                  name="Object_132"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_132.geometry}
                  material={materials["Material.002"]}
                />
                <mesh
                  name="Object_133"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_133.geometry}
                  material={materials.Roof}
                />
              </group>
              <group
                name="Plane043_58"
                position={[36.145, -38.516, -14.28]}
                rotation={[0, 0.031, -Math.PI / 2]}
              >
                <mesh
                  name="Object_135"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_135.geometry}
                  material={materials["Material.008"]}
                />
                <mesh
                  name="Object_136"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_136.geometry}
                  material={materials["Material.002"]}
                />
                <mesh
                  name="Object_137"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_137.geometry}
                  material={materials.Roof}
                />
              </group>
              <group
                name="Plane044_59"
                position={[39.593, -42.168, -17.425]}
                rotation={[0, -0.122, -Math.PI / 2]}
              >
                <mesh
                  name="Object_139"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_139.geometry}
                  material={materials["Material.008"]}
                />
                <mesh
                  name="Object_140"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_140.geometry}
                  material={materials["Material.002"]}
                />
                <mesh
                  name="Object_141"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_141.geometry}
                  material={materials.Roof}
                />
              </group>
              <group
                name="Plane045_60"
                position={[-32.241, -38.111, -30.489]}
                rotation={[-Math.PI, -0.352, Math.PI / 2]}
              >
                <mesh
                  name="Object_143"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_143.geometry}
                  material={materials["Material.008"]}
                />
                <mesh
                  name="Object_144"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_144.geometry}
                  material={materials["Material.002"]}
                />
                <mesh
                  name="Object_145"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_145.geometry}
                  material={materials.Roof}
                />
              </group>
              <group
                name="Plane046_61"
                position={[-26.58, -34.053, -27.023]}
                rotation={[Math.PI, -0.66, Math.PI / 2]}
              >
                <mesh
                  name="Object_147"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_147.geometry}
                  material={materials["Material.008"]}
                />
                <mesh
                  name="Object_148"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_148.geometry}
                  material={materials["Material.002"]}
                />
                <mesh
                  name="Object_149"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_149.geometry}
                  material={materials.Roof}
                />
              </group>
              <group
                name="Plane047_67"
                position={[34.059, -15.201, -45.978]}
                rotation={[-0.983, -0.122, -Math.PI / 2]}
              >
                <mesh
                  name="Object_171"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_171.geometry}
                  material={materials["Material.008"]}
                />
                <mesh
                  name="Object_172"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_172.geometry}
                  material={materials["Material.002"]}
                />
                <mesh
                  name="Object_173"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_173.geometry}
                  material={materials.Roof}
                />
              </group>
              <group
                name="Plane048_62"
                position={[-28.499, -42.168, -18.778]}
                rotation={[Math.PI, -0.318, Math.PI / 2]}
              >
                <mesh
                  name="Object_151"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_151.geometry}
                  material={materials["Material.009"]}
                />
                <mesh
                  name="Object_152"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_152.geometry}
                  material={materials["Material.002"]}
                />
                <mesh
                  name="Object_153"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_153.geometry}
                  material={materials.Roof}
                />
              </group>
              <group
                name="Plane049_63"
                position={[-26.758, -38.516, -23.109]}
                rotation={[Math.PI, -0.561, Math.PI / 2]}
              >
                <mesh
                  name="Object_155"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_155.geometry}
                  material={materials["Material.009"]}
                />
                <mesh
                  name="Object_156"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_156.geometry}
                  material={materials["Material.002"]}
                />
                <mesh
                  name="Object_157"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_157.geometry}
                  material={materials.Roof}
                />
              </group>
              <group
                name="Plane050_64"
                position={[-26.758, -34.642, -17.942]}
                rotation={[Math.PI, -0.74, Math.PI / 2]}
              >
                <mesh
                  name="Object_159"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_159.geometry}
                  material={materials["Material.008"]}
                />
                <mesh
                  name="Object_160"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_160.geometry}
                  material={materials["Material.002"]}
                />
                <mesh
                  name="Object_161"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_161.geometry}
                  material={materials.Roof}
                />
              </group>
              <group
                name="Plane051_65"
                position={[-26.758, -33.526, -50.114]}
                rotation={[Math.PI, -0.071, Math.PI / 2]}
              >
                <mesh
                  name="Object_163"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_163.geometry}
                  material={materials["Material.009"]}
                />
                <mesh
                  name="Object_164"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_164.geometry}
                  material={materials["Material.002"]}
                />
                <mesh
                  name="Object_165"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_165.geometry}
                  material={materials.Roof}
                />
              </group>
              <group
                name="Plane052_66"
                position={[-26.758, -36.462, -62.207]}
                rotation={[Math.PI, -0.809, Math.PI / 2]}
              >
                <mesh
                  name="Object_167"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_167.geometry}
                  material={materials["Material.008"]}
                />
                <mesh
                  name="Object_168"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_168.geometry}
                  material={materials["Material.002"]}
                />
                <mesh
                  name="Object_169"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_169.geometry}
                  material={materials.Roof}
                />
              </group>
              <group
                name="Plane053_68"
                position={[36.213, -8.269, -48.001]}
                rotation={[-0.681, 0.212, -1.068]}
              >
                <mesh
                  name="Object_175"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_175.geometry}
                  material={materials["Material.009"]}
                />
                <mesh
                  name="Object_176"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_176.geometry}
                  material={materials["Material.002"]}
                />
                <mesh
                  name="Object_177"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_177.geometry}
                  material={materials.Roof}
                />
              </group>
              <group
                name="Plane_0"
                position={[10.551, 37.519, -26.692]}
                rotation={[0, 0, -0.607]}
                scale={[1, 1, 1.078]}
              />
              <group
                name="Sand_278"
                position={[7.016, -47.166, -25.549]}
                scale={[1.072, 1, 1.072]}
              >
                <mesh
                  name="Object_587"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_587.geometry}
                  material={materials["Sea.Sand"]}
                />
              </group>
              <group
                name="Sea_279"
                position={[7.016, -18.001, -25.549]}
                scale={[1.072, 1, 1.072]}
              >
                <mesh
                  name="Object_589"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_589.geometry}
                  material={materials["Sea.Water"]}
                />
              </group>
              <group
                name="Sphere001_22"
                position={[-24.632, -18.082, -9.874]}
                scale={0.874}
              />
              <group
                name="Sphere002_23"
                position={[-24.556, -18.082, -2.764]}
                scale={0.874}
              />
              <group
                name="Sphere003_24"
                position={[-19.438, -18.082, 1.024]}
                scale={0.874}
              />
              <group
                name="Sphere_21"
                position={[-21.823, -18.082, -14.052]}
                scale={0.874}
              />
              <group
                name="StoneBig_280"
                position={[9.512, -36.766, -21.172]}
                scale={13.094}
              >
                <mesh
                  name="Object_591"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_591.geometry}
                  material={materials.Stone}
                />
              </group>
              <group
                name="Torus005_70"
                position={[34.284, -16.916, -47.859]}
                scale={4.301}
              >
                <mesh
                  name="Object_181"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_181.geometry}
                  material={materials["Sea.Water"]}
                />
              </group>
              <group
                name="Torus006_71"
                position={[34.284, -16.916, -47.859]}
                scale={6.442}
              >
                <mesh
                  name="Object_183"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_183.geometry}
                  material={materials["Sea.Water"]}
                />
              </group>
              <group
                name="Torus015_69"
                position={[34.284, -16.916, -47.859]}
                scale={5.439}
              >
                <mesh
                  name="Object_179"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_179.geometry}
                  material={materials["Sea.Water"]}
                />
              </group>
            </group>
          </group>
        </group>
        <group
          name="Sketchfab_model002"
          position={[33.056, 6.489, -81.869]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.039}
        >
          <group name="root002">
            <group name="GLTF_SceneRootNode002" rotation={[Math.PI / 2, 0, 0]}>
              <group name="tortle_obj_0" rotation={[Math.PI / 2, 0, 0]}>
                <mesh
                  name="Object_4001"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_4001.geometry}
                  material={materials["Material.005"]}
                  position={[320.233, 1095.895, -143.917]}
                  scale={0.342}
                />
              </group>
            </group>
          </group>
        </group>
        <group
          name="Sketchfab_model003"
          position={[28.812, 15.146, -60.255]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={0.869}
        >
          <group name="Jellyfish_003abccleanermaterialmergergles">
            <group name="Object_2" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Object_3">
                <group name="MorphMainGroup">
                  <mesh
                    name="Jellyfish_003Shape"
                    castShadow
                    receiveShadow
                    geometry={nodes.Jellyfish_003Shape.geometry}
                    material={materials.Jellyfish_003Shape}
                    morphTargetDictionary={
                      nodes.Jellyfish_003Shape.morphTargetDictionary
                    }
                    morphTargetInfluences={
                      nodes.Jellyfish_003Shape.morphTargetInfluences
                    }
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
        <group
          name="Sketchfab_model004"
          position={[18.812, 14.343, -63.65]}
          rotation={[-1.351, 1.049, 1.802]}
          scale={0.869}
        >
          <group name="Jellyfish_003abccleanermaterialmergergles001">
            <group name="Object_2001" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Object_3001">
                <group name="MorphMainGroup001">
                  <mesh
                    name="Jellyfish_003Shape001"
                    castShadow
                    receiveShadow
                    geometry={nodes.Jellyfish_003Shape001.geometry}
                    material={materials.Jellyfish_003Shape}
                    morphTargetDictionary={
                      nodes.Jellyfish_003Shape001.morphTargetDictionary
                    }
                    morphTargetInfluences={
                      nodes.Jellyfish_003Shape001.morphTargetInfluences
                    }
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
        <group
          name="Sketchfab_model005"
          position={[23.494, 19.507, -60.538]}
          rotation={[-1.351, 1.049, 1.802]}
          scale={0.869}
        >
          <group name="Jellyfish_003abccleanermaterialmergergles002">
            <group name="Object_2002" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Object_3002">
                <group name="MorphMainGroup002">
                  <mesh
                    name="Jellyfish_003Shape002"
                    castShadow
                    receiveShadow
                    geometry={nodes.Jellyfish_003Shape002.geometry}
                    material={materials.Jellyfish_003Shape}
                    morphTargetDictionary={
                      nodes.Jellyfish_003Shape002.morphTargetDictionary
                    }
                    morphTargetInfluences={
                      nodes.Jellyfish_003Shape002.morphTargetInfluences
                    }
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
        <group
          name="Sketchfab_model006"
          position={[24.245, 7.458, -64.133]}
          rotation={[-1.351, 1.049, 1.802]}
          scale={0.869}
        >
          <group name="Jellyfish_003abccleanermaterialmergergles003">
            <group name="Object_2003" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Object_3003">
                <group name="MorphMainGroup003">
                  <mesh
                    name="Jellyfish_003Shape003"
                    castShadow
                    receiveShadow
                    geometry={nodes.Jellyfish_003Shape003.geometry}
                    material={materials.Jellyfish_003Shape}
                    morphTargetDictionary={
                      nodes.Jellyfish_003Shape003.morphTargetDictionary
                    }
                    morphTargetInfluences={
                      nodes.Jellyfish_003Shape003.morphTargetInfluences
                    }
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
        <mesh
          name="21488_Tree_Coral_v2_NEW"
          castShadow
          receiveShadow
          geometry={nodes["21488_Tree_Coral_v2_NEW"].geometry}
          material={materials["Material.001"]}
          position={[24.523, 2.201, 24.971]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <group
          name="node_50b38656_7ea4_4dc3_b808_933567f9b616002"
          position={[-4.151, 52.111, 1.739]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.447}
        >
          <group
            name="node_1750b9d8_9033_412e_a00a_78706eaa92b0002"
            position={[0.19, 0.11, 0.255]}
          >
            <group name="node_1197495e_50a1_44d1_964a_feb689156e91">
              <mesh
                name="node_1197495e_50a1_44d1_964a_feb689156e91_mesh0"
                castShadow
                receiveShadow
                geometry={
                  nodes.node_1197495e_50a1_44d1_964a_feb689156e91_mesh0.geometry
                }
                material={materials["Material.025"]}
                position={[2.85, 13.562, 34.052]}
              />
            </group>
          </group>
        </group>
        <group
          name="Sketchfab_model001"
          position={[40.237, 29.183, 1.361]}
          rotation={[2.513, 0.148, -0.273]}
          scale={-12.235}
        >
          <group name="root001">
            <group name="GLTF_SceneRootNode001" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Avid_Waste_Barrel_0">
                <mesh
                  name="Object_4"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_4.geometry}
                  material={materials["Material.003"]}
                />
                <mesh
                  name="Object_4002"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_4002.geometry}
                  material={materials["Material.003"]}
                  position={[6.01, -2.894, -1.607]}
                  rotation={[-0.768, 0.049, 0.448]}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("./model-3d/final.glb");
