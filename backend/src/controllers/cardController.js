const cardService = require('../services/cardService');

async function getCards(req, res, next) {
  try {
    const cards = await cardService.listCards(req.query);
    res.json({ data: cards, message: 'Catalogue chargé' });
  } catch (error) {
    next(error);
  }
}

async function getCard(req, res, next) {
  try {
    const card = await cardService.getCardByIdentifier(req.params.cardId);
    if (!card) {
      return res.status(404).json({ error: 'Carte introuvable' });
    }
    res.json({ data: card, message: 'Carte récupérée' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCards,
  getCard,
};
