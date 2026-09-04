(function () {
  'use strict';

  const EVENT_MAP = [
    ['[data-impulse]', 'impulse_started', 'impulso', 'decidir', 'pausa'],
    ['a[href="#parar"]', 'stop_started', 'quero_parar', 'decidir', 'entrada'],
    ['a[href="#autoexclusao"]', 'self_exclusion_started', 'autoexclusao', 'proteger', 'entrada'],
    ['a[href="#espelho"]', 'mirror_started', 'espelho', 'ver', 'entrada'],
    ['a[href="#familia"]', 'family_started', 'familia', 'ver', 'entrada'],
    ['a[href="#recaida"]', 'relapse_started', 'recaida', 'atravessar', 'entrada']
  ];

  function getApi() {
    return window.BetChega && window.BetChega.ready && window.BetChega.supabase && window.BetChega.user
      ? window.BetChega
      : null;
  }

  async function recordEvent(eventType, flow, stage, step, metadata) {
    const api = getApi();
    if (!api) return;

    const { error } = await api.supabase.from('journey_events').insert({
      user_id: api.user.id,
      event_type: eventType,
      flow: flow || null,
      stage: stage || null,
      step: step || null,
      metadata: metadata || {}
    });

    if (error) console.warn('[BET, CHEGA.] Evento não registrado.', error);
  }

  function bind() {
    EVENT_MAP.forEach(function ([selector, eventType, flow, stage, step]) {
      document.querySelectorAll(selector).forEach(function (el) {
        if (el.dataset.eventBound === 'true') return;
        el.dataset.eventBound = 'true';
        el.addEventListener('click', function () {
          recordEvent(eventType, flow, stage, step);
        });
      });
    });

    const start = document.querySelector('[data-start]');
    if (start && start.dataset.eventBound !== 'true') {
      start.dataset.eventBound = 'true';
      start.addEventListener('click', function () {
        recordEvent('impulse_pause_started', 'impulso', 'decidir', 'pausa_iniciada');
      });
    }

    document.querySelectorAll('.option').forEach(function (option) {
      if (option.dataset.eventBound === 'true') return;
      option.dataset.eventBound = 'true';
      option.addEventListener('click', function () {
        const text = option.textContent.trim();
        const map = {
          'Perdi dinheiro.': 'perdi_dinheiro',
          'Estou querendo recuperar.': 'querendo_recuperar',
          'Estou quase apostando.': 'quase_apostando',
          'Já transferi dinheiro.': 'dinheiro_transferido',
          'Não sei o que fazer.': 'nao_sei_o_que_fazer'
        };
        recordEvent('impulse_response_selected', 'impulso', 'atravessar', map[text] || 'resposta_selecionada', { response: text });
      });
    });

    const timer = document.querySelector('.timer');
    if (timer && timer.dataset.eventObserver !== 'true') {
      timer.dataset.eventObserver = 'true';
      const observer = new MutationObserver(function () {
        if (timer.textContent.trim() === '00:00') {
          recordEvent('impulse_pause_completed', 'impulso', 'atravessar', 'pausa_concluida');
          observer.disconnect();
        }
      });
      observer.observe(timer, { childList: true, characterData: true, subtree: true });
    }
  }

  function waitForSupabase() {
    bind();
    if (getApi()) return;
    window.setTimeout(waitForSupabase, 250);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForSupabase);
  } else {
    waitForSupabase();
  }
})();
