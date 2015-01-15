class AddCarBrandToCarModel < ActiveRecord::Migration
  def change
    add_reference :car_models, :car_brand, index: true
  end
end
