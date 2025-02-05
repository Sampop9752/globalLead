// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// API configuration
const API_URL = 'https://media8-ldlt.irev.com/api/affiliates/v2/leads';
const API_TOKEN = '2uihbz056e6vdiv4pv1d6f6ar2ddyzx9';

app.use(cors());
app.use(bodyParser.json());

// Endpoint to push leads
app.post('/api/leads', async (req, res) => {
    try {
        const response = await axios.post(API_URL, req.body, {
            headers: {
                'Authorization': API_TOKEN,
                'Content-Type': 'application/json',
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error forwarding to API:', error);
        res.status(error.response ? error.response.status : 500).json({ message: error.message });
    }
});

// Endpoint to get leads
app.get('/api/leads', async (req, res) => {
    const {
        created_from,
        created_to,
        page = 1,
        per_page = 20,
        goal_type_uuid,
        is_test,
    } = req.query;

    const params = {
        created_from,
        created_to,
        page,
        per_page,
        goal_type_uuid,
        is_test,
    };

    try {
        const response = await axios.get(API_URL, {
            headers: {
                'Authorization': API_TOKEN,
            },
            params,
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching leads from API:', error);
        res.status(error.response ? error.response.status : 500).json({ message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
