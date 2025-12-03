# PokéBoutique

Application e-commerce monopage dédiée à la vente de cartes Pokémon. Le projet illustre une architecture complète : API Node/Express + MongoDB, frontend React/Tailwind, couverture de tests et orchestration Docker.

## ⚙️ Pile technique
- **Backend** : Node.js 20, Express 4, MongoDB/Mongoose, Jest + Supertest.
- **Frontend** : Vite + React 18, React Router, TailwindCSS, React Testing Library (Vitest).
- **Infra & outils** : Docker / Docker Compose, scripts de seed, GitHub Copilot instructions personnalisées.

## 🧱 Architecture
```
.
├── backend
│   ├── src
│   │   ├── app.js                # Configuration Express (middlewares, routes, erreurs)
│   │   ├── server.js             # Bootstrap HTTP + connexion Mongo
│   │   ├── config/db.js          # Connexion Mongoose
│   │   ├── controllers           # Logique HTTP (cards, cart)
│   │   ├── services              # Logique métier
│   │   ├── models                # Schémas Mongoose (Card, CartItem)
│   │   └── routes                # Découpage des endpoints REST
│   ├── scripts/seed.js           # Peuplement d exemples
│   ├── package.json
│   ├── jest.config.js / jest.setup.js
│   └── Dockerfile
├── frontend
│   ├── src
│   │   ├── main.jsx / App.jsx    # Point d entrée React + Router
│   │   ├── pages                 # Catalogue, détail, panier, checkout, confirmation
│   │   ├── components            # Layout, Navbar, ProductCard, ...
│   │   ├── hooks                 # useProducts, useCart
│   │   ├── api                   # Client HTTP (axios) + endpoints
│   │   └── __tests__             # Tests RTL + setup
│   ├── package.json, vite.config.js
│   ├── tailwind.config.js / postcss.config.js
│   ├── index.html
│   └── Dockerfile
├── .github
│   ├── copilot-instructions.md
│   └── prompt/generate-unit-tests.prompt.md
├── docker-compose.yml
├── plan.md
└── README.md
```

## 🚀 Mise en route locale
1. **Prérequis** : Node.js 20+ (recommandé pour Vite/Vitest), npm 10+, Docker 24+.
2. **Variables d environnement** : `backend/.env` contient `MONGO_URI=mongodb://localhost:27017/pokemon_cards` (tests/seed locaux) et `PORT=5000`. Le service Docker backend reçoit automatiquement `MONGO_URI=mongodb://mongo:27017/pokemon_cards` via `docker-compose.yml`.
3. **Installation dépendances** :
   ```bash
   cd backend && npm install
   cd ../frontend && npm install --include=optional
   ```
4. **Lancement développement** :
   ```bash
   # Terminal 1
   cd backend && npm run dev

   # Terminal 2
   cd frontend && npm run dev
   ```
   Le frontend proxy `/api` vers `http://localhost:5000`.

## 🐳 Exécution via Docker
```bash
docker compose down
docker compose up --build
```
- MongoDB : `localhost:27017`
- API : `http://localhost:5000/api`
- Front : `http://localhost:5173`

Seed (depuis Docker) :
```bash
docker compose exec backend npm run seed
```

Arrêt & nettoyage : `Ctrl+C` puis `docker compose down` (ajouter `-v` pour purger le volume `mongo-data`).

## 🧪 Tests
| Zone      | Commande                              | Notes |
|-----------|---------------------------------------|-------|
| Backend   | `cd backend && npm test`              | Jest + Supertest + Mongo mémoire |
| Frontend  | `cd frontend && npm run test`         | Vitest + RTL + jsdom (Node 20 requis) |

**Objectif global** : ≥70 % de couverture (lignes/branches/fonctions) avec un focus sur le catalogue, le panier, la simulation de paiement et l affichage des erreurs UI.

