class RemoveBrandFromVehicles < ActiveRecord::Migration
  def change
    remove_column :vehicles, :brand_id, :references
  end
end
