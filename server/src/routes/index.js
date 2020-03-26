import authRoutes from './auth.route'
import userRoutes from './user.route'

export default app => {
  app.use('/accounts', authRoutes)
  app.use('/users', userRoutes)

  console.log(`Router is connected successfully.`)
}
