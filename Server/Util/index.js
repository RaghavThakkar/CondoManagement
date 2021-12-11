"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = exports.CurrentUser = exports.UserId = exports.UserUserName = exports.UserDisplayName = void 0;
function UserDisplayName(req) {
    if (req.user) {
        let user = req.user;
        return user;
    }
    return null;
}
exports.UserDisplayName = UserDisplayName;
function UserUserName(req) {
    if (req.user) {
        let user = req.user;
        return user.username.toString();
    }
    return '';
}
exports.UserUserName = UserUserName;
function UserId(req) {
    if (req.user) {
        let user = req.user;
        return user.email.toString();
    }
    return '';
}
exports.UserId = UserId;
function CurrentUser(req) {
    if (req.user) {
        let user = req.user;
        return user;
    }
    return null;
}
exports.CurrentUser = CurrentUser;
function AuthGuard(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=index.js.map