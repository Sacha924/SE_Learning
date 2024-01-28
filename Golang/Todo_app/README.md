## Initialize Go app
go mod init github.com/tomdoestech/go-react-todo

go mod init est une commande utilisée pour initialiser un nouveau module Go. Lorsque vous exécutez go mod init <module-path>, elle crée un nouveau fichier go.mod dans votre répertoire de projet. Ce fichier go.mod déclare le nom du module (le chemin que vous avez spécifié) et gère les dépendances de votre projet Go. C'est une partie essentielle de la gestion des dépendances en Go, introduite dans Go 1.11 pour remplacer l'ancien système GOPATH.

## Install Fiber v2
go get -u github.com/gofiber/fiber/v2

Fiber est un framework web en Go inspiré par Express.js de Node.js. Il est conçu pour être rapide et facile à utiliser, avec une API similaire à celle d'Express.


## Stuff I learn / Questions I think of while coding


type Todo struct{
	ID int `json:"id"`
	Title string `json:"title"`
	Done bool `json:"done"`
	Body string `json:"body"`
}

les parties json:"id", json:"title", etc., sont des tags de struct qui fournissent des métadonnées supplémentaires pour les champs de la struct. Dans ce cas, ils indiquent comment ces champs doivent être sérialisés ou désérialisés en JSON. Par exemple, json:"id" signifie que lors de la sérialisation (ou désérialisation) de la struct en JSON, le champ ID de la struct sera représenté par la clé id dans l'objet JSON. Cela permet un contrôle précis sur la représentation JSON des structs en Go.


Les tags de struct comme json:"id" en Go ne sont pas obligatoires, mais ils sont très utiles pour la sérialisation et la désérialisation des données