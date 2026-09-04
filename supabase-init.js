(function () {
  'use strict';

  const STORAGE_KEY = 'bet_chega_local_state_v1';
  let client = null;
  let user = null;
  let ready = false;

  function localState() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
    catch { return {}; }
  }

  function saveLocal(patch) {
    const next = Object.assign({}, localState(), patch, { updated_at: new Date().toISOString() });
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (_) {}
    return next;
  }

  async function loadScript(src) {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async function init() {
    try {
      await loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2');
      const configResponse = await fetch('/api/config', { cache: 'no-store' });
      if (!configResponse.ok) throw new Error('Configuração do Supabase indisponível.');
      const config = await configResponse.json();
      client = window.supabase.createClient(config.url, config.key, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
      });

      const { data: sessionData } = await client.auth.getSession();
      user = sessionData && sessionData.session ? sessionData.session.user : null;

      if (!user) {
        const result = await client.auth.signInAnonymously();
        if (result.error) throw result.error;
        user = result.data.user;
      }

      ready = !!user;
      await ensureProfile();
      await ensureJourney();
      window.BetChega = { supabase: client, user, ready: true };
      document.documentElement.dataset.supabase = 'connected';
    } catch (error) {
      saveLocal({ persistence: 'local_only', last_error: error && error.message ? error.message : 'unknown' });
      window.BetChega = { ready: false, error: error };
      document.documentElement.dataset.supabase = 'fallback';
      console.warn('[BET, CHEGA.] Persistência Supabase indisponível; usando estado local.', error);
    }

    bindJourneyActions();
  }

  async function ensureProfile() {
    if (!ready || !client || !user) return;
    const { error } = await client.from('profiles').upsert({ id: user.id }, { onConflict: 'id' });
    if (error) throw error;
  }

  async function ensureJourney() {
    if (!ready || !client || !user) return;
    const { data, error } = await client
      .from('journey_states')
      .select('id, current_stage, current_flow, current_step')
      .eq('user_id', user.id)
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    if (!data) {
      const { error: insertError } = await client.from('journey_states').insert({
        user_id: user.id,
        current_stage: 'ver',
        current_flow: 'home',
        current_step: 'entry'
      });
      if (insertError) throw insertError;
    }
  }

  async function recordFlow(flow, stage, step) {
    saveLocal({ last_flow: flow, last_stage: stage, last_step: step });
    if (!ready || !client || !user) return;

    const { data: current, error: readError } = await client
      .from('journey_states')
      .select('id')
      .eq('user_id', user.id)
      .limit(1)
      .maybeSingle();

    if (readError) throw readError;

    if (current && current.id) {
      const { error } = await client.from('journey_states').update({
        current_stage: stage,
        current_flow: flow,
        current_step: step,
        updated_at: new Date().toISOString()
      }).eq('id', current.id);
      if (error) throw error;
    } else {
      const { error } = await client.from('journey_states').insert({
        user_id: user.id,
        current_stage: stage,
        current_flow: flow,
        current_step: step
      });
      if (error) throw error;
    }
  }

  function safeRecord(flow, stage, step) {
    recordFlow(flow, stage, step).catch(function (error) {
      saveLocal({ last_error: error && error.message ? error.message : 'persist_error' });
      console.warn('[BET, CHEGA.] Não foi possível salvar este passo no Supabase.', error);
    });
  }

  function bindJourneyActions() {
    document.querySelectorAll('[data-impulse]').forEach(function (el) {
      el.addEventListener('click', function () { safeRecord('impulso', 'decidir', 'pausa'); });
    });

    document.querySelectorAll('a[href="#parar"]').forEach(function (el) {
      el.addEventListener('click', function () { safeRecord('quero_parar', 'decidir', 'entrada'); });
    });

    document.querySelectorAll('a[href="#autoexclusao"]').forEach(function (el) {
      el.addEventListener('click', function () { safeRecord('autoexclusao', 'proteger', 'entrada'); });
    });

    document.querySelectorAll('a[href="#espelho"]').forEach(function (el) {
      el.addEventListener('click', function () { safeRecord('espelho', 'ver', 'entrada'); });
    });

    document.querySelectorAll('a[href="#familia"]').forEach(function (el) {
      el.addEventListener('click', function () { safeRecord('familia', 'ver', 'entrada'); });
    });

    document.querySelectorAll('a[href="#recaida"]').forEach(function (el) {
      el.addEventListener('click', function () { safeRecord('recaida', 'atravessar', 'entrada'); });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
