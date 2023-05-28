var P = Object.defineProperty, B = Object.defineProperties; var M = Object.getOwnPropertyDescriptors; var O = Object.getOwnPropertySymbols; var U = Object.prototype.hasOwnProperty, V = Object.prototype.propertyIsEnumerable; var L = (e, a, r) => a in e ? P(e, a, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[a] = r, T = (e, a) => { for (var r in a || (a = {})) U.call(a, r) && L(e, r, a[r]); if (O) for (var r of O(a)) V.call(a, r) && L(e, r, a[r]); return e }, $ = (e, a) => B(e, M(a)); import { B as Blockly, f as BlocklyWorkspace, q as BrowserRouter, F as Fragment, L as Link, M as Modal, N as Navigate, P as PtBr, v as React, t as ReactDOM, o as Route, R as Routes, S as SyntaxHighlighter, U as Ue, W as We, a as api, b as axios, k as dart, d as dist, g as javascript, j as jsx, c as jsxs, n as lib, l as lodash, h as lua, i as php, p as python, r as react, s as styled, u as useLocation, e as useNavigate, m as useParams } from "./vendor.71a06e9b.js";
const p = function () { const a = document.createElement("link").relList; if (a && a.supports && a.supports("modulepreload")) return; for (const o of document.querySelectorAll('link[rel="modulepreload"]')) d(o); new MutationObserver(o => { for (const t of o) if (t.type === "childList") for (const x of t.addedNodes) x.tagName === "LINK" && x.rel === "modulepreload" && d(x) }).observe(document, { childList: !0, subtree: !0 }); function r(o) { const t = {}; return o.integrity && (t.integrity = o.integrity), o.referrerpolicy && (t.referrerPolicy = o.referrerpolicy), o.crossorigin === "use-credentials" ? t.credentials = "include" : o.crossorigin === "anonymous" ? t.credentials = "omit" : t.credentials = "same-origin", t } function d(o) { if (o.ep) return; o.ep = !0; const t = r(o); fetch(o.href, t) } }; p(); var index = "", App$1 = "", colors = { primary: "#FFFFFF", primary_background: "#FBFBFB", primary_input_background: "#F1F1F1", secundary: "#004180", accent: "#F5850F", success: "#5CB660", failure: "#D32F2F", textGray: "#737373;" }; const Cores = We`
    .white {
        color: #ffffff ;
    }
    .gray {
        color:#FBFBFB;
    }
    .gray-2 {
        color:#F1F1F1;
    }
    .gray-3{
        color:#737373;
    }
    .blue {
        color:#004180;
    }
    .orange {
        color:#F5850F;
    }
    .green {
        color:#5CB660;
    }
    .red {
        color:#D32F2F;
    }

`; styled.section`
    grid-column: 2;
    align-self: center;
`; const HomeContainer = styled.main`
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 10px 0px;
    gap: 10px;
`; styled.div`
    display: flex;
    background-color: ${colors.primary};
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    width: 100%;
    padding: 10px 20px;
    flex-direction: column;

`; const TableWrap = styled.div`
    background-color: ${colors.primary};
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    width: 100%;
    padding: 10px 20px;
`, Table$1 = styled.table`
    width:100%;
    padding: 10px;
    border-collapse: collapse;
`, Thead$1 = styled.thead`
    background-color: ${colors.secundary};
    padding: 10px 20px;
    `, Tr$1 = styled.tr`
    cursor: pointer;
    border-bottom: 1px solid  ${colors.primary_input_background};
    &:nth-child(even){
        background-color: ${colors.primary_input_background};
    }
`, Th$1 = styled.th`
    width: ${e => e.width};
    margin-left: 0;
    margin-right: 0;
    text-align: ${e => e.textAlign};
    padding: 10px 20px;
`, TBody$1 = styled.tbody`

`, Td$1 = styled.td`
    padding:10px 20px;
`, storage = { set: () => { }, get: () => { }, remove: () => { } }; try { if (!window.localStorage) throw Error("no local storage"); storage.set = (e, a) => localStorage.setItem(e, JSON.stringify(a)), storage.get = e => { const a = localStorage.getItem(e); try { return JSON.parse(a) } catch { return null } }, storage.remove = e => localStorage.removeItem(e) } catch { storage.set = api.set, storage.get = api.get, storage.remove = api.remove } function useStorage(e) { const [a, r] = react.exports.useState(() => storage.get(e)), d = react.exports.useCallback(t => { storage.set(e, t), r(t) }, [e]), o = react.exports.useCallback(() => { storage.remove(e), r(void 0) }, [e]); return [a, d, o] } const AuthContext = react.exports.createContext({ token: null, setToken: e => { }, removeToken: () => { } }), AuthProvider = e => { const [a, r, d] = useStorage("token"); return jsx(AuthContext.Provider, { value: { setToken: r, token: a, removeToken: d }, children: e.children }) }, useAuth = () => { const { token: e, setToken: a, removeToken: r } = react.exports.useContext(AuthContext); return { token: e, setToken: a, removeToken: r } }; var Roles = (e => (e.ADMIN = "ADMIN", e.ADVISOR = "ADVISOR", e.STUDENT = "STUDENT", e))(Roles || {}), Services = (e => (e.USER_SERVICE = "USER_SERVICE", e.PROBLEM_SERVICE = "PROBLEM_SERVICE", e.CHAT_SERVICE = "CHAT_SERVICE", e.JUDGE_SERVICE = "JUDGE_SERVICE", e))(Services || {}); const UserContext = react.exports.createContext({ setUser: e => { }, removeUser: () => { }, id: void 0, email: void 0, name: void 0, role: void 0 }), UserProvider = e => { const [a, r, d] = useStorage("profile"), o = u => { r(JSON.stringify(u)) }, t = () => { d("profile") }; let x = { id: void 0, email: void 0, name: void 0 }; try { x = JSON.parse(a) } catch { } return jsx(UserContext.Provider, { value: $(T({}, x), { removeUser: t, setUser: o }), children: e.children }) }, useUser = () => react.exports.useContext(UserContext), BASE_URL = "http://localhost:10000/", useAuthenticateApi = () => { const { token: e, removeToken: a } = useAuth(), { removeUser: r } = useUser(), d = axios.create({ baseURL: BASE_URL }); return d.interceptors.request.use(m => (m.headers.Authorization = `Bearer ${e}`, m)), { get: async m => { try { return await d.get(m) } catch (l) { throw l.response.status === 401 && e && (r(), a(), dist.exports.Store.addNotification({ container: "top-center", title: "Sua sess\xE3o expirou", type: "danger", message: "Logue-se novamente para acessar a aplica\xE7\xE3o.", insert: "top", animationIn: ["animate__animated", "animate__fadeIn"], animationOut: ["animate__animated", "animate__fadeOut"], dismiss: { duration: 5e3, onScreen: !0 } })), l.code == "ERR_NETWORK" && dist.exports.Store.addNotification({ container: "top-center", title: "Sem conex\xE3o com a internet.", message: "", insert: "top", type: "danger", animationIn: ["animate__animated", "animate__fadeIn"], animationOut: ["animate__animated", "animate__fadeOut"], dismiss: { duration: 5e3, onScreen: !0 } }), l } }, post: async (m, l) => { try { return await d.post(m, l) } catch (c) { throw c.response.status === 401 && e && (r(), a(), dist.exports.Store.addNotification({ container: "top-center", title: "Sua sess\xE3o expirou", type: "danger", message: "Logue-se novamente para acessar a aplica\xE7\xE3o.", insert: "top", animationIn: ["animate__animated", "animate__fadeIn"], animationOut: ["animate__animated", "animate__fadeOut"], dismiss: { duration: 5e3, onScreen: !0 } })), console.log(c), c.code == "ERR_NETWORK" && dist.exports.Store.addNotification({ container: "top-center", title: "Sem conex\xE3o com a intenet", message: "Tente navamente mais tarde", insert: "top", animationIn: ["animate__animated", "animate__fadeIn"], animationOut: ["animate__animated", "animate__fadeOut"], dismiss: { duration: 5e3, onScreen: !0 } }), c } }, del: async m => { try { return await d.delete(m) } catch (l) { throw l.response.status === 401 && e && (r(), a(), dist.exports.Store.addNotification({ container: "top-center", title: "Sua sess\xE3o expirou", type: "danger", message: "Logue-se novamente para acessar a aplica\xE7\xE3o.", insert: "top", animationIn: ["animate__animated", "animate__fadeIn"], animationOut: ["animate__animated", "animate__fadeOut"], dismiss: { duration: 5e3, onScreen: !0 } })), l.code == "ERR_NETWORK" && dist.exports.Store.addNotification({ container: "top-center", title: "Sem conex\xE3o com a internet.", message: "", insert: "top", type: "danger", animationIn: ["animate__animated", "animate__fadeIn"], animationOut: ["animate__animated", "animate__fadeOut"], dismiss: { duration: 5e3, onScreen: !0 } }), l } }, put: async (m, l) => { try { return await d.put(m, l) } catch (c) { throw c.response.status === 401 && e && (r(), a(), dist.exports.Store.addNotification({ container: "top-center", title: "Sua sess\xE3o expirou", type: "danger", message: "Logue-se novamente para acessar a aplica\xE7\xE3o.", insert: "top", animationIn: ["animate__animated", "animate__fadeIn"], animationOut: ["animate__animated", "animate__fadeOut"], dismiss: { duration: 5e3, onScreen: !0 } })), c.code == "ERR_NETWORK" && dist.exports.Store.addNotification({ container: "top-center", title: "Sem conex\xE3o com a internet.", message: "", insert: "top", type: "danger", animationIn: ["animate__animated", "animate__fadeIn"], animationOut: ["animate__animated", "animate__fadeOut"], dismiss: { duration: 5e3, onScreen: !0 } }), c } }, patch: async (m, l) => { try { return await d.patch(m, l) } catch (c) { throw c.response.status === 401 && e && (r(), a(), dist.exports.Store.addNotification({ container: "top-center", title: "Sua sess\xE3o expirou", type: "danger", message: "Logue-se novamente para acessar a aplica\xE7\xE3o.", insert: "top", animationIn: ["animate__animated", "animate__fadeIn"], animationOut: ["animate__animated", "animate__fadeOut"], dismiss: { duration: 5e3, onScreen: !0 } })), c.code == "ERR_NETWORK" && dist.exports.Store.addNotification({ container: "top-center", title: "Sem conex\xE3o com a internet.", message: "", insert: "top", type: "danger", animationIn: ["animate__animated", "animate__fadeIn"], animationOut: ["animate__animated", "animate__fadeOut"], dismiss: { duration: 5e3, onScreen: !0 } }), c } } } }; function useApi() { const e = axios.create({ baseURL: BASE_URL }); return { get: async (x, u) => { try { return console.log(u), await e.get(x, u) } catch (n) { throw n.code == "ERR_NETWORK" && dist.exports.Store.addNotification({ container: "top-center", title: "Sem conex\xE3o com a internet.", message: "", insert: "top", type: "danger", animationIn: ["animate__animated", "animate__fadeIn"], animationOut: ["animate__animated", "animate__fadeOut"], dismiss: { duration: 5e3, onScreen: !0 } }), n } }, post: async (x, u) => { try { return await e.post(x, u) } catch (n) { throw n.code == "ERR_NETWORK" && dist.exports.Store.addNotification({ container: "top-center", title: "Sem conex\xE3o com a internet.", message: "", insert: "top", type: "danger", animationIn: ["animate__animated", "animate__fadeIn"], animationOut: ["animate__animated", "animate__fadeOut"], dismiss: { duration: 5e3, onScreen: !0 } }), n } }, del: async x => { try { return await e.delete(x) } catch (u) { throw u.code == "ERR_NETWORK" && dist.exports.Store.addNotification({ container: "top-center", title: "Sem conex\xE3o com a internet.", message: "", insert: "top", type: "danger", animationIn: ["animate__animated", "animate__fadeIn"], animationOut: ["animate__animated", "animate__fadeOut"], dismiss: { duration: 5e3, onScreen: !0 } }), u } }, put: async (x, u) => { try { return await e.put(x, u) } catch (n) { throw n.code == "ERR_NETWORK" && dist.exports.Store.addNotification({ container: "top-center", title: "Sem conex\xE3o com a internet.", message: "", insert: "top", type: "danger", animationIn: ["animate__animated", "animate__fadeIn"], animationOut: ["animate__animated", "animate__fadeOut"], dismiss: { duration: 5e3, onScreen: !0 } }), n } }, patch: async (x, u) => { try { return await e.patch(x, u) } catch (n) { throw n.code == "ERR_NETWORK" && dist.exports.Store.addNotification({ container: "top-center", title: "Sem conex\xE3o com a internet.", message: "", insert: "top", type: "danger", animationIn: ["animate__animated", "animate__fadeIn"], animationOut: ["animate__animated", "animate__fadeOut"], dismiss: { duration: 5e3, onScreen: !0 } }), n } } } } const rotate360 = Ue`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`, Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  align-self: center;
  border: 6px solid #f3f3f3; /* Light grey */
  border-bottom: 4px solid #f3f3f3; /* Light grey */
  border-left: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid ${colors.accent}; /* Blue */
  width:${e => e.width ? e.width : "20px"};
  height: ${e => e.height ? e.height : "20px"};
  background: transparent;
  border-radius: 50%;
`, Typograph = We`
    .font-1-xs {
  font: 400 0.75rem/1.35 "Poppins", sans-serif;
}

.font-2-xs {
  font: 400 0.875rem/1.43 "Roboto", sans-serif;
}

.font-1-s {
  font: 400 1rem/1.5 "Poppins", sans-serif;
}

.font-2-s {
  font: 400 1rem/1.5 "Roboto", sans-serif;
}

.font-1-m,
.font-1-m-b {
  font: 400 1.125rem/1.35 "Poppins", sans-serif;
}

.font-1-m-b {
  font-weight: 600;
}

.font-2-m {
  font: 500 1.125rem/1.35 "Roboto", sans-serif;
}

.font-1-l {
  font: 400 1.5rem/1.5 "Poppins", sans-serif;
}

.font-2-l,
.font-2-l-b {
  font: 400 1.5rem/1.5 "Roboto", sans-serif;
}

.font-2-l-b {
  font-weight: 500;
  letter-spacing: 0.015em;
  text-transform: uppercase;
}

.font-1-xl {
  font: 600 2.2rem/1.25 "Poppins", sans-serif;
}
.font-light {
    font-weight: 300;
}
.font-2-xl {
  font: 500 2rem/1.25 "Roboto", sans-serif;
}

.font-1-xxl {
  font: 600 4rem/1.125 "Poppins", sans-serif;
}

@media (max-width: 1200px) {
  .font-1-xxl {
    font-size: 3rem;
  }
  .font-2-l,
  .font-2-l-b {
    font-size: 1.125rem;
  }
}

@media (max-width: 800px) {
  .font-1-xxl {
    font-size: 2rem;
  }
  .font-1-xl,
  .font-2-xl {
    font-size: 1.5rem;
  }
}

`, GlobalStyle = We`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
        //font-family: 'Roboto', sans-serif;
    }
    body {
        background-color: ${colors.primary_background};
    }