### Stratégie de tests
1. **Organisation**
   - Backend : ranger les tests dans `backend/tests` (ex. `services/` pour les tests unitaires, `integration/` pour les routes/contrôleurs). Utiliser Jest + Supertest avec Mongo mémoire ou mocks de Mongoose selon le niveau.
   - Frontend : conserver les tests dans `frontend/src/__tests__` (ou proches des features) en regroupant par page, composant ou hook. Vitest + React Testing Library servent de base.
2. **Couverture des modules** (4 axes par module clé : services `cardService`/`cartService`, contrôleurs, hooks `useCart`/`useProducts`, pages catalogue/panier/checkout, composants critiques).
   - *Core Functionality Tests* : scénarios nominaux (liste des cartes filtrée, ajout au panier, calcul du total, affichage de la liste côté UI).
   - *Input Validation Tests* : mauvaises entrées (quantités négatives, carte inexistante, props manquantes, saisie UI hors bornes).
   - *Error Handling Tests* : erreurs réseau/base/métier (DB KO, API KO, panier vide lors du checkout) doivent se traduire en codes HTTP / messages UI explicites.
   - *Side Effects Tests* : vérifier les effets secondaires (appel de sauvegarde Mongoose, mises à jour d état dans les hooks, navigation vers la confirmation seulement après succès, DOM mis à jour après interaction).
3. **Pattern AAA** : chaque test suit Arrange (données/mocks), Act (action ou interaction), Assert (vérifications sur valeurs de retour, dépendances, DOM). Même sans commentaires explicites, la structure du code doit refléter ce découpage.
4. **Mocking & isolation**
   - Backend : ne pas taper dans la vraie base pour les unitaires. Mock Mongoose ou injecter des doubles. Pour les intégrations, utiliser Mongo en mémoire ou mocker la couche d accès tout en couvrant Express.
   - Frontend : mocker systématiquement les modules HTTP (axios/api) et utiliser `msw`/mocks pour les hooks/pages. Jamais d appels réseau réels.
5. **Priorités de couverture**
   - Backend : services produits/panier/checkout, contrôleurs REST.
   - Frontend : `useCart`, `useProducts`, pages Catalogue/Panier/Checkout, affichage des erreurs.
   - Les composants purement visuels sont facultatifs tant que l objectif 70 % est atteint.

GitHub Copilot (cf. `.github/prompt`) doit appliquer exactement cette stratégie quand il propose des tests.

## 📦 Script seed
```bash
# Stack Docker
docker compose exec backend npm run seed

# Mongo local (hors Docker)
cd backend && npm run seed
```
Le seed injecte Pikachu V et Charizard GX avec les images DuckDuckGo partagées dans l énoncé. Relance-le après chaque modification des données d exemple.

## 📚 Endpoints principaux
| Méthode | Route             | Description                            |
|---------|-------------------|----------------------------------------|
| GET     | `/api/cards`      | Liste paginable de cartes Pokémon      |
| GET     | `/api/cards/:id`  | Fiche détaillée                        |
| GET     | `/api/cart`       | Récupère le panier (clé `x-session-id`) |
| POST    | `/api/cart`       | Ajoute une carte (body: `cardId`, `quantity`) |
| PUT     | `/api/cart/:id`   | Met à jour une quantité                |
| DELETE  | `/api/cart/:id`   | Supprime un article                    |
| POST    | `/api/cart/checkout` | Vide le panier + renvoie confirmation |

Toutes les réponses de succès sont enveloppées dans `{ data, message? }` et les erreurs renvoient `{ error }` avec un code HTTP adapté.

## 🗺️ Roadmap suggérée
1. Implémenter la persistance du panier par session avec expiration.
2. Ajouter pagination / filtres sur `/cards` (type, rareté, prix).
3. Couvrir les services `cardService` et `cartService` par Jest + Mongo Memory Server.
4. Tester les hooks `useProducts` et `useCart` avec msw.
5. Préparer un pipeline CI (GitHub Actions) pour lint + tests + build.

## 🤝 Contribution
- Respecter l architecture décrite.
- Documenter toute nouvelle route ou commande dans ce README.
- Inclure des tests pertinents avant chaque MR.
