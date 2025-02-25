import multer from 'multer'

// to store file in memory before upload
// Multer Storage (Saves file temporarily)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Temporary folder
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({ storage,
    limits: { fileSize: 1 * 1024 * 1024 },   // 1MB max image
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true)
        } else {
            cb(new Error('Only images are allowed'), false)
        }
    }
   });

export default upload