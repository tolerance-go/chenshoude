'use strict'
var zu = Object.create
var mr = Object.defineProperty
var Yu = Object.getOwnPropertyDescriptor
var Zu = Object.getOwnPropertyNames
var Xu = Object.getPrototypeOf,
   el = Object.prototype.hasOwnProperty
var _ = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
   dr = (e, t) => {
      for (var r in t) mr(e, r, { get: t[r], enumerable: !0 })
   },
   so = (e, t, r, n) => {
      if ((t && typeof t == 'object') || typeof t == 'function')
         for (let i of Zu(t))
            !el.call(e, i) &&
               i !== r &&
               mr(e, i, {
                  get: () => t[i],
                  enumerable: !(n = Yu(t, i)) || n.enumerable,
               })
      return e
   }
var S = (e, t, r) => (
      (r = e != null ? zu(Xu(e)) : {}),
      so(
         t || !e || !e.__esModule
            ? mr(r, 'default', { value: e, enumerable: !0 })
            : r,
         e,
      )
   ),
   tl = (e) => so(mr({}, '__esModule', { value: !0 }), e)
var bo = _((id, yo) => {
   var lt = 1e3,
      ct = lt * 60,
      pt = ct * 60,
      rt = pt * 24,
      nl = rt * 7,
      il = rt * 365.25
   yo.exports = function (e, t) {
      t = t || {}
      var r = typeof e
      if (r === 'string' && e.length > 0) return ol(e)
      if (r === 'number' && isFinite(e)) return t.long ? al(e) : sl(e)
      throw new Error(
         'val is not a non-empty string or a valid number. val=' +
            JSON.stringify(e),
      )
   }
   function ol(e) {
      if (((e = String(e)), !(e.length > 100))) {
         var t =
            /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
               e,
            )
         if (!!t) {
            var r = parseFloat(t[1]),
               n = (t[2] || 'ms').toLowerCase()
            switch (n) {
               case 'years':
               case 'year':
               case 'yrs':
               case 'yr':
               case 'y':
                  return r * il
               case 'weeks':
               case 'week':
               case 'w':
                  return r * nl
               case 'days':
               case 'day':
               case 'd':
                  return r * rt
               case 'hours':
               case 'hour':
               case 'hrs':
               case 'hr':
               case 'h':
                  return r * pt
               case 'minutes':
               case 'minute':
               case 'mins':
               case 'min':
               case 'm':
                  return r * ct
               case 'seconds':
               case 'second':
               case 'secs':
               case 'sec':
               case 's':
                  return r * lt
               case 'milliseconds':
               case 'millisecond':
               case 'msecs':
               case 'msec':
               case 'ms':
                  return r
               default:
                  return
            }
         }
      }
   }
   function sl(e) {
      var t = Math.abs(e)
      return t >= rt
         ? Math.round(e / rt) + 'd'
         : t >= pt
         ? Math.round(e / pt) + 'h'
         : t >= ct
         ? Math.round(e / ct) + 'm'
         : t >= lt
         ? Math.round(e / lt) + 's'
         : e + 'ms'
   }
   function al(e) {
      var t = Math.abs(e)
      return t >= rt
         ? hr(e, t, rt, 'day')
         : t >= pt
         ? hr(e, t, pt, 'hour')
         : t >= ct
         ? hr(e, t, ct, 'minute')
         : t >= lt
         ? hr(e, t, lt, 'second')
         : e + ' ms'
   }
   function hr(e, t, r, n) {
      var i = t >= r * 1.5
      return Math.round(e / r) + ' ' + n + (i ? 's' : '')
   }
})
var In = _((od, wo) => {
   function ul(e) {
      ;(r.debug = r),
         (r.default = r),
         (r.coerce = u),
         (r.disable = o),
         (r.enable = i),
         (r.enabled = s),
         (r.humanize = bo()),
         (r.destroy = l),
         Object.keys(e).forEach((c) => {
            r[c] = e[c]
         }),
         (r.names = []),
         (r.skips = []),
         (r.formatters = {})
      function t(c) {
         let p = 0
         for (let f = 0; f < c.length; f++)
            (p = (p << 5) - p + c.charCodeAt(f)), (p |= 0)
         return r.colors[Math.abs(p) % r.colors.length]
      }
      r.selectColor = t
      function r(c) {
         let p,
            f = null,
            m,
            d
         function g(...b) {
            if (!g.enabled) return
            let h = g,
               x = Number(new Date()),
               w = x - (p || x)
            ;(h.diff = w),
               (h.prev = p),
               (h.curr = x),
               (p = x),
               (b[0] = r.coerce(b[0])),
               typeof b[0] != 'string' && b.unshift('%O')
            let E = 0
            ;(b[0] = b[0].replace(/%([a-zA-Z%])/g, (O, q) => {
               if (O === '%%') return '%'
               E++
               let I = r.formatters[q]
               if (typeof I == 'function') {
                  let G = b[E]
                  ;(O = I.call(h, G)), b.splice(E, 1), E--
               }
               return O
            })),
               r.formatArgs.call(h, b),
               (h.log || r.log).apply(h, b)
         }
         return (
            (g.namespace = c),
            (g.useColors = r.useColors()),
            (g.color = r.selectColor(c)),
            (g.extend = n),
            (g.destroy = r.destroy),
            Object.defineProperty(g, 'enabled', {
               enumerable: !0,
               configurable: !1,
               get: () =>
                  f !== null
                     ? f
                     : (m !== r.namespaces &&
                          ((m = r.namespaces), (d = r.enabled(c))),
                       d),
               set: (b) => {
                  f = b
               },
            }),
            typeof r.init == 'function' && r.init(g),
            g
         )
      }
      function n(c, p) {
         let f = r(this.namespace + (typeof p > 'u' ? ':' : p) + c)
         return (f.log = this.log), f
      }
      function i(c) {
         r.save(c), (r.namespaces = c), (r.names = []), (r.skips = [])
         let p,
            f = (typeof c == 'string' ? c : '').split(/[\s,]+/),
            m = f.length
         for (p = 0; p < m; p++)
            !f[p] ||
               ((c = f[p].replace(/\*/g, '.*?')),
               c[0] === '-'
                  ? r.skips.push(new RegExp('^' + c.slice(1) + '$'))
                  : r.names.push(new RegExp('^' + c + '$')))
      }
      function o() {
         let c = [
            ...r.names.map(a),
            ...r.skips.map(a).map((p) => '-' + p),
         ].join(',')
         return r.enable(''), c
      }
      function s(c) {
         if (c[c.length - 1] === '*') return !0
         let p, f
         for (p = 0, f = r.skips.length; p < f; p++)
            if (r.skips[p].test(c)) return !1
         for (p = 0, f = r.names.length; p < f; p++)
            if (r.names[p].test(c)) return !0
         return !1
      }
      function a(c) {
         return c
            .toString()
            .substring(2, c.toString().length - 2)
            .replace(/\.\*\?$/, '*')
      }
      function u(c) {
         return c instanceof Error ? c.stack || c.message : c
      }
      function l() {
         console.warn(
            'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.',
         )
      }
      return r.enable(r.load()), r
   }
   wo.exports = ul
})
var xo = _((de, yr) => {
   de.formatArgs = cl
   de.save = pl
   de.load = fl
   de.useColors = ll
   de.storage = ml()
   de.destroy = (() => {
      let e = !1
      return () => {
         e ||
            ((e = !0),
            console.warn(
               'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.',
            ))
      }
   })()
   de.colors = [
      '#0000CC',
      '#0000FF',
      '#0033CC',
      '#0033FF',
      '#0066CC',
      '#0066FF',
      '#0099CC',
      '#0099FF',
      '#00CC00',
      '#00CC33',
      '#00CC66',
      '#00CC99',
      '#00CCCC',
      '#00CCFF',
      '#3300CC',
      '#3300FF',
      '#3333CC',
      '#3333FF',
      '#3366CC',
      '#3366FF',
      '#3399CC',
      '#3399FF',
      '#33CC00',
      '#33CC33',
      '#33CC66',
      '#33CC99',
      '#33CCCC',
      '#33CCFF',
      '#6600CC',
      '#6600FF',
      '#6633CC',
      '#6633FF',
      '#66CC00',
      '#66CC33',
      '#9900CC',
      '#9900FF',
      '#9933CC',
      '#9933FF',
      '#99CC00',
      '#99CC33',
      '#CC0000',
      '#CC0033',
      '#CC0066',
      '#CC0099',
      '#CC00CC',
      '#CC00FF',
      '#CC3300',
      '#CC3333',
      '#CC3366',
      '#CC3399',
      '#CC33CC',
      '#CC33FF',
      '#CC6600',
      '#CC6633',
      '#CC9900',
      '#CC9933',
      '#CCCC00',
      '#CCCC33',
      '#FF0000',
      '#FF0033',
      '#FF0066',
      '#FF0099',
      '#FF00CC',
      '#FF00FF',
      '#FF3300',
      '#FF3333',
      '#FF3366',
      '#FF3399',
      '#FF33CC',
      '#FF33FF',
      '#FF6600',
      '#FF6633',
      '#FF9900',
      '#FF9933',
      '#FFCC00',
      '#FFCC33',
   ]
   function ll() {
      return typeof window < 'u' &&
         window.process &&
         (window.process.type === 'renderer' || window.process.__nwjs)
         ? !0
         : typeof navigator < 'u' &&
           navigator.userAgent &&
           navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
         ? !1
         : (typeof document < 'u' &&
              document.documentElement &&
              document.documentElement.style &&
              document.documentElement.style.WebkitAppearance) ||
           (typeof window < 'u' &&
              window.console &&
              (window.console.firebug ||
                 (window.console.exception && window.console.table))) ||
           (typeof navigator < 'u' &&
              navigator.userAgent &&
              navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
              parseInt(RegExp.$1, 10) >= 31) ||
           (typeof navigator < 'u' &&
              navigator.userAgent &&
              navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
   }
   function cl(e) {
      if (
         ((e[0] =
            (this.useColors ? '%c' : '') +
            this.namespace +
            (this.useColors ? ' %c' : ' ') +
            e[0] +
            (this.useColors ? '%c ' : ' ') +
            '+' +
            yr.exports.humanize(this.diff)),
         !this.useColors)
      )
         return
      let t = 'color: ' + this.color
      e.splice(1, 0, t, 'color: inherit')
      let r = 0,
         n = 0
      e[0].replace(/%[a-zA-Z%]/g, (i) => {
         i !== '%%' && (r++, i === '%c' && (n = r))
      }),
         e.splice(n, 0, t)
   }
   de.log = console.debug || console.log || (() => {})
   function pl(e) {
      try {
         e ? de.storage.setItem('debug', e) : de.storage.removeItem('debug')
      } catch {}
   }
   function fl() {
      let e
      try {
         e = de.storage.getItem('debug')
      } catch {}
      return (
         !e &&
            typeof process < 'u' &&
            'env' in process &&
            (e = process.env.DEBUG),
         e
      )
   }
   function ml() {
      try {
         return localStorage
      } catch {}
   }
   yr.exports = In()(de)
   var { formatters: dl } = yr.exports
   dl.j = function (e) {
      try {
         return JSON.stringify(e)
      } catch (t) {
         return '[UnexpectedJSONParseError]: ' + t.message
      }
   }
})
var Nn = _((sd, Eo) => {
   'use strict'
   Eo.exports = (e, t = process.argv) => {
      let r = e.startsWith('-') ? '' : e.length === 1 ? '-' : '--',
         n = t.indexOf(r + e),
         i = t.indexOf('--')
      return n !== -1 && (i === -1 || n < i)
   }
})
var _n = _((ad, vo) => {
   'use strict'
   var gl = require('os'),
      To = require('tty'),
      we = Nn(),
      { env: z } = process,
      Ve
   we('no-color') || we('no-colors') || we('color=false') || we('color=never')
      ? (Ve = 0)
      : (we('color') ||
           we('colors') ||
           we('color=true') ||
           we('color=always')) &&
        (Ve = 1)
   'FORCE_COLOR' in z &&
      (z.FORCE_COLOR === 'true'
         ? (Ve = 1)
         : z.FORCE_COLOR === 'false'
         ? (Ve = 0)
         : (Ve =
              z.FORCE_COLOR.length === 0
                 ? 1
                 : Math.min(parseInt(z.FORCE_COLOR, 10), 3)))
   function kn(e) {
      return e === 0
         ? !1
         : { level: e, hasBasic: !0, has256: e >= 2, has16m: e >= 3 }
   }
   function Ln(e, t) {
      if (Ve === 0) return 0
      if (we('color=16m') || we('color=full') || we('color=truecolor')) return 3
      if (we('color=256')) return 2
      if (e && !t && Ve === void 0) return 0
      let r = Ve || 0
      if (z.TERM === 'dumb') return r
      if (process.platform === 'win32') {
         let n = gl.release().split('.')
         return Number(n[0]) >= 10 && Number(n[2]) >= 10586
            ? Number(n[2]) >= 14931
               ? 3
               : 2
            : 1
      }
      if ('CI' in z)
         return [
            'TRAVIS',
            'CIRCLECI',
            'APPVEYOR',
            'GITLAB_CI',
            'GITHUB_ACTIONS',
            'BUILDKITE',
         ].some((n) => n in z) || z.CI_NAME === 'codeship'
            ? 1
            : r
      if ('TEAMCITY_VERSION' in z)
         return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(z.TEAMCITY_VERSION) ? 1 : 0
      if (z.COLORTERM === 'truecolor') return 3
      if ('TERM_PROGRAM' in z) {
         let n = parseInt((z.TERM_PROGRAM_VERSION || '').split('.')[0], 10)
         switch (z.TERM_PROGRAM) {
            case 'iTerm.app':
               return n >= 3 ? 3 : 2
            case 'Apple_Terminal':
               return 2
         }
      }
      return /-256(color)?$/i.test(z.TERM)
         ? 2
         : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(
              z.TERM,
           ) || 'COLORTERM' in z
         ? 1
         : r
   }
   function hl(e) {
      let t = Ln(e, e && e.isTTY)
      return kn(t)
   }
   vo.exports = {
      supportsColor: hl,
      stdout: kn(Ln(!0, To.isatty(1))),
      stderr: kn(Ln(!0, To.isatty(2))),
   }
})
var Mo = _((Y, wr) => {
   var yl = require('tty'),
      br = require('util')
   Y.init = Pl
   Y.log = El
   Y.formatArgs = wl
   Y.save = Tl
   Y.load = vl
   Y.useColors = bl
   Y.destroy = br.deprecate(() => {},
   'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.')
   Y.colors = [6, 2, 3, 4, 5, 1]
   try {
      let e = _n()
      e &&
         (e.stderr || e).level >= 2 &&
         (Y.colors = [
            20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62,
            63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112,
            113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165,
            166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196,
            197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209,
            214, 215, 220, 221,
         ])
   } catch {}
   Y.inspectOpts = Object.keys(process.env)
      .filter((e) => /^debug_/i.test(e))
      .reduce((e, t) => {
         let r = t
               .substring(6)
               .toLowerCase()
               .replace(/_([a-z])/g, (i, o) => o.toUpperCase()),
            n = process.env[t]
         return (
            /^(yes|on|true|enabled)$/i.test(n)
               ? (n = !0)
               : /^(no|off|false|disabled)$/i.test(n)
               ? (n = !1)
               : n === 'null'
               ? (n = null)
               : (n = Number(n)),
            (e[r] = n),
            e
         )
      }, {})
   function bl() {
      return 'colors' in Y.inspectOpts
         ? Boolean(Y.inspectOpts.colors)
         : yl.isatty(process.stderr.fd)
   }
   function wl(e) {
      let { namespace: t, useColors: r } = this
      if (r) {
         let n = this.color,
            i = '\x1B[3' + (n < 8 ? n : '8;5;' + n),
            o = `  ${i};1m${t} \x1B[0m`
         ;(e[0] =
            o +
            e[0]
               .split(
                  `
`,
               )
               .join(
                  `
` + o,
               )),
            e.push(i + 'm+' + wr.exports.humanize(this.diff) + '\x1B[0m')
      } else e[0] = xl() + t + ' ' + e[0]
   }
   function xl() {
      return Y.inspectOpts.hideDate ? '' : new Date().toISOString() + ' '
   }
   function El(...e) {
      return process.stderr.write(
         br.format(...e) +
            `
`,
      )
   }
   function Tl(e) {
      e ? (process.env.DEBUG = e) : delete process.env.DEBUG
   }
   function vl() {
      return process.env.DEBUG
   }
   function Pl(e) {
      e.inspectOpts = {}
      let t = Object.keys(Y.inspectOpts)
      for (let r = 0; r < t.length; r++)
         e.inspectOpts[t[r]] = Y.inspectOpts[t[r]]
   }
   wr.exports = In()(Y)
   var { formatters: Po } = wr.exports
   Po.o = function (e) {
      return (
         (this.inspectOpts.colors = this.useColors),
         br
            .inspect(e, this.inspectOpts)
            .split(
               `
`,
            )
            .map((t) => t.trim())
            .join(' ')
      )
   }
   Po.O = function (e) {
      return (
         (this.inspectOpts.colors = this.useColors),
         br.inspect(e, this.inspectOpts)
      )
   }
})
var Fo = _((ud, jn) => {
   typeof process > 'u' ||
   process.type === 'renderer' ||
   process.browser === !0 ||
   process.__nwjs
      ? (jn.exports = xo())
      : (jn.exports = Mo())
})
var Ao = _((cd, Cl) => {
   Cl.exports = {
      name: 'dotenv',
      version: '16.0.3',
      description: 'Loads environment variables from .env file',
      main: 'lib/main.js',
      types: 'lib/main.d.ts',
      exports: {
         '.': {
            require: './lib/main.js',
            types: './lib/main.d.ts',
            default: './lib/main.js',
         },
         './config': './config.js',
         './config.js': './config.js',
         './lib/env-options': './lib/env-options.js',
         './lib/env-options.js': './lib/env-options.js',
         './lib/cli-options': './lib/cli-options.js',
         './lib/cli-options.js': './lib/cli-options.js',
         './package.json': './package.json',
      },
      scripts: {
         'dts-check': 'tsc --project tests/types/tsconfig.json',
         lint: 'standard',
         'lint-readme': 'standard-markdown',
         pretest: 'npm run lint && npm run dts-check',
         test: 'tap tests/*.js --100 -Rspec',
         prerelease: 'npm test',
         release: 'standard-version',
      },
      repository: { type: 'git', url: 'git://github.com/motdotla/dotenv.git' },
      keywords: [
         'dotenv',
         'env',
         '.env',
         'environment',
         'variables',
         'config',
         'settings',
      ],
      readmeFilename: 'README.md',
      license: 'BSD-2-Clause',
      devDependencies: {
         '@types/node': '^17.0.9',
         decache: '^4.6.1',
         dtslint: '^3.7.0',
         sinon: '^12.0.1',
         standard: '^16.0.4',
         'standard-markdown': '^7.1.0',
         'standard-version': '^9.3.2',
         tap: '^15.1.6',
         tar: '^6.1.11',
         typescript: '^4.5.4',
      },
      engines: { node: '>=12' },
   }
})
var Ro = _((pd, Tr) => {
   var Sl = require('fs'),
      Oo = require('path'),
      Al = require('os'),
      Ol = Ao(),
      Rl = Ol.version,
      $l =
         /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm
   function Dl(e) {
      let t = {},
         r = e.toString()
      r = r.replace(
         /\r\n?/gm,
         `
`,
      )
      let n
      for (; (n = $l.exec(r)) != null; ) {
         let i = n[1],
            o = n[2] || ''
         o = o.trim()
         let s = o[0]
         ;(o = o.replace(/^(['"`])([\s\S]*)\1$/gm, '$2')),
            s === '"' &&
               ((o = o.replace(
                  /\\n/g,
                  `
`,
               )),
               (o = o.replace(/\\r/g, '\r'))),
            (t[i] = o)
      }
      return t
   }
   function Bn(e) {
      console.log(`[dotenv@${Rl}][DEBUG] ${e}`)
   }
   function Il(e) {
      return e[0] === '~' ? Oo.join(Al.homedir(), e.slice(1)) : e
   }
   function Nl(e) {
      let t = Oo.resolve(process.cwd(), '.env'),
         r = 'utf8',
         n = Boolean(e && e.debug),
         i = Boolean(e && e.override)
      e &&
         (e.path != null && (t = Il(e.path)),
         e.encoding != null && (r = e.encoding))
      try {
         let o = Er.parse(Sl.readFileSync(t, { encoding: r }))
         return (
            Object.keys(o).forEach(function (s) {
               Object.prototype.hasOwnProperty.call(process.env, s)
                  ? (i === !0 && (process.env[s] = o[s]),
                    n &&
                       Bn(
                          i === !0
                             ? `"${s}" is already defined in \`process.env\` and WAS overwritten`
                             : `"${s}" is already defined in \`process.env\` and was NOT overwritten`,
                       ))
                  : (process.env[s] = o[s])
            }),
            { parsed: o }
         )
      } catch (o) {
         return n && Bn(`Failed to load ${t} ${o.message}`), { error: o }
      }
   }
   var Er = { config: Nl, parse: Dl }
   Tr.exports.config = Er.config
   Tr.exports.parse = Er.parse
   Tr.exports = Er
})
var Lo = _((bd, ko) => {
   'use strict'
   ko.exports = (e) => {
      let t = e.match(/^[ \t]*(?=\S)/gm)
      return t ? t.reduce((r, n) => Math.min(r, n.length), 1 / 0) : 0
   }
})
var Gn = _((wd, _o) => {
   'use strict'
   var jl = Lo()
   _o.exports = (e) => {
      let t = jl(e)
      if (t === 0) return e
      let r = new RegExp(`^[ \\t]{${t}}`, 'gm')
      return e.replace(r, '')
   }
})
var Uo = _(($d, zn) => {
   'use strict'
   var $ = zn.exports
   zn.exports.default = $
   var N = '\x1B[',
      Lt = '\x1B]',
      dt = '\x07',
      Fr = ';',
      Vo = process.env.TERM_PROGRAM === 'Apple_Terminal'
   $.cursorTo = (e, t) => {
      if (typeof e != 'number')
         throw new TypeError('The `x` argument is required')
      return typeof t != 'number'
         ? N + (e + 1) + 'G'
         : N + (t + 1) + ';' + (e + 1) + 'H'
   }
   $.cursorMove = (e, t) => {
      if (typeof e != 'number')
         throw new TypeError('The `x` argument is required')
      let r = ''
      return (
         e < 0 ? (r += N + -e + 'D') : e > 0 && (r += N + e + 'C'),
         t < 0 ? (r += N + -t + 'A') : t > 0 && (r += N + t + 'B'),
         r
      )
   }
   $.cursorUp = (e = 1) => N + e + 'A'
   $.cursorDown = (e = 1) => N + e + 'B'
   $.cursorForward = (e = 1) => N + e + 'C'
   $.cursorBackward = (e = 1) => N + e + 'D'
   $.cursorLeft = N + 'G'
   $.cursorSavePosition = Vo ? '\x1B7' : N + 's'
   $.cursorRestorePosition = Vo ? '\x1B8' : N + 'u'
   $.cursorGetPosition = N + '6n'
   $.cursorNextLine = N + 'E'
   $.cursorPrevLine = N + 'F'
   $.cursorHide = N + '?25l'
   $.cursorShow = N + '?25h'
   $.eraseLines = (e) => {
      let t = ''
      for (let r = 0; r < e; r++)
         t += $.eraseLine + (r < e - 1 ? $.cursorUp() : '')
      return e && (t += $.cursorLeft), t
   }
   $.eraseEndLine = N + 'K'
   $.eraseStartLine = N + '1K'
   $.eraseLine = N + '2K'
   $.eraseDown = N + 'J'
   $.eraseUp = N + '1J'
   $.eraseScreen = N + '2J'
   $.scrollUp = N + 'S'
   $.scrollDown = N + 'T'
   $.clearScreen = '\x1Bc'
   $.clearTerminal =
      process.platform === 'win32'
         ? `${$.eraseScreen}${N}0f`
         : `${$.eraseScreen}${N}3J${N}H`
   $.beep = dt
   $.link = (e, t) => [Lt, '8', Fr, Fr, t, dt, e, Lt, '8', Fr, Fr, dt].join('')
   $.image = (e, t = {}) => {
      let r = `${Lt}1337;File=inline=1`
      return (
         t.width && (r += `;width=${t.width}`),
         t.height && (r += `;height=${t.height}`),
         t.preserveAspectRatio === !1 && (r += ';preserveAspectRatio=0'),
         r + ':' + e.toString('base64') + dt
      )
   }
   $.iTerm = {
      setCwd: (e = process.cwd()) => `${Lt}50;CurrentDir=${e}${dt}`,
      annotation: (e, t = {}) => {
         let r = `${Lt}1337;`,
            n = typeof t.x < 'u',
            i = typeof t.y < 'u'
         if ((n || i) && !(n && i && typeof t.length < 'u'))
            throw new Error(
               '`x`, `y` and `length` must be defined when `x` or `y` is defined',
            )
         return (
            (e = e.replace(/\|/g, '')),
            (r += t.isHidden ? 'AddHiddenAnnotation=' : 'AddAnnotation='),
            t.length > 0
               ? (r += (n ? [e, t.length, t.x, t.y] : [t.length, e]).join('|'))
               : (r += e),
            r + dt
         )
      },
   }
})
var Jo = _((Dd, Go) => {
   'use strict'
   var Ul = _n(),
      gt = Nn()
   function Qo(e) {
      if (/^\d{3,4}$/.test(e)) {
         let r = /(\d{1,2})(\d{2})/.exec(e)
         return {
            major: 0,
            minor: parseInt(r[1], 10),
            patch: parseInt(r[2], 10),
         }
      }
      let t = (e || '').split('.').map((r) => parseInt(r, 10))
      return { major: t[0], minor: t[1], patch: t[2] }
   }
   function Yn(e) {
      let { env: t } = process
      if ('FORCE_HYPERLINK' in t)
         return !(
            t.FORCE_HYPERLINK.length > 0 &&
            parseInt(t.FORCE_HYPERLINK, 10) === 0
         )
      if (
         gt('no-hyperlink') ||
         gt('no-hyperlinks') ||
         gt('hyperlink=false') ||
         gt('hyperlink=never')
      )
         return !1
      if (gt('hyperlink=true') || gt('hyperlink=always') || 'NETLIFY' in t)
         return !0
      if (
         !Ul.supportsColor(e) ||
         (e && !e.isTTY) ||
         process.platform === 'win32' ||
         'CI' in t ||
         'TEAMCITY_VERSION' in t
      )
         return !1
      if ('TERM_PROGRAM' in t) {
         let r = Qo(t.TERM_PROGRAM_VERSION)
         switch (t.TERM_PROGRAM) {
            case 'iTerm.app':
               return r.major === 3 ? r.minor >= 1 : r.major > 3
            case 'WezTerm':
               return r.major >= 20200620
            case 'vscode':
               return r.major > 1 || (r.major === 1 && r.minor >= 72)
         }
      }
      if ('VTE_VERSION' in t) {
         if (t.VTE_VERSION === '0.50.0') return !1
         let r = Qo(t.VTE_VERSION)
         return r.major > 0 || r.minor >= 50
      }
      return !1
   }
   Go.exports = {
      supportsHyperlink: Yn,
      stdout: Yn(process.stdout),
      stderr: Yn(process.stderr),
   }
})
var Wo = _((Id, _t) => {
   'use strict'
   var Ql = Uo(),
      Zn = Jo(),
      Ko = (e, t, { target: r = 'stdout', ...n } = {}) =>
         Zn[r]
            ? Ql.link(e, t)
            : n.fallback === !1
            ? e
            : typeof n.fallback == 'function'
            ? n.fallback(e, t)
            : `${e} (\u200B${t}\u200B)`
   _t.exports = (e, t, r = {}) => Ko(e, t, r)
   _t.exports.stderr = (e, t, r = {}) => Ko(e, t, { target: 'stderr', ...r })
   _t.exports.isSupported = Zn.stdout
   _t.exports.stderr.isSupported = Zn.stderr
})
var is = _((Zd, oc) => {
   oc.exports = {
      name: '@prisma/engines-version',
      version: '4.15.0-28.8fbc245156db7124f997f4cecdd8d1219e360944',
      main: 'index.js',
      types: 'index.d.ts',
      license: 'Apache-2.0',
      author: 'Tim Suchanek <suchanek@prisma.io>',
      prisma: { enginesVersion: '8fbc245156db7124f997f4cecdd8d1219e360944' },
      repository: {
         type: 'git',
         url: 'https://github.com/prisma/engines-wrapper.git',
         directory: 'packages/engines-version',
      },
      devDependencies: { '@types/node': '18.16.14', typescript: '4.9.5' },
      files: ['index.js', 'index.d.ts'],
      scripts: { build: 'tsc -d' },
   }
})
var ri = _((Or) => {
   'use strict'
   Object.defineProperty(Or, '__esModule', { value: !0 })
   Or.enginesVersion = void 0
   Or.enginesVersion = is().prisma.enginesVersion
})
var Bt = _((pg, as) => {
   'use strict'
   as.exports = (e, t = 1, r) => {
      if (
         ((r = { indent: ' ', includeEmptyLines: !1, ...r }),
         typeof e != 'string')
      )
         throw new TypeError(
            `Expected \`input\` to be a \`string\`, got \`${typeof e}\``,
         )
      if (typeof t != 'number')
         throw new TypeError(
            `Expected \`count\` to be a \`number\`, got \`${typeof t}\``,
         )
      if (typeof r.indent != 'string')
         throw new TypeError(
            `Expected \`options.indent\` to be a \`string\`, got \`${typeof r.indent}\``,
         )
      if (t === 0) return e
      let n = r.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm
      return e.replace(n, r.indent.repeat(t))
   }
})
var ps = _((dg, cs) => {
   'use strict'
   cs.exports = ({ onlyFirst: e = !1 } = {}) => {
      let t = [
         '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
         '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))',
      ].join('|')
      return new RegExp(t, e ? void 0 : 'g')
   }
})
var Qt = _((gg, fs) => {
   'use strict'
   var gc = ps()
   fs.exports = (e) => (typeof e == 'string' ? e.replace(gc(), '') : e)
})
var ms = _((wg, $r) => {
   'use strict'
   $r.exports = (e = {}) => {
      let t
      if (e.repoUrl) t = e.repoUrl
      else if (e.user && e.repo) t = `https://github.com/${e.user}/${e.repo}`
      else
         throw new Error(
            'You need to specify either the `repoUrl` option or both the `user` and `repo` options',
         )
      let r = new URL(`${t}/issues/new`),
         n = [
            'body',
            'title',
            'labels',
            'template',
            'milestone',
            'assignee',
            'projects',
         ]
      for (let i of n) {
         let o = e[i]
         if (o !== void 0) {
            if (i === 'labels' || i === 'projects') {
               if (!Array.isArray(o))
                  throw new TypeError(`The \`${i}\` option should be an array`)
               o = o.join(',')
            }
            r.searchParams.set(i, o)
         }
      }
      return r.toString()
   }
   $r.exports.default = $r.exports
})
var Br = _((ph, $s) => {
   'use strict'
   $s.exports = (function () {
      function e(t, r, n, i, o) {
         return t < r || n < r ? (t > n ? n + 1 : t + 1) : i === o ? r : r + 1
      }
      return function (t, r) {
         if (t === r) return 0
         if (t.length > r.length) {
            var n = t
            ;(t = r), (r = n)
         }
         for (
            var i = t.length, o = r.length;
            i > 0 && t.charCodeAt(i - 1) === r.charCodeAt(o - 1);

         )
            i--, o--
         for (var s = 0; s < i && t.charCodeAt(s) === r.charCodeAt(s); ) s++
         if (((i -= s), (o -= s), i === 0 || o < 3)) return o
         var a = 0,
            u,
            l,
            c,
            p,
            f,
            m,
            d,
            g,
            b,
            h,
            x,
            w,
            E = []
         for (u = 0; u < i; u++) E.push(u + 1), E.push(t.charCodeAt(s + u))
         for (var C = E.length - 1; a < o - 3; )
            for (
               b = r.charCodeAt(s + (l = a)),
                  h = r.charCodeAt(s + (c = a + 1)),
                  x = r.charCodeAt(s + (p = a + 2)),
                  w = r.charCodeAt(s + (f = a + 3)),
                  m = a += 4,
                  u = 0;
               u < C;
               u += 2
            )
               (d = E[u]),
                  (g = E[u + 1]),
                  (l = e(d, l, c, b, g)),
                  (c = e(l, c, p, h, g)),
                  (p = e(c, p, f, x, g)),
                  (m = e(p, f, m, w, g)),
                  (E[u] = m),
                  (f = p),
                  (p = c),
                  (c = l),
                  (l = d)
         for (; a < o; )
            for (b = r.charCodeAt(s + (l = a)), m = ++a, u = 0; u < C; u += 2)
               (d = E[u]), (E[u] = m = e(d, l, m, b, E[u + 1])), (l = d)
         return m
      }
   })()
})
var Ls = _((Mi, Fi) => {
   ;(function (e, t) {
      typeof require == 'function' &&
      typeof Mi == 'object' &&
      typeof Fi == 'object'
         ? (Fi.exports = t())
         : (e.pluralize = t())
   })(Mi, function () {
      var e = [],
         t = [],
         r = {},
         n = {},
         i = {}
      function o(m) {
         return typeof m == 'string' ? new RegExp('^' + m + '$', 'i') : m
      }
      function s(m, d) {
         return m === d
            ? d
            : m === m.toLowerCase()
            ? d.toLowerCase()
            : m === m.toUpperCase()
            ? d.toUpperCase()
            : m[0] === m[0].toUpperCase()
            ? d.charAt(0).toUpperCase() + d.substr(1).toLowerCase()
            : d.toLowerCase()
      }
      function a(m, d) {
         return m.replace(/\$(\d{1,2})/g, function (g, b) {
            return d[b] || ''
         })
      }
      function u(m, d) {
         return m.replace(d[0], function (g, b) {
            var h = a(d[1], arguments)
            return s(g === '' ? m[b - 1] : g, h)
         })
      }
      function l(m, d, g) {
         if (!m.length || r.hasOwnProperty(m)) return d
         for (var b = g.length; b--; ) {
            var h = g[b]
            if (h[0].test(d)) return u(d, h)
         }
         return d
      }
      function c(m, d, g) {
         return function (b) {
            var h = b.toLowerCase()
            return d.hasOwnProperty(h)
               ? s(b, h)
               : m.hasOwnProperty(h)
               ? s(b, m[h])
               : l(h, b, g)
         }
      }
      function p(m, d, g, b) {
         return function (h) {
            var x = h.toLowerCase()
            return d.hasOwnProperty(x)
               ? !0
               : m.hasOwnProperty(x)
               ? !1
               : l(x, x, g) === x
         }
      }
      function f(m, d, g) {
         var b = d === 1 ? f.singular(m) : f.plural(m)
         return (g ? d + ' ' : '') + b
      }
      return (
         (f.plural = c(i, n, e)),
         (f.isPlural = p(i, n, e)),
         (f.singular = c(n, i, t)),
         (f.isSingular = p(n, i, t)),
         (f.addPluralRule = function (m, d) {
            e.push([o(m), d])
         }),
         (f.addSingularRule = function (m, d) {
            t.push([o(m), d])
         }),
         (f.addUncountableRule = function (m) {
            if (typeof m == 'string') {
               r[m.toLowerCase()] = !0
               return
            }
            f.addPluralRule(m, '$0'), f.addSingularRule(m, '$0')
         }),
         (f.addIrregularRule = function (m, d) {
            ;(d = d.toLowerCase()),
               (m = m.toLowerCase()),
               (i[m] = d),
               (n[d] = m)
         }),
         [
            ['I', 'we'],
            ['me', 'us'],
            ['he', 'they'],
            ['she', 'they'],
            ['them', 'them'],
            ['myself', 'ourselves'],
            ['yourself', 'yourselves'],
            ['itself', 'themselves'],
            ['herself', 'themselves'],
            ['himself', 'themselves'],
            ['themself', 'themselves'],
            ['is', 'are'],
            ['was', 'were'],
            ['has', 'have'],
            ['this', 'these'],
            ['that', 'those'],
            ['echo', 'echoes'],
            ['dingo', 'dingoes'],
            ['volcano', 'volcanoes'],
            ['tornado', 'tornadoes'],
            ['torpedo', 'torpedoes'],
            ['genus', 'genera'],
            ['viscus', 'viscera'],
            ['stigma', 'stigmata'],
            ['stoma', 'stomata'],
            ['dogma', 'dogmata'],
            ['lemma', 'lemmata'],
            ['schema', 'schemata'],
            ['anathema', 'anathemata'],
            ['ox', 'oxen'],
            ['axe', 'axes'],
            ['die', 'dice'],
            ['yes', 'yeses'],
            ['foot', 'feet'],
            ['eave', 'eaves'],
            ['goose', 'geese'],
            ['tooth', 'teeth'],
            ['quiz', 'quizzes'],
            ['human', 'humans'],
            ['proof', 'proofs'],
            ['carve', 'carves'],
            ['valve', 'valves'],
            ['looey', 'looies'],
            ['thief', 'thieves'],
            ['groove', 'grooves'],
            ['pickaxe', 'pickaxes'],
            ['passerby', 'passersby'],
         ].forEach(function (m) {
            return f.addIrregularRule(m[0], m[1])
         }),
         [
            [/s?$/i, 's'],
            [/[^\u0000-\u007F]$/i, '$0'],
            [/([^aeiou]ese)$/i, '$1'],
            [/(ax|test)is$/i, '$1es'],
            [/(alias|[^aou]us|t[lm]as|gas|ris)$/i, '$1es'],
            [/(e[mn]u)s?$/i, '$1s'],
            [/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i, '$1'],
            [
               /(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i,
               '$1i',
            ],
            [/(alumn|alg|vertebr)(?:a|ae)$/i, '$1ae'],
            [/(seraph|cherub)(?:im)?$/i, '$1im'],
            [/(her|at|gr)o$/i, '$1oes'],
            [
               /(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i,
               '$1a',
            ],
            [
               /(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i,
               '$1a',
            ],
            [/sis$/i, 'ses'],
            [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, '$1$2ves'],
            [/([^aeiouy]|qu)y$/i, '$1ies'],
            [/([^ch][ieo][ln])ey$/i, '$1ies'],
            [/(x|ch|ss|sh|zz)$/i, '$1es'],
            [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, '$1ices'],
            [/\b((?:tit)?m|l)(?:ice|ouse)$/i, '$1ice'],
            [/(pe)(?:rson|ople)$/i, '$1ople'],
            [/(child)(?:ren)?$/i, '$1ren'],
            [/eaux$/i, '$0'],
            [/m[ae]n$/i, 'men'],
            ['thou', 'you'],
         ].forEach(function (m) {
            return f.addPluralRule(m[0], m[1])
         }),
         [
            [/s$/i, ''],
            [/(ss)$/i, '$1'],
            [
               /(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i,
               '$1fe',
            ],
            [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, '$1f'],
            [/ies$/i, 'y'],
            [
               /\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i,
               '$1ie',
            ],
            [/\b(mon|smil)ies$/i, '$1ey'],
            [/\b((?:tit)?m|l)ice$/i, '$1ouse'],
            [/(seraph|cherub)im$/i, '$1'],
            [
               /(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i,
               '$1',
            ],
            [
               /(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i,
               '$1sis',
            ],
            [/(movie|twelve|abuse|e[mn]u)s$/i, '$1'],
            [/(test)(?:is|es)$/i, '$1is'],
            [
               /(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i,
               '$1us',
            ],
            [
               /(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i,
               '$1um',
            ],
            [
               /(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i,
               '$1on',
            ],
            [/(alumn|alg|vertebr)ae$/i, '$1a'],
            [/(cod|mur|sil|vert|ind)ices$/i, '$1ex'],
            [/(matr|append)ices$/i, '$1ix'],
            [/(pe)(rson|ople)$/i, '$1rson'],
            [/(child)ren$/i, '$1'],
            [/(eau)x?$/i, '$1'],
            [/men$/i, 'man'],
         ].forEach(function (m) {
            return f.addSingularRule(m[0], m[1])
         }),
         [
            'adulthood',
            'advice',
            'agenda',
            'aid',
            'aircraft',
            'alcohol',
            'ammo',
            'analytics',
            'anime',
            'athletics',
            'audio',
            'bison',
            'blood',
            'bream',
            'buffalo',
            'butter',
            'carp',
            'cash',
            'chassis',
            'chess',
            'clothing',
            'cod',
            'commerce',
            'cooperation',
            'corps',
            'debris',
            'diabetes',
            'digestion',
            'elk',
            'energy',
            'equipment',
            'excretion',
            'expertise',
            'firmware',
            'flounder',
            'fun',
            'gallows',
            'garbage',
            'graffiti',
            'hardware',
            'headquarters',
            'health',
            'herpes',
            'highjinks',
            'homework',
            'housework',
            'information',
            'jeans',
            'justice',
            'kudos',
            'labour',
            'literature',
            'machinery',
            'mackerel',
            'mail',
            'media',
            'mews',
            'moose',
            'music',
            'mud',
            'manga',
            'news',
            'only',
            'personnel',
            'pike',
            'plankton',
            'pliers',
            'police',
            'pollution',
            'premises',
            'rain',
            'research',
            'rice',
            'salmon',
            'scissors',
            'series',
            'sewage',
            'shambles',
            'shrimp',
            'software',
            'species',
            'staff',
            'swine',
            'tennis',
            'traffic',
            'transportation',
            'trout',
            'tuna',
            'wealth',
            'welfare',
            'whiting',
            'wildebeest',
            'wildlife',
            'you',
            /pok[eé]mon$/i,
            /[^aeiou]ese$/i,
            /deer$/i,
            /fish$/i,
            /measles$/i,
            /o[iu]s$/i,
            /pox$/i,
            /sheep$/i,
         ].forEach(f.addUncountableRule),
         f
      )
   })
})
var va = _((Mb, Ta) => {
   'use strict'
   Ta.exports = (e) => Object.prototype.toString.call(e) === '[object RegExp]'
})
var Ma = _((Fb, Pa) => {
   'use strict'
   Pa.exports = (e) => {
      let t = typeof e
      return e !== null && (t === 'object' || t === 'function')
   }
})
var Fa = _((Ri) => {
   'use strict'
   Object.defineProperty(Ri, '__esModule', { value: !0 })
   Ri.default = (e) =>
      Object.getOwnPropertySymbols(e).filter((t) =>
         Object.prototype.propertyIsEnumerable.call(e, t),
      )
})
var Qa = _((jw, Rf) => {
   Rf.exports = {
      name: '@prisma/client',
      version: '4.15.0',
      description:
         "Prisma Client is an auto-generated, type-safe and modern JavaScript/TypeScript ORM for Node.js that's tailored to your data. Supports MySQL, PostgreSQL, MariaDB, SQLite databases.",
      keywords: [
         'orm',
         'prisma2',
         'prisma',
         'client',
         'query',
         'database',
         'sql',
         'postgres',
         'postgresql',
         'mysql',
         'sqlite',
         'mariadb',
         'mssql',
         'typescript',
         'query-builder',
      ],
      main: 'index.js',
      browser: 'index-browser.js',
      types: 'index.d.ts',
      license: 'Apache-2.0',
      engines: { node: '>=14.17' },
      homepage: 'https://www.prisma.io',
      repository: {
         type: 'git',
         url: 'https://github.com/prisma/prisma.git',
         directory: 'packages/client',
      },
      author: 'Tim Suchanek <suchanek@prisma.io>',
      bugs: 'https://github.com/prisma/prisma/issues',
      scripts: {
         dev: 'DEV=true node -r esbuild-register helpers/build.ts',
         build: 'node -r esbuild-register helpers/build.ts',
         test: 'jest --silent',
         'test:e2e': 'node -r esbuild-register tests/e2e/_utils/run.ts',
         'test:functional':
            'node -r esbuild-register helpers/functional-test/run-tests.ts',
         'test:memory': 'node -r esbuild-register helpers/memory-tests.ts',
         'test:functional:code':
            'node -r esbuild-register helpers/functional-test/run-tests.ts --no-types',
         'test:functional:types':
            'node -r esbuild-register helpers/functional-test/run-tests.ts --types-only',
         'test-notypes':
            'jest --silent --testPathIgnorePatterns src/__tests__/types/types.test.ts',
         generate: 'node scripts/postinstall.js',
         postinstall: 'node scripts/postinstall.js',
         prepublishOnly: 'pnpm run build',
         'new-test':
            "NODE_OPTIONS='-r ts-node/register' yo ./helpers/generator-test/index.ts",
      },
      files: [
         'README.md',
         'runtime',
         '!runtime/*.map',
         'scripts',
         'generator-build',
         'edge.js',
         'edge.d.ts',
         'index.js',
         'index.d.ts',
         'index-browser.js',
      ],
      devDependencies: {
         '@codspeed/benchmark.js-plugin': '1.1.0',
         '@faker-js/faker': '8.0.1',
         '@fast-check/jest': '1.6.2',
         '@jest/create-cache-key-function': '29.5.0',
         '@jest/globals': '29.5.0',
         '@jest/test-sequencer': '29.5.0',
         '@opentelemetry/api': '1.4.1',
         '@opentelemetry/context-async-hooks': '1.13.0',
         '@opentelemetry/instrumentation': '0.39.1',
         '@opentelemetry/resources': '1.13.0',
         '@opentelemetry/sdk-trace-base': '1.13.0',
         '@opentelemetry/semantic-conventions': '1.13.0',
         '@prisma/debug': 'workspace:*',
         '@prisma/engines': 'workspace:*',
         '@prisma/fetch-engine': 'workspace:*',
         '@prisma/generator-helper': 'workspace:*',
         '@prisma/get-platform': 'workspace:*',
         '@prisma/instrumentation': 'workspace:*',
         '@prisma/internals': 'workspace:*',
         '@prisma/migrate': 'workspace:*',
         '@prisma/mini-proxy': '0.7.0',
         '@swc-node/register': '1.6.5',
         '@swc/core': '1.3.32',
         '@swc/jest': '0.2.26',
         '@timsuchanek/copy': '1.4.5',
         '@types/debug': '4.1.8',
         '@types/fs-extra': '9.0.13',
         '@types/jest': '29.5.1',
         '@types/js-levenshtein': '1.1.1',
         '@types/mssql': '8.1.2',
         '@types/node': '18.16.14',
         '@types/pg': '8.10.1',
         '@types/yeoman-generator': '5.2.11',
         arg: '5.0.2',
         benchmark: '2.1.4',
         'ci-info': '3.8.0',
         'decimal.js': '10.4.3',
         'env-paths': '2.2.1',
         esbuild: '0.15.13',
         execa: '5.1.1',
         'expect-type': '0.15.0',
         'flat-map-polyfill': '0.3.8',
         'fs-extra': '11.1.0',
         'get-own-enumerable-property-symbols': '3.0.2',
         'get-stream': '6.0.1',
         globby: '11.1.0',
         'indent-string': '4.0.0',
         'is-obj': '2.0.0',
         'is-regexp': '2.1.0',
         jest: '29.5.0',
         'jest-junit': '16.0.0',
         'jest-serializer-ansi-escapes': '2.0.1',
         'jest-snapshot': '29.5.0',
         'js-levenshtein': '1.1.6',
         kleur: '4.1.5',
         klona: '2.0.6',
         'lz-string': '1.5.0',
         mariadb: '3.0.2',
         memfs: '3.5.1',
         mssql: '9.1.1',
         'new-github-issue-url': '0.2.1',
         'node-fetch': '2.6.11',
         'p-retry': '4.6.2',
         pg: '8.9.0',
         'pkg-up': '3.1.0',
         pluralize: '8.0.0',
         resolve: '1.22.1',
         rimraf: '3.0.2',
         'simple-statistics': '7.8.2',
         'sort-keys': '4.2.0',
         'source-map-support': '0.5.21',
         'sql-template-tag': '5.0.3',
         'stacktrace-parser': '0.1.10',
         'strip-ansi': '6.0.1',
         'strip-indent': '3.0.0',
         'ts-node': '10.9.1',
         'ts-pattern': '4.3.0',
         tsd: '0.28.1',
         typescript: '4.9.5',
         undici: '5.22.0',
         'yeoman-generator': '5.9.0',
         yo: '4.3.1',
         zx: '7.2.2',
      },
      peerDependencies: { prisma: '*' },
      peerDependenciesMeta: { prisma: { optional: !0 } },
      dependencies: {
         '@prisma/engines-version':
            '4.15.0-28.8fbc245156db7124f997f4cecdd8d1219e360944',
      },
      sideEffects: !1,
   }
})
var Nm = {}
dr(Nm, {
   DMMF: () => xe,
   DMMFClass: () => We,
   Debug: () => qn,
   Decimal: () => he,
   Extensions: () => Rn,
   MetricsClient: () => bt,
   NotFoundError: () => ve,
   PrismaClientInitializationError: () => Q,
   PrismaClientKnownRequestError: () => re,
   PrismaClientRustPanicError: () => ge,
   PrismaClientUnknownRequestError: () => ne,
   PrismaClientValidationError: () => K,
   Sql: () => be,
   Types: () => $n,
   decompressFromBase64: () => Wu,
   defineDmmfProperty: () => hs,
   empty: () => bu,
   getPrismaClient: () => Ju,
   join: () => yu,
   makeDocument: () => sn,
   makeStrictEnum: () => Ku,
   objectEnumValues: () => Et,
   raw: () => Xi,
   sqltag: () => eo,
   transformDocument: () => Aa,
   unpack: () => an,
   warnEnvConflicts: () => Hu,
   warnOnce: () => Jt,
})
module.exports = tl(Nm)
var Rn = {}
dr(Rn, { defineExtension: () => ao, getExtensionContext: () => uo })
function ao(e) {
   return typeof e == 'function' ? e : (t) => t.$extends(e)
}
function uo(e) {
   return e
}
var $n = {}
dr($n, { Extensions: () => lo, Public: () => co, Utils: () => po })
var lo = {}
var co = {}
var po = {}
var Dn,
   fo,
   mo,
   go,
   ho = !0
typeof process < 'u' &&
   (({
      FORCE_COLOR: Dn,
      NODE_DISABLE_COLORS: fo,
      NO_COLOR: mo,
      TERM: go,
   } = process.env || {}),
   (ho = process.stdout && process.stdout.isTTY))
var rl = {
   enabled:
      !fo && mo == null && go !== 'dumb' && ((Dn != null && Dn !== '0') || ho),
}
function j(e, t) {
   let r = new RegExp(`\\x1b\\[${t}m`, 'g'),
      n = `\x1B[${e}m`,
      i = `\x1B[${t}m`
   return function (o) {
      return !rl.enabled || o == null
         ? o
         : n + (~('' + o).indexOf(i) ? o.replace(r, i + n) : o) + i
   }
}
var Bm = j(0, 0),
   M = j(1, 22),
   D = j(2, 22),
   Vm = j(3, 23),
   le = j(4, 24),
   Um = j(7, 27),
   Qm = j(8, 28),
   Gm = j(9, 29),
   Jm = j(30, 39),
   R = j(31, 39),
   A = j(32, 39),
   Ae = j(33, 39),
   ut = j(34, 39),
   Km = j(35, 39),
   Be = j(36, 39),
   Dt = j(37, 39),
   gr = j(90, 39),
   Wm = j(90, 39),
   Hm = j(40, 49),
   zm = j(41, 49),
   Ym = j(42, 49),
   Zm = j(43, 49),
   Xm = j(44, 49),
   ed = j(45, 49),
   td = j(46, 49),
   rd = j(47, 49)
var xr = S(Fo()),
   Ml = 100,
   It = []
typeof process < 'u' &&
   typeof process.stderr?.write != 'function' &&
   (xr.default.log = console.debug ?? console.log)
function Fl(e) {
   let t = (0, xr.default)(e),
      r = Object.assign(
         (...n) => (
            (t.log = r.log),
            n.length !== 0 && It.push([e, ...n]),
            It.length > Ml && It.shift(),
            t('', ...n)
         ),
         t,
      )
   return r
}
var qn = Object.assign(Fl, xr.default)
function Co(e = 7500) {
   let t = It.map((r) =>
      r.map((n) => (typeof n == 'string' ? n : JSON.stringify(n))).join(' '),
   ).join(`
`)
   return t.length < e ? t : t.slice(-e)
}
function So() {
   It.length = 0
}
var B = qn
var Un = S(Ro()),
   vr = S(require('fs'))
var ft = S(require('path'))
function $o(e) {
   let t = e.ignoreProcessEnv ? {} : process.env,
      r = (n) =>
         n.match(/(.?\${(?:[a-zA-Z0-9_]+)?})/g)?.reduce(function (o, s) {
            let a = /(.?)\${([a-zA-Z0-9_]+)?}/g.exec(s)
            if (!a) return o
            let u = a[1],
               l,
               c
            if (u === '\\') (c = a[0]), (l = c.replace('\\$', '$'))
            else {
               let p = a[2]
               ;(c = a[0].substring(u.length)),
                  (l = Object.hasOwnProperty.call(t, p)
                     ? t[p]
                     : e.parsed[p] || ''),
                  (l = r(l))
            }
            return o.replace(c, l)
         }, n) ?? n
   for (let n in e.parsed) {
      let i = Object.hasOwnProperty.call(t, n) ? t[n] : e.parsed[n]
      e.parsed[n] = r(i)
   }
   for (let n in e.parsed) t[n] = e.parsed[n]
   return e
}
var Vn = B('prisma:tryLoadEnv')
function Nt(
   { rootEnvPath: e, schemaEnvPath: t },
   r = { conflictCheck: 'none' },
) {
   let n = Do(e)
   r.conflictCheck !== 'none' && kl(n, t, r.conflictCheck)
   let i = null
   return (
      Io(n?.path, t) || (i = Do(t)),
      !n && !i && Vn('No Environment variables loaded'),
      i?.dotenvResult.error
         ? console.error(R(M('Schema Env Error: ')) + i.dotenvResult.error)
         : {
              message: [n?.message, i?.message].filter(Boolean).join(`
`),
              parsed: {
                 ...n?.dotenvResult?.parsed,
                 ...i?.dotenvResult?.parsed,
              },
           }
   )
}
function kl(e, t, r) {
   let n = e?.dotenvResult.parsed,
      i = !Io(e?.path, t)
   if (n && t && i && vr.default.existsSync(t)) {
      let o = Un.default.parse(vr.default.readFileSync(t)),
         s = []
      for (let a in o) n[a] === o[a] && s.push(a)
      if (s.length > 0) {
         let a = ft.default.relative(process.cwd(), e.path),
            u = ft.default.relative(process.cwd(), t)
         if (r === 'error') {
            let l = `There is a conflict between env var${
               s.length > 1 ? 's' : ''
            } in ${le(a)} and ${le(u)}
Conflicting env vars:
${s.map((c) => `  ${M(c)}`).join(`
`)}

We suggest to move the contents of ${le(u)} to ${le(
               a,
            )} to consolidate your env vars.
`
            throw new Error(l)
         } else if (r === 'warn') {
            let l = `Conflict for env var${s.length > 1 ? 's' : ''} ${s
               .map((c) => M(c))
               .join(', ')} in ${le(a)} and ${le(u)}
Env vars from ${le(u)} overwrite the ones from ${le(a)}
      `
            console.warn(`${Ae('warn(prisma)')} ${l}`)
         }
      }
   }
}
function Do(e) {
   return Ll(e)
      ? (Vn(`Environment variables loaded from ${e}`),
        {
           dotenvResult: $o(
              Un.default.config({
                 path: e,
                 debug: process.env.DOTENV_CONFIG_DEBUG ? !0 : void 0,
              }),
           ),
           message: D(
              `Environment variables loaded from ${ft.default.relative(
                 process.cwd(),
                 e,
              )}`,
           ),
           path: e,
        })
      : (Vn(`Environment variables not found at ${e}`), null)
}
function Io(e, t) {
   return e && t && ft.default.resolve(e) === ft.default.resolve(t)
}
function Ll(e) {
   return Boolean(e && vr.default.existsSync(e))
}
var No = 'library'
function Qn(e) {
   let t = _l()
   return (
      t ||
      (e?.config.engineType === 'library'
         ? 'library'
         : e?.config.engineType === 'binary'
         ? 'binary'
         : No)
   )
}
function _l() {
   let e = process.env.PRISMA_CLIENT_ENGINE_TYPE
   return e === 'library' ? 'library' : e === 'binary' ? 'binary' : void 0
}
var ql = S(Gn())
function kt(e) {
   return e instanceof Error
}
function Jn(e) {
   let t = process.env.PRISMA_ENGINE_PROTOCOL
   if (t === 'json' || t == 'graphql') return t
   if (t !== void 0)
      throw new Error(
         `Invalid PRISMA_ENGINE_PROTOCOL env variable value. Expected 'graphql' or 'json', got '${t}'`,
      )
   return e?.previewFeatures?.includes('jsonProtocol') ? 'json' : 'graphql'
}
var Pr = Symbol('@ts-pattern/matcher'),
   jo = '@ts-pattern/anonymous-select-key',
   qo = function (e) {
      return Boolean(e && typeof e == 'object')
   },
   Kn = function (e) {
      return e && !!e[Pr]
   },
   Bl = function e(t, r, n) {
      if (qo(t)) {
         if (Kn(t)) {
            var i = t[Pr]().match(r),
               o = i.matched,
               s = i.selections
            return (
               o &&
                  s &&
                  Object.keys(s).forEach(function (u) {
                     return n(u, s[u])
                  }),
               o
            )
         }
         if (!qo(r)) return !1
         if (Array.isArray(t))
            return (
               !!Array.isArray(r) &&
               t.length === r.length &&
               t.every(function (u, l) {
                  return e(u, r[l], n)
               })
            )
         if (t instanceof Map)
            return (
               r instanceof Map &&
               Array.from(t.keys()).every(function (u) {
                  return e(t.get(u), r.get(u), n)
               })
            )
         if (t instanceof Set) {
            if (!(r instanceof Set)) return !1
            if (t.size === 0) return r.size === 0
            if (t.size === 1) {
               var a = Array.from(t.values())[0]
               return Kn(a)
                  ? Array.from(r.values()).every(function (u) {
                       return e(a, u, n)
                    })
                  : r.has(a)
            }
            return Array.from(t.values()).every(function (u) {
               return r.has(u)
            })
         }
         return Object.keys(t).every(function (u) {
            var l,
               c = t[u]
            return (
               (u in r ||
                  (Kn((l = c)) && l[Pr]().matcherType === 'optional')) &&
               e(c, r[u], n)
            )
         })
      }
      return Object.is(r, t)
   }
function nt(e) {
   var t
   return (
      ((t = {})[Pr] = function () {
         return {
            match: function (r) {
               return { matched: Boolean(e(r)) }
            },
         }
      }),
      t
   )
}
var Td = nt(function (e) {
   return !0
})
var vd = nt(function (e) {
      return typeof e == 'string'
   }),
   Pd = nt(function (e) {
      return typeof e == 'number'
   }),
   Md = nt(function (e) {
      return typeof e == 'boolean'
   }),
   Fd = nt(function (e) {
      return typeof e == 'bigint'
   }),
   Cd = nt(function (e) {
      return typeof e == 'symbol'
   }),
   Sd = nt(function (e) {
      return e == null
   })
function mt(e) {
   return new Vl(e, [])
}
var Vl = (function () {
   function e(r, n) {
      ;(this.value = void 0),
         (this.cases = void 0),
         (this.value = r),
         (this.cases = n)
   }
   var t = e.prototype
   return (
      (t.with = function () {
         var r = [].slice.call(arguments),
            n = r[r.length - 1],
            i = [r[0]],
            o = []
         return (
            r.length === 3 && typeof r[1] == 'function'
               ? (i.push(r[0]), o.push(r[1]))
               : r.length > 2 && i.push.apply(i, r.slice(1, r.length - 1)),
            new e(
               this.value,
               this.cases.concat([
                  {
                     match: function (s) {
                        var a = {},
                           u = Boolean(
                              i.some(function (l) {
                                 return Bl(l, s, function (c, p) {
                                    a[c] = p
                                 })
                              }) &&
                                 o.every(function (l) {
                                    return l(s)
                                 }),
                           )
                        return {
                           matched: u,
                           value:
                              u && Object.keys(a).length
                                 ? jo in a
                                    ? a[jo]
                                    : a
                                 : s,
                        }
                     },
                     handler: n,
                  },
               ]),
            )
         )
      }),
      (t.when = function (r, n) {
         return new e(
            this.value,
            this.cases.concat([
               {
                  match: function (i) {
                     return { matched: Boolean(r(i)), value: i }
                  },
                  handler: n,
               },
            ]),
         )
      }),
      (t.otherwise = function (r) {
         return new e(
            this.value,
            this.cases.concat([
               {
                  match: function (n) {
                     return { matched: !0, value: n }
                  },
                  handler: r,
               },
            ]),
         ).run()
      }),
      (t.exhaustive = function () {
         return this.run()
      }),
      (t.run = function () {
         for (
            var r = this.value, n = void 0, i = 0;
            i < this.cases.length;
            i++
         ) {
            var o = this.cases[i],
               s = o.match(this.value)
            if (s.matched) {
               ;(r = s.value), (n = o.handler)
               break
            }
         }
         if (!n) {
            var a
            try {
               a = JSON.stringify(this.value)
            } catch {
               a = this.value
            }
            throw new Error(
               'Pattern matching error: no pattern matches value ' + a,
            )
         }
         return n(r, this.value)
      }),
      e
   )
})()
var Bo = S(require('fs'))
function Wn() {
   let e = process.env.PRISMA_QUERY_ENGINE_LIBRARY
   if (!(e && Bo.default.existsSync(e)) && process.arch === 'ia32')
      throw new Error(
         'The default query engine type (Node-API, "library") is currently not supported for 32bit Node. Please set `engineType = "binary"` in the "generator" block of your "schema.prisma" file (or use the environment variables "PRISMA_CLIENT_ENGINE_TYPE=binary" and/or "PRISMA_CLI_QUERY_ENGINE_TYPE=binary".)',
      )
}
var Mr = 'libquery_engine'
function Hn(e, t) {
   let r = t === 'url'
   return e.includes('windows')
      ? r
         ? 'query_engine.dll.node'
         : `query_engine-${e}.dll.node`
      : e.includes('darwin')
      ? r
         ? `${Mr}.dylib.node`
         : `${Mr}-${e}.dylib.node`
      : r
      ? `${Mr}.so.node`
      : `${Mr}-${e}.so.node`
}
var Zo = S(require('child_process')),
   Xn = S(require('fs/promises')),
   Sr = S(require('os'))
var Xo = require('util')
var Ho = S(Wo())
function jt(e) {
   return (0, Ho.default)(e, e, { fallback: le })
}
var Gl = { warn: Ae('prisma:warn') },
   Jl = { warn: () => !process.env.PRISMA_DISABLE_WARNINGS }
function qt(e, ...t) {
   Jl.warn() && console.warn(`${Gl.warn} ${e}`, ...t)
}
var Kl = (0, Xo.promisify)(Zo.default.exec),
   pe = B('prisma:get-platform'),
   Wl = ['1.0.x', '1.1.x', '3.0.x']
async function es() {
   let e = Sr.default.platform(),
      t = process.arch
   if (e === 'freebsd') {
      let s = await Ar('freebsd-version')
      if (s && s.trim().length > 0) {
         let u = /^(\d+)\.?/.exec(s)
         if (u)
            return {
               platform: 'freebsd',
               targetDistro: `freebsd${u[1]}`,
               arch: t,
            }
      }
   }
   if (e !== 'linux') return { platform: e, arch: t }
   let r = await zl(),
      n = await ic(),
      i = Zl({ arch: t, archFromUname: n, familyDistro: r.familyDistro }),
      { libssl: o } = await Xl(i)
   return { platform: 'linux', libssl: o, arch: t, archFromUname: n, ...r }
}
function Hl(e) {
   let t = /^ID="?([^"\n]*)"?$/im,
      r = /^ID_LIKE="?([^"\n]*)"?$/im,
      n = t.exec(e),
      i = (n && n[1] && n[1].toLowerCase()) || '',
      o = r.exec(e),
      s = (o && o[1] && o[1].toLowerCase()) || '',
      a = mt({ id: i, idLike: s })
         .with({ id: 'alpine' }, ({ id: u }) => ({
            targetDistro: 'musl',
            familyDistro: u,
            originalDistro: u,
         }))
         .with({ id: 'raspbian' }, ({ id: u }) => ({
            targetDistro: 'arm',
            familyDistro: 'debian',
            originalDistro: u,
         }))
         .with({ id: 'nixos' }, ({ id: u }) => ({
            targetDistro: 'nixos',
            originalDistro: u,
            familyDistro: 'nixos',
         }))
         .with({ id: 'debian' }, { id: 'ubuntu' }, ({ id: u }) => ({
            targetDistro: 'debian',
            familyDistro: 'debian',
            originalDistro: u,
         }))
         .with(
            { id: 'rhel' },
            { id: 'centos' },
            { id: 'fedora' },
            ({ id: u }) => ({
               targetDistro: 'rhel',
               familyDistro: 'rhel',
               originalDistro: u,
            }),
         )
         .when(
            ({ idLike: u }) => u.includes('debian') || u.includes('ubuntu'),
            ({ id: u }) => ({
               targetDistro: 'debian',
               familyDistro: 'debian',
               originalDistro: u,
            }),
         )
         .when(
            ({ idLike: u }) => i === 'arch' || u.includes('arch'),
            ({ id: u }) => ({
               targetDistro: 'debian',
               familyDistro: 'arch',
               originalDistro: u,
            }),
         )
         .when(
            ({ idLike: u }) =>
               u.includes('centos') ||
               u.includes('fedora') ||
               u.includes('rhel') ||
               u.includes('suse'),
            ({ id: u }) => ({
               targetDistro: 'rhel',
               familyDistro: 'rhel',
               originalDistro: u,
            }),
         )
         .otherwise(({ id: u }) => ({
            targetDistro: void 0,
            familyDistro: void 0,
            originalDistro: u,
         }))
   return (
      pe(`Found distro info:
${JSON.stringify(a, null, 2)}`),
      a
   )
}
async function zl() {
   let e = '/etc/os-release'
   try {
      let t = await Xn.default.readFile(e, { encoding: 'utf-8' })
      return Hl(t)
   } catch {
      return {
         targetDistro: void 0,
         familyDistro: void 0,
         originalDistro: void 0,
      }
   }
}
function Yl(e) {
   let t = /^OpenSSL\s(\d+\.\d+)\.\d+/.exec(e)
   if (t) {
      let r = `${t[1]}.x`
      return ts(r)
   }
}
function zo(e) {
   let t = /libssl\.so\.(\d)(\.\d)?/.exec(e)
   if (t) {
      let r = `${t[1]}${t[2] ?? '.0'}.x`
      return ts(r)
   }
}
function ts(e) {
   let t = (() => {
      if (ns(e)) return e
      let r = e.split('.')
      return (r[1] = '0'), r.join('.')
   })()
   if (Wl.includes(t)) return t
}
function Zl(e) {
   return mt(e)
      .with(
         { familyDistro: 'musl' },
         () => (pe('Trying platform-specific paths for "alpine"'), ['/lib']),
      )
      .with(
         { familyDistro: 'debian' },
         ({ archFromUname: t }) => (
            pe('Trying platform-specific paths for "debian" (and "ubuntu")'),
            [`/usr/lib/${t}-linux-gnu`, `/lib/${t}-linux-gnu`]
         ),
      )
      .with(
         { familyDistro: 'rhel' },
         () => (
            pe('Trying platform-specific paths for "rhel"'),
            ['/lib64', '/usr/lib64']
         ),
      )
      .otherwise(
         ({ familyDistro: t, arch: r, archFromUname: n }) => (
            pe(
               `Don't know any platform-specific paths for "${t}" on ${r} (${n})`,
            ),
            []
         ),
      )
}
async function Xl(e) {
   let t = 'grep -v "libssl.so.0"',
      r = await Yo(e)
   if (r) {
      pe(`Found libssl.so file using platform-specific paths: ${r}`)
      let o = zo(r)
      if ((pe(`The parsed libssl version is: ${o}`), o))
         return { libssl: o, strategy: 'libssl-specific-path' }
   }
   pe('Falling back to "ldconfig" and other generic paths')
   let n = await Ar(
      `ldconfig -p | sed "s/.*=>s*//" | sed "s|.*/||" | grep libssl | sort | ${t}`,
   )
   if ((n || (n = await Yo(['/lib64', '/usr/lib64', '/lib'])), n)) {
      pe(`Found libssl.so file using "ldconfig" or other generic paths: ${n}`)
      let o = zo(n)
      if ((pe(`The parsed libssl version is: ${o}`), o))
         return { libssl: o, strategy: 'ldconfig' }
   }
   let i = await Ar('openssl version -v')
   if (i) {
      pe(`Found openssl binary with version: ${i}`)
      let o = Yl(i)
      if ((pe(`The parsed openssl version is: ${o}`), o))
         return { libssl: o, strategy: 'openssl-binary' }
   }
   return pe("Couldn't find any version of libssl or OpenSSL in the system"), {}
}
async function Yo(e) {
   for (let t of e) {
      let r = await ec(t)
      if (r) return r
   }
}
async function ec(e) {
   try {
      return (await Xn.default.readdir(e)).find(
         (r) => r.startsWith('libssl.so') && !r.startsWith('libssl.so.0'),
      )
   } catch (t) {
      if (t.code === 'ENOENT') return
      throw t
   }
}
async function ht() {
   let { binaryTarget: e } = await rs()
   return e
}
function tc(e) {
   return e.binaryTarget !== void 0
}
async function ei() {
   let { memoized: e, ...t } = await rs()
   return t
}
var Cr = {}
async function rs() {
   if (tc(Cr)) return Promise.resolve({ ...Cr, memoized: !0 })
   let e = await es(),
      t = rc(e)
   return (Cr = { ...e, binaryTarget: t }), { ...Cr, memoized: !1 }
}
function rc(e) {
   let {
      platform: t,
      arch: r,
      archFromUname: n,
      libssl: i,
      targetDistro: o,
      familyDistro: s,
      originalDistro: a,
   } = e
   t === 'linux' &&
      !['x64', 'arm64'].includes(r) &&
      qt(
         `Prisma only officially supports Linux on amd64 (x86_64) and arm64 (aarch64) system architectures. If you are using your own custom Prisma engines, you can ignore this warning, as long as you've compiled the engines for your system architecture "${n}".`,
      )
   let u = '1.1.x'
   if (t === 'linux' && i === void 0) {
      let c = mt({ familyDistro: s })
         .with(
            { familyDistro: 'debian' },
            () =>
               "Please manually install OpenSSL via `apt-get update -y && apt-get install -y openssl` and try installing Prisma again. If you're running Prisma on Docker, you may also try to replace your base image with `node:lts-slim`, which already ships with OpenSSL installed.",
         )
         .otherwise(
            () =>
               'Please manually install OpenSSL and try installing Prisma again.',
         )
      qt(`Prisma failed to detect the libssl/openssl version to use, and may not work as expected. Defaulting to "openssl-${u}".
${c}`)
   }
   let l = 'debian'
   if (
      (t === 'linux' &&
         o === void 0 &&
         qt(`Prisma doesn't know which engines to download for the Linux distro "${a}". Falling back to Prisma engines built "${l}".
Please report your experience by creating an issue at ${jt(
            'https://github.com/prisma/prisma/issues',
         )} so we can add your distro to the list of known supported distros.`),
      t === 'darwin' && r === 'arm64')
   )
      return 'darwin-arm64'
   if (t === 'darwin') return 'darwin'
   if (t === 'win32') return 'windows'
   if (t === 'freebsd') return o
   if (t === 'openbsd') return 'openbsd'
   if (t === 'netbsd') return 'netbsd'
   if (t === 'linux' && o === 'nixos') return 'linux-nixos'
   if (t === 'linux' && r === 'arm64')
      return `${o === 'musl' ? 'linux-musl-arm64' : 'linux-arm64'}-openssl-${
         i || u
      }`
   if (t === 'linux' && r === 'arm') return `linux-arm-openssl-${i || u}`
   if (t === 'linux' && o === 'musl') {
      let c = 'linux-musl'
      return !i || ns(i) ? c : `${c}-openssl-${i}`
   }
   return t === 'linux' && o && i
      ? `${o}-openssl-${i}`
      : (t !== 'linux' &&
           qt(
              `Prisma detected unknown OS "${t}" and may not work as expected. Defaulting to "linux".`,
           ),
        i ? `${l}-openssl-${i}` : o ? `${o}-openssl-${u}` : `${l}-openssl-${u}`)
}
async function nc(e) {
   try {
      return await e()
   } catch {
      return
   }
}
function Ar(e) {
   return nc(async () => {
      let t = await Kl(e)
      return pe(`Command "${e}" successfully returned "${t.stdout}"`), t.stdout
   })
}
async function ic() {
   return typeof Sr.default.machine == 'function'
      ? Sr.default.machine()
      : (await Ar('uname -m'))?.trim()
}
function ns(e) {
   return e.startsWith('1.')
}
var ti = [
   'darwin',
   'darwin-arm64',
   'debian-openssl-1.0.x',
   'debian-openssl-1.1.x',
   'debian-openssl-3.0.x',
   'rhel-openssl-1.0.x',
   'rhel-openssl-1.1.x',
   'rhel-openssl-3.0.x',
   'linux-arm64-openssl-1.1.x',
   'linux-arm64-openssl-1.0.x',
   'linux-arm64-openssl-3.0.x',
   'linux-arm-openssl-1.1.x',
   'linux-arm-openssl-1.0.x',
   'linux-arm-openssl-3.0.x',
   'linux-musl',
   'linux-musl-openssl-3.0.x',
   'linux-musl-arm64-openssl-1.1.x',
   'linux-musl-arm64-openssl-3.0.x',
   'linux-nixos',
   'windows',
   'freebsd11',
   'freebsd12',
   'freebsd13',
   'openbsd',
   'netbsd',
   'arm',
]
var sc = S(ri())
var V = S(require('path')),
   ac = S(ri()),
   tg = B('prisma:engines')
function os() {
   return V.default.join(__dirname, '../')
}
var rg = 'libquery-engine'
V.default.join(__dirname, '../query-engine-darwin')
V.default.join(__dirname, '../query-engine-darwin-arm64')
V.default.join(__dirname, '../query-engine-debian-openssl-1.0.x')
V.default.join(__dirname, '../query-engine-debian-openssl-1.1.x')
V.default.join(__dirname, '../query-engine-debian-openssl-3.0.x')
V.default.join(__dirname, '../query-engine-rhel-openssl-1.0.x')
V.default.join(__dirname, '../query-engine-rhel-openssl-1.1.x')
V.default.join(__dirname, '../query-engine-rhel-openssl-3.0.x')
V.default.join(__dirname, '../libquery_engine-darwin.dylib.node')
V.default.join(__dirname, '../libquery_engine-darwin-arm64.dylib.node')
V.default.join(__dirname, '../libquery_engine-debian-openssl-1.0.x.so.node')
V.default.join(__dirname, '../libquery_engine-debian-openssl-1.1.x.so.node')
V.default.join(__dirname, '../libquery_engine-debian-openssl-3.0.x.so.node')
V.default.join(
   __dirname,
   '../libquery_engine-linux-arm64-openssl-1.0.x.so.node',
)
V.default.join(
   __dirname,
   '../libquery_engine-linux-arm64-openssl-1.1.x.so.node',
)
V.default.join(
   __dirname,
   '../libquery_engine-linux-arm64-openssl-3.0.x.so.node',
)
V.default.join(__dirname, '../libquery_engine-linux-musl.so.node')
V.default.join(__dirname, '../libquery_engine-linux-musl-openssl-3.0.x.so.node')
V.default.join(__dirname, '../libquery_engine-rhel-openssl-1.0.x.so.node')
V.default.join(__dirname, '../libquery_engine-rhel-openssl-1.1.x.so.node')
V.default.join(__dirname, '../libquery_engine-rhel-openssl-3.0.x.so.node')
V.default.join(__dirname, '../query_engine-windows.dll.node')
var ni = S(require('fs')),
   ss = B('plusX')
function ii(e) {
   let t = ni.default.statSync(e),
      r = t.mode | 64 | 8 | 1
   if (t.mode === r) {
      ss(`Execution permissions of ${e} are fine`)
      return
   }
   let n = r.toString(8).slice(-3)
   ss(`Have to call plusX on ${e}`), ni.default.chmodSync(e, n)
}
function oi(e) {
   let t = e.e,
      r = (a) =>
         `Prisma cannot find the required \`${a}\` system library in your system`,
      n = t.message.includes('cannot open shared object file'),
      i = `Please refer to the documentation about Prisma's system requirements: ${jt(
         'https://pris.ly/d/system-requirements',
      )}`,
      o = `Unable to require(\`${D(e.id)}\`).`,
      s = mt({ message: t.message, code: t.code })
         .with({ code: 'ENOENT' }, () => 'File does not exist.')
         .when(
            ({ message: a }) => n && a.includes('libz'),
            () => `${r('libz')}. Please install it and try again.`,
         )
         .when(
            ({ message: a }) => n && a.includes('libgcc_s'),
            () => `${r('libgcc_s')}. Please install it and try again.`,
         )
         .when(
            ({ message: a }) => n && a.includes('libssl'),
            () => {
               let a = e.platformInfo.libssl
                  ? `openssl-${e.platformInfo.libssl}`
                  : 'openssl'
               return `${r('libssl')}. Please install ${a} and try again.`
            },
         )
         .when(
            ({ message: a }) => a.includes('GLIBC'),
            () =>
               `Prisma has detected an incompatible version of the \`glibc\` C standard library installed in your system. This probably means your system may be too old to run Prisma. ${i}`,
         )
         .when(
            ({ message: a }) =>
               e.platformInfo.platform === 'linux' &&
               a.includes('symbol not found'),
            () =>
               `The Prisma engines are not compatible with your system ${e.platformInfo.originalDistro} on (${e.platformInfo.archFromUname}) which uses the \`${e.platformInfo.binaryTarget}\` binaryTarget by default. ${i}`,
         )
         .otherwise(
            () =>
               `The Prisma engines do not seem to be compatible with your system. ${i}`,
         )
   return `${o}
${s}

Details: ${t.message}`
}
var xe
;((t) => {
   let e
   ;((w) => (
      (w.findUnique = 'findUnique'),
      (w.findUniqueOrThrow = 'findUniqueOrThrow'),
      (w.findFirst = 'findFirst'),
      (w.findFirstOrThrow = 'findFirstOrThrow'),
      (w.findMany = 'findMany'),
      (w.create = 'create'),
      (w.createMany = 'createMany'),
      (w.update = 'update'),
      (w.updateMany = 'updateMany'),
      (w.upsert = 'upsert'),
      (w.delete = 'delete'),
      (w.deleteMany = 'deleteMany'),
      (w.groupBy = 'groupBy'),
      (w.count = 'count'),
      (w.aggregate = 'aggregate'),
      (w.findRaw = 'findRaw'),
      (w.aggregateRaw = 'aggregateRaw')
   ))((e = t.ModelAction || (t.ModelAction = {})))
})(xe || (xe = {}))
var us = S(Bt())
function ai(e) {
   return String(new si(e))
}
var si = class {
   constructor(t) {
      this.config = t
   }
   toString() {
      let { config: t } = this,
         r = t.provider.fromEnvVar
            ? `env("${t.provider.fromEnvVar}")`
            : t.provider.value,
         n = JSON.parse(
            JSON.stringify({ provider: r, binaryTargets: uc(t.binaryTargets) }),
         )
      return `generator ${t.name} {
${(0, us.default)(lc(n), 2)}
}`
   }
}
function uc(e) {
   let t
   if (e.length > 0) {
      let r = e.find((n) => n.fromEnvVar !== null)
      r
         ? (t = `env("${r.fromEnvVar}")`)
         : (t = e.map((n) => (n.native ? 'native' : n.value)))
   } else t = void 0
   return t
}
function lc(e) {
   let t = Object.keys(e).reduce((r, n) => Math.max(r, n.length), 0)
   return Object.entries(e).map(([r, n]) => `${r.padEnd(t)} = ${cc(n)}`).join(`
`)
}
function cc(e) {
   return JSON.parse(
      JSON.stringify(e, (t, r) =>
         Array.isArray(r)
            ? `[${r.map((n) => JSON.stringify(n)).join(', ')}]`
            : JSON.stringify(r),
      ),
   )
}
var Ut = {}
dr(Ut, {
   error: () => mc,
   info: () => fc,
   log: () => pc,
   query: () => dc,
   should: () => ls,
   tags: () => Vt,
   warn: () => ui,
})
var Vt = {
      error: R('prisma:error'),
      warn: Ae('prisma:warn'),
      info: Be('prisma:info'),
      query: ut('prisma:query'),
   },
   ls = { warn: () => !process.env.PRISMA_DISABLE_WARNINGS }
function pc(...e) {
   console.log(...e)
}
function ui(e, ...t) {
   ls.warn() && console.warn(`${Vt.warn} ${e}`, ...t)
}
function fc(e, ...t) {
   console.info(`${Vt.info} ${e}`, ...t)
}
function mc(e, ...t) {
   console.error(`${Vt.error} ${e}`, ...t)
}
function dc(e, ...t) {
   console.log(`${Vt.query} ${e}`, ...t)
}
function Le(e, t) {
   throw new Error(t)
}
function Rr(e) {
   let t
   return (...r) =>
      t ||
      ((t = e(...r).catch((n) => {
         throw ((t = void 0), n)
      })),
      t)
}
var Gt = S(require('path'))
function li(e) {
   return Gt.default.sep === Gt.default.posix.sep
      ? e
      : e.split(Gt.default.sep).join(Gt.default.posix.sep)
}
function ci(e, t) {
   return Object.prototype.hasOwnProperty.call(e, t)
}
var pi = (e, t) => e.reduce((r, n) => ((r[t(n)] = n), r), {})
function yt(e, t) {
   let r = {}
   for (let n of Object.keys(e)) r[n] = t(e[n], n)
   return r
}
function fi(e, t) {
   if (e.length === 0) return
   let r = e[0],
      n = t(e[0])
   for (let i = 1; i < e.length; i++) {
      let o = t(e[i])
      o > n && ((n = o), (r = e[i]))
   }
   return r
}
function fe(e, t) {
   Object.defineProperty(e, 'name', { value: t, configurable: !0 })
}
var ds = new Set(),
   Jt = (e, t, ...r) => {
      ds.has(e) || (ds.add(e), ui(t, ...r))
   }
var Q = class extends Error {
   constructor(r, n, i) {
      super(r)
      ;(this.clientVersion = n),
         (this.errorCode = i),
         Error.captureStackTrace(Q)
   }
   get [Symbol.toStringTag]() {
      return 'PrismaClientInitializationError'
   }
}
fe(Q, 'PrismaClientInitializationError')
var re = class extends Error {
   constructor(r, { code: n, clientVersion: i, meta: o, batchRequestIdx: s }) {
      super(r)
      ;(this.code = n),
         (this.clientVersion = i),
         (this.meta = o),
         Object.defineProperty(this, 'batchRequestIdx', {
            value: s,
            enumerable: !1,
            writable: !0,
         })
   }
   get [Symbol.toStringTag]() {
      return 'PrismaClientKnownRequestError'
   }
}
fe(re, 'PrismaClientKnownRequestError')
var ge = class extends Error {
   constructor(r, n) {
      super(r)
      this.clientVersion = n
   }
   get [Symbol.toStringTag]() {
      return 'PrismaClientRustPanicError'
   }
}
fe(ge, 'PrismaClientRustPanicError')
var ne = class extends Error {
   constructor(r, { clientVersion: n, batchRequestIdx: i }) {
      super(r)
      ;(this.name = 'PrismaClientUnknownRequestError'),
         (this.clientVersion = n),
         Object.defineProperty(this, 'batchRequestIdx', {
            value: i,
            writable: !0,
            enumerable: !1,
         })
   }
   get [Symbol.toStringTag]() {
      return 'PrismaClientUnknownRequestError'
   }
}
fe(ne, 'PrismaClientUnknownRequestError')
var bt = class {
   constructor(t) {
      this._engine = t
   }
   prometheus(t) {
      return this._engine.metrics({ format: 'prometheus', ...t })
   }
   json(t) {
      return this._engine.metrics({ format: 'json', ...t })
   }
}
function Dr(e) {
   let t
   return {
      get() {
         return t || (t = { value: e() }), t.value
      },
   }
}
function gs(e) {
   return { models: mi(e.models), enums: mi(e.enums), types: mi(e.types) }
}
function mi(e) {
   let t = {}
   for (let { name: r, ...n } of e) t[r] = n
   return t
}
function hs(e, t) {
   let r = Dr(() => yc(t))
   Object.defineProperty(e, 'dmmf', { get: () => r.get() })
}
function yc(e) {
   return {
      datamodel: {
         models: di(e.models),
         enums: di(e.enums),
         types: di(e.types),
      },
   }
}
function di(e) {
   return Object.entries(e).map(([t, r]) => ({ name: t, ...r }))
}
function ys(e, t) {
   for (let r of t)
      for (let n of Object.getOwnPropertyNames(r.prototype))
         Object.defineProperty(
            e.prototype,
            n,
            Object.getOwnPropertyDescriptor(r.prototype, n) ??
               Object.create(null),
         )
}
var wt = 9e15,
   Je = 1e9,
   gi = '0123456789abcdef',
   Nr =
      '2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058',
   kr =
      '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789',
   hi = {
      precision: 20,
      rounding: 4,
      modulo: 1,
      toExpNeg: -7,
      toExpPos: 21,
      minE: -wt,
      maxE: wt,
      crypto: !1,
   },
   Es,
   _e,
   P = !0,
   _r = '[DecimalError] ',
   Ge = _r + 'Invalid argument: ',
   Ts = _r + 'Precision limit exceeded',
   vs = _r + 'crypto unavailable',
   Ps = '[object Decimal]',
   ie = Math.floor,
   W = Math.pow,
   bc = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,
   wc = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,
   xc = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,
   Ms = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
   Me = 1e7,
   v = 7,
   Ec = 9007199254740991,
   Tc = Nr.length - 1,
   yi = kr.length - 1,
   y = { toStringTag: Ps }
y.absoluteValue = y.abs = function () {
   var e = new this.constructor(this)
   return e.s < 0 && (e.s = 1), T(e)
}
y.ceil = function () {
   return T(new this.constructor(this), this.e + 1, 2)
}
y.clampedTo = y.clamp = function (e, t) {
   var r,
      n = this,
      i = n.constructor
   if (((e = new i(e)), (t = new i(t)), !e.s || !t.s)) return new i(NaN)
   if (e.gt(t)) throw Error(Ge + t)
   return (r = n.cmp(e)), r < 0 ? e : n.cmp(t) > 0 ? t : new i(n)
}
y.comparedTo = y.cmp = function (e) {
   var t,
      r,
      n,
      i,
      o = this,
      s = o.d,
      a = (e = new o.constructor(e)).d,
      u = o.s,
      l = e.s
   if (!s || !a)
      return !u || !l ? NaN : u !== l ? u : s === a ? 0 : !s ^ (u < 0) ? 1 : -1
   if (!s[0] || !a[0]) return s[0] ? u : a[0] ? -l : 0
   if (u !== l) return u
   if (o.e !== e.e) return (o.e > e.e) ^ (u < 0) ? 1 : -1
   for (n = s.length, i = a.length, t = 0, r = n < i ? n : i; t < r; ++t)
      if (s[t] !== a[t]) return (s[t] > a[t]) ^ (u < 0) ? 1 : -1
   return n === i ? 0 : (n > i) ^ (u < 0) ? 1 : -1
}
y.cosine = y.cos = function () {
   var e,
      t,
      r = this,
      n = r.constructor
   return r.d
      ? r.d[0]
         ? ((e = n.precision),
           (t = n.rounding),
           (n.precision = e + Math.max(r.e, r.sd()) + v),
           (n.rounding = 1),
           (r = vc(n, Os(n, r))),
           (n.precision = e),
           (n.rounding = t),
           T(_e == 2 || _e == 3 ? r.neg() : r, e, t, !0))
         : new n(1)
      : new n(NaN)
}
y.cubeRoot = y.cbrt = function () {
   var e,
      t,
      r,
      n,
      i,
      o,
      s,
      a,
      u,
      l,
      c = this,
      p = c.constructor
   if (!c.isFinite() || c.isZero()) return new p(c)
   for (
      P = !1,
         o = c.s * W(c.s * c, 1 / 3),
         !o || Math.abs(o) == 1 / 0
            ? ((r = Z(c.d)),
              (e = c.e),
              (o = (e - r.length + 1) % 3) &&
                 (r += o == 1 || o == -2 ? '0' : '00'),
              (o = W(r, 1 / 3)),
              (e = ie((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2))),
              o == 1 / 0
                 ? (r = '5e' + e)
                 : ((r = o.toExponential()),
                   (r = r.slice(0, r.indexOf('e') + 1) + e)),
              (n = new p(r)),
              (n.s = c.s))
            : (n = new p(o.toString())),
         s = (e = p.precision) + 3;
      ;

   )
      if (
         ((a = n),
         (u = a.times(a).times(a)),
         (l = u.plus(c)),
         (n = L(l.plus(c).times(a), l.plus(u), s + 2, 1)),
         Z(a.d).slice(0, s) === (r = Z(n.d)).slice(0, s))
      )
         if (
            ((r = r.slice(s - 3, s + 1)), r == '9999' || (!i && r == '4999'))
         ) {
            if (!i && (T(a, e + 1, 0), a.times(a).times(a).eq(c))) {
               n = a
               break
            }
            ;(s += 4), (i = 1)
         } else {
            ;(!+r || (!+r.slice(1) && r.charAt(0) == '5')) &&
               (T(n, e + 1, 1), (t = !n.times(n).times(n).eq(c)))
            break
         }
   return (P = !0), T(n, e, p.rounding, t)
}
y.decimalPlaces = y.dp = function () {
   var e,
      t = this.d,
      r = NaN
   if (t) {
      if (((e = t.length - 1), (r = (e - ie(this.e / v)) * v), (e = t[e]), e))
         for (; e % 10 == 0; e /= 10) r--
      r < 0 && (r = 0)
   }
   return r
}
y.dividedBy = y.div = function (e) {
   return L(this, new this.constructor(e))
}
y.dividedToIntegerBy = y.divToInt = function (e) {
   var t = this,
      r = t.constructor
   return T(L(t, new r(e), 0, 1, 1), r.precision, r.rounding)
}
y.equals = y.eq = function (e) {
   return this.cmp(e) === 0
}
y.floor = function () {
   return T(new this.constructor(this), this.e + 1, 3)
}
y.greaterThan = y.gt = function (e) {
   return this.cmp(e) > 0
}
y.greaterThanOrEqualTo = y.gte = function (e) {
   var t = this.cmp(e)
   return t == 1 || t === 0
}
y.hyperbolicCosine = y.cosh = function () {
   var e,
      t,
      r,
      n,
      i,
      o = this,
      s = o.constructor,
      a = new s(1)
   if (!o.isFinite()) return new s(o.s ? 1 / 0 : NaN)
   if (o.isZero()) return a
   ;(r = s.precision),
      (n = s.rounding),
      (s.precision = r + Math.max(o.e, o.sd()) + 4),
      (s.rounding = 1),
      (i = o.d.length),
      i < 32
         ? ((e = Math.ceil(i / 3)), (t = (1 / qr(4, e)).toString()))
         : ((e = 16), (t = '2.3283064365386962890625e-10')),
      (o = xt(s, 1, o.times(t), new s(1), !0))
   for (var u, l = e, c = new s(8); l--; )
      (u = o.times(o)), (o = a.minus(u.times(c.minus(u.times(c)))))
   return T(o, (s.precision = r), (s.rounding = n), !0)
}
y.hyperbolicSine = y.sinh = function () {
   var e,
      t,
      r,
      n,
      i = this,
      o = i.constructor
   if (!i.isFinite() || i.isZero()) return new o(i)
   if (
      ((t = o.precision),
      (r = o.rounding),
      (o.precision = t + Math.max(i.e, i.sd()) + 4),
      (o.rounding = 1),
      (n = i.d.length),
      n < 3)
   )
      i = xt(o, 2, i, i, !0)
   else {
      ;(e = 1.4 * Math.sqrt(n)),
         (e = e > 16 ? 16 : e | 0),
         (i = i.times(1 / qr(5, e))),
         (i = xt(o, 2, i, i, !0))
      for (var s, a = new o(5), u = new o(16), l = new o(20); e--; )
         (s = i.times(i)), (i = i.times(a.plus(s.times(u.times(s).plus(l)))))
   }
   return (o.precision = t), (o.rounding = r), T(i, t, r, !0)
}
y.hyperbolicTangent = y.tanh = function () {
   var e,
      t,
      r = this,
      n = r.constructor
   return r.isFinite()
      ? r.isZero()
         ? new n(r)
         : ((e = n.precision),
           (t = n.rounding),
           (n.precision = e + 7),
           (n.rounding = 1),
           L(r.sinh(), r.cosh(), (n.precision = e), (n.rounding = t)))
      : new n(r.s)
}
y.inverseCosine = y.acos = function () {
   var e,
      t = this,
      r = t.constructor,
      n = t.abs().cmp(1),
      i = r.precision,
      o = r.rounding
   return n !== -1
      ? n === 0
         ? t.isNeg()
            ? Pe(r, i, o)
            : new r(0)
         : new r(NaN)
      : t.isZero()
      ? Pe(r, i + 4, o).times(0.5)
      : ((r.precision = i + 6),
        (r.rounding = 1),
        (t = t.asin()),
        (e = Pe(r, i + 4, o).times(0.5)),
        (r.precision = i),
        (r.rounding = o),
        e.minus(t))
}
y.inverseHyperbolicCosine = y.acosh = function () {
   var e,
      t,
      r = this,
      n = r.constructor
   return r.lte(1)
      ? new n(r.eq(1) ? 0 : NaN)
      : r.isFinite()
      ? ((e = n.precision),
        (t = n.rounding),
        (n.precision = e + Math.max(Math.abs(r.e), r.sd()) + 4),
        (n.rounding = 1),
        (P = !1),
        (r = r.times(r).minus(1).sqrt().plus(r)),
        (P = !0),
        (n.precision = e),
        (n.rounding = t),
        r.ln())
      : new n(r)
}
y.inverseHyperbolicSine = y.asinh = function () {
   var e,
      t,
      r = this,
      n = r.constructor
   return !r.isFinite() || r.isZero()
      ? new n(r)
      : ((e = n.precision),
        (t = n.rounding),
        (n.precision = e + 2 * Math.max(Math.abs(r.e), r.sd()) + 6),
        (n.rounding = 1),
        (P = !1),
        (r = r.times(r).plus(1).sqrt().plus(r)),
        (P = !0),
        (n.precision = e),
        (n.rounding = t),
        r.ln())
}
y.inverseHyperbolicTangent = y.atanh = function () {
   var e,
      t,
      r,
      n,
      i = this,
      o = i.constructor
   return i.isFinite()
      ? i.e >= 0
         ? new o(i.abs().eq(1) ? i.s / 0 : i.isZero() ? i : NaN)
         : ((e = o.precision),
           (t = o.rounding),
           (n = i.sd()),
           Math.max(n, e) < 2 * -i.e - 1
              ? T(new o(i), e, t, !0)
              : ((o.precision = r = n - i.e),
                (i = L(i.plus(1), new o(1).minus(i), r + e, 1)),
                (o.precision = e + 4),
                (o.rounding = 1),
                (i = i.ln()),
                (o.precision = e),
                (o.rounding = t),
                i.times(0.5)))
      : new o(NaN)
}
y.inverseSine = y.asin = function () {
   var e,
      t,
      r,
      n,
      i = this,
      o = i.constructor
   return i.isZero()
      ? new o(i)
      : ((t = i.abs().cmp(1)),
        (r = o.precision),
        (n = o.rounding),
        t !== -1
           ? t === 0
              ? ((e = Pe(o, r + 4, n).times(0.5)), (e.s = i.s), e)
              : new o(NaN)
           : ((o.precision = r + 6),
             (o.rounding = 1),
             (i = i.div(new o(1).minus(i.times(i)).sqrt().plus(1)).atan()),
             (o.precision = r),
             (o.rounding = n),
             i.times(2)))
}
y.inverseTangent = y.atan = function () {
   var e,
      t,
      r,
      n,
      i,
      o,
      s,
      a,
      u,
      l = this,
      c = l.constructor,
      p = c.precision,
      f = c.rounding
   if (l.isFinite()) {
      if (l.isZero()) return new c(l)
      if (l.abs().eq(1) && p + 4 <= yi)
         return (s = Pe(c, p + 4, f).times(0.25)), (s.s = l.s), s
   } else {
      if (!l.s) return new c(NaN)
      if (p + 4 <= yi) return (s = Pe(c, p + 4, f).times(0.5)), (s.s = l.s), s
   }
   for (
      c.precision = a = p + 10,
         c.rounding = 1,
         r = Math.min(28, (a / v + 2) | 0),
         e = r;
      e;
      --e
   )
      l = l.div(l.times(l).plus(1).sqrt().plus(1))
   for (
      P = !1, t = Math.ceil(a / v), n = 1, u = l.times(l), s = new c(l), i = l;
      e !== -1;

   )
      if (
         ((i = i.times(u)),
         (o = s.minus(i.div((n += 2)))),
         (i = i.times(u)),
         (s = o.plus(i.div((n += 2)))),
         s.d[t] !== void 0)
      )
         for (e = t; s.d[e] === o.d[e] && e--; );
   return (
      r && (s = s.times(2 << (r - 1))),
      (P = !0),
      T(s, (c.precision = p), (c.rounding = f), !0)
   )
}
y.isFinite = function () {
   return !!this.d
}
y.isInteger = y.isInt = function () {
   return !!this.d && ie(this.e / v) > this.d.length - 2
}
y.isNaN = function () {
   return !this.s
}
y.isNegative = y.isNeg = function () {
   return this.s < 0
}
y.isPositive = y.isPos = function () {
   return this.s > 0
}
y.isZero = function () {
   return !!this.d && this.d[0] === 0
}
y.lessThan = y.lt = function (e) {
   return this.cmp(e) < 0
}
y.lessThanOrEqualTo = y.lte = function (e) {
   return this.cmp(e) < 1
}
y.logarithm = y.log = function (e) {
   var t,
      r,
      n,
      i,
      o,
      s,
      a,
      u,
      l = this,
      c = l.constructor,
      p = c.precision,
      f = c.rounding,
      m = 5
   if (e == null) (e = new c(10)), (t = !0)
   else {
      if (((e = new c(e)), (r = e.d), e.s < 0 || !r || !r[0] || e.eq(1)))
         return new c(NaN)
      t = e.eq(10)
   }
   if (((r = l.d), l.s < 0 || !r || !r[0] || l.eq(1)))
      return new c(r && !r[0] ? -1 / 0 : l.s != 1 ? NaN : r ? 0 : 1 / 0)
   if (t)
      if (r.length > 1) o = !0
      else {
         for (i = r[0]; i % 10 === 0; ) i /= 10
         o = i !== 1
      }
   if (
      ((P = !1),
      (a = p + m),
      (s = Qe(l, a)),
      (n = t ? Lr(c, a + 10) : Qe(e, a)),
      (u = L(s, n, a, 1)),
      Kt(u.d, (i = p), f))
   )
      do
         if (
            ((a += 10),
            (s = Qe(l, a)),
            (n = t ? Lr(c, a + 10) : Qe(e, a)),
            (u = L(s, n, a, 1)),
            !o)
         ) {
            ;+Z(u.d).slice(i + 1, i + 15) + 1 == 1e14 && (u = T(u, p + 1, 0))
            break
         }
      while (Kt(u.d, (i += 10), f))
   return (P = !0), T(u, p, f)
}
y.minus = y.sub = function (e) {
   var t,
      r,
      n,
      i,
      o,
      s,
      a,
      u,
      l,
      c,
      p,
      f,
      m = this,
      d = m.constructor
   if (((e = new d(e)), !m.d || !e.d))
      return (
         !m.s || !e.s
            ? (e = new d(NaN))
            : m.d
            ? (e.s = -e.s)
            : (e = new d(e.d || m.s !== e.s ? m : NaN)),
         e
      )
   if (m.s != e.s) return (e.s = -e.s), m.plus(e)
   if (
      ((l = m.d),
      (f = e.d),
      (a = d.precision),
      (u = d.rounding),
      !l[0] || !f[0])
   ) {
      if (f[0]) e.s = -e.s
      else if (l[0]) e = new d(m)
      else return new d(u === 3 ? -0 : 0)
      return P ? T(e, a, u) : e
   }
   if (
      ((r = ie(e.e / v)), (c = ie(m.e / v)), (l = l.slice()), (o = c - r), o)
   ) {
      for (
         p = o < 0,
            p
               ? ((t = l), (o = -o), (s = f.length))
               : ((t = f), (r = c), (s = l.length)),
            n = Math.max(Math.ceil(a / v), s) + 2,
            o > n && ((o = n), (t.length = 1)),
            t.reverse(),
            n = o;
         n--;

      )
         t.push(0)
      t.reverse()
   } else {
      for (
         n = l.length, s = f.length, p = n < s, p && (s = n), n = 0;
         n < s;
         n++
      )
         if (l[n] != f[n]) {
            p = l[n] < f[n]
            break
         }
      o = 0
   }
   for (
      p && ((t = l), (l = f), (f = t), (e.s = -e.s)),
         s = l.length,
         n = f.length - s;
      n > 0;
      --n
   )
      l[s++] = 0
   for (n = f.length; n > o; ) {
      if (l[--n] < f[n]) {
         for (i = n; i && l[--i] === 0; ) l[i] = Me - 1
         --l[i], (l[n] += Me)
      }
      l[n] -= f[n]
   }
   for (; l[--s] === 0; ) l.pop()
   for (; l[0] === 0; l.shift()) --r
   return l[0]
      ? ((e.d = l), (e.e = jr(l, r)), P ? T(e, a, u) : e)
      : new d(u === 3 ? -0 : 0)
}
y.modulo = y.mod = function (e) {
   var t,
      r = this,
      n = r.constructor
   return (
      (e = new n(e)),
      !r.d || !e.s || (e.d && !e.d[0])
         ? new n(NaN)
         : !e.d || (r.d && !r.d[0])
         ? T(new n(r), n.precision, n.rounding)
         : ((P = !1),
           n.modulo == 9
              ? ((t = L(r, e.abs(), 0, 3, 1)), (t.s *= e.s))
              : (t = L(r, e, 0, n.modulo, 1)),
           (t = t.times(e)),
           (P = !0),
           r.minus(t))
   )
}
y.naturalExponential = y.exp = function () {
   return bi(this)
}
y.naturalLogarithm = y.ln = function () {
   return Qe(this)
}
y.negated = y.neg = function () {
   var e = new this.constructor(this)
   return (e.s = -e.s), T(e)
}
y.plus = y.add = function (e) {
   var t,
      r,
      n,
      i,
      o,
      s,
      a,
      u,
      l,
      c,
      p = this,
      f = p.constructor
   if (((e = new f(e)), !p.d || !e.d))
      return (
         !p.s || !e.s
            ? (e = new f(NaN))
            : p.d || (e = new f(e.d || p.s === e.s ? p : NaN)),
         e
      )
   if (p.s != e.s) return (e.s = -e.s), p.minus(e)
   if (
      ((l = p.d),
      (c = e.d),
      (a = f.precision),
      (u = f.rounding),
      !l[0] || !c[0])
   )
      return c[0] || (e = new f(p)), P ? T(e, a, u) : e
   if (
      ((o = ie(p.e / v)), (n = ie(e.e / v)), (l = l.slice()), (i = o - n), i)
   ) {
      for (
         i < 0
            ? ((r = l), (i = -i), (s = c.length))
            : ((r = c), (n = o), (s = l.length)),
            o = Math.ceil(a / v),
            s = o > s ? o + 1 : s + 1,
            i > s && ((i = s), (r.length = 1)),
            r.reverse();
         i--;

      )
         r.push(0)
      r.reverse()
   }
   for (
      s = l.length,
         i = c.length,
         s - i < 0 && ((i = s), (r = c), (c = l), (l = r)),
         t = 0;
      i;

   )
      (t = ((l[--i] = l[i] + c[i] + t) / Me) | 0), (l[i] %= Me)
   for (t && (l.unshift(t), ++n), s = l.length; l[--s] == 0; ) l.pop()
   return (e.d = l), (e.e = jr(l, n)), P ? T(e, a, u) : e
}
y.precision = y.sd = function (e) {
   var t,
      r = this
   if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(Ge + e)
   return (
      r.d ? ((t = Fs(r.d)), e && r.e + 1 > t && (t = r.e + 1)) : (t = NaN), t
   )
}
y.round = function () {
   var e = this,
      t = e.constructor
   return T(new t(e), e.e + 1, t.rounding)
}
y.sine = y.sin = function () {
   var e,
      t,
      r = this,
      n = r.constructor
   return r.isFinite()
      ? r.isZero()
         ? new n(r)
         : ((e = n.precision),
           (t = n.rounding),
           (n.precision = e + Math.max(r.e, r.sd()) + v),
           (n.rounding = 1),
           (r = Mc(n, Os(n, r))),
           (n.precision = e),
           (n.rounding = t),
           T(_e > 2 ? r.neg() : r, e, t, !0))
      : new n(NaN)
}
y.squareRoot = y.sqrt = function () {
   var e,
      t,
      r,
      n,
      i,
      o,
      s = this,
      a = s.d,
      u = s.e,
      l = s.s,
      c = s.constructor
   if (l !== 1 || !a || !a[0])
      return new c(!l || (l < 0 && (!a || a[0])) ? NaN : a ? s : 1 / 0)
   for (
      P = !1,
         l = Math.sqrt(+s),
         l == 0 || l == 1 / 0
            ? ((t = Z(a)),
              (t.length + u) % 2 == 0 && (t += '0'),
              (l = Math.sqrt(t)),
              (u = ie((u + 1) / 2) - (u < 0 || u % 2)),
              l == 1 / 0
                 ? (t = '5e' + u)
                 : ((t = l.toExponential()),
                   (t = t.slice(0, t.indexOf('e') + 1) + u)),
              (n = new c(t)))
            : (n = new c(l.toString())),
         r = (u = c.precision) + 3;
      ;

   )
      if (
         ((o = n),
         (n = o.plus(L(s, o, r + 2, 1)).times(0.5)),
         Z(o.d).slice(0, r) === (t = Z(n.d)).slice(0, r))
      )
         if (
            ((t = t.slice(r - 3, r + 1)), t == '9999' || (!i && t == '4999'))
         ) {
            if (!i && (T(o, u + 1, 0), o.times(o).eq(s))) {
               n = o
               break
            }
            ;(r += 4), (i = 1)
         } else {
            ;(!+t || (!+t.slice(1) && t.charAt(0) == '5')) &&
               (T(n, u + 1, 1), (e = !n.times(n).eq(s)))
            break
         }
   return (P = !0), T(n, u, c.rounding, e)
}
y.tangent = y.tan = function () {
   var e,
      t,
      r = this,
      n = r.constructor
   return r.isFinite()
      ? r.isZero()
         ? new n(r)
         : ((e = n.precision),
           (t = n.rounding),
           (n.precision = e + 10),
           (n.rounding = 1),
           (r = r.sin()),
           (r.s = 1),
           (r = L(r, new n(1).minus(r.times(r)).sqrt(), e + 10, 0)),
           (n.precision = e),
           (n.rounding = t),
           T(_e == 2 || _e == 4 ? r.neg() : r, e, t, !0))
      : new n(NaN)
}
y.times = y.mul = function (e) {
   var t,
      r,
      n,
      i,
      o,
      s,
      a,
      u,
      l,
      c = this,
      p = c.constructor,
      f = c.d,
      m = (e = new p(e)).d
   if (((e.s *= c.s), !f || !f[0] || !m || !m[0]))
      return new p(
         !e.s || (f && !f[0] && !m) || (m && !m[0] && !f)
            ? NaN
            : !f || !m
            ? e.s / 0
            : e.s * 0,
      )
   for (
      r = ie(c.e / v) + ie(e.e / v),
         u = f.length,
         l = m.length,
         u < l && ((o = f), (f = m), (m = o), (s = u), (u = l), (l = s)),
         o = [],
         s = u + l,
         n = s;
      n--;

   )
      o.push(0)
   for (n = l; --n >= 0; ) {
      for (t = 0, i = u + n; i > n; )
         (a = o[i] + m[n] * f[i - n - 1] + t),
            (o[i--] = a % Me | 0),
            (t = (a / Me) | 0)
      o[i] = (o[i] + t) % Me | 0
   }
   for (; !o[--s]; ) o.pop()
   return (
      t ? ++r : o.shift(),
      (e.d = o),
      (e.e = jr(o, r)),
      P ? T(e, p.precision, p.rounding) : e
   )
}
y.toBinary = function (e, t) {
   return xi(this, 2, e, t)
}
y.toDecimalPlaces = y.toDP = function (e, t) {
   var r = this,
      n = r.constructor
   return (
      (r = new n(r)),
      e === void 0
         ? r
         : (me(e, 0, Je),
           t === void 0 ? (t = n.rounding) : me(t, 0, 8),
           T(r, e + r.e + 1, t))
   )
}
y.toExponential = function (e, t) {
   var r,
      n = this,
      i = n.constructor
   return (
      e === void 0
         ? (r = Oe(n, !0))
         : (me(e, 0, Je),
           t === void 0 ? (t = i.rounding) : me(t, 0, 8),
           (n = T(new i(n), e + 1, t)),
           (r = Oe(n, !0, e + 1))),
      n.isNeg() && !n.isZero() ? '-' + r : r
   )
}
y.toFixed = function (e, t) {
   var r,
      n,
      i = this,
      o = i.constructor
   return (
      e === void 0
         ? (r = Oe(i))
         : (me(e, 0, Je),
           t === void 0 ? (t = o.rounding) : me(t, 0, 8),
           (n = T(new o(i), e + i.e + 1, t)),
           (r = Oe(n, !1, e + n.e + 1))),
      i.isNeg() && !i.isZero() ? '-' + r : r
   )
}
y.toFraction = function (e) {
   var t,
      r,
      n,
      i,
      o,
      s,
      a,
      u,
      l,
      c,
      p,
      f,
      m = this,
      d = m.d,
      g = m.constructor
   if (!d) return new g(m)
   if (
      ((l = r = new g(1)),
      (n = u = new g(0)),
      (t = new g(n)),
      (o = t.e = Fs(d) - m.e - 1),
      (s = o % v),
      (t.d[0] = W(10, s < 0 ? v + s : s)),
      e == null)
   )
      e = o > 0 ? t : l
   else {
      if (((a = new g(e)), !a.isInt() || a.lt(l))) throw Error(Ge + a)
      e = a.gt(t) ? (o > 0 ? t : l) : a
   }
   for (
      P = !1,
         a = new g(Z(d)),
         c = g.precision,
         g.precision = o = d.length * v * 2;
      (p = L(a, t, 0, 1, 1)), (i = r.plus(p.times(n))), i.cmp(e) != 1;

   )
      (r = n),
         (n = i),
         (i = l),
         (l = u.plus(p.times(i))),
         (u = i),
         (i = t),
         (t = a.minus(p.times(i))),
         (a = i)
   return (
      (i = L(e.minus(r), n, 0, 1, 1)),
      (u = u.plus(i.times(l))),
      (r = r.plus(i.times(n))),
      (u.s = l.s = m.s),
      (f =
         L(l, n, o, 1).minus(m).abs().cmp(L(u, r, o, 1).minus(m).abs()) < 1
            ? [l, n]
            : [u, r]),
      (g.precision = c),
      (P = !0),
      f
   )
}
y.toHexadecimal = y.toHex = function (e, t) {
   return xi(this, 16, e, t)
}
y.toNearest = function (e, t) {
   var r = this,
      n = r.constructor
   if (((r = new n(r)), e == null)) {
      if (!r.d) return r
      ;(e = new n(1)), (t = n.rounding)
   } else {
      if (((e = new n(e)), t === void 0 ? (t = n.rounding) : me(t, 0, 8), !r.d))
         return e.s ? r : e
      if (!e.d) return e.s && (e.s = r.s), e
   }
   return (
      e.d[0]
         ? ((P = !1), (r = L(r, e, 0, t, 1).times(e)), (P = !0), T(r))
         : ((e.s = r.s), (r = e)),
      r
   )
}
y.toNumber = function () {
   return +this
}
y.toOctal = function (e, t) {
   return xi(this, 8, e, t)
}
y.toPower = y.pow = function (e) {
   var t,
      r,
      n,
      i,
      o,
      s,
      a = this,
      u = a.constructor,
      l = +(e = new u(e))
   if (!a.d || !e.d || !a.d[0] || !e.d[0]) return new u(W(+a, l))
   if (((a = new u(a)), a.eq(1))) return a
   if (((n = u.precision), (o = u.rounding), e.eq(1))) return T(a, n, o)
   if (((t = ie(e.e / v)), t >= e.d.length - 1 && (r = l < 0 ? -l : l) <= Ec))
      return (i = Cs(u, a, r, n)), e.s < 0 ? new u(1).div(i) : T(i, n, o)
   if (((s = a.s), s < 0)) {
      if (t < e.d.length - 1) return new u(NaN)
      if (
         ((e.d[t] & 1) == 0 && (s = 1),
         a.e == 0 && a.d[0] == 1 && a.d.length == 1)
      )
         return (a.s = s), a
   }
   return (
      (r = W(+a, l)),
      (t =
         r == 0 || !isFinite(r)
            ? ie(l * (Math.log('0.' + Z(a.d)) / Math.LN10 + a.e + 1))
            : new u(r + '').e),
      t > u.maxE + 1 || t < u.minE - 1
         ? new u(t > 0 ? s / 0 : 0)
         : ((P = !1),
           (u.rounding = a.s = 1),
           (r = Math.min(12, (t + '').length)),
           (i = bi(e.times(Qe(a, n + r)), n)),
           i.d &&
              ((i = T(i, n + 5, 1)),
              Kt(i.d, n, o) &&
                 ((t = n + 10),
                 (i = T(bi(e.times(Qe(a, t + r)), t), t + 5, 1)),
                 +Z(i.d).slice(n + 1, n + 15) + 1 == 1e14 &&
                    (i = T(i, n + 1, 0)))),
           (i.s = s),
           (P = !0),
           (u.rounding = o),
           T(i, n, o))
   )
}
y.toPrecision = function (e, t) {
   var r,
      n = this,
      i = n.constructor
   return (
      e === void 0
         ? (r = Oe(n, n.e <= i.toExpNeg || n.e >= i.toExpPos))
         : (me(e, 1, Je),
           t === void 0 ? (t = i.rounding) : me(t, 0, 8),
           (n = T(new i(n), e, t)),
           (r = Oe(n, e <= n.e || n.e <= i.toExpNeg, e))),
      n.isNeg() && !n.isZero() ? '-' + r : r
   )
}
y.toSignificantDigits = y.toSD = function (e, t) {
   var r = this,
      n = r.constructor
   return (
      e === void 0
         ? ((e = n.precision), (t = n.rounding))
         : (me(e, 1, Je), t === void 0 ? (t = n.rounding) : me(t, 0, 8)),
      T(new n(r), e, t)
   )
}
y.toString = function () {
   var e = this,
      t = e.constructor,
      r = Oe(e, e.e <= t.toExpNeg || e.e >= t.toExpPos)
   return e.isNeg() && !e.isZero() ? '-' + r : r
}
y.truncated = y.trunc = function () {
   return T(new this.constructor(this), this.e + 1, 1)
}
y.valueOf = y.toJSON = function () {
   var e = this,
      t = e.constructor,
      r = Oe(e, e.e <= t.toExpNeg || e.e >= t.toExpPos)
   return e.isNeg() ? '-' + r : r
}
function Z(e) {
   var t,
      r,
      n,
      i = e.length - 1,
      o = '',
      s = e[0]
   if (i > 0) {
      for (o += s, t = 1; t < i; t++)
         (n = e[t] + ''), (r = v - n.length), r && (o += Ue(r)), (o += n)
      ;(s = e[t]), (n = s + ''), (r = v - n.length), r && (o += Ue(r))
   } else if (s === 0) return '0'
   for (; s % 10 === 0; ) s /= 10
   return o + s
}
function me(e, t, r) {
   if (e !== ~~e || e < t || e > r) throw Error(Ge + e)
}
function Kt(e, t, r, n) {
   var i, o, s, a
   for (o = e[0]; o >= 10; o /= 10) --t
   return (
      --t < 0 ? ((t += v), (i = 0)) : ((i = Math.ceil((t + 1) / v)), (t %= v)),
      (o = W(10, v - t)),
      (a = e[i] % o | 0),
      n == null
         ? t < 3
            ? (t == 0 ? (a = (a / 100) | 0) : t == 1 && (a = (a / 10) | 0),
              (s =
                 (r < 4 && a == 99999) ||
                 (r > 3 && a == 49999) ||
                 a == 5e4 ||
                 a == 0))
            : (s =
                 (((r < 4 && a + 1 == o) || (r > 3 && a + 1 == o / 2)) &&
                    ((e[i + 1] / o / 100) | 0) == W(10, t - 2) - 1) ||
                 ((a == o / 2 || a == 0) && ((e[i + 1] / o / 100) | 0) == 0))
         : t < 4
         ? (t == 0
              ? (a = (a / 1e3) | 0)
              : t == 1
              ? (a = (a / 100) | 0)
              : t == 2 && (a = (a / 10) | 0),
           (s = ((n || r < 4) && a == 9999) || (!n && r > 3 && a == 4999)))
         : (s =
              (((n || r < 4) && a + 1 == o) ||
                 (!n && r > 3 && a + 1 == o / 2)) &&
              ((e[i + 1] / o / 1e3) | 0) == W(10, t - 3) - 1),
      s
   )
}
function Ir(e, t, r) {
   for (var n, i = [0], o, s = 0, a = e.length; s < a; ) {
      for (o = i.length; o--; ) i[o] *= t
      for (i[0] += gi.indexOf(e.charAt(s++)), n = 0; n < i.length; n++)
         i[n] > r - 1 &&
            (i[n + 1] === void 0 && (i[n + 1] = 0),
            (i[n + 1] += (i[n] / r) | 0),
            (i[n] %= r))
   }
   return i.reverse()
}
function vc(e, t) {
   var r, n, i
   if (t.isZero()) return t
   ;(n = t.d.length),
      n < 32
         ? ((r = Math.ceil(n / 3)), (i = (1 / qr(4, r)).toString()))
         : ((r = 16), (i = '2.3283064365386962890625e-10')),
      (e.precision += r),
      (t = xt(e, 1, t.times(i), new e(1)))
   for (var o = r; o--; ) {
      var s = t.times(t)
      t = s.times(s).minus(s).times(8).plus(1)
   }
   return (e.precision -= r), t
}
var L = (function () {
   function e(n, i, o) {
      var s,
         a = 0,
         u = n.length
      for (n = n.slice(); u--; )
         (s = n[u] * i + a), (n[u] = s % o | 0), (a = (s / o) | 0)
      return a && n.unshift(a), n
   }
   function t(n, i, o, s) {
      var a, u
      if (o != s) u = o > s ? 1 : -1
      else
         for (a = u = 0; a < o; a++)
            if (n[a] != i[a]) {
               u = n[a] > i[a] ? 1 : -1
               break
            }
      return u
   }
   function r(n, i, o, s) {
      for (var a = 0; o--; )
         (n[o] -= a), (a = n[o] < i[o] ? 1 : 0), (n[o] = a * s + n[o] - i[o])
      for (; !n[0] && n.length > 1; ) n.shift()
   }
   return function (n, i, o, s, a, u) {
      var l,
         c,
         p,
         f,
         m,
         d,
         g,
         b,
         h,
         x,
         w,
         E,
         C,
         O,
         q,
         I,
         G,
         J,
         ee,
         at,
         fr = n.constructor,
         On = n.s == i.s ? 1 : -1,
         te = n.d,
         k = i.d
      if (!te || !te[0] || !k || !k[0])
         return new fr(
            !n.s || !i.s || (te ? k && te[0] == k[0] : !k)
               ? NaN
               : (te && te[0] == 0) || !k
               ? On * 0
               : On / 0,
         )
      for (
         u
            ? ((m = 1), (c = n.e - i.e))
            : ((u = Me), (m = v), (c = ie(n.e / m) - ie(i.e / m))),
            ee = k.length,
            G = te.length,
            h = new fr(On),
            x = h.d = [],
            p = 0;
         k[p] == (te[p] || 0);
         p++
      );
      if (
         (k[p] > (te[p] || 0) && c--,
         o == null
            ? ((O = o = fr.precision), (s = fr.rounding))
            : a
            ? (O = o + (n.e - i.e) + 1)
            : (O = o),
         O < 0)
      )
         x.push(1), (d = !0)
      else {
         if (((O = (O / m + 2) | 0), (p = 0), ee == 1)) {
            for (f = 0, k = k[0], O++; (p < G || f) && O--; p++)
               (q = f * u + (te[p] || 0)), (x[p] = (q / k) | 0), (f = q % k | 0)
            d = f || p < G
         } else {
            for (
               f = (u / (k[0] + 1)) | 0,
                  f > 1 &&
                     ((k = e(k, f, u)),
                     (te = e(te, f, u)),
                     (ee = k.length),
                     (G = te.length)),
                  I = ee,
                  w = te.slice(0, ee),
                  E = w.length;
               E < ee;

            )
               w[E++] = 0
            ;(at = k.slice()), at.unshift(0), (J = k[0]), k[1] >= u / 2 && ++J
            do
               (f = 0),
                  (l = t(k, w, ee, E)),
                  l < 0
                     ? ((C = w[0]),
                       ee != E && (C = C * u + (w[1] || 0)),
                       (f = (C / J) | 0),
                       f > 1
                          ? (f >= u && (f = u - 1),
                            (g = e(k, f, u)),
                            (b = g.length),
                            (E = w.length),
                            (l = t(g, w, b, E)),
                            l == 1 && (f--, r(g, ee < b ? at : k, b, u)))
                          : (f == 0 && (l = f = 1), (g = k.slice())),
                       (b = g.length),
                       b < E && g.unshift(0),
                       r(w, g, E, u),
                       l == -1 &&
                          ((E = w.length),
                          (l = t(k, w, ee, E)),
                          l < 1 && (f++, r(w, ee < E ? at : k, E, u))),
                       (E = w.length))
                     : l === 0 && (f++, (w = [0])),
                  (x[p++] = f),
                  l && w[0] ? (w[E++] = te[I] || 0) : ((w = [te[I]]), (E = 1))
            while ((I++ < G || w[0] !== void 0) && O--)
            d = w[0] !== void 0
         }
         x[0] || x.shift()
      }
      if (m == 1) (h.e = c), (Es = d)
      else {
         for (p = 1, f = x[0]; f >= 10; f /= 10) p++
         ;(h.e = p + c * m - 1), T(h, a ? o + h.e + 1 : o, s, d)
      }
      return h
   }
})()
function T(e, t, r, n) {
   var i,
      o,
      s,
      a,
      u,
      l,
      c,
      p,
      f,
      m = e.constructor
   e: if (t != null) {
      if (((p = e.d), !p)) return e
      for (i = 1, a = p[0]; a >= 10; a /= 10) i++
      if (((o = t - i), o < 0))
         (o += v),
            (s = t),
            (c = p[(f = 0)]),
            (u = (c / W(10, i - s - 1)) % 10 | 0)
      else if (((f = Math.ceil((o + 1) / v)), (a = p.length), f >= a))
         if (n) {
            for (; a++ <= f; ) p.push(0)
            ;(c = u = 0), (i = 1), (o %= v), (s = o - v + 1)
         } else break e
      else {
         for (c = a = p[f], i = 1; a >= 10; a /= 10) i++
         ;(o %= v),
            (s = o - v + i),
            (u = s < 0 ? 0 : (c / W(10, i - s - 1)) % 10 | 0)
      }
      if (
         ((n =
            n ||
            t < 0 ||
            p[f + 1] !== void 0 ||
            (s < 0 ? c : c % W(10, i - s - 1))),
         (l =
            r < 4
               ? (u || n) && (r == 0 || r == (e.s < 0 ? 3 : 2))
               : u > 5 ||
                 (u == 5 &&
                    (r == 4 ||
                       n ||
                       (r == 6 &&
                          (o > 0 ? (s > 0 ? c / W(10, i - s) : 0) : p[f - 1]) %
                             10 &
                             1) ||
                       r == (e.s < 0 ? 8 : 7)))),
         t < 1 || !p[0])
      )
         return (
            (p.length = 0),
            l
               ? ((t -= e.e + 1),
                 (p[0] = W(10, (v - (t % v)) % v)),
                 (e.e = -t || 0))
               : (p[0] = e.e = 0),
            e
         )
      if (
         (o == 0
            ? ((p.length = f), (a = 1), f--)
            : ((p.length = f + 1),
              (a = W(10, v - o)),
              (p[f] = s > 0 ? ((c / W(10, i - s)) % W(10, s) | 0) * a : 0)),
         l)
      )
         for (;;)
            if (f == 0) {
               for (o = 1, s = p[0]; s >= 10; s /= 10) o++
               for (s = p[0] += a, a = 1; s >= 10; s /= 10) a++
               o != a && (e.e++, p[0] == Me && (p[0] = 1))
               break
            } else {
               if (((p[f] += a), p[f] != Me)) break
               ;(p[f--] = 0), (a = 1)
            }
      for (o = p.length; p[--o] === 0; ) p.pop()
   }
   return (
      P &&
         (e.e > m.maxE
            ? ((e.d = null), (e.e = NaN))
            : e.e < m.minE && ((e.e = 0), (e.d = [0]))),
      e
   )
}
function Oe(e, t, r) {
   if (!e.isFinite()) return As(e)
   var n,
      i = e.e,
      o = Z(e.d),
      s = o.length
   return (
      t
         ? (r && (n = r - s) > 0
              ? (o = o.charAt(0) + '.' + o.slice(1) + Ue(n))
              : s > 1 && (o = o.charAt(0) + '.' + o.slice(1)),
           (o = o + (e.e < 0 ? 'e' : 'e+') + e.e))
         : i < 0
         ? ((o = '0.' + Ue(-i - 1) + o), r && (n = r - s) > 0 && (o += Ue(n)))
         : i >= s
         ? ((o += Ue(i + 1 - s)),
           r && (n = r - i - 1) > 0 && (o = o + '.' + Ue(n)))
         : ((n = i + 1) < s && (o = o.slice(0, n) + '.' + o.slice(n)),
           r && (n = r - s) > 0 && (i + 1 === s && (o += '.'), (o += Ue(n)))),
      o
   )
}
function jr(e, t) {
   var r = e[0]
   for (t *= v; r >= 10; r /= 10) t++
   return t
}
function Lr(e, t, r) {
   if (t > Tc) throw ((P = !0), r && (e.precision = r), Error(Ts))
   return T(new e(Nr), t, 1, !0)
}
function Pe(e, t, r) {
   if (t > yi) throw Error(Ts)
   return T(new e(kr), t, r, !0)
}
function Fs(e) {
   var t = e.length - 1,
      r = t * v + 1
   if (((t = e[t]), t)) {
      for (; t % 10 == 0; t /= 10) r--
      for (t = e[0]; t >= 10; t /= 10) r++
   }
   return r
}
function Ue(e) {
   for (var t = ''; e--; ) t += '0'
   return t
}
function Cs(e, t, r, n) {
   var i,
      o = new e(1),
      s = Math.ceil(n / v + 4)
   for (P = !1; ; ) {
      if (
         (r % 2 && ((o = o.times(t)), ws(o.d, s) && (i = !0)),
         (r = ie(r / 2)),
         r === 0)
      ) {
         ;(r = o.d.length - 1), i && o.d[r] === 0 && ++o.d[r]
         break
      }
      ;(t = t.times(t)), ws(t.d, s)
   }
   return (P = !0), o
}
function bs(e) {
   return e.d[e.d.length - 1] & 1
}
function Ss(e, t, r) {
   for (var n, i = new e(t[0]), o = 0; ++o < t.length; )
      if (((n = new e(t[o])), n.s)) i[r](n) && (i = n)
      else {
         i = n
         break
      }
   return i
}
function bi(e, t) {
   var r,
      n,
      i,
      o,
      s,
      a,
      u,
      l = 0,
      c = 0,
      p = 0,
      f = e.constructor,
      m = f.rounding,
      d = f.precision
   if (!e.d || !e.d[0] || e.e > 17)
      return new f(
         e.d
            ? e.d[0]
               ? e.s < 0
                  ? 0
                  : 1 / 0
               : 1
            : e.s
            ? e.s < 0
               ? 0
               : e
            : 0 / 0,
      )
   for (
      t == null ? ((P = !1), (u = d)) : (u = t), a = new f(0.03125);
      e.e > -2;

   )
      (e = e.times(a)), (p += 5)
   for (
      n = ((Math.log(W(2, p)) / Math.LN10) * 2 + 5) | 0,
         u += n,
         r = o = s = new f(1),
         f.precision = u;
      ;

   ) {
      if (
         ((o = T(o.times(e), u, 1)),
         (r = r.times(++c)),
         (a = s.plus(L(o, r, u, 1))),
         Z(a.d).slice(0, u) === Z(s.d).slice(0, u))
      ) {
         for (i = p; i--; ) s = T(s.times(s), u, 1)
         if (t == null)
            if (l < 3 && Kt(s.d, u - n, m, l))
               (f.precision = u += 10), (r = o = a = new f(1)), (c = 0), l++
            else return T(s, (f.precision = d), m, (P = !0))
         else return (f.precision = d), s
      }
      s = a
   }
}
function Qe(e, t) {
   var r,
      n,
      i,
      o,
      s,
      a,
      u,
      l,
      c,
      p,
      f,
      m = 1,
      d = 10,
      g = e,
      b = g.d,
      h = g.constructor,
      x = h.rounding,
      w = h.precision
   if (g.s < 0 || !b || !b[0] || (!g.e && b[0] == 1 && b.length == 1))
      return new h(b && !b[0] ? -1 / 0 : g.s != 1 ? NaN : b ? 0 : g)
   if (
      (t == null ? ((P = !1), (c = w)) : (c = t),
      (h.precision = c += d),
      (r = Z(b)),
      (n = r.charAt(0)),
      Math.abs((o = g.e)) < 15e14)
   ) {
      for (; (n < 7 && n != 1) || (n == 1 && r.charAt(1) > 3); )
         (g = g.times(e)), (r = Z(g.d)), (n = r.charAt(0)), m++
      ;(o = g.e),
         n > 1
            ? ((g = new h('0.' + r)), o++)
            : (g = new h(n + '.' + r.slice(1)))
   } else
      return (
         (l = Lr(h, c + 2, w).times(o + '')),
         (g = Qe(new h(n + '.' + r.slice(1)), c - d).plus(l)),
         (h.precision = w),
         t == null ? T(g, w, x, (P = !0)) : g
      )
   for (
      p = g,
         u = s = g = L(g.minus(1), g.plus(1), c, 1),
         f = T(g.times(g), c, 1),
         i = 3;
      ;

   ) {
      if (
         ((s = T(s.times(f), c, 1)),
         (l = u.plus(L(s, new h(i), c, 1))),
         Z(l.d).slice(0, c) === Z(u.d).slice(0, c))
      )
         if (
            ((u = u.times(2)),
            o !== 0 && (u = u.plus(Lr(h, c + 2, w).times(o + ''))),
            (u = L(u, new h(m), c, 1)),
            t == null)
         )
            if (Kt(u.d, c - d, x, a))
               (h.precision = c += d),
                  (l = s = g = L(p.minus(1), p.plus(1), c, 1)),
                  (f = T(g.times(g), c, 1)),
                  (i = a = 1)
            else return T(u, (h.precision = w), x, (P = !0))
         else return (h.precision = w), u
      ;(u = l), (i += 2)
   }
}
function As(e) {
   return String((e.s * e.s) / 0)
}
function wi(e, t) {
   var r, n, i
   for (
      (r = t.indexOf('.')) > -1 && (t = t.replace('.', '')),
         (n = t.search(/e/i)) > 0
            ? (r < 0 && (r = n),
              (r += +t.slice(n + 1)),
              (t = t.substring(0, n)))
            : r < 0 && (r = t.length),
         n = 0;
      t.charCodeAt(n) === 48;
      n++
   );
   for (i = t.length; t.charCodeAt(i - 1) === 48; --i);
   if (((t = t.slice(n, i)), t)) {
      if (
         ((i -= n),
         (e.e = r = r - n - 1),
         (e.d = []),
         (n = (r + 1) % v),
         r < 0 && (n += v),
         n < i)
      ) {
         for (n && e.d.push(+t.slice(0, n)), i -= v; n < i; )
            e.d.push(+t.slice(n, (n += v)))
         ;(t = t.slice(n)), (n = v - t.length)
      } else n -= i
      for (; n--; ) t += '0'
      e.d.push(+t),
         P &&
            (e.e > e.constructor.maxE
               ? ((e.d = null), (e.e = NaN))
               : e.e < e.constructor.minE && ((e.e = 0), (e.d = [0])))
   } else (e.e = 0), (e.d = [0])
   return e
}
function Pc(e, t) {
   var r, n, i, o, s, a, u, l, c
   if (t.indexOf('_') > -1) {
      if (((t = t.replace(/(\d)_(?=\d)/g, '$1')), Ms.test(t))) return wi(e, t)
   } else if (t === 'Infinity' || t === 'NaN')
      return +t || (e.s = NaN), (e.e = NaN), (e.d = null), e
   if (wc.test(t)) (r = 16), (t = t.toLowerCase())
   else if (bc.test(t)) r = 2
   else if (xc.test(t)) r = 8
   else throw Error(Ge + t)
   for (
      o = t.search(/p/i),
         o > 0
            ? ((u = +t.slice(o + 1)), (t = t.substring(2, o)))
            : (t = t.slice(2)),
         o = t.indexOf('.'),
         s = o >= 0,
         n = e.constructor,
         s &&
            ((t = t.replace('.', '')),
            (a = t.length),
            (o = a - o),
            (i = Cs(n, new n(r), o, o * 2))),
         l = Ir(t, r, Me),
         c = l.length - 1,
         o = c;
      l[o] === 0;
      --o
   )
      l.pop()
   return o < 0
      ? new n(e.s * 0)
      : ((e.e = jr(l, c)),
        (e.d = l),
        (P = !1),
        s && (e = L(e, i, a * 4)),
        u && (e = e.times(Math.abs(u) < 54 ? W(2, u) : it.pow(2, u))),
        (P = !0),
        e)
}
function Mc(e, t) {
   var r,
      n = t.d.length
   if (n < 3) return t.isZero() ? t : xt(e, 2, t, t)
   ;(r = 1.4 * Math.sqrt(n)),
      (r = r > 16 ? 16 : r | 0),
      (t = t.times(1 / qr(5, r))),
      (t = xt(e, 2, t, t))
   for (var i, o = new e(5), s = new e(16), a = new e(20); r--; )
      (i = t.times(t)), (t = t.times(o.plus(i.times(s.times(i).minus(a)))))
   return t
}
function xt(e, t, r, n, i) {
   var o,
      s,
      a,
      u,
      l = 1,
      c = e.precision,
      p = Math.ceil(c / v)
   for (P = !1, u = r.times(r), a = new e(n); ; ) {
      if (
         ((s = L(a.times(u), new e(t++ * t++), c, 1)),
         (a = i ? n.plus(s) : n.minus(s)),
         (n = L(s.times(u), new e(t++ * t++), c, 1)),
         (s = a.plus(n)),
         s.d[p] !== void 0)
      ) {
         for (o = p; s.d[o] === a.d[o] && o--; );
         if (o == -1) break
      }
      ;(o = a), (a = n), (n = s), (s = o), l++
   }
   return (P = !0), (s.d.length = p + 1), s
}
function qr(e, t) {
   for (var r = e; --t; ) r *= e
   return r
}
function Os(e, t) {
   var r,
      n = t.s < 0,
      i = Pe(e, e.precision, 1),
      o = i.times(0.5)
   if (((t = t.abs()), t.lte(o))) return (_e = n ? 4 : 1), t
   if (((r = t.divToInt(i)), r.isZero())) _e = n ? 3 : 2
   else {
      if (((t = t.minus(r.times(i))), t.lte(o)))
         return (_e = bs(r) ? (n ? 2 : 3) : n ? 4 : 1), t
      _e = bs(r) ? (n ? 1 : 4) : n ? 3 : 2
   }
   return t.minus(i).abs()
}
function xi(e, t, r, n) {
   var i,
      o,
      s,
      a,
      u,
      l,
      c,
      p,
      f,
      m = e.constructor,
      d = r !== void 0
   if (
      (d
         ? (me(r, 1, Je), n === void 0 ? (n = m.rounding) : me(n, 0, 8))
         : ((r = m.precision), (n = m.rounding)),
      !e.isFinite())
   )
      c = As(e)
   else {
      for (
         c = Oe(e),
            s = c.indexOf('.'),
            d
               ? ((i = 2),
                 t == 16 ? (r = r * 4 - 3) : t == 8 && (r = r * 3 - 2))
               : (i = t),
            s >= 0 &&
               ((c = c.replace('.', '')),
               (f = new m(1)),
               (f.e = c.length - s),
               (f.d = Ir(Oe(f), 10, i)),
               (f.e = f.d.length)),
            p = Ir(c, 10, i),
            o = u = p.length;
         p[--u] == 0;

      )
         p.pop()
      if (!p[0]) c = d ? '0p+0' : '0'
      else {
         if (
            (s < 0
               ? o--
               : ((e = new m(e)),
                 (e.d = p),
                 (e.e = o),
                 (e = L(e, f, r, n, 0, i)),
                 (p = e.d),
                 (o = e.e),
                 (l = Es)),
            (s = p[r]),
            (a = i / 2),
            (l = l || p[r + 1] !== void 0),
            (l =
               n < 4
                  ? (s !== void 0 || l) && (n === 0 || n === (e.s < 0 ? 3 : 2))
                  : s > a ||
                    (s === a &&
                       (n === 4 ||
                          l ||
                          (n === 6 && p[r - 1] & 1) ||
                          n === (e.s < 0 ? 8 : 7)))),
            (p.length = r),
            l)
         )
            for (; ++p[--r] > i - 1; ) (p[r] = 0), r || (++o, p.unshift(1))
         for (u = p.length; !p[u - 1]; --u);
         for (s = 0, c = ''; s < u; s++) c += gi.charAt(p[s])
         if (d) {
            if (u > 1)
               if (t == 16 || t == 8) {
                  for (s = t == 16 ? 4 : 3, --u; u % s; u++) c += '0'
                  for (p = Ir(c, i, t), u = p.length; !p[u - 1]; --u);
                  for (s = 1, c = '1.'; s < u; s++) c += gi.charAt(p[s])
               } else c = c.charAt(0) + '.' + c.slice(1)
            c = c + (o < 0 ? 'p' : 'p+') + o
         } else if (o < 0) {
            for (; ++o; ) c = '0' + c
            c = '0.' + c
         } else if (++o > u) for (o -= u; o--; ) c += '0'
         else o < u && (c = c.slice(0, o) + '.' + c.slice(o))
      }
      c = (t == 16 ? '0x' : t == 2 ? '0b' : t == 8 ? '0o' : '') + c
   }
   return e.s < 0 ? '-' + c : c
}
function ws(e, t) {
   if (e.length > t) return (e.length = t), !0
}
function Fc(e) {
   return new this(e).abs()
}
function Cc(e) {
   return new this(e).acos()
}
function Sc(e) {
   return new this(e).acosh()
}
function Ac(e, t) {
   return new this(e).plus(t)
}
function Oc(e) {
   return new this(e).asin()
}
function Rc(e) {
   return new this(e).asinh()
}
function $c(e) {
   return new this(e).atan()
}
function Dc(e) {
   return new this(e).atanh()
}
function Ic(e, t) {
   ;(e = new this(e)), (t = new this(t))
   var r,
      n = this.precision,
      i = this.rounding,
      o = n + 4
   return (
      !e.s || !t.s
         ? (r = new this(NaN))
         : !e.d && !t.d
         ? ((r = Pe(this, o, 1).times(t.s > 0 ? 0.25 : 0.75)), (r.s = e.s))
         : !t.d || e.isZero()
         ? ((r = t.s < 0 ? Pe(this, n, i) : new this(0)), (r.s = e.s))
         : !e.d || t.isZero()
         ? ((r = Pe(this, o, 1).times(0.5)), (r.s = e.s))
         : t.s < 0
         ? ((this.precision = o),
           (this.rounding = 1),
           (r = this.atan(L(e, t, o, 1))),
           (t = Pe(this, o, 1)),
           (this.precision = n),
           (this.rounding = i),
           (r = e.s < 0 ? r.minus(t) : r.plus(t)))
         : (r = this.atan(L(e, t, o, 1))),
      r
   )
}
function Nc(e) {
   return new this(e).cbrt()
}
function kc(e) {
   return T((e = new this(e)), e.e + 1, 2)
}
function Lc(e, t, r) {
   return new this(e).clamp(t, r)
}
function _c(e) {
   if (!e || typeof e != 'object') throw Error(_r + 'Object expected')
   var t,
      r,
      n,
      i = e.defaults === !0,
      o = [
         'precision',
         1,
         Je,
         'rounding',
         0,
         8,
         'toExpNeg',
         -wt,
         0,
         'toExpPos',
         0,
         wt,
         'maxE',
         0,
         wt,
         'minE',
         -wt,
         0,
         'modulo',
         0,
         9,
      ]
   for (t = 0; t < o.length; t += 3)
      if (((r = o[t]), i && (this[r] = hi[r]), (n = e[r]) !== void 0))
         if (ie(n) === n && n >= o[t + 1] && n <= o[t + 2]) this[r] = n
         else throw Error(Ge + r + ': ' + n)
   if (((r = 'crypto'), i && (this[r] = hi[r]), (n = e[r]) !== void 0))
      if (n === !0 || n === !1 || n === 0 || n === 1)
         if (n)
            if (
               typeof crypto < 'u' &&
               crypto &&
               (crypto.getRandomValues || crypto.randomBytes)
            )
               this[r] = !0
            else throw Error(vs)
         else this[r] = !1
      else throw Error(Ge + r + ': ' + n)
   return this
}
function jc(e) {
   return new this(e).cos()
}
function qc(e) {
   return new this(e).cosh()
}
function Rs(e) {
   var t, r, n
   function i(o) {
      var s,
         a,
         u,
         l = this
      if (!(l instanceof i)) return new i(o)
      if (((l.constructor = i), xs(o))) {
         ;(l.s = o.s),
            P
               ? !o.d || o.e > i.maxE
                  ? ((l.e = NaN), (l.d = null))
                  : o.e < i.minE
                  ? ((l.e = 0), (l.d = [0]))
                  : ((l.e = o.e), (l.d = o.d.slice()))
               : ((l.e = o.e), (l.d = o.d ? o.d.slice() : o.d))
         return
      }
      if (((u = typeof o), u === 'number')) {
         if (o === 0) {
            ;(l.s = 1 / o < 0 ? -1 : 1), (l.e = 0), (l.d = [0])
            return
         }
         if (
            (o < 0 ? ((o = -o), (l.s = -1)) : (l.s = 1), o === ~~o && o < 1e7)
         ) {
            for (s = 0, a = o; a >= 10; a /= 10) s++
            P
               ? s > i.maxE
                  ? ((l.e = NaN), (l.d = null))
                  : s < i.minE
                  ? ((l.e = 0), (l.d = [0]))
                  : ((l.e = s), (l.d = [o]))
               : ((l.e = s), (l.d = [o]))
            return
         } else if (o * 0 !== 0) {
            o || (l.s = NaN), (l.e = NaN), (l.d = null)
            return
         }
         return wi(l, o.toString())
      } else if (u !== 'string') throw Error(Ge + o)
      return (
         (a = o.charCodeAt(0)) === 45
            ? ((o = o.slice(1)), (l.s = -1))
            : (a === 43 && (o = o.slice(1)), (l.s = 1)),
         Ms.test(o) ? wi(l, o) : Pc(l, o)
      )
   }
   if (
      ((i.prototype = y),
      (i.ROUND_UP = 0),
      (i.ROUND_DOWN = 1),
      (i.ROUND_CEIL = 2),
      (i.ROUND_FLOOR = 3),
      (i.ROUND_HALF_UP = 4),
      (i.ROUND_HALF_DOWN = 5),
      (i.ROUND_HALF_EVEN = 6),
      (i.ROUND_HALF_CEIL = 7),
      (i.ROUND_HALF_FLOOR = 8),
      (i.EUCLID = 9),
      (i.config = i.set = _c),
      (i.clone = Rs),
      (i.isDecimal = xs),
      (i.abs = Fc),
      (i.acos = Cc),
      (i.acosh = Sc),
      (i.add = Ac),
      (i.asin = Oc),
      (i.asinh = Rc),
      (i.atan = $c),
      (i.atanh = Dc),
      (i.atan2 = Ic),
      (i.cbrt = Nc),
      (i.ceil = kc),
      (i.clamp = Lc),
      (i.cos = jc),
      (i.cosh = qc),
      (i.div = Bc),
      (i.exp = Vc),
      (i.floor = Uc),
      (i.hypot = Qc),
      (i.ln = Gc),
      (i.log = Jc),
      (i.log10 = Wc),
      (i.log2 = Kc),
      (i.max = Hc),
      (i.min = zc),
      (i.mod = Yc),
      (i.mul = Zc),
      (i.pow = Xc),
      (i.random = ep),
      (i.round = tp),
      (i.sign = rp),
      (i.sin = np),
      (i.sinh = ip),
      (i.sqrt = op),
      (i.sub = sp),
      (i.sum = ap),
      (i.tan = up),
      (i.tanh = lp),
      (i.trunc = cp),
      e === void 0 && (e = {}),
      e && e.defaults !== !0)
   )
      for (
         n = [
            'precision',
            'rounding',
            'toExpNeg',
            'toExpPos',
            'maxE',
            'minE',
            'modulo',
            'crypto',
         ],
            t = 0;
         t < n.length;

      )
         e.hasOwnProperty((r = n[t++])) || (e[r] = this[r])
   return i.config(e), i
}
function Bc(e, t) {
   return new this(e).div(t)
}
function Vc(e) {
   return new this(e).exp()
}
function Uc(e) {
   return T((e = new this(e)), e.e + 1, 3)
}
function Qc() {
   var e,
      t,
      r = new this(0)
   for (P = !1, e = 0; e < arguments.length; )
      if (((t = new this(arguments[e++])), t.d)) r.d && (r = r.plus(t.times(t)))
      else {
         if (t.s) return (P = !0), new this(1 / 0)
         r = t
      }
   return (P = !0), r.sqrt()
}
function xs(e) {
   return e instanceof it || (e && e.toStringTag === Ps) || !1
}
function Gc(e) {
   return new this(e).ln()
}
function Jc(e, t) {
   return new this(e).log(t)
}
function Kc(e) {
   return new this(e).log(2)
}
function Wc(e) {
   return new this(e).log(10)
}
function Hc() {
   return Ss(this, arguments, 'lt')
}
function zc() {
   return Ss(this, arguments, 'gt')
}
function Yc(e, t) {
   return new this(e).mod(t)
}
function Zc(e, t) {
   return new this(e).mul(t)
}
function Xc(e, t) {
   return new this(e).pow(t)
}
function ep(e) {
   var t,
      r,
      n,
      i,
      o = 0,
      s = new this(1),
      a = []
   if (
      (e === void 0 ? (e = this.precision) : me(e, 1, Je),
      (n = Math.ceil(e / v)),
      this.crypto)
   )
      if (crypto.getRandomValues)
         for (t = crypto.getRandomValues(new Uint32Array(n)); o < n; )
            (i = t[o]),
               i >= 429e7
                  ? (t[o] = crypto.getRandomValues(new Uint32Array(1))[0])
                  : (a[o++] = i % 1e7)
      else if (crypto.randomBytes) {
         for (t = crypto.randomBytes((n *= 4)); o < n; )
            (i =
               t[o] +
               (t[o + 1] << 8) +
               (t[o + 2] << 16) +
               ((t[o + 3] & 127) << 24)),
               i >= 214e7
                  ? crypto.randomBytes(4).copy(t, o)
                  : (a.push(i % 1e7), (o += 4))
         o = n / 4
      } else throw Error(vs)
   else for (; o < n; ) a[o++] = (Math.random() * 1e7) | 0
   for (
      n = a[--o],
         e %= v,
         n && e && ((i = W(10, v - e)), (a[o] = ((n / i) | 0) * i));
      a[o] === 0;
      o--
   )
      a.pop()
   if (o < 0) (r = 0), (a = [0])
   else {
      for (r = -1; a[0] === 0; r -= v) a.shift()
      for (n = 1, i = a[0]; i >= 10; i /= 10) n++
      n < v && (r -= v - n)
   }
   return (s.e = r), (s.d = a), s
}
function tp(e) {
   return T((e = new this(e)), e.e + 1, this.rounding)
}
function rp(e) {
   return (e = new this(e)), e.d ? (e.d[0] ? e.s : 0 * e.s) : e.s || NaN
}
function np(e) {
   return new this(e).sin()
}
function ip(e) {
   return new this(e).sinh()
}
function op(e) {
   return new this(e).sqrt()
}
function sp(e, t) {
   return new this(e).sub(t)
}
function ap() {
   var e = 0,
      t = arguments,
      r = new this(t[e])
   for (P = !1; r.s && ++e < t.length; ) r = r.plus(t[e])
   return (P = !0), T(r, this.precision, this.rounding)
}
function up(e) {
   return new this(e).tan()
}
function lp(e) {
   return new this(e).tanh()
}
function cp(e) {
   return T((e = new this(e)), e.e + 1, 1)
}
y[Symbol.for('nodejs.util.inspect.custom')] = y.toString
y[Symbol.toStringTag] = 'Decimal'
var it = (y.constructor = Rs(hi))
Nr = new it(Nr)
kr = new it(kr)
var he = it
var vi = S(Bt()),
   Is = S(Br())
var Ee = class {
   constructor(t, r, n, i, o) {
      ;(this.modelName = t),
         (this.name = r),
         (this.typeName = n),
         (this.isList = i),
         (this.isEnum = o)
   }
   _toGraphQLInputType() {
      let t = this.isList ? 'List' : '',
         r = this.isEnum ? 'Enum' : ''
      return `${t}${r}${this.typeName}FieldRefInput<${this.modelName}>`
   }
}
function Vr(e) {
   return e instanceof Ee
}
var Ds = [
      'JsonNullValueInput',
      'NullableJsonNullValueInput',
      'JsonNullValueFilter',
   ],
   Ur = Symbol(),
   Ei = new WeakMap(),
   oe = class {
      constructor(t) {
         t === Ur
            ? Ei.set(this, `Prisma.${this._getName()}`)
            : Ei.set(
                 this,
                 `new Prisma.${this._getNamespace()}.${this._getName()}()`,
              )
      }
      _getName() {
         return this.constructor.name
      }
      toString() {
         return Ei.get(this)
      }
   },
   Wt = class extends oe {
      _getNamespace() {
         return 'NullTypes'
      }
   },
   Ht = class extends Wt {}
Ti(Ht, 'DbNull')
var zt = class extends Wt {}
Ti(zt, 'JsonNull')
var Yt = class extends Wt {}
Ti(Yt, 'AnyNull')
var Et = {
   classes: { DbNull: Ht, JsonNull: zt, AnyNull: Yt },
   instances: { DbNull: new Ht(Ur), JsonNull: new zt(Ur), AnyNull: new Yt(Ur) },
}
function Ti(e, t) {
   Object.defineProperty(e, 'name', { value: t, configurable: !0 })
}
function ye(e) {
   return (
      e instanceof Date || Object.prototype.toString.call(e) === '[object Date]'
   )
}
function Re(e) {
   return e.toString() !== 'Invalid Date'
}
function Ke(e) {
   return it.isDecimal(e)
      ? !0
      : e !== null &&
           typeof e == 'object' &&
           typeof e.s == 'number' &&
           typeof e.e == 'number' &&
           typeof e.toFixed == 'function' &&
           Array.isArray(e.d)
}
var se = (e, t) => {
      let r = {}
      for (let n of e) {
         let i = n[t]
         r[i] = n
      }
      return r
   },
   Tt = {
      String: !0,
      Int: !0,
      Float: !0,
      Boolean: !0,
      Long: !0,
      DateTime: !0,
      ID: !0,
      UUID: !0,
      Json: !0,
      Bytes: !0,
      Decimal: !0,
      BigInt: !0,
   }
var pp = {
   string: 'String',
   boolean: 'Boolean',
   object: 'Json',
   symbol: 'Symbol',
}
function vt(e) {
   return typeof e == 'string' ? e : e.name
}
function Xt(e, t) {
   return t ? `List<${e}>` : e
}
var fp =
      /^(\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60))(\.\d{1,})?(([Z])|([+|-]([01][0-9]|2[0-3]):[0-5][0-9]))$/,
   mp =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
function Pt(e, t) {
   let r = t?.type
   if (e === null) return 'null'
   if (Object.prototype.toString.call(e) === '[object BigInt]') return 'BigInt'
   if (he.isDecimal(e) || (r === 'Decimal' && Ke(e))) return 'Decimal'
   if (Buffer.isBuffer(e)) return 'Bytes'
   if (dp(e, t)) return r.name
   if (e instanceof oe) return e._getName()
   if (e instanceof Ee) return e._toGraphQLInputType()
   if (Array.isArray(e)) {
      let i = e.reduce((o, s) => {
         let a = Pt(s, t)
         return o.includes(a) || o.push(a), o
      }, [])
      return (
         i.includes('Float') && i.includes('Int') && (i = ['Float']),
         `List<${i.join(' | ')}>`
      )
   }
   let n = typeof e
   if (n === 'number') return Math.trunc(e) === e ? 'Int' : 'Float'
   if (ye(e)) return 'DateTime'
   if (n === 'string') {
      if (mp.test(e)) return 'UUID'
      if (new Date(e).toString() === 'Invalid Date') return 'String'
      if (fp.test(e)) return 'DateTime'
   }
   return pp[n]
}
function dp(e, t) {
   let r = t?.type
   if (!hp(r)) return !1
   if (t?.namespace === 'prisma' && Ds.includes(r.name)) {
      let n = e?.constructor?.name
      return (
         typeof n == 'string' && Et.instances[n] === e && r.values.includes(n)
      )
   }
   return typeof e == 'string' && r.values.includes(e)
}
function Qr(e, t) {
   return t.reduce(
      (n, i) => {
         let o = (0, Is.default)(e, i)
         return o < n.distance ? { distance: o, str: i } : n
      },
      {
         distance: Math.min(
            Math.floor(e.length) * 1.1,
            ...t.map((n) => n.length * 3),
         ),
         str: null,
      },
   ).str
}
function Mt(e, t = !1) {
   if (typeof e == 'string') return e
   if (e.values)
      return `enum ${e.name} {
${(0, vi.default)(e.values.join(', '), 2)}
}`
   {
      let r = (0, vi.default)(
         e.fields.map((n) => {
            let i = `${n.name}`,
               o = `${t ? A(i) : i}${n.isRequired ? '' : '?'}: ${Dt(
                  n.inputTypes
                     .map((s) =>
                        Xt(gp(s.type) ? s.type.name : vt(s.type), s.isList),
                     )
                     .join(' | '),
               )}`
            return n.isRequired ? o : D(o)
         }).join(`
`),
         2,
      )
      return `${D('type')} ${M(D(e.name))} ${D('{')}
${r}
${D('}')}`
   }
}
function gp(e) {
   return typeof e != 'string'
}
function Zt(e) {
   return typeof e == 'string' ? (e === 'Null' ? 'null' : e) : e.name
}
function er(e) {
   return typeof e == 'string' ? e : e.name
}
function Pi(e, t, r = !1) {
   if (typeof e == 'string') return e === 'Null' ? 'null' : e
   if (e.values) return e.values.join(' | ')
   let n = e,
      i =
         t &&
         n.fields.every(
            (o) =>
               o.inputTypes[0].location === 'inputObjectTypes' ||
               o.inputTypes[1]?.location === 'inputObjectTypes',
         )
   return r
      ? Zt(e)
      : n.fields.reduce((o, s) => {
           let a = ''
           return (
              !i && !s.isRequired
                 ? (a = s.inputTypes.map((u) => Zt(u.type)).join(' | '))
                 : (a = s.inputTypes
                      .map((u) => Pi(u.type, s.isRequired, !0))
                      .join(' | ')),
              (o[s.name + (s.isRequired ? '' : '?')] = a),
              o
           )
        }, {})
}
function Ns(e, t, r) {
   let n = {}
   for (let i of e) n[r(i)] = i
   for (let i of t) {
      let o = r(i)
      n[o] || (n[o] = i)
   }
   return Object.values(n)
}
function Ft(e) {
   return e.substring(0, 1).toLowerCase() + e.substring(1)
}
function ks(e) {
   return e.endsWith('GroupByOutputType')
}
function hp(e) {
   return (
      typeof e == 'object' &&
      e !== null &&
      typeof e.name == 'string' &&
      Array.isArray(e.values)
   )
}
var Gr = class {
      constructor({ datamodel: t }) {
         ;(this.datamodel = t),
            (this.datamodelEnumMap = this.getDatamodelEnumMap()),
            (this.modelMap = this.getModelMap()),
            (this.typeMap = this.getTypeMap()),
            (this.typeAndModelMap = this.getTypeModelMap())
      }
      getDatamodelEnumMap() {
         return se(this.datamodel.enums, 'name')
      }
      getModelMap() {
         return { ...se(this.datamodel.models, 'name') }
      }
      getTypeMap() {
         return { ...se(this.datamodel.types, 'name') }
      }
      getTypeModelMap() {
         return { ...this.getTypeMap(), ...this.getModelMap() }
      }
   },
   Jr = class {
      constructor({ mappings: t }) {
         ;(this.mappings = t), (this.mappingsMap = this.getMappingsMap())
      }
      getMappingsMap() {
         return se(this.mappings.modelOperations, 'model')
      }
      getOtherOperationNames() {
         return [
            Object.values(this.mappings.otherOperations.write),
            Object.values(this.mappings.otherOperations.read),
         ].flat()
      }
   },
   Kr = class {
      constructor({ schema: t }) {
         this.outputTypeToMergedOutputType = (t) => ({ ...t, fields: t.fields })
         ;(this.schema = t),
            (this.enumMap = this.getEnumMap()),
            (this.queryType = this.getQueryType()),
            (this.mutationType = this.getMutationType()),
            (this.outputTypes = this.getOutputTypes()),
            (this.outputTypeMap = this.getMergedOutputTypeMap()),
            this.resolveOutputTypes(),
            (this.inputObjectTypes = this.schema.inputObjectTypes),
            (this.inputTypeMap = this.getInputTypeMap()),
            this.resolveInputTypes(),
            this.resolveFieldArgumentTypes(),
            (this.queryType = this.outputTypeMap.Query),
            (this.mutationType = this.outputTypeMap.Mutation),
            (this.rootFieldMap = this.getRootFieldMap())
      }
      get [Symbol.toStringTag]() {
         return 'DMMFClass'
      }
      resolveOutputTypes() {
         for (let t of this.outputTypes.model) {
            for (let r of t.fields)
               typeof r.outputType.type == 'string' &&
                  !Tt[r.outputType.type] &&
                  (r.outputType.type =
                     this.outputTypeMap[r.outputType.type] ||
                     this.outputTypeMap[r.outputType.type] ||
                     this.enumMap[r.outputType.type] ||
                     r.outputType.type)
            t.fieldMap = se(t.fields, 'name')
         }
         for (let t of this.outputTypes.prisma) {
            for (let r of t.fields)
               typeof r.outputType.type == 'string' &&
                  !Tt[r.outputType.type] &&
                  (r.outputType.type =
                     this.outputTypeMap[r.outputType.type] ||
                     this.outputTypeMap[r.outputType.type] ||
                     this.enumMap[r.outputType.type] ||
                     r.outputType.type)
            t.fieldMap = se(t.fields, 'name')
         }
      }
      resolveInputTypes() {
         let t = this.inputObjectTypes.prisma
         this.inputObjectTypes.model && t.push(...this.inputObjectTypes.model)
         for (let r of t) {
            for (let n of r.fields)
               for (let i of n.inputTypes) {
                  let o = i.type
                  typeof o == 'string' &&
                     !Tt[o] &&
                     (this.inputTypeMap[o] || this.enumMap[o]) &&
                     (i.type = this.inputTypeMap[o] || this.enumMap[o] || o)
               }
            r.fieldMap = se(r.fields, 'name')
         }
      }
      resolveFieldArgumentTypes() {
         for (let t of this.outputTypes.prisma)
            for (let r of t.fields)
               for (let n of r.args)
                  for (let i of n.inputTypes) {
                     let o = i.type
                     typeof o == 'string' &&
                        !Tt[o] &&
                        (i.type = this.inputTypeMap[o] || this.enumMap[o] || o)
                  }
         for (let t of this.outputTypes.model)
            for (let r of t.fields)
               for (let n of r.args)
                  for (let i of n.inputTypes) {
                     let o = i.type
                     typeof o == 'string' &&
                        !Tt[o] &&
                        (i.type =
                           this.inputTypeMap[o] || this.enumMap[o] || i.type)
                  }
      }
      getQueryType() {
         return this.schema.outputObjectTypes.prisma.find(
            (t) => t.name === 'Query',
         )
      }
      getMutationType() {
         return this.schema.outputObjectTypes.prisma.find(
            (t) => t.name === 'Mutation',
         )
      }
      getOutputTypes() {
         return {
            model: this.schema.outputObjectTypes.model.map(
               this.outputTypeToMergedOutputType,
            ),
            prisma: this.schema.outputObjectTypes.prisma.map(
               this.outputTypeToMergedOutputType,
            ),
         }
      }
      getEnumMap() {
         return {
            ...se(this.schema.enumTypes.prisma, 'name'),
            ...(this.schema.enumTypes.model
               ? se(this.schema.enumTypes.model, 'name')
               : void 0),
         }
      }
      hasEnumInNamespace(t, r) {
         return this.schema.enumTypes[r]?.find((n) => n.name === t) !== void 0
      }
      getMergedOutputTypeMap() {
         return {
            ...se(this.outputTypes.model, 'name'),
            ...se(this.outputTypes.prisma, 'name'),
         }
      }
      getInputTypeMap() {
         return {
            ...(this.schema.inputObjectTypes.model
               ? se(this.schema.inputObjectTypes.model, 'name')
               : void 0),
            ...se(this.schema.inputObjectTypes.prisma, 'name'),
         }
      }
      getRootFieldMap() {
         return {
            ...se(this.queryType.fields, 'name'),
            ...se(this.mutationType.fields, 'name'),
         }
      }
   },
   We = class {
      constructor(t) {
         return Object.assign(this, new Gr(t), new Jr(t), new Kr(t))
      }
   }
ys(We, [Gr, Jr, Kr])
var Uu = require('async_hooks'),
   Qu = require('events'),
   Gu = S(require('fs')),
   pr = S(require('path'))
var _s = S(Ls())
function js(e) {
   return { ...e, mappings: yp(e.mappings, e.datamodel) }
}
function yp(e, t) {
   return {
      modelOperations: e.modelOperations
         .filter((n) => {
            let i = t.models.find((o) => o.name === n.model)
            if (!i) throw new Error(`Mapping without model ${n.model}`)
            return i.fields.some((o) => o.kind !== 'object')
         })
         .map((n) => ({
            model: n.model,
            plural: (0, _s.default)(Ft(n.model)),
            findUnique: n.findUnique || n.findSingle,
            findUniqueOrThrow: n.findUniqueOrThrow,
            findFirst: n.findFirst,
            findFirstOrThrow: n.findFirstOrThrow,
            findMany: n.findMany,
            create: n.createOne || n.createSingle || n.create,
            createMany: n.createMany,
            delete: n.deleteOne || n.deleteSingle || n.delete,
            update: n.updateOne || n.updateSingle || n.update,
            deleteMany: n.deleteMany,
            updateMany: n.updateMany,
            upsert: n.upsertOne || n.upsertSingle || n.upsert,
            aggregate: n.aggregate,
            groupBy: n.groupBy,
            findRaw: n.findRaw,
            aggregateRaw: n.aggregateRaw,
         })),
      otherOperations: e.otherOperations,
   }
}
function qs(e) {
   return js(e)
}
function Bs({ error: e, user_facing_error: t }, r) {
   return t.error_code
      ? new re(t.message, {
           code: t.error_code,
           clientVersion: r,
           meta: t.meta,
           batchRequestIdx: t.batch_request_idx,
        })
      : new ne(e, { clientVersion: r, batchRequestIdx: t.batch_request_idx })
}
var Wr = class {}
var Js = S(require('fs')),
   tr = S(require('path'))
function Hr(e) {
   let { runtimeBinaryTarget: t } = e
   return `Add "${t}" to \`binaryTargets\` in the "schema.prisma" file and run \`prisma generate\` after saving it:

${bp(e)}`
}
function bp(e) {
   let { generator: t, generatorBinaryTargets: r, runtimeBinaryTarget: n } = e,
      i = { fromEnvVar: null, value: n },
      o = [...r, i]
   return ai({ ...t, binaryTargets: o })
}
function He(e) {
   let { runtimeBinaryTarget: t } = e
   return `Prisma Client could not locate the Query Engine for runtime "${t}".`
}
function ze(e) {
   let { searchedLocations: t } = e
   return `The following locations have been searched:
${[...new Set(t)].map((i) => `  ${i}`).join(`
`)}`
}
function Vs(e) {
   let { runtimeBinaryTarget: t } = e
   return `${He(e)}

This happened because \`binaryTargets\` have been pinned, but the actual deployment also required "${t}".
${Hr(e)}

${ze(e)}`
}
function zr(e) {
   return `We would appreciate if you could take the time to share some information with us.
Please help us by answering a few questions: https://pris.ly/${e}`
}
function Us(e) {
   let { queryEngineName: t } = e
   return `${He(e)}

This is likely caused by a bundler that has not copied "${t}" next to the resulting bundle.
Ensure that "${t}" has been copied next to the bundle or in "${
      e.expectedLocation
   }".

${zr('engine-not-found-bundler-investigation')}

${ze(e)}`
}
function Qs(e) {
   let { runtimeBinaryTarget: t, generatorBinaryTargets: r } = e,
      n = r.find((i) => i.native)
   return `${He(e)}

This happened because Prisma Client was generated for "${
      n?.value ?? 'unknown'
   }", but the actual deployment required "${t}".
${Hr(e)}

${ze(e)}`
}
function Gs(e) {
   let { queryEngineName: t } = e
   return `${He(e)}

This is likely caused by tooling that has not copied "${t}" to the deployment folder.
Ensure that you ran \`prisma generate\` and that "${t}" has been copied to "${
      e.expectedLocation
   }".

${zr('engine-not-found-tooling-investigation')}

${ze(e)}`
}
var wp = B('prisma:client:engines:resolveEnginePath'),
   xp = () => 'library',
   Ep = () => new RegExp(`runtime[\\\\/]${xp()}\\.m?js$`)
async function Ks(e, t) {
   let r =
      {
         binary: process.env.PRISMA_QUERY_ENGINE_BINARY,
         library: process.env.PRISMA_QUERY_ENGINE_LIBRARY,
      }[e] ?? t.prismaPath
   if (r !== void 0) return r
   let { enginePath: n, searchedLocations: i } = await Tp(e, t)
   if (
      (wp('enginePath', n),
      n !== void 0 && e === 'binary' && ii(n),
      n !== void 0)
   )
      return (t.prismaPath = n)
   let o = await ht(),
      s = t.generator?.binaryTargets ?? [],
      a = s.some((f) => f.native),
      u = !s.some((f) => f.value === o),
      l = __filename.match(Ep()) === null,
      c = {
         searchedLocations: i,
         generatorBinaryTargets: s,
         generator: t.generator,
         runtimeBinaryTarget: o,
         queryEngineName: Ws(e, o),
         expectedLocation: tr.default.relative(process.cwd(), t.dirname),
      },
      p
   throw (
      (a && u ? (p = Qs(c)) : u ? (p = Vs(c)) : l ? (p = Us(c)) : (p = Gs(c)),
      new Q(p, t.clientVersion))
   )
}
async function Tp(engineType, config) {
   let binaryTarget = await ht(),
      searchedLocations = [],
      dirname = eval('__dirname'),
      searchLocations = [
         config.dirname,
         tr.default.resolve(dirname, '..'),
         config.generator?.output?.value ?? dirname,
         tr.default.resolve(dirname, '../../../.prisma/client'),
         '/tmp/prisma-engines',
         config.cwd,
      ]
   __filename.includes('resolveEnginePath') && searchLocations.push(os())
   for (let e of searchLocations) {
      let t = Ws(engineType, binaryTarget),
         r = tr.default.join(e, t)
      if ((searchedLocations.push(e), Js.default.existsSync(r)))
         return { enginePath: r, searchedLocations }
   }
   return { enginePath: void 0, searchedLocations }
}
function Ws(e, t) {
   return e === 'library'
      ? Hn(t, 'fs')
      : `query-engine-${t}${t === 'windows' ? '.exe' : ''}`
}
function Hs(e, t) {
   return vp(e)
      ? !t || t.kind === 'itx'
         ? { batch: e, transaction: !1 }
         : {
              batch: e,
              transaction: !0,
              isolationLevel: t.options.isolationLevel,
           }
      : {
           batch: e,
           transaction:
              t?.kind === 'batch'
                 ? { isolationLevel: t.options.isolationLevel }
                 : void 0,
        }
}
function vp(e) {
   return typeof e[0].query == 'string'
}
var Ci = S(Qt())
function zs(e) {
   return e
      ? e
           .replace(/".*"/g, '"X"')
           .replace(/[\s:\[]([+-]?([0-9]*[.])?[0-9]+)/g, (t) => `${t[0]}5`)
      : ''
}
function Ys(e) {
   return e
      .split(
         `
`,
      )
      .map((t) =>
         t
            .replace(
               /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)\s*/,
               '',
            )
            .replace(/\+\d+\s*ms$/, ''),
      ).join(`
`)
}
var Zs = S(ms())
function Xs({
   title: e,
   user: t = 'prisma',
   repo: r = 'prisma',
   template: n = 'bug_report.md',
   body: i,
}) {
   return (0, Zs.default)({ user: t, repo: r, template: n, title: e, body: i })
}
function ea({
   version: e,
   platform: t,
   title: r,
   description: n,
   engineVersion: i,
   database: o,
   query: s,
}) {
   let a = Co(6e3 - (s?.length ?? 0)),
      u = Ys((0, Ci.default)(a)),
      l = n
         ? `# Description
\`\`\`
${n}
\`\`\``
         : '',
      c = (0,
      Ci.default)(`Hi Prisma Team! My Prisma Client just crashed. This is the report:
## Versions

| Name            | Version            |
|-----------------|--------------------|
| Node            | ${process.version?.padEnd(19)}| 
| OS              | ${t?.padEnd(19)}|
| Prisma Client   | ${e?.padEnd(19)}|
| Query Engine    | ${i?.padEnd(19)}|
| Database        | ${o?.padEnd(19)}|

${l}

## Logs
\`\`\`
${u}
\`\`\`

## Client Snippet
\`\`\`ts
// PLEASE FILL YOUR CODE SNIPPET HERE
\`\`\`

## Schema
\`\`\`prisma
// PLEASE ADD YOUR SCHEMA HERE IF POSSIBLE
\`\`\`

## Prisma Engine Query
\`\`\`
${s ? zs(s) : ''}
\`\`\`
`),
      p = Xs({ title: r, body: c })
   return `${r}

This is a non-recoverable error which probably happens when the Prisma Query Engine has a panic.

${le(p)}

If you want the Prisma team to look into it, please open the link above \u{1F64F}
To increase the chance of success, please post your schema and a snippet of
how you used Prisma Client in the issue. 
`
}
var oa = S(require('fs'))
function ta(e) {
   if (e?.kind === 'itx') return e.options.id
}
var Ai = S(require('os')),
   ra = S(require('path'))
var Si = Symbol('PrismaLibraryEngineCache')
function Pp() {
   let e = globalThis
   return e[Si] === void 0 && (e[Si] = {}), e[Si]
}
function Mp(e) {
   let t = Pp()
   if (t[e] !== void 0) return t[e]
   let r = ra.default.toNamespacedPath(e),
      n = { exports: {} },
      i = 0
   return (
      process.platform !== 'win32' &&
         (i =
            Ai.default.constants.dlopen.RTLD_LAZY |
            Ai.default.constants.dlopen.RTLD_DEEPBIND),
      process.dlopen(n, r, i),
      (t[e] = n.exports),
      n.exports
   )
}
var Yr = class {
   constructor(t) {
      this.config = t
   }
   async loadLibrary() {
      let t = await ei(),
         r = await Ks('library', this.config)
      try {
         return this.config.tracingHelper.runInChildSpan(
            { name: 'loadLibrary', internal: !0 },
            () => Mp(r),
         )
      } catch (n) {
         let i = oi({ e: n, platformInfo: t, id: r })
         throw new Q(i, this.config.clientVersion)
      }
   }
}
var Fp = B('prisma:client:libraryEngine:exitHooks'),
   Cp = { SIGINT: 2, SIGUSR2: 31, SIGTERM: 15 },
   Zr = class {
      constructor() {
         this.nextOwnerId = 1
         this.ownerToIdMap = new WeakMap()
         this.idToListenerMap = new Map()
         this.areHooksInstalled = !1
         this.exitLikeHook = async (t) => {
            Fp(`exit event received: ${t}`)
            for (let r of this.idToListenerMap.values()) await r()
            this.idToListenerMap.clear()
         }
      }
      install() {
         this.areHooksInstalled ||
            (this.installExitEventHook('beforeExit'),
            this.installExitEventHook('exit'),
            this.installExitSignalHook('SIGINT'),
            this.installExitSignalHook('SIGUSR2'),
            this.installExitSignalHook('SIGTERM'),
            (this.areHooksInstalled = !0))
      }
      setListener(t, r) {
         if (r) {
            let n = this.ownerToIdMap.get(t)
            n || ((n = this.nextOwnerId++), this.ownerToIdMap.set(t, n)),
               this.idToListenerMap.set(n, r)
         } else {
            let n = this.ownerToIdMap.get(t)
            n !== void 0 &&
               (this.ownerToIdMap.delete(t), this.idToListenerMap.delete(n))
         }
      }
      getListener(t) {
         let r = this.ownerToIdMap.get(t)
         if (r !== void 0) return this.idToListenerMap.get(r)
      }
      installExitEventHook(t) {
         process.once(t, this.exitLikeHook)
      }
      installExitSignalHook(t) {
         process.once(t, async (r) => {
            if ((await this.exitLikeHook(r), process.listenerCount(r) > 0))
               return
            let i = Cp[r] + 128
            process.exit(i)
         })
      }
   }
var je = B('prisma:client:libraryEngine')
function Sp(e) {
   return e.item_type === 'query' && 'query' in e
}
function Ap(e) {
   return 'level' in e ? e.level === 'error' && e.message === 'PANIC' : !1
}
var na = [...ti, 'native'],
   ia = 0,
   Oi = new Zr(),
   rr = class extends Wr {
      constructor(r, n = new Yr(r)) {
         super()
         try {
            this.datamodel = oa.default.readFileSync(r.datamodelPath, 'utf-8')
         } catch (i) {
            throw i.stack.match(/\/\.next|\/next@|\/next\//)
               ? new Q(
                    `Your schema.prisma could not be found, and we detected that you are using Next.js.
Find out why and learn how to fix this: https://pris.ly/d/schema-not-found-nextjs`,
                    r.clientVersion,
                 )
               : r.isBundled === !0
               ? new Q(
                    'Prisma Client could not find its `schema.prisma`. This is likely caused by a bundling step, which leads to `schema.prisma` not being copied near the resulting bundle. We would appreciate if you could take the time to share some information with us.\nPlease help us by answering a few questions: https://pris.ly/bundler-investigation-error',
                    r.clientVersion,
                 )
               : i
         }
         ;(this.config = r),
            (this.libraryStarted = !1),
            (this.logQueries = r.logQueries ?? !1),
            (this.logLevel = r.logLevel ?? 'error'),
            (this.libraryLoader = n),
            (this.logEmitter = r.logEmitter),
            (this.engineProtocol = r.engineProtocol),
            (this.datasourceOverrides = r.datasources
               ? this.convertDatasources(r.datasources)
               : {}),
            r.enableDebugLogs && (this.logLevel = 'debug'),
            (this.libraryInstantiationPromise = this.instantiateLibrary()),
            Oi.install(),
            this.checkForTooManyEngines()
      }
      get beforeExitListener() {
         return Oi.getListener(this)
      }
      set beforeExitListener(r) {
         Oi.setListener(this, r)
      }
      checkForTooManyEngines() {
         ia === 10 &&
            console.warn(
               `${Ae(
                  'warn(prisma-client)',
               )} There are already 10 instances of Prisma Client actively running.`,
            )
      }
      async transaction(r, n, i) {
         await this.start()
         let o = JSON.stringify(n),
            s
         if (r === 'start') {
            let u = JSON.stringify({
               max_wait: i?.maxWait ?? 2e3,
               timeout: i?.timeout ?? 5e3,
               isolation_level: i?.isolationLevel,
            })
            s = await this.engine?.startTransaction(u, o)
         } else
            r === 'commit'
               ? (s = await this.engine?.commitTransaction(i.id, o))
               : r === 'rollback' &&
                 (s = await this.engine?.rollbackTransaction(i.id, o))
         let a = this.parseEngineResponse(s)
         if (a.error_code)
            throw new re(a.message, {
               code: a.error_code,
               clientVersion: this.config.clientVersion,
               meta: a.meta,
            })
         return a
      }
      async instantiateLibrary() {
         if ((je('internalSetup'), this.libraryInstantiationPromise))
            return this.libraryInstantiationPromise
         Wn(),
            (this.platform = await this.getPlatform()),
            await this.loadEngine(),
            this.version()
      }
      async getPlatform() {
         if (this.platform) return this.platform
         let r = await ht()
         if (!na.includes(r))
            throw new Q(
               `Unknown ${R('PRISMA_QUERY_ENGINE_LIBRARY')} ${R(
                  M(r),
               )}. Possible binaryTargets: ${A(
                  na.join(', '),
               )} or a path to the query engine library.
You may have to run ${A('prisma generate')} for your changes to take effect.`,
               this.config.clientVersion,
            )
         return r
      }
      parseEngineResponse(r) {
         if (!r)
            throw new ne('Response from the Engine was empty', {
               clientVersion: this.config.clientVersion,
            })
         try {
            return JSON.parse(r)
         } catch {
            throw new ne('Unable to JSON.parse response from engine', {
               clientVersion: this.config.clientVersion,
            })
         }
      }
      convertDatasources(r) {
         let n = Object.create(null)
         for (let { name: i, url: o } of r) n[i] = o
         return n
      }
      async loadEngine() {
         if (!this.engine) {
            this.QueryEngineConstructor ||
               ((this.library = await this.libraryLoader.loadLibrary()),
               (this.QueryEngineConstructor = this.library.QueryEngine))
            try {
               let r = new WeakRef(this)
               ;(this.engine = new this.QueryEngineConstructor(
                  {
                     datamodel: this.datamodel,
                     env: process.env,
                     logQueries: this.config.logQueries ?? !1,
                     ignoreEnvVarErrors: !0,
                     datasourceOverrides: this.datasourceOverrides,
                     logLevel: this.logLevel,
                     configDir: this.config.cwd,
                     engineProtocol: this.engineProtocol,
                  },
                  (n) => {
                     r.deref()?.logger(n)
                  },
               )),
                  ia++
            } catch (r) {
               let n = r,
                  i = this.parseInitError(n.message)
               throw typeof i == 'string'
                  ? n
                  : new Q(i.message, this.config.clientVersion, i.error_code)
            }
         }
      }
      logger(r) {
         let n = this.parseEngineResponse(r)
         if (!!n) {
            if ('span' in n) {
               this.config.tracingHelper.createEngineSpan(n)
               return
            }
            ;(n.level = n?.level.toLowerCase() ?? 'unknown'),
               Sp(n)
                  ? this.logEmitter.emit('query', {
                       timestamp: new Date(),
                       query: n.query,
                       params: n.params,
                       duration: Number(n.duration_ms),
                       target: n.module_path,
                    })
                  : Ap(n)
                  ? (this.loggerRustPanic = new ge(
                       this.getErrorMessageWithLink(
                          `${n.message}: ${n.reason} in ${n.file}:${n.line}:${n.column}`,
                       ),
                       this.config.clientVersion,
                    ))
                  : this.logEmitter.emit(n.level, {
                       timestamp: new Date(),
                       message: n.message,
                       target: n.module_path,
                    })
         }
      }
      getErrorMessageWithLink(r) {
         return ea({
            platform: this.platform,
            title: r,
            version: this.config.clientVersion,
            engineVersion: this.versionInfo?.commit,
            database: this.config.activeProvider,
            query: this.lastQuery,
         })
      }
      parseInitError(r) {
         try {
            return JSON.parse(r)
         } catch {}
         return r
      }
      parseRequestError(r) {
         try {
            return JSON.parse(r)
         } catch {}
         return r
      }
      on(r, n) {
         r === 'beforeExit'
            ? (this.beforeExitListener = n)
            : this.logEmitter.on(r, n)
      }
      async start() {
         if (
            (await this.libraryInstantiationPromise,
            await this.libraryStoppingPromise,
            this.libraryStartingPromise)
         )
            return (
               je(
                  `library already starting, this.libraryStarted: ${this.libraryStarted}`,
               ),
               this.libraryStartingPromise
            )
         if (this.libraryStarted) return
         let r = async () => {
            je('library starting')
            try {
               let n = {
                  traceparent: this.config.tracingHelper.getTraceParent(),
               }
               await this.engine?.connect(JSON.stringify(n)),
                  (this.libraryStarted = !0),
                  je('library started')
            } catch (n) {
               let i = this.parseInitError(n.message)
               throw typeof i == 'string'
                  ? n
                  : new Q(i.message, this.config.clientVersion, i.error_code)
            } finally {
               this.libraryStartingPromise = void 0
            }
         }
         return (
            (this.libraryStartingPromise =
               this.config.tracingHelper.runInChildSpan('connect', r)),
            this.libraryStartingPromise
         )
      }
      async stop() {
         if (
            (await this.libraryStartingPromise,
            await this.executingQueryPromise,
            this.libraryStoppingPromise)
         )
            return (
               je('library is already stopping'), this.libraryStoppingPromise
            )
         if (!this.libraryStarted) return
         let r = async () => {
            await new Promise((i) => setTimeout(i, 5)), je('library stopping')
            let n = { traceparent: this.config.tracingHelper.getTraceParent() }
            await this.engine?.disconnect(JSON.stringify(n)),
               (this.libraryStarted = !1),
               (this.libraryStoppingPromise = void 0),
               je('library stopped')
         }
         return (
            (this.libraryStoppingPromise =
               this.config.tracingHelper.runInChildSpan('disconnect', r)),
            this.libraryStoppingPromise
         )
      }
      async getDmmf() {
         await this.start()
         let r = this.config.tracingHelper.getTraceParent(),
            n = await this.engine.dmmf(JSON.stringify({ traceparent: r }))
         return this.config.tracingHelper.runInChildSpan(
            { name: 'parseDmmf', internal: !0 },
            () => JSON.parse(n),
         )
      }
      version() {
         return (
            (this.versionInfo = this.library?.version()),
            this.versionInfo?.version ?? 'unknown'
         )
      }
      debugPanic(r) {
         return this.library?.debugPanic(r)
      }
      async request(r, { traceparent: n, interactiveTransaction: i }) {
         je(`sending request, this.libraryStarted: ${this.libraryStarted}`)
         let o = JSON.stringify({ traceparent: n }),
            s = JSON.stringify(r)
         try {
            await this.start(),
               (this.executingQueryPromise = this.engine?.query(s, o, i?.id)),
               (this.lastQuery = s)
            let a = this.parseEngineResponse(await this.executingQueryPromise)
            if (a.errors)
               throw a.errors.length === 1
                  ? this.buildQueryError(a.errors[0])
                  : new ne(JSON.stringify(a.errors), {
                       clientVersion: this.config.clientVersion,
                    })
            if (this.loggerRustPanic) throw this.loggerRustPanic
            return { data: a, elapsed: 0 }
         } catch (a) {
            if (a instanceof Q) throw a
            if (a.code === 'GenericFailure' && a.message?.startsWith('PANIC:'))
               throw new ge(
                  this.getErrorMessageWithLink(a.message),
                  this.config.clientVersion,
               )
            let u = this.parseRequestError(a.message)
            throw typeof u == 'string'
               ? a
               : new ne(
                    `${u.message}
${u.backtrace}`,
                    { clientVersion: this.config.clientVersion },
                 )
         }
      }
      async requestBatch(r, { transaction: n, traceparent: i }) {
         je('requestBatch')
         let o = Hs(r, n)
         await this.start(),
            (this.lastQuery = JSON.stringify(o)),
            (this.executingQueryPromise = this.engine.query(
               this.lastQuery,
               JSON.stringify({ traceparent: i }),
               ta(n),
            ))
         let s = await this.executingQueryPromise,
            a = this.parseEngineResponse(s)
         if (a.errors)
            throw a.errors.length === 1
               ? this.buildQueryError(a.errors[0])
               : new ne(JSON.stringify(a.errors), {
                    clientVersion: this.config.clientVersion,
                 })
         let { batchResult: u, errors: l } = a
         if (Array.isArray(u))
            return u.map((c) =>
               c.errors && c.errors.length > 0
                  ? this.loggerRustPanic ?? this.buildQueryError(c.errors[0])
                  : { data: c, elapsed: 0 },
            )
         throw l && l.length === 1
            ? new Error(l[0].error)
            : new Error(JSON.stringify(a))
      }
      buildQueryError(r) {
         return r.user_facing_error.is_panic
            ? new ge(
                 this.getErrorMessageWithLink(r.user_facing_error.message),
                 this.config.clientVersion,
              )
            : Bs(r, this.config.clientVersion)
      }
      async metrics(r) {
         await this.start()
         let n = await this.engine.metrics(JSON.stringify(r))
         return r.format === 'prometheus' ? n : this.parseEngineResponse(n)
      }
   }
var ot = S(Bt())
var ki = S(Qt())
var $e = class {
   constructor() {
      this._map = new Map()
   }
   get(t) {
      return this._map.get(t)?.value
   }
   set(t, r) {
      this._map.set(t, { value: r })
   }
   getOrCreate(t, r) {
      let n = this._map.get(t)
      if (n) return n.value
      let i = r()
      return this.set(t, i), i
   }
}
function Te(e) {
   return e.replace(/^./, (t) => t.toLowerCase())
}
function aa(e, t, r) {
   let n = Te(r)
   return !t.result || !(t.result.$allModels || t.result[n])
      ? e
      : Op({
           ...e,
           ...sa(t.name, e, t.result.$allModels),
           ...sa(t.name, e, t.result[n]),
        })
}
function Op(e) {
   let t = new $e(),
      r = (n, i) =>
         t.getOrCreate(n, () =>
            i.has(n)
               ? [n]
               : (i.add(n), e[n] ? e[n].needs.flatMap((o) => r(o, i)) : [n]),
         )
   return yt(e, (n) => ({ ...n, needs: r(n.name, new Set()) }))
}
function sa(e, t, r) {
   return r
      ? yt(r, ({ needs: n, compute: i }, o) => ({
           name: o,
           needs: n ? Object.keys(n).filter((s) => n[s]) : [],
           compute: Rp(t, o, i),
        }))
      : {}
}
function Rp(e, t, r) {
   let n = e?.[t]?.compute
   return n ? (i) => r({ ...i, [t]: n(i) }) : r
}
function Xr(e, t) {
   if (!t) return e
   let r = { ...e }
   for (let n of Object.values(t))
      if (!!e[n.name]) for (let i of n.needs) r[i] = !0
   return r
}
var ma = S(Bt())
var fa = S(require('fs'))
var ua = {
   keyword: Be,
   entity: Be,
   value: (e) => M(ut(e)),
   punctuation: ut,
   directive: Be,
   function: Be,
   variable: (e) => M(ut(e)),
   string: (e) => M(A(e)),
   boolean: Ae,
   number: Be,
   comment: gr,
}
var $p = (e) => e,
   en = {},
   Dp = 0,
   F = {
      manual: en.Prism && en.Prism.manual,
      disableWorkerMessageHandler:
         en.Prism && en.Prism.disableWorkerMessageHandler,
      util: {
         encode: function (e) {
            if (e instanceof Fe) {
               let t = e
               return new Fe(t.type, F.util.encode(t.content), t.alias)
            } else
               return Array.isArray(e)
                  ? e.map(F.util.encode)
                  : e
                       .replace(/&/g, '&amp;')
                       .replace(/</g, '&lt;')
                       .replace(/\u00a0/g, ' ')
         },
         type: function (e) {
            return Object.prototype.toString.call(e).slice(8, -1)
         },
         objId: function (e) {
            return (
               e.__id || Object.defineProperty(e, '__id', { value: ++Dp }),
               e.__id
            )
         },
         clone: function e(t, r) {
            let n,
               i,
               o = F.util.type(t)
            switch (((r = r || {}), o)) {
               case 'Object':
                  if (((i = F.util.objId(t)), r[i])) return r[i]
                  ;(n = {}), (r[i] = n)
                  for (let s in t) t.hasOwnProperty(s) && (n[s] = e(t[s], r))
                  return n
               case 'Array':
                  return (
                     (i = F.util.objId(t)),
                     r[i]
                        ? r[i]
                        : ((n = []),
                          (r[i] = n),
                          t.forEach(function (s, a) {
                             n[a] = e(s, r)
                          }),
                          n)
                  )
               default:
                  return t
            }
         },
      },
      languages: {
         extend: function (e, t) {
            let r = F.util.clone(F.languages[e])
            for (let n in t) r[n] = t[n]
            return r
         },
         insertBefore: function (e, t, r, n) {
            n = n || F.languages
            let i = n[e],
               o = {}
            for (let a in i)
               if (i.hasOwnProperty(a)) {
                  if (a == t)
                     for (let u in r) r.hasOwnProperty(u) && (o[u] = r[u])
                  r.hasOwnProperty(a) || (o[a] = i[a])
               }
            let s = n[e]
            return (
               (n[e] = o),
               F.languages.DFS(F.languages, function (a, u) {
                  u === s && a != e && (this[a] = o)
               }),
               o
            )
         },
         DFS: function e(t, r, n, i) {
            i = i || {}
            let o = F.util.objId
            for (let s in t)
               if (t.hasOwnProperty(s)) {
                  r.call(t, s, t[s], n || s)
                  let a = t[s],
                     u = F.util.type(a)
                  u === 'Object' && !i[o(a)]
                     ? ((i[o(a)] = !0), e(a, r, null, i))
                     : u === 'Array' &&
                       !i[o(a)] &&
                       ((i[o(a)] = !0), e(a, r, s, i))
               }
         },
      },
      plugins: {},
      highlight: function (e, t, r) {
         let n = { code: e, grammar: t, language: r }
         return (
            F.hooks.run('before-tokenize', n),
            (n.tokens = F.tokenize(n.code, n.grammar)),
            F.hooks.run('after-tokenize', n),
            Fe.stringify(F.util.encode(n.tokens), n.language)
         )
      },
      matchGrammar: function (e, t, r, n, i, o, s) {
         for (let g in r) {
            if (!r.hasOwnProperty(g) || !r[g]) continue
            if (g == s) return
            let b = r[g]
            b = F.util.type(b) === 'Array' ? b : [b]
            for (let h = 0; h < b.length; ++h) {
               let x = b[h],
                  w = x.inside,
                  E = !!x.lookbehind,
                  C = !!x.greedy,
                  O = 0,
                  q = x.alias
               if (C && !x.pattern.global) {
                  let I = x.pattern.toString().match(/[imuy]*$/)[0]
                  x.pattern = RegExp(x.pattern.source, I + 'g')
               }
               x = x.pattern || x
               for (let I = n, G = i; I < t.length; G += t[I].length, ++I) {
                  let J = t[I]
                  if (t.length > e.length) return
                  if (J instanceof Fe) continue
                  if (C && I != t.length - 1) {
                     x.lastIndex = G
                     var p = x.exec(e)
                     if (!p) break
                     var c = p.index + (E ? p[1].length : 0),
                        f = p.index + p[0].length,
                        a = I,
                        u = G
                     for (
                        let k = t.length;
                        a < k && (u < f || (!t[a].type && !t[a - 1].greedy));
                        ++a
                     )
                        (u += t[a].length), c >= u && (++I, (G = u))
                     if (t[I] instanceof Fe) continue
                     ;(l = a - I), (J = e.slice(G, u)), (p.index -= G)
                  } else {
                     x.lastIndex = 0
                     var p = x.exec(J),
                        l = 1
                  }
                  if (!p) {
                     if (o) break
                     continue
                  }
                  E && (O = p[1] ? p[1].length : 0)
                  var c = p.index + O,
                     p = p[0].slice(O),
                     f = c + p.length,
                     m = J.slice(0, c),
                     d = J.slice(f)
                  let ee = [I, l]
                  m && (++I, (G += m.length), ee.push(m))
                  let at = new Fe(g, w ? F.tokenize(p, w) : p, q, p, C)
                  if (
                     (ee.push(at),
                     d && ee.push(d),
                     Array.prototype.splice.apply(t, ee),
                     l != 1 && F.matchGrammar(e, t, r, I, G, !0, g),
                     o)
                  )
                     break
               }
            }
         }
      },
      tokenize: function (e, t) {
         let r = [e],
            n = t.rest
         if (n) {
            for (let i in n) t[i] = n[i]
            delete t.rest
         }
         return F.matchGrammar(e, r, t, 0, 0, !1), r
      },
      hooks: {
         all: {},
         add: function (e, t) {
            let r = F.hooks.all
            ;(r[e] = r[e] || []), r[e].push(t)
         },
         run: function (e, t) {
            let r = F.hooks.all[e]
            if (!(!r || !r.length)) for (var n = 0, i; (i = r[n++]); ) i(t)
         },
      },
      Token: Fe,
   }
F.languages.clike = {
   comment: [
      { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
      { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
   ],
   string: {
      pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: !0,
   },
   'class-name': {
      pattern:
         /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
      lookbehind: !0,
      inside: { punctuation: /[.\\]/ },
   },
   keyword:
      /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
   boolean: /\b(?:true|false)\b/,
   function: /\w+(?=\()/,
   number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
   operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
   punctuation: /[{}[\];(),.:]/,
}
F.languages.javascript = F.languages.extend('clike', {
   'class-name': [
      F.languages.clike['class-name'],
      {
         pattern:
            /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
         lookbehind: !0,
      },
   ],
   keyword: [
      { pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 },
      {
         pattern:
            /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
         lookbehind: !0,
      },
   ],
   number:
      /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
   function:
      /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
   operator:
      /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/,
})
F.languages.javascript['class-name'][0].pattern =
   /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/
F.languages.insertBefore('javascript', 'keyword', {
   regex: {
      pattern:
         /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*($|[\r\n,.;})\]]))/,
      lookbehind: !0,
      greedy: !0,
   },
   'function-variable': {
      pattern:
         /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
      alias: 'function',
   },
   parameter: [
      {
         pattern:
            /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
         lookbehind: !0,
         inside: F.languages.javascript,
      },
      {
         pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
         inside: F.languages.javascript,
      },
      {
         pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
         lookbehind: !0,
         inside: F.languages.javascript,
      },
      {
         pattern:
            /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
         lookbehind: !0,
         inside: F.languages.javascript,
      },
   ],
   constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
})
F.languages.markup && F.languages.markup.tag.addInlined('script', 'javascript')
F.languages.js = F.languages.javascript
F.languages.typescript = F.languages.extend('javascript', {
   keyword:
      /\b(?:abstract|as|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|var|void|while|with|yield)\b/,
   builtin:
      /\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/,
})
F.languages.ts = F.languages.typescript
function Fe(e, t, r, n, i) {
   ;(this.type = e),
      (this.content = t),
      (this.alias = r),
      (this.length = (n || '').length | 0),
      (this.greedy = !!i)
}
Fe.stringify = function (e, t) {
   return typeof e == 'string'
      ? e
      : Array.isArray(e)
      ? e
           .map(function (r) {
              return Fe.stringify(r, t)
           })
           .join('')
      : Ip(e.type)(e.content)
}
function Ip(e) {
   return ua[e] || $p
}
function la(e) {
   return Np(e, F.languages.javascript)
}
function Np(e, t) {
   return F.tokenize(e, t)
      .map((n) => Fe.stringify(n))
      .join('')
}
var ca = S(Gn())
function pa(e) {
   return (0, ca.default)(e)
}
var Ce = class {
   static read(t) {
      let r
      try {
         r = fa.default.readFileSync(t, 'utf-8')
      } catch {
         return null
      }
      return Ce.fromContent(r)
   }
   static fromContent(t) {
      let r = t.split(/\r?\n/)
      return new Ce(1, r)
   }
   constructor(t, r) {
      ;(this.firstLineNumber = t), (this.lines = r)
   }
   get lastLineNumber() {
      return this.firstLineNumber + this.lines.length - 1
   }
   mapLineAt(t, r) {
      if (
         t < this.firstLineNumber ||
         t > this.lines.length + this.firstLineNumber
      )
         return this
      let n = t - this.firstLineNumber,
         i = [...this.lines]
      return (i[n] = r(i[n])), new Ce(this.firstLineNumber, i)
   }
   mapLines(t) {
      return new Ce(
         this.firstLineNumber,
         this.lines.map((r, n) => t(r, this.firstLineNumber + n)),
      )
   }
   lineAt(t) {
      return this.lines[t - this.firstLineNumber]
   }
   prependSymbolAt(t, r) {
      return this.mapLines((n, i) => (i === t ? `${r} ${n}` : `  ${n}`))
   }
   slice(t, r) {
      let n = this.lines.slice(t - 1, r).join(`
`)
      return new Ce(
         t,
         pa(n).split(`
`),
      )
   }
   highlight() {
      let t = la(this.toString())
      return new Ce(
         this.firstLineNumber,
         t.split(`
`),
      )
   }
   toString() {
      return this.lines.join(`
`)
   }
}
var kp = {
      red: R,
      gray: gr,
      dim: D,
      bold: M,
      underline: le,
      highlightSource: (e) => e.highlight(),
   },
   Lp = {
      red: (e) => e,
      gray: (e) => e,
      dim: (e) => e,
      bold: (e) => e,
      underline: (e) => e,
      highlightSource: (e) => e,
   }
function _p(
   { callsite: e, message: t, originalMethod: r, isPanic: n, callArguments: i },
   o,
) {
   let s = {
      functionName: `prisma.${r}()`,
      message: t,
      isPanic: n ?? !1,
      callArguments: i,
   }
   if (!e || typeof window < 'u' || process.env.NODE_ENV === 'production')
      return s
   let a = e.getLocation()
   if (!a || !a.lineNumber || !a.columnNumber) return s
   let u = Math.max(1, a.lineNumber - 3),
      l = Ce.read(a.fileName)?.slice(u, a.lineNumber),
      c = l?.lineAt(a.lineNumber)
   if (l && c) {
      let p = qp(c),
         f = jp(c)
      if (!f) return s
      ;(s.functionName = `${f.code})`),
         (s.location = a),
         n ||
            (l = l.mapLineAt(a.lineNumber, (d) =>
               d.slice(0, f.openingBraceIndex),
            )),
         (l = o.highlightSource(l))
      let m = String(l.lastLineNumber).length
      if (
         ((s.contextLines = l
            .mapLines((d, g) => o.gray(String(g).padStart(m)) + ' ' + d)
            .mapLines((d) => o.dim(d))
            .prependSymbolAt(a.lineNumber, o.bold(o.red('\u2192')))),
         i)
      ) {
         let d = p + m + 1
         ;(d += 2), (s.callArguments = (0, ma.default)(i, d).slice(d))
      }
   }
   return s
}
function jp(e) {
   let t = Object.keys(xe.ModelAction).join('|'),
      n = new RegExp(String.raw`\.(${t})\(`).exec(e)
   if (n) {
      let i = n.index + n[0].length,
         o = e.lastIndexOf(' ', n.index) + 1
      return { code: e.slice(o, i), openingBraceIndex: i }
   }
   return null
}
function qp(e) {
   let t = 0
   for (let r = 0; r < e.length; r++) {
      if (e.charAt(r) !== ' ') return t
      t++
   }
   return t
}
function Bp(
   {
      functionName: e,
      location: t,
      message: r,
      isPanic: n,
      contextLines: i,
      callArguments: o,
   },
   s,
) {
   let a = [''],
      u = t ? ' in' : ':'
   if (
      (n
         ? (a.push(
              s.red(
                 `Oops, an unknown error occurred! This is ${s.bold(
                    'on us',
                 )}, you did nothing wrong.`,
              ),
           ),
           a.push(
              s.red(`It occurred in the ${s.bold(`\`${e}\``)} invocation${u}`),
           ))
         : a.push(s.red(`Invalid ${s.bold(`\`${e}\``)} invocation${u}`)),
      t && a.push(s.underline(Vp(t))),
      i)
   ) {
      a.push('')
      let l = [i.toString()]
      o && (l.push(o), l.push(s.dim(')'))), a.push(l.join('')), o && a.push('')
   } else a.push(''), o && a.push(o), a.push('')
   return (
      a.push(r),
      a.join(`
`)
   )
}
function Vp(e) {
   let t = [e.fileName]
   return (
      e.lineNumber && t.push(String(e.lineNumber)),
      e.columnNumber && t.push(String(e.columnNumber)),
      t.join(':')
   )
}
function De(e) {
   let t = e.showColors ? kp : Lp,
      r = _p(e, t)
   return Bp(r, t)
}
function ga(e) {
   return e instanceof Buffer || e instanceof Date || e instanceof RegExp
}
function ha(e) {
   if (e instanceof Buffer) {
      let t = Buffer.alloc ? Buffer.alloc(e.length) : new Buffer(e.length)
      return e.copy(t), t
   } else {
      if (e instanceof Date) return new Date(e.getTime())
      if (e instanceof RegExp) return new RegExp(e)
      throw new Error('Unexpected situation')
   }
}
function ya(e) {
   let t = []
   return (
      e.forEach(function (r, n) {
         typeof r == 'object' && r !== null
            ? Array.isArray(r)
               ? (t[n] = ya(r))
               : ga(r)
               ? (t[n] = ha(r))
               : (t[n] = nr({}, r))
            : (t[n] = r)
      }),
      t
   )
}
function da(e, t) {
   return t === '__proto__' ? void 0 : e[t]
}
var nr = function (e, ...t) {
   if (!e || typeof e != 'object') return !1
   if (t.length === 0) return e
   let r, n
   for (let i of t)
      if (!(typeof i != 'object' || i === null || Array.isArray(i))) {
         for (let o of Object.keys(i))
            if (((n = da(e, o)), (r = da(i, o)), r !== e))
               if (typeof r != 'object' || r === null) {
                  e[o] = r
                  continue
               } else if (Array.isArray(r)) {
                  e[o] = ya(r)
                  continue
               } else if (ga(r)) {
                  e[o] = ha(r)
                  continue
               } else if (
                  typeof n != 'object' ||
                  n === null ||
                  Array.isArray(n)
               ) {
                  e[o] = nr({}, r)
                  continue
               } else {
                  e[o] = nr(n, r)
                  continue
               }
      }
   return e
}
var ba = (e) => (Array.isArray(e) ? e : e.split('.')),
   ir = (e, t) => ba(t).reduce((r, n) => r && r[n], e),
   tn = (e, t, r) =>
      ba(t).reduceRight(
         (n, i, o, s) => Object.assign({}, ir(e, s.slice(0, o)), { [i]: n }),
         r,
      )
function wa(e, t) {
   if (!e || typeof e != 'object' || typeof e.hasOwnProperty != 'function')
      return e
   let r = {}
   for (let n in e) {
      let i = e[n]
      Object.hasOwnProperty.call(e, n) && t(n, i) && (r[n] = i)
   }
   return r
}
var Up = {
   '[object Date]': !0,
   '[object Uint8Array]': !0,
   '[object Decimal]': !0,
}
function xa(e) {
   return e
      ? typeof e == 'object' && !Up[Object.prototype.toString.call(e)]
      : !1
}
function Ea(e, t) {
   let r = {},
      n = Array.isArray(t) ? t : [t]
   for (let i in e)
      Object.hasOwnProperty.call(e, i) && !n.includes(i) && (r[i] = e[i])
   return r
}
var Di = S(Qt())
var Qp = va(),
   Gp = Ma(),
   Jp = Fa().default,
   Kp = (e, t, r) => {
      let n = []
      return (function i(o, s = {}, a = '', u = []) {
         s.indent = s.indent || '	'
         let l
         s.inlineCharacterLimit === void 0
            ? (l = {
                 newLine: `
`,
                 newLineOrSpace: `
`,
                 pad: a,
                 indent: a + s.indent,
              })
            : (l = {
                 newLine: '@@__STRINGIFY_OBJECT_NEW_LINE__@@',
                 newLineOrSpace: '@@__STRINGIFY_OBJECT_NEW_LINE_OR_SPACE__@@',
                 pad: '@@__STRINGIFY_OBJECT_PAD__@@',
                 indent: '@@__STRINGIFY_OBJECT_INDENT__@@',
              })
         let c = (p) => {
            if (s.inlineCharacterLimit === void 0) return p
            let f = p
               .replace(new RegExp(l.newLine, 'g'), '')
               .replace(new RegExp(l.newLineOrSpace, 'g'), ' ')
               .replace(new RegExp(l.pad + '|' + l.indent, 'g'), '')
            return f.length <= s.inlineCharacterLimit
               ? f
               : p
                    .replace(
                       new RegExp(l.newLine + '|' + l.newLineOrSpace, 'g'),
                       `
`,
                    )
                    .replace(new RegExp(l.pad, 'g'), a)
                    .replace(new RegExp(l.indent, 'g'), a + s.indent)
         }
         if (n.indexOf(o) !== -1) return '"[Circular]"'
         if (Buffer.isBuffer(o)) return `Buffer(${Buffer.length})`
         if (
            o == null ||
            typeof o == 'number' ||
            typeof o == 'boolean' ||
            typeof o == 'function' ||
            typeof o == 'symbol' ||
            o instanceof oe ||
            Qp(o)
         )
            return String(o)
         if (ye(o))
            return `new Date('${Re(o) ? o.toISOString() : 'Invalid Date'}')`
         if (o instanceof Ee)
            return `prisma.${Ft(o.modelName)}.fields.${o.name}`
         if (Array.isArray(o)) {
            if (o.length === 0) return '[]'
            n.push(o)
            let p =
               '[' +
               l.newLine +
               o
                  .map((f, m) => {
                     let d =
                           o.length - 1 === m
                              ? l.newLine
                              : ',' + l.newLineOrSpace,
                        g = i(f, s, a + s.indent, [...u, m])
                     s.transformValue && (g = s.transformValue(o, m, g))
                     let b = l.indent + g + d
                     return (
                        s.transformLine &&
                           (b = s.transformLine({
                              obj: o,
                              indent: l.indent,
                              key: m,
                              stringifiedValue: g,
                              value: o[m],
                              eol: d,
                              originalLine: b,
                              path: u.concat(m),
                           })),
                        b
                     )
                  })
                  .join('') +
               l.pad +
               ']'
            return n.pop(), c(p)
         }
         if (Gp(o)) {
            let p = Object.keys(o).concat(Jp(o))
            if (
               (s.filter && (p = p.filter((m) => s.filter(o, m))),
               p.length === 0)
            )
               return '{}'
            n.push(o)
            let f =
               '{' +
               l.newLine +
               p
                  .map((m, d) => {
                     let g =
                           p.length - 1 === d
                              ? l.newLine
                              : ',' + l.newLineOrSpace,
                        b = typeof m == 'symbol',
                        h = !b && /^[a-z$_][a-z$_0-9]*$/i.test(m),
                        x = b || h ? m : i(m, s, void 0, [...u, m]),
                        w = i(o[m], s, a + s.indent, [...u, m])
                     s.transformValue && (w = s.transformValue(o, m, w))
                     let E = l.indent + String(x) + ': ' + w + g
                     return (
                        s.transformLine &&
                           (E = s.transformLine({
                              obj: o,
                              indent: l.indent,
                              key: x,
                              stringifiedValue: w,
                              value: o[m],
                              eol: g,
                              originalLine: E,
                              path: u.concat(x),
                           })),
                        E
                     )
                  })
                  .join('') +
               l.pad +
               '}'
            return n.pop(), c(f)
         }
         return (
            (o = String(o).replace(/[\r\n]/g, (p) =>
               p ===
               `
`
                  ? '\\n'
                  : '\\r',
            )),
            s.singleQuotes === !1
               ? ((o = o.replace(/"/g, '\\"')), `"${o}"`)
               : ((o = o.replace(/\\?'/g, "\\'")), `'${o}'`)
         )
      })(e, t, r)
   },
   or = Kp
var $i = '@@__DIM_POINTER__@@'
function rn({ ast: e, keyPaths: t, valuePaths: r, missingItems: n }) {
   let i = e
   for (let { path: o, type: s } of n) i = tn(i, o, s)
   return or(i, {
      indent: '  ',
      transformLine: ({
         indent: o,
         key: s,
         value: a,
         stringifiedValue: u,
         eol: l,
         path: c,
      }) => {
         let p = c.join('.'),
            f = t.includes(p),
            m = r.includes(p),
            d = n.find((b) => b.path === p),
            g = u
         if (d) {
            typeof a == 'string' && (g = g.slice(1, g.length - 1))
            let b = d.isRequired ? '' : '?',
               h = d.isRequired ? '+' : '?',
               w = (d.isRequired ? (E) => M(A(E)) : A)(
                  zp(s + b + ': ' + g + l, o, h),
               )
            return d.isRequired || (w = D(w)), w
         } else {
            let b = n.some((E) => p.startsWith(E.path)),
               h = s[s.length - 2] === '?'
            h && (s = s.slice(1, s.length - 1)),
               h &&
                  typeof a == 'object' &&
                  a !== null &&
                  (g = g
                     .split(
                        `
`,
                     )
                     .map((E, C, O) => (C === O.length - 1 ? E + $i : E)).join(`
`)),
               b &&
                  typeof a == 'string' &&
                  ((g = g.slice(1, g.length - 1)), h || (g = M(g))),
               (typeof a != 'object' || a === null) && !m && !b && (g = D(g))
            let x = ''
            typeof s == 'string' && (x = (f ? R(s) : s) + ': '),
               (g = m ? R(g) : g)
            let w = o + x + g + (b ? l : D(l))
            if (f || m) {
               let E = w.split(`
`),
                  C = String(s).length,
                  O = f ? R('~'.repeat(C)) : ' '.repeat(C),
                  q = m ? Wp(o, s, a, u) : 0,
                  I = m && Ca(a),
                  G = m ? '  ' + R('~'.repeat(q)) : ''
               O && O.length > 0 && !I && E.splice(1, 0, o + O + G),
                  O &&
                     O.length > 0 &&
                     I &&
                     E.splice(E.length - 1, 0, o.slice(0, o.length - 2) + G),
                  (w = E.join(`
`))
            }
            return w
         }
      },
   })
}
function Wp(e, t, r, n) {
   return r === null
      ? 4
      : typeof r == 'string'
      ? r.length + 2
      : Array.isArray(r) && r.length == 0
      ? 2
      : Ca(r)
      ? Math.abs(Hp(`${t}: ${(0, Di.default)(n)}`) - e.length)
      : ye(r)
      ? Re(r)
         ? `new Date('${r.toISOString()}')`.length
         : 24
      : String(r).length
}
function Ca(e) {
   return typeof e == 'object' && e !== null && !(e instanceof oe) && !ye(e)
}
function Hp(e) {
   return e
      .split(
         `
`,
      )
      .reduce((t, r) => (r.length > t ? r.length : t), 0)
}
function zp(e, t, r) {
   return e
      .split(
         `
`,
      )
      .map((n, i, o) =>
         i === 0 ? r + t.slice(1) + n : i < o.length - 1 ? r + n.slice(1) : n,
      )
      .map((n) =>
         (0, Di.default)(n).includes($i)
            ? D(n.replace($i, ''))
            : n.includes('?')
            ? D(n)
            : n,
      ).join(`
`)
}
var sr = 2,
   Li = class {
      constructor(t, r) {
         this.type = t
         this.children = r
         this.printFieldError = ({ error: t }, r, n) => {
            if (t.type === 'emptySelect') {
               let i = n
                  ? ''
                  : ` Available options are listed in ${D(A('green'))}.`
               return `The ${R('`select`')} statement for type ${M(
                  er(t.field.outputType.type),
               )} must not be empty.${i}`
            }
            if (t.type === 'emptyInclude') {
               if (r.length === 0)
                  return `${M(
                     er(t.field.outputType.type),
                  )} does not have any relation and therefore can't have an ${R(
                     '`include`',
                  )} statement.`
               let i = n
                  ? ''
                  : ` Available options are listed in ${D(A('green'))}.`
               return `The ${R('`include`')} statement for type ${R(
                  er(t.field.outputType.type),
               )} must not be empty.${i}`
            }
            if (t.type === 'noTrueSelect')
               return `The ${R('`select`')} statement for type ${R(
                  er(t.field.outputType.type),
               )} needs ${R('at least one truthy value')}.`
            if (t.type === 'includeAndSelect')
               return `Please ${M('either')} use ${A('`include`')} or ${A(
                  '`select`',
               )}, but ${R('not both')} at the same time.`
            if (t.type === 'invalidFieldName') {
               let i = t.isInclude ? 'include' : 'select',
                  o = t.isIncludeScalar ? 'Invalid scalar' : 'Unknown',
                  s = n
                     ? ''
                     : t.isInclude && r.length === 0
                     ? `
This model has no relations, so you can't use ${R('include')} with it.`
                     : ` Available options are listed in ${D(A('green'))}.`,
                  a = `${o} field ${R(`\`${t.providedName}\``)} for ${R(
                     i,
                  )} statement on model ${M(Dt(t.modelName))}.${s}`
               return (
                  t.didYouMean &&
                     (a += ` Did you mean ${A(`\`${t.didYouMean}\``)}?`),
                  t.isIncludeScalar &&
                     (a += `
Note, that ${M('include')} statements only accept relation fields.`),
                  a
               )
            }
            if (t.type === 'invalidFieldType')
               return `Invalid value ${R(`${or(t.providedValue)}`)} of type ${R(
                  Pt(t.providedValue, void 0),
               )} for field ${M(`${t.fieldName}`)} on model ${M(
                  Dt(t.modelName),
               )}. Expected either ${A('true')} or ${A('false')}.`
         }
         this.printArgError = ({ error: t, path: r }, n, i) => {
            if (t.type === 'invalidName') {
               let o = `Unknown arg ${R(`\`${t.providedName}\``)} in ${M(
                  r.join('.'),
               )} for type ${M(
                  t.outputType ? t.outputType.name : Zt(t.originalType),
               )}.`
               return (
                  t.didYouMeanField
                     ? (o += `
\u2192 Did you forget to wrap it with \`${A('select')}\`? ${D(
                          'e.g. ' +
                             A(
                                `{ select: { ${t.providedName}: ${t.providedValue} } }`,
                             ),
                       )}`)
                     : t.didYouMeanArg
                     ? ((o += ` Did you mean \`${A(t.didYouMeanArg)}\`?`),
                       !n &&
                          !i &&
                          (o +=
                             ` ${D('Available args:')}
` + Mt(t.originalType, !0)))
                     : t.originalType.fields.length === 0
                     ? (o += ` The field ${M(
                          t.originalType.name,
                       )} has no arguments.`)
                     : !n &&
                       !i &&
                       (o +=
                          ` Available args:

` + Mt(t.originalType, !0)),
                  o
               )
            }
            if (t.type === 'invalidType') {
               let o = or(t.providedValue, { indent: '  ' }),
                  s =
                     o.split(`
`).length > 1
               if (
                  (s &&
                     (o = `
${o}
`),
                  t.requiredType.bestFittingType.location === 'enumTypes')
               )
                  return `Argument ${M(t.argName)}: Provided value ${R(o)}${
                     s ? '' : ' '
                  }of type ${R(Pt(t.providedValue))} on ${M(
                     `prisma.${this.children[0].name}`,
                  )} is not a ${A(
                     Xt(
                        vt(t.requiredType.bestFittingType.type),
                        t.requiredType.bestFittingType.isList,
                     ),
                  )}.
\u2192 Possible values: ${t.requiredType.bestFittingType.type.values
                     .map((c) =>
                        A(`${vt(t.requiredType.bestFittingType.type)}.${c}`),
                     )
                     .join(', ')}`
               let a = '.'
               Ct(t.requiredType.bestFittingType.type) &&
                  (a =
                     `:
` + Mt(t.requiredType.bestFittingType.type))
               let u = `${t.requiredType.inputType
                     .map((c) =>
                        A(
                           Xt(
                              vt(c.type),
                              t.requiredType.bestFittingType.isList,
                           ),
                        ),
                     )
                     .join(' or ')}${a}`,
                  l =
                     (t.requiredType.inputType.length === 2 &&
                        t.requiredType.inputType.find((c) => Ct(c.type))) ||
                     null
               return (
                  l &&
                     (u +=
                        `
` + Mt(l.type, !0)),
                  `Argument ${M(t.argName)}: Got invalid value ${R(o)}${
                     s ? '' : ' '
                  }on ${M(`prisma.${this.children[0].name}`)}. Provided ${R(
                     Pt(t.providedValue),
                  )}, expected ${u}`
               )
            }
            if (t.type === 'invalidNullArg') {
               let o =
                     r.length === 1 && r[0] === t.name
                        ? ''
                        : ` for ${M(`${r.join('.')}`)}`,
                  s = ` Please use ${M(A('undefined'))} instead.`
               return `Argument ${A(t.name)}${o} must not be ${M('null')}.${s}`
            }
            if (t.type === 'invalidDateArg') {
               let o =
                  r.length === 1 && r[0] === t.argName
                     ? ''
                     : ` for ${M(`${r.join('.')}`)}`
               return `Argument ${A(t.argName)}${o} is not a valid Date object.`
            }
            if (t.type === 'missingArg') {
               let o =
                  r.length === 1 && r[0] === t.missingName
                     ? ''
                     : ` for ${M(`${r.join('.')}`)}`
               return `Argument ${A(t.missingName)}${o} is missing.`
            }
            if (t.type === 'atLeastOne') {
               let o = i
                     ? ''
                     : ` Available args are listed in ${D(A('green'))}.`,
                  s = t.atLeastFields
                     ? ` and at least one argument for ${t.atLeastFields
                          .map((a) => M(a))
                          .join(', or ')}`
                     : ''
               return `Argument ${M(r.join('.'))} of type ${M(
                  t.inputType.name,
               )} needs ${A('at least one')} argument${M(s)}.${o}`
            }
            if (t.type === 'atMostOne') {
               let o = i
                  ? ''
                  : ` Please choose one. ${D('Available args:')} 
${Mt(t.inputType, !0)}`
               return `Argument ${M(r.join('.'))} of type ${M(
                  t.inputType.name,
               )} needs ${A(
                  'exactly one',
               )} argument, but you provided ${t.providedKeys
                  .map((s) => R(s))
                  .join(' and ')}.${o}`
            }
         }
         ;(this.type = t), (this.children = r)
      }
      get [Symbol.toStringTag]() {
         return 'Document'
      }
      toString() {
         return `${this.type} {
${(0, ot.default)(
   this.children.map(String).join(`
`),
   sr,
)}
}`
      }
      validate(t, r = !1, n, i, o) {
         t || (t = {})
         let s = this.children.filter(
            (h) => h.hasInvalidChild || h.hasInvalidArg,
         )
         if (s.length === 0) return
         let a = [],
            u = [],
            l = t && t.select ? 'select' : t.include ? 'include' : void 0
         for (let h of s) {
            let x = h.collectErrors(l)
            a.push(
               ...x.fieldErrors.map((w) => ({
                  ...w,
                  path: r ? w.path : w.path.slice(1),
               })),
            ),
               u.push(
                  ...x.argErrors.map((w) => ({
                     ...w,
                     path: r ? w.path : w.path.slice(1),
                  })),
               )
         }
         let c = this.children[0].name,
            p = r ? this.type : c,
            f = [],
            m = [],
            d = []
         for (let h of a) {
            let x = this.normalizePath(h.path, t).join('.')
            if (h.error.type === 'invalidFieldName') {
               f.push(x)
               let w = h.error.outputType,
                  { isInclude: E } = h.error
               w.fields
                  .filter((C) =>
                     E ? C.outputType.location === 'outputObjectTypes' : !0,
                  )
                  .forEach((C) => {
                     let O = x.split('.')
                     d.push({
                        path: `${O.slice(0, O.length - 1).join('.')}.${C.name}`,
                        type: 'true',
                        isRequired: !1,
                     })
                  })
            } else
               h.error.type === 'includeAndSelect'
                  ? (f.push('select'), f.push('include'))
                  : m.push(x)
            if (
               h.error.type === 'emptySelect' ||
               h.error.type === 'noTrueSelect' ||
               h.error.type === 'emptyInclude'
            ) {
               let w = this.normalizePath(h.path, t),
                  E = w.slice(0, w.length - 1).join('.')
               h.error.field.outputType.type.fields
                  ?.filter((O) =>
                     h.error.type === 'emptyInclude'
                        ? O.outputType.location === 'outputObjectTypes'
                        : !0,
                  )
                  .forEach((O) => {
                     d.push({
                        path: `${E}.${O.name}`,
                        type: 'true',
                        isRequired: !1,
                     })
                  })
            }
         }
         for (let h of u) {
            let x = this.normalizePath(h.path, t).join('.')
            if (h.error.type === 'invalidName') f.push(x)
            else if (
               h.error.type !== 'missingArg' &&
               h.error.type !== 'atLeastOne'
            )
               m.push(x)
            else if (h.error.type === 'missingArg') {
               let w =
                  h.error.missingArg.inputTypes.length === 1
                     ? h.error.missingArg.inputTypes[0].type
                     : h.error.missingArg.inputTypes
                          .map((E) => {
                             let C = Zt(E.type)
                             return C === 'Null'
                                ? 'null'
                                : E.isList
                                ? C + '[]'
                                : C
                          })
                          .join(' | ')
               d.push({
                  path: x,
                  type: Pi(w, !0, x.split('where.').length === 2),
                  isRequired: h.error.missingArg.isRequired,
               })
            }
         }
         let g = (h) => {
               let x = u.some(
                     (J) =>
                        J.error.type === 'missingArg' &&
                        J.error.missingArg.isRequired,
                  ),
                  w = Boolean(
                     u.find(
                        (J) =>
                           J.error.type === 'missingArg' &&
                           !J.error.missingArg.isRequired,
                     ),
                  ),
                  E = w || x,
                  C = ''
               x &&
                  (C += `
${D('Note: Lines with ')}${A('+')} ${D('are required')}`),
                  w &&
                     (C.length === 0 &&
                        (C = `
`),
                     x
                        ? (C += D(`, lines with ${A('?')} are optional`))
                        : (C += D(`Note: Lines with ${A('?')} are optional`)),
                     (C += D('.')))
               let q = u
                  .filter(
                     (J) =>
                        J.error.type !== 'missingArg' ||
                        J.error.missingArg.isRequired,
                  )
                  .map((J) => this.printArgError(J, E, i === 'minimal')).join(`
`)
               if (
                  ((q += `
${a.map((J) => this.printFieldError(J, d, i === 'minimal')).join(`
`)}`),
                  i === 'minimal')
               )
                  return (0, ki.default)(q)
               let I = {
                  ast: r ? { [c]: t } : t,
                  keyPaths: f,
                  valuePaths: m,
                  missingItems: d,
               }
               n?.endsWith('aggregate') && (I = uf(I))
               let G = De({
                  callsite: h,
                  originalMethod: n || p,
                  showColors: i && i === 'pretty',
                  callArguments: rn(I),
                  message: `${q}${C}
`,
               })
               return process.env.NO_COLOR || i === 'colorless'
                  ? (0, ki.default)(G)
                  : G
            },
            b = new K(g(o))
         throw (
            (process.env.NODE_ENV !== 'production' &&
               Object.defineProperty(b, 'render', {
                  get: () => g,
                  enumerable: !1,
               }),
            b)
         )
      }
      normalizePath(t, r) {
         let n = t.slice(),
            i = [],
            o,
            s = r
         for (; (o = n.shift()) !== void 0; )
            (!Array.isArray(s) && o === 0) ||
               (o === 'select'
                  ? s[o]
                     ? (s = s[o])
                     : (s = s.include)
                  : s && s[o] && (s = s[o]),
               i.push(o))
         return i
      }
   },
   K = class extends Error {
      get [Symbol.toStringTag]() {
         return 'PrismaClientValidationError'
      }
   }
fe(K, 'PrismaClientValidationError')
var H = class extends Error {
   constructor(t) {
      super(
         t +
            `
Read more at https://pris.ly/d/client-constructor`,
      ),
         (this.name = 'PrismaClientConstructorValidationError')
   }
   get [Symbol.toStringTag]() {
      return 'PrismaClientConstructorValidationError'
   }
}
fe(H, 'PrismaClientConstructorValidationError')
var ce = class {
      constructor({ name: t, args: r, children: n, error: i, schemaField: o }) {
         ;(this.name = t),
            (this.args = r),
            (this.children = n),
            (this.error = i),
            (this.schemaField = o),
            (this.hasInvalidChild = n
               ? n.some((s) =>
                    Boolean(s.error || s.hasInvalidArg || s.hasInvalidChild),
                 )
               : !1),
            (this.hasInvalidArg = r ? r.hasInvalidArg : !1)
      }
      get [Symbol.toStringTag]() {
         return 'Field'
      }
      toString() {
         let t = this.name
         return this.error
            ? t + ' # INVALID_FIELD'
            : (this.args &&
                 this.args.args &&
                 this.args.args.length > 0 &&
                 (this.args.args.length === 1
                    ? (t += `(${this.args.toString()})`)
                    : (t += `(
${(0, ot.default)(this.args.toString(), sr)}
)`)),
              this.children &&
                 (t += ` {
${(0, ot.default)(
   this.children.map(String).join(`
`),
   sr,
)}
}`),
              t)
      }
      collectErrors(t = 'select') {
         let r = [],
            n = []
         if (
            (this.error && r.push({ path: [this.name], error: this.error }),
            this.children)
         )
            for (let i of this.children) {
               let o = i.collectErrors(t)
               r.push(
                  ...o.fieldErrors.map((s) => ({
                     ...s,
                     path: [this.name, t, ...s.path],
                  })),
               ),
                  n.push(
                     ...o.argErrors.map((s) => ({
                        ...s,
                        path: [this.name, t, ...s.path],
                     })),
                  )
            }
         return (
            this.args &&
               n.push(
                  ...this.args
                     .collectErrors()
                     .map((i) => ({ ...i, path: [this.name, ...i.path] })),
               ),
            { fieldErrors: r, argErrors: n }
         )
      }
   },
   ae = class {
      constructor(t = []) {
         ;(this.args = t),
            (this.hasInvalidArg = t ? t.some((r) => Boolean(r.hasError)) : !1)
      }
      get [Symbol.toStringTag]() {
         return 'Args'
      }
      toString() {
         return this.args.length === 0
            ? ''
            : `${this.args.map((t) => t.toString()).filter((t) => t).join(`
`)}`
      }
      collectErrors() {
         return this.hasInvalidArg
            ? this.args.flatMap((t) => t.collectErrors())
            : []
      }
   }
function Ii(e, t) {
   return Buffer.isBuffer(e)
      ? JSON.stringify(e.toString('base64'))
      : e instanceof Ee
      ? `{ _ref: ${JSON.stringify(e.name)}}`
      : Object.prototype.toString.call(e) === '[object BigInt]'
      ? e.toString()
      : typeof t?.type == 'string' && t.type === 'Json'
      ? e === null
         ? 'null'
         : e && e.values && e.__prismaRawParameters__
         ? JSON.stringify(e.values)
         : t?.isList && Array.isArray(e)
         ? JSON.stringify(e.map((r) => JSON.stringify(r)))
         : JSON.stringify(JSON.stringify(e))
      : e === void 0
      ? null
      : e === null
      ? 'null'
      : he.isDecimal(e) || (t?.type === 'Decimal' && Ke(e))
      ? JSON.stringify(e.toFixed())
      : t?.location === 'enumTypes' && typeof e == 'string'
      ? Array.isArray(e)
         ? `[${e.join(', ')}]`
         : e
      : typeof e == 'number' && t?.type === 'Float'
      ? e.toExponential()
      : JSON.stringify(e, null, 2)
}
var ue = class {
   constructor({
      key: t,
      value: r,
      isEnum: n = !1,
      error: i,
      schemaArg: o,
      inputType: s,
   }) {
      ;(this.inputType = s),
         (this.key = t),
         (this.value = r instanceof oe ? r._getName() : r),
         (this.isEnum = n),
         (this.error = i),
         (this.schemaArg = o),
         (this.isNullable =
            o?.inputTypes.reduce((a) => a && o.isNullable, !0) || !1),
         (this.hasError =
            Boolean(i) ||
            (r instanceof ae ? r.hasInvalidArg : !1) ||
            (Array.isArray(r) &&
               r.some((a) =>
                  a instanceof ae
                     ? a.hasInvalidArg
                     : a instanceof ue
                     ? a.hasError
                     : !1,
               )))
   }
   get [Symbol.toStringTag]() {
      return 'Arg'
   }
   _toString(t, r) {
      let n = this.stringifyValue(t)
      if (!(typeof n > 'u')) return `${r}: ${n}`
   }
   stringifyValue(t) {
      if (!(typeof t > 'u')) {
         if (t instanceof ae)
            return `{
${(0, ot.default)(t.toString(), 2)}
}`
         if (Array.isArray(t)) {
            if (this.inputType?.type === 'Json') return Ii(t, this.inputType)
            let r = !t.some((n) => typeof n == 'object')
            return `[${
               r
                  ? ''
                  : `
`
            }${(0, ot.default)(
               t
                  .map((n) =>
                     n instanceof ae
                        ? `{
${(0, ot.default)(n.toString(), sr)}
}`
                        : n instanceof ue
                        ? n.stringifyValue(n.value)
                        : Ii(n, this.inputType),
                  )
                  .join(
                     `,${
                        r
                           ? ' '
                           : `
`
                     }`,
                  ),
               r ? 0 : sr,
            )}${
               r
                  ? ''
                  : `
`
            }]`
         }
         return Ii(t, this.inputType)
      }
   }
   toString() {
      return this._toString(this.value, this.key)
   }
   collectErrors() {
      if (!this.hasError) return []
      let t = []
      if (this.error) {
         let r =
            typeof this.inputType?.type == 'object'
               ? `${this.inputType.type.name}${
                    this.inputType.isList ? '[]' : ''
                 }`
               : void 0
         t.push({ error: this.error, path: [this.key], id: r })
      }
      return Array.isArray(this.value)
         ? t.concat(
              this.value.flatMap((r, n) =>
                 r instanceof ae
                    ? r
                         .collectErrors()
                         .map((i) => ({
                            ...i,
                            path: [this.key, String(n), ...i.path],
                         }))
                    : r instanceof ue
                    ? r
                         .collectErrors()
                         .map((i) => ({ ...i, path: [this.key, ...i.path] }))
                    : [],
              ),
           )
         : this.value instanceof ae
         ? t.concat(
              this.value
                 .collectErrors()
                 .map((r) => ({ ...r, path: [this.key, ...r.path] })),
           )
         : t
   }
}
function sn({
   dmmf: e,
   rootTypeName: t,
   rootField: r,
   select: n,
   modelName: i,
   extensions: o,
}) {
   n || (n = {})
   let s = t === 'query' ? e.queryType : e.mutationType,
      a = {
         args: [],
         outputType: { isList: !1, type: s, location: 'outputObjectTypes' },
         name: t,
      },
      u = { modelName: i },
      l = Oa({
         dmmf: e,
         selection: { [r]: n },
         schemaField: a,
         path: [t],
         context: u,
         extensions: o,
      })
   return new Li(t, l)
}
function Aa(e) {
   return e
}
function Oa({
   dmmf: e,
   selection: t,
   schemaField: r,
   path: n,
   context: i,
   extensions: o,
}) {
   let s = r.outputType.type,
      a = i.modelName ? o.getAllComputedFields(i.modelName) : {}
   return (
      (t = Xr(t, a)),
      Object.entries(t).reduce((u, [l, c]) => {
         let p = s.fieldMap ? s.fieldMap[l] : s.fields.find((w) => w.name === l)
         if (!p)
            return (
               a?.[l] ||
                  u.push(
                     new ce({
                        name: l,
                        children: [],
                        error: {
                           type: 'invalidFieldName',
                           modelName: s.name,
                           providedName: l,
                           didYouMean: Qr(
                              l,
                              s.fields
                                 .map((w) => w.name)
                                 .concat(Object.keys(a ?? {})),
                           ),
                           outputType: s,
                        },
                     }),
                  ),
               u
            )
         if (
            p.outputType.location === 'scalar' &&
            p.args.length === 0 &&
            typeof c != 'boolean'
         )
            return (
               u.push(
                  new ce({
                     name: l,
                     children: [],
                     error: {
                        type: 'invalidFieldType',
                        modelName: s.name,
                        fieldName: l,
                        providedValue: c,
                     },
                  }),
               ),
               u
            )
         if (c === !1) return u
         let f = {
               name: p.name,
               fields: p.args,
               constraints: { minNumFields: null, maxNumFields: null },
            },
            m = typeof c == 'object' ? Ea(c, ['include', 'select']) : void 0,
            d = m
               ? on(
                    m,
                    f,
                    i,
                    [],
                    typeof p == 'string' ? void 0 : p.outputType.type,
                 )
               : void 0,
            g = p.outputType.location === 'outputObjectTypes'
         if (c) {
            if (c.select && c.include)
               u.push(
                  new ce({
                     name: l,
                     children: [
                        new ce({
                           name: 'include',
                           args: new ae(),
                           error: { type: 'includeAndSelect', field: p },
                        }),
                     ],
                  }),
               )
            else if (c.include) {
               let w = Object.keys(c.include)
               if (w.length === 0)
                  return (
                     u.push(
                        new ce({
                           name: l,
                           children: [
                              new ce({
                                 name: 'include',
                                 args: new ae(),
                                 error: { type: 'emptyInclude', field: p },
                              }),
                           ],
                        }),
                     ),
                     u
                  )
               if (p.outputType.location === 'outputObjectTypes') {
                  let E = p.outputType.type,
                     C = E.fields
                        .filter(
                           (q) => q.outputType.location === 'outputObjectTypes',
                        )
                        .map((q) => q.name),
                     O = w.filter((q) => !C.includes(q))
                  if (O.length > 0)
                     return (
                        u.push(
                           ...O.map(
                              (q) =>
                                 new ce({
                                    name: q,
                                    children: [
                                       new ce({
                                          name: q,
                                          args: new ae(),
                                          error: {
                                             type: 'invalidFieldName',
                                             modelName: E.name,
                                             outputType: E,
                                             providedName: q,
                                             didYouMean: Qr(q, C) || void 0,
                                             isInclude: !0,
                                             isIncludeScalar: E.fields.some(
                                                (I) => I.name === q,
                                             ),
                                          },
                                       }),
                                    ],
                                 }),
                           ),
                        ),
                        u
                     )
               }
            } else if (c.select) {
               let w = Object.values(c.select)
               if (w.length === 0)
                  return (
                     u.push(
                        new ce({
                           name: l,
                           children: [
                              new ce({
                                 name: 'select',
                                 args: new ae(),
                                 error: { type: 'emptySelect', field: p },
                              }),
                           ],
                        }),
                     ),
                     u
                  )
               if (w.filter((C) => C).length === 0)
                  return (
                     u.push(
                        new ce({
                           name: l,
                           children: [
                              new ce({
                                 name: 'select',
                                 args: new ae(),
                                 error: { type: 'noTrueSelect', field: p },
                              }),
                           ],
                        }),
                     ),
                     u
                  )
            }
         }
         let b = g ? Zp(e, p.outputType.type) : null,
            h = b
         c &&
            (c.select
               ? (h = c.select)
               : c.include
               ? (h = nr(b, c.include))
               : c.by &&
                 Array.isArray(c.by) &&
                 p.outputType.namespace === 'prisma' &&
                 p.outputType.location === 'outputObjectTypes' &&
                 ks(p.outputType.type.name) &&
                 (h = Yp(c.by)))
         let x
         if (h !== !1 && g) {
            let w = i.modelName
            typeof p.outputType.type == 'object' &&
               p.outputType.namespace === 'model' &&
               p.outputType.location === 'outputObjectTypes' &&
               (w = p.outputType.type.name),
               (x = Oa({
                  dmmf: e,
                  selection: h,
                  schemaField: p,
                  path: [...n, l],
                  context: { modelName: w },
                  extensions: o,
               }))
         }
         return (
            u.push(new ce({ name: l, args: d, children: x, schemaField: p })), u
         )
      }, [])
   )
}
function Yp(e) {
   let t = Object.create(null)
   for (let r of e) t[r] = !0
   return t
}
function Zp(e, t) {
   let r = Object.create(null)
   for (let n of t.fields)
      e.typeMap[n.outputType.type.name] !== void 0 && (r[n.name] = !0),
         (n.outputType.location === 'scalar' ||
            n.outputType.location === 'enumTypes') &&
            (r[n.name] = !0)
   return r
}
function _i(e, t, r, n) {
   return new ue({
      key: e,
      value: t,
      isEnum: n.location === 'enumTypes',
      inputType: n,
      error: {
         type: 'invalidType',
         providedValue: t,
         argName: e,
         requiredType: { inputType: r.inputTypes, bestFittingType: n },
      },
   })
}
function Ra(e, t, r) {
   let { isList: n } = t,
      i = Xp(t, r),
      o = Pt(e, t)
   return o === i ||
      (n && o === 'List<>') ||
      (i === 'Json' &&
         o !== 'Symbol' &&
         !(e instanceof oe) &&
         !(e instanceof Ee)) ||
      (o === 'Int' && i === 'BigInt') ||
      ((o === 'Int' || o === 'Float') && i === 'Decimal') ||
      (o === 'DateTime' && i === 'String') ||
      (o === 'UUID' && i === 'String') ||
      (o === 'String' && i === 'ID') ||
      (o === 'Int' && i === 'Float') ||
      (o === 'Int' && i === 'Long') ||
      (o === 'String' && i === 'Decimal' && ef(e)) ||
      e === null
      ? !0
      : t.isList && Array.isArray(e)
      ? e.every((s) => Ra(s, { ...t, isList: !1 }, r))
      : !1
}
function Xp(e, t, r = e.isList) {
   let n = vt(e.type)
   return (
      e.location === 'fieldRefTypes' &&
         t.modelName &&
         (n += `<${t.modelName}>`),
      Xt(n, r)
   )
}
var nn = (e) => wa(e, (t, r) => r !== void 0)
function ef(e) {
   return /^\-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i.test(e)
}
function tf(e, t, r, n) {
   let i = null,
      o = []
   for (let s of r.inputTypes) {
      if (((i = nf(e, t, r, s, n)), i?.collectErrors().length === 0)) return i
      if (i && i?.collectErrors()) {
         let a = i?.collectErrors()
         a && a.length > 0 && o.push({ arg: i, errors: a })
      }
   }
   if (i?.hasError && o.length > 0) {
      let s = o.map(({ arg: a, errors: u }) => {
         let l = u.map((c) => {
            let p = 1
            return (
               c.error.type === 'invalidType' &&
                  (p = 2 * Math.exp($a(c.error.providedValue)) + 1),
               (p += Math.log(c.path.length)),
               c.error.type === 'missingArg' &&
                  a.inputType &&
                  Ct(a.inputType.type) &&
                  a.inputType.type.name.includes('Unchecked') &&
                  (p *= 2),
               c.error.type === 'invalidName' &&
                  Ct(c.error.originalType) &&
                  c.error.originalType.name.includes('Unchecked') &&
                  (p *= 2),
               p
            )
         })
         return { score: u.length + rf(l), arg: a, errors: u }
      })
      return s.sort((a, u) => (a.score < u.score ? -1 : 1)), s[0].arg
   }
   return i
}
function $a(e) {
   let t = 1
   if (!e || typeof e != 'object') return t
   for (let r in e)
      if (
         !!Object.prototype.hasOwnProperty.call(e, r) &&
         typeof e[r] == 'object'
      ) {
         let n = $a(e[r]) + 1
         t = Math.max(n, t)
      }
   return t
}
function rf(e) {
   return e.reduce((t, r) => t + r, 0)
}
function nf(e, t, r, n, i) {
   if (typeof t > 'u')
      return r.isRequired
         ? new ue({
              key: e,
              value: t,
              isEnum: n.location === 'enumTypes',
              inputType: n,
              error: {
                 type: 'missingArg',
                 missingName: e,
                 missingArg: r,
                 atLeastOne: !1,
                 atMostOne: !1,
              },
           })
         : null
   let { isNullable: o, isRequired: s } = r
   if (
      t === null &&
      !o &&
      !s &&
      !(Ct(n.type)
         ? n.type.constraints.minNumFields !== null &&
           n.type.constraints.minNumFields > 0
         : !1)
   )
      return new ue({
         key: e,
         value: t,
         isEnum: n.location === 'enumTypes',
         inputType: n,
         error: {
            type: 'invalidNullArg',
            name: e,
            invalidType: r.inputTypes,
            atLeastOne: !1,
            atMostOne: !1,
         },
      })
   if (!n.isList)
      if (Ct(n.type)) {
         if (
            typeof t != 'object' ||
            Array.isArray(t) ||
            (n.location === 'inputObjectTypes' && !xa(t))
         )
            return _i(e, t, r, n)
         {
            let c = nn(t),
               p,
               f = Object.keys(c || {}),
               m = f.length
            return (
               (m === 0 &&
                  typeof n.type.constraints.minNumFields == 'number' &&
                  n.type.constraints.minNumFields > 0) ||
               n.type.constraints.fields?.some((d) => f.includes(d)) === !1
                  ? (p = {
                       type: 'atLeastOne',
                       key: e,
                       inputType: n.type,
                       atLeastFields: n.type.constraints.fields,
                    })
                  : m > 1 &&
                    typeof n.type.constraints.maxNumFields == 'number' &&
                    n.type.constraints.maxNumFields < 2 &&
                    (p = {
                       type: 'atMostOne',
                       key: e,
                       inputType: n.type,
                       providedKeys: f,
                    }),
               new ue({
                  key: e,
                  value: c === null ? null : on(c, n.type, i, r.inputTypes),
                  isEnum: n.location === 'enumTypes',
                  error: p,
                  inputType: n,
                  schemaArg: r,
               })
            )
         }
      } else return Sa(e, t, r, n, i)
   if (
      (!Array.isArray(t) && n.isList && e !== 'updateMany' && (t = [t]),
      n.location === 'enumTypes' || n.location === 'scalar')
   )
      return Sa(e, t, r, n, i)
   let a = n.type,
      l = (
         typeof a.constraints?.minNumFields == 'number' &&
         a.constraints?.minNumFields > 0
            ? Array.isArray(t) &&
              t.some((c) => !c || Object.keys(nn(c)).length === 0)
            : !1
      )
         ? { inputType: a, key: e, type: 'atLeastOne' }
         : void 0
   if (!l) {
      let c =
         typeof a.constraints?.maxNumFields == 'number' &&
         a.constraints?.maxNumFields < 2
            ? Array.isArray(t) &&
              t.find((p) => !p || Object.keys(nn(p)).length !== 1)
            : !1
      c &&
         (l = {
            inputType: a,
            key: e,
            type: 'atMostOne',
            providedKeys: Object.keys(c),
         })
   }
   if (!Array.isArray(t))
      for (let c of r.inputTypes) {
         let p = on(t, c.type, i)
         if (p.collectErrors().length === 0)
            return new ue({
               key: e,
               value: p,
               isEnum: !1,
               schemaArg: r,
               inputType: c,
            })
      }
   return new ue({
      key: e,
      value: t.map((c, p) =>
         n.isList && typeof c != 'object'
            ? c
            : typeof c != 'object' || !t || Array.isArray(c)
            ? _i(String(p), c, sf(r), of(n))
            : on(c, a, i),
      ),
      isEnum: !1,
      inputType: n,
      schemaArg: r,
      error: l,
   })
}
function of(e) {
   return { ...e, isList: !1 }
}
function sf(e) {
   return { ...e, inputTypes: e.inputTypes.filter((t) => !t.isList) }
}
function Ct(e) {
   return !(typeof e == 'string' || Object.hasOwnProperty.call(e, 'values'))
}
function Sa(e, t, r, n, i) {
   return ye(t) && !Re(t)
      ? new ue({
           key: e,
           value: t,
           schemaArg: r,
           inputType: n,
           error: { type: 'invalidDateArg', argName: e },
        })
      : Ra(t, n, i)
      ? new ue({
           key: e,
           value: t,
           isEnum: n.location === 'enumTypes',
           schemaArg: r,
           inputType: n,
        })
      : _i(e, t, r, n)
}
function on(e, t, r, n, i) {
   t.meta?.source && (r = { modelName: t.meta.source })
   let o = nn(e),
      { fields: s, fieldMap: a } = t,
      u = s.map((f) => [f.name, void 0]),
      l = Object.entries(o || {}),
      p = Ns(l, u, (f) => f[0]).reduce((f, [m, d]) => {
         let g = a ? a[m] : s.find((h) => h.name === m)
         if (!g) {
            let h =
               typeof d == 'boolean' && i && i.fields.some((x) => x.name === m)
                  ? m
                  : null
            return (
               f.push(
                  new ue({
                     key: m,
                     value: d,
                     error: {
                        type: 'invalidName',
                        providedName: m,
                        providedValue: d,
                        didYouMeanField: h,
                        didYouMeanArg:
                           (!h && Qr(m, [...s.map((x) => x.name), 'select'])) ||
                           void 0,
                        originalType: t,
                        possibilities: n,
                        outputType: i,
                     },
                  }),
               ),
               f
            )
         }
         let b = tf(m, d, g, r)
         return b && f.push(b), f
      }, [])
   if (
      (typeof t.constraints.minNumFields == 'number' &&
         l.length < t.constraints.minNumFields) ||
      p.find(
         (f) =>
            f.error?.type === 'missingArg' || f.error?.type === 'atLeastOne',
      )
   ) {
      let f = t.fields.filter(
         (m) =>
            !m.isRequired &&
            o &&
            (typeof o[m.name] > 'u' || o[m.name] === null),
      )
      p.push(
         ...f.map((m) => {
            let d = m.inputTypes[0]
            return new ue({
               key: m.name,
               value: void 0,
               isEnum: d.location === 'enumTypes',
               error: {
                  type: 'missingArg',
                  missingName: m.name,
                  missingArg: m,
                  atLeastOne: Boolean(t.constraints.minNumFields) || !1,
                  atMostOne: t.constraints.maxNumFields === 1 || !1,
               },
               inputType: d,
            })
         }),
      )
   }
   return new ae(p)
}
function an({ document: e, path: t, data: r }) {
   let n = ir(r, t)
   if (n === 'undefined') return null
   if (typeof n != 'object') return n
   let i = af(e, t)
   return ji({ field: i, data: n })
}
function ji({ field: e, data: t }) {
   if (!t || typeof t != 'object' || !e.children || !e.schemaField) return t
   let r = {
      DateTime: (n) => new Date(n),
      Json: (n) => JSON.parse(n),
      Bytes: (n) => Buffer.from(n, 'base64'),
      Decimal: (n) => new he(n),
      BigInt: (n) => BigInt(n),
   }
   for (let n of e.children) {
      let i = n.schemaField?.outputType.type
      if (i && typeof i == 'string') {
         let o = r[i]
         if (o)
            if (Array.isArray(t))
               for (let s of t)
                  typeof s[n.name] < 'u' &&
                     s[n.name] !== null &&
                     (Array.isArray(s[n.name])
                        ? (s[n.name] = s[n.name].map(o))
                        : (s[n.name] = o(s[n.name])))
            else
               typeof t[n.name] < 'u' &&
                  t[n.name] !== null &&
                  (Array.isArray(t[n.name])
                     ? (t[n.name] = t[n.name].map(o))
                     : (t[n.name] = o(t[n.name])))
      }
      if (
         n.schemaField &&
         n.schemaField.outputType.location === 'outputObjectTypes'
      )
         if (Array.isArray(t))
            for (let o of t) ji({ field: n, data: o[n.name] })
         else ji({ field: n, data: t[n.name] })
   }
   return t
}
function af(e, t) {
   let r = t.slice(),
      n = r.shift(),
      i = e.children.find((o) => o.name === n)
   if (!i) throw new Error(`Could not find field ${n} in document ${e}`)
   for (; r.length > 0; ) {
      let o = r.shift()
      if (!i.children)
         throw new Error(`Can't get children for field ${i} with child ${o}`)
      let s = i.children.find((a) => a.name === o)
      if (!s) throw new Error(`Can't find child ${o} of field ${i}`)
      i = s
   }
   return i
}
function Ni(e) {
   return e
      .split('.')
      .filter((t) => t !== 'select')
      .join('.')
}
function qi(e) {
   if (Object.prototype.toString.call(e) === '[object Object]') {
      let r = {}
      for (let n in e)
         if (n === 'select') for (let i in e.select) r[i] = qi(e.select[i])
         else r[n] = qi(e[n])
      return r
   }
   return e
}
function uf({ ast: e, keyPaths: t, missingItems: r, valuePaths: n }) {
   let i = t.map(Ni),
      o = n.map(Ni),
      s = r.map((u) => ({
         path: Ni(u.path),
         isRequired: u.isRequired,
         type: u.type,
      }))
   return { ast: qi(e), keyPaths: i, missingItems: s, valuePaths: o }
}
function ar(e) {
   return {
      getKeys() {
         return Object.keys(e)
      },
      getPropertyValue(t) {
         return e[t]
      },
   }
}
function Ye(e, t) {
   return {
      getKeys() {
         return [e]
      },
      getPropertyValue() {
         return t()
      },
   }
}
function st(e) {
   let t = new $e()
   return {
      getKeys() {
         return e.getKeys()
      },
      getPropertyValue(r) {
         return t.getOrCreate(r, () => e.getPropertyValue(r))
      },
      getPropertyDescriptor(r) {
         return e.getPropertyDescriptor?.(r)
      },
   }
}
var Na = require('util')
var un = { enumerable: !0, configurable: !0, writable: !0 }
function ln(e) {
   let t = new Set(e)
   return {
      getOwnPropertyDescriptor: () => un,
      has: (r, n) => t.has(n),
      set: (r, n, i) => t.add(n) && Reflect.set(r, n, i),
      ownKeys: () => [...t],
   }
}
var Da = Symbol.for('nodejs.util.inspect.custom')
function Ze(e, t) {
   let r = lf(t),
      n = new Set(),
      i = new Proxy(e, {
         get(o, s) {
            if (n.has(s)) return o[s]
            let a = r.get(s)
            return a ? a.getPropertyValue(s) : o[s]
         },
         has(o, s) {
            if (n.has(s)) return !0
            let a = r.get(s)
            return a ? a.has?.(s) ?? !0 : Reflect.has(o, s)
         },
         ownKeys(o) {
            let s = Ia(Reflect.ownKeys(o), r),
               a = Ia(Array.from(r.keys()), r)
            return [...new Set([...s, ...a, ...n])]
         },
         set(o, s, a) {
            return r.get(s)?.getPropertyDescriptor?.(s)?.writable === !1
               ? !1
               : (n.add(s), Reflect.set(o, s, a))
         },
         getOwnPropertyDescriptor(o, s) {
            let a = r.get(s)
            return a
               ? a.getPropertyDescriptor
                  ? { ...un, ...a?.getPropertyDescriptor(s) }
                  : un
               : Reflect.getOwnPropertyDescriptor(o, s)
         },
         defineProperty(o, s, a) {
            return n.add(s), Reflect.defineProperty(o, s, a)
         },
      })
   return (
      (i[Da] = function (o, s, a = Na.inspect) {
         let u = { ...this }
         return delete u[Da], a(u, s)
      }),
      i
   )
}
function lf(e) {
   let t = new Map()
   for (let r of e) {
      let n = r.getKeys()
      for (let i of n) t.set(i, r)
   }
   return t
}
function Ia(e, t) {
   return e.filter((r) => t.get(r)?.has?.(r) ?? !0)
}
function Bi(e) {
   return {
      getKeys() {
         return e
      },
      has() {
         return !1
      },
      getPropertyValue() {},
   }
}
var ur = '<unknown>'
function ka(e) {
   var t = e.split(`
`)
   return t.reduce(function (r, n) {
      var i = ff(n) || df(n) || yf(n) || Ef(n) || wf(n)
      return i && r.push(i), r
   }, [])
}
var cf =
      /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/|[a-z]:\\|\\\\).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
   pf = /\((\S*)(?::(\d+))(?::(\d+))\)/
function ff(e) {
   var t = cf.exec(e)
   if (!t) return null
   var r = t[2] && t[2].indexOf('native') === 0,
      n = t[2] && t[2].indexOf('eval') === 0,
      i = pf.exec(t[2])
   return (
      n && i != null && ((t[2] = i[1]), (t[3] = i[2]), (t[4] = i[3])),
      {
         file: r ? null : t[2],
         methodName: t[1] || ur,
         arguments: r ? [t[2]] : [],
         lineNumber: t[3] ? +t[3] : null,
         column: t[4] ? +t[4] : null,
      }
   )
}
var mf =
   /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i
function df(e) {
   var t = mf.exec(e)
   return t
      ? {
           file: t[2],
           methodName: t[1] || ur,
           arguments: [],
           lineNumber: +t[3],
           column: t[4] ? +t[4] : null,
        }
      : null
}
var gf =
      /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i,
   hf = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i
function yf(e) {
   var t = gf.exec(e)
   if (!t) return null
   var r = t[3] && t[3].indexOf(' > eval') > -1,
      n = hf.exec(t[3])
   return (
      r && n != null && ((t[3] = n[1]), (t[4] = n[2]), (t[5] = null)),
      {
         file: t[3],
         methodName: t[1] || ur,
         arguments: t[2] ? t[2].split(',') : [],
         lineNumber: t[4] ? +t[4] : null,
         column: t[5] ? +t[5] : null,
      }
   )
}
var bf = /^\s*(?:([^@]*)(?:\((.*?)\))?@)?(\S.*?):(\d+)(?::(\d+))?\s*$/i
function wf(e) {
   var t = bf.exec(e)
   return t
      ? {
           file: t[3],
           methodName: t[1] || ur,
           arguments: [],
           lineNumber: +t[4],
           column: t[5] ? +t[5] : null,
        }
      : null
}
var xf =
   /^\s*at (?:((?:\[object object\])?[^\\/]+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i
function Ef(e) {
   var t = xf.exec(e)
   return t
      ? {
           file: t[2],
           methodName: t[1] || ur,
           arguments: [],
           lineNumber: +t[3],
           column: t[4] ? +t[4] : null,
        }
      : null
}
var Vi = class {
      getLocation() {
         return null
      }
   },
   Ui = class {
      constructor() {
         this._error = new Error()
      }
      getLocation() {
         let t = this._error.stack
         if (!t) return null
         let n = ka(t).find((i) => {
            if (!i.file) return !1
            let o = li(i.file)
            return (
               o !== '<anonymous>' &&
               !o.includes('@prisma') &&
               !o.includes('/packages/client/src/runtime/') &&
               !o.endsWith('/runtime/binary.js') &&
               !o.endsWith('/runtime/library.js') &&
               !o.endsWith('/runtime/data-proxy.js') &&
               !o.endsWith('/runtime/edge.js') &&
               !o.endsWith('/runtime/edge-esm.js') &&
               !o.startsWith('internal/') &&
               !i.methodName.includes('new ') &&
               !i.methodName.includes('getCallSite') &&
               !i.methodName.includes('Proxy.') &&
               i.methodName.split('.').length < 4
            )
         })
         return !n || !n.file
            ? null
            : {
                 fileName: n.file,
                 lineNumber: n.lineNumber,
                 columnNumber: n.column,
              }
      }
   }
function Xe(e) {
   return e === 'minimal' ? new Vi() : new Ui()
}
function Ie(e) {
   let t,
      r = (n) => {
         try {
            return n === void 0 || n?.kind === 'itx'
               ? t ?? (t = La(e(n)))
               : La(e(n))
         } catch (i) {
            return Promise.reject(i)
         }
      }
   return {
      then(n, i, o) {
         return r(o).then(n, i, o)
      },
      catch(n, i) {
         return r(i).catch(n, i)
      },
      finally(n, i) {
         return r(i).finally(n, i)
      },
      requestTransaction(n) {
         let i = r(n)
         return i.requestTransaction ? i.requestTransaction(n) : i
      },
      [Symbol.toStringTag]: 'PrismaPromise',
   }
}
function La(e) {
   return typeof e.then == 'function' ? e : Promise.resolve(e)
}
var _a = { _avg: !0, _count: !0, _sum: !0, _min: !0, _max: !0 }
function St(e = {}) {
   let t = vf(e)
   return Object.entries(t).reduce(
      (n, [i, o]) => (
         _a[i] !== void 0 ? (n.select[i] = { select: o }) : (n[i] = o), n
      ),
      { select: {} },
   )
}
function vf(e = {}) {
   return typeof e._count == 'boolean'
      ? { ...e, _count: { _all: e._count } }
      : e
}
function cn(e = {}) {
   return (t) => (typeof e._count == 'boolean' && (t._count = t._count._all), t)
}
function ja(e, t) {
   let r = cn(e)
   return t({ action: 'aggregate', unpacker: r, argsMapper: St })(e)
}
function Pf(e = {}) {
   let { select: t, ...r } = e
   return typeof t == 'object'
      ? St({ ...r, _count: t })
      : St({ ...r, _count: { _all: !0 } })
}
function Mf(e = {}) {
   return typeof e.select == 'object'
      ? (t) => cn(e)(t)._count
      : (t) => cn(e)(t)._count._all
}
function qa(e, t) {
   return t({ action: 'count', unpacker: Mf(e), argsMapper: Pf })(e)
}
function Ff(e = {}) {
   let t = St(e)
   if (Array.isArray(t.by))
      for (let r of t.by) typeof r == 'string' && (t.select[r] = !0)
   return t
}
function Cf(e = {}) {
   return (t) => (
      typeof e?._count == 'boolean' &&
         t.forEach((r) => {
            r._count = r._count._all
         }),
      t
   )
}
function Ba(e, t) {
   return t({ action: 'groupBy', unpacker: Cf(e), argsMapper: Ff })(e)
}
function Va(e, t, r) {
   if (t === 'aggregate') return (n) => ja(n, r)
   if (t === 'count') return (n) => qa(n, r)
   if (t === 'groupBy') return (n) => Ba(n, r)
}
function Ua(e, t) {
   let r = t.fields.filter((i) => !i.relationName),
      n = pi(r, (i) => i.name)
   return new Proxy(
      {},
      {
         get(i, o) {
            if (o in i || typeof o == 'symbol') return i[o]
            let s = n[o]
            if (s) return new Ee(e, o, s.type, s.isList, s.kind === 'enum')
         },
         ...ln(Object.keys(n)),
      },
   )
}
function Sf(e, t) {
   return e === void 0 || t === void 0 ? [] : [...t, 'select', e]
}
function Af(e, t, r) {
   return t === void 0 ? e ?? {} : tn(t, r, e || !0)
}
function Qi(e, t, r, n, i, o) {
   let a = e._runtimeDataModel.models[t].fields.reduce(
      (u, l) => ({ ...u, [l.name]: l }),
      {},
   )
   return (u) => {
      let l = Xe(e._errorFormat),
         c = Sf(n, i),
         p = Af(u, o, c),
         f = r({ dataPath: c, callsite: l })(p),
         m = Of(e, t)
      return new Proxy(f, {
         get(d, g) {
            if (!m.includes(g)) return d[g]
            let h = [a[g].type, r, g],
               x = [c, p]
            return Qi(e, ...h, ...x)
         },
         ...ln([...m, ...Object.getOwnPropertyNames(f)]),
      })
   }
}
function Of(e, t) {
   return e._runtimeDataModel.models[t].fields
      .filter((r) => r.kind === 'object')
      .map((r) => r.name)
}
var pn = Qa().version
var ve = class extends re {
   constructor(t) {
      super(t, { code: 'P2025', clientVersion: pn }),
         (this.name = 'NotFoundError')
   }
}
fe(ve, 'NotFoundError')
function Gi(e, t, r, n) {
   let i
   if (
      r &&
      typeof r == 'object' &&
      'rejectOnNotFound' in r &&
      r.rejectOnNotFound !== void 0
   )
      (i = r.rejectOnNotFound), delete r.rejectOnNotFound
   else if (typeof n == 'boolean') i = n
   else if (n && typeof n == 'object' && e in n) {
      let o = n[e]
      if (o && typeof o == 'object') return t in o ? o[t] : void 0
      i = Gi(e, t, r, o)
   } else typeof n == 'function' ? (i = n) : (i = !1)
   return i
}
var $f = /(findUnique|findFirst)/
function Ga(e, t, r, n) {
   if ((r ?? (r = 'record'), n && !e && $f.exec(t)))
      throw typeof n == 'boolean' && n
         ? new ve(`No ${r} found`)
         : typeof n == 'function'
         ? n(new ve(`No ${r} found`))
         : kt(n)
         ? n
         : new ve(`No ${r} found`)
}
function Ja(e, t, r) {
   return e === xe.ModelAction.findFirstOrThrow ||
      e === xe.ModelAction.findUniqueOrThrow
      ? Df(t, r)
      : r
}
function Df(e, t) {
   return async (r) => {
      if ('rejectOnNotFound' in r.args) {
         let i = De({
            originalMethod: r.clientMethod,
            callsite: r.callsite,
            message: "'rejectOnNotFound' option is not supported",
         })
         throw new K(i)
      }
      return await t(r).catch((i) => {
         throw i instanceof re && i.code === 'P2025'
            ? new ve(`No ${e} found`)
            : i
      })
   }
}
var If = [
      'findUnique',
      'findUniqueOrThrow',
      'findFirst',
      'findFirstOrThrow',
      'create',
      'update',
      'upsert',
      'delete',
   ],
   Nf = ['aggregate', 'count', 'groupBy']
function Ji(e, t) {
   let r = [Lf(e, t), kf(t)]
   e._engineConfig.previewFeatures?.includes('fieldReference') &&
      r.push(jf(e, t))
   let n = e._extensions.getAllModelExtensions(t)
   return n && r.push(ar(n)), Ze({}, r)
}
function kf(e) {
   return Ye('name', () => e)
}
function Lf(e, t) {
   let r = Te(t),
      n = Object.keys(xe.ModelAction).concat('count')
   return {
      getKeys() {
         return n
      },
      getPropertyValue(i) {
         let o = i,
            s = (u) => e._request(u)
         s = Ja(o, t, s)
         let a = (u) => (l) => {
            let c = Xe(e._errorFormat)
            return Ie((p) => {
               let f = {
                  args: l,
                  dataPath: [],
                  action: o,
                  model: t,
                  clientMethod: `${r}.${i}`,
                  jsModelName: r,
                  transaction: p,
                  callsite: c,
               }
               return s({ ...f, ...u })
            })
         }
         return If.includes(o) ? Qi(e, t, a) : _f(i) ? Va(e, i, a) : a({})
      },
   }
}
function _f(e) {
   return Nf.includes(e)
}
function jf(e, t) {
   return st(
      Ye('fields', () => {
         let r = e._runtimeDataModel.models[t]
         return Ua(t, r)
      }),
   )
}
function Ka(e) {
   return e.replace(/^./, (t) => t.toUpperCase())
}
var Ki = Symbol()
function fn(e) {
   let t = [qf(e), Ye(Ki, () => e)],
      r = e._extensions.getAllClientExtensions()
   return r && t.push(ar(r)), Ze(e, t)
}
function qf(e) {
   let t = Object.keys(e._runtimeDataModel.models),
      r = t.map(Te),
      n = [...new Set(t.concat(r))]
   return st({
      getKeys() {
         return n
      },
      getPropertyValue(i) {
         let o = Ka(i)
         if (e._runtimeDataModel.models[o] !== void 0) return Ji(e, o)
         if (e._runtimeDataModel.models[i] !== void 0) return Ji(e, i)
      },
      getPropertyDescriptor(i) {
         if (!r.includes(i)) return { enumerable: !1 }
      },
   })
}
function Wa(e) {
   return e[Ki] ? e[Ki] : e
}
function Ha(e) {
   if (!this._hasPreviewFlag('clientExtensions'))
      throw new K(
         'Extensions are not yet generally available, please add `clientExtensions` to the `previewFeatures` field in the `generator` block in the `schema.prisma` file.',
      )
   if (typeof e == 'function') return e(this)
   let t = Wa(this),
      r = Object.create(t, {
         _extensions: { value: this._extensions.append(e) },
      })
   return fn(r)
}
function Ne(e) {
   if (typeof e != 'object') return e
   var t,
      r,
      n = Object.prototype.toString.call(e)
   if (n === '[object Object]') {
      if (e.constructor !== Object && typeof e.constructor == 'function') {
         r = new e.constructor()
         for (t in e) e.hasOwnProperty(t) && r[t] !== e[t] && (r[t] = Ne(e[t]))
      } else {
         r = {}
         for (t in e)
            t === '__proto__'
               ? Object.defineProperty(r, t, {
                    value: Ne(e[t]),
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                 })
               : (r[t] = Ne(e[t]))
      }
      return r
   }
   if (n === '[object Array]') {
      for (t = e.length, r = Array(t); t--; ) r[t] = Ne(e[t])
      return r
   }
   return n === '[object Set]'
      ? ((r = new Set()),
        e.forEach(function (i) {
           r.add(Ne(i))
        }),
        r)
      : n === '[object Map]'
      ? ((r = new Map()),
        e.forEach(function (i, o) {
           r.set(Ne(o), Ne(i))
        }),
        r)
      : n === '[object Date]'
      ? new Date(+e)
      : n === '[object RegExp]'
      ? ((r = new RegExp(e.source, e.flags)), (r.lastIndex = e.lastIndex), r)
      : n === '[object DataView]'
      ? new e.constructor(Ne(e.buffer))
      : n === '[object ArrayBuffer]'
      ? e.slice(0)
      : n.slice(-6) === 'Array]'
      ? new e.constructor(e)
      : e
}
function za(e, t, r, n = 0) {
   return Ie((i) => {
      let o = t.customDataProxyFetch ?? ((s) => s)
      return (
         i !== void 0 &&
            (t.transaction?.kind === 'batch' && t.transaction.lock.then(),
            (t.transaction = i)),
         n === r.length
            ? e._executeRequest(t)
            : r[n]({
                 model: t.model,
                 operation: t.model ? t.action : t.clientMethod,
                 args: Ne(t.args ?? {}),
                 __internalParams: t,
                 query: (s, a = t) => {
                    let u = a.customDataProxyFetch ?? ((l) => l)
                    return (
                       (a.customDataProxyFetch = (l) => o(u(l))),
                       (a.args = s),
                       za(e, a, r, n + 1)
                    )
                 },
              })
      )
   })
}
function Ya(e, t) {
   let { jsModelName: r, action: n, clientMethod: i } = t,
      o = r ? n : i
   if (e._extensions.isEmpty()) return e._executeRequest(t)
   let s = e._extensions.getAllQueryCallbacks(r ?? '*', o)
   return za(e, t, s)
}
var mn = class {
      constructor(t, r) {
         this.extension = t
         this.previous = r
         this.computedFieldsCache = new $e()
         this.modelExtensionsCache = new $e()
         this.queryCallbacksCache = new $e()
         this.clientExtensions = Dr(() =>
            this.extension.client
               ? {
                    ...this.previous?.getAllClientExtensions(),
                    ...this.extension.client,
                 }
               : this.previous?.getAllClientExtensions(),
         )
      }
      getAllComputedFields(t) {
         return this.computedFieldsCache.getOrCreate(t, () =>
            aa(this.previous?.getAllComputedFields(t), this.extension, t),
         )
      }
      getAllClientExtensions() {
         return this.clientExtensions.get()
      }
      getAllModelExtensions(t) {
         return this.modelExtensionsCache.getOrCreate(t, () => {
            let r = Te(t)
            return !this.extension.model ||
               !(this.extension.model[r] || this.extension.model.$allModels)
               ? this.previous?.getAllModelExtensions(t)
               : {
                    ...this.previous?.getAllModelExtensions(t),
                    ...this.extension.model.$allModels,
                    ...this.extension.model[r],
                 }
         })
      }
      getAllQueryCallbacks(t, r) {
         return this.queryCallbacksCache.getOrCreate(`${t}:${r}`, () => {
            let n = this.previous?.getAllQueryCallbacks(t, r) ?? [],
               i = [],
               o = this.extension.query
            return !o || !(o[t] || o.$allModels || o[r])
               ? n
               : (o[t] !== void 0 &&
                    (o[t][r] !== void 0 && i.push(o[t][r]),
                    o[t].$allOperations !== void 0 &&
                       i.push(o[t].$allOperations)),
                 o.$allModels !== void 0 &&
                    (o.$allModels[r] !== void 0 && i.push(o.$allModels[r]),
                    o.$allModels.$allOperations !== void 0 &&
                       i.push(o.$allModels.$allOperations)),
                 o[r] !== void 0 && i.push(o[r]),
                 n.concat(i))
         })
      }
   },
   et = class {
      constructor(t) {
         this.head = t
      }
      static empty() {
         return new et()
      }
      static single(t) {
         return new et(new mn(t))
      }
      isEmpty() {
         return this.head === void 0
      }
      append(t) {
         return new et(new mn(t, this.head))
      }
      getAllComputedFields(t) {
         return this.head?.getAllComputedFields(t)
      }
      getAllClientExtensions() {
         return this.head?.getAllClientExtensions()
      }
      getAllModelExtensions(t) {
         return this.head?.getAllModelExtensions(t)
      }
      getAllQueryCallbacks(t, r) {
         return this.head?.getAllQueryCallbacks(t, r) ?? []
      }
   }
var Za = B('prisma:client'),
   Xa = { Vercel: 'vercel', 'Netlify CI': 'netlify' }
function eu({ postinstall: e, ciName: t, clientVersion: r }) {
   if (
      (Za('checkPlatformCaching:postinstall', e),
      Za('checkPlatformCaching:ciName', t),
      e === !0 && t && t in Xa)
   ) {
      let n = `Prisma has detected that this project was built on ${t}, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the \`prisma generate\` command during the build process.

Learn how: https://pris.ly/d/${Xa[t]}-build`
      throw (console.error(n), new Q(n, r))
   }
}
var Bf = {
      findUnique: 'query',
      findUniqueOrThrow: 'query',
      findFirst: 'query',
      findFirstOrThrow: 'query',
      findMany: 'query',
      count: 'query',
      create: 'mutation',
      createMany: 'mutation',
      update: 'mutation',
      updateMany: 'mutation',
      upsert: 'mutation',
      delete: 'mutation',
      deleteMany: 'mutation',
      executeRaw: 'mutation',
      queryRaw: 'mutation',
      aggregate: 'query',
      groupBy: 'query',
      runCommandRaw: 'mutation',
      findRaw: 'query',
      aggregateRaw: 'query',
   },
   dn = class {
      constructor(t, r) {
         this.dmmf = t
         this.errorFormat = r
      }
      createMessage({
         action: t,
         modelName: r,
         args: n,
         extensions: i,
         clientMethod: o,
         callsite: s,
      }) {
         let a,
            u = Bf[t]
         ;(t === 'executeRaw' || t === 'queryRaw' || t === 'runCommandRaw') &&
            (a = t)
         let l
         if (r !== void 0) {
            if (((l = this.dmmf?.mappingsMap[r]), l === void 0))
               throw new Error(`Could not find mapping for model ${r}`)
            if (((a = l[t === 'count' ? 'aggregate' : t]), !a)) {
               let f = De({
                  message: `Model \`${r}\` does not support \`${t}\` action.`,
                  originalMethod: o,
                  callsite: s,
               })
               throw new K(f)
            }
         }
         if (u !== 'query' && u !== 'mutation')
            throw new Error(`Invalid operation ${u} for action ${t}`)
         if (this.dmmf?.rootFieldMap[a] === void 0)
            throw new Error(
               `Could not find rootField ${a} for action ${t} for model ${r} on rootType ${u}`,
            )
         let p = sn({
            dmmf: this.dmmf,
            rootField: a,
            rootTypeName: u,
            select: n,
            modelName: r,
            extensions: i,
         })
         return p.validate(n, !1, o, this.errorFormat, s), new Wi(p)
      }
      createBatch(t) {
         return t.map((r) => r.toEngineQuery())
      }
   },
   Wi = class {
      constructor(t) {
         this.document = t
      }
      isWrite() {
         return this.document.type === 'mutation'
      }
      getBatchId() {
         if (!this.getRootField().startsWith('findUnique')) return
         let t = this.document.children[0].args?.args
               .map((n) =>
                  n.value instanceof ae
                     ? `${n.key}-${n.value.args.map((i) => i.key).join(',')}`
                     : n.key,
               )
               .join(','),
            r = this.document.children[0].children.join(',')
         return `${this.document.children[0].name}|${t}|${r}`
      }
      toDebugString() {
         return String(this.document)
      }
      toEngineQuery() {
         return { query: String(this.document), variables: {} }
      }
      deserializeResponse(t, r) {
         let n = this.getRootField(),
            i = []
         return (
            n && i.push(n),
            i.push(...r.filter((o) => o !== 'select' && o !== 'include')),
            an({ document: this.document, path: i, data: t })
         )
      }
      getRootField() {
         return this.document.children[0].name
      }
   }
function gn(e) {
   return e === null
      ? e
      : Array.isArray(e)
      ? e.map(gn)
      : typeof e == 'object'
      ? Vf(e)
         ? Uf(e)
         : yt(e, gn)
      : e
}
function Vf(e) {
   return e !== null && typeof e == 'object' && typeof e.$type == 'string'
}
function Uf({ $type: e, value: t }) {
   switch (e) {
      case 'BigInt':
         return BigInt(t)
      case 'Bytes':
         return Buffer.from(t, 'base64')
      case 'DateTime':
         return new Date(t)
      case 'Decimal':
         return new he(t)
      case 'Json':
         return JSON.parse(t)
      default:
         Le(t, 'Unknown tagged value')
   }
}
var hn = class {
   constructor(t = 0, r) {
      this.context = r
      this.lines = []
      this.currentLine = ''
      this.currentIndent = 0
      this.currentIndent = t
   }
   write(t) {
      return (
         typeof t == 'string' ? (this.currentLine += t) : t.write(this), this
      )
   }
   writeJoined(t, r) {
      let n = r.length - 1
      for (let i = 0; i < r.length; i++)
         this.write(r[i]), i !== n && this.write(t)
      return this
   }
   writeLine(t) {
      return this.write(t).newLine()
   }
   newLine() {
      this.lines.push(this.indentedCurrentLine()),
         (this.currentLine = ''),
         (this.marginSymbol = void 0)
      let t = this.afterNextNewLineCallback
      return (this.afterNextNewLineCallback = void 0), t?.(), this
   }
   withIndent(t) {
      return this.indent(), t(this), this.unindent(), this
   }
   afterNextNewline(t) {
      return (this.afterNextNewLineCallback = t), this
   }
   indent() {
      return this.currentIndent++, this
   }
   unindent() {
      return this.currentIndent > 0 && this.currentIndent--, this
   }
   addMarginSymbol(t) {
      return (this.marginSymbol = t), this
   }
   toString() {
      return this.lines.concat(this.indentedCurrentLine()).join(`
`)
   }
   getCurrentLineLength() {
      return this.currentLine.length
   }
   indentedCurrentLine() {
      let t = this.currentLine.padStart(
         this.currentLine.length + 2 * this.currentIndent,
      )
      return this.marginSymbol ? this.marginSymbol + t.slice(1) : t
   }
}
var iu = S(Br())
var qe = class {
   constructor(t, r) {
      this.name = t
      this.value = r
      this.isRequired = !1
   }
   makeRequired() {
      return (this.isRequired = !0), this
   }
   write(t) {
      let {
         colors: { green: r },
      } = t.context
      t.addMarginSymbol(r(this.isRequired ? '+' : '?')),
         t.write(r(this.name)),
         this.isRequired || t.write(r('?')),
         t.write(r(': ')),
         typeof this.value == 'string'
            ? t.write(r(this.value))
            : t.write(this.value)
   }
}
var yn = (e) => e,
   tu = { bold: yn, red: yn, green: yn, dim: yn },
   ru = { bold: M, red: R, green: A, dim: D },
   At = {
      write(e) {
         e.writeLine(',')
      },
   }
var ke = class {
   constructor(t) {
      this.contents = t
      this.isUnderlined = !1
      this.color = (t) => t
   }
   underline() {
      return (this.isUnderlined = !0), this
   }
   setColor(t) {
      return (this.color = t), this
   }
   write(t) {
      let r = t.getCurrentLineLength()
      t.write(this.color(this.contents)),
         this.isUnderlined &&
            t.afterNextNewline(() => {
               t.write(' '.repeat(r)).writeLine(
                  this.color('~'.repeat(this.contents.length)),
               )
            })
   }
}
var tt = class {
   constructor() {
      this.hasError = !1
   }
   markAsError() {
      return (this.hasError = !0), this
   }
}
var U = class extends tt {
   constructor() {
      super(...arguments)
      this.fields = {}
      this.suggestions = []
   }
   addField(r) {
      this.fields[r.name] = r
   }
   addSuggestion(r) {
      this.suggestions.push(r)
   }
   getField(r) {
      return this.fields[r]
   }
   getDeepField(r) {
      let [n, ...i] = r,
         o = this.getField(n)
      if (!o) return
      let s = o
      for (let a of i) {
         if (!(s.value instanceof U)) return
         let u = s.value.getField(a)
         if (!u) return
         s = u
      }
      return s
   }
   getDeepFieldValue(r) {
      return r.length === 0 ? this : this.getDeepField(r)?.value
   }
   hasField(r) {
      return Boolean(this.getField(r))
   }
   removeAllFields() {
      this.fields = {}
   }
   removeField(r) {
      delete this.fields[r]
   }
   getFields() {
      return this.fields
   }
   isEmpty() {
      return Object.keys(this.fields).length === 0
   }
   getFieldValue(r) {
      return this.getField(r)?.value
   }
   getDeepSubSelectionValue(r) {
      let n = this
      for (let i of r) {
         if (!(n instanceof U)) return
         let o = n.getSubSelectionValue(i)
         if (!o) return
         n = o
      }
      return n
   }
   getDeepSelectionParent(r) {
      let n = this.getSelectionParent()
      if (!n) return
      let i = n
      for (let o of r) {
         let s = i.value.getFieldValue(o)
         if (!s || !(s instanceof U)) return
         let a = s.getSelectionParent()
         if (!a) return
         i = a
      }
      return i
   }
   getSelectionParent() {
      let r = this.getField('select')
      if (r?.value instanceof U) return { kind: 'select', value: r.value }
      let n = this.getField('include')
      if (n?.value instanceof U) return { kind: 'include', value: n.value }
   }
   getSubSelectionValue(r) {
      return this.getSelectionParent()?.value.fields[r].value
   }
   getPrintWidth() {
      let r = Object.values(this.fields)
      return r.length == 0
         ? 2
         : Math.max(...r.map((i) => i.getPrintWidth())) + 2
   }
   write(r) {
      let n = Object.values(this.fields)
      if (n.length === 0 && this.suggestions.length === 0) {
         this.writeEmpty(r)
         return
      }
      this.writeWithContents(r, n)
   }
   writeEmpty(r) {
      let n = new ke('{}')
      this.hasError && n.setColor(r.context.colors.red).underline(), r.write(n)
   }
   writeWithContents(r, n) {
      r.writeLine('{').withIndent(() => {
         r.writeJoined(At, [...n, ...this.suggestions]).newLine()
      }),
         r.write('}'),
         this.hasError &&
            r.afterNextNewline(() => {
               r.writeLine(
                  r.context.colors.red('~'.repeat(this.getPrintWidth())),
               )
            })
   }
}
var X = class extends tt {
   constructor(r) {
      super()
      this.text = r
   }
   getPrintWidth() {
      return this.text.length
   }
   write(r) {
      let n = new ke(this.text)
      this.hasError && n.underline().setColor(r.context.colors.red), r.write(n)
   }
}
var bn = class {
   constructor() {
      this.fields = []
   }
   addField(t, r) {
      return (
         this.fields.push({
            write(n) {
               let { green: i, dim: o } = n.context.colors
               n.write(i(o(`${t}: ${r}`))).addMarginSymbol(i(o('+')))
            },
         }),
         this
      )
   }
   write(t) {
      let {
         colors: { green: r },
      } = t.context
      t.writeLine(r('{'))
         .withIndent(() => {
            t.writeJoined(At, this.fields).newLine()
         })
         .write(r('}'))
         .addMarginSymbol(r('+'))
   }
}
function Hi(e, t) {
   switch (e.kind) {
      case 'IncludeAndSelect':
         Gf(e, t)
         break
      case 'IncludeOnScalar':
         Jf(e, t)
         break
      case 'EmptySelection':
         Kf(e, t)
         break
      case 'UnknownSelectionField':
         Wf(e, t)
         break
      case 'UnknownArgument':
         Hf(e, t)
         break
      case 'UnknownInputField':
         zf(e, t)
         break
      case 'RequiredArgumentMissing':
         Yf(e, t)
         break
      case 'InvalidArgumentType':
         Zf(e, t)
         break
      case 'InvalidArgumentValue':
         Xf(e, t)
         break
      case 'ValueTooLarge':
         em(e, t)
         break
      case 'SomeFieldsMissing':
         tm(e, t)
         break
      case 'TooManyFieldsGiven':
         rm(e, t)
         break
      case 'Union':
         nm(e, t)
         break
      default:
         throw new Error('not implemented: ' + e.kind)
   }
}
function Gf(e, t) {
   let r = t.arguments.getDeepSubSelectionValue(e.selectionPath)
   r &&
      r instanceof U &&
      (r.getField('include')?.markAsError(),
      r.getField('select')?.markAsError()),
      t.addErrorMessage(
         (n) =>
            `Please ${n.bold('either')} use ${n.green(
               '`include`',
            )} or ${n.green('`select`')}, but ${n.red(
               'not both',
            )} at the same time.`,
      )
}
function Jf(e, t) {
   let [r, n] = wn(e.selectionPath),
      i = e.outputType,
      o = t.arguments.getDeepSelectionParent(r)?.value
   if (o && (o.getField(n)?.markAsError(), i))
      for (let s of i.fields)
         s.isRelation && o.addSuggestion(new qe(s.name, 'true'))
   t.addErrorMessage((s) => {
      let a = `Invalid scalar field ${s.red(`\`${n}\``)} for ${s.bold(
         'include',
      )} statement`
      return (
         i ? (a += ` on model ${s.bold(i.name)}. ${lr(s)}`) : (a += '.'),
         (a += `
Note that ${s.bold('include')} statements only accept relation fields.`),
         a
      )
   })
}
function Kf(e, t) {
   let r = e.outputType,
      n = t.arguments.getDeepSelectionParent(e.selectionPath)?.value,
      i = n?.isEmpty() ?? !1
   n && (n.removeAllFields(), uu(n, r)),
      t.addErrorMessage((o) =>
         i
            ? `The ${o.red('`select`')} statement for type ${o.bold(
                 r.name,
              )} must not be empty. ${lr(o)}`
            : `The ${o.red('`select`')} statement for type ${o.bold(
                 r.name,
              )} needs ${o.bold('at least one truthy value')}.`,
      )
}
function Wf(e, t) {
   let [r, n] = wn(e.selectionPath),
      i = t.arguments.getDeepSelectionParent(r)
   i && (i.value.getField(n)?.markAsError(), uu(i.value, e.outputType)),
      t.addErrorMessage((o) => {
         let s = [`Unknown field ${o.red(`\`${n}\``)}`]
         return (
            i && s.push(`for ${o.bold(i.kind)} statement`),
            s.push(`on model ${o.bold(`\`${e.outputType.name}\``)}.`),
            s.push(lr(o)),
            s.join(' ')
         )
      })
}
function Hf(e, t) {
   let r = e.argumentPath[0],
      n = t.arguments.getDeepSubSelectionValue(e.selectionPath)
   n instanceof U && (n.getField(r)?.markAsError(), sm(n, e.arguments)),
      t.addErrorMessage((i) =>
         ou(
            i,
            r,
            e.arguments.map((o) => o.name),
         ),
      )
}
function zf(e, t) {
   let [r, n] = wn(e.argumentPath),
      i = t.arguments.getDeepSubSelectionValue(e.selectionPath)
   if (i instanceof U) {
      i.getDeepField(e.argumentPath)?.markAsError()
      let o = i.getDeepFieldValue(r)
      o instanceof U && lu(o, e.inputType)
   }
   t.addErrorMessage((o) =>
      ou(
         o,
         n,
         e.inputType.fields.map((s) => s.name),
      ),
   )
}
function ou(e, t, r) {
   let n = [`Unknown argument \`${e.red(t)}\`.`],
      i = um(t, r)
   return (
      i && n.push(`Did you mean \`${e.green(i)}\`?`),
      r.length > 0 && n.push(lr(e)),
      n.join(' ')
   )
}
function Yf(e, t) {
   let r
   t.addErrorMessage((u) =>
      r?.value instanceof X && r.value.text === 'null'
         ? `Argument \`${u.green(o)}\` must not be ${u.red('null')}.`
         : `Argument \`${u.green(o)}\` is missing.`,
   )
   let n = t.arguments.getDeepSubSelectionValue(e.selectionPath)
   if (!(n instanceof U)) return
   let [i, o] = wn(e.argumentPath),
      s = new bn(),
      a = n.getDeepFieldValue(i)
   if (a instanceof U)
      if (
         ((r = a.getField(o)),
         r && a.removeField(o),
         e.inputTypes.length === 1 && e.inputTypes[0].kind === 'object')
      ) {
         for (let u of e.inputTypes[0].fields)
            s.addField(u.name, u.typeNames.join(' | '))
         a.addSuggestion(new qe(o, s).makeRequired())
      } else {
         let u = e.inputTypes.map(su).join(' | ')
         a.addSuggestion(new qe(o, u).makeRequired())
      }
}
function su(e) {
   return e.kind === 'list' ? `${su(e.elementType)}[]` : e.name
}
function Zf(e, t) {
   let r = e.argument.name,
      n = t.arguments.getDeepSubSelectionValue(e.selectionPath)
   n instanceof U && n.getDeepFieldValue(e.argumentPath)?.markAsError(),
      t.addErrorMessage((i) => {
         let o = xn(
            'or',
            e.argument.typeNames.map((s) => i.green(s)),
         )
         return `Argument \`${i.bold(
            r,
         )}\`: Invalid value provided. Expected ${o}, provided ${i.red(
            e.inferredType,
         )}.`
      })
}
function Xf(e, t) {
   let r = e.argument.name,
      n = t.arguments.getDeepSubSelectionValue(e.selectionPath)
   n instanceof U && n.getDeepFieldValue(e.argumentPath)?.markAsError(),
      t.addErrorMessage((i) => {
         let o = xn(
               'or',
               e.argument.typeNames.map((a) => i.green(a)),
            ),
            s = [`Invalid value for argument \`${i.bold(r)}\``]
         return (
            e.underlyingError && s.push(`: ${e.underlyingError}`),
            s.push(`. Expected ${o}.`),
            s.join('')
         )
      })
}
function em(e, t) {
   let r = e.argument.name,
      n = t.arguments.getDeepSubSelectionValue(e.selectionPath),
      i
   if (n instanceof U) {
      let s = n.getDeepField(e.argumentPath)?.value
      s?.markAsError(), s instanceof X && (i = s.text)
   }
   t.addErrorMessage((o) => {
      let s = ['Unable to fit value']
      return (
         i && s.push(o.red(i)),
         s.push(`into a 64-bit signed integer for field \`${o.bold(r)}\``),
         s.join(' ')
      )
   })
}
function tm(e, t) {
   let r = e.argumentPath[e.argumentPath.length - 1],
      n = t.arguments.getDeepSubSelectionValue(e.selectionPath)
   if (n instanceof U) {
      let i = n.getDeepFieldValue(e.argumentPath)
      i instanceof U && lu(i, e.inputType)
   }
   t.addErrorMessage((i) => {
      let o = [
         `Argument \`${i.bold(r)}\` of type ${i.bold(e.inputType.name)} needs`,
      ]
      return (
         e.constraints.minFieldCount === 1
            ? e.constraints.requiredFields
               ? o.push(
                    `${i.green('at least one of')} ${xn(
                       'or',
                       e.constraints.requiredFields.map(
                          (s) => `\`${i.bold(s)}\``,
                       ),
                    )} arguments.`,
                 )
               : o.push(`${i.green('at least one')} argument.`)
            : o.push(
                 `${i.green(
                    `at least ${e.constraints.minFieldCount}`,
                 )} arguments.`,
              ),
         o.push(lr(i)),
         o.join(' ')
      )
   })
}
function rm(e, t) {
   let r = e.argumentPath[e.argumentPath.length - 1],
      n = t.arguments.getDeepSubSelectionValue(e.selectionPath),
      i = []
   if (n instanceof U) {
      let o = n.getDeepFieldValue(e.argumentPath)
      o instanceof U && (o.markAsError(), (i = Object.keys(o.getFields())))
   }
   t.addErrorMessage((o) => {
      let s = [
         `Argument \`${o.bold(r)}\` of type ${o.bold(e.inputType.name)} needs`,
      ]
      return (
         e.constraints.minFieldCount === 1 && e.constraints.maxFieldCount == 1
            ? s.push(`${o.green('exactly one')} argument,`)
            : e.constraints.maxFieldCount == 1
            ? s.push(`${o.green('at most one')} argument,`)
            : s.push(
                 `${o.green(
                    `at most ${e.constraints.maxFieldCount}`,
                 )} arguments,`,
              ),
         s.push(
            `but you provided ${xn(
               'and',
               i.map((a) => o.red(a)),
            )}. Please choose`,
         ),
         e.constraints.maxFieldCount === 1
            ? s.push('one.')
            : s.push(`${e.constraints.maxFieldCount}.`),
         s.join(' ')
      )
   })
}
function nm(e, t) {
   let r = au(e)
   r ? Hi(r, t) : t.addErrorMessage(() => 'Unknown error')
}
function au(e) {
   return im(e) ?? om(e)
}
function im({ errors: e }) {
   if (e.length === 0 || e[0].kind !== 'InvalidArgumentType') return
   let t = { ...e[0], argument: { ...e[0].argument } }
   for (let r = 1; r < e.length; r++) {
      let n = e[r]
      if (
         n.kind !== 'InvalidArgumentType' ||
         !nu(n.selectionPath, t.selectionPath) ||
         !nu(n.argumentPath, t.argumentPath)
      )
         return
      t.argument.typeNames = t.argument.typeNames.concat(n.argument.typeNames)
   }
   return t
}
function nu(e, t) {
   if (e.length !== t.length) return !1
   for (let r = 0; r < e.length; r++) if (e[r] !== t[r]) return !1
   return !0
}
function om(e) {
   return fi(e.errors, (t) => {
      t.kind === 'Union' && (t = au(t) ?? t)
      let r = 0
      return (
         Array.isArray(t.selectionPath) && (r += t.selectionPath.length),
         Array.isArray(t.argumentPath) && (r += t.argumentPath.length),
         r
      )
   })
}
function uu(e, t) {
   for (let r of t.fields)
      e.hasField(r.name) || e.addSuggestion(new qe(r.name, 'true'))
}
function sm(e, t) {
   for (let r of t)
      e.hasField(r.name) ||
         e.addSuggestion(new qe(r.name, r.typeNames.join(' | ')))
}
function lu(e, t) {
   if (t.kind === 'object')
      for (let r of t.fields)
         e.hasField(r.name) ||
            e.addSuggestion(new qe(r.name, r.typeNames.join(' | ')))
}
function wn(e) {
   let t = [...e],
      r = t.pop()
   if (!r) throw new Error('unexpected empty path')
   return [t, r]
}
function lr({ green: e }) {
   return `Available options are listed in ${e('green')}.`
}
function xn(e, t) {
   if (t.length === 1) return t[0]
   let r = [...t],
      n = r.pop()
   return `${r.join(', ')} ${e} ${n}`
}
var am = 3
function um(e, t) {
   let r = 1 / 0,
      n
   for (let i of t) {
      let o = (0, iu.default)(e, i)
      o > am || (o < r && ((r = o), (n = i)))
   }
   return n
}
var En = class extends tt {
   constructor() {
      super(...arguments)
      this.items = []
   }
   addItem(r) {
      return this.items.push(r), this
   }
   getPrintWidth() {
      return this.items.length === 0
         ? 2
         : Math.max(...this.items.map((n) => n.getPrintWidth())) + 2
   }
   write(r) {
      if (this.items.length === 0) {
         this.writeEmpty(r)
         return
      }
      this.writeWithItems(r)
   }
   writeEmpty(r) {
      let n = new ke('[]')
      this.hasError && n.setColor(r.context.colors.red).underline(), r.write(n)
   }
   writeWithItems(r) {
      let { colors: n } = r.context
      r
         .writeLine('[')
         .withIndent(() => r.writeJoined(At, this.items).newLine())
         .write(']'),
         this.hasError &&
            r.afterNextNewline(() => {
               r.writeLine(n.red('~'.repeat(this.getPrintWidth())))
            })
   }
}
var cu = ': ',
   Tn = class {
      constructor(t, r) {
         this.name = t
         this.value = r
         this.hasError = !1
      }
      markAsError() {
         this.hasError = !0
      }
      getPrintWidth() {
         return this.name.length + this.value.getPrintWidth() + cu.length
      }
      write(t) {
         let r = new ke(this.name)
         this.hasError && r.underline().setColor(t.context.colors.red),
            t.write(r).write(cu).write(this.value)
      }
   }
var zi = class {
   constructor(t) {
      this.errorMessages = []
      this.arguments = t
   }
   write(t) {
      t.write(this.arguments)
   }
   addErrorMessage(t) {
      this.errorMessages.push(t)
   }
   renderAllMessages(t) {
      return this.errorMessages.map((r) => r(t)).join(`
`)
   }
}
function pu(e) {
   return new zi(fu(e))
}
function fu(e) {
   let t = new U()
   for (let [r, n] of Object.entries(e)) {
      let i = new Tn(r, mu(n))
      t.addField(i)
   }
   return t
}
function mu(e) {
   if (typeof e == 'string') return new X(JSON.stringify(e))
   if (typeof e == 'number' || typeof e == 'boolean') return new X(String(e))
   if (typeof e == 'bigint') return new X(`${e}n`)
   if (e === null) return new X('null')
   if (e === void 0) return new X('undefined')
   if (Ke(e)) return new X(`new Prisma.Decimal("${e.toFixed()}")`)
   if (e instanceof Uint8Array)
      return Buffer.isBuffer(e)
         ? new X(`Buffer.alloc(${e.byteLength})`)
         : new X(`new Uint8Array(${e.byteLength})`)
   if (e instanceof Date) {
      let t = Re(e) ? e.toISOString() : 'Invalid Date'
      return new X(`new Date("${t}")`)
   }
   if (e instanceof oe) return new X(`Prisma.${e._getName()}`)
   if (Vr(e)) return new X(`prisma.${Ft(e.modelName)}.$fields.${e.name}`)
   if (Array.isArray(e)) return lm(e)
   if (typeof e == 'object') return fu(e)
   Le(e, 'Unknown value type')
}
function lm(e) {
   let t = new En()
   for (let r of e) t.addItem(mu(r))
   return t
}
function vn({
   args: e,
   errors: t,
   errorFormat: r,
   callsite: n,
   originalMethod: i,
}) {
   let o = pu(e)
   for (let c of t) Hi(c, o)
   let s = r === 'pretty' ? ru : tu,
      a = o.renderAllMessages(s),
      u = new hn(0, { colors: s }).write(o).toString(),
      l = De({
         message: a,
         callsite: n,
         originalMethod: i,
         showColors: r === 'pretty',
         callArguments: u,
      })
   throw new K(l)
}
var cm = {
   findUnique: 'findUnique',
   findUniqueOrThrow: 'findUniqueOrThrow',
   findFirst: 'findFirst',
   findFirstOrThrow: 'findFirstOrThrow',
   findMany: 'findMany',
   count: 'aggregate',
   create: 'createOne',
   createMany: 'createMany',
   update: 'updateOne',
   updateMany: 'updateMany',
   upsert: 'upsertOne',
   delete: 'deleteOne',
   deleteMany: 'deleteMany',
   executeRaw: 'executeRaw',
   queryRaw: 'queryRaw',
   aggregate: 'aggregate',
   groupBy: 'groupBy',
   runCommandRaw: 'runCommandRaw',
   findRaw: 'findRaw',
   aggregateRaw: 'aggregateRaw',
}
function du({
   modelName: e,
   action: t,
   args: r,
   runtimeDataModel: n,
   extensions: i,
   callsite: o,
   clientMethod: s,
   errorFormat: a,
}) {
   let u = new Ot({
      runtimeDataModel: n,
      modelName: e,
      action: t,
      rootArgs: r,
      callsite: o,
      extensions: i,
      selectionPath: [],
      argumentPath: [],
      originalMethod: s,
      errorFormat: a,
   })
   return { modelName: e, action: cm[t], query: Yi(r, u) }
}
function Yi({ select: e, include: t, ...r } = {}, n) {
   return { arguments: hu(r, n), selection: pm(e, t, n) }
}
function pm(e, t, r) {
   return (
      e &&
         t &&
         r.throwValidationError({
            kind: 'IncludeAndSelect',
            selectionPath: r.getSelectionPath(),
         }),
      e ? dm(e, r) : fm(r, t)
   )
}
function fm(e, t) {
   let r = {}
   return (
      e.model && !e.isRawAction() && ((r.$composites = !0), (r.$scalars = !0)),
      t && mm(r, t, e),
      r
   )
}
function mm(e, t, r) {
   for (let [n, i] of Object.entries(t)) {
      let o = r.findField(n)
      o &&
         o?.kind !== 'object' &&
         r.throwValidationError({
            kind: 'IncludeOnScalar',
            selectionPath: r.getSelectionPath().concat(n),
            outputType: r.getOutputTypeDescription(),
         }),
         i === !0
            ? (e[n] = !0)
            : typeof i == 'object' && (e[n] = Yi(i, r.nestSelection(n)))
   }
}
function dm(e, t) {
   let r = {},
      n = t.getComputedFields(),
      i = Xr(e, n)
   for (let [o, s] of Object.entries(i)) {
      let a = t.findField(o)
      ;(n?.[o] && !a) ||
         (s === !0
            ? (r[o] = !0)
            : typeof s == 'object' && (r[o] = Yi(s, t.nestSelection(o))))
   }
   return r
}
function gu(e, t) {
   if (e === null) return null
   if (typeof e == 'string' || typeof e == 'number' || typeof e == 'boolean')
      return e
   if (typeof e == 'bigint') return { $type: 'BigInt', value: String(e) }
   if (ye(e)) {
      if (Re(e)) return { $type: 'DateTime', value: e.toISOString() }
      t.throwValidationError({
         kind: 'InvalidArgumentValue',
         selectionPath: t.getSelectionPath(),
         argumentPath: t.getArgumentPath(),
         argument: { name: t.getArgumentName(), typeNames: ['Date'] },
         underlyingError: 'Provided Date object is invalid',
      })
   }
   if (Vr(e)) return { $type: 'FieldRef', value: { _ref: e.name } }
   if (Array.isArray(e)) return gm(e, t)
   if (ArrayBuffer.isView(e))
      return { $type: 'Bytes', value: Buffer.from(e).toString('base64') }
   if (hm(e)) return e.values
   if (Ke(e)) return { $type: 'Decimal', value: e.toFixed() }
   if (e instanceof oe) {
      if (e !== Et.instances[e._getName()])
         throw new Error('Invalid ObjectEnumValue')
      return { $type: 'Enum', value: e._getName() }
   }
   if (typeof e == 'object') return hu(e, t)
   Le(e, 'Unknown value type')
}
function hu(e, t) {
   if (e.$type) return { $type: 'Json', value: JSON.stringify(e) }
   let r = {}
   for (let n in e) {
      let i = e[n]
      i !== void 0 && (r[n] = gu(i, t.nestArgument(n)))
   }
   return r
}
function gm(e, t) {
   let r = []
   for (let n = 0; n < e.length; n++) {
      let i = e[n]
      i !== void 0 && r.push(gu(i, t.nestArgument(String(n))))
   }
   return r
}
function hm(e) {
   return typeof e == 'object' && e !== null && e.__prismaRawParameters__ === !0
}
var Ot = class {
   constructor(t) {
      this.params = t
      this.params.modelName &&
         (this.model =
            this.params.runtimeDataModel.models[this.params.modelName])
   }
   throwValidationError(t) {
      vn({
         errors: [t],
         originalMethod: this.params.originalMethod,
         args: this.params.rootArgs ?? {},
         callsite: this.params.callsite,
         errorFormat: this.params.errorFormat,
      })
   }
   getSelectionPath() {
      return this.params.selectionPath
   }
   getArgumentPath() {
      return this.params.argumentPath
   }
   getArgumentName() {
      return this.params.argumentPath[this.params.argumentPath.length - 1]
   }
   getOutputTypeDescription() {
      if (!(!this.params.modelName || !this.model))
         return {
            name: this.params.modelName,
            fields: this.model.fields.map((t) => ({
               name: t.name,
               typeName: 'boolean',
               isRelation: t.kind === 'object',
            })),
         }
   }
   isRawAction() {
      return [
         'executeRaw',
         'queryRaw',
         'runCommandRaw',
         'findRaw',
         'aggregateRaw',
      ].includes(this.params.action)
   }
   getComputedFields() {
      if (!!this.params.modelName)
         return this.params.extensions.getAllComputedFields(
            this.params.modelName,
         )
   }
   findField(t) {
      return this.model?.fields.find((r) => r.name === t)
   }
   nestSelection(t) {
      let r = this.findField(t),
         n = r?.kind === 'object' ? r.type : void 0
      return new Ot({
         ...this.params,
         modelName: n,
         selectionPath: this.params.selectionPath.concat(t),
      })
   }
   nestArgument(t) {
      return new Ot({
         ...this.params,
         argumentPath: this.params.argumentPath.concat(t),
      })
   }
}
var cr = class {
      constructor(t, r) {
         this.runtimeDataModel = t
         this.errorFormat = r
      }
      createMessage(t) {
         let r = du({
            ...t,
            runtimeDataModel: this.runtimeDataModel,
            errorFormat: this.errorFormat,
         })
         return new Pn(r)
      }
      createBatch(t) {
         return t.map((r) => r.toEngineQuery())
      }
   },
   ym = {
      aggregate: !1,
      aggregateRaw: !1,
      createMany: !0,
      createOne: !0,
      deleteMany: !0,
      deleteOne: !0,
      executeRaw: !0,
      findFirst: !1,
      findFirstOrThrow: !1,
      findMany: !1,
      findRaw: !1,
      findUnique: !1,
      findUniqueOrThrow: !1,
      groupBy: !1,
      queryRaw: !1,
      runCommandRaw: !0,
      updateMany: !0,
      updateOne: !0,
      upsertOne: !0,
   },
   Pn = class {
      constructor(t) {
         this.query = t
      }
      isWrite() {
         return ym[this.query.action]
      }
      getBatchId() {
         if (this.query.action !== 'findUnique') return
         let t = []
         return (
            this.query.modelName && t.push(this.query.modelName),
            this.query.query.arguments &&
               t.push(Zi(this.query.query.arguments)),
            t.push(Zi(this.query.query.selection)),
            t.join('')
         )
      }
      toDebugString() {
         return JSON.stringify(this.query, null, 2)
      }
      toEngineQuery() {
         return this.query
      }
      deserializeResponse(t, r) {
         if (!t) return t
         let n = Object.values(t)[0],
            i = r.filter((o) => o !== 'select' && o !== 'include')
         return gn(ir(n, i))
      }
   }
function Zi(e) {
   return `(${Object.keys(e)
      .sort()
      .map((r) => {
         let n = e[r]
         return typeof n == 'object' && n !== null ? `(${r} ${Zi(n)})` : r
      })
      .join(' ')})`
}
var be = class {
   constructor(t, r) {
      if (t.length - 1 !== r.length)
         throw t.length === 0
            ? new TypeError('Expected at least 1 string')
            : new TypeError(
                 `Expected ${t.length} strings to have ${t.length - 1} values`,
              )
      let n = r.reduce((s, a) => s + (a instanceof be ? a.values.length : 1), 0)
      ;(this.values = new Array(n)),
         (this.strings = new Array(n + 1)),
         (this.strings[0] = t[0])
      let i = 0,
         o = 0
      for (; i < r.length; ) {
         let s = r[i++],
            a = t[i]
         if (s instanceof be) {
            this.strings[o] += s.strings[0]
            let u = 0
            for (; u < s.values.length; )
               (this.values[o++] = s.values[u++]),
                  (this.strings[o] = s.strings[u])
            this.strings[o] += a
         } else (this.values[o++] = s), (this.strings[o] = a)
      }
   }
   get text() {
      let t = 1,
         r = this.strings[0]
      for (; t < this.strings.length; ) r += `$${t}${this.strings[t++]}`
      return r
   }
   get sql() {
      let t = 1,
         r = this.strings[0]
      for (; t < this.strings.length; ) r += `?${this.strings[t++]}`
      return r
   }
   inspect() {
      return { text: this.text, sql: this.sql, values: this.values }
   }
}
function yu(e, t = ',', r = '', n = '') {
   if (e.length === 0)
      throw new TypeError(
         'Expected `join([])` to be called with an array of multiple elements, but got an empty array',
      )
   return new be([r, ...Array(e.length - 1).fill(t), n], e)
}
function Xi(e) {
   return new be([e], [])
}
var bu = Xi('')
function eo(e, ...t) {
   return new be(e, t)
}
var to = (e) => e.reduce((t, r, n) => `${t}@P${n}${r}`)
function Rt(e) {
   try {
      return wu(e, 'fast')
   } catch {
      return wu(e, 'slow')
   }
}
function wu(e, t) {
   return JSON.stringify(e.map((r) => bm(r, t)))
}
function bm(e, t) {
   return typeof e == 'bigint'
      ? { prisma__type: 'bigint', prisma__value: e.toString() }
      : ye(e)
      ? { prisma__type: 'date', prisma__value: e.toJSON() }
      : he.isDecimal(e)
      ? { prisma__type: 'decimal', prisma__value: e.toJSON() }
      : Buffer.isBuffer(e)
      ? { prisma__type: 'bytes', prisma__value: e.toString('base64') }
      : wm(e) || ArrayBuffer.isView(e)
      ? {
           prisma__type: 'bytes',
           prisma__value: Buffer.from(e).toString('base64'),
        }
      : typeof e == 'object' && t === 'slow'
      ? Eu(e)
      : e
}
function wm(e) {
   return e instanceof ArrayBuffer || e instanceof SharedArrayBuffer
      ? !0
      : typeof e == 'object' && e !== null
      ? e[Symbol.toStringTag] === 'ArrayBuffer' ||
        e[Symbol.toStringTag] === 'SharedArrayBuffer'
      : !1
}
function Eu(e) {
   if (typeof e != 'object' || e === null) return e
   if (typeof e.toJSON == 'function') return e.toJSON()
   if (Array.isArray(e)) return e.map(xu)
   let t = {}
   for (let r of Object.keys(e)) t[r] = xu(e[r])
   return t
}
function xu(e) {
   return typeof e == 'bigint' ? e.toString() : Eu(e)
}
var xm = /^(\s*alter\s)/i,
   Tu = B('prisma:client')
function ro(e, t, r) {
   if (t.length > 0 && xm.exec(e))
      throw new Error(`Running ALTER using ${r} is not supported
Using the example below you can still execute your query with Prisma, but please note that it is vulnerable to SQL injection attacks and requires you to take care of input sanitization.

Example:
  await prisma.$executeRawUnsafe(\`ALTER USER prisma WITH PASSWORD '\${password}'\`)

More Information: https://pris.ly/d/execute-raw
`)
}
function Em(e) {
   return Array.isArray(e)
}
var no =
   (e, t) =>
   ([r, ...n]) => {
      let i = '',
         o
      if (typeof r == 'string')
         (i = r),
            (o = { values: Rt(n || []), __prismaRawParameters__: !0 }),
            t.includes('executeRaw') &&
               ro(i, n, 'prisma.$executeRawUnsafe(<SQL>, [...values])')
      else if (Em(r))
         switch (e._activeProvider) {
            case 'sqlite':
            case 'mysql': {
               let s = new be(r, n)
               ;(i = s.sql),
                  (o = { values: Rt(s.values), __prismaRawParameters__: !0 })
               break
            }
            case 'cockroachdb':
            case 'postgresql': {
               let s = new be(r, n)
               ;(i = s.text),
                  t.includes('executeRaw') &&
                     ro(i, s.values, 'prisma.$executeRaw`<SQL>`'),
                  (o = { values: Rt(s.values), __prismaRawParameters__: !0 })
               break
            }
            case 'sqlserver': {
               ;(i = to(r)),
                  (o = { values: Rt(n), __prismaRawParameters__: !0 })
               break
            }
            default:
               throw new Error(
                  `The ${e._activeProvider} provider does not support ${t}`,
               )
         }
      else {
         switch (e._activeProvider) {
            case 'sqlite':
            case 'mysql':
               i = r.sql
               break
            case 'cockroachdb':
            case 'postgresql':
               ;(i = r.text),
                  t.includes('executeRaw') &&
                     ro(i, r.values, 'prisma.$executeRaw(sql`<SQL>`)')
               break
            case 'sqlserver':
               i = to(r.strings)
               break
            default:
               throw new Error(
                  `The ${e._activeProvider} provider does not support ${t}`,
               )
         }
         o = { values: Rt(r.values), __prismaRawParameters__: !0 }
      }
      return (
         o?.values
            ? Tu(`prisma.${t}(${i}, ${o.values})`)
            : Tu(`prisma.${t}(${i})`),
         { query: i, parameters: o }
      )
   }
var vu = {
      isEnabled() {
         return !1
      },
      getTraceParent() {
         return '00-10-10-00'
      },
      async createEngineSpan() {},
      getActiveContext() {},
      runInChildSpan(e, t) {
         return t()
      },
   },
   io = class {
      isEnabled() {
         return this.getGlobalTracingHelper().isEnabled()
      }
      getTraceParent(t) {
         return this.getGlobalTracingHelper().getTraceParent(t)
      }
      createEngineSpan(t) {
         return this.getGlobalTracingHelper().createEngineSpan(t)
      }
      getActiveContext() {
         return this.getGlobalTracingHelper().getActiveContext()
      }
      runInChildSpan(t, r) {
         return this.getGlobalTracingHelper().runInChildSpan(t, r)
      }
      getGlobalTracingHelper() {
         return globalThis.PRISMA_INSTRUMENTATION?.helper ?? vu
      }
   }
function Pu(e) {
   return e.includes('tracing') ? new io() : vu
}
function Mu(e, t = () => {}) {
   let r,
      n = new Promise((i) => (r = i))
   return {
      then(i) {
         return --e === 0 && r(t()), i?.(n)
      },
   }
}
function Fu(e) {
   return typeof e == 'string'
      ? e
      : e.reduce((t, r) => {
           let n = typeof r == 'string' ? r : r.level
           return n === 'query'
              ? t
              : t && (r === 'info' || t === 'info')
              ? 'info'
              : n
        }, void 0)
}
function Su(e, t, r) {
   let n = Cu(e, r),
      i = Cu(t, r),
      o = Object.values(i).map((a) => a[a.length - 1]),
      s = Object.keys(i)
   return (
      Object.entries(n).forEach(([a, u]) => {
         s.includes(a) || o.push(u[u.length - 1])
      }),
      o
   )
}
var Cu = (e, t) =>
   e.reduce((r, n) => {
      let i = t(n)
      return r[i] || (r[i] = []), r[i].push(n), r
   }, {})
var Mn = class {
   constructor() {
      this._middlewares = []
   }
   use(t) {
      this._middlewares.push(t)
   }
   get(t) {
      return this._middlewares[t]
   }
   has(t) {
      return !!this._middlewares[t]
   }
   length() {
      return this._middlewares.length
   }
}
var Ru = S(Qt())
function Fn(e) {
   return typeof e.batchRequestIdx == 'number'
}
function Au({ result: e, modelName: t, select: r, extensions: n }) {
   let i = n.getAllComputedFields(t)
   if (!i) return e
   let o = [],
      s = []
   for (let a of Object.values(i)) {
      if (r) {
         if (!r[a.name]) continue
         let u = a.needs.filter((l) => !r[l])
         u.length > 0 && s.push(Bi(u))
      }
      Tm(e, a.needs) && o.push(vm(a, Ze(e, o)))
   }
   return o.length > 0 || s.length > 0 ? Ze(e, [...o, ...s]) : e
}
function Tm(e, t) {
   return t.every((r) => ci(e, r))
}
function vm(e, t) {
   return st(Ye(e.name, () => e.compute(t)))
}
function Cn({
   visitor: e,
   result: t,
   args: r,
   runtimeDataModel: n,
   modelName: i,
}) {
   if (Array.isArray(t)) {
      for (let s = 0; s < t.length; s++)
         t[s] = Cn({
            result: t[s],
            args: r,
            modelName: i,
            runtimeDataModel: n,
            visitor: e,
         })
      return t
   }
   let o = e(t, i, r) ?? t
   return (
      r.include &&
         Ou({
            includeOrSelect: r.include,
            result: o,
            parentModelName: i,
            runtimeDataModel: n,
            visitor: e,
         }),
      r.select &&
         Ou({
            includeOrSelect: r.select,
            result: o,
            parentModelName: i,
            runtimeDataModel: n,
            visitor: e,
         }),
      o
   )
}
function Ou({
   includeOrSelect: e,
   result: t,
   parentModelName: r,
   runtimeDataModel: n,
   visitor: i,
}) {
   for (let [o, s] of Object.entries(e)) {
      if (!s || t[o] == null) continue
      let u = n.models[r].fields.find((c) => c.name === o)
      if (!u || u.kind !== 'object' || !u.relationName) continue
      let l = typeof s == 'object' ? s : {}
      t[o] = Cn({
         visitor: i,
         result: t[o],
         args: l,
         modelName: u.type,
         runtimeDataModel: n,
      })
   }
}
var Sn = class {
   constructor(t) {
      this.options = t
      this.tickActive = !1
      this.batches = {}
   }
   request(t) {
      let r = this.options.batchBy(t)
      return r
         ? (this.batches[r] ||
              ((this.batches[r] = []),
              this.tickActive ||
                 ((this.tickActive = !0),
                 process.nextTick(() => {
                    this.dispatchBatches(), (this.tickActive = !1)
                 }))),
           new Promise((n, i) => {
              this.batches[r].push({ request: t, resolve: n, reject: i })
           }))
         : this.options.singleLoader(t)
   }
   dispatchBatches() {
      for (let t in this.batches) {
         let r = this.batches[t]
         delete this.batches[t],
            r.length === 1
               ? this.options
                    .singleLoader(r[0].request)
                    .then((n) => {
                       n instanceof Error ? r[0].reject(n) : r[0].resolve(n)
                    })
                    .catch((n) => {
                       r[0].reject(n)
                    })
               : this.options
                    .batchLoader(r.map((n) => n.request))
                    .then((n) => {
                       if (n instanceof Error)
                          for (let i = 0; i < r.length; i++) r[i].reject(n)
                       else
                          for (let i = 0; i < r.length; i++) {
                             let o = n[i]
                             o instanceof Error
                                ? r[i].reject(o)
                                : r[i].resolve(o)
                          }
                    })
                    .catch((n) => {
                       for (let i = 0; i < r.length; i++) r[i].reject(n)
                    })
      }
   }
   get [Symbol.toStringTag]() {
      return 'DataLoader'
   }
}
var Pm = B('prisma:client:request_handler'),
   An = class {
      constructor(t, r) {
         ;(this.logEmitter = r),
            (this.client = t),
            (this.dataloader = new Sn({
               batchLoader: (n) => {
                  let {
                        transaction: i,
                        protocolEncoder: o,
                        otelParentCtx: s,
                     } = n[0],
                     a = o.createBatch(n.map((c) => c.protocolMessage)),
                     u = this.client._tracingHelper.getTraceParent(s),
                     l = n.some((c) => c.protocolMessage.isWrite())
                  return this.client._engine.requestBatch(a, {
                     traceparent: u,
                     transaction: Mm(i),
                     containsWrite: l,
                     customDataProxyFetch: n[0].customDataProxyFetch,
                  })
               },
               singleLoader: (n) => {
                  let i =
                     n.transaction?.kind === 'itx' ? $u(n.transaction) : void 0
                  return this.client._engine.request(
                     n.protocolMessage.toEngineQuery(),
                     {
                        traceparent:
                           this.client._tracingHelper.getTraceParent(),
                        interactiveTransaction: i,
                        isWrite: n.protocolMessage.isWrite(),
                        customDataProxyFetch: n.customDataProxyFetch,
                     },
                  )
               },
               batchBy: (n) =>
                  n.transaction?.id
                     ? `transaction-${n.transaction.id}`
                     : n.protocolMessage.getBatchId(),
            }))
      }
      async request({
         protocolMessage: t,
         protocolEncoder: r,
         dataPath: n = [],
         callsite: i,
         modelName: o,
         rejectOnNotFound: s,
         clientMethod: a,
         args: u,
         transaction: l,
         unpacker: c,
         extensions: p,
         otelParentCtx: f,
         otelChildCtx: m,
         customDataProxyFetch: d,
      }) {
         try {
            let g = await this.dataloader.request({
                  protocolMessage: t,
                  protocolEncoder: r,
                  transaction: l,
                  otelParentCtx: f,
                  otelChildCtx: m,
                  customDataProxyFetch: d,
               }),
               b = g?.data,
               h = g?.elapsed,
               x = this.unpack(t, b, n, c)
            return (
               Ga(x, a, o, s),
               o &&
                  (x = this.applyResultExtensions({
                     result: x,
                     modelName: o,
                     args: u,
                     extensions: p,
                  })),
               process.env.PRISMA_CLIENT_GET_TIME ? { data: x, elapsed: h } : x
            )
         } catch (g) {
            this.handleAndLogRequestError({
               error: g,
               clientMethod: a,
               callsite: i,
               transaction: l,
               args: u,
            })
         }
      }
      handleAndLogRequestError(t) {
         try {
            this.handleRequestError(t)
         } catch (r) {
            throw (
               (this.logEmitter &&
                  this.logEmitter.emit('error', {
                     message: r.message,
                     target: t.clientMethod,
                     timestamp: new Date(),
                  }),
               r)
            )
         }
      }
      handleRequestError({
         error: t,
         clientMethod: r,
         callsite: n,
         transaction: i,
         args: o,
      }) {
         if ((Pm(t), Fm(t, i) || t instanceof ve)) throw t
         if (t instanceof re && Cm(t)) {
            let a = Du(t.meta)
            vn({
               args: o,
               errors: [a],
               callsite: n,
               errorFormat: this.client._errorFormat,
               originalMethod: r,
            })
         }
         let s = t.message
         throw (
            (n &&
               (s = De({
                  callsite: n,
                  originalMethod: r,
                  isPanic: t.isPanic,
                  showColors: this.client._errorFormat === 'pretty',
                  message: s,
               })),
            (s = this.sanitizeMessage(s)),
            t.code
               ? new re(s, {
                    code: t.code,
                    clientVersion: this.client._clientVersion,
                    meta: t.meta,
                    batchRequestIdx: t.batchRequestIdx,
                 })
               : t.isPanic
               ? new ge(s, this.client._clientVersion)
               : t instanceof ne
               ? new ne(s, {
                    clientVersion: this.client._clientVersion,
                    batchRequestIdx: t.batchRequestIdx,
                 })
               : t instanceof Q
               ? new Q(s, this.client._clientVersion)
               : t instanceof ge
               ? new ge(s, this.client._clientVersion)
               : ((t.clientVersion = this.client._clientVersion), t))
         )
      }
      sanitizeMessage(t) {
         return this.client._errorFormat &&
            this.client._errorFormat !== 'pretty'
            ? (0, Ru.default)(t)
            : t
      }
      unpack(t, r, n, i) {
         if (!r) return r
         r.data && (r = r.data)
         let o = t.deserializeResponse(r, n)
         return i ? i(o) : o
      }
      applyResultExtensions({
         result: t,
         modelName: r,
         args: n,
         extensions: i,
      }) {
         return i.isEmpty() ||
            t == null ||
            !this.client._runtimeDataModel.models[r]
            ? t
            : Cn({
                 result: t,
                 args: n ?? {},
                 modelName: r,
                 runtimeDataModel: this.client._runtimeDataModel,
                 visitor(s, a, u) {
                    let l = Te(a)
                    return Au({
                       result: s,
                       modelName: l,
                       select: u.select,
                       extensions: i,
                    })
                 },
              })
      }
      get [Symbol.toStringTag]() {
         return 'RequestHandler'
      }
   }
function Mm(e) {
   if (!!e) {
      if (e.kind === 'batch')
         return { kind: 'batch', options: { isolationLevel: e.isolationLevel } }
      if (e.kind === 'itx') return { kind: 'itx', options: $u(e) }
      Le(e, 'Unknown transaction kind')
   }
}
function $u(e) {
   return { id: e.id, payload: e.payload }
}
function Fm(e, t) {
   return Fn(e) && t?.kind === 'batch' && e.batchRequestIdx !== t.index
}
function Cm(e) {
   return e.code === 'P2009' || e.code === 'P2012'
}
function Du(e) {
   if (e.kind === 'Union') return { kind: 'Union', errors: e.errors.map(Du) }
   if (Array.isArray(e.selectionPath)) {
      let [, ...t] = e.selectionPath
      return { ...e, selectionPath: t }
   }
   return e
}
function Iu(e) {
   return e.map((t) => {
      let r = {}
      for (let n of Object.keys(t)) r[n] = Nu(t[n])
      return r
   })
}
function Nu({ prisma__type: e, prisma__value: t }) {
   switch (e) {
      case 'bigint':
         return BigInt(t)
      case 'bytes':
         return Buffer.from(t, 'base64')
      case 'decimal':
         return new he(t)
      case 'datetime':
      case 'date':
         return new Date(t)
      case 'time':
         return new Date(`1970-01-01T${t}Z`)
      case 'array':
         return t.map(Nu)
      default:
         return t
   }
}
var ju = S(Br())
var ku = [
      'datasources',
      'errorFormat',
      'log',
      '__internal',
      'rejectOnNotFound',
   ],
   Lu = ['pretty', 'colorless', 'minimal'],
   _u = ['info', 'query', 'warn', 'error'],
   Sm = {
      datasources: (e, t) => {
         if (!!e) {
            if (typeof e != 'object' || Array.isArray(e))
               throw new H(
                  `Invalid value ${JSON.stringify(
                     e,
                  )} for "datasources" provided to PrismaClient constructor`,
               )
            for (let [r, n] of Object.entries(e)) {
               if (!t.includes(r)) {
                  let i = $t(r, t) || `Available datasources: ${t.join(', ')}`
                  throw new H(
                     `Unknown datasource ${r} provided to PrismaClient constructor.${i}`,
                  )
               }
               if (typeof n != 'object' || Array.isArray(n))
                  throw new H(`Invalid value ${JSON.stringify(
                     e,
                  )} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`)
               if (n && typeof n == 'object')
                  for (let [i, o] of Object.entries(n)) {
                     if (i !== 'url')
                        throw new H(`Invalid value ${JSON.stringify(
                           e,
                        )} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`)
                     if (typeof o != 'string')
                        throw new H(`Invalid value ${JSON.stringify(
                           o,
                        )} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`)
                  }
            }
         }
      },
      errorFormat: (e) => {
         if (!!e) {
            if (typeof e != 'string')
               throw new H(
                  `Invalid value ${JSON.stringify(
                     e,
                  )} for "errorFormat" provided to PrismaClient constructor.`,
               )
            if (!Lu.includes(e)) {
               let t = $t(e, Lu)
               throw new H(
                  `Invalid errorFormat ${e} provided to PrismaClient constructor.${t}`,
               )
            }
         }
      },
      log: (e) => {
         if (!e) return
         if (!Array.isArray(e))
            throw new H(
               `Invalid value ${JSON.stringify(
                  e,
               )} for "log" provided to PrismaClient constructor.`,
            )
         function t(r) {
            if (typeof r == 'string' && !_u.includes(r)) {
               let n = $t(r, _u)
               throw new H(
                  `Invalid log level "${r}" provided to PrismaClient constructor.${n}`,
               )
            }
         }
         for (let r of e) {
            t(r)
            let n = {
               level: t,
               emit: (i) => {
                  let o = ['stdout', 'event']
                  if (!o.includes(i)) {
                     let s = $t(i, o)
                     throw new H(
                        `Invalid value ${JSON.stringify(
                           i,
                        )} for "emit" in logLevel provided to PrismaClient constructor.${s}`,
                     )
                  }
               },
            }
            if (r && typeof r == 'object')
               for (let [i, o] of Object.entries(r))
                  if (n[i]) n[i](o)
                  else
                     throw new H(
                        `Invalid property ${i} for "log" provided to PrismaClient constructor`,
                     )
         }
      },
      __internal: (e) => {
         if (!e) return
         let t = ['debug', 'hooks', 'engine', 'measurePerformance']
         if (typeof e != 'object')
            throw new H(
               `Invalid value ${JSON.stringify(
                  e,
               )} for "__internal" to PrismaClient constructor`,
            )
         for (let [r] of Object.entries(e))
            if (!t.includes(r)) {
               let n = $t(r, t)
               throw new H(
                  `Invalid property ${JSON.stringify(
                     r,
                  )} for "__internal" provided to PrismaClient constructor.${n}`,
               )
            }
      },
      rejectOnNotFound: (e) => {
         if (!!e) {
            if (
               kt(e) ||
               typeof e == 'boolean' ||
               typeof e == 'object' ||
               typeof e == 'function'
            )
               return e
            throw new H(
               `Invalid rejectOnNotFound expected a boolean/Error/{[modelName: Error | boolean]} but received ${JSON.stringify(
                  e,
               )}`,
            )
         }
      },
   }
function qu(e, t) {
   for (let [r, n] of Object.entries(e)) {
      if (!ku.includes(r)) {
         let i = $t(r, ku)
         throw new H(
            `Unknown property ${r} provided to PrismaClient constructor.${i}`,
         )
      }
      Sm[r](n, t)
   }
}
function $t(e, t) {
   if (t.length === 0 || typeof e != 'string') return ''
   let r = Am(e, t)
   return r ? ` Did you mean "${r}"?` : ''
}
function Am(e, t) {
   if (t.length === 0) return null
   let r = t.map((i) => ({ value: i, distance: (0, ju.default)(e, i) }))
   r.sort((i, o) => (i.distance < o.distance ? -1 : 1))
   let n = r[0]
   return n.distance < 3 ? n.value : null
}
function Bu(e) {
   return e.length === 0
      ? Promise.resolve([])
      : new Promise((t, r) => {
           let n = new Array(e.length),
              i = null,
              o = !1,
              s = 0,
              a = () => {
                 o || (s++, s === e.length && ((o = !0), i ? r(i) : t(n)))
              },
              u = (l) => {
                 o || ((o = !0), r(l))
              }
           for (let l = 0; l < e.length; l++)
              e[l].then(
                 (c) => {
                    ;(n[l] = c), a()
                 },
                 (c) => {
                    if (!Fn(c)) {
                       u(c)
                       return
                    }
                    c.batchRequestIdx === l ? u(c) : (i || (i = c), a())
                 },
              )
        })
}
var Se = B('prisma:client')
typeof globalThis == 'object' && (globalThis.NODE_CLIENT = !0)
var Om = Symbol.for('prisma.client.transaction.id'),
   Rm = {
      id: 0,
      nextId() {
         return ++this.id
      },
   }
function Ju(e) {
   class t {
      constructor(n) {
         this._middlewares = new Mn()
         this._getDmmf = Rr(async (n) => {
            try {
               let i = await this._tracingHelper.runInChildSpan(
                  { name: 'getDmmf', internal: !0 },
                  () => this._engine.getDmmf(),
               )
               return this._tracingHelper.runInChildSpan(
                  { name: 'processDmmf', internal: !0 },
                  () => new We(qs(i)),
               )
            } catch (i) {
               this._fetcher.handleAndLogRequestError({
                  ...n,
                  args: {},
                  error: i,
               })
            }
         })
         this._getProtocolEncoder = Rr(async (n) =>
            this._engineConfig.engineProtocol === 'json'
               ? new cr(this._runtimeDataModel, this._errorFormat)
               : (this._dmmf === void 0 &&
                    (this._dmmf = await this._getDmmf(n)),
                 new dn(this._dmmf, this._errorFormat)),
         )
         this.$extends = Ha
         eu(e), n && qu(n, e.datasourceNames)
         let i = new Qu.EventEmitter().on('error', () => {})
         ;(this._extensions = et.empty()),
            (this._previewFeatures = e.generator?.previewFeatures ?? []),
            (this._rejectOnNotFound = n?.rejectOnNotFound),
            (this._clientVersion = e.clientVersion ?? pn),
            (this._activeProvider = e.activeProvider),
            (this._dataProxy = e.dataProxy),
            (this._tracingHelper = Pu(this._previewFeatures)),
            (this._clientEngineType = Qn(e.generator))
         let o = {
               rootEnvPath:
                  e.relativeEnvPaths.rootEnvPath &&
                  pr.default.resolve(e.dirname, e.relativeEnvPaths.rootEnvPath),
               schemaEnvPath:
                  e.relativeEnvPaths.schemaEnvPath &&
                  pr.default.resolve(
                     e.dirname,
                     e.relativeEnvPaths.schemaEnvPath,
                  ),
            },
            s = Nt(o, { conflictCheck: 'none' })
         try {
            let a = n ?? {},
               u = a.__internal ?? {},
               l = u.debug === !0
            l && B.enable('prisma:client')
            let c = pr.default.resolve(e.dirname, e.relativePath)
            Gu.default.existsSync(c) || (c = e.dirname),
               Se('dirname', e.dirname),
               Se('relativePath', e.relativePath),
               Se('cwd', c)
            let p = a.datasources || {},
               f = Object.entries(p)
                  .filter(([b, h]) => h && h.url)
                  .map(([b, { url: h }]) => ({ name: b, url: h })),
               m = Su([], f, (b) => b.name),
               d = u.engine || {}
            a.errorFormat
               ? (this._errorFormat = a.errorFormat)
               : process.env.NODE_ENV === 'production'
               ? (this._errorFormat = 'minimal')
               : process.env.NO_COLOR
               ? (this._errorFormat = 'colorless')
               : (this._errorFormat = 'colorless'),
               e.runtimeDataModel
                  ? (this._runtimeDataModel = e.runtimeDataModel)
                  : (this._runtimeDataModel = gs(e.document.datamodel))
            let g = Jn(e.generator)
            if (
               (Se('protocol', g),
               e.document && (this._dmmf = new We(e.document)),
               (this._engineConfig = {
                  cwd: c,
                  dirname: e.dirname,
                  enableDebugLogs: l,
                  allowTriggerPanic: d.allowTriggerPanic,
                  datamodelPath: pr.default.join(
                     e.dirname,
                     e.filename ?? 'schema.prisma',
                  ),
                  prismaPath: d.binaryPath ?? void 0,
                  engineEndpoint: d.endpoint,
                  datasources: m,
                  generator: e.generator,
                  showColors: this._errorFormat === 'pretty',
                  logLevel: a.log && Fu(a.log),
                  logQueries:
                     a.log &&
                     Boolean(
                        typeof a.log == 'string'
                           ? a.log === 'query'
                           : a.log.find((b) =>
                                typeof b == 'string'
                                   ? b === 'query'
                                   : b.level === 'query',
                             ),
                     ),
                  env: s?.parsed ?? e.injectableEdgeEnv?.parsed ?? {},
                  flags: [],
                  clientVersion: e.clientVersion,
                  previewFeatures: this._previewFeatures,
                  activeProvider: e.activeProvider,
                  inlineSchema: e.inlineSchema,
                  inlineDatasources: e.inlineDatasources,
                  inlineSchemaHash: e.inlineSchemaHash,
                  tracingHelper: this._tracingHelper,
                  logEmitter: i,
                  engineProtocol: g,
                  isBundled: e.isBundled,
               }),
               Se('clientVersion', e.clientVersion),
               Se(
                  'clientEngineType',
                  this._dataProxy ? 'dataproxy' : this._clientEngineType,
               ),
               this._dataProxy && Se('using Data Proxy with Node.js runtime'),
               (this._engine = this.getEngine()),
               (this._fetcher = new An(this, i)),
               a.log)
            )
               for (let b of a.log) {
                  let h =
                     typeof b == 'string'
                        ? b
                        : b.emit === 'stdout'
                        ? b.level
                        : null
                  h &&
                     this.$on(h, (x) => {
                        Ut.log(`${Ut.tags[h] ?? ''}`, x.message || x.query)
                     })
               }
            this._metrics = new bt(this._engine)
         } catch (a) {
            throw ((a.clientVersion = this._clientVersion), a)
         }
         return fn(this)
      }
      get [Symbol.toStringTag]() {
         return 'PrismaClient'
      }
      getEngine() {
         if ((this._dataProxy, this._clientEngineType === 'library'))
            return new rr(this._engineConfig)
         throw (
            (this._clientEngineType,
            'binary',
            new K(
               'Invalid client engine type, please use `library` or `binary`',
            ))
         )
      }
      $use(n) {
         this._middlewares.use(n)
      }
      $on(n, i) {
         n === 'beforeExit'
            ? this._engine.on('beforeExit', i)
            : this._engine.on(n, (o) => {
                 let s = o.fields
                 return i(
                    n === 'query'
                       ? {
                            timestamp: o.timestamp,
                            query: s?.query ?? o.query,
                            params: s?.params ?? o.params,
                            duration: s?.duration_ms ?? o.duration,
                            target: o.target,
                         }
                       : {
                            timestamp: o.timestamp,
                            message: s?.message ?? o.message,
                            target: o.target,
                         },
                 )
              })
      }
      $connect() {
         try {
            return this._engine.start()
         } catch (n) {
            throw ((n.clientVersion = this._clientVersion), n)
         }
      }
      async _runDisconnect() {
         await this._engine.stop(),
            delete this._connectionPromise,
            (this._engine = this.getEngine()),
            delete this._disconnectionPromise
      }
      async $disconnect() {
         try {
            await this._engine.stop()
         } catch (n) {
            throw ((n.clientVersion = this._clientVersion), n)
         } finally {
            So(), this._dataProxy || (this._dmmf = void 0)
         }
      }
      $executeRawInternal(n, i, o) {
         return this._request({
            action: 'executeRaw',
            args: o,
            transaction: n,
            clientMethod: i,
            argsMapper: no(this, i),
            callsite: Xe(this._errorFormat),
            dataPath: [],
         })
      }
      $executeRaw(n, ...i) {
         return Ie((o) => {
            if (n.raw !== void 0 || n.sql !== void 0)
               return this.$executeRawInternal(o, '$executeRaw', [n, ...i])
            throw new K(
               "`$executeRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executeraw\n",
            )
         })
      }
      $executeRawUnsafe(n, ...i) {
         return Ie((o) =>
            this.$executeRawInternal(o, '$executeRawUnsafe', [n, ...i]),
         )
      }
      $runCommandRaw(n) {
         if (e.activeProvider !== 'mongodb')
            throw new K(
               `The ${e.activeProvider} provider does not support $runCommandRaw. Use the mongodb provider.`,
            )
         return Ie((i) =>
            this._request({
               args: { command: n },
               clientMethod: '$runCommandRaw',
               dataPath: [],
               action: 'runCommandRaw',
               callsite: Xe(this._errorFormat),
               transaction: i,
            }),
         )
      }
      async $queryRawInternal(n, i, o) {
         return this._request({
            action: 'queryRaw',
            args: o,
            transaction: n,
            clientMethod: i,
            argsMapper: no(this, i),
            callsite: Xe(this._errorFormat),
            dataPath: [],
         }).then(Iu)
      }
      $queryRaw(n, ...i) {
         return Ie((o) => {
            if (n.raw !== void 0 || n.sql !== void 0)
               return this.$queryRawInternal(o, '$queryRaw', [n, ...i])
            throw new K(
               "`$queryRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw\n",
            )
         })
      }
      $queryRawUnsafe(n, ...i) {
         return Ie((o) =>
            this.$queryRawInternal(o, '$queryRawUnsafe', [n, ...i]),
         )
      }
      _transactionWithArray({ promises: n, options: i }) {
         let o = Rm.nextId(),
            s = Mu(n.length),
            a = n.map((u, l) => {
               if (u?.[Symbol.toStringTag] !== 'PrismaPromise')
                  throw new Error(
                     'All elements of the array need to be Prisma Client promises. Hint: Please make sure you are not awaiting the Prisma client calls you intended to pass in the $transaction function.',
                  )
               let c = i?.isolationLevel,
                  p = {
                     kind: 'batch',
                     id: o,
                     index: l,
                     isolationLevel: c,
                     lock: s,
                  }
               return u.requestTransaction?.(p) ?? u
            })
         return Bu(a)
      }
      async _transactionWithCallback({ callback: n, options: i }) {
         let o = { traceparent: this._tracingHelper.getTraceParent() },
            s = await this._engine.transaction('start', o, i),
            a
         try {
            let u = { kind: 'itx', ...s }
            ;(a = await n(oo(this, u))),
               await this._engine.transaction('commit', o, s)
         } catch (u) {
            throw (
               (await this._engine
                  .transaction('rollback', o, s)
                  .catch(() => {}),
               u)
            )
         }
         return a
      }
      $transaction(n, i) {
         let o
         typeof n == 'function'
            ? (o = () =>
                 this._transactionWithCallback({ callback: n, options: i }))
            : (o = () =>
                 this._transactionWithArray({ promises: n, options: i }))
         let s = { name: 'transaction', attributes: { method: '$transaction' } }
         return this._tracingHelper.runInChildSpan(s, o)
      }
      _request(n) {
         n.otelParentCtx = this._tracingHelper.getActiveContext()
         let i = {
               args: n.args,
               dataPath: n.dataPath,
               runInTransaction: Boolean(n.transaction),
               action: n.action,
               model: n.model,
            },
            o = {
               middleware: {
                  name: 'middleware',
                  middleware: !0,
                  attributes: { method: '$use' },
                  active: !1,
               },
               operation: {
                  name: 'operation',
                  attributes: {
                     method: i.action,
                     model: i.model,
                     name: `${i.model}.${i.action}`,
                  },
               },
            },
            s = -1,
            a = (u) => {
               let l = this._middlewares.get(++s)
               if (l)
                  return this._tracingHelper.runInChildSpan(o.middleware, (m) =>
                     l(u, (d) => (m?.end(), a(d))),
                  )
               let { runInTransaction: c, ...p } = u,
                  f = { ...n, ...p }
               return c || (f.transaction = void 0), Ya(this, f)
            }
         return this._tracingHelper.runInChildSpan(o.operation, () =>
            new Uu.AsyncResource('prisma-client-request').runInAsyncScope(() =>
               a(i),
            ),
         )
      }
      async _executeRequest({
         args: n,
         clientMethod: i,
         dataPath: o,
         callsite: s,
         action: a,
         model: u,
         argsMapper: l,
         transaction: c,
         unpacker: p,
         otelParentCtx: f,
         customDataProxyFetch: m,
      }) {
         try {
            let d = await this._getProtocolEncoder({
               clientMethod: i,
               callsite: s,
            })
            n = l ? l(n) : n
            let g = { name: 'serialize' },
               b
            u && ((b = Gi(a, u, n, this._rejectOnNotFound)), Dm(b, u, a))
            let h = this._tracingHelper.runInChildSpan(g, () =>
               d.createMessage({
                  modelName: u,
                  action: a,
                  args: n,
                  clientMethod: i,
                  callsite: s,
                  extensions: this._extensions,
               }),
            )
            return (
               B.enabled('prisma:client') &&
                  (Se('Prisma Client call:'),
                  Se(
                     `prisma.${i}(${rn({
                        ast: n,
                        keyPaths: [],
                        valuePaths: [],
                        missingItems: [],
                     })})`,
                  ),
                  Se('Generated request:'),
                  Se(
                     h.toDebugString() +
                        `
`,
                  )),
               c?.kind === 'batch' && (await c.lock),
               this._fetcher.request({
                  protocolMessage: h,
                  protocolEncoder: d,
                  modelName: u,
                  clientMethod: i,
                  dataPath: o,
                  rejectOnNotFound: b,
                  callsite: s,
                  args: n,
                  extensions: this._extensions,
                  transaction: c,
                  unpacker: p,
                  otelParentCtx: f,
                  otelChildCtx: this._tracingHelper.getActiveContext(),
                  customDataProxyFetch: m,
               })
            )
         } catch (d) {
            throw ((d.clientVersion = this._clientVersion), d)
         }
      }
      get $metrics() {
         if (!this._hasPreviewFlag('metrics'))
            throw new K(
               '`metrics` preview feature must be enabled in order to access metrics API',
            )
         return this._metrics
      }
      _hasPreviewFlag(n) {
         return !!this._engineConfig.previewFeatures?.includes(n)
      }
   }
   return t
}
var Vu = ['$connect', '$disconnect', '$on', '$transaction', '$use', '$extends']
function oo(e, t) {
   return typeof e != 'object'
      ? e
      : new Proxy(e, {
           get: (r, n) => {
              if (!Vu.includes(n))
                 return n === Om
                    ? t?.id
                    : typeof r[n] == 'function'
                    ? (...i) =>
                         n === 'then'
                            ? r[n](i[0], i[1], t)
                            : n === 'catch' || n === 'finally'
                            ? r[n](i[0], t)
                            : oo(r[n](...i), t)
                    : oo(r[n], t)
           },
           has(r, n) {
              return Vu.includes(n) ? !1 : Reflect.has(r, n)
           },
        })
}
var $m = { findUnique: 'findUniqueOrThrow', findFirst: 'findFirstOrThrow' }
function Dm(e, t, r) {
   if (e) {
      let n = $m[r],
         i = t ? `prisma.${Te(t)}.${n}` : `prisma.${n}`,
         o = `rejectOnNotFound.${t ?? ''}.${r}`
      Jt(
         o,
         `\`rejectOnNotFound\` option is deprecated and will be removed in Prisma 5. Please use \`${i}\` method instead`,
      )
   }
}
var Im = new Set([
   'toJSON',
   '$$typeof',
   'asymmetricMatch',
   Symbol.iterator,
   Symbol.toStringTag,
   Symbol.isConcatSpreadable,
   Symbol.toPrimitive,
])
function Ku(e) {
   return new Proxy(e, {
      get(t, r) {
         if (r in t) return t[r]
         if (!Im.has(r)) throw new TypeError(`Invalid enum value: ${String(r)}`)
      },
   })
}
var Wu = (e) => e
function Hu(e) {
   Nt(e, { conflictCheck: 'warn' })
}
0 &&
   (module.exports = {
      DMMF,
      DMMFClass,
      Debug,
      Decimal,
      Extensions,
      MetricsClient,
      NotFoundError,
      PrismaClientInitializationError,
      PrismaClientKnownRequestError,
      PrismaClientRustPanicError,
      PrismaClientUnknownRequestError,
      PrismaClientValidationError,
      Sql,
      Types,
      decompressFromBase64,
      defineDmmfProperty,
      empty,
      getPrismaClient,
      join,
      makeDocument,
      makeStrictEnum,
      objectEnumValues,
      raw,
      sqltag,
      transformDocument,
      unpack,
      warnEnvConflicts,
      warnOnce,
   })
/*!
 *  decimal.js v10.4.3
 *  An arbitrary-precision Decimal type for JavaScript.
 *  https://github.com/MikeMcl/decimal.js
 *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
 *  MIT Licence
 */
/*!
 * @description Recursive object extending
 * @author Viacheslav Lotsmanov <lotsmanov89@gmail.com>
 * @license MIT
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2013-2018 Viacheslav Lotsmanov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
//# sourceMappingURL=library.js.map
