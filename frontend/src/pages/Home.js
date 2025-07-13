import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, MapPin } from 'lucide-react';

const HOTEL_SERVICE_URL = 'https://HOTEL_SERVICE_URL/api/hotels'; // Placeholder

const Home = () => {
  const [featuredHotels, setFeaturedHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch(HOTEL_SERVICE_URL);
        if (!res.ok) throw new Error('Failed to fetch hotels');
        const hotels = await res.json();
        setFeaturedHotels(hotels.slice(0, 3)); // Show top 3 as featured
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Find Your Perfect Stay</h1>
          <p className="text-xl mb-8 max-w-2xl">
            Discover amazing hotels and book your next adventure with ease
          </p>
          <Link
            to="/hotels"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
          >
            <Search className="h-5 w-5" />
            <span>Explore Hotels</span>
          </Link>
        </div>
      </section>

      {/* Featured Hotels */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Hotels</h2>
        {loading ? (
          <div>Loading hotels...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src={hotel.images && hotel.images[0] ? hotel.images[0] : ''}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded text-sm font-semibold text-green-600">
                    ${hotel.pricePerNight}/night
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{hotel.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-600">{hotel.rating}</span>
                    </div>
                    <Link
                      to={`/hotel/${hotel.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-white rounded-2xl p-8 shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Why Choose HotelBooker?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Search</h3>
            <p className="text-gray-600">
              Find the perfect hotel with our advanced search and filtering options
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Best Prices</h3>
            <p className="text-gray-600">
              Get the best rates and exclusive deals on hotel bookings
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Booking</h3>
            <p className="text-gray-600">
              Safe and secure booking process with instant confirmation
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 