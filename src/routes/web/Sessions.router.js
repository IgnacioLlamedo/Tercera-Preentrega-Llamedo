import { Router } from "express";
import passport from "passport";
import { logger } from "../../utils/logger.js";

export const sessionsRouter = Router()

sessionsRouter.get('/login', function loginView(req, res){
    res.render('login', {
        title: 'Login'
    })
})

sessionsRouter.post('/login',
    passport.authenticate('login', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    })
)

sessionsRouter.get('/githublogin',
    passport.authenticate('github', { scope: ['user:email'] })
)

sessionsRouter.get('/githubcallback',
    passport.authenticate('github', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    })
)

sessionsRouter.post('/logout', (req, res) => {
    req.logOut(error => {
        if(error){
            logger.error(error)
        }
        res.redirect('/login')
    })
})
