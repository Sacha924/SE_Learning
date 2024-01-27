## Initialize Go app
go mod init github.com/tomdoestech/go-react-todo

go mod init est une commande utilisée pour initialiser un nouveau module Go. Lorsque vous exécutez go mod init <module-path>, elle crée un nouveau fichier go.mod dans votre répertoire de projet. Ce fichier go.mod déclare le nom du module (le chemin que vous avez spécifié) et gère les dépendances de votre projet Go. C'est une partie essentielle de la gestion des dépendances en Go, introduite dans Go 1.11 pour remplacer l'ancien système GOPATH.

## Install Fiber v2
go get -u github.com/gofiber/fiber/v2

Fiber est un framework web en Go inspiré par Express.js de Node.js. Il est conçu pour être rapide et facile à utiliser, avec une API similaire à celle d'Express.

## Create client app with Vite
yarn create vite client -- --template react-ts

## Install dependencies
yarn add @mantine/hooks @mantine/core swr @primer/octicons-react