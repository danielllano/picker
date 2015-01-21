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

class Location < ActiveRecord::Base
  geocoded_by :full_address   # can also be an IP address
  after_validation :geocode, :if => :address_changed?
  validates :address, presence: true

  def full_address
    "#{address}, #{city.name}, Colombia"
  end

  belongs_to :city
  belongs_to :user

end
