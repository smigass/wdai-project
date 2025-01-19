import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Ustal poprawną ścieżkę do katalogu `images` wewnątrz folderu `backend`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagesPath = path.join(__dirname, '../images');

// Endpoint do pobierania obrazów
router.get('/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imageFilePath = path.join(imagesPath, imageName);

    // Sprawdzenie, czy plik istnieje, zanim go zwrócimy
    res.sendFile(imageFilePath, (err) => {
        if (err) {
            console.error(`Error sending image: ${imageName}`, err.message);
            res.status(404).send('Image not found');
        }
    });
});

export default router;
