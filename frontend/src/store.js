import { create } from 'zustand'
import { persist } from 'zustand/middleware'
export const useApp = create(persist((set, get) => ({
  lang: 'en', setLang: lang => set({ lang }), theme: 'dark', setTheme: theme => set({ theme }),
  items: [], user: null, token: null,
  add: it => set(s => { const k = it.key, f = s.items.find(i => i.key === k); return { items: f ? s.items.map(i => i.key === k ? { ...i, qty: i.qty + 1 } : i) : [...s.items, { ...it, qty: 1 }] } }),
  qty: (key, d) => set(s => ({ items: s.items.map(i => i.key === key ? { ...i, qty: Math.max(1, i.qty + d) } : i) })),
  remove: key => set(s => ({ items: s.items.filter(i => i.key !== key) })),
  clear: () => set({ items: [] }),
  setAuth: (user, token) => set({ user, token }),
}), { name: 'verion', partialize: s => { let ok = false; try { ok = JSON.parse(localStorage.getItem('verion-consent') || 'null')?.prefs === true } catch {} if (ok) return s; const { lang, theme, ...rest } = s; return rest } }))
export const useT = () => { const lang = useApp(s => s.lang); return lang }

export const useUI = create(set => ({ chat: false, setChat: chat => set({ chat }) }))
