import passport from "passport";
import { ExtractJwt , Strategy as JwtStrategy } from "passport-jwt";


const USER =  "admin";
const jwtSecret = "secret";

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
}


passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    console.log("lets go ");
    console.log("jwtPayload", jwtPayload);
    try{
     const user =  jwtPayload.username === USER ? USER : false;       
        if(user){
            return done(null, user);
        }
        else{
            return done(null, false);
        }
    }
    catch(error){
        return done(error, false);
    }
}))

