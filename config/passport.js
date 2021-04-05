const User = require('../models/User');
const { Strategy, ExtractJwt } = require('passport-jwt');

module.exports = function (passport) {
    passport.use(
        new Strategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.JWT_SECRET,
                algorithms: ['HMAC', 'SHA256'],
            },
            async (payload, done) => {
                try {
                    const user = await User.findById(payload.id);

                    if (!user) return done(null, false);

                    return done(null, user);
                } catch (err) {
                    done(err, false);
                }
            }
        )
    );
};
