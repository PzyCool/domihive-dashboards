// src/dashboards/rent/components/property-details/components/tabs/MediaTab/VideoSection.jsx
import React, { useState, useRef, useEffect } from 'react';

const VideoSection = ({ property }) => {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAllVideos, setShowAllVideos] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const videos = [
    {
      id: 1,
      title: 'Property Walkthrough',
      description: 'Full tour of the apartment from entrance to balcony',
      thumbnail: 'https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '5:30',
      type: 'walkthrough',
      uploadDate: '2 days ago'
    },
    {
      id: 2,
      title: 'Neighborhood Tour',
      description: 'Explore the surrounding area and local amenities',
      thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '3:45',
      type: 'neighborhood',
      uploadDate: '1 week ago'
    },
    {
      id: 3,
      title: 'Amenities Showcase',
      description: 'Swimming pool, gym, and other building facilities',
      thumbnail: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '4:15',
      type: 'amenities',
      uploadDate: '3 days ago'
    },
    {
      id: 4,
      title: 'Kitchen Features',
      description: 'Detailed look at kitchen appliances and storage',
      thumbnail: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '2:30',
      type: 'features',
      uploadDate: '5 days ago'
    },
    {
      id: 5,
      title: '360° Virtual Tour',
      description: 'Interactive 360-degree view of the property',
      thumbnail: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '6:15',
      type: 'virtual',
      uploadDate: '1 day ago'
    },
    {
      id: 6,
      title: 'Owner Interview',
      description: 'Hear from the property owner about special features',
      thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '3:20',
      type: 'interview',
      uploadDate: '4 days ago'
    }
  ];

  const visibleVideos = showAllVideos ? videos : videos.slice(0, 3);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, you would control an actual video element here
    console.log(isPlaying ? 'Pausing video' : 'Playing video');
  };

  const handleVideoSelect = (index) => {
    setActiveVideo(index);
    setIsPlaying(true);
    // Reset play state when switching videos
    setTimeout(() => {
      // Simulate video switching
      console.log(`Switched to video: ${videos[index].title}`);
    }, 300);
  };

  const handleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const formatDuration = (duration) => {
    return duration;
  };

  const getVideoTypeBadge = (type) => {
    const badges = {
      walkthrough: { label: 'Walkthrough', color: 'bg-[#9f7539]' },
      neighborhood: { label: 'Area', color: 'bg-blue-500' },
      amenities: { label: 'Amenities', color: 'bg-emerald-500' },
      features: { label: 'Features', color: 'bg-purple-500' },
      virtual: { label: '360°', color: 'bg-orange-500' },
      interview: { label: 'Interview', color: 'bg-pink-500' }
    };
    return badges[type] || { label: 'Video', color: 'bg-gray-500' };
  };

  return (
    <div className="video-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-2xl font-bold text-[#0e1f42]">Video Tours</h3>
          <p className="text-[#64748b] mt-1">Watch detailed tours of the property and area</p>
        </div>
        {videos.length > 3 && (
          <button 
            onClick={() => setShowAllVideos(!showAllVideos)}
            className="px-4 py-2 bg-[#f8fafc] text-[#0e1f42] rounded-lg border border-[#e2e8f0] hover:bg-[#e2e8f0] hover:border-[#cbd5e1] transition-all duration-300 font-medium whitespace-nowrap flex items-center gap-2"
          >
            {showAllVideos ? 'Show Less' : `View All Videos (${videos.length})`}
            <svg 
              className={`w-4 h-4 transition-transform duration-300 ${showAllVideos ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>

      {/* Main Video Player */}
      <div className="mb-8" ref={containerRef}>
        <div className="relative rounded-2xl overflow-hidden bg-black shadow-xl">
          <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
            {isPlaying ? (
              <div className="relative w-full h-full">
                {/* Simulated Video Player */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 border-4 border-white/30 rounded-full flex items-center justify-center animate-pulse mx-auto mb-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-white/80 text-lg font-medium">Video is playing...</p>
                  </div>
                </div>
                
                {/* Video Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={handlePlayPause}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
                      >
                        {isPlaying ? (
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </button>
                      <div className="flex-1 mx-4">
                        <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                          <div className="h-full bg-[#9f7539] w-1/3"></div>
                        </div>
                      </div>
                      <div className="text-white text-sm">
                        1:45 / {videos[activeVideo].duration}
                      </div>
                    </div>
                    <button
                      onClick={handleFullscreen}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
                    >
                      {isFullscreen ? (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5M15 15l5.25 5.25" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div 
                className="text-center cursor-pointer group"
                onClick={handlePlayPause}
              >
                <div className="relative">
                  <img
                    src={videos[activeVideo].thumbnail}
                    alt={videos[activeVideo].title}
                    className="w-full max-w-2xl rounded-lg opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-[#9f7539] rounded-full flex items-center justify-center mx-auto transform group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="text-white text-lg font-medium mt-6 group-hover:text-[#9f7539] transition-colors duration-300">Click to play video tour</p>
              </div>
            )}
          </div>
          
          {/* Video Info Overlay */}
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-6">
            <div className="flex items-start justify-between">
              <div className="text-white max-w-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`${getVideoTypeBadge(videos[activeVideo].type).color} text-white text-xs px-2 py-1 rounded-full`}>
                    {getVideoTypeBadge(videos[activeVideo].type).label}
                  </span>
                  <span className="text-gray-300 text-sm">Uploaded {videos[activeVideo].uploadDate}</span>
                </div>
                <h4 className="text-2xl font-bold mb-2">{videos[activeVideo].title}</h4>
                <p className="text-gray-300">{videos[activeVideo].description}</p>
              </div>
            </div>
          </div>
          
          {/* Duration Badge */}
          <div className="absolute top-6 right-6 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full font-medium flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {videos[activeVideo].duration}
          </div>
        </div>
      </div>

      {/* Video Thumbnails */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleVideos.map((video, index) => {
          const badge = getVideoTypeBadge(video.type);
          return (
            <div
              key={video.id}
              className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 group ${
                activeVideo === index 
                  ? 'ring-3 ring-[#9f7539] transform scale-[1.02] shadow-lg' 
                  : 'hover:ring-2 hover:ring-[#9f7539]/50 hover:shadow-md'
              }`}
              onClick={() => handleVideoSelect(index)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-between p-4">
                  <div className="flex justify-between items-start">
                    <span className={`${badge.color} text-white text-xs px-2 py-1 rounded-full`}>
                      {badge.label}
                    </span>
                    <span className="bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {video.duration}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
                      activeVideo === index 
                        ? 'bg-[#9f7539] scale-125' 
                        : 'bg-white/20 group-hover:bg-[#9f7539] group-hover:scale-125'
                    }`}>
                      {activeVideo === index && isPlaying ? (
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-white ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Video Info */}
              <div className="p-4 bg-white">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-[#0e1f42] truncate flex-1 mr-2">{video.title}</h5>
                  {activeVideo === index && (
                    <span className="text-xs text-[#9f7539] font-medium bg-[#9f7539]/10 px-2 py-1 rounded">Now Playing</span>
                  )}
                </div>
                <p className="text-[#64748b] text-sm line-clamp-2 mb-2">{video.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{video.uploadDate}</span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {video.duration}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats Bar */}
      <div className="mt-8 p-4 bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#0e1f42]">{videos.length}</div>
            <div className="text-sm text-[#64748b]">Total Videos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#0e1f42]">24m</div>
            <div className="text-sm text-[#64748b]">Total Duration</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#0e1f42]">HD</div>
            <div className="text-sm text-[#64748b]">Video Quality</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#0e1f42]">EN</div>
            <div className="text-sm text-[#64748b">Audio Language</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;