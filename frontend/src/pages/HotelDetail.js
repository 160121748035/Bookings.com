import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

const HOTEL_SERVICE_URL = 'https://HOTEL_SERVICE_URL/api/hotels'; // Placeholder
const BOOKING_SERVICE_URL = 'https://BOOKING_SERVICE_URL/api/bookings'; // Placeholder

const HotelDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await fetch(`${HOTEL_SERVICE_URL}/${id}`);
        if (!res.ok) throw new Error('Failed to fetch hotel');
        const data = await res.json();
        setHotel(data);
        setRooms(data.rooms || []); // Assuming hotel-service returns rooms as part of hotel
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHotel();
  }, [id]);

  const handleBooking = async () => {
    if (!user) {
      toast.error('Please sign in to make a booking');
      return;
    }
    if (!checkIn || !checkOut || !selectedRoom) {
      toast.error('Please select check-in, check-out dates and a room');
      return;
    }
    if (checkIn >= checkOut) {
      toast.error('Check-out date must be after check-in date');
      return;
    }
    try {
      const bookingPayload = {
        userId: user.attributes.sub,
        hotelId: hotel.id,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        guests,
        totalPrice: calculateTotalPrice(),
        status: 'pending',
        roomType: selectedRoom.type // If you want to store room type
      };
      const res = await fetch(BOOKING_SERVICE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload),
      });
      if (!res.ok) throw new Error('Failed to create booking');
      toast.success('Booking confirmed! Check your email for confirmation details.');
      setCheckIn(null);
      setCheckOut(null);
      setSelectedRoom(null);
      setGuests(1);
    } catch (error) {
      toast.error('Failed to create booking. Please try again.');
    }
  };

  const calculateTotalPrice = () => {
    if (!checkIn || !checkOut || !selectedRoom) return 0;
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    return selectedRoom.price * nights;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  if (error) {
    return <div className="text-red-600 text-center py-8">{error}</div>;
  }
  if (!hotel) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Hotel not found</h2>
        <p className="text-gray-600">The hotel you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hotel Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-96">
          <img
            src={hotel.images && hotel.images[0] ? hotel.images[0] : ''}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-4xl font-bold mb-2">{hotel.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-1" />
                <span>{hotel.location}</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-1" />
                <span>{hotel.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hotel Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About this hotel</h2>
            <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {hotel.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-600">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Available Rooms */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Rooms</h2>
            <div className="space-y-4">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedRoom?.id === room.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedRoom(room)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{room.type}</h3>
                      <p className="text-gray-600 text-sm mt-1">{room.description}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {room.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-800">${room.price}</div>
                      <div className="text-sm text-gray-500">per night</div>
                      <div className="text-sm text-green-600 mt-1">
                        {room.availableRooms} rooms available
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Book Your Stay</h2>
            {/* Date Selection */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-in Date
                </label>
                <DatePicker
                  selected={checkIn}
                  onChange={(date) => setCheckIn(date)}
                  minDate={new Date()}
                  placeholderText="Select check-in date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-out Date
                </label>
                <DatePicker
                  selected={checkOut}
                  onChange={(date) => setCheckOut(date)}
                  minDate={checkIn || new Date()}
                  placeholderText="Select check-out date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
            </div>
            {/* Price Summary */}
            {selectedRoom && checkIn && checkOut && (
              <div className="border-t pt-4 mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Price Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Room rate (per night)</span>
                    <span>${selectedRoom.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nights</span>
                    <span>{Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${calculateTotalPrice()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Book Button */}
            <button
              onClick={handleBooking}
              disabled={!user || !checkIn || !checkOut || !selectedRoom}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {user ? 'Book Now' : 'Sign in to Book'}
            </button>
            {!user && (
              <p className="text-sm text-gray-500 mt-2 text-center">
                Please sign in to make a booking
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail; 