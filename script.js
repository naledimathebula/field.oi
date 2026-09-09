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
    ctx.fillStyle = g;
    ctx.fillRect(0,0,w,h);
    });
    ctx.globalCompositeOperation = "source-over";
}

function noise (angle, seed ){
    return (
        Math.sin(angle * 3 + seed) * 0.5 + 
        Math.sin(angle * 7 + seed * 1.7) * 0.25 +
        Math.sin(angle * 13 + seed * 2.3) * 0.125
    );
}

function drawRipples(ctx, w, h, time = 0) {
    const cx