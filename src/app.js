import  express from 'express'
import enployeesRoutes from './routes/employees.routes.js'
import indexRoutes from './routes/index.routes.js'

const app =express()

app.use(express.json())

app.use(indexRoutes)
app.use('/api',enployeesRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint not Found'
    })
})

export default app;