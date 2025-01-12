import app from './src/app.js';

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

