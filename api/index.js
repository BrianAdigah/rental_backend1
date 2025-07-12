import express from "express"
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

//Routes
// import leaseRoutes from './routes/lease.controller.js';
// import leasePaymentRoutes from './routes/leasePayment.controller.js';
// import paymentTypeRoutes from './routes/paymentType.controller.js';
// import paymentCategoryRoutes from './routes/paymentCategory.controller.js';
// import residentRoutes from './routes/resident.controller.js';
// import roleRoutes from './routes/role.controller.js';
// import unitRoutes from './routes/unit.controller.js';
import userRoutes from './routes/user.route.js';
app.use(`/api/user`, userRoutes);
// app.use(`/api/lease`, leaseRoutes);
// app.use(`/api/leasePayment`, leasePaymentRoutes);
// app.use(`/api/paymentType`, paymentTypeRoutes);
// app.use(`/api/paymentCategory`, paymentCategoryRoutes);
// app.use(`/api/resident`, residentRoutes);
// app.use(`/api/role`, roleRoutes);
// app.use(`/api/unit`, unitRoutes);



//Database
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));



//Server
app.listen(3000, ()=>{
    console.log('Server is running http://localhost:3000');
});


app.get('/', (req, res) => {
  res.json({
    message: 'Api is working!'
  });
});