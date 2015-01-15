class Vehicle < ActiveRecord::Base
  belongs_to :brand
  belongs_to :car_model
end
