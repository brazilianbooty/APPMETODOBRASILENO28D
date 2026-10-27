// Customer entry is a presentation choice for the existing Kiwify delivery link.
// It does not verify payments or change access permissions.
const CUSTOMER_ENTRY_KEY = "gluteo28-customer-entry-v1";
export function isCustomerEntry(search = window.location.search, storage) {
  if (new URLSearchParams(search).get("v") === "vip-a3dycnG-2") return true;
  try { return (storage || window.localStorage).getItem(CUSTOMER_ENTRY_KEY) === "1"; }
  catch { return false; }
}
export function rememberCustomerEntry(enabled, storage) {
  if (!enabled) return;
  try { (storage || window.localStorage).setItem(CUSTOMER_ENTRY_KEY, "1"); } catch {}
}
export function CustomerWelcome({ui, LanguageControl, lang, setLang, state, navigate, startWorkout, install}) {
  const text = (es, en) => lang === "en" ? en : es;
  const completed = new Set(state.records.map(record => record.day));
  let day = 1;
  while (day < 28 && completed.has(day)) day++;
  const finished = completed.size >= 28;
  const continuing = completed.size > 0;
  const jsx = ui.jsx, jsxs = ui.jsxs;
  return jsxs("main", {className:"customer-welcome", children:[
    jsxs("div", {className:"customer-shell", children:[
      jsxs("header", {className:"customer-header", children:[
        jsxs("div", {className:"customer-brand", children:[
          jsx("span", {className:"customer-brand-mark","aria-hidden":"true",children:"28"}),
          jsxs("span", {children:[jsx("b",{children:"GLÚTEOS 28D"}),jsx("small",{children:"MÉTODO COACH LUCA"})]})
        ]}),
        jsx(LanguageControl, {lang, onChange:setLang})
      ]}),
      jsxs("section", {className:"customer-intro", children:[
        jsxs("span", {className:"customer-access",children:[
          jsx("span",{"aria-hidden":"true",children:"✓"}),
          text("Tu acceso está activo","Your access is active")
        ]}),
        jsx("p",{className:"customer-eyebrow",children:text("TU PROGRAMA DE 28 DÍAS","YOUR 28-DAY PROGRAM")}),
        jsxs("h1",{children:[
          text(continuing ? "¡Qué bueno verte de nuevo!" : "¡Bienvenida a",continuing ? "Welcome back!" : "Welcome to"),
          !continuing && jsx("span",{children:"Glúteos 28D!"})
        ]}),
        jsx("p",{className:"customer-lead",children:text("Tu entrenamiento ya está disponible. Empieza a tu ritmo, desde casa.","Your training is ready. Start at your own pace, from home.")})
      ]}),
      jsxs("section",{className:"customer-session","aria-labelledby":"customer-session-heading",children:[
        jsxs("div",{className:"customer-session-top",children:[
          jsx("span",{className:"customer-day",children:text("DÍA "+day+" / 28","DAY "+day+" / 28")}),
          jsx("span",{className:"customer-included",children:text("Incluido en tu programa","Included in your program")})
        ]}),
        jsx("h2",{id:"customer-session-heading",children:text(finished ? "¡Completaste tu desafío!" : continuing ? "Continúa donde lo dejaste" : "Tu primer entrenamiento",finished ? "You completed your challenge!" : continuing ? "Continue where you left off" : "Your first workout")}),
        jsx("p",{children:text("Ejercicios guiados, instrucciones paso a paso y cronómetro.","Guided exercises, step-by-step instructions and a timer.")}),
        jsxs("button",{type:"button",className:"primary-btn customer-start",onClick:()=>finished ? navigate("progress") : startWorkout(day),children:[
          text(finished ? "Ver mi progreso" : continuing ? "Continuar día "+day : "Comenzar día 1",finished ? "View my progress" : continuing ? "Continue day "+day : "Start day 1"),
          jsx("span",{"aria-hidden":"true",children:"→"})
        ]}),
        jsx("button",{type:"button",className:"customer-plan",onClick:()=>navigate("training"),children:text("Ver mi programa","View my program")})
      ]}),
      jsx("button",{type:"button",className:"customer-personalize",onClick:()=>navigate("onboarding"),children:text("Personalizar mi rutina · incluido y opcional","Personalize my routine · included and optional")}),
      jsxs("details",{className:"customer-help",children:[
        jsx("summary",{children:text("Cómo usar la app","How to use the app")}),
        jsxs("ol",{children:[
          jsx("li",{children:text("Toca «Comenzar día 1» para abrir tu primer entrenamiento.","Tap “Start day 1” to open your first workout.")}),
          jsx("li",{children:text("Consulta «Paso a paso», inicia el cronómetro y marca cada serie al terminar.","Read “Step by step”, start the timer and mark each set when finished.")}),
          jsx("li",{children:text("Regresa a «Entreno» para ver tu programa y a «Progreso» para revisar tus sesiones completadas.","Return to “Training” for your program and “Progress” for completed sessions.")})
        ]}),
        jsx("p",{children:text("Tu progreso se guarda en este navegador. Usa siempre el mismo navegador y dispositivo.","Your progress is saved in this browser. Use the same browser and device.")}),
        jsx("button",{type:"button",className:"customer-install",onClick:install,children:text("Añadir la app a mi pantalla de inicio","Add the app to my home screen")})
      ]}),
      jsxs("footer",{className:"customer-footer",children:[
        jsx("a",{href:"mailto:zgnegociosdigitais@gmail.com?subject=Ayuda%20con%20mi%20acceso%20a%20Gluteos%2028D",children:text("¿Necesitas ayuda? Contáctanos","Need help? Contact us")}),
        jsx("span",{children:text("Tu rutina. Tu ritmo. Tu progreso.","Your routine. Your pace. Your progress.")})
      ]})
    ]})
  ]});
}
