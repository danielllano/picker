class Location < ActiveRecord::Base
  belongs_to :city
  belongs_to :user
end
