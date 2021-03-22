const mailgun = require("mailgun-js")
const domain = process.env.MAILGUN_DOMAIN
const api_key = process.env.MAILGUN_API
console.log(api_key)
const mg = mailgun({apiKey: api_key, domain})

const sendWelcomeEmail = (email, iname) => {
    const data = {
        from: 'Excited User <me@samples.mailgun.org>',
        to: email,
        subject: 'Hello',
        text: `Welcome to the app, ${iname}. Let me know how you get along with the app`
    }

    mg.messages().send(data, function (error, body) {
    })
}

const sendCancelationEmail = (email, iname) => {
    const data = {
        from: 'Excited User <me@samples.mailgun.org>',
        to: email,
        subject: 'Bye',
        text: `Hello, ${iname}. Why did you canceled your account?`
    }

    mg.messages().send(data, function (error, body) {
    })
}


module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}