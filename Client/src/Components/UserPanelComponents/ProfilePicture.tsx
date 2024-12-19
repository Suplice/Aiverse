

const ProfilePicture = () => {
  const defaultImage = "../public/samochód.png"

  return (
    <div>
      <div className="w-48 h-48 rounded-full overflow-hidden flex justify-center items-center">
        <img src={defaultImage} alt="Zdjęcie" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default ProfilePicture;