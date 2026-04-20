import { app } from './app';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '..', '.env') })

const port = 4040;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});