class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.references :city, index: true
      t.string :address
      t.float :latitude
      t.float :longitude
      t.references :user, index: true

      t.timestamps
    end
  end
end
