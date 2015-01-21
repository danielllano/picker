# == Schema Information
#
# Table name: locations
#
#  id         :integer          not null, primary key
#  city_id    :integer
#  address    :string(255)
#  latitude   :float
#  longitude  :float
#  user_id    :integer
#  created_at :datetime
#  updated_at :datetime
#

require 'test_helper'

class LocationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
