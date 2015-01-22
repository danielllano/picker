# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150122223346) do

  create_table "car_brands", force: true do |t|
    t.string   "brand"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "car_models", force: true do |t|
    t.string   "car_model"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "car_brand_id"
  end

  add_index "car_models", ["car_brand_id"], name: "index_car_models_on_car_brand_id"

  create_table "cities", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "companies", force: true do |t|
    t.string   "name"
    t.string   "nit"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "companies", ["nit"], name: "index_companies_on_nit", unique: true

  create_table "locations", force: true do |t|
    t.integer  "city_id"
    t.string   "address"
    t.float    "latitude"
    t.float    "longitude"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "locations", ["city_id"], name: "index_locations_on_city_id"
  add_index "locations", ["user_id"], name: "index_locations_on_user_id"

  create_table "pickers", force: true do |t|
    t.integer  "user_id"
    t.integer  "company_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "pickers", ["company_id"], name: "index_pickers_on_company_id"
  add_index "pickers", ["user_id"], name: "index_pickers_on_user_id"

  create_table "trips", force: true do |t|
    t.integer  "user_id"
    t.float    "origin_lat"
    t.float    "origin_lng"
    t.float    "dest_lat"
    t.float    "dest_lng"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "taken",      default: false
    t.integer  "picker_id"
  end

  add_index "trips", ["picker_id"], name: "index_trips_on_picker_id"
  add_index "trips", ["user_id"], name: "index_trips_on_user_id"

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "username"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true

  create_table "users_vehicles", id: false, force: true do |t|
    t.integer "user_id",    null: false
    t.integer "vehicle_id", null: false
  end

  add_index "users_vehicles", ["user_id"], name: "index_users_vehicles_on_user_id"
  add_index "users_vehicles", ["vehicle_id"], name: "index_users_vehicles_on_vehicle_id"

  create_table "vehicles", force: true do |t|
    t.string   "plate"
    t.integer  "car_model_id"
    t.string   "color"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "car_brand_id"
  end

  add_index "vehicles", ["car_brand_id"], name: "index_vehicles_on_car_brand_id"
  add_index "vehicles", ["car_model_id"], name: "index_vehicles_on_car_model_id"
  add_index "vehicles", ["plate"], name: "index_vehicles_on_plate", unique: true

end
