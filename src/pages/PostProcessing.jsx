import React from "react";
import { EffectComposer, Pixelation } from "@react-three/postprocessing";

const PostProcessing = () => {
  return (
    <EffectComposer>
      <Pixelation granularity={6} />
    </EffectComposer>
  );
};

export default PostProcessing;
