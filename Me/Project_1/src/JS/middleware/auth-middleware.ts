export const authMiddleware=(req, res, next)=>{
    if(!req.session.user){
        res.status(401).send('Please Login')
    }else if(req.session.user.role.role === 'Admin'){
        next()
    } else {
        res.status(403).send('You are Unauthorized for this endpoint')
    }
    
}


export const authCheckId= (req,res,next) => {
    if(req.session.user.role.role === 'admin' || req.session.user.role.role === 'finance_manager'){
        next()
    }else if(req.session.user.user_id === +req.params.id ){
        next()
    } else {      
        res.status(403).send('You are Unauthorized for this endpoint')
    }
}

export const authFactory = (roles:string[]) => {
    return (req,res,next) => {
        // this checks that you are logged in
        if(!req.session.user){
            res.status(401).send('Please Login')
        // is there is the special role Everyone, allow them in
        } else if(roles.includes('user')){
            next()
        } else {
            let allowed = false
            // loop through all of the allowed roles
            for(let role of roles){
                // see if user has a matching role
                if(req.session.user.role.role === role){
                    allowed = true
                    next()
                }
            }
            
            if(!allowed){                
                res.status(403).send('You are Unauthorized for this endpoint')
            }
        }
    }
}