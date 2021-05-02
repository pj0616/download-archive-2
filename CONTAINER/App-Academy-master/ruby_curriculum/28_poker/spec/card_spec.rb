require 'rspec'
require 'card'

describe Card do 
  subject(:card) { Card.new(3, :spades) }

  describe "#initialize" do 
    it 'sets the rank and suit for a card' do 
      expect(card.rank).to eq(3)
      expect(card.suit).to eq(:spades)
    end
  end

  describe "#stringify" do 
    it 'returns the sentence version of the rank and suit of a card' do
      expect(card.stringify).to eq('3 of spades')
    end
  end

end