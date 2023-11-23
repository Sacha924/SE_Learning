## Objectifs

Créer une application simple CRUD pour des exercises de sport en utilisant React pour le front et MongoDB avec Mongoose et une REST API côté back. Ensuite la partie la plus intéressante sera d'analyser les performances de l'application et d'utiliser un système comme Redis pour de la mise en cache, ou tester d'autres systèmes de mise en cache et analyser la performance de l'app.


## Typescript et Node

 TypeScript est un langage qui s'appuie sur JavaScript et ajoute des fonctionnalités de typage statique. Comme Node.js exécute du JavaScript standard, les fichiers TypeScript doivent être compilés en JavaScript avant de pouvoir être exécutés sur Node.js. L'outil tsc (TypeScript Compiler) est utilisé pour cette compilation.

  <img src="1.JPG"/>



## Discussion await avec try...catch et Chaîne de Promesses avec .then() et .catch()

Votre interrogation sur l'utilisation de await et try...catch versus les chaînes de promesses avec .then() et .catch() dans le contexte de la gestion des requêtes asynchrones en Node.js est tout à fait pertinente. Ces deux approches sont valides mais ont des différences de style et de fonctionnement.


<img src="2.JPG"/>

<img src="3.JPG"/>



## Queries

Si je requête mes trainings, je vais avoir ça :
<img src="4.JPG"/>


Les exercices sont référencés par leurs ids dans chaque data training. 
In Mongoose (the MongoDB object modeling tool for Node.js), populate is a method that you can use for automatically replacing the specified paths in the document with document(s) from other collections. In your case, where you have references (_ids) to Exercise documents in your Training documents, you can use populate to fetch the full Exercise documents associated with each Training session.

Problème des N + 1 requêtes

## Others 

Typer req et res :


npm install @types/express --save-dev


import { Request, Response } from "express";



## Front part

A ce stade j'ai implémenté mon API qui me permet de faire les opérations CRUD sur des exercices, ainsi que de Créer et Retourner des trainings (contenant notamment plusieurs exercices). J'ai également requêté les données dans le front pour les afficher avec un UX de base.



Voici mon premier code pour récupérer les données :

```ts
import React, { useState, useEffect } from 'react';
import DisplayTraining from './components/DisplayTraining';
import { Exercise, Training } from './types';
import "./styles/App.css"

function App() {
  const [trainings, setTrainings] = useState<Training[]>()

  useEffect(() => {
    const getData = async()=>{
      const res = await fetch("http://localhost:4000/training").then(async (data) => await data.json())
      setTrainings(res)
    }
    getData()
  }, [])

  console.log(trainings)
  return (
    <div className="App">
      {trainings?.map((training, key) => {
        return <DisplayTraining training={training} key={key} />
      })}
    </div>
  );
}

export default App;
```

Ce code est fonctionnel et bien, mais il y a beaucoup d'optimisation, que nous allons voir dans l'ordre. D'abord réfléchis à ce qui peut être mieux fait...


<br/>

<br/>

<br/>

<br/>

- **error handling**

là dans notre code actuel, si une erreur a lieu durant le fetch de data, on n'est au courant de rien. Utilisons un block try catch, response.ok, et throw error :

```ts
useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:4000/training");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setTrainings(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      }
    }

    getData()
  }, [])

  if (error) {
    return <div>Error: {error}</div>;
  }
```

Throwing an error in JavaScript is a way of signaling that an exceptional or unexpected situation has occurred in the program. Here, throwing an error when response.ok is false (indicating that the HTTP request did not succeed) is a way to handle HTTP errors.

De plus quand on fait throw new Error(...); ça va créé un objet error qui va être catch par le premier catch qui apparait. Ensuite une bonne pratique est de set notre error message dans ce catch, et si l'error message est défini alors l'application render le message d'erreur en question.

<br/>

- **Loading state**

Que l'utilisateur sache ce qu'il se passe, si notre requête est en cours d'exécution et qu'elle prend une ou 2 secondes, affiché un état temporaire. Pour se faire on a juste besoin d'un state loading, qu'on set à false une fois notre requête terminé, et si le loading est à true, on render ce que l'on veut.

```ts
  const [isLoading, setIsLoading] = useState<boolean>(true);

  after the request ends : setIsLoading(false); 

  //display
   if (isLoading) {
    return <div>Loading...</div>;
  }
```


<br/>

- **Separation of Concerns**

Une bonne pratique pour maintenir un code propre et maintenable est d'utiliser différents fichiers dans lesquels on met nos call API en fonction des datas ou des endpoints. 
On utilise un système de services.

Dans mon code précédent, je vais mettre toute cette logique là :
```ts
const response = await fetch("http://localhost:4000/training");
if (!response.ok) {
  throw new Error(`Error: ${response.status}`);
}
const data = await response.json();
```
dans une fonction de mon service, et j'aurais juste à appeler cette fonction et elle s'occupera donc du call API et du traitement de la donnée (throw error or return res.json())



Voici donc un exemple de ce à quoi ressemblera mon fichier services/trainingService.ts :

```ts
const BASE_URL = "http://localhost:4000/training";

export const getTrainings = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch trainings');
  }
  return response.json();
};

export const createTraining = async (trainingData: any) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(trainingData)
  });
  if (!response.ok) {
    throw new Error('Failed to create training');
  }
  return response.json();
};
```

et désormais mon fichier App.tsx est plus clean :

```ts
useEffect(() => {
  const getData = async () => {
    try {
      const data = await getTrainings();
      setTrainings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }
  getData()
}, [])
```

On obtient un code vraiment clean. J'en ai profité our mettre un if else inline dans le seterror, et mettre le setIsLoading dans un finally parcequ'il était mis à la fois à la fin du try, et dans le catch.



## Partie découverte / optimisation / Web vitals

en moyenne 25ms pour la requête training, range entre 17 et 37 ms

TTFB (Time To First Byte) : Il mesure le temps entre le début de la navigation jusqu'à la réception du premier octet de la réponse du serveur. Une valeur de 314,3 ms indique un bon temps de réponse pour le premier octet.


Les Core Web Vitals sont un ensemble de mesures destinées à diagnostiquer le bon fonctionnement UX (User eXperience) d'un site internet. Elles évaluent la qualité de l'expérience utilisateur au travers de critères comme la rapidité de chargement, le délai d'interactivité ou la stabilité visuelle.

Quels sont les 4 Core Web Vitals ?

- LCP ou Largest Content Painful.

- FID ou First Input Delay.

- CLS ou Cumulative Layout Shift.

- INP ou Interaction to Next Paint

LCP estime la vitesse de chargement perçue, c'est-à-dire le temps qu'il faut à une page web pour afficher les premiers éléments visibles. Il ne mesure donc pas le temps de chargement complet de la page, seulement son délai pour être active.

FID est un critère qui s'intéresse, quant à lui, au délai d'interactivité. Il mesure ainsi le temps qui passe entre le moment où un internaute interagit avec une page web et celui où le navigateur qu'il utilise répond à cette interaction.

CLS est un indicateur mesurant la stabilité visuelle d'une page web. 

INP sert à mesurer la vitesse à laquelle un site internet réagit aux interactions des utilisateurs. Il s'agit donc de mesurer le temps s'écoulant entre un clic ou une pression sur une touche du clavier, et un changement apparent sur l'interface du site. 

TTFB : 310
FCP : 394
CLS : 0
LCP : 431