## Initialize Go app
go mod init github.com/tomdoestech/go-react-todo

go mod init est une commande utilisée pour initialiser un nouveau module Go. Lorsque vous exécutez go mod init <module-path>, elle crée un nouveau fichier go.mod dans votre répertoire de projet. Ce fichier go.mod déclare le nom du module (le chemin que vous avez spécifié) et gère les dépendances de votre projet Go. C'est une partie essentielle de la gestion des dépendances en Go, introduite dans Go 1.11 pour remplacer l'ancien système GOPATH.

## Install Fiber v2
go get -u github.com/gofiber/fiber/v2

Fiber est un framework web en Go inspiré par Express.js de Node.js. Il est conçu pour être rapide et facile à utiliser, avec une API similaire à celle d'Express.


## Stuff I learn / Questions I think of while coding

```go
type Todo struct{
	ID int `json:"id"`
	Title string `json:"title"`
	Done bool `json:"done"`
	Body string `json:"body"`
}
```

les parties json:"id", json:"title", etc., sont des tags de struct qui fournissent des métadonnées supplémentaires pour les champs de la struct. Dans ce cas, ils indiquent comment ces champs doivent être sérialisés ou désérialisés en JSON. Par exemple, json:"id" signifie que lors de la sérialisation (ou désérialisation) de la struct en JSON, le champ ID de la struct sera représenté par la clé id dans l'objet JSON. Cela permet un contrôle précis sur la représentation JSON des structs en Go.


Les tags de struct comme json:"id" en Go ne sont pas obligatoires, mais ils sont très utiles pour la sérialisation et la désérialisation des données


```go
app.Post("/api/todos", func(c *fiber.Ctx) error{
	todo := &Todo{}
	if err :=c.BodyParser(todo); err != nil{
		return err
	}
	todo.ID = len(todos)+1  //Assigning ID as  the number of elements in the slice + 1
	todos = append(todos, *todo)
	return c.JSON(todos)
})
```

- Création d'un Pointeur vers Todo : todo := &Todo{} crée un nouveau Todo et un pointeur todo vers celui-ci. Utiliser un pointeur ici est efficace car cela évite de copier la structure Todo lors de son passage à des fonctions.

- Remplissage de Todo : c.BodyParser(todo) remplit les champs du Todo pointé par todo avec les données reçues dans le corps de la requête.

- Modification de Todo : Lorsque vous faites todo.ID = len(todos)+1, vous modifiez directement le champ ID de la structure pointée par todo. L'utilisation de * n'est pas nécessaire car vous accédez directement à un champ de la structure.

- Ajout à la Slice todos : todos = append(todos, *todo) ajoute la valeur pointée par todo à la slice todos. L'opérateur * est utilisé pour déréférencer le pointeur, c'est-à-dire pour obtenir la valeur réelle de l'objet Todo à partir du pointeur.

Lorsque vous passez un struct à une fonction ou que vous le stockez dans une slice, sans utiliser de pointeur, Go crée une copie complète de ce struct. Cela signifie que toutes les données du struct sont dupliquées en mémoire, ce qui peut être coûteux en termes de performance pour les grands structs.

En revanche, si vous utilisez un pointeur, Go ne copie que l'adresse mémoire du struct. Cela est beaucoup plus léger car la taille d'un pointeur est fixe et petite, indépendamment de la taille du struct. Ainsi, l'utilisation de pointeurs pour des structs volumineux peut réduire l'utilisation de la mémoire et améliorer les performances, surtout lors du passage de données entre les fonctions ou lors de l'ajout à des slices.

Quand vous utilisez *todo dans append(todos, *todo), ce que vous faites est de déréférencer le pointeur todo. Cela signifie que vous accédez à la valeur sur laquelle todo pointe, et cette valeur (le struct Todo complet) est ajoutée à la slice todos. Ainsi, c'est bien la copie du contenu de Todo qui est ajoutée à la slice, et non l'adresse mémoire. C'est pourquoi, même si todo est un pointeur, l'utilisation de * entraîne la copie des données du struct dans la slice.


L'intérêt de l'utilisation d'un pointeur dans ce contexte est double :

Manipulation Avant l'Ajout : Lorsque vous utilisez un pointeur, vous pouvez modifier l'objet Todo avant de l'ajouter à la slice. Cela est particulièrement utile si ces modifications dépendent de plusieurs étapes ou conditions. Le pointeur vous permet de modifier l'objet Todo directement sans copier à chaque modification.

Consistance de la Mémoire : Avant d'ajouter Todo à la slice, l'utilisation d'un pointeur permet de travailler avec une seule instance de Todo. Bien que la copie finale soit faite lors de l'ajout à la slice, toutes les manipulations préalables sont effectuées sur une seule instance, ce qui est plus efficace que de créer plusieurs copies intermédiaires si Todo était passé directement comme valeur.

Dans ce cas spécifique, la copie des données lors de l'ajout à la slice est inévitable, mais l'utilisation de pointeurs peut être plus efficace pour les manipulations avant cette étape finale.

En Go, lorsque vous manipulez un objet sans utiliser de pointeur, chaque modification implique potentiellement une copie de l'objet. Cela est dû au fait que Go traite les structs comme des types de valeur, ce qui signifie qu'ils sont copiés lorsqu'ils sont passés à une fonction ou assignés à une autre variable.

Lorsque vous utilisez des pointeurs, vous manipulez directement l'objet en mémoire, sans créer de nouvelles copies. Cela permet des modifications en place (sur l'objet original) sans coût supplémentaire de copie. Ainsi, les modifications faites sur un objet via un pointeur sont reflétées partout où ce pointeur est utilisé, car toutes les références pointent vers la même instance en mémoire.


Lorsque vous passez un pointeur à une fonction en Go, ce qui est copié est l'adresse mémoire que le pointeur représente, pas l'objet lui-même. Cette copie est beaucoup plus légère en termes d'utilisation de la mémoire qu'une copie de l'objet complet. Par conséquent, même si techniquement il y a une "copie" du pointeur (l'adresse mémoire), l'objet original n'est pas dupliqué.


es pointeurs en Go sont utilisés dans plusieurs cas de figure, notamment :

Structures Volumineuses : Comme nous l'avons discuté, pour des structures (structs) importantes, l'utilisation de pointeurs permet d'éviter la copie coûteuse de données. Les modifications sont effectuées directement sur l'objet en mémoire.

Modification en Place : Quand une fonction doit modifier l'état d'un objet (comme un élément d'une slice ou d'une map), un pointeur est utilisé pour que ces modifications soient reflétées à l'extérieur de la fonction.

Performance en Concurrence : Dans les programmes concurrents, les pointeurs peuvent être utilisés pour partager et modifier des données entre différentes goroutines sans créer de multiples copies.

Économie de Mémoire : Pour les grands tableaux ou slices, l'utilisation de pointeurs peut réduire la consommation de mémoire.

Implémentation de Structures de Données : Les pointeurs sont essentiels dans la mise en œuvre de certaines structures de données complexes, telles que les listes chaînées, les arbres, etc.

Interface Polymorphique : Les pointeurs sont souvent utilisés pour implémenter des interfaces polymorphiques, où différents types concrets peuvent être traités de manière uniforme à travers une interface.