`; var GlobalStylesSet = () => jsxs(Fragment, { children: [jsx(GlobalStyle, {}), jsx(Typograph, {}), jsx(Cores, {})] }); const Container$3 = styled.div`
    max-width: ${e => e.full ? "initial" : "1200px"};
    margin: 0 auto;
    padding-left: ${e => e.full ? "20px" : "initial"};
    padding-right: ${e => e.full ? "20px" : "initial"};
    .d-flex {
        display: flex;
    }
    .j-center {
        justify-content: center;
    }
    .a-center{
        align-items: center;
    }
`, Card = styled.div`
    background-color: ${colors.primary};
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    padding: ${e => e.padding ? e.padding : "10px 20px"} ;
`, Table = styled.table`
    width:100%;
    padding: 10px;
    border-collapse: collapse;
`, Thead = styled.thead`
    background-color: ${colors.secundary};
    padding: 10px 20px;
    `, Tr = styled.tr`
    border-bottom: 1px solid  ${colors.primary_input_background};
    &:nth-child(even){
        background-color: ${colors.primary_input_background};
    }
`, Th = styled.th`
    width: ${e => e.width};
    margin-left: 0;
    margin-right: 0;
    text-align: ${e => e.textAlign};
    padding: 10px 20px;
`, TBody = styled.tbody`

`, Td = styled.td`
    padding:10px 20px;
`, Header$2 = styled.div`
    display: flex;
    background-color: ${colors.primary};
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    width: 100%;
    padding: 10px 20px;
    flex-direction: column;

`; var Title = ({ subtitle: e, title: a, margin: r }) => jsxs(Header$2, { style: { margin: r }, children: [jsx("h1", { className: "font-1-xl blue", children: a }), jsx("p", { className: "font-2-m font-light", children: e })] }), SubmissionStatus = (e => (e.ACCEPTED = "ACCEPTED", e.TIME_LIMIT_EXCEEDED = "TIME_LIMIT_EXCEEDED", e.PRESENTATION_ERROR = "PRESENTATION_ERROR", e.PENDING = "PENDING", e.RUNTIME_ERROR = "RUNTIME_ERROR", e.COMPILATION_ERROR = "COMPILATION_ERROR", e.WRONG_ANSWER = "WRONG_ANSWER", e))(SubmissionStatus || {}); function Home(e) { useLocation(); const a = useAuthenticateApi(), [r, d] = react.exports.useState([]), o = useNavigate(), [t, x] = react.exports.useState(!0), { name: u } = useUser(); return react.exports.useEffect(() => { (async () => { try { x(!0); const n = await a.get(`/submissions?filter=${JSON.stringify({ include: ["problem"], order: "createdAt DESC" })}`); d(n.data), console.log(n) } catch { } finally { x(!1) } })() }, []), jsx(Container$3, { children: jsxs(HomeContainer, { children: [jsx(Card, { children: jsxs("span", { children: ["Ol\xE1, seja bem vindo ", u] }) }), jsx(Title, { title: "Submiss\xF5es", subtitle: "Abaixo est\xE3o todas as submiss\xF5es que realizou at\xE9 agora." }), jsxs(TableWrap, { children: [r.length == 0 && jsxs("div", { style: { display: "flex", width: "100%", justifyContent: "center" }, children: [!t && jsx("h2", { className: "font-1-l", children: "N\xE3o h\xE1 submiss\xF5es" }), t && jsx(Spinner, {})] }), !t && r.length != 0 && jsxs(Table$1, { width: "100%", children: [jsx(Thead$1, { children: jsxs(Tr$1, { children: [jsx(Th$1, { className: "font-2-m white", width: "5%", textAlign: "start", children: "C\xF3digo" }), jsx(Th$1, { className: "font-2-m white", width: "5%", textAlign: "start", children: "Dificuldade" }), jsx(Th$1, { className: "font-2-m white", width: "20%", textAlign: "start", children: "Status" }), jsx(Th$1, { className: "font-2-m white", width: "70%", textAlign: "start", children: "Nome" })] }) }), jsx(TBody$1, { children: r.map(n => jsxs(Tr$1, { className: "font-2-xs", children: [jsx(Td$1, { children: jsx(Link, { state: { problemId: n.problem.id }, style: { display: "inline-block" }, to: `/submissoes/${n.id}`, children: jsx("span", { style: { display: "flex", alignItems: "center" }, children: n.id }) }) }), jsx(Td$1, { children: jsx(Link, { state: { problemId: n.problem.id }, style: { display: "inline-block" }, to: `/submissoes/${n.id}`, children: jsx("span", { style: { display: "flex", alignItems: "center" }, children: n.problem.dificultyLevel }) }) }), jsx(Td$1, { children: jsx(Link, { state: { problemId: n.problem.id }, style: { display: "inline-block" }, to: `/submissoes/${n.id}`, children: jsx("span", { className: `${n.status == "ACCEPTED" ? "green" : "red"}`, style: { display: "flex", alignItems: "center" }, children: (m => { switch (m) { case "ACCEPTED": return "Aceito"; case "PRESENTATION_ERROR": return "Erro de Apresenta\xE7\xE3o"; case "PENDING": return "Pendente"; case "RUNTIME_ERROR": return "Erro de Execu\xE7\xE3o"; case "TIME_LIMIT_EXCEEDED": return "Tempo limite excedido"; case "COMPILATION_ERROR": return "Erro de Compila\xE7\xE3o"; case "WRONG_ANSWER": return "Resposta Incorreta"; default: return m } })(n.status) }) }) }), jsx(Td$1, { children: jsxs("span", { style: { display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }, children: [jsx(Link, { style: { display: "inline-block", padding: 5 }, state: { problemId: n.problem.id }, className: "test-gray", to: `/submissoes/${n.id}`, children: n.problem.title }), jsx("a", { className: "orange", style: { display: "inline-block", padding: "5px" }, onClick: m => o(`/editor/${n.problem.id}`, { state: { params: { blocksXml: n.blocksXml } } }), children: "Refazer" })] }) })] }, n.id)) })] })] })] }) }) } const Header$1 = styled.header`
    box-sizing: border-box;
    background-color: ${colors.secundary};
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px ;
    padding-right: 20px;
    paddong-left: 20px;
