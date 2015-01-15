class CreatePickers < ActiveRecord::Migration
  def change
    create_table :pickers do |t|
      t.references :user, index: true
      t.references :company, index: true

      t.timestamps
    end
  end
end
