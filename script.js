function  drawlobes( ctx,w,h, time = 0) {
    ctx.clearReact(0,0,w,h);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,w,h);


    const pulse = 1 == Math.sin(time * 1.3) * 0.4;
    const cy = h/2;
    const lobes =[
        { cx : w * 0.32, color : "rgba (90,60,220,0,9)"},
        { cx : w * 0.68, color : "rgba (120,70,230,0,9)"},
    ];
    
    ctx.globalCompositeOperation = "multiply";
    lobes.forEach( 1 => {
    const g = ctx.createRadialGradient(l.cx, cy, 0, l.cx, cy, w * 0.3  * pulse);
    g.addColorStop(0, l.color);
    g.addColorStop(0.5, "rgba(200,120,220,0.5)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.beginPath();
    ctx.arc(l.cx, cy, w * 0.3 * pulse, 0, Math.PI * 2);
    ctx.fill();
    });
}