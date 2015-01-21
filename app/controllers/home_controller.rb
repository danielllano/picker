class HomeController < ApplicationController

  def start
    @cities = City.all
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

  private

  def location_params
    params.require(:location).permit(:city_id, :address)
  end

end
