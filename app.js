const express = require('express')
const cors = require ('cors')
const router = require('./src/routes/routes')
const port = 3000
const path = require('path')
const app = express()
app.use(cors())
app.use(express.json())
app.use(router)
app.set('view engine', 'ejs')

app.get('/',(request,response)=>{
    const number = Math.random()
    response.render(path.join(__dirname, 'src/views/index.ejs'), {variavel: number})
 })

app.listen(port,()=>{
    console.log(`Aplicação rodando na porta ${port}`)
})

