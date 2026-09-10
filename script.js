function drawLobes(ctx, w, h, time = 0) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);

  const pulse = 1 + Math.sin(time * 1.3) * 0.4;
  const cy = h / 2;
  const lobes = [
    { cx: w * 0.32, color: "rgba(90,60,220,0.9)" },
    { cx: w * 0.68, color: "rgba(120,70,230,0.9)" },
  ];

  ctx.globalCompositeOperation = "multiply";
  lobes.forEach(l => {
    const g = ctx.createRadialGradient(l.cx, cy, 0, l.cx, cy, w * 0.3 * pulse);
    g.addColorStop(0, l.color);
    g.addColorStop(0.5, "rgba(200,120,220,0.5)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });
  ctx.globalCompositeOperation = "source-over";
}

function noise(angle, seed) {
  return (
    Math.sin(angle * 3 + seed) * 0.5 +
    Math.sin(angle * 7 + seed * 1.7) * 0.25 +
    Math.sin(angle * 13 + seed * 2.3) * 0.125
  );
}

function drawRipples(ctx, w, h, time = 0) {
  const cx = w / 2, cy = h / 2;
  const rings = 14;
  const maxR = Math.max(w, h) * 0.62;

  ctx.globalCompositeOperation = "screen";

  for (let i = 0; i < rings; i++) {
    const t = ((i / rings) + time * 0.5) % 1;
    const baseR = 40 + t * maxR;
    const hue = 260 - t * 120;
    const alpha = 0.18 * (1 - t) * (1 - Math.abs(0.5 - t));
    ctx.strokeStyle = `hsla(${hue}, 90%, ${60 + t * 30}%, ${alpha})`;
    ctx.lineWidth = 6 + t * 4;

    ctx.beginPath();
    const steps = 120;
    for (let s = 0; s <= steps; s++) {
      const angle = (s / steps) * Math.PI * 2;
      const warp = 1 + noise(angle, i * 1.3 + time * 0.5) * 0.35;
      const rx = baseR * warp;
      const ry = baseR * 0.55 * warp; // flatten -> oval ring
      const x = cx + Math.cos(angle) * rx;
      const y = cy + Math.sin(angle) * ry;
      s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }
  ctx.globalCompositeOperation = "source-over";
}

/* Soften everything with a blur pass, then composite */
function drawFinal(ctx, w, h, time = 0) {
  const off = document.createElement("canvas");
  off.width = w; off.height = h;
  const octx = off.getContext("2d");

  drawLobes(octx, w, h, time);
  drawRipples(octx, w, h, time);

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#f4f4f6";
  ctx.fillRect(0, 0, w, h);

  ctx.filter = "blur(6px)";
  ctx.drawImage(off, 0, 0);
  ctx.filter = "none";

  // extra light bloom pass in the center, gently pulsing
  const bloomR = w * (0.13 + Math.sin(time * 1.3) * 0.015);
  const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, bloomR);
  g.addColorStop(0, "rgba(255,255,255,0.5)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.globalCompositeOperation = "screen";
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = "source-over";
}

/* Animation loop */
const c1 = document.getElementById("c1").getContext("2d");
const c2 = document.getElementById("c2").getContext("2d");
const c3 = document.getElementById("c3").getContext("2d");

drawLobes(c1, 460, 420, 0);

drawLobes(c2, 460, 420, 0);
drawRipples(c2, 460, 420, 0);

let start = null;
function animate(ts) {
  if (start === null) start = ts;
  const time = (ts - start) / 1000; // seconds elapsed
  drawFinal(c3, 460, 420, time);
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);