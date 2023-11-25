# TLS

Le TLS est un protocole de chiffrement conçu pour sécuriser les communications Internet. La négociation TLS (également nommée handshake) désigne le processus qui amorce une session de communication utilisant le chiffrement TLS. Au cours de cette négociation, les deux parties communicantes s'échangent l'une l'autre des messages d'authentification et de vérification, établissent les algorithmes de chiffrement qu'elles utiliseront et se mettent d'accord sur les clés de session. Cette négociation constitue un élément fondamental du fonctionnement du protocole HTTPS.

---------------
<br/>

## À quel moment une négociation TLS intervient-elle ?

Une négociation TLS a lieu chaque fois qu'un utilisateur accède à un site web via HTTPS et que le navigateur commence à interroger le serveur d'origine du site web. Cette négociation intervient également chaque fois que d'autres communications utilisent le protocole HTTPS, y compris les appels d'API et les requêtes DNS sur HTTPS.

Les négociations TLS se produisent après l'ouverture d'une connexion TCP par l'intermédiaire d'une négociation TCP.


---------------
<br/>

## Que se passe-t-il lors d'une négociation TLS ?
Au cours d'une négociation TLS, le client et le serveur effectuent ensemble les opérations suivantes :

- Préciser quelle version de TLS (TLS 1.0, 1.2, 1.3, etc.) ils utiliseront.
- Décider quelles suites de chiffrement ils utiliseront.
- Authentifier l'identité du serveur à l'aide de la clé publique du serveur et de la signature numérique de l'autorité de certification SSL.
- Générer des clés de session afin d'utiliser le chiffrement symétrique une fois la négociation terminée.


---------------
<br/>

## Les étapes du handshake

La négociation TLS se compose d'une série de datagrammes (ou messages) échangés par un client et un serveur. Les étapes exactes d'une poignée de main TLS varient en fonction du type d'algorithme d'échange de clés utilisé et des suites de chiffrement prises en charge par les deux parties.
 Cela se passe à peu près comme suit :

1. Message « Client Hello » : le client démarre la négociation en envoyant un message « Hello » au serveur. Le message inclut la version TLS prise en charge par le client, les suites de chiffrement prises en charge et une chaîne d'octets aléatoires connue sous le nom de « client random », ou nombre aléatoire client.

2. Message « Server Hello » : en réponse au message Client Hello, le serveur envoie un message contenant le certificat SSL du serveur, la suite de chiffrement choisie par le serveur et le « Server random », une autre chaîne aléatoire d'octets générée par le serveur.

3. Authentification : le client vérifie le certificat SSL du serveur auprès de l'autorité de certification qui l'a émis. Cette opération confirme que le serveur est bien celui qu'il prétend être et que le client interagit avec le véritable propriétaire du domaine.

4. Secret pré-maître : le client envoie une autre chaîne d'octets aléatoire, le « premaster secret », ou secret pré-maître. Le secret pré-maître est chiffré à l'aide de la clé publique et ne peut être déchiffré par le serveur qu'avec la clé privée. (Le client obtient la clé publique dans le certificat SSL du serveur.)

5. Utilisation de la clé privée : le serveur déchiffre le secret pré-maître.

6. Création des clés de session : le client et le serveur génèrent des clés de session à partir du client random, du server random et du secret pré-maître. Ils doivent aboutir aux mêmes résultats.

7. Client prêt : le client envoie un message « Client Finished » chiffré à l'aide d'une clé de session.

8. Serveur prêt : le serveur envoie un message « Server Finished » chiffré à l'aide d'une clé de session.

9. Chiffrement symétrique sécurisé effectué : la négociation est terminée et la communication se poursuit à l'aide des clés de session.




---------------
<br/>

## Qu'est-ce qui est différent d'une poignée de main dans TLS 1.3 ?
TLS 1.3 ne prend pas en charge RSA, ni d'autres suites de chiffrement et paramètres qui sont vulnérables aux attaques. Il raccourcit également la poignée de main TLS, ce qui rend la poignée de main TLS 1.3 à la fois plus rapide et plus sûre.

Les étapes de base d'une poignée de main TLS 1.3 sont les suivantes :

<br/>

1. Message d'accueil du client : le client envoie un message d'accueil du client contenant la version du protocole, le hasard du client et une liste de suites de chiffrement.La prise en charge des suites de chiffrement non sécurisées ayant été supprimée de TLS 1.3, le nombre de suites de chiffrement possibles est considérablement réduit.Le bonjour du client comprend également les paramètres qui seront utilisés pour calculer le secret du prémaître.Essentiellement, le client suppose qu'il connaît la méthode d'échange de clés préférée du serveur (ce qui est probablement le cas, étant donné la liste simplifiée des suites de chiffrement).Cela réduit la longueur totale de la poignée de main - l'une des différences importantes entre les poignées de main TLS 1.3 et les poignées de main TLS 1.0, 1.1 et 1.2.


2. Le serveur génère le secret principal : à ce stade, le serveur a reçu les paramètres et les suites de chiffrement aléatoires du client.Il possède déjà le serveur aléatoire, puisqu'il peut le générer lui-même. Par conséquent, le serveur peut créer le secret principal.

3. Serveur hello et « Fini »: le serveur hello comprend le certificat du serveur, la signature numérique, le serveur aléatoire et la suite de chiffrement choisie.Comme il possède déjà le secret maître, il envoie également un message « Fini ».

4. Étapes finales et client « Fini »: le client vérifie la signature et le certificat, génère le secret maître et envoie le message « Fini ».

5. Chiffrement symétrique sécurisé effectué