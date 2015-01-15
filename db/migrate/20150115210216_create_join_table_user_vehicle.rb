class CreateJoinTableUserVehicle < ActiveRecord::Migration
  def change
    create_join_table :users, :vehicles do |t|
      t.index :user_id
      t.index :vehicle_id
    end
  end
end
