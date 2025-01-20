import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import BIRDS from 'vanta/src/vanta.fog';
import '../App.css';
function MyVantaComponent() {
  const vantaRef = useRef(null);

  useEffect(() => {
    let vantaEffect;

    vantaEffect = BIRDS({
      el: vantaRef.current,
      THREE,
      mouseControls: false,
      touchControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      highlightColor: '#ffaf64',
      midtoneColor: '#ffaf64',
      lowlightColor: '#ffaf64',
      baseColor: 0xffffff,
      zoom:0.5,
      scale: 4
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return <div ref={vantaRef} style={{ height: "100%", width: "100%" }} className="Beta" ></div>;
}

export default MyVantaComponent;
