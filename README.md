
# API Text Extract External

This project demonstrates how to externally call an API to extract text from a PDF file while avoiding CORS errors.

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/api-text-extract-external.git
   cd api-text-extract-external
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the root directory with the following content:**
   ```env
   # API URLs
   EXTRACT_TEXT_URL
   GET_TOKEN_URL

   # Authentication Credentials
   MYAPP_USERNAME
   MYAPP_PASSWORD
   ```

4. **Run the server:**
   ```bash
   node server.js
   ```

## Usage

1. Open your web browser and navigate to `http://localhost:3000`.
2. You will see an HTML file with an upload form.
3. Upload a PDF file using the form.
4. The server will handle the file upload, obtain an authentication token, and call the external API to extract text from the PDF.

## Warnings and Signs

- **Security Warning:** This setup is rough and not secure. Do not use it in a production environment.
- **File Handling:** Currently, the setup uses Multer to handle file uploads. The uploaded file is stored as a `File` extension file, not as a PDF. This should be fixed for proper file handling and security.
- **External API Calls:** This project demonstrates how to call an external API while avoiding CORS errors. Make sure to handle authentication and sensitive data securely.

## Notes

- This project is for demonstration purposes only. It shows how to handle file uploads and make external API calls using Node.js and Express.
- Always consider security best practices when handling file uploads and external API calls in your projects.

---

Feel free to modify this `README.md` as needed for your specific project requirements.

---



