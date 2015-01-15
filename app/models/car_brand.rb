class CarBrand < ActiveRecord::Base
  has_many :car_models, dependent: :destroy
  has_many :vehicles
end