`, Brand = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`, DropdownContent = styled.div`
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    width: max-content;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 12px 16px;
    z-index: 1;
`, DropdownWrapper = styled.div`
    position: relative;
    display: inline-block;

    &:hover .dropdown-content {
        display: block;
    }
`; var brand = "/assets/brand.a45afd33.svg"; const Navbar = e => { const { removeToken: a, token: r } = useAuth(); useLocation(); const d = useUser(), o = t => { a() }; return jsx(Fragment, { children: jsx(Header$1, { children: jsx(Container$3, { full: !0, children: jsxs("div", { style: { margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }, children: [jsxs(Brand, { children: [jsx("img", { src: brand, width: "50px" }), jsx("span", { className: "font-2-s white", children: "JOAO - JUIZ ONLINE DE AVALIA\xC7\xC3O COM ORIENTA\xC7\xC3O" })] }), jsx("div", { style: { display: "flex", flexDirection: "row", gap: 20 }, children: r ? jsxs(Fragment, { children: [d.role === Roles.ADMIN && jsxs(DropdownWrapper, { children: [jsx("span", { className: "font-2-s white", children: "Administrador" }), jsx(DropdownContent, { className: "dropdown-content", children: jsx("ul", { children: jsx("li", { children: jsx(Link, { style: { display: "inline-block" }, to: "/admin/problems", className: "font-2-s", children: "Gerenciar problemas" }) }) }) })] }), d.role == Roles.ADVISOR && jsxs(DropdownWrapper, { children: [jsx("span", { className: "font-2-s white", children: "Orientador" }), jsx(DropdownContent, { className: "dropdown-content", children: jsxs("ul", { children: [jsx("li", { children: jsx(Link, { style: { display: "block" }, to: "/orientador/duvidas", className: "font-2-s", children: "Listar d\xFAvidas" }) }), jsx("li", { children: jsx(Link, { style: { display: "block" }, to: "/orientador/chat", className: "font-2-s", children: "Chat" }) })] }) })] }), jsxs(DropdownWrapper, { children: [jsx("span", { className: "font-2-s white", children: "Problemas" }), jsx(DropdownContent, { className: "dropdown-content", children: jsxs("ul", { children: [jsx("li", { children: jsx(Link, { style: { display: "block" }, to: "/", className: "font-2-s ", children: "Submiss\xF5es" }) }), jsx("li", { children: jsx(Link, { style: { display: "block" }, to: "/exercicios", className: "font-2-s", children: "Lista de Exerc\xEDcios" }) }), jsx("li", { children: jsx(Link, { style: { display: "block" }, to: "/chat", className: "font-2-s", children: "Chat de D\xFAvidas" }) })] }) })] }), jsxs(DropdownWrapper, { children: [jsx("span", { className: "font-2-s white", children: "Usu\xE1rio" }), jsx(DropdownContent, { className: "dropdown-content", children: jsxs("ul", { children: [jsx("li", { children: jsx(Link, { style: { display: "block" }, to: "/perfil", className: "font-2-s", children: "Perfil" }) }), jsx("li", { children: jsx(Link, { style: { display: "block" }, to: "/login", className: "font-2-s", onClick: o, children: "Sair" }) })] }) })] })] }) : jsxs(Fragment, { children: [jsx(Link, { to: "/login", className: "font-2-s white", children: "Login" }), jsx(Link, { to: "/signup", className: "font-2-s white", children: "Cadastrar-se" })] }) })] }) }) }) }) }, logicBlocks = { kind: "category", name: "L\xF3gico", colour: "#5b80a5", contents: [{ kind: "block", type: "logic_compare" }, { kind: "block", type: "logic_operation" }, { kind: "block", type: "logic_negate" }, { kind: "block", type: "logic_null" }, { kind: "block", type: "logic_boolean", BOOL: !1 }, { kind: "block", type: "controls_if" }, { kind: "block", type: "controls_ifelse" }, { kind: "block", type: "logic_ternary" }] }, mathBlocks = { kind: "category", name: "Matem\xE1tica", colour: "#5b67a5", contents: [{ kind: "block", type: "math_number" }, { kind: "block", type: "math_arithmetic", inputs: { A: { shadow: { type: "math_number", fields: { NUM: 0 } } }, B: { shadow: { type: "math_number", fields: { NUM: 0 } } } } }, { kind: "block", type: "math_round", inputs: { NUM: { shadow: { type: "math_number", fields: { NUM: 3.1 } } } } }, { kind: "block", type: "math_single", inputs: { NUM: { shadow: { type: "math_number", fields: { NUM: 9 } } } } }, { kind: "block", type: "math_trig", fields: { OP: "SIN" }, inputs: { NUM: { shadow: { type: "math_number", fields: { NUM: 45 } } } } }, { kind: "block", type: "math_constant", fields: { CONSTANT: "PI" } }, { kind: "block", type: "math_number_property", extraState: '<mutation divisor_input="false"></mutation>', fields: { PROPERTY: "EVEN" }, inputs: { NUMBER_TO_CHECK: { shadow: { type: "math_number", fields: { NUM: 0 } } } } }, { kind: "block", type: "math_on_list", extraState: '<mutation op="SUM"></mutation>', fields: { OP: "SUM" } }, { kind: "block", type: "math_modulo", inputs: { DIVIDEND: { shadow: { type: "math_number", fields: { NUM: 64 } } }, DIVISOR: { shadow: { type: "math_number", fields: { NUM: 10 } } } } }, { kind: "block", type: "math_constrain", inputs: { VALUE: { shadow: { type: "math_number", fields: { NUM: 50 } } }, LOW: { shadow: { type: "math_number", fields: { NUM: 1 } } }, HIGH: { shadow: { type: "math_number", fields: { NUM: 100 } } } } }, { kind: "block", type: "math_random_int", inputs: { FROM: { shadow: { type: "math_number", fields: { NUM: 1 } } }, TO: { shadow: { type: "math_number", fields: { NUM: 100 } } } } }, { kind: "block", type: "math_random_float" }, { kind: "block", type: "math_atan2", inputs: { X: { shadow: { type: "math_number", fields: { NUM: 1 } } }, Y: { shadow: { type: "math_number", fields: { NUM: 1 } } } } }] }, loopBlocks = { kind: "category", name: "La\xE7os", colour: "#5ba55b", contents: [{ kind: "block", type: "controls_repeat_ext", inputs: { TIMES: { shadow: { type: "math_number", fields: { NUM: 0 } } } } }, { kind: "block", type: "controls_whileUntil", fields: { MODE: "WHILE" } }, { kind: "block", type: "controls_for", fields: { VAR: {} }, inputs: { FROM: { shadow: { type: "math_number", fields: { NUM: 1 } } }, TO: { shadow: { type: "math_number", fields: { NUM: 10 } } }, BY: { shadow: { type: "math_number", fields: { NUM: 1 } } } } }, { kind: "block", type: "controls_forEach", fields: { VAR: {} } }, { kind: "block", type: "controls_flow_statements", fields: { FLOW: "BREAK" } }] }, textBlocks = { kind: "category", name: "Texto", colour: "#5ba58c", contents: [{ kind: "block", type: "text_join", extraState: { itemCount: 2 } }, { kind: "block", type: "text", fields: { TEXT: "" } }, { kind: "block", type: "text_append", fields: { VAR: {} }, inputs: { TEXT: { shadow: { type: "text", fields: { TEXT: "" } } } } }, { kind: "block", type: "text_length", inputs: { VALUE: { shadow: { type: "text", fields: { TEXT: "abc" } } } } }, { kind: "block", type: "text_isEmpty", inputs: { VALUE: { shadow: { type: "text", fields: { TEXT: "" } } } } }, { kind: "block", type: "text_indexOf", fields: { END: "FIRST" }, inputs: { VALUE: { block: { type: "variables_get", fields: { VAR: {} } } }, FIND: { shadow: { type: "text", fields: { TEXT: "abc" } } } } }, { kind: "block", type: "text_charAt", extraState: '<mutation at="true"></mutation>', fields: { WHERE: "FROM_START" }, inputs: { VALUE: { block: { type: "variables_get", fields: { VAR: {} } } } } }, { kind: "block", type: "text_getSubstring", extraState: '<mutation at1="true" at2="true"></mutation>', fields: { WHERE1: "FROM_START", WHERE2: "FROM_START" }, inputs: { STRING: { block: { type: "variables_get", fields: { VAR: {} } } } } }, { kind: "block", type: "text_changeCase", fields: { CASE: "UPPERCASE" }, inputs: { TEXT: { shadow: { type: "text", fields: { TEXT: "abc" } } } } }, { kind: "block", type: "text_trim", fields: { MODE: "BOTH" }, inputs: { TEXT: { shadow: { type: "text", fields: { TEXT: "abc" } } } } }] }, listBlocks = { kind: "category", name: "Listas", colour: "#745ba5", contents: [{ kind: "block", type: "lists_create_with", extraState: { itemCount: 0 } }, { kind: "block", type: "lists_create_with", extraState: { itemCount: 3 } }, { kind: "block", type: "lists_length" }, { kind: "block", type: "lists_repeat", inputs: { NUM: { shadow: { type: "math_number", fields: { NUM: 5 } } } } }, { kind: "block", type: "lists_isEmpty" }, { kind: "block", type: "lists_indexOf", fields: { END: "FIRST" }, inputs: { VALUE: { block: { type: "variables_get", fields: { VAR: {} } } } } }, { kind: "block", type: "lists_getIndex", extraState: '<mutation statement="false" at="true"></mutation>', fields: { MODE: "GET", WHERE: "FROM_START" }, inputs: { VALUE: { block: { type: "variables_get", fields: { VAR: {} } } } } }, { kind: "block", type: "lists_setIndex", extraState: '<mutation at="true"></mutation>', fields: { MODE: "SET", WHERE: "FROM_START" }, inputs: { LIST: { block: { type: "variables_get", fields: { VAR: {} } } } } }, { kind: "block", type: "lists_getSublist", extraState: '<mutation at1="true" at2="true"></mutation>', fields: { WHERE1: "FROM_START", WHERE2: "FROM_START" }, inputs: { LIST: { block: { type: "variables_get", fields: { VAR: {} } } } } }, { kind: "block", type: "lists_split", extraState: '<mutation mode="SPLIT"></mutation>', fields: { MODE: "SPLIT" }, inputs: { DELIM: { shadow: { type: "text", fields: { TEXT: "," } } } } }, { kind: "block", type: "lists_sort", fields: { TYPE: "NUMERIC", DIRECTION: "1" } }] }, variableBlocks = { kind: "category", name: "Vari\xE1veis", colour: "#a55b80", custom: "VARIABLE", contents: [{ kind: "button", text: "criar variavel", callbackKey: "create_variable" }] }, functionBlocks = { kind: "category", name: "Fun\xE7\xF5es", colour: "#995ba5", custom: "PROCEDURE", contents: [{ kind: "block", type: "procedures_defnoreturn", icons: { comment: { text: "Descreva esta fun\xE7\xE3o...", height: 80, width: 160 } }, fields: { NAME: "fa\xE7a algo" } }, { kind: "block", type: "procedures_defreturn", icons: { comment: { text: "Descreva esta fun\xE7\xE3o...", height: 80, width: 160 } }, fields: { NAME: "fa\xE7a algo" } }, { kind: "block", type: "procedures_ifreturn", extraState: '<mutation value="1"></mutation>' }, { kind: "block", type: "procedures_callnoreturn", extraState: { name: "fa\xE7a algo" } }, { kind: "block", type: "procedures_callreturn", extraState: { name: "fa\xE7a algo" } }] }, inputOutputBlocks = { kind: "category", name: "Entrada e sa\xEDda", colour: "#5ba58c", contents: [{ kind: "block", type: "text_print", inputs: { TEXT: { shadow: { type: "text", fields: { TEXT: "abc" } } } } }, { kind: "block", type: "text_prompt_ext", extraState: '<mutation type="TEXT"></mutation>', fields: { TYPE: "TEXT" }, inputs: { TEXT: { shadow: { type: "text", fields: { TEXT: "abc" } } } } }, { kind: "block", type: "text_prompt_ext", extraState: '<mutation type="NUMBER"></mutation>', fields: { TYPE: "NUMBER" }, inputs: { TEXT: { shadow: { type: "text", fields: { NUM: 0 } } } } }] }, toolboxCategories = { kind: "categoryToolbox", contents: [inputOutputBlocks, logicBlocks, loopBlocks, mathBlocks, textBlocks, listBlocks, variableBlocks, functionBlocks] }, CustomBlocklyWorkpace = ({ code: e, onCodeChange: a, onXmlChange: r, children: d, language: o, initialXml: t }) => { Blockly.setLocale(PtBr); const [x, u] = react.exports.useState([]), [n, m] = react.exports.useState([]); function l(g) { g.getButtonCallback("create_variable") || g.registerButtonCallback("create_variable", () => { let _ = g.createVariable(window.prompt() || lodash.exports.uniqueId("var-")); g.setVariables([...x, _]) }), g.getToolboxCategoryCallback("VARIABLE") || g.registerToolboxCategoryCallback("VARIABLE", _ => { let E = []; for (let S of x) E.push({ kind: "block", type: "variables_get", fields: { VAR: { id: S.getId() } } }); return E }), g.getToolboxCategoryCallback("PROCEDURE") || g.registerToolboxCategoryCallback("PROCEDURE", _ => { let E = []; for (let S of n) E.push({ kind: "block", type: "procedures_ifreturn", extraState: '<mutation value="1"></mutation>' }), E.push({ kind: "block", type: "procedures_callnoreturn", extraState: { name: "fa\xE7a algo" } }), E.push({ kind: "block", type: "procedures_callreturn", extraState: { name: "fa\xE7a algo" } }); m([n, ...E]) }); const v = c(o, g); e !== v && a(v) } function c(g, v) { switch (g) { case "javascript": return javascript.exports.workspaceToCode(v); case "dart": return dart.exports.workspaceToCode(v); case "php": return php.exports.workspaceToCode(v); case "python": return python.exports.workspaceToCode(v); case "lua": return lua.exports.workspaceToCode(v); default: return javascript.exports.workspaceToCode(v) } } return jsxs(Fragment, { children: [jsx(BlocklyWorkspace, { toolboxConfiguration: toolboxCategories, className: "full", workspaceConfiguration: { grid: { spacing: 20, length: 3, colour: "#ccc", snap: !0 }, zoom: { controls: !0, wheel: !0, startScale: 1, maxScale: 3, minScale: .3, scaleSpeed: 1.2, pinch: !0 } }, onWorkspaceChange: l, onXmlChange: r, initialXml: t }), d] }) }; var leftArrow = "/assets/sideArrow.b1285500.svg"; const Arrow = styled.span`
position: absolute;
        content: '';
        top: ${e => (e.open, "17vh")} ;
        width: 20px;
        background: url(${leftArrow}) no-repeat center, ${colors.primary};
        border: solid 1px ${colors.secundary};
        border-radius:4px;
        height: 80px;
        left: -10px;
        transform: ${e => e.open ? "none" : "rotate(180deg)"};
        cursor: pointer;

`, WrapCode = styled.div`
    border-radius: 4px;
    padding: 0 20px;
    min-height: 45vh;
    max-height: 45vh;
    border: solid 1px ${colors.secundary};
    background-color: ${colors.primary};
    position: absolute;
    z-index: 9;
    right: 20px;
    min-width: ${e => e.open ? "400px" : "0px"};
    width: ${e => e.open ? "initial" : "0px"};
    transition: min-width 0.3s, width 0.3s ;
    top: calc( 100vh / 4.5 );
    display: flex;
    flex-direction: column;
    @media (max-width: 1280px) {
        min-height: 35vh;
        top: calc( 100vh / 3 );
    }
`, Content = styled.div`
    display: flex;
    position: relative;
    margin-top: 20px;
    max-height:35vh;
    width: ${e => e.open ? "initial" : "0px"};
    opacity: ${e => e.open ? "1" : "0"};
`, SelectLanguage = styled.select`
    padding: 10px 20px;
    background-color: ${colors.secundary};
    border-radius:4px;
    text-align: center;
    align-self: center;
    color: ${colors.primary};
    width: ${e => e.open ? "60%" : "0px"};
    opacity: ${e => e.open ? "1" : "0"};
`, GeneratedCodeArea = ({ code: e, style: a, onLanguageChange: r, language: d }) => { const [o, t] = react.exports.useState(!1); return jsx(Fragment, { children: jsxs(WrapCode, { open: o, children: [jsx(Arrow, { open: o, onClick: () => t(!o) }), jsxs(SelectLanguage, { open: o, value: d, onChange: r, children: [jsx("option", { value: "javascript", children: "Javascript" }), jsx("option", { value: "python", children: "Python" }), jsx("option", { value: "dart", children: "Dart" }), jsx("option", { value: "php", children: "PHP" }), jsx("option", { value: "lua", children: "Lua" })] }), jsx(Content, { open: o, children: jsx(SyntaxHighlighter, { customStyle: a, language: "javascript", children: e }) })] }) }) }, QuestionWraper = styled.section`
    display: grid;
    gap: 10px;
    grid-template-columns: auto 1fr auto;
    min-height: 80px;
    align-content:center;
    justify-content: center;
    background: ${colors.primary};
    margin:10px 20px;
    padding: 20px;
    border-radius: 4px;
`, Question = styled.div`
    padding-left: 20px;
    padding-right: 20px;
`, ImgWrapper = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
`, ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    &  > button + button {
        margin-top: 10px;
    }
`, ButtonPrimary = styled.button`
    background-color: ${colors.accent};
    color: white;
    width: 100%;
    padding: 10px 14px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

`, ButtonSecondary = styled.button`
    background-color: ${colors.secundary};
    padding: 10px 14px;
    border: none;
    width: 100%;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    display: block;
    &:hover{

    }
`; var judge = "/assets/judge.7626ed5b.svg"; const BoxQuestion = ({ question: e, onButtonRunPressed: a, onGoForward: r, wrapperStyle: d, test: o, isSubmitting: t, onDetailsClick: x, handleCreateNewDoubt: u }) => jsxs(QuestionWraper, { style: d || {}, children: [jsx(ImgWrapper, { children: jsx("img", { src: judge }) }), jsxs(Question, { children: [jsx("h2", { children: jsx("strong", { children: e.title }) }), jsx("a", { style: { display: "block", cursor: "pointer" }, className: "font-1-md orange", onClick: n => x && x(), children: "Detalhes" }), jsxs("p", { children: ["Voc\xEA pode solicitar ajuda com um orientador", jsx("a", { className: "blue", onClick: n => u && u(), style: { cursor: "pointer" }, children: " clicando aqui" })] })] }), jsxs(ButtonWrapper, { children: [a && !t && jsx(ButtonPrimary, { onClick: a, children: "Enviar!" }), t && jsx(ButtonPrimary, { style: { display: "flex", justifyContent: "center" }, children: jsx(Spinner, {}) }), r && jsx(ButtonSecondary, { onClick: r, children: "Vai pra frente" }), o && jsx(ButtonSecondary, { onClick: o, children: "Testar" })] })] }); var Button = styled.button`
    border: none;
    border-radius: 4px;
    padding: ${e => e.padding ? e.padding : "10px 20px"};
    margin: ${e => e.margin ? e.margin : "initial"};
    background-color: ${e => e.backgroundColor ? e.backgroundColor : colors.accent};
    color: ${e => e.color ? e.color : colors.primary} ;
    cursor: pointer;
    width: ${e => e.width ? e.width : "initial"};
    align-self: ${e => e.alignSelf ? e.alignSelf : "initial"};
    justify-self: ${e => e.justifySelf ? e.justifySelf : "initial"};
`, DoubtsTags = (e => (e.LOOPS = "loops", e.CONDITIONAL = "condicionais", e.VARIABLES = "variaveis", e.INPUT_OUTPUTS = "entrada_saida", e.OTHERS = "outros", e))(DoubtsTags || {}); const customStyles = { content: { top: "50%", left: "50%", right: "auto", bottom: "auto", marginRight: "-50%", transform: "translate(-50%, -50%)", maxWidth: "1200px" } }, Editor = () => {
    var e, a, r, d, o; const [code, setCode] = react.exports.useState(""), [problem, setProblem] = react.exports.useState(null), navigate = useNavigate(), authApi = useAuthenticateApi(), [xml, setXml] = react.exports.useState(""), [language, setLanguage] = react.exports.useState("javascript"), params = useParams(), location = useLocation(), [isLoading, setLoading] = react.exports.useState(!1), [modalIsOpen, setIsOpen] = react.exports.useState(!1), [modalDoubtOpen, setModalDoubtOpen] = react.exports.useState(!1), [tagDoubt, setTagDoubt] = react.exports.useState("outros"); Modal.setAppElement("#root"); function openModal() { setIsOpen(!0) } function closeModal() { setIsOpen(!1) } function openModalDoubt() { setModalDoubtOpen(!0) } function closeModalDoubt() { setModalDoubtOpen(!1) } const handleLanguageChange = t => { t.preventDefault(), setLanguage(t.target.value) }, handleCreateNewDoubt = async () => { try { const t = await authApi.post(`/doubt/problem/${params.id}`, { tagDoubt }); dist.exports.Store.addNotification({ title: "Enviado", message: "Solicita\xE7\xE3o para falar com orientador foi criada com sucesso \u{1F600}", type: "success", container: "top-center", dismiss: { duration: 3e3 } }), navigate("/chat", { state: { doubtId: t.data.id } }) } catch (t) { t.response && dist.exports.Store.addNotification({ title: "Erro", message: t.response.data.error.message, type: "danger", container: "top-center", dismiss: { duration: 3e3 } }), console.error(t) } }; react.exports.useEffect(() => { (async () => { try { let t = await authApi.get(`/problems/${params.id}`); setProblem(t.data), console.log(t.data.demonstrations), openModal() } catch { } })() }, []); const submit = async () => { try { setLoading(!0); let t = await authApi.post(`/problems/${params.id}/submissions`, { blocksXml: xml, problemId: params.id }); dist.exports.Store.addNotification({ title: "Enviado", message: "Seu c\xF3digo foi submetido com sucesso \u{1F600}", type: "success", container: "top-center", dismiss: { duration: 3e3 } }), navigate(`/submissoes/${t.data.id}`, { state: { problemId: params.id } }) } catch (t) { t.response && dist.exports.Store.addNotification({ title: "Erro", message: t.response.data.error.message, type: "danger", container: "top-center", dismiss: { duration: 3e3 } }), console.log(t.response.data.error.message) } finally { setLoading(!1) } }, handleExec = () => {
        try { eval(code) } catch (t) {
            console.log(t); let x = new RegExp("(?<=Cannot read properties of undefined \\(reading )'([\\(A-Za-z_0-9]+)'", "g"); if (t.message.match(x) != null) {
                alert("Opa, parece que voc\xEA n\xE3o inicializou algo e esta tentando usar a fun\xE7\xE3o " + t.message.match(x)[0] + `
Revise e veja se suas v\xE1riaveis foram iniciadas antes de serem usadas :D
`+ t.message); return
            } if (x = new RegExp("[a-zA-z0-9_]+\\s(?=is not a function)", "g"), t.message.match(x) != null) {
                alert("Opa, parece que voc\xEA tentou usar a fun\xE7\xE3o '" + t.message.match(x)[0].trim() + "' que n\xE3o \xE9 compativel com o tipo do objeto '" + t.message.replace("." + t.message.match(x)[0].trim() + " is not a function", "") + `'
Revise e veja como suas variaveis est\xE3o sendo usadas :D
`+ t.message); return
            }
        }
    }; return jsxs(Fragment, { children: [jsx(BoxQuestion, { question: { title: (e = problem == null ? void 0 : problem.title) != null ? e : "Ol\xE1 mundo !" }, onButtonRunPressed: submit, test: handleExec, isSubmitting: isLoading, onDetailsClick: () => setIsOpen(!0), handleCreateNewDoubt: openModalDoubt }), jsx(CustomBlocklyWorkpace, { onXmlChange: t => setXml(t), code, language, initialXml: (d = (r = (a = location.state) == null ? void 0 : a.params) == null ? void 0 : r.blocksXml) != null ? d : "", onCodeChange: setCode, children: jsx(GeneratedCodeArea, { language, code, style: { background: "transparent", overflowY: "auto" }, onLanguageChange: handleLanguageChange }) }), jsxs(Modal, { isOpen: modalIsOpen, onRequestClose: closeModal, style: $(T({}, customStyles), { overlay: { background: colors.primary_background + "AC", zIndex: 5555 } }), contentLabel: "Quest\xE3o", children: [jsx("h2", { className: "font-1-xl font-light blue", style: { textAlign: "center" }, ref: t => t, children: (o = problem == null ? void 0 : problem.title) != null ? o : "" }), jsx("div", { className: "font-2-m", style: { fontFamily: "'Neuton', serif", fontWeight: 300, marginBottom: 30 }, dangerouslySetInnerHTML: { __html: problem == null ? void 0 : problem.description } }), jsx("h3", { className: "font-1-m gray-3", style: { textAlign: "center", marginBottom: 10 }, children: "Demonstra\xE7\xF5es" }), jsxs("div", { style: { display: "grid", justifyContent: "center", width: "100%", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: "20px" }, children: [jsx("span", { className: "gray-3", style: { justifySelf: "end" }, children: "Entradas" }), jsx("span", { className: "gray-3", children: "Sa\xEDdas" }), problem == null ? void 0 : problem.demonstrations.map(t => jsxs(Fragment, { children: [jsx("div", { style: { gridColumn: "1", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }, children: t.demonstrationInputs && jsx("span", { className: "gray-3", style: { minWidth: "200px", textAlign: "end", backgroundColor: colors.primary_input_background, padding: "10px" }, children: t.demonstrationInputs.join(" ") }) }), jsx("div", { style: { gridColumn: "2", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "10px" }, children: jsxs("span", { className: "gray-3", style: { minWidth: "200px", textAlign: "start", backgroundColor: colors.primary_input_background, padding: "10px" }, children: [" ", t.demonstrationOutput, " "] }) })] }))] }), jsx(Button, { onClick: closeModal, children: "Fechar" })] }), jsx(Modal, { isOpen: modalDoubtOpen, style: $(T({}, customStyles), { overlay: { background: colors.primary_background + "AC", zIndex: 5555 } }), onRequestClose: closeModalDoubt, children: jsxs(Container$3, { children: [jsx("h2", { className: "font-1-xl font-light blue", children: "Solicita\xE7\xE3o de ajuda para orientador" }), jsx("p", { className: "font-1-m", children: "Aqui voc\xEA pode solicitar ajudar a um orientador caso esteja com d\xFAvidas em rela\xE7\xE3o a este problema, basta dizer nos dizer em qual parte est\xE1 em d\xFAvida." }), jsxs("div", { style: { flexDirection: "row", gap: 10 }, className: "d-flex j-center a-center", children: [jsxs("select", { onChange: t => setTagDoubt(t.target.value), className: "font-1-m", value: tagDoubt, children: [jsx("option", { value: "loops", children: "Loops" }), jsx("option", { value: "condicionais", children: "Condicionais" }), jsx("option", { value: "variaveis", children: "Vari\xE1veis" }), jsx("option", { value: "entrada_saida", children: "Entradas e Sa\xEDdas" }), jsx("option", { value: "outros", children: "outros" })] }), jsxs("div", { style: { gap: "10px", display: "flex" }, children: [jsx(Button, { onClick: closeModalDoubt, children: "Fechar" }), jsx(ButtonSecondary, { onClick: handleCreateNewDoubt, children: "Solicitar" })] })] })] }) })] })
}, Container$2 = styled.main`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    min-height: 90vh;
`, Wrapper$1 = styled.div`
    display: flex;
    background-color: ${colors.primary};
    flex-direction: column;
    padding: 60px 40px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    & > h2 {
        margin-bottom: 30px;
        text-align: center;
    }
    & > p {
        text-align: center;
    }
`, Form$5 = styled.form`
    display: flex;
    flex-direction: column;
    gap:20px;
    min-width: 600px;
    margin-bottom: 20px;
`, Input$1 = styled.input`
    border: 1px solid #c4c4c4;
    padding: 10px 20px;
    border-radius: 4px;
    background-color: #ffff;
`, Login = () => { const { setToken: e } = useAuth(), { setUser: a } = useUser(), [r, d] = react.exports.useState(!1), o = useApi(); useAuthenticateApi(), useLocation(); const t = useNavigate(); return jsx(Container$2, { children: jsxs(Wrapper$1, { children: [jsx("h2", { className: "font-1-xl font-light blue", children: "Login" }), jsxs(Form$5, { onSubmit: async u => { u.preventDefault(), d(!0); let n = u.target[0].value, m = u.target[1].value; try { const l = await o.post("/login", { email: n, password: m }), c = (await axios.get("http://localhost:10000/profile", { headers: { Authorization: `Bearer ${l.data.token}` } })).data; e(l.data.token), console.log(c), a(c), d(!1), t("/", {}) } catch (l) { console.log(l), console.log(l.response), l.response && dist.exports.Store.addNotification({ container: "top-center", insert: "top", title: "Erro", type: "warning", message: l.response.data.error.message, dismiss: { duration: 3e3, onScreen: !0 }, animationIn: ["animate__animated", "animate__fadeIn"], animationOut: ["animate__animated", "animate__fadeOut"] }) } finally { d(!1) } }, children: [jsx("label", { htmlFor: "font-2-l", children: "Email" }), jsx(Input$1, { name: "email", className: "font-2-m font-light", type: "email" }), jsx("label", { htmlFor: "font-2-l", children: "Senha" }), jsx(Input$1, { name: "password", className: "font-2-m font-light", type: "password" }), r ? jsx(Spinner, {}) : jsx(Button, { className: "font-1-s", type: "submit", margin: "10px 0 0 0", children: "Enviar" })] }), jsxs("p", { className: "font-1-s black font-light", children: [" Ainda n\xE3o possui uma conta?", jsx(Link, { style: { display: "inline-block" }, className: "orange", to: "/signup", children: "Clique Aqui" })] })] }) }) }, Container$1 = styled.main`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    min-height: 90vh;
`, Wrapper = styled.div`
    display: flex;
    background-color: ${colors.primary};
    flex-direction: column;
    padding: 60px 40px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    & > h2 {
        margin-bottom: 30px;
        text-align: center;
    }
`, Form$4 = styled.form`
    display: flex;
    flex-direction: column;
    gap:20px;
    min-width: 600px;
`, Input = styled.input`
    border: 1px solid #c4c4c4;
    padding: 10px 20px;
    border-radius: 4px;
    background-color: #ffff;
`, Signup = () => { const { setToken: e } = useAuth(), [a, r] = react.exports.useState(!1), d = useApi(); useLocation(); const o = useNavigate(); return jsx(Container$1, { children: jsxs(Wrapper, { children: [jsx("h2", { className: "font-1-xl font-light blue", children: "Cadastra-se" }), jsxs(Form$4, { onSubmit: async x => { x.preventDefault(); let u = x.target[0].value, n = x.target[1].value, m = x.target[2].value, l = x.target[3].value; if (m != l) return dist.exports.Store.addNotification({ container: "top-center", insert: "top", title: "Aten\xE7\xE3o", type: "warning", message: "A senhas n\xE3o coincidem.", dismiss: { duration: 3e3, onScreen: !0 } }); r(!0); try { let c = await d.post("/signup", { email: n, password: m, name: u }); e(c.data.token), r(!1), dist.exports.Store.addNotification({ container: "top-center", insert: "top", title: "Ok", type: "success", message: "Sua conta foi criada com sucesso!", dismiss: { duration: 3e3, onScreen: !0 }, animationIn: ["animate__animated", "animate__fadeIn"], animationOut: ["animate__animated", "animate__fadeOut"] }), o("/", {}) } catch (c) { console.log(c), console.log(c.response), c.response.status && dist.exports.Store.addNotification({ container: "top-center", insert: "top", title: "Erro", type: "danger", message: c.response.data.error.message, dismiss: { duration: 3e3, onScreen: !0 }, animationIn: ["animate__animated", "animate__fadeIn"], animationOut: ["animate__animated", "animate__fadeOut"] }) } finally { r(!1) } }, children: [jsx("label", { htmlFor: "font-2-l", children: "Nome Completo" }), jsx(Input, { name: "name", className: "font-2-m font-light", type: "text" }), jsx("label", { htmlFor: "font-2-l", children: "Email" }), jsx(Input, { name: "email", className: "font-2-m font-light", type: "email" }), jsx("label", { htmlFor: "font-2-l", children: "Senha" }), jsx(Input, { name: "password", className: "font-2-m font-light", type: "password" }), jsx("label", { htmlFor: "font-2-l", children: "Confirme sua Senha" }), jsx(Input, { name: "password_confirm", className: "font-2-m font-light", type: "password" }), a ? jsx(Spinner, {}) : jsx(Button, { className: "font-1-s", type: "submit", margin: "10px 0 0 0", children: "Enviar" })] }), jsx(Link, { to: "/signup" })] }) }) }, Container = styled.main`
    max-width: 1200px;
    margin: 0 auto;
`, LevelWrap = styled.section`
    display:flex;
    padding: 10px 20px;
    flex-direction: row;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    gap: 20px;
    width: 100%;
`, Level = styled.div`
    padding: 60px 60px;
    height: 300px;
    display: flex;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    flex: 1 0 0;
    justify-content: center;
    align-items: center;
    background-color: ${colors.accent}F1;
`, Header = styled.div`
    display: flex;
    background-color: ${colors.primary};
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    width: 100%;
    padding: 10px 20px;
    flex-direction: column;
    margin-bottom: 30px;
`, LevelSelect = () => { const e = useNavigate(); return jsxs(Container, { children: [jsxs(Header, { children: [jsx("h1", { className: "font-1-xl blue", children: "Exerc\xEDcios" }), jsx("p", { className: "font-2-m font-light", children: "Abaixo, selecione um dos n\xEDveis de dificuldade para continuar" })] }), jsxs(LevelWrap, { children: [jsx(Level, { onClick: a => e("/exercicios/F\xE1cil"), children: jsx("h2", { className: "font-1-l white", children: "F\xE1cil" }) }), jsx(Level, { children: jsx("h2", { onClick: a => e("/exercicios/Intermedi\xE1rio"), className: "font-1-l white", children: "Intermedi\xE1rio" }) }), jsx(Level, { children: jsx("h2", { onClick: a => e("/exercicios/Dif\xEDcil"), className: "font-1-l white", children: "Dif\xEDcil" }) })] })] }) }; var accepted = "/assets/accepted.b95d25dc.svg", deny = "/assets/deny.71085d2e.svg"; styled.main`
    max-width: 1200px;
    margin: 0 auto;
`; const SolvedProblem = styled.span`
    display: flex;
    align-items: center;
    flex-direction:row;
    justify-content: space-between;
    &::after {
        content: '';
        width: 20px;
        height: 20px;
        background-image: url(${e => e.status ? e.status === SubmissionStatus.ACCEPTED ? accepted : a => a.status === SubmissionStatus.PENDING ? "" : deny : ""});
        background-repeat: no-repeat;
        background-size: contain;
    }
`, Exercises = () => { const e = useParams(), a = useNavigate(), r = useAuthenticateApi(), [d, o] = react.exports.useState([]), [t, x] = react.exports.useState(!0); return react.exports.useEffect(() => { (async () => { try { x(!0); const u = await r.get(`problems?filter=${JSON.stringify({ where: { dificultyLevel: e == null ? void 0 : e.dificultyLevel } })}`), n = u.data.map(c => c.id), { data: m } = await r.get(`/submissions?filter=${JSON.stringify({ where: { problemId: { inq: n } }, fields: { problemId: !0, status: !0, id: !0 } })}`), l = u.data; for (const c of l) { c.submissions || (c.submissions = []); const g = m.filter(v => v.problemId == c.id); g.length !== 0 && (c.submissions.push(g), c.submissions = c.submissions.flat()) } console.log(l), o(l) } catch (u) { u.response && dist.exports.Store.addNotification({ container: "top-center", message: u.response.data.error.message, title: "Erro", type: "danger", dismiss: { duration: 3e3, click: !0 } }), console.error(u) } finally { x(!1) } })() }, []), jsxs(Container$3, { children: [jsx(Title, { margin: "0 10px 10px 0", title: `${e == null ? void 0 : e.dificultyLevel}`, subtitle: "Escolha um dos exerc\xEDcios abaixo para resolver" }), jsx(Card, { children: t ? jsx("span", { className: "d-flex j-center", children: jsx(Spinner, {}) }) : jsxs(Table, { width: "100%", children: [jsx(Thead, { children: jsxs(Tr, { children: [jsx(Th, { className: "font-1-m white", width: "15%", textAlign: "start", children: "C\xF3digo" }), jsx(Th, { className: "font-1-m white", width: "15%", textAlign: "start", children: "Dificuldade" }), jsx(Th, { className: "font-1-m white", width: "70%", textAlign: "start", children: "Nome" })] }) }), jsx(TBody, { children: d.map(u => { var n; return jsxs(Tr, { className: "font-2-xs", children: [jsx(Td, { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: jsx(SolvedProblem, { status: u.submissions && ((n = u.submissions.find(m => [SubmissionStatus.ACCEPTED].includes(m.status))) == null ? void 0 : n.status), children: u.id }) }), jsx(Td, { children: jsx("span", { style: { display: "flex", alignItems: "center" }, children: u.dificultyLevel }) }), jsx(Td, { children: jsxs("span", { style: { display: "flex", width: "100%", justifyContent: "space-between" }, children: [jsx("p", { children: u.title }), jsx("a", { className: "orange", style: { cursor: "pointer" }, onClick: m => a(`/editor/${u.id}`), children: "Fazer" })] }) })] }, u.id) }) })] }) })] }) }, Background = styled.div`
    background-color: ${colors.secundary};
    padding-top: 60px;

    box-shadow: inset 0px -120px ${colors.primary_background};
`; var success = "/assets/success.23bba81e.svg"; const StatusSVG$3 = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    &::before {
        content: '';
        width: 44px;
        height: 44px;
        background: url(${success}) no-repeat;
    }
