# == Schema Information
#
# Table name: vehicles
#
#  id           :integer          not null, primary key
#  plate        :string(255)
#  car_model_id :integer
#  color        :string(255)
#  created_at   :datetime
#  updated_at   :datetime
#  car_brand_id :integer
#

class Vehicle < ActiveRecord::Base
  belongs_to :car_brand
  belongs_to :car_model
  has_and_belongs_to_many :users
end
