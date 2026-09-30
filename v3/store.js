/* Progreso guardado (un solo objeto en localStorage) */
const Store = (() => {
  const KEY = 'iso25010Progress_v1';
  let d = { stats: {}, wrong: [] };
  try { const r = JSON.parse(localStorage.getItem(KEY)); if (r && r.stats) d = r; } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {} };
  return {
    record(name, ok) {
      const s = d.stats[name] || (d.stats[name] = { recent: [] });
      s.recent.push(ok ? 1 : 0);
      if (s.recent.length > 6) s.recent.shift();
      save();
    },
    setWrong(id, isWrong) {
      const i = d.wrong.indexOf(id);
      if (isWrong && i < 0) d.wrong.push(id);
      if (!isWrong && i >= 0) d.wrong.splice(i, 1);
      save();
    },
    wrong() { return d.wrong.slice(); },
    mastery(names) {
      const r = names.flatMap(n => (d.stats[n] || { recent: [] }).recent);
      return r.length ? Math.round(r.reduce((a, b) => a + b, 0) / r.length * 100) : null;
    },
    reset() { d = { stats: {}, wrong: [] }; save(); }
  };
})();
