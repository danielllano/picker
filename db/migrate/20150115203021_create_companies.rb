class CreateCompanies < ActiveRecord::Migration
  def change
    create_table :companies do |t|
      t.string :name
      t.string :nit

      t.timestamps
    end
    add_index :companies, :nit, unique: true
  end
end
