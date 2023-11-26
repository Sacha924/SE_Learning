for dir in */; do
  touch "${dir}README.md"
  folderName="${dir%/}"
  touch "${dir}${folderName}.ts"
done