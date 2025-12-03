# Directives Copilot globales

1. **Style de code**
   - Backend : CommonJS, Node.js 20, Express, Mongoose.
   - Frontend : React 18 avec hooks, Vite, TailwindCSS.
   - Toujours préférer des fonctions pures et des services dédiés pour la logique métier.

2. **Organisation**
   - Respecter la séparation routes → contrôleurs → services → modèles côté backend.
   - Côté frontend, placer les appels HTTP dans `src/api`, la gestion d état dans des hooks dédiés et réutiliser les composants UI.

3. **Tests**
 - Backend : Jest + Supertest pour chaque endpoint critique, viser ~70 % de couverture.
  - Frontend : React Testing Library + Vitest (Node 20), privilégier les tests orientés utilisateur et veiller à encapsuler les composants dépendants du router ou du `CartProvider` dans les wrappers adéquats (`MemoryRouter`, `CartProvider`).

4. **Accessibilité & UX**
   - Utiliser des libellés explicites, des rôles ARIA si nécessaire, et des composants Tailwind cohérents.

5. **Docker & CI/CD**
   - Les services doivent être configurés pour fonctionner via `docker-compose up` avec MongoDB, backend et frontend.

6. **Copilot doit**
 - Proposer des tests unitaires dès qu il génère une nouvelle fonctionnalité.
 - Documenter les nouvelles routes dans le README quand c est pertinent.
  - Mettre à jour les données de seed (Pikachu V / Charizard GX) si de nouveaux produits sont ajoutés.
