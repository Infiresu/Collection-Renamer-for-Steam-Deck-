import { definePlugin } from "@decky/api";
import {
  ButtonItem, ConfirmModal, Menu, MenuItem,
  PanelSection, PanelSectionRow, Router, TextField,
  showModal,
} from "@decky/ui";
import { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";

/*
 * Collection Renamer v1.0 by Infiresu
 * Пункт «Переименовать» в меню коллекции (Gaming Mode) + фикс дрожания сетки коллекций
 * при использовании тем, меняющих размер плиток.
 */

type Coll = { id: string; name: string; raw: any };

// ---- Локализация (язык берётся из настроек Steam) ----
type Dict = { rename: string; renameTitle: string; save: string; cancel: string; failed: string; unknown: string; collections: string };
const EN: Dict = { rename: "Rename", renameTitle: "Rename collection", save: "Save", cancel: "Cancel",
  failed: "Could not rename the collection.", unknown: "Could not determine the collection. Rename it from the Decky panel.", collections: "Collections" };
const LANGS: Record<string, Dict> = {
  ru: { rename: "Переименовать", renameTitle: "Переименовать коллекцию", save: "Сохранить", cancel: "Отмена",
    failed: "Не удалось переименовать коллекцию.", unknown: "Не удалось определить коллекцию. Переименуйте её через панель Decky.", collections: "Коллекции" },
  uk: { rename: "Перейменувати", renameTitle: "Перейменувати колекцію", save: "Зберегти", cancel: "Скасувати",
    failed: "Не вдалося перейменувати колекцію.", unknown: "Не вдалося визначити колекцію. Перейменуйте її через панель Decky.", collections: "Колекції" },
  es: { rename: "Renombrar", renameTitle: "Renombrar colección", save: "Guardar", cancel: "Cancelar",
    failed: "No se pudo renombrar la colección.", unknown: "No se pudo determinar la colección. Renómbrala desde el panel de Decky.", collections: "Colecciones" },
  de: { rename: "Umbenennen", renameTitle: "Sammlung umbenennen", save: "Speichern", cancel: "Abbrechen",
    failed: "Die Sammlung konnte nicht umbenannt werden.", unknown: "Die Sammlung konnte nicht ermittelt werden. Benenne sie über das Decky-Menü um.", collections: "Sammlungen" },
  fr: { rename: "Renommer", renameTitle: "Renommer la collection", save: "Enregistrer", cancel: "Annuler",
    failed: "Impossible de renommer la collection.", unknown: "Impossible de déterminer la collection. Renommez-la depuis le panneau Decky.", collections: "Collections" },
  pt: { rename: "Renomear", renameTitle: "Renomear coleção", save: "Salvar", cancel: "Cancelar",
    failed: "Não foi possível renomear a coleção.", unknown: "Não foi possível identificar a coleção. Renomeie-a pelo painel do Decky.", collections: "Coleções" },
  it: { rename: "Rinomina", renameTitle: "Rinomina raccolta", save: "Salva", cancel: "Annulla",
    failed: "Impossibile rinominare la raccolta.", unknown: "Impossibile determinare la raccolta. Rinominala dal pannello Decky.", collections: "Raccolte" },
  pl: { rename: "Zmień nazwę", renameTitle: "Zmień nazwę kolekcji", save: "Zapisz", cancel: "Anuluj",
    failed: "Nie udało się zmienić nazwy kolekcji.", unknown: "Nie udało się ustalić kolekcji. Zmień nazwę w panelu Decky.", collections: "Kolekcje" },
  tr: { rename: "Yeniden adlandır", renameTitle: "Koleksiyonu yeniden adlandır", save: "Kaydet", cancel: "İptal",
    failed: "Koleksiyon yeniden adlandırılamadı.", unknown: "Koleksiyon belirlenemedi. Decky panelinden yeniden adlandırın.", collections: "Koleksiyonlar" },
  zh: { rename: "重命名", renameTitle: "重命名收藏夹", save: "保存", cancel: "取消",
    failed: "无法重命名收藏夹。", unknown: "无法确定收藏夹。请在 Decky 面板中重命名。", collections: "收藏夹" },
  ja: { rename: "名前を変更", renameTitle: "コレクション名を変更", save: "保存", cancel: "キャンセル",
    failed: "コレクション名を変更できませんでした。", unknown: "コレクションを特定できませんでした。Decky パネルから変更してください。", collections: "コレクション" },
  ko: { rename: "이름 변경", renameTitle: "컬렉션 이름 변경", save: "저장", cancel: "취소",
    failed: "컬렉션 이름을 변경하지 못했습니다.", unknown: "컬렉션을 확인하지 못했습니다. Decky 패널에서 변경해 주세요.", collections: "컬렉션" },
};
const LANG_MAP: [RegExp, string][] = [[/^(ru|russian)/, "ru"], [/^(uk|ukrainian)/, "uk"], [/^(es|spanish|latam)/, "es"],
  [/^(de|german)/, "de"], [/^(fr|french)/, "fr"], [/^(pt|brazilian|portuguese)/, "pt"], [/^(it|italian)/, "it"],
  [/^(pl|polish)/, "pl"], [/^(tr|turkish)/, "tr"], [/^(zh|schinese|tchinese)/, "zh"], [/^(ja|japanese)/, "ja"], [/^(ko|koreana|korean)/, "ko"]];
let cachedLang: string | null = null;
function langCode(): string {
  if (cachedLang) return cachedLang;
  let raw = "en";
  try { raw = String((window as any).LocalizationManager?.m_rgLocalesToUse?.[0] ?? navigator.language ?? "en"); } catch (err) { /* ignore */ }
  const l = raw.toLowerCase();
  cachedLang = "en";
  for (const [re, c] of LANG_MAP) if (re.test(l)) { cachedLang = c; break; }
  return cachedLang;
}
const tr = (): Dict => LANGS[langCode()] ?? EN;


let patchMode: "none" | "class" | "factory" = "none";
function logErr(where: string, err: unknown) {
  console.error("[CollectionRenamer]", where, err);
}

// ---- Коллекции ----
const store = () => (window as any).collectionStore;

function wrapColl(c: any): Coll | null {
  if (!c?.id) return null;
  const name = c.displayName ?? c.name ?? "";
  return name ? { id: c.id, name, raw: c } : null;
}

function listCollections(): Coll[] {
  const arr: any[] = store()?.userCollections ?? [];
  return arr.map(wrapColl).filter((c): c is Coll => !!c).sort((a, b) => a.name.localeCompare(b.name));
}

function collById(id: string): Coll | null {
  try {
    const s = store();
    const c = (typeof s?.GetCollection === "function" ? s.GetCollection(id) : null)
      ?? (s?.userCollections ?? []).find((x: any) => x?.id === id);
    return wrapColl(c);
  } catch (err) { return null; }
}

async function rename(c: Coll, newName: string): Promise<boolean> {
  const o = c.raw;
  try {
    const ed = typeof o.AsEditableCollection === "function" ? o.AsEditableCollection() : null;
    const dd = typeof o.AsDragDropCollection === "function" ? o.AsDragDropCollection() : null;
    if (typeof o.SetName === "function") o.SetName(newName);
    else if (ed && typeof ed.SetName === "function") ed.SetName(newName);
    else if (dd && typeof dd.SetName === "function") dd.SetName(newName);
    else o.m_strName = newName;
    // сохранение - отдельно и чуть позже, когда окно переименования уже закрыто
    setTimeout(async () => {
      try { if (typeof o.Save === "function") await o.Save(); }
      catch (err) { logErr("Save", err); }
    }, 600);
    return o.displayName === newName;
  } catch (err) {
    logErr("rename", err);
    return false;
  }
}

function showAlert(msg: string) {
  showModal(<ConfirmModal strTitle="Collection Renamer" strDescription={msg} bAlertDialog strOKButtonText="OK" />);
}

function RenameModal({ c, closeModal }: { c: Coll; closeModal?: () => void }) {
  const [val, setVal] = useState(c.name);
  return (
    <ConfirmModal
      strTitle={tr().renameTitle}
      strOKButtonText={tr().save}
      strCancelButtonText={tr().cancel}
      onOK={async () => {
        const n = val.trim();
        if (!n || n === c.name) return closeModal?.();
        const ok = await rename(c, n);
        closeModal?.();
        if (!ok) setTimeout(() => showAlert(tr().failed), 400);
      }}
      onCancel={() => closeModal?.()}
    >
      <TextField value={val} onChange={(e) => setVal(e.target.value)} />
    </ConfirmModal>
  );
}

// ---- Определение коллекции ----
function mainWin(): any {
  try { return (Router as any).WindowStore?.GamepadUIMainWindowInstance; } catch (err) { return undefined; }
}
function mainDoc(): Document | undefined {
  try { return mainWin()?.BrowserWindow?.document; } catch (err) { return undefined; }
}

const norm = (t: string) => t.replace(/\s+/g, " ").trim();

// 1) Страница самой коллекции: /library/collection/<id>
function collFromRoute(): Coll | null {
  try {
    const path: string = mainWin()?.m_history?.location?.pathname ?? "";
    const m = path.match(/\/collection\/([^/?#]+)/);
    return m ? collById(decodeURIComponent(m[1])) : null;
  } catch (err) { return null; }
}

// 2) Плитка в сетке коллекций (у такой плитки в подписи есть счётчик игр)
function nameFromTile(tile: Element | null | undefined): string | null {
  try {
    const id = tile?.getAttribute("aria-labelledby");
    const lab = id ? tile!.ownerDocument.getElementById(id) : null;
    if (!lab || !lab.querySelector(".tool-tip-source")) return null;
    const name = lab.firstElementChild?.textContent;
    return name ? norm(name) : null;
  } catch (err) { return null; }
}

let lastTileName: string | null = null;
let trackedDoc: Document | undefined;
const onFocusIn = (e: Event) => {
  try { ensureInstalled(); } catch (err) { /* ignore */ }
  try { if (!gridPatched) tryPatchGrid(e.target as Element); } catch (err) { logErr("gridPatch", err); }
  try {
    const tile = (e.target as Element)?.closest?.('[role="link"][aria-labelledby]');
    const n = nameFromTile(tile);
    if (n) lastTileName = n;
  } catch (err) { /* ignore */ }
};
function trackFocus() {
  const d = mainDoc();
  if (!d || d === trackedDoc) return;
  try { trackedDoc?.removeEventListener("focusin", onFocusIn, true); } catch (err) { /* ignore */ }
  d.addEventListener("focusin", onFocusIn, true);
  trackedDoc = d;
}
function untrackFocus() {
  try { trackedDoc?.removeEventListener("focusin", onFocusIn, true); } catch (err) { /* ignore */ }
  trackedDoc = undefined;
}

function resolveTarget(): Coll | null {
  const byRoute = collFromRoute();
  if (byRoute) return byRoute;
  let name: string | null = null;
  try {
    const d = mainDoc();
    const t = d?.activeElement?.closest?.('[role="link"]');
    name = nameFromTile(t) ?? lastTileName;
  } catch (err) { name = lastTileName; }
  if (!name) return null;
  return listCollections().find((x) => norm(x.name) === name) ?? null;
}

function openRename(c: Coll | null) {
  // свежий объект на момент выбора (название могло измениться)
  const fresh = c ? (collById(c.id) ?? c) : null;
  if (!fresh) { showAlert(tr().unknown); return; }
  showModal(<RenameModal c={fresh} />);
}

// ---- Встраивание пункта в меню ----
function textOf(n: any, depth = 0): string {
  if (n == null || typeof n === "boolean" || depth > 6) return "";
  if (typeof n === "string" || typeof n === "number") return String(n);
  if (Array.isArray(n)) return n.map((x) => textOf(x, depth + 1)).join("");
  return textOf(n.props?.children, depth + 1);
}

const DEL_WORDS = /(удал|видал|delet|remov|elimin|borra|lösch|entfern|supprim|exclu|apag|cancell|usu[nń]|\bsil|删除|刪除|削除|삭제)/i;
const COLL_WORDS = /(коллекц|колекц|collect|colecc|coleç|sammlung|raccolt|collezion|kolekcj|koleksiyon|收藏|コレクション|컬렉션)/i;
const isDeleteItem = (el: any) => {
  if (!el?.props || typeof el.props.onSelected !== "function") return false;
  const t = textOf(el.props.children);
  return DEL_WORDS.test(t) && COLL_WORDS.test(t);
};

// Возвращает новый массив детей с пунктом "Переименовать" или null, если менять нечего.
function injectInto(children: any): any[] | null {
  if (children == null) return null;
  const flat: any[] = [];
  (Array.isArray(children) ? children : [children]).forEach((c: any) =>
    Array.isArray(c) ? flat.push(...c) : flat.push(c));
  if (flat.some((k) => k?.key === "cr-rename")) return null;
  const idx = flat.findIndex(isDeleteItem);
  if (idx < 0) return null;
  const target = resolveTarget();
  const item = <MenuItem key="cr-rename" onSelected={() => openRename(target)}>{tr().rename}</MenuItem>;
  return [...flat.slice(0, idx), item, ...flat.slice(idx)];
}

const unpatchers: (() => void)[] = [];

// Путь A: Menu - классовый компонент
let ourRender: any = null;
function patchMenuClass(): boolean {
  const proto = (Menu as any)?.prototype;
  if (!proto || typeof proto.render !== "function") return false;
  if (proto.render === ourRender) return true;
  const orig = proto.render;
  proto.render = ourRender = function (this: any, ...args: any[]) {
    try {
      const p = this.props;
      const nc = injectInto(p?.children);
      if (nc) this.props = { ...p, children: nc };
    } catch (err) { logErr("menu.render", err); }
    return orig.apply(this, args);
  };
  unpatchers.push(() => { if (proto.render === ourRender) proto.render = orig; ourRender = null; });
  patchMode = "class";
  return true;
}

// Путь B: Menu - функция. Обёртка фабрик с ОДНОЙ проверкой типа; для всех прочих элементов - прямой вызов.
function wrapFactory(obj: any, key: string, kind: "ce" | "jsx"): boolean {
  const orig = obj?.[key];
  if (typeof orig !== "function" || (orig as any).__cr) return false;
  const MenuComp = Menu as any;
  const fn: any = function (this: any, type: any, props: any, ...rest: any[]) {
    if (type !== MenuComp) return orig.call(this, type, props, ...rest);
    try {
      if (kind === "jsx") {
        const nc = injectInto(props?.children);
        if (nc) return orig.call(this, type, { ...props, children: nc }, ...rest);
      } else {
        const nc = injectInto(rest);
        if (nc) return orig.call(this, type, props, ...nc);
      }
    } catch (err) { logErr("factory." + key, err); }
    return orig.call(this, type, props, ...rest);
  };
  fn.__cr = true;
  try { obj[key] = fn; } catch (err) { logErr("assign." + key, err); return false; }
  if (obj[key] !== fn) return false;
  unpatchers.push(() => { try { if (obj[key] === fn) obj[key] = orig; } catch (err) { /* ignore */ } });
  return true;
}

function install() {
  if (!Menu) { console.warn("[CollectionRenamer] Menu component not found"); return; }
  if (patchMenuClass()) return;
  const w: any = window;
  wrapFactory(w.SP_JSX, "jsx", "jsx");
  wrapFactory(w.SP_JSX, "jsxs", "jsx");
  wrapFactory(w.SP_REACT, "createElement", "ce");
  patchMode = "factory";
}

// Системные уведомления Steam (например, о скриншоте) могут вернуть исходные функции на место.
// Раз в секунду проверяем только ссылки (без DOM и ловушек) и при необходимости ставим патч заново.
let reinstalls = 0;
function ensureInstalled() {
  if (!Menu) return;
  const proto = (Menu as any).prototype;
  if (proto && typeof proto.render === "function" && patchMode === "class") {
    if (proto.render !== ourRender) { reinstalls++; patchMenuClass(); }
    return;
  }
  const w: any = window;
  const lost = !w.SP_JSX?.jsx?.__cr || !w.SP_JSX?.jsxs?.__cr || !w.SP_REACT?.createElement?.__cr;
  if (lost && reinstalls < 100) {
    reinstalls++;
    wrapFactory(w.SP_JSX, "jsx", "jsx");
    wrapFactory(w.SP_JSX, "jsxs", "jsx");
    wrapFactory(w.SP_REACT, "createElement", "ce");
  }
}

// ---- Фикс дрожания сетки коллекций ----
// Steam рисует только ряды рядом с видимой областью (renderOutsideRows: 2) и считает их по родному
// размеру плитки 185px. Тема делает плитки крупнее -> Steam выгружает ряды, на которых стоит фокус,
// и прокрутка начинает "пинг-понг". Для сетки AllCollectionsGrid просим рисовать все ряды
// (коллекций обычно десятки, это дёшево). Подмена работает через accessor `props` на прототипе
// виртуализатора и касается ТОЛЬКО экземпляров с name === "AllCollectionsGrid".
const GRID_NAME = "AllCollectionsGrid";
let gridPatched = false;
function tryPatchGrid(from: Element | null) {
  const grid = from?.closest?.('[role="tabpanel"][id$="Collections_Content"]')?.querySelector('[role="grid"]');
  if (!grid) return;
  const key = Object.keys(grid).find((k) => k.startsWith("__reactFiber$"));
  let f: any = key ? (grid as any)[key] : null;
  for (let i = 0; f && i < 20; i++, f = f.return) {
    const inst = f.stateNode;
    if (inst && !(inst instanceof Element) && inst.m_elGrid && inst.props?.name === GRID_NAME) {
      patchGridClass(inst);
      return;
    }
  }
}
function patchGridClass(inst: any) {
  const proto = Object.getPrototypeOf(inst);
  if (!proto || Object.prototype.hasOwnProperty.call(proto, "props")) { gridPatched = true; return; }
  const raw = new WeakMap<object, any>();
  const adj = new WeakMap<object, any>();
  const known = new Set<any>();
  Object.defineProperty(proto, "props", {
    configurable: true,
    get(this: any) {
      const p = raw.get(this);
      if (!p || p.name !== GRID_NAME) return p;
      let a = adj.get(p);
      if (!a) { a = { ...p, renderOutsideRows: 100000 }; adj.set(p, a); }
      return a;
    },
    set(this: any, v: any) { raw.set(this, v); known.add(this); },
  });
  // уже созданный экземпляр: переводим его собственное свойство props на accessor
  const cur = inst.props;
  delete inst.props;
  inst.props = cur;
  try { inst.forceUpdate(); } catch (err) { logErr("grid.forceUpdate", err); }
  gridPatched = true;
  unpatchers.push(() => {
    delete proto.props;
    known.forEach((o) => { try { o.props = raw.get(o); } catch (err) { /* ignore */ } });
    known.clear();
    gridPatched = false;
  });
}

function uninstall() {
  while (unpatchers.length) { try { unpatchers.pop()!(); } catch (err) { /* ignore */ } }
  untrackFocus();
}

function Content() {
  const [items, setItems] = useState<Coll[]>([]);
  useEffect(() => setItems(listCollections()), []);
  return (
    <>
      <PanelSection title={tr().collections}>
        {items.map((c) => (
          <PanelSectionRow key={c.id}>
            <ButtonItem layout="below" onClick={() => showModal(<RenameModal c={c} />)}>{c.name}</ButtonItem>
          </PanelSectionRow>
        ))}
      </PanelSection>
    </>
  );
}

export default definePlugin(() => {
  try { install(); } catch (err) { logErr("install", err); }
  trackFocus();
  // документ главного окна может появиться позже загрузки плагина - пробуем несколько раз и прекращаем
  let tries = 0;
  const t = setInterval(() => { trackFocus(); if (trackedDoc || ++tries > 20) clearInterval(t); }, 1000);
  const guard = setInterval(() => { try { ensureInstalled(); } catch (err) { /* ignore */ } }, 1000);
  return {
    name: "Collection Renamer",
    titleView: <div>Collection Renamer</div>,
    content: <Content />,
    icon: <FaPen />,
    onDismount() {
      clearInterval(t);
      clearInterval(guard);
      uninstall();
    },
  };
});
