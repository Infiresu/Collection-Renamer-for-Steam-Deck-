const manifest = {"name":"Collection Renamer"};
const API_VERSION = 2;
const internalAPIConnection = window.__DECKY_SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_deckyLoaderAPIInit;
if (!internalAPIConnection) {
    throw new Error('[@decky/api]: Failed to connect to the loader as as the loader API was not initialized. This is likely a bug in Decky Loader.');
}
let api;
try {
    api = internalAPIConnection.connect(API_VERSION, manifest.name);
}
catch {
    api = internalAPIConnection.connect(1, manifest.name);
    console.warn(`[@decky/api] Requested API version ${API_VERSION} but the running loader only supports version 1. Some features may not work.`);
}
if (api._version != API_VERSION) {
    console.warn(`[@decky/api] Requested API version ${API_VERSION} but the running loader only supports version ${api._version}. Some features may not work.`);
}
const definePlugin = (fn) => {
    return (...args) => {
        return fn(...args);
    };
};

var DefaultContext = {
  color: undefined,
  size: undefined,
  className: undefined,
  style: undefined,
  attr: undefined
};
var IconContext = SP_REACT.createContext && /*#__PURE__*/SP_REACT.createContext(DefaultContext);

var _excluded = ["attr", "size", "title"];
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function Tree2Element(tree) {
  return tree && tree.map((node, i) => /*#__PURE__*/SP_REACT.createElement(node.tag, _objectSpread({
    key: i
  }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
  return props => /*#__PURE__*/SP_REACT.createElement(IconBase, _extends({
    attr: _objectSpread({}, data.attr)
  }, props), Tree2Element(data.child));
}
function IconBase(props) {
  var elem = conf => {
    var attr = props.attr,
      size = props.size,
      title = props.title,
      svgProps = _objectWithoutProperties(props, _excluded);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return /*#__PURE__*/SP_REACT.createElement("svg", _extends({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className: className,
      style: _objectSpread(_objectSpread({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && /*#__PURE__*/SP_REACT.createElement("title", null, title), props.children);
  };
  return IconContext !== undefined ? /*#__PURE__*/SP_REACT.createElement(IconContext.Consumer, null, conf => elem(conf)) : elem(DefaultContext);
}

// THIS FILE IS AUTO GENERATED
function FaPen (props) {
  return GenIcon({"attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"},"child":[]}]})(props);
}

const EN = { rename: "Rename", renameTitle: "Rename collection", save: "Save", cancel: "Cancel",
    failed: "Could not rename the collection.", unknown: "Could not determine the collection. Rename it from the Decky panel.", collections: "Collections" };
const LANGS = {
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
const LANG_MAP = [[/^(ru|russian)/, "ru"], [/^(uk|ukrainian)/, "uk"], [/^(es|spanish|latam)/, "es"],
    [/^(de|german)/, "de"], [/^(fr|french)/, "fr"], [/^(pt|brazilian|portuguese)/, "pt"], [/^(it|italian)/, "it"],
    [/^(pl|polish)/, "pl"], [/^(tr|turkish)/, "tr"], [/^(zh|schinese|tchinese)/, "zh"], [/^(ja|japanese)/, "ja"], [/^(ko|koreana|korean)/, "ko"]];
let cachedLang = null;
function langCode() {
    if (cachedLang)
        return cachedLang;
    let raw = "en";
    try {
        raw = String(window.LocalizationManager?.m_rgLocalesToUse?.[0] ?? navigator.language ?? "en");
    }
    catch (err) { /* ignore */ }
    const l = raw.toLowerCase();
    cachedLang = "en";
    for (const [re, c] of LANG_MAP)
        if (re.test(l)) {
            cachedLang = c;
            break;
        }
    return cachedLang;
}
const tr = () => LANGS[langCode()] ?? EN;
let patchMode = "none";
function logErr(where, err) {
    console.error("[CollectionRenamer]", where, err);
}
// ---- Коллекции ----
const store = () => window.collectionStore;
function wrapColl(c) {
    if (!c?.id)
        return null;
    const name = c.displayName ?? c.name ?? "";
    return name ? { id: c.id, name, raw: c } : null;
}
function listCollections() {
    const arr = store()?.userCollections ?? [];
    return arr.map(wrapColl).filter((c) => !!c).sort((a, b) => a.name.localeCompare(b.name));
}
function collById(id) {
    try {
        const s = store();
        const c = (typeof s?.GetCollection === "function" ? s.GetCollection(id) : null)
            ?? (s?.userCollections ?? []).find((x) => x?.id === id);
        return wrapColl(c);
    }
    catch (err) {
        return null;
    }
}
async function rename(c, newName) {
    const o = c.raw;
    try {
        const ed = typeof o.AsEditableCollection === "function" ? o.AsEditableCollection() : null;
        const dd = typeof o.AsDragDropCollection === "function" ? o.AsDragDropCollection() : null;
        if (typeof o.SetName === "function")
            o.SetName(newName);
        else if (ed && typeof ed.SetName === "function")
            ed.SetName(newName);
        else if (dd && typeof dd.SetName === "function")
            dd.SetName(newName);
        else
            o.m_strName = newName;
        // сохранение - отдельно и чуть позже, когда окно переименования уже закрыто
        setTimeout(async () => {
            try {
                if (typeof o.Save === "function")
                    await o.Save();
            }
            catch (err) {
                logErr("Save", err);
            }
        }, 600);
        return o.displayName === newName;
    }
    catch (err) {
        logErr("rename", err);
        return false;
    }
}
function showAlert(msg) {
    DFL.showModal(window.SP_REACT.createElement(DFL.ConfirmModal, { strTitle: "Collection Renamer", strDescription: msg, bAlertDialog: true, strOKButtonText: "OK" }));
}
function RenameModal({ c, closeModal }) {
    const [val, setVal] = SP_REACT.useState(c.name);
    return (window.SP_REACT.createElement(DFL.ConfirmModal, { strTitle: tr().renameTitle, strOKButtonText: tr().save, strCancelButtonText: tr().cancel, onOK: async () => {
            const n = val.trim();
            if (!n || n === c.name)
                return closeModal?.();
            const ok = await rename(c, n);
            closeModal?.();
            if (!ok)
                setTimeout(() => showAlert(tr().failed), 400);
        }, onCancel: () => closeModal?.() },
        window.SP_REACT.createElement(DFL.TextField, { value: val, onChange: (e) => setVal(e.target.value) })));
}
// ---- Определение коллекции ----
function mainWin() {
    try {
        return DFL.Router.WindowStore?.GamepadUIMainWindowInstance;
    }
    catch (err) {
        return undefined;
    }
}
function mainDoc() {
    try {
        return mainWin()?.BrowserWindow?.document;
    }
    catch (err) {
        return undefined;
    }
}
const norm = (t) => t.replace(/\s+/g, " ").trim();
// 1) Страница самой коллекции: /library/collection/<id>
function collFromRoute() {
    try {
        const path = mainWin()?.m_history?.location?.pathname ?? "";
        const m = path.match(/\/collection\/([^/?#]+)/);
        return m ? collById(decodeURIComponent(m[1])) : null;
    }
    catch (err) {
        return null;
    }
}
// 2) Плитка в сетке коллекций (у такой плитки в подписи есть счётчик игр)
function nameFromTile(tile) {
    try {
        const id = tile?.getAttribute("aria-labelledby");
        const lab = id ? tile.ownerDocument.getElementById(id) : null;
        if (!lab || !lab.querySelector(".tool-tip-source"))
            return null;
        const name = lab.firstElementChild?.textContent;
        return name ? norm(name) : null;
    }
    catch (err) {
        return null;
    }
}
let lastTileName = null;
let trackedDoc;
const onFocusIn = (e) => {
    try {
        ensureInstalled();
    }
    catch (err) { /* ignore */ }
    try {
        if (!gridPatched)
            tryPatchGrid(e.target);
    }
    catch (err) {
        logErr("gridPatch", err);
    }
    try {
        const tile = e.target?.closest?.('[role="link"][aria-labelledby]');
        const n = nameFromTile(tile);
        if (n)
            lastTileName = n;
    }
    catch (err) { /* ignore */ }
};
function trackFocus() {
    const d = mainDoc();
    if (!d || d === trackedDoc)
        return;
    try {
        trackedDoc?.removeEventListener("focusin", onFocusIn, true);
    }
    catch (err) { /* ignore */ }
    d.addEventListener("focusin", onFocusIn, true);
    trackedDoc = d;
}
function untrackFocus() {
    try {
        trackedDoc?.removeEventListener("focusin", onFocusIn, true);
    }
    catch (err) { /* ignore */ }
    trackedDoc = undefined;
}
function resolveTarget() {
    const byRoute = collFromRoute();
    if (byRoute)
        return byRoute;
    let name = null;
    try {
        const d = mainDoc();
        const t = d?.activeElement?.closest?.('[role="link"]');
        name = nameFromTile(t) ?? lastTileName;
    }
    catch (err) {
        name = lastTileName;
    }
    if (!name)
        return null;
    return listCollections().find((x) => norm(x.name) === name) ?? null;
}
function openRename(c) {
    // свежий объект на момент выбора (название могло измениться)
    const fresh = c ? (collById(c.id) ?? c) : null;
    if (!fresh) {
        showAlert(tr().unknown);
        return;
    }
    DFL.showModal(window.SP_REACT.createElement(RenameModal, { c: fresh }));
}
// ---- Встраивание пункта в меню ----
function textOf(n, depth = 0) {
    if (n == null || typeof n === "boolean" || depth > 6)
        return "";
    if (typeof n === "string" || typeof n === "number")
        return String(n);
    if (Array.isArray(n))
        return n.map((x) => textOf(x, depth + 1)).join("");
    return textOf(n.props?.children, depth + 1);
}
const DEL_WORDS = /(удал|видал|delet|remov|elimin|borra|lösch|entfern|supprim|exclu|apag|cancell|usu[nń]|\bsil|删除|刪除|削除|삭제)/i;
const COLL_WORDS = /(коллекц|колекц|collect|colecc|coleç|sammlung|raccolt|collezion|kolekcj|koleksiyon|收藏|コレクション|컬렉션)/i;
const isDeleteItem = (el) => {
    if (!el?.props || typeof el.props.onSelected !== "function")
        return false;
    const t = textOf(el.props.children);
    return DEL_WORDS.test(t) && COLL_WORDS.test(t);
};
// Возвращает новый массив детей с пунктом "Переименовать" или null, если менять нечего.
function injectInto(children) {
    if (children == null)
        return null;
    const flat = [];
    (Array.isArray(children) ? children : [children]).forEach((c) => Array.isArray(c) ? flat.push(...c) : flat.push(c));
    if (flat.some((k) => k?.key === "cr-rename"))
        return null;
    const idx = flat.findIndex(isDeleteItem);
    if (idx < 0)
        return null;
    const target = resolveTarget();
    const item = window.SP_REACT.createElement(DFL.MenuItem, { key: "cr-rename", onSelected: () => openRename(target) }, tr().rename);
    return [...flat.slice(0, idx), item, ...flat.slice(idx)];
}
const unpatchers = [];
// Путь A: Menu - классовый компонент
let ourRender = null;
function patchMenuClass() {
    const proto = DFL.Menu?.prototype;
    if (!proto || typeof proto.render !== "function")
        return false;
    if (proto.render === ourRender)
        return true;
    const orig = proto.render;
    proto.render = ourRender = function (...args) {
        try {
            const p = this.props;
            const nc = injectInto(p?.children);
            if (nc)
                this.props = { ...p, children: nc };
        }
        catch (err) {
            logErr("menu.render", err);
        }
        return orig.apply(this, args);
    };
    unpatchers.push(() => { if (proto.render === ourRender)
        proto.render = orig; ourRender = null; });
    patchMode = "class";
    return true;
}
// Путь B: Menu - функция. Обёртка фабрик с ОДНОЙ проверкой типа; для всех прочих элементов - прямой вызов.
function wrapFactory(obj, key, kind) {
    const orig = obj?.[key];
    if (typeof orig !== "function" || orig.__cr)
        return false;
    const MenuComp = DFL.Menu;
    const fn = function (type, props, ...rest) {
        if (type !== MenuComp)
            return orig.call(this, type, props, ...rest);
        try {
            if (kind === "jsx") {
                const nc = injectInto(props?.children);
                if (nc)
                    return orig.call(this, type, { ...props, children: nc }, ...rest);
            }
            else {
                const nc = injectInto(rest);
                if (nc)
                    return orig.call(this, type, props, ...nc);
            }
        }
        catch (err) {
            logErr("factory." + key, err);
        }
        return orig.call(this, type, props, ...rest);
    };
    fn.__cr = true;
    try {
        obj[key] = fn;
    }
    catch (err) {
        logErr("assign." + key, err);
        return false;
    }
    if (obj[key] !== fn)
        return false;
    unpatchers.push(() => { try {
        if (obj[key] === fn)
            obj[key] = orig;
    }
    catch (err) { /* ignore */ } });
    return true;
}
function install() {
    if (!DFL.Menu) {
        console.warn("[CollectionRenamer] Menu component not found");
        return;
    }
    if (patchMenuClass())
        return;
    const w = window;
    wrapFactory(w.SP_JSX, "jsx", "jsx");
    wrapFactory(w.SP_JSX, "jsxs", "jsx");
    wrapFactory(w.SP_REACT, "createElement", "ce");
    patchMode = "factory";
}
// Системные уведомления Steam (например, о скриншоте) могут вернуть исходные функции на место.
// Раз в секунду проверяем только ссылки (без DOM и ловушек) и при необходимости ставим патч заново.
let reinstalls = 0;
function ensureInstalled() {
    if (!DFL.Menu)
        return;
    const proto = DFL.Menu.prototype;
    if (proto && typeof proto.render === "function" && patchMode === "class") {
        if (proto.render !== ourRender) {
            reinstalls++;
            patchMenuClass();
        }
        return;
    }
    const w = window;
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
function tryPatchGrid(from) {
    const grid = from?.closest?.('[role="tabpanel"][id$="Collections_Content"]')?.querySelector('[role="grid"]');
    if (!grid)
        return;
    const key = Object.keys(grid).find((k) => k.startsWith("__reactFiber$"));
    let f = key ? grid[key] : null;
    for (let i = 0; f && i < 20; i++, f = f.return) {
        const inst = f.stateNode;
        if (inst && !(inst instanceof Element) && inst.m_elGrid && inst.props?.name === GRID_NAME) {
            patchGridClass(inst);
            return;
        }
    }
}
function patchGridClass(inst) {
    const proto = Object.getPrototypeOf(inst);
    if (!proto || Object.prototype.hasOwnProperty.call(proto, "props")) {
        gridPatched = true;
        return;
    }
    const raw = new WeakMap();
    const adj = new WeakMap();
    const known = new Set();
    Object.defineProperty(proto, "props", {
        configurable: true,
        get() {
            const p = raw.get(this);
            if (!p || p.name !== GRID_NAME)
                return p;
            let a = adj.get(p);
            if (!a) {
                a = { ...p, renderOutsideRows: 100000 };
                adj.set(p, a);
            }
            return a;
        },
        set(v) { raw.set(this, v); known.add(this); },
    });
    // уже созданный экземпляр: переводим его собственное свойство props на accessor
    const cur = inst.props;
    delete inst.props;
    inst.props = cur;
    try {
        inst.forceUpdate();
    }
    catch (err) {
        logErr("grid.forceUpdate", err);
    }
    gridPatched = true;
    unpatchers.push(() => {
        delete proto.props;
        known.forEach((o) => { try {
            o.props = raw.get(o);
        }
        catch (err) { /* ignore */ } });
        known.clear();
        gridPatched = false;
    });
}
function uninstall() {
    while (unpatchers.length) {
        try {
            unpatchers.pop()();
        }
        catch (err) { /* ignore */ }
    }
    untrackFocus();
}
function Content() {
    const [items, setItems] = SP_REACT.useState([]);
    SP_REACT.useEffect(() => setItems(listCollections()), []);
    return (window.SP_REACT.createElement(window.SP_REACT.Fragment, null,
        window.SP_REACT.createElement(DFL.PanelSection, { title: tr().collections }, items.map((c) => (window.SP_REACT.createElement(DFL.PanelSectionRow, { key: c.id },
            window.SP_REACT.createElement(DFL.ButtonItem, { layout: "below", onClick: () => DFL.showModal(window.SP_REACT.createElement(RenameModal, { c: c })) }, c.name)))))));
}
var index = definePlugin(() => {
    try {
        install();
    }
    catch (err) {
        logErr("install", err);
    }
    trackFocus();
    // документ главного окна может появиться позже загрузки плагина - пробуем несколько раз и прекращаем
    let tries = 0;
    const t = setInterval(() => { trackFocus(); if (trackedDoc || ++tries > 20)
        clearInterval(t); }, 1000);
    const guard = setInterval(() => { try {
        ensureInstalled();
    }
    catch (err) { /* ignore */ } }, 1000);
    return {
        name: "Collection Renamer",
        titleView: window.SP_REACT.createElement("div", null, "Collection Renamer"),
        content: window.SP_REACT.createElement(Content, null),
        icon: window.SP_REACT.createElement(FaPen, null),
        onDismount() {
            clearInterval(t);
            clearInterval(guard);
            uninstall();
        },
    };
});

export { index as default };
//# sourceMappingURL=index.js.map
