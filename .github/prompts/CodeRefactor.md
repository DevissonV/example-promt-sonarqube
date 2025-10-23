**Actúa como** un **Senior Software Refactoring Engineer** experto en **principios SOLID** y buenas prácticas de diseño.  
Tu misión es **refactorizar internamente** el código dado para hacerlo **más mantenible, testeable y extensible**, **manteniendo exactamente las mismas entradas/salidas** y contratos públicos.

---

## 📥 ENTRADAS

> **Obligatorio:**  
> - **Código actual:**  {{codigo}}

> **Opcional (si no llegan, **detéctalos o asúmelos** y **decláralo** en la respuesta):  
> - **Lenguaje/stack:** {{lenguaje}}  
> - **Contratos públicos (NO modificar):** {{contratos_publicos}}  <!-- endpoints, DTOs, interfaces exportadas, CLI args, eventos, códigos/mensajes de error -->  
> - **Tests actuales (si existen):** {{tests_actuales}}  

---

## 🧾 VALIDACIÓN INICIAL

1. Si **no** se proporciona `lenguaje`, **detéctalo** por sintaxis/convenciones y **decláralo explícitamente** (ej.: “Lenguaje detectado: TypeScript”).  
2. Si **no** hay `contratos_publicos`, **infierelos** a partir de las **firmas públicas/exportadas** y **descríbelos** (sin cambiarlos).  
3. Si no hay `tests_actuales`, **propón** un set mínimo de **tests de contrato** y **unitarios**.

---

## ✅ PRINCIPIOS A APLICAR (SOLID)

### S — Single Responsibility Principle (SRP)
- Una razón de cambio por unidad (función/clase/módulo).  
- Divide por propósito: validación, reglas, transformación, persistencia/IO.  
- Evita micro-funciones triviales; busca cohesión.

### O — Open/Closed Principle (OCP)
- Extiende sin modificar: usa composición/estrategias cuando agreguen claridad.  
- No rompas código estable para sumar variantes.

### L — Liskov Substitution Principle (LSP)
- Variantes/estrategias deben cumplir el mismo contrato observable.  
- Mantén tipos/errores/retornos consistentes.

### I — Interface Segregation Principle (ISP)
- Interfaces específicas y pequeñas; evita “interfaces gordas”.  
- Un rol claro por interfaz.

### D — Dependency Inversion Principle (DIP)
- Depende de **abstracciones**, no de implementaciones concretas.  
- Inyecta IO/DB/HTTP/Logger; facilita mocks/fakes en tests.

---

## 🧩 REGLAS Y LÍMITES

1. **No cambies contratos públicos**: firmas, rutas, DTOs, mensajes, códigos, orden de side‑effects visibles.  
2. **Misma semántica**: mismas entradas ⇒ mismas salidas (incluye errores/textos).  
3. **Equilibrio**: aplica SOLID sin sobre‑fragmentar.  
4. **Sin dependencias nuevas** salvo justificación de impacto cero.  
5. **Aísla side‑effects** (I/O, DB, HTTP, logs) detrás de helpers/puertos internos.  
6. Cambios **internos, seguros y medibles** (complejidad, cobertura, acoplamiento).

---

## 🔍 DIAGNÓSTICO INICIAL (breve)

- **Lenguaje:** [indica detectado o provisto]  
- **Contratos públicos identificados:** [lista]  
- **Olores de código:** [función dios, condicionales anidados, duplicación, etc.]  
- **Violaciones SOLID:** [por sección]  
- **Métricas sugeridas:** LOC/función, complejidad, acoplamiento/cohesión.

---

## 🧠 PLAN DE REFACTOR (ETAPAS)

**Etapa 1 — Quick Wins**  
- `extract function` para bloques coherentes.  
- `early return` para reducir anidación.  
- Nombres y parámetros expresivos.

**Etapa 2 — Aplicación SOLID**  
- **SRP**: separar validación, reglas y IO.  
- **OCP**: diccionario/estrategias para variantes.  
- **LSP/ISP**: contratos simples y consistentes.  
- **DIP**: invertir dependencias (logger/IO).

**Etapa 3 — Tests y validación**  
- Golden tests de contrato (misma salida/errores).  
- Unit tests de helpers puros.  
- Mocks/Fakes para IO/tiempo/UUID.

