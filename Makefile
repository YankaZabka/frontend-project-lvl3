#Makefile

lint:
	npx eslint .

lint-and-fix:
    npx eslint --fix .

test:
	npx jest

test-coverage:
	npx -n '--experimental-vm-modules  --no-warnings' jest --coverage