`; var Success = () => jsxs(Fragment, { children: [jsx("h2", { style: { textAlign: "center" }, className: "font-2-l font-light", children: "Parab\xE9ns!" }), jsxs(StatusSVG$3, { className: "green font-2-m font-light", children: [jsx("p", { children: "Seu c\xF3digo foi aceito" }), jsxs("p", { children: [jsx(Link, { className: "orange", to: "/exercicios", children: "clique aqui" }), " para ser redirecionado para a lista de exerc\xEDcio"] })] })] }), Waiting = () => jsxs(Fragment, { children: [jsx("h1", { style: { textAlign: "center" }, className: "font-2-l font-light", children: "Seu c\xF3digo est\xE1 sendo avaliado pelo nosso juiz" }), jsx("span", { className: "d-flex j-center", children: jsx(Spinner, {}) }), jsx("p", { style: { textAlign: "center" }, className: "font-2-s font-light", children: "Voc\xEA pode voltar depois para saber o resultado, enquanto isso voc\xEA pode resolver outros exerc\xEDcios da nossa lista" }), jsxs("p", { className: "font-2-s font-light", style: { textAlign: "center" }, children: [jsx(Link, { className: "orange", to: "/exercicios", children: "clique aqui" }), " para ser redirecionado para a lista de exerc\xEDcio"] })] }), icon$1 = "/assets/ErrorX.7cbb57c1.svg"; const StatusSVG$2 = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 20px;
    &::before {
        content: '';
        width: 51px;
        background-repeat: no-repeat ;
        background-size: contain;
        height: 51px;
        background: url(${icon$1}) no-repeat;
    }
`; var PresentationError = () => { const e = useAuthenticateApi(); useParams(); const a = useNavigate(), r = useLocation(), { problemId: d } = r.state, o = async () => { try { const t = await e.post(`/doubt/problem/${d}`, {}); dist.exports.Store.addNotification({ title: "Enviado", message: "Solicita\xE7\xE3o para falar com orientador foi criada com sucesso \u{1F600}", type: "success", container: "top-center", dismiss: { duration: 3e3 } }), a("/chat", { state: { doubtId: t.data.id } }) } catch (t) { t.response && dist.exports.Store.addNotification({ title: "Erro", message: t.response.data.error.message, type: "danger", container: "top-center", dismiss: { duration: 3e3 } }), console.error(t) } }; return jsxs(Fragment, { children: [jsx("h2", { style: { textAlign: "center" }, className: "font-2-l font-light", children: "Que pena \u{1F61E}" }), jsx(StatusSVG$2, { className: "red font-2-m font-light", children: jsx("p", { children: "Seu c\xF3digo executou, mas voc\xEA apresentou as sa\xEDdas incorretamente" }) }), jsxs("p", { style: { textAlign: "center" }, children: ["Voc\xEA pode solicitar ajuda com um orientador", jsx("a", { className: "blue", onClick: t => o(), style: { cursor: "pointer" }, children: " clicando aqui" })] }), jsx("p", { className: "font-2-s font-light gray-3", style: { textAlign: "center" }, children: "*Dica: tente refaze-lo usando outras entradas al\xE9m das demonstra\xE7\xF5es apresentadas pelo exerc\xEDcio" }), jsx("p", { className: "font-2-s font-light gray-3", style: { textAlign: "center" }, children: "*Dica: use e abuse da fun\xE7\xE3o \u201Ctestar\u201D antes de submeter seu c\xF3digo" })] }) }, icon = "/assets/deadEmoticon.8febccb7.svg"; const StatusSVG$1 = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    &::before {
        content: '';
        width: 50px;
        background-repeat: no-repeat ;
        background-size: contain;
        height: 50px;
        background: url(${icon}) no-repeat;
    }
