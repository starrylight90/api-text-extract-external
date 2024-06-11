import express from 'express';
import cors from 'cors';
import multer from 'multer';
import FormData from 'form-data';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
// Code start
// Load environment variables from .env file
dotenv.config();
// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Configure multer for file upload
const upload = multer({ storage: multer.memoryStorage() });

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'test.html'));
});

// Handle file upload
app.post('/upload', upload.single('pdf'), async (req, res) => {
    try {
        // Step 1: Get the token
        const token = await getUsernameAndPasswordToken();

        if (!token) {
            res.status(500).send('Failed to get token');
            return;
        }

        // Step 2: Read the file
        const file = req.file;
        if (!file) {
            res.status(400).send('No file uploaded');
            return;
        }

        // Step 3: Upload the file with authorization header and file as form-data
        const formData = new FormData();
        formData.append('document', file.buffer, {
            filename: file.originalname,
            contentType: file.mimetype
        });

        const headers = {
            ...formData.getHeaders(),
            'token': token // Use 'token' as the key
        };

        const response = await fetch(process.env.EXTRACT_TEXT_URL, {
            method: 'POST',
            headers: headers,
            body: formData
        });

        if (!response.ok) {
            throw new Error(`File upload failed with status ${response.status}`);
        }

        // Step 4: Return the response from the server
        const result = await response.text();
        res.send(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error');
    }
});

// Function to get the token
const getUsernameAndPasswordToken = async () => {
    try {
        const response = await fetch(process.env.GET_TOKEN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: process.env.MYAPP_USERNAME,
                password: process.env.MYAPP_PASSWORD
            })
        });

        if (!response.ok) {
            throw new Error(`Token request failed with status ${response.status}`);
        }

        const data = await response.json();
        const token = data.token;
        return token;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
