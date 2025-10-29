import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
    let token = req.cookies.token;
    if (!token) {
        const authHeader = req.get('Authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }
    }

    if (!token) {
        return res.status(401).json({ 
            message: "No estas autorizado" 
        });
    }

    jwt.verify(token, "xyz123", (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "No estas autorizado"
            });
        }
        req.usuarioId = decoded.id;
        next();
    });
};
