# Prompt Copilot — Génération de tests unitaires

Tu es chargé d écrire ou compléter les tests unitaires / d intégration du projet PokéBoutique.

## Objectif général
- Couverture globale ≥ 70 % (lignes/branches/fonctions) en priorisant : catalogue, panier, simulation de paiement, affichage des erreurs UI.
- Tests écrits d abord sur les briques métier (services/hooks) puis sur les routes/composants.

## Organisation & outils
- Backend : dossier `backend/tests` (sous-dossiers `services/`, `integration/`). Utilise **Jest** + **Supertest** avec Mongo mémoire ou mocks.
- Frontend : garder les tests dans `frontend/src/__tests__` (ou proches des features) classés par page/composant/hook. Utilise **Vitest** + **React Testing Library** (Node 20). Emballe les composants qui dépendent du router ou du `CartProvider` dans les wrappers adaptés (`MemoryRouter`, `CartProvider`).
- Chaque module important doit avoir son fichier de tests homonyme.

## Axes obligatoires (pour chaque module testé)
1. **Core Functionality Tests** – cas nominaux (liste des cartes, ajout au panier, total calculé, rendu catalogue correct).
2. **Input Validation Tests** – entrées invalides (quantités < 1, props manquantes, slug inexistant, saisie hors bornes).
3. **Error Handling Tests** – erreurs internes/réseau/validation (DB KO, API KO, panier vide au checkout, affichage des messages d erreur côté UI).
4. **Side Effects Tests** – effets observables (sauvegardes Mongoose, appels API, mise à jour d état hook, navigation après paiement).
> Chaque bloc `describe` doit couvrir ces quatre angles quand c est pertinent.

## Pattern AAA obligatoire
- Arrange : préparer mocks/fixtures (Mongo mémoire, msw, etc.).
- Act : exécuter la fonction ou l interaction utilisateur.
- Assert : vérifier valeurs, états internes, appels de dépendances, modifications DOM.

## Mocking & isolation
- Backend : ne jamais toucher la vraie DB pour les unitaires. Mock Mongoose ou injecte des doubles. Pour l intégration, Mongo mémoire ou mocks des repositories.
- Frontend : ne jamais faire d appel réseau réel. Mock les modules d API (axios) ou utilise `msw`. Utilise `screen`/`userEvent` pour manipuler l UI.

## Priorités de couverture
1. Services produits/panier/paiement simulé.
2. Contrôleurs REST principaux.
3. Hooks `useCart`, `useProducts`.
4. Pages Catalogue, Panier, Checkout (scénarios succès/erreur).
5. Composants purement visuels optionnels si l objectif 70 % est atteint.

Respecte scrupuleusement cette stratégie pour toute proposition de tests.
