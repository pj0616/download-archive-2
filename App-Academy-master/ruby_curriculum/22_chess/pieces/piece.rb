require 'colorize'

class Piece
  attr_accessor :val, :color

  def initialize(color, val)
    @val = val
    @color = color
  end

  def to_color
    @val.colorize(@color)
  end

  def valid_moves
    self
  end

end


