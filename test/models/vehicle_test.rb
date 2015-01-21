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

require 'test_helper'

class VehicleTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
