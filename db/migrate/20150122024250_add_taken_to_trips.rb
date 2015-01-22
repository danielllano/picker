class AddTakenToTrips < ActiveRecord::Migration
  def change
    add_column :trips, :taken, :boolean, :default => false
  end
end
