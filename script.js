document.addEventListener('DOMContentLoaded',()=>{
  if(!window.Matter){document.getElementById('gravity-status').textContent='Engine offline';return}
  const {Engine,Runner,Bodies,Composite,Mouse,MouseConstraint,Body,Events}=Matter;
  const engine=Engine.create();engine.gravity.y=.5;
  const chamber=document.getElementById('physics-container');
  const status=document.getElementById('gravity-status');
  const reading=document.getElementById('gravity-reading');
  const eventCount=document.getElementById('event-count');
  const bodyCount=document.getElementById('body-count');
  const shakeBtn=document.getElementById('btn-shake');
  const gravityBtn=document.getElementById('btn-gravity');
  const resetBtn=document.getElementById('btn-reset');
  let width=chamber.clientWidth,height=chamber.clientHeight,events=0;
  const FLOOR_INSET=88,ROOF_INSET=68; // keep the pile clear of the deck and the header
  const wallOptions={isStatic:true,render:{visible:false}};
  const walls={
    ground:Bodies.rectangle(width/2,height+50-FLOOR_INSET,width*2,100,wallOptions),
    ceiling:Bodies.rectangle(width/2,-50+ROOF_INSET,width*2,100,wallOptions),
    left:Bodies.rectangle(-50,height/2,100,height*2,wallOptions),
    right:Bodies.rectangle(width+50,height/2,100,height*2,wallOptions)
  };
  Composite.add(engine.world,Object.values(walls));
  const specimens=[];
  document.querySelectorAll('.physics-item').forEach((element,index)=>{
    const w=element.offsetWidth,h=element.offsetHeight;
    const usable=Math.max(0,width-w-24);
    const x=Math.min(width-w/2-12,Math.max(w/2+12,12+Math.random()*usable+w/2));
    const y=Math.min(height-h/2-90,96+Math.random()*Math.min(200,height*.25));
    const body=Bodies.rectangle(x,y,w,h,{restitution:.76,friction:.12,frictionAir:.018,density:.035,label:`Specimen ${index+1}`});
    Body.setAngle(body,(Math.random()-.5)*.35);Composite.add(engine.world,body);
    specimens.push({body,element,width:w,height:h});
  });
  bodyCount.textContent=String(specimens.length).padStart(2,'0');
  const mouse=Mouse.create(chamber);mouse.pixelRatio=window.devicePixelRatio||1;
  const mouseConstraint=MouseConstraint.create(engine,{mouse,constraint:{stiffness:.18,render:{visible:false}}});
  Composite.add(engine.world,mouseConstraint);
  Events.on(mouseConstraint,'startdrag',()=>{events++;eventCount.textContent=String(events).padStart(2,'0')});
  const disturb=magnitude=>specimens.forEach(({body})=>{Body.applyForce(body,body.position,{x:(Math.random()-.5)*magnitude,y:(Math.random()-.5)*magnitude});Body.setAngularVelocity(body,(Math.random()-.5)*.35)});
  const updateStatus=()=>{const up=engine.gravity.y<0;status.textContent=up?'Upward pull':'Downward pull';reading.textContent=`${up?'−':'+'}${Math.abs(engine.gravity.y).toFixed(2)} G`;gravityBtn.textContent=up?'Restore gravity':'Reverse gravity';document.body.classList.toggle('gravity-reversed',up)};
  shakeBtn.addEventListener('click',()=>{disturb(.11);events++;eventCount.textContent=String(events).padStart(2,'0');status.textContent='Shaken';setTimeout(updateStatus,700)});
  gravityBtn.addEventListener('click',()=>{engine.gravity.y*=-1;disturb(.035);events++;eventCount.textContent=String(events).padStart(2,'0');updateStatus()});
  const restack=()=>{specimens.forEach(({body,width:w,height:h},i)=>{const cols=4;const x=Math.min(width-w/2-12,Math.max(w/2+12,width*.2+(i%cols)*width*.18));const safeTop=78+h/2;const y=Math.min(height-h/2-90,safeTop+Math.floor(i/cols)*125);Body.setPosition(body,{x,y});Body.setVelocity(body,{x:0,y:0});Body.setAngle(body,(i%2?1:-1)*.035);Body.setAngularVelocity(body,0)});events=0;eventCount.textContent='00';updateStatus()};
  resetBtn.addEventListener('click',restack);
  const runner=Runner.create();Runner.run(runner,engine);
  const sync=()=>{specimens.forEach(({body,element,width:w,height:h})=>{element.style.transform=`translate3d(${body.position.x-w/2}px,${body.position.y-h/2}px,0) rotate(${body.angle}rad)`});requestAnimationFrame(sync)};requestAnimationFrame(sync);
  window.addEventListener('resize',()=>{width=chamber.clientWidth;height=chamber.clientHeight;Body.setPosition(walls.ground,{x:width/2,y:height+50-FLOOR_INSET});Body.setPosition(walls.ceiling,{x:width/2,y:-50+ROOF_INSET});Body.setPosition(walls.left,{x:-50,y:height/2});Body.setPosition(walls.right,{x:width+50,y:height/2})});
  updateStatus();restack();
});
