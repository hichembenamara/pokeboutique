const cardService = require('../../src/services/cardService');
const Card = require('../../src/models/card.model');

jest.mock('../../src/models/card.model');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('cardService.listCards', () => {
  it('retourne la liste complète quand aucun filtre nest fourni (Core Functionality)', async () => {
    const expected = [{ name: 'Pikachu' }];
    const lean = jest.fn().mockResolvedValue(expected);
    Card.find.mockReturnValue({ lean });

    const result = await cardService.listCards();

    expect(Card.find).toHaveBeenCalledWith({});
    expect(result).toEqual(expected);
  });

  it('filtre correctement par type, rareté et tags (Input Validation)', async () => {
    const lean = jest.fn().mockResolvedValue([]);
    Card.find.mockReturnValue({ lean });

    await cardService.listCards({ type: 'Fire', rarity: 'Rare', tags: 'promo,starter' });

    expect(Card.find).toHaveBeenCalledWith({ type: 'Fire', rarity: 'Rare', tags: { $in: ['promo', 'starter'] } });
  });
});

describe('cardService.getCardByIdentifier', () => {
  const mockCard = { _id: '1', name: 'Bulbasaur' };

  beforeEach(() => {
    Card.findById = jest.fn().mockReturnValue({ lean: jest.fn().mockResolvedValue(mockCard) });
    Card.findOne = jest.fn().mockReturnValue({ lean: jest.fn().mockResolvedValue(mockCard) });
  });

  it('retourne une carte par ObjectId valide (Core Functionality)', async () => {
    const result = await cardService.getCardByIdentifier('507f1f77bcf86cd799439011');
    expect(Card.findById).toHaveBeenCalled();
    expect(result).toEqual(mockCard);
  });

  it('recherche par slug lorsque l identifiant nest pas un ObjectId (Core Functionality)', async () => {
    const result = await cardService.getCardByIdentifier('pikachu-v');
    expect(Card.findOne).toHaveBeenCalledWith({ slug: 'pikachu-v' });
    expect(result).toEqual(mockCard);
  });

  it('retourne null si aucun identifiant nest fourni (Input Validation)', async () => {
    const result = await cardService.getCardByIdentifier();
    expect(result).toBeNull();
  });
});