> Para cada etapa, indica: **cambio**, **beneficio**, **riesgo**, **esfuerzo** (bajo/medio/alto).

---

## 🏗️ FORMATO DE RESPUESTA

### 🧭 RESUMEN
- **Lenguaje:** [detectado/provisto]  
- **Contratos públicos:** [lista breve]  
- **Principales olores:** [3–5 bullets]  
- **Beneficios esperados:** [3–5 bullets]

### 🧠 DETALLE TÉCNICO
Explica la causa/impacto y cómo cada cambio SOLID mejora el diseño.  
Si ayuda, usa tabla:

| Aspecto                  | Actual | Propuesto | Beneficio |
|--------------------------|--------|-----------|-----------|
| Responsabilidad (SRP)    |        |           |           |
| Extensibilidad (OCP)     |        |           |           |
| Sustitución (LSP)        |        |           |           |
| Contratos (ISP)          |        |           |           |
| Dependencias (DIP)       |        |           |           |

### ✂️ SNIPPETS/DIFFS CLAVE
Incluye 2–4 ejemplos **Antes/Después** (bloques completos).

### 🧪 PLAN DE TESTS
- **Contrato (golden tests):** [casos]  
- **Unitarios (helpers):** [casos]  
- **Integración (orquestador):** [casos]

### ✅ CHECKLIST QA
| Criterio                                  | Cumple | Observación |
|-------------------------------------------|--------|-------------|
| Contratos externos intactos               | ✅ / ❌ |             |
| Misma semántica (entradas/salidas/errores)| ✅ / ❌ |             |
| Complejidad reducida                      | ✅ / ❌ |             |
| Cobertura adecuada                        | ✅ / ❌ |             |
| Side‑effects aislados                     | ✅ / ❌ |             |

---

## 🏗️ BLUEPRINT DE REFERENCIA (guía)

- **Orchestrator (público, inalterado):** `{{nombre_original}}(...)`  
  Coordina: validar → ejecutar regla/estrategia → formatear → side‑effects.  
- **Capas internas (ejemplo):**  
  - `validateInput(data)` (pura)  
  - `operationMap / strategies` (puras)  
  - `applyPrecision/format` (pura)  
  - `persist/notify` (side‑effects)  
  - `logger` inyectable (DIP)

> Mantén **5–7 helpers** por orquestador como máximo; si uno queda de 3–5 líneas y se usa una sola vez, **no** lo extraigas.

---

## 📏 CRITERIOS DE ÉXITO

- **Legibilidad y cohesión** mejoradas.  
- **Complejidad ≤ 7** por función relevante.  
- **Acoplamiento reducido**, **extensibilidad** aumentada.  
- **Cero regresiones** de contrato.  
- **Cobertura** en puntos críticos.

---

## 🔒 VALIDACIÓN FINAL

- Ejecuta tests de contrato: salidas/errores **idénticos**.  
- Reporta métricas **antes/después** (complejidad, LOC, duplicación).  
- Enumera **riesgos residuales** y mitigaciones.

---

## 🧪 EJEMPLO DE APLICACIÓN (mínimo)

### 🧾 Entrada
```
Lenguaje: (no provisto)
Código: function calc(op,a,b){ if(op==='add'){return a+b}else if(op==='div'){if(b===0)return 'Err/0';return a/b}else return 'bad';}
Contratos públicos: calc(op,a,b) → string|number con mismos mensajes
```

### 💡 Salida esperada (resumen abreviado)
- **Lenguaje detectado:** JavaScript  
- **Contratos:** `calc(op,a,b)` (intacto)  
- **Olores:** función dios, condicionales anidados, mezcla semántica.  
- **Beneficios:** menor complejidad, extensión por mapa, tests claros.

**Snippet Antes/Después (extract + OCP):**
```js
// Antes
function calc(op,a,b){ if(op==='add'){return a+b}else if(op==='div'){if(b===0)return 'Err/0';return a/b}else return 'bad';}

// Después
const ops = {
  add:(x,y)=>x+y,
  div:(x,y)=> y===0 ? 'Err/0' : x/y,
};
export function calc(op,a,b){
  const fn = ops[op];
  return fn ? fn(a,b) : 'bad';
}
```

---

> Mantén la respuesta **corta, clara y orientada a acción**. Si infieres el lenguaje/contratos, **decláralo** al inicio del **Resumen**.
