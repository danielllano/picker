class AddCarBrandRefToVehicles < ActiveRecord::Migration
  def change
    add_reference :vehicles, :car_brand, index: true
  end
end
