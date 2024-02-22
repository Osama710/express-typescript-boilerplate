import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
// import { expressjwt as jwt } from 'express-jwt';
// import multipart from 'connect-multiparty';
import multer from 'multer';

dotenv.config();

const app = express();

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Register express-jwt middleware
// app.use(
//   jwt({ secret: process.env.JWT_SECRET }).unless({ path: ["/public"] })
// );

// Register connect-multiparty middleware
const upload = multer({ dest: 'uploads/' })

// Serve static files
// app.use("/public", express.static(path.join(__dirname, "public")));

export default app;
