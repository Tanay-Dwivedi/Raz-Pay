const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');

const instance =new Razorpay({
    key_id: 'rzp_test_I7B5k56OyaFeCL',
    key_secret:'l6J6etbhbuiUM1N6PrLaqtvY'
});

router.get('/', (req, res)=> {
    var options = {
        amount: 1000,
        currency: 'INR',
    };
    instance.orders.create(options, function (err, order) {
        if (err) {
            console.log(err);
        } else {
            console.log(order);
            res.render('checkout', {amount: order.amount, order_id: order.id});
        }
    });
});


router.post('/pay-verify',(req,res) => {
    console.log(req.body);
    body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    var crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', 'l6J6etbhbuiUM1N6PrLaqtvY')
                                    .update(body.toString())
                                    .digest('hex');
                                    console.log("sig"+req.body.razorpay_signature);
                                    console.log("sig"+expectedSignature);
    
    if(expectedSignature === req.body.razorpay_signature){
      console.log("Payment Success");
    }else{
      console.log("Payment Fail");
    }
  })

module.exports = router;