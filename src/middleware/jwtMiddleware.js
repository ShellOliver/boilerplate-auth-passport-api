import jwt from 'jsonwebtoken';
export default function (req, res, next) {
    try {
        let verification = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        console.log('verification result: ', verification);
        next();
    } catch (err) {
        res.json({
            error: true,
            message: err.message,
            name: err.name
        });
    }
}