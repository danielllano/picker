class HomeController < ApplicationController
  before_action :authenticate_user!, except: :welcome

  def start
    if current_user.picker.nil?
      @cities = City.all
    else
      @trips = Trip.all.map { |trip| { trip_id: trip.id, origin_lat: trip.origin_lat, origin_lng: trip.origin_lng, dest_lat: trip.dest_lat, dest_lng: trip.dest_lng }  }
    end 
  end

  def welcome
  end

  def find
    @trip = Trip.new
    @trip.origin_lat = params[:originLat]
    @trip.origin_lng = params[:originLng]
    @trip.dest_lat = params[:destLat]
    @trip.dest_lng = params[:destLng]
    @trip.save
  end

  def take_service
    @trip = Trip.find(params[:trip_id])
    @trip.taken = true
    @trip.save
  end

  private

  def location_params
    params.require(:location).permit(:city_id, :address)
  end

end
