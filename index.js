const express = require('express');
var stripe = require('stripe')('stripe_key_XXXX');
const app = express(); 
const bodyParser = require('body-parser');
const path = require('path');

const PORT = 4000;
 
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// *** static directory *** //
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req,res) => {
    res.render('index.ejs');
});
app.post('/charge',(req,res,next)=>{
    var token = req.body.stripeToken;

    console.log("TOken    ",req.body.stripeToken);

    // stripe.customers.create({
    //         email: 'foo-customer@example.com',
    //         customer : 'foo-customer@example.com',
    //     })
    //     .then((customer) => {
    //         return stripe.customers.createSource(customer.id, {
    //         source: token,
    //         });
    //     })
    //     .then((source) => {
    //         return stripe.charges.create({
    //         amount: 1600,
    //         currency: 'usd',
    //         customer: source.customer,
    //         });
    //     }).then((amount)=>{
    //         console.log(amount)
    //     })
    //     .catch((err) => {console.log("ERR"); });
    
// stripe.tokens.create({
//     pii: {
//     id_number: '000000000'
//     }
// }, function(err, token) { 
//   res.send({pii:token});
// });
 
        stripe.charges.create({
            amount: 2000,
            currency: "usd",
            source: "tok_mastercard", // obtained with Stripe.js
            description: "Charge for jenny.rosen@example.com",
            metadata:{obj:'3434'}
                                }, function(err, charge) {
            res.send({charge:charge});
          });
});


app.listen(PORT, () => {
    console.log(`Running at ${PORT}`)
});
