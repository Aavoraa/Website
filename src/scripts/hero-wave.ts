/**
 * Interactive hero — a flowing 3D ribbon of gold light lines (WebGL, additive anti-aliased line strips).
 *  - lines draw out from the centre on load, then the ribbon twists and undulates continuously
 *  - a pulse of light travels along the ribbon; a fainter ribbon behind adds depth
 *  - the ribbon swells and brightens under the cursor; click / tap sends a ripple through it
 *  - content drifts with the cursor for depth; CTAs are magnetic
 * Pauses off-screen / in hidden tabs. Falls back to a static render without WebGL or with reduced motion.
 * The geometry mirrors scripts/make_ribbon.py (used to render the static fallback image).
 */

const LINES = 72;
const SEGMENTS = 260;

const VERT = `
precision highp float;
attribute vec3 aUVS;         // u: -1..1 along the ribbon, v: 0..1 across it, side: -1 / +1 (strip edge)
uniform float uTime;
uniform float uIntro;
uniform vec2 uRes;           // canvas size in device pixels
uniform float uHalfW;        // half line width in device pixels
uniform float uDv;           // spacing between neighbouring lines in v
uniform vec2 uPtr;           // pointer in NDC
uniform float uPtrAmt;
uniform vec4 uRip[4];        // ripples: x, y (NDC), start time, active
uniform vec2 uMouse;         // -1..1 smoothed, for a gentle camera sway
uniform float uSeed;
uniform float uWidth;
uniform float uYOff;
uniform float uScale;
uniform float uBright;
uniform float uLight;        // 1 = light theme: lines are subtracted from Soft Ivory (gold ink)
varying vec3 vColor;
varying float vSide;

// ribbon surface point projected to NDC, with pointer swell + ripples applied
vec2 ribbon(float u, float v, float t, float amp, out float bump, out float ring) {
  float x = u * 1.95;
  float base = (0.2 * sin(u * 2.1 + t * 0.42 + uSeed) + 0.08 * sin(u * 4.3 - t * 0.55 + uSeed * 2.0)) * amp + 0.08 * u;
  float a = u * 1.75 + t * 0.32 + 0.9 * sin(u * 1.2 - t * 0.23 + uSeed);
  float w = uWidth * (0.72 + 0.28 * sin(u * 2.7 + t * 0.3 + uSeed));
  float o = (v - 0.5) * w;
  vec3 p = vec3(x, base + o * cos(a), o * sin(a));
  p.y += uMouse.y * -0.03;
  p.x += uMouse.x * 0.04 * (1.0 - abs(u));

  float aspect = uRes.x / uRes.y;
  float zc = 2.3 - p.z;
  float ys = clamp(aspect, 0.9, 2.0);
  vec2 ndc = vec2(p.x * 1.42 / zc, p.y * 1.42 / zc * ys) * uScale + vec2(0.0, uYOff);

  vec2 asp = vec2(max(aspect, 0.6), 1.0);
  float d = length((ndc - uPtr) * asp);
  bump = exp(-d * d / 0.035) * uPtrAmt;
  ndc.y += bump * 0.07;
  ring = 0.0;
  for (int i = 0; i < 4; i++) {
    vec4 R = uRip[i];
    float age = t - R.z;
    if (R.w > 0.5 && age > 0.0 && age < 2.6) {
      float dr = length((ndc - R.xy) * asp);
      ring += exp(-pow((dr - age * 0.95) / 0.06, 2.0)) * (1.0 - age / 2.6);
    }
  }
  ndc.y += ring * 0.035;
  return ndc;
}

void main() {
  float u = aUVS.x;
  float v = aUVS.y;
  float side = aUVS.z;
  float t = uTime;
  float amp = mix(0.35, 1.0, uIntro);

  float bump, ring, b2, r2, b3, r3;
  vec2 ndc = ribbon(u, v, t, amp, bump, ring);
  vec2 ndc2 = ribbon(u + 0.006, v, t, amp, b2, r2);
  vec2 ndc3 = ribbon(u, v + uDv, t, amp, b3, r3);

  // expand the centre line into a thin strip, perpendicular to its on-screen direction
  vec2 dir = (ndc2 - ndc) * uRes;
  dir = length(dir) > 1e-5 ? normalize(dir) : vec2(1.0, 0.0);
  vec2 nrm = vec2(-dir.y, dir.x);
  // anti-moiré: where neighbouring lines crowd closer than ~2px, widen each line to fill the gap
  // (and dim it in proportion) so dense areas blend into smooth light instead of interference bands
  float spacing = abs(dot((ndc3 - ndc) * uRes * 0.5, nrm));
  float halfW = max(uHalfW, spacing * 0.75);
  float energy = uHalfW / halfW;
  ndc += nrm * side * halfW * 2.0 / uRes;
  vSide = side;

  // brightness: lines bunch up where the ribbon turns edge-on, so additive blending builds natural highlights
  float ends = 1.0 - smoothstep(0.72, 1.0, abs(u));
  float across = 0.45 + 0.35 * sin(3.14159 * v) + 0.9 * pow(abs(2.0 * v - 1.0), 12.0); // glowing edges
  float reveal = 1.0 - smoothstep(uIntro * 1.15 - 0.18, uIntro * 1.15, abs(u));
  float pulse = exp(-pow(fract(u * 0.5 + 0.5 - t * 0.07) - 0.5, 2.0) / 0.004);
  float alpha = (0.19 + 0.34 * pulse + bump * 0.4 + ring * 0.5) * ends * across * reveal * uBright;

  vec3 gold = vec3(0.788, 0.584, 0.290);
  vec3 hot = vec3(1.0, 0.88, 0.66);
  vec3 deep = vec3(0.55, 0.36, 0.14);
  vec3 col = mix(deep, gold, smoothstep(-0.9, 0.2, u));
  col = mix(col, hot, clamp(pulse * 0.8 + bump * 0.6 + ring * 0.8, 0.0, 1.0));
  // the soft strip edges spread each line over ~2px; keep the energy close to a 1px line
  vec3 lit = col * alpha * 1.05 * energy;
  // light theme: subtract a fixed champagne tint (ivory minus #E9D9BC) — extremely light, and it keeps the
  // same warm hue however many lines overlap (no purple/brown shift)
  vec3 ink = vec3(0.043, 0.090, 0.173);
  vColor = mix(lit, ink * (alpha + pulse * 0.15) * 1.4 * energy, uLight);

  gl_Position = vec4(ndc, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;
varying vec3 vColor;
varying float vSide;
void main() {
  // soft, anti-aliased edge across the strip
  float a = 1.0 - smoothstep(0.25, 1.0, abs(vSide));
  gl_FragColor = vec4(vColor * a, 1.0);
}
`;

