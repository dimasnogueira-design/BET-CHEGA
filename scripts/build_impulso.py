from pathlib import Path

INDEX = Path("index.html")
MARKER = "<!-- MODO IMPULSO V1 -->"

CSS = r'''
.impulse-overlay{position:fixed;inset:0;z-index:100;background:rgba(5,6,8,.94);backdrop-filter:blur(18px);display:none;align-items:center;justify-content:center;padding:20px}
.impulse-overlay.is-open{display:flex}
.impulse-panel{width:min(760px,100%);max-height:94svh;overflow:auto;background:#0B0C0E;border:1px solid #30353d;border-radius:22px;box-shadow:0 30px 100px rgba(0,0,0,.65);padding:34px}
.impulse-kicker{color:var(--lime);font-size:11px;font-weight:950;letter-spacing:.16em;margin-bottom:12px}
.impulse-panel h2{font-size:clamp(34px,6vw,58px);line-height:.95;letter-spacing:-.055em;margin:0 0 14px;font-weight:950}
.impulse-panel h2 strong{color:var(--lime);display:block}
.impulse-panel p{color:var(--muted);font-size:16px;margin:0 0 22px}
.impulse-breathing{display:grid;grid-template-columns:minmax(220px, .9fr) minmax(260px,1.1fr);gap:28px;align-items:center;margin:10px 0 8px}
.impulse-breathing img{width:100%;max-height:360px;object-fit:contain;display:block;border-radius:18px}
.impulse-breathing-copy{padding-right:8px}
.impulse-breathing-copy h3{font-size:clamp(28px,5vw,46px);line-height:.98;letter-spacing:-.05em;margin:0 0 12px;font-weight:950}
.impulse-breathing-copy h3 strong{display:block;color:var(--lime)}
.impulse-breathing-copy p{margin-bottom:18px}
.impulse-timer{font-variant-numeric:tabular-nums;font-size:72px;line-height:1;font-weight:950;letter-spacing:-.06em;margin:16px 0;text-align:left}
.impulse-status{color:#c7cbd1;font-size:13px;min-height:40px}
.impulse-options{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:20px}
.impulse-option{border:1px solid var(--line);background:#171a20;color:var(--text);border-radius:12px;padding:15px;text-align:left;font-weight:800;cursor:pointer}
.impulse-option:hover,.impulse-option.is-selected{border-color:var(--lime);background:#151d18}
.impulse-response{display:none;margin-top:20px;padding:18px;border:1px solid rgba(16,245,106,.2);background:rgba(16,245,106,.045);border-radius:14px}
.impulse-response.is-visible{display:block}
.impulse-response strong{display:block;font-size:18px;margin-bottom:7px}
.impulse-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}
.impulse-actions .btn{min-height:48px}
.impulse-close{display:block;margin:18px auto 0;background:none;border:0;color:#777d86;font-size:12px;cursor:pointer;padding:8px}
@media(max-width:700px){.impulse-breathing{grid-template-columns:1fr;gap:8px}.impulse-breathing img{max-height:270px}.impulse-breathing-copy{padding:0}.impulse-timer{text-align:center;font-size:64px}.impulse-panel{padding:24px;border-radius:18px}}
@media(max-width:560px){.impulse-options{grid-template-columns:1fr}}
'''

