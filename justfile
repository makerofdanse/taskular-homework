all:
  @echo "Nothing to do for all."

dev:
  npx ng serve --host 0.0.0.0

build-local:
  npx ng build --configuration production

build:
  npx ng build --configuration production --base-href="/taskular-homework/"

clean:
  rm -r ./dist

deploy: clean build
  npx ngh --dir=dist/taskular-homework/browser --name="Vladimir Makarov"