const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1);
const easeOut = (x: number) => 1 - Math.pow(1 - clamp01(x), 3);

interface HeroState {
  mx: number; my: number; tmx: number; tmy: number;
  nx: number; ny: number; ptr: number; tptr: number;   // pointer in canvas NDC + presence
  ripples: { x: number; y: number; t: number }[];
  clock: () => number;
}

/* ------------------------------------------------------------------ interactions */
function initInteractions(hero: HTMLElement, canvas: HTMLCanvasElement | null, reduce: boolean): HeroState {
  const t0 = performance.now();
  const state: HeroState = {
    mx: 0, my: 0, tmx: 0, tmy: 0, nx: 0, ny: -0.5, ptr: 0, tptr: 0, ripples: [],
    clock: () => (performance.now() - t0) / 1000 + 6,
  };
  const fine = window.matchMedia('(pointer: fine)').matches;
  const toNdc = (e: PointerEvent) => {
    if (!canvas) return [9, 9];
    const c = canvas.getBoundingClientRect();
    return [((e.clientX - c.left) / c.width) * 2 - 1, 1 - ((e.clientY - c.top) / c.height) * 2];
  };

  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    state.tmx = ((e.clientX - r.left) / r.width) * 2 - 1;
    state.tmy = ((e.clientY - r.top) / r.height) * 2 - 1;
    [state.nx, state.ny] = toNdc(e);
    state.tptr = 1;
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { state.tmx = 0; state.tmy = 0; state.tptr = 0; });

  hero.addEventListener('pointerdown', (e) => {
    if ((e.target as HTMLElement).closest('a, button') || !canvas) return;
    const [x, y] = toNdc(e);
    state.ripples.push({ x, y, t: state.clock() });
    if (state.ripples.length > 4) state.ripples.shift();
  });

  if (fine && !reduce) {
    hero.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--tx', `${((e.clientX - r.left) / r.width - 0.5) * 14}px`);
        el.style.setProperty('--ty', `${((e.clientY - r.top) / r.height - 0.5) * 10}px`);
      });
      el.addEventListener('pointerleave', () => { el.style.setProperty('--tx', '0px'); el.style.setProperty('--ty', '0px'); });
    });

    // CSS parallax for the content layers
    let raf = 0;
    const tick = () => {
      raf = 0;
      const pmx = state.mx, pmy = state.my;
      state.mx += (state.tmx - state.mx) * 0.08;
      state.my += (state.tmy - state.my) * 0.08;
      if (Math.abs(state.mx - pmx) > 0.0005 || Math.abs(state.my - pmy) > 0.0005) {
        hero.style.setProperty('--mx', state.mx.toFixed(3));
        hero.style.setProperty('--my', state.my.toFixed(3));
        raf = requestAnimationFrame(tick);
      }
    };
    hero.addEventListener('pointermove', () => { if (!raf) raf = requestAnimationFrame(tick); }, { passive: true });
    hero.addEventListener('pointerleave', () => { if (!raf) raf = requestAnimationFrame(tick); });
  }
  return state;
}

