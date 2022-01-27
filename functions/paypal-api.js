var axios = require('axios');
var qs = require('qs');
require('dotenv').config()

exports.getToken = async () => {
    var data = qs.stringify({
        'grant_type': 'client_credentials'
    });

    const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString('base64')
    var config = {
        method: 'post',
        url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    return axios(config)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
        });
}

exports.createOrder = async (token) => {
    var data = JSON.stringify({
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "shipping": {
                    "address": {
                        "address_line_1": "Heinrich Lersch str. 36",
                        "address_line_2": "",
                        "admin_area_2": "Duisburg",
                        "admin_area_1": "NRW",
                        "postal_code": "47057",
                        "country_code": "DE"
                    }
                },
                "amount": {
                    "currency_code": "EUR",
                    "value": "100.00"
                }
            }
        ]
    });

    var config = {
        method: 'post',
        url: 'https://api-m.sandbox.paypal.com/v2/checkout/orders',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Prefer': 'return=representation',
            'Content-Type': 'application/json'
        },
        data: data
    };

    return axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Not needed
exports.captureOrder = (token, url, inputData) => {
    var config = {
        method: 'post',
        url: url,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(inputData)
    };

    return axios(config)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
        });

}