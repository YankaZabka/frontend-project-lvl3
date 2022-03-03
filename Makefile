#Makefile

install:
	npm ci

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .

test-coverage:
	npx -n '--experimental-vm-modules  --no-warnings' jest --coverage
