const functions = require('firebase-functions');
const express = require('express');
const app = express();
const api = require("./paypal-api")

app.set('views', './views')
app.set('view engine', 'ejs');

app.get('/paypal', async (req, res) => {
    res.render("index", { paypalClientId: process.env.PAYPAL_CLIENT_ID })
});

app.post('/create-order', async (req, res) => {
    console.log("create order called")
    const respToken = await api.getToken()
    const token = respToken["access_token"]

    const orderResp = await api.createOrder(token)
    console.log(JSON.stringify(orderResp))

    // const captureOrder = await api.captureOrder(token, orderResp.links[3].href, orderResp)
    // console.log(JSON.stringify(captureOrder))
    return res.json({  id: orderResp.id  })
});

exports.app = functions.https.onRequest(app);