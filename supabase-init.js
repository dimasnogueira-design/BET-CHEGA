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
      .select('id, stage, status, current_flow')
      .eq('user_id', user.id)
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    if (!data) {
      const { error: insertError } = await client.from('journey_states').insert({
        user_id: user.id,
        stage: 'ver',
        status: 'active',
        current_flow: 'home'
      });
      if (insertError) throw insertError;
    }
  }

  async function recordFlow(flow, stage) {
    saveLocal({ last_flow: flow, last_stage: stage });
    if (!ready || !client || !user) return;

    const { data: current } = await client
      .from('journey_states')
      .select('id')
      .eq('user_id', user.id)
      .limit(1)
      .maybeSingle();

    if (current && current.id) {
      await client.from('journey_states').update({
        stage: stage,
        status: 'active',
        current_flow: flow,
        updated_at: new Date().toISOString()
      }).eq('id', current.id);
    } else {
      await client.from('journey_states').insert({
        user_id: user.id,
        stage: stage,
        status: 'active',
        current_flow: flow
      });
    }

    await client.from('checkins').insert({
      user_id: user.id,
      type: 'flow_start',
      note: flow
    });
  }

  function bindJourneyActions() {
    document.querySelectorAll('[data-impulse]').forEach(function (el) {
      el.addEventListener('click', function () { recordFlow('impulso', 'decidir'); });
    });

    document.querySelectorAll('a[href="#parar"]').forEach(function (el) {
      el.addEventListener('click', function () { recordFlow('quero_parar', 'decidir'); });
    });

    document.querySelectorAll('a[href="#autoexclusao"]').forEach(function (el) {
      el.addEventListener('click', function () { recordFlow('autoexclusao', 'proteger'); });
    });

    document.querySelectorAll('a[href="#espelho"]').forEach(function (el) {
      el.addEventListener('click', function () { recordFlow('espelho', 'ver'); });
    });

    document.querySelectorAll('a[href="#familia"]').forEach(function (el) {
      el.addEventListener('click', function () { recordFlow('familia', 'ver'); });
    });

    document.querySelectorAll('a[href="#recaida"]').forEach(function (el) {
      el.addEventListener('click', function () { recordFlow('recaida', 'atravessar'); });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
