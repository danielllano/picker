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

require 'test_helper'

class CarModelTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