/* ------------------------------------------------------------------ renderer */
function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader');
  return s;
}

export function initHeroWave() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const canvas = hero?.querySelector<HTMLCanvasElement>('[data-hero-canvas]') || null;
  if (!hero) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const state = initInteractions(hero, canvas, reduce);
  const fallback = () => hero.classList.add('no-gl');
  if (!canvas || reduce) return fallback();

  const gl = canvas.getContext('webgl', { antialias: true, alpha: false, powerPreference: 'low-power' });
  if (!gl) return fallback();

  let prog: WebGLProgram;
  try {
    prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('link');
  } catch {
    return fallback();
  }
  gl.useProgram(prog);

  // Geometry: LINES x SEGMENTS points, each expanded into a 2-vertex strip edge (u, v, side)
  const verts = new Float32Array(LINES * SEGMENTS * 2 * 3);
  const idx = new Uint16Array(LINES * (SEGMENTS - 1) * 6);
  let k = 0, m = 0;
  for (let l = 0; l < LINES; l++) {
    const v = l / (LINES - 1);
    for (let s = 0; s < SEGMENTS; s++) {
      const u = (s / (SEGMENTS - 1)) * 2 - 1;
      verts.set([u, v, -1, u, v, 1], k);
      k += 6;
      if (s < SEGMENTS - 1) {
        const i0 = (l * SEGMENTS + s) * 2;
        idx.set([i0, i0 + 1, i0 + 2, i0 + 1, i0 + 3, i0 + 2], m);
        m += 6;
      }
    }
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);
  const aUVS = gl.getAttribLocation(prog, 'aUVS');
  gl.enableVertexAttribArray(aUVS);
  gl.vertexAttribPointer(aUVS, 3, gl.FLOAT, false, 0, 0);

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE); // additive light

  const U = (n: string) => gl.getUniformLocation(prog, n);
  const uTime = U('uTime'), uIntro = U('uIntro'), uRes = U('uRes'), uHalfW = U('uHalfW'), uDv = U('uDv'), uPtr = U('uPtr'), uPtrAmt = U('uPtrAmt');
  const uRip = U('uRip'), uMouse = U('uMouse'), uSeed = U('uSeed'), uWidth = U('uWidth'), uYOff = U('uYOff');
  const uScale = U('uScale'), uBright = U('uBright'), uLight = U('uLight');

  let dpr = 1;
  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
  };
  new ResizeObserver(resize).observe(canvas);
  resize();

  // Two layers: a faint wide ribbon behind, the main ribbon in front
  const layers = [
    { seed: 2.3, width: 1.1, yOff: -0.46, scale: 0.94, bright: 0.34 },
    { seed: 0.0, width: 0.74, yOff: -0.6, scale: 1.0, bright: 0.8 },
  ];
  // Bloom: a quarter-resolution copy of each frame, blurred and screen-blended by CSS
  const bloom = hero.querySelector<HTMLCanvasElement>('[data-hero-bloom]');
  // Blur happens at low resolution inside the 2D context (smooth when scaled up); skip bloom if unsupported
  let bctx = bloom?.getContext('2d') || null;
  if (bctx && !('filter' in bctx)) {
    bloom?.remove();
    bctx = null;
  }

  const rip = new Float32Array(16);
  const start = state.clock();
  let visible = true;
  let raf = 0;
  let shown = false;

  const frame = () => {
    raf = 0;
    const t = state.clock();
    const local = t - start;
    const mobileNow = canvas.clientWidth < 700;
    // Idle "ghost" swell drifts along the ribbon when nobody is pointing at it (also keeps touch screens lively)
    if (state.tptr === 0) {
      const gx = Math.sin(t * 0.23) * 0.75;
      const gy = (mobileNow ? -0.7 : -0.5) + 0.08 * Math.sin(t * 0.41);
      state.nx += (gx - state.nx) * 0.03;
      state.ny += (gy - state.ny) * 0.03;
    }
    state.ptr += ((state.tptr || (local > 2.4 ? 0.55 : 0)) - state.ptr) * 0.04;
    if (!window.matchMedia('(pointer: fine)').matches) {
      state.mx += (state.tmx - state.mx) * 0.05;
      state.my += (state.tmy - state.my) * 0.05;
    }
    rip.fill(0);
    state.ripples.forEach((r, i) => rip.set([r.x, r.y, r.t, 1], i * 4));

    const mobile = mobileNow;
    const light = document.documentElement.dataset.theme === 'light';
    if (light) {
      gl.clearColor(244 / 255, 240 / 255, 232 / 255, 1);
      gl.blendEquation(gl.FUNC_REVERSE_SUBTRACT); // ivory - line
    } else {
      gl.clearColor(10 / 255, 9 / 255, 9 / 255, 1);
      gl.blendEquation(gl.FUNC_ADD); // black + light
    }
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(uLight, light ? 1 : 0);
    gl.uniform1f(uTime, t);
    gl.uniform1f(uIntro, easeOut((local - 0.1) / 2.4));
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uHalfW, dpr);
    gl.uniform1f(uDv, 1 / (LINES - 1));
    gl.uniform2f(uPtr, state.nx, state.ny);
    gl.uniform1f(uPtrAmt, state.ptr);
    gl.uniform4fv(uRip, rip);
    gl.uniform2f(uMouse, state.mx, state.my);
    for (const L of layers) {
      gl.uniform1f(uSeed, L.seed);
      gl.uniform1f(uWidth, L.width);
      gl.uniform1f(uYOff, L.yOff + (mobile ? -0.16 : 0));
      gl.uniform1f(uScale, L.scale * (mobile ? 1.25 : 1));
      gl.uniform1f(uBright, L.bright);
      gl.drawElements(gl.TRIANGLES, idx.length, gl.UNSIGNED_SHORT, 0);
    }
    if (bloom && bctx) {
      const bw = Math.max(1, Math.round(canvas.width / 4));
      const bh = Math.max(1, Math.round(canvas.height / 4));
      if (bloom.width !== bw || bloom.height !== bh) { bloom.width = bw; bloom.height = bh; }
      bctx.clearRect(0, 0, bw, bh);
      bctx.filter = 'blur(3px)';
      bctx.drawImage(canvas, 0, 0, bw, bh);
      bctx.filter = 'none';
    }

    if (!shown) {
      shown = true;
      hero.classList.add('gl-live');
    }
    if (visible && !document.hidden) raf = requestAnimationFrame(frame);
  };
  const play = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame); };

  new IntersectionObserver(([e]) => { visible = e.isIntersecting; play(); }).observe(hero);
  document.addEventListener('visibilitychange', play);
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); cancelAnimationFrame(raf); fallback(); });
  play();
}
