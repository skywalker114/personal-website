import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import * as THREE from 'three';

function readModule(file, imports = {}) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, {
    exports, require: id => { if (!(id in imports)) throw Error(id); return imports[id]; },
  });
  return exports;
}
const { layoutCompactLabels, advanceCompactLabel } = readModule('src/lib/compact-label-layout.ts');
const site = readModule('src/content/site.ts');
const { cloudPoints } = readModule('src/content/personal-map.ts', { './site': site });
const points = cloudPoints.filter(point => point.isChapter);
// Measured mobile button boxes, including the larger Harry label and wrapped titles.
for (const [width,height] of [[320,720],[390,844],[430,932]]) {
  const widths = width <= 360 ? [113,106,150,110,133,115,105,79,108,96,150,137,123,112,127,95,113,150,121,114] : [118,112,160,116,141,122,111,83,114,102,160,145,130,118,135,101,119,160,129,121];
  const heights = points.map((_,i) => i===0 ? (width<=360?40:41) : [2,10,17].includes(i) ? (width<=360?57:60) : 36);
  const camera = new THREE.PerspectiveCamera(43,width/height,.1,80);
  const distance = 8.6 * Math.max(1,.92/(width/height));
  const initial = new THREE.Vector3(.26,.2,1).normalize().multiplyScalar(distance);
  const dt = 1/60, bounds = {width,height,top:158,bottom:82};
  let targets = new Map(), displays = new Map(), lastAnchors;
  let maxStep = 0, maximumTargetOverlaps = 0;
  for (let frame=0;frame<2700;frame++) {
    camera.position.copy(initial).applyAxisAngle(new THREE.Vector3(0,1,0),frame*dt*.089);
    camera.lookAt(0,0,0); camera.updateMatrixWorld();
    const anchors = points.map((point,i) => {
      const projected = new THREE.Vector3(...point.position).project(camera);
      return { id:point.id,x:(projected.x*.5+.5)*width+8,y:(-projected.y*.5+.5)*height,width:widths[i],height:heights[i] };
    });
    targets = layoutCompactLabels(anchors,targets,bounds);
    let overlaps=0;
    const boxes=[...targets.values()];
    for(let i=0;i<boxes.length;i++) for(let j=i+1;j<boxes.length;j++) {
      const a=boxes[i],b=boxes[j];
      if(a.x<b.x+b.width && a.x+a.width>b.x && a.y-a.height/2<b.y+b.height/2 && a.y+a.height/2>b.y-b.height/2) overlaps++;
    }
    maximumTargetOverlaps=Math.max(maximumTargetOverlaps,overlaps);
    for (const [id,target] of targets) {
      assert(target.x>=12 && target.x+target.width<=width-12+1e-7,`${width}: horizontal bounds`);
      assert(target.y-target.height/2>=158-1e-7 && target.y+target.height/2<=height-82+1e-7,`${width}: vertical bounds`);
      const previous=displays.get(id),next=advanceCompactLabel(previous,target,dt);
      if(previous) {
        const step=Math.hypot(next.x-previous.x,next.y-previous.y);
        maxStep=Math.max(maxStep,step);
        assert(step<=96*dt+1e-7,`${width}: visible collision jump`);
      }
      displays.set(id,next);
    }
    lastAnchors=anchors;
  }
  for(let frame=0;frame<600;frame++) {
    targets=layoutCompactLabels(lastAnchors,targets,bounds);
    for(const [id,target] of targets) displays.set(id,advanceCompactLabel(displays.get(id),target,dt));
  }
  const stationary = layoutCompactLabels(lastAnchors,targets,bounds);
  for (const [id,position] of stationary) assert(Math.hypot(position.x-targets.get(id).x,position.y-targets.get(id).y)<.1,`${width}: stationary layout keeps changing`);
  for(const [id,target] of stationary) assert(Math.hypot(displays.get(id).x-target.x,displays.get(id).y-target.y)<.1,`${width}: labels do not settle when rotation stops`);
  console.log(`${width}×${height}: 45s rotation, maximum visible step ${maxStep.toFixed(2)}px, maximum overlapping target pairs ${maximumTargetOverlaps}; stationary scene settles.`);
}
// A sudden orbit/zoom correction still cannot teleport a word, including after a slow frame.
for(const delta of [1/120,1/60,1/30,.3]) {
  const next=advanceCompactLabel({x:20,y:200},{x:300,y:600},delta);
  assert(Math.hypot(next.x-20,next.y-200)<=96*Math.min(delta,.05)+1e-7);
}
