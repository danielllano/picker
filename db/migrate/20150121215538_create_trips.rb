class CreateTrips < ActiveRecord::Migration
  def change
    create_table :trips do |t|
      t.references :user, index: true
      t.float :origin_lat
      t.float :origin_lng
      t.float :dest_lat
      t.float :dest_lng

      t.timestamps
    end
  end
end
