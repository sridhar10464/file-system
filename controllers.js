const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Function to process a file
function processFile(filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          // Perform file processing logic here
          const processedData = data.toUpperCase();
  
          // Simulate asynchronous processing
          setTimeout(() => {
            resolve(processedData);
          }, 2000); // 2 seconds delay
        }
      });
    }).catch((err) => {
      console.error(`Error processing file: ${filePath}`);
      console.error(err);
      throw err; // Re-throw the error to propagate it to the caller
    });
  }
  
  // Function to process files sequentially using the event loop
  async function processFilesSequentially() {
    if (filesToProcess.length === 0) {
      console.log('All files processed!');
      return;
    }
  
    const currentFile = filesToProcess.shift();
  
    console.log(`Processing file: ${currentFile}`);
  
    try {
      const processedData = await processFile(currentFile);
      console.log(`Processed file: ${currentFile}`);
      console.log(`Processed data: ${processedData}`);
    } catch (err) {
      console.error(`Error processing file: ${currentFile}`);
      console.error(err);
    }
  
    processFilesSequentially(); // Process the next file
}
  
const uploadFile = (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while uploading the file.' });
    } else {
      const filePath = req.file.path;
      processFile(filePath);
      res.status(200).json({ message: 'File uploaded successfully.' });
    }
  });
};

module.exports = { uploadFile };

