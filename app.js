const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/links', require('./routes/links.route'))
app.use('/t', require('./routes/redirect.route'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (res, req) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))

    })
}


const PORT = config.get('port') || 4000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true
        })
        mongoose.connection.on('connected', () => console.log('connected'));
        mongoose.connection.on('open', () => console.log('open'));
        mongoose.connection.on('disconnected', () => console.log('disconnected'));
        mongoose.connection.on('reconnected', () => console.log('reconnected'));
        mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
        mongoose.connection.on('close', () => console.log('close'));
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()