`; var RuntimeError = ({ errorLog: e }) => {
    var l; const [a, r] = react.exports.useState(!1), d = useAuthenticateApi(); useParams(); const o = useLocation(), { problemId: t } = o.state, x = useNavigate(), u = async () => { try { const c = await d.post(`/doubt/problem/${t}`, {}); dist.exports.Store.addNotification({ title: "Enviado", message: "Solicita\xE7\xE3o para falar com orientador foi criada com sucesso \u{1F600}", type: "success", container: "top-center", dismiss: { duration: 3e3 } }), x("/chat", { state: { doubtId: c.data.id } }) } catch (c) { c.response && dist.exports.Store.addNotification({ title: "Erro", message: c.response.data.error.message, type: "danger", container: "top-center", dismiss: { duration: 3e3 } }), console.error(c) } }, n = () => { r(!a) }, m = react.exports.useMemo(() => { try { let c = JSON.parse(e), g = new Error(c.message); return g.name = c.name, g } catch { return new Error("N\xE3o conseguimos avaliar o erro") } }, [e]); return jsxs(Fragment, {
        children: [jsx("h2", { style: { textAlign: "center" }, className: "font-2-l font-light", children: "Eita \u{1F633}" }), jsx(StatusSVG$1, { className: "red font-2-m font-light", children: jsx("p", { children: "O c\xF3digo submetido n\xE3o executou direito." }) }), jsxs("p", { style: { textAlign: "center" }, children: ["Voc\xEA pode solicitar ajuda com um orientador", jsx("a", { className: "blue", onClick: c => u(), style: { cursor: "pointer" }, children: " clicando aqui" })] }), jsx("p", { className: "font-2-s font-light gray-3", style: { textAlign: "center" }, children: "*Dica: verifique se os tipos que voc\xEA usou (texto, n\xFAmero, lista etc.) coicidem com as fun\xE7oes que voc\xEA usou" }), jsxs("p", { className: "font-2-s font-light gray-3", style: { textAlign: "center", marginBottom: 20 }, children: ['*Dica: verifique se a quantidade de vezes que voc\xEA usou o bloco "pedir um texto/numero" ', jsx("br", {}), "coicidem com a quantidade de entradas"] }), jsxs("div", {
            style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }, children: [jsx(Button, { onClick: c => n(), margin: "10px 0", color: colors.textGray, backgroundColor: colors.primary_input_background, children: "Mostrar detalhes (avan\xE7ado)" }), jsx("div", {
                style: { padding: "10px 20px", backgroundColor: colors.primary_input_background, borderRadius: 4, opacity: a ? "1" : "0", transition: "opacity ease-in .5s" }, children: jsx("pre", {
                    children: jsx("code", {
                        style: { fontSize: "12px" }, children: (l = `${m.message}
