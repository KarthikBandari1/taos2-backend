import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'

const app = express()
app.use(cors({origin: '*'}))
app.use(express.json())

const initializeServer = async () => {
  try {
    app.listen(3003, () =>
      console.log('Server Running at http://localhost:3005/'),
    )
  } catch (error) {
    console.log(`DB Error: ${error.message}`)
    process.exit(1)
  }
}

initializeServer()

app.post('/', async (req, res) => {
  console.log(req.body)
  const {name, orderNo} = req.body
  console.log(name, orderNo)
  console.log('hi kar')
  const formData = new URLSearchParams()
  formData.append('Order No.', orderNo)
  formData.append('Name', name)

  const scriptURL =
    'https://script.google.com/macros/s/AKfycbzku5bPASDZXpGsJnGectKFyo9aVvZcCa2J6gAMAEqkCXUBjL-u859fcAvYQBpaZ8Q3ww/exec'

  try {
    const response = await fetch(scriptURL, {
      method: 'POST',
      body: formData,
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
  } catch (error) {
    console.error('Error!', error.message)
  }

  res.sendStatus(200)
})
