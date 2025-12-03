const { Router } = require('express');
const cardController = require('../controllers/cardController');

const router = Router();

router.get('/', cardController.getCards);
router.get('/:cardId', cardController.getCard);

module.exports = router;
