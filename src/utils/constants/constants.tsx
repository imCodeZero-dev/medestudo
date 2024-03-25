export const baseURL = "https://medestudo.onrender.com/api/v1";
export const CLOUDINARY_CLOUD_NAME = "dkzlc4bhv";
export const CLOUDINARY_UPLOAD_PRESET = "medestudo";
export const CLOUDINARY_FOLDER = "medestudo";
// export const CLOUDINARY_API_KEY = '272835819821555'
// export const CLOUDINARY_API_SECRET = 'oBauWSezU370wL-fI5ukx7eHtUY'
// export const CLOUDINARY_API_ENVIRONMENT_VARIABLE = 'CLOUDINARY_URL=cloudinary://272835819821555:oBauWSezU370wL-fI5ukx7eHtUY@dvgprzcdg'

export const passwordRegex =
  /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;

export const handleImageURL = (file: string) => {
  if (!file) {
    return "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg";
  }
  return file;
};

