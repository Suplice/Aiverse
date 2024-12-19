

const ProfilePicture = () => {
  const defaultImage = "samochód.png"

  return (
    <div className="flex justify-center items-center h-3/4 bg-gray-100">
      <div className="w-48 h-48 rounded-full overflow-hidden flex justify-center items-center">
        <img src={defaultImage} alt="Zdjęcie" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default ProfilePicture;