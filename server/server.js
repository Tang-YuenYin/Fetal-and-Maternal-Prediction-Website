const express = require('express');
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs } = require("firebase/firestore");
const app = express();
const cors = require('cors');
require("dotenv").config();

app.use(cors());

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
};

// Initialize Firebase outside the route handler
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Define the function to fetch records
async function getMaternalRecords() {
    const recordsCol = collection(db, 'Maternal');
    const recordSnapshot = await getDocs(recordsCol);
    const recordList = recordSnapshot.docs.map(doc => doc.data());
    return recordList;
}

// Define the function to fetch records
async function getFetalRecords() {
    const recordsCol = collection(db, 'Fetal');
    const recordSnapshot = await getDocs(recordsCol);
    const recordList = recordSnapshot.docs.map(doc => doc.data());
    return recordList;
}


// API endpoint to retrieve Firebase configuration
app.get('/maternal-record', async (req, res) => {
    try {
        const records = await getMaternalRecords() ;
        res.json(records);
    } catch (error) {
        console.error('Error fetching records:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API endpoint to retrieve Firebase configuration
app.get('/fetal-record', async (req, res) => {
    try {
        const records = await getFetalRecords() ;
        res.json(records);
    } catch (error) {
        console.error('Error fetching records:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});