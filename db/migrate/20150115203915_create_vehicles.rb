class CreateVehicles < ActiveRecord::Migration
  def change
    create_table :vehicles do |t|
      t.string :plate
      t.references :brand, index: true
      t.references :car_model, index: true
      t.string :color

      t.timestamps
    end
    add_index :vehicles, :plate, unique: true
  end
end
