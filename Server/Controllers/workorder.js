"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayWorkOrderPage = void 0;
const Util_1 = require("../Util");
function DisplayWorkOrderPage(req, res, next) {
    res.render('index', { title: 'Maintenance Work Orders', page: 'workorders', displayName: Util_1.UserDisplayName(req) });
}
exports.DisplayWorkOrderPage = DisplayWorkOrderPage;
//# sourceMappingURL=workorder.js.map