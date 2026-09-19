// server.js (Backend Node.js environment)
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

app.use(cors()); // Allows your HTML frontend to call this API
app.use(express.json()); // Parses incoming JSON data

// API Endpoint to CREATE a new Bible Study from Phase 2
app.post('/api/studies', async (req, res) => {
    try {
        const { name, topic, description, meetingDay, meetingTimeUTC, isPublic } = req.body;

        // Prisma saves the data to the PostgreSQL database
        const newStudy = await prisma.bibleStudy.create({
            data: {
                name: name,
                topic: topic,
                description: description,
                meetingDay: meetingDay,
                meetingTimeUTC: meetingTimeUTC,
                isPublic: isPublic,
                hostId: "user-uuid-placeholder" // In a real app, this comes from authentication
            }
        });

        res.status(201).json(newStudy);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create study room" });
    }
});

// API Endpoint to FETCH all Bible Studies
app.get('/api/studies', async (req, res) => {
    try {
        const studies = await prisma.bibleStudy.findMany({
            include: { host: true } // Fetches the user who created it
        });
        res.json(studies);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch studies" });
    }
});

app.listen(3000, () => console.log('Kingdom Talk API running on port 3000'));