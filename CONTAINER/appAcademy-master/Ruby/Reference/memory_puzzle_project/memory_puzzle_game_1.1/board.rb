require_relative 'card.rb'

class Board
  
  attr_reader :grid, :alphabets, :bomb_count

  def initialize(size,bombs=false)
    @grid = Array.new(size) { Array.new(size) } # grid of size x size
    @alphabets = ("A".."Z").to_a
    if bombs
      @bomb_count = size / 2 
    else
      @bomb_count = 0
    end
  end

  def render
    # renders the board in a slightly nice way
    print "  #{(0...grid.length).to_a.join(" ")}\n"
    grid.each_with_index do |row,row_idx|
      print "#{row_idx} "
      row.each do |card|
        if card.face_up
          print "#{card.value} "
        else
          print "_ "
        end
      end
      puts
    end
    nil
  end

  def populate 
    # populate the board with random cards (letters)

    self.drop_bombs

    while !self.grid_full?
      card_letter = self.random_letter
      
      card = Card.new(card_letter,false)
      rand_index = self.random_index
      grid[rand_index.first][rand_index.last] = card
      
      card = Card.new(card_letter,false)
      rand_index = self.random_index
      grid[rand_index.first][rand_index.last] = card
      
    end
  end

  def size
    # returns the total elements of the grid
    return grid.length * grid.first.length
  end

  def random_letter
    # returns a random letter from alphabet
    rand = self.alphabets.sample
    self.alphabets.delete(rand)
    return rand
  end

  def random_index
    # returns a random index from the grid
    while true
      random_index = [(0...grid.length).to_a.sample, (0...grid[(0...grid.length).to_a.sample].length).to_a.sample]
      return random_index if self.valid_index(random_index)
    end
  end

  def valid_index(index)
    # returns true if passed index in empty, false otherwise
    x,y = index
    return true if grid[x][y] == nil
    return false
  end

  def within_bounds?(index)
    x,y = index
    if x < self.grid.length && y < self.grid.length
      return true
    else
      return false
    end
  end

  def grid_full?
    # returns true if there are no more empty positions in the grid
    self.grid.each do |row|
      if row.include?(nil)
        return false
      end
    end
    return true
  end

  def won?
    # returns true if all the cards on the grid are face-up
    if self.grid.all? { |row| row.all? { |card| card.face_up } }
      return true
    else
      return false
    end
  end

  def reveal(guessed_pos)
    # reveals a card on the grid at the guessed position
    card_at_pos = grid[guessed_pos.first][guessed_pos.last]

    if !card_at_pos.face_up
      card_at_pos.reveal
      return card_at_pos.value
    end
  end

  def bomb_position
    # renders the bomb positions in a slightly nice way
    print "  #{(0...grid.length).to_a.join(" ")}\n"
    grid.each_with_index do |row,row_idx|
      print "#{row_idx} "
      row.each do |card|
        if card.value == "????"
          print "#{card.value} "
        else
          print "_ "
        end
      end
      puts
    end
    nil
  end

  def drop_bombs
    # populate the board with bombs
    i = 0
    while i < bomb_count
      card_letter = "????"
      
      card = Card.new(card_letter,false)
      rand_index = self.random_index
      grid[rand_index.first][rand_index.last] = card
      
      card = Card.new(card_letter,false)
      rand_index = self.random_index
      grid[rand_index.first][rand_index.last] = card
      i += 1
    end
  end
end