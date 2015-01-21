class LocationsController < ApplicationController

  def create
  end

  def index
  end


  private

  def location_params
    params.require(:location).permit(:city_id, :address)
  end

end