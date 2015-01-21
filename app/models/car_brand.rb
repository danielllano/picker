# == Schema Information
#
# Table name: car_brands
#
#  id         :integer          not null, primary key
#  brand      :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class CarBrand < ActiveRecord::Base
  has_many :car_models, dependent: :destroy
  has_many :vehicles
end
