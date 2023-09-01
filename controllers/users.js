const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            // console.log(user);
            res.redirect('/campgrounds');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}

module.exports.renderLogin = (req, res) => {
    // console.log(req.session) //todo fix me
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'welcome back!');
    const returnTo = req.session.returnTo || '/campgrounds';
    // console.log('this thsisdifsdk')
    // console.log(req.session) //todo this req.session is getting reset for some reason and i cannot return to what page i was goin for
    res.redirect(returnTo);
}

module.exports.rednerProfile = async (req, res) => {
    const name = req.params.profile;
    const user = await User.findOne({ username: name });
    res.render("users/profile", { user });
}

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        req.flash('success', "Goodbye!");
        res.redirect('/campgrounds');
    });

}