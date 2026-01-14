function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
  /***/"./$$_lazy_route_resource lazy recursive": (
  /*!******************************************************!*\
    !*** ./$$_lazy_route_resource lazy namespace object ***!
    \******************************************************/
  /*! no static exports found */
  /***/
  function _$$_lazy_route_resource_lazy_recursive(module, exports) {
    function webpackEmptyAsyncContext(req) {
      // Here Promise.resolve().then() is used instead of new Promise() to prevent
      // uncaught exception popping up in devtools
      return Promise.resolve().then(function () {
        var e = new Error("Cannot find module '" + req + "'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
      });
    }
    webpackEmptyAsyncContext.keys = function () {
      return [];
    };
    webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
    module.exports = webpackEmptyAsyncContext;
    webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

    /***/
  }),
  /***/"./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html": (
  /*!**************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
    \**************************************************************************/
  /*! exports provided: default */
  /***/
  function _node_modules_rawLoader_dist_cjsJs_src_app_appComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "<!-- <app-header (newProjectObject) = \"newProjectObject($event)\"></app-header> -->\n<router-outlet></router-outlet>\n";

    /***/
  }),
  /***/"./node_modules/raw-loader/dist/cjs.js!./src/app/authlayout/authlayout.component.html": (
  /*!********************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/authlayout/authlayout.component.html ***!
    \********************************************************************************************/
  /*! exports provided: default */
  /***/
  function _node_modules_rawLoader_dist_cjsJs_src_app_authlayout_authlayoutComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "<div class=\"container-fluid\">\n\t<div class=\"row\">\n\t\t\n\t\t<div class=\"col-lg-12 col-md-12 col-sm-12 mainBdy p-0\">\n\t\t\t<div class=\" h-100\">\n\t\t\t\t<div *ngIf=\"message\" class=\"mx-2 my-2\" [ngClass]=\"{ 'alert': message, 'alert-success': message.type === 'success', 'alert-danger': message.type === 'error' }\">{{message.text}}</div>\n\t\t\t\t<router-outlet></router-outlet>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n";

    /***/
  }),
  /***/"./node_modules/raw-loader/dist/cjs.js!./src/app/authlayout/login/login.component.html": (
  /*!*********************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/authlayout/login/login.component.html ***!
    \*********************************************************************************************/
  /*! exports provided: default */
  /***/
  function _node_modules_rawLoader_dist_cjsJs_src_app_authlayout_login_loginComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "<section class=\"login-wrapper\">\n    \n        <div class=\"container h-100 login-section\">\n           \n            <form [formGroup]=\"loginForm\" (ngSubmit)= \"onSubmit()\">\n                \n                <!-- <img src=\"../../assets/icons/loginUsericon.svg\" class=\"login-user-icon\" alt=\"login\" title=\"login\"/> -->\n                     <!-- <ngb-alert [dismissible]=\"false\" *ngIf=\"errorMsg !=''\" type=\"danger\">{{errorMsg}}</ngb-alert> -->\n                <div class=\"form-group\">\n                    <label for=\"login\" >Serverless-as-a-Service</label>\n                    <div class=\"input-icon\">\n                        <img src=\"../../assets/images/Username Icon.svg\" alt=\"user name\" title=\"user name\"/>\n                    </div>\n                    <input type=\"text\" formControlName=\"userId\" id=\"login\" class=\"fadeIn second\"\n                     name=\"login\" placeholder=\"Email ID\" (keypress)=\"emailClick()\" [ngClass]=\"{ 'is-invalid':submitted && f.userId.errors }\">\n                    <div *ngIf=\"submitted && f.userId.errors\" class=\"invalid-feedback\">\n                        <div *ngIf=\"f.userId.errors.required\">Please enter your Email Id</div>\n                        <div *ngIf=\"f.userId.errors.email\">Email must be a valid email address</div>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"password\" hidden>Password</label>\n                    <div class=\"input-icon\">\n                        <img src=\"../../assets/images/Password Icon.svg\"  alt=\"user name\" title=\"user name\"/>\n                    </div>\n                    <input type=\"password\" formControlName=\"password\"  id=\"password\" class=\"fadeInhir td\"\n                     name=\"login\" placeholder=\"Password\" (keypress)=\"passwordClick()\" [ngClass]=\"{ 'is-invalid':submitted && f.password.errors }\">\n                    <div *ngIf=\"submitted && f.password.errors\" class=\"invalid-feedback\">\n                        <div *ngIf=\"f.password.errors.required\">Please enter your password</div>\n                    </div>\n                </div>\n               \n                <div class=\"form-group text-center\">\n                    <button [disabled]=\"loading\" class=\"btn btn-blue partial-border-rad py-2 px-5 mr-2 enableLogin \" [ngClass]=\"{'enableLogin': enableLogin }\">Login</button>\n                    <img *ngIf=\"loading\" src=\"/assets/images/ajax-loader.gif\" />\n                </div>\n                <ngb-alert *ngIf=\"alertMessage\" [dismissible]=\"true\" (close)=\"alertMessage = null\"><b>{{ alertMessage }}</b></ngb-alert>\n            </form>\n           \n        </div>\n        \n    </section>\n";

    /***/
  }),
  /***/"./node_modules/raw-loader/dist/cjs.js!./src/app/function/create/create.component.html": (
  /*!*********************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/function/create/create.component.html ***!
    \*********************************************************************************************/
  /*! exports provided: default */
  /***/
  function _node_modules_rawLoader_dist_cjsJs_src_app_function_create_createComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "\n\n<ul class=\"breadcrumb pl-0\">\n    <ng-container *ngFor=\"let bread of breadcrumb; let i=index\">\n        \n        <li *ngIf=\"i != breadcrumb.length-1\"><a [routerLink]='[bread.url]' [queryParams]=\"bread.params\" routerLinkActive='active'>{{ bread.name }}</a></li>\n        <li *ngIf=\"i != 0 && i == breadcrumb.length-1\"><a> {{bread.name}}</a></li>\n    </ng-container>\n</ul>\n\n<ngb-alert *ngIf=\"alertMsg\" [dismissible]=\"true\"  (close)=\"alertMsg = null\">{{ alertMsg }}</ngb-alert>\n\n    <div id=\"cover-caption\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form mt-1\">\n                    <div  class=\"justify-content-center col-12\">\n                        <h5 class=\"display-8 text-truncate\">Function Creation</h5>                \n                     </div>\n                   \n                     <form class=\"justify-content-center form-inline\" [formGroup]=\"createFunctionForm\">\n                        <div class=\"form-group justify-content-center mt-1\">\n\t\t\t\t\t\t\t<b class=\"required-field\">Function Name: </b>&nbsp;\n\t\t\t\t\t\t\t<input type=\"text\" formControlName=\"functionName\" id=\"functionName\" class=\"fadeIn second\" name=\"functionName\"\n                            placeholder=\"Function Name\" [ngClass]=\"{ 'is-invalid':submitted && f.functionName.errors }\"><br/>\n                            <div *ngIf=\"submitted && f.functionName.errors\" class=\"form-inline justify-content-center invalid-feedback\">\n                                <div *ngIf=\"f.functionName.errors.required\">Please enter a Function Name</div>\n\t\t\t\t\t\t\t\t<div *ngIf=\"f.functionName.errors.pattern\">Function name should not have Captitals,Spaces and Special characters. \"_\",\"-\" are permitted</div>\n                            </div>\n                        </div>\n<!--\t\t\t\t\t\t<div class=\"form-group justify-content-center mt-1\">\n\t\t\t\t\t\t\t<b class=\"required-field\">Function Image: </b>&nbsp;\n\t\t\t\t\t\t\t<input type=\"text\" formControlName=\"functionImage\" id=\"functionImage\" class=\"fadeIn second\" name=\"functionImage\"\n                            placeholder=\"Function Image\" [ngClass]=\"{ 'is-invalid':submitted && f.functionImage.errors }\"><br/>\n                            <div *ngIf=\"submitted && f.functionImage.errors\" class=\"form-inline justify-content-center invalid-feedback\">\n                                <div *ngIf=\"f.functionImage.errors.required\">Please enter a Function Image</div>\n                            </div>\n                        </div>\n -->                       \n                        <div class=\"justify-content-center form-inline mt-1\">\n                        <b class=\"required-field\">Runtime: </b>&nbsp;\n                        <select formControlName=\"runtime\" (change)=\"changeFileNames($event)\" [ngClass]=\"{ 'is-invalid':submitted && f.runtime.errors }\">\n                            <option *ngFor=\"let eachruntime of functionRuntimes\" [value]=\"eachruntime.id\">{{ eachruntime.name }}\n                            </option>\n                        </select>\n                        <div *ngIf=\"submitted && f.runtime.errors\" class=\"justify-content-center form-inline invalid-feedback\">\n                            <div *ngIf=\"f.runtime.errors.required\">Please Select Runtime</div>\n                        </div>                     \n                    </div>  \n\t\t\t\t\t\n                    <div class=\"form-group mt-3\">\n                        <table >\n                            <thead>\n                                <th>{{ handlerFileName }}</th>\n                                <th>{{ dependencyFileName }}</th>\n                            </thead>\n                            <tbody>\n                                <tr>\n                                    <td ><textarea formControlName=\"handlerFileContent\" id=\"handlerFileContent\" class=\"fadeIn second\" name=\"handlerFileContent\"\n                                        placeholder=\"handler file content\" rows=\"10\" cols=\"50\"></textarea></td>\n                                    <td ><textarea formControlName=\"dependencyFileContent\" id=\"dependencyFileContent\" class=\"fadeIn second\" name=\"dependencyFileContent\"\n                                        placeholder=\"dependency file content\" rows=\"10\" cols=\"50\"></textarea></td>\n                                </tr>\n                            </tbody>\n                        </table>\n                    </div> \n                    <div class=\"form-group mt-2\">\n                        <button class=\"btn\" style=\"border: 1px solid rgb(95, 95, 194);background:  rgb(95, 95, 194);color: white;\" (click)=\"createFunction()\" [disabled]=\"createFunctionFlag\">Create Function</button>\n                    </div>                    \n                </form>\n\n                <div *ngIf=\"userMsg\" class=\"justify-content-center mt-2\">\n                    <hr class=\"horizontal\">\n                    <p>{{ userMsg }}</p>\n                </div>              \n       \n                <div class=\"justify-content-center mt-2\" *ngIf=\"createFunctionErrorFlag\">\n                    <hr class=\"horizontal\">\n                    <button class=\"btn\" style=\"border: 2px solid red;\" (click)=\"viewErrorLog();open(functionErrorLog)\">View error log</button>    \n               </div>\n                <!-- <div *ngIf=\"(functionBuildLog != '')\" class=\"justify-content-center col-12\">\n                    <textarea cols=\"150\" rows=\"10\">{{ functionBuildLog }}</textarea>\n                </div> -->\n                \n                <div *ngIf=\"deployFlag && !isFunctionAlreadyDeployed\" class=\"justify-content-center col-12 mt-2\">\n                    <hr class=\"horizontal\">\n                    <button class=\"btn\" style=\"background:rgb(2, 2, 75);color: white;\" (click)=\"open(deployFunctionModal)\"><b>Deploy</b></button>\n                </div>\n                <div *ngIf=\"isFunctionAlreadyDeployed\" class=\"justify-content-center mt-2\">\n                    <hr class=\"horizontal\">\n                    <button class=\"btn\" style=\"border: 2px solid rgb(3, 88, 18);\" (click)=\"open(functionDescription)\">View Function Description</button>    \n                </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n\n   \n    <ng-template #deployFunctionModal let-modal>\n        <div class=\"modal-header\">\n            <h4 class=\"modal-title text-center\" id=\"deployFunctionModalId\">Deploy Function</h4>\n              <span aria-hidden=\"true\" class=\"text-white\" style=\"font-size: 160%;\"  (click)=\"modal.dismiss('Cross click')\">&times;</span>\n         </div>\n        <div class=\"modal-body\" class=\"mt-4\">\n            <div class=\"container-fluid\">\n                <form class=\"justify-content-center\" [formGroup]=\"deployFunctionForm\" disabled>\n                    <div>\n                    <b>Do you want to scale to zero: &nbsp;</b>\n                    <b>\n                        <input type=\"radio\" value=\"true\" formControlName=\"scaleToZero\">\n                          <span>Yes&nbsp;&nbsp;</span>\n                    </b>\n                      <b>\n                        <input type=\"radio\" value=\"false\" formControlName=\"scaleToZero\">\n                          <span>No</span>\n                      </b>\n                    </div>\n                    <div class=\"mt-2\">                \n                      <b>Choose type of trigger: &nbsp;</b>\n                      <select formControlName=\"triggerType\" (change)=\"changeTriggerType($event)\">\n                        <option *ngFor=\"let eachtrigger of triggerTypes\" [value]=\"eachtrigger.id\">{{ eachtrigger.name }}\n                        </option>\n                    </select>\n                    </div>               \n                    <div class=\"mt-2\" *ngIf=\"kafkaFlag\">\n                        <b>Enter Kafka topic:&nbsp;</b>\n                        <input type=\"text\" formControlName=\"topic\">\n                    </div>                \n                    <div class=\"mt-2\" *ngIf=\"cronFlag\">\n                        <b>Enter CRON Expression:&nbsp;</b>\n                        <input type=\"text\" formControlName=\"schedule\">\n                    </div>\n                    \n                </form>\n                <div class=\"form-group text-center mt-3\">\n                    <button class=\"btn btn-blue partial-border-rad py-2 px-5 mr-2 cancelBtn\"  (click)=\"deployFunction()\">Deploy</button>\n                    <button class=\"btn btn-blue partial-border-rad py-2 px-5 mr-2 cancelBtn\" (click)=\"resetdeployFunctionForm()\" >Reset</button>\n                </div>\n            </div>\n        </div>\n    </ng-template>\n\n    <ng-template #functionErrorLog let-modal>\n        <div class=\"modal-header\">\n            <h4 class=\"modal-title text-center\" id=\"functionErrorLog\">Error Log</h4>\n              <span aria-hidden=\"true\" class=\"text-white\" style=\"font-size: 160%;\"  (click)=\"modal.dismiss('Cross click')\">&times;</span>\n         </div>\n        <div class=\"modal-body\" class=\"mt-4\">\n            <div class=\"container-fluid\">\n                <div class=\"justify-content-center col-12 mt-2\">\n                    <textarea cols=\"100\" rows=\"15\">{{ functionBuildLog }}</textarea>        \n                </div>\n                    <div class=\"form-group text-center\">\n                        <!-- <button class=\"btn btn-blue partial-border-rad py-2 px-5 mr-2 cancelBtn\" (click)=\"closeModal()\" >close</button> -->\n                    </div>\n              \n            </div>\n        </div>\n    </ng-template>\n\n    <ng-template #functionDescription let-modal>\n        <div class=\"modal-header\">\n            <h4 class=\"modal-title text-center\" id=\"functionErrorLog\">Function Description</h4>\n              <span aria-hidden=\"true\" class=\"text-white\" style=\"font-size: 160%;\"  (click)=\"modal.dismiss('Cross click')\">&times;</span>\n         </div>\n        <div class=\"modal-body\" class=\"mt-3\">\n            <div class=\"container-fluid\">\n                <div class=\"justify-content-center col-12 mt-2\">\n                    <b>Function Invocation Count :&nbsp; </b><span>{{invocationCount != '' ? '0' : invocationCount}}</span><br/>\n                    <b>Function URL :&nbsp; </b>\n                    <a [href]=\"functionUrl\" target=\"_blank\" rel=\"noopener noreferrer\">{{functionUrl}}</a><br/>\n                    <!-- <span>{{ functionUrl }}</span><br/> -->\n                    <b>Function Trigger :&nbsp; </b><span>{{ triggerType }}</span><br/>\n                    <b>Scale to Zero :&nbsp; </b><span>{{ scaleToZeroFlag }}</span><br/>\n                    <b *ngIf=\"(functionAnnotations != null)\">Function Annotations:</b>\n                    <div *ngFor=\"let item of functionAnnotations | keyvalue\">\n                        <b>{{item.key}}</b> :&nbsp; <span>{{item.value}}</span>\n                    </div>       \n                </div>\n                <div class=\"form-group text-center\">\n                    <!-- <button class=\"btn btn-blue partial-border-rad py-2 px-5 mr-2 cancelBtn\" (click)=\"closeModal()\" >close</button> -->\n                </div>              \n            </div>\n        </div>\n    </ng-template>\n            \n";

    /***/
  }),
  /***/"./node_modules/raw-loader/dist/cjs.js!./src/app/function/deploy/deploy.component.html": (
  /*!*********************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/function/deploy/deploy.component.html ***!
    \*********************************************************************************************/
  /*! exports provided: default */
  /***/
  function _node_modules_rawLoader_dist_cjsJs_src_app_function_deploy_deployComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "<app-header></app-header>\n<p>Deploy function</p>\n";

    /***/
  }),
  /***/"./node_modules/raw-loader/dist/cjs.js!./src/app/function/function.component.html": (
  /*!****************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/function/function.component.html ***!
    \****************************************************************************************/
  /*! exports provided: default */
  /***/
  function _node_modules_rawLoader_dist_cjsJs_src_app_function_functionComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "<app-projects></app-projects>\n";

    /***/
  }),
  /***/"./node_modules/raw-loader/dist/cjs.js!./src/app/function/logs/logs.component.html": (
  /*!*****************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/function/logs/logs.component.html ***!
    \*****************************************************************************************/
  /*! exports provided: default */
  /***/
  function _node_modules_rawLoader_dist_cjsJs_src_app_function_logs_logsComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "\n<ul class=\"breadcrumb pl-0\">\n    <ng-container *ngFor=\"let bread of breadcrumb; let i=index\">\n        \n        <li *ngIf=\"i != breadcrumb.length-1\"><a [routerLink]='[bread.url]' [queryParams]=\"bread.params\" routerLinkActive='active'>{{ bread.name }}</a></li>\n        <li *ngIf=\"i != 0 && i == breadcrumb.length-1\"><a> {{bread.name}}</a></li>\n    </ng-container>\n</ul>\n\n<ngb-alert type=\"info\" *ngIf=\"emptyLogsFlag\" [dismissible]=\"true\" (close)=\"emptyLogsFlag = false\">No Logs Found</ngb-alert>\n<ngb-alert *ngIf=\"alertMsg\" [dismissible]=\"true\"  (close)=\"alertMsg = null\">{{ alertMsg }}</ngb-alert>\n<div id=\"cover-caption\">\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form mt-1\">\n                <div  class=\"justify-content-center col-12\">\n                        <h5 class=\"display-8 text-truncate\">Function Logs</h5>                              \n                     </div>\n                     <div style=\"border: 2px solid rgb(3, 47, 99);\">\n                <form class=\"justify-content-center form-inline\" [formGroup]=\"functionLogsForm\">\n                    <div class=\"form-group  mt-2\">\n                    <b>Project Name: &nbsp;</b>\n                    <input type=\"text\" formControlName=\"projectName\" id=\"projectName\" class=\"fadeIn second\" name=\"projectName\">\n                    </div>\n                    <div class=\"form-group mt-2\">\n                    <b>Function Name: &nbsp;</b>\n                    <input type=\"text\" formControlName=\"functionName\" id=\"functionName\" class=\"fadeIn second\" name=\"functionName\">\n                </div>\n                <div class=\"justify-content-center form-group mt-2\">\n                    <b class=\"required-field\">Logs limit:</b>&nbsp;\n                    <input type=\"number\" formControlName=\"limits\" id=\"limits\" class=\"fadeIn second\"\n         name=\"limits\" placeholder=\"limits\" [ngClass]=\"{ 'is-invalid':submitted && f.limits.errors }\">\n                    <div *ngIf=\"submitted && f.limits.errors\" class=\"justify-content-center invalid-feedback form-group\">\n                        <div *ngIf=\"f.limits.errors.required\">Please enter limit</div>\n                    </div>\n                </div>\n                <div class=\"justify-content-center form-group mt-2 mb-1\">\n                    <b class=\"required-field\">Get Logs from:</b>&nbsp;\n                    <input type=\"datetime-local\" formControlName=\"timestamp\" id=\"timestamp\" class=\"fadeIn second\"\n         name=\"timestamp\" placeholder=\"timestamp\" [ngClass]=\"{ 'is-invalid':submitted && f.timestamp.errors }\"/>\n                    <div *ngIf=\"submitted && f.timestamp.errors\" class=\"invalid-feedback\">\n                        <div *ngIf=\"f.timestamp.errors.required\">Please select a Time</div>\n                    </div>\n                </div>               \n            </form>       \n                                     \n                <div class=\"form-group mt-2\">\n                    <button class=\"btn\" style=\"border: 2px solid rgb(6, 6, 248);\" (click)=\"getFunctionLogs()\">Get Logs</button>\n                </div>                    \n            </div>         \n            \n        </div>\n                </div>\n                </div>\n                </div>\n                <div *ngIf=\"!isFunctionLogsNull\" class=\"panel-body table-outer mt-1 p-0 rounded-top\" style=\"width: 85%;\n                margin-left: auto;\n                margin-right: auto;\">\n                    <table>\n                        <thead>         \n                            <tr>\n                            <th>Timestamp</th>\n                            <th>Text</th>\n                        </tr>   \n                        </thead>\n                        <tbody>\n                            <tr *ngFor=\"let functionLog of paginatedData\">                \n                                <td>{{ functionLog.timestamp | date:'medium'}}</td>\n                                <td>{{ functionLog.text}}</td>\n                            </tr>\n                        </tbody>\n                    </table>\n                    <ngb-pagination style=\"float: right;margin-top: 1rem;\" [collectionSize]=\"collectionSize\" [(page)]=\"currentPage\" [pageSize]=\"pageSize\" (pageChange)=\"refreshPagination()\">\n                    </ngb-pagination>\n                </div>\n";

    /***/
  }),
  /***/"./node_modules/raw-loader/dist/cjs.js!./src/app/layout/common/footer/footer.component.html": (
  /*!**************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/layout/common/footer/footer.component.html ***!
    \**************************************************************************************************/
  /*! exports provided: default */
  /***/
  function _node_modules_rawLoader_dist_cjsJs_src_app_layout_common_footer_footerComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "\n";

    /***/
  }),
  /***/"./node_modules/raw-loader/dist/cjs.js!./src/app/layout/common/header/header.component.html": (
  /*!**************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/layout/common/header/header.component.html ***!
    \**************************************************************************************************/
  /*! exports provided: default */
  /***/
  function _node_modules_rawLoader_dist_cjsJs_src_app_layout_common_header_headerComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "<header class=\"header bg-dark-gradient\">\n  <nav class=\"navbar navbar-expand-lg navbar-dark pt-0 pb-0\">\n   <!-- <div class=\"container container-fluid\">-->\n      <div class=\"container-fluid\">\n      <div class=\"collapse navbar-collapse top-nav\" id=\"navbarResponsive\">\n        <ul *ngIf=\"isRootUser\" class=\"navbar-nav d-flex align-items-center\">\n          <li class=\"nav-item\">\n            <h6 class=\"row text-white\" >Root Dashboard - USER MANAGEMENT</h6>\n          </li>\n        </ul>\n        <ul *ngIf=\"!isRootUser\" class=\"navbar-nav d-flex align-items-center\">\n          <!-- <li class=\"nav-item\"> -->\n            \n            <h6 class=\"row text-white\" >Projects :</h6>\n            <select [(ngModel)]='projectName'  (change)=\"getProjectObject($event)\">\n              <option *ngFor=\"let project of projectsList\">{{project.projectName}}</option>\n          </select>\n          <img *ngIf=\"isORGAdminFlag\" (click)=\"open(createProject)\" class=\"text-center createImg\" src=\"../../../../assets/images/folderPlus.svg\" title=\"Create Project\"/>\n          <!-- </li> -->\n        </ul>\n\n        <ul class=\"navbar-nav ml-auto right-nav\">\n          <li *ngIf=\"!isRootUser\" class=\"nav-item mr-2\">\n              <img *ngIf=\"projectOwnerFlag\" routerLink=\"/projects/manage\" [queryParams]=\"{ action: 'manageProject', project:projectName }\"  class=\"text-center manageImg\" src=\"assets/images/manage.svg\" title=\"Manage Project\"/>\n          </li>\n   \n\n           <li class=\"nav-item dropdown custom-right-section\" ngbDropdown>              \n                <img src=\"assets/images/ImageGroup.svg\" width=\"70\" class=\"\">\n\n            <a href=\"javascript:void(0)\" class=\"nav-link userText ml-2\" ngbDropdownToggle>\n                <span  class=\"text-white font-weight-bold \">{{userName}}</span>\n              </a>\n              <div class=\"dropdown-menu-right\" ngbDropdownMenu>\n                <a class=\"dropdown-item\">change password</a>\n                <a class=\"dropdown-item cursor\" (click)=\"logOut()\">Log Out</a>\n            </div>           \n\n\n            </li>\n        </ul>\n      </div>\n    </div>\n  </nav>\n\n  <ng-template #createProject let-modal>\n      <div class=\"modal-header\">\n          <h4 class=\"modal-title text-center\" id=\"createProjectModal\">Create Project</h4>\n              <span aria-hidden=\"true\" class=\"text-white\" style=\"font-size: 160%;\"  (click)=\"modal.dismiss('Cross click')\">&times;</span>\n      </div>\n      <div class=\"modal-body\" class=\"mt-4\">\n          <div class=\"container-fluid\">\n              <form [formGroup]=\"createProjectForm\" (ngSubmit)=\"onSubmit()\">\n                  <label class=\"required-field\" for=\"userId\">Project Name</label>\n                  <input type=\"text\" formControlName=\"projectName\" id=\"projectName\" class=\"fadeIn second\" name=\"project\"\n                      placeholder=\"project name\" (keypress)=\"projectNameClick()\" [ngClass]=\"{ 'is-invalid':submitted && f.projectName.errors }\"><br/>\n                      <div *ngIf=\"submitted && f.projectName.errors\" class=\"invalid-feedback\">\n                          <div *ngIf=\"f.projectName.errors.required\">Please enter a Project Name</div>\n                          <div *ngIf=\"f.projectName.errors.pattern\">Project name should not have Captitals,Spaces and Special characters. \"_\",\"-\" are permitted</div>\n                      </div>\n                      <div class=\"form-group text-center mt-2\">\n                      <button [disabled]=\"enableCreateProject\" class=\"btn btn-blue createBtn\">Create</button>\n                      </div>\n              </form>\n          </div>\n      </div>\n  </ng-template>\n  \n</header>\n\n<ngb-alert *ngIf=\"alertMessage\" [dismissible]=\"true\" (close)=\"alertMessage = null\">{{ alertMessage }}</ngb-alert>\n";

    /***/
  }),
  /***/"./node_modules/raw-loader/dist/cjs.js!./src/app/layout/common/leftsidenav/leftsidenav.component.html": (
  /*!************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/layout/common/leftsidenav/leftsidenav.component.html ***!
    \************************************************************************************************************/
  /*! exports provided: default */
  /***/
  function _node_modules_rawLoader_dist_cjsJs_src_app_layout_common_leftsidenav_leftsidenavComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "<div class=\"sidenav html\">\n    <div class=\"sidenav-centered\">\n      <div class=\"menuIcon\"  routerLinkActive=\"active\">\n        <a routerLink=\"users\" title=\"Users\">\n        <img src=\"assets/images/Usermangmticon.svg\" alt=\"Users\">\n        </a>\n      </div>\n      <div class=\"menuIcon\" routerLinkActive=\"active\">\n        <a routerLink=\"configuration\" title=\"Configuration\">\n        <img src=\"assets/images/menuIcon3.svg\" alt=\"Configuration\">\n        </a>\n      </div>\n    </div>\n  </div>\n";

    /***/
  }),
  /***/"./node_modules/raw-loader/dist/cjs.js!./src/app/layout/common/project-header/project-header.component.html": (
  /*!******************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/layout/common/project-header/project-header.component.html ***!
    \******************************************************************************************************************/
  /*! exports provided: default */
  /***/
  function _node_modules_rawLoader_dist_cjsJs_src_app_layout_common_projectHeader_projectHeaderComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "<header class=\"header bg-dark-gradient\">\n    <nav class=\"navbar navbar-expand-lg navbar-dark pt-0 pb-0\">\n     <!-- <div class=\"container container-fluid\">-->\n        <div class=\"container-fluid\">\n        <div class=\"collapse navbar-collapse top-nav\" id=\"navbarResponsive\">\n          <ul *ngIf=\"isRootUser\" class=\"navbar-nav d-flex align-items-center\">\n            <li class=\"nav-item\">\n              <h6 class=\"row text-white\" >Root Dashboard</h6>\n            </li>\n          </ul>\n          <ul *ngIf=\"!isRootUser\" class=\"navbar-nav d-flex align-items-center\">\n            <!-- <li class=\"nav-item\"> -->\n              \n              <h6 class=\"row text-white\" >Projects :</h6>\n              <select (change)=\"getProjectObject($event)\">\n                <option *ngFor=\"let project of projectsList\">{{project.projectName}}</option>\n            </select>\n            <img (click)=\"!isORGAdminFlag || open(createProject)\" class=\"text-center createImg\" src=\"assets/images/grid.svg\" title=\"Create Project\"/>\n            <!-- </li> -->\n          </ul>\n  \n          <ul class=\"navbar-nav ml-auto right-nav\">\n            <li *ngIf=\"!isRootUser\" class=\"nav-item mr-2\">\n                <img (click)=\"!projectOwnerFlag || routerLink='/projects/manage' \" class=\"text-center manageImg\" src=\"assets/images/manage.svg\" title=\"Manage Project\"/>\n            </li>\n     \n  \n             <li class=\"nav-item dropdown custom-right-section\" ngbDropdown>              \n                  <img src=\"assets/images/ImageGroup.svg\" width=\"70\" class=\"\">\n  \n              <a href=\"javascript:void(0)\" class=\"nav-link userText ml-2\" ngbDropdownToggle>\n                  <span  class=\"text-white font-weight-bold \">{{userName}}</span>\n                </a>\n                <div class=\"dropdown-menu-right\" ngbDropdownMenu>\n                  <a class=\"dropdown-item\">change password</a>\n                  <a class=\"dropdown-item cursor\" (click)=\"logOut()\">Log Out</a>\n              </div>           \n  \n  \n              </li>\n          </ul>\n        </div>\n      </div>\n    </nav>\n\n    <ng-template #createProject let-modal>\n        <div class=\"modal-header\">\n            <h4 class=\"modal-title text-center\" id=\"createProjectModal\">Create project</h4>\n                <span aria-hidden=\"true\" class=\"text-white\" style=\"font-size: 160%;\"  (click)=\"modal.dismiss('Cross click')\">&times;</span>\n        </div>\n        <div class=\"modal-body\" class=\"mt-4\">\n            <div class=\"container-fluid\">\n                <form [formGroup]=\"createProjectForm\" (ngSubmit)=\"onSubmit()\">\n                    <label for=\"userId\">Project Name</label>\n                    <input type=\"text\" formControlName=\"projectName\" id=\"projectName\" class=\"fadeIn second\" name=\"project\"\n                        placeholder=\"project name\" (keypress)=\"projectNameClick()\"><br/>\n                        <div *ngIf=\"submitted && f.projectName.errors\" class=\"invalid-feedback\">\n                            <div *ngIf=\"f.projectName.errors.required\">Please enter a project Name</div>\n                        </div>\n                        <div class=\"form-group text-center mt-2\">\n                        <button [disabled]=\"enableCreateProject\" class=\"btn btn-blue createBtn\">create</button>\n                        </div>\n                </form>\n            </div>\n        </div>\n    </ng-template>\n    \n  </header>\n";

    /***/
  }),
  /***/"./node_modules/raw-loader/dist/cjs.js!./src/app/layout/layout.component.html": (
  /*!************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/layout/layout.component.html ***!
    \************************************************************************************/
  /*! exports provided: default */
  /***/
  function _node_modules_rawLoader_dist_cjsJs_src_app_layout_layoutComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "<!-- <div class=\"loadingImg\" [hidden]=\"!showLoader\"></div>\n\t<div id=\"myOverlay\"></div>\n\t<div id=\"loadingGIF\"><img src=\"../assets/images/ajax-loader.gif\" /></div>\n</div> -->\n<div class=\"container-fluid col-lg-12 pl-0 pr-0 index-1000\">\n\t<!-- <app-header></app-header> -->\n\t<app-header (newProjectObject) = \"newProjectObject($event)\"></app-header>\n\t<app-leftsidenav class=\"col-2 left-nav-myrequest\" [ngClass]=\"{ 'active': leftNav == true}\"\n\t\t(click)=\"openNavForRoot();\"></app-leftsidenav>\n\t\t<section class=\"container pl-5 py-4\" >\n\t\t\t<div class=\"row h-100 content mt-4\">\n\t\t\t\t<router-outlet></router-outlet>\n\t\t\t</div>\n\t\t\t\t</section>\n\t<app-footer></app-footer>\n</div>\n";

    /***/
  }),
  /***/"./node_modules/raw-loader/dist/cjs.js!./src/app/projects/manage/manage.component.html": (
  /*!*********************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/projects/manage/manage.component.html ***!
    \*********************************************************************************************/
  /*! exports provided: default */
  /***/
  function _node_modules_rawLoader_dist_cjsJs_src_app_projects_manage_manageComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "\n\n<ul class=\"breadcrumb pl-0\">\n    <ng-container *ngFor=\"let bread of breadcrumb; let i=index\">\n        \n        <li *ngIf=\"i != breadcrumb.length-1\"><a [routerLink]='[bread.url]' [queryParams]=\"bread.params\" routerLinkActive='active'>{{ bread.name }}</a></li>\n        <li *ngIf=\"i != 0 && i == breadcrumb.length-1\"><a> {{bread.name}}</a></li>\n    </ng-container>\n</ul>\n\n<ngb-alert *ngIf=\"isProjectUsersNull\" >Please add users to the project</ngb-alert >\n<ngb-alert *ngIf=\"alertMsg\" [dismissible]=\"true\"  (close)=\"alertMsg = null\">{{ alertMsg }}</ngb-alert>\n<div id=\"cover-caption\">\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form mt-2\">\n                <div  class=\"col-12\">\n                    <h5 class=\"display-8 text-truncate\">Project Users</h5>                \n                </div>\n            </div>\n        </div>\n                <div class=\"justify-content-center mb-4\">\n                    <button class=\"btn\" style=\"border: 2px solid rgb(24, 9, 233); float: inline-start;\"   title=\"Project usage\" routerLink=\"/projects/usage\" [queryParams]=\"{ action: 'usageProject',id:projectName }\">Project usage</button>                                       \n                    \n                    <button class=\"btn\" style=\"border: 2px solid red;float: right;\" (click)=\"deleteProject()\" title=\"Delete Project\">Delete project&nbsp;<img  src=\"../../../assets/images/delete.svg\" ></button>\n                    <!-- <img (click)=\"deleteProject()\" class=\"float-right deleteImg\" src=\"../../../assets/images/delete.svg\" title=\"Delete Project\"> -->\n                </div>\n                <div>\n                    <img (click)=\"open(addUser)\" class=\"ml-10\" src=\"../../../assets/images/Add User.svg\" title=\"Add User to Project\">\n                </div>\n            \n    </div>\n</div>\n                 \n\n\n\n<div *ngIf=\"!isProjectUsersNull\" class=\"table-outer mt-3 p-0 rounded-top\" style=\"width: 85%;\nmargin-left: auto;\nmargin-right: auto;\">\n    <table>\n        <thead>\n            <tr>\n                <th>User ID</th>\n                <th>User Name</th>\n                <th>Role</th>\n                <th>Edit</th>\n                <th>Delete</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr *ngFor=\"let user of paginatedData\">\n                <td>{{ user.userId }}</td>\n                <td>{{ user.name }}</td>\n                <td>{{ user.projectRoleName }}</td>\n                <td (click)=\"open(modifyUser);editUserFlag(user)\"><img src=\"../../../assets/images/editRequest.svg\"\n                    title=\"edit user role\"></td>\n                <td (click)=deleteUser(user) class=\"text-center\"><img src=\"../../../assets/images/delete.svg\"\n                    title=\"delete user\"></td>\n            </tr>\n        </tbody>\n    </table>\n    <ngb-pagination style=\"float: right;margin-top: 1rem;\" [collectionSize]=\"collectionSize\" [(page)]=\"currentPage\" [pageSize]=\"pageSize\" (pageChange)=\"refreshPagination()\">\n    </ngb-pagination>\n</div>\n\n\n<ng-template #addUser let-modal>\n    <div class=\"modal-header\">\n        <h4 class=\"modal-title text-center\" id=\"addUserModal\">Add user</h4>\n        <!-- <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\"> -->\n            <span aria-hidden=\"true\" class=\"text-white\" style=\"font-size: 160%;\"  (click)=\"modal.dismiss('Cross click')\">&times;</span>\n        <!-- </button> -->\n    </div>\n    <div class=\"modal-body\" class=\"mt-4\">\n        <div class=\"container-fluid\">\n            <form [formGroup]=\"addUserForm\" (ngSubmit)= \"onSubmit()\">\n                <div class=\"form-group\">\n                    <label class=\"required-field\"  for=\"userId\" >User Id:</label>\n                    <input type=\"text\" formControlName=\"userId\" id=\"userId\" class=\"fadeIn second\"\n                     name=\"userId\" placeholder=\"email id\" (keypress)=\"emailClick()\" [ngClass]=\"{ 'is-invalid':submitted && f.userId.errors }\">\n                    <div *ngIf=\"submitted && f.userId.errors\" class=\"invalid-feedback\">\n                        <div *ngIf=\"f.userId.errors.required\">Please enter Email Id</div>\n                        <div *ngIf=\"f.userId.errors.email\">Email must be a valid email address</div>\n                    </div>\n                </div>\n                <label class=\"required-field\"  for=\"roleId\">Project Role</label>\n                <select formControlName=\"roleId\" (change)=\"roleSelect()\">\n                    <option *ngFor=\"let role of ProjectRoles\" [value]=\"role.roleId\">{{role.roleName}}\n                    </option>\n                 </select>\n                \n                    <div *ngIf=\"submitted && f.roleId.errors\" class=\"invalid-feedback\">\n                        <div *ngIf=\"f.roleId.errors.required\">Please select role</div>\n                    </div>\n                \n                \n                <div class=\"form-group text-center\">\n                    <button [disabled]=\"enableAdd\" class=\"btn btn-blue addBtn\">Add user</button>\n                    <button class=\"btn btn-blue addBtn float-right\" (click)=\"resetAddUserForm()\">Reset</button>\n                </div>\n                </form>\n        </div>\n    </div>\n</ng-template>\n\n<ng-template #modifyUser let-modal>\n    <div class=\"modal-header\">\n        <h4 class=\"modal-title text-center\" id=\"modifyUserModal\">Modify user role</h4>\n            <span aria-hidden=\"true\" class=\"text-white\" style=\"font-size: 160%;\"  (click)=\"modal.dismiss('Cross click')\">&times;</span>\n    </div>\n    <div class=\"modal-body\" class=\"mt-4\">\n        <div class=\"container-fluid\">\n            <form [formGroup]=\"editUserForm\">\n                <div class=\"form-group\">\n                <label>User Id: </label>\n                <input type=\"text\" formControlName=\"userId\" id=\"userId\"><br/>\n                <label for=\"roleId\">Select Project Role</label>\n                <select formControlName=\"roleId\">\n                    <option *ngFor=\"let role of ProjectRoles\" [value]=\"role.roleId\">{{role.roleName}}\n                    </option>\n                </select>\n                <div *ngIf=\"submitted && f.roleId.errors\" class=\"invalid-feedback\">\n                    <div *ngIf=\"f.roleId.errors.required\">Please select role</div>\n                </div>\n            </div>\n            \n            \n            <div class=\"form-group text-center\">\n                <button class=\"btn btn-blue addBtn\" (click)= \"editUserRole()\">Modify</button>\n            </div>  \n            </form>\n        </div>\n    </div>   \n</ng-template>\n\n\n\n\n";

    /***/
  }),
  /***/"./node_modules/raw-loader/dist/cjs.js!./src/app/projects/project-home/project-home.component.html": (
  /*!*********************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/projects/project-home/project-home.component.html ***!
    \*********************************************************************************************************/
  /*! exports provided: default */
  /***/
  function _node_modules_rawLoader_dist_cjsJs_src_app_projects_projectHome_projectHomeComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "\n<!-- <ul class=\"breadcrumb pl-0\">\n    <ng-container *ngFor=\"let item of breadcrumb; let i=index\">\n        <li *ngIf=\"i != breadcrumb.length-1\"><a routerLink=\"/{{item.url}}\">{{item.name}}</a></li>\n        <li *ngIf=\"i != 0 && i == breadcrumb.length-1\"><a> {{item.name}}</a></li>\n    </ng-container>\n</ul> -->\n\n\n<div *ngIf=\"isProjectListNull\">\n    <ngb-alert type=\"info\" [dismissible]=\"false\">No projects present. Please create a new one.</ngb-alert>\n</div>\n<div *ngIf=\"isFunctionListNull && !isProjectListNull\">\n    <ngb-alert type=\"info\" [dismissible]=\"false\">No functions present. Please create a new one.</ngb-alert>\n</div>\n\n<div *ngIf=\"!isProjectListNull\" class=\"text-center mt-3 mb-5\" >\n    <button class=\"btn createBtn enableDelete\" [ngClass]=\"{'enableDelete': isViewerFlag }\" title=\"Create Function\" [disabled]=\"isViewerFlag\" routerLink=\"/projects/function\" [queryParams]=\"{ action: 'createFunction', project:projectName }\"><h5 style=\"margin: 0;\">Create function +</h5></button>\n    \n    <!-- <img class=\"text-center createImg\" (click)=\"isViewerFlag\" routerLink=\"/function/create\" [queryParams]=\"{ action: 'createFunction', project:projectName }\" src=\"assets/images/addfunction.svg\" title=\"Create Function\"/> -->\n</div>\n\n\n\n\n\n<!-- Functions Table -->\n<div *ngIf=\"!isProjectListNull && !isFunctionListNull\" >\n    <div class=\"panel-body table-outer mb-5 p-0 rounded-top\" style=\"margin-left: auto;margin-right: auto;width:80%\">\n    <table>\n        <thead>\n            <tr>\n                <th>Function Name</th>\n                <th>Created Time</th>\n                <th>Runtime</th>\n                <th>Status</th>\n                <th>Logs</th>\n                <th>Description</th>\n                <th>Delete</th>\n             </tr>\n        </thead>\n        <tbody>\n            <tr class=\"mb-5\"  *ngFor=\"let function of paginatedData\">\n                <td><a title=\"close\" class=\"disabled\" [ngClass]=\"{'disabled': isViewerFlag }\" routerLink=\"/projects/function\" [queryParams]=\"{ action: 'deployFunction', project:projectName,function:function.functionName }\">{{ function.functionName }}</a></td>\n                <td>{{ function.createdTime | date: 'medium'}}</td>\n                <td>{{ function.runtime }}</td>\n                <td>{{ function.functionStatus }}</td>\n                <td><button title=\"Function Logs\" class=\"btn createBtn\" [disabled]=\"(function.functionStatus != 'DEPLOYED')\" routerLink=\"/projects/function/logs\" [queryParams]=\"{project:projectName,function:function.functionName }\">Logs</button></td>\n                <td><button title=\"Function Description\" class=\"btn createBtn\" [disabled]=\"(function.functionStatus != 'DEPLOYED')\" (click)=\"open(functionDescription);getFunctionDescription(function)\">Description</button></td>\n                <!-- <td><button title=\"Delete Function\" [disabled]=\"isViewerFlag\" (click)=\"deleteFunction(function)\">Delete</button></td> -->\n                <td (click)=\"isViewerFlag || deleteFunction(function)\" class=\"text-center enableDelete\" [ngClass]=\"{'enableDelete': isViewerFlag }\"><img src=\"../../../assets/images/delete.svg\" title=\"delete function\"></td>\n            </tr>\n        </tbody>\n    </table>\n    <ngb-pagination style=\"float: right;margin-top: 1rem;\" [collectionSize]=\"collectionSize\" [(page)]=\"currentPage\" [pageSize]=\"pageSize\" (pageChange)=\"refreshPagination()\">\n    </ngb-pagination>\n</div>\n</div>\n\n\n\n<ng-template #functionDescription let-modal>\n    <div class=\"modal-header\">\n        <h4 class=\"modal-title text-center\" id=\"functionDescriptionModal\">Function Description</h4>\n            <span aria-hidden=\"true\" class=\"text-white\" style=\"font-size: 160%;\"  (click)=\"modal.dismiss('Cross click')\">&times;</span>\n    </div>\n    <div class=\"modal-body\" class=\"mt-3 mb-4\">\n        <div class=\"container-fluid\">\n            <div>\n                <b>Function Invocation Count: &nbsp;</b><span>{{functionDescription.invocationCount != '' ? '0' : functionDescription.invocationCount}}</span><br/> \n    <b>Function URL:&nbsp;</b> <span>{{ functionUrl }}</span><br/>\n    <b>Function Trigger:&nbsp;</b><span>{{ functionTriggerType }}</span><br/>\n    <b>Scale to Zero:&nbsp;</b><span>{{ scaleToZeroFlag }}</span><br/>\n    <b *ngIf=\"(functionDescription.annotations != null)\">Function Annotations:</b>\n    <div *ngFor=\"let item of functionAnnotations | keyvalue\">\n       <b>{{item.key}}</b> : <span>{{item.value}}</span>\n    </div>    \n            </div>\n        </div>\n    </div>\n  \n</ng-template>\n\n\n\n";

    /***/
  }),
  /***/"./node_modules/raw-loader/dist/cjs.js!./src/app/projects/projects.component.html": (
  /*!****************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/projects/projects.component.html ***!
    \****************************************************************************************/
  /*! exports provided: default */
  /***/
  function _node_modules_rawLoader_dist_cjsJs_src_app_projects_projectsComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "<app-header [currentProjectObj]=\"currentProjectObj\" (newProjectObject) = \"newProjectObject($event)\"></app-header>\n\n<app-footer></app-footer>\n<router-outlet></router-outlet>\n\n\n\n";

    /***/
  }),
  /***/"./node_modules/raw-loader/dist/cjs.js!./src/app/projects/usage/usage.component.html": (
  /*!*******************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/projects/usage/usage.component.html ***!
    \*******************************************************************************************/
  /*! exports provided: default */
  /***/
  function _node_modules_rawLoader_dist_cjsJs_src_app_projects_usage_usageComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "\n\n<ul class=\"breadcrumb pl-0\">\n    <ng-container *ngFor=\"let bread of breadcrumb; let i=index\">\n        \n        <li *ngIf=\"i != breadcrumb.length-1\"><a [routerLink]='[bread.url]' [queryParams]=\"bread.params\" routerLinkActive='active'>{{ bread.name }}</a></li>\n        <li *ngIf=\"i != 0 && i == breadcrumb.length-1\"><a> {{bread.name}}</a></li>\n    </ng-container>\n</ul>\n\n<ngb-alert *ngIf=\"alertMsg\" [dismissible]=\"true\"  (close)=\"alertMsg = null\">{{ alertMsg }}</ngb-alert>\n\n<div id=\"cover-caption\">\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form mt-1\">\n                <div  class=\"justify-content-center col-12\">\n                        <h5 class=\"display-8 text-truncate\">Project Usage</h5>                              \n                     </div>\n                     <!-- <form class=\"justify-content-center form-inline\">\n                        <div class=\"form-group  mt-2\">\n                        <b>Start Time: &nbsp;</b>\n                        <input type=\"datetime-local\"/>\n                        </div>\n                        <div class=\"form-group  mt-2\">\n                            <b>End Time: &nbsp;</b>\n                            <input type=\"datetime-local\"/>\n                            </div>\n                            \n                        </form>\n                        <div class=\"form-group mt-2\">\n                            <button class=\"btn\" style=\"border: 2px solid rgb(6, 6, 248);\" (click)=\"getProjectUsage()\">Get Usage</button>\n                        </div> -->\n                        <div *ngIf=\"!isprojectUsageListsNull\" class=\"justify-content-center col-12 form-group mt-2\">\n                            <b>Total Usage: {{ total }}</b>\n                        </div>\n                     </div>\n                     </div>\n                     </div>\n                     </div>\n                     \n\n\n<div *ngIf=\"!isprojectUsageListsNull\" class=\"panel-body table-outer mt-1 p-0 rounded-top\" style=\"width: 50%;\nmargin-left: auto;\nmargin-right: auto;\">\n<table>\n    <thead>\n        <tr>\n        <th>Function Name</th>\n        <th>Usage</th>\n    </tr>\n    </thead>\n    <tbody>\n        <tr  *ngFor=\"let projectUsage of paginatedData\">\n            <td>{{ projectUsage.functionName }}</td>\n            <td>{{ projectUsage.usage }}</td>\n        </tr>        \n    </tbody>\n</table>\n<ngb-pagination style=\"float: right;margin-top: 1rem;\" [collectionSize]=\"collectionSize\" [(page)]=\"currentPage\" [pageSize]=\"pageSize\" (pageChange)=\"refreshPagination()\">\n</ngb-pagination>\n</div>\n\n\n\n";

    /***/
  }),
  /***/"./node_modules/raw-loader/dist/cjs.js!./src/app/root/configuration/configuration.component.html": (
  /*!*******************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/root/configuration/configuration.component.html ***!
    \*******************************************************************************************************/
  /*! exports provided: default */
  /***/
  function _node_modules_rawLoader_dist_cjsJs_src_app_root_configuration_configurationComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "<p>configuration works!</p>\n\n";

    /***/
  }),
  /***/"./node_modules/raw-loader/dist/cjs.js!./src/app/root/root.component.html": (
  /*!********************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/root/root.component.html ***!
    \********************************************************************************/
  /*! exports provided: default */
  /***/
  function _node_modules_rawLoader_dist_cjsJs_src_app_root_rootComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "<app-layout></app-layout>\n\n";

    /***/
  }),
  /***/"./node_modules/raw-loader/dist/cjs.js!./src/app/root/users/users.component.html": (
  /*!***************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/root/users/users.component.html ***!
    \***************************************************************************************/
  /*! exports provided: default */
  /***/
  function _node_modules_rawLoader_dist_cjsJs_src_app_root_users_usersComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "\n<ngb-alert *ngIf=\"alertMessage\" [dismissible]=\"true\" (close)=\"alertMessage = null\">{{ alertMessage }}</ngb-alert>\n\n<img (click)=\"open(addUser)\" class=\"text-center\" src=\"../../../assets/images/Add User.svg\" title=\"Add user\">\n\n\n\n<ng-template #addUser let-modal>\n    <div class=\"modal-header\">\n        <h4 class=\"modal-title text-center\" id=\"addUserModal\">Add user</h4>\n        <!-- <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\"> -->\n            <span aria-hidden=\"true\" class=\"text-white\" style=\"font-size: 160%;\"  (click)=\"modal.dismiss('Cross click')\">&times;</span>\n        <!-- </button> -->\n    </div>\n    <div class=\"modal-body\" class=\"mt-4\">\n        <div class=\"container-fluid\">\n            <form [formGroup]=\"addUserForm\" (ngSubmit)=\"onSubmit()\">\n                <div class=\"form-group\">\n                    <label class=\"required-field\" for=\"userId\">Email-id</label>\n                    <input type=\"text\" formControlName=\"userId\" id=\"userId\" class=\"fadeIn second\" name=\"userId\"\n                        placeholder=\"Email ID\" (keypress)=\"emailClick()\" [ngClass]=\"{ 'is-invalid':submitted && f.userId.errors }\"><br />\n                        <div *ngIf=\"submitted && f.userId.errors\" class=\"invalid-feedback\">\n                            <div *ngIf=\"f.userId.errors.required\">Please enter your Email Id</div>\n                            <div *ngIf=\"f.userId.errors.email\">Email must be a valid email address</div>\n                        </div>\n                    <label for=\"userName\">User name</label>\n                    <input type=\"text\" formControlName=\"name\" id=\"name\" class=\"fadeIn second\" name=\"userId\"\n                        placeholder=\"User name\" (keypress)=\"nameClick()\"><br />\n                    <label class=\"required-field\" for=\"userName\">Role</label>\n                    <select  type=\"text\" formControlName=\"orgRoleId\" id=\"orgRoleId\" class=\"fadeIn second\" name=\"userId\"\n                        placeholder=\"role id\" (change)=\"roleClick()\">   \n                        <option value=\"\" disabled>Choose Role</option>\n                        <option *ngFor=\"let role of userRoles\" [value]=\"role.roleId\">{{role.roleName}}</option>\n                    </select>\n                    \n                    <!-- <div *ngIf=\"submitted && f.name.errors\" class=\"invalid-feedback\">\n                        <div *ngIf=\"f.name.errors.required\">Please your name</div>\n                    </div> -->\n                    <div *ngIf=\"submitted && f.orgRoleId.errors\" class=\"invalid-feedback\">\n                        <div *ngIf=\"f.orgRoleId.errors.required\">Please select a role</div>\n                    </div>\n                </div>\n                <div class=\"form-group text-center\">\n                    <button [disabled]=\"enableLogin\" class=\"btn btn-blue partial-border-rad py-2 px-5 mr-2 resetBtn\">Add</button>\n                        <button class=\"btn btn-blue partial-border-rad py-2 px-5 mr-2 resetBtn\" (click)=\"resetAddUserForm()\" >Reset</button>\n                </div>\n            </form>\n        </div>\n    </div>\n    <!-- <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-light\" (click)=\"modal.close('Close click')\">Cancel</button>\n    </div> -->\n</ng-template>\n\n\n\n<!-- <div>\n    <form [formGroup]=\"addUserForm\" (ngSubmit)=\"onSubmit()\">\n        <div class=\"form-group\">\n            <label for=\"login\">Input User Details</label>\n            <input type=\"text\" formControlName=\"userId\" id=\"userId\" class=\"fadeIn second\" name=\"userId\"\n                placeholder=\"Email ID\" (keypress)=\"emailClick()\">\n            <input type=\"text\" formControlName=\"name\" id=\"name\" class=\"fadeIn second\" name=\"userId\"\n                placeholder=\"User name\" (keypress)=\"nameClick()\">\n            <select type=\"text\" formControlName=\"orgRoleId\" id=\"orgRoleId\" class=\"fadeIn second\" name=\"userId\"\n                placeholder=\"Role ID\" (keypress)=\"roleClick()\">\n                <option disabled>Select a role</option>\n                <option *ngFor=\"let role of userRoles\" [value]=\"role.id\">{{role.name}}</option>\n            </select>\n\n            <div *ngIf=\"submitted && f.userId.errors\" class=\"invalid-feedback\">\n                <div *ngIf=\"f.userId.errors.required\">Please enter your Email Id</div>\n                <div *ngIf=\"f.userId.errors.email\">Email must be a valid email address</div>\n            </div>\n            <div *ngIf=\"submitted && f.name.errors\" class=\"invalid-feedback\">\n                <div *ngIf=\"f.name.errors.required\">Please your name</div>\n            </div>\n            <div *ngIf=\"submitted && f.orgRoleId.errors\" class=\"invalid-feedback\">\n                <div *ngIf=\"f.orgRoleId.errors.required\">Please select a role</div>\n            </div>\n        </div>\n        <div class=\"form-group text-center\">\n            <button [disabled]=\"loading\" class=\"btn btn-blue partial-border-rad py-2 px-5 mr-2 enableLogin\"\n                [ngClass]=\"{'enableLogin': enableLogin }\">Add</button>\n        </div>\n    </form>\n</div> -->\n\n\n\n<!-- users table div -->\n\n<div class=\"panel-body table-outer mb-5 p-0 rounded-top\">\n    <table class=\"center\">\n        <thead>\n            <tr>\n                <th>User Id</th>\n                <th>User name</th>\n                <th>Role</th>\n                <th>Last login</th>\n                <th>Delete</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr class=\"mb-5\" *ngFor=\"let user of paginatedData\">\n                <td>{{user.userId}}</td>\n                <td>{{user.name}}</td>\n                <td>{{user.orgRole}}</td>\n                <td>{{user.lastLogin | date:'medium'}}</td>\n                <td (click)=deleteUser(user) class=\"text-center\"><img src=\"../../../assets/images/delete.svg\" title=\"delete user\"></td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n\n\n<div class=\"d-flex justify-content-between p-2\">\n    <ngb-pagination [collectionSize]=\"collectionSize\" [(page)]=\"currentPage\" [pageSize]=\"pageSize\" (pageChange)=\"refreshPagination()\">\n    </ngb-pagination>\n</div>\n\n\n\n\n    \n";

    /***/
  }),
  /***/"./node_modules/tslib/tslib.es6.js": (
  /*!*****************************************!*\
    !*** ./node_modules/tslib/tslib.es6.js ***!
    \*****************************************/
  /*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
  /***/
  function _node_modules_tslib_tslibEs6Js(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "__extends", function () {
      return __extends;
    });
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "__assign", function () {
      return _assign;
    });
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "__rest", function () {
      return __rest;
    });
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "__decorate", function () {
      return __decorate;
    });
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "__param", function () {
      return __param;
    });
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "__metadata", function () {
      return __metadata;
    });
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "__awaiter", function () {
      return __awaiter;
    });
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "__generator", function () {
      return __generator;
    });
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "__createBinding", function () {
      return __createBinding;
    });
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "__exportStar", function () {
      return __exportStar;
    });
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "__values", function () {
      return __values;
    });
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "__read", function () {
      return __read;
    });
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "__spread", function () {
      return __spread;
    });
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "__spreadArrays", function () {
      return __spreadArrays;
    });
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "__await", function () {
      return __await;
    });
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function () {
      return __asyncGenerator;
    });
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function () {
      return __asyncDelegator;
    });
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "__asyncValues", function () {
      return __asyncValues;
    });
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function () {
      return __makeTemplateObject;
    });
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "__importStar", function () {
      return __importStar;
    });
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "__importDefault", function () {
      return __importDefault;
    });
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function () {
      return __classPrivateFieldGet;
    });
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function () {
      return __classPrivateFieldSet;
    });
    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.
    
    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.
    
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var _extendStatics = function extendStatics(d, b) {
      _extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };
      return _extendStatics(d, b);
    };
    function __extends(d, b) {
      _extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var _assign = function __assign() {
      _assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
      return _assign.apply(this, arguments);
    };
    function __rest(s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
      }
      return t;
    }
    function __decorate(decorators, target, key, desc) {
      var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
      return function (target, key) {
        decorator(target, key, paramIndex);
      };
    }
    function __metadata(metadataKey, metadataValue) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    }
    function __generator(thisArg, body) {
      var _ = {
          label: 0,
          sent: function sent() {
            if (t[0] & 1) throw t[1];
            return t[1];
          },
          trys: [],
          ops: []
        },
        f,
        y,
        t,
        g;
      return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
      }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;
      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    }
    function __createBinding(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
    }
    function __exportStar(m, exports) {
      for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    function __values(o) {
      var s = typeof Symbol === "function" && Symbol.iterator,
        m = s && o[s],
        i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function next() {
          if (o && i >= o.length) o = void 0;
          return {
            value: o && o[i++],
            done: !o
          };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o),
        r,
        ar = [],
        e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = {
          error: error
        };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    }
    function __spread() {
      for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
      return ar;
    }
    function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
      return r;
    }
    ;
    function __await(v) {
      return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var g = generator.apply(thisArg, _arguments || []),
        i,
        q = [];
      return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
        return this;
      }, i;
      function verb(n) {
        if (g[n]) i[n] = function (v) {
          return new Promise(function (a, b) {
            q.push([n, v, a, b]) > 1 || resume(n, v);
          });
        };
      }
      function resume(n, v) {
        try {
          step(g[n](v));
        } catch (e) {
          settle(q[0][3], e);
        }
      }
      function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
      }
      function fulfill(value) {
        resume("next", value);
      }
      function reject(value) {
        resume("throw", value);
      }
      function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
      }
    }
    function __asyncDelegator(o) {
      var i, p;
      return i = {}, verb("next"), verb("throw", function (e) {
        throw e;
      }), verb("return"), i[Symbol.iterator] = function () {
        return this;
      }, i;
      function verb(n, f) {
        i[n] = o[n] ? function (v) {
          return (p = !p) ? {
            value: __await(o[n](v)),
            done: n === "return"
          } : f ? f(v) : v;
        } : f;
      }
    }
    function __asyncValues(o) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var m = o[Symbol.asyncIterator],
        i;
      return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
        return this;
      }, i);
      function verb(n) {
        i[n] = o[n] && function (v) {
          return new Promise(function (resolve, reject) {
            v = o[n](v), settle(resolve, reject, v.done, v.value);
          });
        };
      }
      function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function (v) {
          resolve({
            value: v,
            done: d
          });
        }, reject);
      }
    }
    function __makeTemplateObject(cooked, raw) {
      if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", {
          value: raw
        });
      } else {
        cooked.raw = raw;
      }
      return cooked;
    }
    ;
    function __importStar(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
      result["default"] = mod;
      return result;
    }
    function __importDefault(mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
      if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
      }
      return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
      if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
      }
      privateMap.set(receiver, value);
      return value;
    }

    /***/
  }),
  /***/"./src/app/_model/function.ts": (
  /*!************************************!*\
    !*** ./src/app/_model/function.ts ***!
    \************************************/
  /*! exports provided: Function */
  /***/
  function _src_app__model_functionTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "Function", function () {
      return Function;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */"./node_modules/tslib/tslib.es6.js");
    var Function = /*#__PURE__*/_createClass(function Function() {
      _classCallCheck(this, Function);
      this.projectName = "";
    });
    /***/
  }),
  /***/"./src/app/_model/project.ts": (
  /*!***********************************!*\
    !*** ./src/app/_model/project.ts ***!
    \***********************************/
  /*! exports provided: Project */
  /***/
  function _src_app__model_projectTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "Project", function () {
      return Project;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */"./node_modules/tslib/tslib.es6.js");
    var Project = /*#__PURE__*/_createClass(function Project() {
      _classCallCheck(this, Project);
      this.projectName = "";
      this.projectRoleName = "";
      this.userId = "";
      this.roleId = "";
    });
    /***/
  }),
  /***/"./src/app/_services/alert.service.ts": (
  /*!********************************************!*\
    !*** ./src/app/_services/alert.service.ts ***!
    \********************************************/
  /*! exports provided: AlertService */
  /***/
  function _src_app__services_alertServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "AlertService", function () {
      return AlertService;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */"./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */"./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */
    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */"./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */
    var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */"./node_modules/rxjs/_esm2015/index.js");
    var AlertService = /*#__PURE__*/function () {
      function AlertService(router) {
        var _this = this;
        _classCallCheck(this, AlertService);
        this.router = router;
        this.subject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.keepAfterNavigationChange = false;
        // clear alert message on route change
        router.events.subscribe(function (event) {
          if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationStart"]) {
            if (_this.keepAfterNavigationChange) {
              // only keep for a single location change
              _this.keepAfterNavigationChange = false;
            } else {
              // clear alert
              _this.subject.next();
            }
          }
        });
      }
      return _createClass(AlertService, [{
        key: "success",
        value: function success(message) {
          var keepAfterNavigationChange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          this.keepAfterNavigationChange = keepAfterNavigationChange;
          this.subject.next({
            type: 'success',
            text: message
          });
        }
      }, {
        key: "error",
        value: function error(message) {
          var keepAfterNavigationChange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          this.keepAfterNavigationChange = keepAfterNavigationChange;
          this.subject.next({
            type: 'error',
            text: message
          });
        }
      }, {
        key: "getMessage",
        value: function getMessage() {
          return this.subject.asObservable();
        }
      }, {
        key: "clear",
        value: function clear() {
          this.subject.next();
        }
      }]);
    }();
    AlertService.ctorParameters = function () {
      return [{
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
      }];
    };
    AlertService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    })], AlertService);

    /***/
  }),
  /***/"./src/app/_services/authentication.service.ts": (
  /*!*****************************************************!*\
    !*** ./src/app/_services/authentication.service.ts ***!
    \*****************************************************/
  /*! exports provided: AuthenticationService */
  /***/
  function _src_app__services_authenticationServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "AuthenticationService", function () {
      return AuthenticationService;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */"./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */"./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */
    var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */"./node_modules/@angular/common/fesm2015/http.js");
    /* harmony import */
    var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment */"./src/environments/environment.ts");
    var AuthenticationService = /*#__PURE__*/function () {
      function AuthenticationService(http) {
        _classCallCheck(this, AuthenticationService);
        this.http = http;
        this.APIUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiUrl;
      }
      return _createClass(AuthenticationService, [{
        key: "login",
        value: function login(userName, password) {
          var headers = this.getHeadersForLogin(userName, password);
          var Headers = {
            headers: headers
          };
          return this.http.post(this.APIUrl + "/auth/login", null, Headers);
        }
      }, {
        key: "getHeadersForLogin",
        value: function getHeadersForLogin(userName, password) {
          var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
          headers = headers.set('Accept', 'application/json');
          headers = headers.set('Content-Type', 'application/json');
          headers = headers.set('Authorization', 'Basic ' + btoa(userName + ":" + password));
          return headers;
        }
      }, {
        key: "getHeadersAfterLogin",
        value: function getHeadersAfterLogin() {
          var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
          //headers('Access-Control-Allow-Origin: *');
          //headers = headers.set('Access-Control-Allow-Origin','*');
          headers = headers.set('Accept', 'application/json');
          headers = headers.set('Content-Type', 'application/json');
          headers = headers.set('token', localStorage.getItem('token') + '');
          headers = headers.set('userId', localStorage.getItem('userId') + '');
          return headers;
        }
      }, {
        key: "addUserToOrg",
        value: function addUserToOrg(user) {
          var headers = this.getHeadersAfterLogin();
          var Headers = {
            headers: headers
          };
          console.log("user :", user);
          console.log("headers :", Headers);
          return this.http.post(this.APIUrl + "/org/user/add", user, Headers);
        }
      }, {
        key: "deleteUserFromOrg",
        value: function deleteUserFromOrg(user) {
          var headers = this.getHeadersAfterLogin();
          var requestOptions = {
            headers: headers,
            body: user
          };
          return this.http["delete"](this.APIUrl + "/org/user/delete", requestOptions);
        }
      }, {
        key: "listUsersOfOrg",
        value: function listUsersOfOrg() {
          var headers = this.getHeadersAfterLogin();
          var Headers = {
            headers: headers
          };
          return this.http.get(this.APIUrl + "/org/user/list", Headers);
        }
      }, {
        key: "getUserRoles",
        value: function getUserRoles() {
          var headers = this.getHeadersAfterLogin();
          var Headers = {
            headers: headers
          };
          return this.http.get(this.APIUrl + "/org/user/roles", Headers);
        }
      }, {
        key: "logout",
        value: function logout() {
          //localStorage.removeItem('token');
          localStorage.clear();
        }
      }]);
    }();
    AuthenticationService.ctorParameters = function () {
      return [{
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]
      }];
    };
    AuthenticationService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    })], AuthenticationService);

    /***/
  }),
  /***/"./src/app/_services/function.service.ts": (
  /*!***********************************************!*\
    !*** ./src/app/_services/function.service.ts ***!
    \***********************************************/
  /*! exports provided: FunctionService */
  /***/
  function _src_app__services_functionServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "FunctionService", function () {
      return FunctionService;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */"./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */"./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */
    var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */"./node_modules/@angular/common/fesm2015/http.js");
    /* harmony import */
    var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment */"./src/environments/environment.ts");
    var FunctionService = /*#__PURE__*/function () {
      function FunctionService(http) {
        _classCallCheck(this, FunctionService);
        this.http = http;
        this.APIUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiUrl;
      }
      return _createClass(FunctionService, [{
        key: "createFunction",
        value: function createFunction(functionObj) {
          var headers = this.getHeadersAfterLogin(functionObj.projectName);
          var Headers = {
            headers: headers
          };
          return this.http.post(this.APIUrl + "/function/create", functionObj, Headers);
        }
      }, {
        key: "deployFunction",
        value: function deployFunction(functionObj) {
          var headers = this.getHeadersAfterLogin(functionObj.projectName);
          var Headers = {
            headers: headers
          };
          return this.http.post(this.APIUrl + "/function/deploy", functionObj, Headers);
        }
      }, {
        key: "listFunctions",
        value: function listFunctions(projectName) {
          var headers = this.getHeadersAfterLogin(projectName);
          var Headers = {
            headers: headers
          };
          return this.http.get(this.APIUrl + "/function/list?projectName=" + projectName, Headers);
        }
      }, {
        key: "getFunctionLogs",
        value: function getFunctionLogs(functionObj) {
          var headers = this.getHeadersAfterLogin(functionObj.projectName);
          var Headers = {
            headers: headers
          };
          return this.http.get(this.APIUrl + "/function/logs?projectName=" + functionObj.projectName + "&functionName=" + functionObj.functionName + "&since=" + functionObj.timestamp + "&tail=" + functionObj.limits, Headers);
        }
      }, {
        key: "getFunctionBuildLog",
        value: function getFunctionBuildLog(functionObj) {
          var headers = this.getHeadersAfterLogin(functionObj.projectName);
          var Headers = {
            headers: headers
          };
          return this.http.get(this.APIUrl + "/function/buildlog?projectName=" + functionObj.projectName + "&functionName=" + functionObj.functionName, Headers);
        }
      }, {
        key: "deleteFunction",
        value: function deleteFunction(functionObj) {
          var headers = this.getHeadersAfterLogin(functionObj.projectName);
          var Headers = {
            headers: headers
          };
          var requestOptions = {
            headers: headers,
            body: functionObj
          };
          return this.http["delete"](this.APIUrl + "/function/delete", requestOptions);
        }
      }, {
        key: "getFunctionDescription",
        value: function getFunctionDescription(functionObj) {
          var headers = this.getHeadersAfterLogin(functionObj.projectName);
          var Headers = {
            headers: headers
          };
          return this.http.get(this.APIUrl + "/function/describe?projectName=" + functionObj.projectName + "&functionName=" + functionObj.functionName, Headers);
        }
        /*  Update Later
          updateFunction(functionObj : Function){
            let headers = this.getHeadersAfterLogin(functionObj.projectName);
            let Headers = { headers: headers };
            return this.http.put(this.APIUrl+"/function/update",functionObj,Headers)
          }
        */
      }, {
        key: "getHeadersAfterLogin",
        value: function getHeadersAfterLogin(projectName) {
          var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
          headers = headers.set('Content-Type', 'application/json');
          headers = headers.set('token', localStorage.getItem('token') + '');
          headers = headers.set('userId', localStorage.getItem('userId') + '');
          headers = headers.set("projectName", projectName);
          return headers;
        }
      }]);
    }();
    FunctionService.ctorParameters = function () {
      return [{
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]
      }];
    };
    FunctionService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    })], FunctionService);

    /***/
  }),
  /***/"./src/app/_services/project.service.ts": (
  /*!**********************************************!*\
    !*** ./src/app/_services/project.service.ts ***!
    \**********************************************/
  /*! exports provided: ProjectService */
  /***/
  function _src_app__services_projectServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "ProjectService", function () {
      return ProjectService;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */"./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */"./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */
    var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */"./node_modules/@angular/common/fesm2015/http.js");
    /* harmony import */
    var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment */"./src/environments/environment.ts");
    var ProjectService = /*#__PURE__*/function () {
      function ProjectService(http) {
        _classCallCheck(this, ProjectService);
        this.http = http;
        this.APIUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiUrl;
      }
      return _createClass(ProjectService, [{
        key: "projectName",
        get: function get() {
          return this.projectName;
        },
        set: function set(val) {
          this.projectName = val;
        }
      }, {
        key: "createProject",
        value: function createProject(projectObj) {
          var headers = this.getHeadersAfterLogin(projectObj.projectName);
          var Headers = {
            headers: headers
          };
          return this.http.post(this.APIUrl + "/project/create", projectObj, Headers);
        }
      }, {
        key: "getProjectRoles",
        value: function getProjectRoles(projectName) {
          var headers = this.getHeadersAfterLogin(projectName);
          var Headers = {
            headers: headers
          };
          return this.http.get(this.APIUrl + "/project/roles", Headers);
        }
      }, {
        key: "addUserToProject",
        value: function addUserToProject(projectObj) {
          var headers = this.getHeadersAfterLogin(projectObj.projectName);
          var Headers = {
            headers: headers
          };
          console.log("Headers:", Headers);
          console.log("projectObj", projectObj);
          return this.http.post(this.APIUrl + "/project/manage/users/add", projectObj, Headers);
        }
      }, {
        key: "deleteUserFromProject",
        value: function deleteUserFromProject(projectObj) {
          var headers = this.getHeadersAfterLogin(projectObj.projectName);
          var Headers = {
            headers: headers
          };
          var requestOptions = {
            headers: headers,
            body: projectObj
          };
          return this.http["delete"](this.APIUrl + "/project/manage/users/delete", requestOptions);
        }
      }, {
        key: "modifyUserRole",
        value: function modifyUserRole(projectObj) {
          var headers = this.getHeadersAfterLogin(projectObj.projectName);
          var Headers = {
            headers: headers
          };
          return this.http.put(this.APIUrl + "/project/manage/user/modify", projectObj, Headers);
        }
      }, {
        key: "deleteProject",
        value: function deleteProject(projectObj) {
          var headers = this.getHeadersAfterLogin(projectObj.projectName);
          var Headers = {
            headers: headers
          };
          var requestOptions = {
            headers: headers,
            body: projectObj
          };
          return this.http["delete"](this.APIUrl + "/project/delete", requestOptions);
        }
      }, {
        key: "listProjects",
        value: function listProjects(userId) {
          var headers = this.getHeadersAfterLogin("");
          var Headers = {
            headers: headers
          };
          return this.http.get(this.APIUrl + "/project/listProjects?userId=" + userId, Headers);
        }
      }, {
        key: "getProjectUsage",
        value: function getProjectUsage(projectObj) {
          var headers = this.getHeadersAfterLogin(projectObj.projectName);
          var Headers = {
            headers: headers
          };
          return this.http.post(this.APIUrl + "/project/usage", projectObj, Headers);
        }
      }, {
        key: "getProjectInfo",
        value: function getProjectInfo(projectName) {
          var headers = this.getHeadersAfterLogin(projectName);
          var Headers = {
            headers: headers
          };
          return this.http.get(this.APIUrl + "/project/info?projectName=" + projectName, Headers);
        }
      }, {
        key: "getHeadersAfterLogin",
        value: function getHeadersAfterLogin(projectName) {
          var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
          headers = headers.set('Accept', 'application/json');
          headers = headers.set('Content-Type', 'application/json');
          headers = headers.set('token', localStorage.getItem('token') + '');
          headers = headers.set('userId', localStorage.getItem('userId') + '');
          headers = headers.set("projectName", projectName);
          return headers;
        }
      }]);
    }();
    ProjectService.ctorParameters = function () {
      return [{
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]
      }];
    };
    ProjectService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    })], ProjectService);

    /***/
  }),
  /***/"./src/app/_services/spinner.service.ts": (
  /*!**********************************************!*\
    !*** ./src/app/_services/spinner.service.ts ***!
    \**********************************************/
  /*! exports provided: SpinnerService */
  /***/
  function _src_app__services_spinnerServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "SpinnerService", function () {
      return SpinnerService;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */"./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */"./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */
    var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */"./node_modules/rxjs/_esm2015/index.js");
    var SpinnerService = /*#__PURE__*/function () {
      function SpinnerService() {
        _classCallCheck(this, SpinnerService);
        this.status = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](false);
      }
      return _createClass(SpinnerService, [{
        key: "spinner",
        value: function spinner(value) {
          this.status.next(value);
        }
      }]);
    }();
    SpinnerService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    })], SpinnerService);

    /***/
  }),
  /***/"./src/app/app-routing.module.ts": (
  /*!***************************************!*\
    !*** ./src/app/app-routing.module.ts ***!
    \***************************************/
  /*! exports provided: AppRoutingModule */
  /***/
  function _src_app_appRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function () {
      return AppRoutingModule;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */"./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */"./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */
    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */"./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */
    var _authlayout_authlayout_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./authlayout/authlayout.component */"./src/app/authlayout/authlayout.component.ts");
    /* harmony import */
    var _authlayout_login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./authlayout/login/login.component */"./src/app/authlayout/login/login.component.ts");
    /* harmony import */
    var _projects_projects_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./projects/projects.component */"./src/app/projects/projects.component.ts");
    /* harmony import */
    var _root_root_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./root/root.component */"./src/app/root/root.component.ts");
    /* harmony import */
    var _layout_layout_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./layout/layout.component */"./src/app/layout/layout.component.ts");
    /* harmony import */
    var _root_configuration_configuration_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./root/configuration/configuration.component */"./src/app/root/configuration/configuration.component.ts");
    /* harmony import */
    var _root_users_users_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./root/users/users.component */"./src/app/root/users/users.component.ts");
    /* harmony import */
    var _projects_manage_manage_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./projects/manage/manage.component */"./src/app/projects/manage/manage.component.ts");
    /* harmony import */
    var _projects_usage_usage_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./projects/usage/usage.component */"./src/app/projects/usage/usage.component.ts");
    /* harmony import */
    var _function_create_create_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./function/create/create.component */"./src/app/function/create/create.component.ts");
    /* harmony import */
    var _function_logs_logs_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./function/logs/logs.component */"./src/app/function/logs/logs.component.ts");
    /* harmony import */
    var _projects_project_home_project_home_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./projects/project-home/project-home.component */"./src/app/projects/project-home/project-home.component.ts");
    var routes = [{
      path: 'auth',
      component: _authlayout_authlayout_component__WEBPACK_IMPORTED_MODULE_3__["AuthlayoutComponent"],
      children: [{
        path: 'login',
        component: _authlayout_login_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"]
      }]
    }, {
      path: 'projects',
      component: _projects_projects_component__WEBPACK_IMPORTED_MODULE_5__["ProjectsComponent"],
      children: [{
        path: 'manage',
        component: _projects_manage_manage_component__WEBPACK_IMPORTED_MODULE_10__["ManageComponent"]
      }, {
        path: 'usage',
        component: _projects_usage_usage_component__WEBPACK_IMPORTED_MODULE_11__["UsageComponent"]
      }, {
        path: 'home',
        component: _projects_project_home_project_home_component__WEBPACK_IMPORTED_MODULE_14__["ProjectHomeComponent"]
      }, {
        path: 'function',
        component: _function_create_create_component__WEBPACK_IMPORTED_MODULE_12__["CreateComponent"]
      }, {
        path: 'function/logs',
        component: _function_logs_logs_component__WEBPACK_IMPORTED_MODULE_13__["LogsComponent"]
      }]
    },
    // { path: 'projects/home', component: ManageComponent },
    {
      path: 'root',
      component: _root_root_component__WEBPACK_IMPORTED_MODULE_6__["RootComponent"],
      children: [{
        path: 'users',
        component: _root_users_users_component__WEBPACK_IMPORTED_MODULE_9__["UsersComponent"]
      }, {
        path: 'configuration',
        component: _root_configuration_configuration_component__WEBPACK_IMPORTED_MODULE_8__["ConfigurationComponent"]
      }]
    },
    // { path: 'function/create', component: CreateComponent },
    // { path: 'function/logs', component: LogsComponent },
    // {
    //   path: 'function',
    //   component: FunctionComponent,
    //   children: [
    //     //{ path: 'logs', component: LogsComponent },
    //     //{ path: 'create', component: CreateComponent}
    //   ]
    // },
    {
      path: '',
      component: _layout_layout_component__WEBPACK_IMPORTED_MODULE_7__["LayoutComponent"]
    }, {
      path: '**',
      redirectTo: 'auth/login'
    }];
    var AppRoutingModule = /*#__PURE__*/_createClass(function AppRoutingModule() {
      _classCallCheck(this, AppRoutingModule);
    });
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes, {
        onSameUrlNavigation: 'reload',
        useHash: true
      })],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })], AppRoutingModule);

    /***/
  }),
  /***/"./src/app/app.component.scss": (
  /*!************************************!*\
    !*** ./src/app/app.component.scss ***!
    \************************************/
  /*! exports provided: default */
  /***/
  function _src_app_appComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */";

    /***/
  }),
  /***/"./src/app/app.component.ts": (
  /*!**********************************!*\
    !*** ./src/app/app.component.ts ***!
    \**********************************/
  /*! exports provided: AppComponent */
  /***/
  function _src_app_appComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
      return AppComponent;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */"./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */"./node_modules/@angular/core/fesm2015/core.js");
    var AppComponent = /*#__PURE__*/_createClass(function AppComponent() {
      _classCallCheck(this, AppComponent);
      this.title = 'openfaas';
      // newProjectObject(projectObj: Project){
      // }
    });
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-root',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app.component.html */"./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./app.component.scss */"./src/app/app.component.scss"))["default"]]
    })], AppComponent);

    /***/
  }),
  /***/"./src/app/app.module.ts": (
  /*!*******************************!*\
    !*** ./src/app/app.module.ts ***!
    \*******************************/
  /*! exports provided: AppModule */
  /***/
  function _src_app_appModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "AppModule", function () {
      return AppModule;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */"./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */"./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
    /* harmony import */
    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */"./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */"./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */
    var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */"./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */
    var _app_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app-routing.module */"./src/app/app-routing.module.ts");
    /* harmony import */
    var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */"./src/app/app.component.ts");
    /* harmony import */
    var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */"./node_modules/@angular/common/fesm2015/http.js");
    /* harmony import */
    var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */"./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
    /* harmony import */
    var _authlayout_authlayout_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./authlayout/authlayout.component */"./src/app/authlayout/authlayout.component.ts");
    /* harmony import */
    var _authlayout_login_login_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./authlayout/login/login.component */"./src/app/authlayout/login/login.component.ts");
    /* harmony import */
    var _projects_projects_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./projects/projects.component */"./src/app/projects/projects.component.ts");
    /* harmony import */
    var _root_root_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./root/root.component */"./src/app/root/root.component.ts");
    /* harmony import */
    var _layout_layout_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./layout/layout.component */"./src/app/layout/layout.component.ts");
    /* harmony import */
    var _layout_common_header_header_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./layout/common/header/header.component */"./src/app/layout/common/header/header.component.ts");
    /* harmony import */
    var _layout_common_footer_footer_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./layout/common/footer/footer.component */"./src/app/layout/common/footer/footer.component.ts");
    /* harmony import */
    var _layout_common_leftsidenav_leftsidenav_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./layout/common/leftsidenav/leftsidenav.component */"./src/app/layout/common/leftsidenav/leftsidenav.component.ts");
    /* harmony import */
    var _root_users_users_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./root/users/users.component */"./src/app/root/users/users.component.ts");
    /* harmony import */
    var _root_configuration_configuration_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./root/configuration/configuration.component */"./src/app/root/configuration/configuration.component.ts");
    /* harmony import */
    var _projects_manage_manage_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./projects/manage/manage.component */"./src/app/projects/manage/manage.component.ts");
    /* harmony import */
    var _function_function_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./function/function.component */"./src/app/function/function.component.ts");
    /* harmony import */
    var _function_create_create_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./function/create/create.component */"./src/app/function/create/create.component.ts");
    /* harmony import */
    var _projects_usage_usage_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./projects/usage/usage.component */"./src/app/projects/usage/usage.component.ts");
    /* harmony import */
    var _function_logs_logs_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./function/logs/logs.component */"./src/app/function/logs/logs.component.ts");
    /* harmony import */
    var _function_deploy_deploy_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./function/deploy/deploy.component */"./src/app/function/deploy/deploy.component.ts");
    /* harmony import */
    var _layout_common_project_header_project_header_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./layout/common/project-header/project-header.component */"./src/app/layout/common/project-header/project-header.component.ts");
    /* harmony import */
    var _projects_project_home_project_home_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./projects/project-home/project-home.component */"./src/app/projects/project-home/project-home.component.ts");
    var AppModule = /*#__PURE__*/_createClass(function AppModule() {
      _classCallCheck(this, AppModule);
    });
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
      declarations: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"], _authlayout_authlayout_component__WEBPACK_IMPORTED_MODULE_9__["AuthlayoutComponent"], _authlayout_login_login_component__WEBPACK_IMPORTED_MODULE_10__["LoginComponent"], _projects_projects_component__WEBPACK_IMPORTED_MODULE_11__["ProjectsComponent"], _root_root_component__WEBPACK_IMPORTED_MODULE_12__["RootComponent"], _layout_layout_component__WEBPACK_IMPORTED_MODULE_13__["LayoutComponent"], _layout_common_header_header_component__WEBPACK_IMPORTED_MODULE_14__["HeaderComponent"], _layout_common_footer_footer_component__WEBPACK_IMPORTED_MODULE_15__["FooterComponent"], _layout_common_leftsidenav_leftsidenav_component__WEBPACK_IMPORTED_MODULE_16__["LeftsidenavComponent"], _root_users_users_component__WEBPACK_IMPORTED_MODULE_17__["UsersComponent"], _root_configuration_configuration_component__WEBPACK_IMPORTED_MODULE_18__["ConfigurationComponent"], _projects_manage_manage_component__WEBPACK_IMPORTED_MODULE_19__["ManageComponent"], _function_function_component__WEBPACK_IMPORTED_MODULE_20__["FunctionComponent"], _function_create_create_component__WEBPACK_IMPORTED_MODULE_21__["CreateComponent"], _projects_usage_usage_component__WEBPACK_IMPORTED_MODULE_22__["UsageComponent"], _function_logs_logs_component__WEBPACK_IMPORTED_MODULE_23__["LogsComponent"], _function_deploy_deploy_component__WEBPACK_IMPORTED_MODULE_24__["DeployComponent"], _layout_common_project_header_project_header_component__WEBPACK_IMPORTED_MODULE_25__["ProjectHeaderComponent"], _projects_project_home_project_home_component__WEBPACK_IMPORTED_MODULE_26__["ProjectHomeComponent"]],
      imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_5__["AppRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__["NgbModule"]],
      providers: [],
      bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]]
    })], AppModule);

    /***/
  }),
  /***/"./src/app/authlayout/authlayout.component.scss": (
  /*!******************************************************!*\
    !*** ./src/app/authlayout/authlayout.component.scss ***!
    \******************************************************/
  /*! exports provided: default */
  /***/
  function _src_app_authlayout_authlayoutComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = ".logoBg {\n  /* height: calc(100vh); */\n  background: #014558;\n  background: linear-gradient(120deg, #014558 25%, #000c26 70%);\n  display: flex;\n  align-items: center;\n  text-align: center;\n  min-height: 100%;\n}\n\n.leftlogo {\n  color: #fff;\n  font-weight: bold;\n}\n\n.leftlogo h3 {\n  font-weight: normal;\n  font-size: 30px;\n}\n\n.leftlogo h4 {\n  font-size: 24px;\n  font-weight: normal;\n  color: #017f8d;\n}\n\n.copyrt {\n  position: absolute;\n  bottom: 10px;\n  font-size: 12px;\n  color: #fff;\n  left: 0;\n  right: 0;\n}\n\n.loading-lg {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  z-index: 999;\n}\n\n@media (min-width: 992px) {\n  .logoBg {\n    min-height: calc(100vh);\n  }\n\n  .copyrt {\n    display: block;\n  }\n}\n\n@media screen and (max-width: 767px) {\n  .copyrt {\n    display: none;\n  }\n\n  .mainBdy {\n    height: calc(100vh - 80px);\n    margin: 0 15px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aGxheW91dC9DOlxcS1xcS05hdGl2ZVxcRmlzc2lvblxcVUlfRmlzc2lvbi9zcmNcXGFwcFxcYXV0aGxheW91dFxcYXV0aGxheW91dC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvYXV0aGxheW91dC9hdXRobGF5b3V0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0kseUJBQUE7RUFDQSxtQkFBQTtFQUNKLDZEQUFBO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBQ0NKOztBRENBO0VBQ0ksV0FBQTtFQUNBLGlCQUFBO0FDRUo7O0FEQ0E7RUFDSSxtQkFBQTtFQUNBLGVBQUE7QUNFSjs7QURBQTtFQUNJLGVBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7QUNHSjs7QUREQTtFQUNJLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxXQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7QUNJSjs7QURGQTtFQUVJLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFFBQUE7RUFDQSxZQUFBO0FDSUo7O0FEQUE7RUFFSTtJQUNJLHVCQUFBO0VDRU47O0VEQUY7SUFDSSxjQUFBO0VDR0Y7QUFDRjs7QURBQTtFQUNJO0lBQ0ksYUFBQTtFQ0VOOztFREFFO0lBQ0ksMEJBQUE7SUFDQSxjQUFBO0VDR047QUFDRiIsImZpbGUiOiJzcmMvYXBwL2F1dGhsYXlvdXQvYXV0aGxheW91dC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5sb2dvQmd7XHJcbiAgICAvKiBoZWlnaHQ6IGNhbGMoMTAwdmgpOyAqL1xyXG4gICAgYmFja2dyb3VuZDogcmdiKDEsNjksODgpO1xyXG5iYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTIwZGVnLCAjMDE0NTU4IDI1JSwgIzAwMGMyNiA3MCUpOyBcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgbWluLWhlaWdodDogMTAwJTtcclxufVxyXG4ubGVmdGxvZ28ge1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG5cclxuLmxlZnRsb2dvIGgze1xyXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcclxuICAgIGZvbnQtc2l6ZTogMzBweDtcclxufVxyXG4ubGVmdGxvZ28gaDR7XHJcbiAgICBmb250LXNpemU6IDI0cHg7XHJcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xyXG4gICAgY29sb3I6ICMwMTdmOGQ7XHJcbn1cclxuLmNvcHlydHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGJvdHRvbTogMTBweDtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgbGVmdDogMDtcclxuICAgIHJpZ2h0OiAwO1xyXG59XHJcbi5sb2FkaW5nLWxnXHJcbntcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGxlZnQ6IDUwJTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgei1pbmRleDogOTk5O1xyXG59XHJcblxyXG5cclxuQG1lZGlhIChtaW4td2lkdGg6IDk5MnB4KVxyXG57XHJcbiAgICAubG9nb0Jne1xyXG4gICAgICAgIG1pbi1oZWlnaHQ6IGNhbGMoMTAwdmgpO1xyXG59XHJcbi5jb3B5cnR7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxufVxyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjdweCkge1xyXG4gICAgLmNvcHlydHtcclxuICAgICAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgfVxyXG4gICAgLm1haW5CZHl7XHJcbiAgICAgICAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gODBweCk7XHJcbiAgICAgICAgbWFyZ2luOiAwIDE1cHg7XHJcbiAgICB9XHJcbn0iLCIubG9nb0JnIHtcbiAgLyogaGVpZ2h0OiBjYWxjKDEwMHZoKTsgKi9cbiAgYmFja2dyb3VuZDogIzAxNDU1ODtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEyMGRlZywgIzAxNDU1OCAyNSUsICMwMDBjMjYgNzAlKTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtaW4taGVpZ2h0OiAxMDAlO1xufVxuXG4ubGVmdGxvZ28ge1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5sZWZ0bG9nbyBoMyB7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGZvbnQtc2l6ZTogMzBweDtcbn1cblxuLmxlZnRsb2dvIGg0IHtcbiAgZm9udC1zaXplOiAyNHB4O1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBjb2xvcjogIzAxN2Y4ZDtcbn1cblxuLmNvcHlydCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAxMHB4O1xuICBmb250LXNpemU6IDEycHg7XG4gIGNvbG9yOiAjZmZmO1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcbn1cblxuLmxvYWRpbmctbGcge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDUwJTtcbiAgdG9wOiA1MCU7XG4gIHotaW5kZXg6IDk5OTtcbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDk5MnB4KSB7XG4gIC5sb2dvQmcge1xuICAgIG1pbi1oZWlnaHQ6IGNhbGMoMTAwdmgpO1xuICB9XG5cbiAgLmNvcHlydCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gIH1cbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gIC5jb3B5cnQge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cblxuICAubWFpbkJkeSB7XG4gICAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gODBweCk7XG4gICAgbWFyZ2luOiAwIDE1cHg7XG4gIH1cbn0iXX0= */";

    /***/
  }),
  /***/"./src/app/authlayout/authlayout.component.ts": (
  /*!****************************************************!*\
    !*** ./src/app/authlayout/authlayout.component.ts ***!
    \****************************************************/
  /*! exports provided: AuthlayoutComponent */
  /***/
  function _src_app_authlayout_authlayoutComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "AuthlayoutComponent", function () {
      return AuthlayoutComponent;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */"./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */"./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */
    var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */"./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */
    var _services_spinner_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_services/spinner.service */"./src/app/_services/spinner.service.ts");
    /* harmony import */
    var _services_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_services/alert.service */"./src/app/_services/alert.service.ts");
    var AuthlayoutComponent = /*#__PURE__*/function () {
      function AuthlayoutComponent(spinnerService, alertService) {
        _classCallCheck(this, AuthlayoutComponent);
        this.spinnerService = spinnerService;
        this.alertService = alertService;
        this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subscription"]();
        this.showLoader = false;
      }
      return _createClass(AuthlayoutComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this2 = this;
          this.spinnerService.status.subscribe(function (val) {
            _this2.showLoader = val;
          });
          this.subscription = this.alertService.getMessage().subscribe(function (message) {
            _this2.message = message;
          });
        }
      }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          this.subscription.unsubscribe();
        }
      }]);
    }();
    AuthlayoutComponent.ctorParameters = function () {
      return [{
        type: _services_spinner_service__WEBPACK_IMPORTED_MODULE_3__["SpinnerService"]
      }, {
        type: _services_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"]
      }];
    };
    AuthlayoutComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-authlayout',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./authlayout.component.html */"./node_modules/raw-loader/dist/cjs.js!./src/app/authlayout/authlayout.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./authlayout.component.scss */"./src/app/authlayout/authlayout.component.scss"))["default"]]
    })], AuthlayoutComponent);

    /***/
  }),
  /***/"./src/app/authlayout/login/login.component.scss": (
  /*!*******************************************************!*\
    !*** ./src/app/authlayout/login/login.component.scss ***!
    \*******************************************************/
  /*! exports provided: default */
  /***/
  function _src_app_authlayout_login_loginComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = ".form-control {\n  border-radius: 0;\n  border: 1px solid #464847;\n  font-size: 20px;\n  padding: 10px 10px;\n  height: auto;\n}\n\n.login-wrapper {\n  min-height: 100vh;\n  display: grid;\n  align-items: center;\n  background-image: url('bg3.jpg');\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\n.login-wrapper .login-section {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-around;\n}\n\n.login-wrapper .login-section form {\n  width: 33.33%;\n  text-align: center;\n}\n\n.login-wrapper .login-section form .form-group {\n  position: relative;\n}\n\n.login-wrapper .login-section form .form-group .input-icon {\n  position: absolute;\n  left: 0;\n  border-right: 2px solid #a3abb3;\n  margin: 7px;\n  padding: 0px 8px 0px 2px;\n}\n\n.login-wrapper .login-section form .form-group .input-icon img {\n  width: 28px;\n}\n\n.login-wrapper .login-section form .form-group input {\n  padding-left: 55px !important;\n  background-color: #f6f6f6;\n  border: none;\n  color: #0d0d0d;\n  padding: 10px 5px;\n  text-align: left;\n  text-decoration: none;\n  display: inline-block;\n  font-size: 16px;\n  width: 100%;\n  border: 2px solid #f6f6f6;\n  transition: all 0.5s ease-in-out;\n  border-radius: 5px 5px 5px 5px;\n}\n\n.login-wrapper .login-section form .forgot-pswd a {\n  color: #ccc;\n  font-weight: 100;\n}\n\n.login-wrapper .login-section form .btn-blue {\n  font-size: 22px;\n  font-weight: 600;\n  color: #071965;\n  background: #fff;\n}\n\n.login-wrapper .login-section form input:focus {\n  outline: none;\n}\n\n.card {\n  height: 100vh;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border-bottom: none;\n}\n\n.card-body {\n  box-shadow: 0px 0px 8px 2px #cccccc;\n  padding: 35px;\n  width: 33%;\n  flex: inherit;\n}\n\nh2 {\n  margin: 0;\n  font-weight: 600;\n  padding: 20px 0;\n  color: #9c9c9c;\n}\n\nlabel {\n  font-size: large;\n  font-family: sans-serif;\n  color: antiquewhite;\n  background: border-box;\n}\n\n#formFooter {\n  margin: 15px 0px;\n  font-weight: 600;\n}\n\n.button {\n  background-color: gray;\n  /* Green */\n  border: none;\n  padding: 14px 16px 14px 16px;\n  text-align: center;\n  display: inline-block;\n  font-size: 16px;\n  margin: 4px 2px;\n  cursor: pointer;\n  border-radius: 12px;\n  font-family: inherit;\n  font-size: 14px;\n  color: #333;\n  box-sizing: border-box;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.enableLogin {\n  background: gray !important;\n  cursor: not-allowed !important;\n  color: #000 !important;\n  font-weight: 100 !important;\n}\n\n@media only screen and (max-width: 768px) {\n  .card-body {\n    width: 80%;\n  }\n\n  .login-wrapper .login-section {\n    flex-direction: column;\n  }\n  .login-wrapper .login-section .login-img {\n    width: 235px;\n  }\n  .login-wrapper .login-section form {\n    width: 100%;\n  }\n  .login-wrapper .login-section form .login-user-icon {\n    width: 70px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aGxheW91dC9sb2dpbi9DOlxcS1xcS05hdGl2ZVxcRmlzc2lvblxcVUlfRmlzc2lvbi9zcmNcXGFwcFxcYXV0aGxheW91dFxcbG9naW5cXGxvZ2luLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9hdXRobGF5b3V0L2xvZ2luL2xvZ2luLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ1EsZ0JBQUE7RUFDSix5QkFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7QUNDSjs7QURFQTtFQUNJLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0NBQUE7RUFDQSw0QkFBQTtFQUNBLHNCQUFBO0FDQ0o7O0FEQUk7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLDZCQUFBO0FDRVI7O0FERFE7RUFDSSxhQUFBO0VBQ0Esa0JBQUE7QUNHWjs7QURGWTtFQUNJLGtCQUFBO0FDSWhCOztBREhnQjtFQUNJLGtCQUFBO0VBQ0EsT0FBQTtFQUNBLCtCQUFBO0VBQ0EsV0FBQTtFQUNBLHdCQUFBO0FDS3BCOztBREpvQjtFQUNJLFdBQUE7QUNNeEI7O0FESGdCO0VBQ0ksNkJBQUE7RUFDQSx5QkFBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0VBQ0EscUJBQUE7RUFDQSxlQUFBO0VBRUEsV0FBQTtFQUNBLHlCQUFBO0VBS0EsZ0NBQUE7RUFFQSw4QkFBQTtBQ0lwQjs7QURBZ0I7RUFDSSxXQUFBO0VBQ0EsZ0JBQUE7QUNFcEI7O0FEQ1k7RUFDSSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7QUNDaEI7O0FER1k7RUFDSSxhQUFBO0FDRGhCOztBRE9BO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0FDSko7O0FETUE7RUFDSSxtQ0FBQTtFQUNBLGFBQUE7RUFDQSxVQUFBO0VBQ0EsYUFBQTtBQ0hKOztBREtBO0VBQ0ksU0FBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7QUNGSjs7QURJQTtFQUNJLGdCQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0FDREo7O0FER0E7RUFDSSxnQkFBQTtFQUNBLGdCQUFBO0FDQUo7O0FER0E7RUFDSSxzQkFBQTtFQUF1QixVQUFBO0VBQ3ZCLFlBQUE7RUFDQSw0QkFBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtFQUNBLG9CQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7RUFDQSxzQkFBQTtFQUNBLG1DQUFBO0VBQ0Esa0NBQUE7QUNDSjs7QURFQTtFQUNJLDJCQUFBO0VBQ0EsOEJBQUE7RUFDQSxzQkFBQTtFQUNBLDJCQUFBO0FDQ0o7O0FEQ0E7RUFDSTtJQUNJLFVBQUE7RUNFTjs7RURDTTtJQUNJLHNCQUFBO0VDRVY7RUREVTtJQUNJLFlBQUE7RUNHZDtFRERVO0lBQ0ksV0FBQTtFQ0dkO0VERmM7SUFDSSxXQUFBO0VDSWxCO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9hdXRobGF5b3V0L2xvZ2luL2xvZ2luLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZvcm0tY29udHJvbHtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzQ2NDg0NztcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIHBhZGRpbmc6IDEwcHggMTBweDtcclxuICAgIGhlaWdodDogYXV0bztcclxufVxyXG5cclxuLmxvZ2luLXdyYXBwZXJ7XHJcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL2JnMy5qcGcnKTtcclxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gICAgLmxvZ2luLXNlY3Rpb257XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XHJcbiAgICAgICAgZm9ybXtcclxuICAgICAgICAgICAgd2lkdGg6IDMzLjMzJTtcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgICAgICAuZm9ybS1ncm91cHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICAgICAgICAgIC5pbnB1dC1pY29ue1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OjA7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiAycHggc29saWQgI2EzYWJiMztcclxuICAgICAgICAgICAgICAgICAgICBtYXJnaW46IDdweDtcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAwcHggOHB4IDBweCAycHg7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1ne1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjhweDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpbnB1dHtcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDU1cHggIWltcG9ydGFudDtcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjZmNmY2O1xyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogbm9uZTtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogIzBkMGQwZDtcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAxMHB4IDVweDtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG1hcmdpbjogOHB4IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAycHggc29saWQgI2Y2ZjZmNjtcclxuICAgICAgICAgICAgICAgICAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW4tb3V0O1xyXG4gICAgICAgICAgICAgICAgICAgIC1tb3otdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZS1pbi1vdXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgLW1zLXRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW4tb3V0O1xyXG4gICAgICAgICAgICAgICAgICAgIC1vLXRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW4tb3V0O1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW4tb3V0O1xyXG4gICAgICAgICAgICAgICAgICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogMCAxMHB4IDEwcHggMDtcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1cHggNXB4IDVweCA1cHg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLmZvcmdvdC1wc3dke1xyXG4gICAgICAgICAgICAgICAgYXtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogI2NjYztcclxuICAgICAgICAgICAgICAgICAgICBmb250LXdlaWdodDogMTAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC5idG4tYmx1ZXtcclxuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMjJweDtcclxuICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogIzA3MTk2NTtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgICAgICAgICAgICAgICAvLyBib3JkZXItcmFkaXVzOiAxNXB4IDAgMTVweCAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpbnB1dDpmb2N1c3tcclxuICAgICAgICAgICAgICAgIG91dGxpbmU6IG5vbmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi5jYXJke1xyXG4gICAgaGVpZ2h0OiAxMDB2aDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBib3JkZXItYm90dG9tOiBub25lO1xyXG59XHJcbi5jYXJkLWJvZHl7XHJcbiAgICBib3gtc2hhZG93OiAwcHggMHB4IDhweCAycHggcmdiYSgyMDQsMjA0LDIwNCwxKTtcclxuICAgIHBhZGRpbmc6IDM1cHg7XHJcbiAgICB3aWR0aDogMzMlO1xyXG4gICAgZmxleDogaW5oZXJpdDtcclxufVxyXG5oMntcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBwYWRkaW5nOiAyMHB4IDA7XHJcbiAgICBjb2xvcjogIzljOWM5YztcclxufVxyXG5sYWJlbHtcclxuICAgIGZvbnQtc2l6ZTogbGFyZ2U7XHJcbiAgICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcclxuICAgIGNvbG9yOiBhbnRpcXVld2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kOiBib3JkZXItYm94O1xyXG59XHJcbiNmb3JtRm9vdGVye1xyXG4gICAgbWFyZ2luOiAxNXB4IDBweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbn1cclxuXHJcbi5idXR0b24ge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjpncmF5OyAvKiBHcmVlbiAqL1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgcGFkZGluZzogMTRweCAxNnB4IDE0cHggMTZweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIG1hcmdpbjogNHB4IDJweDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgICBmb250LWZhbWlseTogaW5oZXJpdDtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIGNvbG9yOiAjMzMzO1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xyXG4gICAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcclxuICB9XHJcblxyXG4uZW5hYmxlTG9naW57XHJcbiAgICBiYWNrZ3JvdW5kOiBncmF5ICFpbXBvcnRhbnQ7XHJcbiAgICBjdXJzb3I6IG5vdC1hbGxvd2VkICFpbXBvcnRhbnQ7XHJcbiAgICBjb2xvcjogIzAwMCAhaW1wb3J0YW50O1xyXG4gICAgZm9udC13ZWlnaHQ6IDEwMCAhaW1wb3J0YW50O1xyXG59XHJcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY4cHgpe1xyXG4gICAgLmNhcmQtYm9keXtcclxuICAgICAgICB3aWR0aDogODAlO1xyXG4gICAgfVxyXG4gICAgLmxvZ2luLXdyYXBwZXJ7XHJcbiAgICAgICAgLmxvZ2luLXNlY3Rpb257XHJcbiAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAgICAgIC5sb2dpbi1pbWd7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMjM1cHg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9ybXtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgICAgICAgICAgLmxvZ2luLXVzZXItaWNvbntcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNzBweDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi5mb3JtLWNvbnRyb2wge1xuICBib3JkZXItcmFkaXVzOiAwO1xuICBib3JkZXI6IDFweCBzb2xpZCAjNDY0ODQ3O1xuICBmb250LXNpemU6IDIwcHg7XG4gIHBhZGRpbmc6IDEwcHggMTBweDtcbiAgaGVpZ2h0OiBhdXRvO1xufVxuXG4ubG9naW4td3JhcHBlciB7XG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xuICBkaXNwbGF5OiBncmlkO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL2JnMy5qcGdcIik7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG59XG4ubG9naW4td3JhcHBlciAubG9naW4tc2VjdGlvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xufVxuLmxvZ2luLXdyYXBwZXIgLmxvZ2luLXNlY3Rpb24gZm9ybSB7XG4gIHdpZHRoOiAzMy4zMyU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5sb2dpbi13cmFwcGVyIC5sb2dpbi1zZWN0aW9uIGZvcm0gLmZvcm0tZ3JvdXAge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4ubG9naW4td3JhcHBlciAubG9naW4tc2VjdGlvbiBmb3JtIC5mb3JtLWdyb3VwIC5pbnB1dC1pY29uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwO1xuICBib3JkZXItcmlnaHQ6IDJweCBzb2xpZCAjYTNhYmIzO1xuICBtYXJnaW46IDdweDtcbiAgcGFkZGluZzogMHB4IDhweCAwcHggMnB4O1xufVxuLmxvZ2luLXdyYXBwZXIgLmxvZ2luLXNlY3Rpb24gZm9ybSAuZm9ybS1ncm91cCAuaW5wdXQtaWNvbiBpbWcge1xuICB3aWR0aDogMjhweDtcbn1cbi5sb2dpbi13cmFwcGVyIC5sb2dpbi1zZWN0aW9uIGZvcm0gLmZvcm0tZ3JvdXAgaW5wdXQge1xuICBwYWRkaW5nLWxlZnQ6IDU1cHggIWltcG9ydGFudDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y2ZjZmNjtcbiAgYm9yZGVyOiBub25lO1xuICBjb2xvcjogIzBkMGQwZDtcbiAgcGFkZGluZzogMTBweCA1cHg7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBmb250LXNpemU6IDE2cHg7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXI6IDJweCBzb2xpZCAjZjZmNmY2O1xuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW4tb3V0O1xuICAtbW96LXRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW4tb3V0O1xuICAtbXMtdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZS1pbi1vdXQ7XG4gIC1vLXRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW4tb3V0O1xuICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlLWluLW91dDtcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAwIDEwcHggMTBweCAwO1xuICBib3JkZXItcmFkaXVzOiA1cHggNXB4IDVweCA1cHg7XG59XG4ubG9naW4td3JhcHBlciAubG9naW4tc2VjdGlvbiBmb3JtIC5mb3Jnb3QtcHN3ZCBhIHtcbiAgY29sb3I6ICNjY2M7XG4gIGZvbnQtd2VpZ2h0OiAxMDA7XG59XG4ubG9naW4td3JhcHBlciAubG9naW4tc2VjdGlvbiBmb3JtIC5idG4tYmx1ZSB7XG4gIGZvbnQtc2l6ZTogMjJweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6ICMwNzE5NjU7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG59XG4ubG9naW4td3JhcHBlciAubG9naW4tc2VjdGlvbiBmb3JtIGlucHV0OmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuLmNhcmQge1xuICBoZWlnaHQ6IDEwMHZoO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTtcbn1cblxuLmNhcmQtYm9keSB7XG4gIGJveC1zaGFkb3c6IDBweCAwcHggOHB4IDJweCAjY2NjY2NjO1xuICBwYWRkaW5nOiAzNXB4O1xuICB3aWR0aDogMzMlO1xuICBmbGV4OiBpbmhlcml0O1xufVxuXG5oMiB7XG4gIG1hcmdpbjogMDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgcGFkZGluZzogMjBweCAwO1xuICBjb2xvcjogIzljOWM5Yztcbn1cblxubGFiZWwge1xuICBmb250LXNpemU6IGxhcmdlO1xuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcbiAgY29sb3I6IGFudGlxdWV3aGl0ZTtcbiAgYmFja2dyb3VuZDogYm9yZGVyLWJveDtcbn1cblxuI2Zvcm1Gb290ZXIge1xuICBtYXJnaW46IDE1cHggMHB4O1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4uYnV0dG9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcbiAgLyogR3JlZW4gKi9cbiAgYm9yZGVyOiBub25lO1xuICBwYWRkaW5nOiAxNHB4IDE2cHggMTRweCAxNnB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgZm9udC1zaXplOiAxNnB4O1xuICBtYXJnaW46IDRweCAycHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgY29sb3I6ICMzMzM7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xufVxuXG4uZW5hYmxlTG9naW4ge1xuICBiYWNrZ3JvdW5kOiBncmF5ICFpbXBvcnRhbnQ7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQgIWltcG9ydGFudDtcbiAgY29sb3I6ICMwMDAgIWltcG9ydGFudDtcbiAgZm9udC13ZWlnaHQ6IDEwMCAhaW1wb3J0YW50O1xufVxuXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5jYXJkLWJvZHkge1xuICAgIHdpZHRoOiA4MCU7XG4gIH1cblxuICAubG9naW4td3JhcHBlciAubG9naW4tc2VjdGlvbiB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxuICAubG9naW4td3JhcHBlciAubG9naW4tc2VjdGlvbiAubG9naW4taW1nIHtcbiAgICB3aWR0aDogMjM1cHg7XG4gIH1cbiAgLmxvZ2luLXdyYXBwZXIgLmxvZ2luLXNlY3Rpb24gZm9ybSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbiAgLmxvZ2luLXdyYXBwZXIgLmxvZ2luLXNlY3Rpb24gZm9ybSAubG9naW4tdXNlci1pY29uIHtcbiAgICB3aWR0aDogNzBweDtcbiAgfVxufSJdfQ== */";

    /***/
  }),
  /***/"./src/app/authlayout/login/login.component.ts": (
  /*!*****************************************************!*\
    !*** ./src/app/authlayout/login/login.component.ts ***!
    \*****************************************************/
  /*! exports provided: LoginComponent */
  /***/
  function _src_app_authlayout_login_loginComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "LoginComponent", function () {
      return LoginComponent;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */"./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */"./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */
    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */"./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */
    var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */"./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */
    var _services_authentication_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_services/authentication.service */"./src/app/_services/authentication.service.ts");
    /* harmony import */
    var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */"./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
    var LoginComponent = /*#__PURE__*/function () {
      function LoginComponent(formBuilder, route, router, authenticationService, alertConfig) {
        _classCallCheck(this, LoginComponent);
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.alertConfig = alertConfig;
        this.loginForm = this.formBuilder.group({
          userId: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].email]],
          password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        });
        this.loading = false;
        this.submitted = false;
        this.returnUrl = "";
        this.resData = {};
        this.loginbtn = false;
        this.loadingImg = false;
        this.errMsg = "";
        this.regParam = "";
        this.userDetail = {};
        this.userRole = "";
        this.errorMsg = '';
        this.loginError = false;
        this.alertMessage = "";
        this.enableLogin = true;
      }
      return _createClass(LoginComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.loginForm = this.formBuilder.group({
            userId: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].email]],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
          });
          this.authenticationService.logout();
        }
      }, {
        key: "f",
        get: function get() {
          return this.loginForm.controls;
        }
        // if(this.loginForm.controls['userId'].value != '' && this.loginForm.controls['password'].value != ''){
        //   this.enableLogin = true;
        // }
      }, {
        key: "emailClick",
        value: function emailClick() {
          if (this.loginForm.controls['userId'].value != '' && this.loginForm.controls['password'].value != '') {
            this.enableLogin = false;
          }
        }
      }, {
        key: "passwordClick",
        value: function passwordClick() {
          if (this.loginForm.controls['userId'].value != '' && this.loginForm.controls['password'].value != '') {
            //alert()
            this.enableLogin = false;
          }
        }
      }, {
        key: "onSubmit",
        value: function onSubmit() {
          var _this3 = this;
          this.submitted = true;
          // stop here if form is invalid
          if (this.loginForm.invalid) {
            return;
          }
          this.loading = true;
          this.authenticationService.login(this.loginForm.controls['userId'].value, this.loginForm.controls['password'].value).subscribe(function (data) {
            //localStorage.setItem('user', JSON.stringify(data));
            _this3.uDetais = JSON.stringify(data);
            _this3.userDetail = JSON.parse(_this3.uDetais);
            //console.log("userDetails: ",JSON.parse(this.uDetais));
            localStorage.setItem('token', _this3.userDetail["token"]);
            localStorage.setItem('userId', _this3.userDetail['userId']);
            localStorage.setItem('orgRole', _this3.userDetail['orgRole']);
            localStorage.setItem('userName', _this3.userDetail['name']);
            _this3.userRole = _this3.userDetail["orgRole"];
            if (_this3.userRole == "ROOT") {
              _this3.router.navigateByUrl('/root/users');
            } else {
              _this3.router.navigateByUrl('projects');
            }
            _this3.loading = false;
          }, function (err) {
            console.log("Error in authentication");
            _this3.loading = false;
            _this3.alertMessage = "Invalid Credentials";
            _this3.alertConfigurations("danger");
            _this3.loginError = true;
            _this3.loginForm.reset();
            _this3.submitted = false;
          });
        }
      }, {
        key: "ErrorBack",
        value: function ErrorBack(msg) {
          this.errMsg = msg;
          this.loginbtn = false;
          this.loadingImg = false;
        }
      }, {
        key: "alertConfigurations",
        value: function alertConfigurations(type) {
          this.alertConfig.type = type;
        }
      }]);
    }();
    LoginComponent.ctorParameters = function () {
      return [{
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
      }, {
        type: _services_authentication_service__WEBPACK_IMPORTED_MODULE_4__["AuthenticationService"]
      }, {
        type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbAlertConfig"]
      }];
    };
    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-login',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./login.component.html */"./node_modules/raw-loader/dist/cjs.js!./src/app/authlayout/login/login.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./login.component.scss */"./src/app/authlayout/login/login.component.scss"))["default"]]
    })], LoginComponent);

    /***/
  }),
  /***/"./src/app/function/create/create.component.scss": (
  /*!*******************************************************!*\
    !*** ./src/app/function/create/create.component.scss ***!
    \*******************************************************/
  /*! exports provided: default */
  /***/
  function _src_app_function_create_createComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "#cover {\n  height: 100%;\n  text-align: center;\n  display: flex;\n  align-items: center;\n  position: relative;\n}\n\n#cover-caption {\n  width: 100%;\n  position: relative;\n  z-index: 1;\n}\n\n/* only used for background overlay not needed for centering */\n\nform:before {\n  content: \"\";\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n  z-index: -1;\n  border-radius: 10px;\n}\n\n.horizontal {\n  margin-top: 1rem;\n  width: 100%;\n  /* margin-bottom: 1rem; */\n  border: 0;\n  border-top: 1px solid black;\n}\n\n.cancelBtn {\n  background: #1d48a9f5;\n  font-weight: bold;\n  color: white;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZnVuY3Rpb24vY3JlYXRlL0M6XFxLXFxLTmF0aXZlXFxGaXNzaW9uXFxVSV9GaXNzaW9uL3NyY1xcYXBwXFxmdW5jdGlvblxcY3JlYXRlXFxjcmVhdGUuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2Z1bmN0aW9uL2NyZWF0ZS9jcmVhdGUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFFSSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtBQ0FKOztBREdBO0VBQ0ksV0FBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtBQ0FKOztBREdBLDhEQUFBOztBQUNBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFDQSxPQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EsV0FBQTtFQUVBLFdBQUE7RUFDQSxtQkFBQTtBQ0RKOztBRElBO0VBQ0ksZ0JBQUE7RUFDQSxXQUFBO0VBQ0EseUJBQUE7RUFDQSxTQUFBO0VBQ0EsMkJBQUE7QUNESjs7QURJQTtFQUNJLHFCQUFBO0VBQ0EsaUJBQUE7RUFFQSxZQUFBO0FDRkoiLCJmaWxlIjoic3JjL2FwcC9mdW5jdGlvbi9jcmVhdGUvY3JlYXRlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI2NvdmVyIHtcclxuICAgIFxyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuXHJcbiNjb3Zlci1jYXB0aW9uIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgei1pbmRleDogMTtcclxufVxyXG5cclxuLyogb25seSB1c2VkIGZvciBiYWNrZ3JvdW5kIG92ZXJsYXkgbm90IG5lZWRlZCBmb3IgY2VudGVyaW5nICovXHJcbmZvcm06YmVmb3JlIHtcclxuICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgbGVmdDogMDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgXHJcbiAgICB6LWluZGV4OiAtMTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbn1cclxuXHJcbi5ob3Jpem9udGFse1xyXG4gICAgbWFyZ2luLXRvcDogMXJlbTtcclxuICAgIHdpZHRoOjEwMCU7XHJcbiAgICAvKiBtYXJnaW4tYm90dG9tOiAxcmVtOyAqL1xyXG4gICAgYm9yZGVyOiAwO1xyXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHJnYigwIDAgMCk7XHJcbn1cclxuXHJcbi5jYW5jZWxCdG57XHJcbiAgICBiYWNrZ3JvdW5kOiMxZDQ4YTlmNTtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgLy8gY3Vyc29yOiBub3QtYWxsb3dlZCAhaW1wb3J0YW50O1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgLy8gZm9udC13ZWlnaHQ6IDEwMCAhaW1wb3J0YW50O1xyXG4gICAgfSIsIiNjb3ZlciB7XG4gIGhlaWdodDogMTAwJTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbiNjb3Zlci1jYXB0aW9uIHtcbiAgd2lkdGg6IDEwMCU7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgei1pbmRleDogMTtcbn1cblxuLyogb25seSB1c2VkIGZvciBiYWNrZ3JvdW5kIG92ZXJsYXkgbm90IG5lZWRlZCBmb3IgY2VudGVyaW5nICovXG5mb3JtOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIGhlaWdodDogMTAwJTtcbiAgbGVmdDogMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICB6LWluZGV4OiAtMTtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbn1cblxuLmhvcml6b250YWwge1xuICBtYXJnaW4tdG9wOiAxcmVtO1xuICB3aWR0aDogMTAwJTtcbiAgLyogbWFyZ2luLWJvdHRvbTogMXJlbTsgKi9cbiAgYm9yZGVyOiAwO1xuICBib3JkZXItdG9wOiAxcHggc29saWQgYmxhY2s7XG59XG5cbi5jYW5jZWxCdG4ge1xuICBiYWNrZ3JvdW5kOiAjMWQ0OGE5ZjU7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBjb2xvcjogd2hpdGU7XG59Il19 */";

    /***/
  }),
  /***/"./src/app/function/create/create.component.ts": (
  /*!*****************************************************!*\
    !*** ./src/app/function/create/create.component.ts ***!
    \*****************************************************/
  /*! exports provided: CreateComponent */
  /***/
  function _src_app_function_create_createComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "CreateComponent", function () {
      return CreateComponent;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */"./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */"./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */
    var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */"./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */
    var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */"./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */
    var src_app_services_function_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/function.service */"./src/app/_services/function.service.ts");
    /* harmony import */
    var src_app_services_project_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/project.service */"./src/app/_services/project.service.ts");
    /* harmony import */
    var _model_function__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../_model/function */"./src/app/_model/function.ts");
    /* harmony import */
    var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */"./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
    var CreateComponent = /*#__PURE__*/function () {
      function CreateComponent(route, formBuilder, functionService, router, modalService, alertConfig, projectService) {
        _classCallCheck(this, CreateComponent);
        this.route = route;
        this.formBuilder = formBuilder;
        this.functionService = functionService;
        this.router = router;
        this.modalService = modalService;
        this.alertConfig = alertConfig;
        this.projectService = projectService;
        this.createFunctionForm = this.formBuilder.group({
          functionName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(25), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(2), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern('^[a-z0-9_-]+$')])],
          functionImage: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
          runtime: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
          handlerFileContent: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
          dependencyFileContent: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
        this.deployFunctionForm = this.formBuilder.group({
          scaleToZero: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
          triggerType: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
          topic: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
          schedule: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
        this.userId = "";
        this.projectsList = [];
        this.isProjectListNull = false;
        this.functionAction = "";
        this.projectName = "";
        this.functionName = "";
        this.functionImage = "";
        this.functionRuntimes = [];
        this.handlerFileName = "";
        this.dependencyFileName = "";
        this.createFunctionFlag = false;
        this.alertMsg = "";
        this.userMsg = "";
        this.deployFlag = false;
        this.triggerTypes = [];
        this.kafkaFlag = false;
        this.cronFlag = false;
        this.deployFunctionFlag = false;
        this.functionDescription = [];
        this.functionAnnotations = [];
        this.functionLabels = [];
        this.scaleToZeroFlag = false;
        this.functionUrl = "";
        this.triggerType = "";
        this.isFunctionAlreadyDeployed = false;
        this.functionBuildLog = "";
        this.createFunctionErrorFlag = false;
        this.closeResult = "";
        this.submitted = false;
        this.breadcrumb = [];
      }
      return _createClass(CreateComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this4 = this;
          this.userId = localStorage.getItem('userId');
          this.createFunctionForm = this.formBuilder.group({
            functionName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(25), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(2), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern('^[a-z0-9_-]+$')])],
            functionImage: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            runtime: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            handlerFileContent: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            dependencyFileContent: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
          });
          this.deployFunctionForm = this.formBuilder.group({
            scaleToZero: ['false', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            triggerType: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            topic: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            schedule: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
          });
          this.route.queryParams.subscribe(function (params) {
            _this4.functionAction = params['action'];
            _this4.projectName = params['project'];
            if (_this4.functionAction == "deployFunction") {
              _this4.functionName = params['function'];
              _this4.functionImage = params['function'];
              _this4.getFunctionParameters();
              _this4.createFunctionForm.disable();
            }
            _this4.listProjects();
          });
          this.functionRuntimes = this.getRuntimes();
          console.log("Runtimes:", this.functionRuntimes);
          this.triggerTypes = this.getTriggerTypes();
          console.log("Trigger type:", this.triggerTypes);
          this.breadcrumb = [{
            url: "/projects/home",
            params: {
              'project': this.projectName
            },
            name: 'Home'
          }, {
            url: '',
            params: '',
            name: 'Function'
          }];
        }
      }, {
        key: "listProjects",
        value: function listProjects() {
          var _this5 = this;
          console.log("project inside create/deploy: ", this.projectName);
          this.projectService.listProjects(this.userId).subscribe(function (data) {
            _this5.projectsList = data;
            if (_this5.projectsList == null || undefined || _this5.projectsList.length <= 0) {
              _this5.isProjectListNull = true;
            } else {
              _this5.isProjectListNull = false;
            }
            console.log("projects List :", _this5.projectsList);
            var redirect2 = false;
            var _iterator = _createForOfIteratorHelper(_this5.projectsList),
              _step;
            try {
              var _loop = function _loop() {
                var project = _step.value;
                if (_this5.projectName == project['projectName']) {
                  if (project['projectRoleName'] == "PROJECT_VIEWER") {
                    redirect2 = true;
                    console.log("Routing to home");
                  } else if (_this5.functionAction == "deployFunction") {
                    _this5.functionService.listFunctions(_this5.projectName).subscribe(function (data) {
                      if (data == undefined || data.length < 0) {} else {
                        var redirect = false;
                        var _iterator2 = _createForOfIteratorHelper(data),
                          _step2;
                        try {
                          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                            var func = _step2.value;
                            if (func['functionName'] == _this5.functionName) {
                              redirect = true;
                            }
                          }
                        } catch (err) {
                          _iterator2.e(err);
                        } finally {
                          _iterator2.f();
                        }
                        if (!redirect) {
                          console.log("Routing to home");
                          _this5.router.navigate(['projects/home'], {
                            queryParams: {
                              project: project['projectName']
                            }
                          });
                        }
                      }
                      ;
                    }, function (err) {
                      console.log(err);
                    });
                  }
                }
              };
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                _loop();
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
            if (redirect2) {
              _this5.router.navigate(['projects/home'], {
                queryParams: {
                  project: _this5.projectName
                }
              });
            }
          }, function (err) {
            console.log(err);
            console.log(err.error.message);
          });
        }
      }, {
        key: "open",
        value: function open(modalObj) {
          var _this6 = this;
          //this.getFunctionDescription(functionObj);
          this.modalService.open(modalObj, {
            size: 'lg'
          }).result.then(function (result) {
            _this6.closeResult = "Closed with: ".concat(result);
          }, function (reason) {
            _this6.closeResult = "Dismissed ".concat(_this6.getDismissReason(reason));
          });
        }
      }, {
        key: "getDismissReason",
        value: function getDismissReason(reason) {
          if (reason === _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__["ModalDismissReasons"].ESC) {
            return 'by pressing ESC';
          } else if (reason === _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__["ModalDismissReasons"].BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
          } else {
            return "with: ".concat(reason);
          }
        }
      }, {
        key: "closeModal",
        value: function closeModal() {
          this.functionBuildLog = null;
          this.modalService.dismissAll();
        }
      }, {
        key: "resetdeployFunctionForm",
        value: function resetdeployFunctionForm() {
          // this.deployFunctionForm.controls['triggerType'].reset();
          // this.deployFunctionForm.controls['topic'].reset();
          // this.deployFunctionForm.controls['schedule'].reset();
          this.deployFunctionForm.reset();
          //this.initializeFlags();
        }
      }, {
        key: "newProjectObject",
        value: function newProjectObject(projectObj) {
          console.log("Project Object in parent: ", projectObj);
          if (projectObj == undefined) {
            console.log("Null Projects");
          } else {
            console.log("Project Obj", projectObj);
          }
        }
      }, {
        key: "getFunctionParameters",
        value: function getFunctionParameters() {
          return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, /*#__PURE__*/_regenerator().m(function _callee() {
            var _t;
            return _regenerator().w(function (_context) {
              while (1) switch (_context.n) {
                case 0:
                  this.getFunctionDescription();
                  _context.n = 1;
                  return new Promise(function (resolve) {
                    return setTimeout(resolve, 30);
                  });
                case 1:
                  this.createFunctionFlag = true;
                  this.createFunctionForm.controls['functionName'].setValue(this.functionName);
                  this.createFunctionForm.controls['functionImage'].setValue(this.functionImage);
                  this.createFunctionForm.controls['runtime'].setValue(this.functionDescription['runtime']);
                  console.log("atob", atob(this.functionDescription['handlerFileContent']));
                  this.createFunctionForm.controls['handlerFileContent'].setValue(atob(this.functionDescription['handlerFileContent']));
                  if (this.functionDescription['dependencyFileContent'] != null || this.functionDescription['dependencyFileContent'] != ' ') {
                    this.createFunctionForm.controls['dependencyFileContent'].setValue(atob(this.functionDescription['dependencyFileContent']));
                  } else {
                    this.createFunctionForm.controls['dependencyFileContent'].setValue('');
                    this.createFunctionForm.controls['handlerFileContent'].setValue('');
                  }
                  //this.createFunctionForm.controls['dependencyFileContent'].setValue('');
                  //this.createFunctionForm.controls['handlerFileContent'].setValue('');
                  console.log("createFunctionForm", this.createFunctionForm.value);
                  console.log("function status", this.functionDescription['functionStatus']);
                  this.initializeFunctionFlags();
                  _t = this.functionDescription['functionStatus'];
                  _context.n = _t === "DEPLOYED" ? 2 : _t === "CREATED" ? 3 : _t === "ERROR" ? 4 : _t === "CREATING" ? 5 : 6;
                  break;
                case 2:
                  this.functionAnnotations = this.functionDescription['annotations'];
                  this.functionLabels = this.functionDescription['labels'];
                  this.triggerType = this.functionDescription['triggerType'];
                  this.functionUrl = this.functionDescription['functionUrl'];
                  this.invocationCount = this.functionDescription['invocationCount'];
                  if (this.functionLabels != null && this.functionLabels != undefined) {
                    this.scaleToZeroFlag = this.functionLabels["com.openfaas.scale.zero"];
                  }
                  this.isFunctionAlreadyDeployed = true;
                  return _context.a(3, 7);
                case 3:
                  this.deployFlag = true;
                  return _context.a(3, 7);
                case 4:
                  this.createFunctionForm.controls['functionName'].disable();
                  this.createFunctionForm.controls['runtime'].disable();
                  this.createFunctionForm.controls['handlerFileContent'].enable();
                  this.createFunctionForm.controls['dependencyFileContent'].enable();
                  this.createFunctionFlag = false;
                  this.createFunctionErrorFlag = true;
                  return _context.a(3, 7);
                case 5:
                  this.createFunctionForm.disable();
                  this.getFunctionParameters();
                  return _context.a(3, 7);
                case 6:
                  return _context.a(3, 7);
                case 7:
                  return _context.a(2);
              }
            }, _callee, this);
          }));
        }
      }, {
        key: "initializeFunctionFlags",
        value: function initializeFunctionFlags() {
          this.createFunctionErrorFlag = false;
          this.deployFlag = false;
          this.isFunctionAlreadyDeployed = false;
        }
      }, {
        key: "getFunctionDescription",
        value: function getFunctionDescription() {
          var _this7 = this;
          var functionObj = new _model_function__WEBPACK_IMPORTED_MODULE_6__["Function"]();
          functionObj.projectName = this.projectName;
          functionObj.functionName = this.functionName;
          functionObj.functionImage = this.functionImage;
          this.functionService.getFunctionDescription(functionObj).subscribe(function (data) {
            _this7.functionDescription = data;
            console.log("functionDescription2 ", _this7.functionDescription);
          }, function (err) {
            //alert("Something Went wrong);
            //this.loginError = true;
            console.log(err);
            console.log(err.error.message);
          });
        }
      }, {
        key: "getRuntimes",
        value: function getRuntimes() {
          return [{
            id: 'java',
            name: 'Java'
          }, {
            id: 'go',
            name: 'GO'
          }, {
            id: 'python',
            name: 'Python'
          }, {
            id: 'nodejs',
            name: 'NodeJS'
          }];
        }
      }, {
        key: "getTriggerTypes",
        value: function getTriggerTypes() {
          return [{
            id: 'http',
            name: 'HTTP Webhook'
          }, {
            id: 'kafka-topic',
            name: 'Kafka Topic'
          }, {
            id: 'cron-expression',
            name: 'CRON Trigger'
          }];
        }
      }, {
        key: "changeFileNames",
        value: function changeFileNames(event) {
          var runtime = event.target.value;
          console.log("Runtime:", runtime);
          switch (runtime) {
            case "java":
              this.handlerFileName = "Handler.java";
              this.dependencyFileName = "build.gradle";
              break;
            case "go":
              this.handlerFileName = "Handler.go";
              this.dependencyFileName = "main.mod";
              break;
            case "python":
              this.handlerFileName = "handler.py";
              this.dependencyFileName = "requirements.txt";
              break;
            case "nodejs":
              this.handlerFileName = "handler.js";
              this.dependencyFileName = "package.json";
              break;
            default:
              break;
          }
          //this.initializeTextAreaFunction(runtime);
        }
        //initializeTextAreaFunction(runtime: string) {
        //	console.log("Textarea", runtime);
        //	switch (runtime) {
        //		case "java17":
        //			this.createFunctionForm.patchValue({
        //					handlerFileContent: atob('cGFja2FnZSBjb20ub3BlbmZhYXMuZnVuY3Rpb247CgppbXBvcnQgY29tLm9wZW5mYWFzLm1vZGVsLklIYW5kbGVyOwppbXBvcnQgY29tLm9wZW5mYWFzLm1vZGVsLklSZXNwb25zZTsKaW1wb3J0IGNvbS5vcGVuZmFhcy5tb2RlbC5JUmVxdWVzdDsKaW1wb3J0IGNvbS5vcGVuZmFhcy5tb2RlbC5SZXNwb25zZTsgICAgICAgCnB1YmxpYyBjbGFzcyBIYW5kbGVyIGV4dGVuZHMgY29tLm9wZW5mYWFzLm1vZGVsLlNhbXBsZUhhbmRsZXIgeyAKICAgICAKICAgICBwdWJsaWMgSVJlc3BvbnNlIEhhbmRsZShJUmVxdWVzdCByZXEpIHsKICAgICAgICAgIFJlc3BvbnNlIHJlcyA9IG5ldyBSZXNwb25zZSgpOwogICAgICAgICAvL3lvdXIgY29kZSBnb2VzIGhlcmUKICAgICAgICAgIHJlcy5zZXRCb2R5KCJIZWxsbywgd29ybGQhIik7ICAgICAgCiAgICAgICAgICByZXR1cm4gcmVzOwogICAgICAgIH0KCn0='),
        //				dependencyFileContent: atob('cGx1Z2lucyB7CiAgICAvLyBBcHBseSB0aGUgamF2YS1saWJyYXJ5IHBsdWdpbiB0byBhZGQgc3VwcG9ydCBmb3IgSmF2YSBMaWJyYXJ5CiAgICBpZCAnamF2YS1saWJyYXJ5JwogICAgaWQgJ2Rpc3RyaWJ1dGlvbicKfQoKZGVwZW5kZW5jaWVzIHsKICAgIC8vIFRoaXMgZGVwZW5kZW5jeSBpcyBleHBvcnRlZCB0byBjb25zdW1lcnMsIHRoYXQgaXMgdG8gc2F5IGZvdW5kIG9uIHRoZWlyIGNvbXBpbGUgY2xhc3NwYXRoLgogICAgYXBpICdvcmcuYXBhY2hlLmNvbW1vbnM6Y29tbW9ucy1tYXRoMzozLjYuMScKCiAgICAvLyBUaGlzIGRlcGVuZGVuY3kgaXMgdXNlZCBpbnRlcm5hbGx5LCBhbmQgbm90IGV4cG9zZWQgdG8gY29uc3VtZXJzIG9uIHRoZWlyIG93biBjb21waWxlIGNsYXNzcGF0aC4KICAgIGltcGxlbWVudGF0aW9uICdjb20uZ29vZ2xlLmd1YXZhOmd1YXZhOjIzLjAnCgogICAgLy8gVXNlIEpVbml0IHRlc3QgZnJhbWV3b3JrCiAgICB0ZXN0SW1wbGVtZW50YXRpb24gJ2p1bml0Omp1bml0OjQuMTInCgogICAgY29tcGlsZSAnY29tLm9wZW5mYWFzOm1vZGVsOjAuMS4xJwogICAgY29tcGlsZSAnY29tLm9wZW5mYWFzOmVudHJ5cG9pbnQ6MC4xLjAnCn0KCi8vIEluIHRoaXMgc2VjdGlvbiB5b3UgZGVjbGFyZSB3aGVyZSB0byBmaW5kIHRoZSBkZXBlbmRlbmNpZXMgb2YgeW91ciBwcm9qZWN0CnJlcG9zaXRvcmllcyB7CiAgICAvLyBVc2UgamNlbnRlciBmb3IgcmVzb2x2aW5nIHlvdXIgZGVwZW5kZW5jaWVzLgogICAgLy8gWW91IGNhbiBkZWNsYXJlIGFueSBNYXZlbi9JdnkvZmlsZSByZXBvc2l0b3J5IGhlcmUuCiAgICBqY2VudGVyKCkKCiAgICBmbGF0RGlyIHsKICAgICAgICBkaXJzICcuLi9saWJzJwogICAgfQp9CgpqYXIgewogICAgbWFuaWZlc3QgewogICAgICAgIGF0dHJpYnV0ZXMgJ0ltcGxlbWVudGF0aW9uLVRpdGxlJzogJ09wZW5GYWFTIEZ1bmN0aW9uJywKICAgICAgICAgICAgICAgICAgICdJbXBsZW1lbnRhdGlvbi1WZXJzaW9uJzogJzEuMCcKICAgIH0KfQoKCmRpc3RyaWJ1dGlvbnMgewogICAgbWFpbiB7CiAgICAgICAgY29udGVudHMgewogICAgICAgICAgICBmcm9tIGphcgogICAgICAgICAgICBpbnRvKCdsaWInKSB7CiAgICAgICAgICAgICAgICBmcm9tKHByb2plY3QuY29uZmlndXJhdGlvbnMucnVudGltZSkKICAgICAgICAgICAgfQogICAgICAgIH0KICAgIH0KfQoKdXBsb2FkQXJjaGl2ZXMgewogICAgcmVwb3NpdG9yaWVzIHsKICAgICAgIGZsYXREaXIgewogICAgICAgICAgIGRpcnMgJ3JlcG9zJwogICAgICAgfQogICAgfQp9'),
        //        });
        //			break;
        //		case "dotnet8-csharp": this.createFunctionForm.patchValue({
        //				handlerFileContent: atob('dXNpbmcgTWljcm9zb2Z0LkFzcE5ldENvcmUuQnVpbGRlcjsKdXNpbmcgTWljcm9zb2Z0LkFzcE5ldENvcmUuSHR0cDsKdXNpbmcgTWljcm9zb2Z0LkV4dGVuc2lvbnMuRGVwZW5kZW5jeUluamVjdGlvbjsKCm5hbWVzcGFjZSBmdW5jdGlvbjsKCnB1YmxpYyBzdGF0aWMgY2xhc3MgSGFuZGxlcgp7CiAgICAvLyBNYXBFbmRwb2ludHMgaXMgdXNlZCB0byByZWdpc3RlciBXZWJBcHBsaWNhdGlvbgogICAgLy8gSFRUUCBoYW5kbGVycyBmb3IgdmFyaW91cyBwYXRocyBhbmQgSFRUUCBtZXRob2RzLgogICAgcHVibGljIHN0YXRpYyB2b2lkIE1hcEVuZHBvaW50cyhXZWJBcHBsaWNhdGlvbiBhcHApCiAgICB7CiAgICAgICAgYXBwLk1hcEdldCgiLyIsICgpID0+CiAgICAgICAgewogICAgICAgICAgICByZXR1cm4gIkhlbGxvIGZyb20gT3BlbkZhYVMuIjsKICAgICAgICB9KTsKICAgIH0KCiAgICAvLyBNYXBTZXJ2aWNlcyBjYW4gYmUgdXNlZCB0byBjb25maWd1cmUgYWRkaXRpb25hbAogICAgLy8gV2ViQXBwbGljYXRpb24gc2VydmljZXMKICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYXBTZXJ2aWNlcyhJU2VydmljZUNvbGxlY3Rpb24gc2VydmljZXMpCiAgICB7CiAgICB9Cn0K'),
        //				dependencyFileContent: atob('PFByb2plY3QgU2RrPSJNaWNyb3NvZnQuTkVULlNkayI+CgogIDxQcm9wZXJ0eUdyb3VwPgogICAgPFRhcmdldEZyYW1ld29yaz5uZXQ4LjA8L1RhcmdldEZyYW1ld29yaz4KICAgIDxJbXBsaWNpdFVzaW5ncz5lbmFibGU8L0ltcGxpY2l0VXNpbmdzPgogICAgPE51bGxhYmxlPmVuYWJsZTwvTnVsbGFibGU+CiAgPC9Qcm9wZXJ0eUdyb3VwPgoKICA8SXRlbUdyb3VwPgogICAgPEZyYW1ld29ya1JlZmVyZW5jZSBJbmNsdWRlPSJNaWNyb3NvZnQuQXNwTmV0Q29yZS5BcHAiIC8+CiAgPC9JdGVtR3JvdXA+Cgo8L1Byb2plY3Q+Cg==')
        //			break;
        //		case "python3-flask": this.createFunctionForm.patchValue({
        //				handlerFileContent: atob('ZGVmIGhhbmRsZShyZXEpOgogICAgIiIiaGFuZGxlIGEgcmVxdWVzdCB0byB0aGUgZnVuY3Rpb24KICAgIEFyZ3M6CiAgICAgICAgcmVxIChzdHIpOiByZXF1ZXN0IGJvZHkKICAgICIiIgoKICAgIHJldHVybiByZXE='),
        //				dependencyFileContent: atob('bnVtcHkKcGFuZGFz') 
        //      })
        //			break;
        //		case "node18":
        //			this.createFunctionForm.patchValue({
        //					handlerFileContent: atob('J3VzZSBzdHJpY3QnCgptb2R1bGUuZXhwb3J0cyA9IGFzeW5jIChldmVudCwgY29udGV4dCkgPT4gewogIGNvbnN0IHJlc3VsdCA9IHsKICAgICdzdGF0dXMnOiAnUmVjZWl2ZWQgaW5wdXQ6ICcgKyBKU09OLnN0cmluZ2lmeShldmVudC5ib2R5KQogIH0KCiAgcmV0dXJuIGNvbnRleHQKICAgIC5zdGF0dXMoMjAwKQogICAgLnN1Y2NlZWQocmVzdWx0KQp9'),
        //				dependencyFileContent: atob('ewogICJuYW1lIjogIm9wZW5mYWFzLW5vZGUxMiIsCiAgInZlcnNpb24iOiAiMS4wLjAiLAogICJkZXNjcmlwdGlvbiI6ICIiLAogICJtYWluIjogImluZGV4LmpzIiwKICAic2NyaXB0cyI6IHsKICAgICJ0ZXN0IjogImVjaG8gXCJFcnJvcjogbm8gdGVzdHMgc3BlY2lmaWVkXCIgJiYgZXhpdCAwIgogIH0sCiAgImtleXdvcmRzIjogW10sCiAgImF1dGhvciI6ICJPcGVuRmFhUyBMdGQiLAogICJsaWNlbnNlIjogIk1JVCIsCiAgImRlcGVuZGVuY2llcyI6IHsKICAgICJib2R5LXBhcnNlciI6ICJeMS4xOC4yIiwKICAgICJleHByZXNzIjogIl40LjE2LjIiCiAgfQp9')
        //        });
        //			break;
        //		default:
        //			break;
        //    }
        //	}
        //}
      }, {
        key: "f",
        get: function get() {
          return this.createFunctionForm.controls;
        }
      }, {
        key: "createFunction",
        value: function createFunction() {
          var _this8 = this;
          this.submitted = true;
          //if(this.createFunctionForm.invalid){
          //console.log("Invalid form",this.f.runtime.errors);
          //return;
          //}
          this.createFunctionErrorFlag = false;
          this.functionBuildLog = "";
          var functionObj = new _model_function__WEBPACK_IMPORTED_MODULE_6__["Function"]();
          functionObj.projectName = this.projectName;
          functionObj.functionName = this.createFunctionForm.controls['functionName'].value;
          functionObj.functionImage = this.createFunctionForm.controls['functionImage'].value;
          functionObj.runtime = this.createFunctionForm.controls['runtime'].value;
          functionObj.handlerFileContent = btoa(this.createFunctionForm.controls['handlerFileContent'].value);
          functionObj.dependencyFileContent = btoa(this.createFunctionForm.controls['dependencyFileContent'].value);
          functionObj.handlerFileName = this.handlerFileName;
          functionObj.dependencyFileName = this.dependencyFileName;
          this.functionName = this.createFunctionForm.controls['functionName'].value;
          console.log("functionObj:", functionObj);
          this.createFunctionFlag = true;
          this.userMsg = "creating function... This will take some time.";
          this.functionService.createFunction(functionObj).subscribe(function (data) {
            console.log(data);
            _this8.userMsg = null;
            _this8.deployFlag = true;
            _this8.alertMsg = data['message'];
            _this8.alertConfigurations("success");
          }, function (err) {
            _this8.userMsg = null;
            _this8.submitted = false;
            _this8.createFunctionErrorFlag = true;
            _this8.createFunctionFlag = false;
            console.log(err);
            _this8.alertConfigurations("danger");
            _this8.alertMsg = err.error.message;
          });
        }
      }, {
        key: "viewErrorLog",
        value: function viewErrorLog() {
          var _this9 = this;
          console.log("Function name: ", this.functionName);
          var functionObj = new _model_function__WEBPACK_IMPORTED_MODULE_6__["Function"]();
          functionObj.projectName = this.projectName;
          functionObj.functionName = this.functionName;
          this.functionService.getFunctionBuildLog(functionObj).subscribe(function (data) {
            console.log("Encrypted data:", data);
            var encrytedData = atob(data);
            _this9.functionBuildLog = encrytedData;
          }, function (err) {
            console.log("Error msg:", err);
            console.log(err.error.message);
          });
        }
      }, {
        key: "changeTriggerType",
        value: function changeTriggerType(event) {
          var triggerType = event.target.value;
          this.initializeFlags();
          console.log("Trigger Type:", triggerType);
          switch (triggerType) {
            case "kafka-topic":
              this.kafkaFlag = true;
              break;
            case "cron-expression":
              this.cronFlag = true;
              break;
            default:
              break;
          }
        }
      }, {
        key: "initializeFlags",
        value: function initializeFlags() {
          this.kafkaFlag = false;
          this.cronFlag = false;
        }
      }, {
        key: "deployFunction",
        value: function deployFunction() {
          var _this0 = this;
          console.log("Deploy form: ", this.deployFunctionForm.value);
          var functionObj = new _model_function__WEBPACK_IMPORTED_MODULE_6__["Function"]();
          functionObj.projectName = this.projectName;
          functionObj.functionName = this.functionName;
          functionObj.labels = {};
          functionObj.labels["com.openfaas.scale.zero"] = this.deployFunctionForm.controls['scaleToZero'].value;
          functionObj.triggerType = this.deployFunctionForm.controls['triggerType'].value;
          functionObj.annotations = {};
          switch (functionObj.triggerType) {
            case "kafka-topic":
              functionObj.annotations["topic"] = this.deployFunctionForm.controls['topic'].value;
              break;
            case "cron-expression":
              functionObj.annotations["schedule"] = this.deployFunctionForm.controls['schedule'].value;
              break;
            default:
              break;
          }
          console.log("labelObj:", functionObj.labels);
          console.log("annotationsObj:", functionObj.annotations);
          console.log("functionObj:", JSON.stringify(functionObj));
          this.functionService.deployFunction(functionObj).subscribe(function (data) {
            _this0.deployFunctionFlag = true;
            console.log(data);
            _this0.modalService.dismissAll();
            _this0.getFunctionParameters();
            _this0.isFunctionAlreadyDeployed = true;
            _this0.alertMsg = data['message'];
            _this0.alertConfigurations("success");
          }, function (err) {
            //alert("Something Went wrong);
            //this.loginError = true;
            console.log(err);
            _this0.modalService.dismissAll();
            _this0.alertMsg = err.error.message;
            _this0.alertConfigurations("danger");
          });
        }
      }, {
        key: "alertConfigurations",
        value: function alertConfigurations(type) {
          this.alertConfig.type = type;
        }
      }]);
    }();
    CreateComponent.ctorParameters = function () {
      return [{
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]
      }, {
        type: src_app_services_function_service__WEBPACK_IMPORTED_MODULE_4__["FunctionService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]
      }, {
        type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__["NgbModal"]
      }, {
        type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__["NgbAlertConfig"]
      }, {
        type: src_app_services_project_service__WEBPACK_IMPORTED_MODULE_5__["ProjectService"]
      }];
    };
    CreateComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-create',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./create.component.html */"./node_modules/raw-loader/dist/cjs.js!./src/app/function/create/create.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./create.component.scss */"./src/app/function/create/create.component.scss"))["default"]]
    })], CreateComponent);

    /***/
  }),
  /***/"./src/app/function/deploy/deploy.component.scss": (
  /*!*******************************************************!*\
    !*** ./src/app/function/deploy/deploy.component.scss ***!
    \*******************************************************/
  /*! exports provided: default */
  /***/
  function _src_app_function_deploy_deployComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Z1bmN0aW9uL2RlcGxveS9kZXBsb3kuY29tcG9uZW50LnNjc3MifQ== */";

    /***/
  }),
  /***/"./src/app/function/deploy/deploy.component.ts": (
  /*!*****************************************************!*\
    !*** ./src/app/function/deploy/deploy.component.ts ***!
    \*****************************************************/
  /*! exports provided: DeployComponent */
  /***/
  function _src_app_function_deploy_deployComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "DeployComponent", function () {
      return DeployComponent;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */"./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */"./node_modules/@angular/core/fesm2015/core.js");
    var DeployComponent = /*#__PURE__*/function () {
      function DeployComponent() {
        _classCallCheck(this, DeployComponent);
      }
      return _createClass(DeployComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }]);
    }();
    DeployComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-deploy',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./deploy.component.html */"./node_modules/raw-loader/dist/cjs.js!./src/app/function/deploy/deploy.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./deploy.component.scss */"./src/app/function/deploy/deploy.component.scss"))["default"]]
    })], DeployComponent);

    /***/
  }),
  /***/"./src/app/function/function.component.scss": (
  /*!**************************************************!*\
    !*** ./src/app/function/function.component.scss ***!
    \**************************************************/
  /*! exports provided: default */
  /***/
  function _src_app_function_functionComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Z1bmN0aW9uL2Z1bmN0aW9uLmNvbXBvbmVudC5zY3NzIn0= */";

    /***/
  }),
  /***/"./src/app/function/function.component.ts": (
  /*!************************************************!*\
    !*** ./src/app/function/function.component.ts ***!
    \************************************************/
  /*! exports provided: FunctionComponent */
  /***/
  function _src_app_function_functionComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "FunctionComponent", function () {
      return FunctionComponent;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */"./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */"./node_modules/@angular/core/fesm2015/core.js");
    var FunctionComponent = /*#__PURE__*/function () {
      function FunctionComponent() {
        _classCallCheck(this, FunctionComponent);
      }
      return _createClass(FunctionComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }]);
    }();
    FunctionComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-function',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./function.component.html */"./node_modules/raw-loader/dist/cjs.js!./src/app/function/function.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./function.component.scss */"./src/app/function/function.component.scss"))["default"]]
    })], FunctionComponent);

    /***/
  }),
  /***/"./src/app/function/logs/logs.component.scss": (
  /*!***************************************************!*\
    !*** ./src/app/function/logs/logs.component.scss ***!
    \***************************************************/
  /*! exports provided: default */
  /***/
  function _src_app_function_logs_logsComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Z1bmN0aW9uL2xvZ3MvbG9ncy5jb21wb25lbnQuc2NzcyJ9 */";

    /***/
  }),
  /***/"./src/app/function/logs/logs.component.ts": (
  /*!*************************************************!*\
    !*** ./src/app/function/logs/logs.component.ts ***!
    \*************************************************/
  /*! exports provided: LogsComponent */
  /***/
  function _src_app_function_logs_logsComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "LogsComponent", function () {
      return LogsComponent;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */"./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */"./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */
    var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */"./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */
    var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */"./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */
    var src_app_services_function_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/function.service */"./src/app/_services/function.service.ts");
    /* harmony import */
    var src_app_services_project_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/project.service */"./src/app/_services/project.service.ts");
    /* harmony import */
    var _model_function__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../_model/function */"./src/app/_model/function.ts");
    /* harmony import */
    var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */"./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
    var LogsComponent = /*#__PURE__*/function () {
      function LogsComponent(route, formBuilder, functionService, alertConfig, router, projectService) {
        _classCallCheck(this, LogsComponent);
        this.route = route;
        this.formBuilder = formBuilder;
        this.functionService = functionService;
        this.alertConfig = alertConfig;
        this.router = router;
        this.projectService = projectService;
        //startCtrl = new FormControl();
        this.userId = "";
        this.hourStep = 1;
        this.minuteStep = 15;
        this.secondStep = 30;
        this.functionLogsForm = this.formBuilder.group({
          projectName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
          functionName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
          timestamp: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
          limits: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
        this.projectName = "";
        this.functionName = "";
        this.functionLogsList = [];
        this.emptyLogsFlag = false;
        this.isFunctionLogsNull = true;
        this.currentDate = new Date().toISOString();
        this.paginatedData = [];
        this.currentPage = 1;
        this.pageSize = 10;
        this.collectionSize = 0;
        this.alertMsg = "";
        this.projectsList = [];
        this.submitted = false;
        this.breadcrumb = [];
      }
      return _createClass(LogsComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this1 = this;
          this.userId = localStorage.getItem('userId');
          this.route.queryParams.subscribe(function (params) {
            _this1.projectName = params['project'];
          });
          this.route.queryParams.subscribe(function (params) {
            _this1.functionName = params['function'];
            _this1.listProjects();
          });
          console.log("Project", this.projectName);
          console.log("Function", this.functionName);
          console.log("currentDate", this.currentDate);
          this.functionLogsForm = this.formBuilder.group({
            projectName: this.projectName,
            functionName: this.functionName,
            timestamp: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            limits: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
          });
          this.functionLogsForm.controls['projectName'].disable();
          this.functionLogsForm.controls['functionName'].disable();
          this.breadcrumb = [{
            url: "/projects/home",
            params: {
              'project': this.projectName
            },
            name: 'Home'
          }, {
            url: '',
            params: '',
            name: 'Logs'
          }];
        }
      }, {
        key: "listProjects",
        value: function listProjects() {
          var _this10 = this;
          console.log("project inside create/deploy: ", this.projectName);
          this.projectService.listProjects(this.userId).subscribe(function (data) {
            _this10.projectsList = data;
            console.log("projects List :", _this10.projectsList);
            var redirect2 = false;
            var _iterator3 = _createForOfIteratorHelper(_this10.projectsList),
              _step3;
            try {
              var _loop2 = function _loop2() {
                var project = _step3.value;
                if (_this10.projectName == project['projectName']) {
                  if (project['projectRoleName'] == "PROJECT_VIEWER") {
                    redirect2 = true;
                    console.log("Routing to home");
                  } else {
                    _this10.functionService.listFunctions(_this10.projectName).subscribe(function (data) {
                      if (data == undefined || data.length < 0) {} else {
                        var redirect = false;
                        var _iterator4 = _createForOfIteratorHelper(data),
                          _step4;
                        try {
                          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                            var func = _step4.value;
                            if (func['functionName'] == _this10.functionName) {
                              redirect = true;
                            }
                          }
                        } catch (err) {
                          _iterator4.e(err);
                        } finally {
                          _iterator4.f();
                        }
                        if (!redirect) {
                          console.log("Routing to home");
                          _this10.router.navigate(['projects/home'], {
                            queryParams: {
                              project: project['projectName']
                            }
                          });
                        }
                      }
                      ;
                    }, function (err) {
                      console.log(err);
                    });
                  }
                }
              };
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                _loop2();
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
            if (redirect2) {
              _this10.router.navigate(['projects/home'], {
                queryParams: {
                  project: _this10.projectName
                }
              });
            }
          }, function (err) {
            console.log(err);
            console.log(err.error.message);
          });
        }
      }, {
        key: "refreshPagination",
        value: function refreshPagination() {
          this.paginatedData = this.functionLogsList.slice((this.currentPage - 1) * this.pageSize, (this.currentPage - 1) * this.pageSize + this.pageSize);
          console.log("paginated Data:", this.paginatedData);
        }
      }, {
        key: "navigateEvent",
        value: function navigateEvent(event) {
          this.date = event.next;
          console.log("date:", this.date);
        }
      }, {
        key: "newProjectObject",
        value: function newProjectObject(projectObj) {
          console.log("Project Object in parent: ", projectObj);
          if (projectObj == undefined) {
            console.log("Null Projects");
          } else {
            console.log("Project Obj", projectObj);
          }
        }
      }, {
        key: "f",
        get: function get() {
          return this.functionLogsForm.controls;
        }
      }, {
        key: "getFunctionLogs",
        value: function getFunctionLogs() {
          var _this11 = this;
          this.submitted = true;
          if (this.functionLogsForm.invalid) {
            return;
          }
          var functionObj = new _model_function__WEBPACK_IMPORTED_MODULE_6__["Function"]();
          functionObj.projectName = this.functionLogsForm.controls['projectName'].value;
          functionObj.functionName = this.functionLogsForm.controls['functionName'].value;
          functionObj.timestamp = new Date(this.functionLogsForm.controls['timestamp'].value).toISOString();
          functionObj.limits = this.functionLogsForm.controls['limits'].value;
          console.log("Function Obj:", functionObj);
          this.functionService.getFunctionLogs(functionObj).subscribe(function (data) {
            console.log("data", data);
            _this11.functionLogsList = data;
            if (_this11.functionLogsList == null || _this11.functionLogsList.length < 0) {
              _this11.isFunctionLogsNull = true;
              _this11.emptyLogsFlag = true;
            } else {
              _this11.collectionSize = _this11.functionLogsList.length;
              _this11.refreshPagination();
              _this11.isFunctionLogsNull = false;
              _this11.emptyLogsFlag = false;
            }
          }, function (err) {
            _this11.alertConfigurations("danger");
            _this11.alertMsg = err.error.error;
            console.log(err);
            console.log(err.error.message);
          });
        }
      }, {
        key: "alertConfigurations",
        value: function alertConfigurations(type) {
          this.alertConfig.type = type;
        }
      }]);
    }();
    LogsComponent.ctorParameters = function () {
      return [{
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]
      }, {
        type: src_app_services_function_service__WEBPACK_IMPORTED_MODULE_4__["FunctionService"]
      }, {
        type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__["NgbAlertConfig"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]
      }, {
        type: src_app_services_project_service__WEBPACK_IMPORTED_MODULE_5__["ProjectService"]
      }];
    };
    LogsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-logs',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./logs.component.html */"./node_modules/raw-loader/dist/cjs.js!./src/app/function/logs/logs.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./logs.component.scss */"./src/app/function/logs/logs.component.scss"))["default"]]
    })], LogsComponent);

    /***/
  }),
  /***/"./src/app/layout/common/footer/footer.component.scss": (
  /*!************************************************************!*\
    !*** ./src/app/layout/common/footer/footer.component.scss ***!
    \************************************************************/
  /*! exports provided: default */
  /***/
  function _src_app_layout_common_footer_footerComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9jb21tb24vZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQuc2NzcyJ9 */";

    /***/
  }),
  /***/"./src/app/layout/common/footer/footer.component.ts": (
  /*!**********************************************************!*\
    !*** ./src/app/layout/common/footer/footer.component.ts ***!
    \**********************************************************/
  /*! exports provided: FooterComponent */
  /***/
  function _src_app_layout_common_footer_footerComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "FooterComponent", function () {
      return FooterComponent;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */"./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */"./node_modules/@angular/core/fesm2015/core.js");
    var FooterComponent = /*#__PURE__*/function () {
      function FooterComponent() {
        _classCallCheck(this, FooterComponent);
      }
      return _createClass(FooterComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }]);
    }();
    FooterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-footer',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./footer.component.html */"./node_modules/raw-loader/dist/cjs.js!./src/app/layout/common/footer/footer.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./footer.component.scss */"./src/app/layout/common/footer/footer.component.scss"))["default"]]
    })], FooterComponent);

    /***/
  }),
  /***/"./src/app/layout/common/header/header.component.scss": (
  /*!************************************************************!*\
    !*** ./src/app/layout/common/header/header.component.scss ***!
    \************************************************************/
  /*! exports provided: default */
  /***/
  function _src_app_layout_common_header_headerComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "@charset \"UTF-8\";\n:host {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  font-size: 14px;\n  color: #333;\n  box-sizing: border-box;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  margin: 8px 0;\n}\np {\n  margin: 0;\n}\n.spacer {\n  flex: 1;\n}\n.row {\n  margin-right: 15px;\n}\n.createImg {\n  margin-left: 15px;\n}\n.manageImg {\n  margin-right: 30px;\n}\n.createBtn {\n  background: #1d48a9f5;\n  font-weight: bold;\n  color: white;\n}\n.form-group {\n  position: relative;\n}\nlabel {\n  font-size: 16px;\n  display: inline-block;\n  width: 150px;\n  text-align: left;\n  font-family: Arial, Helvetica, sans-serif;\n  color: black;\n  background: border-box;\n}\n.content {\n  display: flex;\n  margin: 82px auto 32px;\n  padding: 0 16px;\n  max-width: 960px;\n  flex-direction: column;\n  align-items: center;\n}\nsvg.material-icons {\n  height: 24px;\n  width: auto;\n}\nsvg.material-icons:not(:last-child) {\n  margin-right: 8px;\n}\n.card svg.material-icons path {\n  fill: #888;\n}\n.card-container {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  margin-top: 16px;\n}\n.card {\n  border-radius: 4px;\n  border: 1px solid #eee;\n  background-color: #fafafa;\n  height: 40px;\n  width: 200px;\n  margin: 0 8px 16px;\n  padding: 16px;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  transition: all 0.2s ease-in-out;\n  line-height: 24px;\n}\n.card-container .card:not(:last-child) {\n  margin-right: 0;\n}\n.card.card-small {\n  height: 16px;\n  width: 168px;\n}\n.card-container .card:not(.highlight-card) {\n  cursor: pointer;\n}\n.card-container .card:not(.highlight-card):hover {\n  transform: translateY(-3px);\n  box-shadow: 0 4px 17px rgba(0, 0, 0, 0.35);\n}\n.card-container .card:not(.highlight-card):hover .material-icons path {\n  fill: #696767;\n}\n.card.highlight-card {\n  background-color: #1976d2;\n  color: white;\n  font-weight: 600;\n  border: none;\n  width: auto;\n  min-width: 30%;\n  position: relative;\n}\n.card.card.highlight-card span {\n  margin-left: 60px;\n}\nsvg#rocket {\n  width: 80px;\n  position: absolute;\n  left: -10px;\n  top: -24px;\n}\nsvg#rocket-smoke {\n  height: calc(100vh - 95px);\n  position: absolute;\n  top: 10px;\n  right: 180px;\n  z-index: -10;\n}\na,\na:visited,\na:hover {\n  color: #1976d2;\n  text-decoration: none;\n}\na:hover {\n  color: #125699;\n}\n.terminal {\n  position: relative;\n  width: 80%;\n  max-width: 600px;\n  border-radius: 6px;\n  padding-top: 45px;\n  margin-top: 8px;\n  overflow: hidden;\n  background-color: #0f0f10;\n}\n.terminal::before {\n  content: \"���\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 4px;\n  background: #3a3a3a;\n  color: #c2c3c4;\n  width: 100%;\n  font-size: 2rem;\n  line-height: 0;\n  padding: 14px 0;\n  text-indent: 4px;\n}\n.terminal pre {\n  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;\n  color: white;\n  padding: 0 1rem 1rem;\n  margin: 0;\n}\n.circle-link {\n  height: 40px;\n  width: 40px;\n  border-radius: 40px;\n  margin: 8px;\n  background-color: white;\n  border: 1px solid #eeeeee;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n  transition: 1s ease-out;\n}\n.circle-link:hover {\n  transform: translateY(-0.25rem);\n  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);\n}\nfooter {\n  margin-top: 8px;\n  display: flex;\n  align-items: center;\n  line-height: 20px;\n}\nfooter a {\n  display: flex;\n  align-items: center;\n}\n.github-star-badge {\n  color: #24292e;\n  display: flex;\n  align-items: center;\n  font-size: 12px;\n  padding: 3px 10px;\n  border: 1px solid rgba(27, 31, 35, 0.2);\n  border-radius: 3px;\n  background-image: linear-gradient(-180deg, #fafbfc, #eff3f6 90%);\n  margin-left: 4px;\n  font-weight: 600;\n  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;\n}\n.github-star-badge:hover {\n  background-image: linear-gradient(-180deg, #f0f3f6, #e6ebf1 90%);\n  border-color: rgba(27, 31, 35, 0.35);\n  background-position: -0.5em;\n}\n.github-star-badge .material-icons {\n  height: 16px;\n  width: 16px;\n  margin-right: 4px;\n}\nsvg#clouds {\n  position: fixed;\n  bottom: -160px;\n  left: -230px;\n  z-index: -10;\n  width: 1920px;\n}\n/* Responsive Styles */\n@media screen and (max-width: 767px) {\n  .card-container > *:not(.circle-link),\n.terminal {\n    width: 100%;\n  }\n\n  .card:not(.highlight-card) {\n    height: 16px;\n    margin: 8px 0;\n  }\n\n  .card.highlight-card span {\n    margin-left: 72px;\n  }\n\n  svg#rocket-smoke {\n    right: 120px;\n    transform: rotate(-5deg);\n  }\n}\n@media screen and (max-width: 575px) {\n  svg#rocket-smoke {\n    display: none;\n    visibility: hidden;\n  }\n}\n.textColor {\n  color: #1d4c74;\n}\n.right-nav .nav-item {\n  display: flex;\n  align-items: center;\n}\n.right-nav .f-22 {\n  font-size: 22px;\n}\n.navbar-expand-lg .navbar-nav .dropdown-menu {\n  margin-top: -20px;\n  margin-right: -20px;\n}\n.header {\n  background: linear-gradient(90deg, #333073 0%, #444498 35%, #34808e 100%);\n}\n.nav-item.custom-right-section.show.dropdown {\n  border-radius: 25px 25px 0 0;\n}\n.nav-item.custom-right-section.dropdown {\n  border-radius: 25px;\n}\n.custom-right-section {\n  min-width: 200px;\n  display: flex;\n  background: #216070;\n  padding-right: 20px;\n  background-image: url('vector-white.svg');\n  background-repeat: no-repeat;\n  background-position: 92%;\n}\n.custom-right-section a {\n  padding: 4px 25px 4px 10px;\n  display: flex;\n  flex-direction: column;\n  color: #494848;\n}\n.custom-right-section .dropdown-menu-right a {\n  border-bottom: 1px solid #c2c2c7;\n  font-size: 14px;\n}\n.custom-right-section .dropdown-menu-right a:last-child:hover {\n  border-bottom: 0;\n}\n.custom-right-section .dropdown-menu-right a:hover {\n  background: #2b88a0;\n  color: #fff;\n}\n.custom-right-section .dropdown-menu-right.dropdown-menu.show {\n  position: absolute;\n  width: 100%;\n  margin-top: 3px;\n  background-color: white;\n  z-index: 1;\n  border-radius: 0px 0 5px 5px;\n  border-top: 1px solid #d5d4d4;\n  box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.2);\n  padding: 0px;\n  left: 0;\n  border: 0;\n  z-index: 1000 !important;\n}\n.custom-right-section .dropdown-toggle::after {\n  display: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2NvbW1vbi9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9sYXlvdXQvY29tbW9uL2hlYWRlci9DOlxcS1xcS05hdGl2ZVxcRmlzc2lvblxcVUlfRmlzc2lvbi9zcmNcXGFwcFxcbGF5b3V0XFxjb21tb25cXGhlYWRlclxcaGVhZGVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQ0NoQjtFQUNFLDBKQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7RUFDQSxzQkFBQTtFQUNBLG1DQUFBO0VBQ0Esa0NBQUE7QURDRjtBQ0VBOzs7Ozs7RUFNRSxhQUFBO0FEQ0Y7QUNFQTtFQUNFLFNBQUE7QURDRjtBQ0VBO0VBQ0UsT0FBQTtBRENGO0FDRUE7RUFDRSxrQkFBQTtBRENGO0FDRUE7RUFDRSxpQkFBQTtBRENGO0FDRUE7RUFDRSxrQkFBQTtBRENGO0FDRUE7RUFDRSxxQkFBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtBRENGO0FDRUE7RUFDRSxrQkFBQTtBRENGO0FDRUE7RUFDRSxlQUFBO0VBQ0EscUJBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5Q0FBQTtFQUNBLFlBQUE7RUFDQSxzQkFBQTtBRENGO0FDRUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0FEQ0Y7QUNFQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0FEQ0Y7QUNFQTtFQUNFLGlCQUFBO0FEQ0Y7QUNFQTtFQUNFLFVBQUE7QURDRjtBQ0VBO0VBQ0UsYUFBQTtFQUNBLGVBQUE7RUFDQSx1QkFBQTtFQUNBLGdCQUFBO0FEQ0Y7QUNFQTtFQUNFLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSx5QkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGdDQUFBO0VBQ0EsaUJBQUE7QURDRjtBQ0VBO0VBQ0UsZUFBQTtBRENGO0FDRUE7RUFDRSxZQUFBO0VBQ0EsWUFBQTtBRENGO0FDRUE7RUFDRSxlQUFBO0FEQ0Y7QUNFQTtFQUNFLDJCQUFBO0VBQ0EsMENBQUE7QURDRjtBQ0VBO0VBQ0UsYUFBQTtBRENGO0FDRUE7RUFDRSx5QkFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0FEQ0Y7QUNFQTtFQUNFLGlCQUFBO0FEQ0Y7QUNFQTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0FEQ0Y7QUNFQTtFQUNFLDBCQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7QURDRjtBQ0VBOzs7RUFHRSxjQUFBO0VBQ0EscUJBQUE7QURDRjtBQ0VBO0VBQ0UsY0FBQTtBRENGO0FDRUE7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5QkFBQTtBRENGO0FDRUE7RUFDRSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QURDRjtBQ0VBO0VBQ0Usd0VBQUE7RUFDQSxZQUFBO0VBQ0Esb0JBQUE7RUFDQSxTQUFBO0FEQ0Y7QUNFQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0EsdUJBQUE7RUFDQSx5QkFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLHdFQUFBO0VBQ0EsdUJBQUE7QURDRjtBQ0VBO0VBQ0UsK0JBQUE7RUFDQSwyQ0FBQTtBRENGO0FDRUE7RUFDRSxlQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7QURDRjtBQ0VBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0FEQ0Y7QUNFQTtFQUNFLGNBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSx1Q0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0VBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsMElBQUE7QURDRjtBQ0VBO0VBQ0UsZ0VBQUE7RUFDQSxvQ0FBQTtFQUNBLDJCQUFBO0FEQ0Y7QUNFQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0EsaUJBQUE7QURDRjtBQ0VBO0VBQ0UsZUFBQTtFQUNBLGNBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7QURDRjtBQ0VBLHNCQUFBO0FBQ0E7RUFDRTs7SUFFRSxXQUFBO0VEQ0Y7O0VDRUE7SUFDRSxZQUFBO0lBQ0EsYUFBQTtFRENGOztFQ0VBO0lBQ0UsaUJBQUE7RURDRjs7RUNFQTtJQUNFLFlBQUE7SUFDQSx3QkFBQTtFRENGO0FBQ0Y7QUNDQTtFQUNFO0lBQ0UsYUFBQTtJQUNBLGtCQUFBO0VEQ0Y7QUFDRjtBQ0NBO0VBQ0UsY0FBQTtBRENGO0FDRUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7QURDRjtBQ0NBO0VBQ0UsZUFBQTtBREVGO0FDQUE7RUFDRSxpQkFBQTtFQUNBLG1CQUFBO0FER0Y7QUNBQTtFQUNFLHlFQUFBO0FER0Y7QUNBQTtFQUNFLDRCQUFBO0FER0Y7QUNBQTtFQUNFLG1CQUFBO0FER0Y7QUNBQTtFQUNFLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSx5Q0FBQTtFQUNBLDRCQUFBO0VBQ0Esd0JBQUE7QURHRjtBQ0RBO0VBQ0UsMEJBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxjQUFBO0FESUY7QUNGQTtFQUNFLGdDQUFBO0VBQ0EsZUFBQTtBREtGO0FDSEE7RUFDRSxnQkFBQTtBRE1GO0FDSkE7RUFDRSxtQkFBQTtFQUNBLFdBQUE7QURPRjtBQ0xBO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtFQUNBLHVCQUFBO0VBQ0EsVUFBQTtFQUNBLDRCQUFBO0VBQ0EsNkJBQUE7RUFDQSwwQ0FBQTtFQUNBLFlBQUE7RUFDQSxPQUFBO0VBQ0EsU0FBQTtFQUNBLHdCQUFBO0FEUUY7QUNOQTtFQUNFLGFBQUE7QURTRiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9jb21tb24vaGVhZGVyL2hlYWRlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBjaGFyc2V0IFwiVVRGLThcIjtcbjpob3N0IHtcbiAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgXCJTZWdvZSBVSVwiLCBSb2JvdG8sIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWYsIFwiQXBwbGUgQ29sb3IgRW1vamlcIiwgXCJTZWdvZSBVSSBFbW9qaVwiLCBcIlNlZ29lIFVJIFN5bWJvbFwiO1xuICBmb250LXNpemU6IDE0cHg7XG4gIGNvbG9yOiAjMzMzO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcbn1cblxuaDEsXG5oMixcbmgzLFxuaDQsXG5oNSxcbmg2IHtcbiAgbWFyZ2luOiA4cHggMDtcbn1cblxucCB7XG4gIG1hcmdpbjogMDtcbn1cblxuLnNwYWNlciB7XG4gIGZsZXg6IDE7XG59XG5cbi5yb3cge1xuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XG59XG5cbi5jcmVhdGVJbWcge1xuICBtYXJnaW4tbGVmdDogMTVweDtcbn1cblxuLm1hbmFnZUltZyB7XG4gIG1hcmdpbi1yaWdodDogMzBweDtcbn1cblxuLmNyZWF0ZUJ0biB7XG4gIGJhY2tncm91bmQ6ICMxZDQ4YTlmNTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLmZvcm0tZ3JvdXAge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbmxhYmVsIHtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHdpZHRoOiAxNTBweDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XG4gIGNvbG9yOiBibGFjaztcbiAgYmFja2dyb3VuZDogYm9yZGVyLWJveDtcbn1cblxuLmNvbnRlbnQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBtYXJnaW46IDgycHggYXV0byAzMnB4O1xuICBwYWRkaW5nOiAwIDE2cHg7XG4gIG1heC13aWR0aDogOTYwcHg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbnN2Zy5tYXRlcmlhbC1pY29ucyB7XG4gIGhlaWdodDogMjRweDtcbiAgd2lkdGg6IGF1dG87XG59XG5cbnN2Zy5tYXRlcmlhbC1pY29uczpub3QoOmxhc3QtY2hpbGQpIHtcbiAgbWFyZ2luLXJpZ2h0OiA4cHg7XG59XG5cbi5jYXJkIHN2Zy5tYXRlcmlhbC1pY29ucyBwYXRoIHtcbiAgZmlsbDogIzg4ODtcbn1cblxuLmNhcmQtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgbWFyZ2luLXRvcDogMTZweDtcbn1cblxuLmNhcmQge1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlZWU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmYWZhZmE7XG4gIGhlaWdodDogNDBweDtcbiAgd2lkdGg6IDIwMHB4O1xuICBtYXJnaW46IDAgOHB4IDE2cHg7XG4gIHBhZGRpbmc6IDE2cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlLWluLW91dDtcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XG59XG5cbi5jYXJkLWNvbnRhaW5lciAuY2FyZDpub3QoOmxhc3QtY2hpbGQpIHtcbiAgbWFyZ2luLXJpZ2h0OiAwO1xufVxuXG4uY2FyZC5jYXJkLXNtYWxsIHtcbiAgaGVpZ2h0OiAxNnB4O1xuICB3aWR0aDogMTY4cHg7XG59XG5cbi5jYXJkLWNvbnRhaW5lciAuY2FyZDpub3QoLmhpZ2hsaWdodC1jYXJkKSB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmNhcmQtY29udGFpbmVyIC5jYXJkOm5vdCguaGlnaGxpZ2h0LWNhcmQpOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zcHgpO1xuICBib3gtc2hhZG93OiAwIDRweCAxN3B4IHJnYmEoMCwgMCwgMCwgMC4zNSk7XG59XG5cbi5jYXJkLWNvbnRhaW5lciAuY2FyZDpub3QoLmhpZ2hsaWdodC1jYXJkKTpob3ZlciAubWF0ZXJpYWwtaWNvbnMgcGF0aCB7XG4gIGZpbGw6ICM2OTY3Njc7XG59XG5cbi5jYXJkLmhpZ2hsaWdodC1jYXJkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzE5NzZkMjtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXdlaWdodDogNjAwO1xuICBib3JkZXI6IG5vbmU7XG4gIHdpZHRoOiBhdXRvO1xuICBtaW4td2lkdGg6IDMwJTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uY2FyZC5jYXJkLmhpZ2hsaWdodC1jYXJkIHNwYW4ge1xuICBtYXJnaW4tbGVmdDogNjBweDtcbn1cblxuc3ZnI3JvY2tldCB7XG4gIHdpZHRoOiA4MHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IC0xMHB4O1xuICB0b3A6IC0yNHB4O1xufVxuXG5zdmcjcm9ja2V0LXNtb2tlIHtcbiAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gOTVweCk7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxMHB4O1xuICByaWdodDogMTgwcHg7XG4gIHotaW5kZXg6IC0xMDtcbn1cblxuYSxcbmE6dmlzaXRlZCxcbmE6aG92ZXIge1xuICBjb2xvcjogIzE5NzZkMjtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xufVxuXG5hOmhvdmVyIHtcbiAgY29sb3I6ICMxMjU2OTk7XG59XG5cbi50ZXJtaW5hbCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDgwJTtcbiAgbWF4LXdpZHRoOiA2MDBweDtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBwYWRkaW5nLXRvcDogNDVweDtcbiAgbWFyZ2luLXRvcDogOHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMGYwZjEwO1xufVxuXG4udGVybWluYWw6OmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwi77+977+977+9XCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICBoZWlnaHQ6IDRweDtcbiAgYmFja2dyb3VuZDogIzNhM2EzYTtcbiAgY29sb3I6ICNjMmMzYzQ7XG4gIHdpZHRoOiAxMDAlO1xuICBmb250LXNpemU6IDJyZW07XG4gIGxpbmUtaGVpZ2h0OiAwO1xuICBwYWRkaW5nOiAxNHB4IDA7XG4gIHRleHQtaW5kZW50OiA0cHg7XG59XG5cbi50ZXJtaW5hbCBwcmUge1xuICBmb250LWZhbWlseTogU0ZNb25vLVJlZ3VsYXIsIENvbnNvbGFzLCBMaWJlcmF0aW9uIE1vbm8sIE1lbmxvLCBtb25vc3BhY2U7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgcGFkZGluZzogMCAxcmVtIDFyZW07XG4gIG1hcmdpbjogMDtcbn1cblxuLmNpcmNsZS1saW5rIHtcbiAgaGVpZ2h0OiA0MHB4O1xuICB3aWR0aDogNDBweDtcbiAgYm9yZGVyLXJhZGl1czogNDBweDtcbiAgbWFyZ2luOiA4cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZWVlZWVlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBib3gtc2hhZG93OiAwIDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjEyKSwgMCAxcHggMnB4IHJnYmEoMCwgMCwgMCwgMC4yNCk7XG4gIHRyYW5zaXRpb246IDFzIGVhc2Utb3V0O1xufVxuXG4uY2lyY2xlLWxpbms6aG92ZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTAuMjVyZW0pO1xuICBib3gtc2hhZG93OiAwcHggM3B4IDE1cHggcmdiYSgwLCAwLCAwLCAwLjIpO1xufVxuXG5mb290ZXIge1xuICBtYXJnaW4tdG9wOiA4cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGxpbmUtaGVpZ2h0OiAyMHB4O1xufVxuXG5mb290ZXIgYSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5naXRodWItc3Rhci1iYWRnZSB7XG4gIGNvbG9yOiAjMjQyOTJlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmb250LXNpemU6IDEycHg7XG4gIHBhZGRpbmc6IDNweCAxMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI3LCAzMSwgMzUsIDAuMik7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KC0xODBkZWcsICNmYWZiZmMsICNlZmYzZjYgOTAlKTtcbiAgbWFyZ2luLWxlZnQ6IDRweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgU2Vnb2UgVUksIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWYsIEFwcGxlIENvbG9yIEVtb2ppLCBTZWdvZSBVSSBFbW9qaSwgU2Vnb2UgVUkgU3ltYm9sO1xufVxuXG4uZ2l0aHViLXN0YXItYmFkZ2U6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoLTE4MGRlZywgI2YwZjNmNiwgI2U2ZWJmMSA5MCUpO1xuICBib3JkZXItY29sb3I6IHJnYmEoMjcsIDMxLCAzNSwgMC4zNSk7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IC0wLjVlbTtcbn1cblxuLmdpdGh1Yi1zdGFyLWJhZGdlIC5tYXRlcmlhbC1pY29ucyB7XG4gIGhlaWdodDogMTZweDtcbiAgd2lkdGg6IDE2cHg7XG4gIG1hcmdpbi1yaWdodDogNHB4O1xufVxuXG5zdmcjY2xvdWRzIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICBib3R0b206IC0xNjBweDtcbiAgbGVmdDogLTIzMHB4O1xuICB6LWluZGV4OiAtMTA7XG4gIHdpZHRoOiAxOTIwcHg7XG59XG5cbi8qIFJlc3BvbnNpdmUgU3R5bGVzICovXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjdweCkge1xuICAuY2FyZC1jb250YWluZXIgPiAqOm5vdCguY2lyY2xlLWxpbmspLFxuLnRlcm1pbmFsIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuXG4gIC5jYXJkOm5vdCguaGlnaGxpZ2h0LWNhcmQpIHtcbiAgICBoZWlnaHQ6IDE2cHg7XG4gICAgbWFyZ2luOiA4cHggMDtcbiAgfVxuXG4gIC5jYXJkLmhpZ2hsaWdodC1jYXJkIHNwYW4ge1xuICAgIG1hcmdpbi1sZWZ0OiA3MnB4O1xuICB9XG5cbiAgc3ZnI3JvY2tldC1zbW9rZSB7XG4gICAgcmlnaHQ6IDEyMHB4O1xuICAgIHRyYW5zZm9ybTogcm90YXRlKC01ZGVnKTtcbiAgfVxufVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNTc1cHgpIHtcbiAgc3ZnI3JvY2tldC1zbW9rZSB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIH1cbn1cbi50ZXh0Q29sb3Ige1xuICBjb2xvcjogIzFkNGM3NDtcbn1cblxuLnJpZ2h0LW5hdiAubmF2LWl0ZW0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4ucmlnaHQtbmF2IC5mLTIyIHtcbiAgZm9udC1zaXplOiAyMnB4O1xufVxuXG4ubmF2YmFyLWV4cGFuZC1sZyAubmF2YmFyLW5hdiAuZHJvcGRvd24tbWVudSB7XG4gIG1hcmdpbi10b3A6IC0yMHB4O1xuICBtYXJnaW4tcmlnaHQ6IC0yMHB4O1xufVxuXG4uaGVhZGVyIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjMzMzMDczIDAlLCAjNDQ0NDk4IDM1JSwgIzM0ODA4ZSAxMDAlKTtcbn1cblxuLm5hdi1pdGVtLmN1c3RvbS1yaWdodC1zZWN0aW9uLnNob3cuZHJvcGRvd24ge1xuICBib3JkZXItcmFkaXVzOiAyNXB4IDI1cHggMCAwO1xufVxuXG4ubmF2LWl0ZW0uY3VzdG9tLXJpZ2h0LXNlY3Rpb24uZHJvcGRvd24ge1xuICBib3JkZXItcmFkaXVzOiAyNXB4O1xufVxuXG4uY3VzdG9tLXJpZ2h0LXNlY3Rpb24ge1xuICBtaW4td2lkdGg6IDIwMHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBiYWNrZ3JvdW5kOiAjMjE2MDcwO1xuICBwYWRkaW5nLXJpZ2h0OiAyMHB4O1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIuLi8uLi8uLi8uLi9hc3NldHMvaW1hZ2VzL3ZlY3Rvci13aGl0ZS5zdmdcIik7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IDkyJTtcbn1cblxuLmN1c3RvbS1yaWdodC1zZWN0aW9uIGEge1xuICBwYWRkaW5nOiA0cHggMjVweCA0cHggMTBweDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgY29sb3I6ICM0OTQ4NDg7XG59XG5cbi5jdXN0b20tcmlnaHQtc2VjdGlvbiAuZHJvcGRvd24tbWVudS1yaWdodCBhIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjMmMyYzc7XG4gIGZvbnQtc2l6ZTogMTRweDtcbn1cblxuLmN1c3RvbS1yaWdodC1zZWN0aW9uIC5kcm9wZG93bi1tZW51LXJpZ2h0IGE6bGFzdC1jaGlsZDpob3ZlciB7XG4gIGJvcmRlci1ib3R0b206IDA7XG59XG5cbi5jdXN0b20tcmlnaHQtc2VjdGlvbiAuZHJvcGRvd24tbWVudS1yaWdodCBhOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogIzJiODhhMDtcbiAgY29sb3I6ICNmZmY7XG59XG5cbi5jdXN0b20tcmlnaHQtc2VjdGlvbiAuZHJvcGRvd24tbWVudS1yaWdodC5kcm9wZG93bi1tZW51LnNob3cge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXJnaW4tdG9wOiAzcHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICB6LWluZGV4OiAxO1xuICBib3JkZXItcmFkaXVzOiAwcHggMCA1cHggNXB4O1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2Q1ZDRkNDtcbiAgYm94LXNoYWRvdzogMCA2cHggOHB4IDAgcmdiYSgwLCAwLCAwLCAwLjIpO1xuICBwYWRkaW5nOiAwcHg7XG4gIGxlZnQ6IDA7XG4gIGJvcmRlcjogMDtcbiAgei1pbmRleDogMTAwMCAhaW1wb3J0YW50O1xufVxuXG4uY3VzdG9tLXJpZ2h0LXNlY3Rpb24gLmRyb3Bkb3duLXRvZ2dsZTo6YWZ0ZXIge1xuICBkaXNwbGF5OiBub25lO1xufSIsIkBjaGFyc2V0IFwiVVRGLThcIjtcclxuOmhvc3Qge1xyXG4gIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFwiU2Vnb2UgVUlcIiwgUm9ib3RvLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmLCBcIkFwcGxlIENvbG9yIEVtb2ppXCIsIFwiU2Vnb2UgVUkgRW1vamlcIiwgXCJTZWdvZSBVSSBTeW1ib2xcIjtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgY29sb3I6ICMzMzM7XHJcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcclxuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xyXG59XHJcblxyXG5oMSxcclxuaDIsXHJcbmgzLFxyXG5oNCxcclxuaDUsXHJcbmg2IHtcclxuICBtYXJnaW46IDhweCAwO1xyXG59XHJcblxyXG5wIHtcclxuICBtYXJnaW46IDA7XHJcbn1cclxuXHJcbi5zcGFjZXIge1xyXG4gIGZsZXg6IDE7XHJcbn1cclxuXHJcbi5yb3cge1xyXG4gIG1hcmdpbi1yaWdodDogMTVweDtcclxufVxyXG5cclxuLmNyZWF0ZUltZyB7XHJcbiAgbWFyZ2luLWxlZnQ6IDE1cHg7XHJcbn1cclxuXHJcbi5tYW5hZ2VJbWcge1xyXG4gIG1hcmdpbi1yaWdodDogMzBweDtcclxufVxyXG5cclxuLmNyZWF0ZUJ0biB7XHJcbiAgYmFja2dyb3VuZDogIzFkNDhhOWY1O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuLmZvcm0tZ3JvdXAge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxufVxyXG5cclxubGFiZWwge1xyXG4gIGZvbnQtc2l6ZTogMTZweDtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgd2lkdGg6IDE1MHB4O1xyXG4gIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XHJcbiAgY29sb3I6IGJsYWNrO1xyXG4gIGJhY2tncm91bmQ6IGJvcmRlci1ib3g7XHJcbn1cclxuXHJcbi5jb250ZW50IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIG1hcmdpbjogODJweCBhdXRvIDMycHg7XHJcbiAgcGFkZGluZzogMCAxNnB4O1xyXG4gIG1heC13aWR0aDogOTYwcHg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG5zdmcubWF0ZXJpYWwtaWNvbnMge1xyXG4gIGhlaWdodDogMjRweDtcclxuICB3aWR0aDogYXV0bztcclxufVxyXG5cclxuc3ZnLm1hdGVyaWFsLWljb25zOm5vdCg6bGFzdC1jaGlsZCkge1xyXG4gIG1hcmdpbi1yaWdodDogOHB4O1xyXG59XHJcblxyXG4uY2FyZCBzdmcubWF0ZXJpYWwtaWNvbnMgcGF0aCB7XHJcbiAgZmlsbDogIzg4ODtcclxufVxyXG5cclxuLmNhcmQtY29udGFpbmVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtd3JhcDogd3JhcDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBtYXJnaW4tdG9wOiAxNnB4O1xyXG59XHJcblxyXG4uY2FyZCB7XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNlZWU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZmFmYTtcclxuICBoZWlnaHQ6IDQwcHg7XHJcbiAgd2lkdGg6IDIwMHB4O1xyXG4gIG1hcmdpbjogMCA4cHggMTZweDtcclxuICBwYWRkaW5nOiAxNnB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2UtaW4tb3V0O1xyXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xyXG59XHJcblxyXG4uY2FyZC1jb250YWluZXIgLmNhcmQ6bm90KDpsYXN0LWNoaWxkKSB7XHJcbiAgbWFyZ2luLXJpZ2h0OiAwO1xyXG59XHJcblxyXG4uY2FyZC5jYXJkLXNtYWxsIHtcclxuICBoZWlnaHQ6IDE2cHg7XHJcbiAgd2lkdGg6IDE2OHB4O1xyXG59XHJcblxyXG4uY2FyZC1jb250YWluZXIgLmNhcmQ6bm90KC5oaWdobGlnaHQtY2FyZCkge1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLmNhcmQtY29udGFpbmVyIC5jYXJkOm5vdCguaGlnaGxpZ2h0LWNhcmQpOmhvdmVyIHtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTNweCk7XHJcbiAgYm94LXNoYWRvdzogMCA0cHggMTdweCByZ2JhKDAsIDAsIDAsIDAuMzUpO1xyXG59XHJcblxyXG4uY2FyZC1jb250YWluZXIgLmNhcmQ6bm90KC5oaWdobGlnaHQtY2FyZCk6aG92ZXIgLm1hdGVyaWFsLWljb25zIHBhdGgge1xyXG4gIGZpbGw6ICM2OTY3Njc7XHJcbn1cclxuXHJcbi5jYXJkLmhpZ2hsaWdodC1jYXJkIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTk3NmQyO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICB3aWR0aDogYXV0bztcclxuICBtaW4td2lkdGg6IDMwJTtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuXHJcbi5jYXJkLmNhcmQuaGlnaGxpZ2h0LWNhcmQgc3BhbiB7XHJcbiAgbWFyZ2luLWxlZnQ6IDYwcHg7XHJcbn1cclxuXHJcbnN2ZyNyb2NrZXQge1xyXG4gIHdpZHRoOiA4MHB4O1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBsZWZ0OiAtMTBweDtcclxuICB0b3A6IC0yNHB4O1xyXG59XHJcblxyXG5zdmcjcm9ja2V0LXNtb2tlIHtcclxuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSA5NXB4KTtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAxMHB4O1xyXG4gIHJpZ2h0OiAxODBweDtcclxuICB6LWluZGV4OiAtMTA7XHJcbn1cclxuXHJcbmEsXHJcbmE6dmlzaXRlZCxcclxuYTpob3ZlciB7XHJcbiAgY29sb3I6ICMxOTc2ZDI7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG59XHJcblxyXG5hOmhvdmVyIHtcclxuICBjb2xvcjogIzEyNTY5OTtcclxufVxyXG5cclxuLnRlcm1pbmFsIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgd2lkdGg6IDgwJTtcclxuICBtYXgtd2lkdGg6IDYwMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICBwYWRkaW5nLXRvcDogNDVweDtcclxuICBtYXJnaW4tdG9wOiA4cHg7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMGYwZjEwO1xyXG59XHJcblxyXG4udGVybWluYWw6OmJlZm9yZSB7XHJcbiAgY29udGVudDogXCLvv73vv73vv71cIjtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgaGVpZ2h0OiA0cHg7XHJcbiAgYmFja2dyb3VuZDogIzNhM2EzYTtcclxuICBjb2xvcjogI2MyYzNjNDtcclxuICB3aWR0aDogMTAwJTtcclxuICBmb250LXNpemU6IDJyZW07XHJcbiAgbGluZS1oZWlnaHQ6IDA7XHJcbiAgcGFkZGluZzogMTRweCAwO1xyXG4gIHRleHQtaW5kZW50OiA0cHg7XHJcbn1cclxuXHJcbi50ZXJtaW5hbCBwcmUge1xyXG4gIGZvbnQtZmFtaWx5OiBTRk1vbm8tUmVndWxhciwgQ29uc29sYXMsIExpYmVyYXRpb24gTW9ubywgTWVubG8sIG1vbm9zcGFjZTtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgcGFkZGluZzogMCAxcmVtIDFyZW07XHJcbiAgbWFyZ2luOiAwO1xyXG59XHJcblxyXG4uY2lyY2xlLWxpbmsge1xyXG4gIGhlaWdodDogNDBweDtcclxuICB3aWR0aDogNDBweDtcclxuICBib3JkZXItcmFkaXVzOiA0MHB4O1xyXG4gIG1hcmdpbjogOHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNlZWVlZWU7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBib3gtc2hhZG93OiAwIDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjEyKSwgMCAxcHggMnB4IHJnYmEoMCwgMCwgMCwgMC4yNCk7XHJcbiAgdHJhbnNpdGlvbjogMXMgZWFzZS1vdXQ7XHJcbn1cclxuXHJcbi5jaXJjbGUtbGluazpob3ZlciB7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0wLjI1cmVtKTtcclxuICBib3gtc2hhZG93OiAwcHggM3B4IDE1cHggcmdiYSgwLCAwLCAwLCAwLjIpO1xyXG59XHJcblxyXG5mb290ZXIge1xyXG4gIG1hcmdpbi10b3A6IDhweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XHJcbn1cclxuXHJcbmZvb3RlciBhIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5naXRodWItc3Rhci1iYWRnZSB7XHJcbiAgY29sb3I6ICMyNDI5MmU7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICBwYWRkaW5nOiAzcHggMTBweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI3LCAzMSwgMzUsIDAuMik7XHJcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCgtMTgwZGVnLCAjZmFmYmZjLCAjZWZmM2Y2IDkwJSk7XHJcbiAgbWFyZ2luLWxlZnQ6IDRweDtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFNlZ29lIFVJLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmLCBBcHBsZSBDb2xvciBFbW9qaSwgU2Vnb2UgVUkgRW1vamksIFNlZ29lIFVJIFN5bWJvbDtcclxufVxyXG5cclxuLmdpdGh1Yi1zdGFyLWJhZGdlOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoLTE4MGRlZywgI2YwZjNmNiwgI2U2ZWJmMSA5MCUpO1xyXG4gIGJvcmRlci1jb2xvcjogcmdiYSgyNywgMzEsIDM1LCAwLjM1KTtcclxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtMC41ZW07XHJcbn1cclxuXHJcbi5naXRodWItc3Rhci1iYWRnZSAubWF0ZXJpYWwtaWNvbnMge1xyXG4gIGhlaWdodDogMTZweDtcclxuICB3aWR0aDogMTZweDtcclxuICBtYXJnaW4tcmlnaHQ6IDRweDtcclxufVxyXG5cclxuc3ZnI2Nsb3VkcyB7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIGJvdHRvbTogLTE2MHB4O1xyXG4gIGxlZnQ6IC0yMzBweDtcclxuICB6LWluZGV4OiAtMTA7XHJcbiAgd2lkdGg6IDE5MjBweDtcclxufVxyXG5cclxuLyogUmVzcG9uc2l2ZSBTdHlsZXMgKi9cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY3cHgpIHtcclxuICAuY2FyZC1jb250YWluZXIgPiAqOm5vdCguY2lyY2xlLWxpbmspLFxyXG4udGVybWluYWwge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgfVxyXG5cclxuICAuY2FyZDpub3QoLmhpZ2hsaWdodC1jYXJkKSB7XHJcbiAgICBoZWlnaHQ6IDE2cHg7XHJcbiAgICBtYXJnaW46IDhweCAwO1xyXG4gIH1cclxuXHJcbiAgLmNhcmQuaGlnaGxpZ2h0LWNhcmQgc3BhbiB7XHJcbiAgICBtYXJnaW4tbGVmdDogNzJweDtcclxuICB9XHJcblxyXG4gIHN2ZyNyb2NrZXQtc21va2Uge1xyXG4gICAgcmlnaHQ6IDEyMHB4O1xyXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTVkZWcpO1xyXG4gIH1cclxufVxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA1NzVweCkge1xyXG4gIHN2ZyNyb2NrZXQtc21va2Uge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcclxuICB9XHJcbn1cclxuLnRleHRDb2xvciB7XHJcbiAgY29sb3I6ICMxZDRjNzQ7XHJcbn1cclxuXHJcbi5yaWdodC1uYXYgLm5hdi1pdGVtIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuLnJpZ2h0LW5hdiAuZi0yMiB7XHJcbiAgZm9udC1zaXplOiAyMnB4O1xyXG59XHJcbi5uYXZiYXItZXhwYW5kLWxnIC5uYXZiYXItbmF2IC5kcm9wZG93bi1tZW51IHtcclxuICBtYXJnaW4tdG9wOiAtMjBweDtcclxuICBtYXJnaW4tcmlnaHQ6IC0yMHB4O1xyXG59XHJcblxyXG4uaGVhZGVyIHtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICMzMzMwNzMgMCUsICM0NDQ0OTggMzUlLCAjMzQ4MDhlIDEwMCUpO1xyXG59XHJcblxyXG4ubmF2LWl0ZW0uY3VzdG9tLXJpZ2h0LXNlY3Rpb24uc2hvdy5kcm9wZG93biB7XHJcbiAgYm9yZGVyLXJhZGl1czogMjVweCAyNXB4IDAgMDtcclxufVxyXG5cclxuLm5hdi1pdGVtLmN1c3RvbS1yaWdodC1zZWN0aW9uLmRyb3Bkb3duIHtcclxuICBib3JkZXItcmFkaXVzOiAyNXB4O1xyXG59XHJcblxyXG4uY3VzdG9tLXJpZ2h0LXNlY3Rpb24ge1xyXG4gIG1pbi13aWR0aDogMjAwcHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBiYWNrZ3JvdW5kOiAjMjE2MDcwO1xyXG4gIHBhZGRpbmctcmlnaHQ6IDIwcHg7XHJcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiLi4vLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy92ZWN0b3Itd2hpdGUuc3ZnXCIpO1xyXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogOTIlO1xyXG59XHJcbi5jdXN0b20tcmlnaHQtc2VjdGlvbiBhIHtcclxuICBwYWRkaW5nOiA0cHggMjVweCA0cHggMTBweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgY29sb3I6ICM0OTQ4NDg7XHJcbn1cclxuLmN1c3RvbS1yaWdodC1zZWN0aW9uIC5kcm9wZG93bi1tZW51LXJpZ2h0IGEge1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjYzJjMmM3O1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxufVxyXG4uY3VzdG9tLXJpZ2h0LXNlY3Rpb24gLmRyb3Bkb3duLW1lbnUtcmlnaHQgYTpsYXN0LWNoaWxkOmhvdmVyIHtcclxuICBib3JkZXItYm90dG9tOiAwO1xyXG59XHJcbi5jdXN0b20tcmlnaHQtc2VjdGlvbiAuZHJvcGRvd24tbWVudS1yaWdodCBhOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kOiAjMmI4OGEwO1xyXG4gIGNvbG9yOiAjZmZmO1xyXG59XHJcbi5jdXN0b20tcmlnaHQtc2VjdGlvbiAuZHJvcGRvd24tbWVudS1yaWdodC5kcm9wZG93bi1tZW51LnNob3cge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB3aWR0aDogMTAwJTtcclxuICBtYXJnaW4tdG9wOiAzcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgei1pbmRleDogMTtcclxuICBib3JkZXItcmFkaXVzOiAwcHggMCA1cHggNXB4O1xyXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZDVkNGQ0O1xyXG4gIGJveC1zaGFkb3c6IDAgNnB4IDhweCAwIHJnYmEoMCwgMCwgMCwgMC4yKTtcclxuICBwYWRkaW5nOiAwcHg7XHJcbiAgbGVmdDogMDtcclxuICBib3JkZXI6IDA7XHJcbiAgei1pbmRleDogMTAwMCAhaW1wb3J0YW50O1xyXG59XHJcbi5jdXN0b20tcmlnaHQtc2VjdGlvbiAuZHJvcGRvd24tdG9nZ2xlOjphZnRlciB7XHJcbiAgZGlzcGxheTogbm9uZTtcclxufSJdfQ== */";

    /***/
  }),
  /***/"./src/app/layout/common/header/header.component.ts": (
  /*!**********************************************************!*\
    !*** ./src/app/layout/common/header/header.component.ts ***!
    \**********************************************************/
  /*! exports provided: HeaderComponent */
  /***/
  function _src_app_layout_common_header_headerComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "HeaderComponent", function () {
      return HeaderComponent;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */"./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */"./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */
    var _services_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_services/authentication.service */"./src/app/_services/authentication.service.ts");
    /* harmony import */
    var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */"./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */
    var src_app_services_project_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/project.service */"./src/app/_services/project.service.ts");
    /* harmony import */
    var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */"./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
    /* harmony import */
    var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */"./node_modules/@angular/forms/fesm2015/forms.js");
    var HeaderComponent = /*#__PURE__*/function () {
      function HeaderComponent(authenticationService, router, projectService, modalService, formBuilder, route, alertConfig) {
        _classCallCheck(this, HeaderComponent);
        this.authenticationService = authenticationService;
        this.router = router;
        this.projectService = projectService;
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.route = route;
        this.alertConfig = alertConfig;
        this.newProjectObject = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.createProjectForm = this.formBuilder.group({
          userId: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].email]],
          projectName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].maxLength(25), _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].minLength(2), _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].pattern('^[a-z0-9_-]+$')])]
        });
        this.submitted = false;
        this.projectName = "";
        this.userId = "";
        this.userOrgRole = "";
        this.projectsList = [];
        this.userName = "";
        this.userRole = "";
        this.isORGAdminFlag = false;
        this.projectOwnerFlag = false;
        this.isProjectListNull = false;
        this.closeResult = "";
        this.userMsg = "";
        this.enableCreateProject = true;
        this.isRootUser = false;
        this.alertMessage = "";
      }
      return _createClass(HeaderComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.userName = localStorage.getItem('userName') + "";
          console.log("User Name:", this.userName);
          this.userId = localStorage.getItem("userId") + "";
          this.createProjectForm.controls['userId'].setValue(this.userId);
          this.userOrgRole = localStorage.getItem("orgRole") + "";
          switch (this.userOrgRole) {
            case "ROOT":
              this.isRootUser = true;
              this.newProjectObject.emit();
              break;
            case "ORG_ADMIN":
              this.isORGAdminFlag = true;
              this.listProjects(this.userId);
              break;
            default:
              this.listProjects(this.userId);
              break;
          }
        }
      }, {
        key: "listProjects",
        value: function listProjects(userId) {
          var _this12 = this;
          this.projectService.listProjects(userId).subscribe(function (data) {
            _this12.projectsList = data;
            if (_this12.projectsList.length > 0) {
              _this12.isProjectListNull = false;
              if (_this12.currentProjectObj == null || _this12.currentProjectObj.projectName == null) {
                if (_this12.route.snapshot.queryParams['project'] == null || _this12.route.snapshot.queryParams['project'] == undefined) {
                  _this12.getProjectObject(_this12.projectsList[0].projectName);
                } else {
                  _this12.getProjectObject(_this12.route.snapshot.queryParams['project']);
                }
              } else {
                _this12.getProjectObject(_this12.currentProjectObj.projectName);
              }
            } else {
              _this12.isProjectListNull = true;
              _this12.getProjectObject("");
            }
            //console.log("Headers projects List :", this.projectsList);
          }, function (err) {
            //console.log(err);
            console.log(err.error.message);
          });
        }
      }, {
        key: "getProjectObject",
        value: function getProjectObject(event) {
          var projectName = "";
          if (event.target == null || event.target == undefined) {
            projectName = event;
          } else {
            projectName = event.target.value;
          }
          //console.log("Header projectName:",projectName);
          this.projectName = projectName;
          if (projectName == "") {
            this.newProjectObject.emit();
          } else {
            var _iterator5 = _createForOfIteratorHelper(this.projectsList),
              _step5;
            try {
              for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                var project = _step5.value;
                if (projectName == project['projectName']) {
                  if (project['projectRoleName'] == "PROJECT_OWNER") {
                    this.projectOwnerFlag = true;
                  } else {
                    this.projectOwnerFlag = false;
                  }
                  console.log("Project Object in Child: ", project);
                  this.newProjectObject.emit(project);
                }
              }
            } catch (err) {
              _iterator5.e(err);
            } finally {
              _iterator5.f();
            }
          }
        }
      }, {
        key: "open",
        value: function open(createProject) {
          var _this13 = this;
          this.modalService.open(createProject, {
            centered: true
          }).result.then(function (result) {
            _this13.closeResult = "Closed with: ".concat(result);
          }, function (reason) {
            _this13.closeResult = "Dismissed ".concat(_this13.getDismissReason(reason));
          });
        }
      }, {
        key: "getDismissReason",
        value: function getDismissReason(reason) {
          this.createProjectForm.reset();
          if (reason === _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["ModalDismissReasons"].ESC) {
            return 'by pressing ESC';
          } else if (reason === _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["ModalDismissReasons"].BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
          } else {
            return "with: ".concat(reason);
          }
        }
      }, {
        key: "projectNameClick",
        value: function projectNameClick() {
          if (this.createProjectForm.controls['projectName'].value != '') {
            this.enableCreateProject = false;
          }
        }
      }, {
        key: "f",
        get: function get() {
          return this.createProjectForm.controls;
        }
      }, {
        key: "onSubmit",
        value: function onSubmit() {
          var _this14 = this;
          this.submitted = true;
          this.createProjectForm.controls['userId'].setValue(this.userId);
          if (this.createProjectForm.invalid) {
            console.log(this.submitted, this.f.projectName.errors);
            console.log("Invalid form", this.createProjectForm.value);
            return;
          }
          this.projectService.createProject(this.createProjectForm.value).subscribe(function (data) {
            _this14.modalService.dismissAll();
            _this14.enableCreateProject = true;
            _this14.alertConfigurations("success");
            _this14.alertMessage = data['message'];
            _this14.listProjects(_this14.userId);
          }, function (err) {
            //console.log(err);
            _this14.submitted = true;
            _this14.enableCreateProject = true;
            _this14.modalService.dismissAll();
            _this14.createProjectForm.reset();
            _this14.alertConfigurations("danger");
            _this14.alertMessage = err.error.message;
          });
        }
      }, {
        key: "alertConfigurations",
        value: function alertConfigurations(type) {
          this.alertConfig.type = type;
          //this.alertConfig.dismissible = true;
        }
      }, {
        key: "logOut",
        value: function logOut() {
          this.authenticationService.logout();
          this.router.navigateByUrl("/auth/login");
        }
      }]);
    }();
    HeaderComponent.ctorParameters = function () {
      return [{
        type: _services_authentication_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]
      }, {
        type: src_app_services_project_service__WEBPACK_IMPORTED_MODULE_4__["ProjectService"]
      }, {
        type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModal"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]
      }, {
        type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbAlertConfig"]
      }];
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()], HeaderComponent.prototype, "currentProjectObj", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()], HeaderComponent.prototype, "newProjectObject", void 0);
    HeaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-header',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./header.component.html */"./node_modules/raw-loader/dist/cjs.js!./src/app/layout/common/header/header.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./header.component.scss */"./src/app/layout/common/header/header.component.scss"))["default"]]
    })], HeaderComponent);

    /***/
  }),
  /***/"./src/app/layout/common/leftsidenav/leftsidenav.component.scss": (
  /*!**********************************************************************!*\
    !*** ./src/app/layout/common/leftsidenav/leftsidenav.component.scss ***!
    \**********************************************************************/
  /*! exports provided: default */
  /***/
  function _src_app_layout_common_leftsidenav_leftsidenavComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "/*Sidenav bar property*/\n.sidenav {\n  height: 100%;\n  position: fixed;\n  /* background-color : #48709d; */\n  /* background: linear-gradient(90deg, rgb(51 48 115) 0%, rgb(68 68 152) 35%, rgb(52 128 142) 100%); */\n  background: url('verticalMenu.svg') no-repeat;\n  padding: 2rem;\n  left: 0;\n}\n.sidenav .menuIcon {\n  padding: 0.5rem;\n  margin: 0.5rem;\n}\n.sidenav-centered {\n  float: none;\n  position: absolute;\n  top: 10%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n.menuIcon:hover {\n  border: 1px solid white;\n}\n.menuIcon a {\n  opacity: 0.5;\n}\n.menuIcon.active a {\n  opacity: 1;\n}\n.menuIcon.active {\n  border: 1px solid #fff;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2NvbW1vbi9sZWZ0c2lkZW5hdi9DOlxcS1xcS05hdGl2ZVxcRmlzc2lvblxcVUlfRmlzc2lvbi9zcmNcXGFwcFxcbGF5b3V0XFxjb21tb25cXGxlZnRzaWRlbmF2XFxsZWZ0c2lkZW5hdi5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvbGF5b3V0L2NvbW1vbi9sZWZ0c2lkZW5hdi9sZWZ0c2lkZW5hdi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSx1QkFBQTtBQUVBO0VBQ0ksWUFBQTtFQUNBLGVBQUE7RUFDQSxnQ0FBQTtFQUNBLHFHQUFBO0VBRUEsNkNBQUE7RUFDQSxhQUFBO0VBQ0EsT0FBQTtBQ0ZKO0FES0U7RUFDRSxlQUFBO0VBQ0EsY0FBQTtBQ0ZKO0FES0U7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLGdDQUFBO0FDRko7QURLRTtFQUNFLHVCQUFBO0FDRko7QURJRTtFQUNFLFlBQUE7QUNESjtBREdFO0VBQ0UsVUFBQTtBQ0FKO0FERUU7RUFDRSxzQkFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0L2NvbW1vbi9sZWZ0c2lkZW5hdi9sZWZ0c2lkZW5hdi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vKlNpZGVuYXYgYmFyIHByb3BlcnR5Ki9cclxuXHJcbi5zaWRlbmF2e1xyXG4gICAgaGVpZ2h0IDogMTAwJTtcclxuICAgIHBvc2l0aW9uIDogZml4ZWQ7XHJcbiAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yIDogIzQ4NzA5ZDsgKi9cclxuICAgIC8qIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgcmdiKDUxIDQ4IDExNSkgMCUsIHJnYig2OCA2OCAxNTIpIDM1JSwgcmdiKDUyIDEyOCAxNDIpIDEwMCUpOyAqL1xyXG4gICAgLy8gYmFja2dyb3VuZDogdXJsKCcuLi9hc3NldHMvdmVydGljYWxNZW51LnN2ZycpIG5vLXJlcGVhdDsgXHJcbiAgICBiYWNrZ3JvdW5kOiB1cmwoJy4uLy4uLy4uLy4uL2Fzc2V0cy92ZXJ0aWNhbE1lbnUuc3ZnJykgbm8tcmVwZWF0O1xyXG4gICAgcGFkZGluZyA6IDJyZW07XHJcbiAgICBsZWZ0OiAwO1xyXG4gIH1cclxuICBcclxuICAuc2lkZW5hdiAubWVudUljb257XHJcbiAgICBwYWRkaW5nIDogMC41cmVtO1xyXG4gICAgbWFyZ2luIDogMC41cmVtO1xyXG4gIH1cclxuICBcclxuICAuc2lkZW5hdi1jZW50ZXJlZCB7XHJcbiAgICBmbG9hdDogbm9uZTtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMTAlO1xyXG4gICAgbGVmdDogNTAlO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XHJcbiAgfVxyXG4gIFxyXG4gIC5tZW51SWNvbjpob3ZlciB7XHJcbiAgICBib3JkZXIgOiAxcHggc29saWQgd2hpdGU7XHJcbiAgfVxyXG4gIC5tZW51SWNvbiBhe1xyXG4gICAgb3BhY2l0eTogLjU7XHJcbiAgfVxyXG4gIC5tZW51SWNvbi5hY3RpdmUgYXtcclxuICAgIG9wYWNpdHk6IDE7XHJcbiAgfVxyXG4gIC5tZW51SWNvbi5hY3RpdmV7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZmZmO1xyXG4gIH0iLCIvKlNpZGVuYXYgYmFyIHByb3BlcnR5Ki9cbi5zaWRlbmF2IHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIC8qIGJhY2tncm91bmQtY29sb3IgOiAjNDg3MDlkOyAqL1xuICAvKiBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsIHJnYig1MSA0OCAxMTUpIDAlLCByZ2IoNjggNjggMTUyKSAzNSUsIHJnYig1MiAxMjggMTQyKSAxMDAlKTsgKi9cbiAgYmFja2dyb3VuZDogdXJsKFwiLi4vLi4vLi4vLi4vYXNzZXRzL3ZlcnRpY2FsTWVudS5zdmdcIikgbm8tcmVwZWF0O1xuICBwYWRkaW5nOiAycmVtO1xuICBsZWZ0OiAwO1xufVxuXG4uc2lkZW5hdiAubWVudUljb24ge1xuICBwYWRkaW5nOiAwLjVyZW07XG4gIG1hcmdpbjogMC41cmVtO1xufVxuXG4uc2lkZW5hdi1jZW50ZXJlZCB7XG4gIGZsb2F0OiBub25lO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMTAlO1xuICBsZWZ0OiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xufVxuXG4ubWVudUljb246aG92ZXIge1xuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcbn1cblxuLm1lbnVJY29uIGEge1xuICBvcGFjaXR5OiAwLjU7XG59XG5cbi5tZW51SWNvbi5hY3RpdmUgYSB7XG4gIG9wYWNpdHk6IDE7XG59XG5cbi5tZW51SWNvbi5hY3RpdmUge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZmZmO1xufSJdfQ== */";

    /***/
  }),
  /***/"./src/app/layout/common/leftsidenav/leftsidenav.component.ts": (
  /*!********************************************************************!*\
    !*** ./src/app/layout/common/leftsidenav/leftsidenav.component.ts ***!
    \********************************************************************/
  /*! exports provided: LeftsidenavComponent */
  /***/
  function _src_app_layout_common_leftsidenav_leftsidenavComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "LeftsidenavComponent", function () {
      return LeftsidenavComponent;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */"./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */"./node_modules/@angular/core/fesm2015/core.js");
    var LeftsidenavComponent = /*#__PURE__*/function () {
      function LeftsidenavComponent() {
        _classCallCheck(this, LeftsidenavComponent);
      }
      return _createClass(LeftsidenavComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }]);
    }();
    LeftsidenavComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-leftsidenav',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./leftsidenav.component.html */"./node_modules/raw-loader/dist/cjs.js!./src/app/layout/common/leftsidenav/leftsidenav.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./leftsidenav.component.scss */"./src/app/layout/common/leftsidenav/leftsidenav.component.scss"))["default"]]
    })], LeftsidenavComponent);

    /***/
  }),
  /***/"./src/app/layout/common/project-header/project-header.component.scss": (
  /*!****************************************************************************!*\
    !*** ./src/app/layout/common/project-header/project-header.component.scss ***!
    \****************************************************************************/
  /*! exports provided: default */
  /***/
  function _src_app_layout_common_projectHeader_projectHeaderComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9jb21tb24vcHJvamVjdC1oZWFkZXIvcHJvamVjdC1oZWFkZXIuY29tcG9uZW50LnNjc3MifQ== */";

    /***/
  }),
  /***/"./src/app/layout/common/project-header/project-header.component.ts": (
  /*!**************************************************************************!*\
    !*** ./src/app/layout/common/project-header/project-header.component.ts ***!
    \**************************************************************************/
  /*! exports provided: ProjectHeaderComponent */
  /***/
  function _src_app_layout_common_projectHeader_projectHeaderComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "ProjectHeaderComponent", function () {
      return ProjectHeaderComponent;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */"./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */"./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */
    var _services_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_services/authentication.service */"./src/app/_services/authentication.service.ts");
    /* harmony import */
    var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */"./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */
    var src_app_services_project_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/project.service */"./src/app/_services/project.service.ts");
    /* harmony import */
    var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */"./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
    /* harmony import */
    var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */"./node_modules/@angular/forms/fesm2015/forms.js");
    var ProjectHeaderComponent = /*#__PURE__*/function () {
      function ProjectHeaderComponent(authenticationService, router, projectService, modalService, formBuilder) {
        _classCallCheck(this, ProjectHeaderComponent);
        this.authenticationService = authenticationService;
        this.router = router;
        this.projectService = projectService;
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.newProjectObject = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.createProjectForm = this.formBuilder.group({
          userId: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].email]],
          projectName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required]
        });
        this.userId = "";
        this.userOrgRole = "";
        this.projectsList = [];
        this.userName = "";
        this.userRole = "";
        this.isORGAdminFlag = false;
        this.projectOwnerFlag = false;
        this.isProjectListNull = false;
        this.closeResult = "";
        this.userMsg = "";
        this.enableCreateProject = true;
        this.isRootUser = false;
      }
      return _createClass(ProjectHeaderComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.userName = localStorage.getItem('userName') + "";
          console.log("User Name:", this.userName);
          this.userId = localStorage.getItem("userId") + "";
          this.userOrgRole = localStorage.getItem("orgRole") + "";
          switch (this.userOrgRole) {
            case "ROOT":
              this.isRootUser = true;
              this.getProjectObject("");
              break;
            case "ORG_ADMIN":
              this.isORGAdminFlag = true;
              this.listProjects(this.userId);
              break;
            default:
              this.listProjects(this.userId);
              break;
          }
          // if(this.userOrgRole == "ROOT"){
          //   this.isRootUser = true;
          // }
          // else if(this.userOrgRole == "ORG_ADMIN") {
          //   this.isORGAdminFlag = true;
          // }
          // this.listProjects(this.userId);  
        }
      }, {
        key: "listProjects",
        value: function listProjects(userId) {
          var _this15 = this;
          this.projectService.listProjects(userId).subscribe(function (data) {
            _this15.projectsList = data;
            if (_this15.projectsList.length > 0) {
              _this15.isProjectListNull = false;
              _this15.getProjectObject(_this15.projectsList[0].projectName);
            } else {
              _this15.isProjectListNull = true;
              _this15.getProjectObject("");
            }
            //console.log("Headers projects List :", this.projectsList);
          }, function (err) {
            console.log(err);
            console.log(err.error.message);
          });
        }
      }, {
        key: "getProjectObject",
        value: function getProjectObject(event) {
          var projectName = "";
          if (event.target == null || event.target == undefined) {
            projectName = event;
          } else {
            projectName = event.target.value;
          }
          console.log("Header projectName:", projectName);
          if (projectName == "") {
            this.newProjectObject.emit();
          } else {
            var _iterator6 = _createForOfIteratorHelper(this.projectsList),
              _step6;
            try {
              for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                var project = _step6.value;
                if (projectName == project['projectName']) {
                  if (project['projectRoleName'] == "PROJECT_OWNER") {
                    this.projectOwnerFlag = true;
                  } else {
                    this.projectOwnerFlag = false;
                  }
                  console.log("Project Object in Child: ", project);
                  this.newProjectObject.emit(project);
                }
              }
            } catch (err) {
              _iterator6.e(err);
            } finally {
              _iterator6.f();
            }
          }
        }
      }, {
        key: "open",
        value: function open(createProject) {
          var _this16 = this;
          this.modalService.open(createProject, {
            centered: true
          }).result.then(function (result) {
            _this16.closeResult = "Closed with: ".concat(result);
          }, function (reason) {
            _this16.closeResult = "Dismissed ".concat(_this16.getDismissReason(reason));
          });
        }
      }, {
        key: "getDismissReason",
        value: function getDismissReason(reason) {
          this.createProjectForm.reset();
          if (reason === _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["ModalDismissReasons"].ESC) {
            return 'by pressing ESC';
          } else if (reason === _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["ModalDismissReasons"].BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
          } else {
            return "with: ".concat(reason);
          }
        }
      }, {
        key: "projectNameClick",
        value: function projectNameClick() {
          if (this.createProjectForm.controls['projectName'].value != '') {
            this.enableCreateProject = false;
          }
        }
      }, {
        key: "f",
        get: function get() {
          return this.createProjectForm.controls;
        }
      }, {
        key: "onSubmit",
        value: function onSubmit() {
          var _this17 = this;
          this.createProjectForm.controls['userId'].setValue(this.userId);
          if (this.createProjectForm.invalid) {
            console.log("Create project :", this.createProjectForm.value);
            return;
          }
          this.projectService.createProject(this.createProjectForm.value).subscribe(function (data) {
            _this17.modalService.dismissAll();
            _this17.enableCreateProject = true;
            _this17.listProjects(_this17.userId);
          }, function (err) {
            //console.log(err);
            _this17.enableCreateProject = true;
            _this17.userMsg = err.error.message;
            console.log(_this17.userMsg);
          });
        }
      }, {
        key: "logOut",
        value: function logOut() {
          this.authenticationService.logout();
          this.router.navigateByUrl("/auth/login");
        }
      }]);
    }();
    ProjectHeaderComponent.ctorParameters = function () {
      return [{
        type: _services_authentication_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]
      }, {
        type: src_app_services_project_service__WEBPACK_IMPORTED_MODULE_4__["ProjectService"]
      }, {
        type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModal"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"]
      }];
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()], ProjectHeaderComponent.prototype, "newProjectObject", void 0);
    ProjectHeaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-project-header',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./project-header.component.html */"./node_modules/raw-loader/dist/cjs.js!./src/app/layout/common/project-header/project-header.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./project-header.component.scss */"./src/app/layout/common/project-header/project-header.component.scss"))["default"]]
    })], ProjectHeaderComponent);

    /***/
  }),
  /***/"./src/app/layout/layout.component.scss": (
  /*!**********************************************!*\
    !*** ./src/app/layout/layout.component.scss ***!
    \**********************************************/
  /*! exports provided: default */
  /***/
  function _src_app_layout_layoutComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = ".main-nav {\n  position: relative;\n  z-index: 999;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L0M6XFxLXFxLTmF0aXZlXFxGaXNzaW9uXFxVSV9GaXNzaW9uL3NyY1xcYXBwXFxsYXlvdXRcXGxheW91dC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvbGF5b3V0L2xheW91dC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFBO0VBQ0EsWUFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0L2xheW91dC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYWluLW5hdntcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIHotaW5kZXg6IDk5OTtcclxufVxyXG4uaW5kZXgtMTAwMHtcclxuICAgIC8vIHotaW5kZXg6IDEwMDA7ICBcclxufVxyXG5cclxuIiwiLm1haW4tbmF2IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB6LWluZGV4OiA5OTk7XG59Il19 */";

    /***/
  }),
  /***/"./src/app/layout/layout.component.ts": (
  /*!********************************************!*\
    !*** ./src/app/layout/layout.component.ts ***!
    \********************************************/
  /*! exports provided: LayoutComponent */
  /***/
  function _src_app_layout_layoutComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "LayoutComponent", function () {
      return LayoutComponent;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */"./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */"./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */
    var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */"./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */
    var _services_spinner_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_services/spinner.service */"./src/app/_services/spinner.service.ts");
    /* harmony import */
    var _services_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_services/alert.service */"./src/app/_services/alert.service.ts");
    var LayoutComponent = /*#__PURE__*/function () {
      function LayoutComponent(spinnerService, alertService) {
        _classCallCheck(this, LayoutComponent);
        this.spinnerService = spinnerService;
        this.alertService = alertService;
        this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subscription"]();
        this.showLoader = false;
        this.leftNav = false;
      }
      return _createClass(LayoutComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this18 = this;
          this.spinnerService.status.subscribe(function (val) {
            _this18.showLoader = val;
          });
          this.subscription = this.alertService.getMessage().subscribe(function (message) {
            _this18.message = message;
          });
          //var userRoles = ['ROOT','ORG_ADMIN','ORG_ASSOCIATE'];
          var userRole = localStorage.getItem('orgRole');
          if (userRole == "ROOT") {
            this.leftNav = true;
          }
        }
      }, {
        key: "newProjectObject",
        value: function newProjectObject(projectObj) {
          console.log("Project Object in parent: ", projectObj);
        }
      }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          this.subscription.unsubscribe();
        }
      }, {
        key: "openNavForRoot",
        value: function openNavForRoot() {}
      }]);
    }();
    LayoutComponent.ctorParameters = function () {
      return [{
        type: _services_spinner_service__WEBPACK_IMPORTED_MODULE_3__["SpinnerService"]
      }, {
        type: _services_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"]
      }];
    };
    LayoutComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-layout',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./layout.component.html */"./node_modules/raw-loader/dist/cjs.js!./src/app/layout/layout.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./layout.component.scss */"./src/app/layout/layout.component.scss"))["default"]]
    })], LayoutComponent);

    /***/
  }),
  /***/"./src/app/projects/manage/manage.component.scss": (
  /*!*******************************************************!*\
    !*** ./src/app/projects/manage/manage.component.scss ***!
    \*******************************************************/
  /*! exports provided: default */
  /***/
  function _src_app_projects_manage_manageComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Byb2plY3RzL21hbmFnZS9tYW5hZ2UuY29tcG9uZW50LnNjc3MifQ== */";

    /***/
  }),
  /***/"./src/app/projects/manage/manage.component.ts": (
  /*!*****************************************************!*\
    !*** ./src/app/projects/manage/manage.component.ts ***!
    \*****************************************************/
  /*! exports provided: ManageComponent */
  /***/
  function _src_app_projects_manage_manageComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "ManageComponent", function () {
      return ManageComponent;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */"./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */"./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */
    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */"./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */
    var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */"./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */
    var src_app_model_project__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_model/project */"./src/app/_model/project.ts");
    /* harmony import */
    var src_app_services_project_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/project.service */"./src/app/_services/project.service.ts");
    /* harmony import */
    var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */"./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
    var ManageComponent = /*#__PURE__*/function () {
      function ManageComponent(formBuilder, route, projectService, router, modalService, alertConfig) {
        _classCallCheck(this, ManageComponent);
        this.formBuilder = formBuilder;
        this.route = route;
        this.projectService = projectService;
        this.router = router;
        this.modalService = modalService;
        this.alertConfig = alertConfig;
        this.addUserForm = this.formBuilder.group({
          userId: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].email]],
          roleId: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        });
        this.editUserForm = this.formBuilder.group({
          userId: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].email]],
          roleId: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        });
        this.loading = false;
        this.submitted = false;
        this.userId = "";
        this.projectName = "";
        this.projectUsers = new Array();
        this.isProjectUsersNull = true;
        this.enableAdd = true;
        this.roleId = "";
        this.isAddUserFlag = false;
        this.isEditUserFlag = false;
        this.enableEdit = true;
        this.alertMsg = "";
        this.projectsList = [];
        this.paginatedData = [];
        this.currentPage = 1;
        this.pageSize = 5;
        this.collectionSize = 0;
        this.breadcrumb = [];
      }
      return _createClass(ManageComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this19 = this;
          console.log("Inside Manage");
          this.userId = localStorage.getItem("userId");
          this.route.queryParams.subscribe(function (params) {
            //console.log("params:",params);
            _this19.projectName = params['project'];
            console.log("project name in manage:", _this19.projectName);
            if (_this19.projectName == undefined || null) {
              console.log("Null Projects");
            } else {
              _this19.listProjects();
            }
          });
          //this.getProjectUsers(this.projectName);
          // this.projectUsers.forEach(user =>{
          //   if(!((user.userId) == localStorage.getItem("userId") && user.roleId == 'PR001')){
          //     this.router.navigateByUrl("/projects");
          //   }
          // })
          this.addUserForm = this.formBuilder.group({
            userId: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].email]],
            roleId: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
          });
          this.editUserForm = this.formBuilder.group({
            userId: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].email]],
            roleId: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
          });
          this.breadcrumb = [{
            url: "/projects/home",
            params: {
              'project': this.projectName
            },
            name: 'Home'
          }, {
            url: '',
            params: '',
            name: 'Manage'
          }];
        }
      }, {
        key: "listProjects",
        value: function listProjects() {
          var _this20 = this;
          this.projectService.listProjects(this.userId).subscribe(function (data) {
            _this20.projectsList = data;
            console.log("projects List :", _this20.projectsList);
            var _iterator7 = _createForOfIteratorHelper(_this20.projectsList),
              _step7;
            try {
              for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                var project = _step7.value;
                if (_this20.projectName == project['projectName']) {
                  _this20.manageProjectRole(project['projectRoleName']);
                }
              }
            } catch (err) {
              _iterator7.e(err);
            } finally {
              _iterator7.f();
            }
          }, function (err) {
            console.log(err);
            console.log(err.error.message);
          });
        }
      }, {
        key: "manageProjectRole",
        value: function manageProjectRole(projectRole) {
          console.log("Project Role", projectRole);
          if (projectRole == "PROJECT_OWNER") {
            this.getProjectUsers();
            this.getProjectRoles();
          } else {
            this.router.navigateByUrl('projects/home?project=' + this.projectName);
          }
        }
      }, {
        key: "getProjectRoles",
        value: function getProjectRoles() {
          var _this21 = this;
          this.projectService.getProjectRoles(this.projectName).subscribe(function (data) {
            _this21.ProjectRoles = data;
            console.log("Project Roles:", _this21.ProjectRoles);
          }, function (err) {
            console.log(err);
            console.log(err.error.message);
          });
        }
      }, {
        key: "getProjectUsers",
        value: function getProjectUsers() {
          var _this22 = this;
          this.projectService.getProjectInfo(this.projectName).subscribe(function (data) {
            _this22.projectUsers = data;
            _this22.refreshPagination();
            _this22.collectionSize = _this22.projectUsers.length;
            if (_this22.collectionSize > 0) {
              _this22.isProjectUsersNull = false;
            } else {
              _this22.isProjectUsersNull = true;
            }
            console.log("projects users :", _this22.projectUsers);
          }, function (err) {
            //alert("Something Went wrong);
            //this.loginError = true;
            console.log(err);
            console.log(err.error.message);
          });
        }
      }, {
        key: "refreshPagination",
        value: function refreshPagination() {
          this.paginatedData = this.projectUsers.slice((this.currentPage - 1) * this.pageSize, (this.currentPage - 1) * this.pageSize + this.pageSize);
          console.log("paginated Data:", this.paginatedData);
        }
      }, {
        key: "addUserFlag",
        value: function addUserFlag(flag) {
          this.isAddUserFlag = flag;
        }
      }, {
        key: "open",
        value: function open(data) {
          var _this23 = this;
          this.modalService.open(data, {
            centered: true
          }).result.then(function (result) {
            _this23.closeResult = "Closed with: ".concat(result);
          }, function (reason) {
            _this23.closeResult = "Dismissed ".concat(_this23.getDismissReason(reason));
          });
        }
      }, {
        key: "getDismissReason",
        value: function getDismissReason(reason) {
          this.resetAddUserForm();
          this.resetEditUserForm();
          if (reason === _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["ModalDismissReasons"].ESC) {
            return 'by pressing ESC';
          } else if (reason === _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["ModalDismissReasons"].BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
          } else {
            return "with: ".concat(reason);
          }
        }
      }, {
        key: "resetAddUserForm",
        value: function resetAddUserForm() {
          this.addUserForm.reset();
          this.enableAdd = true;
          this.submitted = false;
        }
      }, {
        key: "resetEditUserForm",
        value: function resetEditUserForm() {
          this.editUserForm.reset();
        }
      }, {
        key: "editUserFlag",
        value: function editUserFlag(user) {
          // this.isEditUserFlag = flag;
          // console.log("userObj:",user);
          // if(flag){
          this.editUserForm = this.formBuilder.group({
            userId: user.userId,
            roleId: user.roleId
          });
          this.editUserForm.controls['userId'].disable();
          //}
        }
      }, {
        key: "editUserRole",
        value: function editUserRole() {
          var _this24 = this;
          var projectObj = new src_app_model_project__WEBPACK_IMPORTED_MODULE_4__["Project"]();
          projectObj.projectName = this.projectName;
          this.editUserForm.controls['userId'].enable();
          projectObj.userId = this.editUserForm.controls['userId'].value;
          projectObj.roleId = this.editUserForm.controls['roleId'].value;
          this.projectService.modifyUserRole(projectObj).subscribe(function (data) {
            _this24.alertMsg = data['message'];
            _this24.alertConfiguration("success");
            _this24.getProjectUsers();
            _this24.resetEditUserForm();
          }, function (err) {
            console.log(err);
            console.log(err.error.message);
            _this24.alertMsg = err.error.message;
            _this24.alertConfiguration("success");
            _this24.resetEditUserForm();
          });
        }
      }, {
        key: "deleteUser",
        value: function deleteUser(user) {
          var _this25 = this;
          var projectObj = new src_app_model_project__WEBPACK_IMPORTED_MODULE_4__["Project"]();
          projectObj.projectName = this.projectName;
          projectObj.userId = user.userId;
          this.projectService.deleteUserFromProject(projectObj).subscribe(function (data) {
            _this25.alertMsg = data['message'];
            _this25.alertConfiguration("success");
            _this25.getProjectUsers();
          }, function (err) {
            console.log(err);
            console.log(err.error.message);
            _this25.alertMsg = err.error.message;
            _this25.alertConfiguration("danger");
          });
        }
      }, {
        key: "deleteProject",
        value: function deleteProject() {
          var _this26 = this;
          var projectObj = new src_app_model_project__WEBPACK_IMPORTED_MODULE_4__["Project"]();
          projectObj.projectName = this.projectName;
          this.projectService.deleteProject(projectObj).subscribe(function (data) {
            _this26.router.navigateByUrl('projects');
          }, function (err) {
            //alert("Something Went wrong);
            //this.loginError = true;
            console.log(err);
            console.log(err.error.message);
          });
        }
      }, {
        key: "f",
        get: function get() {
          return this.addUserForm.controls;
        }
      }, {
        key: "changeRoleId",
        value: function changeRoleId(roleId) {
          console.log("Role: ", roleId);
          this.addUserForm.setValue({
            'roleId': roleId
          }, {
            'onlySelf': true
          });
        }
      }, {
        key: "emailClick",
        value: function emailClick() {
          if (this.addUserForm.controls['userId'].value != '' && this.addUserForm.controls['roleId'].value != '') {
            this.enableAdd = false;
          }
        }
      }, {
        key: "roleSelect",
        value: function roleSelect() {
          if (this.addUserForm.controls['userId'].value != '' && this.addUserForm.controls['roleId'].value != '') {
            this.enableAdd = false;
          }
        }
        //Add user function
      }, {
        key: "onSubmit",
        value: function onSubmit() {
          var _this27 = this;
          this.submitted = true;
          // stop here if form is invalid
          if (this.addUserForm.invalid) {
            return;
          }
          this.loading = true;
          var projectObj = new src_app_model_project__WEBPACK_IMPORTED_MODULE_4__["Project"]();
          projectObj.projectName = this.projectName;
          projectObj.userId = this.addUserForm.controls['userId'].value;
          projectObj.roleId = this.addUserForm.controls['roleId'].value;
          console.log("projectObj: ", projectObj);
          this.projectService.addUserToProject(projectObj).subscribe(function (data) {
            _this27.alertMsg = data['message'];
            _this27.alertConfiguration("success");
            _this27.loading = false;
            _this27.getProjectUsers();
            _this27.resetAddUserForm();
          }, function (err) {
            console.log(err);
            _this27.alertConfiguration("danger");
            _this27.alertMsg = err.error.message;
            _this27.loading = false;
            _this27.resetAddUserForm();
            _this27.submitted = false;
          });
        }
      }, {
        key: "alertConfiguration",
        value: function alertConfiguration(type) {
          this.alertConfig.type = type;
        }
      }]);
    }();
    ManageComponent.ctorParameters = function () {
      return [{
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]
      }, {
        type: src_app_services_project_service__WEBPACK_IMPORTED_MODULE_5__["ProjectService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
      }, {
        type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModal"]
      }, {
        type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbAlertConfig"]
      }];
    };
    ManageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-manage',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./manage.component.html */"./node_modules/raw-loader/dist/cjs.js!./src/app/projects/manage/manage.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./manage.component.scss */"./src/app/projects/manage/manage.component.scss"))["default"]]
    })], ManageComponent);

    /***/
  }),
  /***/"./src/app/projects/project-home/project-home.component.scss": (
  /*!*******************************************************************!*\
    !*** ./src/app/projects/project-home/project-home.component.scss ***!
    \*******************************************************************/
  /*! exports provided: default */
  /***/
  function _src_app_projects_projectHome_projectHomeComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = ".createBtn {\n  border: 2px solid #023769;\n}\n\n.enableDelete {\n  cursor: not-allowed !important;\n}\n\na.disabled {\n  pointer-events: none;\n  cursor: not-allowed !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvamVjdHMvcHJvamVjdC1ob21lL0M6XFxLXFxLTmF0aXZlXFxGaXNzaW9uXFxVSV9GaXNzaW9uL3NyY1xcYXBwXFxwcm9qZWN0c1xccHJvamVjdC1ob21lXFxwcm9qZWN0LWhvbWUuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3Byb2plY3RzL3Byb2plY3QtaG9tZS9wcm9qZWN0LWhvbWUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUk7RUFDSSx5QkFBQTtBQ0RSOztBRElJO0VBQ0ksOEJBQUE7QUNEUjs7QURJSTtFQUNJLG9CQUFBO0VBQ0EsOEJBQUE7QUNEUiIsImZpbGUiOiJzcmMvYXBwL3Byb2plY3RzL3Byb2plY3QtaG9tZS9wcm9qZWN0LWhvbWUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbiAgICAuY3JlYXRlQnRue1xyXG4gICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICMwMjM3Njk7XHJcbiAgICB9XHJcblxyXG4gICAgLmVuYWJsZURlbGV0ZXtcclxuICAgICAgICBjdXJzb3I6IG5vdC1hbGxvd2VkICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgYS5kaXNhYmxlZCB7XHJcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICAgICAgY3Vyc29yOiBub3QtYWxsb3dlZCAhaW1wb3J0YW50O1xyXG4gICAgICB9IiwiLmNyZWF0ZUJ0biB7XG4gIGJvcmRlcjogMnB4IHNvbGlkICMwMjM3Njk7XG59XG5cbi5lbmFibGVEZWxldGUge1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkICFpbXBvcnRhbnQ7XG59XG5cbmEuZGlzYWJsZWQge1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZCAhaW1wb3J0YW50O1xufSJdfQ== */";

    /***/
  }),
  /***/"./src/app/projects/project-home/project-home.component.ts": (
  /*!*****************************************************************!*\
    !*** ./src/app/projects/project-home/project-home.component.ts ***!
    \*****************************************************************/
  /*! exports provided: ProjectHomeComponent */
  /***/
  function _src_app_projects_projectHome_projectHomeComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "ProjectHomeComponent", function () {
      return ProjectHomeComponent;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */"./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */"./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */
    var _services_project_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_services/project.service */"./src/app/_services/project.service.ts");
    /* harmony import */
    var _services_function_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_services/function.service */"./src/app/_services/function.service.ts");
    /* harmony import */
    var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */"./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */
    var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */"./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
    /* harmony import */
    var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */"./node_modules/@angular/router/fesm2015/router.js");
    var ProjectHomeComponent = /*#__PURE__*/function () {
      function ProjectHomeComponent(projectService, functionService, formBuilder, modalService, route) {
        _classCallCheck(this, ProjectHomeComponent);
        this.projectService = projectService;
        this.functionService = functionService;
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.route = route;
        this.userId = "";
        this.userOrgRole = "";
        this.projectsList = [];
        this.functionsList = [];
        this.projectName = "";
        this.projectRole = "";
        this.isViewerFlag = false;
        this.isOwnerFlag = false;
        this.isEditorFlag = false;
        this.isORGAdminFlag = false;
        this.isProjectListNull = true;
        this.isCreateProject = false;
        this.enableCreateProject = true;
        this.submitted = false;
        this.isFunctionListNull = true;
        this.createProjectForm = this.formBuilder.group({
          userId: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].email]],
          projectName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]
        });
        this.functionDescription = [];
        this.functionDescriptionFlag = false;
        this.functionLabels = [];
        this.functionAnnotations = [];
        this.functionAnnotationKeys = [];
        this.functionAnnotationValues = [];
        this.scaleToZeroFlag = false;
        this.userMsg = "";
        this.closeResult = "";
        this.functionInvocationCount = "";
        this.functionUrl = "";
        this.functionTriggerType = "";
        this.isProjectComponent = true;
        this.paginatedData = [];
        this.currentPage = 1;
        this.pageSize = 5;
        this.collectionSize = 0;
        this.breadcrumb = [];
      }
      return _createClass(ProjectHomeComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this28 = this;
          this.userId = localStorage.getItem("userId") + "";
          this.userOrgRole = localStorage.getItem("orgRole") + "";
          if (this.userOrgRole == "ORG_ADMIN") {
            this.isORGAdminFlag = true;
          }
          console.log("Inside Home");
          this.route.queryParams.subscribe(function (params) {
            _this28.projectName = params['project'];
            _this28.listProjects();
            console.log("Project name in home:", _this28.projectName);
            if (_this28.projectName == undefined || null) {
              console.log("No project selected");
            }
          });
          this.breadcrumb = [{
            url: 'projects/home',
            name: 'Home'
          }, {
            url: 'projects/',
            name: 'Templates'
          }];
        }
      }, {
        key: "newProjectObject",
        value: function newProjectObject(projectObj) {
          console.log("Project Object in HOme-parent: ", projectObj);
          if (projectObj == undefined) {
            this.isProjectListNull = true;
            console.log("Null Projects");
          } else {
            this.isProjectListNull = false;
            this.projectRole = projectObj['projectRoleName'];
            this.projectName = projectObj['projectName'];
            console.log("Project name", this.projectName);
            this.manageProjectRole(this.projectRole);
            this.listFunctions(this.projectName);
          }
          //this.getProjectName(projectObj);
        }
      }, {
        key: "refreshPagination",
        value: function refreshPagination() {
          this.paginatedData = this.functionsList.slice((this.currentPage - 1) * this.pageSize, (this.currentPage - 1) * this.pageSize + this.pageSize);
          console.log("paginated Data:", this.paginatedData);
        }
      }, {
        key: "listProjects",
        value: function listProjects() {
          var _this29 = this;
          this.projectService.listProjects(this.userId).subscribe(function (data) {
            _this29.projectsList = data;
            if (_this29.projectsList == null || undefined || _this29.projectsList.length <= 0) {
              _this29.isProjectListNull = true;
            } else {
              _this29.isProjectListNull = false;
            }
            console.log("projects List :", _this29.projectsList);
            var _iterator8 = _createForOfIteratorHelper(_this29.projectsList),
              _step8;
            try {
              for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                var project = _step8.value;
                if (_this29.projectName == project['projectName']) {
                  _this29.manageProjectRole(project['projectRoleName']);
                  _this29.listFunctions(_this29.projectName);
                }
              }
            } catch (err) {
              _iterator8.e(err);
            } finally {
              _iterator8.f();
            }
          }, function (err) {
            console.log(err);
            console.log(err.error.message);
          });
        }
      }, {
        key: "getProjectName",
        value: function getProjectName(projectObj) {
          var projectName = projectObj['projectName'];
          var projectRole = projectObj['projectRoleName'];
          console.log("Project name", projectName);
          this.manageProjectRole(projectRole);
          this.listFunctions(projectName);
        }
      }, {
        key: "listFunctions",
        value: function listFunctions(projectName) {
          var _this30 = this;
          this.functionService.listFunctions(projectName).subscribe(function (data) {
            _this30.functionsList = data;
            _this30.collectionSize = _this30.functionsList.length;
            console.log("Total size:", _this30.collectionSize);
            _this30.refreshPagination();
            if (_this30.functionsList.length > 0) {
              _this30.isFunctionListNull = false;
            } else {
              _this30.isFunctionListNull = true;
            }
            console.log("Functions List :", _this30.functionsList);
          }, function (err) {
            console.log(err);
          });
        }
      }, {
        key: "manageProjectRole",
        value: function manageProjectRole(projectRole) {
          console.log("Project Role", projectRole);
          this.isViewerFlag = false;
          if (projectRole == "PROJECT_VIEWER") {
            //this.isOwnerFlag = true;
            this.isViewerFlag = true;
          } else {
            this.isViewerFlag = false;
          }
        }
      }, {
        key: "deleteFunction",
        value: function deleteFunction(functionObj) {
          var _this31 = this;
          console.log("delete function ", functionObj);
          functionObj.projectName = this.projectName;
          this.functionService.deleteFunction(functionObj).subscribe(function (data) {
            _this31.listFunctions(_this31.projectName);
            console.log("Functions List :", _this31.functionsList);
          }, function (err) {
            //alert("Something Went wrong);
            //this.loginError = true;
            console.log(err);
            console.log(err.error.message);
          });
        }
        // createProjectPopUp() {
        //   this.isCreateProject = true;
        // }
        // createProject(){
        //   this.createProjectForm.controls['userId'].setValue(this.userId);
        //   this.submitted = true;
        //   if(this.createProjectForm.invalid){
        //     console.log("Create project :",this.createProjectForm.value);
        //     return;
        //   }
        //   this.projectService.createProject(this.createProjectForm.value).subscribe((data: any) => {
        //     this.listProjects(this.userId);
        //   },
        //     err => {
        //       //console.log(err);
        //       this.userMsg = err.error.message;
        //       console.log(err.error.message);
        //     })
        // }
        // projectNameClick(){
        //   if (this.createProjectForm.controls['projectName'].value != '') {
        //     //alert()
        //     this.enableCreateProject = false;
        //   }
        // }
        // get f() { return this.createProjectForm.controls; }
      }, {
        key: "getFunctionDescription",
        value: function getFunctionDescription(functionObj) {
          var _this32 = this;
          functionObj.projectName = this.projectName;
          this.functionService.getFunctionDescription(functionObj).subscribe(function (data) {
            _this32.functionDescription = data;
            _this32.functionDescriptionFlag = true;
            //this.functionLabels = this.functionDescription['labels'];
            _this32.functionLabels = _this32.functionDescription['functionName'];
            //this.scaleToZeroFlag = this.functionLabels["com.openfaas.scale.zero"];
            _this32.scaleToZeroFlag = false;
            //this.functionAnnotations = this.functionDescription["annotations"];
            _this32.functionAnnotations = _this32.functionDescription["annotations"];
            //this.functionInvocationCount = this.functionDescription["invocationCount"];
            _this32.functionInvocationCount = "0";
            _this32.functionTriggerType = _this32.functionDescription["triggerType"];
            _this32.functionUrl = _this32.functionDescription["functionUrl"];
            console.log("Functions Description :", _this32.functionDescription);
            console.log("Functions Annotation :", _this32.functionAnnotations);
          }, function (err) {
            //alert("Something Went wrong);
            //this.loginError = true;
            console.log(err);
            console.log(err.error.message);
          });
          //this.modalService.open('functionDescription');
        }
      }, {
        key: "open",
        value: function open(functionObj) {
          var _this33 = this;
          //this.getFunctionDescription(functionObj);
          this.modalService.open(functionObj, {
            size: 'lg'
          }).result.then(function (result) {
            _this33.closeResult = "Closed with: ".concat(result);
          }, function (reason) {
            _this33.closeResult = "Dismissed ".concat(_this33.getDismissReason(reason));
          });
        }
      }, {
        key: "getDismissReason",
        value: function getDismissReason(reason) {
          if (reason === _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["ModalDismissReasons"].ESC) {
            return 'by pressing ESC';
          } else if (reason === _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["ModalDismissReasons"].BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
          } else {
            return "with: ".concat(reason);
          }
        }
      }]);
    }();
    ProjectHomeComponent.ctorParameters = function () {
      return [{
        type: _services_project_service__WEBPACK_IMPORTED_MODULE_2__["ProjectService"]
      }, {
        type: _services_function_service__WEBPACK_IMPORTED_MODULE_3__["FunctionService"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"]
      }, {
        type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModal"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"]
      }];
    };
    ProjectHomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-project-home',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./project-home.component.html */"./node_modules/raw-loader/dist/cjs.js!./src/app/projects/project-home/project-home.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./project-home.component.scss */"./src/app/projects/project-home/project-home.component.scss"))["default"]]
    })], ProjectHomeComponent);

    /***/
  }),
  /***/"./src/app/projects/projects.component.scss": (
  /*!**************************************************!*\
    !*** ./src/app/projects/projects.component.scss ***!
    \**************************************************/
  /*! exports provided: default */
  /***/
  function _src_app_projects_projectsComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = ".table-outer {\n  border: 1px solid #ccc;\n  width: 80%;\n  text-align: center;\n  padding: 10px;\n}\n.table-outer table thead tr {\n  background: #499bea;\n  background: -webkit-gradient(left top, right top, color-stop(6%, #499bea), color-stop(19%, #3d8ad4), color-stop(56%, #1d5995), color-stop(68%, #124980));\n  background: linear-gradient(to right, #499bea 6%, #3d8ad4 19%, #1d5995 56%, #124980 68%);\n  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\"#499bea\", endColorstr=\"#124980\", GradientType=1 );\n  color: #fff;\n}\n.table-outer table thead tr th {\n  border: 1px solid #ccc;\n  padding: 10px;\n}\n.table-outer table tbody tr td {\n  border: 1px solid #ccc;\n  padding: 10px;\n}\n.createBtn {\n  border: 2px solid #023769;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvamVjdHMvQzpcXEtcXEtOYXRpdmVcXEZpc3Npb25cXFVJX0Zpc3Npb24vc3JjXFxhcHBcXHByb2plY3RzXFxwcm9qZWN0cy5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvcHJvamVjdHMvcHJvamVjdHMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxzQkFBQTtFQUNBLFVBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7QUNDSjtBRElJO0VBQ0EsbUJBQUE7RUFFQSx3SkFBQTtFQUlBLHdGQUFBO0VBQ0Esb0hBQUE7RUFDQSxXQUFBO0FDRko7QURHSTtFQUNJLHNCQUFBO0VBQ0osYUFBQTtBQ0RKO0FEUUk7RUFDSSxzQkFBQTtFQUNKLGFBQUE7QUNOSjtBRGNJO0VBQ0kseUJBQUE7QUNYUiIsImZpbGUiOiJzcmMvYXBwL3Byb2plY3RzL3Byb2plY3RzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRhYmxlLW91dGVye1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIHdpZHRoOiA4MCU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgdGFibGV7XHJcbiAgICBcclxuICAgIC8vIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgICB0aGVhZHtcclxuICAgIHRye1xyXG4gICAgYmFja2dyb3VuZDogcmdiYSg3MywxNTUsMjM0LDEpO1xyXG4gICAgYmFja2dyb3VuZDogLW1vei1saW5lYXItZ3JhZGllbnQobGVmdCwgcmdiYSg3MywxNTUsMjM0LDEpIDYlLCByZ2JhKDYxLDEzOCwyMTIsMSkgMTklLCByZ2JhKDI5LDg5LDE0OSwxKSA1NiUsIHJnYmEoMTgsNzMsMTI4LDEpIDY4JSk7XHJcbiAgICBiYWNrZ3JvdW5kOiAtd2Via2l0LWdyYWRpZW50KGxlZnQgdG9wLCByaWdodCB0b3AsIGNvbG9yLXN0b3AoNiUsIHJnYmEoNzMsMTU1LDIzNCwxKSksIGNvbG9yLXN0b3AoMTklLCByZ2JhKDYxLDEzOCwyMTIsMSkpLCBjb2xvci1zdG9wKDU2JSwgcmdiYSgyOSw4OSwxNDksMSkpLCBjb2xvci1zdG9wKDY4JSwgcmdiYSgxOCw3MywxMjgsMSkpKTtcclxuICAgIGJhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGxlZnQsIHJnYmEoNzMsMTU1LDIzNCwxKSA2JSwgcmdiYSg2MSwxMzgsMjEyLDEpIDE5JSwgcmdiYSgyOSw4OSwxNDksMSkgNTYlLCByZ2JhKDE4LDczLDEyOCwxKSA2OCUpO1xyXG4gICAgYmFja2dyb3VuZDogLW8tbGluZWFyLWdyYWRpZW50KGxlZnQsIHJnYmEoNzMsMTU1LDIzNCwxKSA2JSwgcmdiYSg2MSwxMzgsMjEyLDEpIDE5JSwgcmdiYSgyOSw4OSwxNDksMSkgNTYlLCByZ2JhKDE4LDczLDEyOCwxKSA2OCUpO1xyXG4gICAgYmFja2dyb3VuZDogLW1zLWxpbmVhci1ncmFkaWVudChsZWZ0LCByZ2JhKDczLDE1NSwyMzQsMSkgNiUsIHJnYmEoNjEsMTM4LDIxMiwxKSAxOSUsIHJnYmEoMjksODksMTQ5LDEpIDU2JSwgcmdiYSgxOCw3MywxMjgsMSkgNjglKTtcclxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgcmdiYSg3MywxNTUsMjM0LDEpIDYlLCByZ2JhKDYxLDEzOCwyMTIsMSkgMTklLCByZ2JhKDI5LDg5LDE0OSwxKSA1NiUsIHJnYmEoMTgsNzMsMTI4LDEpIDY4JSk7XHJcbiAgICBmaWx0ZXI6IHByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5ncmFkaWVudCggc3RhcnRDb2xvcnN0cj0nIzQ5OWJlYScsIGVuZENvbG9yc3RyPScjMTI0OTgwJywgR3JhZGllbnRUeXBlPTEgKTtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgdGh7XHJcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIHBhZGRpbmc6IDEwcHhcclxuICAgIH1cclxuICAgIH1cclxuICAgIH1cclxuICAgIHRib2R5e1xyXG4gICAgdHJ7XHJcbiAgICAvLyBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgdGR7XHJcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICB9XHJcbiAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAuY3JlYXRlQnRue1xyXG4gICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICMwMjM3Njk7XHJcbiAgICB9IiwiLnRhYmxlLW91dGVyIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgd2lkdGg6IDgwJTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiAxMHB4O1xufVxuLnRhYmxlLW91dGVyIHRhYmxlIHRoZWFkIHRyIHtcbiAgYmFja2dyb3VuZDogIzQ5OWJlYTtcbiAgYmFja2dyb3VuZDogLW1vei1saW5lYXItZ3JhZGllbnQobGVmdCwgIzQ5OWJlYSA2JSwgIzNkOGFkNCAxOSUsICMxZDU5OTUgNTYlLCAjMTI0OTgwIDY4JSk7XG4gIGJhY2tncm91bmQ6IC13ZWJraXQtZ3JhZGllbnQobGVmdCB0b3AsIHJpZ2h0IHRvcCwgY29sb3Itc3RvcCg2JSwgIzQ5OWJlYSksIGNvbG9yLXN0b3AoMTklLCAjM2Q4YWQ0KSwgY29sb3Itc3RvcCg1NiUsICMxZDU5OTUpLCBjb2xvci1zdG9wKDY4JSwgIzEyNDk4MCkpO1xuICBiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChsZWZ0LCAjNDk5YmVhIDYlLCAjM2Q4YWQ0IDE5JSwgIzFkNTk5NSA1NiUsICMxMjQ5ODAgNjglKTtcbiAgYmFja2dyb3VuZDogLW8tbGluZWFyLWdyYWRpZW50KGxlZnQsICM0OTliZWEgNiUsICMzZDhhZDQgMTklLCAjMWQ1OTk1IDU2JSwgIzEyNDk4MCA2OCUpO1xuICBiYWNrZ3JvdW5kOiAtbXMtbGluZWFyLWdyYWRpZW50KGxlZnQsICM0OTliZWEgNiUsICMzZDhhZDQgMTklLCAjMWQ1OTk1IDU2JSwgIzEyNDk4MCA2OCUpO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICM0OTliZWEgNiUsICMzZDhhZDQgMTklLCAjMWQ1OTk1IDU2JSwgIzEyNDk4MCA2OCUpO1xuICBmaWx0ZXI6IHByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5ncmFkaWVudCggc3RhcnRDb2xvcnN0cj1cIiM0OTliZWFcIiwgZW5kQ29sb3JzdHI9XCIjMTI0OTgwXCIsIEdyYWRpZW50VHlwZT0xICk7XG4gIGNvbG9yOiAjZmZmO1xufVxuLnRhYmxlLW91dGVyIHRhYmxlIHRoZWFkIHRyIHRoIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgcGFkZGluZzogMTBweDtcbn1cbi50YWJsZS1vdXRlciB0YWJsZSB0Ym9keSB0ciB0ZCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIHBhZGRpbmc6IDEwcHg7XG59XG5cbi5jcmVhdGVCdG4ge1xuICBib3JkZXI6IDJweCBzb2xpZCAjMDIzNzY5O1xufSJdfQ== */";

    /***/
  }),
  /***/"./src/app/projects/projects.component.ts": (
  /*!************************************************!*\
    !*** ./src/app/projects/projects.component.ts ***!
    \************************************************/
  /*! exports provided: ProjectsComponent */
  /***/
  function _src_app_projects_projectsComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "ProjectsComponent", function () {
      return ProjectsComponent;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */"./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */"./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */
    var _model_project__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_model/project */"./src/app/_model/project.ts");
    /* harmony import */
    var _services_project_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_services/project.service */"./src/app/_services/project.service.ts");
    /* harmony import */
    var _services_function_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_services/function.service */"./src/app/_services/function.service.ts");
    /* harmony import */
    var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */"./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */
    var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */"./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
    /* harmony import */
    var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */"./node_modules/@angular/router/fesm2015/router.js");
    var ProjectsComponent = /*#__PURE__*/function () {
      function ProjectsComponent(projectService, functionService, formBuilder, modalService, route, router) {
        _classCallCheck(this, ProjectsComponent);
        this.projectService = projectService;
        this.functionService = functionService;
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.route = route;
        this.router = router;
        this.userId = "";
        this.userOrgRole = "";
        this.projectsList = [];
        this.functionsList = [];
        this.projectName = "";
        this.projectRole = "";
        this.isViewerFlag = false;
        this.isOwnerFlag = false;
        this.isEditorFlag = false;
        this.isORGAdminFlag = false;
        this.isProjectListNull = true;
        this.isCreateProject = false;
        this.enableCreateProject = true;
        this.submitted = false;
        this.isFunctionListNull = true;
        this.createProjectForm = this.formBuilder.group({
          userId: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].email]],
          projectName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required]
        });
        this.functionDescription = [];
        this.functionDescriptionFlag = false;
        this.functionLabels = [];
        this.functionAnnotations = [];
        this.functionAnnotationKeys = [];
        this.functionAnnotationValues = [];
        this.scaleToZeroFlag = false;
        this.userMsg = "";
        this.closeResult = "";
        this.functionInvocationCount = "";
        this.functionUrl = "";
        this.functionTriggerType = "";
        this.isProjectComponent = true;
        this.paginatedData = [];
        this.currentPage = 1;
        this.pageSize = 5;
        this.collectionSize = 0;
        this.projectObject = new _model_project__WEBPACK_IMPORTED_MODULE_2__["Project"]();
      }
      return _createClass(ProjectsComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.userId = localStorage.getItem("userId") + "";
          this.userOrgRole = localStorage.getItem("orgRole") + "";
          if (this.userOrgRole == "ORG_ADMIN") {
            this.isORGAdminFlag = true;
          }
          // this.listProjects(this.userId);
        }
      }, {
        key: "newProjectObject",
        value: function newProjectObject(projectObj) {
          this.projectObject = projectObj;
          this.currentProjectObj = this.projectObject;
          console.log("Project Object in project ", this.projectObject);
          console.log("Router url: ", this.router.url);
          if (this.router.url.includes("/projects/home")) {
            console.log("Go to home project");
            this.router.navigate(['projects/home'], {
              queryParams: {
                project: projectObj['projectName']
              }
            });
            //this.router.navigateByUrl('projects/home?project='+this.projectObject['projectName']);
          } else if (this.router.url.includes("/projects/manage")) {
            console.log("Go to manage project");
            this.router.navigate(['projects/manage'], {
              queryParams: {
                action: 'manageProject',
                project: this.projectObject['projectName']
              }
            });
            //this.router.navigateByUrl('projects/manage?action=manageProject&project='+this.projectObject['projectName']);
          } else if (this.router.url.includes("/projects/usage")) {
            console.log("Go to usage project");
            this.router.navigateByUrl('projects/usage?action=usageProject&project=' + this.projectObject['projectName']);
          } else if (this.router.url.includes("/projects/function/logs")) {
            console.log("Go to Function log");
            this.router.navigate(['/projects/function/logs'], {
              queryParams: {
                project: this.projectObject['projectName'],
                "function": this.route.snapshot.queryParams['function']
              }
            });
          } else if (this.router.url.includes("/projects/function")) {
            if (this.route.snapshot.queryParams['action'] == "createFunction") {
              console.log("Go to create function");
              this.router.navigate(['/projects/function'], {
                queryParams: {
                  action: 'createFunction',
                  project: this.projectObject['projectName']
                }
              });
            } else {
              this.router.navigate(['projects/function'], {
                queryParams: {
                  action: 'deployFunction',
                  project: this.projectObject['projectName'],
                  "function": this.route.snapshot.queryParams['function']
                }
              });
            }
          } else {
            console.log("Go to home project-initial step");
            this.router.navigate(['projects/home'], {
              queryParams: {
                project: projectObj['projectName']
              }
            });
            //this.router.navigateByUrl('projects/home?project='+this.projectObject['projectName']);
          }
        }
      }]);
    }();
    ProjectsComponent.ctorParameters = function () {
      return [{
        type: _services_project_service__WEBPACK_IMPORTED_MODULE_3__["ProjectService"]
      }, {
        type: _services_function_service__WEBPACK_IMPORTED_MODULE_4__["FunctionService"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"]
      }, {
        type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModal"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"]
      }];
    };
    ProjectsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-projects',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./projects.component.html */"./node_modules/raw-loader/dist/cjs.js!./src/app/projects/projects.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./projects.component.scss */"./src/app/projects/projects.component.scss"))["default"]]
    })], ProjectsComponent);

    /***/
  }),
  /***/"./src/app/projects/usage/usage.component.scss": (
  /*!*****************************************************!*\
    !*** ./src/app/projects/usage/usage.component.scss ***!
    \*****************************************************/
  /*! exports provided: default */
  /***/
  function _src_app_projects_usage_usageComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Byb2plY3RzL3VzYWdlL3VzYWdlLmNvbXBvbmVudC5zY3NzIn0= */";

    /***/
  }),
  /***/"./src/app/projects/usage/usage.component.ts": (
  /*!***************************************************!*\
    !*** ./src/app/projects/usage/usage.component.ts ***!
    \***************************************************/
  /*! exports provided: UsageComponent */
  /***/
  function _src_app_projects_usage_usageComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "UsageComponent", function () {
      return UsageComponent;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */"./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */"./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */
    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */"./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */
    var src_app_model_project__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_model/project */"./src/app/_model/project.ts");
    /* harmony import */
    var src_app_services_project_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/project.service */"./src/app/_services/project.service.ts");
    /* harmony import */
    var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */"./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
    var UsageComponent = /*#__PURE__*/function () {
      function UsageComponent(route, projectService, router, alertConfig) {
        _classCallCheck(this, UsageComponent);
        this.route = route;
        this.projectService = projectService;
        this.router = router;
        this.alertConfig = alertConfig;
        this.projectName = "";
        this.isprojectUsageListsNull = true;
        this.total = 0;
        this.paginatedData = [];
        this.currentPage = 1;
        this.pageSize = 5;
        this.collectionSize = 0;
        this.alertMsg = "";
        this.breadcrumb = [];
      }
      return _createClass(UsageComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this34 = this;
          this.route.queryParams.subscribe(function (params) {
            _this34.projectName = params['id'];
          });
          console.log("projectName: ", this.projectName);
          this.breadcrumb = [{
            url: "/projects/home",
            params: {
              'project': this.projectName
            },
            name: 'Home'
          }, {
            url: "/projects/manage",
            params: {
              'action': 'manageProject',
              'project': this.projectName
            },
            name: 'Manage'
          }, {
            url: "",
            params: "",
            name: 'Usage'
          }];
          this.getProjectUsage();
        }
      }, {
        key: "refreshPagination",
        value: function refreshPagination() {
          this.paginatedData = this.projectUsageLists.slice((this.currentPage - 1) * this.pageSize, (this.currentPage - 1) * this.pageSize + this.pageSize);
          console.log("paginated Data:", this.paginatedData);
        }
      }, {
        key: "newProjectObject",
        value: function newProjectObject(projectObj) {
          console.log("Project Object in parent: ", projectObj);
          if (projectObj == undefined) {
            console.log("Null Projects");
          } else {
            //   this.projectRole = projectObj['projectRoleName'];
            //   this.projectName = projectObj['projectName'];
            console.log("Project name", projectObj['projectName']);
            //this.manageProjectRole(this.projectRole);
          }
          //this.getProjectName(projectObj);
        }
      }, {
        key: "getProjectUsage",
        value: function getProjectUsage() {
          var _this35 = this;
          var projectObj = new src_app_model_project__WEBPACK_IMPORTED_MODULE_3__["Project"]();
          projectObj.projectName = this.projectName;
          this.projectService.getProjectUsage(projectObj).subscribe(function (data) {
            _this35.projectUsageLists = data;
            if (_this35.projectUsageLists == undefined || _this35.projectUsageLists.length <= 0) {
              _this35.isprojectUsageListsNull = true;
            } else {
              _this35.isprojectUsageListsNull = false;
              _this35.collectionSize = _this35.projectUsageLists.length;
              _this35.refreshPagination();
              _this35.totalUsage();
            }
            console.log("project usage:", _this35.projectUsageLists);
          }, function (err) {
            _this35.alertMsg = err.error;
            _this35.alertConfigurations("danger");
            console.log(_this35.alertMsg);
          });
        }
      }, {
        key: "totalUsage",
        value: function totalUsage() {
          this.total = 0;
          var _iterator9 = _createForOfIteratorHelper(this.projectUsageLists),
            _step9;
          try {
            for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
              var projectUsage = _step9.value;
              this.total += parseFloat(projectUsage['usage']);
            }
          } catch (err) {
            _iterator9.e(err);
          } finally {
            _iterator9.f();
          }
          console.log("Total: ", this.total);
        }
      }, {
        key: "alertConfigurations",
        value: function alertConfigurations(type) {
          this.alertConfig.type = type;
        }
      }]);
    }();
    UsageComponent.ctorParameters = function () {
      return [{
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]
      }, {
        type: src_app_services_project_service__WEBPACK_IMPORTED_MODULE_4__["ProjectService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
      }, {
        type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbAlertConfig"]
      }];
    };
    UsageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-usage',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./usage.component.html */"./node_modules/raw-loader/dist/cjs.js!./src/app/projects/usage/usage.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./usage.component.scss */"./src/app/projects/usage/usage.component.scss"))["default"]]
    })], UsageComponent);

    /***/
  }),
  /***/"./src/app/root/configuration/configuration.component.scss": (
  /*!*****************************************************************!*\
    !*** ./src/app/root/configuration/configuration.component.scss ***!
    \*****************************************************************/
  /*! exports provided: default */
  /***/
  function _src_app_root_configuration_configurationComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Jvb3QvY29uZmlndXJhdGlvbi9jb25maWd1cmF0aW9uLmNvbXBvbmVudC5zY3NzIn0= */";

    /***/
  }),
  /***/"./src/app/root/configuration/configuration.component.ts": (
  /*!***************************************************************!*\
    !*** ./src/app/root/configuration/configuration.component.ts ***!
    \***************************************************************/
  /*! exports provided: ConfigurationComponent */
  /***/
  function _src_app_root_configuration_configurationComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "ConfigurationComponent", function () {
      return ConfigurationComponent;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */"./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */"./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */
    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */"./node_modules/@angular/router/fesm2015/router.js");
    var ConfigurationComponent = /*#__PURE__*/function () {
      function ConfigurationComponent(router) {
        _classCallCheck(this, ConfigurationComponent);
        this.router = router;
      }
      return _createClass(ConfigurationComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          if ("ROOT" != localStorage.getItem('orgRole')) {
            this.router.navigateByUrl('/auth/login');
          }
        }
      }]);
    }();
    ConfigurationComponent.ctorParameters = function () {
      return [{
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
      }];
    };
    ConfigurationComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-configuration',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./configuration.component.html */"./node_modules/raw-loader/dist/cjs.js!./src/app/root/configuration/configuration.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./configuration.component.scss */"./src/app/root/configuration/configuration.component.scss"))["default"]]
    })], ConfigurationComponent);

    /***/
  }),
  /***/"./src/app/root/root.component.scss": (
  /*!******************************************!*\
    !*** ./src/app/root/root.component.scss ***!
    \******************************************/
  /*! exports provided: default */
  /***/
  function _src_app_root_rootComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Jvb3Qvcm9vdC5jb21wb25lbnQuc2NzcyJ9 */";

    /***/
  }),
  /***/"./src/app/root/root.component.ts": (
  /*!****************************************!*\
    !*** ./src/app/root/root.component.ts ***!
    \****************************************/
  /*! exports provided: RootComponent */
  /***/
  function _src_app_root_rootComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "RootComponent", function () {
      return RootComponent;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */"./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */"./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */
    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */"./node_modules/@angular/router/fesm2015/router.js");
    var RootComponent = /*#__PURE__*/function () {
      function RootComponent(router) {
        _classCallCheck(this, RootComponent);
        this.router = router;
      }
      return _createClass(RootComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          if ("ROOT" != localStorage.getItem('orgRole')) {
            this.router.navigateByUrl('/auth/login');
          }
        }
      }]);
    }();
    RootComponent.ctorParameters = function () {
      return [{
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
      }];
    };
    RootComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-root',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./root.component.html */"./node_modules/raw-loader/dist/cjs.js!./src/app/root/root.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./root.component.scss */"./src/app/root/root.component.scss"))["default"]]
    })], RootComponent);

    /***/
  }),
  /***/"./src/app/root/users/users.component.scss": (
  /*!*************************************************!*\
    !*** ./src/app/root/users/users.component.scss ***!
    \*************************************************/
  /*! exports provided: default */
  /***/
  function _src_app_root_users_usersComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */
    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Jvb3QvdXNlcnMvdXNlcnMuY29tcG9uZW50LnNjc3MifQ== */";

    /***/
  }),
  /***/"./src/app/root/users/users.component.ts": (
  /*!***********************************************!*\
    !*** ./src/app/root/users/users.component.ts ***!
    \***********************************************/
  /*! exports provided: UsersComponent */
  /***/
  function _src_app_root_users_usersComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "UsersComponent", function () {
      return UsersComponent;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */"./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */"./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */
    var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */"./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */
    var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */"./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */
    var _services_authentication_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_services/authentication.service */"./src/app/_services/authentication.service.ts");
    /* harmony import */
    var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */"./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
    /* harmony import */
    var _environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../environments/environment */"./src/environments/environment.ts");
    var UsersComponent = /*#__PURE__*/function () {
      function UsersComponent(formBuilder, route, router, authenticationService, modalService, alertConfig) {
        _classCallCheck(this, UsersComponent);
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.modalService = modalService;
        this.alertConfig = alertConfig;
        this.submitted = false;
        this.addUserPopUpFlag = false;
        this.loading = false;
        this.userRoles = [];
        this.usersList = new Array();
        this.addUserForm = this.formBuilder.group({
          userId: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email]],
          name: [''],
          orgRoleId: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
        this.closeResult = '';
        this.enableLogin = true;
        this.addUserError = "";
        this.alertMessage = "";
        this.currentPage = 1;
        this.pageSize = _environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].pageSize;
        this.collectionSize = 0;
        this.alertClosed = false;
      }
      return _createClass(UsersComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          if ("ROOT" != localStorage.getItem('orgRole')) {
            this.router.navigateByUrl('/auth/login');
          }
          this.getUserRoles();
          this.getAllUsers();
        }
      }, {
        key: "open",
        value: function open(addUser) {
          var _this36 = this;
          this.modalService.open(addUser, {
            centered: true
          }).result.then(function (result) {
            _this36.closeResult = "Closed with: ".concat(result);
          }, function (reason) {
            _this36.closeResult = "Dismissed ".concat(_this36.getDismissReason(reason));
          });
        }
      }, {
        key: "getDismissReason",
        value: function getDismissReason(reason) {
          this.resetAddUserForm();
          if (reason === _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["ModalDismissReasons"].ESC) {
            return 'by pressing ESC';
          } else if (reason === _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["ModalDismissReasons"].BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
          } else {
            return "with: ".concat(reason);
          }
        }
      }, {
        key: "resetAddUserForm",
        value: function resetAddUserForm() {
          this.addUserForm.reset();
          this.enableLogin = true;
        }
      }, {
        key: "getUserRoles",
        value: function getUserRoles() {
          var _this37 = this;
          this.authenticationService.getUserRoles().subscribe(function (data) {
            _this37.userRoles = data;
            console.log("Roles list :", _this37.userRoles);
          }, function (err) {
            console.log(err);
            console.log(err.error.message);
          });
        }
      }, {
        key: "onSubmit",
        value: function onSubmit() {
          var _this38 = this;
          this.submitted = true;
          // stop here if form is invalid
          if (this.addUserForm.invalid) {
            console.log("Invalid form", this.addUserForm.value);
            return;
          }
          this.loading = true;
          console.log("addUserForm: ", this.addUserForm.value);
          this.authenticationService.addUserToOrg(this.addUserForm.value).subscribe(function (data) {
            _this38.resetAddUserForm();
            _this38.getAllUsers();
            // this.router.navigateByUrl('/root/users');
            _this38.loading = false;
            _this38.modalService.dismissAll();
            _this38.alertMessage = "User added successfully!!!";
            _this38.alertConfigurations('success');
          }, function (err) {
            //alert("Something Went wrong);
            //this.loginError = true;
            _this38.modalService.dismissAll();
            console.log(err.error.message);
            _this38.loading = false;
            _this38.resetAddUserForm();
            _this38.submitted = false;
            _this38.alertMessage = err.error.message;
            _this38.alertConfigurations('danger');
          });
        }
      }, {
        key: "f",
        get: function get() {
          return this.addUserForm.controls;
        }
      }, {
        key: "addUserPopUp",
        value: function addUserPopUp() {
          this.addUserPopUpFlag = true;
          console.log("Inside add user");
        }
      }, {
        key: "emailClick",
        value: function emailClick() {
          if (this.addUserForm.controls['userId'].value != '' && this.addUserForm.controls['name'].value != '' && this.addUserForm.controls['orgRoleId'].value != '') {
            this.enableLogin = false;
          }
        }
      }, {
        key: "nameClick",
        value: function nameClick() {
          if (this.addUserForm.controls['userId'].value != '' && this.addUserForm.controls['name'].value != '' && this.addUserForm.controls['orgRoleId'].value != '') {
            //alert()
            this.enableLogin = false;
          }
        }
      }, {
        key: "roleClick",
        value: function roleClick() {
          if (this.addUserForm.controls['userId'].value != '' && this.addUserForm.controls['name'].value != '' && this.addUserForm.controls['orgRoleId'].value != '') {
            //alert()
            this.enableLogin = false;
          }
        }
      }, {
        key: "getAllUsers",
        value: function getAllUsers() {
          var _this39 = this;
          this.authenticationService.listUsersOfOrg().subscribe(function (data) {
            _this39.usersList = data;
            _this39.collectionSize = _this39.usersList.length;
            _this39.refreshPagination();
            console.log("users list :", _this39.usersList);
            console.log("page users list :", _this39.paginatedData);
          }, function (err) {
            //alert("Something Went wrong);
            //this.loginError = true;
            console.log(err);
            console.log(err.error.message);
          });
        }
      }, {
        key: "refreshPagination",
        value: function refreshPagination() {
          this.paginatedData = this.usersList.map(function (user, i) {
            return Object.assign({
              id: i + 1
            }, user);
          }).slice((this.currentPage - 1) * this.pageSize, (this.currentPage - 1) * this.pageSize + this.pageSize);
        }
      }, {
        key: "deleteUser",
        value: function deleteUser(user) {
          var _this40 = this;
          this.authenticationService.deleteUserFromOrg(user).subscribe(function (data) {
            _this40.getAllUsers();
            _this40.alertMessage = "User deleted successfully...";
            _this40.alertConfigurations("success");
          }, function (err) {
            //alert("Something Went wrong);
            //this.loginError = true;
            console.log(err);
            console.log(err.error.message);
            _this40.alertMessage = err.error.message;
            _this40.alertConfigurations("danger");
          });
        }
      }, {
        key: "alertConfigurations",
        value: function alertConfigurations(type) {
          this.alertConfig.type = type;
          //this.alertConfig.dismissible = true;
        }
      }]);
    }();
    UsersComponent.ctorParameters = function () {
      return [{
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]
      }, {
        type: _services_authentication_service__WEBPACK_IMPORTED_MODULE_4__["AuthenticationService"]
      }, {
        type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModal"]
      }, {
        type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbAlertConfig"]
      }];
    };
    UsersComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-users',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./users.component.html */"./node_modules/raw-loader/dist/cjs.js!./src/app/root/users/users.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./users.component.scss */"./src/app/root/users/users.component.scss"))["default"]]
    })], UsersComponent);

    /***/
  }),
  /***/"./src/environments/environment.ts": (
  /*!*****************************************!*\
    !*** ./src/environments/environment.ts ***!
    \*****************************************/
  /*! exports provided: environment */
  /***/
  function _src_environments_environmentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "environment", function () {
      return environment;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */"./node_modules/tslib/tslib.es6.js");
    // This file can be replaced during build by using the `fileReplacements` array.
    // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
    // The list of file replacements can be found in `angular.json`.

    var environment = {
      production: false,
      //  apiUrl: "http://10.3.2.93:8085",
      apiUrl: "http://localhost:8085",
      pageSize: 5
    };
    /*
     * For easier debugging in development mode, you can import the following file
     * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
     *
     * This import should be commented out in production mode because it will have a negative impact
     * on performance if an error is thrown.
     */
    // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

    /***/
  }),
  /***/"./src/main.ts": (
  /*!*********************!*\
    !*** ./src/main.ts ***!
    \*********************/
  /*! no exports provided */
  /***/
  function _src_mainTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */"./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */"./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */
    var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */"./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
    /* harmony import */
    var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */"./src/app/app.module.ts");
    /* harmony import */
    var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */"./src/environments/environment.ts");
    if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
      Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
    }
    Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])["catch"](function (err) {
      return console.error(err);
    });

    /***/
  }),
  /***/0: (
  /*!***************************!*\
    !*** multi ./src/main.ts ***!
    \***************************/
  /*! no static exports found */
  /***/
  function _(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(/*! C:\K\KNative\Fission\UI_Fission\src\main.ts */"./src/main.ts");

    /***/
  })
}, [[0, "runtime", "vendor"]]]);
//# sourceMappingURL=main-es5.js.map