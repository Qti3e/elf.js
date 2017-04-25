rm elf.min.js
find . -type f -iname '*.js' | tac | xargs -d "\n" cat | cat > /tmp/elf.tmp.js
uglifyjs /tmp/elf.tmp.js > elf.min.js