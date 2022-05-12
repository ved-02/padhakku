const Coupon = require("../models/coupon");

const PRICE = 1000;

exports.couponValidate = async (req, res, next) => {
    const { couponCode } = req.body;
    if (!couponCode) {
        res.status(400).json({ error: "Please Enter Coupon Code" });
    }
    else {
        Coupon.findOne({ code: couponCode }, async(err, coupon) => {
            if (!err && coupon) {
                if (coupon.limit <= 0) {
                    res.status(400).json({ error: "Coupon Limit Exceeded" });
                }
                else if (Date.now() > coupon.valid) {
                    res.status(400).json({ error: "Coupon Expired" });
                }
                else {
                    const price = PRICE - (PRICE * coupon.discount / 100);
                    coupon.limit = coupon.limit - 1;
                    await coupon.save();
                    res.status(200).json({
                        success: "Coupon Applied",
                        discription: coupon.discription,
                        discount: `${coupon.discount}%`,
                        price: price
                    })
                }
            }
            else if (!err && !coupon)
                res.status(400).json({ error: "No Coupon Code Found" });
            else {
                console.log(err);
                res.status(400).json({ error: "Something went wrong" });
            }
        })
    }
}
