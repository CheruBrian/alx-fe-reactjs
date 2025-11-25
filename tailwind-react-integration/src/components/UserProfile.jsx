function UserProfile() {
 return (
    <div
      className="
        mx-auto p-4 sm:p-4 md:p-8 
        bg-white rounded-2xl shadow 
        max-w-xs sm:max-w-xs md:max-w-sm
        transition-shadow duration-300 ease-in-out
        hover:shadow-xl
      "
    >
      <div className="flex flex-col items-center text-center">

        {/* Profile Image */}
        <img
          src={user.profileImage}
          alt="Profile"
          className="
            rounded-full object-cover
            w-24 h-24 sm:w-24 sm:h-24 md:w-36 md:h-36
            transition-transform duration-300 ease-in-out
            hover:scale-110
          "
        />

        {/* Heading */}
        <h2
          className="
            mt-4 font-semibold 
            text-lg sm:text-lg md:text-xl 
            text-blue-800
            transition-colors duration-300 
            hover:text-blue-500
          "
        >
          {user.name}
        </h2>

        {/* Paragraph */}
        <p
          className="
            text-gray-600 
            text-sm sm:text-sm md:text-base 
            mt-2
          "
        >
          {user.bio}
        </p>
      </div>
    </div>
  );
}

export default UserProfile;