MARKUP = r'''
  <!-- MODO IMPULSO V1 -->
  <div class="impulse-overlay" id="impulseOverlay" role="dialog" aria-modal="true" aria-labelledby="impulseTitle">
    <div class="impulse-panel">
      <div class="impulse-kicker">MODO IMPULSO · AGORA</div>
      <div class="impulse-breathing">
        <img src="repirando.png" alt="Pessoa respirando profundamente durante uma pausa" loading="eager">
        <div class="impulse-breathing-copy">
          <h3 id="impulseTitle">SOLTE O AR.<strong>BEM DEVAGAR.</strong></h3>
          <p>O dinheiro que foi hoje já foi.<br><strong>Nada será resolvido na próxima hora jogando mais.</strong></p>
          <p>Fique aqui com a gente.</p>
          <div class="impulse-timer" id="impulseTimer">00:30</div>
          <div class="impulse-status" id="impulseStatus">Não transfira. Não abra a casa de aposta. Não tente recuperar agora.</div>
        </div>
      </div>
      <div class="impulse-actions"><button class="btn primary" id="startImpulse" type="button">COMEÇAR A PAUSA</button></div>
      <div id="impulseSpeak" hidden>
        <p style="margin-top:24px;margin-bottom:10px;color:var(--text);font-weight:850">O QUE ACONTECEU AGORA?</p>
        <div class="impulse-options">
          <button class="impulse-option" type="button" data-impulse="Perdi dinheiro.">Perdi dinheiro.</button>
          <button class="impulse-option" type="button" data-impulse="Estou querendo recuperar.">Estou querendo recuperar.</button>
          <button class="impulse-option" type="button" data-impulse="Estou quase apostando.">Estou quase apostando.</button>
          <button class="impulse-option" type="button" data-impulse="Já transferi dinheiro.">Já transferi dinheiro.</button>
          <button class="impulse-option" type="button" data-impulse="Não sei o que fazer.">Não sei o que fazer.</button>
        </div>
        <div class="impulse-response" id="impulseResponse">
          <strong>ENTÃO O PRÓXIMO PASSO É IMPEDIR A PRÓXIMA APOSTA.</strong>
          <span id="impulseResponseText">Você não precisa resolver sua vida agora. Precisa criar uma barreira concreta para este momento.</span>
          <div class="impulse-actions">
            <a class="btn primary" href="#parar">QUERO PROTEGER MEU DINHEIRO</a>
            <a class="btn secondary" href="#autoexclusao">QUERO FECHAR A PORTA</a>
          </div>
        </div>
      </div>
      <button class="impulse-close" id="closeImpulse" type="button">Fechar e voltar</button>
    </div>
  </div>

  <script>
    (() => {
      const overlay=document.getElementById('impulseOverlay');
      const start=document.getElementById('startImpulse');
      const timer=document.getElementById('impulseTimer');
      const status=document.getElementById('impulseStatus');
      const speak=document.getElementById('impulseSpeak');
      const response=document.getElementById('impulseResponse');
      const responseText=document.getElementById('impulseResponseText');
      const close=document.getElementById('closeImpulse');
      let remaining=30, interval=null;
      const format=s=>String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');
      function openImpulse(e){e&&e.preventDefault();overlay.classList.add('is-open');document.body.style.overflow='hidden';start.focus()}
      function closeImpulse(){overlay.classList.remove('is-open');document.body.style.overflow='';clearInterval(interval)}
      function pause(){clearInterval(interval);remaining=30;timer.textContent=format(remaining);start.disabled=true;start.textContent='RESPIRANDO...';status.textContent='Solte o ar bem devagar. Fique aqui.';interval=setInterval(()=>{remaining--;timer.textContent=format(Math.max(remaining,0));if(remaining<=0){clearInterval(interval);start.disabled=false;start.textContent='PAUSA CONCLUÍDA';status.textContent='Você ficou aqui. Agora vamos entender o que aconteceu.';speak.hidden=false;document.querySelector('[data-impulse]')?.focus()}},1000)}
      document.querySelectorAll('a[href="#impulso"]').forEach(a=>a.addEventListener('click',openImpulse));
      start.addEventListener('click',pause);
      close.addEventListener('click',closeImpulse);
      overlay.addEventListener('click',e=>{if(e.target===overlay)closeImpulse()});
      document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('is-open'))closeImpulse()});
      document.querySelectorAll('[data-impulse]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-impulse]').forEach(x=>x.classList.remove('is-selected'));b.classList.add('is-selected');response.classList.add('is-visible');responseText.textContent=b.dataset.impulse==='Estou querendo recuperar.'?'Então o próximo problema não é recuperar a perda. É impedir que mais dinheiro saia agora.':'Você não precisa resolver sua vida agora. Precisa criar uma barreira concreta para este momento.'}));
      overlay.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',closeImpulse));
    })();
  </script>
'''


def main():
    s = INDEX.read_text(encoding="utf-8")
    if MARKER in s:
        print("Modo Impulso já está presente.")
        return

    if "repirando.png" not in s and not Path("repirando.png").exists():
        raise SystemExit("repirando.png não encontrado no repositório.")

    if ".impulse-overlay{" not in s:
        s = s.replace("</style>", CSS + "\n</style>", 1)

    s = s.replace('href="#entrar">CHEGA POR HOJE. QUERO RESPIRAR.</a>', 'href="#impulso">CHEGA POR HOJE. QUERO RESPIRAR.</a>', 1)

    if 'href="#impulso">CHEGA POR HOJE. QUERO RESPIRAR.</a>' not in s:
        raise SystemExit("CTA principal não encontrado.")

    s = s.replace("</body>", MARKUP + "\n</body>", 1)
    INDEX.write_text(s, encoding="utf-8")
    print("Modo Impulso V1 aplicado com pausa biológica de 30 segundos.")


if __name__ == "__main__":
    main()
