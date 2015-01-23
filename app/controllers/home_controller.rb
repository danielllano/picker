class HomeController < ApplicationController
  before_action :authenticate_user!, except: :welcome

  def start
    if current_user.picker.nil?
      @cities = City.all
    else
      @trips = Trip.where(taken: false).map { |trip| { trip_id: trip.id, origin_lat: trip.origin_lat, origin_lng: trip.origin_lng, dest_lat: trip.dest_lat, dest_lng: trip.dest_lng }  }
    end 
  end

  def welcome
  end

  def find
    @trip = Trip.new
    @trip.user_id = current_user.id
    @trip.origin_lat = params[:originLat]
    @trip.origin_lng = params[:originLng]
    @trip.dest_lat = params[:destLat]
    @trip.dest_lng = params[:destLng]
    if @trip.save
      Pusher.trigger('active_trips', 'new-trip', { trip_id: @trip.id, origin_lat: @trip.origin_lat, origin_lng: @trip.origin_lng, dest_lat: @trip.dest_lat, dest_lng: @trip.dest_lng } )
    end
  end

  def take_service
    @trip = Trip.find(params[:trip_id])
    @trip.taken = true
    @trip.picker_id = current_user.picker.id
    if @trip.save
      Pusher.trigger('active_trips', 'taken-trip', { trip_id: @trip.id, user_id: @trip.user_id } )
    end
  end

  def cancel_trip
    @trip = current_user.trips.last
    if @trip.destroy
      Pusher.trigger('active_trips', 'delete-trip', { trip_id: @trip.id } )
      redirect_to root_path
    end 
  end

  def arrived_picker
    @trip = Trip.find(params[:trip_id])
    Pusher.trigger('active_trips', 'arrived-trip', { trip_id: @trip.id, user_id: @trip.user_id } )
    redirect_to root_path
  end

  def arrived_client
    @trip = Trip.find(params[:trip_id])
  end

  def service_taken
    @trip = Trip.find(params[:trip_id])
  end

  private

  def location_params
    params.require(:location).permit(:city_id, :address)
  end

end
