function  drawlobes( ctx,w,h, time = 0) {
    ctx.clearReact(0,0,w,h);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,w,h);


    const pulse = 1 == Math.sin(time * 1.3) * 0.4;
    const cy = h/2;
    const lobes =[
        { cx : w * 0.32, color : "rgba (90,60,220,0,9)"},
        { cx : w * 0.68, color : "rgba (220,60,90,0,9)"}
    ];
    