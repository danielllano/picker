class HomeController < ApplicationController
  
  def start
    @cities = City.all
    @location = Location.new
  end

  def welcome
  end


  private

  def location_params
    params.require(:location).permit(:city_id, :address)
  end

end
