class CarModel < ActiveRecord::Base
  belongs_to :car_brand
  has_many :vehicles
end
