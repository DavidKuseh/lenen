function validateData(req, res, next){
    const { email, password } = req.body;

    function validEmail(email){
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    };

    if(req.path === "/register") {
        if(![email, password].every(Boolean)) {
            return res.json("Missing credentials");
        } else if(!validEmail(email)){
            return res.json("Invalid email");
        }
    } else if(req.path === "/login") {
        if(![email, password].every(Boolean)) {
            return res.json("Missing credentials");
        } else if(!validEmail(email)){
            return res.json("Invalid email")
        };
    };

    next();
}

module.exports = {validateData};