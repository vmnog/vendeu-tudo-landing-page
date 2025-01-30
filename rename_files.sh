#!/bin/bash

# Diretório base
BASE_DIR="src"

# Função para converter CamelCase para kebab-case
camel_to_kebab() {
	echo "$1" | sed -E 's/([a-z])([A-Z])/\1-\2/g' | tr '[:upper:]' '[:lower:]'
}

# Renomear arquivos e atualizar importações
rename_files_and_imports() {
	local old_filepath="$1"
	local new_filepath="$2"

	# Renomear o arquivo
	mv "$old_filepath" "$new_filepath"

	# Atualizar importações nos arquivos do diretório base
	grep -rl --exclude="$0" "$old_filepath" "$BASE_DIR" | while read -r file; do
		sed -i "s|$old_filepath|$new_filepath|g" "$file"
	done

	# Atualizar importações com caminho completo nos arquivos do diretório base
	old_import_path=$(echo "$old_filepath" | sed "s|$BASE_DIR/||; s|.tsx||")
	new_import_path=$(echo "$new_filepath" | sed "s|$BASE_DIR/||; s|.tsx||")
	grep -rl --exclude="$0" "$old_import_path" "$BASE_DIR" | while read -r file; do
		sed -i "s|$old_import_path|$new_import_path|g" "$file"
	done

	# Atualizar importações com caminho relativo nos arquivos do diretório base
	old_import_relative=$(basename "$old_filepath" .tsx)
	new_import_relative=$(basename "$new_filepath" .tsx)
	grep -rl --exclude="$0" "$old_import_relative" "$BASE_DIR" | while read -r file; do
		sed -i "s|$old_import_relative|$new_import_relative|g" "$file"
	done
}

# Percorrer todos os arquivos do diretório base recursivamente
find "$BASE_DIR" -type f -name "*.tsx" | while read -r filepath; do
	filename=$(basename "$filepath")
	new_filename=$(camel_to_kebab "$filename")
	new_filepath=$(dirname "$filepath")/$new_filename
	if [[ "$filename" != "$new_filename" ]]; then
		echo "Renaming $filepath to $new_filepath"
		rename_files_and_imports "$filepath" "$new_filepath"
	fi
done

echo "Renaming completed."
