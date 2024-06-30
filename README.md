# Projet Memory

## Déploiement du projet

Pour déployer le projet, il faut au préalable le cloner sur votre machine locale avec la commande suivante :

```bash
git clone git@github.com/qboitel/projet-memory.git
```

Ensuite, il faut avoir NodeJS et npm installés sur votre machine puis taper la commande suivante dans le dossier cloné :

```bash
npm install && npm run dev
```

Il suffit ensuitre de se rendre à l'URL suivante : http://localhost:5173/

## Fonctionnalités implémentées

Dans ce projet, il est demandé d'implémenter des fonctionnalités de mémorisation des informations renseignées par l'utilisateur. Cette fonctionnalité a bien été implémentée.

De plus, il est demandé de fournir une fonctionnalité de révision, il faut pouvoir réviser les cartes selectionnées à partir d'un thème, d'une catégorie et d'un niveau donné. Cette fonctionnalitée a été implémentée.

Il est également demandé de pouvoir utiliser l'application en mode hors-ligne. Cette fonctionnalité a été implementée.

## Organisation du code et des composants

L'application présente un router, que l'on trouve dans le fichier index.ts du dossier router.

Par la suite, on retrouve un dossier views qui présente les vues de l'application, ces vues utilisent les composants du dossier components.

Ce dossier components regroupe les composants spécifiques à des catégories de vues. On retrouve donc des dossiers cards, categories et themes avec pour chacun les composants des vues du même nom.