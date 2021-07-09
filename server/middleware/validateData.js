function validateData(req, res, next){
    const { user_email, user_password } = req.body;

    function validEmail(email){
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    };

    if(req.path === "/register") {
        if(![user_email, user_password].every(Boolean)) {
            return res.json("Missing credentials");
        } else if(!validEmail(user_email)){
            return res.json("Invalid email");
        }
    } else if(req.path === "/login") {
        if(![user_email, user_password].every(Boolean)) {
            return res.json("Missing credentials");
        } else if(!validEmail(user_email)){
            return res.json("Invalid email")
        };
    };

    next();
}

module.exports = {validateData};