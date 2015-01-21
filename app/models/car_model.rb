# == Schema Information
#
# Table name: car_models
#
#  id           :integer          not null, primary key
#  car_model    :string(255)
#  created_at   :datetime
#  updated_at   :datetime
#  car_brand_id :integer
#

class CarModel < ActiveRecord::Base
  belongs_to :car_brand
  has_many :vehicles
end
