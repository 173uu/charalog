function lh(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var qu = { exports: {} }, Bn = {};
var _m;
function nh() {
  if (_m) return Bn;
  _m = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), u = /* @__PURE__ */ Symbol.for("react.fragment");
  function r(c, m, p) {
    var g = null;
    if (p !== void 0 && (g = "" + p), m.key !== void 0 && (g = "" + m.key), "key" in m) {
      p = {};
      for (var M in m)
        M !== "key" && (p[M] = m[M]);
    } else p = m;
    return m = p.ref, {
      $$typeof: n,
      type: c,
      key: g,
      ref: m !== void 0 ? m : null,
      props: p
    };
  }
  return Bn.Fragment = u, Bn.jsx = r, Bn.jsxs = r, Bn;
}
var Sm;
function ih() {
  return Sm || (Sm = 1, qu.exports = nh()), qu.exports;
}
var f = ih(), Lu = { exports: {} }, P = {};
var Am;
function sh() {
  if (Am) return P;
  Am = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), u = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), c = /* @__PURE__ */ Symbol.for("react.strict_mode"), m = /* @__PURE__ */ Symbol.for("react.profiler"), p = /* @__PURE__ */ Symbol.for("react.consumer"), g = /* @__PURE__ */ Symbol.for("react.context"), M = /* @__PURE__ */ Symbol.for("react.forward_ref"), y = /* @__PURE__ */ Symbol.for("react.suspense"), h = /* @__PURE__ */ Symbol.for("react.memo"), D = /* @__PURE__ */ Symbol.for("react.lazy"), _ = /* @__PURE__ */ Symbol.for("react.activity"), A = Symbol.iterator;
  function x(S) {
    return S === null || typeof S != "object" ? null : (S = A && S[A] || S["@@iterator"], typeof S == "function" ? S : null);
  }
  var B = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, L = Object.assign, w = {};
  function Q(S, U, G) {
    this.props = S, this.context = U, this.refs = w, this.updater = G || B;
  }
  Q.prototype.isReactComponent = {}, Q.prototype.setState = function(S, U) {
    if (typeof S != "object" && typeof S != "function" && S != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, S, U, "setState");
  }, Q.prototype.forceUpdate = function(S) {
    this.updater.enqueueForceUpdate(this, S, "forceUpdate");
  };
  function ne() {
  }
  ne.prototype = Q.prototype;
  function F(S, U, G) {
    this.props = S, this.context = U, this.refs = w, this.updater = G || B;
  }
  var ie = F.prototype = new ne();
  ie.constructor = F, L(ie, Q.prototype), ie.isPureReactComponent = !0;
  var V = Array.isArray;
  function J() {
  }
  var Y = { H: null, A: null, T: null, S: null }, se = Object.prototype.hasOwnProperty;
  function me(S, U, G) {
    var Z = G.ref;
    return {
      $$typeof: n,
      type: S,
      key: U,
      ref: Z !== void 0 ? Z : null,
      props: G
    };
  }
  function et(S, U) {
    return me(S.type, U, S.props);
  }
  function $(S) {
    return typeof S == "object" && S !== null && S.$$typeof === n;
  }
  function Me(S) {
    var U = { "=": "=0", ":": "=2" };
    return "$" + S.replace(/[=:]/g, function(G) {
      return U[G];
    });
  }
  var Ie = /\/+/g;
  function at(S, U) {
    return typeof S == "object" && S !== null && S.key != null ? Me("" + S.key) : U.toString(36);
  }
  function mt(S) {
    switch (S.status) {
      case "fulfilled":
        return S.value;
      case "rejected":
        throw S.reason;
      default:
        switch (typeof S.status == "string" ? S.then(J, J) : (S.status = "pending", S.then(
          function(U) {
            S.status === "pending" && (S.status = "fulfilled", S.value = U);
          },
          function(U) {
            S.status === "pending" && (S.status = "rejected", S.reason = U);
          }
        )), S.status) {
          case "fulfilled":
            return S.value;
          case "rejected":
            throw S.reason;
        }
    }
    throw S;
  }
  function O(S, U, G, Z, ee) {
    var ce = typeof S;
    (ce === "undefined" || ce === "boolean") && (S = null);
    var ve = !1;
    if (S === null) ve = !0;
    else
      switch (ce) {
        case "bigint":
        case "string":
        case "number":
          ve = !0;
          break;
        case "object":
          switch (S.$$typeof) {
            case n:
            case u:
              ve = !0;
              break;
            case D:
              return ve = S._init, O(
                ve(S._payload),
                U,
                G,
                Z,
                ee
              );
          }
      }
    if (ve)
      return ee = ee(S), ve = Z === "" ? "." + at(S, 0) : Z, V(ee) ? (G = "", ve != null && (G = ve.replace(Ie, "$&/") + "/"), O(ee, U, G, "", function(Xl) {
        return Xl;
      })) : ee != null && ($(ee) && (ee = et(
        ee,
        G + (ee.key == null || S && S.key === ee.key ? "" : ("" + ee.key).replace(
          Ie,
          "$&/"
        ) + "/") + ve
      )), U.push(ee)), 1;
    ve = 0;
    var lt = Z === "" ? "." : Z + ":";
    if (V(S))
      for (var Be = 0; Be < S.length; Be++)
        Z = S[Be], ce = lt + at(Z, Be), ve += O(
          Z,
          U,
          G,
          ce,
          ee
        );
    else if (Be = x(S), typeof Be == "function")
      for (S = Be.call(S), Be = 0; !(Z = S.next()).done; )
        Z = Z.value, ce = lt + at(Z, Be++), ve += O(
          Z,
          U,
          G,
          ce,
          ee
        );
    else if (ce === "object") {
      if (typeof S.then == "function")
        return O(
          mt(S),
          U,
          G,
          Z,
          ee
        );
      throw U = String(S), Error(
        "Objects are not valid as a React child (found: " + (U === "[object Object]" ? "object with keys {" + Object.keys(S).join(", ") + "}" : U) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ve;
  }
  function q(S, U, G) {
    if (S == null) return S;
    var Z = [], ee = 0;
    return O(S, Z, "", "", function(ce) {
      return U.call(G, ce, ee++);
    }), Z;
  }
  function W(S) {
    if (S._status === -1) {
      var U = S._result;
      U = U(), U.then(
        function(G) {
          (S._status === 0 || S._status === -1) && (S._status = 1, S._result = G);
        },
        function(G) {
          (S._status === 0 || S._status === -1) && (S._status = 2, S._result = G);
        }
      ), S._status === -1 && (S._status = 0, S._result = U);
    }
    if (S._status === 1) return S._result.default;
    throw S._result;
  }
  var Se = typeof reportError == "function" ? reportError : function(S) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var U = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof S == "object" && S !== null && typeof S.message == "string" ? String(S.message) : String(S),
        error: S
      });
      if (!window.dispatchEvent(U)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", S);
      return;
    }
    console.error(S);
  }, Ee = {
    map: q,
    forEach: function(S, U, G) {
      q(
        S,
        function() {
          U.apply(this, arguments);
        },
        G
      );
    },
    count: function(S) {
      var U = 0;
      return q(S, function() {
        U++;
      }), U;
    },
    toArray: function(S) {
      return q(S, function(U) {
        return U;
      }) || [];
    },
    only: function(S) {
      if (!$(S))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return S;
    }
  };
  return P.Activity = _, P.Children = Ee, P.Component = Q, P.Fragment = r, P.Profiler = m, P.PureComponent = F, P.StrictMode = c, P.Suspense = y, P.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Y, P.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(S) {
      return Y.H.useMemoCache(S);
    }
  }, P.cache = function(S) {
    return function() {
      return S.apply(null, arguments);
    };
  }, P.cacheSignal = function() {
    return null;
  }, P.cloneElement = function(S, U, G) {
    if (S == null)
      throw Error(
        "The argument must be a React element, but you passed " + S + "."
      );
    var Z = L({}, S.props), ee = S.key;
    if (U != null)
      for (ce in U.key !== void 0 && (ee = "" + U.key), U)
        !se.call(U, ce) || ce === "key" || ce === "__self" || ce === "__source" || ce === "ref" && U.ref === void 0 || (Z[ce] = U[ce]);
    var ce = arguments.length - 2;
    if (ce === 1) Z.children = G;
    else if (1 < ce) {
      for (var ve = Array(ce), lt = 0; lt < ce; lt++)
        ve[lt] = arguments[lt + 2];
      Z.children = ve;
    }
    return me(S.type, ee, Z);
  }, P.createContext = function(S) {
    return S = {
      $$typeof: g,
      _currentValue: S,
      _currentValue2: S,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, S.Provider = S, S.Consumer = {
      $$typeof: p,
      _context: S
    }, S;
  }, P.createElement = function(S, U, G) {
    var Z, ee = {}, ce = null;
    if (U != null)
      for (Z in U.key !== void 0 && (ce = "" + U.key), U)
        se.call(U, Z) && Z !== "key" && Z !== "__self" && Z !== "__source" && (ee[Z] = U[Z]);
    var ve = arguments.length - 2;
    if (ve === 1) ee.children = G;
    else if (1 < ve) {
      for (var lt = Array(ve), Be = 0; Be < ve; Be++)
        lt[Be] = arguments[Be + 2];
      ee.children = lt;
    }
    if (S && S.defaultProps)
      for (Z in ve = S.defaultProps, ve)
        ee[Z] === void 0 && (ee[Z] = ve[Z]);
    return me(S, ce, ee);
  }, P.createRef = function() {
    return { current: null };
  }, P.forwardRef = function(S) {
    return { $$typeof: M, render: S };
  }, P.isValidElement = $, P.lazy = function(S) {
    return {
      $$typeof: D,
      _payload: { _status: -1, _result: S },
      _init: W
    };
  }, P.memo = function(S, U) {
    return {
      $$typeof: h,
      type: S,
      compare: U === void 0 ? null : U
    };
  }, P.startTransition = function(S) {
    var U = Y.T, G = {};
    Y.T = G;
    try {
      var Z = S(), ee = Y.S;
      ee !== null && ee(G, Z), typeof Z == "object" && Z !== null && typeof Z.then == "function" && Z.then(J, Se);
    } catch (ce) {
      Se(ce);
    } finally {
      U !== null && G.types !== null && (U.types = G.types), Y.T = U;
    }
  }, P.unstable_useCacheRefresh = function() {
    return Y.H.useCacheRefresh();
  }, P.use = function(S) {
    return Y.H.use(S);
  }, P.useActionState = function(S, U, G) {
    return Y.H.useActionState(S, U, G);
  }, P.useCallback = function(S, U) {
    return Y.H.useCallback(S, U);
  }, P.useContext = function(S) {
    return Y.H.useContext(S);
  }, P.useDebugValue = function() {
  }, P.useDeferredValue = function(S, U) {
    return Y.H.useDeferredValue(S, U);
  }, P.useEffect = function(S, U) {
    return Y.H.useEffect(S, U);
  }, P.useEffectEvent = function(S) {
    return Y.H.useEffectEvent(S);
  }, P.useId = function() {
    return Y.H.useId();
  }, P.useImperativeHandle = function(S, U, G) {
    return Y.H.useImperativeHandle(S, U, G);
  }, P.useInsertionEffect = function(S, U) {
    return Y.H.useInsertionEffect(S, U);
  }, P.useLayoutEffect = function(S, U) {
    return Y.H.useLayoutEffect(S, U);
  }, P.useMemo = function(S, U) {
    return Y.H.useMemo(S, U);
  }, P.useOptimistic = function(S, U) {
    return Y.H.useOptimistic(S, U);
  }, P.useReducer = function(S, U, G) {
    return Y.H.useReducer(S, U, G);
  }, P.useRef = function(S) {
    return Y.H.useRef(S);
  }, P.useState = function(S) {
    return Y.H.useState(S);
  }, P.useSyncExternalStore = function(S, U, G) {
    return Y.H.useSyncExternalStore(
      S,
      U,
      G
    );
  }, P.useTransition = function() {
    return Y.H.useTransition();
  }, P.version = "19.2.5", P;
}
var xm;
function cr() {
  return xm || (xm = 1, Lu.exports = sh()), Lu.exports;
}
var ae = cr();
const ch = /* @__PURE__ */ lh(ae);
var Gu = { exports: {} }, wn = {}, Yu = { exports: {} }, Xu = {};
var Tm;
function uh() {
  return Tm || (Tm = 1, (function(n) {
    function u(O, q) {
      var W = O.length;
      O.push(q);
      e: for (; 0 < W; ) {
        var Se = W - 1 >>> 1, Ee = O[Se];
        if (0 < m(Ee, q))
          O[Se] = q, O[W] = Ee, W = Se;
        else break e;
      }
    }
    function r(O) {
      return O.length === 0 ? null : O[0];
    }
    function c(O) {
      if (O.length === 0) return null;
      var q = O[0], W = O.pop();
      if (W !== q) {
        O[0] = W;
        e: for (var Se = 0, Ee = O.length, S = Ee >>> 1; Se < S; ) {
          var U = 2 * (Se + 1) - 1, G = O[U], Z = U + 1, ee = O[Z];
          if (0 > m(G, W))
            Z < Ee && 0 > m(ee, G) ? (O[Se] = ee, O[Z] = W, Se = Z) : (O[Se] = G, O[U] = W, Se = U);
          else if (Z < Ee && 0 > m(ee, W))
            O[Se] = ee, O[Z] = W, Se = Z;
          else break e;
        }
      }
      return q;
    }
    function m(O, q) {
      var W = O.sortIndex - q.sortIndex;
      return W !== 0 ? W : O.id - q.id;
    }
    if (n.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var p = performance;
      n.unstable_now = function() {
        return p.now();
      };
    } else {
      var g = Date, M = g.now();
      n.unstable_now = function() {
        return g.now() - M;
      };
    }
    var y = [], h = [], D = 1, _ = null, A = 3, x = !1, B = !1, L = !1, w = !1, Q = typeof setTimeout == "function" ? setTimeout : null, ne = typeof clearTimeout == "function" ? clearTimeout : null, F = typeof setImmediate < "u" ? setImmediate : null;
    function ie(O) {
      for (var q = r(h); q !== null; ) {
        if (q.callback === null) c(h);
        else if (q.startTime <= O)
          c(h), q.sortIndex = q.expirationTime, u(y, q);
        else break;
        q = r(h);
      }
    }
    function V(O) {
      if (L = !1, ie(O), !B)
        if (r(y) !== null)
          B = !0, J || (J = !0, Me());
        else {
          var q = r(h);
          q !== null && mt(V, q.startTime - O);
        }
    }
    var J = !1, Y = -1, se = 5, me = -1;
    function et() {
      return w ? !0 : !(n.unstable_now() - me < se);
    }
    function $() {
      if (w = !1, J) {
        var O = n.unstable_now();
        me = O;
        var q = !0;
        try {
          e: {
            B = !1, L && (L = !1, ne(Y), Y = -1), x = !0;
            var W = A;
            try {
              t: {
                for (ie(O), _ = r(y); _ !== null && !(_.expirationTime > O && et()); ) {
                  var Se = _.callback;
                  if (typeof Se == "function") {
                    _.callback = null, A = _.priorityLevel;
                    var Ee = Se(
                      _.expirationTime <= O
                    );
                    if (O = n.unstable_now(), typeof Ee == "function") {
                      _.callback = Ee, ie(O), q = !0;
                      break t;
                    }
                    _ === r(y) && c(y), ie(O);
                  } else c(y);
                  _ = r(y);
                }
                if (_ !== null) q = !0;
                else {
                  var S = r(h);
                  S !== null && mt(
                    V,
                    S.startTime - O
                  ), q = !1;
                }
              }
              break e;
            } finally {
              _ = null, A = W, x = !1;
            }
            q = void 0;
          }
        } finally {
          q ? Me() : J = !1;
        }
      }
    }
    var Me;
    if (typeof F == "function")
      Me = function() {
        F($);
      };
    else if (typeof MessageChannel < "u") {
      var Ie = new MessageChannel(), at = Ie.port2;
      Ie.port1.onmessage = $, Me = function() {
        at.postMessage(null);
      };
    } else
      Me = function() {
        Q($, 0);
      };
    function mt(O, q) {
      Y = Q(function() {
        O(n.unstable_now());
      }, q);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(O) {
      O.callback = null;
    }, n.unstable_forceFrameRate = function(O) {
      0 > O || 125 < O ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : se = 0 < O ? Math.floor(1e3 / O) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return A;
    }, n.unstable_next = function(O) {
      switch (A) {
        case 1:
        case 2:
        case 3:
          var q = 3;
          break;
        default:
          q = A;
      }
      var W = A;
      A = q;
      try {
        return O();
      } finally {
        A = W;
      }
    }, n.unstable_requestPaint = function() {
      w = !0;
    }, n.unstable_runWithPriority = function(O, q) {
      switch (O) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          O = 3;
      }
      var W = A;
      A = O;
      try {
        return q();
      } finally {
        A = W;
      }
    }, n.unstable_scheduleCallback = function(O, q, W) {
      var Se = n.unstable_now();
      switch (typeof W == "object" && W !== null ? (W = W.delay, W = typeof W == "number" && 0 < W ? Se + W : Se) : W = Se, O) {
        case 1:
          var Ee = -1;
          break;
        case 2:
          Ee = 250;
          break;
        case 5:
          Ee = 1073741823;
          break;
        case 4:
          Ee = 1e4;
          break;
        default:
          Ee = 5e3;
      }
      return Ee = W + Ee, O = {
        id: D++,
        callback: q,
        priorityLevel: O,
        startTime: W,
        expirationTime: Ee,
        sortIndex: -1
      }, W > Se ? (O.sortIndex = W, u(h, O), r(y) === null && O === r(h) && (L ? (ne(Y), Y = -1) : L = !0, mt(V, W - Se))) : (O.sortIndex = Ee, u(y, O), B || x || (B = !0, J || (J = !0, Me()))), O;
    }, n.unstable_shouldYield = et, n.unstable_wrapCallback = function(O) {
      var q = A;
      return function() {
        var W = A;
        A = q;
        try {
          return O.apply(this, arguments);
        } finally {
          A = W;
        }
      };
    };
  })(Xu)), Xu;
}
var Mm;
function rh() {
  return Mm || (Mm = 1, Yu.exports = uh()), Yu.exports;
}
var Qu = { exports: {} }, tt = {};
var Em;
function oh() {
  if (Em) return tt;
  Em = 1;
  var n = cr();
  function u(y) {
    var h = "https://react.dev/errors/" + y;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var D = 2; D < arguments.length; D++)
        h += "&args[]=" + encodeURIComponent(arguments[D]);
    }
    return "Minified React error #" + y + "; visit " + h + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r() {
  }
  var c = {
    d: {
      f: r,
      r: function() {
        throw Error(u(522));
      },
      D: r,
      C: r,
      L: r,
      m: r,
      X: r,
      S: r,
      M: r
    },
    p: 0,
    findDOMNode: null
  }, m = /* @__PURE__ */ Symbol.for("react.portal");
  function p(y, h, D) {
    var _ = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: m,
      key: _ == null ? null : "" + _,
      children: y,
      containerInfo: h,
      implementation: D
    };
  }
  var g = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function M(y, h) {
    if (y === "font") return "";
    if (typeof h == "string")
      return h === "use-credentials" ? h : "";
  }
  return tt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = c, tt.createPortal = function(y, h) {
    var D = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
      throw Error(u(299));
    return p(y, h, null, D);
  }, tt.flushSync = function(y) {
    var h = g.T, D = c.p;
    try {
      if (g.T = null, c.p = 2, y) return y();
    } finally {
      g.T = h, c.p = D, c.d.f();
    }
  }, tt.preconnect = function(y, h) {
    typeof y == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, c.d.C(y, h));
  }, tt.prefetchDNS = function(y) {
    typeof y == "string" && c.d.D(y);
  }, tt.preinit = function(y, h) {
    if (typeof y == "string" && h && typeof h.as == "string") {
      var D = h.as, _ = M(D, h.crossOrigin), A = typeof h.integrity == "string" ? h.integrity : void 0, x = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
      D === "style" ? c.d.S(
        y,
        typeof h.precedence == "string" ? h.precedence : void 0,
        {
          crossOrigin: _,
          integrity: A,
          fetchPriority: x
        }
      ) : D === "script" && c.d.X(y, {
        crossOrigin: _,
        integrity: A,
        fetchPriority: x,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0
      });
    }
  }, tt.preinitModule = function(y, h) {
    if (typeof y == "string")
      if (typeof h == "object" && h !== null) {
        if (h.as == null || h.as === "script") {
          var D = M(
            h.as,
            h.crossOrigin
          );
          c.d.M(y, {
            crossOrigin: D,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
            nonce: typeof h.nonce == "string" ? h.nonce : void 0
          });
        }
      } else h == null && c.d.M(y);
  }, tt.preload = function(y, h) {
    if (typeof y == "string" && typeof h == "object" && h !== null && typeof h.as == "string") {
      var D = h.as, _ = M(D, h.crossOrigin);
      c.d.L(y, D, {
        crossOrigin: _,
        integrity: typeof h.integrity == "string" ? h.integrity : void 0,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0,
        type: typeof h.type == "string" ? h.type : void 0,
        fetchPriority: typeof h.fetchPriority == "string" ? h.fetchPriority : void 0,
        referrerPolicy: typeof h.referrerPolicy == "string" ? h.referrerPolicy : void 0,
        imageSrcSet: typeof h.imageSrcSet == "string" ? h.imageSrcSet : void 0,
        imageSizes: typeof h.imageSizes == "string" ? h.imageSizes : void 0,
        media: typeof h.media == "string" ? h.media : void 0
      });
    }
  }, tt.preloadModule = function(y, h) {
    if (typeof y == "string")
      if (h) {
        var D = M(h.as, h.crossOrigin);
        c.d.m(y, {
          as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
          crossOrigin: D,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0
        });
      } else c.d.m(y);
  }, tt.requestFormReset = function(y) {
    c.d.r(y);
  }, tt.unstable_batchedUpdates = function(y, h) {
    return y(h);
  }, tt.useFormState = function(y, h, D) {
    return g.H.useFormState(y, h, D);
  }, tt.useFormStatus = function() {
    return g.H.useHostTransitionStatus();
  }, tt.version = "19.2.5", tt;
}
var Cm;
function fh() {
  if (Cm) return Qu.exports;
  Cm = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (u) {
        console.error(u);
      }
  }
  return n(), Qu.exports = oh(), Qu.exports;
}
var zm;
function dh() {
  if (zm) return wn;
  zm = 1;
  var n = rh(), u = cr(), r = fh();
  function c(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        t += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function m(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function p(e) {
    var t = e, a = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (a = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? a : null;
  }
  function g(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function M(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function y(e) {
    if (p(e) !== e)
      throw Error(c(188));
  }
  function h(e) {
    var t = e.alternate;
    if (!t) {
      if (t = p(e), t === null) throw Error(c(188));
      return t !== e ? null : e;
    }
    for (var a = e, l = t; ; ) {
      var i = a.return;
      if (i === null) break;
      var s = i.alternate;
      if (s === null) {
        if (l = i.return, l !== null) {
          a = l;
          continue;
        }
        break;
      }
      if (i.child === s.child) {
        for (s = i.child; s; ) {
          if (s === a) return y(i), e;
          if (s === l) return y(i), t;
          s = s.sibling;
        }
        throw Error(c(188));
      }
      if (a.return !== l.return) a = i, l = s;
      else {
        for (var o = !1, d = i.child; d; ) {
          if (d === a) {
            o = !0, a = i, l = s;
            break;
          }
          if (d === l) {
            o = !0, l = i, a = s;
            break;
          }
          d = d.sibling;
        }
        if (!o) {
          for (d = s.child; d; ) {
            if (d === a) {
              o = !0, a = s, l = i;
              break;
            }
            if (d === l) {
              o = !0, l = s, a = i;
              break;
            }
            d = d.sibling;
          }
          if (!o) throw Error(c(189));
        }
      }
      if (a.alternate !== l) throw Error(c(190));
    }
    if (a.tag !== 3) throw Error(c(188));
    return a.stateNode.current === a ? e : t;
  }
  function D(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = D(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var _ = Object.assign, A = /* @__PURE__ */ Symbol.for("react.element"), x = /* @__PURE__ */ Symbol.for("react.transitional.element"), B = /* @__PURE__ */ Symbol.for("react.portal"), L = /* @__PURE__ */ Symbol.for("react.fragment"), w = /* @__PURE__ */ Symbol.for("react.strict_mode"), Q = /* @__PURE__ */ Symbol.for("react.profiler"), ne = /* @__PURE__ */ Symbol.for("react.consumer"), F = /* @__PURE__ */ Symbol.for("react.context"), ie = /* @__PURE__ */ Symbol.for("react.forward_ref"), V = /* @__PURE__ */ Symbol.for("react.suspense"), J = /* @__PURE__ */ Symbol.for("react.suspense_list"), Y = /* @__PURE__ */ Symbol.for("react.memo"), se = /* @__PURE__ */ Symbol.for("react.lazy"), me = /* @__PURE__ */ Symbol.for("react.activity"), et = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), $ = Symbol.iterator;
  function Me(e) {
    return e === null || typeof e != "object" ? null : (e = $ && e[$] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Ie = /* @__PURE__ */ Symbol.for("react.client.reference");
  function at(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Ie ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case L:
        return "Fragment";
      case Q:
        return "Profiler";
      case w:
        return "StrictMode";
      case V:
        return "Suspense";
      case J:
        return "SuspenseList";
      case me:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case B:
          return "Portal";
        case F:
          return e.displayName || "Context";
        case ne:
          return (e._context.displayName || "Context") + ".Consumer";
        case ie:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case Y:
          return t = e.displayName || null, t !== null ? t : at(e.type) || "Memo";
        case se:
          t = e._payload, e = e._init;
          try {
            return at(e(t));
          } catch {
          }
      }
    return null;
  }
  var mt = Array.isArray, O = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, q = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, W = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Se = [], Ee = -1;
  function S(e) {
    return { current: e };
  }
  function U(e) {
    0 > Ee || (e.current = Se[Ee], Se[Ee] = null, Ee--);
  }
  function G(e, t) {
    Ee++, Se[Ee] = e.current, e.current = t;
  }
  var Z = S(null), ee = S(null), ce = S(null), ve = S(null);
  function lt(e, t) {
    switch (G(ce, t), G(ee, e), G(Z, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Qd(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Qd(t), e = Zd(t, e);
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    U(Z), G(Z, e);
  }
  function Be() {
    U(Z), U(ee), U(ce);
  }
  function Xl(e) {
    e.memoizedState !== null && G(ve, e);
    var t = Z.current, a = Zd(t, e.type);
    t !== a && (G(ee, e), G(Z, a));
  }
  function Vn(e) {
    ee.current === e && (U(Z), U(ee)), ve.current === e && (U(ve), Dn._currentValue = W);
  }
  var _s, hr;
  function Ha(e) {
    if (_s === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        _s = t && t[1] || "", hr = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + _s + e + hr;
  }
  var Ss = !1;
  function As(e, t) {
    if (!e || Ss) return "";
    Ss = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var H = function() {
                throw Error();
              };
              if (Object.defineProperty(H.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(H, []);
                } catch (j) {
                  var z = j;
                }
                Reflect.construct(e, [], H);
              } else {
                try {
                  H.call();
                } catch (j) {
                  z = j;
                }
                e.call(H.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (j) {
                z = j;
              }
              (H = e()) && typeof H.catch == "function" && H.catch(function() {
              });
            }
          } catch (j) {
            if (j && z && typeof j.stack == "string")
              return [j.stack, z.stack];
          }
          return [null, null];
        }
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var i = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name"
      );
      i && i.configurable && Object.defineProperty(
        l.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var s = l.DetermineComponentFrameRoot(), o = s[0], d = s[1];
      if (o && d) {
        var v = o.split(`
`), C = d.split(`
`);
        for (i = l = 0; l < v.length && !v[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; i < C.length && !C[i].includes(
          "DetermineComponentFrameRoot"
        ); )
          i++;
        if (l === v.length || i === C.length)
          for (l = v.length - 1, i = C.length - 1; 1 <= l && 0 <= i && v[l] !== C[i]; )
            i--;
        for (; 1 <= l && 0 <= i; l--, i--)
          if (v[l] !== C[i]) {
            if (l !== 1 || i !== 1)
              do
                if (l--, i--, 0 > i || v[l] !== C[i]) {
                  var N = `
` + v[l].replace(" at new ", " at ");
                  return e.displayName && N.includes("<anonymous>") && (N = N.replace("<anonymous>", e.displayName)), N;
                }
              while (1 <= l && 0 <= i);
            break;
          }
      }
    } finally {
      Ss = !1, Error.prepareStackTrace = a;
    }
    return (a = e ? e.displayName || e.name : "") ? Ha(a) : "";
  }
  function Hp(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ha(e.type);
      case 16:
        return Ha("Lazy");
      case 13:
        return e.child !== t && t !== null ? Ha("Suspense Fallback") : Ha("Suspense");
      case 19:
        return Ha("SuspenseList");
      case 0:
      case 15:
        return As(e.type, !1);
      case 11:
        return As(e.type.render, !1);
      case 1:
        return As(e.type, !0);
      case 31:
        return Ha("Activity");
      default:
        return "";
    }
  }
  function vr(e) {
    try {
      var t = "", a = null;
      do
        t += Hp(e, a), a = e, e = e.return;
      while (e);
      return t;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var xs = Object.prototype.hasOwnProperty, Ts = n.unstable_scheduleCallback, Ms = n.unstable_cancelCallback, Up = n.unstable_shouldYield, Bp = n.unstable_requestPaint, pt = n.unstable_now, wp = n.unstable_getCurrentPriorityLevel, br = n.unstable_ImmediatePriority, _r = n.unstable_UserBlockingPriority, Kn = n.unstable_NormalPriority, qp = n.unstable_LowPriority, Sr = n.unstable_IdlePriority, Lp = n.log, Gp = n.unstable_setDisableYieldValue, Ql = null, yt = null;
  function ca(e) {
    if (typeof Lp == "function" && Gp(e), yt && typeof yt.setStrictMode == "function")
      try {
        yt.setStrictMode(Ql, e);
      } catch {
      }
  }
  var gt = Math.clz32 ? Math.clz32 : Qp, Yp = Math.log, Xp = Math.LN2;
  function Qp(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Yp(e) / Xp | 0) | 0;
  }
  var Jn = 256, In = 262144, kn = 4194304;
  function Ua(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function $n(e, t, a) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var i = 0, s = e.suspendedLanes, o = e.pingedLanes;
    e = e.warmLanes;
    var d = l & 134217727;
    return d !== 0 ? (l = d & ~s, l !== 0 ? i = Ua(l) : (o &= d, o !== 0 ? i = Ua(o) : a || (a = d & ~e, a !== 0 && (i = Ua(a))))) : (d = l & ~s, d !== 0 ? i = Ua(d) : o !== 0 ? i = Ua(o) : a || (a = l & ~e, a !== 0 && (i = Ua(a)))), i === 0 ? 0 : t !== 0 && t !== i && (t & s) === 0 && (s = i & -i, a = t & -t, s >= a || s === 32 && (a & 4194048) !== 0) ? t : i;
  }
  function Zl(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Zp(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Ar() {
    var e = kn;
    return kn <<= 1, (kn & 62914560) === 0 && (kn = 4194304), e;
  }
  function Es(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function Vl(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Vp(e, t, a, l, i, s) {
    var o = e.pendingLanes;
    e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
    var d = e.entanglements, v = e.expirationTimes, C = e.hiddenUpdates;
    for (a = o & ~a; 0 < a; ) {
      var N = 31 - gt(a), H = 1 << N;
      d[N] = 0, v[N] = -1;
      var z = C[N];
      if (z !== null)
        for (C[N] = null, N = 0; N < z.length; N++) {
          var j = z[N];
          j !== null && (j.lane &= -536870913);
        }
      a &= ~H;
    }
    l !== 0 && xr(e, l, 0), s !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= s & ~(o & ~t));
  }
  function xr(e, t, a) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var l = 31 - gt(t);
    e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | a & 261930;
  }
  function Tr(e, t) {
    var a = e.entangledLanes |= t;
    for (e = e.entanglements; a; ) {
      var l = 31 - gt(a), i = 1 << l;
      i & t | e[l] & t && (e[l] |= t), a &= ~i;
    }
  }
  function Mr(e, t) {
    var a = t & -t;
    return a = (a & 42) !== 0 ? 1 : Cs(a), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a;
  }
  function Cs(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function zs(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Er() {
    var e = q.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : mm(e.type));
  }
  function Cr(e, t) {
    var a = q.p;
    try {
      return q.p = e, t();
    } finally {
      q.p = a;
    }
  }
  var ua = Math.random().toString(36).slice(2), ke = "__reactFiber$" + ua, st = "__reactProps$" + ua, tl = "__reactContainer$" + ua, js = "__reactEvents$" + ua, Kp = "__reactListeners$" + ua, Jp = "__reactHandles$" + ua, zr = "__reactResources$" + ua, Kl = "__reactMarker$" + ua;
  function Ns(e) {
    delete e[ke], delete e[st], delete e[js], delete e[Kp], delete e[Jp];
  }
  function al(e) {
    var t = e[ke];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if (t = a[tl] || a[ke]) {
        if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
          for (e = Wd(e); e !== null; ) {
            if (a = e[ke]) return a;
            e = Wd(e);
          }
        return t;
      }
      e = a, a = e.parentNode;
    }
    return null;
  }
  function ll(e) {
    if (e = e[ke] || e[tl]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Jl(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(c(33));
  }
  function nl(e) {
    var t = e[zr];
    return t || (t = e[zr] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Ve(e) {
    e[Kl] = !0;
  }
  var jr = /* @__PURE__ */ new Set(), Nr = {};
  function Ba(e, t) {
    il(e, t), il(e + "Capture", t);
  }
  function il(e, t) {
    for (Nr[e] = t, e = 0; e < t.length; e++)
      jr.add(t[e]);
  }
  var Ip = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Or = {}, Dr = {};
  function kp(e) {
    return xs.call(Dr, e) ? !0 : xs.call(Or, e) ? !1 : Ip.test(e) ? Dr[e] = !0 : (Or[e] = !0, !1);
  }
  function Wn(e, t, a) {
    if (kp(t))
      if (a === null) e.removeAttribute(t);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var l = t.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + a);
      }
  }
  function Fn(e, t, a) {
    if (a === null) e.removeAttribute(t);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + a);
    }
  }
  function Xt(e, t, a, l) {
    if (l === null) e.removeAttribute(a);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(a);
          return;
      }
      e.setAttributeNS(t, a, "" + l);
    }
  }
  function Tt(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Rr(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function $p(e, t, a) {
    var l = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var i = l.get, s = l.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return i.call(this);
        },
        set: function(o) {
          a = "" + o, s.call(this, o);
        }
      }), Object.defineProperty(e, t, {
        enumerable: l.enumerable
      }), {
        getValue: function() {
          return a;
        },
        setValue: function(o) {
          a = "" + o;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function Os(e) {
    if (!e._valueTracker) {
      var t = Rr(e) ? "checked" : "value";
      e._valueTracker = $p(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function Hr(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(), l = "";
    return e && (l = Rr(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== a ? (t.setValue(e), !0) : !1;
  }
  function Pn(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Wp = /[\n"\\]/g;
  function Mt(e) {
    return e.replace(
      Wp,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ds(e, t, a, l, i, s, o, d) {
    e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t != null ? o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Tt(t)) : e.value !== "" + Tt(t) && (e.value = "" + Tt(t)) : o !== "submit" && o !== "reset" || e.removeAttribute("value"), t != null ? Rs(e, o, Tt(t)) : a != null ? Rs(e, o, Tt(a)) : l != null && e.removeAttribute("value"), i == null && s != null && (e.defaultChecked = !!s), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? e.name = "" + Tt(d) : e.removeAttribute("name");
  }
  function Ur(e, t, a, l, i, s, o, d) {
    if (s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (e.type = s), t != null || a != null) {
      if (!(s !== "submit" && s !== "reset" || t != null)) {
        Os(e);
        return;
      }
      a = a != null ? "" + Tt(a) : "", t = t != null ? "" + Tt(t) : a, d || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? i, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = d ? e.checked : !!l, e.defaultChecked = !!l, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Os(e);
  }
  function Rs(e, t, a) {
    t === "number" && Pn(e.ownerDocument) === e || e.defaultValue === "" + a || (e.defaultValue = "" + a);
  }
  function sl(e, t, a, l) {
    if (e = e.options, t) {
      t = {};
      for (var i = 0; i < a.length; i++)
        t["$" + a[i]] = !0;
      for (a = 0; a < e.length; a++)
        i = t.hasOwnProperty("$" + e[a].value), e[a].selected !== i && (e[a].selected = i), i && l && (e[a].defaultSelected = !0);
    } else {
      for (a = "" + Tt(a), t = null, i = 0; i < e.length; i++) {
        if (e[i].value === a) {
          e[i].selected = !0, l && (e[i].defaultSelected = !0);
          return;
        }
        t !== null || e[i].disabled || (t = e[i]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Br(e, t, a) {
    if (t != null && (t = "" + Tt(t), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? "" + Tt(a) : "";
  }
  function wr(e, t, a, l) {
    if (t == null) {
      if (l != null) {
        if (a != null) throw Error(c(92));
        if (mt(l)) {
          if (1 < l.length) throw Error(c(93));
          l = l[0];
        }
        a = l;
      }
      a == null && (a = ""), t = a;
    }
    a = Tt(t), e.defaultValue = a, l = e.textContent, l === a && l !== "" && l !== null && (e.value = l), Os(e);
  }
  function cl(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Fp = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function qr(e, t, a) {
    var l = t.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, a) : typeof a != "number" || a === 0 || Fp.has(t) ? t === "float" ? e.cssFloat = a : e[t] = ("" + a).trim() : e[t] = a + "px";
  }
  function Lr(e, t, a) {
    if (t != null && typeof t != "object")
      throw Error(c(62));
    if (e = e.style, a != null) {
      for (var l in a)
        !a.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var i in t)
        l = t[i], t.hasOwnProperty(i) && a[i] !== l && qr(e, i, l);
    } else
      for (var s in t)
        t.hasOwnProperty(s) && qr(e, s, t[s]);
  }
  function Hs(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Pp = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), ey = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function ei(e) {
    return ey.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Qt() {
  }
  var Us = null;
  function Bs(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var ul = null, rl = null;
  function Gr(e) {
    var t = ll(e);
    if (t && (e = t.stateNode)) {
      var a = e[st] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Ds(
            e,
            a.value,
            a.defaultValue,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name
          ), t = a.name, a.type === "radio" && t != null) {
            for (a = e; a.parentNode; ) a = a.parentNode;
            for (a = a.querySelectorAll(
              'input[name="' + Mt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < a.length; t++) {
              var l = a[t];
              if (l !== e && l.form === e.form) {
                var i = l[st] || null;
                if (!i) throw Error(c(90));
                Ds(
                  l,
                  i.value,
                  i.defaultValue,
                  i.defaultValue,
                  i.checked,
                  i.defaultChecked,
                  i.type,
                  i.name
                );
              }
            }
            for (t = 0; t < a.length; t++)
              l = a[t], l.form === e.form && Hr(l);
          }
          break e;
        case "textarea":
          Br(e, a.value, a.defaultValue);
          break e;
        case "select":
          t = a.value, t != null && sl(e, !!a.multiple, t, !1);
      }
    }
  }
  var ws = !1;
  function Yr(e, t, a) {
    if (ws) return e(t, a);
    ws = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (ws = !1, (ul !== null || rl !== null) && (Yi(), ul && (t = ul, e = rl, rl = ul = null, Gr(t), e)))
        for (t = 0; t < e.length; t++) Gr(e[t]);
    }
  }
  function Il(e, t) {
    var a = e.stateNode;
    if (a === null) return null;
    var l = a[st] || null;
    if (l === null) return null;
    a = l[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (l = !l.disabled) || (e = e.type, l = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !l;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (a && typeof a != "function")
      throw Error(
        c(231, t, typeof a)
      );
    return a;
  }
  var Zt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), qs = !1;
  if (Zt)
    try {
      var kl = {};
      Object.defineProperty(kl, "passive", {
        get: function() {
          qs = !0;
        }
      }), window.addEventListener("test", kl, kl), window.removeEventListener("test", kl, kl);
    } catch {
      qs = !1;
    }
  var ra = null, Ls = null, ti = null;
  function Xr() {
    if (ti) return ti;
    var e, t = Ls, a = t.length, l, i = "value" in ra ? ra.value : ra.textContent, s = i.length;
    for (e = 0; e < a && t[e] === i[e]; e++) ;
    var o = a - e;
    for (l = 1; l <= o && t[a - l] === i[s - l]; l++) ;
    return ti = i.slice(e, 1 < l ? 1 - l : void 0);
  }
  function ai(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function li() {
    return !0;
  }
  function Qr() {
    return !1;
  }
  function ct(e) {
    function t(a, l, i, s, o) {
      this._reactName = a, this._targetInst = i, this.type = l, this.nativeEvent = s, this.target = o, this.currentTarget = null;
      for (var d in e)
        e.hasOwnProperty(d) && (a = e[d], this[d] = a ? a(s) : s[d]);
      return this.isDefaultPrevented = (s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1) ? li : Qr, this.isPropagationStopped = Qr, this;
    }
    return _(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var a = this.nativeEvent;
        a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = li);
      },
      stopPropagation: function() {
        var a = this.nativeEvent;
        a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = li);
      },
      persist: function() {
      },
      isPersistent: li
    }), t;
  }
  var wa = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, ni = ct(wa), $l = _({}, wa, { view: 0, detail: 0 }), ty = ct($l), Gs, Ys, Wl, ii = _({}, $l, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Qs,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Wl && (Wl && e.type === "mousemove" ? (Gs = e.screenX - Wl.screenX, Ys = e.screenY - Wl.screenY) : Ys = Gs = 0, Wl = e), Gs);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Ys;
    }
  }), Zr = ct(ii), ay = _({}, ii, { dataTransfer: 0 }), ly = ct(ay), ny = _({}, $l, { relatedTarget: 0 }), Xs = ct(ny), iy = _({}, wa, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), sy = ct(iy), cy = _({}, wa, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), uy = ct(cy), ry = _({}, wa, { data: 0 }), Vr = ct(ry), oy = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, fy = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, dy = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function my(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = dy[e]) ? !!t[e] : !1;
  }
  function Qs() {
    return my;
  }
  var py = _({}, $l, {
    key: function(e) {
      if (e.key) {
        var t = oy[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = ai(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? fy[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Qs,
    charCode: function(e) {
      return e.type === "keypress" ? ai(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? ai(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), yy = ct(py), gy = _({}, ii, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), Kr = ct(gy), hy = _({}, $l, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Qs
  }), vy = ct(hy), by = _({}, wa, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), _y = ct(by), Sy = _({}, ii, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Ay = ct(Sy), xy = _({}, wa, {
    newState: 0,
    oldState: 0
  }), Ty = ct(xy), My = [9, 13, 27, 32], Zs = Zt && "CompositionEvent" in window, Fl = null;
  Zt && "documentMode" in document && (Fl = document.documentMode);
  var Ey = Zt && "TextEvent" in window && !Fl, Jr = Zt && (!Zs || Fl && 8 < Fl && 11 >= Fl), Ir = " ", kr = !1;
  function $r(e, t) {
    switch (e) {
      case "keyup":
        return My.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Wr(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var ol = !1;
  function Cy(e, t) {
    switch (e) {
      case "compositionend":
        return Wr(t);
      case "keypress":
        return t.which !== 32 ? null : (kr = !0, Ir);
      case "textInput":
        return e = t.data, e === Ir && kr ? null : e;
      default:
        return null;
    }
  }
  function zy(e, t) {
    if (ol)
      return e === "compositionend" || !Zs && $r(e, t) ? (e = Xr(), ti = Ls = ra = null, ol = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length)
            return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Jr && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var jy = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function Fr(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!jy[e.type] : t === "textarea";
  }
  function Pr(e, t, a, l) {
    ul ? rl ? rl.push(l) : rl = [l] : ul = l, t = Ii(t, "onChange"), 0 < t.length && (a = new ni(
      "onChange",
      "change",
      null,
      a,
      l
    ), e.push({ event: a, listeners: t }));
  }
  var Pl = null, en = null;
  function Ny(e) {
    wd(e, 0);
  }
  function si(e) {
    var t = Jl(e);
    if (Hr(t)) return e;
  }
  function eo(e, t) {
    if (e === "change") return t;
  }
  var to = !1;
  if (Zt) {
    var Vs;
    if (Zt) {
      var Ks = "oninput" in document;
      if (!Ks) {
        var ao = document.createElement("div");
        ao.setAttribute("oninput", "return;"), Ks = typeof ao.oninput == "function";
      }
      Vs = Ks;
    } else Vs = !1;
    to = Vs && (!document.documentMode || 9 < document.documentMode);
  }
  function lo() {
    Pl && (Pl.detachEvent("onpropertychange", no), en = Pl = null);
  }
  function no(e) {
    if (e.propertyName === "value" && si(en)) {
      var t = [];
      Pr(
        t,
        en,
        e,
        Bs(e)
      ), Yr(Ny, t);
    }
  }
  function Oy(e, t, a) {
    e === "focusin" ? (lo(), Pl = t, en = a, Pl.attachEvent("onpropertychange", no)) : e === "focusout" && lo();
  }
  function Dy(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return si(en);
  }
  function Ry(e, t) {
    if (e === "click") return si(t);
  }
  function Hy(e, t) {
    if (e === "input" || e === "change")
      return si(t);
  }
  function Uy(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var ht = typeof Object.is == "function" ? Object.is : Uy;
  function tn(e, t) {
    if (ht(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var a = Object.keys(e), l = Object.keys(t);
    if (a.length !== l.length) return !1;
    for (l = 0; l < a.length; l++) {
      var i = a[l];
      if (!xs.call(t, i) || !ht(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  function io(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function so(e, t) {
    var a = io(e);
    e = 0;
    for (var l; a; ) {
      if (a.nodeType === 3) {
        if (l = e + a.textContent.length, e <= t && l >= t)
          return { node: a, offset: t - e };
        e = l;
      }
      e: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break e;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = io(a);
    }
  }
  function co(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? co(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function uo(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = Pn(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = Pn(e.document);
    }
    return t;
  }
  function Js(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var By = Zt && "documentMode" in document && 11 >= document.documentMode, fl = null, Is = null, an = null, ks = !1;
  function ro(e, t, a) {
    var l = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    ks || fl == null || fl !== Pn(l) || (l = fl, "selectionStart" in l && Js(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), an && tn(an, l) || (an = l, l = Ii(Is, "onSelect"), 0 < l.length && (t = new ni(
      "onSelect",
      "select",
      null,
      t,
      a
    ), e.push({ event: t, listeners: l }), t.target = fl)));
  }
  function qa(e, t) {
    var a = {};
    return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
  }
  var dl = {
    animationend: qa("Animation", "AnimationEnd"),
    animationiteration: qa("Animation", "AnimationIteration"),
    animationstart: qa("Animation", "AnimationStart"),
    transitionrun: qa("Transition", "TransitionRun"),
    transitionstart: qa("Transition", "TransitionStart"),
    transitioncancel: qa("Transition", "TransitionCancel"),
    transitionend: qa("Transition", "TransitionEnd")
  }, $s = {}, oo = {};
  Zt && (oo = document.createElement("div").style, "AnimationEvent" in window || (delete dl.animationend.animation, delete dl.animationiteration.animation, delete dl.animationstart.animation), "TransitionEvent" in window || delete dl.transitionend.transition);
  function La(e) {
    if ($s[e]) return $s[e];
    if (!dl[e]) return e;
    var t = dl[e], a;
    for (a in t)
      if (t.hasOwnProperty(a) && a in oo)
        return $s[e] = t[a];
    return e;
  }
  var fo = La("animationend"), mo = La("animationiteration"), po = La("animationstart"), wy = La("transitionrun"), qy = La("transitionstart"), Ly = La("transitioncancel"), yo = La("transitionend"), go = /* @__PURE__ */ new Map(), Ws = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Ws.push("scrollEnd");
  function Ht(e, t) {
    go.set(e, t), Ba(t, [e]);
  }
  var ci = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  }, Et = [], ml = 0, Fs = 0;
  function ui() {
    for (var e = ml, t = Fs = ml = 0; t < e; ) {
      var a = Et[t];
      Et[t++] = null;
      var l = Et[t];
      Et[t++] = null;
      var i = Et[t];
      Et[t++] = null;
      var s = Et[t];
      if (Et[t++] = null, l !== null && i !== null) {
        var o = l.pending;
        o === null ? i.next = i : (i.next = o.next, o.next = i), l.pending = i;
      }
      s !== 0 && ho(a, i, s);
    }
  }
  function ri(e, t, a, l) {
    Et[ml++] = e, Et[ml++] = t, Et[ml++] = a, Et[ml++] = l, Fs |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function Ps(e, t, a, l) {
    return ri(e, t, a, l), oi(e);
  }
  function Ga(e, t) {
    return ri(e, null, null, t), oi(e);
  }
  function ho(e, t, a) {
    e.lanes |= a;
    var l = e.alternate;
    l !== null && (l.lanes |= a);
    for (var i = !1, s = e.return; s !== null; )
      s.childLanes |= a, l = s.alternate, l !== null && (l.childLanes |= a), s.tag === 22 && (e = s.stateNode, e === null || e._visibility & 1 || (i = !0)), e = s, s = s.return;
    return e.tag === 3 ? (s = e.stateNode, i && t !== null && (i = 31 - gt(a), e = s.hiddenUpdates, l = e[i], l === null ? e[i] = [t] : l.push(t), t.lane = a | 536870912), s) : null;
  }
  function oi(e) {
    if (50 < Mn)
      throw Mn = 0, uu = null, Error(c(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var pl = {};
  function Gy(e, t, a, l) {
    this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function vt(e, t, a, l) {
    return new Gy(e, t, a, l);
  }
  function ec(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Vt(e, t) {
    var a = e.alternate;
    return a === null ? (a = vt(
      e.tag,
      t,
      e.key,
      e.mode
    ), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = e.flags & 65011712, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue, t = e.dependencies, a.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.refCleanup = e.refCleanup, a;
  }
  function vo(e, t) {
    e.flags &= 65011714;
    var a = e.alternate;
    return a === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, t = a.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function fi(e, t, a, l, i, s) {
    var o = 0;
    if (l = e, typeof e == "function") ec(e) && (o = 1);
    else if (typeof e == "string")
      o = Vg(
        e,
        a,
        Z.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case me:
          return e = vt(31, a, t, i), e.elementType = me, e.lanes = s, e;
        case L:
          return Ya(a.children, i, s, t);
        case w:
          o = 8, i |= 24;
          break;
        case Q:
          return e = vt(12, a, t, i | 2), e.elementType = Q, e.lanes = s, e;
        case V:
          return e = vt(13, a, t, i), e.elementType = V, e.lanes = s, e;
        case J:
          return e = vt(19, a, t, i), e.elementType = J, e.lanes = s, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case F:
                o = 10;
                break e;
              case ne:
                o = 9;
                break e;
              case ie:
                o = 11;
                break e;
              case Y:
                o = 14;
                break e;
              case se:
                o = 16, l = null;
                break e;
            }
          o = 29, a = Error(
            c(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return t = vt(o, a, t, i), t.elementType = e, t.type = l, t.lanes = s, t;
  }
  function Ya(e, t, a, l) {
    return e = vt(7, e, l, t), e.lanes = a, e;
  }
  function tc(e, t, a) {
    return e = vt(6, e, null, t), e.lanes = a, e;
  }
  function bo(e) {
    var t = vt(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function ac(e, t, a) {
    return t = vt(
      4,
      e.children !== null ? e.children : [],
      e.key,
      t
    ), t.lanes = a, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var _o = /* @__PURE__ */ new WeakMap();
  function Ct(e, t) {
    if (typeof e == "object" && e !== null) {
      var a = _o.get(e);
      return a !== void 0 ? a : (t = {
        value: e,
        source: t,
        stack: vr(t)
      }, _o.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: vr(t)
    };
  }
  var yl = [], gl = 0, di = null, ln = 0, zt = [], jt = 0, oa = null, qt = 1, Lt = "";
  function Kt(e, t) {
    yl[gl++] = ln, yl[gl++] = di, di = e, ln = t;
  }
  function So(e, t, a) {
    zt[jt++] = qt, zt[jt++] = Lt, zt[jt++] = oa, oa = e;
    var l = qt;
    e = Lt;
    var i = 32 - gt(l) - 1;
    l &= ~(1 << i), a += 1;
    var s = 32 - gt(t) + i;
    if (30 < s) {
      var o = i - i % 5;
      s = (l & (1 << o) - 1).toString(32), l >>= o, i -= o, qt = 1 << 32 - gt(t) + i | a << i | l, Lt = s + e;
    } else
      qt = 1 << s | a << i | l, Lt = e;
  }
  function lc(e) {
    e.return !== null && (Kt(e, 1), So(e, 1, 0));
  }
  function nc(e) {
    for (; e === di; )
      di = yl[--gl], yl[gl] = null, ln = yl[--gl], yl[gl] = null;
    for (; e === oa; )
      oa = zt[--jt], zt[jt] = null, Lt = zt[--jt], zt[jt] = null, qt = zt[--jt], zt[jt] = null;
  }
  function Ao(e, t) {
    zt[jt++] = qt, zt[jt++] = Lt, zt[jt++] = oa, qt = t.id, Lt = t.overflow, oa = e;
  }
  var $e = null, ze = null, de = !1, fa = null, Nt = !1, ic = Error(c(519));
  function da(e) {
    var t = Error(
      c(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw nn(Ct(t, e)), ic;
  }
  function xo(e) {
    var t = e.stateNode, a = e.type, l = e.memoizedProps;
    switch (t[ke] = e, t[st] = l, a) {
      case "dialog":
        re("cancel", t), re("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        re("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Cn.length; a++)
          re(Cn[a], t);
        break;
      case "source":
        re("error", t);
        break;
      case "img":
      case "image":
      case "link":
        re("error", t), re("load", t);
        break;
      case "details":
        re("toggle", t);
        break;
      case "input":
        re("invalid", t), Ur(
          t,
          l.value,
          l.defaultValue,
          l.checked,
          l.defaultChecked,
          l.type,
          l.name,
          !0
        );
        break;
      case "select":
        re("invalid", t);
        break;
      case "textarea":
        re("invalid", t), wr(t, l.value, l.defaultValue, l.children);
    }
    a = l.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || l.suppressHydrationWarning === !0 || Yd(t.textContent, a) ? (l.popover != null && (re("beforetoggle", t), re("toggle", t)), l.onScroll != null && re("scroll", t), l.onScrollEnd != null && re("scrollend", t), l.onClick != null && (t.onclick = Qt), t = !0) : t = !1, t || da(e, !0);
  }
  function To(e) {
    for ($e = e.return; $e; )
      switch ($e.tag) {
        case 5:
        case 31:
        case 13:
          Nt = !1;
          return;
        case 27:
        case 3:
          Nt = !0;
          return;
        default:
          $e = $e.return;
      }
  }
  function hl(e) {
    if (e !== $e) return !1;
    if (!de) return To(e), de = !0, !1;
    var t = e.tag, a;
    if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || xu(e.type, e.memoizedProps)), a = !a), a && ze && da(e), To(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(317));
      ze = $d(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(317));
      ze = $d(e);
    } else
      t === 27 ? (t = ze, Ea(e.type) ? (e = zu, zu = null, ze = e) : ze = t) : ze = $e ? Dt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Xa() {
    ze = $e = null, de = !1;
  }
  function sc() {
    var e = fa;
    return e !== null && (ft === null ? ft = e : ft.push.apply(
      ft,
      e
    ), fa = null), e;
  }
  function nn(e) {
    fa === null ? fa = [e] : fa.push(e);
  }
  var cc = S(null), Qa = null, Jt = null;
  function ma(e, t, a) {
    G(cc, t._currentValue), t._currentValue = a;
  }
  function It(e) {
    e._currentValue = cc.current, U(cc);
  }
  function uc(e, t, a) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === a) break;
      e = e.return;
    }
  }
  function rc(e, t, a, l) {
    var i = e.child;
    for (i !== null && (i.return = e); i !== null; ) {
      var s = i.dependencies;
      if (s !== null) {
        var o = i.child;
        s = s.firstContext;
        e: for (; s !== null; ) {
          var d = s;
          s = i;
          for (var v = 0; v < t.length; v++)
            if (d.context === t[v]) {
              s.lanes |= a, d = s.alternate, d !== null && (d.lanes |= a), uc(
                s.return,
                a,
                e
              ), l || (o = null);
              break e;
            }
          s = d.next;
        }
      } else if (i.tag === 18) {
        if (o = i.return, o === null) throw Error(c(341));
        o.lanes |= a, s = o.alternate, s !== null && (s.lanes |= a), uc(o, a, e), o = null;
      } else o = i.child;
      if (o !== null) o.return = i;
      else
        for (o = i; o !== null; ) {
          if (o === e) {
            o = null;
            break;
          }
          if (i = o.sibling, i !== null) {
            i.return = o.return, o = i;
            break;
          }
          o = o.return;
        }
      i = o;
    }
  }
  function vl(e, t, a, l) {
    e = null;
    for (var i = t, s = !1; i !== null; ) {
      if (!s) {
        if ((i.flags & 524288) !== 0) s = !0;
        else if ((i.flags & 262144) !== 0) break;
      }
      if (i.tag === 10) {
        var o = i.alternate;
        if (o === null) throw Error(c(387));
        if (o = o.memoizedProps, o !== null) {
          var d = i.type;
          ht(i.pendingProps.value, o.value) || (e !== null ? e.push(d) : e = [d]);
        }
      } else if (i === ve.current) {
        if (o = i.alternate, o === null) throw Error(c(387));
        o.memoizedState.memoizedState !== i.memoizedState.memoizedState && (e !== null ? e.push(Dn) : e = [Dn]);
      }
      i = i.return;
    }
    e !== null && rc(
      t,
      e,
      a,
      l
    ), t.flags |= 262144;
  }
  function mi(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!ht(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Za(e) {
    Qa = e, Jt = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function We(e) {
    return Mo(Qa, e);
  }
  function pi(e, t) {
    return Qa === null && Za(e), Mo(e, t);
  }
  function Mo(e, t) {
    var a = t._currentValue;
    if (t = { context: t, memoizedValue: a, next: null }, Jt === null) {
      if (e === null) throw Error(c(308));
      Jt = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Jt = Jt.next = t;
    return a;
  }
  var Yy = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(a, l) {
        e.push(l);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(a) {
        return a();
      });
    };
  }, Xy = n.unstable_scheduleCallback, Qy = n.unstable_NormalPriority, Le = {
    $$typeof: F,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function oc() {
    return {
      controller: new Yy(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function sn(e) {
    e.refCount--, e.refCount === 0 && Xy(Qy, function() {
      e.controller.abort();
    });
  }
  var cn = null, fc = 0, bl = 0, _l = null;
  function Zy(e, t) {
    if (cn === null) {
      var a = cn = [];
      fc = 0, bl = pu(), _l = {
        status: "pending",
        value: void 0,
        then: function(l) {
          a.push(l);
        }
      };
    }
    return fc++, t.then(Eo, Eo), t;
  }
  function Eo() {
    if (--fc === 0 && cn !== null) {
      _l !== null && (_l.status = "fulfilled");
      var e = cn;
      cn = null, bl = 0, _l = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Vy(e, t) {
    var a = [], l = {
      status: "pending",
      value: null,
      reason: null,
      then: function(i) {
        a.push(i);
      }
    };
    return e.then(
      function() {
        l.status = "fulfilled", l.value = t;
        for (var i = 0; i < a.length; i++) (0, a[i])(t);
      },
      function(i) {
        for (l.status = "rejected", l.reason = i, i = 0; i < a.length; i++)
          (0, a[i])(void 0);
      }
    ), l;
  }
  var Co = O.S;
  O.S = function(e, t) {
    fd = pt(), typeof t == "object" && t !== null && typeof t.then == "function" && Zy(e, t), Co !== null && Co(e, t);
  };
  var Va = S(null);
  function dc() {
    var e = Va.current;
    return e !== null ? e : Ce.pooledCache;
  }
  function yi(e, t) {
    t === null ? G(Va, Va.current) : G(Va, t.pool);
  }
  function zo() {
    var e = dc();
    return e === null ? null : { parent: Le._currentValue, pool: e };
  }
  var Sl = Error(c(460)), mc = Error(c(474)), gi = Error(c(542)), hi = { then: function() {
  } };
  function jo(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function No(e, t, a) {
    switch (a = e[a], a === void 0 ? e.push(t) : a !== t && (t.then(Qt, Qt), t = a), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Do(e), e;
      default:
        if (typeof t.status == "string") t.then(Qt, Qt);
        else {
          if (e = Ce, e !== null && 100 < e.shellSuspendCounter)
            throw Error(c(482));
          e = t, e.status = "pending", e.then(
            function(l) {
              if (t.status === "pending") {
                var i = t;
                i.status = "fulfilled", i.value = l;
              }
            },
            function(l) {
              if (t.status === "pending") {
                var i = t;
                i.status = "rejected", i.reason = l;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, Do(e), e;
        }
        throw Ja = t, Sl;
    }
  }
  function Ka(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function" ? (Ja = a, Sl) : a;
    }
  }
  var Ja = null;
  function Oo() {
    if (Ja === null) throw Error(c(459));
    var e = Ja;
    return Ja = null, e;
  }
  function Do(e) {
    if (e === Sl || e === gi)
      throw Error(c(483));
  }
  var Al = null, un = 0;
  function vi(e) {
    var t = un;
    return un += 1, Al === null && (Al = []), No(Al, e, t);
  }
  function rn(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function bi(e, t) {
    throw t.$$typeof === A ? Error(c(525)) : (e = Object.prototype.toString.call(t), Error(
      c(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Ro(e) {
    function t(T, b) {
      if (e) {
        var E = T.deletions;
        E === null ? (T.deletions = [b], T.flags |= 16) : E.push(b);
      }
    }
    function a(T, b) {
      if (!e) return null;
      for (; b !== null; )
        t(T, b), b = b.sibling;
      return null;
    }
    function l(T) {
      for (var b = /* @__PURE__ */ new Map(); T !== null; )
        T.key !== null ? b.set(T.key, T) : b.set(T.index, T), T = T.sibling;
      return b;
    }
    function i(T, b) {
      return T = Vt(T, b), T.index = 0, T.sibling = null, T;
    }
    function s(T, b, E) {
      return T.index = E, e ? (E = T.alternate, E !== null ? (E = E.index, E < b ? (T.flags |= 67108866, b) : E) : (T.flags |= 67108866, b)) : (T.flags |= 1048576, b);
    }
    function o(T) {
      return e && T.alternate === null && (T.flags |= 67108866), T;
    }
    function d(T, b, E, R) {
      return b === null || b.tag !== 6 ? (b = tc(E, T.mode, R), b.return = T, b) : (b = i(b, E), b.return = T, b);
    }
    function v(T, b, E, R) {
      var I = E.type;
      return I === L ? N(
        T,
        b,
        E.props.children,
        R,
        E.key
      ) : b !== null && (b.elementType === I || typeof I == "object" && I !== null && I.$$typeof === se && Ka(I) === b.type) ? (b = i(b, E.props), rn(b, E), b.return = T, b) : (b = fi(
        E.type,
        E.key,
        E.props,
        null,
        T.mode,
        R
      ), rn(b, E), b.return = T, b);
    }
    function C(T, b, E, R) {
      return b === null || b.tag !== 4 || b.stateNode.containerInfo !== E.containerInfo || b.stateNode.implementation !== E.implementation ? (b = ac(E, T.mode, R), b.return = T, b) : (b = i(b, E.children || []), b.return = T, b);
    }
    function N(T, b, E, R, I) {
      return b === null || b.tag !== 7 ? (b = Ya(
        E,
        T.mode,
        R,
        I
      ), b.return = T, b) : (b = i(b, E), b.return = T, b);
    }
    function H(T, b, E) {
      if (typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint")
        return b = tc(
          "" + b,
          T.mode,
          E
        ), b.return = T, b;
      if (typeof b == "object" && b !== null) {
        switch (b.$$typeof) {
          case x:
            return E = fi(
              b.type,
              b.key,
              b.props,
              null,
              T.mode,
              E
            ), rn(E, b), E.return = T, E;
          case B:
            return b = ac(
              b,
              T.mode,
              E
            ), b.return = T, b;
          case se:
            return b = Ka(b), H(T, b, E);
        }
        if (mt(b) || Me(b))
          return b = Ya(
            b,
            T.mode,
            E,
            null
          ), b.return = T, b;
        if (typeof b.then == "function")
          return H(T, vi(b), E);
        if (b.$$typeof === F)
          return H(
            T,
            pi(T, b),
            E
          );
        bi(T, b);
      }
      return null;
    }
    function z(T, b, E, R) {
      var I = b !== null ? b.key : null;
      if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint")
        return I !== null ? null : d(T, b, "" + E, R);
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case x:
            return E.key === I ? v(T, b, E, R) : null;
          case B:
            return E.key === I ? C(T, b, E, R) : null;
          case se:
            return E = Ka(E), z(T, b, E, R);
        }
        if (mt(E) || Me(E))
          return I !== null ? null : N(T, b, E, R, null);
        if (typeof E.then == "function")
          return z(
            T,
            b,
            vi(E),
            R
          );
        if (E.$$typeof === F)
          return z(
            T,
            b,
            pi(T, E),
            R
          );
        bi(T, E);
      }
      return null;
    }
    function j(T, b, E, R, I) {
      if (typeof R == "string" && R !== "" || typeof R == "number" || typeof R == "bigint")
        return T = T.get(E) || null, d(b, T, "" + R, I);
      if (typeof R == "object" && R !== null) {
        switch (R.$$typeof) {
          case x:
            return T = T.get(
              R.key === null ? E : R.key
            ) || null, v(b, T, R, I);
          case B:
            return T = T.get(
              R.key === null ? E : R.key
            ) || null, C(b, T, R, I);
          case se:
            return R = Ka(R), j(
              T,
              b,
              E,
              R,
              I
            );
        }
        if (mt(R) || Me(R))
          return T = T.get(E) || null, N(b, T, R, I, null);
        if (typeof R.then == "function")
          return j(
            T,
            b,
            E,
            vi(R),
            I
          );
        if (R.$$typeof === F)
          return j(
            T,
            b,
            E,
            pi(b, R),
            I
          );
        bi(b, R);
      }
      return null;
    }
    function X(T, b, E, R) {
      for (var I = null, pe = null, K = b, le = b = 0, fe = null; K !== null && le < E.length; le++) {
        K.index > le ? (fe = K, K = null) : fe = K.sibling;
        var ye = z(
          T,
          K,
          E[le],
          R
        );
        if (ye === null) {
          K === null && (K = fe);
          break;
        }
        e && K && ye.alternate === null && t(T, K), b = s(ye, b, le), pe === null ? I = ye : pe.sibling = ye, pe = ye, K = fe;
      }
      if (le === E.length)
        return a(T, K), de && Kt(T, le), I;
      if (K === null) {
        for (; le < E.length; le++)
          K = H(T, E[le], R), K !== null && (b = s(
            K,
            b,
            le
          ), pe === null ? I = K : pe.sibling = K, pe = K);
        return de && Kt(T, le), I;
      }
      for (K = l(K); le < E.length; le++)
        fe = j(
          K,
          T,
          le,
          E[le],
          R
        ), fe !== null && (e && fe.alternate !== null && K.delete(
          fe.key === null ? le : fe.key
        ), b = s(
          fe,
          b,
          le
        ), pe === null ? I = fe : pe.sibling = fe, pe = fe);
      return e && K.forEach(function(Oa) {
        return t(T, Oa);
      }), de && Kt(T, le), I;
    }
    function k(T, b, E, R) {
      if (E == null) throw Error(c(151));
      for (var I = null, pe = null, K = b, le = b = 0, fe = null, ye = E.next(); K !== null && !ye.done; le++, ye = E.next()) {
        K.index > le ? (fe = K, K = null) : fe = K.sibling;
        var Oa = z(T, K, ye.value, R);
        if (Oa === null) {
          K === null && (K = fe);
          break;
        }
        e && K && Oa.alternate === null && t(T, K), b = s(Oa, b, le), pe === null ? I = Oa : pe.sibling = Oa, pe = Oa, K = fe;
      }
      if (ye.done)
        return a(T, K), de && Kt(T, le), I;
      if (K === null) {
        for (; !ye.done; le++, ye = E.next())
          ye = H(T, ye.value, R), ye !== null && (b = s(ye, b, le), pe === null ? I = ye : pe.sibling = ye, pe = ye);
        return de && Kt(T, le), I;
      }
      for (K = l(K); !ye.done; le++, ye = E.next())
        ye = j(K, T, le, ye.value, R), ye !== null && (e && ye.alternate !== null && K.delete(ye.key === null ? le : ye.key), b = s(ye, b, le), pe === null ? I = ye : pe.sibling = ye, pe = ye);
      return e && K.forEach(function(ah) {
        return t(T, ah);
      }), de && Kt(T, le), I;
    }
    function Te(T, b, E, R) {
      if (typeof E == "object" && E !== null && E.type === L && E.key === null && (E = E.props.children), typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case x:
            e: {
              for (var I = E.key; b !== null; ) {
                if (b.key === I) {
                  if (I = E.type, I === L) {
                    if (b.tag === 7) {
                      a(
                        T,
                        b.sibling
                      ), R = i(
                        b,
                        E.props.children
                      ), R.return = T, T = R;
                      break e;
                    }
                  } else if (b.elementType === I || typeof I == "object" && I !== null && I.$$typeof === se && Ka(I) === b.type) {
                    a(
                      T,
                      b.sibling
                    ), R = i(b, E.props), rn(R, E), R.return = T, T = R;
                    break e;
                  }
                  a(T, b);
                  break;
                } else t(T, b);
                b = b.sibling;
              }
              E.type === L ? (R = Ya(
                E.props.children,
                T.mode,
                R,
                E.key
              ), R.return = T, T = R) : (R = fi(
                E.type,
                E.key,
                E.props,
                null,
                T.mode,
                R
              ), rn(R, E), R.return = T, T = R);
            }
            return o(T);
          case B:
            e: {
              for (I = E.key; b !== null; ) {
                if (b.key === I)
                  if (b.tag === 4 && b.stateNode.containerInfo === E.containerInfo && b.stateNode.implementation === E.implementation) {
                    a(
                      T,
                      b.sibling
                    ), R = i(b, E.children || []), R.return = T, T = R;
                    break e;
                  } else {
                    a(T, b);
                    break;
                  }
                else t(T, b);
                b = b.sibling;
              }
              R = ac(E, T.mode, R), R.return = T, T = R;
            }
            return o(T);
          case se:
            return E = Ka(E), Te(
              T,
              b,
              E,
              R
            );
        }
        if (mt(E))
          return X(
            T,
            b,
            E,
            R
          );
        if (Me(E)) {
          if (I = Me(E), typeof I != "function") throw Error(c(150));
          return E = I.call(E), k(
            T,
            b,
            E,
            R
          );
        }
        if (typeof E.then == "function")
          return Te(
            T,
            b,
            vi(E),
            R
          );
        if (E.$$typeof === F)
          return Te(
            T,
            b,
            pi(T, E),
            R
          );
        bi(T, E);
      }
      return typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint" ? (E = "" + E, b !== null && b.tag === 6 ? (a(T, b.sibling), R = i(b, E), R.return = T, T = R) : (a(T, b), R = tc(E, T.mode, R), R.return = T, T = R), o(T)) : a(T, b);
    }
    return function(T, b, E, R) {
      try {
        un = 0;
        var I = Te(
          T,
          b,
          E,
          R
        );
        return Al = null, I;
      } catch (K) {
        if (K === Sl || K === gi) throw K;
        var pe = vt(29, K, null, T.mode);
        return pe.lanes = R, pe.return = T, pe;
      }
    };
  }
  var Ia = Ro(!0), Ho = Ro(!1), pa = !1;
  function pc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function yc(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function ya(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function ga(e, t, a) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (ge & 2) !== 0) {
      var i = l.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), l.pending = t, t = oi(e), ho(e, null, a), t;
    }
    return ri(e, l, t, a), oi(e);
  }
  function on(e, t, a) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, a |= l, t.lanes = a, Tr(e, a);
    }
  }
  function gc(e, t) {
    var a = e.updateQueue, l = e.alternate;
    if (l !== null && (l = l.updateQueue, a === l)) {
      var i = null, s = null;
      if (a = a.firstBaseUpdate, a !== null) {
        do {
          var o = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null
          };
          s === null ? i = s = o : s = s.next = o, a = a.next;
        } while (a !== null);
        s === null ? i = s = t : s = s.next = t;
      } else i = s = t;
      a = {
        baseState: l.baseState,
        firstBaseUpdate: i,
        lastBaseUpdate: s,
        shared: l.shared,
        callbacks: l.callbacks
      }, e.updateQueue = a;
      return;
    }
    e = a.lastBaseUpdate, e === null ? a.firstBaseUpdate = t : e.next = t, a.lastBaseUpdate = t;
  }
  var hc = !1;
  function fn() {
    if (hc) {
      var e = _l;
      if (e !== null) throw e;
    }
  }
  function dn(e, t, a, l) {
    hc = !1;
    var i = e.updateQueue;
    pa = !1;
    var s = i.firstBaseUpdate, o = i.lastBaseUpdate, d = i.shared.pending;
    if (d !== null) {
      i.shared.pending = null;
      var v = d, C = v.next;
      v.next = null, o === null ? s = C : o.next = C, o = v;
      var N = e.alternate;
      N !== null && (N = N.updateQueue, d = N.lastBaseUpdate, d !== o && (d === null ? N.firstBaseUpdate = C : d.next = C, N.lastBaseUpdate = v));
    }
    if (s !== null) {
      var H = i.baseState;
      o = 0, N = C = v = null, d = s;
      do {
        var z = d.lane & -536870913, j = z !== d.lane;
        if (j ? (oe & z) === z : (l & z) === z) {
          z !== 0 && z === bl && (hc = !0), N !== null && (N = N.next = {
            lane: 0,
            tag: d.tag,
            payload: d.payload,
            callback: null,
            next: null
          });
          e: {
            var X = e, k = d;
            z = t;
            var Te = a;
            switch (k.tag) {
              case 1:
                if (X = k.payload, typeof X == "function") {
                  H = X.call(Te, H, z);
                  break e;
                }
                H = X;
                break e;
              case 3:
                X.flags = X.flags & -65537 | 128;
              case 0:
                if (X = k.payload, z = typeof X == "function" ? X.call(Te, H, z) : X, z == null) break e;
                H = _({}, H, z);
                break e;
              case 2:
                pa = !0;
            }
          }
          z = d.callback, z !== null && (e.flags |= 64, j && (e.flags |= 8192), j = i.callbacks, j === null ? i.callbacks = [z] : j.push(z));
        } else
          j = {
            lane: z,
            tag: d.tag,
            payload: d.payload,
            callback: d.callback,
            next: null
          }, N === null ? (C = N = j, v = H) : N = N.next = j, o |= z;
        if (d = d.next, d === null) {
          if (d = i.shared.pending, d === null)
            break;
          j = d, d = j.next, j.next = null, i.lastBaseUpdate = j, i.shared.pending = null;
        }
      } while (!0);
      N === null && (v = H), i.baseState = v, i.firstBaseUpdate = C, i.lastBaseUpdate = N, s === null && (i.shared.lanes = 0), Sa |= o, e.lanes = o, e.memoizedState = H;
    }
  }
  function Uo(e, t) {
    if (typeof e != "function")
      throw Error(c(191, e));
    e.call(t);
  }
  function Bo(e, t) {
    var a = e.callbacks;
    if (a !== null)
      for (e.callbacks = null, e = 0; e < a.length; e++)
        Uo(a[e], t);
  }
  var xl = S(null), _i = S(0);
  function wo(e, t) {
    e = la, G(_i, e), G(xl, t), la = e | t.baseLanes;
  }
  function vc() {
    G(_i, la), G(xl, xl.current);
  }
  function bc() {
    la = _i.current, U(xl), U(_i);
  }
  var bt = S(null), Ot = null;
  function ha(e) {
    var t = e.alternate;
    G(we, we.current & 1), G(bt, e), Ot === null && (t === null || xl.current !== null || t.memoizedState !== null) && (Ot = e);
  }
  function _c(e) {
    G(we, we.current), G(bt, e), Ot === null && (Ot = e);
  }
  function qo(e) {
    e.tag === 22 ? (G(we, we.current), G(bt, e), Ot === null && (Ot = e)) : va();
  }
  function va() {
    G(we, we.current), G(bt, bt.current);
  }
  function _t(e) {
    U(bt), Ot === e && (Ot = null), U(we);
  }
  var we = S(0);
  function Si(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || Eu(a) || Cu(a)))
          return t;
      } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var kt = 0, te = null, Ae = null, Ge = null, Ai = !1, Tl = !1, ka = !1, xi = 0, mn = 0, Ml = null, Ky = 0;
  function De() {
    throw Error(c(321));
  }
  function Sc(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++)
      if (!ht(e[a], t[a])) return !1;
    return !0;
  }
  function Ac(e, t, a, l, i, s) {
    return kt = s, te = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, O.H = e === null || e.memoizedState === null ? Af : wc, ka = !1, s = a(l, i), ka = !1, Tl && (s = Go(
      t,
      a,
      l,
      i
    )), Lo(e), s;
  }
  function Lo(e) {
    O.H = gn;
    var t = Ae !== null && Ae.next !== null;
    if (kt = 0, Ge = Ae = te = null, Ai = !1, mn = 0, Ml = null, t) throw Error(c(300));
    e === null || Ye || (e = e.dependencies, e !== null && mi(e) && (Ye = !0));
  }
  function Go(e, t, a, l) {
    te = e;
    var i = 0;
    do {
      if (Tl && (Ml = null), mn = 0, Tl = !1, 25 <= i) throw Error(c(301));
      if (i += 1, Ge = Ae = null, e.updateQueue != null) {
        var s = e.updateQueue;
        s.lastEffect = null, s.events = null, s.stores = null, s.memoCache != null && (s.memoCache.index = 0);
      }
      O.H = xf, s = t(a, l);
    } while (Tl);
    return s;
  }
  function Jy() {
    var e = O.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? pn(t) : t, e = e.useState()[0], (Ae !== null ? Ae.memoizedState : null) !== e && (te.flags |= 1024), t;
  }
  function xc() {
    var e = xi !== 0;
    return xi = 0, e;
  }
  function Tc(e, t, a) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a;
  }
  function Mc(e) {
    if (Ai) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Ai = !1;
    }
    kt = 0, Ge = Ae = te = null, Tl = !1, mn = xi = 0, Ml = null;
  }
  function nt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ge === null ? te.memoizedState = Ge = e : Ge = Ge.next = e, Ge;
  }
  function qe() {
    if (Ae === null) {
      var e = te.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ae.next;
    var t = Ge === null ? te.memoizedState : Ge.next;
    if (t !== null)
      Ge = t, Ae = e;
    else {
      if (e === null)
        throw te.alternate === null ? Error(c(467)) : Error(c(310));
      Ae = e, e = {
        memoizedState: Ae.memoizedState,
        baseState: Ae.baseState,
        baseQueue: Ae.baseQueue,
        queue: Ae.queue,
        next: null
      }, Ge === null ? te.memoizedState = Ge = e : Ge = Ge.next = e;
    }
    return Ge;
  }
  function Ti() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function pn(e) {
    var t = mn;
    return mn += 1, Ml === null && (Ml = []), e = No(Ml, e, t), t = te, (Ge === null ? t.memoizedState : Ge.next) === null && (t = t.alternate, O.H = t === null || t.memoizedState === null ? Af : wc), e;
  }
  function Mi(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return pn(e);
      if (e.$$typeof === F) return We(e);
    }
    throw Error(c(438, String(e)));
  }
  function Ec(e) {
    var t = null, a = te.updateQueue;
    if (a !== null && (t = a.memoCache), t == null) {
      var l = te.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (t = {
        data: l.data.map(function(i) {
          return i.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), a === null && (a = Ti(), te.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0)
      for (a = t.data[t.index] = Array(e), l = 0; l < e; l++)
        a[l] = et;
    return t.index++, a;
  }
  function $t(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Ei(e) {
    var t = qe();
    return Cc(t, Ae, e);
  }
  function Cc(e, t, a) {
    var l = e.queue;
    if (l === null) throw Error(c(311));
    l.lastRenderedReducer = a;
    var i = e.baseQueue, s = l.pending;
    if (s !== null) {
      if (i !== null) {
        var o = i.next;
        i.next = s.next, s.next = o;
      }
      t.baseQueue = i = s, l.pending = null;
    }
    if (s = e.baseState, i === null) e.memoizedState = s;
    else {
      t = i.next;
      var d = o = null, v = null, C = t, N = !1;
      do {
        var H = C.lane & -536870913;
        if (H !== C.lane ? (oe & H) === H : (kt & H) === H) {
          var z = C.revertLane;
          if (z === 0)
            v !== null && (v = v.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: C.action,
              hasEagerState: C.hasEagerState,
              eagerState: C.eagerState,
              next: null
            }), H === bl && (N = !0);
          else if ((kt & z) === z) {
            C = C.next, z === bl && (N = !0);
            continue;
          } else
            H = {
              lane: 0,
              revertLane: C.revertLane,
              gesture: null,
              action: C.action,
              hasEagerState: C.hasEagerState,
              eagerState: C.eagerState,
              next: null
            }, v === null ? (d = v = H, o = s) : v = v.next = H, te.lanes |= z, Sa |= z;
          H = C.action, ka && a(s, H), s = C.hasEagerState ? C.eagerState : a(s, H);
        } else
          z = {
            lane: H,
            revertLane: C.revertLane,
            gesture: C.gesture,
            action: C.action,
            hasEagerState: C.hasEagerState,
            eagerState: C.eagerState,
            next: null
          }, v === null ? (d = v = z, o = s) : v = v.next = z, te.lanes |= H, Sa |= H;
        C = C.next;
      } while (C !== null && C !== t);
      if (v === null ? o = s : v.next = d, !ht(s, e.memoizedState) && (Ye = !0, N && (a = _l, a !== null)))
        throw a;
      e.memoizedState = s, e.baseState = o, e.baseQueue = v, l.lastRenderedState = s;
    }
    return i === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function zc(e) {
    var t = qe(), a = t.queue;
    if (a === null) throw Error(c(311));
    a.lastRenderedReducer = e;
    var l = a.dispatch, i = a.pending, s = t.memoizedState;
    if (i !== null) {
      a.pending = null;
      var o = i = i.next;
      do
        s = e(s, o.action), o = o.next;
      while (o !== i);
      ht(s, t.memoizedState) || (Ye = !0), t.memoizedState = s, t.baseQueue === null && (t.baseState = s), a.lastRenderedState = s;
    }
    return [s, l];
  }
  function Yo(e, t, a) {
    var l = te, i = qe(), s = de;
    if (s) {
      if (a === void 0) throw Error(c(407));
      a = a();
    } else a = t();
    var o = !ht(
      (Ae || i).memoizedState,
      a
    );
    if (o && (i.memoizedState = a, Ye = !0), i = i.queue, Oc(Zo.bind(null, l, i, e), [
      e
    ]), i.getSnapshot !== t || o || Ge !== null && Ge.memoizedState.tag & 1) {
      if (l.flags |= 2048, El(
        9,
        { destroy: void 0 },
        Qo.bind(
          null,
          l,
          i,
          a,
          t
        ),
        null
      ), Ce === null) throw Error(c(349));
      s || (kt & 127) !== 0 || Xo(l, t, a);
    }
    return a;
  }
  function Xo(e, t, a) {
    e.flags |= 16384, e = { getSnapshot: t, value: a }, t = te.updateQueue, t === null ? (t = Ti(), te.updateQueue = t, t.stores = [e]) : (a = t.stores, a === null ? t.stores = [e] : a.push(e));
  }
  function Qo(e, t, a, l) {
    t.value = a, t.getSnapshot = l, Vo(t) && Ko(e);
  }
  function Zo(e, t, a) {
    return a(function() {
      Vo(t) && Ko(e);
    });
  }
  function Vo(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !ht(e, a);
    } catch {
      return !0;
    }
  }
  function Ko(e) {
    var t = Ga(e, 2);
    t !== null && dt(t, e, 2);
  }
  function jc(e) {
    var t = nt();
    if (typeof e == "function") {
      var a = e;
      if (e = a(), ka) {
        ca(!0);
        try {
          a();
        } finally {
          ca(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: $t,
      lastRenderedState: e
    }, t;
  }
  function Jo(e, t, a, l) {
    return e.baseState = a, Cc(
      e,
      Ae,
      typeof l == "function" ? l : $t
    );
  }
  function Iy(e, t, a, l, i) {
    if (ji(e)) throw Error(c(485));
    if (e = t.action, e !== null) {
      var s = {
        payload: i,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(o) {
          s.listeners.push(o);
        }
      };
      O.T !== null ? a(!0) : s.isTransition = !1, l(s), a = t.pending, a === null ? (s.next = t.pending = s, Io(t, s)) : (s.next = a.next, t.pending = a.next = s);
    }
  }
  function Io(e, t) {
    var a = t.action, l = t.payload, i = e.state;
    if (t.isTransition) {
      var s = O.T, o = {};
      O.T = o;
      try {
        var d = a(i, l), v = O.S;
        v !== null && v(o, d), ko(e, t, d);
      } catch (C) {
        Nc(e, t, C);
      } finally {
        s !== null && o.types !== null && (s.types = o.types), O.T = s;
      }
    } else
      try {
        s = a(i, l), ko(e, t, s);
      } catch (C) {
        Nc(e, t, C);
      }
  }
  function ko(e, t, a) {
    a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(
      function(l) {
        $o(e, t, l);
      },
      function(l) {
        return Nc(e, t, l);
      }
    ) : $o(e, t, a);
  }
  function $o(e, t, a) {
    t.status = "fulfilled", t.value = a, Wo(t), e.state = a, t = e.pending, t !== null && (a = t.next, a === t ? e.pending = null : (a = a.next, t.next = a, Io(e, a)));
  }
  function Nc(e, t, a) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = a, Wo(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function Wo(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Fo(e, t) {
    return t;
  }
  function Po(e, t) {
    if (de) {
      var a = Ce.formState;
      if (a !== null) {
        e: {
          var l = te;
          if (de) {
            if (ze) {
              t: {
                for (var i = ze, s = Nt; i.nodeType !== 8; ) {
                  if (!s) {
                    i = null;
                    break t;
                  }
                  if (i = Dt(
                    i.nextSibling
                  ), i === null) {
                    i = null;
                    break t;
                  }
                }
                s = i.data, i = s === "F!" || s === "F" ? i : null;
              }
              if (i) {
                ze = Dt(
                  i.nextSibling
                ), l = i.data === "F!";
                break e;
              }
            }
            da(l);
          }
          l = !1;
        }
        l && (t = a[0]);
      }
    }
    return a = nt(), a.memoizedState = a.baseState = t, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Fo,
      lastRenderedState: t
    }, a.queue = l, a = bf.bind(
      null,
      te,
      l
    ), l.dispatch = a, l = jc(!1), s = Bc.bind(
      null,
      te,
      !1,
      l.queue
    ), l = nt(), i = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = i, a = Iy.bind(
      null,
      te,
      i,
      s,
      a
    ), i.dispatch = a, l.memoizedState = e, [t, a, !1];
  }
  function ef(e) {
    var t = qe();
    return tf(t, Ae, e);
  }
  function tf(e, t, a) {
    if (t = Cc(
      e,
      t,
      Fo
    )[0], e = Ei($t)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = pn(t);
      } catch (o) {
        throw o === Sl ? gi : o;
      }
    else l = t;
    t = qe();
    var i = t.queue, s = i.dispatch;
    return a !== t.memoizedState && (te.flags |= 2048, El(
      9,
      { destroy: void 0 },
      ky.bind(null, i, a),
      null
    )), [l, s, e];
  }
  function ky(e, t) {
    e.action = t;
  }
  function af(e) {
    var t = qe(), a = Ae;
    if (a !== null)
      return tf(t, a, e);
    qe(), t = t.memoizedState, a = qe();
    var l = a.queue.dispatch;
    return a.memoizedState = e, [t, l, !1];
  }
  function El(e, t, a, l) {
    return e = { tag: e, create: a, deps: l, inst: t, next: null }, t = te.updateQueue, t === null && (t = Ti(), te.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = e.next = e : (l = a.next, a.next = e, e.next = l, t.lastEffect = e), e;
  }
  function lf() {
    return qe().memoizedState;
  }
  function Ci(e, t, a, l) {
    var i = nt();
    te.flags |= e, i.memoizedState = El(
      1 | t,
      { destroy: void 0 },
      a,
      l === void 0 ? null : l
    );
  }
  function zi(e, t, a, l) {
    var i = qe();
    l = l === void 0 ? null : l;
    var s = i.memoizedState.inst;
    Ae !== null && l !== null && Sc(l, Ae.memoizedState.deps) ? i.memoizedState = El(t, s, a, l) : (te.flags |= e, i.memoizedState = El(
      1 | t,
      s,
      a,
      l
    ));
  }
  function nf(e, t) {
    Ci(8390656, 8, e, t);
  }
  function Oc(e, t) {
    zi(2048, 8, e, t);
  }
  function $y(e) {
    te.flags |= 4;
    var t = te.updateQueue;
    if (t === null)
      t = Ti(), te.updateQueue = t, t.events = [e];
    else {
      var a = t.events;
      a === null ? t.events = [e] : a.push(e);
    }
  }
  function sf(e) {
    var t = qe().memoizedState;
    return $y({ ref: t, nextImpl: e }), function() {
      if ((ge & 2) !== 0) throw Error(c(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function cf(e, t) {
    return zi(4, 2, e, t);
  }
  function uf(e, t) {
    return zi(4, 4, e, t);
  }
  function rf(e, t) {
    if (typeof t == "function") {
      e = e();
      var a = t(e);
      return function() {
        typeof a == "function" ? a() : t(null);
      };
    }
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function of(e, t, a) {
    a = a != null ? a.concat([e]) : null, zi(4, 4, rf.bind(null, t, e), a);
  }
  function Dc() {
  }
  function ff(e, t) {
    var a = qe();
    t = t === void 0 ? null : t;
    var l = a.memoizedState;
    return t !== null && Sc(t, l[1]) ? l[0] : (a.memoizedState = [e, t], e);
  }
  function df(e, t) {
    var a = qe();
    t = t === void 0 ? null : t;
    var l = a.memoizedState;
    if (t !== null && Sc(t, l[1]))
      return l[0];
    if (l = e(), ka) {
      ca(!0);
      try {
        e();
      } finally {
        ca(!1);
      }
    }
    return a.memoizedState = [l, t], l;
  }
  function Rc(e, t, a) {
    return a === void 0 || (kt & 1073741824) !== 0 && (oe & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = a, e = md(), te.lanes |= e, Sa |= e, a);
  }
  function mf(e, t, a, l) {
    return ht(a, t) ? a : xl.current !== null ? (e = Rc(e, a, l), ht(e, t) || (Ye = !0), e) : (kt & 42) === 0 || (kt & 1073741824) !== 0 && (oe & 261930) === 0 ? (Ye = !0, e.memoizedState = a) : (e = md(), te.lanes |= e, Sa |= e, t);
  }
  function pf(e, t, a, l, i) {
    var s = q.p;
    q.p = s !== 0 && 8 > s ? s : 8;
    var o = O.T, d = {};
    O.T = d, Bc(e, !1, t, a);
    try {
      var v = i(), C = O.S;
      if (C !== null && C(d, v), v !== null && typeof v == "object" && typeof v.then == "function") {
        var N = Vy(
          v,
          l
        );
        yn(
          e,
          t,
          N,
          xt(e)
        );
      } else
        yn(
          e,
          t,
          l,
          xt(e)
        );
    } catch (H) {
      yn(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: H },
        xt()
      );
    } finally {
      q.p = s, o !== null && d.types !== null && (o.types = d.types), O.T = o;
    }
  }
  function Wy() {
  }
  function Hc(e, t, a, l) {
    if (e.tag !== 5) throw Error(c(476));
    var i = yf(e).queue;
    pf(
      e,
      i,
      t,
      W,
      a === null ? Wy : function() {
        return gf(e), a(l);
      }
    );
  }
  function yf(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: W,
      baseState: W,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: $t,
        lastRenderedState: W
      },
      next: null
    };
    var a = {};
    return t.next = {
      memoizedState: a,
      baseState: a,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: $t,
        lastRenderedState: a
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function gf(e) {
    var t = yf(e);
    t.next === null && (t = e.alternate.memoizedState), yn(
      e,
      t.next.queue,
      {},
      xt()
    );
  }
  function Uc() {
    return We(Dn);
  }
  function hf() {
    return qe().memoizedState;
  }
  function vf() {
    return qe().memoizedState;
  }
  function Fy(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = xt();
          e = ya(a);
          var l = ga(t, e, a);
          l !== null && (dt(l, t, a), on(l, t, a)), t = { cache: oc() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function Py(e, t, a) {
    var l = xt();
    a = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ji(e) ? _f(t, a) : (a = Ps(e, t, a, l), a !== null && (dt(a, e, l), Sf(a, t, l)));
  }
  function bf(e, t, a) {
    var l = xt();
    yn(e, t, a, l);
  }
  function yn(e, t, a, l) {
    var i = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (ji(e)) _f(t, i);
    else {
      var s = e.alternate;
      if (e.lanes === 0 && (s === null || s.lanes === 0) && (s = t.lastRenderedReducer, s !== null))
        try {
          var o = t.lastRenderedState, d = s(o, a);
          if (i.hasEagerState = !0, i.eagerState = d, ht(d, o))
            return ri(e, t, i, 0), Ce === null && ui(), !1;
        } catch {
        }
      if (a = Ps(e, t, i, l), a !== null)
        return dt(a, e, l), Sf(a, t, l), !0;
    }
    return !1;
  }
  function Bc(e, t, a, l) {
    if (l = {
      lane: 2,
      revertLane: pu(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ji(e)) {
      if (t) throw Error(c(479));
    } else
      t = Ps(
        e,
        a,
        l,
        2
      ), t !== null && dt(t, e, 2);
  }
  function ji(e) {
    var t = e.alternate;
    return e === te || t !== null && t === te;
  }
  function _f(e, t) {
    Tl = Ai = !0;
    var a = e.pending;
    a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
  }
  function Sf(e, t, a) {
    if ((a & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, a |= l, t.lanes = a, Tr(e, a);
    }
  }
  var gn = {
    readContext: We,
    use: Mi,
    useCallback: De,
    useContext: De,
    useEffect: De,
    useImperativeHandle: De,
    useLayoutEffect: De,
    useInsertionEffect: De,
    useMemo: De,
    useReducer: De,
    useRef: De,
    useState: De,
    useDebugValue: De,
    useDeferredValue: De,
    useTransition: De,
    useSyncExternalStore: De,
    useId: De,
    useHostTransitionStatus: De,
    useFormState: De,
    useActionState: De,
    useOptimistic: De,
    useMemoCache: De,
    useCacheRefresh: De
  };
  gn.useEffectEvent = De;
  var Af = {
    readContext: We,
    use: Mi,
    useCallback: function(e, t) {
      return nt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: We,
    useEffect: nf,
    useImperativeHandle: function(e, t, a) {
      a = a != null ? a.concat([e]) : null, Ci(
        4194308,
        4,
        rf.bind(null, t, e),
        a
      );
    },
    useLayoutEffect: function(e, t) {
      return Ci(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Ci(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var a = nt();
      t = t === void 0 ? null : t;
      var l = e();
      if (ka) {
        ca(!0);
        try {
          e();
        } finally {
          ca(!1);
        }
      }
      return a.memoizedState = [l, t], l;
    },
    useReducer: function(e, t, a) {
      var l = nt();
      if (a !== void 0) {
        var i = a(t);
        if (ka) {
          ca(!0);
          try {
            a(t);
          } finally {
            ca(!1);
          }
        }
      } else i = t;
      return l.memoizedState = l.baseState = i, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: i
      }, l.queue = e, e = e.dispatch = Py.bind(
        null,
        te,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var t = nt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = jc(e);
      var t = e.queue, a = bf.bind(null, te, t);
      return t.dispatch = a, [e.memoizedState, a];
    },
    useDebugValue: Dc,
    useDeferredValue: function(e, t) {
      var a = nt();
      return Rc(a, e, t);
    },
    useTransition: function() {
      var e = jc(!1);
      return e = pf.bind(
        null,
        te,
        e.queue,
        !0,
        !1
      ), nt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, a) {
      var l = te, i = nt();
      if (de) {
        if (a === void 0)
          throw Error(c(407));
        a = a();
      } else {
        if (a = t(), Ce === null)
          throw Error(c(349));
        (oe & 127) !== 0 || Xo(l, t, a);
      }
      i.memoizedState = a;
      var s = { value: a, getSnapshot: t };
      return i.queue = s, nf(Zo.bind(null, l, s, e), [
        e
      ]), l.flags |= 2048, El(
        9,
        { destroy: void 0 },
        Qo.bind(
          null,
          l,
          s,
          a,
          t
        ),
        null
      ), a;
    },
    useId: function() {
      var e = nt(), t = Ce.identifierPrefix;
      if (de) {
        var a = Lt, l = qt;
        a = (l & ~(1 << 32 - gt(l) - 1)).toString(32) + a, t = "_" + t + "R_" + a, a = xi++, 0 < a && (t += "H" + a.toString(32)), t += "_";
      } else
        a = Ky++, t = "_" + t + "r_" + a.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Uc,
    useFormState: Po,
    useActionState: Po,
    useOptimistic: function(e) {
      var t = nt();
      t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = a, t = Bc.bind(
        null,
        te,
        !0,
        a
      ), a.dispatch = t, [e, t];
    },
    useMemoCache: Ec,
    useCacheRefresh: function() {
      return nt().memoizedState = Fy.bind(
        null,
        te
      );
    },
    useEffectEvent: function(e) {
      var t = nt(), a = { impl: e };
      return t.memoizedState = a, function() {
        if ((ge & 2) !== 0)
          throw Error(c(440));
        return a.impl.apply(void 0, arguments);
      };
    }
  }, wc = {
    readContext: We,
    use: Mi,
    useCallback: ff,
    useContext: We,
    useEffect: Oc,
    useImperativeHandle: of,
    useInsertionEffect: cf,
    useLayoutEffect: uf,
    useMemo: df,
    useReducer: Ei,
    useRef: lf,
    useState: function() {
      return Ei($t);
    },
    useDebugValue: Dc,
    useDeferredValue: function(e, t) {
      var a = qe();
      return mf(
        a,
        Ae.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Ei($t)[0], t = qe().memoizedState;
      return [
        typeof e == "boolean" ? e : pn(e),
        t
      ];
    },
    useSyncExternalStore: Yo,
    useId: hf,
    useHostTransitionStatus: Uc,
    useFormState: ef,
    useActionState: ef,
    useOptimistic: function(e, t) {
      var a = qe();
      return Jo(a, Ae, e, t);
    },
    useMemoCache: Ec,
    useCacheRefresh: vf
  };
  wc.useEffectEvent = sf;
  var xf = {
    readContext: We,
    use: Mi,
    useCallback: ff,
    useContext: We,
    useEffect: Oc,
    useImperativeHandle: of,
    useInsertionEffect: cf,
    useLayoutEffect: uf,
    useMemo: df,
    useReducer: zc,
    useRef: lf,
    useState: function() {
      return zc($t);
    },
    useDebugValue: Dc,
    useDeferredValue: function(e, t) {
      var a = qe();
      return Ae === null ? Rc(a, e, t) : mf(
        a,
        Ae.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = zc($t)[0], t = qe().memoizedState;
      return [
        typeof e == "boolean" ? e : pn(e),
        t
      ];
    },
    useSyncExternalStore: Yo,
    useId: hf,
    useHostTransitionStatus: Uc,
    useFormState: af,
    useActionState: af,
    useOptimistic: function(e, t) {
      var a = qe();
      return Ae !== null ? Jo(a, Ae, e, t) : (a.baseState = e, [e, a.queue.dispatch]);
    },
    useMemoCache: Ec,
    useCacheRefresh: vf
  };
  xf.useEffectEvent = sf;
  function qc(e, t, a, l) {
    t = e.memoizedState, a = a(l, t), a = a == null ? t : _({}, t, a), e.memoizedState = a, e.lanes === 0 && (e.updateQueue.baseState = a);
  }
  var Lc = {
    enqueueSetState: function(e, t, a) {
      e = e._reactInternals;
      var l = xt(), i = ya(l);
      i.payload = t, a != null && (i.callback = a), t = ga(e, i, l), t !== null && (dt(t, e, l), on(t, e, l));
    },
    enqueueReplaceState: function(e, t, a) {
      e = e._reactInternals;
      var l = xt(), i = ya(l);
      i.tag = 1, i.payload = t, a != null && (i.callback = a), t = ga(e, i, l), t !== null && (dt(t, e, l), on(t, e, l));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var a = xt(), l = ya(a);
      l.tag = 2, t != null && (l.callback = t), t = ga(e, l, a), t !== null && (dt(t, e, a), on(t, e, a));
    }
  };
  function Tf(e, t, a, l, i, s, o) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, s, o) : t.prototype && t.prototype.isPureReactComponent ? !tn(a, l) || !tn(i, s) : !0;
  }
  function Mf(e, t, a, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, l), t.state !== e && Lc.enqueueReplaceState(t, t.state, null);
  }
  function $a(e, t) {
    var a = t;
    if ("ref" in t) {
      a = {};
      for (var l in t)
        l !== "ref" && (a[l] = t[l]);
    }
    if (e = e.defaultProps) {
      a === t && (a = _({}, a));
      for (var i in e)
        a[i] === void 0 && (a[i] = e[i]);
    }
    return a;
  }
  function Ef(e) {
    ci(e);
  }
  function Cf(e) {
    console.error(e);
  }
  function zf(e) {
    ci(e);
  }
  function Ni(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function jf(e, t, a) {
    try {
      var l = e.onCaughtError;
      l(a.value, {
        componentStack: a.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (i) {
      setTimeout(function() {
        throw i;
      });
    }
  }
  function Gc(e, t, a) {
    return a = ya(a), a.tag = 3, a.payload = { element: null }, a.callback = function() {
      Ni(e, t);
    }, a;
  }
  function Nf(e) {
    return e = ya(e), e.tag = 3, e;
  }
  function Of(e, t, a, l) {
    var i = a.type.getDerivedStateFromError;
    if (typeof i == "function") {
      var s = l.value;
      e.payload = function() {
        return i(s);
      }, e.callback = function() {
        jf(t, a, l);
      };
    }
    var o = a.stateNode;
    o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
      jf(t, a, l), typeof i != "function" && (Aa === null ? Aa = /* @__PURE__ */ new Set([this]) : Aa.add(this));
      var d = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: d !== null ? d : ""
      });
    });
  }
  function eg(e, t, a, l, i) {
    if (a.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = a.alternate, t !== null && vl(
        t,
        a,
        i,
        !0
      ), a = bt.current, a !== null) {
        switch (a.tag) {
          case 31:
          case 13:
            return Ot === null ? Xi() : a.alternate === null && Re === 0 && (Re = 3), a.flags &= -257, a.flags |= 65536, a.lanes = i, l === hi ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), fu(e, l, i)), !1;
          case 22:
            return a.flags |= 65536, l === hi ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : a.add(l)), fu(e, l, i)), !1;
        }
        throw Error(c(435, a.tag));
      }
      return fu(e, l, i), Xi(), !1;
    }
    if (de)
      return t = bt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = i, l !== ic && (e = Error(c(422), { cause: l }), nn(Ct(e, a)))) : (l !== ic && (t = Error(c(423), {
        cause: l
      }), nn(
        Ct(t, a)
      )), e = e.current.alternate, e.flags |= 65536, i &= -i, e.lanes |= i, l = Ct(l, a), i = Gc(
        e.stateNode,
        l,
        i
      ), gc(e, i), Re !== 4 && (Re = 2)), !1;
    var s = Error(c(520), { cause: l });
    if (s = Ct(s, a), Tn === null ? Tn = [s] : Tn.push(s), Re !== 4 && (Re = 2), t === null) return !0;
    l = Ct(l, a), a = t;
    do {
      switch (a.tag) {
        case 3:
          return a.flags |= 65536, e = i & -i, a.lanes |= e, e = Gc(a.stateNode, l, e), gc(a, e), !1;
        case 1:
          if (t = a.type, s = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || s !== null && typeof s.componentDidCatch == "function" && (Aa === null || !Aa.has(s))))
            return a.flags |= 65536, i &= -i, a.lanes |= i, i = Nf(i), Of(
              i,
              e,
              a,
              l
            ), gc(a, i), !1;
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var Yc = Error(c(461)), Ye = !1;
  function Fe(e, t, a, l) {
    t.child = e === null ? Ho(t, null, a, l) : Ia(
      t,
      e.child,
      a,
      l
    );
  }
  function Df(e, t, a, l, i) {
    a = a.render;
    var s = t.ref;
    if ("ref" in l) {
      var o = {};
      for (var d in l)
        d !== "ref" && (o[d] = l[d]);
    } else o = l;
    return Za(t), l = Ac(
      e,
      t,
      a,
      o,
      s,
      i
    ), d = xc(), e !== null && !Ye ? (Tc(e, t, i), Wt(e, t, i)) : (de && d && lc(t), t.flags |= 1, Fe(e, t, l, i), t.child);
  }
  function Rf(e, t, a, l, i) {
    if (e === null) {
      var s = a.type;
      return typeof s == "function" && !ec(s) && s.defaultProps === void 0 && a.compare === null ? (t.tag = 15, t.type = s, Hf(
        e,
        t,
        s,
        l,
        i
      )) : (e = fi(
        a.type,
        null,
        l,
        t,
        t.mode,
        i
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (s = e.child, !kc(e, i)) {
      var o = s.memoizedProps;
      if (a = a.compare, a = a !== null ? a : tn, a(o, l) && e.ref === t.ref)
        return Wt(e, t, i);
    }
    return t.flags |= 1, e = Vt(s, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Hf(e, t, a, l, i) {
    if (e !== null) {
      var s = e.memoizedProps;
      if (tn(s, l) && e.ref === t.ref)
        if (Ye = !1, t.pendingProps = l = s, kc(e, i))
          (e.flags & 131072) !== 0 && (Ye = !0);
        else
          return t.lanes = e.lanes, Wt(e, t, i);
    }
    return Xc(
      e,
      t,
      a,
      l,
      i
    );
  }
  function Uf(e, t, a, l) {
    var i = l.children, s = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (s = s !== null ? s.baseLanes | a : a, e !== null) {
          for (l = t.child = e.child, i = 0; l !== null; )
            i = i | l.lanes | l.childLanes, l = l.sibling;
          l = i & ~s;
        } else l = 0, t.child = null;
        return Bf(
          e,
          t,
          s,
          a,
          l
        );
      }
      if ((a & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && yi(
          t,
          s !== null ? s.cachePool : null
        ), s !== null ? wo(t, s) : vc(), qo(t);
      else
        return l = t.lanes = 536870912, Bf(
          e,
          t,
          s !== null ? s.baseLanes | a : a,
          a,
          l
        );
    } else
      s !== null ? (yi(t, s.cachePool), wo(t, s), va(), t.memoizedState = null) : (e !== null && yi(t, null), vc(), va());
    return Fe(e, t, i, a), t.child;
  }
  function hn(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Bf(e, t, a, l, i) {
    var s = dc();
    return s = s === null ? null : { parent: Le._currentValue, pool: s }, t.memoizedState = {
      baseLanes: a,
      cachePool: s
    }, e !== null && yi(t, null), vc(), qo(t), e !== null && vl(e, t, l, !0), t.childLanes = i, null;
  }
  function Oi(e, t) {
    return t = Ri(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function wf(e, t, a) {
    return Ia(t, e.child, null, a), e = Oi(t, t.pendingProps), e.flags |= 2, _t(t), t.memoizedState = null, e;
  }
  function tg(e, t, a) {
    var l = t.pendingProps, i = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (de) {
        if (l.mode === "hidden")
          return e = Oi(t, l), t.lanes = 536870912, hn(null, e);
        if (_c(t), (e = ze) ? (e = kd(
          e,
          Nt
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: oa !== null ? { id: qt, overflow: Lt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = bo(e), a.return = t, t.child = a, $e = t, ze = null)) : e = null, e === null) throw da(t);
        return t.lanes = 536870912, null;
      }
      return Oi(t, l);
    }
    var s = e.memoizedState;
    if (s !== null) {
      var o = s.dehydrated;
      if (_c(t), i)
        if (t.flags & 256)
          t.flags &= -257, t = wf(
            e,
            t,
            a
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(c(558));
      else if (Ye || vl(e, t, a, !1), i = (a & e.childLanes) !== 0, Ye || i) {
        if (l = Ce, l !== null && (o = Mr(l, a), o !== 0 && o !== s.retryLane))
          throw s.retryLane = o, Ga(e, o), dt(l, e, o), Yc;
        Xi(), t = wf(
          e,
          t,
          a
        );
      } else
        e = s.treeContext, ze = Dt(o.nextSibling), $e = t, de = !0, fa = null, Nt = !1, e !== null && Ao(t, e), t = Oi(t, l), t.flags |= 4096;
      return t;
    }
    return e = Vt(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Di(e, t) {
    var a = t.ref;
    if (a === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object")
        throw Error(c(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function Xc(e, t, a, l, i) {
    return Za(t), a = Ac(
      e,
      t,
      a,
      l,
      void 0,
      i
    ), l = xc(), e !== null && !Ye ? (Tc(e, t, i), Wt(e, t, i)) : (de && l && lc(t), t.flags |= 1, Fe(e, t, a, i), t.child);
  }
  function qf(e, t, a, l, i, s) {
    return Za(t), t.updateQueue = null, a = Go(
      t,
      l,
      a,
      i
    ), Lo(e), l = xc(), e !== null && !Ye ? (Tc(e, t, s), Wt(e, t, s)) : (de && l && lc(t), t.flags |= 1, Fe(e, t, a, s), t.child);
  }
  function Lf(e, t, a, l, i) {
    if (Za(t), t.stateNode === null) {
      var s = pl, o = a.contextType;
      typeof o == "object" && o !== null && (s = We(o)), s = new a(l, s), t.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null, s.updater = Lc, t.stateNode = s, s._reactInternals = t, s = t.stateNode, s.props = l, s.state = t.memoizedState, s.refs = {}, pc(t), o = a.contextType, s.context = typeof o == "object" && o !== null ? We(o) : pl, s.state = t.memoizedState, o = a.getDerivedStateFromProps, typeof o == "function" && (qc(
        t,
        a,
        o,
        l
      ), s.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof s.getSnapshotBeforeUpdate == "function" || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (o = s.state, typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount(), o !== s.state && Lc.enqueueReplaceState(s, s.state, null), dn(t, l, s, i), fn(), s.state = t.memoizedState), typeof s.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      s = t.stateNode;
      var d = t.memoizedProps, v = $a(a, d);
      s.props = v;
      var C = s.context, N = a.contextType;
      o = pl, typeof N == "object" && N !== null && (o = We(N));
      var H = a.getDerivedStateFromProps;
      N = typeof H == "function" || typeof s.getSnapshotBeforeUpdate == "function", d = t.pendingProps !== d, N || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (d || C !== o) && Mf(
        t,
        s,
        l,
        o
      ), pa = !1;
      var z = t.memoizedState;
      s.state = z, dn(t, l, s, i), fn(), C = t.memoizedState, d || z !== C || pa ? (typeof H == "function" && (qc(
        t,
        a,
        H,
        l
      ), C = t.memoizedState), (v = pa || Tf(
        t,
        a,
        v,
        l,
        z,
        C,
        o
      )) ? (N || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = C), s.props = l, s.state = C, s.context = o, l = v) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      s = t.stateNode, yc(e, t), o = t.memoizedProps, N = $a(a, o), s.props = N, H = t.pendingProps, z = s.context, C = a.contextType, v = pl, typeof C == "object" && C !== null && (v = We(C)), d = a.getDerivedStateFromProps, (C = typeof d == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (o !== H || z !== v) && Mf(
        t,
        s,
        l,
        v
      ), pa = !1, z = t.memoizedState, s.state = z, dn(t, l, s, i), fn();
      var j = t.memoizedState;
      o !== H || z !== j || pa || e !== null && e.dependencies !== null && mi(e.dependencies) ? (typeof d == "function" && (qc(
        t,
        a,
        d,
        l
      ), j = t.memoizedState), (N = pa || Tf(
        t,
        a,
        N,
        l,
        z,
        j,
        v
      ) || e !== null && e.dependencies !== null && mi(e.dependencies)) ? (C || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(l, j, v), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(
        l,
        j,
        v
      )), typeof s.componentDidUpdate == "function" && (t.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || o === e.memoizedProps && z === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && z === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = j), s.props = l, s.state = j, s.context = v, l = N) : (typeof s.componentDidUpdate != "function" || o === e.memoizedProps && z === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && z === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return s = l, Di(e, t), l = (t.flags & 128) !== 0, s || l ? (s = t.stateNode, a = l && typeof a.getDerivedStateFromError != "function" ? null : s.render(), t.flags |= 1, e !== null && l ? (t.child = Ia(
      t,
      e.child,
      null,
      i
    ), t.child = Ia(
      t,
      null,
      a,
      i
    )) : Fe(e, t, a, i), t.memoizedState = s.state, e = t.child) : e = Wt(
      e,
      t,
      i
    ), e;
  }
  function Gf(e, t, a, l) {
    return Xa(), t.flags |= 256, Fe(e, t, a, l), t.child;
  }
  var Qc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Zc(e) {
    return { baseLanes: e, cachePool: zo() };
  }
  function Vc(e, t, a) {
    return e = e !== null ? e.childLanes & ~a : 0, t && (e |= At), e;
  }
  function Yf(e, t, a) {
    var l = t.pendingProps, i = !1, s = (t.flags & 128) !== 0, o;
    if ((o = s) || (o = e !== null && e.memoizedState === null ? !1 : (we.current & 2) !== 0), o && (i = !0, t.flags &= -129), o = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (de) {
        if (i ? ha(t) : va(), (e = ze) ? (e = kd(
          e,
          Nt
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: oa !== null ? { id: qt, overflow: Lt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = bo(e), a.return = t, t.child = a, $e = t, ze = null)) : e = null, e === null) throw da(t);
        return Cu(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var d = l.children;
      return l = l.fallback, i ? (va(), i = t.mode, d = Ri(
        { mode: "hidden", children: d },
        i
      ), l = Ya(
        l,
        i,
        a,
        null
      ), d.return = t, l.return = t, d.sibling = l, t.child = d, l = t.child, l.memoizedState = Zc(a), l.childLanes = Vc(
        e,
        o,
        a
      ), t.memoizedState = Qc, hn(null, l)) : (ha(t), Kc(t, d));
    }
    var v = e.memoizedState;
    if (v !== null && (d = v.dehydrated, d !== null)) {
      if (s)
        t.flags & 256 ? (ha(t), t.flags &= -257, t = Jc(
          e,
          t,
          a
        )) : t.memoizedState !== null ? (va(), t.child = e.child, t.flags |= 128, t = null) : (va(), d = l.fallback, i = t.mode, l = Ri(
          { mode: "visible", children: l.children },
          i
        ), d = Ya(
          d,
          i,
          a,
          null
        ), d.flags |= 2, l.return = t, d.return = t, l.sibling = d, t.child = l, Ia(
          t,
          e.child,
          null,
          a
        ), l = t.child, l.memoizedState = Zc(a), l.childLanes = Vc(
          e,
          o,
          a
        ), t.memoizedState = Qc, t = hn(null, l));
      else if (ha(t), Cu(d)) {
        if (o = d.nextSibling && d.nextSibling.dataset, o) var C = o.dgst;
        o = C, l = Error(c(419)), l.stack = "", l.digest = o, nn({ value: l, source: null, stack: null }), t = Jc(
          e,
          t,
          a
        );
      } else if (Ye || vl(e, t, a, !1), o = (a & e.childLanes) !== 0, Ye || o) {
        if (o = Ce, o !== null && (l = Mr(o, a), l !== 0 && l !== v.retryLane))
          throw v.retryLane = l, Ga(e, l), dt(o, e, l), Yc;
        Eu(d) || Xi(), t = Jc(
          e,
          t,
          a
        );
      } else
        Eu(d) ? (t.flags |= 192, t.child = e.child, t = null) : (e = v.treeContext, ze = Dt(
          d.nextSibling
        ), $e = t, de = !0, fa = null, Nt = !1, e !== null && Ao(t, e), t = Kc(
          t,
          l.children
        ), t.flags |= 4096);
      return t;
    }
    return i ? (va(), d = l.fallback, i = t.mode, v = e.child, C = v.sibling, l = Vt(v, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = v.subtreeFlags & 65011712, C !== null ? d = Vt(
      C,
      d
    ) : (d = Ya(
      d,
      i,
      a,
      null
    ), d.flags |= 2), d.return = t, l.return = t, l.sibling = d, t.child = l, hn(null, l), l = t.child, d = e.child.memoizedState, d === null ? d = Zc(a) : (i = d.cachePool, i !== null ? (v = Le._currentValue, i = i.parent !== v ? { parent: v, pool: v } : i) : i = zo(), d = {
      baseLanes: d.baseLanes | a,
      cachePool: i
    }), l.memoizedState = d, l.childLanes = Vc(
      e,
      o,
      a
    ), t.memoizedState = Qc, hn(e.child, l)) : (ha(t), a = e.child, e = a.sibling, a = Vt(a, {
      mode: "visible",
      children: l.children
    }), a.return = t, a.sibling = null, e !== null && (o = t.deletions, o === null ? (t.deletions = [e], t.flags |= 16) : o.push(e)), t.child = a, t.memoizedState = null, a);
  }
  function Kc(e, t) {
    return t = Ri(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Ri(e, t) {
    return e = vt(22, e, null, t), e.lanes = 0, e;
  }
  function Jc(e, t, a) {
    return Ia(t, e.child, null, a), e = Kc(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Xf(e, t, a) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), uc(e.return, t, a);
  }
  function Ic(e, t, a, l, i, s) {
    var o = e.memoizedState;
    o === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: a,
      tailMode: i,
      treeForkCount: s
    } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = l, o.tail = a, o.tailMode = i, o.treeForkCount = s);
  }
  function Qf(e, t, a) {
    var l = t.pendingProps, i = l.revealOrder, s = l.tail;
    l = l.children;
    var o = we.current, d = (o & 2) !== 0;
    if (d ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, G(we, o), Fe(e, t, l, a), l = de ? ln : 0, !d && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Xf(e, a, t);
        else if (e.tag === 19)
          Xf(e, a, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t)
            break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    switch (i) {
      case "forwards":
        for (a = t.child, i = null; a !== null; )
          e = a.alternate, e !== null && Si(e) === null && (i = a), a = a.sibling;
        a = i, a === null ? (i = t.child, t.child = null) : (i = a.sibling, a.sibling = null), Ic(
          t,
          !1,
          i,
          a,
          s,
          l
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (a = null, i = t.child, t.child = null; i !== null; ) {
          if (e = i.alternate, e !== null && Si(e) === null) {
            t.child = i;
            break;
          }
          e = i.sibling, i.sibling = a, a = i, i = e;
        }
        Ic(
          t,
          !0,
          a,
          null,
          s,
          l
        );
        break;
      case "together":
        Ic(
          t,
          !1,
          null,
          null,
          void 0,
          l
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Wt(e, t, a) {
    if (e !== null && (t.dependencies = e.dependencies), Sa |= t.lanes, (a & t.childLanes) === 0)
      if (e !== null) {
        if (vl(
          e,
          t,
          a,
          !1
        ), (a & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(c(153));
    if (t.child !== null) {
      for (e = t.child, a = Vt(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
        e = e.sibling, a = a.sibling = Vt(e, e.pendingProps), a.return = t;
      a.sibling = null;
    }
    return t.child;
  }
  function kc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && mi(e)));
  }
  function ag(e, t, a) {
    switch (t.tag) {
      case 3:
        lt(t, t.stateNode.containerInfo), ma(t, Le, e.memoizedState.cache), Xa();
        break;
      case 27:
      case 5:
        Xl(t);
        break;
      case 4:
        lt(t, t.stateNode.containerInfo);
        break;
      case 10:
        ma(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, _c(t), null;
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (ha(t), t.flags |= 128, null) : (a & t.child.childLanes) !== 0 ? Yf(e, t, a) : (ha(t), e = Wt(
            e,
            t,
            a
          ), e !== null ? e.sibling : null);
        ha(t);
        break;
      case 19:
        var i = (e.flags & 128) !== 0;
        if (l = (a & t.childLanes) !== 0, l || (vl(
          e,
          t,
          a,
          !1
        ), l = (a & t.childLanes) !== 0), i) {
          if (l)
            return Qf(
              e,
              t,
              a
            );
          t.flags |= 128;
        }
        if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), G(we, we.current), l) break;
        return null;
      case 22:
        return t.lanes = 0, Uf(
          e,
          t,
          a,
          t.pendingProps
        );
      case 24:
        ma(t, Le, e.memoizedState.cache);
    }
    return Wt(e, t, a);
  }
  function Zf(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Ye = !0;
      else {
        if (!kc(e, a) && (t.flags & 128) === 0)
          return Ye = !1, ag(
            e,
            t,
            a
          );
        Ye = (e.flags & 131072) !== 0;
      }
    else
      Ye = !1, de && (t.flags & 1048576) !== 0 && So(t, ln, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = Ka(t.elementType), t.type = e, typeof e == "function")
            ec(e) ? (l = $a(e, l), t.tag = 1, t = Lf(
              null,
              t,
              e,
              l,
              a
            )) : (t.tag = 0, t = Xc(
              null,
              t,
              e,
              l,
              a
            ));
          else {
            if (e != null) {
              var i = e.$$typeof;
              if (i === ie) {
                t.tag = 11, t = Df(
                  null,
                  t,
                  e,
                  l,
                  a
                );
                break e;
              } else if (i === Y) {
                t.tag = 14, t = Rf(
                  null,
                  t,
                  e,
                  l,
                  a
                );
                break e;
              }
            }
            throw t = at(e) || e, Error(c(306, t, ""));
          }
        }
        return t;
      case 0:
        return Xc(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 1:
        return l = t.type, i = $a(
          l,
          t.pendingProps
        ), Lf(
          e,
          t,
          l,
          i,
          a
        );
      case 3:
        e: {
          if (lt(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(c(387));
          l = t.pendingProps;
          var s = t.memoizedState;
          i = s.element, yc(e, t), dn(t, l, null, a);
          var o = t.memoizedState;
          if (l = o.cache, ma(t, Le, l), l !== s.cache && rc(
            t,
            [Le],
            a,
            !0
          ), fn(), l = o.element, s.isDehydrated)
            if (s = {
              element: l,
              isDehydrated: !1,
              cache: o.cache
            }, t.updateQueue.baseState = s, t.memoizedState = s, t.flags & 256) {
              t = Gf(
                e,
                t,
                l,
                a
              );
              break e;
            } else if (l !== i) {
              i = Ct(
                Error(c(424)),
                t
              ), nn(i), t = Gf(
                e,
                t,
                l,
                a
              );
              break e;
            } else
              for (e = t.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, ze = Dt(e.firstChild), $e = t, de = !0, fa = null, Nt = !0, a = Ho(
                t,
                null,
                l,
                a
              ), t.child = a; a; )
                a.flags = a.flags & -3 | 4096, a = a.sibling;
          else {
            if (Xa(), l === i) {
              t = Wt(
                e,
                t,
                a
              );
              break e;
            }
            Fe(e, t, l, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Di(e, t), e === null ? (a = tm(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = a : de || (a = t.type, e = t.pendingProps, l = ki(
          ce.current
        ).createElement(a), l[ke] = t, l[st] = e, Pe(l, a, e), Ve(l), t.stateNode = l) : t.memoizedState = tm(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Xl(t), e === null && de && (l = t.stateNode = Fd(
          t.type,
          t.pendingProps,
          ce.current
        ), $e = t, Nt = !0, i = ze, Ea(t.type) ? (zu = i, ze = Dt(l.firstChild)) : ze = i), Fe(
          e,
          t,
          t.pendingProps.children,
          a
        ), Di(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && de && ((i = l = ze) && (l = Dg(
          l,
          t.type,
          t.pendingProps,
          Nt
        ), l !== null ? (t.stateNode = l, $e = t, ze = Dt(l.firstChild), Nt = !1, i = !0) : i = !1), i || da(t)), Xl(t), i = t.type, s = t.pendingProps, o = e !== null ? e.memoizedProps : null, l = s.children, xu(i, s) ? l = null : o !== null && xu(i, o) && (t.flags |= 32), t.memoizedState !== null && (i = Ac(
          e,
          t,
          Jy,
          null,
          null,
          a
        ), Dn._currentValue = i), Di(e, t), Fe(e, t, l, a), t.child;
      case 6:
        return e === null && de && ((e = a = ze) && (a = Rg(
          a,
          t.pendingProps,
          Nt
        ), a !== null ? (t.stateNode = a, $e = t, ze = null, e = !0) : e = !1), e || da(t)), null;
      case 13:
        return Yf(e, t, a);
      case 4:
        return lt(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = Ia(
          t,
          null,
          l,
          a
        ) : Fe(e, t, l, a), t.child;
      case 11:
        return Df(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 7:
        return Fe(
          e,
          t,
          t.pendingProps,
          a
        ), t.child;
      case 8:
        return Fe(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 12:
        return Fe(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 10:
        return l = t.pendingProps, ma(t, t.type, l.value), Fe(e, t, l.children, a), t.child;
      case 9:
        return i = t.type._context, l = t.pendingProps.children, Za(t), i = We(i), l = l(i), t.flags |= 1, Fe(e, t, l, a), t.child;
      case 14:
        return Rf(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 15:
        return Hf(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 19:
        return Qf(e, t, a);
      case 31:
        return tg(e, t, a);
      case 22:
        return Uf(
          e,
          t,
          a,
          t.pendingProps
        );
      case 24:
        return Za(t), l = We(Le), e === null ? (i = dc(), i === null && (i = Ce, s = oc(), i.pooledCache = s, s.refCount++, s !== null && (i.pooledCacheLanes |= a), i = s), t.memoizedState = { parent: l, cache: i }, pc(t), ma(t, Le, i)) : ((e.lanes & a) !== 0 && (yc(e, t), dn(t, null, null, a), fn()), i = e.memoizedState, s = t.memoizedState, i.parent !== l ? (i = { parent: l, cache: l }, t.memoizedState = i, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i), ma(t, Le, l)) : (l = s.cache, ma(t, Le, l), l !== i.cache && rc(
          t,
          [Le],
          a,
          !0
        ))), Fe(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(c(156, t.tag));
  }
  function Ft(e) {
    e.flags |= 4;
  }
  function $c(e, t, a, l, i) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (i & 335544128) === i)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (hd()) e.flags |= 8192;
        else
          throw Ja = hi, mc;
    } else e.flags &= -16777217;
  }
  function Vf(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !sm(t))
      if (hd()) e.flags |= 8192;
      else
        throw Ja = hi, mc;
  }
  function Hi(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Ar() : 536870912, e.lanes |= t, Nl |= t);
  }
  function vn(e, t) {
    if (!de)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var a = null; t !== null; )
            t.alternate !== null && (a = t), t = t.sibling;
          a === null ? e.tail = null : a.sibling = null;
          break;
        case "collapsed":
          a = e.tail;
          for (var l = null; a !== null; )
            a.alternate !== null && (l = a), a = a.sibling;
          l === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : l.sibling = null;
      }
  }
  function je(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, a = 0, l = 0;
    if (t)
      for (var i = e.child; i !== null; )
        a |= i.lanes | i.childLanes, l |= i.subtreeFlags & 65011712, l |= i.flags & 65011712, i.return = e, i = i.sibling;
    else
      for (i = e.child; i !== null; )
        a |= i.lanes | i.childLanes, l |= i.subtreeFlags, l |= i.flags, i.return = e, i = i.sibling;
    return e.subtreeFlags |= l, e.childLanes = a, t;
  }
  function lg(e, t, a) {
    var l = t.pendingProps;
    switch (nc(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return je(t), null;
      case 1:
        return je(t), null;
      case 3:
        return a = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), It(Le), Be(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (hl(t) ? Ft(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, sc())), je(t), null;
      case 26:
        var i = t.type, s = t.memoizedState;
        return e === null ? (Ft(t), s !== null ? (je(t), Vf(t, s)) : (je(t), $c(
          t,
          i,
          null,
          l,
          a
        ))) : s ? s !== e.memoizedState ? (Ft(t), je(t), Vf(t, s)) : (je(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && Ft(t), je(t), $c(
          t,
          i,
          e,
          l,
          a
        )), null;
      case 27:
        if (Vn(t), a = ce.current, i = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Ft(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(c(166));
            return je(t), null;
          }
          e = Z.current, hl(t) ? xo(t) : (e = Fd(i, l, a), t.stateNode = e, Ft(t));
        }
        return je(t), null;
      case 5:
        if (Vn(t), i = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Ft(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(c(166));
            return je(t), null;
          }
          if (s = Z.current, hl(t))
            xo(t);
          else {
            var o = ki(
              ce.current
            );
            switch (s) {
              case 1:
                s = o.createElementNS(
                  "http://www.w3.org/2000/svg",
                  i
                );
                break;
              case 2:
                s = o.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  i
                );
                break;
              default:
                switch (i) {
                  case "svg":
                    s = o.createElementNS(
                      "http://www.w3.org/2000/svg",
                      i
                    );
                    break;
                  case "math":
                    s = o.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      i
                    );
                    break;
                  case "script":
                    s = o.createElement("div"), s.innerHTML = "<script><\/script>", s = s.removeChild(
                      s.firstChild
                    );
                    break;
                  case "select":
                    s = typeof l.is == "string" ? o.createElement("select", {
                      is: l.is
                    }) : o.createElement("select"), l.multiple ? s.multiple = !0 : l.size && (s.size = l.size);
                    break;
                  default:
                    s = typeof l.is == "string" ? o.createElement(i, { is: l.is }) : o.createElement(i);
                }
            }
            s[ke] = t, s[st] = l;
            e: for (o = t.child; o !== null; ) {
              if (o.tag === 5 || o.tag === 6)
                s.appendChild(o.stateNode);
              else if (o.tag !== 4 && o.tag !== 27 && o.child !== null) {
                o.child.return = o, o = o.child;
                continue;
              }
              if (o === t) break e;
              for (; o.sibling === null; ) {
                if (o.return === null || o.return === t)
                  break e;
                o = o.return;
              }
              o.sibling.return = o.return, o = o.sibling;
            }
            t.stateNode = s;
            e: switch (Pe(s, i, l), i) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                l = !!l.autoFocus;
                break e;
              case "img":
                l = !0;
                break e;
              default:
                l = !1;
            }
            l && Ft(t);
          }
        }
        return je(t), $c(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          a
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== l && Ft(t);
        else {
          if (typeof l != "string" && t.stateNode === null)
            throw Error(c(166));
          if (e = ce.current, hl(t)) {
            if (e = t.stateNode, a = t.memoizedProps, l = null, i = $e, i !== null)
              switch (i.tag) {
                case 27:
                case 5:
                  l = i.memoizedProps;
              }
            e[ke] = t, e = !!(e.nodeValue === a || l !== null && l.suppressHydrationWarning === !0 || Yd(e.nodeValue, a)), e || da(t, !0);
          } else
            e = ki(e).createTextNode(
              l
            ), e[ke] = t, t.stateNode = e;
        }
        return je(t), null;
      case 31:
        if (a = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = hl(t), a !== null) {
            if (e === null) {
              if (!l) throw Error(c(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(557));
              e[ke] = t;
            } else
              Xa(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            je(t), e = !1;
          } else
            a = sc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), e = !0;
          if (!e)
            return t.flags & 256 ? (_t(t), t) : (_t(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(c(558));
        }
        return je(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (i = hl(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!i) throw Error(c(318));
              if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(c(317));
              i[ke] = t;
            } else
              Xa(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            je(t), i = !1;
          } else
            i = sc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), i = !0;
          if (!i)
            return t.flags & 256 ? (_t(t), t) : (_t(t), null);
        }
        return _t(t), (t.flags & 128) !== 0 ? (t.lanes = a, t) : (a = l !== null, e = e !== null && e.memoizedState !== null, a && (l = t.child, i = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (i = l.alternate.memoizedState.cachePool.pool), s = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (s = l.memoizedState.cachePool.pool), s !== i && (l.flags |= 2048)), a !== e && a && (t.child.flags |= 8192), Hi(t, t.updateQueue), je(t), null);
      case 4:
        return Be(), e === null && vu(t.stateNode.containerInfo), je(t), null;
      case 10:
        return It(t.type), je(t), null;
      case 19:
        if (U(we), l = t.memoizedState, l === null) return je(t), null;
        if (i = (t.flags & 128) !== 0, s = l.rendering, s === null)
          if (i) vn(l, !1);
          else {
            if (Re !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (s = Si(e), s !== null) {
                  for (t.flags |= 128, vn(l, !1), e = s.updateQueue, t.updateQueue = e, Hi(t, e), t.subtreeFlags = 0, e = a, a = t.child; a !== null; )
                    vo(a, e), a = a.sibling;
                  return G(
                    we,
                    we.current & 1 | 2
                  ), de && Kt(t, l.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && pt() > Li && (t.flags |= 128, i = !0, vn(l, !1), t.lanes = 4194304);
          }
        else {
          if (!i)
            if (e = Si(s), e !== null) {
              if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, Hi(t, e), vn(l, !0), l.tail === null && l.tailMode === "hidden" && !s.alternate && !de)
                return je(t), null;
            } else
              2 * pt() - l.renderingStartTime > Li && a !== 536870912 && (t.flags |= 128, i = !0, vn(l, !1), t.lanes = 4194304);
          l.isBackwards ? (s.sibling = t.child, t.child = s) : (e = l.last, e !== null ? e.sibling = s : t.child = s, l.last = s);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = pt(), e.sibling = null, a = we.current, G(
          we,
          i ? a & 1 | 2 : a & 1
        ), de && Kt(t, l.treeForkCount), e) : (je(t), null);
      case 22:
      case 23:
        return _t(t), bc(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (je(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : je(t), a = t.updateQueue, a !== null && Hi(t, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== a && (t.flags |= 2048), e !== null && U(Va), null;
      case 24:
        return a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), It(Le), je(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(c(156, t.tag));
  }
  function ng(e, t) {
    switch (nc(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return It(Le), Be(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Vn(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (_t(t), t.alternate === null)
            throw Error(c(340));
          Xa();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (_t(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(c(340));
          Xa();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return U(we), null;
      case 4:
        return Be(), null;
      case 10:
        return It(t.type), null;
      case 22:
      case 23:
        return _t(t), bc(), e !== null && U(Va), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return It(Le), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Kf(e, t) {
    switch (nc(t), t.tag) {
      case 3:
        It(Le), Be();
        break;
      case 26:
      case 27:
      case 5:
        Vn(t);
        break;
      case 4:
        Be();
        break;
      case 31:
        t.memoizedState !== null && _t(t);
        break;
      case 13:
        _t(t);
        break;
      case 19:
        U(we);
        break;
      case 10:
        It(t.type);
        break;
      case 22:
      case 23:
        _t(t), bc(), e !== null && U(Va);
        break;
      case 24:
        It(Le);
    }
  }
  function bn(e, t) {
    try {
      var a = t.updateQueue, l = a !== null ? a.lastEffect : null;
      if (l !== null) {
        var i = l.next;
        a = i;
        do {
          if ((a.tag & e) === e) {
            l = void 0;
            var s = a.create, o = a.inst;
            l = s(), o.destroy = l;
          }
          a = a.next;
        } while (a !== i);
      }
    } catch (d) {
      _e(t, t.return, d);
    }
  }
  function ba(e, t, a) {
    try {
      var l = t.updateQueue, i = l !== null ? l.lastEffect : null;
      if (i !== null) {
        var s = i.next;
        l = s;
        do {
          if ((l.tag & e) === e) {
            var o = l.inst, d = o.destroy;
            if (d !== void 0) {
              o.destroy = void 0, i = t;
              var v = a, C = d;
              try {
                C();
              } catch (N) {
                _e(
                  i,
                  v,
                  N
                );
              }
            }
          }
          l = l.next;
        } while (l !== s);
      }
    } catch (N) {
      _e(t, t.return, N);
    }
  }
  function Jf(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        Bo(t, a);
      } catch (l) {
        _e(e, e.return, l);
      }
    }
  }
  function If(e, t, a) {
    a.props = $a(
      e.type,
      e.memoizedProps
    ), a.state = e.memoizedState;
    try {
      a.componentWillUnmount();
    } catch (l) {
      _e(e, t, l);
    }
  }
  function _n(e, t) {
    try {
      var a = e.ref;
      if (a !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var l = e.stateNode;
            break;
          case 30:
            l = e.stateNode;
            break;
          default:
            l = e.stateNode;
        }
        typeof a == "function" ? e.refCleanup = a(l) : a.current = l;
      }
    } catch (i) {
      _e(e, t, i);
    }
  }
  function Gt(e, t) {
    var a = e.ref, l = e.refCleanup;
    if (a !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (i) {
          _e(e, t, i);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (i) {
          _e(e, t, i);
        }
      else a.current = null;
  }
  function kf(e) {
    var t = e.type, a = e.memoizedProps, l = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && l.focus();
          break e;
        case "img":
          a.src ? l.src = a.src : a.srcSet && (l.srcset = a.srcSet);
      }
    } catch (i) {
      _e(e, e.return, i);
    }
  }
  function Wc(e, t, a) {
    try {
      var l = e.stateNode;
      Eg(l, e.type, a, t), l[st] = t;
    } catch (i) {
      _e(e, e.return, i);
    }
  }
  function $f(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Ea(e.type) || e.tag === 4;
  }
  function Fc(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || $f(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Ea(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Pc(e, t, a) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(e, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(e), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = Qt));
    else if (l !== 4 && (l === 27 && Ea(e.type) && (a = e.stateNode, t = null), e = e.child, e !== null))
      for (Pc(e, t, a), e = e.sibling; e !== null; )
        Pc(e, t, a), e = e.sibling;
  }
  function Ui(e, t, a) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? a.insertBefore(e, t) : a.appendChild(e);
    else if (l !== 4 && (l === 27 && Ea(e.type) && (a = e.stateNode), e = e.child, e !== null))
      for (Ui(e, t, a), e = e.sibling; e !== null; )
        Ui(e, t, a), e = e.sibling;
  }
  function Wf(e) {
    var t = e.stateNode, a = e.memoizedProps;
    try {
      for (var l = e.type, i = t.attributes; i.length; )
        t.removeAttributeNode(i[0]);
      Pe(t, l, a), t[ke] = e, t[st] = a;
    } catch (s) {
      _e(e, e.return, s);
    }
  }
  var Pt = !1, Xe = !1, eu = !1, Ff = typeof WeakSet == "function" ? WeakSet : Set, Ke = null;
  function ig(e, t) {
    if (e = e.containerInfo, Su = as, e = uo(e), Js(e)) {
      if ("selectionStart" in e)
        var a = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          a = (a = e.ownerDocument) && a.defaultView || window;
          var l = a.getSelection && a.getSelection();
          if (l && l.rangeCount !== 0) {
            a = l.anchorNode;
            var i = l.anchorOffset, s = l.focusNode;
            l = l.focusOffset;
            try {
              a.nodeType, s.nodeType;
            } catch {
              a = null;
              break e;
            }
            var o = 0, d = -1, v = -1, C = 0, N = 0, H = e, z = null;
            t: for (; ; ) {
              for (var j; H !== a || i !== 0 && H.nodeType !== 3 || (d = o + i), H !== s || l !== 0 && H.nodeType !== 3 || (v = o + l), H.nodeType === 3 && (o += H.nodeValue.length), (j = H.firstChild) !== null; )
                z = H, H = j;
              for (; ; ) {
                if (H === e) break t;
                if (z === a && ++C === i && (d = o), z === s && ++N === l && (v = o), (j = H.nextSibling) !== null) break;
                H = z, z = H.parentNode;
              }
              H = j;
            }
            a = d === -1 || v === -1 ? null : { start: d, end: v };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Au = { focusedElem: e, selectionRange: a }, as = !1, Ke = t; Ke !== null; )
      if (t = Ke, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, Ke = e;
      else
        for (; Ke !== null; ) {
          switch (t = Ke, s = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (a = 0; a < e.length; a++)
                  i = e[a], i.ref.impl = i.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && s !== null) {
                e = void 0, a = t, i = s.memoizedProps, s = s.memoizedState, l = a.stateNode;
                try {
                  var X = $a(
                    a.type,
                    i
                  );
                  e = l.getSnapshotBeforeUpdate(
                    X,
                    s
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
                } catch (k) {
                  _e(
                    a,
                    a.return,
                    k
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, a = e.nodeType, a === 9)
                  Mu(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Mu(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(c(163));
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, Ke = e;
            break;
          }
          Ke = t.return;
        }
  }
  function Pf(e, t, a) {
    var l = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        ta(e, a), l & 4 && bn(5, a);
        break;
      case 1:
        if (ta(e, a), l & 4)
          if (e = a.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (o) {
              _e(a, a.return, o);
            }
          else {
            var i = $a(
              a.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                i,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (o) {
              _e(
                a,
                a.return,
                o
              );
            }
          }
        l & 64 && Jf(a), l & 512 && _n(a, a.return);
        break;
      case 3:
        if (ta(e, a), l & 64 && (e = a.updateQueue, e !== null)) {
          if (t = null, a.child !== null)
            switch (a.child.tag) {
              case 27:
              case 5:
                t = a.child.stateNode;
                break;
              case 1:
                t = a.child.stateNode;
            }
          try {
            Bo(e, t);
          } catch (o) {
            _e(a, a.return, o);
          }
        }
        break;
      case 27:
        t === null && l & 4 && Wf(a);
      case 26:
      case 5:
        ta(e, a), t === null && l & 4 && kf(a), l & 512 && _n(a, a.return);
        break;
      case 12:
        ta(e, a);
        break;
      case 31:
        ta(e, a), l & 4 && ad(e, a);
        break;
      case 13:
        ta(e, a), l & 4 && ld(e, a), l & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (a = pg.bind(
          null,
          a
        ), Hg(e, a))));
        break;
      case 22:
        if (l = a.memoizedState !== null || Pt, !l) {
          t = t !== null && t.memoizedState !== null || Xe, i = Pt;
          var s = Xe;
          Pt = l, (Xe = t) && !s ? aa(
            e,
            a,
            (a.subtreeFlags & 8772) !== 0
          ) : ta(e, a), Pt = i, Xe = s;
        }
        break;
      case 30:
        break;
      default:
        ta(e, a);
    }
  }
  function ed(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, ed(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Ns(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Oe = null, ut = !1;
  function ea(e, t, a) {
    for (a = a.child; a !== null; )
      td(e, t, a), a = a.sibling;
  }
  function td(e, t, a) {
    if (yt && typeof yt.onCommitFiberUnmount == "function")
      try {
        yt.onCommitFiberUnmount(Ql, a);
      } catch {
      }
    switch (a.tag) {
      case 26:
        Xe || Gt(a, t), ea(
          e,
          t,
          a
        ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
        break;
      case 27:
        Xe || Gt(a, t);
        var l = Oe, i = ut;
        Ea(a.type) && (Oe = a.stateNode, ut = !1), ea(
          e,
          t,
          a
        ), jn(a.stateNode), Oe = l, ut = i;
        break;
      case 5:
        Xe || Gt(a, t);
      case 6:
        if (l = Oe, i = ut, Oe = null, ea(
          e,
          t,
          a
        ), Oe = l, ut = i, Oe !== null)
          if (ut)
            try {
              (Oe.nodeType === 9 ? Oe.body : Oe.nodeName === "HTML" ? Oe.ownerDocument.body : Oe).removeChild(a.stateNode);
            } catch (s) {
              _e(
                a,
                t,
                s
              );
            }
          else
            try {
              Oe.removeChild(a.stateNode);
            } catch (s) {
              _e(
                a,
                t,
                s
              );
            }
        break;
      case 18:
        Oe !== null && (ut ? (e = Oe, Jd(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          a.stateNode
        ), ql(e)) : Jd(Oe, a.stateNode));
        break;
      case 4:
        l = Oe, i = ut, Oe = a.stateNode.containerInfo, ut = !0, ea(
          e,
          t,
          a
        ), Oe = l, ut = i;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ba(2, a, t), Xe || ba(4, a, t), ea(
          e,
          t,
          a
        );
        break;
      case 1:
        Xe || (Gt(a, t), l = a.stateNode, typeof l.componentWillUnmount == "function" && If(
          a,
          t,
          l
        )), ea(
          e,
          t,
          a
        );
        break;
      case 21:
        ea(
          e,
          t,
          a
        );
        break;
      case 22:
        Xe = (l = Xe) || a.memoizedState !== null, ea(
          e,
          t,
          a
        ), Xe = l;
        break;
      default:
        ea(
          e,
          t,
          a
        );
    }
  }
  function ad(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        ql(e);
      } catch (a) {
        _e(t, t.return, a);
      }
    }
  }
  function ld(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        ql(e);
      } catch (a) {
        _e(t, t.return, a);
      }
  }
  function sg(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Ff()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Ff()), t;
      default:
        throw Error(c(435, e.tag));
    }
  }
  function Bi(e, t) {
    var a = sg(e);
    t.forEach(function(l) {
      if (!a.has(l)) {
        a.add(l);
        var i = yg.bind(null, e, l);
        l.then(i, i);
      }
    });
  }
  function rt(e, t) {
    var a = t.deletions;
    if (a !== null)
      for (var l = 0; l < a.length; l++) {
        var i = a[l], s = e, o = t, d = o;
        e: for (; d !== null; ) {
          switch (d.tag) {
            case 27:
              if (Ea(d.type)) {
                Oe = d.stateNode, ut = !1;
                break e;
              }
              break;
            case 5:
              Oe = d.stateNode, ut = !1;
              break e;
            case 3:
            case 4:
              Oe = d.stateNode.containerInfo, ut = !0;
              break e;
          }
          d = d.return;
        }
        if (Oe === null) throw Error(c(160));
        td(s, o, i), Oe = null, ut = !1, s = i.alternate, s !== null && (s.return = null), i.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        nd(t, e), t = t.sibling;
  }
  var Ut = null;
  function nd(e, t) {
    var a = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        rt(t, e), ot(e), l & 4 && (ba(3, e, e.return), bn(3, e), ba(5, e, e.return));
        break;
      case 1:
        rt(t, e), ot(e), l & 512 && (Xe || a === null || Gt(a, a.return)), l & 64 && Pt && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (a = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = a === null ? l : a.concat(l))));
        break;
      case 26:
        var i = Ut;
        if (rt(t, e), ot(e), l & 512 && (Xe || a === null || Gt(a, a.return)), l & 4) {
          var s = a !== null ? a.memoizedState : null;
          if (l = e.memoizedState, a === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, a = e.memoizedProps, i = i.ownerDocument || i;
                  t: switch (l) {
                    case "title":
                      s = i.getElementsByTagName("title")[0], (!s || s[Kl] || s[ke] || s.namespaceURI === "http://www.w3.org/2000/svg" || s.hasAttribute("itemprop")) && (s = i.createElement(l), i.head.insertBefore(
                        s,
                        i.querySelector("head > title")
                      )), Pe(s, l, a), s[ke] = e, Ve(s), l = s;
                      break e;
                    case "link":
                      var o = nm(
                        "link",
                        "href",
                        i
                      ).get(l + (a.href || ""));
                      if (o) {
                        for (var d = 0; d < o.length; d++)
                          if (s = o[d], s.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && s.getAttribute("rel") === (a.rel == null ? null : a.rel) && s.getAttribute("title") === (a.title == null ? null : a.title) && s.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                            o.splice(d, 1);
                            break t;
                          }
                      }
                      s = i.createElement(l), Pe(s, l, a), i.head.appendChild(s);
                      break;
                    case "meta":
                      if (o = nm(
                        "meta",
                        "content",
                        i
                      ).get(l + (a.content || ""))) {
                        for (d = 0; d < o.length; d++)
                          if (s = o[d], s.getAttribute("content") === (a.content == null ? null : "" + a.content) && s.getAttribute("name") === (a.name == null ? null : a.name) && s.getAttribute("property") === (a.property == null ? null : a.property) && s.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && s.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                            o.splice(d, 1);
                            break t;
                          }
                      }
                      s = i.createElement(l), Pe(s, l, a), i.head.appendChild(s);
                      break;
                    default:
                      throw Error(c(468, l));
                  }
                  s[ke] = e, Ve(s), l = s;
                }
                e.stateNode = l;
              } else
                im(
                  i,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = lm(
                i,
                l,
                e.memoizedProps
              );
          else
            s !== l ? (s === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : s.count--, l === null ? im(
              i,
              e.type,
              e.stateNode
            ) : lm(
              i,
              l,
              e.memoizedProps
            )) : l === null && e.stateNode !== null && Wc(
              e,
              e.memoizedProps,
              a.memoizedProps
            );
        }
        break;
      case 27:
        rt(t, e), ot(e), l & 512 && (Xe || a === null || Gt(a, a.return)), a !== null && l & 4 && Wc(
          e,
          e.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (rt(t, e), ot(e), l & 512 && (Xe || a === null || Gt(a, a.return)), e.flags & 32) {
          i = e.stateNode;
          try {
            cl(i, "");
          } catch (X) {
            _e(e, e.return, X);
          }
        }
        l & 4 && e.stateNode != null && (i = e.memoizedProps, Wc(
          e,
          i,
          a !== null ? a.memoizedProps : i
        )), l & 1024 && (eu = !0);
        break;
      case 6:
        if (rt(t, e), ot(e), l & 4) {
          if (e.stateNode === null)
            throw Error(c(162));
          l = e.memoizedProps, a = e.stateNode;
          try {
            a.nodeValue = l;
          } catch (X) {
            _e(e, e.return, X);
          }
        }
        break;
      case 3:
        if (Fi = null, i = Ut, Ut = $i(t.containerInfo), rt(t, e), Ut = i, ot(e), l & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            ql(t.containerInfo);
          } catch (X) {
            _e(e, e.return, X);
          }
        eu && (eu = !1, id(e));
        break;
      case 4:
        l = Ut, Ut = $i(
          e.stateNode.containerInfo
        ), rt(t, e), ot(e), Ut = l;
        break;
      case 12:
        rt(t, e), ot(e);
        break;
      case 31:
        rt(t, e), ot(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, Bi(e, l)));
        break;
      case 13:
        rt(t, e), ot(e), e.child.flags & 8192 && e.memoizedState !== null != (a !== null && a.memoizedState !== null) && (qi = pt()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, Bi(e, l)));
        break;
      case 22:
        i = e.memoizedState !== null;
        var v = a !== null && a.memoizedState !== null, C = Pt, N = Xe;
        if (Pt = C || i, Xe = N || v, rt(t, e), Xe = N, Pt = C, ot(e), l & 8192)
          e: for (t = e.stateNode, t._visibility = i ? t._visibility & -2 : t._visibility | 1, i && (a === null || v || Pt || Xe || Wa(e)), a = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                v = a = t;
                try {
                  if (s = v.stateNode, i)
                    o = s.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none";
                  else {
                    d = v.stateNode;
                    var H = v.memoizedProps.style, z = H != null && H.hasOwnProperty("display") ? H.display : null;
                    d.style.display = z == null || typeof z == "boolean" ? "" : ("" + z).trim();
                  }
                } catch (X) {
                  _e(v, v.return, X);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                v = t;
                try {
                  v.stateNode.nodeValue = i ? "" : v.memoizedProps;
                } catch (X) {
                  _e(v, v.return, X);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                v = t;
                try {
                  var j = v.stateNode;
                  i ? Id(j, !0) : Id(v.stateNode, !1);
                } catch (X) {
                  _e(v, v.return, X);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              a === t && (a = null), t = t.return;
            }
            a === t && (a = null), t.sibling.return = t.return, t = t.sibling;
          }
        l & 4 && (l = e.updateQueue, l !== null && (a = l.retryQueue, a !== null && (l.retryQueue = null, Bi(e, a))));
        break;
      case 19:
        rt(t, e), ot(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, Bi(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        rt(t, e), ot(e);
    }
  }
  function ot(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var a, l = e.return; l !== null; ) {
          if ($f(l)) {
            a = l;
            break;
          }
          l = l.return;
        }
        if (a == null) throw Error(c(160));
        switch (a.tag) {
          case 27:
            var i = a.stateNode, s = Fc(e);
            Ui(e, s, i);
            break;
          case 5:
            var o = a.stateNode;
            a.flags & 32 && (cl(o, ""), a.flags &= -33);
            var d = Fc(e);
            Ui(e, d, o);
            break;
          case 3:
          case 4:
            var v = a.stateNode.containerInfo, C = Fc(e);
            Pc(
              e,
              C,
              v
            );
            break;
          default:
            throw Error(c(161));
        }
      } catch (N) {
        _e(e, e.return, N);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function id(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        id(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function ta(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Pf(e, t.alternate, t), t = t.sibling;
  }
  function Wa(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ba(4, t, t.return), Wa(t);
          break;
        case 1:
          Gt(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && If(
            t,
            t.return,
            a
          ), Wa(t);
          break;
        case 27:
          jn(t.stateNode);
        case 26:
        case 5:
          Gt(t, t.return), Wa(t);
          break;
        case 22:
          t.memoizedState === null && Wa(t);
          break;
        case 30:
          Wa(t);
          break;
        default:
          Wa(t);
      }
      e = e.sibling;
    }
  }
  function aa(e, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var l = t.alternate, i = e, s = t, o = s.flags;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          aa(
            i,
            s,
            a
          ), bn(4, s);
          break;
        case 1:
          if (aa(
            i,
            s,
            a
          ), l = s, i = l.stateNode, typeof i.componentDidMount == "function")
            try {
              i.componentDidMount();
            } catch (C) {
              _e(l, l.return, C);
            }
          if (l = s, i = l.updateQueue, i !== null) {
            var d = l.stateNode;
            try {
              var v = i.shared.hiddenCallbacks;
              if (v !== null)
                for (i.shared.hiddenCallbacks = null, i = 0; i < v.length; i++)
                  Uo(v[i], d);
            } catch (C) {
              _e(l, l.return, C);
            }
          }
          a && o & 64 && Jf(s), _n(s, s.return);
          break;
        case 27:
          Wf(s);
        case 26:
        case 5:
          aa(
            i,
            s,
            a
          ), a && l === null && o & 4 && kf(s), _n(s, s.return);
          break;
        case 12:
          aa(
            i,
            s,
            a
          );
          break;
        case 31:
          aa(
            i,
            s,
            a
          ), a && o & 4 && ad(i, s);
          break;
        case 13:
          aa(
            i,
            s,
            a
          ), a && o & 4 && ld(i, s);
          break;
        case 22:
          s.memoizedState === null && aa(
            i,
            s,
            a
          ), _n(s, s.return);
          break;
        case 30:
          break;
        default:
          aa(
            i,
            s,
            a
          );
      }
      t = t.sibling;
    }
  }
  function tu(e, t) {
    var a = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (e != null && e.refCount++, a != null && sn(a));
  }
  function au(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && sn(e));
  }
  function Bt(e, t, a, l) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        sd(
          e,
          t,
          a,
          l
        ), t = t.sibling;
  }
  function sd(e, t, a, l) {
    var i = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Bt(
          e,
          t,
          a,
          l
        ), i & 2048 && bn(9, t);
        break;
      case 1:
        Bt(
          e,
          t,
          a,
          l
        );
        break;
      case 3:
        Bt(
          e,
          t,
          a,
          l
        ), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && sn(e)));
        break;
      case 12:
        if (i & 2048) {
          Bt(
            e,
            t,
            a,
            l
          ), e = t.stateNode;
          try {
            var s = t.memoizedProps, o = s.id, d = s.onPostCommit;
            typeof d == "function" && d(
              o,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (v) {
            _e(t, t.return, v);
          }
        } else
          Bt(
            e,
            t,
            a,
            l
          );
        break;
      case 31:
        Bt(
          e,
          t,
          a,
          l
        );
        break;
      case 13:
        Bt(
          e,
          t,
          a,
          l
        );
        break;
      case 23:
        break;
      case 22:
        s = t.stateNode, o = t.alternate, t.memoizedState !== null ? s._visibility & 2 ? Bt(
          e,
          t,
          a,
          l
        ) : Sn(e, t) : s._visibility & 2 ? Bt(
          e,
          t,
          a,
          l
        ) : (s._visibility |= 2, Cl(
          e,
          t,
          a,
          l,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), i & 2048 && tu(o, t);
        break;
      case 24:
        Bt(
          e,
          t,
          a,
          l
        ), i & 2048 && au(t.alternate, t);
        break;
      default:
        Bt(
          e,
          t,
          a,
          l
        );
    }
  }
  function Cl(e, t, a, l, i) {
    for (i = i && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var s = e, o = t, d = a, v = l, C = o.flags;
      switch (o.tag) {
        case 0:
        case 11:
        case 15:
          Cl(
            s,
            o,
            d,
            v,
            i
          ), bn(8, o);
          break;
        case 23:
          break;
        case 22:
          var N = o.stateNode;
          o.memoizedState !== null ? N._visibility & 2 ? Cl(
            s,
            o,
            d,
            v,
            i
          ) : Sn(
            s,
            o
          ) : (N._visibility |= 2, Cl(
            s,
            o,
            d,
            v,
            i
          )), i && C & 2048 && tu(
            o.alternate,
            o
          );
          break;
        case 24:
          Cl(
            s,
            o,
            d,
            v,
            i
          ), i && C & 2048 && au(o.alternate, o);
          break;
        default:
          Cl(
            s,
            o,
            d,
            v,
            i
          );
      }
      t = t.sibling;
    }
  }
  function Sn(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e, l = t, i = l.flags;
        switch (l.tag) {
          case 22:
            Sn(a, l), i & 2048 && tu(
              l.alternate,
              l
            );
            break;
          case 24:
            Sn(a, l), i & 2048 && au(l.alternate, l);
            break;
          default:
            Sn(a, l);
        }
        t = t.sibling;
      }
  }
  var An = 8192;
  function zl(e, t, a) {
    if (e.subtreeFlags & An)
      for (e = e.child; e !== null; )
        cd(
          e,
          t,
          a
        ), e = e.sibling;
  }
  function cd(e, t, a) {
    switch (e.tag) {
      case 26:
        zl(
          e,
          t,
          a
        ), e.flags & An && e.memoizedState !== null && Kg(
          a,
          Ut,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        zl(
          e,
          t,
          a
        );
        break;
      case 3:
      case 4:
        var l = Ut;
        Ut = $i(e.stateNode.containerInfo), zl(
          e,
          t,
          a
        ), Ut = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = An, An = 16777216, zl(
          e,
          t,
          a
        ), An = l) : zl(
          e,
          t,
          a
        ));
        break;
      default:
        zl(
          e,
          t,
          a
        );
    }
  }
  function ud(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function xn(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var l = t[a];
          Ke = l, od(
            l,
            e
          );
        }
      ud(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        rd(e), e = e.sibling;
  }
  function rd(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        xn(e), e.flags & 2048 && ba(9, e, e.return);
        break;
      case 3:
        xn(e);
        break;
      case 12:
        xn(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, wi(e)) : xn(e);
        break;
      default:
        xn(e);
    }
  }
  function wi(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var l = t[a];
          Ke = l, od(
            l,
            e
          );
        }
      ud(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          ba(8, t, t.return), wi(t);
          break;
        case 22:
          a = t.stateNode, a._visibility & 2 && (a._visibility &= -3, wi(t));
          break;
        default:
          wi(t);
      }
      e = e.sibling;
    }
  }
  function od(e, t) {
    for (; Ke !== null; ) {
      var a = Ke;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          ba(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var l = a.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          sn(a.memoizedState.cache);
      }
      if (l = a.child, l !== null) l.return = a, Ke = l;
      else
        e: for (a = e; Ke !== null; ) {
          l = Ke;
          var i = l.sibling, s = l.return;
          if (ed(l), l === a) {
            Ke = null;
            break e;
          }
          if (i !== null) {
            i.return = s, Ke = i;
            break e;
          }
          Ke = s;
        }
    }
  }
  var cg = {
    getCacheForType: function(e) {
      var t = We(Le), a = t.data.get(e);
      return a === void 0 && (a = e(), t.data.set(e, a)), a;
    },
    cacheSignal: function() {
      return We(Le).controller.signal;
    }
  }, ug = typeof WeakMap == "function" ? WeakMap : Map, ge = 0, Ce = null, ue = null, oe = 0, be = 0, St = null, _a = !1, jl = !1, lu = !1, la = 0, Re = 0, Sa = 0, Fa = 0, nu = 0, At = 0, Nl = 0, Tn = null, ft = null, iu = !1, qi = 0, fd = 0, Li = 1 / 0, Gi = null, Aa = null, Ze = 0, xa = null, Ol = null, na = 0, su = 0, cu = null, dd = null, Mn = 0, uu = null;
  function xt() {
    return (ge & 2) !== 0 && oe !== 0 ? oe & -oe : O.T !== null ? pu() : Er();
  }
  function md() {
    if (At === 0)
      if ((oe & 536870912) === 0 || de) {
        var e = In;
        In <<= 1, (In & 3932160) === 0 && (In = 262144), At = e;
      } else At = 536870912;
    return e = bt.current, e !== null && (e.flags |= 32), At;
  }
  function dt(e, t, a) {
    (e === Ce && (be === 2 || be === 9) || e.cancelPendingCommit !== null) && (Dl(e, 0), Ta(
      e,
      oe,
      At,
      !1
    )), Vl(e, a), ((ge & 2) === 0 || e !== Ce) && (e === Ce && ((ge & 2) === 0 && (Fa |= a), Re === 4 && Ta(
      e,
      oe,
      At,
      !1
    )), Yt(e));
  }
  function pd(e, t, a) {
    if ((ge & 6) !== 0) throw Error(c(327));
    var l = !a && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Zl(e, t), i = l ? fg(e, t) : ou(e, t, !0), s = l;
    do {
      if (i === 0) {
        jl && !l && Ta(e, t, 0, !1);
        break;
      } else {
        if (a = e.current.alternate, s && !rg(a)) {
          i = ou(e, t, !1), s = !1;
          continue;
        }
        if (i === 2) {
          if (s = t, e.errorRecoveryDisabledLanes & s)
            var o = 0;
          else
            o = e.pendingLanes & -536870913, o = o !== 0 ? o : o & 536870912 ? 536870912 : 0;
          if (o !== 0) {
            t = o;
            e: {
              var d = e;
              i = Tn;
              var v = d.current.memoizedState.isDehydrated;
              if (v && (Dl(d, o).flags |= 256), o = ou(
                d,
                o,
                !1
              ), o !== 2) {
                if (lu && !v) {
                  d.errorRecoveryDisabledLanes |= s, Fa |= s, i = 4;
                  break e;
                }
                s = ft, ft = i, s !== null && (ft === null ? ft = s : ft.push.apply(
                  ft,
                  s
                ));
              }
              i = o;
            }
            if (s = !1, i !== 2) continue;
          }
        }
        if (i === 1) {
          Dl(e, 0), Ta(e, t, 0, !0);
          break;
        }
        e: {
          switch (l = e, s = i, s) {
            case 0:
            case 1:
              throw Error(c(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Ta(
                l,
                t,
                At,
                !_a
              );
              break e;
            case 2:
              ft = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(c(329));
          }
          if ((t & 62914560) === t && (i = qi + 300 - pt(), 10 < i)) {
            if (Ta(
              l,
              t,
              At,
              !_a
            ), $n(l, 0, !0) !== 0) break e;
            na = t, l.timeoutHandle = Vd(
              yd.bind(
                null,
                l,
                a,
                ft,
                Gi,
                iu,
                t,
                At,
                Fa,
                Nl,
                _a,
                s,
                "Throttled",
                -0,
                0
              ),
              i
            );
            break e;
          }
          yd(
            l,
            a,
            ft,
            Gi,
            iu,
            t,
            At,
            Fa,
            Nl,
            _a,
            s,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Yt(e);
  }
  function yd(e, t, a, l, i, s, o, d, v, C, N, H, z, j) {
    if (e.timeoutHandle = -1, H = t.subtreeFlags, H & 8192 || (H & 16785408) === 16785408) {
      H = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Qt
      }, cd(
        t,
        s,
        H
      );
      var X = (s & 62914560) === s ? qi - pt() : (s & 4194048) === s ? fd - pt() : 0;
      if (X = Jg(
        H,
        X
      ), X !== null) {
        na = s, e.cancelPendingCommit = X(
          xd.bind(
            null,
            e,
            t,
            s,
            a,
            l,
            i,
            o,
            d,
            v,
            N,
            H,
            null,
            z,
            j
          )
        ), Ta(e, s, o, !C);
        return;
      }
    }
    xd(
      e,
      t,
      s,
      a,
      l,
      i,
      o,
      d,
      v
    );
  }
  function rg(e) {
    for (var t = e; ; ) {
      var a = t.tag;
      if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null)))
        for (var l = 0; l < a.length; l++) {
          var i = a[l], s = i.getSnapshot;
          i = i.value;
          try {
            if (!ht(s(), i)) return !1;
          } catch {
            return !1;
          }
        }
      if (a = t.child, t.subtreeFlags & 16384 && a !== null)
        a.return = t, t = a;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function Ta(e, t, a, l) {
    t &= ~nu, t &= ~Fa, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var i = t; 0 < i; ) {
      var s = 31 - gt(i), o = 1 << s;
      l[s] = -1, i &= ~o;
    }
    a !== 0 && xr(e, a, t);
  }
  function Yi() {
    return (ge & 6) === 0 ? (En(0), !1) : !0;
  }
  function ru() {
    if (ue !== null) {
      if (be === 0)
        var e = ue.return;
      else
        e = ue, Jt = Qa = null, Mc(e), Al = null, un = 0, e = ue;
      for (; e !== null; )
        Kf(e.alternate, e), e = e.return;
      ue = null;
    }
  }
  function Dl(e, t) {
    var a = e.timeoutHandle;
    a !== -1 && (e.timeoutHandle = -1, jg(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), na = 0, ru(), Ce = e, ue = a = Vt(e.current, null), oe = t, be = 0, St = null, _a = !1, jl = Zl(e, t), lu = !1, Nl = At = nu = Fa = Sa = Re = 0, ft = Tn = null, iu = !1, (t & 8) !== 0 && (t |= t & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var i = 31 - gt(l), s = 1 << i;
        t |= e[i], l &= ~s;
      }
    return la = t, ui(), a;
  }
  function gd(e, t) {
    te = null, O.H = gn, t === Sl || t === gi ? (t = Oo(), be = 3) : t === mc ? (t = Oo(), be = 4) : be = t === Yc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, St = t, ue === null && (Re = 1, Ni(
      e,
      Ct(t, e.current)
    ));
  }
  function hd() {
    var e = bt.current;
    return e === null ? !0 : (oe & 4194048) === oe ? Ot === null : (oe & 62914560) === oe || (oe & 536870912) !== 0 ? e === Ot : !1;
  }
  function vd() {
    var e = O.H;
    return O.H = gn, e === null ? gn : e;
  }
  function bd() {
    var e = O.A;
    return O.A = cg, e;
  }
  function Xi() {
    Re = 4, _a || (oe & 4194048) !== oe && bt.current !== null || (jl = !0), (Sa & 134217727) === 0 && (Fa & 134217727) === 0 || Ce === null || Ta(
      Ce,
      oe,
      At,
      !1
    );
  }
  function ou(e, t, a) {
    var l = ge;
    ge |= 2;
    var i = vd(), s = bd();
    (Ce !== e || oe !== t) && (Gi = null, Dl(e, t)), t = !1;
    var o = Re;
    e: do
      try {
        if (be !== 0 && ue !== null) {
          var d = ue, v = St;
          switch (be) {
            case 8:
              ru(), o = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              bt.current === null && (t = !0);
              var C = be;
              if (be = 0, St = null, Rl(e, d, v, C), a && jl) {
                o = 0;
                break e;
              }
              break;
            default:
              C = be, be = 0, St = null, Rl(e, d, v, C);
          }
        }
        og(), o = Re;
        break;
      } catch (N) {
        gd(e, N);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Jt = Qa = null, ge = l, O.H = i, O.A = s, ue === null && (Ce = null, oe = 0, ui()), o;
  }
  function og() {
    for (; ue !== null; ) _d(ue);
  }
  function fg(e, t) {
    var a = ge;
    ge |= 2;
    var l = vd(), i = bd();
    Ce !== e || oe !== t ? (Gi = null, Li = pt() + 500, Dl(e, t)) : jl = Zl(
      e,
      t
    );
    e: do
      try {
        if (be !== 0 && ue !== null) {
          t = ue;
          var s = St;
          t: switch (be) {
            case 1:
              be = 0, St = null, Rl(e, t, s, 1);
              break;
            case 2:
            case 9:
              if (jo(s)) {
                be = 0, St = null, Sd(t);
                break;
              }
              t = function() {
                be !== 2 && be !== 9 || Ce !== e || (be = 7), Yt(e);
              }, s.then(t, t);
              break e;
            case 3:
              be = 7;
              break e;
            case 4:
              be = 5;
              break e;
            case 7:
              jo(s) ? (be = 0, St = null, Sd(t)) : (be = 0, St = null, Rl(e, t, s, 7));
              break;
            case 5:
              var o = null;
              switch (ue.tag) {
                case 26:
                  o = ue.memoizedState;
                case 5:
                case 27:
                  var d = ue;
                  if (o ? sm(o) : d.stateNode.complete) {
                    be = 0, St = null;
                    var v = d.sibling;
                    if (v !== null) ue = v;
                    else {
                      var C = d.return;
                      C !== null ? (ue = C, Qi(C)) : ue = null;
                    }
                    break t;
                  }
              }
              be = 0, St = null, Rl(e, t, s, 5);
              break;
            case 6:
              be = 0, St = null, Rl(e, t, s, 6);
              break;
            case 8:
              ru(), Re = 6;
              break e;
            default:
              throw Error(c(462));
          }
        }
        dg();
        break;
      } catch (N) {
        gd(e, N);
      }
    while (!0);
    return Jt = Qa = null, O.H = l, O.A = i, ge = a, ue !== null ? 0 : (Ce = null, oe = 0, ui(), Re);
  }
  function dg() {
    for (; ue !== null && !Up(); )
      _d(ue);
  }
  function _d(e) {
    var t = Zf(e.alternate, e, la);
    e.memoizedProps = e.pendingProps, t === null ? Qi(e) : ue = t;
  }
  function Sd(e) {
    var t = e, a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = qf(
          a,
          t,
          t.pendingProps,
          t.type,
          void 0,
          oe
        );
        break;
      case 11:
        t = qf(
          a,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          oe
        );
        break;
      case 5:
        Mc(t);
      default:
        Kf(a, t), t = ue = vo(t, la), t = Zf(a, t, la);
    }
    e.memoizedProps = e.pendingProps, t === null ? Qi(e) : ue = t;
  }
  function Rl(e, t, a, l) {
    Jt = Qa = null, Mc(t), Al = null, un = 0;
    var i = t.return;
    try {
      if (eg(
        e,
        i,
        t,
        a,
        oe
      )) {
        Re = 1, Ni(
          e,
          Ct(a, e.current)
        ), ue = null;
        return;
      }
    } catch (s) {
      if (i !== null) throw ue = i, s;
      Re = 1, Ni(
        e,
        Ct(a, e.current)
      ), ue = null;
      return;
    }
    t.flags & 32768 ? (de || l === 1 ? e = !0 : jl || (oe & 536870912) !== 0 ? e = !1 : (_a = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = bt.current, l !== null && l.tag === 13 && (l.flags |= 16384))), Ad(t, e)) : Qi(t);
  }
  function Qi(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Ad(
          t,
          _a
        );
        return;
      }
      e = t.return;
      var a = lg(
        t.alternate,
        t,
        la
      );
      if (a !== null) {
        ue = a;
        return;
      }
      if (t = t.sibling, t !== null) {
        ue = t;
        return;
      }
      ue = t = e;
    } while (t !== null);
    Re === 0 && (Re = 5);
  }
  function Ad(e, t) {
    do {
      var a = ng(e.alternate, e);
      if (a !== null) {
        a.flags &= 32767, ue = a;
        return;
      }
      if (a = e.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !t && (e = e.sibling, e !== null)) {
        ue = e;
        return;
      }
      ue = e = a;
    } while (e !== null);
    Re = 6, ue = null;
  }
  function xd(e, t, a, l, i, s, o, d, v) {
    e.cancelPendingCommit = null;
    do
      Zi();
    while (Ze !== 0);
    if ((ge & 6) !== 0) throw Error(c(327));
    if (t !== null) {
      if (t === e.current) throw Error(c(177));
      if (s = t.lanes | t.childLanes, s |= Fs, Vp(
        e,
        a,
        s,
        o,
        d,
        v
      ), e === Ce && (ue = Ce = null, oe = 0), Ol = t, xa = e, na = a, su = s, cu = i, dd = l, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, gg(Kn, function() {
        return zd(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
        l = O.T, O.T = null, i = q.p, q.p = 2, o = ge, ge |= 4;
        try {
          ig(e, t, a);
        } finally {
          ge = o, q.p = i, O.T = l;
        }
      }
      Ze = 1, Td(), Md(), Ed();
    }
  }
  function Td() {
    if (Ze === 1) {
      Ze = 0;
      var e = xa, t = Ol, a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        a = O.T, O.T = null;
        var l = q.p;
        q.p = 2;
        var i = ge;
        ge |= 4;
        try {
          nd(t, e);
          var s = Au, o = uo(e.containerInfo), d = s.focusedElem, v = s.selectionRange;
          if (o !== d && d && d.ownerDocument && co(
            d.ownerDocument.documentElement,
            d
          )) {
            if (v !== null && Js(d)) {
              var C = v.start, N = v.end;
              if (N === void 0 && (N = C), "selectionStart" in d)
                d.selectionStart = C, d.selectionEnd = Math.min(
                  N,
                  d.value.length
                );
              else {
                var H = d.ownerDocument || document, z = H && H.defaultView || window;
                if (z.getSelection) {
                  var j = z.getSelection(), X = d.textContent.length, k = Math.min(v.start, X), Te = v.end === void 0 ? k : Math.min(v.end, X);
                  !j.extend && k > Te && (o = Te, Te = k, k = o);
                  var T = so(
                    d,
                    k
                  ), b = so(
                    d,
                    Te
                  );
                  if (T && b && (j.rangeCount !== 1 || j.anchorNode !== T.node || j.anchorOffset !== T.offset || j.focusNode !== b.node || j.focusOffset !== b.offset)) {
                    var E = H.createRange();
                    E.setStart(T.node, T.offset), j.removeAllRanges(), k > Te ? (j.addRange(E), j.extend(b.node, b.offset)) : (E.setEnd(b.node, b.offset), j.addRange(E));
                  }
                }
              }
            }
            for (H = [], j = d; j = j.parentNode; )
              j.nodeType === 1 && H.push({
                element: j,
                left: j.scrollLeft,
                top: j.scrollTop
              });
            for (typeof d.focus == "function" && d.focus(), d = 0; d < H.length; d++) {
              var R = H[d];
              R.element.scrollLeft = R.left, R.element.scrollTop = R.top;
            }
          }
          as = !!Su, Au = Su = null;
        } finally {
          ge = i, q.p = l, O.T = a;
        }
      }
      e.current = t, Ze = 2;
    }
  }
  function Md() {
    if (Ze === 2) {
      Ze = 0;
      var e = xa, t = Ol, a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        a = O.T, O.T = null;
        var l = q.p;
        q.p = 2;
        var i = ge;
        ge |= 4;
        try {
          Pf(e, t.alternate, t);
        } finally {
          ge = i, q.p = l, O.T = a;
        }
      }
      Ze = 3;
    }
  }
  function Ed() {
    if (Ze === 4 || Ze === 3) {
      Ze = 0, Bp();
      var e = xa, t = Ol, a = na, l = dd;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Ze = 5 : (Ze = 0, Ol = xa = null, Cd(e, e.pendingLanes));
      var i = e.pendingLanes;
      if (i === 0 && (Aa = null), zs(a), t = t.stateNode, yt && typeof yt.onCommitFiberRoot == "function")
        try {
          yt.onCommitFiberRoot(
            Ql,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        t = O.T, i = q.p, q.p = 2, O.T = null;
        try {
          for (var s = e.onRecoverableError, o = 0; o < l.length; o++) {
            var d = l[o];
            s(d.value, {
              componentStack: d.stack
            });
          }
        } finally {
          O.T = t, q.p = i;
        }
      }
      (na & 3) !== 0 && Zi(), Yt(e), i = e.pendingLanes, (a & 261930) !== 0 && (i & 42) !== 0 ? e === uu ? Mn++ : (Mn = 0, uu = e) : Mn = 0, En(0);
    }
  }
  function Cd(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, sn(t)));
  }
  function Zi() {
    return Td(), Md(), Ed(), zd();
  }
  function zd() {
    if (Ze !== 5) return !1;
    var e = xa, t = su;
    su = 0;
    var a = zs(na), l = O.T, i = q.p;
    try {
      q.p = 32 > a ? 32 : a, O.T = null, a = cu, cu = null;
      var s = xa, o = na;
      if (Ze = 0, Ol = xa = null, na = 0, (ge & 6) !== 0) throw Error(c(331));
      var d = ge;
      if (ge |= 4, rd(s.current), sd(
        s,
        s.current,
        o,
        a
      ), ge = d, En(0, !1), yt && typeof yt.onPostCommitFiberRoot == "function")
        try {
          yt.onPostCommitFiberRoot(Ql, s);
        } catch {
        }
      return !0;
    } finally {
      q.p = i, O.T = l, Cd(e, t);
    }
  }
  function jd(e, t, a) {
    t = Ct(a, t), t = Gc(e.stateNode, t, 2), e = ga(e, t, 2), e !== null && (Vl(e, 2), Yt(e));
  }
  function _e(e, t, a) {
    if (e.tag === 3)
      jd(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          jd(
            t,
            e,
            a
          );
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (Aa === null || !Aa.has(l))) {
            e = Ct(a, e), a = Nf(2), l = ga(t, a, 2), l !== null && (Of(
              a,
              l,
              t,
              e
            ), Vl(l, 2), Yt(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function fu(e, t, a) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new ug();
      var i = /* @__PURE__ */ new Set();
      l.set(t, i);
    } else
      i = l.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), l.set(t, i));
    i.has(a) || (lu = !0, i.add(a), e = mg.bind(null, e, t, a), t.then(e, e));
  }
  function mg(e, t, a) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, Ce === e && (oe & a) === a && (Re === 4 || Re === 3 && (oe & 62914560) === oe && 300 > pt() - qi ? (ge & 2) === 0 && Dl(e, 0) : nu |= a, Nl === oe && (Nl = 0)), Yt(e);
  }
  function Nd(e, t) {
    t === 0 && (t = Ar()), e = Ga(e, t), e !== null && (Vl(e, t), Yt(e));
  }
  function pg(e) {
    var t = e.memoizedState, a = 0;
    t !== null && (a = t.retryLane), Nd(e, a);
  }
  function yg(e, t) {
    var a = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var l = e.stateNode, i = e.memoizedState;
        i !== null && (a = i.retryLane);
        break;
      case 19:
        l = e.stateNode;
        break;
      case 22:
        l = e.stateNode._retryCache;
        break;
      default:
        throw Error(c(314));
    }
    l !== null && l.delete(t), Nd(e, a);
  }
  function gg(e, t) {
    return Ts(e, t);
  }
  var Vi = null, Hl = null, du = !1, Ki = !1, mu = !1, Ma = 0;
  function Yt(e) {
    e !== Hl && e.next === null && (Hl === null ? Vi = Hl = e : Hl = Hl.next = e), Ki = !0, du || (du = !0, vg());
  }
  function En(e, t) {
    if (!mu && Ki) {
      mu = !0;
      do
        for (var a = !1, l = Vi; l !== null; ) {
          if (e !== 0) {
            var i = l.pendingLanes;
            if (i === 0) var s = 0;
            else {
              var o = l.suspendedLanes, d = l.pingedLanes;
              s = (1 << 31 - gt(42 | e) + 1) - 1, s &= i & ~(o & ~d), s = s & 201326741 ? s & 201326741 | 1 : s ? s | 2 : 0;
            }
            s !== 0 && (a = !0, Hd(l, s));
          } else
            s = oe, s = $n(
              l,
              l === Ce ? s : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (s & 3) === 0 || Zl(l, s) || (a = !0, Hd(l, s));
          l = l.next;
        }
      while (a);
      mu = !1;
    }
  }
  function hg() {
    Od();
  }
  function Od() {
    Ki = du = !1;
    var e = 0;
    Ma !== 0 && zg() && (e = Ma);
    for (var t = pt(), a = null, l = Vi; l !== null; ) {
      var i = l.next, s = Dd(l, t);
      s === 0 ? (l.next = null, a === null ? Vi = i : a.next = i, i === null && (Hl = a)) : (a = l, (e !== 0 || (s & 3) !== 0) && (Ki = !0)), l = i;
    }
    Ze !== 0 && Ze !== 5 || En(e), Ma !== 0 && (Ma = 0);
  }
  function Dd(e, t) {
    for (var a = e.suspendedLanes, l = e.pingedLanes, i = e.expirationTimes, s = e.pendingLanes & -62914561; 0 < s; ) {
      var o = 31 - gt(s), d = 1 << o, v = i[o];
      v === -1 ? ((d & a) === 0 || (d & l) !== 0) && (i[o] = Zp(d, t)) : v <= t && (e.expiredLanes |= d), s &= ~d;
    }
    if (t = Ce, a = oe, a = $n(
      e,
      e === t ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, a === 0 || e === t && (be === 2 || be === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && Ms(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((a & 3) === 0 || Zl(e, a)) {
      if (t = a & -a, t === e.callbackPriority) return t;
      switch (l !== null && Ms(l), zs(a)) {
        case 2:
        case 8:
          a = _r;
          break;
        case 32:
          a = Kn;
          break;
        case 268435456:
          a = Sr;
          break;
        default:
          a = Kn;
      }
      return l = Rd.bind(null, e), a = Ts(a, l), e.callbackPriority = t, e.callbackNode = a, t;
    }
    return l !== null && l !== null && Ms(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Rd(e, t) {
    if (Ze !== 0 && Ze !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var a = e.callbackNode;
    if (Zi() && e.callbackNode !== a)
      return null;
    var l = oe;
    return l = $n(
      e,
      e === Ce ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (pd(e, l, t), Dd(e, pt()), e.callbackNode != null && e.callbackNode === a ? Rd.bind(null, e) : null);
  }
  function Hd(e, t) {
    if (Zi()) return null;
    pd(e, t, !0);
  }
  function vg() {
    Ng(function() {
      (ge & 6) !== 0 ? Ts(
        br,
        hg
      ) : Od();
    });
  }
  function pu() {
    if (Ma === 0) {
      var e = bl;
      e === 0 && (e = Jn, Jn <<= 1, (Jn & 261888) === 0 && (Jn = 256)), Ma = e;
    }
    return Ma;
  }
  function Ud(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : ei("" + e);
  }
  function Bd(e, t) {
    var a = t.ownerDocument.createElement("input");
    return a.name = t.name, a.value = t.value, e.id && a.setAttribute("form", e.id), t.parentNode.insertBefore(a, t), e = new FormData(e), a.parentNode.removeChild(a), e;
  }
  function bg(e, t, a, l, i) {
    if (t === "submit" && a && a.stateNode === i) {
      var s = Ud(
        (i[st] || null).action
      ), o = l.submitter;
      o && (t = (t = o[st] || null) ? Ud(t.formAction) : o.getAttribute("formAction"), t !== null && (s = t, o = null));
      var d = new ni(
        "action",
        "action",
        null,
        l,
        i
      );
      e.push({
        event: d,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (Ma !== 0) {
                  var v = o ? Bd(i, o) : new FormData(i);
                  Hc(
                    a,
                    {
                      pending: !0,
                      data: v,
                      method: i.method,
                      action: s
                    },
                    null,
                    v
                  );
                }
              } else
                typeof s == "function" && (d.preventDefault(), v = o ? Bd(i, o) : new FormData(i), Hc(
                  a,
                  {
                    pending: !0,
                    data: v,
                    method: i.method,
                    action: s
                  },
                  s,
                  v
                ));
            },
            currentTarget: i
          }
        ]
      });
    }
  }
  for (var yu = 0; yu < Ws.length; yu++) {
    var gu = Ws[yu], _g = gu.toLowerCase(), Sg = gu[0].toUpperCase() + gu.slice(1);
    Ht(
      _g,
      "on" + Sg
    );
  }
  Ht(fo, "onAnimationEnd"), Ht(mo, "onAnimationIteration"), Ht(po, "onAnimationStart"), Ht("dblclick", "onDoubleClick"), Ht("focusin", "onFocus"), Ht("focusout", "onBlur"), Ht(wy, "onTransitionRun"), Ht(qy, "onTransitionStart"), Ht(Ly, "onTransitionCancel"), Ht(yo, "onTransitionEnd"), il("onMouseEnter", ["mouseout", "mouseover"]), il("onMouseLeave", ["mouseout", "mouseover"]), il("onPointerEnter", ["pointerout", "pointerover"]), il("onPointerLeave", ["pointerout", "pointerover"]), Ba(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Ba(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Ba("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Ba(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Ba(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Ba(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Cn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Ag = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Cn)
  );
  function wd(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var l = e[a], i = l.event;
      l = l.listeners;
      e: {
        var s = void 0;
        if (t)
          for (var o = l.length - 1; 0 <= o; o--) {
            var d = l[o], v = d.instance, C = d.currentTarget;
            if (d = d.listener, v !== s && i.isPropagationStopped())
              break e;
            s = d, i.currentTarget = C;
            try {
              s(i);
            } catch (N) {
              ci(N);
            }
            i.currentTarget = null, s = v;
          }
        else
          for (o = 0; o < l.length; o++) {
            if (d = l[o], v = d.instance, C = d.currentTarget, d = d.listener, v !== s && i.isPropagationStopped())
              break e;
            s = d, i.currentTarget = C;
            try {
              s(i);
            } catch (N) {
              ci(N);
            }
            i.currentTarget = null, s = v;
          }
      }
    }
  }
  function re(e, t) {
    var a = t[js];
    a === void 0 && (a = t[js] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    a.has(l) || (qd(t, e, 2, !1), a.add(l));
  }
  function hu(e, t, a) {
    var l = 0;
    t && (l |= 4), qd(
      a,
      e,
      l,
      t
    );
  }
  var Ji = "_reactListening" + Math.random().toString(36).slice(2);
  function vu(e) {
    if (!e[Ji]) {
      e[Ji] = !0, jr.forEach(function(a) {
        a !== "selectionchange" && (Ag.has(a) || hu(a, !1, e), hu(a, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Ji] || (t[Ji] = !0, hu("selectionchange", !1, t));
    }
  }
  function qd(e, t, a, l) {
    switch (mm(t)) {
      case 2:
        var i = $g;
        break;
      case 8:
        i = Wg;
        break;
      default:
        i = Ru;
    }
    a = i.bind(
      null,
      t,
      a,
      e
    ), i = void 0, !qs || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), l ? i !== void 0 ? e.addEventListener(t, a, {
      capture: !0,
      passive: i
    }) : e.addEventListener(t, a, !0) : i !== void 0 ? e.addEventListener(t, a, {
      passive: i
    }) : e.addEventListener(t, a, !1);
  }
  function bu(e, t, a, l, i) {
    var s = l;
    if ((t & 1) === 0 && (t & 2) === 0 && l !== null)
      e: for (; ; ) {
        if (l === null) return;
        var o = l.tag;
        if (o === 3 || o === 4) {
          var d = l.stateNode.containerInfo;
          if (d === i) break;
          if (o === 4)
            for (o = l.return; o !== null; ) {
              var v = o.tag;
              if ((v === 3 || v === 4) && o.stateNode.containerInfo === i)
                return;
              o = o.return;
            }
          for (; d !== null; ) {
            if (o = al(d), o === null) return;
            if (v = o.tag, v === 5 || v === 6 || v === 26 || v === 27) {
              l = s = o;
              continue e;
            }
            d = d.parentNode;
          }
        }
        l = l.return;
      }
    Yr(function() {
      var C = s, N = Bs(a), H = [];
      e: {
        var z = go.get(e);
        if (z !== void 0) {
          var j = ni, X = e;
          switch (e) {
            case "keypress":
              if (ai(a) === 0) break e;
            case "keydown":
            case "keyup":
              j = yy;
              break;
            case "focusin":
              X = "focus", j = Xs;
              break;
            case "focusout":
              X = "blur", j = Xs;
              break;
            case "beforeblur":
            case "afterblur":
              j = Xs;
              break;
            case "click":
              if (a.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              j = Zr;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              j = ly;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              j = vy;
              break;
            case fo:
            case mo:
            case po:
              j = sy;
              break;
            case yo:
              j = _y;
              break;
            case "scroll":
            case "scrollend":
              j = ty;
              break;
            case "wheel":
              j = Ay;
              break;
            case "copy":
            case "cut":
            case "paste":
              j = uy;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              j = Kr;
              break;
            case "toggle":
            case "beforetoggle":
              j = Ty;
          }
          var k = (t & 4) !== 0, Te = !k && (e === "scroll" || e === "scrollend"), T = k ? z !== null ? z + "Capture" : null : z;
          k = [];
          for (var b = C, E; b !== null; ) {
            var R = b;
            if (E = R.stateNode, R = R.tag, R !== 5 && R !== 26 && R !== 27 || E === null || T === null || (R = Il(b, T), R != null && k.push(
              zn(b, R, E)
            )), Te) break;
            b = b.return;
          }
          0 < k.length && (z = new j(
            z,
            X,
            null,
            a,
            N
          ), H.push({ event: z, listeners: k }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (z = e === "mouseover" || e === "pointerover", j = e === "mouseout" || e === "pointerout", z && a !== Us && (X = a.relatedTarget || a.fromElement) && (al(X) || X[tl]))
            break e;
          if ((j || z) && (z = N.window === N ? N : (z = N.ownerDocument) ? z.defaultView || z.parentWindow : window, j ? (X = a.relatedTarget || a.toElement, j = C, X = X ? al(X) : null, X !== null && (Te = p(X), k = X.tag, X !== Te || k !== 5 && k !== 27 && k !== 6) && (X = null)) : (j = null, X = C), j !== X)) {
            if (k = Zr, R = "onMouseLeave", T = "onMouseEnter", b = "mouse", (e === "pointerout" || e === "pointerover") && (k = Kr, R = "onPointerLeave", T = "onPointerEnter", b = "pointer"), Te = j == null ? z : Jl(j), E = X == null ? z : Jl(X), z = new k(
              R,
              b + "leave",
              j,
              a,
              N
            ), z.target = Te, z.relatedTarget = E, R = null, al(N) === C && (k = new k(
              T,
              b + "enter",
              X,
              a,
              N
            ), k.target = E, k.relatedTarget = Te, R = k), Te = R, j && X)
              t: {
                for (k = xg, T = j, b = X, E = 0, R = T; R; R = k(R))
                  E++;
                R = 0;
                for (var I = b; I; I = k(I))
                  R++;
                for (; 0 < E - R; )
                  T = k(T), E--;
                for (; 0 < R - E; )
                  b = k(b), R--;
                for (; E--; ) {
                  if (T === b || b !== null && T === b.alternate) {
                    k = T;
                    break t;
                  }
                  T = k(T), b = k(b);
                }
                k = null;
              }
            else k = null;
            j !== null && Ld(
              H,
              z,
              j,
              k,
              !1
            ), X !== null && Te !== null && Ld(
              H,
              Te,
              X,
              k,
              !0
            );
          }
        }
        e: {
          if (z = C ? Jl(C) : window, j = z.nodeName && z.nodeName.toLowerCase(), j === "select" || j === "input" && z.type === "file")
            var pe = eo;
          else if (Fr(z))
            if (to)
              pe = Hy;
            else {
              pe = Dy;
              var K = Oy;
            }
          else
            j = z.nodeName, !j || j.toLowerCase() !== "input" || z.type !== "checkbox" && z.type !== "radio" ? C && Hs(C.elementType) && (pe = eo) : pe = Ry;
          if (pe && (pe = pe(e, C))) {
            Pr(
              H,
              pe,
              a,
              N
            );
            break e;
          }
          K && K(e, z, C), e === "focusout" && C && z.type === "number" && C.memoizedProps.value != null && Rs(z, "number", z.value);
        }
        switch (K = C ? Jl(C) : window, e) {
          case "focusin":
            (Fr(K) || K.contentEditable === "true") && (fl = K, Is = C, an = null);
            break;
          case "focusout":
            an = Is = fl = null;
            break;
          case "mousedown":
            ks = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ks = !1, ro(H, a, N);
            break;
          case "selectionchange":
            if (By) break;
          case "keydown":
          case "keyup":
            ro(H, a, N);
        }
        var le;
        if (Zs)
          e: {
            switch (e) {
              case "compositionstart":
                var fe = "onCompositionStart";
                break e;
              case "compositionend":
                fe = "onCompositionEnd";
                break e;
              case "compositionupdate":
                fe = "onCompositionUpdate";
                break e;
            }
            fe = void 0;
          }
        else
          ol ? $r(e, a) && (fe = "onCompositionEnd") : e === "keydown" && a.keyCode === 229 && (fe = "onCompositionStart");
        fe && (Jr && a.locale !== "ko" && (ol || fe !== "onCompositionStart" ? fe === "onCompositionEnd" && ol && (le = Xr()) : (ra = N, Ls = "value" in ra ? ra.value : ra.textContent, ol = !0)), K = Ii(C, fe), 0 < K.length && (fe = new Vr(
          fe,
          e,
          null,
          a,
          N
        ), H.push({ event: fe, listeners: K }), le ? fe.data = le : (le = Wr(a), le !== null && (fe.data = le)))), (le = Ey ? Cy(e, a) : zy(e, a)) && (fe = Ii(C, "onBeforeInput"), 0 < fe.length && (K = new Vr(
          "onBeforeInput",
          "beforeinput",
          null,
          a,
          N
        ), H.push({
          event: K,
          listeners: fe
        }), K.data = le)), bg(
          H,
          e,
          C,
          a,
          N
        );
      }
      wd(H, t);
    });
  }
  function zn(e, t, a) {
    return {
      instance: e,
      listener: t,
      currentTarget: a
    };
  }
  function Ii(e, t) {
    for (var a = t + "Capture", l = []; e !== null; ) {
      var i = e, s = i.stateNode;
      if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || s === null || (i = Il(e, a), i != null && l.unshift(
        zn(e, i, s)
      ), i = Il(e, t), i != null && l.push(
        zn(e, i, s)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function xg(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Ld(e, t, a, l, i) {
    for (var s = t._reactName, o = []; a !== null && a !== l; ) {
      var d = a, v = d.alternate, C = d.stateNode;
      if (d = d.tag, v !== null && v === l) break;
      d !== 5 && d !== 26 && d !== 27 || C === null || (v = C, i ? (C = Il(a, s), C != null && o.unshift(
        zn(a, C, v)
      )) : i || (C = Il(a, s), C != null && o.push(
        zn(a, C, v)
      ))), a = a.return;
    }
    o.length !== 0 && e.push({ event: t, listeners: o });
  }
  var Tg = /\r\n?/g, Mg = /\u0000|\uFFFD/g;
  function Gd(e) {
    return (typeof e == "string" ? e : "" + e).replace(Tg, `
`).replace(Mg, "");
  }
  function Yd(e, t) {
    return t = Gd(t), Gd(e) === t;
  }
  function xe(e, t, a, l, i, s) {
    switch (a) {
      case "children":
        typeof l == "string" ? t === "body" || t === "textarea" && l === "" || cl(e, l) : (typeof l == "number" || typeof l == "bigint") && t !== "body" && cl(e, "" + l);
        break;
      case "className":
        Fn(e, "class", l);
        break;
      case "tabIndex":
        Fn(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Fn(e, a, l);
        break;
      case "style":
        Lr(e, l, s);
        break;
      case "data":
        if (t !== "object") {
          Fn(e, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (t !== "a" || a !== "href")) {
          e.removeAttribute(a);
          break;
        }
        if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(a);
          break;
        }
        l = ei("" + l), e.setAttribute(a, l);
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          e.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof s == "function" && (a === "formAction" ? (t !== "input" && xe(e, t, "name", i.name, i, null), xe(
            e,
            t,
            "formEncType",
            i.formEncType,
            i,
            null
          ), xe(
            e,
            t,
            "formMethod",
            i.formMethod,
            i,
            null
          ), xe(
            e,
            t,
            "formTarget",
            i.formTarget,
            i,
            null
          )) : (xe(e, t, "encType", i.encType, i, null), xe(e, t, "method", i.method, i, null), xe(e, t, "target", i.target, i, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(a);
          break;
        }
        l = ei("" + l), e.setAttribute(a, l);
        break;
      case "onClick":
        l != null && (e.onclick = Qt);
        break;
      case "onScroll":
        l != null && re("scroll", e);
        break;
      case "onScrollEnd":
        l != null && re("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(c(61));
          if (a = l.__html, a != null) {
            if (i.children != null) throw Error(c(60));
            e.innerHTML = a;
          }
        }
        break;
      case "multiple":
        e.multiple = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "muted":
        e.muted = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (l == null || typeof l == "function" || typeof l == "boolean" || typeof l == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        a = ei("" + l), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          a
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(a, "" + l) : e.removeAttribute(a);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        l && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(a, "") : e.removeAttribute(a);
        break;
      case "capture":
      case "download":
        l === !0 ? e.setAttribute(a, "") : l !== !1 && l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(a, l) : e.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l ? e.setAttribute(a, l) : e.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l) ? e.removeAttribute(a) : e.setAttribute(a, l);
        break;
      case "popover":
        re("beforetoggle", e), re("toggle", e), Wn(e, "popover", l);
        break;
      case "xlinkActuate":
        Xt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        Xt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        Xt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        Xt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        Xt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        Xt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        Xt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        Xt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        Xt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        Wn(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (a = Pp.get(a) || a, Wn(e, a, l));
    }
  }
  function _u(e, t, a, l, i, s) {
    switch (a) {
      case "style":
        Lr(e, l, s);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(c(61));
          if (a = l.__html, a != null) {
            if (i.children != null) throw Error(c(60));
            e.innerHTML = a;
          }
        }
        break;
      case "children":
        typeof l == "string" ? cl(e, l) : (typeof l == "number" || typeof l == "bigint") && cl(e, "" + l);
        break;
      case "onScroll":
        l != null && re("scroll", e);
        break;
      case "onScrollEnd":
        l != null && re("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = Qt);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Nr.hasOwnProperty(a))
          e: {
            if (a[0] === "o" && a[1] === "n" && (i = a.endsWith("Capture"), t = a.slice(2, i ? a.length - 7 : void 0), s = e[st] || null, s = s != null ? s[a] : null, typeof s == "function" && e.removeEventListener(t, s, i), typeof l == "function")) {
              typeof s != "function" && s !== null && (a in e ? e[a] = null : e.hasAttribute(a) && e.removeAttribute(a)), e.addEventListener(t, l, i);
              break e;
            }
            a in e ? e[a] = l : l === !0 ? e.setAttribute(a, "") : Wn(e, a, l);
          }
    }
  }
  function Pe(e, t, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        re("error", e), re("load", e);
        var l = !1, i = !1, s;
        for (s in a)
          if (a.hasOwnProperty(s)) {
            var o = a[s];
            if (o != null)
              switch (s) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  i = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(c(137, t));
                default:
                  xe(e, t, s, o, a, null);
              }
          }
        i && xe(e, t, "srcSet", a.srcSet, a, null), l && xe(e, t, "src", a.src, a, null);
        return;
      case "input":
        re("invalid", e);
        var d = s = o = i = null, v = null, C = null;
        for (l in a)
          if (a.hasOwnProperty(l)) {
            var N = a[l];
            if (N != null)
              switch (l) {
                case "name":
                  i = N;
                  break;
                case "type":
                  o = N;
                  break;
                case "checked":
                  v = N;
                  break;
                case "defaultChecked":
                  C = N;
                  break;
                case "value":
                  s = N;
                  break;
                case "defaultValue":
                  d = N;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (N != null)
                    throw Error(c(137, t));
                  break;
                default:
                  xe(e, t, l, N, a, null);
              }
          }
        Ur(
          e,
          s,
          d,
          v,
          C,
          o,
          i,
          !1
        );
        return;
      case "select":
        re("invalid", e), l = o = s = null;
        for (i in a)
          if (a.hasOwnProperty(i) && (d = a[i], d != null))
            switch (i) {
              case "value":
                s = d;
                break;
              case "defaultValue":
                o = d;
                break;
              case "multiple":
                l = d;
              default:
                xe(e, t, i, d, a, null);
            }
        t = s, a = o, e.multiple = !!l, t != null ? sl(e, !!l, t, !1) : a != null && sl(e, !!l, a, !0);
        return;
      case "textarea":
        re("invalid", e), s = i = l = null;
        for (o in a)
          if (a.hasOwnProperty(o) && (d = a[o], d != null))
            switch (o) {
              case "value":
                l = d;
                break;
              case "defaultValue":
                i = d;
                break;
              case "children":
                s = d;
                break;
              case "dangerouslySetInnerHTML":
                if (d != null) throw Error(c(91));
                break;
              default:
                xe(e, t, o, d, a, null);
            }
        wr(e, l, i, s);
        return;
      case "option":
        for (v in a)
          a.hasOwnProperty(v) && (l = a[v], l != null) && (v === "selected" ? e.selected = l && typeof l != "function" && typeof l != "symbol" : xe(e, t, v, l, a, null));
        return;
      case "dialog":
        re("beforetoggle", e), re("toggle", e), re("cancel", e), re("close", e);
        break;
      case "iframe":
      case "object":
        re("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Cn.length; l++)
          re(Cn[l], e);
        break;
      case "image":
        re("error", e), re("load", e);
        break;
      case "details":
        re("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        re("error", e), re("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (C in a)
          if (a.hasOwnProperty(C) && (l = a[C], l != null))
            switch (C) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(c(137, t));
              default:
                xe(e, t, C, l, a, null);
            }
        return;
      default:
        if (Hs(t)) {
          for (N in a)
            a.hasOwnProperty(N) && (l = a[N], l !== void 0 && _u(
              e,
              t,
              N,
              l,
              a,
              void 0
            ));
          return;
        }
    }
    for (d in a)
      a.hasOwnProperty(d) && (l = a[d], l != null && xe(e, t, d, l, a, null));
  }
  function Eg(e, t, a, l) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var i = null, s = null, o = null, d = null, v = null, C = null, N = null;
        for (j in a) {
          var H = a[j];
          if (a.hasOwnProperty(j) && H != null)
            switch (j) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                v = H;
              default:
                l.hasOwnProperty(j) || xe(e, t, j, null, l, H);
            }
        }
        for (var z in l) {
          var j = l[z];
          if (H = a[z], l.hasOwnProperty(z) && (j != null || H != null))
            switch (z) {
              case "type":
                s = j;
                break;
              case "name":
                i = j;
                break;
              case "checked":
                C = j;
                break;
              case "defaultChecked":
                N = j;
                break;
              case "value":
                o = j;
                break;
              case "defaultValue":
                d = j;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (j != null)
                  throw Error(c(137, t));
                break;
              default:
                j !== H && xe(
                  e,
                  t,
                  z,
                  j,
                  l,
                  H
                );
            }
        }
        Ds(
          e,
          o,
          d,
          v,
          C,
          N,
          s,
          i
        );
        return;
      case "select":
        j = o = d = z = null;
        for (s in a)
          if (v = a[s], a.hasOwnProperty(s) && v != null)
            switch (s) {
              case "value":
                break;
              case "multiple":
                j = v;
              default:
                l.hasOwnProperty(s) || xe(
                  e,
                  t,
                  s,
                  null,
                  l,
                  v
                );
            }
        for (i in l)
          if (s = l[i], v = a[i], l.hasOwnProperty(i) && (s != null || v != null))
            switch (i) {
              case "value":
                z = s;
                break;
              case "defaultValue":
                d = s;
                break;
              case "multiple":
                o = s;
              default:
                s !== v && xe(
                  e,
                  t,
                  i,
                  s,
                  l,
                  v
                );
            }
        t = d, a = o, l = j, z != null ? sl(e, !!a, z, !1) : !!l != !!a && (t != null ? sl(e, !!a, t, !0) : sl(e, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        j = z = null;
        for (d in a)
          if (i = a[d], a.hasOwnProperty(d) && i != null && !l.hasOwnProperty(d))
            switch (d) {
              case "value":
                break;
              case "children":
                break;
              default:
                xe(e, t, d, null, l, i);
            }
        for (o in l)
          if (i = l[o], s = a[o], l.hasOwnProperty(o) && (i != null || s != null))
            switch (o) {
              case "value":
                z = i;
                break;
              case "defaultValue":
                j = i;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (i != null) throw Error(c(91));
                break;
              default:
                i !== s && xe(e, t, o, i, l, s);
            }
        Br(e, z, j);
        return;
      case "option":
        for (var X in a)
          z = a[X], a.hasOwnProperty(X) && z != null && !l.hasOwnProperty(X) && (X === "selected" ? e.selected = !1 : xe(
            e,
            t,
            X,
            null,
            l,
            z
          ));
        for (v in l)
          z = l[v], j = a[v], l.hasOwnProperty(v) && z !== j && (z != null || j != null) && (v === "selected" ? e.selected = z && typeof z != "function" && typeof z != "symbol" : xe(
            e,
            t,
            v,
            z,
            l,
            j
          ));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var k in a)
          z = a[k], a.hasOwnProperty(k) && z != null && !l.hasOwnProperty(k) && xe(e, t, k, null, l, z);
        for (C in l)
          if (z = l[C], j = a[C], l.hasOwnProperty(C) && z !== j && (z != null || j != null))
            switch (C) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (z != null)
                  throw Error(c(137, t));
                break;
              default:
                xe(
                  e,
                  t,
                  C,
                  z,
                  l,
                  j
                );
            }
        return;
      default:
        if (Hs(t)) {
          for (var Te in a)
            z = a[Te], a.hasOwnProperty(Te) && z !== void 0 && !l.hasOwnProperty(Te) && _u(
              e,
              t,
              Te,
              void 0,
              l,
              z
            );
          for (N in l)
            z = l[N], j = a[N], !l.hasOwnProperty(N) || z === j || z === void 0 && j === void 0 || _u(
              e,
              t,
              N,
              z,
              l,
              j
            );
          return;
        }
    }
    for (var T in a)
      z = a[T], a.hasOwnProperty(T) && z != null && !l.hasOwnProperty(T) && xe(e, t, T, null, l, z);
    for (H in l)
      z = l[H], j = a[H], !l.hasOwnProperty(H) || z === j || z == null && j == null || xe(e, t, H, z, l, j);
  }
  function Xd(e) {
    switch (e) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function Cg() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, a = performance.getEntriesByType("resource"), l = 0; l < a.length; l++) {
        var i = a[l], s = i.transferSize, o = i.initiatorType, d = i.duration;
        if (s && d && Xd(o)) {
          for (o = 0, d = i.responseEnd, l += 1; l < a.length; l++) {
            var v = a[l], C = v.startTime;
            if (C > d) break;
            var N = v.transferSize, H = v.initiatorType;
            N && Xd(H) && (v = v.responseEnd, o += N * (v < d ? 1 : (d - C) / (v - C)));
          }
          if (--l, t += 8 * (s + o) / (i.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Su = null, Au = null;
  function ki(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Qd(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Zd(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function xu(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Tu = null;
  function zg() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Tu ? !1 : (Tu = e, !0) : (Tu = null, !1);
  }
  var Vd = typeof setTimeout == "function" ? setTimeout : void 0, jg = typeof clearTimeout == "function" ? clearTimeout : void 0, Kd = typeof Promise == "function" ? Promise : void 0, Ng = typeof queueMicrotask == "function" ? queueMicrotask : typeof Kd < "u" ? function(e) {
    return Kd.resolve(null).then(e).catch(Og);
  } : Vd;
  function Og(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Ea(e) {
    return e === "head";
  }
  function Jd(e, t) {
    var a = t, l = 0;
    do {
      var i = a.nextSibling;
      if (e.removeChild(a), i && i.nodeType === 8)
        if (a = i.data, a === "/$" || a === "/&") {
          if (l === 0) {
            e.removeChild(i), ql(t);
            return;
          }
          l--;
        } else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&")
          l++;
        else if (a === "html")
          jn(e.ownerDocument.documentElement);
        else if (a === "head") {
          a = e.ownerDocument.head, jn(a);
          for (var s = a.firstChild; s; ) {
            var o = s.nextSibling, d = s.nodeName;
            s[Kl] || d === "SCRIPT" || d === "STYLE" || d === "LINK" && s.rel.toLowerCase() === "stylesheet" || a.removeChild(s), s = o;
          }
        } else
          a === "body" && jn(e.ownerDocument.body);
      a = i;
    } while (a);
    ql(t);
  }
  function Id(e, t) {
    var a = e;
    e = 0;
    do {
      var l = a.nextSibling;
      if (a.nodeType === 1 ? t ? (a._stashedDisplay = a.style.display, a.style.display = "none") : (a.style.display = a._stashedDisplay || "", a.getAttribute("style") === "" && a.removeAttribute("style")) : a.nodeType === 3 && (t ? (a._stashedText = a.nodeValue, a.nodeValue = "") : a.nodeValue = a._stashedText || ""), l && l.nodeType === 8)
        if (a = l.data, a === "/$") {
          if (e === 0) break;
          e--;
        } else
          a !== "$" && a !== "$?" && a !== "$~" && a !== "$!" || e++;
      a = l;
    } while (a);
  }
  function Mu(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (t = t.nextSibling, a.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Mu(a), Ns(a);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(a);
    }
  }
  function Dg(e, t, a, l) {
    for (; e.nodeType === 1; ) {
      var i = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[Kl])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (s = e.getAttribute("rel"), s === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (s !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (s = e.getAttribute("src"), (s !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && s && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var s = i.name == null ? null : "" + i.name;
        if (i.type === "hidden" && e.getAttribute("name") === s)
          return e;
      } else return e;
      if (e = Dt(e.nextSibling), e === null) break;
    }
    return null;
  }
  function Rg(e, t, a) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = Dt(e.nextSibling), e === null)) return null;
    return e;
  }
  function kd(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Dt(e.nextSibling), e === null)) return null;
    return e;
  }
  function Eu(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Cu(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Hg(e, t) {
    var a = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || a.readyState !== "loading")
      t();
    else {
      var l = function() {
        t(), a.removeEventListener("DOMContentLoaded", l);
      };
      a.addEventListener("DOMContentLoaded", l), e._reactRetry = l;
    }
  }
  function Dt(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return e;
  }
  var zu = null;
  function $d(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === "/$" || a === "/&") {
          if (t === 0)
            return Dt(e.nextSibling);
          t--;
        } else
          a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Wd(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
          if (t === 0) return e;
          t--;
        } else a !== "/$" && a !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Fd(e, t, a) {
    switch (t = ki(a), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(c(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(c(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(c(454));
        return e;
      default:
        throw Error(c(451));
    }
  }
  function jn(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    Ns(e);
  }
  var Rt = /* @__PURE__ */ new Map(), Pd = /* @__PURE__ */ new Set();
  function $i(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var ia = q.d;
  q.d = {
    f: Ug,
    r: Bg,
    D: wg,
    C: qg,
    L: Lg,
    m: Gg,
    X: Xg,
    S: Yg,
    M: Qg
  };
  function Ug() {
    var e = ia.f(), t = Yi();
    return e || t;
  }
  function Bg(e) {
    var t = ll(e);
    t !== null && t.tag === 5 && t.type === "form" ? gf(t) : ia.r(e);
  }
  var Ul = typeof document > "u" ? null : document;
  function em(e, t, a) {
    var l = Ul;
    if (l && typeof t == "string" && t) {
      var i = Mt(t);
      i = 'link[rel="' + e + '"][href="' + i + '"]', typeof a == "string" && (i += '[crossorigin="' + a + '"]'), Pd.has(i) || (Pd.add(i), e = { rel: e, crossOrigin: a, href: t }, l.querySelector(i) === null && (t = l.createElement("link"), Pe(t, "link", e), Ve(t), l.head.appendChild(t)));
    }
  }
  function wg(e) {
    ia.D(e), em("dns-prefetch", e, null);
  }
  function qg(e, t) {
    ia.C(e, t), em("preconnect", e, t);
  }
  function Lg(e, t, a) {
    ia.L(e, t, a);
    var l = Ul;
    if (l && e && t) {
      var i = 'link[rel="preload"][as="' + Mt(t) + '"]';
      t === "image" && a && a.imageSrcSet ? (i += '[imagesrcset="' + Mt(
        a.imageSrcSet
      ) + '"]', typeof a.imageSizes == "string" && (i += '[imagesizes="' + Mt(
        a.imageSizes
      ) + '"]')) : i += '[href="' + Mt(e) + '"]';
      var s = i;
      switch (t) {
        case "style":
          s = Bl(e);
          break;
        case "script":
          s = wl(e);
      }
      Rt.has(s) || (e = _(
        {
          rel: "preload",
          href: t === "image" && a && a.imageSrcSet ? void 0 : e,
          as: t
        },
        a
      ), Rt.set(s, e), l.querySelector(i) !== null || t === "style" && l.querySelector(Nn(s)) || t === "script" && l.querySelector(On(s)) || (t = l.createElement("link"), Pe(t, "link", e), Ve(t), l.head.appendChild(t)));
    }
  }
  function Gg(e, t) {
    ia.m(e, t);
    var a = Ul;
    if (a && e) {
      var l = t && typeof t.as == "string" ? t.as : "script", i = 'link[rel="modulepreload"][as="' + Mt(l) + '"][href="' + Mt(e) + '"]', s = i;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          s = wl(e);
      }
      if (!Rt.has(s) && (e = _({ rel: "modulepreload", href: e }, t), Rt.set(s, e), a.querySelector(i) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(On(s)))
              return;
        }
        l = a.createElement("link"), Pe(l, "link", e), Ve(l), a.head.appendChild(l);
      }
    }
  }
  function Yg(e, t, a) {
    ia.S(e, t, a);
    var l = Ul;
    if (l && e) {
      var i = nl(l).hoistableStyles, s = Bl(e);
      t = t || "default";
      var o = i.get(s);
      if (!o) {
        var d = { loading: 0, preload: null };
        if (o = l.querySelector(
          Nn(s)
        ))
          d.loading = 5;
        else {
          e = _(
            { rel: "stylesheet", href: e, "data-precedence": t },
            a
          ), (a = Rt.get(s)) && ju(e, a);
          var v = o = l.createElement("link");
          Ve(v), Pe(v, "link", e), v._p = new Promise(function(C, N) {
            v.onload = C, v.onerror = N;
          }), v.addEventListener("load", function() {
            d.loading |= 1;
          }), v.addEventListener("error", function() {
            d.loading |= 2;
          }), d.loading |= 4, Wi(o, t, l);
        }
        o = {
          type: "stylesheet",
          instance: o,
          count: 1,
          state: d
        }, i.set(s, o);
      }
    }
  }
  function Xg(e, t) {
    ia.X(e, t);
    var a = Ul;
    if (a && e) {
      var l = nl(a).hoistableScripts, i = wl(e), s = l.get(i);
      s || (s = a.querySelector(On(i)), s || (e = _({ src: e, async: !0 }, t), (t = Rt.get(i)) && Nu(e, t), s = a.createElement("script"), Ve(s), Pe(s, "link", e), a.head.appendChild(s)), s = {
        type: "script",
        instance: s,
        count: 1,
        state: null
      }, l.set(i, s));
    }
  }
  function Qg(e, t) {
    ia.M(e, t);
    var a = Ul;
    if (a && e) {
      var l = nl(a).hoistableScripts, i = wl(e), s = l.get(i);
      s || (s = a.querySelector(On(i)), s || (e = _({ src: e, async: !0, type: "module" }, t), (t = Rt.get(i)) && Nu(e, t), s = a.createElement("script"), Ve(s), Pe(s, "link", e), a.head.appendChild(s)), s = {
        type: "script",
        instance: s,
        count: 1,
        state: null
      }, l.set(i, s));
    }
  }
  function tm(e, t, a, l) {
    var i = (i = ce.current) ? $i(i) : null;
    if (!i) throw Error(c(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string" ? (t = Bl(a.href), a = nl(
          i
        ).hoistableStyles, l = a.get(t), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, a.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
          e = Bl(a.href);
          var s = nl(
            i
          ).hoistableStyles, o = s.get(e);
          if (o || (i = i.ownerDocument || i, o = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, s.set(e, o), (s = i.querySelector(
            Nn(e)
          )) && !s._p && (o.instance = s, o.state.loading = 5), Rt.has(e) || (a = {
            rel: "preload",
            as: "style",
            href: a.href,
            crossOrigin: a.crossOrigin,
            integrity: a.integrity,
            media: a.media,
            hrefLang: a.hrefLang,
            referrerPolicy: a.referrerPolicy
          }, Rt.set(e, a), s || Zg(
            i,
            e,
            a,
            o.state
          ))), t && l === null)
            throw Error(c(528, ""));
          return o;
        }
        if (t && l !== null)
          throw Error(c(529, ""));
        return null;
      case "script":
        return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = wl(a), a = nl(
          i
        ).hoistableScripts, l = a.get(t), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, a.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(c(444, e));
    }
  }
  function Bl(e) {
    return 'href="' + Mt(e) + '"';
  }
  function Nn(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function am(e) {
    return _({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Zg(e, t, a, l) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? l.loading = 1 : (t = e.createElement("link"), l.preload = t, t.addEventListener("load", function() {
      return l.loading |= 1;
    }), t.addEventListener("error", function() {
      return l.loading |= 2;
    }), Pe(t, "link", a), Ve(t), e.head.appendChild(t));
  }
  function wl(e) {
    return '[src="' + Mt(e) + '"]';
  }
  function On(e) {
    return "script[async]" + e;
  }
  function lm(e, t, a) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + Mt(a.href) + '"]'
          );
          if (l)
            return t.instance = l, Ve(l), l;
          var i = _({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), Ve(l), Pe(l, "style", i), Wi(l, a.precedence, e), t.instance = l;
        case "stylesheet":
          i = Bl(a.href);
          var s = e.querySelector(
            Nn(i)
          );
          if (s)
            return t.state.loading |= 4, t.instance = s, Ve(s), s;
          l = am(a), (i = Rt.get(i)) && ju(l, i), s = (e.ownerDocument || e).createElement("link"), Ve(s);
          var o = s;
          return o._p = new Promise(function(d, v) {
            o.onload = d, o.onerror = v;
          }), Pe(s, "link", l), t.state.loading |= 4, Wi(s, a.precedence, e), t.instance = s;
        case "script":
          return s = wl(a.src), (i = e.querySelector(
            On(s)
          )) ? (t.instance = i, Ve(i), i) : (l = a, (i = Rt.get(s)) && (l = _({}, a), Nu(l, i)), e = e.ownerDocument || e, i = e.createElement("script"), Ve(i), Pe(i, "link", l), e.head.appendChild(i), t.instance = i);
        case "void":
          return null;
        default:
          throw Error(c(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, Wi(l, a.precedence, e));
    return t.instance;
  }
  function Wi(e, t, a) {
    for (var l = a.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), i = l.length ? l[l.length - 1] : null, s = i, o = 0; o < l.length; o++) {
      var d = l[o];
      if (d.dataset.precedence === t) s = d;
      else if (s !== i) break;
    }
    s ? s.parentNode.insertBefore(e, s.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(e, t.firstChild));
  }
  function ju(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Nu(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Fi = null;
  function nm(e, t, a) {
    if (Fi === null) {
      var l = /* @__PURE__ */ new Map(), i = Fi = /* @__PURE__ */ new Map();
      i.set(a, l);
    } else
      i = Fi, l = i.get(a), l || (l = /* @__PURE__ */ new Map(), i.set(a, l));
    if (l.has(e)) return l;
    for (l.set(e, null), a = a.getElementsByTagName(e), i = 0; i < a.length; i++) {
      var s = a[i];
      if (!(s[Kl] || s[ke] || e === "link" && s.getAttribute("rel") === "stylesheet") && s.namespaceURI !== "http://www.w3.org/2000/svg") {
        var o = s.getAttribute(t) || "";
        o = e + o;
        var d = l.get(o);
        d ? d.push(s) : l.set(o, [s]);
      }
    }
    return l;
  }
  function im(e, t, a) {
    e = e.ownerDocument || e, e.head.insertBefore(
      a,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function Vg(e, t, a) {
    if (a === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
          break;
        return !0;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
          break;
        return t.rel === "stylesheet" ? (e = t.disabled, typeof t.precedence == "string" && e == null) : !0;
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function sm(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Kg(e, t, a, l) {
    if (a.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (a.state.loading & 4) === 0) {
      if (a.instance === null) {
        var i = Bl(l.href), s = t.querySelector(
          Nn(i)
        );
        if (s) {
          t = s._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Pi.bind(e), t.then(e, e)), a.state.loading |= 4, a.instance = s, Ve(s);
          return;
        }
        s = t.ownerDocument || t, l = am(l), (i = Rt.get(i)) && ju(l, i), s = s.createElement("link"), Ve(s);
        var o = s;
        o._p = new Promise(function(d, v) {
          o.onload = d, o.onerror = v;
        }), Pe(s, "link", l), a.instance = s;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(a, t), (t = a.state.preload) && (a.state.loading & 3) === 0 && (e.count++, a = Pi.bind(e), t.addEventListener("load", a), t.addEventListener("error", a));
    }
  }
  var Ou = 0;
  function Jg(e, t) {
    return e.stylesheets && e.count === 0 && ts(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(a) {
      var l = setTimeout(function() {
        if (e.stylesheets && ts(e, e.stylesheets), e.unsuspend) {
          var s = e.unsuspend;
          e.unsuspend = null, s();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Ou === 0 && (Ou = 62500 * Cg());
      var i = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && ts(e, e.stylesheets), e.unsuspend)) {
            var s = e.unsuspend;
            e.unsuspend = null, s();
          }
        },
        (e.imgBytes > Ou ? 50 : 800) + t
      );
      return e.unsuspend = a, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(i);
      };
    } : null;
  }
  function Pi() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) ts(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var es = null;
  function ts(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, es = /* @__PURE__ */ new Map(), t.forEach(Ig, e), es = null, Pi.call(e));
  }
  function Ig(e, t) {
    if (!(t.state.loading & 4)) {
      var a = es.get(e);
      if (a) var l = a.get(null);
      else {
        a = /* @__PURE__ */ new Map(), es.set(e, a);
        for (var i = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), s = 0; s < i.length; s++) {
          var o = i[s];
          (o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (a.set(o.dataset.precedence, o), l = o);
        }
        l && a.set(null, l);
      }
      i = t.instance, o = i.getAttribute("data-precedence"), s = a.get(o) || l, s === l && a.set(null, i), a.set(o, i), this.count++, l = Pi.bind(this), i.addEventListener("load", l), i.addEventListener("error", l), s ? s.parentNode.insertBefore(i, s.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Dn = {
    $$typeof: F,
    Provider: null,
    Consumer: null,
    _currentValue: W,
    _currentValue2: W,
    _threadCount: 0
  };
  function kg(e, t, a, l, i, s, o, d, v) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Es(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Es(0), this.hiddenUpdates = Es(null), this.identifierPrefix = l, this.onUncaughtError = i, this.onCaughtError = s, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = v, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function cm(e, t, a, l, i, s, o, d, v, C, N, H) {
    return e = new kg(
      e,
      t,
      a,
      o,
      v,
      C,
      N,
      H,
      d
    ), t = 1, s === !0 && (t |= 24), s = vt(3, null, null, t), e.current = s, s.stateNode = e, t = oc(), t.refCount++, e.pooledCache = t, t.refCount++, s.memoizedState = {
      element: l,
      isDehydrated: a,
      cache: t
    }, pc(s), e;
  }
  function um(e) {
    return e ? (e = pl, e) : pl;
  }
  function rm(e, t, a, l, i, s) {
    i = um(i), l.context === null ? l.context = i : l.pendingContext = i, l = ya(t), l.payload = { element: a }, s = s === void 0 ? null : s, s !== null && (l.callback = s), a = ga(e, l, t), a !== null && (dt(a, e, t), on(a, e, t));
  }
  function om(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function Du(e, t) {
    om(e, t), (e = e.alternate) && om(e, t);
  }
  function fm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ga(e, 67108864);
      t !== null && dt(t, e, 67108864), Du(e, 67108864);
    }
  }
  function dm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = xt();
      t = Cs(t);
      var a = Ga(e, t);
      a !== null && dt(a, e, t), Du(e, t);
    }
  }
  var as = !0;
  function $g(e, t, a, l) {
    var i = O.T;
    O.T = null;
    var s = q.p;
    try {
      q.p = 2, Ru(e, t, a, l);
    } finally {
      q.p = s, O.T = i;
    }
  }
  function Wg(e, t, a, l) {
    var i = O.T;
    O.T = null;
    var s = q.p;
    try {
      q.p = 8, Ru(e, t, a, l);
    } finally {
      q.p = s, O.T = i;
    }
  }
  function Ru(e, t, a, l) {
    if (as) {
      var i = Hu(l);
      if (i === null)
        bu(
          e,
          t,
          l,
          ls,
          a
        ), pm(e, l);
      else if (Pg(
        i,
        e,
        t,
        a,
        l
      ))
        l.stopPropagation();
      else if (pm(e, l), t & 4 && -1 < Fg.indexOf(e)) {
        for (; i !== null; ) {
          var s = ll(i);
          if (s !== null)
            switch (s.tag) {
              case 3:
                if (s = s.stateNode, s.current.memoizedState.isDehydrated) {
                  var o = Ua(s.pendingLanes);
                  if (o !== 0) {
                    var d = s;
                    for (d.pendingLanes |= 2, d.entangledLanes |= 2; o; ) {
                      var v = 1 << 31 - gt(o);
                      d.entanglements[1] |= v, o &= ~v;
                    }
                    Yt(s), (ge & 6) === 0 && (Li = pt() + 500, En(0));
                  }
                }
                break;
              case 31:
              case 13:
                d = Ga(s, 2), d !== null && dt(d, s, 2), Yi(), Du(s, 2);
            }
          if (s = Hu(l), s === null && bu(
            e,
            t,
            l,
            ls,
            a
          ), s === i) break;
          i = s;
        }
        i !== null && l.stopPropagation();
      } else
        bu(
          e,
          t,
          l,
          null,
          a
        );
    }
  }
  function Hu(e) {
    return e = Bs(e), Uu(e);
  }
  var ls = null;
  function Uu(e) {
    if (ls = null, e = al(e), e !== null) {
      var t = p(e);
      if (t === null) e = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (e = g(t), e !== null) return e;
          e = null;
        } else if (a === 31) {
          if (e = M(t), e !== null) return e;
          e = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ls = e, null;
  }
  function mm(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (wp()) {
          case br:
            return 2;
          case _r:
            return 8;
          case Kn:
          case qp:
            return 32;
          case Sr:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Bu = !1, Ca = null, za = null, ja = null, Rn = /* @__PURE__ */ new Map(), Hn = /* @__PURE__ */ new Map(), Na = [], Fg = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function pm(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Ca = null;
        break;
      case "dragenter":
      case "dragleave":
        za = null;
        break;
      case "mouseover":
      case "mouseout":
        ja = null;
        break;
      case "pointerover":
      case "pointerout":
        Rn.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Hn.delete(t.pointerId);
    }
  }
  function Un(e, t, a, l, i, s) {
    return e === null || e.nativeEvent !== s ? (e = {
      blockedOn: t,
      domEventName: a,
      eventSystemFlags: l,
      nativeEvent: s,
      targetContainers: [i]
    }, t !== null && (t = ll(t), t !== null && fm(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
  }
  function Pg(e, t, a, l, i) {
    switch (t) {
      case "focusin":
        return Ca = Un(
          Ca,
          e,
          t,
          a,
          l,
          i
        ), !0;
      case "dragenter":
        return za = Un(
          za,
          e,
          t,
          a,
          l,
          i
        ), !0;
      case "mouseover":
        return ja = Un(
          ja,
          e,
          t,
          a,
          l,
          i
        ), !0;
      case "pointerover":
        var s = i.pointerId;
        return Rn.set(
          s,
          Un(
            Rn.get(s) || null,
            e,
            t,
            a,
            l,
            i
          )
        ), !0;
      case "gotpointercapture":
        return s = i.pointerId, Hn.set(
          s,
          Un(
            Hn.get(s) || null,
            e,
            t,
            a,
            l,
            i
          )
        ), !0;
    }
    return !1;
  }
  function ym(e) {
    var t = al(e.target);
    if (t !== null) {
      var a = p(t);
      if (a !== null) {
        if (t = a.tag, t === 13) {
          if (t = g(a), t !== null) {
            e.blockedOn = t, Cr(e.priority, function() {
              dm(a);
            });
            return;
          }
        } else if (t === 31) {
          if (t = M(a), t !== null) {
            e.blockedOn = t, Cr(e.priority, function() {
              dm(a);
            });
            return;
          }
        } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function ns(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = Hu(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var l = new a.constructor(
          a.type,
          a
        );
        Us = l, a.target.dispatchEvent(l), Us = null;
      } else
        return t = ll(a), t !== null && fm(t), e.blockedOn = a, !1;
      t.shift();
    }
    return !0;
  }
  function gm(e, t, a) {
    ns(e) && a.delete(t);
  }
  function eh() {
    Bu = !1, Ca !== null && ns(Ca) && (Ca = null), za !== null && ns(za) && (za = null), ja !== null && ns(ja) && (ja = null), Rn.forEach(gm), Hn.forEach(gm);
  }
  function is(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Bu || (Bu = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      eh
    )));
  }
  var ss = null;
  function hm(e) {
    ss !== e && (ss = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        ss === e && (ss = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t], l = e[t + 1], i = e[t + 2];
          if (typeof l != "function") {
            if (Uu(l || a) === null)
              continue;
            break;
          }
          var s = ll(a);
          s !== null && (e.splice(t, 3), t -= 3, Hc(
            s,
            {
              pending: !0,
              data: i,
              method: a.method,
              action: l
            },
            l,
            i
          ));
        }
      }
    ));
  }
  function ql(e) {
    function t(v) {
      return is(v, e);
    }
    Ca !== null && is(Ca, e), za !== null && is(za, e), ja !== null && is(ja, e), Rn.forEach(t), Hn.forEach(t);
    for (var a = 0; a < Na.length; a++) {
      var l = Na[a];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < Na.length && (a = Na[0], a.blockedOn === null); )
      ym(a), a.blockedOn === null && Na.shift();
    if (a = (e.ownerDocument || e).$$reactFormReplay, a != null)
      for (l = 0; l < a.length; l += 3) {
        var i = a[l], s = a[l + 1], o = i[st] || null;
        if (typeof s == "function")
          o || hm(a);
        else if (o) {
          var d = null;
          if (s && s.hasAttribute("formAction")) {
            if (i = s, o = s[st] || null)
              d = o.formAction;
            else if (Uu(i) !== null) continue;
          } else d = o.action;
          typeof d == "function" ? a[l + 1] = d : (a.splice(l, 3), l -= 3), hm(a);
        }
      }
  }
  function vm() {
    function e(s) {
      s.canIntercept && s.info === "react-transition" && s.intercept({
        handler: function() {
          return new Promise(function(o) {
            return i = o;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      i !== null && (i(), i = null), l || setTimeout(a, 20);
    }
    function a() {
      if (!l && !navigation.transition) {
        var s = navigation.currentEntry;
        s && s.url != null && navigation.navigate(s.url, {
          state: s.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var l = !1, i = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(a, 100), function() {
        l = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
      };
    }
  }
  function wu(e) {
    this._internalRoot = e;
  }
  cs.prototype.render = wu.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(c(409));
    var a = t.current, l = xt();
    rm(a, l, e, t, null, null);
  }, cs.prototype.unmount = wu.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      rm(e.current, 2, null, e, null, null), Yi(), t[tl] = null;
    }
  };
  function cs(e) {
    this._internalRoot = e;
  }
  cs.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Er();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < Na.length && t !== 0 && t < Na[a].priority; a++) ;
      Na.splice(a, 0, e), a === 0 && ym(e);
    }
  };
  var bm = u.version;
  if (bm !== "19.2.5")
    throw Error(
      c(
        527,
        bm,
        "19.2.5"
      )
    );
  q.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(c(188)) : (e = Object.keys(e).join(","), Error(c(268, e)));
    return e = h(t), e = e !== null ? D(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var th = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: O,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var us = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!us.isDisabled && us.supportsFiber)
      try {
        Ql = us.inject(
          th
        ), yt = us;
      } catch {
      }
  }
  return wn.createRoot = function(e, t) {
    if (!m(e)) throw Error(c(299));
    var a = !1, l = "", i = Ef, s = Cf, o = zf;
    return t != null && (t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (i = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = cm(
      e,
      1,
      !1,
      null,
      null,
      a,
      l,
      null,
      i,
      s,
      o,
      vm
    ), e[tl] = t.current, vu(e), new wu(t);
  }, wn.hydrateRoot = function(e, t, a) {
    if (!m(e)) throw Error(c(299));
    var l = !1, i = "", s = Ef, o = Cf, d = zf, v = null;
    return a != null && (a.unstable_strictMode === !0 && (l = !0), a.identifierPrefix !== void 0 && (i = a.identifierPrefix), a.onUncaughtError !== void 0 && (s = a.onUncaughtError), a.onCaughtError !== void 0 && (o = a.onCaughtError), a.onRecoverableError !== void 0 && (d = a.onRecoverableError), a.formState !== void 0 && (v = a.formState)), t = cm(
      e,
      1,
      !0,
      t,
      a ?? null,
      l,
      i,
      v,
      s,
      o,
      d,
      vm
    ), t.context = um(null), a = t.current, l = xt(), l = Cs(l), i = ya(l), i.callback = null, ga(a, i, l), a = l, t.current.lanes = a, Vl(t, a), Yt(t), e[tl] = t.current, vu(e), new cs(t);
  }, wn.version = "19.2.5", wn;
}
var jm;
function mh() {
  if (jm) return Gu.exports;
  jm = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (u) {
        console.error(u);
      }
  }
  return n(), Gu.exports = dh(), Gu.exports;
}
var ph = mh();
const yh = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), sp = (...n) => n.filter((u, r, c) => !!u && u.trim() !== "" && c.indexOf(u) === r).join(" ").trim();
var gh = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const hh = ae.forwardRef(
  ({
    color: n = "currentColor",
    size: u = 24,
    strokeWidth: r = 2,
    absoluteStrokeWidth: c,
    className: m = "",
    children: p,
    iconNode: g,
    ...M
  }, y) => ae.createElement(
    "svg",
    {
      ref: y,
      ...gh,
      width: u,
      height: u,
      stroke: n,
      strokeWidth: c ? Number(r) * 24 / Number(u) : r,
      className: sp("lucide", m),
      ...M
    },
    [
      ...g.map(([h, D]) => ae.createElement(h, D)),
      ...Array.isArray(p) ? p : [p]
    ]
  )
);
const Ra = (n, u) => {
  const r = ae.forwardRef(
    ({ className: c, ...m }, p) => ae.createElement(hh, {
      ref: p,
      iconNode: u,
      className: sp(`lucide-${yh(n)}`, c),
      ...m
    })
  );
  return r.displayName = `${n}`, r;
};
const Nm = Ra("ChartColumn", [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
]);
const ur = Ra("CirclePlay", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polygon", { points: "10 8 16 12 10 16 10 8", key: "1cimsy" }]
]);
const vh = Ra("Library", [
  ["path", { d: "m16 6 4 14", key: "ji33uf" }],
  ["path", { d: "M12 6v14", key: "1n7gus" }],
  ["path", { d: "M8 8v12", key: "1gg7y9" }],
  ["path", { d: "M4 4v16", key: "6qkkli" }]
]);
const bh = Ra("ReceiptText", [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M14 8H8", key: "1l3xfs" }],
  ["path", { d: "M16 12H8", key: "1fr5h0" }],
  ["path", { d: "M13 16H8", key: "wsln4y" }]
]);
const _h = Ra("Settings", [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
const Sh = Ra("Sparkles", [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
]);
const Ah = Ra("UsersRound", [
  ["path", { d: "M18 21a8 8 0 0 0-16 0", key: "3ypg7q" }],
  ["circle", { cx: "10", cy: "8", r: "5", key: "o932ke" }],
  ["path", { d: "M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3", key: "10s06x" }]
]);
const xh = Ra("Wifi", [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 20 0", key: "dnpr2z" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 14 0", key: "1x1e6c" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }]
]), Th = { version: "0.2.1-deduped", source: "从 90 张 ST 卡标题人工归纳的种子词典", schema: "TagEntry: { id, label, category, family?, aliases[], negativeAliases?, description?, examples?[], parentId?, priority?, scopePreference?, status? }", categories: ["角色气质", "身份阶层", "关系结构", "情感走向", "互动机制", "世界观题材", "雷点/偏好", "其他"], families_used: ["犬系角色", "daddy系", "血缘禁忌", "冷热反差", "破镜系", "强制爱系", "酸涩家族", "万人迷/群像"], notes: ["family 字段用于画像层聚合,不用于召回阶段同义合并。", "aliases 只放真同义词。家族成员各自独立成 entry。", "negativeAliases 命中要扣分,常用于消歧(如'纯爱'≠'纯恨')。", "scopeHint 在召回阶段由匹配字段决定,不写死在 entry 里。", "新增 parentId/priority/scopePreference/status，用于后处理去重、画像聚合和 AI prompt 控制。", "允许 AI 生成受控 freeformTags，但必须进入 unmatchedTagPool，不能直接污染正式词典。", "已去重 alias：同一 alias 只保留在 canonical 标签上，避免本地召回一词多义误触发。"] }, Mh = /* @__PURE__ */ JSON.parse(`[{"id":"qz_lengremenghuo","label":"冷脸萌","category":"角色气质","family":"冷热反差","aliases":["冷脸难攻略","毒舌冷脸萌","冷脸美人","冷脸"],"description":"外表冷淡疏离,内里有反差萌点。重点在'反差',不是单纯的高冷。","examples":["这个冷脸萌同桌想要我先表白","毒舌冷脸萌"],"negativeAliases":[],"parentId":"cold_distance_type","priority":75,"scopePreference":"any","status":"active"},{"id":"qz_waileng_neire","label":"外冷内热","category":"角色气质","family":"冷热反差","aliases":["外冷内热","高冷但直球"],"description":"对外冷淡,对'你'温柔。比'冷脸萌'更直接进入恋爱关系。","examples":["季云止·外冷内热"],"negativeAliases":[],"parentId":"cold_distance_type","priority":70,"scopePreference":"any","status":"active"},{"id":"qz_xiaomianhu","label":"笑面虎","category":"角色气质","family":"冷热反差","aliases":["笑面虎哥","笑眯眯"],"description":"表面笑呵呵实则危险/腹黑。和外冷内热反向。","examples":["笑面虎哥","笑眯眯温柔男高"],"negativeAliases":[],"parentId":"dangerous_smile_type","priority":70,"scopePreference":"any","status":"active"},{"id":"qz_gaolingzhihua","label":"高岭之花","category":"角色气质","aliases":["高岭之花","禁欲","禁欲背德"],"description":"清冷自持、性张力来自距离感。常和'禁欲'共现。","family":"","negativeAliases":[],"examples":[],"parentId":"cold_distance_type","priority":65,"scopePreference":"any","status":"active"},{"id":"qz_qianqianjunzi","label":"老实人","category":"角色气质","aliases":["纯情老实人","不要欺负老实人"],"description":"保守克制。","family":"","negativeAliases":[],"examples":[],"parentId":"stability_type","priority":55,"scopePreference":"any","status":"active"},{"id":"qz_pi_huai_lao_liu_mang","label":"痞帅","category":"角色气质","aliases":["痞坏老流氓","痞帅","大尾巴狼"],"description":"有匪气、不正经但有底线","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"qz_dan_ren","label":"淡人","category":"角色气质","aliases":["淡人","冷漠b"],"description":"情感钝感、低欲望、心如止水类型。和'冷脸萌'不同,内里也是凉的。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"qz_zui_jian","label":"嘴贱","category":"角色气质","aliases":["嘴贱","嘴贱搞笑","嘴欠哥","嘴臭咖","嘴贱臭屁"],"description":"话不饶人、毒舌挑衅型。","family":"","negativeAliases":[],"examples":[],"parentId":"sharp_tongue_type","priority":65,"scopePreference":"any","status":"active"},{"id":"qz_zha_nan","label":"渣男","category":"角色气质","aliases":["渣男","海王","非典型渣男","非典型浪子","妇女之友","博爱"],"description":"感情不专一或边界混乱。注意'非典型X'通常意味着翻案/反差。","family":"","negativeAliases":[],"examples":[],"parentId":"playboy_type","priority":60,"scopePreference":"any","status":"active"},{"id":"qz_si_wen_bai_lei","label":"斯文败类","category":"角色气质","aliases":["斯文败类","西装暴徒"],"description":"外表体面有教养,行为/性癖危险。","family":"","negativeAliases":[],"examples":[],"parentId":"civilized_danger_type","priority":80,"scopePreference":"any","status":"active"},{"id":"qz_re_lian_jian","label":"热脸贱","category":"角色气质","family":"犬系角色","aliases":["热脸贱","贱萌","萌脸贱"],"description":"上赶着粘人但嘴硬挨打型,典型小狗特质。和单纯的'贱'不同,核心是'热脸'。","negativeAliases":[],"examples":[],"parentId":"dog_type","priority":70,"scopePreference":"any","status":"active"},{"id":"qz_xiao_gou","label":"小狗","category":"角色气质","family":"犬系角色","aliases":["小狗","迟钝的狗男","狗皮膏药","纯情孩砸","纯情狗"],"description":"粘人忠诚、依赖性强的犬系男主,情感正向。","negativeAliases":[],"examples":[],"parentId":"dog_type","priority":65,"scopePreference":"any","status":"active"},{"id":"qz_gou_nan","label":"狗男","category":"角色气质","family":"犬系角色","aliases":["狗男","臭屁狗男","贱萌狗男"],"negativeAliases":["狗男坏狗","恶女狗男"],"description":"圈内常用,中性/略贬,'有点不正经但你想留着'的男主。","parentId":"dog_type","priority":60,"scopePreference":"any","status":"active"},{"id":"qz_huai_gou","label":"坏狗","category":"角色气质","family":"犬系角色","aliases":["坏狗","恶犬","贱狗"],"description":"比狗男更暗,带攻击性/占有欲,但仍是犬系。","negativeAliases":[],"examples":[],"parentId":"dog_type","priority":75,"scopePreference":"any","status":"active"},{"id":"qz_ye_gou","label":"野狗","category":"角色气质","family":"犬系角色","aliases":["野狗","疯狗"],"description":"失控/出身边缘/暴烈的犬系。比坏狗更危险,通常伴随'问题学生''暴力'。","negativeAliases":[],"examples":[],"parentId":"dog_type","priority":85,"scopePreference":"any","status":"active"},{"id":"qz_lan_tao_xi","label":"烂人","category":"角色气质","aliases":["烂人"],"description":"人品差、颓废或道德败坏的人","family":"","negativeAliases":[],"examples":[],"parentId":"playboy_type","priority":70,"scopePreference":"any","status":"active"},{"id":"qz_lao_po_nu","label":"老婆奴","category":"角色气质","family":"犬系角色","aliases":["老婆奴","无底线宠溺","溺爱"],"description":"对老婆/对象单方面跪舔型,自愿降级为狗。","negativeAliases":[],"examples":[],"parentId":"dog_type","priority":75,"scopePreference":"any","status":"active"},{"id":"qz_die_gan_shao_nan","label":"爹系","category":"角色气质","family":"daddy系","aliases":["爹感少男","爹系","爹系熟男"],"description":"年龄不一定大但有'爹感'的可靠/包容气质。和真 daddy 区分。","negativeAliases":[],"examples":[],"parentId":"daddy_type","priority":65,"scopePreference":"any","status":"active"},{"id":"qz_lao_pai_nan_gao","label":"老派","category":"角色气质","aliases":["老派男高","老封建"],"description":"传统价值观/有点保守。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"qz_qing_shu_nan","label":"轻熟男","category":"角色气质","aliases":["轻熟男","人夫感"],"description":"30岁上下、稳定但仍有性吸引力的男性。","family":"","negativeAliases":[],"examples":[],"parentId":"mature_male_type","priority":55,"scopePreference":"any","status":"active"},{"id":"qz_du_she","label":"毒舌","category":"角色气质","aliases":["毒舌","毒舌总裁","毒舌傲骨","白眼翻得好"],"description":"讽刺刻薄但通常不是真坏人。","family":"","negativeAliases":[],"examples":[],"parentId":"sharp_tongue_type","priority":65,"scopePreference":"any","status":"active"},{"id":"qz_ao_jiao","label":"傲娇","category":"角色气质","aliases":["傲娇","傲骨"],"description":"口是心非、嘴硬心软的经典萌点。","family":"","negativeAliases":[],"examples":[],"parentId":"tsundere_type","priority":60,"scopePreference":"any","status":"active"},{"id":"qz_naozi_buhao","label":"笨蛋","category":"角色气质","aliases":["傻子","笨蛋","傻"],"description":"智力或情商不在线的可爱型","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"qz_chu_nan","label":"处男","category":"角色气质","aliases":["处男","处男是最好的嫁妆"],"description":"性经验为零,常和'纯情''洁'共现。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"shen_haomen","label":"豪门","category":"身份阶层","aliases":["豪门","豪门夫妻","狗血豪门","港风豪门","财阀世家","家族企业"],"description":"家族财富+权力的世界观入口。","family":"","negativeAliases":[],"examples":[],"parentId":"wealth_power_type","priority":40,"scopePreference":"any","status":"active"},{"id":"shen_lao_qian","label":"老钱","category":"身份阶层","aliases":["老钱","沪上老钱"],"description":"继承型旧贵财富,区别于新贵/暴发户。","family":"","negativeAliases":[],"examples":[],"parentId":"wealth_power_type","priority":65,"scopePreference":"any","status":"active"},{"id":"shen_er_shi_zu","label":"二世祖","category":"身份阶层","aliases":["二世祖","废物二世祖"],"description":"没有能力，只会挥霍家产的纨绔子弟。","family":"","negativeAliases":[],"examples":[],"parentId":"wealth_power_type","priority":70,"scopePreference":"any","status":"active"},{"id":"shen_er_shi_zu","label":"太子爷","category":"身份阶层","aliases":["太子爷","纸醉金迷太子爷"],"description":"权有势的“二代“，更多是强调其身份地位带来的压迫感与戏剧冲突。","family":"","negativeAliases":[],"examples":[],"parentId":"wealth_power_type","priority":70,"scopePreference":"any","status":"active"},{"id":"shen_jin_zhu","label":"金主","category":"身份阶层","family":"daddy系","aliases":["金主","金主文学","非典型金主文学","包养"],"description":"出钱方,关系结构中的上位者。","negativeAliases":[],"examples":[],"parentId":"sponsor_power_type","priority":75,"scopePreference":"any","status":"active"},{"id":"shen_daddy","label":"daddy","category":"身份阶层","family":"daddy系","aliases":["daddy","糖爹","sugar daddy","suger daddy","糖爹dom","金钱daddy","闷骚daddy"],"_match_note":"匹配阶段统一小写化后比较","description":"圈内泛指年长上位包容型男性。注意:'亲父女 daddy' ≠ '金主 daddy',语义靠上下文。","examples":["金钱Daddy|斯文败类","BDSM/老钱/daddy/养成"],"negativeAliases":["亲父女","养父","继父"],"parentId":"daddy_type","priority":80,"scopePreference":"any","status":"active"},{"id":"shen_gao_gan","label":"高干","category":"身份阶层","aliases":["高干","经典高干文学","军人","书记","军官"],"description":"体制内/军政背景。古早言情常用。","family":"","negativeAliases":[],"examples":[],"parentId":"institutional_power_type","priority":70,"scopePreference":"any","status":"active"},{"id":"shen_xiao_xian_chen","label":"小县城","category":"身份阶层","aliases":["小县城","县城文学","小城生活","潮湿文学"],"description":"和豪门相对的下沉地理空间,自带氛围(湿、闷、廉价)。","family":"","negativeAliases":[],"examples":[],"parentId":"place_class_type","priority":60,"scopePreference":"any","status":"active"},{"id":"shen_putong_ren","label":"普通人","category":"身份阶层","aliases":["普通人"],"description":"明确反豪门/反金手指设定。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"shen_liu_zi","label":"留子","category":"身份阶层","aliases":["留子","非典型留学公子"],"description":"留学生身份,常和'美高''混血'共现。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"shen_meigao","label":"美高","category":"身份阶层","aliases":["美高"],"description":"美国高中场景,自带橄榄球/霸凌/小团体氛围。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"shen_da_zi_shao_xie_zhang_yuan_lang","label":"落难书生","category":"身份阶层","aliases":["落魄公子哥","世家状元郎","落难未婚妻"],"description":"古风/民国常见,身份高但当下落魄。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"shen_jiang_hu_ren","label":"江湖人","category":"身份阶层","aliases":["侠客"],"description":"武侠/古风世界中的身份入口。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"shen_te_jing","label":"警特","category":"身份阶层","aliases":["特警","刑警","卧底"],"description":"执法/对抗职业,常配'手铐 play'。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"shen_gu_huo_zai","label":"黑道","category":"身份阶层","aliases":["古惑仔","黑社会大佬","黑帮老大"],"description":"黑道。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"shen_dian_jing","label":"电竞","category":"身份阶层","aliases":["电竞","游戏主播","电竞嫂子"],"description":"电竞圈相关身份。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"guan_qing_mei_zhu_ma","label":"青梅竹马","category":"关系结构","aliases":["青梅竹马","竹马","幼驯染","娃娃亲"],"description":"从小一起长大的关系入口。","family":"","negativeAliases":[],"examples":[],"parentId":"childhood_relation","priority":70,"scopePreference":"scenario","status":"active"},{"id":"guan_si_dui_tou","label":"死对头","category":"关系结构","aliases":["死对头","对立","对抗路","宿敌","仇人"],"description":"敌对关系起步,enemies-to-lovers 的经典入口。","family":"","negativeAliases":[],"examples":[],"parentId":"enemy_relation","priority":70,"scopePreference":"scenario","status":"active"},{"id":"guan_shi_sheng","label":"师生","category":"关系结构","aliases":["师生"],"description":"权力差关系类型之一。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"guan_xian_hun_hou_ai","label":"先婚后爱","category":"关系结构","aliases":["先婚后爱","假夫妻"],"description":"婚姻在前感情在后,常配'契约'。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"guan_qian_ren","label":"前任","category":"关系结构","family":"破镜系","aliases":["前任","前男友","前夫","旧爱","ex"],"description":"前情人重逢叙事入口。","examples":["新贵冷脸现任x权贵大爹前夫"],"negativeAliases":[],"parentId":"ex_relation","priority":65,"scopePreference":"scenario","status":"active"},{"id":"guan_po_jing_chong_yuan","label":"破镜重圆","category":"关系结构","family":"破镜系","aliases":["破镜重圆","枯木逢春","久别重逢","十年重逢"],"description":"分开后重新和好,通常有创伤复盘。","negativeAliases":[],"examples":[],"parentId":"reunion_relation","priority":75,"scopePreference":"scenario","status":"active"},{"id":"guan_zhui_qi_huo_zang_chang","label":"追妻火葬场","category":"关系结构","family":"破镜系","aliases":["追妻火葬场","忘恩负义c"],"description":"曾经辜负后跪求复合的 c 视角。","negativeAliases":[],"examples":[],"parentId":"reunion_relation","priority":85,"scopePreference":"scenario","status":"active"},{"id":"guan_gu_ke","label":"骨科","category":"关系结构","family":"血缘禁忌","aliases":["骨科","真骨科","龙凤胎真骨科"],"negativeAliases":["伪骨","伪骨科"],"description":"亲属间恋爱关系的圈内黑话。'伪骨'是反义,要扣分。","examples":[],"parentId":"blood_taboo_relation","priority":85,"scopePreference":"scenario","status":"active"},{"id":"guan_wei_gu","label":"伪骨","category":"关系结构","aliases":["伪骨","伪骨科","抱错梗"],"description":"看似亲属实非亲属,刻意制造禁忌感的设定。和真骨科要分开。","family":"","negativeAliases":[],"examples":[],"parentId":"blood_taboo_relation","priority":80,"scopePreference":"scenario","status":"active"},{"id":"guan_xiong_mei","label":"兄妹","category":"关系结构","family":"血缘禁忌","aliases":["兄妹","姐弟","姐弟兄妹","兄弟夹心","蜜蜂兄弟夹心"],"description":"兄妹/姐弟关系入口。","negativeAliases":[],"examples":[],"parentId":"blood_taboo_relation","priority":75,"scopePreference":"scenario","status":"active"},{"id":"guan_shu_zhi","label":"叔侄/婶侄","category":"关系结构","family":"血缘禁忌","aliases":["叔侄","婶侄","小叔"],"description":"亲缘禁忌关系的另一类。","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"guan_qin_fu_nu","label":"亲父女","category":"关系结构","family":"血缘禁忌","aliases":["亲父女","养父","继父"],"description":"高强度禁忌入口,需要在评价里特别小心语气。","negativeAliases":[],"examples":[],"parentId":"blood_taboo_relation","priority":90,"scopePreference":"scenario","status":"active"},{"id":"guan_san_ren_xing","label":"多人","category":"关系结构","aliases":["三人行","多人","多人NP","NP","3P","修罗场"],"description":"多角关系结构,与单人 OTP 区分。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"guan_ti_shen","label":"替身","category":"关系结构","aliases":["替身","替身&前任文学"],"description":"替代另一个人被爱的位置。","family":"","negativeAliases":[],"examples":[],"parentId":"replacement_relation","priority":70,"scopePreference":"scenario","status":"active"},{"id":"guan_bai_yue_guang","label":"白月光","category":"关系结构","aliases":["白月光","白月光u","双白月光"],"description":"求而不得/精神图腾型对象。","family":"","negativeAliases":[],"examples":[],"parentId":"moonlight_relation","priority":70,"scopePreference":"scenario","status":"active"},{"id":"guan_hei_yue_guang","label":"黑月光","category":"关系结构","aliases":["黑月光"],"description":"白月光的暗面变体,带恨/怨。","family":"","negativeAliases":[],"examples":[],"parentId":"moonlight_relation","priority":75,"scopePreference":"scenario","status":"active"},{"id":"guan_chu_lian","label":"初恋","category":"关系结构","aliases":["初恋"],"description":"第一次的感情对象。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"guan_wan_ren_mi","label":"万人迷/群像","category":"关系结构","family":"万人迷/群像","aliases":["万人迷","群像","都市群像","书院群像"],"description":"多 NPC 围绕主角的结构。","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"guan_xian_hou_gong","label":"后宫/合法多人","category":"关系结构","family":"万人迷/群像","aliases":["合法后宫","皇帝c"],"description":"古风权力结构下的多人合法关系。","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"guan_shuang_chu_gui","label":"双出轨","category":"关系结构","aliases":["双出轨"],"description":"双方都对原配出轨。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"guan_nv_lv","label":"女绿","category":"关系结构","aliases":["女绿"],"description":"圈内黑话,女主被绿/出轨叙事。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"guan_jin_si_que","label":"金丝雀","category":"关系结构","aliases":["金丝雀","玩物"],"description":"被包养/被囚养的关系位置。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"guan_lian_yin","label":"联姻/相亲","category":"关系结构","aliases":["相亲","联姻","未婚妻","相睇","长辈安排"],"description":"外力安排的婚配关系。","family":"","negativeAliases":[],"examples":[],"parentId":"arranged_marriage_relation","priority":65,"scopePreference":"scenario","status":"active"},{"id":"guan_pao_you","label":"炮友","category":"关系结构","aliases":["炮友","固炮"],"description":"明确的非正式性关系。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"guan_yang_cheng","label":"养成","category":"关系结构","aliases":["养成","白手起家养大u"],"description":"从小养大再恋爱,有伦理灰色。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"qing_suan_se","label":"酸涩","category":"情感走向","family":"酸涩家族","aliases":["酸涩","甜宠酸涩","温暖酸涩","酸涩拉扯"],"description":"圈内最高频情感色调,'甜里带苦'。","negativeAliases":[],"examples":[],"parentId":"bittersweet_tone","priority":60,"scopePreference":"any","status":"active"},{"id":"qing_hen_hai_qing_tian","label":"恨海情天","category":"情感走向","family":"酸涩家族","aliases":["恨海情天","恨海晴天"],"description":"爱恨交织、撕裂感强烈的关系基调。","negativeAliases":[],"examples":[],"parentId":"bittersweet_tone","priority":80,"scopePreference":"any","status":"active"},{"id":"qing_zuo_hen","label":"做恨","category":"情感走向","family":"酸涩家族","aliases":["做恨","做怨侣","皇帝重生做恨"],"description":"明知会恨仍要做爱/共度的虐型基调。","negativeAliases":[],"examples":[],"parentId":"bittersweet_tone","priority":85,"scopePreference":"any","status":"active"},{"id":"qing_chun_ai","label":"纯爱","category":"情感走向","aliases":["纯爱","轻松纯爱"],"negativeAliases":["纯恨"],"description":"情感单纯专一。和'纯恨'反义。","family":"","examples":[],"parentId":"love_tone","priority":55,"scopePreference":"any","status":"active"},{"id":"qing_chun_hen","label":"纯恨","category":"情感走向","aliases":["纯恨","纯卖骚","媚女恨男"],"description":"全程恨/无爱情线,仅性张力或权力博弈。","family":"","negativeAliases":[],"examples":[],"parentId":"love_tone","priority":75,"scopePreference":"any","status":"active"},{"id":"qing_tian_chong","label":"甜宠","category":"情感走向","aliases":["甜宠","狗血甜宠"],"description":"以宠溺为主基调的情感叙事。","family":"","negativeAliases":[],"examples":[],"parentId":"love_tone","priority":55,"scopePreference":"any","status":"active"},{"id":"qing_gou_xue","label":"狗血","category":"情感走向","aliases":["狗血","古早狗血","微狗血"],"description":"戏剧冲突浓密、转折多。","family":"","negativeAliases":[],"examples":[],"parentId":"dramatic_tone","priority":60,"scopePreference":"any","status":"active"},{"id":"qing_shuang_xiang_jiu_shu","label":"双向救赎","category":"情感走向","aliases":["双向救赎","双向暗恋","风雨同舟"],"description":"互相疗愈/拯救的对等型情感。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"qing_ku_lian","label":"美强惨","category":"情感走向","aliases":["美强惨","美惨"],"description":"外貌强能力强但身世惨,经典催泪三件套。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"qing_la_che","label":"拉扯","category":"情感走向","family":"酸涩家族","aliases":["拉扯","极限拉扯"],"description":"进退两难的情感博弈。","negativeAliases":[],"examples":[],"parentId":"bittersweet_tone","priority":65,"scopePreference":"any","status":"active"},{"id":"qing_e_su","label":"恶俗","category":"情感走向","aliases":["恶俗","恶俗治愈","恶俗开盖","产奶"],"description":"圈内自嘲式标签,主动承认狗血和nsfw相关内容。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"qing_kong_xin","label":"空心/淡感","category":"情感走向","aliases":["空心","空心淡人"],"description":"情感钝感的角色叙事走向。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"hu_qiang_zhi_ai","label":"强制爱","category":"互动机制","family":"强制爱系","aliases":["强制爱","强取豪夺"],"description":"以强力推进关系,边界模糊。","negativeAliases":[],"examples":[],"parentId":"coercive_love_type","priority":80,"scopePreference":"any","status":"active"},{"id":"hu_qiu_jin","label":"囚禁","category":"互动机制","family":"强制爱系","aliases":["囚禁","囚禁私奔"],"description":"物理限制对方自由,常和黑化共现。","negativeAliases":[],"examples":[],"parentId":"coercive_love_type","priority":85,"scopePreference":"any","status":"active"},{"id":"hu_hei_hua","label":"黑化","category":"互动机制","family":"强制爱系","aliases":["黑化","黑化重生"],"description":"角色从光明走向阴湿/失控。","negativeAliases":[],"examples":[],"parentId":"coercive_love_type","priority":75,"scopePreference":"any","status":"active"},{"id":"hu_yin_shi","label":"阴湿","category":"互动机制","aliases":["阴湿","阴湿小狗","微阴湿"],"description":"情绪/行为带潮湿感、占有欲、压抑暗涌。","family":"","negativeAliases":[],"examples":[],"parentId":"dark_possessive_type","priority":70,"scopePreference":"any","status":"active"},{"id":"hu_BDSM","label":"BDSM","category":"互动机制","aliases":["BDSM","D/s","SM","手铐play","Dom系"],"description":"BDSM 总类标签。具体支配/臣服/训诫倾向优先使用 Dom、Sub、温柔Dom、训诫等子标签。","family":"","negativeAliases":[],"examples":[],"parentId":"bdsm_type","priority":50,"scopePreference":"any","status":"active"},{"id":"hu_sweet_talk","label":"Sweet Talk","category":"互动机制","aliases":["sweet talk","会哄不会停"],"_match_note":"case-insensitive","description":"甜言蜜语流,语言挑逗为主要互动。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"hu_man_gong_lue","label":"难攻略","category":"互动机制","aliases":["慢攻略","难攻略"],"description":"需要长时间/困难度高才能推进的关系机制。","family":"","negativeAliases":[],"examples":[],"parentId":"攻略难度","priority":60,"scopePreference":"any","status":"active"},{"id":"hu_zi_wo_gong_lue","label":"自我攻略","category":"互动机制","aliases":["自我攻略"],"description":"char 自动跪/自降身段型,反向攻略。","family":"","negativeAliases":[],"examples":[],"parentId":"攻略难度","priority":75,"scopePreference":"any","status":"active"},{"id":"hu_if_xian","label":"IF 线","category":"互动机制","aliases":["if线","专属if","穿越if","人鱼if"],"_match_note":"case-insensitive","description":"假设性分支线,与主线并行。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"hu_ti_xing_cha","label":"体型差","category":"互动机制","aliases":["体型差","高壮男"],"description":"身材/力量差形成的物理张力。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"shi_gu_feng","label":"古风","category":"世界观题材","aliases":["古风"],"description":"古代/架空中式世界。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"shi_min_guo","label":"民国","category":"世界观题材","aliases":["民国","1940上海","谍战"],"description":"民国年代背景。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"shi_xian_dai","label":"现代","category":"世界观题材","aliases":["现代","现实向","都市"],"description":"当代都市背景。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"shi_xiao_yuan","label":"校园","category":"世界观题材","aliases":["校园","高中群像","校园墙","校服到婚纱"],"description":"校园场景。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"shi_gang_feng","label":"港风","category":"世界观题材","aliases":["港风","粤语","香港","中环","维多利亚港","港圈"],"description":"香港90年代/港片美学。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"shi_wu_xia","label":"武侠","category":"世界观题材","aliases":["武侠","江湖","高自由武侠群像"],"description":"武侠江湖。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"shi_xiu_xian","label":"修仙","category":"世界观题材","aliases":["修仙","合欢宗","男鬼"],"description":"修真/仙侠/灵异。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"shi_quan_mou","label":"权谋","category":"世界观题材","aliases":["权谋","宫斗线","正剧"],"description":"权力博弈为主线,并非豪门就是权谋。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"shi_abo","label":"ABO","category":"世界观题材","aliases":["EABO","ABO","异世界线"],"description":"性别社会学设定。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"shi_xing_ji","label":"星际","category":"世界观题材","aliases":["星际军校"],"description":"科幻社会学设定。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"shi_kuai_chuan","label":"快穿/无限流","category":"世界观题材","aliases":["快穿","无限流","穿越","重启人生"],"description":"多世界/任务流。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"shi_di_si_tian_zai","label":"末世/灾难","category":"世界观题材","aliases":["第四天灾","末日线","丧尸"],"description":"末日生存。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"shi_lian_zong","label":"恋综","category":"世界观题材","aliases":["恋综","恋爱时区","肉欲恋综"],"description":"恋爱综艺设定。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"shi_tong_ren","label":"同人","category":"世界观题材","aliases":["同人","同人杯","衍生卡"],"description":"基于既有 IP 的二创卡。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"shi_ren_wai","label":"人外","category":"世界观题材","aliases":["人外","狐妖","魅魔","人鱼","兽人","吸血鬼","蜜蜂","虎头蜂","熊蜂"],"description":"非人种族角色。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"shi_BG","label":"BG","category":"世界观题材","aliases":["BG","bgb"],"description":"异性恋向。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"shi_BL","label":"BL","category":"世界观题材","aliases":["BL","BL.BG.GB"],"description":"男男向。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"shi_GL","label":"GL","category":"世界观题材","aliases":["GL"],"description":"女女向。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"shi_xuan_yi","label":"悬疑/探案","category":"世界观题材","aliases":["推理","探案","剧情向"],"description":"案件驱动叙事。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"lei_jie","label":"洁","category":"雷点/偏好","aliases":["洁","男洁","身心洁","全洁"],"negativeAliases":["不洁"],"description":"明确双方过往/身体洁净的偏好,圈内重要分水岭。","family":"","examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"lei_bu_jie","label":"不洁","category":"雷点/偏好","aliases":["不洁"],"description":"和'洁'对立,是另一群人的偏好。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"lei_bei_de","label":"背德","category":"雷点/偏好","aliases":["背德","禁忌","禁忌乱伦","禁忌感年上"],"description":"突破伦理/规范的设定偏好。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"lei_chu_gui","label":"出轨/绿","category":"雷点/偏好","aliases":["NTR","睡奸","出轨"],"description":"对绿/被绿/出轨的偏好或雷区。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"lei_quan_yuan_e_ren","label":"全员恶人","category":"雷点/偏好","aliases":["全员恶人","混乱关系"],"description":"没有道德制高点的人物群。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"lei_xp_zi_you","label":"XP自由","category":"雷点/偏好","aliases":["xp自由杯","XP自由","高自由度"],"description":"卡作者主动给玩家选择空间的标签。","family":"","negativeAliases":[],"examples":[],"parentId":"","priority":50,"scopePreference":"any","status":"active"},{"id":"shi_da_di_tu","label":"大地图","category":"世界观题材","family":"地图/开放世界","aliases":["大地图","地图","大世界","高自由地图"],"negativeAliases":[],"description":"大地图相关的社区标签。","examples":[],"parentId":"","priority":70,"scopePreference":"world","status":"active"},{"id":"qing_ri_chang","label":"日常","category":"情感走向","family":"日常低冲突","aliases":["日常","日常向","日常流"],"negativeAliases":[],"description":"日常相关的社区标签。","examples":[],"parentId":"","priority":40,"scopePreference":"card","status":"active"},{"id":"qz_cao_han","label":"糙汉","category":"角色气质","family":"糙汉系","aliases":["糙汉","糙汉文学"],"negativeAliases":[],"description":"糙汉相关的社区标签。","examples":[],"parentId":"","priority":70,"scopePreference":"card","status":"active"},{"id":"hu_tiao_jiao","label":"调教","category":"互动机制","family":"BDSM/训诫系","aliases":["调教","训导"],"negativeAliases":[],"description":"调教相关的社区标签。","examples":[],"parentId":"","priority":75,"scopePreference":"card","status":"active"},{"id":"shen_gua_fu","label":"鳏夫","category":"身份阶层","family":"婚恋状态","aliases":["鳏夫","丧偶"],"negativeAliases":[],"description":"鳏夫相关的社区标签。","examples":[],"parentId":"","priority":60,"scopePreference":"card","status":"active"},{"id":"guan_guimi_xing_nanyou","label":"闺蜜型男友","category":"关系结构","family":"陪伴型关系","aliases":["闺蜜型男友","男闺蜜式恋人"],"negativeAliases":[],"description":"闺蜜型男友相关的社区标签。","examples":[],"parentId":"","priority":65,"scopePreference":"card","status":"active"},{"id":"qz_hou_lian_pi","label":"厚脸皮","category":"角色气质","family":"社交脸皮","aliases":["厚脸皮","不要脸","脸皮厚"],"negativeAliases":[],"description":"厚脸皮相关的社区标签。","examples":[],"parentId":"","priority":60,"scopePreference":"card","status":"active"},{"id":"shen_hun_xue","label":"混血","category":"身份阶层","family":"族裔/身份背景","aliases":["混血"],"negativeAliases":[],"description":"混血相关的社区标签。","examples":[],"parentId":"","priority":35,"scopePreference":"card","status":"active"},{"id":"guan_nian_ling_cha","label":"年龄差","category":"关系结构","family":"年龄差关系","aliases":["年龄差","年上年龄差","年下年龄差"],"negativeAliases":[],"description":"年龄差相关的社区标签。","examples":[],"parentId":"","priority":70,"scopePreference":"card","status":"active"},{"id":"guan_jiu_feng_chen_ni","label":"救风尘(逆)","category":"关系结构","family":"救赎/风尘关系","aliases":["救风尘(逆)","逆救风尘","救风尘"],"negativeAliases":[],"description":"救风尘(逆)相关的社区标签。","examples":[],"parentId":"","priority":65,"scopePreference":"scenario","status":"active"},{"id":"qz_le_zi_ren","label":"乐子人","category":"角色气质","family":"玩世不恭","aliases":["乐子人","看热闹不嫌事大"],"negativeAliases":[],"description":"乐子人相关的社区标签。","examples":[],"parentId":"","priority":55,"scopePreference":"card","status":"active"},{"id":"qz_lian_ai_nao","label":"恋爱脑","category":"角色气质","family":"恋爱脑","aliases":["恋爱脑"],"negativeAliases":[],"description":"恋爱脑相关的社区标签。","examples":[],"parentId":"","priority":60,"scopePreference":"card","status":"active"},{"id":"lei_mo_u","label":"嬤u","category":"雷点/偏好","family":"玩家位偏好","aliases":["嬤u","嬷u"],"negativeAliases":[],"description":"嬤u相关的社区标签。","examples":[],"parentId":"","priority":35,"scopePreference":"any","status":"active"},{"id":"qz_men_sao","label":"闷骚","category":"角色气质","family":"内敛骚感","aliases":["闷骚","暗骚"],"negativeAliases":[],"description":"闷骚相关的社区标签。","examples":[],"parentId":"","priority":65,"scopePreference":"card","status":"active"},{"id":"shen_nan_da","label":"男大","category":"身份阶层","family":"学生身份","aliases":["男大","男大学生"],"negativeAliases":[],"description":"男大相关的社区标签。","examples":[],"parentId":"","priority":55,"scopePreference":"card","status":"active"},{"id":"shen_nan_gao","label":"男高","category":"身份阶层","family":"学生身份","aliases":["男高","男高中生"],"negativeAliases":[],"description":"男高相关的社区标签。","examples":[],"parentId":"","priority":55,"scopePreference":"card","status":"active"},{"id":"qz_nv_zhuang_zhi_nan","label":"女装直男","category":"角色气质","family":"性别表达反差","aliases":["女装直男","女装"],"negativeAliases":[],"description":"女装直男相关的社区标签。","examples":[],"parentId":"","priority":55,"scopePreference":"card","status":"active"},{"id":"shi_qing_chun","label":"青春","category":"世界观题材","family":"青春校园","aliases":["青春","青春疼痛","青春期"],"negativeAliases":[],"description":"青春相关的社区标签。","examples":[],"parentId":"","priority":45,"scopePreference":"world","status":"active"},{"id":"qing_qing_xi_ju","label":"轻喜剧","category":"情感走向","family":"喜剧调性","aliases":["轻喜剧","轻松喜剧","喜剧向"],"negativeAliases":[],"description":"轻喜剧相关的社区标签。","examples":[],"parentId":"","priority":45,"scopePreference":"card","status":"active"},{"id":"shen_ri_nan","label":"日男","category":"身份阶层","family":"地域/文化身份","aliases":["日男","日本男"],"negativeAliases":[],"description":"日男相关的社区标签。","examples":[],"parentId":"","priority":35,"scopePreference":"card","status":"active"},{"id":"shen_sai_che_shou","label":"赛车手","category":"身份阶层","family":"职业身份","aliases":["赛车手","车手"],"negativeAliases":[],"description":"赛车手相关的社区标签。","examples":[],"parentId":"","priority":55,"scopePreference":"card","status":"active"},{"id":"qz_sao_bao","label":"骚包","category":"角色气质","family":"外放孔雀","aliases":["骚包","孔雀开屏"],"negativeAliases":[],"description":"骚包相关的社区标签。","examples":[],"parentId":"","priority":65,"scopePreference":"card","status":"active"},{"id":"shen_ou_xiang","label":"偶像","category":"身份阶层","family":"娱乐圈身份","aliases":["偶像","失格偶像","爱豆"],"negativeAliases":[],"description":"偶像相关的社区标签。","examples":[],"parentId":"","priority":55,"scopePreference":"card","status":"active"},{"id":"guan_tong_zhuo","label":"同桌","category":"关系结构","family":"校园关系","aliases":["同桌","天降同桌","新同桌"],"negativeAliases":[],"description":"同桌相关的社区标签。","examples":[],"parentId":"","priority":65,"scopePreference":"scenario","status":"active"},{"id":"qz_tian_ran_hei","label":"天然黑","category":"角色气质","family":"腹黑系","aliases":["天然黑","天然腹黑"],"negativeAliases":[],"description":"天然黑相关的社区标签。","examples":[],"parentId":"","priority":65,"scopePreference":"card","status":"active"},{"id":"qz_tu_cao_yi","label":"吐槽役","category":"角色气质","family":"毒舌/吐槽系","aliases":["吐槽役","吐槽担当"],"negativeAliases":[],"description":"吐槽役相关的社区标签。","examples":[],"parentId":"","priority":50,"scopePreference":"card","status":"active"},{"id":"guan_tui_hun_liu","label":"退婚流","category":"关系结构","family":"婚约破裂","aliases":["退婚流","退婚","被退婚"],"negativeAliases":[],"description":"退婚流相关的社区标签。","examples":[],"parentId":"","priority":65,"scopePreference":"scenario","status":"active"},{"id":"shen_wang_huang","label":"网黄","category":"身份阶层","family":"擦边/网红身份","aliases":["网黄","擦边网黄","擦边主播"],"negativeAliases":[],"description":"网黄相关的社区标签。","examples":[],"parentId":"","priority":60,"scopePreference":"card","status":"active"},{"id":"qz_wen_ti_xue_sheng","label":"问题学生","category":"角色气质","family":"问题少年系","aliases":["问题学生","问题少年","坏学生"],"negativeAliases":[],"description":"问题学生相关的社区标签。","examples":[],"parentId":"","priority":70,"scopePreference":"card","status":"active"},{"id":"shen_xin_li_yi_sheng","label":"心理医生","category":"身份阶层","family":"职业身份","aliases":["心理医生","心理咨询师","医生"],"negativeAliases":[],"description":"心理医生相关的社区标签。","examples":[],"parentId":"","priority":55,"scopePreference":"card","status":"active"},{"id":"guan_xiong_jing","label":"雄竞","category":"关系结构","family":"竞争关系","aliases":["雄竞","男性竞争","争风吃醋"],"negativeAliases":[],"description":"雄竞相关的社区标签。","examples":[],"parentId":"","priority":70,"scopePreference":"card","status":"active"},{"id":"guan_yang_zi","label":"养子","category":"关系结构","family":"拟亲缘关系","aliases":["养子","养女","收养"],"negativeAliases":[],"description":"养子相关的社区标签。","examples":[],"parentId":"","priority":60,"scopePreference":"scenario","status":"active"},{"id":"guan_huan_xi_yuan_jia","label":"欢喜冤家","category":"关系结构","family":"敌对/喜剧关系","aliases":["欢喜冤家","斗嘴","拌嘴","互怼","吵架拌嘴"],"negativeAliases":[],"description":"轻喜剧式对抗关系，吵闹但暧昧，不等同于死对头/仇人。","examples":[],"parentId":"enemy_relation","priority":68,"scopePreference":"scenario","status":"active"},{"id":"hu_dom","label":"Dom","category":"互动机制","family":"BDSM/训诫系","aliases":["Dom","S向","手黑S","支配者","主人"],"negativeAliases":[],"description":"D/s 关系中的支配位。比 BDSM 总类更具体。","examples":[],"parentId":"bdsm_type","priority":80,"scopePreference":"card","status":"active"},{"id":"hu_sub","label":"Sub","category":"互动机制","family":"BDSM/训诫系","aliases":["Sub","M向","被支配","臣服位"],"negativeAliases":[],"description":"D/s 关系中的臣服位。","examples":[],"parentId":"bdsm_type","priority":75,"scopePreference":"card","status":"active"},{"id":"hu_wen_rou_dom","label":"温柔Dom","category":"互动机制","family":"BDSM/训诫系","aliases":["温柔Dom","Soft Dom","Gentle Dom","温柔支配"],"negativeAliases":[],"description":"以温柔、引导、稳定感为主的 Dom。","examples":[],"parentId":"bdsm_type","priority":85,"scopePreference":"card","status":"active"},{"id":"hu_xun_jie","label":"训诫","category":"互动机制","family":"BDSM/训诫系","aliases":["训诫","训狗大师","规训","惩戒","教训","我教过你的"],"negativeAliases":[],"description":"以规则、纠正、惩戒为核心的互动机制。","examples":[],"parentId":"bdsm_type","priority":82,"scopePreference":"card","status":"active"},{"id":"hu_brat","label":"brat","category":"互动机制","family":"BDSM/训诫系","aliases":["brat","适合brat","挑衅型sub","欠管"],"negativeAliases":[],"description":"挑衅型被支配者/需要被管教的互动位置。","examples":[],"parentId":"bdsm_type","priority":70,"scopePreference":"card","status":"active"}]`), vs = {
  _meta: Th,
  tags: Mh
}, Om = [
  "角色气质",
  "身份阶层",
  "关系结构",
  "情感走向",
  "互动机制",
  "世界观题材",
  "结局倾向",
  "雷点偏好",
  "雷点/偏好",
  "其他"
];
function Eh(n = vs) {
  if (typeof n == "object" && n !== null && "_meta" in n) {
    const u = n._meta?.categories;
    if (Array.isArray(u) && u.every((r) => typeof r == "string"))
      return Array.from(/* @__PURE__ */ new Set([...Om, ...u]));
  }
  return Om;
}
Eh();
function Ch(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
function Zu(n) {
  return Array.isArray(n) ? n.filter((u) => typeof u == "string") : [];
}
function zh(n) {
  return n === "any" || n === "card" || n === "scenario" || n === "cast" || n === "world" || n === "unknown" ? n : void 0;
}
function jh(n) {
  return typeof n != "string" || !n ? !1 : /(?:�|闁|閻|鐎|缂|濠|婵|鈧|粹€|偓|瀣|顐|妯|鐓|鐤|鎼|閺夋|閸|濞|闂)/.test(n);
}
function Nh(n) {
  if (!(!Ch(n) || typeof n.id != "string" || typeof n.label != "string" || typeof n.category != "string") && !jh([n.label, n.category, n.family, n.description].filter((u) => typeof u == "string").join(" ")))
    return {
      id: n.id,
      label: n.label,
      category: n.category,
      family: typeof n.family == "string" ? n.family : void 0,
      aliases: Zu(n.aliases),
      negativeAliases: Zu(n.negativeAliases),
      description: typeof n.description == "string" ? n.description : void 0,
      examples: Zu(n.examples),
      parentId: typeof n.parentId == "string" ? n.parentId : void 0,
      priority: typeof n.priority == "number" ? n.priority : void 0,
      scopePreference: zh(n.scopePreference),
      status: typeof n.status == "string" ? n.status : void 0
    };
}
function Oh(n = vs) {
  const u = Array.isArray(n) ? n : typeof n == "object" && n !== null && "tags" in n ? n.tags : [];
  return Array.isArray(u) ? u.map(Nh).filter((r) => !!r) : [];
}
function Dh(n = vs) {
  return typeof n == "object" && n !== null && "_meta" in n ? String(n._meta?.version ?? "dictionary-local") : "dictionary-local";
}
const Rh = Dh(), Hh = "card-analysis-v19-regex-route-widgets", rr = "charalog.cardAnalysisCache.v2", Uh = ["charalog.cardAnalysisCache.v1"], Dm = 80;
function Bh(n) {
  let u = 2166136261;
  for (let r = 0; r < n.length; r += 1)
    u ^= n.charCodeAt(r), u += (u << 1) + (u << 4) + (u << 7) + (u << 8) + (u << 24);
  return `h${(u >>> 0).toString(16)}`;
}
function qn(n) {
  if (typeof n == "string")
    return n;
  if (n == null)
    return "";
  try {
    return JSON.stringify(n);
  } catch {
    return "";
  }
}
function cp() {
  if (typeof localStorage > "u")
    return {};
  Uh.forEach((n) => localStorage.removeItem(n));
  try {
    return JSON.parse(localStorage.getItem(rr) ?? "{}");
  } catch {
    return {};
  }
}
function Rm(n) {
  typeof localStorage > "u" || localStorage.setItem(rr, JSON.stringify(wh(n)));
}
function wh(n) {
  const u = Object.entries(n);
  return u.length <= Dm ? n : Object.fromEntries(u.slice(-Dm));
}
function Hm(n) {
  const { debug: u, localCandidateTags: r, ...c } = n;
  return {
    ...c,
    localCandidateTags: r.slice(0, 40).map((m) => ({
      ...m,
      matchedSnippets: m.matchedSnippets.slice(0, 1)
    }))
  };
}
function or(n) {
  return Bh(
    JSON.stringify({
      description: n.description,
      personality: qn(n.rawCard.personality ?? n.rawCard.data?.personality),
      scenario: qn(n.rawCard.scenario ?? n.rawCard.data?.scenario),
      creator_notes: n.creatorNotes,
      system_prompt: qn(n.rawCard.system_prompt ?? n.rawCard.data?.system_prompt),
      post_history_instructions: qn(n.rawCard.post_history_instructions ?? n.rawCard.data?.post_history_instructions),
      character_book: qn(n.rawCard.character_book ?? n.rawCard.data?.character_book),
      tags: n.tags.map((u) => u.label),
      first_mes: n.firstMessage,
      alternate_greetings: n.alternateGreetings,
      dictionaryVersion: Rh,
      analysisPromptVersion: Hh
    })
  );
}
function ku(n, u) {
  return `${n}:${u}`;
}
function up(n) {
  const u = or(n);
  return cp()[ku(n.id, u)];
}
function qh(n) {
  const u = cp();
  u[ku(n.cardId, n.sourceHash)] = Hm(n);
  try {
    Rm(u);
  } catch (r) {
    if (r instanceof DOMException && r.name === "QuotaExceededError") {
      try {
        localStorage.removeItem(rr), Rm({ [ku(n.cardId, n.sourceHash)]: Hm(n) });
      } catch {
      }
      return;
    }
  }
}
const Lh = /<(script|style)[\s\S]*?<\/\1>/gi, Gh = /<[^>]+>/g, Yh = /\{[^{}]*(?:color|font|background|margin|padding|display|position|width|height)[^{}]*\}/gi, Xh = /\b(?:function|const|let|var|=>|document\.|window\.|console\.log)\b[\s\S]*?(?:;|\n|$)/gi, Qh = /\/(?:[^/\\]|\\.)+\/[gimsuy]*\s*(?:=>|,|\n|$)/g, Zh = /```[a-zA-Z0-9_-]*\s*\r?\n?/g;
function rp(n) {
  return n.replace(Zh, `
`).replace(/```/g, `
`);
}
function he(n) {
  return typeof n != "string" ? "" : rp(n).replace(Lh, " ").replace(Yh, " ").replace(Xh, " ").replace(Qh, " ").replace(Gh, " ").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
}
function Ue(n) {
  return he(n).toLowerCase().replace(/[^\p{Letter}\p{Number}\s]/gu, " ").replace(/\s+/g, " ").trim();
}
function Vh(n) {
  return {
    ...n,
    ...n.data ?? {},
    id: n.id,
    data: n.data
  };
}
function Um(n) {
  return Array.isArray(n) ? n.filter((u) => typeof u == "string").map(he).filter(Boolean) : [];
}
function Kh(n) {
  return Array.from(new Set(n.map((u) => he(u)).filter(Boolean))).map((u, r) => ({
    id: `tag-${r + 1}`,
    label: u,
    source: "card",
    confidence: 1
  }));
}
function Jh(n, u, r) {
  const c = [];
  return u && c.push({
    id: `${n}-opening-main`,
    characterId: n,
    title: "默认开场",
    text: u,
    source: "first_mes",
    index: 0
  }), r.forEach((m, p) => {
    c.push({
      id: `${n}-opening-alt-${p + 1}`,
      characterId: n,
      title: `线路 ${p + 1}`,
      text: m,
      source: "alternate_greeting",
      index: p + 1
    });
  }), c;
}
function Ih(n, u, r) {
  const c = [
    n.name,
    n.description,
    n.creator_notes,
    ...r.map((p) => p.label)
  ].join(" ").toLowerCase(), m = u.map((p) => p.text).join(" ").toLowerCase();
  return /(world\s*card|worldbook|lorebook|世界观卡|世界卡|设定集)/i.test(c) ? "world" : /(group|多人|群像|宿舍|小队|全员|多角色|ensemble)/i.test(`${c} ${m}`) ? "group" : u.length >= 3 || /(多线路|if线|路线|线路|route|branch)/i.test(m) ? "multi_scenario" : "single";
}
function op(n) {
  const u = Vh(n), r = u.id, c = he(u.name) || "未命名角色", m = he(u.description), p = he(u.creator_notes), g = he(u.first_mes), M = Um(u.alternate_greetings), y = Kh(Um(u.tags)), h = Jh(r, g, M);
  return {
    id: r,
    name: c,
    description: m,
    tags: y,
    creatorNotes: p,
    firstMessage: g,
    alternateGreetings: M,
    scenarioOpenings: h,
    cardType: Ih(u, h, y),
    rawCard: u
  };
}
const fp = "sillytavern://generate";
function Gl() {
  return globalThis;
}
function it(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
function He(n) {
  return typeof n == "string" ? n : "";
}
function kh(n) {
  return Array.isArray(n) && it(n[0]) ? n[0] : void 0;
}
function Ll(n) {
  if (typeof n == "string")
    return n;
  if (Array.isArray(n))
    return n.map(Ll).filter(Boolean).join(`
`);
  if (!it(n))
    return n == null ? "" : String(n);
  const u = He(n.content) || He(n.text) || He(n.message) || He(n.result) || He(n.response) || He(n.output);
  if (u)
    return u;
  if (it(n.message)) {
    const c = Ll(n.message.content);
    if (c)
      return c;
  }
  const r = kh(n.choices);
  if (r) {
    const c = (it(r.message) ? Ll(r.message.content) : "") || Ll(r.text) || Ll(r.content);
    if (c)
      return c;
  }
  return "";
}
function Da(n) {
  return Array.isArray(n) ? n : [];
}
function $h(n) {
  return n.trim().replace(/\.[^.]+$/, "").replace(/[^\p{Letter}\p{Number}_-]+/gu, "-").replace(/^-+|-+$/g, "").slice(0, 64);
}
function dp() {
  return typeof Gl().__CHARALOG_GENERATE_RAW__ == "function";
}
async function Wh(n) {
  const u = Gl().__CHARALOG_GENERATE_RAW__;
  if (typeof u != "function")
    throw new Error("当前页面没有 CharaLog SillyTavern 生成桥接。");
  const r = await u(n), c = Ll(r).trim();
  if (!c)
    throw new Error("酒馆生成返回空文本。请确认当前酒馆 API 已连接、模型可用，并且后台生成没有被其他请求占用。");
  return c;
}
function fr() {
  const n = Gl().__CHARALOG_GET_SILLYTAVERN_CONTEXT__;
  if (typeof n != "function")
    return;
  const u = n();
  return it(u) ? u : void 0;
}
function Fh(n, u) {
  const r = [
    n.characterId,
    n.this_chid,
    n.chid,
    it(n.character) ? n.character.id : void 0
  ];
  for (const c of r) {
    const m = typeof c == "number" ? c : Number(c);
    if (Number.isInteger(m) && m >= 0 && m < u.length)
      return m;
  }
  return 0;
}
function mp(n, u, r = 0) {
  if (!it(n))
    return;
  const c = it(n.data) ? n.data : void 0, m = He(n.name) || He(c?.name), p = He(n.avatar) || He(c?.avatar), g = He(n.id) || $h(p || m) || `${u}-${r + 1}`;
  return {
    ...n,
    id: `st-live-${g}`,
    data: c
  };
}
function Bm(n) {
  return n.replace(/\s+/g, "").replace(/[^\p{Letter}\p{Number}{{}}]+/gu, "").slice(0, 1200);
}
function Ph(n, u) {
  const r = Bm(n), c = Bm(u);
  if (!r || !c)
    return 0;
  if (r.includes(c.slice(0, Math.min(120, c.length))) || c.includes(r.slice(0, Math.min(120, r.length))))
    return 1e3 + Math.min(r.length, c.length);
  let m = 0;
  for (let p = 80; p >= 12; p -= 8)
    for (let g = 0; g + p <= Math.min(r.length, 360); g += 12)
      c.includes(r.slice(g, g + p)) && (m += p);
  return m;
}
function wm(n) {
  return it(n) ? He(n.mes) || He(n.message) || He(n.content) || He(n.text) : typeof n == "string" ? n : "";
}
function e0(n, u) {
  const c = Da(u).find((M) => it(M) && M.is_user !== !0 && wm(M).trim()), m = wm(c);
  if (!m)
    return;
  const g = n.scenarioOpenings.filter((M) => M.source !== "first_mes").map((M) => ({ opening: M, score: Ph(m, M.text) })).sort((M, y) => y.score - M.score);
  return g[0] && g[0].score >= 40 ? g[0].opening : void 0;
}
function t0(n, u) {
  const r = He(u?.name1);
  return n.filter((c) => it(c) && (c.is_user === !0 || r && He(c.name) === r)).length;
}
function qm(n) {
  if (typeof n != "string" || !n.trim())
    return;
  const u = new Date(n);
  if (!Number.isNaN(u.getTime()))
    return u.toISOString();
  const r = n.match(/(\d{4})-(\d{1,2})-(\d{1,2})\s*@\s*(\d{1,2})h\s*(\d{1,2})m/i);
  if (!r)
    return;
  const [, c, m, p, g, M] = r, y = new Date(Number(c), Number(m) - 1, Number(p), Number(g), Number(M));
  return Number.isNaN(y.getTime()) ? void 0 : y.toISOString();
}
function Vu(...n) {
  return Array.from(
    new Set(
      n.flatMap((u) => u ?? []).filter((u) => typeof u == "string" && u.length >= 10).map((u) => u.slice(0, 10))
    )
  );
}
function a0(n) {
  const u = Array.isArray(n) ? n : [];
  return Array.from({ length: 24 }, (r, c) => {
    const m = Number(u[c] ?? 0);
    return Number.isFinite(m) && m > 0 ? m : 0;
  });
}
function Lm(...n) {
  return Array.from({ length: 24 }, (u, r) => n.reduce((c, m) => c + (m?.[r] ?? 0), 0));
}
function Gm(n) {
  const u = n.map((r) => r ? Date.parse(r) : Number.NaN).filter((r) => Number.isFinite(r));
  return u.length ? new Date(Math.min(...u)).toISOString() : void 0;
}
function Ym(n) {
  const u = n.map((r) => r ? Date.parse(r) : Number.NaN).filter((r) => Number.isFinite(r));
  return u.length ? new Date(Math.max(...u)).toISOString() : void 0;
}
function dr(n, u, r) {
  const c = u.map((_, A) => {
    const x = it(_) ? _ : {}, B = Da(x.messages), L = typeof x.totalMessages == "number" ? x.totalMessages : B.length, w = typeof x.userMessages == "number" ? x.userMessages : t0(B, r), Q = qm(x.firstActiveAt), ne = qm(x.lastActiveAt), F = Vu(Da(x.activeDateKeys)), ie = a0(x.activeHourBuckets);
    return {
      id: He(x.file_name) || `chat-${A + 1}`,
      messages: B,
      totalMessages: L,
      userMessages: w,
      firstActiveAt: Q,
      lastActiveAt: ne,
      activeDateKeys: F,
      activeHourBuckets: ie
    };
  }).filter((_) => _.messages.length > 0 || _.totalMessages > 0);
  if (!c.length)
    return;
  const m = c.reduce((_, A) => _ + A.totalMessages, 0), p = c.reduce((_, A) => _ + A.userMessages, 0), g = Gm(c.map((_) => _.firstActiveAt)), M = Ym(c.map((_) => _.lastActiveAt)), y = Vu(...c.map((_) => _.activeDateKeys)), h = Lm(...c.map((_) => _.activeHourBuckets)), D = /* @__PURE__ */ new Map();
  return c.forEach((_) => {
    const A = e0(n, _.messages);
    if (!A)
      return;
    const x = D.get(A.id) ?? {
      totalMessages: 0,
      userMessages: 0,
      chatCount: 0,
      openingTitle: A.title,
      activeDateKeys: [],
      activeHourBuckets: Array.from({ length: 24 }, () => 0)
    };
    x.totalMessages += _.totalMessages, x.userMessages += _.userMessages, x.chatCount += 1, x.firstActiveAt = Gm([x.firstActiveAt, _.firstActiveAt]), x.lastActiveAt = Ym([x.lastActiveAt, _.lastActiveAt]), x.activeDateKeys = Vu(x.activeDateKeys, _.activeDateKeys), x.activeHourBuckets = Lm(x.activeHourBuckets, _.activeHourBuckets), D.set(A.id, x);
  }), {
    characterId: n.id,
    chatCount: c.length,
    totalMessages: m,
    userMessages: p,
    firstActiveAt: g,
    lastActiveAt: M,
    activeDays: Math.max(y.length, c.length > 0 ? 1 : 0),
    activeHourBuckets: h,
    scenarioStats: Array.from(D.entries()).map(([_, A]) => ({
      scenarioId: _,
      openingTitle: A.openingTitle,
      chatCount: A.chatCount,
      totalMessages: A.totalMessages,
      userMessages: A.userMessages,
      firstActiveAt: A.firstActiveAt,
      lastActiveAt: A.lastActiveAt,
      activeDays: Math.max(A.activeDateKeys.length, A.chatCount > 0 ? 1 : 0),
      activeHourBuckets: A.activeHourBuckets
    }))
  };
}
async function l0(n) {
  const u = Gl().__CHARALOG_LOAD_CARD_USAGE__;
  if (typeof u != "function")
    return;
  const r = n.name, c = He(n.rawCard.avatar) || He(n.rawCard.data?.avatar);
  if (!r || !c)
    return;
  const m = await u({ name: r, avatar: c });
  if (!it(m))
    return;
  const p = fr();
  return dr(n, Da(m.chats), p);
}
function n0(n, u) {
  const r = Da(u.chat);
  if (r.length)
    return dr(n, [{ file_name: "current-chat", messages: r }], u);
}
function os() {
  const n = fr();
  if (!n)
    return;
  const u = Da(n.characters), r = u[Fh(n, u)] ?? n.character, c = mp(r, "current-character");
  if (!c)
    return;
  const m = op(c), p = n0(m, n);
  return {
    cards: [m],
    usageByCardId: new Map(p ? [[m.id, p]] : [])
  };
}
async function i0(n) {
  const u = Gl().__CHARALOG_LOAD_SILLYTAVERN_LIBRARY__;
  if (typeof u != "function")
    return os();
  const r = Gl(), c = r.__CHARALOG_LIBRARY_PROGRESS__;
  n && (r.__CHARALOG_LIBRARY_PROGRESS__ = n);
  let m;
  try {
    m = await u();
  } finally {
    r.__CHARALOG_LIBRARY_PROGRESS__ = c;
  }
  if (!it(m))
    return os();
  const p = fr(), g = Da(m.characters), M = it(m.chatsByAvatar) ? m.chatsByAvatar : {}, y = g.map((D, _) => mp(D, "character", _)).filter((D) => !!D).map((D) => op(D)), h = /* @__PURE__ */ new Map();
  return y.forEach((D) => {
    const _ = He(D.rawCard.avatar) || He(D.rawCard.data?.avatar), A = Da(M[_]), x = dr(D, A, p);
    x && h.set(D.id, x);
  }), y.length ? { cards: y, usageByCardId: h } : os();
}
function s0(n, u) {
  return `${n.replace(/\/+$/, "")}/${u.replace(/^\/+/, "")}`;
}
function c0() {
  return typeof window > "u" ? !1 : ["127.0.0.1", "localhost", "::1"].includes(window.location.hostname);
}
function u0(n) {
  return n.baseUrl.trim() === fp;
}
function r0(n) {
  return n.trim() ? new Response(
    JSON.stringify({
      choices: [{ message: { content: n } }],
      usage: {}
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" }
    }
  ) : new Response(JSON.stringify({ error: "SillyTavern 生成返回空文本。" }), {
    status: 502,
    headers: { "Content-Type": "application/json" }
  });
}
async function o0(n, u) {
  if (n === "/models")
    return new Response(JSON.stringify({ data: [{ id: "sillytavern-current" }] }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  if (n !== "/chat/completions" || u.method !== "POST" || !u.body)
    return new Response(JSON.stringify({ error: "Unsupported SillyTavern bridge request." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  const r = JSON.parse(u.body), c = r.messages?.find((g) => g.role === "system")?.content ?? "", m = r.messages?.filter((g) => g.role !== "system").map((g) => g.content ?? "").join(`

`) ?? "", p = await Wh({ systemPrompt: c, prompt: m });
  return r0(p);
}
async function mr(n, u, r) {
  return u0(n) ? o0(u, r) : c0() ? fetch("/api/ai-proxy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      baseUrl: n.baseUrl,
      apiKey: n.apiKey,
      path: u,
      method: r.method,
      body: r.body
    }),
    signal: r.signal
  }) : fetch(s0(n.baseUrl, u), {
    method: r.method,
    headers: {
      Authorization: `Bearer ${n.apiKey}`,
      "Content-Type": "application/json"
    },
    body: r.body,
    signal: r.signal
  });
}
const f0 = 640, d0 = 18, m0 = 4, p0 = 3, y0 = 360, g0 = 4, h0 = /\{\{user\}\}|<user>|user\b|love_attitude|emotional_state|relationship_status|relationship_with|关系状态|关系设定|关系描述|情感态度|恋爱期|矛盾期|决裂期|婚姻|名分|妻子|丈夫|太太|夫人|伴侣|爱人|女友|男友|联姻|相亲|婚约|订婚|结婚|不会娶|不会嫁|未来|承诺|底线|边界|阶级|家族|现实|利益|筹码|宠溺|纵容|偏爱|占有|掌控|凉薄|权谋/i, v0 = {
  identity: 4,
  personality: 6,
  relationship: 7,
  world: 2,
  interaction_rule: 4,
  boundary: 3,
  scenario_manifest: 4,
  style: 2,
  unknown: 2
}, b0 = [
  {
    category: "identity",
    weight: 7,
    patterns: [/identity|职业|身份|核心身份|年龄|性别|身高|生日|age|gender|height|birthday|family|家族|红三代|高干|港圈|京圈|掌权|书记|总裁|继承人/i]
  },
  {
    category: "personality",
    weight: 7,
    patterns: [/personality|traits|emotional_state|性格|气质|核心特征|优点|缺点|习惯|喜好|厌恶|情绪|态度|archetype|default|romantic|likes|dislikes|嘴硬|疯狗|克制|疏离|温柔|掌控/i]
  },
  {
    category: "relationship",
    weight: 8,
    patterns: [/\{\{user\}\}|relationship|love_attitude|关系|关系设定|关系描述|表妹|青梅|初恋|恋爱|前任|旧情|青梅竹马|相亲|婚约|联姻|伴侣|白月光|替身|重逢|破镜|名分|妻子|宠溺|纵容/i]
  },
  {
    category: "world",
    weight: 6,
    patterns: [/world|世界观|设定|背景|地点|setting|lore|城市|政商|豪门|名流|娱乐圈|工作室|港风|官场|家族势力/i]
  },
  {
    category: "interaction_rule",
    weight: 5,
    patterns: [/rule|规则|writing_rule|禁止|不允许|不得|必须|回复|开场白|线路|route|if线|互动|OOC/i]
  },
  {
    category: "boundary",
    weight: 5,
    patterns: [/雷点|边界|boundary|禁忌|不接受|dislikes|禁止|绝对界限|限制|避雷|consent|自愿/i]
  },
  {
    category: "scenario_manifest",
    weight: 6,
    patterns: [/开场|开场白|线路|route|if线|alt|greeting|第[一二三四五六七八九十0-9]+条/i]
  },
  {
    category: "style",
    weight: 2,
    patterns: [/文风|叙事|氛围|慢热|喜剧|酸涩|沉重|节奏|镜头|描写/i]
  }
], Qn = [
  /<!doctype html/i,
  /<html[\s>]/i,
  /<style[\s>]/i,
  /<\/style>/i,
  /<script[\s>]/i,
  /function\s+\w+\s*\(/i,
  /document\./i,
  /window\./i,
  /StatusPanel/i,
  /状态栏|状态面板|播放器|档案系统|DOCTYPE|CSS|HTML/i
], _0 = [/这里是开场白|希望大家多多repo|^\s*【?开场】?\s*$/i, /^【[^】]{0,12}的开场】$/i], pp = /角色|介绍|身份|性格|背景|设定|他是|她是|你将遇到|人物|主角|男主|女主|{{char}}|char/i, Xm = /玩法|攻略|难度|选择|选项|点击|跳转|打开|开启|关闭|世界书|world.?book/i, S0 = /NPC|配角|群像|其他角色|同伴|朋友|家人|下属|员工列表|角色列表/i, A0 = /^\s*(?:route\s*)?([0-9]{1,2})\s*[.)\-:\u3001\uff1a\uff0e\uff09]\s*(.{2,240})$/i, x0 = /^\s*(?:线路|路线|开场白|开场|route)\s*([0-9]{1,2}|[一二三四五六七八九十]{1,3})\s*[.)\-:\u3001\uff1a\uff0e\uff09]\s*(.{2,240})$/i, T0 = /\{\{user\}\}|love_attitude|emotional_state|relationship|relation|user\b|对你|对她|对他|婚姻|伴侣|宠溺|纵容|名分|妻子/i, M0 = /personality|traits|core_trait|archetype|temperament|likes|dislikes|性格|气质|核心特征|优点|缺点|情绪|态度/i, E0 = /residence|property|apartment|villa|mansion|house|address|decoration|bedroom|living room|wine cellar|pool|floor-to-ceiling|居所|住所|房产|别墅|公寓|老宅|酒窖|泳池|落地窗|装修|地段/i, yp = [
  /状态栏|状态面板|手机|通讯|小手机|推送|弹幕|论坛|微博|私信/i,
  /规范|规则|格式|模板|指令|输出|回复|必须|禁止|不得|不要|校验|代码|标签表/i,
  /好感度|数值|变量|JSON|XML|HTML|CSS|UI|OOC|system|prompt|canon/i,
  /status\s*bar|phone|mobile|comms|format|template|rule|instruction|response|output/i,
  /动态推进|时间线概念|赛事进程|故事发展的主轴|休赛周|季后赛|转会期/i,
  /AI在扮演|扮演中|角色一致性校验|Character Consistency Check|显示格式规范|严格遵守/i,
  /主动推进|防止\s*AI|防止ai|弄混|任何交互时|是否完全符合该角色/i
];
function Qm(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
function Qe(n) {
  if (typeof n == "string")
    return n;
  if (n == null)
    return "";
  try {
    return JSON.stringify(n);
  } catch {
    return "";
  }
}
function Zm(n, u = 80) {
  const r = [], c = (m) => {
    if (!(r.length >= u || m == null)) {
      if (typeof m == "string") {
        r.push(m);
        return;
      }
      if (Array.isArray(m)) {
        for (const p of m)
          c(p);
        return;
      }
      if (typeof m == "object")
        for (const p of Object.values(m))
          c(p);
    }
  };
  return c(n), r;
}
function C0(n) {
  return n.replace(/\\n/g, `
`).replace(/\\r/g, `
`).replace(/\\t/g, " ").replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\\\/g, "\\");
}
function z0(n) {
  return rp(Qe(n)).replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ").replace(/<\/(?:character|info|setting|rules|writing_rule|profile|relationship|personality)>/gi, `

`).replace(/<br\s*\/?>/gi, `
`).replace(/<[^>]+>/g, " ").replace(/\{[^{}]*(?:color|font|background|margin|padding|display|position|width|height)[^{}]*\}/gi, " ").replace(/\b(?:function|const|let|var|=>|document\.|window\.|console\.log)\b[\s\S]*?(?:;|\n|$)/gi, " ").replace(/\/(?:[^/\\]|\\.)+\/[gimsuy]*\s*(?:=>|,|\n|$)/g, " ").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/\r\n?/g, `
`).replace(/[ \t]+/g, " ").replace(/[ \t]*\n[ \t]*/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function ps(n, u = f0) {
  const r = he(n);
  if (r.length <= u)
    return r;
  const c = r.match(h0);
  if (c?.index && c.index > Math.floor(u * 0.45)) {
    const m = Math.floor(u * 0.28), p = u - m - 8, g = Math.max(0, c.index - Math.floor(p * 0.35)), M = r.slice(g, g + p).trim();
    return `${r.slice(0, m).trim()} ... ${M}...`;
  }
  return `${r.slice(0, u).trim()}...`;
}
function j0(n) {
  return Array.from(he(n).matchAll(/[\p{Letter}\p{Number}]/gu)).length;
}
function pr(n, u = 18) {
  const r = he(n);
  if (!r)
    return !1;
  const c = j0(r);
  return c >= u && c / Math.max(r.length, 1) >= 0.28;
}
function gp(n) {
  const u = Ue(n);
  return /opening|greeting|route|if\s*line|be\s*line|he\s*line/i.test(n) || /开场|开场白|线路|支线|if线|正常线|隐藏线|三选一|多选一|骨科|相亲|重逢|破镜|青梅竹马/.test(n) || /opening|greeting|route|if line|be line|he line/.test(u);
}
function bs(n, u, r) {
  const c = z0(r);
  if (!c)
    return [];
  const m = c.split(
    /\n{2,}|(?=(?:^|\s)(?:identity|background|personality|traits|emotional_state|love_attitude|relationship|world|setting|likes|dislikes|goals|rules?|writing_rule|NSFW|Kinks|name|gender|height|age|birthday|family|职业|身份|核心身份|背景|经历|外貌|身高|年龄|性别|性格|气质|核心特征|优点|缺点|喜好|厌恶|关系|关系设定|关系描述|与\{\{user\}\}|对\{\{user\}\}|世界观|设定|地点|规则|开场|线路|文风)\s*[：:])|(?=^\s*[-*]\s+)/gim
  ).map((g) => g.trim()).filter(Boolean);
  return (m.length > 1 ? m : c.split(new RegExp("(?<=。|；|;|\\.)\\s+")).filter(Boolean)).map((g, M) => ({
    id: `${n}-${M}`,
    sourceType: n,
    sourceLabel: u,
    text: ps(g),
    index: M
  })).filter((g) => pr(g.text));
}
function Vm(n) {
  return Array.isArray(n) ? n.filter((u) => typeof u == "string" && u.trim().length > 0) : typeof n == "string" && n.trim() ? [n] : [];
}
function hp(n) {
  return [n.rawCard.character_book, n.rawCard.data?.character_book].filter(Qm).flatMap((c) => Array.isArray(c.entries) ? c.entries : []).flatMap((c, m) => {
    if (!Qm(c))
      return [];
    const p = typeof c.comment == "string" && c.comment ? c.comment : `character_book ${m + 1}`, g = Qe(c.content), M = c.enabled !== !1 && c.disable !== !0 && c.disabled !== !0;
    return [
      {
        index: m,
        label: p,
        content: g,
        keys: Vm(c.keys),
        secondaryKeys: Vm(c.secondary_keys),
        enabled: M,
        constant: c.constant === !0,
        selective: c.selective === !0
      }
    ];
  });
}
function vp(n) {
  const u = `${n.label}
${n.content}`;
  return yp.some((r) => r.test(u));
}
function Km(n, u) {
  const r = Ue(n), c = Ue(u);
  if (!r || !c)
    return !1;
  if (/^[a-z0-9]+$/i.test(r) && r.length <= 4) {
    const m = r.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|[^a-z0-9])${m}($|[^a-z0-9])`, "i").test(c);
  }
  return c.includes(r);
}
function bp(n, u) {
  return n.keys.length === 0 || !n.keys.some((c) => Km(c, u)) ? !1 : n.secondaryKeys.length === 0 || n.secondaryKeys.some((c) => Km(c, u));
}
function Jm(n) {
  const u = [
    n.name,
    n.description,
    n.creatorNotes,
    n.tags.map((r) => r.label).join(" "),
    Qe(n.rawCard.personality ?? n.rawCard.data?.personality),
    Qe(n.rawCard.scenario ?? n.rawCard.data?.scenario)
  ].join(" ");
  return hp(n).flatMap((r) => !r.enabled || vp(r) ? [] : n.cardType !== "world" && gp(r.label) ? [] : n.cardType !== "world" && !r.constant && r.keys.length > 0 && !bp(r, u) ? [] : bs("characterBook", r.label, r.content).map((c, m) => ({
    ...c,
    id: `characterBook-${r.index}-${m}`
  })));
}
function Im(n) {
  if (n.cardType === "world")
    return [];
  const u = n.scenarioOpenings.map((r) => `${r.title}
${r.text}`).join(`
`);
  return hp(n).flatMap((r) => !r.enabled || vp(r) ? [] : !gp(r.label) && !bp(r, u) ? [] : bs("characterBook", r.label, r.content).map((c, m) => ({
    ...c,
    id: `scenarioCharacterBook-${r.index}-${m}`
  })));
}
function N0(n) {
  if (/^\s*traits\s*[:：]/i.test(n) && /sexual_|top时|bottom时|伴侣变化|事后护理|求饶|喘/i.test(n))
    return {
      categoryHint: "interaction_rule",
      score: 12,
      reasons: ["heading:sexual_traits"]
    };
  if (/^\s*(?:personality|archetype|speech_style|emotional_behaviors|public_traits|private_traits|romantic_traits)\s*[:：]/i.test(n))
    return {
      categoryHint: "personality",
      score: 22,
      reasons: ["heading:personality"]
    };
  if (/^\s*(?:identity|background_story|appearance|age|gender|height|birthday)\s*[:：]/i.test(n))
    return {
      categoryHint: "identity",
      score: 18,
      reasons: ["heading:identity"]
    };
  if (/^\s*(?:NSFW_information|Sex_related|Kinks|Limits)\s*[:：]/i.test(n))
    return {
      categoryHint: "interaction_rule",
      score: 12,
      reasons: ["heading:nsfw"]
    };
  const u = Ue(n), r = b0.map((m) => {
    const p = m.patterns.reduce((g, M) => g + (M.test(u) || M.test(n) ? 1 : 0), 0);
    return {
      category: m.category,
      score: p * m.weight
    };
  }).filter((m) => m.score > 0), c = r.sort((m, p) => p.score - m.score)[0];
  return {
    categoryHint: c?.category ?? "unknown",
    score: c?.score ?? 0,
    reasons: r.slice(0, 3).map((m) => `${m.category}+${m.score}`)
  };
}
function ys(n, u) {
  const r = Ue(n);
  return u.filter((c) => r.includes(Ue(c.label)) || c.matchedSnippets.some((m) => r.includes(Ue(m).slice(0, 24)))).sort((c, m) => m.score - c.score).map((c) => c.label).filter((c, m, p) => p.indexOf(c) === m).slice(0, 8);
}
function $u(n, u) {
  if (Qn.some((y) => y.test(n.text) || y.test(n.sourceLabel)) || yp.some((y) => y.test(n.text) || y.test(n.sourceLabel)))
    return;
  const c = N0(n.text), m = ys(n.text, u);
  if (c.categoryHint === "interaction_rule" && m.length === 0)
    return;
  let g = (n.sourceType === "description" || n.sourceType === "characterBook" ? 5 : n.sourceType === "creatorNotes" ? 3 : n.sourceType === "systemPrompt" || n.sourceType === "postHistoryInstructions" ? 1 : 2) + c.score + m.length * 4 + Math.min(4, n.text.length / 140);
  c.categoryHint === "relationship" && T0.test(n.text) && (g += 12), c.categoryHint === "personality" && M0.test(n.text) && (g += 8);
  const M = E0.test(`${n.sourceLabel}
${n.text}`);
  if (M && (g -= 10), !(M && g < 8 && m.length === 0) && !(g < 7 && c.categoryHint === "unknown" && m.length === 0))
    return {
      id: n.id,
      sourceType: n.sourceType,
      sourceLabel: n.sourceLabel,
      categoryHint: c.categoryHint,
      text: n.text,
      score: Math.round(g * 10) / 10,
      matchedTags: m,
      reason: [n.sourceType, ...c.reasons, m.length ? `matchedTags:${m.length}` : ""].filter(Boolean).join(" / ")
    };
}
function O0(n, u) {
  const r = $u(n, u);
  if (r)
    return r;
  if (!pp.test(n.text) && ys(n.text, u).length === 0)
    return;
  const c = ys(n.text, u);
  return {
    id: n.id,
    sourceType: n.sourceType,
    sourceLabel: n.sourceLabel,
    categoryHint: "identity",
    text: n.text,
    score: 7 + c.length * 4,
    matchedTags: c,
    reason: [n.sourceType, "first_mes_intro", c.length ? `matchedTags:${c.length}` : ""].filter(Boolean).join(" / ")
  };
}
function D0(n) {
  const u = [], r = /* @__PURE__ */ new Map();
  return Array.from(
    n.reduce((m, p) => {
      const g = Ue(p.text).slice(0, 220), M = m.get(g);
      return (!M || p.score > M.score) && m.set(g, p), m;
    }, /* @__PURE__ */ new Map()).values()
  ).forEach((m) => {
    r.set(m.categoryHint, [...r.get(m.categoryHint) ?? [], m]);
  }), r.forEach((m, p) => {
    u.push(
      ...m.sort((g, M) => M.score - g.score || g.text.length - M.text.length).slice(0, v0[p])
    );
  }), u.sort((m, p) => p.score - m.score).slice(0, d0);
}
function R0(n) {
  return Ue(n.text).slice(0, 220);
}
function H0(n) {
  return Array.from(
    n.reduce((u, r) => {
      const c = R0(r), m = u.get(c);
      return (!m || r.score > m.score) && u.set(c, r), u;
    }, /* @__PURE__ */ new Map()).values()
  );
}
function U0(n, u) {
  const r = Ue(n.sourceLabel), c = Ue(u.title), m = Ue(u.text), p = Ue(n.text);
  let g = 0;
  r && c && (r.includes(c) || c.includes(r)) && (g += 10);
  const M = r.split(" ").filter((y) => y.length >= 2);
  return g += M.filter((y) => c.includes(y) || m.includes(y)).length * 2, p && m && (m.includes(p.slice(0, 80)) || p.includes(m.slice(0, 80))) && (g += 7), g;
}
function B0(n, u) {
  const r = Ue(u.text), c = Ue(n.text);
  if (!r || !c)
    return !1;
  const m = r.length < c.length ? r : c, p = r.length < c.length ? c : r;
  return m.length >= 30 && p.includes(m.slice(0, Math.min(180, m.length)));
}
function w0(n, u, r) {
  return u.length === 0 ? n : n.map((c) => {
    const m = r.find((g) => g.id === c.scenarioId);
    if (!m)
      return c;
    const p = H0(
      u.filter((g) => !B0(g, m)).map((g) => ({
        evidence: g,
        score: U0(g, m)
      })).filter((g) => g.score >= 4).sort((g, M) => M.score - g.score || M.evidence.score - g.evidence.score).map((g) => g.evidence)
    ).slice(0, 3);
    return p.length > 0 ? { ...c, linkedEvidence: p } : c;
  });
}
function q0(n) {
  return Ue(n).slice(0, 180);
}
function Wu(n) {
  const u = "①②③④⑤⑥⑦⑧⑨⑩".indexOf(n);
  if (u >= 0)
    return u + 1;
  const r = {
    一: 1,
    二: 2,
    三: 3,
    四: 4,
    五: 5,
    六: 6,
    七: 7,
    八: 8,
    九: 9,
    十: 10
  };
  return /^十[一二三四五六七八九]$/.test(n) ? 10 + (r[n[1]] ?? 0) : /^[一二三四五六七八九]十$/.test(n) ? (r[n[0]] ?? 0) * 10 : /^[一二三四五六七八九]十[一二三四五六七八九]$/.test(n) ? (r[n[0]] ?? 0) * 10 + (r[n[2]] ?? 0) : r[n] ?? (Number(n) || 0);
}
function Fu(n) {
  const u = n.match(x0) ?? n.match(A0) ?? n.match(/^\s*(?:route\s*)?([0-9]{1,2}|[一二三四五六七八九十]|[①②③④⑤⑥⑦⑧⑨⑩])\s*[.、:：）)\-]\s*(.+)$/i);
  if (!u)
    return;
  const r = he(u[2]);
  if (!r || r.length < 2 || r.length > 240 || Qn.some((h) => h.test(r)))
    return;
  const c = Array.from(r.matchAll(/[（(]([^（）()]{2,120})[）)]/g)).map((h) => h[1].trim()), m = c.join("；"), p = r.replace(/[（(][^（）()]{2,120}[）)]/g, "").trim() || r, g = r.match(/(?:你是|you are)\s*([^，。；;,（）()]{2,48})/i), M = c.find((h) => /世界书|world.?book|打开|开启|关闭/i.test(h)), y = c.find((h) => /攻略|难度|difficulty/i.test(h));
  return {
    index: Wu(u[1]),
    rawText: r,
    routeLabel: p,
    userRole: g?.[1]?.trim(),
    relationshipSetup: p,
    worldBookHint: M,
    difficultyHint: y ?? (/攻略|难度/i.test(m) ? m : void 0)
  };
}
function L0(n) {
  if (n.alternateGreetings.length < 2)
    return [];
  const u = [
    n.firstMessage,
    Qe(n.rawCard.description),
    Qe(n.rawCard.mes_example),
    Qe(n.rawCard.creatorcomment),
    Qe(n.rawCard.extensions),
    ...Zm(n.rawCard.extensions),
    Qe(n.rawCard.data?.description),
    Qe(n.rawCard.data?.mes_example),
    Qe(n.rawCard.data?.creatorcomment),
    Qe(n.rawCard.data?.extensions),
    ...Zm(n.rawCard.data?.extensions)
  ].join(`
`), r = Array.from(
    u.matchAll(
      /(?:^|[,{]\s*)([0-9]{1,2})\s*:\s*\{\s*description\s*:\s*(["'`])((?:\\[\s\S]|(?!\2)[\s\S]){2,260})\2/gi
    )
  ).map((A) => {
    const x = Number(A[1]), B = he(C0(A[3])).replace(/\s+/g, " ").trim();
    return !x || !B || B.length < 2 || B.length > 220 || Qn.some((w) => w.test(B)) ? void 0 : {
      index: x,
      rawText: B,
      routeLabel: B,
      relationshipSetup: B
    };
  }).filter((A) => !!A).filter((A, x, B) => B.findIndex((L) => L.index === A.index) === x).slice(0, n.alternateGreetings.length);
  if (r.length >= 2)
    return r;
  const c = Array.from(
    u.matchAll(/onclick=\\?"switchToNarrative\((\d{1,2})\)\\?"[\s\S]{0,260}?【([^】]{1,40})】(?:\s|<br\s*\/?>|\\n|\\r)*([\s\S]*?)(?=<\/div>|\\?"\s*,|\n\s*<div|\n\s*\\?")/gi)
  ).map((A) => {
    const x = Number(A[1]), B = he(A[2]).trim(), L = he(A[3]).replace(/\\[rn]/g, " ").replace(/\s+/g, " ").trim();
    return !x || !B || !L && B.length < 2 ? void 0 : {
      index: x,
      rawText: L ? `${B}：${L}` : B,
      routeLabel: B,
      relationshipSetup: L || B
    };
  }).filter((A) => !!A).filter((A, x, B) => B.findIndex((L) => L.index === A.index) === x).slice(0, n.alternateGreetings.length);
  if (c.length >= 2)
    return c;
  const m = he(n.firstMessage), p = Array.from(
    m.matchAll(
      /(?:【([^】]{2,80})】\s*)?(?:[✦★☆◆◇\-\s(（\\\/'"]{0,16})开场白\s*([0-9]{1,2}|[一二三四五六七八九十]{1,3})\s*[：:]\s*([\s\S]*?)(?=(?:【[^】]{2,80}】\s*)?(?:[✦★☆◆◇\-\s(（\\\/'"]{0,16})开场白\s*(?:[0-9]{1,2}|[一二三四五六七八九十]{1,3})\s*[：:]|作者|$)/g
    )
  ).map((A) => {
    const x = A[1]?.trim(), B = Wu(A[2]), L = he(A[3]).replace(/[✦★☆◆◇]+/g, " ").replace(/\s+/g, " ").trim();
    if (!B || !L || L.length < 2 || L.length > 140)
      return;
    const w = x ? `${L}（${x}）` : L;
    return {
      index: B,
      rawText: w,
      routeLabel: L,
      relationshipSetup: L,
      worldBookHint: x
    };
  }).filter((A) => !!A).slice(0, n.alternateGreetings.length);
  if (p.length >= 2)
    return p;
  const g = n.firstMessage.replace(/\r\n?/g, `
`), M = g.match(/(?:开局一览|开场一览|开篇一览|线路一览|路线一览|故事开篇|选择故事开篇|选择开篇|选择线路)/);
  if (M?.index != null) {
    const A = g.slice(M.index), x = [];
    let B;
    const L = () => {
      if (!B?.routeLabel || B.routeLabel.length > 120)
        return;
      const ne = he(B.lines.join(`
`)).replace(/\*+/g, " ").replace(/请通过右下小箭头左右滑动选择/g, " ").replace(/\s+/g, " ").trim(), F = [B.routeLabel, ne].filter(Boolean).join("：").slice(0, 260);
      x.push({
        index: B.index,
        rawText: F,
        routeLabel: B.routeLabel,
        relationshipSetup: ne || B.routeLabel
      });
    }, w = A.includes(`
`) ? A.split(/\n+/) : yr(A);
    for (const ne of w) {
      const F = ne.match(/^\s*([0-9]{1,2}|[一二三四五六七八九十]{1,3})\s*[.)、．]\s*(.+?)\s*$/);
      if (F) {
        L();
        const V = Wu(F[1]), J = F[2].trim(), Y = J.match(/^\*\*([^*]{1,120})\*\*\s*(.*)$/) ?? J.match(/^【([^】]{1,120})】\s*(.*)$/), se = he(Y?.[1] ?? J).replace(/\*+/g, "").trim(), me = (Y?.[2] ?? "").trim();
        B = V && se ? { index: V, routeLabel: se, lines: me ? [me] : [] } : void 0;
        continue;
      }
      if (!B)
        continue;
      if (/^\s*#{1,6}\s+/.test(ne) || /^\s*(作者|原作者|严禁|禁止|该角色卡)/.test(ne)) {
        L(), B = void 0;
        continue;
      }
      const ie = ne.trim();
      ie && !/^(?:\*?请通过右下小箭头|[-*_]{3,})/.test(ie) && B.lines.push(ie);
    }
    L();
    const Q = x.filter((ne) => !!ne).filter((ne, F, ie) => ie.findIndex((V) => V.index === ne.index) === F).slice(0, n.alternateGreetings.length);
    if (Q.length >= 2)
      return Q;
  }
  const h = ["选择故事开篇", "选择开篇", "选择线路", "故事开篇"].map((A) => ({ text: A, index: n.firstMessage.lastIndexOf(A) })).filter((A) => A.index >= 0).sort((A, x) => x.index - A.index)[0];
  if (!h)
    return [];
  const D = n.firstMessage.slice(h.index + h.text.length), _ = Array.from(D.matchAll(/[^。!！]+[。!！]?/g)).map((A) => he(A[0])).map((A) => A.replace(/\s+/g, " ").trim()).filter((A) => A.length >= 2 && A.length <= 80).slice(0, n.alternateGreetings.length);
  return _.length < 2 ? [] : _.map((A, x) => ({
    index: x + 1,
    rawText: A,
    routeLabel: A,
    relationshipSetup: A
  }));
}
function yr(n) {
  const u = n.split(/\n+|(?=\s*(?:(?:线路|路线|开场白|开场)\s*)?(?:route\s*)?(?:[0-9]{1,2}|[一二三四五六七八九十]{1,3}|[①②③④⑤⑥⑦⑧⑨⑩])\s*[.、:：）)\-]\s*)/i).map((r) => he(r)).filter(Boolean);
  return u.length > 0 ? u : he(n).split(/\n+/).map((r) => r.trim()).filter(Boolean);
}
function G0(n) {
  if (yr(n).map(Fu).filter(Boolean).length >= 2)
    return !0;
  const r = he(n);
  return /(?:选择故事开篇|选择开篇|选择线路|故事开篇)/.test(r) && Array.from(r.matchAll(/[^。!！]+[。!！]?/g)).length >= 3;
}
function Y0(n, u) {
  const r = yr(n.firstMessage), c = r.map(Fu).filter((x) => !!x), m = L0(n), p = Math.max(0, ...c.map((x) => x.index)), g = Math.max(0, ...m.map((x) => x.index)), M = m.length >= 2 && (c.length < 2 || g >= p) ? m : c, y = M.length >= 2, h = r.filter((x) => /世界书|world.?book|打开对应|开启|关闭/i.test(x)).map((x) => ps(x, 180)), D = r.filter((x) => Xm.test(x)).map((x) => ps(x, 180)), _ = r.filter((x) => !Fu(x)).filter((x) => !Xm.test(x)).filter((x) => !S0.test(x)).filter((x) => pp.test(x) || !y && pr(x, 32)).join(`
`);
  return {
    characterIntroEvidence: bs("firstMes", "first_mes intro", _).map((x) => O0(x, u)).filter((x) => !!x).filter((x) => x.categoryHint !== "interaction_rule" && x.categoryHint !== "scenario_manifest").sort((x, B) => B.score - x.score).slice(0, g0),
    routeManifest: M,
    worldBookHints: Array.from(new Set(h)).slice(0, 8),
    interactionHints: Array.from(new Set(D)).slice(0, 8),
    discardedUiTextLength: Qn.some((x) => x.test(n.firstMessage)) ? n.firstMessage.length : 0
  };
}
function X0(n) {
  const u = n.text.trim(), r = he(n.text);
  if (!r)
    return "empty";
  if (_0.some((c) => c.test(r)))
    return "placeholder";
  if (n.source === "first_mes" && G0(n.text))
    return "route_manifest";
  if (!pr(r, 24) || Qn.some((c) => c.test(u) || c.test(r)))
    return "decorative_or_ui";
}
function Q0(n, u, r) {
  const c = [], m = [], p = /* @__PURE__ */ new Set(), g = r?.scenarioStats ?? [], M = n.scenarioOpenings.map((x) => {
    const B = X0(x), L = q0(x.text), w = L && p.has(L);
    p.add(L);
    const Q = g.find((V) => V.scenarioId === x.id), ne = ys(x.text, u), F = Q && Q.chatCount > 0 ? "played" : x.source === "first_mes" ? "first_valid" : ne.length > 0 ? "candidate_tag_hit" : "diverse_sample", ie = (Q?.totalMessages ?? 0) * 3 + ne.length * 6 + (x.source === "first_mes" ? 2 : 0) + Math.max(0, 5 - x.index);
    return {
      opening: x,
      skipReason: w ? "duplicate" : B,
      scenarioUsage: Q,
      matchedTags: ne,
      reason: F,
      score: ie
    };
  }), y = M.filter((x) => !x.skipReason), h = y.filter((x) => x.reason === "played").sort((x, B) => B.score - x.score).slice(0, p0), D = h.length > 0 ? [] : y.filter((x) => x.reason !== "played").sort((x, B) => B.score - x.score).slice(0, m0), _ = [...h, ...D].filter(
    (x, B, L) => L.findIndex((w) => w.opening.id === x.opening.id) === B
  ), A = new Set(_.map((x) => x.opening.id));
  return M.forEach((x) => {
    if (x.skipReason) {
      m.push({
        scenarioId: x.opening.id,
        title: x.opening.title,
        reason: x.skipReason
      });
      return;
    }
    A.has(x.opening.id) || m.push({
      scenarioId: x.opening.id,
      title: x.opening.title,
      reason: "unplayed_over_budget"
    });
  }), _.forEach((x) => {
    c.push({
      scenarioId: x.opening.id,
      title: x.opening.title,
      source: x.opening.source,
      index: x.opening.index,
      textExcerpt: ps(x.opening.text, x.reason === "played" ? 520 : y0),
      selectionReason: x.reason,
      matchedTags: x.matchedTags,
      totalMessages: x.scenarioUsage?.totalMessages,
      chatCount: x.scenarioUsage?.chatCount
    });
  }), { selectedOpenings: c, skippedOpenings: m };
}
function Z0(n) {
  return n.reduce(
    (u, r) => ({
      ...u,
      [r.reason]: u[r.reason] + 1
    }),
    {
      placeholder: 0,
      decorative_or_ui: 0,
      route_manifest: 0,
      duplicate: 0,
      unplayed_over_budget: 0,
      empty: 0
    }
  );
}
function _p(n, u, r) {
  const c = n.rawCard.data, m = Y0(n, u), p = [
    ["description", "description", n.description],
    ["personality", "personality", n.rawCard.personality ?? c?.personality],
    ["scenario", "scenario", n.rawCard.scenario ?? c?.scenario],
    ["creatorNotes", "creator_notes", n.creatorNotes || n.rawCard.creatorcomment || c?.creatorcomment],
    ["systemPrompt", "system_prompt", n.rawCard.system_prompt ?? c?.system_prompt],
    ["postHistoryInstructions", "post_history_instructions", n.rawCard.post_history_instructions ?? c?.post_history_instructions]
  ];
  n.cardType === "world" && p.push([
    "extensionsWorld",
    "extensions/world",
    [
      Qe(n.rawCard.character_book),
      Qe(n.rawCard.extensions),
      Qe(c && "character_book" in c ? c.character_book : ""),
      Qe(c && "extensions" in c ? c.extensions : "")
    ].join(" ")
  ]);
  const g = [
    ...p.flatMap(([A, x, B]) => bs(A, x, B)),
    ...Jm(n)
  ], M = Im(n).map((A) => $u(A, u)).filter((A) => !!A), y = D0(
    [
      ...g.map((A) => $u(A, u)).filter((A) => !!A),
      ...m.characterIntroEvidence
    ]
  ), { selectedOpenings: h, skippedOpenings: D } = Q0(n, u, r), _ = w0(h, M, n.scenarioOpenings);
  return {
    cardId: n.id,
    name: n.name,
    cardTypeHint: n.cardType,
    sourceLengths: {
      description: n.description.length,
      personality: Qe(n.rawCard.personality ?? c?.personality).length,
      scenario: Qe(n.rawCard.scenario ?? c?.scenario).length,
      creatorNotes: n.creatorNotes.length,
      systemPrompt: Qe(n.rawCard.system_prompt ?? c?.system_prompt).length,
      postHistoryInstructions: Qe(n.rawCard.post_history_instructions ?? c?.post_history_instructions).length,
      characterBook: Jm(n).reduce((A, x) => A + x.text.length, 0),
      scenarioCharacterBook: Im(n).reduce((A, x) => A + x.text.length, 0),
      firstMes: n.firstMessage.length,
      alternateGreetings: n.alternateGreetings.reduce((A, x) => A + x.length, 0)
    },
    firstMesDigest: m,
    evidenceSections: y,
    selectedOpenings: _,
    skippedOpenings: D,
    skippedOpeningsSummary: Z0(D)
  };
}
const V0 = {
  rawTags: 1.6,
  description: 1.2,
  creatorNotes: 1.2,
  systemPrompt: 0.8,
  firstMes: 0.9,
  alternateGreetingContent: 0.9,
  extensionsWorld: 1.1
}, K0 = {
  角色气质: 15,
  身份阶层: 8,
  关系结构: 15,
  情感走向: 12,
  互动机制: 12,
  世界观题材: 8,
  结局倾向: 6,
  雷点偏好: 6,
  "雷点/偏好": 6
}, J0 = 8, I0 = /* @__PURE__ */ new Set([void 0, "active"]);
function Gn(n) {
  if (typeof n == "string")
    return n;
  if (n == null)
    return "";
  try {
    return JSON.stringify(n);
  } catch {
    return "";
  }
}
function k0(n, u) {
  return u.map((r) => Gn(n.rawCard[r])).join(" ");
}
function $0(n, u = {}) {
  const c = [...u.alternateGreetings ?? (u.includeAllAlternateGreetings === !1 ? [] : n.alternateGreetings), ...u.extraScenarioTexts ?? []], m = [
    {
      field: "rawTags",
      text: n.tags.map((p) => p.label).join(" ")
    },
    {
      field: "description",
      text: n.description
    },
    {
      field: "creatorNotes",
      text: n.creatorNotes
    },
    {
      field: "systemPrompt",
      text: k0(n, ["system_prompt", "systemPrompt", "personality", "scenario"])
    },
    {
      field: "firstMes",
      text: u.firstMesText ?? n.firstMessage
    },
    {
      field: "alternateGreetingContent",
      text: c.join(" ")
    }
  ];
  return n.cardType === "world" && m.push({
    field: "extensionsWorld",
    text: [
      Gn(n.rawCard.character_book),
      Gn(n.rawCard.extensions),
      Gn(n.rawCard.data && "character_book" in n.rawCard.data ? n.rawCard.data.character_book : ""),
      Gn(n.rawCard.data && "extensions" in n.rawCard.data ? n.rawCard.data.extensions : "")
    ].join(" ")
  }), m.map((p) => ({
    ...p,
    text: he(p.text)
  }));
}
function km(n, u) {
  const r = Ue(n), c = Ue(u);
  if (!r || !c)
    return !1;
  if (/^[a-z0-9]+$/i.test(c) && c.length <= 4) {
    const m = c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|[^a-z0-9])${m}($|[^a-z0-9])`, "i").test(r);
  }
  return r.includes(c);
}
function $m(n, u) {
  const r = he(n), c = r.toLowerCase(), m = he(u).toLowerCase(), p = c.indexOf(m);
  if (p < 0)
    return r.slice(0, 72);
  const g = Math.max(0, p - 24), M = Math.min(r.length, p + m.length + 24);
  return r.slice(g, M);
}
function W0(n, u) {
  const r = he(n).toLowerCase(), c = he(u).toLowerCase(), m = r.indexOf(c);
  if (m < 0)
    return !1;
  const p = r.slice(Math.max(0, m - 8), m);
  return /(?:并不|不是|没有|不会|不算|不要|避免|禁止|并非|非)\s*$/.test(p);
}
function F0(n, u) {
  const r = he(n).toLowerCase(), c = he(u).toLowerCase(), m = r.indexOf(c);
  if (m < 0)
    return !1;
  const p = r.slice(Math.max(0, m - 24), Math.min(r.length, m + c.length + 36));
  return !!(c === "前任" && /(?:前任们|部分前任|前任.{0,8}经验)/.test(p) || c === "养成" && /养成了|养成.{0,8}(?:脾气|习惯|性格|能力)/.test(p) || (c === "溺爱" || c === "无底线宠溺") && !/(?:老婆|对象|恋人|伴侣|妻|夫|男友|女友|\{\{user\}\}|user)/i.test(p));
}
function P0(n, u, r) {
  if (u === "alternateGreetingContent") {
    n.scenario = (n.scenario ?? 0) + r;
    return;
  }
  if (u === "extensionsWorld") {
    n.world = (n.world ?? 0) + r;
    return;
  }
  if (u === "rawTags" || u === "description" || u === "creatorNotes") {
    n.card = (n.card ?? 0) + r;
    return;
  }
  n.unknown = (n.unknown ?? 0) + r;
}
function ev(n) {
  if (n === "card" || n === "scenario" || n === "cast" || n === "world" || n === "unknown")
    return n;
}
function tv(n, u, r) {
  const c = ev(u.scopePreference);
  if (c)
    return c;
  const m = { ...r };
  return (u.category.includes("世界观") || n.cardType === "world") && (m.world = (m.world ?? 0) + 1.5), n.cardType === "group" && (m.cast = (m.cast ?? 0) + 1), Object.entries(m).sort(([, p], [, g]) => g - p)[0]?.[0] ?? "unknown";
}
function av(n, u) {
  const r = {
    score: 0,
    matchedFields: /* @__PURE__ */ new Set(),
    matchedSnippets: [],
    scopeVotes: {}
  };
  return u.forEach(({ field: c, text: m }) => {
    if (!m)
      return;
    const p = V0[c];
    let g = 0;
    [
      { term: n.label, value: 5 },
      ...(n.aliases ?? []).map((y) => ({ term: y, value: 3 })),
      ...(n.examples ?? []).map((y) => ({ term: y, value: 1.2 }))
    ].forEach(({ term: y, value: h }) => {
      n.label === "BDSM" && ["D/s", "SM", "S向", "M向"].includes(y) || km(m, y) && (W0(m, y) || F0(m, y) || (g += h * p, c === "rawTags" && (g += 6 * p), r.matchedFields.add(c), r.matchedSnippets.length < 4 && r.matchedSnippets.push($m(m, y))));
    }), n.negativeAliases?.forEach((y) => {
      km(m, y) && (g -= 4 * p, r.matchedFields.add(c), r.matchedSnippets.length < 4 && r.matchedSnippets.push($m(m, y)));
    }), g !== 0 && (r.score += g, P0(r.scopeVotes, c, Math.max(0.1, Math.abs(g))));
  }), r;
}
function Pu(n, u) {
  return u.score - n.score || (u.priority ?? 0) - (n.priority ?? 0) || n.label.localeCompare(u.label, "zh-Hans-CN");
}
function lv(n) {
  const u = /* @__PURE__ */ new Map();
  return n.forEach((r) => {
    const c = u.get(r.category) ?? [];
    c.push(r), u.set(r.category, c);
  }), Array.from(u.entries()).flatMap(
    ([r, c]) => c.sort(Pu).slice(0, K0[r] ?? J0)
  ).sort((r, c) => Pu(r, c) || r.category.localeCompare(c.category, "zh-Hans-CN"));
}
function nv(n) {
  return I0.has(n.status);
}
function el(n, u = {}) {
  const r = $0(n, u), c = Oh().filter(nv).map((p) => {
    const g = av(p, r);
    if (g.score <= 0 || g.matchedFields.size === 0)
      return;
    const M = {
      tagId: p.id,
      label: p.label,
      category: p.category,
      score: Number(g.score.toFixed(2)),
      scopeHint: tv(n, p, g.scopeVotes),
      matchedFields: Array.from(g.matchedFields),
      matchedSnippets: Array.from(new Set(g.matchedSnippets)).slice(0, 4)
    };
    return p.family && (M.family = p.family), p.parentId && (M.parentId = p.parentId), typeof p.priority == "number" && (M.priority = p.priority), p.scopePreference && (M.scopePreference = p.scopePreference), M;
  }).filter((p) => p !== void 0), m = /* @__PURE__ */ new Map();
  return c.forEach((p) => {
    const g = m.get(p.tagId);
    (!g || Pu(p, g) < 0) && m.set(p.tagId, p);
  }), lv(Array.from(m.values()));
}
const iv = 2, Wm = 96, sv = 8;
function Ku(n, u) {
  return n.filter((r) => u.has(r));
}
function cv(n, u) {
  if (n.firstMesDigest.routeManifest.length !== 0)
    return n.firstMesDigest.routeManifest.find((r) => r.index === u.index);
}
function Fm(n, u) {
  return cv(n, u)?.rawText ?? u.textExcerpt;
}
function uv(n) {
  const u = el(n, {
    firstMesText: "",
    includeAllAlternateGreetings: !1
  }), r = _p(n, u), c = /* @__PURE__ */ new Map();
  return n.scenarioOpenings.forEach((m) => {
    const p = r.firstMesDigest.routeManifest.find((g) => g.index === m.index);
    p && c.set(m.id, p.rawText);
  }), c;
}
function rv(n) {
  const { routeManifest: u, interactionHints: r, ...c } = n.firstMesDigest;
  return {
    ...c,
    routeManifestCount: n.firstMesDigest.routeManifest.length
  };
}
function ov(n) {
  const u = he(n).replace(/\\+"/g, '"').replace(/[{}\[\]]/g, " ").replace(/\s+/g, " ").trim();
  return u.length <= Wm ? u : `${u.slice(0, Wm).trim()}...`;
}
function fv(n, u) {
  const r = [];
  return n.matchedSnippets.forEach((c) => {
    if (r.length >= iv)
      return;
    const m = ov(c), p = Ue(m).slice(0, 80);
    !p || u.has(p) || (u.add(p), r.push(m));
  }), r;
}
function Zn(n, u) {
  const r = el(n, {
    firstMesText: "",
    includeAllAlternateGreetings: !1
  }), c = _p(n, r, u), { selectedOpenings: m, ...p } = c, g = m.map((A) => Fm(c, A)), M = m.flatMap((A) => A.linkedEvidence?.map((x) => x.text) ?? []), y = el(n, {
    firstMesText: c.firstMesDigest.characterIntroEvidence.map((A) => A.text).join(" "),
    alternateGreetings: g,
    extraScenarioTexts: M,
    includeAllAlternateGreetings: !1
  }), h = new Set(y.map((A) => A.label)), D = /* @__PURE__ */ new Set(), _ = p.evidenceSections.map((A) => ({
    ...A,
    matchedTags: Ku(A.matchedTags, h)
  }));
  return {
    cardId: n.id,
    name: n.name,
    cardTypeHint: n.cardType,
    rawTags: n.tags.map((A) => A.label),
    cardDigest: {
      ...p,
      firstMesDigest: rv(c),
      evidenceSections: _,
      selectedOpeningIds: m.map((A) => A.scenarioId)
    },
    openings: m.map((A) => ({
      scenarioId: A.scenarioId,
      title: A.title,
      contentExcerpt: Fm(c, A),
      selectionReason: A.selectionReason,
      matchedTags: Ku(A.matchedTags, h),
      linkedEvidence: A.linkedEvidence?.map((x) => ({
        sourceLabel: x.sourceLabel,
        categoryHint: x.categoryHint,
        text: x.text,
        matchedTags: Ku(x.matchedTags, h),
        reason: x.reason
      })),
      totalMessages: A.totalMessages,
      chatCount: A.chatCount
    })),
    localCandidateTags: y.map((A) => ({
      label: A.label,
      category: A.category,
      family: A.family,
      parentId: A.parentId,
      priority: A.priority,
      scopePreference: A.scopePreference,
      score: Math.min(A.score, sv),
      scopeHint: A.scopeHint,
      matchedFields: A.matchedFields,
      matchedSnippets: fv(A, D)
    }))
  };
}
function dv(n) {
  const u = n.trim();
  return u.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i)?.[1]?.trim() ?? u;
}
function Sp(n) {
  const u = dv(n), r = [u], c = u.indexOf("{"), m = u.lastIndexOf("}");
  c >= 0 && m > c && r.push(u.slice(c, m + 1));
  let p = "Unknown JSON parse error";
  for (const g of r)
    try {
      return {
        ok: !0,
        value: JSON.parse(g)
      };
    } catch (M) {
      p = M instanceof Error ? M.message : "Unknown JSON parse error";
    }
  return {
    ok: !1,
    error: p
  };
}
function sa(n) {
  return Math.ceil(n.length / 2);
}
const mv = [
  "single_character",
  "single_character_multi_scenario",
  "multi_character",
  "world_setting",
  "fandom",
  "scenario_collection",
  "unknown"
], er = `你是 CharaLog 的角色卡标签精选器和一句话文案写手，服务于 SillyTavern 角色卡档案分析。
你只分析输入里提供的角色卡证据段、first_mes 入口解析、被选择的 openings、候选标签和本地行为摘要；不分析用户真实人格，不做心理诊断，不读取或推断完整聊天正文。
你必须严格输出 JSON，不要 markdown，不要解释，不要额外文字。

- 正式标签只能从输入的 localCandidateTags 中选择，放入 baseTags/scenarioTags/worldTags/castTags；正式标签宁可少选，也不要硬贴。
- baseTags 建议 0-4 个。它们必须能概括主角色长期稳定的人设、核心关系或核心情感结构；不要为了凑满数量选择泛泛的氛围词。
- localCandidateTags 是本地检索出来的候选线索，不是答案；score 只表示“可能相关”，不能替代证据判断，也不能因为分高就自动采用。
- suggestedTags 是你主动提出的“词典缺口建议”，不参与正式统计。每张卡都要检查是否有 1-5 个比 localCandidateTags 更准确的核心标签、关系标签、性格标签或线路标签；只要有清楚证据，就放入 suggestedTags。
- suggestedTags 不要重复 localCandidateTags 里已经存在的 label；它应该表达词典没有覆盖好、但对一句话总结和标签判断很关键的味道。
- baseTags 只能基于 cardDigest.evidenceSections、cardDigest.firstMesDigest.characterIntroEvidence、rawTags 中稳定成立的主角色证据，scope 必须是 card。
- 不要把地点、校园/日常场景、聊天语气、开场玩法、状态栏格式、NPC 关系史、住所资产、世界观背景当成 baseTags；除非证据明确说它们是主角色长期核心人设。
- first_mes 可能同时包含角色介绍、线路目录、世界书开关、玩法提示、UI 壳和 NPC 信息。只有 characterIntroEvidence 能支持主角色 baseTags。
- cardDigest.firstMesDigest.routeManifest 只说明线路供给和世界书/玩法提示，不能直接当作主角色稳定性格。
- openings 中如果带 routeManifestItem，优先把它理解为线路摘要，而不是完整开场白正文。
- scenarioTags 只能基于 openings 中实际发送的 selected openings 或 routeManifestItem；如果 opening 的 selectionReason 不是 played，它只能说明卡片供给，不能被当作用户偏好。
- 不要把只出现在 opening、routeManifest 或 linkedEvidence 的关系设定误判成整张卡 baseTag。
- 明显属于 NPC、配角、群像成员、世界书说明或玩法规则的内容，不要混成主角色性格；需要时只能放到 scenarioTags/worldTags/castTags，证据不足就不要选。
- cardDigest.skippedOpenings 只用于理解哪些内容没有发送，不要据此脑补标签。
- 如果正式词典候选不够准确，不要用相近但错误的词典标签凑数；请少选正式标签，并在 suggestedTags 中提出更准确的新标签。如果证据不足，在 warnings 中说明。
- warnings 只用于数据质量问题，例如输入证据不足、候选标签明显缺失、JSON 字段异常；不要在 warnings 里写剧情纠偏、标签反驳或“某角色其实不是某标签”这类主观判断。

文案规则：
- oneLineSummary 不是剧情简介，而是一句核心情感冲突。
- 语气像 CharaLog：毒舌闺蜜、精准、有趣，但不羞辱用户。
- 每个角色身上都有一个标志性的姿态：他/她面对世界、面对用户时最典型的样子。用具体意象写出来。`, tr = `输出结构必须是：
{
  "results": [
    {
      "cardId": "string",
      "cardType": "single_character | single_character_multi_scenario | multi_character | world_setting | fandom | scenario_collection | unknown",
      "baseTags": [{"label":"string","category":"string","scope":"card","confidence":0.0,"reason":"string"}],
      "scenarioTags": [{"scenarioId":"string","scenarioName":"string","tags":[{"label":"string","category":"string","scope":"scenario","confidence":0.0,"reason":"string"}]}],
      "worldTags": [],
      "castTags": [],
      "suggestedTags": [{"label":"string","category":"string","scope":"card | scenario | world | cast","confidence":0.0,"reason":"string","evidence":"string"}],
      "oneLineSummary": "string",
      "scenarioOneLineSummaries": [{"scenarioId":"string","summary":"string"}],
      "warnings": []
    }
  ]
}`, Pm = 1600, pv = 24e3, yv = 96e3, gv = 64e3;
class ar extends Error {
  statusCode;
  retryCount;
  constructor(u, r, c) {
    super(u), this.name = "AiRequestError", this.retryCount = r, this.statusCode = c;
  }
}
function Ap(n) {
  return n.cardType === "single" ? "single_character" : n.cardType === "multi_scenario" ? "single_character_multi_scenario" : n.cardType === "group" ? "multi_character" : n.cardType === "world" ? "world_setting" : "unknown";
}
function xp(n) {
  const u = typeof n == "number" ? n : Number(n);
  return Number.isFinite(u) ? Math.max(0, Math.min(1, u)) : 0;
}
function Je(n) {
  return typeof n == "string" ? n : "";
}
function hv(n) {
  return Array.isArray(n) ? n.map(Je).map((u) => u.trim()).filter(Boolean).filter((u) => /输入|JSON|字段|候选.*缺|证据不足|无法判断|数量|解析|配置|请求|超时|不匹配/i.test(u)).slice(0, 8) : [];
}
function Tp(n) {
  return [
    { role: "system", content: er },
    {
      role: "user",
      content: `${tr}

请分析下面的角色卡输入：
${JSON.stringify({ cards: n })}`
    }
  ];
}
function Mp(n, u) {
  return {
    model: u.model,
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: Tp(n)
  };
}
function vv(n) {
  return {
    cardId: n.cardId,
    name: n.name,
    cardTypeHint: n.cardTypeHint,
    sourceLengths: n.cardDigest.sourceLengths,
    evidenceSectionCount: n.cardDigest.evidenceSections.length,
    evidenceSectionsPreview: n.cardDigest.evidenceSections.slice(0, 12).map((u) => ({
      sourceType: u.sourceType,
      categoryHint: u.categoryHint,
      length: u.text.length,
      score: u.score,
      matchedTags: u.matchedTags,
      reason: u.reason
    })),
    firstMesRouteCount: n.cardDigest.firstMesDigest.routeManifestCount,
    firstMesIntroEvidenceCount: n.cardDigest.firstMesDigest.characterIntroEvidence.length,
    firstMesWorldBookHintCount: n.cardDigest.firstMesDigest.worldBookHints.length,
    selectedOpeningsCount: n.openings.length,
    skippedOpeningsCount: n.cardDigest.skippedOpenings.length,
    skippedOpeningsSummary: n.cardDigest.skippedOpeningsSummary,
    openingExcerptLengths: n.openings.map((u) => ({
      scenarioId: u.scenarioId,
      title: u.title,
      length: u.contentExcerpt.length,
      selectionReason: u.selectionReason,
      hasRouteManifestItem: n.cardDigest.firstMesDigest.routeManifestCount > 0 && u.contentExcerpt.length < 180
    })),
    candidateTagsCount: n.localCandidateTags.length,
    candidateTagsPreview: n.localCandidateTags.slice(0, 20).map((u) => ({
      label: u.label,
      category: u.category,
      score: u.score,
      scopeHint: u.scopeHint,
      matchedFields: u.matchedFields
    }))
  };
}
function Yn(n, u, r = 0) {
  const c = Tp(n), m = c[0].content, p = c[1].content, g = sa(m), M = sa(p);
  return {
    messages: c,
    systemPrompt: m,
    userPrompt: p,
    requestPayloadPreview: Mp(n, u),
    cardAnalysisInputPreview: vv(n[r] ?? n[0]),
    tokenEstimate: {
      systemPromptTokens: g,
      userPromptTokens: M,
      totalInputTokens: g + M,
      estimatedOutputTokenLimit: Pm,
      estimatedTotalTokens: g + M + Pm
    },
    parseWarnings: [],
    validationErrors: []
  };
}
function bv(n, u, r) {
  return Yn([Zn(n, r)], u);
}
function Yl(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
function fs(n, u, r) {
  return Array.isArray(n) ? n.filter(Yl).map((c) => ({
    label: Je(c.label),
    category: Je(c.category),
    scope: (Je(c.scope) === r, r),
    confidence: xp(c.confidence),
    reason: Je(c.reason).slice(0, 160)
  })).filter((c) => c.label && u.has(c.label)) : [];
}
function _v(n) {
  const u = new Set(n.rawTags);
  return n.cardDigest.evidenceSections.forEach((r) => {
    r.matchedTags.forEach((c) => u.add(c));
  }), n.cardDigest.firstMesDigest.characterIntroEvidence.forEach((r) => {
    r.matchedTags.forEach((c) => u.add(c));
  }), u;
}
function Sv(n, u) {
  const r = /* @__PURE__ */ new Set(), c = n.openings.find((p) => p.scenarioId === u);
  c?.matchedTags.forEach((p) => r.add(p)), c?.linkedEvidence?.forEach((p) => {
    p.matchedTags.forEach((g) => r.add(g));
  });
  const m = Ue(
    [c?.title, c?.contentExcerpt, ...c?.linkedEvidence?.map((p) => p.text) ?? []].filter(Boolean).join(" ")
  );
  return n.localCandidateTags.forEach((p) => {
    const g = Ue(p.label), M = p.matchedSnippets.some((y) => {
      const h = Ue(y).slice(0, 24);
      return h.length >= 2 && m.includes(h);
    });
    (g && m.includes(g) || M) && r.add(p.label);
  }), r;
}
function Av(n, u) {
  if (!Array.isArray(n))
    return [];
  const r = /* @__PURE__ */ new Set(["card", "scenario", "world", "cast"]), c = /* @__PURE__ */ new Set();
  return n.filter(Yl).map((m) => {
    const p = Je(m.label).trim().slice(0, 24), g = Je(m.scope);
    return {
      label: p,
      category: Je(m.category).trim().slice(0, 24) || void 0,
      scope: r.has(g) ? g : "card",
      confidence: xp(m.confidence),
      reason: Je(m.reason).slice(0, 180),
      evidence: Je(m.evidence).slice(0, 180)
    };
  }).filter((m) => m.label && m.reason && m.evidence && !u.has(m.label)).filter((m) => {
    const p = `${m.scope}:${m.label}`;
    return c.has(p) ? !1 : (c.add(p), !0);
  }).slice(0, 8);
}
function xv(n, u, r) {
  const c = new Set(r.openings.map((m) => m.scenarioId));
  return Array.isArray(n) ? n.filter(Yl).map((m) => {
    const p = Je(m.scenarioId), g = r.openings.find((y) => y.scenarioId === p)?.title ?? "未识别线路", M = Sv(r, p);
    return {
      scenarioId: p,
      scenarioName: Je(m.scenarioName) || g,
      tags: fs(m.tags, u, "scenario").filter((y) => M.has(y.label))
    };
  }).filter((m) => c.has(m.scenarioId)) : [];
}
function Tv(n, u) {
  const r = new Set(u.openings.map((c) => c.scenarioId));
  return Array.isArray(n) ? n.filter(Yl).map((c) => ({
    scenarioId: Je(c.scenarioId),
    summary: Je(c.summary).slice(0, 120)
  })).filter((c) => r.has(c.scenarioId) && c.summary) : [];
}
function gs(n, u, r) {
  const c = el(n), m = or(n);
  return {
    cardId: n.id,
    cardType: Ap(n),
    baseTags: c.filter((p) => p.scopeHint === "card").slice(0, 6).map((p) => ({
      label: p.label,
      category: p.category,
      scope: "card",
      confidence: Math.min(0.72, p.score / 20),
      reason: "AI 分析失败，暂用本地候选标签兜底。"
    })),
    scenarioTags: n.scenarioOpenings.map((p) => ({
      scenarioId: p.id,
      scenarioName: p.title,
      tags: c.filter((g) => g.scopeHint === "scenario").slice(0, 5).map((g) => ({
        label: g.label,
        category: g.category,
        scope: "scenario",
        confidence: Math.min(0.68, g.score / 20),
        reason: "AI 分析失败，暂用本地候选标签兜底。"
      }))
    })),
    worldTags: [],
    castTags: [],
    suggestedTags: [],
    oneLineSummary: "这张卡还没被 AI 读明白，先按本地闻到的味儿挂起待重审。",
    scenarioOneLineSummaries: [],
    warnings: [u],
    localCandidateTags: c,
    generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    sourceHash: m,
    debug: r
  };
}
function Mv(n, u, r, c) {
  if (!Yl(n)) {
    const D = c ? { ...c, validationErrors: [...c.validationErrors, "AI 返回的单卡结果不是对象。"] } : void 0;
    return gs(u, "AI 返回的单卡结果不是对象。", D);
  }
  const m = el(u), p = new Set(r.localCandidateTags.map((D) => D.label)), g = _v(r), M = Je(n.cardType), y = hv(n.warnings);
  Je(n.cardId) !== u.id && y.push(`AI 返回 cardId 不匹配，已按输入卡 ${u.id} 归档。`);
  const h = {
    cardId: u.id,
    cardType: mv.includes(M) ? M : Ap(u),
    baseTags: fs(n.baseTags, p, "card").filter((D) => g.has(D.label)),
    scenarioTags: xv(n.scenarioTags, p, r),
    worldTags: fs(n.worldTags, p, "world"),
    castTags: fs(n.castTags, p, "cast"),
    suggestedTags: Av(n.suggestedTags, p),
    oneLineSummary: Je(n.oneLineSummary).slice(0, 140) || "这张卡的核心冲突还没被模型说利索，先记为待重审。",
    scenarioOneLineSummaries: Tv(n.scenarioOneLineSummaries, r),
    warnings: y,
    localCandidateTags: m,
    generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    sourceHash: or(u),
    debug: c
  };
  if (h.baseTags.length + h.scenarioTags.flatMap((D) => D.tags).length === 0 && (h.warnings.push("AI 没有从候选标签中选出有效标签。"), h.debug?.validationErrors.push("AI 没有从候选标签中选出有效标签。")), h.debug) {
    const { debug: D, ..._ } = h;
    h.debug.parsedCardAnalysisResult = _;
  }
  return h;
}
async function Ev(n, u) {
  if (!u.baseUrl.trim() || !u.apiKey.trim() || !u.model.trim())
    throw new ar("AI 配置不完整：请检查 Base URL、API Key 和 Model。", 0);
  let r = "", c;
  for (let m = 0; m <= u.maxRetries; m += 1) {
    const p = new AbortController(), g = globalThis.setTimeout(
      () => p.abort(new DOMException(`请求超过 ${Math.round(u.timeoutMs / 1e3)} 秒未完成，已自动停止。`, "TimeoutError")),
      u.timeoutMs
    );
    try {
      const M = await mr(u, "/chat/completions", {
        method: "POST",
        body: JSON.stringify(Mp(n, u)),
        signal: p.signal
      });
      if (!M.ok) {
        const D = await M.text();
        throw c = M.status, new Error(`HTTP ${M.status}: ${D.slice(0, 300)}`);
      }
      const y = await M.json(), h = y.choices?.[0]?.message?.content;
      if (!h) {
        const D = typeof y.error == "string" ? y.error : y.error && typeof y.error == "object" && "message" in y.error ? String(y.error.message ?? "") : "";
        throw new Error(D || "AI 返回格式不是 Chat Completions：缺少 choices[0].message.content。");
      }
      return { content: h, rawApiResponse: y, usage: y.usage };
    } catch (M) {
      r = p.signal.aborted ? `请求超过 ${Math.round(u.timeoutMs / 1e3)} 秒未完成，已自动停止。可以调大 timeoutMs，或减少 batchSize 后重试。` : M instanceof Error ? M.message : "未知请求错误";
    } finally {
      globalThis.clearTimeout(g);
    }
  }
  throw new ar(`AI 请求失败：${r}`, u.maxRetries, c);
}
async function Cv(n, u, r) {
  const c = n.map((_) => Zn(_, r?.get(_.id))), { content: m, rawApiResponse: p, usage: g } = await Ev(c, u), M = Sp(m);
  if (!M.ok)
    return n.map((_, A) => {
      const x = {
        ...Yn(c, u, A),
        rawApiResponse: p,
        apiUsage: g,
        parseWarnings: [`AI 返回 JSON 解析失败：${M.error}`]
      };
      return gs(_, `AI 返回 JSON 解析失败：${M.error}`, x);
    });
  const y = Array.isArray(M.value.results) ? M.value.results : [], h = /* @__PURE__ */ new Map();
  y.length !== n.length && n.forEach((_) => {
    h.set(_.id, [`AI 返回 results 数量 ${y.length} 与输入 ${n.length} 不一致。`]);
  });
  const D = /* @__PURE__ */ new Map();
  return y.filter(Yl).forEach((_) => {
    D.set(Je(_.cardId), _);
  }), n.map((_, A) => {
    const x = c[A], B = D.get(_.id) ?? y[A];
    if (!B) {
      const Q = { ...Yn(c, u, A), rawApiResponse: p, apiUsage: g, parseWarnings: ["AI 没有返回这张卡的结果。"] };
      return gs(_, "AI 没有返回这张卡的结果。", Q);
    }
    const L = {
      ...Yn(c, u, A),
      rawApiResponse: p,
      apiUsage: g,
      parseWarnings: h.get(_.id) ?? []
    }, w = Mv(B, _, x, L);
    w.usage = r?.get(_.id), w.warnings.push(...h.get(_.id) ?? []);
    try {
      qh(w);
    } catch {
    }
    return w;
  });
}
function zv(n, u) {
  return sa(JSON.stringify(Zn(n, u)));
}
function jv(n) {
  const u = n.toLowerCase();
  return u.includes("gemini") ? yv : u.includes("flash") || u.includes("long") || u.includes("128k") || u.includes("200k") ? gv : pv;
}
function Nv(n, u, r, c) {
  const m = [];
  let p = [], g = sa(er) + sa(tr);
  return n.forEach((M) => {
    const y = zv(M, c?.get(M.id)), h = p.length >= u, D = p.length > 0 && g + y > r;
    (h || D) && (m.push(p), p = [], g = sa(er) + sa(tr)), p.push(M), g += y;
  }), p.length > 0 && m.push(p), m;
}
function rs(n) {
  return n.filter(
    (u) => !u.debug?.error && u.warnings.every(
      (r) => !r.includes("AI 配置不完整") && !r.includes("AI 请求失败") && !r.includes("AI 返回 JSON 解析失败") && !r.includes("AI 没有返回") && !r.includes("AI 返回的单卡结果不是对象") && !r.includes("AI 没有从候选标签中选出有效标签")
    )
  ).length;
}
async function Ep(n, u, r, c) {
  const m = Math.max(1, u.batchSize), p = jv(u.model), g = new Map(n.map((w) => [w.id, up(w)])), M = n.filter((w) => !g.get(w.id)), y = Nv(M, m, p, c), h = y.length, D = n.flatMap((w) => {
    const Q = g.get(w.id);
    return Q ? [{ ...Q, usage: Q.usage ?? c?.get(w.id) }] : [];
  });
  let _ = 0, A = 0, x = "", B = 0;
  r?.({
    cardsRead: n.length,
    cardsToAnalyze: M.length,
    currentBatch: 0,
    totalBatches: h,
    batchSize: m,
    maxBatchInputTokens: p,
    completedCards: D.length,
    successfulCards: rs(D),
    failedCards: A,
    failedBatches: _,
    status: "running"
  });
  for (let w = 0; w < h; w += 1) {
    const Q = y[w];
    B = w + 1, r?.({
      cardsRead: n.length,
      cardsToAnalyze: M.length,
      currentBatch: w + 1,
      totalBatches: h,
      batchSize: m,
      maxBatchInputTokens: p,
      completedCards: D.length,
      successfulCards: rs(D),
      failedCards: A,
      failedBatches: _,
      currentCardName: Q[0]?.name,
      status: "running"
    });
    try {
      D.push(...await Cv(Q, u, c));
    } catch (ne) {
      _ += 1;
      const F = Q.map((ie) => Zn(ie, c?.get(ie.id)));
      x = ne instanceof Error ? ne.message : "这批 AI 请求失败，已停止后续批次。", A += Q.length, D.push(
        ...Q.map((ie, V) => {
          const J = ne instanceof ar ? ne : void 0, Y = Yn(F, u, V);
          return Y.error = {
            statusCode: J?.statusCode,
            message: x,
            retryCount: J?.retryCount ?? u.maxRetries,
            failedBatchIndex: w + 1
          }, gs(ie, x, Y);
        })
      ), r?.({
        cardsRead: n.length,
        cardsToAnalyze: M.length,
        currentBatch: w + 1,
        totalBatches: h,
        batchSize: m,
        maxBatchInputTokens: p,
        completedCards: D.length,
        successfulCards: rs(D),
        failedCards: A,
        failedBatches: _,
        currentCardName: Q[0]?.name,
        status: "failed",
        errorMessage: x
      });
      break;
    }
  }
  const L = n.flatMap((w) => {
    const Q = D.find((ne) => ne.cardId === w.id);
    return Q ? [Q] : [];
  });
  return r?.({
    cardsRead: n.length,
    cardsToAnalyze: M.length,
    currentBatch: x ? B : h,
    totalBatches: h,
    batchSize: m,
    maxBatchInputTokens: p,
    completedCards: L.length,
    successfulCards: rs(L),
    failedCards: A,
    failedBatches: _,
    status: x ? "failed" : "completed",
    errorMessage: x || void 0
  }), L;
}
const Ov = /* @__PURE__ */ new Set(["角色气质", "情感走向", "世界观题材", "身份阶层", "互动机制"]), Dv = ["AI 没有从候选标签中选出有效标签"];
function hs(n) {
  return Math.round(n * 100) / 100;
}
function Rv(n) {
  return Math.max(0.2, Math.min(1, n.confidence || 0.5));
}
function Hv(n) {
  return n ? 1 + Math.log1p(n.totalMessages) / 4 + n.chatCount * 0.25 : 1;
}
function Cp(n, u) {
  const r = n?.scenarioStats.find((c) => c.scenarioId === u);
  return !r || r.totalMessages < 12 || r.chatCount < 1 ? 0 : r.totalMessages + r.chatCount * 8 + (r.activeDays ?? 0) * 4;
}
function Xn(n, u) {
  return n.get(u)?.name ?? u;
}
function Uv(n, u) {
  return `${n.trim()}::${u.trim()}`;
}
function ep(n, u, r, c, m, p) {
  const g = Uv(u.label, u.category), M = n.get(g), y = m * Rv(u), h = M ?? {
    label: u.label,
    category: u.category,
    scope: u.scope,
    frequency: 0,
    cardCount: 0,
    scenarioCount: 0,
    weightedScore: 0,
    representativeCardId: r.cardId,
    representativeCardName: Xn(c, r.cardId),
    representativeScenarioId: p?.id,
    representativeScenarioName: p?.name,
    reasons: [],
    cardIds: /* @__PURE__ */ new Set(),
    scenarioIds: /* @__PURE__ */ new Set()
  };
  h.frequency += 1, h.weightedScore += y, h.cardIds.add(r.cardId), p && h.scenarioIds.add(`${r.cardId}:${p.id}`), h.scope !== u.scope && (h.scope = "mixed"), y >= h.weightedScore / Math.max(1, h.frequency) && (h.representativeCardId = r.cardId, h.representativeCardName = Xn(c, r.cardId), h.representativeScenarioId = p?.id, h.representativeScenarioName = p?.name), u.reason && h.reasons.length < 4 && h.reasons.push(u.reason), n.set(g, h);
}
function Ju(n, u, r, c) {
  const m = Array.from(new Set(u)).sort((p, g) => p.localeCompare(g, "zh-Hans-CN"));
  for (let p = 0; p < m.length; p += 1)
    for (let g = p + 1; g < m.length; g += 1) {
      const M = [m[p], m[g]], y = M.join("::"), h = n.get(y) ?? {
        labels: M,
        count: 0,
        weightedScore: 0,
        exampleCardIds: []
      };
      h.count += 1, h.weightedScore += c, !h.exampleCardIds.includes(r.cardId) && h.exampleCardIds.length < 4 && h.exampleCardIds.push(r.cardId), n.set(y, h);
    }
}
function Bv(n, u) {
  return n.map((r) => {
    const c = [...r.baseTags, ...r.worldTags, ...r.castTags].map((p) => p.label), m = (r.usage?.totalMessages ?? 0) + (r.usage?.chatCount ?? 0) * 8 + c.length;
    return {
      cardId: r.cardId,
      name: Xn(u, r.cardId),
      score: hs(m),
      tags: Array.from(new Set(c)).slice(0, 8),
      oneLineSummary: r.oneLineSummary
    };
  }).sort((r, c) => c.score - r.score).slice(0, 5);
}
function wv(n, u) {
  return n.flatMap(
    (r) => r.scenarioTags.map((c) => {
      const p = u.get(r.cardId)?.scenarioOpenings.find((D) => D.id === c.scenarioId), g = r.usage?.scenarioStats.find((D) => D.scenarioId === c.scenarioId), M = r.scenarioOneLineSummaries.find((D) => D.scenarioId === c.scenarioId)?.summary || (p?.text.trim() ? p.text.trim().slice(0, 90) : void 0), y = Cp(r.usage, c.scenarioId), h = y > 0 ? y + c.tags.length * 0.35 : 0;
      return {
        cardId: r.cardId,
        cardName: Xn(u, r.cardId),
        scenarioId: c.scenarioId,
        scenarioName: c.scenarioName,
        score: hs(h),
        tags: c.tags.map((D) => D.label).slice(0, 8),
        summary: M,
        totalMessages: g?.totalMessages,
        chatCount: g?.chatCount
      };
    })
  ).filter((r) => r.score > 0 && (r.totalMessages ?? 0) >= 12).sort((r, c) => c.score - r.score).slice(0, 5);
}
function qv(n, u) {
  const r = n.slice(0, 4).map((m) => m.label), c = u[0]?.labels.join(" + ");
  return r.length === 0 ? "还没有足够的已分析卡片。小票机已经通电，但收银员现在只能尴尬微笑。" : c ? `你反复回购的不是单个标签，而是「${c}」这种组合拳。${r.join("、")}一起出现时，CharaLog 已经能闻到固定口味了。` : `目前最扎眼的是 ${r.join("、")}。不是说你只吃这一口，是这几口已经开始在柜台上排队结账。`;
}
function Lv(n) {
  return vs.tags.filter((u) => Ov.has(u.category) && !n.has(u.label)).map((u) => ({ tag: u, sort: Math.random() })).sort((u, r) => u.sort - r.sort).slice(0, 10).map(({ tag: u }) => ({
    id: u.id,
    label: u.label,
    category: u.category,
    family: u.family
  }));
}
function Pa(n, u, r = {}) {
  const c = new Map(n.map((_) => [_.id, _])), m = u.filter(
    (_) => c.has(_.cardId) && _.sourceHash !== "usage-seed" && _.sourceHash !== "st-test-usage-seed" && !_.warnings.includes("pending-analysis") && !_.warnings.includes("st-test-usage-seed") && !_.debug?.error
  ), p = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Map();
  m.forEach((_) => {
    const A = Hv(_.usage), x = [..._.baseTags, ..._.worldTags, ..._.castTags];
    x.forEach((B) => ep(p, B, _, c, A)), Ju(g, x.map((B) => B.label), _, A), _.scenarioTags.forEach((B) => {
      const L = Cp(_.usage, B.scenarioId);
      L <= 0 || (B.tags.forEach(
        (w) => ep(p, w, _, c, L, {
          id: B.scenarioId,
          name: B.scenarioName
        })
      ), Ju(g, B.tags.map((w) => w.label), _, L), Ju(g, [...x.map((w) => w.label), ...B.tags.map((w) => w.label)], _, L * 0.65));
    });
  });
  const M = Array.from(p.values()).map(({ cardIds: _, scenarioIds: A, ...x }) => ({
    ...x,
    cardCount: _.size,
    scenarioCount: A.size,
    weightedScore: hs(x.weightedScore)
  })).sort((_, A) => A.weightedScore - _.weightedScore || A.frequency - _.frequency), y = Array.from(g.values()).map((_) => ({ ..._, weightedScore: hs(_.weightedScore) })).filter((_) => _.count >= 3 && _.exampleCardIds.length >= 2).sort((_, A) => A.weightedScore - _.weightedScore || A.count - _.count).slice(0, 30), h = new Set(M.map((_) => _.label)), D = [
    ...r.extraWarnings ?? [],
    ...m.flatMap((_) => _.warnings.map((A) => `${Xn(c, _.cardId)}: ${A}`))
  ].filter((_) => !Dv.some((A) => _.includes(A))).slice(0, 30);
  return {
    id: "taste-profile-local",
    title: r.title || "你的XP小票",
    summary: r.aiSections?.[0]?.body ?? qv(M, y),
    baseTags: m.flatMap((_) => _.baseTags).slice(0, 16),
    characterUsages: m.map((_) => _.usage).filter((_) => !!_),
    analyzedCardCount: m.length,
    tagStats: M,
    coOccurrences: y,
    absentTags: Lv(h),
    representativeCharacters: Bv(m, c),
    representativeScenarios: wv(m, c),
    aiSections: r.aiSections ?? [],
    warnings: D,
    debug: r.debug,
    generatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
}
const Gv = "你现在是用户的“毒舌闺蜜”。你拥有一双看透一切的慧眼，刚刚翻阅了用户在 SillyTavern里资料。你的任务是为ta生成一份专属的「赛博口味与XP体检报告」。Tone：幽默、辛辣、一针见血、网感十足。态度：表面嫌弃吐槽，实则包容宠溺。你可以无情揭穿ta的隐藏癖好，但**绝对不能**进行真正的道德批判、说教或让人感到羞耻。要在吐槽中透出“虽然你XP很邪门，但谁让你是我姐妹/兄弟，我懂你”的亲密感。输出严格 JSON，不要 markdown，不要解释，不要额外文字。", Yv = `输出结构必须是：
{
  "headline": "string",
  "sections": [
    {
      "title": "string",
      "body": "string",
      "relatedTags": ["string"]
    }
  ],
  "warnings": []
}
要求：
1. 👑 【专属称号】
用极其精辟、带梗的四到八个字概括ta的核心口味。
这个称号必须放在 headline 字段里，不要再作为 sections 的一段重复输出。

2. 📊 【XP 灵魂成分表】
根据数据，列出 3-4 个构成ta品味的核心成分及百分比，并用一句简短的话吐槽。
(例如：🩹 创伤救赎综合征 40% - “你是来谈恋爱的还是来当赛博华佗的？”)
只输出一次 XP 灵魂成分表，不要在多个 section 中重复同一张成分表。

3. 🔍 【闺蜜的无情阅卷：剧情与人设分析】
从数据中深挖规律，犀利点出ta最无法抗拒的“套路”。（例如ta吃软不吃硬？还是就喜欢被虐？）把ta那点藏不住的xp底裤给我扒出来。

4. 📈 【赛博海王/寡王鉴定：行为数据大起底】
从数据中吐槽ta的“赛博精力”和“专一程度”。可以贴脸调侃，也可以调侃ta的赛博作息和肝度。

事实规则：
- 你只能基于 topTags、representativeCharacters、representativeScenarios 和 reasons 下结论。
- behaviorSummary 和 usageHighlights 只代表使用习惯：玩得久、最近还在玩、隔一阵回坑、一次性尝鲜。可以用它们判断“复购感”和“上头后冷却”，但不要当成现实人格判断。
- 不要自行纠正单卡标签，不要写“某标签其实不成立”这类 warnings；除非输入 warnings 已经明确指出。
- 如果某角色带有“联姻/相亲”等标签，不要臆测为“角色拒绝婚姻”。要看 reasons 和一句话总结：可能是接受联姻、把婚姻当筹码、或把爱情排除在婚姻之外。
- warnings 只放数据质量问题，不放你对剧情设定的主观纠偏。`, tp = 1200;
class lr extends Error {
  statusCode;
  retryCount;
  constructor(u, r, c) {
    super(u), this.name = "TasteProfileRequestError", this.retryCount = r, this.statusCode = c;
  }
}
function ap(n) {
  if (!n)
    return;
  const u = Date.parse(n);
  if (Number.isFinite(u))
    return Math.max(0, Math.floor((Date.now() - u) / 864e5));
}
function lp(n, u = 3) {
  return (n ?? []).map((r, c) => ({ hour: c, count: r })).filter((r) => r.count > 0).sort((r, c) => c.count - r.count).slice(0, u);
}
function Xv(n, u) {
  const r = n.characterUsages.filter((y) => y.chatCount > 0 || y.totalMessages > 0), c = new Set(r.map((y) => y.characterId)), m = /* @__PURE__ */ new Set([
    ...n.representativeCharacters.map((y) => y.cardId),
    ...n.characterUsages.map((y) => y.characterId)
  ]), p = r.filter((y) => {
    const h = ap(y.lastActiveAt);
    return typeof h == "number" && h <= 30;
  }), g = r.filter((y) => (y.activeDays ?? 0) >= 3), M = r.reduce(
    (y, h) => y.map((D, _) => D + (h.activeHourBuckets?.[_] ?? 0)),
    Array.from({ length: 24 }, () => 0)
  );
  return {
    collectedCardCount: u.length,
    analyzedCardCount: n.analyzedCardCount,
    unplayedCollectedCount: Math.max(0, u.length - c.size),
    unplayedAnalyzedCount: Math.max(0, n.analyzedCardCount - r.length),
    behaviorSummary: {
      usedCardCount: r.length,
      recentlyActiveCardCount: p.length,
      longRunCardCount: g.length,
      totalChats: r.reduce((y, h) => y + h.chatCount, 0),
      totalMessages: r.reduce((y, h) => y + h.totalMessages, 0),
      averageActiveDays: r.length ? Number((r.reduce((y, h) => y + (h.activeDays ?? 0), 0) / r.length).toFixed(1)) : 0,
      topActiveHours: lp(M)
    },
    topTags: n.tagStats.slice(0, 12).map((y) => ({
      label: y.label,
      category: y.category,
      scope: y.scope,
      frequency: y.frequency,
      cardCount: y.cardCount,
      scenarioCount: y.scenarioCount,
      weightedScore: y.weightedScore,
      representativeCardName: y.representativeCardName,
      representativeScenarioName: y.representativeScenarioName,
      reasons: y.reasons.slice(0, 2)
    })),
    topCoOccurrences: n.coOccurrences.slice(0, 10).map((y) => ({
      labels: y.labels,
      count: y.count,
      weightedScore: y.weightedScore
    })),
    absentTags: n.absentTags.map((y) => ({
      label: y.label,
      category: y.category,
      family: y.family
    })),
    representativeCharacters: n.representativeCharacters,
    representativeScenarios: n.representativeScenarios,
    usageHighlights: r.map((y) => ({
      characterId: y.characterId,
      cardName: u.find((h) => h.id === y.characterId)?.name,
      chatCount: y.chatCount,
      totalMessages: y.totalMessages,
      activeDays: y.activeDays ?? 0,
      daysSinceLastActive: ap(y.lastActiveAt),
      topActiveHours: lp(y.activeHourBuckets, 2)
    })).sort((y, h) => h.totalMessages - y.totalMessages || h.activeDays - y.activeDays).slice(0, 12),
    unplayedSample: u.filter((y) => !c.has(y.id)).slice(0, 12).map((y) => ({
      cardId: y.id,
      cardName: y.name,
      analyzed: m.has(y.id)
    })),
    warnings: n.warnings.slice(0, 12)
  };
}
function zp(n, u) {
  return [
    { role: "system", content: Gv },
    {
      role: "user",
      content: `${Yv}

请基于这份本地统计生成“你的XP小票”说破文案：
${JSON.stringify(Xv(n, u))}`
    }
  ];
}
function jp(n, u, r) {
  return {
    model: r.model,
    temperature: 0.65,
    response_format: { type: "json_object" },
    messages: zp(n, u)
  };
}
function Np(n, u, r) {
  const c = zp(n, u), m = c[0].content, p = c[1].content, g = sa(m), M = sa(p);
  return {
    messages: c,
    systemPrompt: m,
    userPrompt: p,
    requestPayloadPreview: jp(n, u, r),
    tokenEstimate: {
      systemPromptTokens: g,
      userPromptTokens: M,
      totalInputTokens: g + M,
      estimatedOutputTokenLimit: tp,
      estimatedTotalTokens: g + M + tp
    },
    parseWarnings: [],
    validationErrors: []
  };
}
function ds(n) {
  return typeof n == "string" ? n : "";
}
function Qv(n, u, r) {
  return Array.isArray(n) ? n.filter((c) => typeof c == "object" && c !== null).map((c) => ({
    title: ds(c.title).slice(0, 40),
    body: ds(c.body).slice(0, 260),
    relatedTags: Array.isArray(c.relatedTags) ? c.relatedTags.map(ds).filter((m) => u.has(m)).slice(0, 8) : []
  })).filter((c) => c.title && c.body).slice(0, 5) : (r.push("AI 返回 sections 不是数组。"), []);
}
function Iu(n) {
  const u = n.tagStats.slice(0, 6).map((p) => p.label), r = n.coOccurrences[0]?.labels, c = n.representativeScenarios[0], m = n.absentTags.slice(0, 4).map((p) => p.label).join("、");
  return [
    {
      title: "小票抬头",
      body: r ? `你这里最稳定的不是单口味，是「${r.join(" + ")}」这种打包购买。不是随便酸一下，是权重、距离、拉扯和那点不肯明说的偏心一起上桌。` : `目前最显眼的是 ${u.join("、") || "暂无标签"}。小票不够长，但味儿已经开始冒头了。`,
      relatedTags: u.slice(0, 4)
    },
    {
      title: "最上头线路",
      body: c ? `代表线路先记 ${c.cardName} 的「${c.scenarioName}」。你不是只看角色设定，你会在特定开场里反复确认那条关系线到底能不能失控。` : "线路数据还不够，小票机只能先看卡面。等更多卡分析完，哪条线最会让你续杯就藏不住了。",
      relatedTags: c?.tags.slice(0, 4) ?? []
    },
    {
      title: "本期没买",
      body: m ? `有些味型这轮几乎没出现，比如 ${m}。这不代表你绝对不吃，只说明当前卡库暂时没把它们摆上收银台。` : "词典里的冷门项暂时没有明显缺席，说明这批卡已经够杂，CharaLog 需要再精算一下。",
      relatedTags: []
    }
  ];
}
async function Zv(n, u, r) {
  if (!r.baseUrl.trim() || !r.apiKey.trim() || !r.model.trim())
    throw new lr("AI 配置不完整：请检查 Base URL、API Key 和 Model。", 0);
  let c = "", m;
  for (let p = 0; p <= r.maxRetries; p += 1) {
    const g = new AbortController(), M = globalThis.setTimeout(
      () => g.abort(new DOMException(`请求超过 ${Math.round(r.timeoutMs / 1e3)} 秒未完成，已自动停止。`, "TimeoutError")),
      r.timeoutMs
    );
    try {
      const y = await mr(r, "/chat/completions", {
        method: "POST",
        body: JSON.stringify(jp(n, u, r)),
        signal: g.signal
      });
      if (!y.ok) {
        const _ = await y.text();
        throw m = y.status, new Error(`HTTP ${y.status}: ${_.slice(0, 300)}`);
      }
      const h = await y.json(), D = h.choices?.[0]?.message?.content;
      if (!D)
        throw new Error("响应里没有 choices[0].message.content。");
      return { content: D, rawApiResponse: h, usage: h.usage };
    } catch (y) {
      c = g.signal.aborted ? `请求超过 ${Math.round(r.timeoutMs / 1e3)} 秒未完成，已自动停止。可以调大 timeoutMs 后重试。` : y instanceof Error ? y.message : "未知请求错误";
    } finally {
      globalThis.clearTimeout(M);
    }
  }
  throw new lr(`XP 小票 AI 请求失败：${c}`, r.maxRetries, m);
}
function Vv(n, u, r) {
  return Np(Pa(n, u), n, r);
}
async function Kv(n, u, r) {
  const c = Pa(n, u), m = Np(c, n, r);
  try {
    const { content: p, rawApiResponse: g, usage: M } = await Zv(c, n, r), y = Sp(p);
    if (m.rawApiResponse = g, m.apiUsage = M, !y.ok)
      return m.parseWarnings.push(`AI 返回 JSON 解析失败：${y.error}`), Pa(n, u, {
        aiSections: Iu(c),
        debug: m,
        extraWarnings: [`XP 小票 AI JSON 解析失败：${y.error}`]
      });
    const h = new Set(c.tagStats.map((A) => A.label)), D = [], _ = Qv(y.value.sections, h, D);
    return m.validationErrors.push(...D), m.parsedTasteProfile = y.value, _.length === 0 ? (m.validationErrors.push("AI 没有返回可用的小票段落，已使用本地兜底。"), Pa(n, u, {
      aiSections: Iu(c),
      debug: m,
      extraWarnings: ["AI 没有返回可用的小票段落，已使用本地兜底。"]
    })) : Pa(n, u, {
      title: ds(y.value.headline).slice(0, 32) || void 0,
      aiSections: _,
      debug: m
    });
  } catch (p) {
    const g = p instanceof lr ? p : void 0;
    return m.error = {
      statusCode: g?.statusCode,
      message: p instanceof Error ? p.message : "XP 小票 AI 请求失败。",
      retryCount: g?.retryCount ?? r.maxRetries
    }, Pa(n, u, {
      aiSections: Iu(c),
      debug: m,
      extraWarnings: [m.error.message]
    });
  }
}
async function Jv(n) {
  if (!n.baseUrl.trim() || !n.apiKey.trim() || !n.model.trim())
    return !1;
  for (let u = 0; u <= n.maxRetries; u += 1) {
    const r = new AbortController(), c = window.setTimeout(() => r.abort(), n.timeoutMs);
    try {
      if ((await mr(n, "/models", {
        method: "GET",
        signal: r.signal
      })).ok)
        return !0;
    } catch {
    } finally {
      window.clearTimeout(c);
    }
  }
  return !1;
}
const Op = "charalog.apiConfig.v1", nr = {
  baseUrl: "https://api.openai.com/v1",
  apiKey: "",
  model: "gpt-4.1-mini",
  timeoutMs: 12e4,
  maxRetries: 2,
  batchSize: 8,
  enableDebugMode: !1
};
function Iv() {
  return dp() ? {
    ...nr,
    baseUrl: fp,
    apiKey: "sillytavern",
    model: "sillytavern-current",
    maxRetries: 0
  } : nr;
}
function np(n) {
  const u = Number.isFinite(n.timeoutMs) && n.timeoutMs > 3e4 ? n.timeoutMs : nr.timeoutMs;
  return {
    ...n,
    timeoutMs: u
  };
}
function kv() {
  const n = Iv();
  if (typeof localStorage > "u")
    return n;
  const u = localStorage.getItem(Op);
  if (!u)
    return n;
  try {
    const r = JSON.parse(u);
    return dp() ? np({
      ...n,
      timeoutMs: r.timeoutMs ?? n.timeoutMs,
      batchSize: r.batchSize ?? n.batchSize,
      enableDebugMode: r.enableDebugMode ?? n.enableDebugMode
    }) : np({
      ...n,
      ...r
    });
  } catch {
    return n;
  }
}
function $v(n) {
  typeof localStorage > "u" || localStorage.setItem(Op, JSON.stringify(n));
}
const gr = {
  single: "单人卡",
  multi_scenario: "多线路卡",
  group: "群像卡",
  world: "世界观卡"
}, Dp = {
  single_character: "单人卡",
  single_character_multi_scenario: "多线路卡",
  multi_character: "群像卡",
  world_setting: "世界观卡",
  fandom: "同人卡",
  scenario_collection: "线路合集",
  unknown: "未知类型"
};
function Wv(n) {
  return n === "single" ? "single_character" : n === "multi_scenario" ? "single_character_multi_scenario" : n === "group" ? "multi_character" : n === "world" ? "world_setting" : "unknown";
}
function Fv(n, u) {
  return {
    cardId: n.id,
    cardType: Wv(n.cardType),
    baseTags: [],
    scenarioTags: [],
    worldTags: [],
    castTags: [],
    suggestedTags: [],
    oneLineSummary: "已读取使用记录，等待 AI 分析。",
    scenarioOneLineSummaries: [],
    warnings: ["pending-analysis", "尚未调用 AI，当前结果只用于保留使用记录。"],
    localCandidateTags: el(n),
    usage: u,
    generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    sourceHash: "usage-seed"
  };
}
function ir(n) {
  return !!(n && (n.sourceHash === "usage-seed" || n.sourceHash === "st-test-usage-seed" || n.warnings.includes("pending-analysis") || n.warnings.includes("st-test-usage-seed")));
}
function ms(n) {
  return !!(n && !ir(n) && !n.debug?.error);
}
const Rp = "charalog.tasteProfile.v1";
function Pv() {
  try {
    const n = localStorage.getItem(Rp);
    return n ? JSON.parse(n) : void 0;
  } catch {
    return;
  }
}
function e1(n) {
  try {
    localStorage.setItem(Rp, JSON.stringify(n));
  } catch {
  }
}
function t1(n) {
  if (!n)
    return "暂无";
  const u = Date.parse(n);
  if (!Number.isFinite(u))
    return "暂无";
  const r = Math.max(0, Math.floor((Date.now() - u) / 864e5));
  return r === 0 ? "今天" : r === 1 ? "昨天" : `${r} 天前`;
}
function a1() {
  const n = ae.useMemo(() => os(), []), u = !!n, r = [], [c, m] = ae.useState("library"), [p, g] = ae.useState(r), [M, y] = ae.useState(r[0]?.id), [h, D] = ae.useState(() => kv()), [_, A] = ae.useState(() => Pv()), [x, B] = ae.useState({
    phase: u ? "characters" : "idle",
    totalCharacters: r.length,
    loadedCharacters: 0,
    loadedChats: 0
  }), [L, w] = ae.useState(
    () => []
  ), Q = p.find((J) => J.id === M) ?? p[0], ne = (J) => {
    D(J), $v(J);
  }, F = ae.useMemo(
    () => ({
      cardCount: p.length,
      scenarioCount: p.reduce((J, Y) => J + Y.scenarioOpenings.length, 0),
      chatCount: L.reduce((J, Y) => J + (Y.usage?.chatCount ?? 0), 0)
    }),
    [L, p]
  );
  ae.useEffect(() => {
    if (!n)
      return;
    let J = !1;
    return i0((Y) => {
      J || B(Y);
    }).then((Y) => {
      J || !Y?.cards.length || (g(Y.cards), y((se) => se && Y.cards.some((me) => me.id === se) ? se : Y.cards[0]?.id), w((se) => {
        const me = new Map(se.map((et) => [et.cardId, et]));
        return Y.cards.map((et) => {
          const $ = Y.usageByCardId.get(et.id), Me = me.get(et.id);
          if (Me && !ir(Me))
            return { ...Me, usage: $ ?? Me.usage };
          const Ie = up(et);
          return Ie && !ir(Ie) ? { ...Ie, usage: $ ?? Ie.usage } : Fv(et, $);
        });
      }), B((se) => ({
        ...se,
        phase: "done",
        totalCharacters: Y.cards.length,
        loadedCharacters: Y.cards.length,
        loadedChats: se.loadedChats
      })));
    }), () => {
      J = !0;
    };
  }, [n]);
  function ie(J) {
    w((Y) => {
      const se = new Map(Y.map((me) => [me.cardId, me]));
      return J.forEach((me) => se.set(me.cardId, h.enableDebugMode ? me : { ...me, debug: void 0 })), Array.from(se.values());
    });
  }
  function V(J, Y) {
    w(
      (se) => se.map((me) => me.cardId === J ? { ...me, usage: Y } : me)
    );
  }
  return /* @__PURE__ */ f.jsxs("main", { className: "app-shell", children: [
    /* @__PURE__ */ f.jsxs("aside", { className: "sidebar", children: [
      /* @__PURE__ */ f.jsxs("div", { className: "brand", children: [
        /* @__PURE__ */ f.jsx("div", { className: "brand-mark", children: "CL" }),
        /* @__PURE__ */ f.jsxs("div", { children: [
          /* @__PURE__ */ f.jsx("h1", { children: "CharaLog" }),
          /* @__PURE__ */ f.jsx("p", { children: "角色卡口味账本" })
        ] })
      ] }),
      /* @__PURE__ */ f.jsxs("nav", { className: "nav-list", "aria-label": "主导航", children: [
        /* @__PURE__ */ f.jsx(Ln, { icon: /* @__PURE__ */ f.jsx(vh, { size: 18 }), label: "卡库", active: c === "library", onClick: () => m("library") }),
        /* @__PURE__ */ f.jsx(Ln, { icon: /* @__PURE__ */ f.jsx(Ah, { size: 18 }), label: "角色详情", active: c === "detail", onClick: () => m("detail") }),
        /* @__PURE__ */ f.jsx(Ln, { icon: /* @__PURE__ */ f.jsx(ur, { size: 18 }), label: "分析", active: c === "analysis", onClick: () => m("analysis") }),
        /* @__PURE__ */ f.jsx(Ln, { icon: /* @__PURE__ */ f.jsx(bh, { size: 18 }), label: "XP小票", active: c === "profile", onClick: () => m("profile") }),
        /* @__PURE__ */ f.jsx(Ln, { icon: /* @__PURE__ */ f.jsx(_h, { size: 18 }), label: "设置", active: c === "settings", onClick: () => m("settings") })
      ] })
    ] }),
    /* @__PURE__ */ f.jsxs("section", { className: "content", children: [
      c === "library" && /* @__PURE__ */ f.jsx(
        n1,
        {
          stats: F,
          cards: p,
          selectedCardId: M,
          analysisResults: L,
          isSillyTavernMode: u,
          libraryProgress: x,
          onSelect: (J) => {
            y(J), m("detail");
          }
        }
      ),
      c === "detail" && Q && /* @__PURE__ */ f.jsx(
        i1,
        {
          card: Q,
          config: h,
          analysisResults: L,
          onAnalysisComplete: ie,
          onUsageUpdate: V
        }
      ),
      c === "analysis" && /* @__PURE__ */ f.jsx(
        r1,
        {
          cards: p,
          config: h,
          analysisResults: L,
          onComplete: ie,
          isSillyTavernMode: u
        }
      ),
      c === "profile" && /* @__PURE__ */ f.jsx(
        f1,
        {
          cards: p,
          analysisResults: L,
          config: h,
          savedProfile: _,
          onProfileGenerated: A
        }
      ),
      c === "settings" && /* @__PURE__ */ f.jsx(m1, { config: h, onChange: ne })
    ] })
  ] });
}
function Ln({
  icon: n,
  label: u,
  active: r,
  onClick: c
}) {
  return /* @__PURE__ */ f.jsxs("button", { className: `nav-button ${r ? "active" : ""}`, onClick: c, type: "button", children: [
    n,
    /* @__PURE__ */ f.jsx("span", { children: u })
  ] });
}
function l1({ progress: n }) {
  const u = Math.max(n.totalCharacters ?? 0, 1), r = Math.min(n.loadedCharacters ?? 0, u), c = n.phase === "done" ? 100 : Math.round(r / u * 100), m = n.phase === "done" ? "酒馆数据读取完成" : n.phase === "chat-body" ? `正在读取聊天正文：${n.currentCharacterName ?? "角色"}` : n.phase === "chat-list" ? `正在读取聊天列表：${n.currentCharacterName ?? "角色"}` : "正在读取角色卡";
  return /* @__PURE__ */ f.jsxs("section", { className: "panel library-load-panel", children: [
    /* @__PURE__ */ f.jsxs("div", { className: "section-title-row", children: [
      /* @__PURE__ */ f.jsxs("div", { children: [
        /* @__PURE__ */ f.jsx("h3", { children: m }),
        /* @__PURE__ */ f.jsxs("p", { children: [
          r,
          "/",
          n.totalCharacters ?? 0,
          " 张角色卡，已读取 ",
          n.loadedChats ?? 0,
          " 个聊天"
        ] })
      ] }),
      /* @__PURE__ */ f.jsxs("span", { children: [
        c,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ f.jsx("div", { className: "load-progress-bar", "aria-label": "酒馆数据读取进度", children: /* @__PURE__ */ f.jsx("span", { style: { width: `${c}%` } }) })
  ] });
}
function n1({
  stats: n,
  cards: u,
  selectedCardId: r,
  analysisResults: c,
  isSillyTavernMode: m,
  libraryProgress: p,
  onSelect: g
}) {
  return /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
    /* @__PURE__ */ f.jsxs("header", { className: "page-header compact", children: [
      /* @__PURE__ */ f.jsx("h2", { children: "卡库" }),
      /* @__PURE__ */ f.jsx("p", { children: m ? "正在读取酒馆角色卡和聊天记录，读完后会自动刷新卡库。" : "先把卡面、开场白和聊天入口捋清楚。" })
    ] }),
    m && /* @__PURE__ */ f.jsx(l1, { progress: p }),
    /* @__PURE__ */ f.jsxs("div", { className: "metric-row", children: [
      /* @__PURE__ */ f.jsx(Ne, { label: "角色卡", value: n.cardCount }),
      /* @__PURE__ */ f.jsx(Ne, { label: "聊天记录", value: Math.max(n.chatCount, p.loadedChats ?? 0) }),
      /* @__PURE__ */ f.jsx(Ne, { label: "已分析", value: c.filter((M) => ms(M)).length }),
      /* @__PURE__ */ f.jsx(Ne, { label: "待处理", value: Math.max(0, u.length - c.filter((M) => ms(M)).length) })
    ] }),
    /* @__PURE__ */ f.jsx("div", { className: "card-grid", children: u.map((M) => {
      const y = c.find((B) => B.cardId === M.id)?.usage, h = c.find((B) => B.cardId === M.id), D = ms(h), _ = D && h ? [...h.baseTags, ...h.suggestedTags ?? []] : [], A = y?.scenarioStats.filter((B) => B.chatCount > 0).sort((B, L) => L.totalMessages - B.totalMessages)[0], x = y?.scenarioStats.filter((B) => B.chatCount > 0).length ?? 0;
      return /* @__PURE__ */ f.jsxs(
        "button",
        {
          className: `library-card ${r === M.id ? "selected" : ""}`,
          onClick: () => g(M.id),
          type: "button",
          children: [
            /* @__PURE__ */ f.jsxs("div", { className: "card-topline", children: [
              /* @__PURE__ */ f.jsx("span", { className: "type-pill", children: h ? Dp[h.cardType] : gr[M.cardType] }),
              /* @__PURE__ */ f.jsx("span", { className: D ? "status-pill analyzed" : "status-pill pending", children: D ? "已分析" : "待处理" })
            ] }),
            /* @__PURE__ */ f.jsx("h3", { children: M.name }),
            /* @__PURE__ */ f.jsx("p", { children: D ? h?.oneLineSummary : "等待 AI 给这张卡写一句话。" }),
            A && /* @__PURE__ */ f.jsxs("p", { className: "hottest-line", children: [
              "最常玩：",
              A.openingTitle
            ] }),
            /* @__PURE__ */ f.jsx("p", { className: "library-card-meta", children: x > 0 ? `${x} 条已匹配线路` : (y?.chatCount ?? 0) > 0 ? `${y?.chatCount ?? 0} 个聊天，线路待补充` : "暂无聊天记录" }),
            /* @__PURE__ */ f.jsx("div", { className: "tag-list", children: _.slice(0, 5).map((B) => /* @__PURE__ */ f.jsx("span", { children: B.label }, `${M.id}-${B.label}`)) })
          ]
        },
        M.id
      );
    }) })
  ] });
}
function i1({
  card: n,
  config: u,
  analysisResults: r,
  onAnalysisComplete: c,
  onUsageUpdate: m
}) {
  const p = r.find(($) => $.cardId === n.id), g = p?.usage, M = p?.localCandidateTags ?? el(n), y = ms(p), h = p ? [...p.baseTags, ...p.worldTags, ...p.castTags] : [], D = ae.useMemo(() => Zn(n, g), [n, g]), _ = ae.useMemo(
    () => new Map(D.openings.map(($) => [$.scenarioId, $])),
    [D]
  ), A = ae.useMemo(() => uv(n), [n]), [x, B] = ae.useState(!1), [L, w] = ae.useState(!1), [Q, ne] = ae.useState(!1), [F, ie] = ae.useState("idle"), [V, J] = ae.useState(""), Y = u.enableDebugMode, se = p?.debug ?? bv(n, u, g);
  async function me() {
    B(!0), ie("loading"), J("正在把这张卡送去 AI 分析。");
    try {
      const $ = g ? /* @__PURE__ */ new Map([[n.id, g]]) : void 0, Me = await Ep([n], u, void 0, $);
      c(Me);
      const Ie = Me.some((at) => at.debug?.error);
      ie(Ie ? "error" : "success"), J(
        Ie ? "分析请求失败，请在设置里打开开发调试后查看错误信息。" : "分析完成，已更新标签和一句话。"
      );
    } catch ($) {
      ie("error"), J($ instanceof Error ? $.message : "分析失败。");
    } finally {
      B(!1);
    }
  }
  async function et() {
    w(!0), ie("loading"), J("正在读取这张卡的聊天摘要，用第一条角色消息匹配线路。");
    try {
      const $ = await l0(n);
      if (!$)
        throw new Error("没有读到可用的聊天记录。");
      m(n.id, $), ne(!0), ie("success"), J("线路统计已补充。");
    } catch ($) {
      ie("error"), J($ instanceof Error ? $.message : "线路统计补充失败。");
    } finally {
      w(!1);
    }
  }
  return /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
    /* @__PURE__ */ f.jsxs("header", { className: "page-header compact", children: [
      /* @__PURE__ */ f.jsx("h2", { children: n.name }),
      /* @__PURE__ */ f.jsx("p", { children: y ? p?.oneLineSummary : "已读取使用记录，等待 AI 分析。" })
    ] }),
    /* @__PURE__ */ f.jsxs("section", { className: "panel", children: [
      /* @__PURE__ */ f.jsxs("div", { className: "section-title-row", children: [
        /* @__PURE__ */ f.jsxs("div", { children: [
          /* @__PURE__ */ f.jsx("h3", { children: "角色印象" }),
          /* @__PURE__ */ f.jsx("p", { children: y ? "AI 已经基于角色卡内容给出摘要和标签。" : "这张卡还没分析，先保留使用记录。" })
        ] }),
        /* @__PURE__ */ f.jsx("span", { children: p ? Dp[p.cardType] : gr[n.cardType] })
      ] }),
      h.length > 0 ? /* @__PURE__ */ f.jsx(ip, { tags: h }) : /* @__PURE__ */ f.jsx("p", { className: "empty-copy", children: "还没有 AI 标签。" }),
      /* @__PURE__ */ f.jsxs("button", { className: "primary-action", type: "button", onClick: me, disabled: x, children: [
        /* @__PURE__ */ f.jsx(ur, { size: 18 }),
        x ? "AI 分析中" : "AI 分析这张卡"
      ] }),
      (g?.chatCount ?? 0) > 0 && /* @__PURE__ */ f.jsxs("button", { className: "secondary-action", type: "button", onClick: et, disabled: L, children: [
        /* @__PURE__ */ f.jsx(Nm, { size: 18 }),
        L ? "补充线路中" : "补充线路统计"
      ] }),
      F !== "idle" && /* @__PURE__ */ f.jsxs("p", { className: `analysis-status ${F}`, children: [
        F === "loading" ? "进行中" : F === "success" ? "完成" : "失败",
        "：",
        V
      ] })
    ] }),
    Y && /* @__PURE__ */ f.jsx(s1, { debugInfo: se }),
    Y && p && /* @__PURE__ */ f.jsxs("section", { className: "panel ai-panel", children: [
      /* @__PURE__ */ f.jsxs("div", { className: "section-title-row", children: [
        /* @__PURE__ */ f.jsxs("div", { children: [
          /* @__PURE__ */ f.jsx("h3", { children: "开发调试：AI 结构化结果" }),
          /* @__PURE__ */ f.jsx("p", { children: "这块用于查模型返回的原始结构，稳定使用时可以在设置里关闭。" })
        ] }),
        /* @__PURE__ */ f.jsxs("span", { children: [
          p.baseTags.length,
          " 个 baseTags"
        ] })
      ] }),
      /* @__PURE__ */ f.jsxs("div", { className: "analysis-summary-grid", children: [
        /* @__PURE__ */ f.jsx("span", { children: "cardType" }),
        /* @__PURE__ */ f.jsx("strong", { children: p.cardType }),
        /* @__PURE__ */ f.jsx("span", { children: "oneLineSummary" }),
        /* @__PURE__ */ f.jsx("strong", { children: p.oneLineSummary })
      ] }),
      /* @__PURE__ */ f.jsx(ip, { tags: p.baseTags }),
      (p.suggestedTags?.length ?? 0) > 0 && /* @__PURE__ */ f.jsxs("div", { className: "scenario-tag-list", children: [
        /* @__PURE__ */ f.jsx("h4", { children: "suggestedTags" }),
        /* @__PURE__ */ f.jsx(u1, { tags: p.suggestedTags ?? [] })
      ] }),
      p.scenarioOneLineSummaries.length > 0 && /* @__PURE__ */ f.jsxs("div", { className: "scenario-summary-list", children: [
        /* @__PURE__ */ f.jsx("h4", { children: "scenarioOneLineSummaries" }),
        p.scenarioOneLineSummaries.map(($) => /* @__PURE__ */ f.jsxs("article", { children: [
          /* @__PURE__ */ f.jsx("strong", { children: n.scenarioOpenings.find((Me) => Me.id === $.scenarioId)?.title ?? $.scenarioId }),
          /* @__PURE__ */ f.jsx("p", { children: $.summary })
        ] }, $.scenarioId))
      ] }),
      p.warnings.length > 0 && /* @__PURE__ */ f.jsx("div", { className: "warning-list", children: p.warnings.map(($) => /* @__PURE__ */ f.jsx("span", { children: $ }, $)) })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: "detail-layout", children: [
      /* @__PURE__ */ f.jsxs("section", { className: "panel", children: [
        /* @__PURE__ */ f.jsx("h3", { children: "线路识别" }),
        (g?.chatCount ?? 0) > 0 && !Q && (g?.scenarioStats.filter(($) => $.chatCount > 0).length ?? 0) === 0 && /* @__PURE__ */ f.jsxs("p", { className: "empty-copy", children: [
          "已读取到 ",
          g?.chatCount ?? 0,
          " 个聊天，但尚未精确匹配到线路。点击“补充线路统计”后，会读取这张卡的聊天摘要来匹配。"
        ] }),
        /* @__PURE__ */ f.jsx("div", { className: "opening-list", children: n.scenarioOpenings.filter(($) => $.source !== "first_mes").map(($) => {
          const Me = g?.scenarioStats.find((O) => O.scenarioId === $.id), Ie = _.get($.id), at = A.get($.id), mt = at ?? Ie?.contentExcerpt ?? $.text;
          return /* @__PURE__ */ f.jsxs("article", { className: "opening-item", children: [
            /* @__PURE__ */ f.jsxs("div", { children: [
              /* @__PURE__ */ f.jsx("strong", { children: $.title }),
              /* @__PURE__ */ f.jsx("p", { children: mt }),
              at && at !== $.text && /* @__PURE__ */ f.jsx("small", { children: "已使用默认开场里的线路摘要；没有摘要的线路才回退显示完整开场白。" })
            ] }),
            /* @__PURE__ */ f.jsx("span", { children: Me ? `${Me.totalMessages} 条消息` : Q ? "0 条消息" : "待补充" })
          ] }, $.id);
        }) })
      ] }),
      /* @__PURE__ */ f.jsxs("section", { className: "panel", children: [
        /* @__PURE__ */ f.jsx("h3", { children: "聊天行为统计" }),
        /* @__PURE__ */ f.jsxs("div", { className: "usage-stack", children: [
          /* @__PURE__ */ f.jsx(Ne, { label: "聊天数", value: g?.chatCount ?? 0 }),
          /* @__PURE__ */ f.jsx(Ne, { label: "总消息", value: g?.totalMessages ?? 0 }),
          /* @__PURE__ */ f.jsx(Ne, { label: "活跃天数", value: g?.activeDays ?? 0 }),
          /* @__PURE__ */ f.jsx(Ne, { label: "距上次玩", value: t1(g?.lastActiveAt) })
        ] }),
        /* @__PURE__ */ f.jsxs("div", { className: "notes-box", children: [
          /* @__PURE__ */ f.jsx(Nm, { size: 18 }),
          /* @__PURE__ */ f.jsx("p", { children: "这里只统计你反复点了哪些角色和线路，不偷看聊天正文做人格分析。边界感有了，产品就不油。" })
        ] })
      ] })
    ] }),
    Y && /* @__PURE__ */ f.jsxs("section", { className: "panel candidate-panel", children: [
      /* @__PURE__ */ f.jsxs("div", { className: "section-title-row", children: [
        /* @__PURE__ */ f.jsxs("div", { children: [
          /* @__PURE__ */ f.jsx("h3", { children: "本地先抓到的嫌疑词" }),
          /* @__PURE__ */ f.jsx("p", { children: "这些还不是最终审判，只是 CharaLog 先在你卡里闻到的味儿。" })
        ] }),
        /* @__PURE__ */ f.jsxs("span", { children: [
          M.length,
          " 个候选"
        ] })
      ] }),
      /* @__PURE__ */ f.jsx(o1, { candidateTags: M })
    ] })
  ] });
}
function wt(n) {
  return JSON.stringify(n, null, 2);
}
function s1({ debugInfo: n }) {
  const u = n.apiUsage;
  return /* @__PURE__ */ f.jsxs("section", { className: "panel debug-panel", children: [
    /* @__PURE__ */ f.jsxs("div", { className: "section-title-row", children: [
      /* @__PURE__ */ f.jsxs("div", { children: [
        /* @__PURE__ */ f.jsx("h3", { children: "开发调试：看看它到底把什么发给了 AI" }),
        /* @__PURE__ */ f.jsx("p", { children: "这里是给你查案用的。正常用户不用看，但我们现在需要确认它有没有乱发、有没有浪费 token、有没有被模型糊弄。" })
      ] }),
      /* @__PURE__ */ f.jsx("span", { children: "Debug" })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: "debug-metrics", children: [
      /* @__PURE__ */ f.jsx(Ne, { label: "system tokens", value: n.tokenEstimate.systemPromptTokens }),
      /* @__PURE__ */ f.jsx(Ne, { label: "user tokens", value: n.tokenEstimate.userPromptTokens }),
      /* @__PURE__ */ f.jsx(Ne, { label: "input total", value: n.tokenEstimate.totalInputTokens }),
      /* @__PURE__ */ f.jsx(Ne, { label: "output limit", value: n.tokenEstimate.estimatedOutputTokenLimit }),
      /* @__PURE__ */ f.jsx(Ne, { label: "estimated total", value: n.tokenEstimate.estimatedTotalTokens })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: "debug-input-preview", children: [
      /* @__PURE__ */ f.jsx("h4", { children: "CardAnalysisInput 预览" }),
      /* @__PURE__ */ f.jsxs("div", { className: "normalized-grid", children: [
        /* @__PURE__ */ f.jsx("span", { children: "cardId" }),
        /* @__PURE__ */ f.jsx("strong", { children: n.cardAnalysisInputPreview.cardId }),
        /* @__PURE__ */ f.jsx("span", { children: "name" }),
        /* @__PURE__ */ f.jsx("strong", { children: n.cardAnalysisInputPreview.name }),
        /* @__PURE__ */ f.jsx("span", { children: "cardTypeHint" }),
        /* @__PURE__ */ f.jsx("strong", { children: gr[n.cardAnalysisInputPreview.cardTypeHint] }),
        /* @__PURE__ */ f.jsx("span", { children: "evidence sections" }),
        /* @__PURE__ */ f.jsx("strong", { children: n.cardAnalysisInputPreview.evidenceSectionCount }),
        /* @__PURE__ */ f.jsx("span", { children: "selected openings" }),
        /* @__PURE__ */ f.jsx("strong", { children: n.cardAnalysisInputPreview.selectedOpeningsCount }),
        /* @__PURE__ */ f.jsx("span", { children: "skipped openings" }),
        /* @__PURE__ */ f.jsx("strong", { children: n.cardAnalysisInputPreview.skippedOpeningsCount }),
        /* @__PURE__ */ f.jsx("span", { children: "candidateTags" }),
        /* @__PURE__ */ f.jsx("strong", { children: n.cardAnalysisInputPreview.candidateTagsCount })
      ] }),
      /* @__PURE__ */ f.jsxs("details", { children: [
        /* @__PURE__ */ f.jsx("summary", { children: "source lengths / skipped openings" }),
        /* @__PURE__ */ f.jsx("pre", { children: wt({
          sourceLengths: n.cardAnalysisInputPreview.sourceLengths,
          skippedOpeningsSummary: n.cardAnalysisInputPreview.skippedOpeningsSummary
        }) })
      ] }),
      /* @__PURE__ */ f.jsx("div", { className: "debug-chip-list", children: n.cardAnalysisInputPreview.evidenceSectionsPreview.map((r, c) => /* @__PURE__ */ f.jsxs("span", { children: [
        r.sourceType,
        " / ",
        r.categoryHint,
        ": ",
        r.length,
        " chars / score ",
        r.score
      ] }, `${r.sourceType}-${r.categoryHint}-${c}`)) }),
      /* @__PURE__ */ f.jsx("div", { className: "debug-chip-list", children: n.cardAnalysisInputPreview.openingExcerptLengths.map((r) => /* @__PURE__ */ f.jsxs("span", { children: [
        r.title,
        ": ",
        r.length,
        " / ",
        r.selectionReason
      ] }, r.scenarioId)) }),
      /* @__PURE__ */ f.jsx("div", { className: "debug-chip-list", children: n.cardAnalysisInputPreview.candidateTagsPreview.map((r) => /* @__PURE__ */ f.jsxs("span", { children: [
        r.label,
        " / ",
        r.category,
        " / ",
        r.score
      ] }, `${r.label}-${r.scopeHint}`)) })
    ] }),
    /* @__PURE__ */ f.jsx("div", { className: "debug-usage", children: u ? /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
      /* @__PURE__ */ f.jsxs("span", { children: [
        "prompt_tokens: ",
        u.prompt_tokens ?? "n/a"
      ] }),
      /* @__PURE__ */ f.jsxs("span", { children: [
        "completion_tokens: ",
        u.completion_tokens ?? "n/a"
      ] }),
      /* @__PURE__ */ f.jsxs("span", { children: [
        "total_tokens: ",
        u.total_tokens ?? "n/a"
      ] })
    ] }) : /* @__PURE__ */ f.jsx("span", { children: "还没有 usage 返回。" }) }),
    n.error && /* @__PURE__ */ f.jsxs("div", { className: "debug-error", children: [
      /* @__PURE__ */ f.jsx("strong", { children: "请求失败" }),
      /* @__PURE__ */ f.jsxs("span", { children: [
        "status code: ",
        n.error.statusCode ?? "n/a"
      ] }),
      /* @__PURE__ */ f.jsxs("span", { children: [
        "retry count: ",
        n.error.retryCount
      ] }),
      /* @__PURE__ */ f.jsxs("span", { children: [
        "failed batch index: ",
        n.error.failedBatchIndex ?? "n/a"
      ] }),
      /* @__PURE__ */ f.jsx("p", { children: n.error.message })
    ] }),
    /* @__PURE__ */ f.jsxs("details", { children: [
      /* @__PURE__ */ f.jsx("summary", { children: "messages 数组" }),
      /* @__PURE__ */ f.jsx("pre", { children: wt(n.messages) })
    ] }),
    /* @__PURE__ */ f.jsxs("details", { children: [
      /* @__PURE__ */ f.jsx("summary", { children: "system prompt" }),
      /* @__PURE__ */ f.jsx("pre", { children: n.systemPrompt })
    ] }),
    /* @__PURE__ */ f.jsxs("details", { children: [
      /* @__PURE__ */ f.jsx("summary", { children: "user prompt / CardAnalysisInput JSON" }),
      /* @__PURE__ */ f.jsx("pre", { children: n.userPrompt })
    ] }),
    /* @__PURE__ */ f.jsxs("details", { children: [
      /* @__PURE__ */ f.jsx("summary", { children: "request payload 预览" }),
      /* @__PURE__ */ f.jsx("pre", { children: wt(n.requestPayloadPreview) })
    ] }),
    /* @__PURE__ */ f.jsxs("details", { children: [
      /* @__PURE__ */ f.jsx("summary", { children: "Raw API Response" }),
      /* @__PURE__ */ f.jsx("pre", { children: n.rawApiResponse ? wt(n.rawApiResponse) : "还没有 raw response。" })
    ] }),
    /* @__PURE__ */ f.jsxs("details", { children: [
      /* @__PURE__ */ f.jsx("summary", { children: "Parsed CardAnalysisResult" }),
      /* @__PURE__ */ f.jsx("pre", { children: n.parsedCardAnalysisResult ? wt(n.parsedCardAnalysisResult) : "尚未解析。" })
    ] }),
    /* @__PURE__ */ f.jsxs("details", { children: [
      /* @__PURE__ */ f.jsx("summary", { children: "Parse warnings / validation errors" }),
      /* @__PURE__ */ f.jsx("pre", { children: wt({ parseWarnings: n.parseWarnings, validationErrors: n.validationErrors }) })
    ] })
  ] });
}
function c1({ debugInfo: n }) {
  const u = n.apiUsage;
  return /* @__PURE__ */ f.jsxs("section", { className: "panel debug-panel", children: [
    /* @__PURE__ */ f.jsxs("div", { className: "section-title-row", children: [
      /* @__PURE__ */ f.jsxs("div", { children: [
        /* @__PURE__ */ f.jsx("h3", { children: "开发调试：看看 XP 小票到底把什么发给了 AI" }),
        /* @__PURE__ */ f.jsx("p", { children: "这里只展示统计摘要、提示词、token 预估和原始返回。API Key 不进页面，也不进 console。" })
      ] }),
      /* @__PURE__ */ f.jsx("span", { children: "Profile Debug" })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: "debug-metrics", children: [
      /* @__PURE__ */ f.jsx(Ne, { label: "system tokens", value: n.tokenEstimate.systemPromptTokens }),
      /* @__PURE__ */ f.jsx(Ne, { label: "user tokens", value: n.tokenEstimate.userPromptTokens }),
      /* @__PURE__ */ f.jsx(Ne, { label: "input total", value: n.tokenEstimate.totalInputTokens }),
      /* @__PURE__ */ f.jsx(Ne, { label: "output limit", value: n.tokenEstimate.estimatedOutputTokenLimit }),
      /* @__PURE__ */ f.jsx(Ne, { label: "estimated total", value: n.tokenEstimate.estimatedTotalTokens })
    ] }),
    /* @__PURE__ */ f.jsx("div", { className: "debug-usage", children: u ? /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
      /* @__PURE__ */ f.jsxs("span", { children: [
        "prompt_tokens: ",
        u.prompt_tokens ?? "n/a"
      ] }),
      /* @__PURE__ */ f.jsxs("span", { children: [
        "completion_tokens: ",
        u.completion_tokens ?? "n/a"
      ] }),
      /* @__PURE__ */ f.jsxs("span", { children: [
        "total_tokens: ",
        u.total_tokens ?? "n/a"
      ] })
    ] }) : /* @__PURE__ */ f.jsx("span", { children: "还没有 usage 返回。" }) }),
    n.error && /* @__PURE__ */ f.jsxs("div", { className: "debug-error", children: [
      /* @__PURE__ */ f.jsx("strong", { children: "请求失败" }),
      /* @__PURE__ */ f.jsxs("span", { children: [
        "status code: ",
        n.error.statusCode ?? "n/a"
      ] }),
      /* @__PURE__ */ f.jsxs("span", { children: [
        "retry count: ",
        n.error.retryCount
      ] }),
      /* @__PURE__ */ f.jsx("p", { children: n.error.message })
    ] }),
    /* @__PURE__ */ f.jsxs("details", { children: [
      /* @__PURE__ */ f.jsx("summary", { children: "messages 数组" }),
      /* @__PURE__ */ f.jsx("pre", { children: wt(n.messages) })
    ] }),
    /* @__PURE__ */ f.jsxs("details", { children: [
      /* @__PURE__ */ f.jsx("summary", { children: "system prompt" }),
      /* @__PURE__ */ f.jsx("pre", { children: n.systemPrompt })
    ] }),
    /* @__PURE__ */ f.jsxs("details", { children: [
      /* @__PURE__ */ f.jsx("summary", { children: "user prompt / TasteProfile JSON" }),
      /* @__PURE__ */ f.jsx("pre", { children: n.userPrompt })
    ] }),
    /* @__PURE__ */ f.jsxs("details", { children: [
      /* @__PURE__ */ f.jsx("summary", { children: "request payload 预览" }),
      /* @__PURE__ */ f.jsx("pre", { children: wt(n.requestPayloadPreview) })
    ] }),
    /* @__PURE__ */ f.jsxs("details", { children: [
      /* @__PURE__ */ f.jsx("summary", { children: "Raw API Response" }),
      /* @__PURE__ */ f.jsx("pre", { children: n.rawApiResponse ? wt(n.rawApiResponse) : "还没有 raw response。" })
    ] }),
    /* @__PURE__ */ f.jsxs("details", { children: [
      /* @__PURE__ */ f.jsx("summary", { children: "Parsed TasteProfile" }),
      /* @__PURE__ */ f.jsx("pre", { children: n.parsedTasteProfile ? wt(n.parsedTasteProfile) : "尚未解析。" })
    ] }),
    /* @__PURE__ */ f.jsxs("details", { children: [
      /* @__PURE__ */ f.jsx("summary", { children: "Parse warnings / validation errors" }),
      /* @__PURE__ */ f.jsx("pre", { children: wt({ parseWarnings: n.parseWarnings, validationErrors: n.validationErrors }) })
    ] })
  ] });
}
function ip({ tags: n }) {
  return n.length === 0 ? /* @__PURE__ */ f.jsx("p", { className: "empty-copy", children: "AI 没有选出 baseTag，先看候选标签和 Debug Panel。" }) : /* @__PURE__ */ f.jsx("div", { className: "ai-tag-list", children: n.map((u) => /* @__PURE__ */ f.jsxs("article", { children: [
    /* @__PURE__ */ f.jsx("strong", { children: u.label }),
    /* @__PURE__ */ f.jsx("span", { children: u.category }),
    /* @__PURE__ */ f.jsxs("b", { children: [
      Math.round(u.confidence * 100),
      "%"
    ] }),
    /* @__PURE__ */ f.jsx("p", { children: u.reason })
  ] }, `${u.label}-${u.scope}`)) });
}
function u1({ tags: n }) {
  return /* @__PURE__ */ f.jsx("div", { className: "ai-tag-list", children: n.map((u) => /* @__PURE__ */ f.jsxs("article", { children: [
    /* @__PURE__ */ f.jsx("strong", { children: u.label }),
    /* @__PURE__ */ f.jsx("span", { children: u.category || u.scope }),
    /* @__PURE__ */ f.jsxs("b", { children: [
      Math.round(u.confidence * 100),
      "%"
    ] }),
    /* @__PURE__ */ f.jsx("p", { children: u.reason }),
    /* @__PURE__ */ f.jsx("p", { children: u.evidence })
  ] }, `${u.label}-${u.scope}`)) });
}
function r1({
  cards: n,
  config: u,
  analysisResults: r,
  onComplete: c,
  isSillyTavernMode: m
}) {
  const [p, g] = ae.useState("manual"), [M, y] = ae.useState(() => /* @__PURE__ */ new Set()), [h, D] = ae.useState(() => /* @__PURE__ */ new Set()), [_, A] = ae.useState({
    cardsRead: n.length,
    cardsToAnalyze: n.length,
    currentBatch: 0,
    totalBatches: Math.ceil(n.length / u.batchSize),
    batchSize: u.batchSize,
    maxBatchInputTokens: 0,
    completedCards: 0,
    failedBatches: 0,
    successfulCards: 0,
    failedCards: 0,
    status: "idle"
  }), [x, B] = ae.useState([]), [L, w] = ae.useState(!1), Q = ae.useMemo(
    () => new Map(
      r.filter((V) => V.usage).map((V) => [V.cardId, V.usage])
    ),
    [r]
  ), ne = ae.useMemo(() => n.filter((V) => (Q.get(V.id)?.userMessages ?? 0) > 0), [n, Q]), F = ae.useMemo(() => p === "all" ? n : n.filter((V) => M.has(V.id)), [p, n, M]);
  ae.useEffect(() => {
    y((V) => {
      const J = new Set(n.map((se) => se.id));
      return new Set(Array.from(V).filter((se) => J.has(se)));
    }), D((V) => {
      const J = new Set(n.map((Y) => Y.id));
      return new Set(Array.from(V).filter((Y) => J.has(Y)));
    });
  }, [n]), ae.useEffect(() => {
    A((V) => ({
      ...V,
      cardsRead: n.length,
      cardsToAnalyze: F.length,
      totalBatches: Math.ceil(F.length / u.batchSize),
      batchSize: u.batchSize
    }));
  }, [n.length, F.length, u.batchSize]);
  async function ie() {
    w(!0), B([]), A({
      cardsRead: n.length,
      cardsToAnalyze: F.length,
      currentBatch: 0,
      totalBatches: Math.ceil(F.length / u.batchSize),
      batchSize: u.batchSize,
      maxBatchInputTokens: 0,
      completedCards: 0,
      failedBatches: 0,
      successfulCards: 0,
      failedCards: 0,
      status: "running"
    });
    const V = await Ep(F, u, A, Q);
    B(V), c(V), w(!1);
  }
  return /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
    /* @__PURE__ */ f.jsxs("header", { className: "page-header compact", children: [
      /* @__PURE__ */ f.jsx("h2", { children: "分析" }),
      /* @__PURE__ */ f.jsx("p", { children: m ? "批处理会调用酒馆当前模型。可以先只分析玩过的卡，省 API。" : "批处理会调用你配置的 OpenAI-compatible 接口。最终 XP 小票先别急，这里只审卡片级标签。" })
    ] }),
    /* @__PURE__ */ f.jsxs("section", { className: "panel analysis-panel", children: [
      /* @__PURE__ */ f.jsxs("div", { className: "analysis-scope-panel", children: [
        /* @__PURE__ */ f.jsxs("div", { className: "segmented-control", role: "group", "aria-label": "分析范围", children: [
          /* @__PURE__ */ f.jsx("button", { className: p === "all" ? "active" : "", type: "button", onClick: () => g("all"), children: "全部卡片" }),
          /* @__PURE__ */ f.jsx("button", { className: p === "manual" ? "active" : "", type: "button", onClick: () => g("manual"), children: "手动选择" })
        ] }),
        /* @__PURE__ */ f.jsxs("p", { children: [
          "当前将分析 ",
          F.length,
          " 张卡。全部 ",
          n.length,
          " 张，有用户发言的卡 ",
          ne.length,
          " 张。"
        ] }),
        p === "manual" && /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
          /* @__PURE__ */ f.jsxs("div", { className: "manual-card-toolbar", children: [
            /* @__PURE__ */ f.jsx("button", { type: "button", onClick: () => D(new Set(ne.map((V) => V.id))), children: "选择玩过" }),
            /* @__PURE__ */ f.jsx("button", { type: "button", onClick: () => D(new Set(n.map((V) => V.id))), children: "全选" }),
            /* @__PURE__ */ f.jsx("button", { type: "button", onClick: () => D(/* @__PURE__ */ new Set()), children: "清空" }),
            /* @__PURE__ */ f.jsx("button", { className: "confirm-selection-button", type: "button", onClick: () => y(new Set(h)), children: "确定选择" }),
            /* @__PURE__ */ f.jsxs("strong", { children: [
              "已勾选 ",
              h.size,
              " 张 / 已应用 ",
              M.size,
              " 张"
            ] })
          ] }),
          /* @__PURE__ */ f.jsx("div", { className: "manual-card-picker", children: n.map((V) => {
            const J = h.has(V.id);
            return /* @__PURE__ */ f.jsxs("label", { children: [
              /* @__PURE__ */ f.jsx(
                "input",
                {
                  checked: J,
                  type: "checkbox",
                  onChange: (Y) => {
                    D((se) => {
                      const me = new Set(se);
                      return Y.target.checked ? me.add(V.id) : me.delete(V.id), me;
                    });
                  }
                }
              ),
              /* @__PURE__ */ f.jsx("span", { children: V.name }),
              /* @__PURE__ */ f.jsxs("small", { children: [
                Q.get(V.id)?.chatCount ?? 0,
                " 聊天"
              ] })
            ] }, V.id);
          }) })
        ] })
      ] }),
      /* @__PURE__ */ f.jsxs("div", { className: "metric-row", children: [
        /* @__PURE__ */ f.jsx(Ne, { label: "已读取卡片", value: _.cardsRead }),
        /* @__PURE__ */ f.jsx(Ne, { label: "准备分析", value: _.cardsToAnalyze }),
        /* @__PURE__ */ f.jsx(Ne, { label: "当前 batchSize", value: _.batchSize }),
        /* @__PURE__ */ f.jsx(Ne, { label: "批次 token 上限", value: _.maxBatchInputTokens || "待计算" })
      ] }),
      /* @__PURE__ */ f.jsxs("div", { className: "progress-strip", children: [
        /* @__PURE__ */ f.jsxs("span", { children: [
          "当前第 ",
          _.currentBatch,
          " 批 / 共 ",
          _.totalBatches,
          " 批"
        ] }),
        /* @__PURE__ */ f.jsxs("strong", { children: [
          _.successfulCards,
          " 张成功"
        ] }),
        /* @__PURE__ */ f.jsxs("span", { children: [
          _.failedCards,
          " 张失败"
        ] }),
        /* @__PURE__ */ f.jsx("span", { children: _.status === "failed" ? "已停止" : _.status === "completed" ? "已完成" : _.status === "running" ? "运行中" : "未开始" }),
        _.currentCardName && /* @__PURE__ */ f.jsxs("span", { children: [
          "当前：",
          _.currentCardName
        ] })
      ] }),
      _.errorMessage && /* @__PURE__ */ f.jsxs("p", { className: "analysis-status error", children: [
        "已停止：",
        _.errorMessage
      ] }),
      /* @__PURE__ */ f.jsx("p", { className: "dataset-hint", children: "实际批次数会同时受 batchSize 和 token 安全上限影响；Gemini/Flash 模型会使用更高的本地批次上限。" }),
      /* @__PURE__ */ f.jsxs("button", { className: "primary-action", type: "button", onClick: ie, disabled: L || F.length === 0, children: [
        /* @__PURE__ */ f.jsx(ur, { size: 18 }),
        L ? "分析中" : `开始分析 ${F.length} 张`
      ] })
    ] }),
    x.length > 0 && /* @__PURE__ */ f.jsxs("section", { className: "panel candidate-panel", children: [
      /* @__PURE__ */ f.jsxs("div", { className: "section-title-row", children: [
        /* @__PURE__ */ f.jsxs("div", { children: [
          /* @__PURE__ */ f.jsx("h3", { children: "批处理返回" }),
          /* @__PURE__ */ f.jsx("p", { children: "这是卡片级分析结果，不是最终画像。先别给自己颁奖，也别给模型递麦克风太久。" })
        ] }),
        /* @__PURE__ */ f.jsxs("span", { children: [
          x.length,
          " 张"
        ] })
      ] }),
      /* @__PURE__ */ f.jsx("div", { className: "analysis-result-list", children: x.map((V) => /* @__PURE__ */ f.jsxs("article", { className: V.warnings.length > 0 ? "analysis-result-warning" : "", children: [
        /* @__PURE__ */ f.jsx("strong", { children: n.find((J) => J.id === V.cardId)?.name ?? V.cardId }),
        /* @__PURE__ */ f.jsxs("div", { children: [
          /* @__PURE__ */ f.jsx("p", { children: V.oneLineSummary }),
          V.warnings.length > 0 && /* @__PURE__ */ f.jsx("small", { children: V.warnings[0] })
        ] }),
        /* @__PURE__ */ f.jsxs("span", { children: [
          V.baseTags.length,
          " baseTags"
        ] })
      ] }, V.cardId)) })
    ] })
  ] });
}
function o1({ candidateTags: n }) {
  return n.length === 0 ? /* @__PURE__ */ f.jsx("p", { className: "empty-copy", children: "本地没有召回候选标签，先检查卡面文本和词典 alias。" }) : /* @__PURE__ */ f.jsxs("div", { className: "candidate-table", role: "table", "aria-label": "候选标签", children: [
    /* @__PURE__ */ f.jsxs("div", { className: "candidate-row header", role: "row", children: [
      /* @__PURE__ */ f.jsx("span", { children: "标签" }),
      /* @__PURE__ */ f.jsx("span", { children: "category" }),
      /* @__PURE__ */ f.jsx("span", { children: "score" }),
      /* @__PURE__ */ f.jsx("span", { children: "scopeHint" }),
      /* @__PURE__ */ f.jsx("span", { children: "matchedFields" })
    ] }),
    n.map((u) => /* @__PURE__ */ f.jsxs("div", { className: "candidate-row", role: "row", children: [
      /* @__PURE__ */ f.jsx("strong", { children: u.label }),
      /* @__PURE__ */ f.jsx("span", { children: u.category }),
      /* @__PURE__ */ f.jsx("span", { children: u.score.toFixed(2) }),
      /* @__PURE__ */ f.jsx("span", { children: u.scopeHint }),
      /* @__PURE__ */ f.jsx("span", { children: u.matchedFields.join(", ") })
    ] }, u.tagId))
  ] });
}
function f1({
  cards: n,
  analysisResults: u,
  config: r,
  savedProfile: c,
  onProfileGenerated: m
}) {
  const p = ae.useMemo(() => Pa(n, u), [u, n]), [g, M] = ae.useState(c ?? p), [y, h] = ae.useState("idle"), [D, _] = ae.useState(""), A = r.enableDebugMode, x = g.debug ?? Vv(n, u, r);
  ae.useEffect(() => {
    M((w) => {
      const Q = w.aiSections.length > 0 && w.analyzedCardCount === p.analyzedCardCount;
      return {
        ...p,
        title: Q ? w.title : p.title,
        summary: Q ? w.summary : p.summary,
        aiSections: Q ? w.aiSections : p.aiSections,
        debug: Q ? w.debug : void 0
      };
    });
  }, [p]);
  async function B() {
    h("loading"), _("正在根据已分析卡片生成 XP 小票。");
    try {
      const w = await Kv(n, u, r);
      M(w), m(w), e1(w);
      const Q = !!w.debug?.error;
      h(Q ? "error" : "success"), _(Q ? "AI 生成失败，请查看 Profile Debug。" : "XP 小票生成完成。");
    } catch (w) {
      h("error"), _(w instanceof Error ? w.message : "XP 小票生成失败。");
    }
  }
  const L = g.aiSections.length > 0 ? g.aiSections : [
    {
      title: "本地预览",
      body: g.summary,
      relatedTags: []
    }
  ];
  return /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
    /* @__PURE__ */ f.jsx("header", { className: "page-header", children: /* @__PURE__ */ f.jsx("h2", { children: g.title }) }),
    /* @__PURE__ */ f.jsxs("section", { className: "panel receipt-toolbar", children: [
      /* @__PURE__ */ f.jsxs("div", { children: [
        /* @__PURE__ */ f.jsx("h3", { children: "本地预览 + AI 说破" }),
        /* @__PURE__ */ f.jsx("p", { children: "基于已分析卡片生成统计摘要，再让 AI 写小票；不读取完整聊天正文，也不做心理诊断。" })
      ] }),
      /* @__PURE__ */ f.jsxs("button", { className: "primary-action", type: "button", onClick: B, disabled: y === "loading" || g.analyzedCardCount === 0, children: [
        /* @__PURE__ */ f.jsx(Sh, { size: 18 }),
        y === "loading" ? "正在生成小票" : "生成说破文案"
      ] })
    ] }),
    y !== "idle" && /* @__PURE__ */ f.jsxs("p", { className: `analysis-status ${y}`, children: [
      y === "loading" ? "进行中" : y === "success" ? "完成" : "失败",
      "：",
      D
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: "metric-row", children: [
      /* @__PURE__ */ f.jsx(Ne, { label: "已分析卡", value: g.analyzedCardCount }),
      /* @__PURE__ */ f.jsx(Ne, { label: "命中标签", value: g.tagStats.length }),
      /* @__PURE__ */ f.jsx(Ne, { label: "有记录卡", value: g.characterUsages.length })
    ] }),
    /* @__PURE__ */ f.jsx("section", { className: "receipt xp-receipt", children: L.map((w) => /* @__PURE__ */ f.jsxs("div", { className: "receipt-line", children: [
      /* @__PURE__ */ f.jsx("span", { children: w.title }),
      /* @__PURE__ */ f.jsx("strong", { children: d1(w.body) })
    ] }, w.title)) }),
    /* @__PURE__ */ f.jsxs("div", { className: "profile-grid", children: [
      /* @__PURE__ */ f.jsxs("section", { className: "panel", children: [
        /* @__PURE__ */ f.jsxs("div", { className: "section-title-row", children: [
          /* @__PURE__ */ f.jsxs("div", { children: [
            /* @__PURE__ */ f.jsx("h3", { children: "高频标签" }),
            /* @__PURE__ */ f.jsx("p", { children: "这是当前卡库里反复出现的口味线索。" })
          ] }),
          /* @__PURE__ */ f.jsxs("span", { children: [
            "Top ",
            Math.min(5, g.tagStats.length)
          ] })
        ] }),
        /* @__PURE__ */ f.jsx("div", { className: "profile-stat-list", children: g.tagStats.slice(0, 5).map((w) => /* @__PURE__ */ f.jsxs("article", { children: [
          /* @__PURE__ */ f.jsx("strong", { children: w.label }),
          /* @__PURE__ */ f.jsx("span", { children: w.category }),
          /* @__PURE__ */ f.jsxs("span", { children: [
            "出现 ",
            w.frequency,
            " 次"
          ] })
        ] }, `${w.label}-${w.category}`)) })
      ] }),
      /* @__PURE__ */ f.jsxs("section", { className: "panel", children: [
        /* @__PURE__ */ f.jsx("div", { className: "section-title-row", children: /* @__PURE__ */ f.jsxs("div", { children: [
          /* @__PURE__ */ f.jsx("h3", { children: "代表角色" }),
          /* @__PURE__ */ f.jsx("p", { children: "这些卡不是普通路过，是在你的卡库里刷过存在感的。" })
        ] }) }),
        /* @__PURE__ */ f.jsx("div", { className: "representative-list", children: g.representativeCharacters.map((w) => /* @__PURE__ */ f.jsxs("article", { children: [
          /* @__PURE__ */ f.jsx("strong", { children: w.name }),
          /* @__PURE__ */ f.jsx("p", { children: w.oneLineSummary }),
          /* @__PURE__ */ f.jsx("div", { className: "tag-list", children: w.tags.slice(0, 6).map((Q) => /* @__PURE__ */ f.jsx("span", { children: Q }, `${w.cardId}-${Q}`)) })
        ] }, w.cardId)) })
      ] })
    ] }),
    !1,
    /* @__PURE__ */ f.jsxs("section", { className: "panel absent-panel", children: [
      /* @__PURE__ */ f.jsxs("div", { className: "section-title-row", children: [
        /* @__PURE__ */ f.jsxs("div", { children: [
          /* @__PURE__ */ f.jsx("h3", { children: "暂时没怎么出现" }),
          /* @__PURE__ */ f.jsx("p", { children: "只从角色气质、情感走向、世界观题材、身份阶层、互动机制里抽样，不随机展示敏感偏好。" })
        ] }),
        /* @__PURE__ */ f.jsxs("span", { children: [
          "随机 ",
          g.absentTags.length,
          " 个"
        ] })
      ] }),
      /* @__PURE__ */ f.jsx("div", { className: "tag-list", children: g.absentTags.map((w) => /* @__PURE__ */ f.jsx("span", { children: w.label }, w.id)) })
    ] }),
    g.warnings.length > 0 && /* @__PURE__ */ f.jsx("section", { className: "panel warning-list", children: g.warnings.slice(0, 12).map((w) => /* @__PURE__ */ f.jsx("span", { children: w }, w)) }),
    A && /* @__PURE__ */ f.jsx(c1, { debugInfo: x })
  ] });
}
function d1(n) {
  const u = /(?:^|\s)(?=[^，。；\n]{1,28}\s+\d{1,3}%\s*[-—])/gu, r = [...n.matchAll(u)].filter((g) => (g.index ?? 0) > 0), c = /[👑🩹🐶🔥💼🚬🏆📊🔍📈💰🧾🧨🥂🗡️🌙⭐✨]/gu, m = r.length > 1 ? r : [...n.matchAll(c)], p = m.length > 1 ? m.map((g, M) => n.slice(g.index, m[M + 1]?.index ?? n.length).trim()).filter(Boolean) : n.split(/(?=\s*\d+[.、])/u).map((g) => g.trim()).filter(Boolean);
  return p.length <= 1 ? n : /* @__PURE__ */ f.jsx("span", { className: "receipt-body-lines", children: p.map((g, M) => /* @__PURE__ */ f.jsx("span", { children: g }, `${M}-${g.slice(0, 12)}`)) });
}
function m1({ config: n, onChange: u }) {
  const [r, c] = ae.useState("idle"), [m, p] = ae.useState(n.batchSize.toString()), g = [3, 5, 8, 10, 15];
  async function M() {
    c("testing");
    const y = await Jv(n);
    c(y ? "success" : "failed");
  }
  return /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
    /* @__PURE__ */ f.jsxs("header", { className: "page-header compact", children: [
      /* @__PURE__ */ f.jsx("h2", { children: "设置" }),
      /* @__PURE__ */ f.jsx("p", { children: "配置你的 OpenAI-compatible 接口。API Key 只保存在本地浏览器里。" })
    ] }),
    /* @__PURE__ */ f.jsxs("section", { className: "panel settings-panel", children: [
      /* @__PURE__ */ f.jsx("label", { htmlFor: "baseUrl", children: "Base URL" }),
      /* @__PURE__ */ f.jsx("input", { id: "baseUrl", value: n.baseUrl, onChange: (y) => u({ ...n, baseUrl: y.target.value }) }),
      /* @__PURE__ */ f.jsx("label", { htmlFor: "apiKey", children: "API Key" }),
      /* @__PURE__ */ f.jsx(
        "input",
        {
          id: "apiKey",
          type: "password",
          value: n.apiKey,
          onChange: (y) => u({ ...n, apiKey: y.target.value }),
          placeholder: "sk-..."
        }
      ),
      /* @__PURE__ */ f.jsx("label", { htmlFor: "model", children: "Model" }),
      /* @__PURE__ */ f.jsx("input", { id: "model", value: n.model, onChange: (y) => u({ ...n, model: y.target.value }) }),
      /* @__PURE__ */ f.jsxs("div", { className: "form-grid", children: [
        /* @__PURE__ */ f.jsx("label", { htmlFor: "timeoutMs", children: "timeoutMs" }),
        /* @__PURE__ */ f.jsx(
          "input",
          {
            id: "timeoutMs",
            min: 1e3,
            step: 1e3,
            type: "number",
            value: n.timeoutMs,
            onChange: (y) => u({ ...n, timeoutMs: Number(y.target.value) })
          }
        ),
        /* @__PURE__ */ f.jsx("label", { htmlFor: "maxRetries", children: "maxRetries" }),
        /* @__PURE__ */ f.jsx(
          "input",
          {
            id: "maxRetries",
            min: 0,
            max: 10,
            type: "number",
            value: n.maxRetries,
            onChange: (y) => u({ ...n, maxRetries: Number(y.target.value) })
          }
        )
      ] }),
      /* @__PURE__ */ f.jsx("label", { children: "batchSize" }),
      /* @__PURE__ */ f.jsxs("div", { className: "segmented-control", children: [
        g.map((y) => /* @__PURE__ */ f.jsx(
          "button",
          {
            className: n.batchSize === y ? "active" : "",
            type: "button",
            onClick: () => {
              p(y.toString()), u({ ...n, batchSize: y });
            },
            children: y
          },
          y
        )),
        /* @__PURE__ */ f.jsx(
          "input",
          {
            "aria-label": "自定义 batchSize",
            min: 1,
            max: 64,
            type: "number",
            value: m,
            onChange: (y) => {
              p(y.target.value), u({ ...n, batchSize: Number(y.target.value) || 1 });
            }
          }
        )
      ] }),
      /* @__PURE__ */ f.jsxs("label", { className: "checkbox-row", children: [
        /* @__PURE__ */ f.jsx(
          "input",
          {
            checked: n.enableDebugMode,
            type: "checkbox",
            onChange: (y) => u({ ...n, enableDebugMode: y.target.checked })
          }
        ),
        "开发调试模式"
      ] }),
      /* @__PURE__ */ f.jsxs("button", { className: "primary-action", type: "button", onClick: M, disabled: r === "testing", children: [
        /* @__PURE__ */ f.jsx(xh, { size: 18 }),
        r === "testing" ? "测试中" : "测试连接"
      ] }),
      r === "success" && /* @__PURE__ */ f.jsx("p", { className: "connection-copy success", children: "连接成功，可以开始分析。" }),
      r === "failed" && /* @__PURE__ */ f.jsx("p", { className: "connection-copy failed", children: "连接失败，请检查 Base URL、API Key 和模型名。" }),
      /* @__PURE__ */ f.jsxs("div", { className: "status-grid", children: [
        /* @__PURE__ */ f.jsx("span", { children: "设置存储" }),
        /* @__PURE__ */ f.jsx("strong", { children: "localStorage" }),
        /* @__PURE__ */ f.jsx("span", { children: "分析响应" }),
        /* @__PURE__ */ f.jsx("strong", { children: "real API" })
      ] })
    ] })
  ] });
}
function Ne({ label: n, value: u }) {
  return /* @__PURE__ */ f.jsxs("div", { className: "metric", children: [
    /* @__PURE__ */ f.jsx("span", { children: n }),
    /* @__PURE__ */ f.jsx("strong", { children: u })
  ] });
}
const sr = /* @__PURE__ */ new WeakMap();
function p1(n) {
  const u = ph.createRoot(n);
  sr.set(n, u), u.render(
    /* @__PURE__ */ f.jsx(ch.StrictMode, { children: /* @__PURE__ */ f.jsx(a1, {}) })
  );
}
function y1(n) {
  sr.get(n)?.unmount(), sr.delete(n);
}
export {
  p1 as mountCharaLog,
  y1 as unmountCharaLog
};
