import express, { Application } from 'express';
import publicRoutes from './routes/publicRoutes'
import appointmentRoutes from './routes/appointmentRoutes'
import doctorRoutes from './routes/doctorRoutes'
import inventoryRoutes from './routes/inventoryRoutes'
import cors from 'cors'
const app: Application = express()

app.use(cors({
    origin:"*",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"]
}));

app.use(express.json())
app.use('/', publicRoutes)
app.use('/appointments', appointmentRoutes)
app.use('/doctors', doctorRoutes)
app.use('/inventory', inventoryRoutes)

app.listen(3001, () => {
    console.log('server starts at port 3001')
    console.log('http://127.0.0.1:3001')
})