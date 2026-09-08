const FixedHeroVideo = () => {
  return (
    <div className="fixed inset-0 w-full h-screen z-0 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        style={{
          boxShadow: '0 0 20px rgba(0, 82, 255, 0.4)',
        }}
      >
        <source
          src="https://assets.mixkit.co/active_storage/videos/preview/32610/large_video_preview.mp4"
          type="video/mp4"
        />
      </video>
      {/* Light overlay for readability in white theme */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]" />
    </div>
  );
};

export default FixedHeroVideo;
