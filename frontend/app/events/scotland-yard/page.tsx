import type { Metadata } from "next";
import styles from "./scotland-yard.module.css";
import { fontVariables } from "./fonts";
import BackgroundScene from "./_components/BackgroundScene";
import CaseFile from "./_components/CaseFile";
import CipherWheel from "./_components/CipherWheel";
import ClueProvider from "./_components/ClueProvider";
import Dock from "./_components/Dock";
import Floors from "./_components/Floors";
import Masthead from "./_components/Masthead";
import Pipes from "./_components/Pipes";
import Roof from "./_components/Roof";
import SceneEffects from "./_components/SceneEffects";
import SvgDefs from "./_components/SvgDefs";
import Thames from "./_components/Thames";
import TorchToggle from "./_components/TorchToggle";

export const metadata: Metadata = {
  title: "ISTE · Scotland Yard",
  description:
    "ISTE presents Scotland Yard: The Ultimate Mystery Challenge. Crack the case, solve the clues, track the suspects.",
};

// Without JavaScript, skip the "lights off" and reveal starting states so everything stays visible.
const noScriptCss = `
#sy-root .room::before { display: none; }
#sy-root .room .note, #sy-root ol.timeline li, #sy-root .stamp,
#sy-root .cipher .telegram, #sy-root .cipher .wheel-wrap { opacity: 1; translate: none; scale: none; }
#sy-root .torch-btn { display: none; }
`;

export default function ScotlandYardPage() {
  return (
    <div id="sy-root" className={`${styles.root} ${fontVariables}`}>
      <noscript>
        <style>{noScriptCss}</style>
      </noscript>
      <div className="progress-string" aria-hidden="true" />
      <BackgroundScene />
      <SvgDefs />

      <ClueProvider>
        <Masthead />
        <main className="building" aria-label="The Yard, floor by floor">
          <Pipes />
          <Roof />
          <Floors />
          <Thames />
          <Dock />
        </main>
        <CipherWheel />
        <CaseFile />
        <footer>
          <div className="fp-row" aria-hidden="true">
            <svg><use href="#fp" /></svg><svg><use href="#fp" /></svg><svg><use href="#fp" /></svg>
          </div>
          ISTE · Scotland Yard: The Ultimate Mystery Challenge
          <p className="credit">Website designed and made by <span>Ishaan Roy</span></p>
        </footer>
        <TorchToggle />
      </ClueProvider>

      <SceneEffects />
    </div>
  );
}
