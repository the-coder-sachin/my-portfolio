import { useEffect, useRef } from "react";
import "./cursor.css";

const Cursor = () => {
  const ref = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    document.addEventListener("mousemove", move);

    // 👇 physics values (IMPORTANT)
    const followStrength = 0.015; // kitna zor se kheenchna
    const maxAccel = 0.6; // acceleration limit (heavy feel)
    const friction = 0.94; // braking slow ho

    const animate = () => {
      // distance to cursor
      const dx = mouse.current.x - pos.current.x;
      const dy = mouse.current.y - pos.current.y;

      // desired acceleration
      let ax = dx * followStrength;
      let ay = dy * followStrength;

      // acceleration limit (THIS IS THE MAGIC)
      const accMag = Math.hypot(ax, ay);
      if (accMag > maxAccel) {
        ax = (ax / accMag) * maxAccel;
        ay = (ay / accMag) * maxAccel;
      }

      // apply acceleration
      vel.current.x += ax;
      vel.current.y += ay;

      // friction (slow braking)
      vel.current.x *= friction;
      vel.current.y *= friction;

      // move
      pos.current.x += vel.current.x;
      pos.current.y += vel.current.y;

      // speed-based visuals
      const speed = Math.hypot(vel.current.x, vel.current.y);
      const scale = Math.min(1 + speed * 0.025, 2);
      const shadow = Math.min(speed * 2.5, 50);
      const blur = Math.min(speed * 0.2, 15);

      if (ref.current) {
        ref.current.style.transform = `
          translate3d(${pos.current.x - 20}px, ${pos.current.y - 20}px, 0)
          scale(${scale})
        `;
        ref.current.style.boxShadow = `
          0 0 ${25 + shadow}px #ffffff83,
          0 0 ${70 + shadow}px 15px #ffffff83
        `;
        ref.current.style.backdropFilter = `blur(${1.3 + blur}px)`;
      }

      requestAnimationFrame(animate);
    };

    animate();
    return () => document.removeEventListener("mousemove", move);
  }, []);

  return <div ref={ref} className="custom-cursor" />;
};

export default Cursor;
