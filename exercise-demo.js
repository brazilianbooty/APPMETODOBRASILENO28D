export const DEMO_IDS = new Set(["ex-bridge-01","ex-donkey-kick-06","ex-frog-pump-14","ex-abduction-lying-08"]);
export function ExerciseDemo({ui,exercise}) {
 return ui.jsxs("div",{className:"exercise-demo",children:[
 ui.jsx("span",{className:"exercise-demo-label",children:"Demostración ilustrada · Español"}),
 ui.jsx("iframe",{src:"./demo-player.html?exercise="+encodeURIComponent(exercise.id)+"&embed=1",title:"Demostración ilustrada: "+exercise.name.es,loading:"eager"}),
 ui.jsx("a",{href:"./demo-player.html?exercise="+encodeURIComponent(exercise.id),target:"_blank",rel:"noopener noreferrer",children:"Ver demostración ampliada ↗"})
 ]});
}
