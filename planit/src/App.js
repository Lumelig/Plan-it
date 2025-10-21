import React, { useState } from 'react';
import { Heart, Search, Users, UserCircle, X, Check, HelpCircle, MapPin, Calendar, Clock, User, Menu, Settings, Bell, LogOut } from 'lucide-react';

const PlanitApp = () => {
  const AppLogo = "https://raw.githubusercontent.com/Lumelig/Plan-it/master/planit/src/assets/logo_Plan_it.png"; 
  
  const [activeTab, setActiveTab] = useState('swipe');
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClub, setSelectedClub] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Sample events for swiping
  const events = [
    {
      id: 1,
      title: 'Weekend Hiking Trip',
      date: 'Oct 25, 2025',
      time: '8:00 AM',
      location: 'Black Forest Trail',
      distance: '5.2 km away',
      attendees: 12,
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop',
      host: 'Sarah M.',
      description: 'Join us for a morning hike through beautiful trails!'
    },
    {
      id: 2,
      title: 'Basketball Pickup Game',
      date: 'Oct 22, 2025',
      time: '6:00 PM',
      location: 'Downtown Sports Center',
      distance: '2.1 km away',
      attendees: 8,
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop',
      host: 'Mike T.',
      description: 'Casual 5v5 game, all skill levels welcome!'
    },
    {
      id: 3,
      title: 'Swimming & Brunch',
      date: 'Oct 27, 2025',
      time: '10:00 AM',
      location: 'AquaFit Pool',
      distance: '3.7 km away',
      attendees: 15,
      image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&h=600&fit=crop',
      host: 'Emma K.',
      description: 'Morning swim followed by brunch at the poolside café'
    },
    {
      id: 4,
      title: 'Rock Climbing Session',
      date: 'Oct 23, 2025',
      time: '7:00 PM',
      location: 'ClimbZone Heilbronn',
      distance: '1.5 km away',
      attendees: 10,
      image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&h=600&fit=crop',
      host: 'Alex P.',
      description: 'Indoor climbing for beginners and advanced climbers'
    },
    {
      id: 5,
      title: 'Rock Concert - The Electric Souls',
      date: 'Oct 26, 2025',
      time: '9:00 PM',
      location: 'Rock Arena Heilbronn',
      distance: '4.3 km away',
      attendees: 250,
      image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&fit=crop',
      host: 'Event Crew',
      description: 'Epic rock concert with amazing live performance and energy!'
    },
    {
      id: 6,
      title: 'Techno Night - Rave City',
      date: 'Oct 28, 2025',
      time: '11:00 PM',
      location: 'Club Underground',
      distance: '2.8 km away',
      attendees: 180,
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop',
      host: 'DJ Masters',
      description: 'Non-stop techno beats until sunrise! Best DJs in town.'
    }
  ];

  // Sample clubs
  const clubs = [
    { id: 1, name: 'Swimming', icon: '🏊', members: 234, events: 12, color: 'bg-blue-500' },
    { id: 2, name: 'Climbing', icon: '🧗', members: 189, events: 8, color: 'bg-green-500' },
    { id: 3, name: 'Basketball', icon: '🏀', members: 312, events: 15, color: 'bg-orange-500' },
    { id: 4, name: 'Hiking', icon: '🥾', members: 456, events: 20, color: 'bg-emerald-500' },
    { id: 5, name: 'Yoga', icon: '🧘', members: 278, events: 18, color: 'bg-purple-500' },
    { id: 6, name: 'Running', icon: '🏃', members: 389, events: 22, color: 'bg-red-500' }
  ];

  // Sample friends activity
  const friendsActivity = [
    { id: 1, name: 'Julia S.', action: 'liked', event: 'Beach Volleyball', time: '2h ago', avatar: '👩' },
    { id: 2, name: 'Tom R.', action: 'joined', event: 'Morning Yoga', time: '5h ago', avatar: '👨' },
    { id: 3, name: 'Lisa M.', action: 'liked', event: 'Mountain Biking', time: '1d ago', avatar: '👧' },
    { id: 4, name: 'Max K.', action: 'maybe', event: 'Soccer Match', time: '1d ago', avatar: '🧑' },
    { id: 5, name: 'Anna B.', action: 'joined', event: 'Swimming Lessons', time: '2d ago', avatar: '👩' }
  ];

  const handleSwipe = (direction) => {
    if (currentEventIndex < events.length - 1) {
      setCurrentEventIndex(currentEventIndex + 1);
    } else {
      setCurrentEventIndex(0);
    }
  };

  const renderSwipe = () => {
    const currentEvent = events[currentEventIndex];
    
    return (
      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        <div className="relative flex-1 rounded-2xl overflow-hidden shadow-2xl mb-4">
          <img 
            src={currentEvent.image} 
            alt={currentEvent.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-3xl font-bold mb-2">{currentEvent.title}</h2>
            <div className="flex items-center gap-4 text-sm mb-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {currentEvent.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {currentEvent.time}
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm mb-2">
              <MapPin className="w-4 h-4" />
              <span>{currentEvent.location} • {currentEvent.distance}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4" />
              <span>Hosted by {currentEvent.host}</span>
              <span className="ml-2">• {currentEvent.attendees} going</span>
            </div>
            <p className="mt-3 text-sm text-gray-200">{currentEvent.description}</p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-6 pb-4">
          <button 
            onClick={() => handleSwipe('left')}
            className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          >
            <X className="w-8 h-8 text-red-500" />
          </button>
          <button 
            onClick={() => handleSwipe('up')}
            className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          >
            <HelpCircle className="w-8 h-8 text-yellow-500" />
          </button>
          <button 
            onClick={() => handleSwipe('right')}
            className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Check className="w-8 h-8 text-green-500" />
          </button>
        </div>
      </div>
    );
  };

  const renderSearch = () => {
    return (
      <div className="flex-1 flex flex-col p-4 overflow-y-auto">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events near you..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <MapPin className="w-4 h-4" />
            <span>Events near Heilbronn</span>
          </div>
        </div>

        <div className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="flex">
                <img src={event.image} alt={event.title} className="w-24 h-24 object-cover" />
                <div className="flex-1 p-3">
                  <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">{event.date} • {event.time}</p>
                  <p className="text-xs text-gray-500">{event.distance} • {event.attendees} going</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderClubs = () => {
    return (
      <div className="flex-1 flex flex-col p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Your Clubs</h2>
        
        <div className="grid grid-cols-2 gap-4">
          {clubs.map((club) => (
            <div 
              key={club.id}
              onClick={() => setSelectedClub(club)}
              className="bg-white rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 ${club.color} rounded-full flex items-center justify-center text-2xl mb-3`}>
                {club.icon}
              </div>
              <h3 className="font-semibold text-lg mb-1">{club.name}</h3>
              <p className="text-sm text-gray-600">{club.members} members</p>
              <p className="text-xs text-gray-500">{club.events} upcoming events</p>
            </div>
          ))}
        </div>

        {selectedClub && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedClub(null)}>
            <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 ${selectedClub.color} rounded-full flex items-center justify-center text-3xl`}>
                  {selectedClub.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{selectedClub.name}</h3>
                  <p className="text-gray-600">{selectedClub.members} members</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                Join the {selectedClub.name.toLowerCase()} community and connect with people who share your passion!
              </p>
              <div className="flex gap-3">
                <button className="flex-1 bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors">
                  Join Club
                </button>
                <button 
                  onClick={() => setSelectedClub(null)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderFriends = () => {
    return (
      <div className="flex-1 flex flex-col p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Friends Activity</h2>
        
        <div className="space-y-3">
          {friendsActivity.map((activity) => (
            <div key={activity.id} className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-2xl">
                {activity.avatar}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{activity.name}</p>
                <p className="text-sm text-gray-600">
                  <span className={`font-medium ${
                    activity.action === 'liked' ? 'text-green-600' :
                    activity.action === 'joined' ? 'text-blue-600' :
                    'text-yellow-600'
                  }`}>
                    {activity.action}
                  </span>
                  {' '}{activity.event}
                </p>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

const renderLogo = () => {
  return (
    <div className="w-8 h-8 bg-white rounded-full overflow-hidden flex items-center justify-center p-1">
      <img
        src={AppLogo}
        alt="Plan-it Logo"
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );
};

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {renderLogo()}
          </div>
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-orange-500 rounded-lg transition-colors flex-shrink-0"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Burger Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-white rounded-xl shadow-2xl z-50 w-64 overflow-hidden">
          <div className="p-2">
            <button 
              onClick={() => setMenuOpen(false)}
              className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors text-left"
            >
              <Settings className="w-5 h-5 text-gray-600" />
              <span className="font-medium">Settings</span>
            </button>
            <button 
              onClick={() => setMenuOpen(false)}
              className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors text-left"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="font-medium">Notifications</span>
            </button>
            <button 
              onClick={() => setMenuOpen(false)}
              className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors text-left"
            >
              <User className="w-5 h-5 text-gray-600" />
              <span className="font-medium">Profile</span>
            </button>
            <div className="border-t border-gray-200 my-2"></div>
            <button 
              onClick={() => setMenuOpen(false)}
              className="w-full flex items-center gap-3 p-3 hover:bg-red-50 rounded-lg transition-colors text-left text-red-600"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Log Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Overlay to close menu */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'swipe' && renderSwipe()}
        {activeTab === 'search' && renderSearch()}
        {activeTab === 'clubs' && renderClubs()}
        {activeTab === 'friends' && renderFriends()}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around items-center p-2">
          <button
            onClick={() => setActiveTab('swipe')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              activeTab === 'swipe' ? 'text-orange-600' : 'text-gray-400'
            }`}
          >
            <Heart className="w-6 h-6" fill={activeTab === 'swipe' ? 'currentColor' : 'none'} />
            <span className="text-xs font-medium">Swipe</span>
          </button>
          
          <button
            onClick={() => setActiveTab('search')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              activeTab === 'search' ? 'text-orange-600' : 'text-gray-400'
            }`}
          >
            <Search className="w-6 h-6" />
            <span className="text-xs font-medium">Search</span>
          </button>
          
          <button
            onClick={() => setActiveTab('clubs')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              activeTab === 'clubs' ? 'text-orange-600' : 'text-gray-400'
            }`}
          >
            <Users className="w-6 h-6" />
            <span className="text-xs font-medium">Clubs</span>
          </button>
          
          <button
            onClick={() => setActiveTab('friends')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              activeTab === 'friends' ? 'text-orange-600' : 'text-gray-400'
            }`}
          >
            <UserCircle className="w-6 h-6" />
            <span className="text-xs font-medium">Friends</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanitApp;