# SonarFixAssistant Demo

Proyecto de ejemplo para demostrar un flujo completo de integración entre **SonarQube**, **Copilot**, y una **API Node.js/TypeScript**.

## Objetivo
Este repositorio muestra cómo:
1. Levantar un servidor SonarQube localmente con Docker.
2. Ejecutar un análisis automático del código fuente con SonarScanner.
3. Usar el prompt **SonarFixAssistant** en GitHub Copilot para interpretar y resolver findings de SonarQube.
4. Levantar la API de ejemplo en Node.js.

---

## Requisitos
- **Docker Desktop** instalado y corriendo.
- **Node.js 18+** y **npm**.
- Compatible con **macOS**, **Linux** y **Windows (Git Bash o WSL2)**.

---

## 1. Variables de entorno
Edita o crea el archivo `.env` en la raíz del proyecto con:

```env
SONAR_HOST_URL=http://localhost:9000
SONAR_TOKEN=<tu_token_sonar>
```

> Puedes generar el token en `http://localhost:9000` → *Mi cuenta* → *Tokens de seguridad*. (http://localhost:9000/account/security)

---

## 2. Configuración de scripts npm

Asegúrate de tener los siguientes scripts en tu `package.json`:

```json
"scripts": {
  "dev": "ts-node-dev --respawn src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js",
  "setup:sh": "chmod +x run-sonarqube.sh scan.sh || true",
  "sonar:up": "bash ./run-sonarqube.sh",
  "sonar:down": "docker rm -f sonarqube || true",
  "sonar:logs": "docker logs -f sonarqube",
  "sonar:scan": "bash ./scan.sh",
  "sonar:health": "bash -lc 'curl -fsS ${SONAR_HOST_URL:-http://localhost:9000}/api/system/health || true'"
}
```

---

## 3. Levantar SonarQube local

```bash
npm run setup:sh     # Da permisos a los scripts
npm run sonar:up     # Crea o levanta el contenedor
npm run sonar:logs   # Observa logs de arranque
npm run sonar:health # Comprueba estado del servidor
```

- Interfaz: [http://localhost:9000](http://localhost:9000)  
- Usuario: `admin`  
- Contraseña: `admin` *(cámbiala en el primer login)*

---

## 4. Ejecutar análisis con SonarScanner

```bash
npm run sonar:scan
```

Este comando:
- Valida la conexión con SonarQube.
- Ejecuta el contenedor oficial `sonarsource/sonar-scanner-cli`.
- Usa la configuración de `sonar-project.properties`.

---

## 5. Usar Copilot con el prompt SonarFixAssistant

Asegúrate de tener el archivo en tu repo:
```
.github/prompts/SonarFixAssistant.md
```

### En Copilot Chat escribe:

```
#SonarFixAssistant
Usa el formato completo definido en el prompt (Resumen, Detalle, Fix, Alternativa, Checklist).
Analiza el siguiente hallazgo de SonarQube y propón una solución sin modificar archivos:

{{regla}}: S2221
{{mensaje_sonar}}: "Handle this exception or don't catch it at all."
{{codigo_afectado}}:
try {
  doSomething();
} catch (error: any) {
  console.log(error);
}
{{archivo_linea}}: src/server.ts:22
{{lenguaje}}: TypeScript
```

Copilot generará una respuesta estructurada explicando la regla, el impacto y el fix propuesto sin alterar archivos automáticamente.

---

## 6. Levantar la API de ejemplo

```bash
npm run dev
```

- Endpoint disponible: GET [http://localhost:3000/hello](http://localhost:3000/hello?name=World)

---

## 7. Comandos útiles

```bash
npm run setup:sh      # Da permisos a scripts
npm run sonar:up      # Levanta SonarQube
npm run sonar:down    # Detiene y elimina contenedor
npm run sonar:logs    # Muestra logs
npm run sonar:health  # Verifica salud del servidor
npm run sonar:scan    # Ejecuta análisis Sonar
npm run dev           # Levanta la API
```

---

## Notas finales
- Los volúmenes de Docker mantienen datos persistentes entre reinicios.
- Si usas Mac M1/M2 y hay advertencia de arquitectura, añade en el compose o run:  
  `--platform linux/amd64`
- En Windows usa **Git Bash** o **WSL2** para ejecutar scripts `.sh`.
- Este proyecto está pensado para **demostraciones internas y entrenamiento de IA para desarrolladores.**
