#!/bin/bash
set -euo pipefail

if [ -f .env ]; then
  set -a
  source .env
  set +a
fi


: "${SONAR_TOKEN:? Falta SONAR_TOKEN (defínelo en .env)}"
SONAR_HOST_URL="${SONAR_HOST_URL:-http://localhost:9000}"


TARGET_URL="$SONAR_HOST_URL"
if [[ "$TARGET_URL" == http://localhost:* ]]; then
  TARGET_URL="${TARGET_URL/localhost/host.docker.internal}"
fi

echo "Comprobando salud de Sonar en: $SONAR_HOST_URL"
curl -sSf -u "$SONAR_TOKEN:" "$SONAR_HOST_URL/api/authentication/validate" >/dev/null   || {
  echo " No puedo conectar a $SONAR_HOST_URL"; exit 1;
}

echo " Ejecutando análisis SonarQube contra: $TARGET_URL"
docker pull sonarsource/sonar-scanner-cli
docker run --rm \
  --add-host=host.docker.internal:host-gateway \
  -e SONAR_HOST_URL="$TARGET_URL" \
  -e SONAR_TOKEN="$SONAR_TOKEN" \
  -v "$PWD:/usr/src" \
  sonarsource/sonar-scanner-cli