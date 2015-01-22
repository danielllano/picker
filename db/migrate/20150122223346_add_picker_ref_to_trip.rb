class AddPickerRefToTrip < ActiveRecord::Migration
  def change
    add_reference :trips, :picker, index: true
  end
end