`) != null ? l : ""
                    })
                })
            })]
        })]
    })
}; const StatusSVG = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    &::before {
        content: '';
        width: 44px;
        height: 44px;
       // background: url(${success}) no-repeat;
    }
`; var WrongAnswer = ({ successfulRate: e }) => { var x, u; const a = useAuthenticateApi(); useParams(); const r = useNavigate(), o = (u = (x = useLocation().state) == null ? void 0 : x.problemId) != null ? u : "", t = async () => { try { const n = await a.post(`/doubt/problem/${o}`, {}); dist.exports.Store.addNotification({ title: "Enviado", message: "Solicita\xE7\xE3o para falar com orientador foi criada com sucesso \u{1F600}", type: "success", container: "top-center", dismiss: { duration: 3e3 } }), r("/chat", { state: { doubtId: n.data.id } }) } catch (n) { n.response && dist.exports.Store.addNotification({ title: "Erro", message: n.response.data.error.message, type: "danger", container: "top-center", dismiss: { duration: 3e3 } }), console.error(n) } }; return jsxs(Fragment, { children: [jsx("h2", { style: { textAlign: "center" }, className: "font-2-l font-light", children: "Que pena \u{1F61E}" }), jsx(StatusSVG, { className: "red font-2-m font-light", children: jsx("p", { children: "Seu c\xF3digo executou, mas ele n\xE3o passou pelos testes do juiz" }) }), jsxs("p", { style: { textAlign: "center" }, children: ["Mas vamos l\xE1, n\xE3o desista! Voc\xEA acertou ", jsx("strong", { children: jsxs("span", { className: "red", children: [e * 100, "%"] }) }), " dos casos de teste!"] }), jsxs("p", { style: { textAlign: "center" }, children: ["Voc\xEA pode solicitar ajuda com um orientador", jsx("a", { className: "blue", onClick: n => t(), style: { cursor: "pointer" }, children: " clicando aqui" })] }), jsx("p", { className: "font-2-s font-light gray-3", style: { textAlign: "center" }, children: "*Dica: tente refaze-lo usando outras entradas al\xE9m das demonstra\xE7\xF5es apresentadas pelo exerc\xEDcio" }), jsx("p", { className: "font-2-s font-light gray-3", style: { textAlign: "center" }, children: "*Dica: use e abuse da fun\xE7\xE3o \u201Ctestar\u201D antes de submeter seu c\xF3digo" })] }) }; const Show = () => { const e = useParams(), a = useAuthenticateApi(), r = useNavigate(), [d, o] = react.exports.useState(), [t, x] = react.exports.useState(!0); react.exports.useEffect(() => ((async () => m())(), clearTimeout()), []); const u = l => new Promise((c, g) => setTimeout(c, l)); function n(l) { switch (l == null ? void 0 : l.status) { case SubmissionStatus.ACCEPTED: return jsx(Success, {}); case SubmissionStatus.PRESENTATION_ERROR: return jsx(PresentationError, {}); case SubmissionStatus.RUNTIME_ERROR: return jsx(RuntimeError, { errorLog: l.error }); case SubmissionStatus.PENDING: return jsx(Waiting, {}); case SubmissionStatus.WRONG_ANSWER: return jsx(WrongAnswer, { successfulRate: l.successfulRate }); default: return jsx(Waiting, {}) } } const m = async () => { let l = !0; for (; l;)try { clearTimeout(); const c = await a.get(`submissions/${e.id}?filter=${JSON.stringify({ include: [{ relation: "problem", scope: { fields: { id: !0, title: !0 } } }] })}`); if (console.log(c.data), c.data.length == 0) return dist.exports.Store.addNotification({ container: "top-center", insert: "bottom", title: "Hum, algo deu errado", message: "N\xE3o encontramos a submiss\xE3o que voc\xEA procurou", type: "info", dismiss: { duration: 3e3, onScreen: !0 } }), r("/"); if (c.data.status != SubmissionStatus.PENDING) { o(c.data), l = !1; break } await u(2e3) } catch (c) { console.log(c), l = !1, clearTimeout() } finally { t && x(!1) } }; return t ? jsx(Background, { children: jsx(Container$3, { children: jsx(Card, { className: "d-flex j-center ", padding: "10px 20px 40px 20px", children: jsx(Spinner, { width: "40px", height: "40px" }) }) }) }) : jsx(Background, { children: jsxs(Container$3, { children: [jsx("h1", { style: { textAlign: "center", marginBottom: "20px" }, className: "font-1-xl white font-light", children: d && d.problem.title }), jsx(Card, { padding: "10px 20px 40px 20px", children: n(d) })] }) }) }, Form$3 = styled.form`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
`, Image = styled.img`
    max-width: 100%;
    background-size: cover;
`; var userIcon = "/assets/user.b2407ed3.svg", Profile = () => jsx(Container$3, { style: { marginTop: 30 }, children: jsxs(Card, { children: [jsx("h1", { className: "font-1-xl blue", style: { textAlign: "center", marginBottom: 30 }, children: "Meu Perfil" }), jsxs(Form$3, { children: [jsxs("div", { children: [jsx(Input$1, { style: { alignSelf: "start" }, placeholder: "Nome" }), jsx(Input$1, { style: { alignSelf: "start" }, placeholder: "Nome" }), jsx(Input$1, { style: { alignSelf: "start" }, placeholder: "Nome" })] }), jsx("span", { style: { gridRow: "1/ span 2", gridColumn: "3", alignSelf: "start" }, children: jsx(Image, { src: userIcon, style: { width: "100%", alignSelf: "start" } }) })] })] }) }), AddIcon = "/assets/add_circle.bd69151b.svg"; const AddButton = styled.a`
display: flex;
align-items: center;
flex-direction:row;
padding:10px;
gap:5px;
color:white;
border-radius:4px;
cursor: pointer;
background-color:${colors.secundary};
&::before {
    content: '';
    width: 20px;
    height: 20px;
    background-image: url(${AddIcon});
    background-repeat: no-repeat;
    background-size: contain;
}
`; var ProblemsList = () => { const [e, a] = react.exports.useState(!1), [r, d] = react.exports.useState([]), o = useAuthenticateApi(), t = useNavigate(); react.exports.useEffect(() => { x() }, []); const x = async () => { try { a(!0); const n = await o.get(`/admin/problems?filter=${JSON.stringify({ fields: { id: !0, title: !0, dificultyLevel: !0 } })}`); d(n.data) } catch { } finally { a(!1) } }, u = react.exports.useCallback(async n => { try { await o.del(`/admin/problems/${n}`), dist.exports.Store.addNotification({ container: "top-center", title: "Deletado com sucesso!", type: "success", insert: "top", animationIn: ["animate__animated", "animate__fadeIn"], animationOut: ["animate__animated", "animate__fadeOut"], dismiss: { duration: 3e3, onScreen: !0 } }), await x() } catch { dist.exports.Store.addNotification({ container: "top-center", title: "Erro ao deletar", type: "danger", message: "Tente novamente ou recarregue a p\xE1gina.", insert: "top", animationIn: ["animate__animated", "animate__fadeIn"], animationOut: ["animate__animated", "animate__fadeOut"], dismiss: { duration: 3e3, onScreen: !0 } }) } }, [r]); return jsx(Container$3, { children: jsxs(Card, { children: [jsx(Title, { margin: "0 10px 10px 0", title: "Problemas", subtitle: "Aqui est\xE1 todos os problemas " }), jsx("div", { style: { display: "flex", justifyContent: "end", marginBottom: 20 }, children: jsx(AddButton, { onClick: n => t("/admin/problem/create"), children: "Adicionar" }) }), e ? jsx("span", { className: "d-flex j-center", children: jsx(Spinner, {}) }) : jsxs(Table, { width: "100%", children: [jsx(Thead, { children: jsxs(Tr, { children: [jsx(Th, { className: "font-1-m white", width: "15%", textAlign: "start", children: "C\xF3digo" }), jsx(Th, { className: "font-1-m white", width: "15%", textAlign: "start", children: "Dificuldade" }), jsx(Th, { className: "font-1-m white", width: "70%", textAlign: "start", children: "Nome" }), jsx(Th, { className: "font-1-m white", width: "70%", textAlign: "start", children: "A\xE7\xF5es" })] }) }), jsx(TBody, { children: r.map(n => jsxs(Tr, { className: "font-2-xs", children: [jsx(Td, { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: n.id }), jsx(Td, { children: jsx("span", { style: { display: "flex", alignItems: "center" }, children: n.dificultyLevel }) }), jsx(Td, { children: jsx("span", { style: { display: "flex", width: "100%", justifyContent: "space-between" }, children: jsx("p", { children: n.title }) }) }), jsx(Td, { children: jsxs("span", { style: { display: "flex", width: "100%", justifyContent: "space-between" }, children: [jsx("a", { className: "orange", style: { cursor: "pointer", display: "block", padding: 5 }, onClick: () => t(`/admin/problem/${n.id}`), children: "Editar" }), jsx("a", { className: "red", style: { cursor: "pointer", display: "block", padding: 5 }, onClick: m => u(n.id), children: "deletar" })] }) })] }, n.id)) })] })] }) }) }; const Form$2 = styled.form`
    display:grid;
    grid-template-columns:1fr 1fr 1fr 1fr;
    gap:20px;
    padding-bottom:20px;
`, InputGroup$2 = styled.div`
    display:flex;
    flex-direction:column;
    gap: 10px;
    grid-column: ${e => e.gridColumn ? e.gridColumn : "initial"} ;

`, Select$2 = styled.select`
border: 1px solid #c4c4c4;
padding: 10px 20px;
border-radius: 4px;
background-color: #ffff;
`; var quill_snow = "", ProblemEdit = e => { const { problemId: a } = useParams(), [r, d] = react.exports.useState(!0), [o, t] = react.exports.useState(), x = useAuthenticateApi(), [u, n] = react.exports.useState([]), [m, l] = react.exports.useState([]), c = react.exports.useRef(), g = react.exports.useRef(), v = react.exports.useRef(), _ = react.exports.useRef(), E = react.exports.useRef(), S = react.exports.useRef(), R = react.exports.useRef(), [A, C] = react.exports.useState(""), I = useNavigate(); react.exports.useRef(), react.exports.useEffect(() => { b() }, []); const b = async () => { var f, j; try { d(!0); const N = await x.get(`/admin/problems/${a}`); t(N.data), C(w => { var D; return (D = N.data.description) != null ? D : w }), n((f = N.data.testCases) != null ? f : []), l((j = N.data.demonstrations) != null ? j : []) } catch { } finally { d(!1) } }, i = async () => { var f, j, N, w; try { const D = { id: a, demonstrations: m != null ? m : o == null ? void 0 : o.demonstrations, description: A, testCases: u, title: (j = (f = S.current) == null ? void 0 : f.value) != null ? j : o == null ? void 0 : o.title, dificultyLevel: (w = (N = R.current) == null ? void 0 : N.value) != null ? w : o == null ? void 0 : o.dificultyLevel }; return await x.patch(`/admin/problems/${a}`, T({}, D)), dist.exports.Store.addNotification({ container: "top-center", title: "Altra\xE7\xE3o realizada com sucesso!", type: "success", insert: "top", animationIn: ["animate__animated", "animate__fadeIn"], animationOut: ["animate__animated", "animate__fadeOut"], dismiss: { duration: 5e3, onScreen: !0 } }), I("/admin/problems") } catch { dist.exports.Store.addNotification({ container: "top-center", title: "N\xE3o foi poss\xEDvel salvar sua altera\xE7\xF5es", type: "danger", message: "Tente novamente depois.", insert: "top", animationIn: ["animate__animated", "animate__fadeIn"], animationOut: ["animate__animated", "animate__fadeOut"], dismiss: { duration: 5e3, onScreen: !0 } }) } }, s = () => { let f = { outputs: "" }; if (c.current) { const j = c.current.value; j != "" && (f.inputs || (f.inputs = []), f.inputs.push(...j.split(";"))), c.current.value = "" } if (g.current) { const j = g.current.value; if (j == "") return dist.exports.Store.addNotification({ container: "top-center", title: "Caso teste n\xE3o pode ficar sem sa\xEDda!", type: "danger", insert: "top", animationIn: ["animate__animated", "animate__fadeIn"], animationOut: ["animate__animated", "animate__fadeOut"], dismiss: { duration: 5e3, onScreen: !0 } }); f.outputs = j, g.current.value = "" } if (v.current) { const j = v.current.value; j != "" && (f.validationOutputRegex = j), v.current.value = "" } n([...u, f]) }; function h(f) { n(j => j.filter((N, w) => f != w)) } const y = () => { let f = { demonstrationOutput: "" }; if (E.current) { const j = E.current.value; f.demonstrationOutput = j } if (_.current) { const j = _.current.value; f.demonstrationInputs || (f.demonstrationInputs = []), f.demonstrationInputs.push(...j.split(";")) } l([...m, f]) }; function k(f) { l(j => j.filter((N, w) => f != w)) } return r ? jsx(Container$3, { children: jsx(Spinner, {}) }) : o ? jsx(Container$3, { children: jsx(Card, { children: jsxs(Form$2, { onSubmit: f => { f.preventDefault(), i() }, children: [jsxs(InputGroup$2, { gridColumn: "span 3", children: [jsx("label", { htmlFor: "title", children: "T\xEDtulo" }), jsx(Input$1, { ref: S, name: "title", "aria-label": "T\xEDtulo do Problema", defaultValue: o.title })] }), jsxs(InputGroup$2, { children: [jsx("label", { htmlFor: "title", children: "Dificuldade" }), jsxs(Select$2, { ref: R, onChange: f => { console.log(f.currentTarget.value) }, name: "dificultyLevel", defaultChecked: !0, defaultValue: o.dificultyLevel, children: [jsx("option", { value: "F\xE1cil", children: "F\xE1cil" }), jsx("option", { value: "Intermedi\xE1rio", children: "Intermedi\xE1rio" }), jsx("option", { value: "Dif\xEDcil", children: "Dif\xEDcil" })] })] }), jsxs(InputGroup$2, { id: "text-editor", gridColumn: "span 4", children: [jsx("label", { htmlFor: "", children: "Descri\xE7\xE3o" }), jsx(lib, { style: { display: "block" }, bounds: "#text-editor", theme: "snow", value: A, onChange: C }), jsx("div", { style: { visibility: "hidden" }, children: "." })] }), jsxs(InputGroup$2, { gridColumn: "span 4", style: { border: "1px solid #c4c4c4", borderRadius: 4, padding: 10 }, children: [jsx("h3", { children: "Casos de Teste" }), jsxs("div", { style: { display: "flex", flexDirection: "row", gap: "5px" }, children: [jsx(Input$1, { ref: c, style: { flex: 1 }, placeholder: "Entradas (separadas por ponto v\xEDrgula ;)" }), jsx(Input$1, { ref: g, style: { flex: 1 }, placeholder: "Sa\xEDda" }), jsx(Input$1, { ref: v, style: { flex: 1 }, placeholder: "Express\xE3o regular (Regex) de valida\xE7\xE3o de sa\xEDda" }), jsx(Button, { onClick: f => { f.preventDefault(), s() }, children: "Adicionar" })] }), jsxs("ul", { style: { display: "flex", flexDirection: "column", gap: "5px" }, children: [jsx("h3", {}), u.map((f, j) => { var N, w, D; return jsxs("li", { style: { display: "flex", flexDirection: "row", gap: "5px", width: "100%", border: "1px solid #c4c4c4", borderRadius: 4, padding: 10 }, children: [jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "5px" }, children: [jsx("p", { children: "Entradas" }), jsx(Input$1, { style: { flex: 1 }, value: (w = (N = f.inputs) == null ? void 0 : N.join(";")) != null ? w : "", disabled: !0 })] }), jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "5px" }, children: [jsx("p", { children: "Sa\xEDda" }), jsx(Input$1, { style: { flex: 1 }, value: f.outputs, disabled: !0 })] }), jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "5px" }, children: [jsx("p", { children: "Espress\xE3o regular" }), jsx(Input$1, { style: { flex: 1 }, value: (D = f.validationOutputRegex) != null ? D : "", disabled: !0 })] }), jsx("div", { style: { display: "flex", flexDirection: "column", gap: "5px", justifyContent: "end" }, children: jsx(Button, { style: { display: "block" }, onClick: F => { F.preventDefault(), h(j) }, children: "Remover" }) })] }, j) })] })] }), jsxs(InputGroup$2, { gridColumn: "span 4", style: { border: "1px solid #c4c4c4", borderRadius: 4, padding: 10 }, children: [jsx("h3", { children: "Casos de Demonstra\xE7\xE3o" }), jsxs("div", { style: { display: "flex", flexDirection: "row", gap: "5px" }, children: [jsx(Input$1, { ref: _, style: { flex: 1 }, placeholder: "Entradas (separadas por v\xEDrgula)" }), jsx(Input$1, { ref: E, style: { flex: 1 }, placeholder: "Sa\xEDda" }), jsx(Button, { onClick: f => { f.preventDefault(), y() }, children: "Adicionar" })] }), jsxs("ul", { style: { display: "flex", flexDirection: "column", gap: "5px" }, children: [jsx("h3", {}), m.map((f, j) => { var N, w; return jsxs("li", { style: { display: "flex", flexDirection: "row", gap: "5px", width: "100%", border: "1px solid #c4c4c4", borderRadius: 4, padding: 10 }, children: [jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "5px" }, children: [jsx("p", { children: "Entradas" }), jsx(Input$1, { style: { flex: 1 }, value: (w = (N = f.demonstrationInputs) == null ? void 0 : N.join(";")) != null ? w : "", disabled: !0 })] }), jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "5px" }, children: [jsx("p", { children: "Sa\xEDda" }), jsx(Input$1, { style: { flex: 1 }, value: f.demonstrationOutput, disabled: !0 })] }), jsx("div", { style: { display: "flex", flexDirection: "column", gap: "5px", justifyContent: "end" }, children: jsx(Button, { style: { display: "block" }, onClick: D => { D.preventDefault(), k(j) }, children: "Remover" }) })] }, j) })] })] }), jsxs(InputGroup$2, { gridColumn: "span 4", children: [jsx(Button, { type: "submit", children: "Salvar" }), jsx(ButtonSecondary, { onClick: f => { f.preventDefault(), I("/admin/problems", { replace: !0 }) }, children: "Cancelar" })] })] }) }) }) : jsx(Container$3, { children: jsx("h6", { children: "N\xE3o foi poss\xEDve carregar o problema" }) }) }; const Form$1 = styled.form`
    display:grid;
    grid-template-columns:1fr 1fr 1fr 1fr;
    gap:20px;
    padding-bottom:20px;
`, InputGroup$1 = styled.div`
    display:flex;
    flex-direction:column;
    gap: 10px;
    grid-column: ${e => e.gridColumn ? e.gridColumn : "initial"} ;

`, Select$1 = styled.select`
border: 1px solid #c4c4c4;
padding: 10px 20px;
border-radius: 4px;
background-color: #ffff;
`; var ProblemCreate = e => { const { problemId: a } = useParams(); react.exports.useState(!1); const r = useAuthenticateApi(), [d, o] = react.exports.useState([]), [t, x] = react.exports.useState([]), u = react.exports.useRef(), n = react.exports.useRef(), m = react.exports.useRef(), l = react.exports.useRef(), c = react.exports.useRef(), g = react.exports.useRef(), v = react.exports.useRef(), [_, E] = react.exports.useState(""), S = useNavigate(); react.exports.useRef(); const R = async () => { var i, s; try { const h = { id: a, demonstrations: t, description: _, testCases: d, title: (i = g.current) == null ? void 0 : i.value, dificultyLevel: (s = v.current) == null ? void 0 : s.value }; return await r.post("/admin/problems", T({}, h)), dist.exports.Store.addNotification({ container: "top-center", title: "Criado com sucesso!", type: "success", insert: "top", animationIn: ["animate__animated", "animate__fadeIn"], animationOut: ["animate__animated", "animate__fadeOut"], dismiss: { duration: 5e3, onScreen: !0 } }), S("/admin/problems") } catch { dist.exports.Store.addNotification({ container: "top-center", title: "N\xE3o foi poss\xEDvel salvar sua altera\xE7\xF5es", type: "danger", message: "Tente novamente depois.", insert: "top", animationIn: ["animate__animated", "animate__fadeIn"], animationOut: ["animate__animated", "animate__fadeOut"], dismiss: { duration: 5e3, onScreen: !0 } }) } }, A = () => { let i = { outputs: "" }; if (u.current) { const s = u.current.value; s != "" && (i.inputs || (i.inputs = []), i.inputs.push(...s.split(";"))), u.current.value = "" } if (n.current) { const s = n.current.value; if (s == "") return dist.exports.Store.addNotification({ container: "top-center", title: "Caso teste n\xE3o pode ficar sem sa\xEDda!", type: "danger", insert: "top", animationIn: ["animate__animated", "animate__fadeIn"], animationOut: ["animate__animated", "animate__fadeOut"], dismiss: { duration: 5e3, onScreen: !0 } }); i.outputs = s, n.current.value = "" } if (m.current) { const s = m.current.value; s != "" && (i.validationOutputRegex = s), m.current.value = "" } o([...d, i]) }; function C(i) { o(s => s.filter((h, y) => i !== y)) } const I = () => { let i = { demonstrationOutput: "" }; if (c.current) { const s = c.current.value; i.demonstrationOutput = s } if (l.current) { const s = l.current.value; i.demonstrationInputs || (i.demonstrationInputs = []), i.demonstrationInputs.push(...s.split(";")) } x([...t, i]) }; function b(i) { x(s => s.filter((h, y) => i != y)) } return jsx(Container$3, { children: jsx(Card, { children: jsxs(Form$1, { onSubmit: i => { i.preventDefault(), R() }, children: [jsxs(InputGroup$1, { gridColumn: "span 3", children: [jsx("label", { htmlFor: "title", children: "T\xEDtulo" }), jsx(Input$1, { ref: g, name: "title", "aria-label": "T\xEDtulo do Problema" })] }), jsxs(InputGroup$1, { children: [jsx("label", { htmlFor: "title", children: "Dificuldade" }), jsxs(Select$1, { ref: v, name: "dificultyLevel", children: [jsx("option", { value: "F\xE1cil", children: "F\xE1cil" }), jsx("option", { value: "Intermedi\xE1rio", children: "Intermedi\xE1rio" }), jsx("option", { value: "Dif\xEDcil", children: "Dif\xEDcil" })] })] }), jsxs(InputGroup$1, { id: "text-editor", gridColumn: "span 4", children: [jsx("label", { htmlFor: "", children: "Descri\xE7\xE3o" }), jsx(lib, { style: { display: "block" }, bounds: "#text-editor", theme: "snow", value: _, onChange: E }), jsx("div", { style: { visibility: "hidden" }, children: "." })] }), jsxs(InputGroup$1, { gridColumn: "span 4", style: { border: "1px solid #c4c4c4", borderRadius: 4, padding: 10 }, children: [jsx("h3", { children: "Casos de Teste" }), jsxs("div", { style: { display: "flex", flexDirection: "row", gap: "5px" }, children: [jsx(Input$1, { ref: u, style: { flex: 1 }, placeholder: "Entradas (separadas por ponto v\xEDrgula ;)" }), jsx(Input$1, { ref: n, style: { flex: 1 }, placeholder: "Sa\xEDda" }), jsx(Input$1, { ref: m, style: { flex: 1 }, placeholder: "Express\xE3o regular (Regex) de valida\xE7\xE3o de sa\xEDda" }), jsx(Button, { onClick: i => { i.preventDefault(), A() }, children: "Adicionar" })] }), jsxs("ul", { style: { display: "flex", flexDirection: "column", gap: "5px" }, children: [jsx("h3", {}), d.map((i, s) => { var h, y, k; return jsxs("li", { style: { display: "flex", flexDirection: "row", gap: "5px", width: "100%", border: "1px solid #c4c4c4", borderRadius: 4, padding: 10 }, children: [jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "5px" }, children: [jsx("p", { children: "Entradas" }), jsx(Input$1, { style: { flex: 1 }, value: (y = (h = i.inputs) == null ? void 0 : h.join(";")) != null ? y : "", disabled: !0 })] }), jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "5px" }, children: [jsx("p", { children: "Sa\xEDda" }), jsx(Input$1, { style: { flex: 1 }, value: i.outputs, disabled: !0 })] }), jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "5px" }, children: [jsx("p", { children: "Espress\xE3o regular" }), jsx(Input$1, { style: { flex: 1 }, value: (k = i.validationOutputRegex) != null ? k : "", disabled: !0 })] }), jsx("div", { style: { display: "flex", flexDirection: "column", gap: "5px", justifyContent: "end" }, children: jsx(Button, { style: { display: "block" }, onClick: f => { f.preventDefault(), C(s) }, children: "Remover" }) })] }, s) })] })] }), jsxs(InputGroup$1, { gridColumn: "span 4", style: { border: "1px solid #c4c4c4", borderRadius: 4, padding: 10 }, children: [jsx("h3", { children: "Casos de Demonstra\xE7\xE3o" }), jsxs("div", { style: { display: "flex", flexDirection: "row", gap: "5px" }, children: [jsx(Input$1, { ref: l, style: { flex: 1 }, placeholder: "Entradas (separadas por v\xEDrgula)" }), jsx(Input$1, { ref: c, style: { flex: 1 }, placeholder: "Sa\xEDda" }), jsx(Button, { onClick: i => { i.preventDefault(), I() }, children: "Adicionar" })] }), jsxs("ul", { style: { display: "flex", flexDirection: "column", gap: "5px" }, children: [jsx("h3", {}), t.map((i, s) => { var h, y; return jsxs("li", { style: { display: "flex", flexDirection: "row", gap: "5px", width: "100%", border: "1px solid #c4c4c4", borderRadius: 4, padding: 10 }, children: [jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "5px" }, children: [jsx("p", { children: "Entradas" }), jsx(Input$1, { style: { flex: 1 }, value: (y = (h = i.demonstrationInputs) == null ? void 0 : h.join(";")) != null ? y : "", disabled: !0 })] }), jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "5px" }, children: [jsx("p", { children: "Sa\xEDda" }), jsx(Input$1, { style: { flex: 1 }, value: i.demonstrationOutput, disabled: !0 })] }), jsx("div", { style: { display: "flex", flexDirection: "column", gap: "5px", justifyContent: "end" }, children: jsx(Button, { style: { display: "block" }, onClick: k => { k.preventDefault(), b(s) }, children: "Remover" }) })] }, s) })] })] }), jsxs(InputGroup$1, { gridColumn: "span 4", children: [jsx(Button, { type: "submit", children: "Salvar" }), jsx(ButtonSecondary, { onClick: i => { i.preventDefault(), S("/admin/problems", { replace: !0 }) }, children: "Cancelar" })] })] }) }) }) }, styles$1 = ""; const convertToTimeString$1 = e => { const a = new Date(e); return a.toLocaleDateString() + " " + a.toLocaleTimeString() }; var AdvisorChat = () => { var I, b, i; function e(s) { switch (s) { case "ON_GOING": return jsx("span", { className: "blue", children: "Ocorrendo" }); case "COMPLETE": return jsx("span", { className: "red", children: "Encerrado" }); case "OPEN": return jsx("span", { className: "green", children: "Aberto" }); default: return jsx("span", { className: "blue", children: s }) } } const [a, r] = react.exports.useState([]), d = useAuthenticateApi(), o = useUser(), [t, x] = react.exports.useState(!1), [u, n] = react.exports.useState(""), [m, l] = react.exports.useState(!0), [c, g] = react.exports.useState(!1), v = async () => { if (t.id && window.confirm("Voc\xEA deseja encerrar essa conversa?")) try { console.log("dowubId", t.id), await d.post(`/doubts/close/${t.id}`, {}), await E() } catch (s) { s.response && dist.exports.Store.addNotification({ title: "Erro", message: s.response.data.error.message, type: "danger", container: "top-center", dismiss: { duration: 3e3 } }) } }, _ = async () => { if (!!t) try { g(!0), await d.post(`/doubts/${t.id}`, { message: u }), E(), n("") } catch (s) { s.response && dist.exports.Store.addNotification({ title: "Erro", message: s.response.data.error.message, type: "danger", container: "top-center", dismiss: { duration: 3e3 } }) } finally { g(!1) } }, E = async () => { try { const s = await d.get(`advisor/doubts?filter=${JSON.stringify({ order: ["updatedAt DESC", "createdAt DESC"], where: { advisorId: o.id } })}`); console.log("Data"), r(s.data) } catch (s) { s.response && console.log(s.response.data) } finally { l(!1) } }, S = s => { if (!!s) return a.find(h => h.id == s.id) }, R = ({ key: s, name: h, createdAt: y, problemId: k, preMessage: f, status: j, problemTitle: N }) => (console.log(t), jsx("div", { className: `chat_list ${s === t.id ? "chat_list__selected" : ""}`, onClick: w => { x({ id: s, problemTitle: N, problemId: k, status: j }) }, children: jsxs("div", { className: "chat_people", children: [jsxs("div", { className: "chat_img", children: [" ", jsx("img", { src: "https://ptetutorials.com/images/user-profile.png", alt: "sunil" }), " "] }), jsxs("div", { className: "chat_ib", children: [jsxs("h5", { children: [h, jsx("span", { className: "chat_date", children: y })] }), jsx("p", { children: f }), jsx("span", { children: e(j) })] })] }) }, s)), A = ({ message: s, createdAt: h, userURI: y }) => jsxs("div", { className: "incoming_msg", children: [jsxs("div", { className: "incoming_msg_img", children: [" ", jsx("img", { src: "https://ptetutorials.com/images/user-profile.png", alt: "sunil" }), " "] }), jsx("div", { className: "received_msg", children: jsxs("div", { className: "received_withd_msg", children: [jsx("p", { children: s }), jsx("span", { className: "time_date", children: convertToTimeString$1(h != null ? h : new Date) })] }) })] }, y + h), C = ({ message: s, createdAt: h, userURI: y }) => jsx("div", { className: "outgoing_msg", children: jsxs("div", { className: "sent_msg", children: [jsx("p", { children: s }), jsx("span", { className: "time_date", children: convertToTimeString$1(h != null ? h : new Date) })] }) }, y + h); return react.exports.useEffect(() => { E(); let s = setInterval(() => E(), 1e4); return () => clearInterval(s) }, []), m ? jsx(Container$3, { children: jsx(Card, { className: "d-flex j-center ", padding: "10px 20px 40px 20px", children: jsx(Spinner, { width: "40px", height: "40px" }) }) }) : jsxs(Fragment, { children: [jsx("link", { href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css", type: "text/css", rel: "stylesheet" }), jsx("link", { href: "//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css", rel: "stylesheet", id: "bootstrap-css" }), jsx("script", { src: "//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" }), jsx("script", { src: "//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js" }), jsx("div", { className: "container mt-2", children: jsxs(Card, { children: [jsx("h3", { className: " text-center", children: "Chat de d\xFAvidas" }), jsxs("div", { className: "messaging", children: [jsxs("div", { className: "inbox_msg", children: [jsxs("div", { className: "inbox_people", children: [jsxs("div", { className: "headind_srch", children: [jsx("div", { className: "recent_heading", children: jsx("h4", { children: "Recentes" }) }), jsx("div", { className: "srch_bar", children: jsxs("div", { className: "stylish-input-group", children: [jsx("input", { type: "text", className: "search-bar", placeholder: "Procurar" }), jsx("span", { className: "input-group-addon", children: jsxs("button", { type: "button", children: [" ", jsx("i", { className: "fa fa-search", "aria-hidden": "true" }), " "] }) }), " "] }) })] }), jsx("div", { className: "inbox_chat", children: a.map(s => { var h, y, k; return R({ name: (h = s.studentName) != null ? h : "Aguardando atendimento...", createdAt: convertToTimeString$1((k = (y = s.updatedAt) != null ? y : s.createdAt) != null ? k : new Date), key: s.id, preMessage: s.messages && s.messages.length != 0 && s.messages[s.messages.length - 1].message, status: s.status, problemTitle: s.problemTitle, problemId: s.problemId }) }) })] }), jsxs("div", { className: "mesgs", children: [t.problemTitle && jsxs("div", { className: "d-flex mb-2", style: { flexDirection: "column", justifyContent: "center", alignItems: "center" }, children: [jsxs("h3", { style: { textAlign: "center", marginBottom: 0 }, className: "font-1-m blue", children: ["Problema: ", jsx(Link, { target: "_blank", to: `/orientador/problema/${t.problemId}`, children: t.problemTitle })] }), t.status == "ON_GOING" && jsx("span", { className: "red font-1-s", onClick: s => v(), style: { textAlign: "center", cursor: "pointer", display: "block", width: "max-content" }, children: "Encerar conversa" })] }), jsx("div", { className: "msg_history", children: S(t) && ((I = S(t)) == null ? void 0 : I.messages) && ((i = (b = S(t)) == null ? void 0 : b.messages) == null ? void 0 : i.map(s => s.userId == o.id ? C(s) : A(s))) }), jsx("div", { className: "type_msg", children: jsxs("div", { className: "input_msg_write", children: [jsx("input", { disabled: !t, value: u, type: "text", onKeyDown: s => { s.key === "Enter" && _() }, className: "write_msg", onChange: s => n(s.target.value), placeholder: "Escreva uma mensagem" }), !c && jsx("button", { disabled: !t, onClick: s => { s.preventDefault, _() }, className: "msg_send_btn", type: "button", children: jsx("i", { className: "fa fa-paper-plane-o", "aria-hidden": "true" }) }), c && jsx(Spinner, { className: "msg_send_btn", width: "25px", height: "25px" })] }) })] })] }), jsxs("p", { className: "text-center top_spac", children: [" Cr\xE9ditos \xE0 ", jsx("a", { target: "_blank", href: "https://www.linkedin.com/in/sunil-rajput-nattho-singh/", children: "Sunil Rajput" })] })] })] }) })] }) }, Doubts = () => { const [e, a] = react.exports.useState([]), r = useAuthenticateApi(), [d, o] = react.exports.useState("todos"), t = useUser(), x = useNavigate(); function u(l) { switch (l) { case "ON_GOING": return jsx("span", { className: "red", children: "Ocorrendo" }); case "COMPLETE": return jsx("span", { className: "green", children: "Completo" }); case "OPEN": return jsx("span", { className: "blue", children: "Aberto" }); default: return jsx("span", { className: "blue", children: l }) } } const n = async () => { try { let l = {}; d == "todos" ? l = { where: { or: [{ status: "OPEN" }, { status: "ON_GOING", advisorURI: `/users/${t.id}` }, { advisorURI: `/users/${t.id}` }] } } : l = { where: { and: [{ tag: d }, { or: [{ status: "OPEN" }, { status: "ON_GOING", advisorURI: `/users/${t.id}` }, { advisorURI: `/users/${t.id}` }] }] }, fields: { messages: !1 } }; const c = await r.get(`/advisor/doubts/?filter=${JSON.stringify(l)}`); a(c.data) } catch (l) { l.response && dist.exports.Store.addNotification({ title: "Erro", message: l.response.data.error.message, type: "danger", container: "top-center", dismiss: { duration: 3e3 } }) } }, m = async l => { if (l.status === "OPEN" && window.confirm("Voc\xEA aceita orientar este aluno? ")) try { return await r.post(`/advisor/doubts/subscribe/${l.id}`, {}), x("/orientador/chat") } catch (c) { c.response && (dist.exports.Store.addNotification({ title: "Erro", message: c.response.data.error.message, type: "danger", container: "top-center", dismiss: { duration: 3e3 } }), n()) } if (l.status === "ON_GOING") return x("/orientador/chat"); l.status === "COMPLETE" && alert("Esta ocorr\xEAncia j\xE1 foi finalizada, voc\xEA n\xE3o pode enviar mensagens") }; return react.exports.useEffect(() => { n() }, [d]), jsx(Fragment, { children: jsx(Container$3, { children: jsxs(Card, { children: [jsx(Title, { title: "Solicita\xE7\xF5es de ajuda", subtitle: "Abaixo est\xE3o listadas todas as solicita\xE7\xF5es dos usu\xE1rios." }), jsxs(TableWrap, { children: [jsxs("div", { style: { flexDirection: "row-reverse", gap: 10, marginBottom: 20 }, className: "d-flex a-center", children: [jsxs("select", { onChange: l => o(l.target.value), className: "font-1-m", value: d, children: [jsx("option", { value: DoubtsTags.LOOPS, children: "Loops" }), jsx("option", { value: DoubtsTags.CONDITIONAL, children: "Condicionais" }), jsx("option", { value: DoubtsTags.VARIABLES, children: "Vari\xE1veis" }), jsx("option", { value: DoubtsTags.INPUT_OUTPUTS, children: "Entradas e Sa\xEDdas" }), jsx("option", { value: DoubtsTags.OTHERS, children: "outros" }), jsx("option", { value: "todos", children: "Todos" })] }), jsx("span", { className: "font-1-s gray-3", children: "Filtros" })] }), jsxs(Table$1, { children: [jsx(Thead$1, { children: jsxs(Tr$1, { children: [jsx(Th, { className: "font-2-m white", width: "10%", textAlign: "start", children: "C\xF3digo" }), jsx(Th, { className: "font-2-m white", width: "30%", textAlign: "start", children: "Nome" }), jsx(Th, { className: "font-2-m white", width: "20%", textAlign: "start", children: "Problema" }), jsx(Th, { className: "font-2-m white", width: "20%", textAlign: "start", children: "Status" })] }) }), jsx(TBody$1, { children: e.map(l => jsxs(Tr$1, { onClick: c => m(l), className: "font-2-xs", children: [jsx(Td$1, { children: l.id }), jsx(Td$1, { children: l.studentName }), jsx(Td$1, { children: l.problemTitle }), jsx(Td$1, { children: u(l.status) })] })) })] })] })] }) }) }) }, styles = ""; const convertToTimeString = e => { const a = new Date(e); return a.toLocaleDateString() + " " + a.toLocaleTimeString() }; var Chat = () => { var C, I, b; function e(i) { switch (i) { case "ON_GOING": return jsx("span", { className: "blue", children: "Ocorrendo" }); case "COMPLETE": return jsx("span", { className: "red", children: "Encerrado" }); case "OPEN": return jsx("span", { className: "green", children: "Aberto" }); default: return jsx("span", { className: "blue", children: i }) } } const [a, r] = react.exports.useState([]), d = useAuthenticateApi(), o = useUser(), [t, x] = react.exports.useState(!1), [u, n] = react.exports.useState(""), [m, l] = react.exports.useState(!0), [c, g] = react.exports.useState(!1), v = async () => { if (!!t) try { g(!0), await d.post(`/doubts/${t.id}`, { message: u }), _(), n("") } catch { alert("Algo deu errado") } finally { g(!1) } }, _ = async () => { try { const i = await d.get(`/doubts?filter=${JSON.stringify({ order: ["updatedAt DESC", "createdAt DESC"] })}`); console.log("Data"), r(i.data) } catch (i) { i.response && console.log(i.response.data) } finally { l(!1) } }, E = i => { if (!!i) return a.find(s => s.id == i.id) }, S = ({ key: i, name: s, createdAt: h, problemId: y, preMessage: k, status: f, problemTitle: j }) => (console.log(t), jsx("div", { className: `chat_list ${i === t.id ? "chat_list__selected" : ""}`, onClick: N => { x({ id: i, problemTitle: j, problemId: y }) }, children: jsxs("div", { className: "chat_people", children: [jsxs("div", { className: "chat_img", children: [" ", jsx("img", { src: "https://ptetutorials.com/images/user-profile.png", alt: "sunil" }), " "] }), jsxs("div", { className: "chat_ib", children: [jsxs("h5", { children: [s, jsx("span", { className: "chat_date", children: h })] }), jsx("p", { children: k }), jsx("span", { children: e(f) })] })] }) }, i)), R = ({ message: i, createdAt: s, userURI: h }) => jsxs("div", { className: "incoming_msg", children: [jsxs("div", { className: "incoming_msg_img", children: [" ", jsx("img", { src: "https://ptetutorials.com/images/user-profile.png", alt: "sunil" }), " "] }), jsx("div", { className: "received_msg", children: jsxs("div", { className: "received_withd_msg", children: [jsx("p", { children: i }), jsx("span", { className: "time_date", children: convertToTimeString(s != null ? s : new Date) })] }) })] }, h + s), A = ({ message: i, createdAt: s, userURI: h }) => jsx("div", { className: "outgoing_msg", children: jsxs("div", { className: "sent_msg", children: [jsx("p", { children: i }), jsx("span", { className: "time_date", children: convertToTimeString(s != null ? s : new Date) })] }) }, h + s); return react.exports.useEffect(() => { _(); let i = setInterval(() => _(), 1e4); return () => clearInterval(i) }, []), m ? jsx(Container$3, { children: jsx(Card, { className: "d-flex j-center ", padding: "10px 20px 40px 20px", children: jsx(Spinner, { width: "40px", height: "40px" }) }) }) : jsxs(Fragment, { children: [jsx("link", { href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css", type: "text/css", rel: "stylesheet" }), jsx("link", { href: "//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css", rel: "stylesheet", id: "bootstrap-css" }), jsx("script", { src: "//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" }), jsx("script", { src: "//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js" }), jsx("div", { className: "container mt-2", children: jsxs(Card, { children: [jsx("h3", { className: " text-center", children: "Chat de d\xFAvidas" }), jsxs("div", { className: "messaging", children: [jsxs("div", { className: "inbox_msg", children: [jsxs("div", { className: "inbox_people", children: [jsxs("div", { className: "headind_srch", children: [jsx("div", { className: "recent_heading", children: jsx("h4", { children: "Recentes" }) }), jsx("div", { className: "srch_bar", children: jsxs("div", { className: "stylish-input-group", children: [jsx("input", { type: "text", className: "search-bar", placeholder: "Procurar" }), jsx("span", { className: "input-group-addon", children: jsxs("button", { type: "button", children: [" ", jsx("i", { className: "fa fa-search", "aria-hidden": "true" }), " "] }) }), " "] }) })] }), jsx("div", { className: "inbox_chat", children: a.map(i => { var s, h, y; return S(T({ name: (s = i.advisorName) != null ? s : "Aguardando atendimento...", createdAt: convertToTimeString((y = (h = i.updatedAt) != null ? h : i.createdAt) != null ? y : new Date), key: i.id, preMessage: i.messages && i.messages.length != 0 && i.messages[i.messages.length - 1].message, status: i.status }, i)) }) })] }), jsxs("div", { className: "mesgs", children: [t.problemTitle && jsxs("h3", { style: { textAlign: "center" }, className: "font-1-m blue", children: ["Problema: ", jsx(Link, { target: "_blank", to: `/editor/${t.problemId}`, children: t.problemTitle })] }), jsx("div", { className: "msg_history", children: E(t) && ((C = E(t)) == null ? void 0 : C.messages) && ((b = (I = E(t)) == null ? void 0 : I.messages) == null ? void 0 : b.map(i => i.userId == o.id ? A(i) : R(i))) }), jsx("div", { className: "type_msg", children: jsxs("div", { className: "input_msg_write", children: [jsx("input", { disabled: !t, value: u, type: "text", onKeyDown: i => { i.key === "Enter" && v() }, className: "write_msg", onChange: i => n(i.target.value), placeholder: "Escreva uma mensagem" }), !c && jsx("button", { disabled: !t, onClick: i => { i.preventDefault, v() }, className: "msg_send_btn", type: "button", children: jsx("i", { className: "fa fa-paper-plane-o", "aria-hidden": "true" }) }), c && jsx(Spinner, { className: "msg_send_btn", width: "25px", height: "25px" })] }) })] })] }), jsxs("p", { className: "text-center top_spac", children: [" Cr\xE9ditos \xE0 ", jsx("a", { target: "_blank", href: "https://www.linkedin.com/in/sunil-rajput-nattho-singh/", children: "Sunil Rajput" })] })] })] }) })] }) }; const Form = styled.form`
    display:grid;
    grid-template-columns:1fr 1fr 1fr 1fr;
    gap:20px;
    padding-bottom:20px;
`, InputGroup = styled.div`
    display:flex;
    flex-direction:column;
    gap: 10px;
    grid-column: ${e => e.gridColumn ? e.gridColumn : "initial"} ;

`, Select = styled.select`
border: 1px solid #c4c4c4;
padding: 10px 20px;
border-radius: 4px;
background-color: #ffff;
`; var ProblemShow = e => { const { id: a } = useParams(), [r, d] = react.exports.useState(!0), [o, t] = react.exports.useState(), x = useAuthenticateApi(), [u, n] = react.exports.useState([]), [m, l] = react.exports.useState([]), c = react.exports.useRef(), g = react.exports.useRef(), v = react.exports.useRef(), _ = react.exports.useRef(), E = react.exports.useRef(), S = react.exports.useRef(), R = react.exports.useRef(), [A, C] = react.exports.useState(""); useNavigate(), react.exports.useRef(), react.exports.useEffect(() => { I() }, []); const I = async () => { var b, i; try { d(!0); const s = await x.get(`/advisor/problems/${a}`); t(s.data), C(h => { var y; return (y = s.data.description) != null ? y : h }), n((b = s.data.testCases) != null ? b : []), l((i = s.data.demonstrations) != null ? i : []) } catch { } finally { d(!1) } }; return r ? jsx(Container$3, { children: jsx(Spinner, {}) }) : o ? jsx(Container$3, { children: jsx(Card, { children: jsxs(Form, { onSubmit: b => { b.preventDefault() }, children: [jsxs(InputGroup, { gridColumn: "span 3", children: [jsx("label", { htmlFor: "title", children: "T\xEDtulo" }), jsx(Input$1, { disabled: !0, ref: S, name: "title", "aria-label": "T\xEDtulo do Problema", defaultValue: o.title })] }), jsxs(InputGroup, { children: [jsx("label", { htmlFor: "title", children: "Dificuldade" }), jsxs(Select, { disabled: !0, ref: R, onChange: b => { console.log(b.currentTarget.value) }, name: "dificultyLevel", defaultChecked: !0, defaultValue: o.dificultyLevel, children: [jsx("option", { value: "F\xE1cil", children: "F\xE1cil" }), jsx("option", { value: "Intermedi\xE1rio", children: "Intermedi\xE1rio" }), jsx("option", { value: "Dif\xEDcil", children: "Dif\xEDcil" })] })] }), jsxs(InputGroup, { id: "text-editor", gridColumn: "span 4", children: [jsx("label", { htmlFor: "", children: "Descri\xE7\xE3o" }), jsx(lib, { readOnly: !0, style: { display: "block" }, bounds: "#text-editor", theme: "snow", value: A, onChange: C }), jsx("div", { style: { visibility: "hidden" }, children: "." })] }), jsxs(InputGroup, { gridColumn: "span 4", style: { border: "1px solid #c4c4c4", borderRadius: 4, padding: 10 }, children: [jsx("h3", { children: "Casos de Teste" }), jsxs("div", { style: { display: "flex", flexDirection: "row", gap: "5px" }, children: [jsx(Input$1, { disabled: !0, ref: c, style: { flex: 1 }, placeholder: "Entradas (separadas por ponto v\xEDrgula ;)" }), jsx(Input$1, { disabled: !0, ref: g, style: { flex: 1 }, placeholder: "Sa\xEDda" }), jsx(Input$1, { disabled: !0, ref: v, style: { flex: 1 }, placeholder: "Express\xE3o regular (Regex) de valida\xE7\xE3o de sa\xEDda" }), jsx(Button, { disabled: !0, onClick: b => { b.preventDefault() }, children: "Adicionar" })] }), jsxs("ul", { style: { display: "flex", flexDirection: "column", gap: "5px" }, children: [jsx("h3", {}), u.map((b, i) => { var s, h, y; return jsxs("li", { style: { display: "flex", flexDirection: "row", gap: "5px", width: "100%", border: "1px solid #c4c4c4", borderRadius: 4, padding: 10 }, children: [jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "5px" }, children: [jsx("p", { children: "Entradas" }), jsx(Input$1, { style: { flex: 1 }, value: (h = (s = b.inputs) == null ? void 0 : s.join(";")) != null ? h : "", disabled: !0 })] }), jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "5px" }, children: [jsx("p", { children: "Sa\xEDda" }), jsx(Input$1, { style: { flex: 1 }, value: b.outputs, disabled: !0 })] }), jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "5px" }, children: [jsx("p", { children: "Espress\xE3o regular" }), jsx(Input$1, { style: { flex: 1 }, value: (y = b.validationOutputRegex) != null ? y : "", disabled: !0 })] }), jsx("div", { style: { display: "flex", flexDirection: "column", gap: "5px", justifyContent: "end" }, children: jsx(Button, { disabled: !0, style: { display: "block" }, onClick: k => { k.preventDefault() }, children: "Remover" }) })] }, i) })] })] }), jsxs(InputGroup, { gridColumn: "span 4", style: { border: "1px solid #c4c4c4", borderRadius: 4, padding: 10 }, children: [jsx("h3", { children: "Casos de Demonstra\xE7\xE3o" }), jsxs("div", { style: { display: "flex", flexDirection: "row", gap: "5px" }, children: [jsx(Input$1, { disabled: !0, ref: _, style: { flex: 1 }, placeholder: "Entradas (separadas por v\xEDrgula)" }), jsx(Input$1, { disabled: !0, ref: E, style: { flex: 1 }, placeholder: "Sa\xEDda" }), jsx(Button, { disabled: !0, onClick: b => { b.preventDefault() }, children: "Adicionar" })] }), jsxs("ul", { style: { display: "flex", flexDirection: "column", gap: "5px" }, children: [jsx("h3", {}), m.map((b, i) => { var s, h; return jsxs("li", { style: { display: "flex", flexDirection: "row", gap: "5px", width: "100%", border: "1px solid #c4c4c4", borderRadius: 4, padding: 10 }, children: [jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "5px" }, children: [jsx("p", { children: "Entradas" }), jsx(Input$1, { style: { flex: 1 }, value: (h = (s = b.demonstrationInputs) == null ? void 0 : s.join(";")) != null ? h : "", disabled: !0 })] }), jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "5px" }, children: [jsx("p", { children: "Sa\xEDda" }), jsx(Input$1, { style: { flex: 1 }, value: b.demonstrationOutput, disabled: !0 })] }), jsx("div", { style: { display: "flex", flexDirection: "column", gap: "5px", justifyContent: "end" }, children: jsx(Button, { disabled: !0, style: { display: "block" }, onClick: y => { y.preventDefault() }, children: "Remover" }) })] }, i) })] })] }), jsx(InputGroup, { gridColumn: "span 4" })] }) }) }) : jsx(Container$3, { children: jsx("h6", { children: "N\xE3o foi poss\xEDve carregar o problema" }) }) }; function RequireAuth({ children: e }) { let a = useAuth(), r = useLocation(); return a.token ? e : jsx(Navigate, { to: "/login", state: { from: r }, replace: !0 }) } function RequireAdvisor({ children: e, service: a }) { let r = useUser(), d = useLocation(); return r.role == Roles.ADVISOR ? e : jsx(Navigate, { to: "/", state: { from: d }, replace: !0 }) } function RequireAdmin({ children: e }) { const a = useUser(); let r = useLocation(); return a.role != Roles.ADMIN ? jsx(Navigate, { to: "/", state: { from: r }, replace: !0 }) : e } function AppRoutes() { return jsxs(Fragment, { children: [jsx(Navbar, {}), jsxs(Routes, { children: [jsx(Route, { path: "/admin/problems", element: jsx(RequireAuth, { children: jsx(RequireAdmin, { children: jsx(ProblemsList, {}) }) }) }), jsx(Route, { path: "/admin/problem/:problemId", element: jsx(RequireAuth, { children: jsx(RequireAdmin, { children: jsx(ProblemEdit, {}) }) }) }), jsx(Route, { path: "/admin/problem/create", element: jsx(RequireAuth, { children: jsx(RequireAdmin, { children: jsx(ProblemCreate, {}) }) }) }), jsx(Route, { path: "/", element: jsx(RequireAuth, { children: jsx(Home, {}) }) }), jsx(Route, { path: "/editor/:id", element: jsx(RequireAuth, { children: jsx(Editor, {}) }) }), jsx(Route, { path: "/signup", element: jsx(Signup, {}) }), jsx(Route, { path: "/exercicios", element: jsx(RequireAuth, { children: jsx(LevelSelect, {}) }) }), jsx(Route, { path: "/submissoes/:id", element: jsx(RequireAuth, { children: jsx(Show, {}) }) }), jsx(Route, { path: "/exercicios/:dificultyLevel", element: jsx(RequireAuth, { children: jsx(Exercises, {}) }) }), jsx(Route, { path: "/orientador/chat", element: jsx(RequireAuth, { children: jsx(RequireAdvisor, { service: Services.CHAT_SERVICE, children: jsx(AdvisorChat, {}) }) }) }), jsx(Route, { path: "/orientador/duvidas", element: jsx(RequireAuth, { children: jsx(RequireAdvisor, { service: Services.CHAT_SERVICE, children: jsx(Doubts, {}) }) }) }), jsx(Route, { path: "/orientador/problema/:id", element: jsx(RequireAuth, { children: jsx(RequireAdvisor, { service: Services.PROBLEM_SERVICE, children: jsx(ProblemShow, {}) }) }) }), jsx(Route, { path: "chat", element: jsx(RequireAuth, { children: jsx(Chat, {}) }) }), jsx(Route, { path: "/perfil", element: jsx(RequireAuth, { children: jsx(Profile, {}) }) }), jsx(Route, { path: "/login", element: jsx(Login, {}) }), jsx(Route, { path: "*", element: jsx("div", { style: { display: "flex", flex: 1, justifyContent: "center", alignItems: "center" }, children: jsx("p", { children: "Not Found" }) }) }), jsx(Route, { path: "*", element: jsx("div", { style: { display: "flex", flex: 1, justifyContent: "center", alignItems: "center" }, children: jsx("p", { children: "Not Found" }) }) })] })] }) } var theme = ""; function App() { return jsx(AuthProvider, { children: jsx(UserProvider, { children: jsxs(BrowserRouter, { children: [jsx(GlobalStylesSet, {}), jsx(dist.exports.ReactNotifications, {}), jsx(AppRoutes, {})] }) }) }) } ReactDOM.render(jsx(React.StrictMode, { children: jsx(App, {}) }), document.getElementById("root"));
