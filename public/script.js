paypal
    .Buttons({
        createOrder: function () {
            return fetch("/create-order", {
                method: "POST",
                headers: {},
                body: {},
            })
                .then(res => {
                    if (res.ok) return res.json()
                    return res.json().then(json => Promise.reject(json))
                })
                .then(({ id }) => {
                    return id
                })
                .catch(e => {
                    console.error(e.error)
                })
        },
        onApprove: function (data, actions) {
            console.log("approving...")
            return actions.order.capture()
        },
    })
    .render("#paypal")