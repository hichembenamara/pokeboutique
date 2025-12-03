const { isValidObjectId } = require('mongoose');
const Card = require('../models/card.model');

function buildCardQuery(filters = {}) {
  const query = {};
  if (filters.type) {
    query.type = filters.type;
  }
  if (filters.rarity) {
    query.rarity = filters.rarity;
  }
  if (filters.series) {
    query.series = filters.series;
  }

  const tags = Array.isArray(filters.tags)
    ? filters.tags
    : typeof filters.tags === 'string'
    ? filters.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
    : [];
  if (tags.length) {
    query.tags = { $in: tags };
  }

  if (filters.search) {
    query.name = { $regex: filters.search, $options: 'i' };
  }

  return query;
}

async function listCards(filters = {}) {
  const query = buildCardQuery(filters);
  return Card.find(query).lean();
}

async function getCardByIdentifier(identifier) {
  if (!identifier) {
    return null;
  }

  if (isValidObjectId(identifier)) {
    return Card.findById(identifier).lean();
  }

  return Card.findOne({ slug: identifier.toString().toLowerCase() }).lean();
}

module.exports = {
  listCards,
  getCardByIdentifier,
};
