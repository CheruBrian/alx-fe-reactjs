function UserProfile() {
 return (
    <div className="mx-auto p-4 sm:p-4 md:p-8 bg-white rounded-2xl shadow max-w-xs sm:max-w-xs md:max-w-sm">
      <div className="flex flex-col items-center text-center">
        <img
          src={user.profileImage}
          alt="Profile"
          className="rounded-full w-24 h-24 sm:w-24 sm:h-24 md:w-36 md:h-36 object-cover"
        />

        <h2 className="mt-4 font-semibold text-lg sm:text-lg md:text-xl">
          {user.name}
        </h2>

        <p className="text-gray-600 text-sm sm:text-sm md:text-base mt-2">
          {user.bio}
        </p>
      </div>
    </div>
  );
}

export default UserProfile;
