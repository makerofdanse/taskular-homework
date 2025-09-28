all:
  @echo "Nothing to do for all."

restore:
  #!/usr/bin/env bash
  if [[ ! -d ./node_modules ]]; then
    npm install
  fi

dev: restore
  npx ng serve --host 0.0.0.0

build-local: restore
  npx ng build --configuration production

build: restore
  npx ng build --configuration production --base-href="/taskular-homework/"

clean:
  #!/usr/bin/env bash
  if [[ -d ./dist ]]; then
    rm -r ./dist
  fi

deploy: clean build
  npx ngh --dir=dist/taskular-homework/browser --name="Vladimir Makarov"
