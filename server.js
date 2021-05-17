import express from 'express';
import mongoose from 'mongoose';

const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('app running on port 5000'));
