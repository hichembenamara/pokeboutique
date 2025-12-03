# Plan de livraison

## Phase 1 — Fondation technique
- Initialiser backend Express + Mongo (config, routes, services, modèles).
- Scaffold frontend Vite + React + Tailwind, routing + pages.
- Mettre en place Docker Compose (Mongo, API, front) et script de seed (Pikachu V / Charizard GX + URLs d images fournies).

## Phase 2 — Fonctionnalités coeur
- Implémenter la logique panier (ajout, update, checkout) côté API + hooks.
- Relier les pages React au backend via axios + session header.
- Ajouter validations et gestion d erreurs utilisateur.

## Phase 3 — Qualité & Observabilité
- Couverture de tests (~70 %) backend (Jest/Supertest) et frontend (RTL/Vitest – Node 20 recommandé).
- Monitoring léger (logger, métriques futures).
- Documentation (README, instructions Copilot, guides API, consignes de seed/tests).

## Phase 4 — Durcissement
- CI/CD (GitHub Actions) avec lint + tests.
- Optimisation perf (caching, pagination, lazy loading).
- Préparer déploiement (environnements staging / prod).
