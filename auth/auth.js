const jwt = require('jsonwebtoken')

exports.checkToken = async (req, res, next) => {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    
    if (!token) return res.status(401).json({ msg: "Acess Denied" });

    try {
        const secret = process.env.SECRET;
        
        var decoded = jwt.verify(token, secret);
        
        next();

    } catch (err) {
        res.status(400).json({ msg: "Invalid Token" });
    }
}