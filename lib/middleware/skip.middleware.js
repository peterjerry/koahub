'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (options) {
    var parent = this;

    var opts = typeof options === 'function' ? { custom: options } : options;
    opts.useOriginalUrl = typeof opts.useOriginalUrl === 'undefined' ? true : opts.useOriginalUrl;

    return function skip(ctx, next) {
        var requestedUrl = _url2.default.parse((opts.useOriginalUrl ? ctx.originalUrl : ctx.url) || '', true);

        var _skip = false;

        if (opts.custom) {
            _skip = _skip || opts.custom(ctx);
        }

        var paths = !opts.path || Array.isArray(opts.path) ? opts.path : [opts.path];

        if (paths) {
            _skip = _skip || paths.some(function (p) {
                return typeof p === 'string' && p === requestedUrl.pathname || p instanceof RegExp && !!p.exec(requestedUrl.pathname);
            });
        }

        var exts = !opts.ext || Array.isArray(opts.ext) ? opts.ext : [opts.ext];

        if (exts) {
            _skip = _skip || exts.some(function (ext) {
                return requestedUrl.pathname.substr(ext.length * -1) === ext;
            });
        }

        var methods = !opts.method || Array.isArray(opts.method) ? opts.method : [opts.method];

        if (methods) {
            _skip = _skip || !!~methods.indexOf(ctx.method);
        }

        if (_skip) {
            return next();
        }

        return parent(ctx, next);
    };
};

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=skip.middleware.js.map