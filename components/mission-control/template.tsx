import { Fragment } from "react";
import { sx } from "./sx";
import { pseudoClass } from "./pseudo";

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Auto-generated from `Mission Control.dc.html` by scripts/transform_template.py.
 * Renders the design's <x-dc> template as JSX against the `vals` object produced
 * by the engine's renderVals(). Do not edit by hand — re-run the transform.
 */
export function Template(vals: any) {
  return (
    <>



<div style={sx(`font-family: 'Archivo', sans-serif; min-height: 100vh; overflow-x: clip; position: relative;`)}>

  
  <canvas ref={vals.canvasRef} style={sx(`position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: 0; pointer-events: none;`)}></canvas>

  
  <div ref={vals.astroRef} data-mc-astro="" data-idle="0" style={sx(`position: fixed; left: 0; top: 0; z-index: 40; pointer-events: none; will-change: transform; transform: translate3d(-140px, -140px, 0);`)}>
    <div data-astro-body="">
      <svg width="46" height="52" viewBox="0 0 46 52" fill="none" style={sx(`display: block; filter: drop-shadow(0 6px 14px rgba(155,124,255,0.35));`)}>
        <defs><linearGradient id="lg-visor" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FF6EC7"></stop><stop offset="0.5" stopColor="#9B7CFF"></stop><stop offset="1" stopColor="#34E0FF"></stop></linearGradient></defs>
        <rect x="3" y="18" width="9" height="15" rx="3" fill="#9B7CFF" opacity="0.85"></rect>
        <g data-astro-flame=""><path d="M4.5 33 L7.5 44 L10.5 33 Z" fill="#FFC24B"></path><path d="M5.8 33 L7.5 39.5 L9.2 33 Z" fill="#FF6EC7"></path></g>
        <rect x="14" y="38" width="6" height="9" rx="3" fill="#C9D2F0"></rect>
        <rect x="26" y="38" width="6" height="9" rx="3" fill="#C9D2F0"></rect>
        <rect x="10" y="22" width="26" height="19" rx="8" fill="#EDEFF7"></rect>
        <g data-astro-arm=""><rect x="31" y="23" width="12" height="5.5" rx="2.75" fill="#EDEFF7"></rect><circle cx="43" cy="25.5" r="3.2" fill="#C9D2F0"></circle></g>
        <circle cx="23" cy="13" r="12" fill="#EDEFF7"></circle>
        <ellipse cx="25" cy="13.5" rx="8" ry="6.8" fill="url(#lg-visor)"></ellipse>
        <circle cx="28" cy="11" r="2" fill="#FFFFFF" opacity="0.85"></circle>
        <circle cx="16" cy="30" r="2" fill="#4ADE80"></circle>
      </svg>
    </div>
    <div data-astro-shadow="" style={sx(`width: 36px; height: 7px; border-radius: 50%; background: radial-gradient(ellipse, rgba(155,124,255,0.6), transparent 72%); margin: -3px auto 0;`)}></div>
  </div>

  
  <div style={sx(`position: fixed; inset: 0; z-index: 0; pointer-events: none; background: radial-gradient(1100px 640px at 18% 26%, rgba(255,158,184,0.13), transparent 64%); opacity: ${vals.glowRose}; transition: opacity 1.1s ease;`)}></div>
  <div style={sx(`position: fixed; inset: 0; z-index: 0; pointer-events: none; background: radial-gradient(1100px 640px at 82% 30%, rgba(147,162,255,0.14), transparent 64%); opacity: ${vals.glowIris}; transition: opacity 1.1s ease;`)}></div>
  <div style={sx(`position: fixed; inset: 0; z-index: 0; pointer-events: none; background: radial-gradient(1100px 640px at 18% 30%, rgba(255,158,110,0.12), transparent 64%); opacity: ${vals.glowEmber}; transition: opacity 1.1s ease;`)}></div>
  <div style={sx(`position: fixed; inset: 0; z-index: 0; pointer-events: none; background: radial-gradient(1100px 640px at 82% 30%, rgba(110,200,255,0.13), transparent 64%); opacity: ${vals.glowSky}; transition: opacity 1.1s ease;`)}></div>

  
  <div style={sx(`position: fixed; inset: 0; z-index: 1; pointer-events: none; overflow: hidden;`)}>
    <div data-deep-planet="0" style={sx(`position: absolute; left: 50%; top: 50%; width: 540px; height: 540px; margin: -270px 0 0 -270px; border-radius: 50%; background: radial-gradient(circle at 34% 30%, #FFD3DE 0%, #D9A1AE 45%, #8A5560 80%, #4A272F 100%); opacity: 0; will-change: transform, opacity;`)}>
      <span style={sx(`position: absolute; inset: -5%; border-radius: 50%; box-shadow: 0 0 54px 14px rgba(255,158,184,0.28), inset 0 0 26px 6px rgba(255,255,255,0.08);`)}></span>
      <span data-mc-clouds="" style={sx(`position: absolute; inset: 0; border-radius: 50%; overflow: hidden;`)}>
        <span style={sx(`position: absolute; left: -18%; top: 20%; width: 120%; height: 13%; background: rgba(255,255,255,0.22); filter: blur(14px); border-radius: 50%; transform: rotate(-8deg);`)}></span>
        <span style={sx(`position: absolute; left: -8%; top: 54%; width: 128%; height: 10%; background: rgba(255,255,255,0.15); filter: blur(12px); border-radius: 50%; transform: rotate(-5deg);`)}></span>
        <span style={sx(`position: absolute; left: 10%; top: 72%; width: 76%; height: 8%; background: rgba(255,255,255,0.1); filter: blur(10px); border-radius: 50%; transform: rotate(-11deg);`)}></span>
      </span>
      <span style={sx(`position: absolute; inset: -1px; border-radius: 50%; background: radial-gradient(circle at 71% 73%, rgba(5,7,13,0.58), rgba(5,7,13,0) 56%);`)}></span>
    </div>
    <div data-deep-planet="1" style={sx(`position: absolute; left: 50%; top: 50%; width: 560px; height: 560px; margin: -280px 0 0 -280px; border-radius: 50%; background: radial-gradient(circle at 34% 30%, #C7CFFF 0%, #6366F1 50%, #312E81 85%, #171638 100%); opacity: 0; will-change: transform, opacity;`)}>
      <span style={sx(`position: absolute; inset: -5%; border-radius: 50%; box-shadow: 0 0 54px 14px rgba(147,162,255,0.28), inset 0 0 26px 6px rgba(255,255,255,0.08);`)}></span>
      <span data-mc-clouds="" style={sx(`position: absolute; inset: 0; border-radius: 50%; overflow: hidden;`)}>
        <span style={sx(`position: absolute; left: -14%; top: 14%; width: 124%; height: 9%; background: rgba(255,255,255,0.18); filter: blur(12px); border-radius: 50%; transform: rotate(-6deg);`)}></span>
        <span style={sx(`position: absolute; left: -20%; top: 36%; width: 130%; height: 12%; background: rgba(199,207,255,0.2); filter: blur(14px); border-radius: 50%; transform: rotate(-9deg);`)}></span>
        <span style={sx(`position: absolute; left: 0%; top: 64%; width: 96%; height: 9%; background: rgba(255,255,255,0.12); filter: blur(11px); border-radius: 50%; transform: rotate(-7deg);`)}></span>
      </span>
      <span style={sx(`position: absolute; inset: -1px; border-radius: 50%; background: radial-gradient(circle at 71% 73%, rgba(5,7,13,0.58), rgba(5,7,13,0) 56%);`)}></span>
    </div>
    <div data-deep-planet="2" style={sx(`position: absolute; left: 50%; top: 50%; width: 520px; height: 520px; margin: -260px 0 0 -260px; border-radius: 50%; background: radial-gradient(circle at 34% 30%, #FFE4C9 0%, #E8956D 50%, #9A4515 85%, #46200C 100%); opacity: 0; will-change: transform, opacity;`)}>
      <span style={sx(`position: absolute; inset: -5%; border-radius: 50%; box-shadow: 0 0 54px 14px rgba(255,158,110,0.28), inset 0 0 26px 6px rgba(255,255,255,0.08);`)}></span>
      <span data-mc-clouds="" style={sx(`position: absolute; inset: 0; border-radius: 50%; overflow: hidden;`)}>
        <span style={sx(`position: absolute; left: -16%; top: 24%; width: 122%; height: 11%; background: rgba(255,228,201,0.24); filter: blur(13px); border-radius: 50%; transform: rotate(-7deg);`)}></span>
        <span style={sx(`position: absolute; left: -6%; top: 48%; width: 118%; height: 14%; background: rgba(154,69,21,0.35); filter: blur(15px); border-radius: 50%; transform: rotate(-5deg);`)}></span>
        <span style={sx(`position: absolute; left: 8%; top: 70%; width: 82%; height: 8%; background: rgba(255,255,255,0.1); filter: blur(10px); border-radius: 50%; transform: rotate(-10deg);`)}></span>
      </span>
      <span style={sx(`position: absolute; inset: -1px; border-radius: 50%; background: radial-gradient(circle at 71% 73%, rgba(5,7,13,0.58), rgba(5,7,13,0) 56%);`)}></span>
    </div>
    <div data-deep-planet="3" style={sx(`position: absolute; left: 50%; top: 50%; width: 550px; height: 550px; margin: -275px 0 0 -275px; border-radius: 50%; background: radial-gradient(circle at 34% 30%, #D6ECFF 0%, #6EC8FF 50%, #1E4E7A 85%, #0D2438 100%); opacity: 0; will-change: transform, opacity;`)}>
      <span style={sx(`position: absolute; inset: -5%; border-radius: 50%; box-shadow: 0 0 54px 14px rgba(110,200,255,0.28), inset 0 0 26px 6px rgba(255,255,255,0.08);`)}></span>
      <span data-mc-clouds="" style={sx(`position: absolute; inset: 0; border-radius: 50%; overflow: hidden;`)}>
        <span style={sx(`position: absolute; left: -12%; top: 18%; width: 120%; height: 10%; background: rgba(255,255,255,0.2); filter: blur(12px); border-radius: 50%; transform: rotate(-8deg);`)}></span>
        <span style={sx(`position: absolute; left: -18%; top: 46%; width: 128%; height: 11%; background: rgba(214,236,255,0.16); filter: blur(13px); border-radius: 50%; transform: rotate(-6deg);`)}></span>
      </span>
      <span style={sx(`position: absolute; inset: -1px; border-radius: 50%; background: radial-gradient(circle at 71% 73%, rgba(5,7,13,0.58), rgba(5,7,13,0) 56%);`)}></span>
      <span style={sx(`position: absolute; left: -18%; right: -18%; top: 50%; height: 26%; margin-top: -13%; border: 2.5px solid rgba(110,200,255,0.4); border-radius: 50%; transform: rotate(-14deg);`)}></span>
    </div>
  </div>

  
  <canvas ref={vals.canvasFxRef} style={sx(`position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: 1; pointer-events: none;`)}></canvas>

  
  <div data-mc-boost="" style={sx(`position: fixed; right: 26px; top: 50%; transform: translateY(-50%); z-index: 60; display: flex; flex-direction: column; align-items: center; gap: 12px; opacity: 0; transition: opacity 0.35s ease; pointer-events: none;`)}>
    <svg data-mc-boost-rocket="" width="24" height="29" viewBox="0 0 64 88" fill="none" style={sx(`filter: drop-shadow(0 0 10px rgba(155,124,255,0.6)); will-change: transform;`)}><path d="M32 4 C42 14 46 28 46 44 L46 62 L18 62 L18 44 C18 28 22 14 32 4 Z" fill="#EDEFF7"></path><path d="M18 46 L6 66 L18 62 Z" fill="#FF6EC7"></path><path d="M46 46 L58 66 L46 62 Z" fill="#FF6EC7"></path></svg>
    <div data-mc-boost-bar="" style={sx(`position: relative; width: 13px; height: 38vh; border: 1px solid rgba(147,162,255,0.45); border-radius: 999px; background: rgba(11,15,26,0.8); overflow: hidden; box-shadow: 0 0 18px -6px rgba(155,124,255,0.5); transition: box-shadow 0.2s ease;`)}>
      <div data-mc-boost-fill="" style={sx(`position: absolute; left: 0; right: 0; bottom: 0; height: 0%; background: linear-gradient(180deg, #34E0FF, #9B7CFF, #FF6EC7); border-radius: 999px; transition: height 0.24s cubic-bezier(0.34,1.56,0.64,1);`)}></div>
    </div>
    <div data-mc-boost-pct="" style={sx(`font-family: 'Martian Mono', monospace; font-size: 11px; font-weight: 600; color: #EDEFF7; text-shadow: 0 2px 8px rgba(5,7,13,0.9);`)}>0%</div>
    <div data-mc-boost-label="" style={sx(`font-family: 'Martian Mono', monospace; font-size: 8px; letter-spacing: 0.16em; line-height: 1.7; color: rgba(237,239,247,0.85); width: 88px; text-align: center; text-shadow: 0 2px 8px rgba(5,7,13,0.9); transition: color 0.3s ease;`)}>SCROLL TO CHARGE BOOSTERS</div>
  </div>

  
  <div data-dive-clouds="" style={sx(`position: fixed; inset: 0; z-index: 140; pointer-events: none; opacity: 0; transition: opacity 0.3s ease;`)}>
    <div data-dive-cloud="-0.5,-0.22,0" style={sx(`position: absolute; left: 50%; top: 46%; width: 46vw; height: 24vh; margin: -12vh 0 0 -23vw; border-radius: 50%; background: radial-gradient(closest-side, rgba(255,240,244,0.95), rgba(253,232,238,0.5) 60%, transparent); filter: blur(14px); will-change: transform, opacity; opacity: 0;`)}></div>
    <div data-dive-cloud="0.55,-0.3,0.08" style={sx(`position: absolute; left: 50%; top: 44%; width: 40vw; height: 20vh; margin: -10vh 0 0 -20vw; border-radius: 50%; background: radial-gradient(closest-side, rgba(255,236,241,0.9), rgba(233,197,206,0.45) 60%, transparent); filter: blur(16px); will-change: transform, opacity; opacity: 0;`)}></div>
    <div data-dive-cloud="-0.62,0.32,0.15" style={sx(`position: absolute; left: 50%; top: 50%; width: 52vw; height: 26vh; margin: -13vh 0 0 -26vw; border-radius: 50%; background: radial-gradient(closest-side, rgba(253,232,238,0.9), rgba(217,161,174,0.4) 62%, transparent); filter: blur(18px); will-change: transform, opacity; opacity: 0;`)}></div>
    <div data-dive-cloud="0.6,0.36,0.1" style={sx(`position: absolute; left: 50%; top: 52%; width: 44vw; height: 22vh; margin: -11vh 0 0 -22vw; border-radius: 50%; background: radial-gradient(closest-side, rgba(255,240,244,0.92), rgba(233,197,206,0.42) 60%, transparent); filter: blur(15px); will-change: transform, opacity; opacity: 0;`)}></div>
    <div data-dive-cloud="0,-0.58,0.2" style={sx(`position: absolute; left: 50%; top: 42%; width: 58vw; height: 24vh; margin: -12vh 0 0 -29vw; border-radius: 50%; background: radial-gradient(closest-side, rgba(255,244,247,0.9), rgba(253,232,238,0.4) 65%, transparent); filter: blur(20px); will-change: transform, opacity; opacity: 0;`)}></div>
    <div data-dive-cloud="0.04,0.62,0.05" style={sx(`position: absolute; left: 50%; top: 54%; width: 60vw; height: 26vh; margin: -13vh 0 0 -30vw; border-radius: 50%; background: radial-gradient(closest-side, rgba(253,236,241,0.92), rgba(217,161,174,0.45) 62%, transparent); filter: blur(19px); will-change: transform, opacity; opacity: 0;`)}></div>
  </div>

  
  <div style={sx(`position: fixed; inset: 0; z-index: 150; pointer-events: none; background: ${vals.warpBg}; opacity: ${vals.warpOp}; transition: opacity 0.75s ease;`)}></div>

  
  {(vals.bootVisible) ? (<>
    <div style={sx(`position: fixed; inset: 0; z-index: 200; background: #05070D; display: flex; align-items: center; justify-content: center; opacity: ${vals.bootOpacity}; transition: opacity 0.6s ease;`)} data-screen-label="Boot sequence">
      <div style={sx(`width: min(560px, calc(100vw - 48px)); font-family: 'Martian Mono', monospace; font-size: 11.5px; line-height: 2.1; letter-spacing: 0.02em; opacity: ${vals.bootLinesOpacity}; transition: opacity 0.5s ease;`)}>
        {(vals.bootLinesShown).map((bl: any, _mci0: number) => (<Fragment key={_mci0}>
          <div style={sx(`color: ${bl.color}; white-space: pre-wrap;`)}>{bl.text}</div>
        </Fragment>))}
        {(vals.bootTyping) ? (<><span style={sx(`color: #4ADE80; animation: mc-caret 0.9s step-end infinite;`)}>▌</span></>) : null}
      </div>
      {(vals.bootFlash) ? (<>
        <div style={sx(`position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; background: rgba(5,7,13,0.72); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);`)}>
          <div style={sx(`font-family: 'Archivo Black', sans-serif; font-size: clamp(40px, 8vw, 96px); line-height: 1; background: linear-gradient(92deg, #FF6EC7 5%, #9B7CFF 48%, #34E0FF 95%); -webkit-background-clip: text; background-clip: text; color: transparent; animation: mc-wordmark 0.8s cubic-bezier(0.16,1,0.3,1) both;`)}>FLIGHT OPS</div>
          <div style={sx(`font-family: 'Martian Mono', monospace; font-size: 11px; letter-spacing: 0.3em; color: rgba(237,239,247,0.65); animation: mc-rise 0.7s ease 0.25s both;`)}>TOBIAS — SYDNEY · GO FOR LAUNCH</div>
        </div>
      </>) : null}
      <button onClick={vals.skipBoot} style={sx(`position: absolute; bottom: 26px; right: 28px; background: none; border: 1px solid rgba(237,239,247,0.25); color: rgba(237,239,247,0.6); font-family: 'Martian Mono', monospace; font-size: 10px; letter-spacing: 0.2em; padding: 8px 14px; cursor: pointer; border-radius: 3px;`)} className={pseudoClass(`border-color: rgba(237,239,247,0.6); color: #EDEFF7;`)}>SKIP ▸</button>
    </div>
  </>) : null}

  
  <div style={sx(`position: relative; z-index: 2;`)}>

    
    <header data-mc-pad="" style={sx(`position: sticky; top: 0; z-index: 50; display: flex; align-items: center; gap: 24px; padding: 13px 36px; background: rgba(5,7,13,0.78); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid rgba(147,162,255,0.14);`)} data-screen-label="HUD bar">
      <a href="#top" style={sx(`font-family: 'Martian Mono', monospace; font-size: 11px; letter-spacing: 0.18em; font-weight: 600; text-decoration: none; color: #EDEFF7;`)}>FLIGHT OPS<span style={sx(`color: #9B7CFF;`)}> — TOBIAS</span></a>
      <nav data-mc-nav="" style={sx(`display: flex; gap: 18px; margin-left: auto; font-family: 'Martian Mono', monospace; font-size: 9.5px; letter-spacing: 0.14em;`)}>
        {(vals.navItems).map((nv: any, _mci1: number) => (<Fragment key={_mci1}>
          <a href={nv.href} style={sx(`text-decoration: none; display: flex; align-items: center; gap: 7px; color: ${nv.color}; transition: color 0.4s ease;`)}>
            <span style={sx(`width: 5px; height: 5px; border-radius: 50%; background: ${nv.dot}; transition: background 0.4s ease;`)}></span>{nv.label}
          </a>
        </Fragment>))}
      </nav>
      <div data-mc-hidemobile="" style={sx(`display: flex; align-items: center; gap: 7px; font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.14em; color: rgba(237,239,247,0.6); border: 1px solid rgba(147,162,255,0.22); padding: 6px 10px; border-radius: 3px; white-space: nowrap;`)}>
        SHIP PARTS
        {(vals.partDots).map((pd: any, _mci2: number) => (<Fragment key={_mci2}>
          <span style={sx(`width: 7px; height: 7px; border-radius: 2px; background: ${pd.bg}; box-shadow: ${pd.glow}; transition: all 0.4s ease;`)}></span>
        </Fragment>))}
        {vals.partsCount}/4
      </div>
      <a href="mailto:tobiasnorman1@gmail.com" style={sx(`display: flex; align-items: center; gap: 7px; margin-left: auto; font-family: 'Martian Mono', monospace; font-size: 9.5px; letter-spacing: 0.16em; border: 1px solid rgba(74,222,128,0.4); color: #4ADE80; padding: 6px 11px; border-radius: 3px; white-space: nowrap; text-decoration: none;`)} className={pseudoClass(`background: rgba(74,222,128,0.08); color: #4ADE80;`)}>
      <span style={sx(`width: 6px; height: 6px; border-radius: 50%; background: #4ADE80; animation: mc-pulse 2.2s ease-in-out infinite;`)}></span>
      OPEN TO ROLES</a>
    </header>

    
    <section id="top" data-fly-sec="" data-mc-seen={vals.heroSeen} style={sx(`position: relative; overflow: hidden;`)} data-screen-label="Hero">
      <div style={sx(`position: absolute; inset: 0; pointer-events: none; opacity: ${vals.auroraOpacity};`)}>
        <div style={sx(`position: absolute; width: 520px; height: 520px; border-radius: 50%; background: radial-gradient(circle, rgba(255,110,199,0.32), transparent 70%); left: -6%; top: -18%; animation: mc-drift-a 21s ease-in-out infinite alternate;`)}></div>
        <div style={sx(`position: absolute; width: 480px; height: 480px; border-radius: 50%; background: radial-gradient(circle, rgba(155,124,255,0.3), transparent 70%); right: 10%; top: -22%; animation: mc-drift-b 25s ease-in-out infinite alternate;`)}></div>
        <div style={sx(`position: absolute; width: 440px; height: 440px; border-radius: 50%; background: radial-gradient(circle, rgba(52,224,255,0.22), transparent 70%); left: 38%; bottom: -30%; animation: mc-drift-c 28s ease-in-out infinite alternate;`)}></div>
      </div>

      <div data-mc-hero="" data-mc-pad="" style={sx(`position: relative; display: grid; grid-template-columns: minmax(0, 1fr) 360px; gap: 56px; padding: 84px 36px 56px; max-width: 1380px; margin: 0 auto; box-sizing: border-box; align-items: start;`)}>
        <div style={sx(`display: flex; flex-direction: column; gap: 26px; min-width: 0;`)}>
          <div data-st="" style={sx(`display: flex; align-items: center; gap: 12px; font-family: 'Martian Mono', monospace; font-size: 10px; letter-spacing: 0.22em; color: rgba(237,239,247,0.6); animation-delay: 0.05s;`)}>
            <span style={sx(`width: 22px; height: 1px; background: linear-gradient(90deg, #FF6EC7, #34E0FF);`)}></span>
            MISSION: CUSTOMER SUCCESS → AI PRODUCT
          </div>
          <h1 style={sx(`margin: 0; font-family: 'Archivo Black', sans-serif; font-size: clamp(40px, 6.6vw, 96px); line-height: 0.98; letter-spacing: -0.01em; text-transform: uppercase;`)}>
            <span data-st="" style={sx(`display: block; animation-delay: 0.12s;`)}>I turn customer</span>
            <span data-st="" style={sx(`display: block; animation-delay: 0.22s;`)}>problems into</span>
            <span data-st="" style={sx(`display: block; animation-delay: 0.32s;`)}><span style={sx(`background: linear-gradient(92deg, #FF6EC7 5%, #9B7CFF 48%, #34E0FF 95%); -webkit-background-clip: text; background-clip: text; color: transparent;`)}>shipped</span> product.<span data-astro-perch="" style={sx(`display: inline-block; width: 64px; height: 10px;`)}></span></span>
          </h1>
          <p data-st="" style={sx(`margin: 0; max-width: 52ch; font-size: 17.5px; line-height: 1.65; color: rgba(237,239,247,0.75); animation-delay: 0.42s;`)}>Six years in enterprise customer success taught me why products get adopted — or quietly abandoned. In the last six months I shipped four AI products end-to-end. All four are live on this page. <span style={sx(`color: #EDEFF7; font-weight: 600;`)}>Click anything.</span></p>
          <div data-st="" style={sx(`display: flex; flex-wrap: wrap; gap: 12px; align-items: center; animation-delay: 0.52s;`)}>
            <a href="mailto:tobiasnorman1@gmail.com" style={sx(`text-decoration: none; background: #EDEFF7; color: #05070D; font-size: 14px; font-weight: 700; padding: 14px 26px; border-radius: 4px; box-shadow: 0 0 34px -8px rgba(155,124,255,0.65); transition: transform 0.15s ease, box-shadow 0.2s ease;`)} className={pseudoClass(`transform: translateY(-2px); box-shadow: 0 0 46px -6px rgba(255,110,199,0.75); color: #05070D;`)}>Email me</a>
            <a href="https://www.linkedin.com/in/tobias-norman-66908115a" target="_blank" rel="noopener noreferrer" style={sx(`text-decoration: none; border: 1px solid rgba(237,239,247,0.28); color: #EDEFF7; font-size: 14px; font-weight: 600; padding: 13px 24px; border-radius: 4px; transition: border-color 0.2s ease, transform 0.15s ease;`)} className={pseudoClass(`border-color: #34E0FF; color: #34E0FF; transform: translateY(-2px);`)}>LinkedIn ↗</a>
            <a href="https://github.com/tobias-shaun" target="_blank" rel="noopener noreferrer" style={sx(`text-decoration: none; border: 1px solid rgba(237,239,247,0.28); color: #EDEFF7; font-size: 14px; font-weight: 600; padding: 13px 24px; border-radius: 4px; transition: border-color 0.2s ease, transform 0.15s ease;`)} className={pseudoClass(`border-color: #FF6EC7; color: #FF6EC7; transform: translateY(-2px);`)}>GitHub ↗</a>
          </div>
        </div>

        
        <aside data-st="" data-astro-perch="" data-solid="" style={sx(`align-self: start; position: relative; background: rgba(11,15,26,0.82); border: 1px solid rgba(147,162,255,0.2); border-radius: 8px; padding: 22px 22px 18px; font-family: 'Martian Mono', monospace; font-size: 11px; line-height: 1.9; box-shadow: 0 0 60px -24px rgba(155,124,255,0.4); animation-delay: 0.5s;`)}>
        <div style={sx(`position: absolute; top: 0; left: 16px; right: 16px; height: 1px; background: linear-gradient(90deg, transparent, rgba(155,124,255,0.7), transparent);`)}></div>
        <div style={sx(`font-size: 9px; letter-spacing: 0.24em; color: rgba(237,239,247,0.5); margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid rgba(147,162,255,0.14); display: flex; justify-content: space-between;`)}><span>COMMS — THE CANDIDATE</span><span style={sx(`color: #4ADE80; display: flex; align-items: center; gap: 5px;`)}><span style={sx(`width: 5px; height: 5px; border-radius: 50%; background: #4ADE80; animation: mc-pulse 2s ease-in-out infinite;`)}></span>LIVE</span></div>
          <div style={sx(`display: grid; grid-template-columns: 54px 1fr; gap: 7px 12px; min-height: 132px; align-content: start;`)}>
            <span style={sx(`color: rgba(237,239,247,0.58);`)}>status</span><span style={sx(`color: #D7DCEC;`)}>{vals.term1}{(vals.caret1) ? (<><span style={sx(`color: #4ADE80; animation: mc-caret 0.9s step-end infinite;`)}>▌</span></>) : null}</span>
            <span style={sx(`color: rgba(237,239,247,0.58);`)}>now</span><span style={sx(`color: #D7DCEC;`)}>{vals.term2}{(vals.caret2) ? (<><span style={sx(`color: #4ADE80; animation: mc-caret 0.9s step-end infinite;`)}>▌</span></>) : null}</span>
            <span style={sx(`color: rgba(237,239,247,0.58);`)}>stack</span><span style={sx(`color: #D7DCEC;`)}>{vals.term3}{(vals.caret3) ? (<><span style={sx(`color: #4ADE80; animation: mc-caret 0.9s step-end infinite;`)}>▌</span></>) : null}</span>
          </div>
        </aside>

        
        <div data-astro-rocket="" data-mc-hidemobile="" style={sx(`grid-column: 2; justify-self: center; display: flex; flex-direction: column; align-items: center; padding-top: 10px;`)}>
          <svg width="60" height="82" viewBox="0 0 64 88" fill="none" style={sx(`display: block; filter: drop-shadow(0 0 24px rgba(155,124,255,0.35));`)}>
            <path d="M32 4 C42 14 46 28 46 44 L46 62 L18 62 L18 44 C18 28 22 14 32 4 Z" fill="#EDEFF7"></path>
            <path d="M32 4 C36 14 38 28 38 44 L38 62 L32 62 Z" fill="#C9D2F0" opacity="0.6"></path>
            <circle cx="32" cy="34" r="7" fill="#0B0F1A" stroke="#9B7CFF" strokeWidth="2"></circle>
            <circle cx="32" cy="34" r="3" fill="#34E0FF" opacity="0.8"></circle>
            <path d="M18 46 L6 66 L18 62 Z" fill="#FF6EC7"></path>
            <path d="M46 46 L58 66 L46 62 Z" fill="none" stroke="#FF6EC7" strokeWidth="1.5" strokeDasharray="3 3"></path>
            <path d="M25 45 L29 50 L26 55 L31 60" stroke="#8B90A8" strokeWidth="1.3" fill="none" strokeLinejoin="round"></path>
            <rect x="24" y="62" width="16" height="6" rx="2" fill="#9B7CFF"></rect>
            <path d="M14 68 L10 80 M50 68 L54 80" stroke="#8B90A8" strokeWidth="3" strokeLinecap="round"></path>
            <circle cx="32" cy="52" r="2.2" fill="#FF6E6E" style={sx(`animation: mc-pulse 1.6s ease-in-out infinite;`)}></circle>
          </svg>
          <div style={sx(`font-family: 'Martian Mono', monospace; font-size: 8.5px; letter-spacing: 0.22em; color: rgba(237,239,247,0.55); margin-top: 8px;`)}>CREW VEHICLE — {(vals.crewDamaged) ? (<><span style={sx(`color: #FFC24B;`)}>DAMAGED · 4 PARTS NEEDED</span></>) : null}{(vals.crewFixed) ? (<><span style={sx(`color: #4ADE80;`)}>REPAIRED · READY TO LAUNCH</span></>) : null}</div>
        </div>
      </div>

      
      <div data-mc-pad="" style={sx(`position: relative; max-width: 1380px; margin: 0 auto; padding: 4px 36px 38px; box-sizing: border-box;`)}>
        <div style={sx(`font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.22em; color: rgba(237,239,247,0.58); margin-bottom: 18px;`)}>SYSTEM CHART — FOUR PLANETS, FOUR SHIPPED PRODUCTS · A SHIP PART WAITS ON EACH</div>
        <div style={sx(`position: relative; display: flex; align-items: flex-start;`)}>
          <div data-mc-hidemobile="" style={sx(`position: absolute; left: 8%; right: 8%; top: 22px; border-top: 1px dashed rgba(147,162,255,0.25);`)}></div>
          {(vals.planets).map((pl: any, _mci3: number) => (<Fragment key={_mci3}>
            <a href={pl.href} style={sx(`position: relative; text-decoration: none; display: flex; flex-direction: column; align-items: center; gap: 10px; flex: 1; min-width: 0; text-align: center;`)}>
              <span style={sx(`position: relative; display: block; width: 44px; height: 44px; border-radius: 50%; background: ${pl.bg}; box-shadow: ${pl.glow};`)}>
                {(pl.ringB) ? (<>
                  <span style={sx(`position: absolute; inset: -7px -13px; border: 1.5px solid rgba(110,200,255,0.5); border-radius: 50%; transform: rotate(-16deg) scaleY(0.52);`)}></span>
                </>) : null}
              </span>
              <span style={sx(`font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.16em; color: rgba(237,239,247,0.7);`)}>{pl.label}</span>
              <span style={sx(`font-family: 'Martian Mono', monospace; font-size: 8.5px; letter-spacing: 0.12em; color: ${pl.partColor}; transition: color 0.4s ease;`)}>{pl.part}</span>
            </a>
          </Fragment>))}
        </div>
      </div>

      
      <div data-st="" style={sx(`position: relative; border-top: 1px solid rgba(147,162,255,0.14); border-bottom: 1px solid rgba(147,162,255,0.14); background: rgba(11,15,26,0.5); animation-delay: 0.6s;`)}>
        <div data-mc-telemetry="" data-mc-pad="" style={sx(`max-width: 1380px; margin: 0 auto; padding: 10px 36px; box-sizing: border-box; display: flex; gap: 28px; font-family: 'Martian Mono', monospace; font-size: 9.5px; letter-spacing: 0.14em; color: rgba(237,239,247,0.55);`)}>
          <span>LOCAL <span style={sx(`color: #EDEFF7;`)}>{vals.sydTime}</span> SYD</span>
          <span>SESSION <span style={sx(`color: #EDEFF7;`)}>T+{vals.sessionTime}</span></span>
          <span data-mc-hidemobile="">SCROLL <span style={sx(`color: #EDEFF7;`)}>{vals.scrollPct}%</span></span>
          <span data-mc-hidemobile="" style={sx(`margin-left: auto;`)}>PAYLOADS <span style={sx(`color: #4ADE80;`)}>4/4 RESPONDING</span></span>
          <span>COMMS <span style={sx(`color: #4ADE80;`)}>OPEN</span></span>
        </div>
      </div>
    </section>

    
    <section id="pay-01" data-fly-sec="" data-room="0" data-mc-seen={vals.p1Seen} style={sx(`position: relative; padding: 92px 0 56px; scroll-margin-top: 64px;`)} data-screen-label="Payload 01 — hatched">
      <div style={sx(`position: absolute; inset: 0; pointer-events: none; background: linear-gradient(180deg, transparent, rgba(255,158,184,0.045) 30%, rgba(255,158,184,0.045) 70%, transparent);`)}></div>
      <div data-mc-pad="" style={sx(`position: relative; max-width: 1380px; margin: 0 auto; padding-left: 36px; padding-right: 36px; box-sizing: border-box;`)}>
        <div data-st="" style={sx(`display: flex; align-items: center; gap: 18px; margin-bottom: 34px; flex-wrap: wrap;`)}>
          <div data-mc-num="" style={sx(`font-family: 'Archivo Black', sans-serif; font-size: 84px; line-height: 0.9; color: transparent; -webkit-text-stroke: 1.5px rgba(255,158,184,0.55);`)}>01</div>
          <svg data-mc-logo="" width="52" height="52" viewBox="0 0 52 52" style={sx(`flex-shrink: 0; filter: drop-shadow(0 0 18px rgba(255,158,184,0.45));`)}><defs><linearGradient id="lg-hat" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#D9A1AE"></stop><stop offset="1" stopColor="#A9BCA4"></stop></linearGradient></defs><rect width="52" height="52" rx="14" fill="url(#lg-hat)"></rect><ellipse cx="26" cy="28" rx="10" ry="12" fill="#FDF8F6"></ellipse><polyline points="17,26 21,23 24,27 28,23 31,26" fill="none" stroke="#B9647A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"></polyline></svg>
          <div>
            <div style={sx(`font-family: 'Martian Mono', monospace; font-size: 9.5px; letter-spacing: 0.24em; color: #FF9EB8; margin-bottom: 6px;`)}>PLANET 01 — CONSUMER AI</div>
            <h2 style={sx(`margin: 0; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: clamp(30px, 4vw, 52px); line-height: 1; letter-spacing: -0.02em; background: linear-gradient(92deg, #FFD3DE, #FF9EB8); -webkit-background-clip: text; background-clip: text; color: transparent;`)}>hatched</h2>
          </div>
          <div style={sx(`margin-left: auto; display: inline-flex; align-items: center; gap: 8px; font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.18em; border: 1px solid rgba(255,158,184,0.5); color: #FF9EB8; padding: 7px 12px; border-radius: 2px;`)}>
            <span style={sx(`width: 6px; height: 6px; border-radius: 50%; background: #FF9EB8; animation: mc-pulse 2.4s ease-in-out infinite;`)}></span>
            PRE-LAUNCH · RECRUITING FOUNDING COHORT
          </div>
        </div>

        <div data-mc-pay="" style={sx(`display: grid; grid-template-columns: 350px minmax(0, 1fr); gap: 52px; align-items: start;`)}>
          <div data-mc-syscard="" data-st="" style={sx(`display: flex; flex-direction: column; position: sticky; top: 84px; animation-delay: 0.15s;`)}>
            <div style={sx(`font-size: 15.5px; line-height: 1.65; color: rgba(237,239,247,0.88); margin-bottom: 8px;`)}>AI styling for postpartum mums. Warm iOS feel — her wardrobe, her rules.</div>
            <div style={sx(`font-family: 'Martian Mono', monospace; font-size: 10px; letter-spacing: 0.08em; color: rgba(237,239,247,0.58); margin-bottom: 20px;`)}>next.js · supabase · claude</div>
            <div style={sx(`font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.22em; color: #FF9EB8; margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,158,184,0.3);`)}>FLIGHT RULES — DESIGN DECISIONS</div>
            <ol style={sx(`margin: 0 0 24px; padding: 0; list-style: none; display: flex; flex-direction: column;`)}>
              <li style={sx(`display: flex; gap: 12px; padding: 11px 0; border-bottom: 1px solid rgba(147,162,255,0.12); font-size: 15px; line-height: 1.55; color: rgba(237,239,247,0.92);`)}><span style={sx(`font-family: 'Martian Mono', monospace; font-size: 10px; color: #FF9EB8; padding-top: 3px;`)}>R1</span>Styles what she already owns — it never sells her anything</li>
              <li style={sx(`display: flex; gap: 12px; padding: 11px 0; border-bottom: 1px solid rgba(147,162,255,0.12); font-size: 15px; line-height: 1.55; color: rgba(237,239,247,0.92);`)}><span style={sx(`font-family: 'Martian Mono', monospace; font-size: 10px; color: #FF9EB8; padding-top: 3px;`)}>R2</span>Postpartum bodies are the default, not an edge case</li>
              <li style={sx(`display: flex; gap: 12px; padding: 11px 0; border-bottom: 1px solid rgba(147,162,255,0.12); font-size: 15px; line-height: 1.55; color: rgba(237,239,247,0.92);`)}><span style={sx(`font-family: 'Martian Mono', monospace; font-size: 10px; color: #FF9EB8; padding-top: 3px;`)}>R3</span>AI suggests; mum decides — no auto-anything</li>
            </ol>
            <p style={sx(`margin: 0 0 22px; padding-left: 14px; border-left: 2px solid rgba(255,158,184,0.55); font-family: 'Instrument Serif', serif; font-style: italic; font-size: 20px; line-height: 1.5; color: rgba(237,239,247,0.88);`)}>Mission note — it will never tell a new mum to buy anything. That one decision shaped the entire product.</p>
            <a href="/reports/hatched" onClick={vals.goReport1} style={sx(`align-self: flex-start; font-family: 'Martian Mono', monospace; font-size: 10px; letter-spacing: 0.18em; text-decoration: none; color: #FF9EB8; border: 1px solid rgba(255,158,184,0.4); padding: 10px 16px; border-radius: 3px; transition: background 0.2s ease;`)} className={pseudoClass(`background: rgba(255,158,184,0.1); color: #FF9EB8;`)}>FULL MISSION REPORT ↗</a>
          </div>

          
          <div style={sx(`min-width: 0;`)}>
            <div data-mc-bezel="" data-astro-perch="" data-solid="" style={sx(`background: #0B0F1A; border: 1px solid rgba(255,158,184,0.22); border-radius: 14px; padding: 12px; box-shadow: 0 0 90px -30px rgba(255,158,184,0.5), 0 30px 60px -30px rgba(0,0,0,0.8);`)}>
              <div style={sx(`display: flex; align-items: center; gap: 8px; padding: 4px 6px 10px; flex-wrap: wrap;`)}>
                <span style={sx(`width: 8px; height: 8px; border-radius: 50%; background: rgba(237,239,247,0.16);`)}></span>
                <span style={sx(`width: 8px; height: 8px; border-radius: 50%; background: rgba(237,239,247,0.16);`)}></span>
                <span style={sx(`width: 8px; height: 8px; border-radius: 50%; background: rgba(237,239,247,0.16);`)}></span>
                <span style={sx(`font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.2em; color: rgba(237,239,247,0.5); margin-left: 10px;`)}>HATCHED — LIVE SYSTEM</span>
                <span style={sx(`margin-left: auto; display: flex; align-items: center; gap: 6px; font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.16em; color: #4ADE80;`)}><span style={sx(`width: 5px; height: 5px; border-radius: 50%; background: #4ADE80; animation: mc-pulse 2s ease-in-out infinite;`)}></span>REAL — CLICK AROUND</span>
              </div>
              <div style={sx(`display: flex; gap: 8px; padding: 0 6px 12px;`)}>
                {(vals.p1Tabs).map((tab: any, _mci4: number) => (<Fragment key={_mci4}>
                  <button onClick={tab.go} style={sx(`cursor: pointer; font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.16em; color: ${tab.color}; background: ${tab.bg}; border: 1px solid ${tab.border}; padding: 6px 12px; border-radius: 3px; transition: all 0.25s ease;`)}>{tab.label}</button>
                </Fragment>))}
                <span data-mc-hidemobile="" style={sx(`margin-left: auto; align-self: center; font-family: 'Martian Mono', monospace; font-size: 8.5px; letter-spacing: 0.14em; color: rgba(237,239,247,0.52);`)}>APP MAP {vals.p1Pos}</span>
              </div>
              <div data-screenon="" style={sx(`border-radius: 9px; overflow: hidden;`)}>
                <div style={sx(`display: flex; transform: ${vals.p1Track}; transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);`)}>

                  
                  <div style={sx(`flex: 0 0 100%; min-width: 0;`)}>
                    <div data-mc-app="" style={sx(`font-family: 'Plus Jakarta Sans', sans-serif; background: #FDF8F6; padding: 24px; box-sizing: border-box; height: 100%;`)}>
                      <div style={sx(`display: flex; align-items: center; gap: 12px; flex-wrap: wrap;`)}>
                        <div style={sx(`font-size: 22px; font-weight: 800; letter-spacing: -0.02em; color: #B9647A;`)}>hatched</div>
                        <div style={sx(`font-size: 12.5px; color: #A08A8F; font-weight: 500;`)}>your wardrobe, styled</div>
                        <div style={sx(`margin-left: auto; width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #D9A1AE, #A9BCA4); box-shadow: 0 4px 10px rgba(185,100,122,0.25);`)}></div>
                      </div>
                      <div style={sx(`font-size: 12px; font-weight: 600; color: #8A7378; margin: 16px 0 10px;`)}>Your wardrobe · tap pieces to include them</div>
                      <div style={sx(`display: grid; grid-template-columns: repeat(auto-fill, minmax(104px, 1fr)); gap: 10px;`)}>
                        {(vals.wardrobe).map((item: any, _mci5: number) => (<Fragment key={_mci5}>
                          <div onClick={item.toggle} style={sx(`cursor: pointer; background: #FFFFFF; border-radius: 14px; padding: 9px; box-shadow: ${item.shadow}; transition: transform 0.15s ease, box-shadow 0.2s ease;`)} className={pseudoClass(`transform: translateY(-2px);`, `transform: scale(0.96);`)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); (item.toggle)(e); } }}>
                            <div style={sx(`height: 60px; border-radius: 10px; background: ${item.swatch}; position: relative;`)}>
                              {(item.selected) ? (<>
                                <div style={sx(`position: absolute; top: 5px; right: 5px; width: 19px; height: 19px; border-radius: 50%; background: #8B7CF6; color: #fff; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(139,124,246,0.4);`)}>✓</div>
                              </>) : null}
                            </div>
                            <div style={sx(`font-size: 11.5px; font-weight: 700; color: #4A3F42; margin-top: 7px;`)}>{item.name}</div>
                            <div style={sx(`font-size: 10px; font-weight: 500; color: #B0A0A5;`)}>{item.cat}</div>
                          </div>
                        </Fragment>))}
                      </div>
                      <div style={sx(`display: flex; align-items: center; gap: 16px; margin-top: 18px; min-height: 46px; flex-wrap: wrap;`)}>
                        {(vals.isThinking) ? (<>
                          <div style={sx(`display: flex; align-items: center; gap: 12px;`)}>
                            <div style={sx(`width: 38px; height: 38px; border-radius: 50%; background: conic-gradient(from 0deg, #D9A1AE, #A9BCA4, #8B7CF6, #D9A1AE); animation: mc-spin 1.1s linear infinite; padding: 3px; box-sizing: border-box;`)}><div style={sx(`width: 100%; height: 100%; border-radius: 50%; background: #FDF8F6;`)}></div></div>
                            <div style={sx(`font-size: 13px; font-weight: 600; color: #8B7CF6;`)}>styling your look…</div>
                          </div>
                        </>) : null}
                        {(vals.notThinking) ? (<>
                          <button onClick={vals.styleMe} style={sx(`border: none; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 700; color: #FFFFFF; background: #B9647A; padding: 12px 24px; border-radius: 14px; box-shadow: 0 8px 20px -6px rgba(185,100,122,0.5); transition: transform 0.15s ease;`)} className={pseudoClass(`transform: translateY(-1px);`, `transform: scale(0.97);`)}>✨ style me</button>
                          <div style={sx(`font-size: 11px; font-weight: 500; color: #B0A0A5;`)}>{vals.selectionHint}</div>
                        </>) : null}
                      </div>
                      {(vals.hasOutfit) ? (<>
                        <div style={sx(`margin-top: 18px; background: #FFFFFF; border-radius: 14px; padding: 16px 18px; box-shadow: 0 12px 28px -12px rgba(139,124,246,0.28); animation: mc-rise 0.4s ease;`)}>
                          <div style={sx(`display: flex; align-items: center; gap: 8px; margin-bottom: 11px; flex-wrap: wrap;`)}>
                            <div style={sx(`font-size: 12.5px; font-weight: 800; color: #8B7CF6;`)}>today's look</div>
                            <div style={sx(`font-size: 10px; font-weight: 600; color: #B0A0A5; margin-left: auto;`)}>AI-suggested — you decide</div>
                          </div>
                          <div style={sx(`display: flex; gap: 10px; margin-bottom: 11px;`)}>
                            {(vals.outfit).map((piece: any, _mci6: number) => (<Fragment key={_mci6}>
                              <div style={sx(`flex: 1; display: flex; flex-direction: column; gap: 6px; min-width: 0;`)}>
                                <div style={sx(`height: 48px; border-radius: 10px; background: ${piece.swatch};`)}></div>
                                <div style={sx(`font-size: 10.5px; font-weight: 700; color: #4A3F42;`)}>{piece.name}</div>
                              </div>
                            </Fragment>))}
                          </div>
                          <div style={sx(`font-size: 12.5px; line-height: 1.55; color: #6E5D62; font-weight: 500;`)}>{vals.outfitNote}</div>
                          <button onClick={vals.styleMe} style={sx(`margin-top: 11px; border: 1.5px solid #E4CBD2; background: transparent; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 700; color: #B9647A; padding: 8px 15px; border-radius: 12px;`)}>another look</button>
                        </div>
                      </>) : null}
                    </div>
                  </div>

                  
                  <div style={sx(`flex: 0 0 100%; min-width: 0;`)}>
                    <div data-mc-app="" style={sx(`font-family: 'Plus Jakarta Sans', sans-serif; background: #FDF8F6; padding: 24px; box-sizing: border-box; height: 100%;`)}>
                      <div style={sx(`display: flex; align-items: center; gap: 12px; flex-wrap: wrap;`)}>
                        <div style={sx(`font-size: 22px; font-weight: 800; letter-spacing: -0.02em; color: #B9647A;`)}>her profile</div>
                        <div style={sx(`font-size: 12.5px; color: #A08A8F; font-weight: 500;`)}>postpartum is the default, not a setting</div>
                      </div>
                      <div style={sx(`font-size: 12px; font-weight: 600; color: #8A7378; margin: 18px 0 10px;`)}>Comfort rules · every suggestion respects these</div>
                      <div style={sx(`display: flex; flex-wrap: wrap; gap: 9px;`)}>
                        {(vals.prefChips).map((chip: any, _mci7: number) => (<Fragment key={_mci7}>
                          <button onClick={chip.toggle} style={sx(`cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12.5px; font-weight: 700; color: ${chip.color}; background: ${chip.bg}; border: 1.5px solid ${chip.border}; padding: 9px 15px; border-radius: 999px; transition: all 0.2s ease;`)} className={pseudoClass('', `transform: scale(0.96);`)}>{chip.label}</button>
                        </Fragment>))}
                      </div>
                      <div style={sx(`font-size: 12px; font-weight: 500; color: #B0A0A5; margin: 12px 0 0;`)}>No exceptions — the stylist can't override these, and neither can we.</div>
                      <div style={sx(`margin-top: 20px; background: linear-gradient(135deg, rgba(139,124,246,0.1), rgba(217,161,174,0.12)); border: 1.5px solid rgba(139,124,246,0.3); border-radius: 14px; padding: 18px 20px;`)}>
                        <div style={sx(`display: flex; align-items: center; gap: 8px; margin-bottom: 8px;`)}>
                          <div style={sx(`width: 26px; height: 26px; border-radius: 50%; background: conic-gradient(from 0deg, #D9A1AE, #A9BCA4, #8B7CF6, #D9A1AE); padding: 2.5px; box-sizing: border-box;`)}><div style={sx(`width: 100%; height: 100%; border-radius: 50%; background: #FDF8F6;`)}></div></div>
                          <div style={sx(`font-size: 13.5px; font-weight: 800; color: #8B7CF6;`)}>founding cohort — now recruiting</div>
                        </div>
                        <div style={sx(`font-size: 13px; line-height: 1.6; color: #6E5D62; font-weight: 500;`)}>Pre-launch, and saying so. A small group of real mums shapes what ships — weekly styling, honest feedback, no fake numbers on this page.</div>
                        <a href="mailto:tobiasnorman1@gmail.com" style={sx(`display: inline-block; margin-top: 12px; text-decoration: none; font-size: 12.5px; font-weight: 700; color: #FFFFFF; background: #8B7CF6; padding: 10px 18px; border-radius: 12px; box-shadow: 0 8px 20px -6px rgba(139,124,246,0.5);`)}>ask about the cohort</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={sx(`display: flex; align-items: baseline; gap: 14px; flex-wrap: wrap; font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.18em; color: rgba(237,239,247,0.58); padding: 12px 6px 0;`)}>
              <span style={sx(`color: #FF9EB8;`)}>SYS-01</span>
              <span style={sx(`color: ${vals.part1Color}; transition: color 0.4s ease;`)}>{vals.part1Text}</span>
              <span>FAITHFUL REPLICA OF THE REAL UI — SLIDE BETWEEN SCREENS</span>
              <span data-mc-hidemobile="" style={sx(`margin-left: auto;`)}>CONSOLE REPLICA — REAL APP IN THE MISSION REPORT</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    
    <section id="pay-02" data-fly-sec="" data-room="1" data-mc-seen={vals.p2Seen} style={sx(`position: relative; padding: 92px 0 56px; scroll-margin-top: 64px;`)} data-screen-label="Payload 02 — Job Command Center">
      <div style={sx(`position: absolute; inset: 0; pointer-events: none; background: linear-gradient(180deg, transparent, rgba(147,162,255,0.05) 30%, rgba(147,162,255,0.05) 70%, transparent);`)}></div>
      <div data-mc-pad="" style={sx(`position: relative; max-width: 1380px; margin: 0 auto; padding-left: 36px; padding-right: 36px; box-sizing: border-box;`)}>
        <div data-st="" style={sx(`display: flex; align-items: center; gap: 18px; margin-bottom: 34px; flex-wrap: wrap;`)}>
          <div data-mc-num="" style={sx(`font-family: 'Archivo Black', sans-serif; font-size: 84px; line-height: 0.9; color: transparent; -webkit-text-stroke: 1.5px rgba(147,162,255,0.55);`)}>02</div>
          <svg data-mc-logo="" width="52" height="52" viewBox="0 0 52 52" style={sx(`flex-shrink: 0; filter: drop-shadow(0 0 18px rgba(147,162,255,0.45));`)}><rect width="52" height="52" rx="12" fill="#4F46E5"></rect><path d="M18 16 L31 26 L18 36" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"></path><rect x="30" y="33" width="9" height="3.5" rx="1.75" fill="#A5B4FC"></rect></svg>
          <div>
            <div style={sx(`font-family: 'Martian Mono', monospace; font-size: 9.5px; letter-spacing: 0.24em; color: #93A2FF; margin-bottom: 6px;`)}>PLANET 02 — OPS TOOLING</div>
            <h2 style={sx(`margin: 0; font-family: 'Geist', sans-serif; font-weight: 700; font-size: clamp(30px, 4vw, 52px); line-height: 1; letter-spacing: -0.03em; background: linear-gradient(92deg, #C7CFFF, #93A2FF); -webkit-background-clip: text; background-clip: text; color: transparent;`)}>Job Command Center</h2>
          </div>
          <div style={sx(`margin-left: auto; display: inline-flex; align-items: center; gap: 8px; font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.18em; border: 1px solid rgba(147,162,255,0.5); color: #93A2FF; padding: 7px 12px; border-radius: 2px;`)}>
            <span style={sx(`width: 6px; height: 6px; border-radius: 50%; background: #93A2FF; animation: mc-pulse 2.4s ease-in-out infinite;`)}></span>
            IN DAILY USE · RUNS MY OWN SEARCH
          </div>
        </div>

        <div data-mc-pay="" style={sx(`display: grid; grid-template-columns: minmax(0, 1fr) 350px; gap: 52px; align-items: start;`)}>
          <div style={sx(`min-width: 0;`)}>
            <div data-mc-bezel="" data-astro-perch="" data-solid="" style={sx(`background: #0B0F1A; border: 1px solid rgba(147,162,255,0.24); border-radius: 14px; padding: 12px; box-shadow: 0 0 90px -30px rgba(147,162,255,0.55), 0 30px 60px -30px rgba(0,0,0,0.8);`)}>
              <div style={sx(`display: flex; align-items: center; gap: 8px; padding: 4px 6px 10px; flex-wrap: wrap;`)}>
                <span style={sx(`width: 8px; height: 8px; border-radius: 50%; background: rgba(237,239,247,0.16);`)}></span>
                <span style={sx(`width: 8px; height: 8px; border-radius: 50%; background: rgba(237,239,247,0.16);`)}></span>
                <span style={sx(`width: 8px; height: 8px; border-radius: 50%; background: rgba(237,239,247,0.16);`)}></span>
                <span style={sx(`font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.2em; color: rgba(237,239,247,0.5); margin-left: 10px;`)}>JOB COMMAND CENTER — LIVE SYSTEM</span>
                <span style={sx(`margin-left: auto; display: flex; align-items: center; gap: 6px; font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.16em; color: #4ADE80;`)}><span style={sx(`width: 5px; height: 5px; border-radius: 50%; background: #4ADE80; animation: mc-pulse 2s ease-in-out infinite;`)}></span>REAL — CLICK AROUND</span>
              </div>
              <div style={sx(`display: flex; gap: 8px; padding: 0 6px 12px;`)}>
                {(vals.p2Tabs).map((tab: any, _mci8: number) => (<Fragment key={_mci8}>
                  <button onClick={tab.go} style={sx(`cursor: pointer; font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.16em; color: ${tab.color}; background: ${tab.bg}; border: 1px solid ${tab.border}; padding: 6px 12px; border-radius: 3px; transition: all 0.25s ease;`)}>{tab.label}</button>
                </Fragment>))}
                <span data-mc-hidemobile="" style={sx(`margin-left: auto; align-self: center; font-family: 'Martian Mono', monospace; font-size: 8.5px; letter-spacing: 0.14em; color: rgba(237,239,247,0.52);`)}>APP MAP {vals.p2Pos}</span>
              </div>
              <div data-screenon="" style={sx(`border-radius: 9px; overflow: hidden;`)}>
                <div style={sx(`display: flex; transform: ${vals.p2Track}; transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);`)}>

                  
                  <div style={sx(`flex: 0 0 100%; min-width: 0;`)}>
                    <div data-mc-app="" style={sx(`font-family: 'Geist', sans-serif; background: #FBFBFD; padding: 18px; box-sizing: border-box; height: 100%;`)}>
                      <div style={sx(`display: flex; align-items: center; gap: 10px; flex-wrap: wrap; padding-bottom: 13px; border-bottom: 1px solid #E4E5F0;`)}>
                        <div style={sx(`width: 26px; height: 26px; border-radius: 6px; background: #4F46E5; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700;`)}>▸</div>
                        <div style={sx(`font-size: 14.5px; font-weight: 600; color: #1E1B4B;`)}>Job Command Center</div>
                        <div style={sx(`margin-left: auto; font-size: 9.5px; font-weight: 600; letter-spacing: 0.1em; color: #4F46E5; background: #EEF0FE; border: 1px solid #D9DCFA; padding: 4px 8px; border-radius: 4px;`)}>ACTION LIST EMAILED 7:00 AM ✓</div>
                      </div>
                      <div style={sx(`font-size: 9.5px; font-weight: 600; letter-spacing: 0.12em; color: #7B7F9E; margin: 13px 0 9px;`)}>PIPELINE — TAP A CARD TO ADVANCE IT · OFFERS CYCLE BACK</div>
                      <div style={sx(`display: grid; grid-template-columns: repeat(4, minmax(148px, 1fr)); gap: 9px; overflow-x: auto; padding-bottom: 4px;`)}>
                        {(vals.jccStages).map((stage: any, _mci9: number) => (<Fragment key={_mci9}>
                          <div style={sx(`background: #F5F6FA; border: 1px solid #E4E5F0; border-radius: 6px; padding: 9px; min-height: 200px;`)}>
                            <div style={sx(`display: flex; align-items: center; gap: 6px; font-size: 9px; font-weight: 700; letter-spacing: 0.12em; color: #6E7291; margin-bottom: 8px;`)}>{stage.name}<span style={sx(`margin-left: auto; background: #FFFFFF; border: 1px solid #E4E5F0; border-radius: 3px; padding: 1px 6px; font-size: 9.5px; color: #4F46E5;`)}>{stage.count}</span></div>
                            <div style={sx(`display: flex; flex-direction: column; gap: 7px;`)}>
                              {(stage.cards).map((card: any, _mci10: number) => (<Fragment key={_mci10}>
                                <div onClick={card.advance} style={sx(`cursor: pointer; background: #FFFFFF; border: 1px solid ${card.border}; border-radius: 5px; padding: 8px 10px; transition: border-color 0.2s ease, transform 0.12s ease; animation: mc-rise 0.25s ease;`)} className={pseudoClass(`transform: translateY(-1px); border-color: #4F46E5;`, `transform: scale(0.98);`)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); (card.advance)(e); } }}>
                                  <div style={sx(`font-size: 12px; font-weight: 600; color: #23214A; line-height: 1.3;`)}>{card.title}</div>
                                  <div style={sx(`font-size: 10.5px; color: #8A8DA8; margin-top: 2px;`)}>{card.company}</div>
                                  {(card.nudge) ? (<>
                                    <div style={sx(`margin-top: 6px; display: inline-flex; align-items: center; gap: 5px; font-size: 8.5px; font-weight: 700; letter-spacing: 0.1em; color: #B45309; background: #FEF3E2; border: 1px solid #F5D9A8; padding: 3px 7px; border-radius: 3px; animation: mc-pulse 2.6s ease-in-out infinite;`)}>⚑ FOLLOW UP · 2D</div>
                                  </>) : null}
                                  {(card.isOffer) ? (<>
                                    <div style={sx(`margin-top: 6px; display: inline-flex; font-size: 8.5px; font-weight: 700; letter-spacing: 0.1em; color: #FFFFFF; background: #4F46E5; padding: 3px 7px; border-radius: 3px;`)}>✓ OFFER STAGE</div>
                                  </>) : null}
                                </div>
                              </Fragment>))}
                            </div>
                          </div>
                        </Fragment>))}
                      </div>
                    </div>
                  </div>

                  
                  <div style={sx(`flex: 0 0 100%; min-width: 0;`)}>
                    <div data-mc-app="" style={sx(`font-family: 'Geist', sans-serif; background: #FBFBFD; padding: 18px; box-sizing: border-box; height: 100%;`)}>
                      <div style={sx(`background: #FFFFFF; border: 1px solid #E4E5F0; border-radius: 8px; padding: 14px 16px;`)}>
                        <div style={sx(`display: flex; align-items: center; gap: 10px; flex-wrap: wrap; padding-bottom: 10px; border-bottom: 1px solid #EEF0F6;`)}>
                          <div style={sx(`width: 26px; height: 26px; border-radius: 6px; background: #4F46E5; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700;`)}>▸</div>
                          <div>
                            <div style={sx(`font-size: 13px; font-weight: 600; color: #1E1B4B;`)}>07:00 — Your day, prioritised</div>
                            <div style={sx(`font-size: 10.5px; color: #8A8DA8;`)}>Job Command Center · daily brief to my inbox</div>
                          </div>
                          <div style={sx(`margin-left: auto; font-size: 9px; font-weight: 700; letter-spacing: 0.1em; color: #15803D; background: #F0FDF4; border: 1px solid #BBF7D0; padding: 3px 8px; border-radius: 3px;`)}>SENT — LIVE FROM THE BOARD</div>
                        </div>
                        <div style={sx(`display: flex; flex-direction: column; padding-top: 6px;`)}>
                          {(vals.briefItems).map((bi: any, _mci11: number) => (<Fragment key={_mci11}>
                            <div onClick={bi.toggle} style={sx(`cursor: pointer; display: flex; align-items: center; gap: 11px; padding: 9px 4px; border-bottom: 1px solid #F3F4F9; transition: background 0.15s ease;`)} className={pseudoClass(`background: #FAFAFE;`)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); (bi.toggle)(e); } }}>
                              <div style={sx(`width: 17px; height: 17px; border-radius: 4px; box-sizing: border-box; border: 1.5px solid ${bi.boxBorder}; background: ${bi.boxBg}; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; flex-shrink: 0; transition: all 0.2s ease;`)}>{bi.tick}</div>
                              <div style={sx(`flex: 1; font-size: 12.5px; font-weight: 600; color: ${bi.color}; text-decoration: ${bi.deco};`)}>{bi.text}</div>
                              <div style={sx(`font-size: 8.5px; font-weight: 700; letter-spacing: 0.1em; color: #6E7291; background: #F5F6FA; border: 1px solid #E4E5F0; padding: 2px 7px; border-radius: 3px;`)}>{bi.tag}</div>
                            </div>
                          </Fragment>))}
                        </div>
                        <div style={sx(`font-size: 10px; color: #8A8DA8; padding-top: 8px;`)}>Generated from pipeline state — advance cards on the board and tomorrow's brief changes.</div>
                      </div>
                      <div style={sx(`margin-top: 14px;`)}>
                        <div style={sx(`font-size: 9.5px; font-weight: 600; letter-spacing: 0.12em; color: #7B7F9E; margin-bottom: 8px;`)}>LIVE FUNNEL — FOLLOWS THE BOARD</div>
                        <div style={sx(`display: flex; flex-direction: column; gap: 6px;`)}>
                          {(vals.jccFunnel).map((f: any, _mci12: number) => (<Fragment key={_mci12}>
                            <div style={sx(`display: grid; grid-template-columns: 76px minmax(0,1fr) 24px; gap: 10px; align-items: center;`)}>
                              <span style={sx(`font-size: 9px; font-weight: 700; letter-spacing: 0.1em; color: #6E7291;`)}>{f.name}</span>
                              <div style={sx(`height: 9px; background: #EEF0F6; border-radius: 2px; overflow: hidden;`)}><div style={sx(`height: 100%; width: ${f.width}; background: ${f.color}; transition: width 0.5s ease; border-radius: 2px;`)}></div></div>
                              <span style={sx(`font-family: 'Geist Mono', monospace; font-size: 10.5px; color: #4F46E5; text-align: right;`)}>{f.count}</span>
                            </div>
                          </Fragment>))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={sx(`display: flex; align-items: baseline; gap: 14px; flex-wrap: wrap; font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.18em; color: rgba(237,239,247,0.58); padding: 12px 6px 0;`)}>
              <span style={sx(`color: #93A2FF;`)}>SYS-02</span>
              <span style={sx(`color: ${vals.part2Color}; transition: color 0.4s ease;`)}>{vals.part2Text}</span>
              <span>TAP CARDS TO MOVE THEM — THE BRIEF & FUNNEL FOLLOW</span>
              <a href="#" onClick={vals.jccReset} style={sx(`margin-left: auto; color: rgba(237,239,247,0.6); text-decoration: none; border-bottom: 1px solid rgba(237,239,247,0.3);`)}>RESET</a>
            </div>
          </div>

          <div data-mc-syscard="" data-st="" style={sx(`display: flex; flex-direction: column; position: sticky; top: 84px; order: 2; animation-delay: 0.15s;`)}>
            <div style={sx(`font-size: 15.5px; line-height: 1.65; color: rgba(237,239,247,0.88); margin-bottom: 8px;`)}>Job-search ops, run like revenue ops. Emails me my action list every morning.</div>
            <div style={sx(`font-family: 'Martian Mono', monospace; font-size: 10px; letter-spacing: 0.08em; color: rgba(237,239,247,0.58); margin-bottom: 20px;`)}>next.js · supabase · resend</div>
            <div style={sx(`font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.22em; color: #93A2FF; margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid rgba(147,162,255,0.35);`)}>FLIGHT RULES — DESIGN DECISIONS</div>
            <ol style={sx(`margin: 0 0 24px; padding: 0; list-style: none; display: flex; flex-direction: column;`)}>
              <li style={sx(`display: flex; gap: 12px; padding: 11px 0; border-bottom: 1px solid rgba(147,162,255,0.12); font-size: 15px; line-height: 1.55; color: rgba(237,239,247,0.92);`)}><span style={sx(`font-family: 'Martian Mono', monospace; font-size: 10px; color: #93A2FF; padding-top: 3px;`)}>R1</span>No auto-submit, ever — I review every application</li>
              <li style={sx(`display: flex; gap: 12px; padding: 11px 0; border-bottom: 1px solid rgba(147,162,255,0.12); font-size: 15px; line-height: 1.55; color: rgba(237,239,247,0.92);`)}><span style={sx(`font-family: 'Martian Mono', monospace; font-size: 10px; color: #93A2FF; padding-top: 3px;`)}>R2</span>The tool comes to me — morning action list by email</li>
              <li style={sx(`display: flex; gap: 12px; padding: 11px 0; border-bottom: 1px solid rgba(147,162,255,0.12); font-size: 15px; line-height: 1.55; color: rgba(237,239,247,0.92);`)}><span style={sx(`font-family: 'Martian Mono', monospace; font-size: 10px; color: #93A2FF; padding-top: 3px;`)}>R3</span>Follow-ups are first-class objects, not buried notes</li>
            </ol>
            <p style={sx(`margin: 0 0 22px; padding-left: 14px; border-left: 2px solid rgba(147,162,255,0.55); font-family: 'Instrument Serif', serif; font-style: italic; font-size: 20px; line-height: 1.5; color: rgba(237,239,247,0.88);`)}>Mission note — every morning it emails me the day's moves before I've made coffee. You're looking at my actual workflow.</p>
            <a href="/reports/job-command-center" onClick={vals.goReport2} style={sx(`align-self: flex-start; font-family: 'Martian Mono', monospace; font-size: 10px; letter-spacing: 0.18em; text-decoration: none; color: #93A2FF; border: 1px solid rgba(147,162,255,0.4); padding: 10px 16px; border-radius: 3px; transition: background 0.2s ease;`)} className={pseudoClass(`background: rgba(147,162,255,0.1); color: #93A2FF;`)}>FULL MISSION REPORT ↗</a>
          </div>
        </div>
      </div>
    </section>

    
    <section id="pay-03" data-fly-sec="" data-room="2" data-mc-seen={vals.p3Seen} style={sx(`position: relative; padding: 92px 0 56px; scroll-margin-top: 64px;`)} data-screen-label="Payload 03 — Life Hub">
      <div style={sx(`position: absolute; inset: 0; pointer-events: none; background: linear-gradient(180deg, transparent, rgba(255,158,110,0.045) 30%, rgba(255,158,110,0.045) 70%, transparent);`)}></div>
      <div data-mc-pad="" style={sx(`position: relative; max-width: 1380px; margin: 0 auto; padding-left: 36px; padding-right: 36px; box-sizing: border-box;`)}>
        <div data-st="" style={sx(`display: flex; align-items: center; gap: 18px; margin-bottom: 34px; flex-wrap: wrap;`)}>
          <div data-mc-num="" style={sx(`font-family: 'Archivo Black', sans-serif; font-size: 84px; line-height: 0.9; color: transparent; -webkit-text-stroke: 1.5px rgba(255,158,110,0.55);`)}>03</div>
          <svg data-mc-logo="" width="52" height="52" viewBox="0 0 52 52" style={sx(`flex-shrink: 0; filter: drop-shadow(0 0 18px rgba(255,158,110,0.45));`)}><defs><linearGradient id="lg-lh" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#D9622B"></stop><stop offset="1" stopColor="#E8956D"></stop></linearGradient></defs><rect width="52" height="52" rx="14" fill="url(#lg-lh)"></rect><path d="M15 27 L26 17 L37 27" fill="none" stroke="#FBF5EA" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"></path><rect x="20" y="27" width="12" height="9" rx="2" fill="#FBF5EA"></rect></svg>
          <div>
            <div style={sx(`font-family: 'Martian Mono', monospace; font-size: 9.5px; letter-spacing: 0.24em; color: #FF9E6E; margin-bottom: 6px;`)}>PLANET 03 — THE FAMILY OS</div>
            <h2 style={sx(`margin: 0; font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: clamp(30px, 4vw, 52px); line-height: 1; letter-spacing: -0.02em; background: linear-gradient(92deg, #FFD0B0, #FF9E6E); -webkit-background-clip: text; background-clip: text; color: transparent;`)}>Life Hub</h2>
          </div>
          <div style={sx(`margin-left: auto; display: inline-flex; align-items: center; gap: 8px; font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.18em; border: 1px solid rgba(255,158,110,0.5); color: #FF9E6E; padding: 7px 12px; border-radius: 2px;`)}>
            <span style={sx(`width: 6px; height: 6px; border-radius: 50%; background: #FF9E6E; animation: mc-pulse 2.4s ease-in-out infinite;`)}></span>
            IN DAILY USE · OUR HOUSEHOLD RUNS ON IT
          </div>
        </div>

        <div data-mc-pay="" style={sx(`display: grid; grid-template-columns: 350px minmax(0, 1fr); gap: 52px; align-items: start;`)}>
          <div data-mc-syscard="" data-st="" style={sx(`display: flex; flex-direction: column; position: sticky; top: 84px; animation-delay: 0.15s;`)}>
            <div style={sx(`font-size: 15.5px; line-height: 1.65; color: rgba(237,239,247,0.88); margin-bottom: 8px;`)}>The family OS our household runs on. 175k lines · 40 routes · two daily users.</div>
            <div style={sx(`font-family: 'Martian Mono', monospace; font-size: 10px; letter-spacing: 0.08em; color: rgba(237,239,247,0.58); margin-bottom: 20px;`)}>next.js · supabase</div>
            <div style={sx(`font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.22em; color: #FF9E6E; margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,158,110,0.35);`)}>FLIGHT RULES — DESIGN DECISIONS</div>
            <ol style={sx(`margin: 0 0 24px; padding: 0; list-style: none; display: flex; flex-direction: column;`)}>
              <li style={sx(`display: flex; gap: 12px; padding: 11px 0; border-bottom: 1px solid rgba(147,162,255,0.12); font-size: 15px; line-height: 1.55; color: rgba(237,239,247,0.92);`)}><span style={sx(`font-family: 'Martian Mono', monospace; font-size: 10px; color: #FF9E6E; padding-top: 3px;`)}>R1</span>Wedge: one table, four categories — then grow</li>
              <li style={sx(`display: flex; gap: 12px; padding: 11px 0; border-bottom: 1px solid rgba(147,162,255,0.12); font-size: 15px; line-height: 1.55; color: rgba(237,239,247,0.92);`)}><span style={sx(`font-family: 'Martian Mono', monospace; font-size: 10px; color: #FF9E6E; padding-top: 3px;`)}>R2</span>Built for two users; opinionated by design</li>
              <li style={sx(`display: flex; gap: 12px; padding: 11px 0; border-bottom: 1px solid rgba(147,162,255,0.12); font-size: 15px; line-height: 1.55; color: rgba(237,239,247,0.92);`)}><span style={sx(`font-family: 'Martian Mono', monospace; font-size: 10px; color: #FF9E6E; padding-top: 3px;`)}>R3</span>Big numbers over dashboards — "4 tasks left" beats a chart</li>
            </ol>
            <p style={sx(`margin: 0 0 22px; padding-left: 14px; border-left: 2px solid rgba(255,158,110,0.55); font-family: 'Instrument Serif', serif; font-style: italic; font-size: 20px; line-height: 1.5; color: rgba(237,239,247,0.88);`)}>Mission note — 175,000 lines of code so the family's mental load has somewhere to live that isn't someone's head.</p>
            <a href="/reports/life-hub" onClick={vals.goReport3} style={sx(`align-self: flex-start; font-family: 'Martian Mono', monospace; font-size: 10px; letter-spacing: 0.18em; text-decoration: none; color: #FF9E6E; border: 1px solid rgba(255,158,110,0.4); padding: 10px 16px; border-radius: 3px; transition: background 0.2s ease;`)} className={pseudoClass(`background: rgba(255,158,110,0.1); color: #FF9E6E;`)}>FULL MISSION REPORT ↗</a>
          </div>

          <div style={sx(`min-width: 0;`)}>
            <div data-mc-bezel="" data-astro-perch="" data-solid="" style={sx(`background: #0B0F1A; border: 1px solid rgba(255,158,110,0.24); border-radius: 14px; padding: 12px; box-shadow: 0 0 90px -30px rgba(255,158,110,0.5), 0 30px 60px -30px rgba(0,0,0,0.8);`)}>
              <div style={sx(`display: flex; align-items: center; gap: 8px; padding: 4px 6px 10px; flex-wrap: wrap;`)}>
                <span style={sx(`width: 8px; height: 8px; border-radius: 50%; background: rgba(237,239,247,0.16);`)}></span>
                <span style={sx(`width: 8px; height: 8px; border-radius: 50%; background: rgba(237,239,247,0.16);`)}></span>
                <span style={sx(`width: 8px; height: 8px; border-radius: 50%; background: rgba(237,239,247,0.16);`)}></span>
                <span style={sx(`font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.2em; color: rgba(237,239,247,0.5); margin-left: 10px;`)}>LIFE HUB — LIVE SYSTEM</span>
                <span style={sx(`margin-left: auto; display: flex; align-items: center; gap: 6px; font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.16em; color: #4ADE80;`)}><span style={sx(`width: 5px; height: 5px; border-radius: 50%; background: #4ADE80; animation: mc-pulse 2s ease-in-out infinite;`)}></span>REAL — CLICK AROUND</span>
              </div>
              <div style={sx(`display: flex; gap: 8px; padding: 0 6px 12px;`)}>
                {(vals.p3Tabs).map((tab: any, _mci13: number) => (<Fragment key={_mci13}>
                  <button onClick={tab.go} style={sx(`cursor: pointer; font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.16em; color: ${tab.color}; background: ${tab.bg}; border: 1px solid ${tab.border}; padding: 6px 12px; border-radius: 3px; transition: all 0.25s ease;`)}>{tab.label}</button>
                </Fragment>))}
                <span data-mc-hidemobile="" style={sx(`margin-left: auto; align-self: center; font-family: 'Martian Mono', monospace; font-size: 8.5px; letter-spacing: 0.14em; color: rgba(237,239,247,0.52);`)}>APP MAP {vals.p3Pos}</span>
              </div>
              <div data-screenon="" style={sx(`border-radius: 9px; overflow: hidden;`)}>
                <div style={sx(`display: flex; transform: ${vals.p3Track}; transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);`)}>

                  
                  <div style={sx(`flex: 0 0 100%; min-width: 0;`)}>
                    <div data-mc-app="" style={sx(`font-family: 'Geist', sans-serif; background: #FBF5EA; padding: 24px; box-sizing: border-box; color: #2A2622; height: 100%;`)}>
                      <div style={sx(`display: flex; align-items: center; gap: 10px; flex-wrap: wrap;`)}>
                        <div style={sx(`width: 26px; height: 26px; border-radius: 8px; background: linear-gradient(135deg, #D9622B, #E8956D); display: flex; align-items: center; justify-content: center;`)}><svg width="14" height="14" viewBox="0 0 14 14"><path d="M2.5 7 L7 3 L11.5 7" fill="none" stroke="#FBF5EA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path><rect x="4.5" y="7" width="5" height="4" rx="1" fill="#FBF5EA"></rect></svg></div>
                        <div style={sx(`font-family: 'Bricolage Grotesque', sans-serif; font-size: 19px; font-weight: 700; letter-spacing: -0.01em;`)}>Life Hub</div>
                        <div style={sx(`font-size: 12px; color: #8C8378; font-weight: 500;`)}>Fri 11 Jul · Today view</div>
                        <div style={sx(`margin-left: auto; font-size: 9px; font-weight: 700; letter-spacing: 0.12em; color: #C25A28; border: 1px solid #E4C4AE; background: #FDF0E4; padding: 4px 8px; border-radius: 999px;`)}>IN DAILY USE</div>
                      </div>
                      <div style={sx(`display: flex; align-items: flex-end; gap: 18px; margin: 16px 0 6px; flex-wrap: wrap;`)}>
                        <div style={sx(`font-family: 'Bricolage Grotesque', sans-serif; font-size: 72px; line-height: 0.9; font-weight: 800; letter-spacing: -0.03em; color: ${vals.hubNumColor}; transition: color 0.4s ease;`)}>{vals.hubLeft}</div>
                        <div style={sx(`padding-bottom: 8px;`)}>
                          <div style={sx(`font-family: 'Bricolage Grotesque', sans-serif; font-size: 18px; font-weight: 700;`)}>{vals.hubHeadline}</div>
                          <div style={sx(`font-size: 12.5px; color: #8C8378; font-weight: 500; margin-top: 2px;`)}>{vals.hubSub}</div>
                        </div>
                      </div>
                      <div style={sx(`display: flex; align-items: center; gap: 12px; margin: 13px 0 16px;`)}>
                        <div style={sx(`flex: 1; height: 8px; background: #EFE3CF; border-radius: 999px; overflow: hidden;`)}><div style={sx(`height: 100%; width: ${vals.hubPct}; background: linear-gradient(90deg, #D9622B, #E8956D); border-radius: 999px; transition: width 0.5s ease;`)}></div></div>
                        <div style={sx(`font-family: 'Geist Mono', monospace; font-size: 11px; color: #C25A28;`)}>{vals.hubPctLabel}</div>
                      </div>
                      <div style={sx(`display: flex; flex-direction: column;`)}>
                        {(vals.hubTasks).map((task: any, _mci14: number) => (<Fragment key={_mci14}>
                          <div onClick={task.toggle} style={sx(`cursor: pointer; display: flex; align-items: center; gap: 13px; padding: 10px; border-radius: 8px; transition: background 0.15s ease;`)} className={pseudoClass(`background: rgba(217,98,43,0.06);`, `background: rgba(217,98,43,0.12);`)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); (task.toggle)(e); } }}>
                            <div style={sx(`width: 21px; height: 21px; border-radius: 50%; box-sizing: border-box; border: 2px solid ${task.ring}; background: ${task.fill}; color: #FBF5EA; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; transition: background 0.2s ease, border-color 0.2s ease; flex-shrink: 0;`)}>{task.tick}</div>
                            <div style={sx(`flex: 1; font-size: 14px; font-weight: 600; color: ${task.color}; text-decoration: ${task.deco}; transition: color 0.2s ease;`)}>{task.label}</div>
                            <div style={sx(`font-family: 'Geist Mono', monospace; font-size: 10.5px; color: #A89C8C;`)}>{task.time}</div>
                          </div>
                        </Fragment>))}
                      </div>
                    </div>
                  </div>

                  
                  <div style={sx(`flex: 0 0 100%; min-width: 0;`)}>
                    <div data-mc-app="" style={sx(`font-family: 'Geist', sans-serif; background: #FBF5EA; padding: 24px; box-sizing: border-box; color: #2A2622; height: 100%;`)}>
                      <div style={sx(`display: flex; align-items: center; gap: 10px; flex-wrap: wrap;`)}>
                        <div style={sx(`width: 26px; height: 26px; border-radius: 8px; background: linear-gradient(135deg, #D9622B, #E8956D); display: flex; align-items: center; justify-content: center;`)}><svg width="14" height="14" viewBox="0 0 14 14"><path d="M2.5 7 L7 3 L11.5 7" fill="none" stroke="#FBF5EA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path><rect x="4.5" y="7" width="5" height="4" rx="1" fill="#FBF5EA"></rect></svg></div>
                        <div style={sx(`font-family: 'Bricolage Grotesque', sans-serif; font-size: 19px; font-weight: 700; letter-spacing: -0.01em;`)}>Week rhythm</div>
                        <div style={sx(`font-size: 12px; color: #8C8378; font-weight: 500;`)}>Mon 7 – Sun 13 Jul</div>
                      </div>
                      <div style={sx(`display: flex; align-items: flex-end; gap: 18px; margin: 16px 0 20px; flex-wrap: wrap;`)}>
                        <div style={sx(`font-family: 'Bricolage Grotesque', sans-serif; font-size: 72px; line-height: 0.9; font-weight: 800; letter-spacing: -0.03em; color: #D9622B;`)}>{vals.weekPct}<span style={sx(`font-size: 34px;`)}>%</span></div>
                        <div style={sx(`padding-bottom: 8px;`)}>
                          <div style={sx(`font-family: 'Bricolage Grotesque', sans-serif; font-size: 18px; font-weight: 700;`)}>of the week's rhythm held</div>
                          <div style={sx(`font-size: 12.5px; color: #8C8378; font-weight: 500; margin-top: 2px;`)}>Friday updates live as you check things off ← try it on the Today screen</div>
                        </div>
                      </div>
                      <div style={sx(`display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px;`)}>
                        {(vals.weekDays).map((day: any, _mci15: number) => (<Fragment key={_mci15}>
                          <div style={sx(`display: flex; flex-direction: column; align-items: center; gap: 8px; background: ${day.bg}; border: 1.5px solid ${day.border}; border-radius: 12px; padding: 12px 6px;`)}>
                            <div style={sx(`font-size: 10px; font-weight: 700; letter-spacing: 0.1em; color: ${day.labelColor};`)}>{day.label}</div>
                            <div style={sx(`display: flex; flex-direction: column; gap: 4px;`)}>
                              {(day.dots).map((dot: any, _mci16: number) => (<Fragment key={_mci16}>
                                <span style={sx(`width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; background: ${dot.fill}; border: 1.5px solid ${dot.ring};`)}></span>
                              </Fragment>))}
                            </div>
                            <div style={sx(`font-family: 'Geist Mono', monospace; font-size: 9.5px; color: ${day.countColor};`)}>{day.count}</div>
                          </div>
                        </Fragment>))}
                      </div>
                      <div style={sx(`font-size: 11.5px; color: #8C8378; font-weight: 500; margin-top: 14px;`)}>Six routines a day keep the household running. The rhythm view is why we open it every morning.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={sx(`display: flex; align-items: baseline; gap: 14px; flex-wrap: wrap; font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.18em; color: rgba(237,239,247,0.58); padding: 12px 6px 0;`)}>
              <span style={sx(`color: #FF9E6E;`)}>SYS-03</span>
              <span style={sx(`color: ${vals.part3Color}; transition: color 0.4s ease;`)}>{vals.part3Text}</span>
              <span>CHECK THINGS OFF — THE BIG NUMBER & THE WEEK FOLLOW</span>
              <a href="#" onClick={vals.hubReset} style={sx(`margin-left: auto; color: rgba(237,239,247,0.6); text-decoration: none; border-bottom: 1px solid rgba(237,239,247,0.3);`)}>RESET</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    
    <section id="pay-04" data-fly-sec="" data-room="3" data-mc-seen={vals.p4Seen} style={sx(`position: relative; padding: 92px 0 72px; scroll-margin-top: 64px;`)} data-screen-label="Payload 04 — Property platform">
      <div style={sx(`position: absolute; inset: 0; pointer-events: none; background: linear-gradient(180deg, transparent, rgba(110,200,255,0.045) 30%, rgba(110,200,255,0.045) 70%, transparent);`)}></div>
      <div data-mc-pad="" style={sx(`position: relative; max-width: 1380px; margin: 0 auto; padding-left: 36px; padding-right: 36px; box-sizing: border-box;`)}>
        <div data-st="" style={sx(`display: flex; align-items: center; gap: 18px; margin-bottom: 34px; flex-wrap: wrap;`)}>
          <div data-mc-num="" style={sx(`font-family: 'Archivo Black', sans-serif; font-size: 84px; line-height: 0.9; color: transparent; -webkit-text-stroke: 1.5px rgba(110,200,255,0.55);`)}>04</div>
          <svg data-mc-logo="" width="52" height="52" viewBox="0 0 52 52" style={sx(`flex-shrink: 0; filter: drop-shadow(0 0 18px rgba(110,200,255,0.45));`)}><defs><linearGradient id="lg-pp" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2D6CB5"></stop><stop offset="1" stopColor="#24303E"></stop></linearGradient></defs><rect width="52" height="52" rx="12" fill="url(#lg-pp)"></rect><rect x="14" y="14" width="11" height="11" rx="3" fill="#FFFFFF" opacity="0.95"></rect><rect x="27" y="14" width="11" height="11" rx="3" fill="#FFFFFF" opacity="0.5"></rect><rect x="14" y="27" width="11" height="11" rx="3" fill="#FFFFFF" opacity="0.5"></rect><rect x="27" y="27" width="11" height="11" rx="3" fill="#FFFFFF" opacity="0.95"></rect></svg>
          <div>
            <div style={sx(`font-family: 'Martian Mono', monospace; font-size: 9.5px; letter-spacing: 0.24em; color: #6EC8FF; margin-bottom: 6px;`)}>PLANET 04 — MULTI-TENANT SAAS</div>
            <h2 style={sx(`margin: 0; font-family: 'Geist', sans-serif; font-weight: 600; font-size: clamp(30px, 4vw, 52px); line-height: 1; letter-spacing: -0.02em; background: linear-gradient(92deg, #C4E5FF, #6EC8FF); -webkit-background-clip: text; background-clip: text; color: transparent;`)}>Property platform</h2>
          </div>
          <div style={sx(`margin-left: auto; display: inline-flex; align-items: center; gap: 8px; font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.18em; border: 1px solid rgba(110,200,255,0.5); color: #6EC8FF; padding: 7px 12px; border-radius: 2px;`)}>
            <span style={sx(`width: 6px; height: 6px; border-radius: 50%; background: #6EC8FF; animation: mc-pulse 2.4s ease-in-out infinite;`)}></span>
            CLIENT DELIVERY · CODE PRIVATE
          </div>
        </div>

        <div data-mc-pay="" style={sx(`display: grid; grid-template-columns: minmax(0, 1fr) 350px; gap: 52px; align-items: start;`)}>
          <div style={sx(`min-width: 0;`)}>
            <div data-mc-bezel="" data-astro-perch="" data-solid="" style={sx(`background: #0B0F1A; border: 1px solid rgba(110,200,255,0.24); border-radius: 14px; padding: 12px; box-shadow: 0 0 90px -30px rgba(110,200,255,0.5), 0 30px 60px -30px rgba(0,0,0,0.8);`)}>
              <div style={sx(`display: flex; align-items: center; gap: 8px; padding: 4px 6px 10px; flex-wrap: wrap;`)}>
                <span style={sx(`width: 8px; height: 8px; border-radius: 50%; background: rgba(237,239,247,0.16);`)}></span>
                <span style={sx(`width: 8px; height: 8px; border-radius: 50%; background: rgba(237,239,247,0.16);`)}></span>
                <span style={sx(`width: 8px; height: 8px; border-radius: 50%; background: rgba(237,239,247,0.16);`)}></span>
                <span style={sx(`font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.2em; color: rgba(237,239,247,0.5); margin-left: 10px;`)}>BRAND STUDIO — LIVE SYSTEM</span>
                <span style={sx(`margin-left: auto; display: flex; align-items: center; gap: 6px; font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.16em; color: #4ADE80;`)}><span style={sx(`width: 5px; height: 5px; border-radius: 50%; background: #4ADE80; animation: mc-pulse 2s ease-in-out infinite;`)}></span>REAL — CLICK AROUND</span>
              </div>
              <div style={sx(`display: flex; gap: 8px; padding: 0 6px 12px;`)}>
                {(vals.p4Tabs).map((tab: any, _mci17: number) => (<Fragment key={_mci17}>
                  <button onClick={tab.go} style={sx(`cursor: pointer; font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.16em; color: ${tab.color}; background: ${tab.bg}; border: 1px solid ${tab.border}; padding: 6px 12px; border-radius: 3px; transition: all 0.25s ease;`)}>{tab.label}</button>
                </Fragment>))}
                <span data-mc-hidemobile="" style={sx(`margin-left: auto; align-self: center; font-family: 'Martian Mono', monospace; font-size: 8.5px; letter-spacing: 0.14em; color: rgba(237,239,247,0.52);`)}>APP MAP {vals.p4Pos}</span>
              </div>
              <div data-screenon="" style={sx(`border-radius: 9px; overflow: hidden;`)}>
                <div style={sx(`display: flex; transform: ${vals.p4Track}; transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);`)}>

                  
                  <div style={sx(`flex: 0 0 100%; min-width: 0;`)}>
                    <div data-mc-app="" style={sx(`font-family: 'Geist', sans-serif; background: linear-gradient(160deg, #E9EEF4, #DDE5EE); padding: 20px; box-sizing: border-box; color: #24303E; height: 100%;`)}>
                      <div style={sx(`font-size: 9.5px; font-weight: 700; letter-spacing: 0.14em; color: #5B6B7E; margin-bottom: 10px;`)}>BRAND STUDIO — SWITCH TENANT TO LIVE-REBRAND THE WORKBENCH</div>
                      <div style={sx(`display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px;`)}>
                        {(vals.tenants).map((t: any, _mci18: number) => (<Fragment key={_mci18}>
                          <button onClick={t.select} style={sx(`cursor: pointer; display: flex; align-items: center; gap: 8px; font-family: 'Geist', sans-serif; font-size: 12px; font-weight: 600; color: ${t.textColor}; background: ${t.bg}; border: 1px solid ${t.borderColor}; padding: 8px 13px; border-radius: 7px; transition: all 0.25s ease;`)} className={pseudoClass('', `transform: scale(0.97);`)}>
                            <span style={sx(`width: 16px; height: 16px; border-radius: 4px; background: ${t.mark}; color: #fff; font-size: 9px; font-weight: 800; display: flex; align-items: center; justify-content: center;`)}>{t.letter}</span>{t.name}
                          </button>
                        </Fragment>))}
                      </div>
                      <div style={sx(`background: rgba(255,255,255,0.62); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.85); border-radius: 10px; padding: 16px; box-shadow: 0 10px 30px -12px rgba(36,48,62,0.2);`)}>
                        <div style={sx(`display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 14px;`)}>
                          <div style={sx(`width: 30px; height: 30px; border-radius: 7px; background: ${vals.activeTenant.color}; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 800; transition: background 0.35s ease;`)}>{vals.activeTenant.letter}</div>
                          <div>
                            <div style={sx(`font-size: 14.5px; font-weight: 700; transition: color 0.35s ease; color: ${vals.activeTenant.dark};`)}>{vals.activeTenant.name}</div>
                            <div style={sx(`font-size: 10.5px; color: #7A8798;`)}>{vals.activeTenant.tag} · Student workbench</div>
                          </div>
                          <div style={sx(`margin-left: auto; font-family: 'Geist Mono', monospace; font-size: 9.5px; letter-spacing: 0.08em; color: #7A8798;`)}>tenant theme = one config object</div>
                        </div>
                        <div data-mc-statgrid="" style={sx(`display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 9px; margin-bottom: 14px;`)}>
                          {(vals.propStats).map((st: any, _mci19: number) => (<Fragment key={_mci19}>
                            <div style={sx(`background: rgba(255,255,255,0.7); border: 1px solid rgba(122,135,152,0.22); border-radius: 8px; padding: 11px;`)}>
                              <div style={sx(`font-family: 'Geist Mono', monospace; font-size: 21px; font-weight: 600; color: ${st.color}; transition: color 0.35s ease;`)}>{st.value}</div>
                              <div style={sx(`font-size: 9px; font-weight: 600; letter-spacing: 0.1em; color: #7A8798; margin-top: 3px;`)}>{st.label}</div>
                            </div>
                          </Fragment>))}
                        </div>
                        <div style={sx(`display: flex; align-items: flex-end; gap: 6px; height: 58px; padding: 0 2px 2px; border-bottom: 1px solid rgba(122,135,152,0.25); margin-bottom: 12px;`)}>
                          {(vals.propBars).map((bar: any, _mci20: number) => (<Fragment key={_mci20}>
                            <div style={sx(`flex: 1; height: ${bar.h}; background: ${bar.color}; border-radius: 3px 3px 0 0; opacity: ${bar.op}; transition: background 0.35s ease;`)}></div>
                          </Fragment>))}
                        </div>
                        <div style={sx(`display: flex; align-items: center; gap: 10px; flex-wrap: wrap;`)}>
                          <button style={sx(`cursor: pointer; border: none; font-family: 'Geist', sans-serif; font-size: 12.5px; font-weight: 600; color: #FFFFFF; background: ${vals.activeTenant.color}; padding: 9px 17px; border-radius: 7px; transition: background 0.35s ease;`)} className={pseudoClass('', `transform: scale(0.97);`)}>New enquiry</button>
                          <span style={sx(`font-size: 11px; color: #7A8798;`)}>Weekly digest · {vals.activeTenant.name} students</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  
                  <div style={sx(`flex: 0 0 100%; min-width: 0;`)}>
                    <div data-mc-app="" style={sx(`font-family: 'Geist', sans-serif; background: linear-gradient(160deg, #E9EEF4, #DDE5EE); padding: 20px; box-sizing: border-box; color: #24303E; height: 100%;`)}>
                      <div style={sx(`font-size: 9.5px; font-weight: 700; letter-spacing: 0.14em; color: #5B6B7E; margin-bottom: 10px;`)}>TENANT CONFIG — THE OBJECT DOING THE REBRANDING</div>
                      <div style={sx(`display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px;`)}>
                        {(vals.tenants).map((t: any, _mci21: number) => (<Fragment key={_mci21}>
                          <button onClick={t.select} style={sx(`cursor: pointer; display: flex; align-items: center; gap: 8px; font-family: 'Geist', sans-serif; font-size: 12px; font-weight: 600; color: ${t.textColor}; background: ${t.bg}; border: 1px solid ${t.borderColor}; padding: 8px 13px; border-radius: 7px; transition: all 0.25s ease;`)} className={pseudoClass('', `transform: scale(0.97);`)}>
                            <span style={sx(`width: 16px; height: 16px; border-radius: 4px; background: ${t.mark}; color: #fff; font-size: 9px; font-weight: 800; display: flex; align-items: center; justify-content: center;`)}>{t.letter}</span>{t.name}
                          </button>
                        </Fragment>))}
                      </div>
                      <div style={sx(`background: #0F1722; border-radius: 10px; padding: 18px 20px; font-family: 'Geist Mono', monospace; font-size: 12px; line-height: 2; box-shadow: 0 10px 30px -12px rgba(36,48,62,0.4);`)}>
                        <div style={sx(`color: #5B7A99;`)}>// one object rebrands everything — no redeploy</div>
                        <div style={sx(`color: #C9D6E4;`)}>{"{"}</div>
                        <div style={sx(`color: #C9D6E4; padding-left: 18px;`)}><span style={sx(`color: #6EC8FF;`)}>"tenant"</span>: <span style={sx(`color: #A7F3D0;`)}>"{vals.activeTenant.slug}"</span>,</div>
                        <div style={sx(`color: #C9D6E4; padding-left: 18px;`)}><span style={sx(`color: #6EC8FF;`)}>"brand"</span>{": {"}</div>
                        <div style={sx(`color: #C9D6E4; padding-left: 36px;`)}><span style={sx(`color: #6EC8FF;`)}>"name"</span>: <span style={sx(`color: #A7F3D0;`)}>"{vals.activeTenant.name}"</span>,</div>
                        <div style={sx(`color: #C9D6E4; padding-left: 36px; display: flex; align-items: center; gap: 8px;`)}><span><span style={sx(`color: #6EC8FF;`)}>"primary"</span>: <span style={sx(`color: #A7F3D0;`)}>"{vals.activeTenant.hex}"</span>,</span><span style={sx(`width: 12px; height: 12px; border-radius: 3px; background: ${vals.activeTenant.color}; display: inline-block; transition: background 0.35s ease;`)}></span></div>
                        <div style={sx(`color: #C9D6E4; padding-left: 36px;`)}><span style={sx(`color: #6EC8FF;`)}>"mark"</span>: <span style={sx(`color: #A7F3D0;`)}>"{vals.activeTenant.letter}"</span></div>
                        <div style={sx(`color: #C9D6E4; padding-left: 18px;`)}>{"},"}</div>
                        <div style={sx(`color: #C9D6E4; padding-left: 18px;`)}><span style={sx(`color: #6EC8FF;`)}>"theme"</span>: <span style={sx(`color: #A7F3D0;`)}>"glass"</span>,</div>
                        <div style={sx(`color: #C9D6E4; padding-left: 18px;`)}><span style={sx(`color: #6EC8FF;`)}>"modules"</span>: [<span style={sx(`color: #A7F3D0;`)}>"listings"</span>, <span style={sx(`color: #A7F3D0;`)}>"enquiries"</span>, <span style={sx(`color: #A7F3D0;`)}>"inspections"</span>, <span style={sx(`color: #A7F3D0;`)}>"applications"</span>]</div>
                        <div style={sx(`color: #C9D6E4;`)}>{"}"}</div>
                      </div>
                      <div style={sx(`font-size: 11px; color: #5B6B7E; font-weight: 500; margin-top: 12px;`)}>Switch tenants above and watch the object — that's the whole white-label thesis in one screen.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={sx(`display: flex; align-items: baseline; gap: 14px; flex-wrap: wrap; font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.18em; color: rgba(237,239,247,0.58); padding: 12px 6px 0;`)}>
              <span style={sx(`color: #6EC8FF;`)}>SYS-04</span>
              <span style={sx(`color: ${vals.part4Color}; transition: color 0.4s ease;`)}>{vals.part4Text}</span>
              <span>ONE CONFIG OBJECT REBRANDS EVERYTHING</span>
              <span data-mc-hidemobile="" style={sx(`margin-left: auto;`)}>ANONYMISED · CODE PRIVATE</span>
            </div>
          </div>

          <div data-mc-syscard="" data-st="" style={sx(`display: flex; flex-direction: column; position: sticky; top: 84px; order: 2; animation-delay: 0.15s;`)}>
            <div style={sx(`font-size: 15.5px; line-height: 1.65; color: rgba(237,239,247,0.88); margin-bottom: 8px;`)}>Client build → multi-tenant white-label SaaS. Glass fintech UI, tenant-swappable brand.</div>
            <div style={sx(`font-family: 'Martian Mono', monospace; font-size: 10px; letter-spacing: 0.08em; color: rgba(237,239,247,0.58); margin-bottom: 20px;`)}>next.js · postgres RLS</div>
            <div style={sx(`font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.22em; color: #6EC8FF; margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid rgba(110,200,255,0.35);`)}>FLIGHT RULES — DESIGN DECISIONS</div>
            <ol style={sx(`margin: 0 0 24px; padding: 0; list-style: none; display: flex; flex-direction: column;`)}>
              <li style={sx(`display: flex; gap: 12px; padding: 11px 0; border-bottom: 1px solid rgba(147,162,255,0.12); font-size: 15px; line-height: 1.55; color: rgba(237,239,247,0.92);`)}><span style={sx(`font-family: 'Martian Mono', monospace; font-size: 10px; color: #6EC8FF; padding-top: 3px;`)}>R1</span>White-label from day one — brand is one config object</li>
              <li style={sx(`display: flex; gap: 12px; padding: 11px 0; border-bottom: 1px solid rgba(147,162,255,0.12); font-size: 15px; line-height: 1.55; color: rgba(237,239,247,0.92);`)}><span style={sx(`font-family: 'Martian Mono', monospace; font-size: 10px; color: #6EC8FF; padding-top: 3px;`)}>R2</span>One client build, rebuilt as a platform</li>
              <li style={sx(`display: flex; gap: 12px; padding: 11px 0; border-bottom: 1px solid rgba(147,162,255,0.12); font-size: 15px; line-height: 1.55; color: rgba(237,239,247,0.92);`)}><span style={sx(`font-family: 'Martian Mono', monospace; font-size: 10px; color: #6EC8FF; padding-top: 3px;`)}>R3</span>Code private; architecture walkthrough on request</li>
            </ol>
            <p style={sx(`margin: 0 0 22px; padding-left: 14px; border-left: 2px solid rgba(110,200,255,0.55); font-family: 'Instrument Serif', serif; font-style: italic; font-size: 20px; line-height: 1.5; color: rgba(237,239,247,0.88);`)}>Mission note — a client delivery rebuilt as a white-label platform. The brand switcher is the whole thesis.</p>
            <a href="/reports/property-platform" onClick={vals.goReport4} style={sx(`align-self: flex-start; font-family: 'Martian Mono', monospace; font-size: 10px; letter-spacing: 0.18em; text-decoration: none; color: #6EC8FF; border: 1px solid rgba(110,200,255,0.4); padding: 10px 16px; border-radius: 3px; transition: background 0.2s ease;`)} className={pseudoClass(`background: rgba(110,200,255,0.1); color: #6EC8FF;`)}>FULL MISSION REPORT ↗</a>
          </div>
        </div>
      </div>
    </section>

    
    <section data-fly-sec="" data-mc-seen={vals.planSeen} style={sx(`border-top: 1px solid rgba(147,162,255,0.14); background: rgba(11,15,26,0.45);`)} data-screen-label="Flight plan — How I build with AI">
      <div data-mc-pad="" style={sx(`max-width: 1380px; margin: 0 auto; padding: 84px 36px 88px; box-sizing: border-box;`)}>
        <div data-st="" style={sx(`font-family: 'Martian Mono', monospace; font-size: 10px; letter-spacing: 0.24em; color: rgba(237,239,247,0.5); margin-bottom: 16px;`)}>FLIGHT PLAN</div>
        <h2 data-st="" data-astro-perch="" style={sx(`margin: 0 0 48px; font-family: 'Archivo Black', sans-serif; font-size: clamp(28px, 3.8vw, 52px); line-height: 1.02; animation-delay: 0.1s;`)}>How I build <span style={sx(`background: linear-gradient(92deg, #FF6EC7, #9B7CFF, #34E0FF); -webkit-background-clip: text; background-clip: text; color: transparent;`)}>with AI</span></h2>
        <div data-st="" style={sx(`position: relative; animation-delay: 0.2s;`)}>
          <div data-line="" style={sx(`position: absolute; top: 17px; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, #FF6EC7, #9B7CFF, #34E0FF);`)} data-mc-hidemobile=""></div>
          <div data-mc-cols3="" style={sx(`display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 36px;`)}>
            <div style={sx(`position: relative;`)}>
              <div style={sx(`width: 35px; height: 35px; border-radius: 50%; background: #05070D; border: 1px solid #FF6EC7; color: #FF6EC7; font-family: 'Martian Mono', monospace; font-size: 11px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;`)}>01</div>
              <div style={sx(`font-size: 19px; font-weight: 700; margin-bottom: 8px;`)}>Problem first</div>
              <p style={sx(`margin: 0; font-size: 14.5px; line-height: 1.65; color: rgba(237,239,247,0.7);`)}>Every build starts as a customer problem I've watched real people have — never as a technology looking for one.</p>
            </div>
            <div style={sx(`position: relative;`)}>
              <div style={sx(`width: 35px; height: 35px; border-radius: 50%; background: #05070D; border: 1px solid #9B7CFF; color: #9B7CFF; font-family: 'Martian Mono', monospace; font-size: 11px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;`)}>02</div>
              <div style={sx(`font-size: 19px; font-weight: 700; margin-bottom: 8px;`)}>PRD before code</div>
              <p style={sx(`margin: 0; font-size: 14.5px; line-height: 1.65; color: rgba(237,239,247,0.7);`)}>I write the PRD, the success criteria and the cut list before a line is generated. The thinking is the work.</p>
            </div>
            <div style={sx(`position: relative;`)}>
              <div style={sx(`width: 35px; height: 35px; border-radius: 50%; background: #05070D; border: 1px solid #34E0FF; color: #34E0FF; font-family: 'Martian Mono', monospace; font-size: 11px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;`)}>03</div>
              <div style={sx(`font-size: 19px; font-weight: 700; margin-bottom: 8px;`)}>Ship, then listen</div>
              <p style={sx(`margin: 0; font-size: 14.5px; line-height: 1.65; color: rgba(237,239,247,0.7);`)}>Real users, honest status labels, and iteration driven by what people actually do — not what they say.</p>
            </div>
          </div>
        </div>
        <div data-st="" data-astro-perch="" data-solid="" style={sx(`margin-top: 52px; border: 1px solid rgba(255,194,75,0.35); border-radius: 8px; padding: 24px 28px; max-width: 780px; background: rgba(255,194,75,0.04); animation-delay: 0.3s;`)}>
          <div style={sx(`font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.24em; color: #FFC24B; margin-bottom: 12px;`)}>FLIGHT RULE 00 — AN HONEST LIMIT</div>
          <p style={sx(`margin: 0; font-family: 'Instrument Serif', serif; font-style: italic; font-size: clamp(19px, 2.2vw, 25px); line-height: 1.5; color: rgba(237,239,247,0.92);`)}>"AI writes much of my code. It doesn't decide what to build, for whom, or what ships — that's the job."</p>
        </div>
      </div>
    </section>

    
    <section data-fly-sec="" data-mc-seen={vals.archSeen} style={sx(`border-top: 1px solid rgba(147,162,255,0.14);`)} data-screen-label="Flight systems — architecture">
      <div data-mc-pad="" style={sx(`max-width: 1380px; margin: 0 auto; padding: 84px 36px 88px; box-sizing: border-box;`)}>
        <div data-st="" style={sx(`font-family: 'Martian Mono', monospace; font-size: 10px; letter-spacing: 0.24em; color: rgba(237,239,247,0.5); margin-bottom: 16px;`)}>FLIGHT SYSTEMS — ARCHITECTURE & OPS</div>
        <h2 data-st="" data-astro-perch="" style={sx(`margin: 0 0 14px; font-family: 'Archivo Black', sans-serif; font-size: clamp(28px, 3.8vw, 52px); line-height: 1.02; animation-delay: 0.1s;`)}>One stack, <span style={sx(`background: linear-gradient(92deg, #FF6EC7, #9B7CFF, #34E0FF); -webkit-background-clip: text; background-clip: text; color: transparent;`)}>built to run itself</span></h2>
        <p data-st="" style={sx(`margin: 0 0 40px; max-width: 64ch; font-size: 16px; line-height: 1.65; color: rgba(237,239,247,0.72); animation-delay: 0.15s;`)}>Four products, one deliberate architecture — chosen so a solo builder can operate like a team. Boring where it should be boring; clever only where it pays.</p>
        <div data-st="" style={sx(`display: flex; flex-direction: column; gap: 10px; max-width: 920px; animation-delay: 0.2s;`)}>
          <div data-mc-archrow="" style={sx(`display: grid; grid-template-columns: 96px minmax(0,1fr); gap: 16px; background: rgba(11,15,26,0.6); border: 1px solid rgba(147,162,255,0.16); border-radius: 8px; padding: 18px 20px; align-items: baseline;`)}>
            <span style={sx(`font-family: 'Martian Mono', monospace; font-size: 10px; letter-spacing: 0.2em; color: #FF6EC7;`)}>EDGE</span>
            <div>
              <div style={sx(`font-size: 16.5px; font-weight: 700; margin-bottom: 4px;`)}>Vercel</div>
              <p style={sx(`margin: 0; font-size: 14px; line-height: 1.6; color: rgba(237,239,247,0.72);`)}>Zero-ops deploys, a preview URL for every change. <span style={sx(`color: rgba(237,239,247,0.92);`)}>Why: shipping speed beats infra novelty — I deploy daily without thinking about servers.</span></p>
            </div>
          </div>
          <div data-mc-archrow="" style={sx(`display: grid; grid-template-columns: 96px minmax(0,1fr); gap: 16px; background: rgba(11,15,26,0.6); border: 1px solid rgba(147,162,255,0.16); border-radius: 8px; padding: 18px 20px; align-items: baseline;`)}>
            <span style={sx(`font-family: 'Martian Mono', monospace; font-size: 10px; letter-spacing: 0.2em; color: #9B7CFF;`)}>APP</span>
            <div>
              <div style={sx(`font-size: 16.5px; font-weight: 700; margin-bottom: 4px;`)}>Next.js + TypeScript</div>
              <p style={sx(`margin: 0; font-size: 14px; line-height: 1.6; color: rgba(237,239,247,0.72);`)}>The same framework across all four products. <span style={sx(`color: rgba(237,239,247,0.92);`)}>Why: one mental model everywhere — anything learned on one product compounds across the fleet.</span></p>
            </div>
          </div>
          <div data-mc-archrow="" style={sx(`display: grid; grid-template-columns: 96px minmax(0,1fr); gap: 16px; background: rgba(11,15,26,0.6); border: 1px solid rgba(147,162,255,0.16); border-radius: 8px; padding: 18px 20px; align-items: baseline;`)}>
            <span style={sx(`font-family: 'Martian Mono', monospace; font-size: 10px; letter-spacing: 0.2em; color: #34E0FF;`)}>DATA</span>
            <div>
              <div style={sx(`font-size: 16.5px; font-weight: 700; margin-bottom: 4px;`)}>Supabase — Postgres + row-level security</div>
              <p style={sx(`margin: 0; font-size: 14px; line-height: 1.6; color: rgba(237,239,247,0.72);`)}>Auth, storage, and RLS as the permission model — two users on Life Hub, whole tenants on the property platform. <span style={sx(`color: rgba(237,239,247,0.92);`)}>Why: permissions live in the database, not scattered through app code — fewer places to get security wrong.</span></p>
            </div>
          </div>
          <div data-mc-archrow="" style={sx(`display: grid; grid-template-columns: 96px minmax(0,1fr); gap: 16px; background: rgba(11,15,26,0.6); border: 1px solid rgba(147,162,255,0.16); border-radius: 8px; padding: 18px 20px; align-items: baseline;`)}>
            <span style={sx(`font-family: 'Martian Mono', monospace; font-size: 10px; letter-spacing: 0.2em; color: #FFC24B;`)}>AI</span>
            <div>
              <div style={sx(`font-size: 16.5px; font-weight: 700; margin-bottom: 4px;`)}>Claude — engine and pair-builder</div>
              <p style={sx(`margin: 0; font-size: 14px; line-height: 1.6; color: rgba(237,239,247,0.72);`)}>The styling engine inside hatched; Claude Code across every build. Prompts are versioned in the repo and reviewed like code. <span style={sx(`color: rgba(237,239,247,0.92);`)}>Why: AI is a dependency to manage, not magic to sprinkle.</span></p>
            </div>
          </div>
          <div data-mc-archrow="" style={sx(`display: grid; grid-template-columns: 96px minmax(0,1fr); gap: 16px; background: rgba(11,15,26,0.6); border: 1px solid rgba(147,162,255,0.16); border-radius: 8px; padding: 18px 20px; align-items: baseline;`)}>
            <span style={sx(`font-family: 'Martian Mono', monospace; font-size: 10px; letter-spacing: 0.2em; color: #4ADE80;`)}>COMMS</span>
            <div>
              <div style={sx(`font-size: 16.5px; font-weight: 700; margin-bottom: 4px;`)}>Resend + scheduled jobs</div>
              <p style={sx(`margin: 0; font-size: 14px; line-height: 1.6; color: rgba(237,239,247,0.72);`)}>Job Command Center reads pipeline state each morning and emails me the brief. <span style={sx(`color: rgba(237,239,247,0.92);`)}>Why: a tool you must remember to open is a tool you stop using.</span></p>
            </div>
          </div>
        </div>
        <div data-st="" data-mc-archgrid="" style={sx(`display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 14px; margin-top: 36px; animation-delay: 0.3s;`)}>
          <div style={sx(`border: 1px solid rgba(255,158,184,0.25); border-radius: 8px; padding: 16px 18px; background: rgba(11,15,26,0.5);`)}>
            <div style={sx(`display: flex; align-items: center; gap: 8px; font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.18em; color: #FF9EB8; margin-bottom: 9px;`)}><span style={sx(`width: 8px; height: 8px; border-radius: 2px; background: #FF9EB8;`)}></span>HATCHED</div>
            <p style={sx(`margin: 0; font-size: 13px; line-height: 1.6; color: rgba(237,239,247,0.72);`)}>Wardrobe images in Supabase storage; the styling prompt is the product's core IP — treated like source code.</p>
          </div>
          <div style={sx(`border: 1px solid rgba(147,162,255,0.25); border-radius: 8px; padding: 16px 18px; background: rgba(11,15,26,0.5);`)}>
            <div style={sx(`display: flex; align-items: center; gap: 8px; font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.18em; color: #93A2FF; margin-bottom: 9px;`)}><span style={sx(`width: 8px; height: 8px; border-radius: 2px; background: #93A2FF;`)}></span>JOB CMD CENTER</div>
            <p style={sx(`margin: 0; font-size: 13px; line-height: 1.6; color: rgba(237,239,247,0.72);`)}>A scheduled job reads pipeline state each morning; Resend delivers the brief. The demo above mirrors that exact flow.</p>
          </div>
          <div style={sx(`border: 1px solid rgba(255,158,110,0.25); border-radius: 8px; padding: 16px 18px; background: rgba(11,15,26,0.5);`)}>
            <div style={sx(`display: flex; align-items: center; gap: 8px; font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.18em; color: #FF9E6E; margin-bottom: 9px;`)}><span style={sx(`width: 8px; height: 8px; border-radius: 2px; background: #FF9E6E;`)}></span>LIFE HUB</div>
            <p style={sx(`margin: 0; font-size: 13px; line-height: 1.6; color: rgba(237,239,247,0.72);`)}>175k lines, 40 routes, one Postgres schema — RLS scoped to a two-person household.</p>
          </div>
          <div style={sx(`border: 1px solid rgba(110,200,255,0.25); border-radius: 8px; padding: 16px 18px; background: rgba(11,15,26,0.5);`)}>
            <div style={sx(`display: flex; align-items: center; gap: 8px; font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.18em; color: #6EC8FF; margin-bottom: 9px;`)}><span style={sx(`width: 8px; height: 8px; border-radius: 2px; background: #6EC8FF;`)}></span>PROPERTY</div>
            <p style={sx(`margin: 0; font-size: 13px; line-height: 1.6; color: rgba(237,239,247,0.72);`)}>One deployment, N tenants: a config object per tenant, enforced by Postgres RLS.</p>
          </div>
        </div>
        <div data-st="" style={sx(`margin-top: 22px; font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.18em; color: rgba(237,239,247,0.55); animation-delay: 0.35s;`)}>FULL DIAGRAMS AND THE WHY-NOT LIST — IN EACH MISSION REPORT, OR LIVE ON A CALL</div>
      </div>
    </section>

    
    <section data-fly-sec="" data-mc-seen={vals.logSeen} data-screen-label="Transfer log — CS to product">
      <div data-mc-pad="" style={sx(`max-width: 1380px; margin: 0 auto; padding: 84px 36px 88px; box-sizing: border-box;`)}>
        <div data-st="" style={sx(`font-family: 'Martian Mono', monospace; font-size: 10px; letter-spacing: 0.24em; color: rgba(237,239,247,0.5); margin-bottom: 16px;`)}>TRANSFER LOG — SIX YEARS OF CS, TRANSLATED</div>
        <h2 data-st="" data-astro-perch="" style={sx(`margin: 0 0 44px; font-family: 'Archivo Black', sans-serif; font-size: clamp(28px, 3.8vw, 52px); line-height: 1.02; max-width: 22ch; animation-delay: 0.1s;`)}>What customer success taught me about product</h2>
        <div data-mc-cols3="" data-st="" style={sx(`display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 36px; animation-delay: 0.2s;`)}>
          <div style={sx(`border-top: 1px solid rgba(237,239,247,0.2); padding-top: 18px;`)}>
            <div style={sx(`font-family: 'Martian Mono', monospace; font-size: 9.5px; color: #FF6EC7; margin-bottom: 10px; letter-spacing: 0.18em;`)}>LOG-01</div>
            <div style={sx(`font-size: 19px; font-weight: 700; margin-bottom: 8px;`)}>Adoption risk is product risk</div>
            <p style={sx(`margin: 0; font-size: 14.5px; line-height: 1.65; color: rgba(237,239,247,0.7);`)}>I've watched well-built features die because nobody changed their behaviour. I design for the moment after the demo.</p>
          </div>
          <div style={sx(`border-top: 1px solid rgba(237,239,247,0.2); padding-top: 18px;`)}>
            <div style={sx(`font-family: 'Martian Mono', monospace; font-size: 9.5px; color: #9B7CFF; margin-bottom: 10px; letter-spacing: 0.18em;`)}>LOG-02</div>
            <div style={sx(`font-size: 19px; font-weight: 700; margin-bottom: 8px;`)}>Relationships beat funnels</div>
            <p style={sx(`margin: 0; font-size: 14.5px; line-height: 1.65; color: rgba(237,239,247,0.7);`)}>Renewals taught me that trust compounds account by account. hatched is recruiting its founding cohort one conversation at a time.</p>
          </div>
          <div style={sx(`border-top: 1px solid rgba(237,239,247,0.2); padding-top: 18px;`)}>
            <div style={sx(`font-family: 'Martian Mono', monospace; font-size: 9.5px; color: #34E0FF; margin-bottom: 10px; letter-spacing: 0.18em;`)}>LOG-03</div>
            <div style={sx(`font-size: 19px; font-weight: 700; margin-bottom: 8px;`)}>Trust is a feature</div>
            <p style={sx(`margin: 0; font-size: 14.5px; line-height: 1.65; color: rgba(237,239,247,0.7);`)}>Honest status labels, no dark patterns, no auto-anything. It's why "pre-launch" is written on this page in capital letters.</p>
          </div>
        </div>
      </div>
    </section>

    
    <section id="comms" data-fly-sec="" data-mc-seen={vals.commsSeen} style={sx(`border-top: 1px solid rgba(147,162,255,0.14); position: relative; overflow: hidden;`)} data-screen-label="Comms — contact">
      <div style={sx(`position: absolute; inset: 0; pointer-events: none; background: radial-gradient(900px 480px at 50% 110%, rgba(155,124,255,0.16), transparent 70%);`)}></div>
      <div data-mc-pad="" style={sx(`position: relative; max-width: 1380px; margin: 0 auto; padding: 96px 36px 100px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 26px;`)}>
        <div data-st="" style={sx(`font-family: 'Martian Mono', monospace; font-size: 10px; letter-spacing: 0.28em; color: #4ADE80;`)}>● COMMS OPEN</div>

        
        <div data-st="" data-astro-perch="" style={sx(`display: flex; flex-direction: column; align-items: center; gap: 16px; animation-delay: 0.05s;`)}>
          <div style={sx(`transform: ${vals.shipTransform}; opacity: ${vals.shipOpacity}; transition: transform 2s cubic-bezier(0.55,0,0.85,0.3), opacity 1.9s ease;`)}>
            <svg width="70" height="98" viewBox="0 0 64 98" fill="none" style={sx(`display: block; filter: drop-shadow(0 0 26px rgba(155,124,255,0.4));`)}>
              <path d="M32 4 C42 14 46 28 46 44 L46 62 L18 62 L18 44 C18 28 22 14 32 4 Z" fill="#EDEFF7"></path>
              <path d="M32 4 C36 14 38 28 38 44 L38 62 L32 62 Z" fill="#C9D2F0" opacity="0.6"></path>
              <circle cx="32" cy="34" r="7" fill="#0B0F1A" stroke="#9B7CFF" strokeWidth="2"></circle>
              <circle cx="32" cy="34" r="3" fill="#34E0FF" opacity="0.8"></circle>
              <path d="M18 46 L6 66 L18 62 Z" fill="#FF6EC7"></path>
              <path d="M46 46 L58 66 L46 62 Z" fill={vals.finFill} stroke="#FF6EC7" strokeWidth="1.5" strokeDasharray={vals.finDash}></path>
              <rect x="24" y="62" width="16" height="6" rx="2" fill="#9B7CFF"></rect>
              <circle cx="32" cy="52" r="2.2" fill={vals.shipLight}></circle>
              <g opacity={vals.flameOp}><path d="M24 70 L32 96 L40 70 Z" fill="#FFC24B"></path><path d="M27.5 70 L32 85 L36.5 70 Z" fill="#FF6EC7"></path></g>
            </svg>
          </div>
          <div style={sx(`display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;`)}>
            {(vals.shipSlots).map((sl: any, _mci22: number) => (<Fragment key={_mci22}>
              <div style={sx(`font-family: 'Martian Mono', monospace; font-size: 8.5px; letter-spacing: 0.14em; color: ${sl.color}; border: 1px ${sl.borderStyle} ${sl.borderColor}; padding: 5px 10px; border-radius: 3px; transition: all 0.4s ease;`)}>{sl.text}</div>
            </Fragment>))}
          </div>
          <div style={sx(`font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.2em; color: ${vals.shipStatusColor}; transition: color 0.4s ease;`)}>{vals.shipStatus}</div>
        </div>
        <h2 data-st="" data-astro-perch="" style={sx(`margin: 0; font-family: 'Archivo Black', sans-serif; font-size: clamp(36px, 6vw, 84px); line-height: 0.98; text-transform: uppercase; animation-delay: 0.1s;`)}>Let's <span style={sx(`background: linear-gradient(92deg, #FF6EC7, #9B7CFF, #34E0FF); -webkit-background-clip: text; background-clip: text; color: transparent;`)}>talk.</span></h2>
        <p data-st="" style={sx(`margin: 0; max-width: 56ch; font-size: 16.5px; line-height: 1.65; color: rgba(237,239,247,0.72); animation-delay: 0.2s;`)}>AI success strategy · forward-deployed product · product at an AI startup. Sydney-based, open to remote, short notice. I'm the CS person who ships — and this page is the receipt.</p>
        <div data-st="" style={sx(`display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; animation-delay: 0.3s;`)}>
          <a href="mailto:tobiasnorman1@gmail.com" onClick={vals.launchShip} style={sx(`text-decoration: none; background: #EDEFF7; color: #05070D; font-size: 15px; font-weight: 700; padding: 15px 30px; border-radius: 4px; box-shadow: 0 0 40px -8px rgba(155,124,255,0.7); transition: transform 0.15s ease, box-shadow 0.2s ease;`)} className={pseudoClass(`transform: translateY(-2px); box-shadow: 0 0 54px -6px rgba(255,110,199,0.8); color: #05070D;`)}>{vals.ctaLabel}</a>
          <a href="https://www.linkedin.com/in/tobias-norman-66908115a" target="_blank" rel="noopener noreferrer" style={sx(`text-decoration: none; border: 1px solid rgba(237,239,247,0.28); color: #EDEFF7; font-size: 15px; font-weight: 600; padding: 14px 26px; border-radius: 4px; transition: border-color 0.2s ease, transform 0.15s ease;`)} className={pseudoClass(`border-color: #34E0FF; color: #34E0FF; transform: translateY(-2px);`)}>LinkedIn ↗</a>
          <a href="https://github.com/tobias-shaun" target="_blank" rel="noopener noreferrer" style={sx(`text-decoration: none; border: 1px solid rgba(237,239,247,0.28); color: #EDEFF7; font-size: 15px; font-weight: 600; padding: 14px 26px; border-radius: 4px; transition: border-color 0.2s ease, transform 0.15s ease;`)} className={pseudoClass(`border-color: #FF6EC7; color: #FF6EC7; transform: translateY(-2px);`)}>GitHub ↗</a>
        </div>
      </div>
    </section>

    
    <footer data-fly-sec="" style={sx(`border-top: 1px solid rgba(147,162,255,0.14); background: #04060A;`)} data-screen-label="Footer">
      <div data-mc-cols2="" data-mc-pad="" style={sx(`max-width: 1380px; margin: 0 auto; padding: 56px 36px 52px; box-sizing: border-box; display: grid; grid-template-columns: minmax(0,1fr) 400px; gap: 44px; align-items: start;`)}>
        <div style={sx(`display: flex; flex-direction: column; gap: 18px;`)}>
          <div style={sx(`font-family: 'Martian Mono', monospace; font-size: 11px; letter-spacing: 0.18em;`)}>FLIGHT OPS<span style={sx(`color: #9B7CFF;`)}> — TOBIAS</span></div>
          <div style={sx(`display: flex; gap: 22px; flex-wrap: wrap; font-family: 'Martian Mono', monospace; font-size: 10px; letter-spacing: 0.14em;`)}>
            <a href="mailto:tobiasnorman1@gmail.com" style={sx(`color: #EDEFF7; text-decoration: none; border-bottom: 1px solid rgba(237,239,247,0.3); padding-bottom: 2px;`)}>EMAIL</a>
            <a href="https://www.linkedin.com/in/tobias-norman-66908115a" target="_blank" rel="noopener noreferrer" style={sx(`color: #EDEFF7; text-decoration: none; border-bottom: 1px solid rgba(237,239,247,0.3); padding-bottom: 2px;`)}>LINKEDIN</a>
            <a href="https://github.com/tobias-shaun" target="_blank" rel="noopener noreferrer" style={sx(`color: #EDEFF7; text-decoration: none; border-bottom: 1px solid rgba(237,239,247,0.3); padding-bottom: 2px;`)}>GITHUB</a>
          </div>
          <div style={sx(`font-family: 'Martian Mono', monospace; font-size: 9px; letter-spacing: 0.1em; color: rgba(237,239,247,0.55); line-height: 2;`)}>SET IN ARCHIVO BLACK & MARTIAN MONO · BUILT WITH NEXT.JS, TYPESCRIPT & CLAUDE CODE · ALL TELEMETRY ON THIS PAGE IS REAL · © 2026</div>
        </div>
        <div data-astro-perch="" data-solid="" style={sx(`border: 1px solid rgba(147,162,255,0.2); border-radius: 8px; padding: 20px 22px; font-family: 'Martian Mono', monospace; font-size: 10.5px; line-height: 1.9; background: rgba(11,15,26,0.6);`)}>
          <div style={sx(`font-size: 9px; letter-spacing: 0.24em; color: rgba(237,239,247,0.5); margin-bottom: 12px; padding-bottom: 9px; border-bottom: 1px solid rgba(147,162,255,0.14);`)}>SYS-05 — THIS CONSOLE</div>
          <div style={sx(`display: grid; grid-template-columns: 58px 1fr; gap: 5px 12px;`)}>
            <span style={sx(`color: rgba(237,239,247,0.58);`)}>what</span><span>the fifth working system</span>
            <span style={sx(`color: rgba(237,239,247,0.58);`)}>built</span><span>PRD first · claude code · shipped</span>
            <span style={sx(`color: rgba(237,239,247,0.58);`)}>status</span><span style={sx(`color: #4ADE80;`)}>you're inside the demo</span>
          </div>
        </div>
      </div>
    </footer>
    <div data-fly-spacer=""></div>
  </div>
</div>

    </>
  );
}
