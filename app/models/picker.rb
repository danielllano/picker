# == Schema Information
#
# Table name: pickers
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  company_id :integer
#  created_at :datetime
#  updated_at :datetime
#

class Picker < ActiveRecord::Base
  belongs_to :user
  belongs_to :company
end
