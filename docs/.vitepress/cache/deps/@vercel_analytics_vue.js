import {
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  provide,
  reactive,
  ref,
  unref,
  watch,
  watchEffect
} from "./chunk-GKNP4RGU.js";

// node_modules/.pnpm/vue-router@4.6.4_vue@3.5.25_typescript@5.9.3_/node_modules/vue-router/dist/devtools-EWN81iOl.mjs
var isBrowser = typeof document !== "undefined";
var assign = Object.assign;
var noop = () => {
};
var isArray = Array.isArray;
function warn$1(msg) {
  const args = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + msg].concat(args));
}
function isSameRouteRecord(a, b) {
  return (a.aliasOf || a) === (b.aliasOf || b);
}
function isSameRouteLocationParams(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length) return false;
  for (var key in a) if (!isSameRouteLocationParamsValue(a[key], b[key])) return false;
  return true;
}
function isSameRouteLocationParamsValue(a, b) {
  return isArray(a) ? isEquivalentArray(a, b) : isArray(b) ? isEquivalentArray(b, a) : a?.valueOf() === b?.valueOf();
}
function isEquivalentArray(a, b) {
  return isArray(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
var NavigationType = (function(NavigationType$1) {
  NavigationType$1["pop"] = "pop";
  NavigationType$1["push"] = "push";
  return NavigationType$1;
})({});
var NavigationDirection = (function(NavigationDirection$1) {
  NavigationDirection$1["back"] = "back";
  NavigationDirection$1["forward"] = "forward";
  NavigationDirection$1["unknown"] = "";
  return NavigationDirection$1;
})({});
function isRouteLocation(route) {
  return typeof route === "string" || route && typeof route === "object";
}
var ErrorTypes = (function(ErrorTypes$1) {
  ErrorTypes$1[ErrorTypes$1["MATCHER_NOT_FOUND"] = 1] = "MATCHER_NOT_FOUND";
  ErrorTypes$1[ErrorTypes$1["NAVIGATION_GUARD_REDIRECT"] = 2] = "NAVIGATION_GUARD_REDIRECT";
  ErrorTypes$1[ErrorTypes$1["NAVIGATION_ABORTED"] = 4] = "NAVIGATION_ABORTED";
  ErrorTypes$1[ErrorTypes$1["NAVIGATION_CANCELLED"] = 8] = "NAVIGATION_CANCELLED";
  ErrorTypes$1[ErrorTypes$1["NAVIGATION_DUPLICATED"] = 16] = "NAVIGATION_DUPLICATED";
  return ErrorTypes$1;
})({});
var NavigationFailureSymbol = Symbol(true ? "navigation failure" : "");
var NavigationFailureType = (function(NavigationFailureType$1) {
  NavigationFailureType$1[NavigationFailureType$1["aborted"] = 4] = "aborted";
  NavigationFailureType$1[NavigationFailureType$1["cancelled"] = 8] = "cancelled";
  NavigationFailureType$1[NavigationFailureType$1["duplicated"] = 16] = "duplicated";
  return NavigationFailureType$1;
})({});
var ErrorTypeMessages = {
  [ErrorTypes.MATCHER_NOT_FOUND]({ location: location2, currentLocation }) {
    return `No match for
 ${JSON.stringify(location2)}${currentLocation ? "\nwhile being at\n" + JSON.stringify(currentLocation) : ""}`;
  },
  [ErrorTypes.NAVIGATION_GUARD_REDIRECT]({ from, to }) {
    return `Redirected from "${from.fullPath}" to "${stringifyRoute(to)}" via a navigation guard.`;
  },
  [ErrorTypes.NAVIGATION_ABORTED]({ from, to }) {
    return `Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard.`;
  },
  [ErrorTypes.NAVIGATION_CANCELLED]({ from, to }) {
    return `Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new navigation.`;
  },
  [ErrorTypes.NAVIGATION_DUPLICATED]({ from, to }) {
    return `Avoided redundant navigation to current location: "${from.fullPath}".`;
  }
};
var propertiesToLog = [
  "params",
  "query",
  "hash"
];
function stringifyRoute(to) {
  if (typeof to === "string") return to;
  if (to.path != null) return to.path;
  const location2 = {};
  for (const key of propertiesToLog) if (key in to) location2[key] = to[key];
  return JSON.stringify(location2, null, 2);
}
var matchedRouteKey = Symbol(true ? "router view location matched" : "");
var viewDepthKey = Symbol(true ? "router view depth" : "");
var routerKey = Symbol(true ? "router" : "");
var routeLocationKey = Symbol(true ? "route location" : "");
var routerViewLocationKey = Symbol(true ? "router view location" : "");

// node_modules/.pnpm/vue-router@4.6.4_vue@3.5.25_typescript@5.9.3_/node_modules/vue-router/dist/vue-router.mjs
var TokenType = (function(TokenType$1) {
  TokenType$1[TokenType$1["Static"] = 0] = "Static";
  TokenType$1[TokenType$1["Param"] = 1] = "Param";
  TokenType$1[TokenType$1["Group"] = 2] = "Group";
  return TokenType$1;
})({});
var TokenizerState = (function(TokenizerState$1) {
  TokenizerState$1[TokenizerState$1["Static"] = 0] = "Static";
  TokenizerState$1[TokenizerState$1["Param"] = 1] = "Param";
  TokenizerState$1[TokenizerState$1["ParamRegExp"] = 2] = "ParamRegExp";
  TokenizerState$1[TokenizerState$1["ParamRegExpEnd"] = 3] = "ParamRegExpEnd";
  TokenizerState$1[TokenizerState$1["EscapeNext"] = 4] = "EscapeNext";
  return TokenizerState$1;
})(TokenizerState || {});
var ROOT_TOKEN = {
  type: TokenType.Static,
  value: ""
};
var PathScore = (function(PathScore$1) {
  PathScore$1[PathScore$1["_multiplier"] = 10] = "_multiplier";
  PathScore$1[PathScore$1["Root"] = 90] = "Root";
  PathScore$1[PathScore$1["Segment"] = 40] = "Segment";
  PathScore$1[PathScore$1["SubSegment"] = 30] = "SubSegment";
  PathScore$1[PathScore$1["Static"] = 40] = "Static";
  PathScore$1[PathScore$1["Dynamic"] = 20] = "Dynamic";
  PathScore$1[PathScore$1["BonusCustomRegExp"] = 10] = "BonusCustomRegExp";
  PathScore$1[PathScore$1["BonusWildcard"] = -50] = "BonusWildcard";
  PathScore$1[PathScore$1["BonusRepeatable"] = -20] = "BonusRepeatable";
  PathScore$1[PathScore$1["BonusOptional"] = -8] = "BonusOptional";
  PathScore$1[PathScore$1["BonusStrict"] = 0.7000000000000001] = "BonusStrict";
  PathScore$1[PathScore$1["BonusCaseSensitive"] = 0.25] = "BonusCaseSensitive";
  return PathScore$1;
})(PathScore || {});
function useLink(props) {
  const router = inject(routerKey);
  const currentRoute = inject(routeLocationKey);
  let hasPrevious = false;
  let previousTo = null;
  const route = computed(() => {
    const to = unref(props.to);
    if (!hasPrevious || to !== previousTo) {
      if (!isRouteLocation(to)) if (hasPrevious) warn$1(`Invalid value for prop "to" in useLink()
- to:`, to, `
- previous to:`, previousTo, `
- props:`, props);
      else warn$1(`Invalid value for prop "to" in useLink()
- to:`, to, `
- props:`, props);
      previousTo = to;
      hasPrevious = true;
    }
    return router.resolve(to);
  });
  const activeRecordIndex = computed(() => {
    const { matched } = route.value;
    const { length } = matched;
    const routeMatched = matched[length - 1];
    const currentMatched = currentRoute.matched;
    if (!routeMatched || !currentMatched.length) return -1;
    const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
    if (index > -1) return index;
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index;
  });
  const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
  const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
  function navigate(e = {}) {
    if (guardEvent(e)) {
      const p = router[unref(props.replace) ? "replace" : "push"](unref(props.to)).catch(noop);
      if (props.viewTransition && typeof document !== "undefined" && "startViewTransition" in document) document.startViewTransition(() => p);
      return p;
    }
    return Promise.resolve();
  }
  if (isBrowser) {
    const instance = getCurrentInstance();
    if (instance) {
      const linkContextDevtools = {
        route: route.value,
        isActive: isActive.value,
        isExactActive: isExactActive.value,
        error: null
      };
      instance.__vrl_devtools = instance.__vrl_devtools || [];
      instance.__vrl_devtools.push(linkContextDevtools);
      watchEffect(() => {
        linkContextDevtools.route = route.value;
        linkContextDevtools.isActive = isActive.value;
        linkContextDevtools.isExactActive = isExactActive.value;
        linkContextDevtools.error = isRouteLocation(unref(props.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return {
    route,
    href: computed(() => route.value.href),
    isActive,
    isExactActive,
    navigate
  };
}
function preferSingleVNode(vnodes) {
  return vnodes.length === 1 ? vnodes[0] : vnodes;
}
var RouterLinkImpl = defineComponent({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    },
    viewTransition: Boolean
  },
  useLink,
  setup(props, { slots }) {
    const link = reactive(useLink(props));
    const { options } = inject(routerKey);
    const elClass = computed(() => ({
      [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
      [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
    }));
    return () => {
      const children = slots.default && preferSingleVNode(slots.default(link));
      return props.custom ? children : h("a", {
        "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
        href: link.href,
        onClick: link.navigate,
        class: elClass.value
      }, children);
    };
  }
});
function guardEvent(e) {
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
  if (e.defaultPrevented) return;
  if (e.button !== void 0 && e.button !== 0) return;
  if (e.currentTarget && e.currentTarget.getAttribute) {
    const target = e.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target)) return;
  }
  if (e.preventDefault) e.preventDefault();
  return true;
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key];
    const outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue) return false;
    } else if (!isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value.valueOf() !== outerValue[i].valueOf())) return false;
  }
  return true;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
var getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
var RouterViewImpl = defineComponent({
  name: "RouterView",
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  compatConfig: { MODE: 3 },
  setup(props, { attrs, slots }) {
    warnDeprecatedUsage();
    const injectedRoute = inject(routerViewLocationKey);
    const routeToDisplay = computed(() => props.route || injectedRoute.value);
    const injectedDepth = inject(viewDepthKey, 0);
    const depth = computed(() => {
      let initialDepth = unref(injectedDepth);
      const { matched } = routeToDisplay.value;
      let matchedRoute;
      while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) initialDepth++;
      return initialDepth;
    });
    const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth.value]);
    provide(viewDepthKey, computed(() => depth.value + 1));
    provide(matchedRouteKey, matchedRouteRef);
    provide(routerViewLocationKey, routeToDisplay);
    const viewRef = ref();
    watch(() => [
      viewRef.value,
      matchedRouteRef.value,
      props.name
    ], ([instance, to, name2], [oldInstance, from, oldName]) => {
      if (to) {
        to.instances[name2] = instance;
        if (from && from !== to && instance && instance === oldInstance) {
          if (!to.leaveGuards.size) to.leaveGuards = from.leaveGuards;
          if (!to.updateGuards.size) to.updateGuards = from.updateGuards;
        }
      }
      if (instance && to && (!from || !isSameRouteRecord(to, from) || !oldInstance)) (to.enterCallbacks[name2] || []).forEach((callback) => callback(instance));
    }, { flush: "post" });
    return () => {
      const route = routeToDisplay.value;
      const currentName = props.name;
      const matchedRoute = matchedRouteRef.value;
      const ViewComponent = matchedRoute && matchedRoute.components[currentName];
      if (!ViewComponent) return normalizeSlot(slots.default, {
        Component: ViewComponent,
        route
      });
      const routePropsOption = matchedRoute.props[currentName];
      const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
      const onVnodeUnmounted = (vnode) => {
        if (vnode.component.isUnmounted) matchedRoute.instances[currentName] = null;
      };
      const component = h(ViewComponent, assign({}, routeProps, attrs, {
        onVnodeUnmounted,
        ref: viewRef
      }));
      if (isBrowser && component.ref) {
        const info = {
          depth: depth.value,
          name: matchedRoute.name,
          path: matchedRoute.path,
          meta: matchedRoute.meta
        };
        (isArray(component.ref) ? component.ref.map((r) => r.i) : [component.ref.i]).forEach((instance) => {
          instance.__vrv_devtools = info;
        });
      }
      return normalizeSlot(slots.default, {
        Component: component,
        route
      }) || component;
    };
  }
});
function normalizeSlot(slot, data) {
  if (!slot) return null;
  const slotContent = slot(data);
  return slotContent.length === 1 ? slotContent[0] : slotContent;
}
function warnDeprecatedUsage() {
  const instance = getCurrentInstance();
  const parentName = instance.parent && instance.parent.type.name;
  const parentSubTreeType = instance.parent && instance.parent.subTree && instance.parent.subTree.type;
  if (parentName && (parentName === "KeepAlive" || parentName.includes("Transition")) && typeof parentSubTreeType === "object" && parentSubTreeType.name === "RouterView") {
    const comp = parentName === "KeepAlive" ? "keep-alive" : "transition";
    warn$1(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${comp}>
    <component :is="Component" />
  </${comp}>
</router-view>`);
  }
}
function useRoute(_name) {
  return inject(routeLocationKey);
}

// node_modules/.pnpm/@vercel+analytics@1.6.1_vue-router@4.6.4_vue@3.5.25_typescript@5.9.3___vue@3.5.25_typescript@5.9.3_/node_modules/@vercel/analytics/dist/vue/index.mjs
var name = "@vercel/analytics";
var version = "1.6.1";
var initQueue = () => {
  if (window.va) return;
  window.va = function a(...params) {
    (window.vaq = window.vaq || []).push(params);
  };
};
function isBrowser2() {
  return typeof window !== "undefined";
}
function detectEnvironment() {
  try {
    const env = "development";
    if (env === "development" || env === "test") {
      return "development";
    }
  } catch (e) {
  }
  return "production";
}
function setMode(mode = "auto") {
  if (mode === "auto") {
    window.vam = detectEnvironment();
    return;
  }
  window.vam = mode;
}
function getMode() {
  const mode = isBrowser2() ? window.vam : detectEnvironment();
  return mode || "production";
}
function isDevelopment() {
  return getMode() === "development";
}
function computeRoute(pathname, pathParams) {
  if (!pathname || !pathParams) {
    return pathname;
  }
  let result = pathname;
  try {
    const entries = Object.entries(pathParams);
    for (const [key, value] of entries) {
      if (!Array.isArray(value)) {
        const matcher = turnValueToRegExp(value);
        if (matcher.test(result)) {
          result = result.replace(matcher, `/[${key}]`);
        }
      }
    }
    for (const [key, value] of entries) {
      if (Array.isArray(value)) {
        const matcher = turnValueToRegExp(value.join("/"));
        if (matcher.test(result)) {
          result = result.replace(matcher, `/[...${key}]`);
        }
      }
    }
    return result;
  } catch (e) {
    return pathname;
  }
}
function turnValueToRegExp(value) {
  return new RegExp(`/${escapeRegExp(value)}(?=[/?#]|$)`);
}
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function getScriptSrc(props) {
  if (props.scriptSrc) {
    return props.scriptSrc;
  }
  if (isDevelopment()) {
    return "https://va.vercel-scripts.com/v1/script.debug.js";
  }
  if (props.basePath) {
    return `${props.basePath}/insights/script.js`;
  }
  return "/_vercel/insights/script.js";
}
function inject2(props = {
  debug: true
}) {
  var _a;
  if (!isBrowser2()) return;
  setMode(props.mode);
  initQueue();
  if (props.beforeSend) {
    (_a = window.va) == null ? void 0 : _a.call(window, "beforeSend", props.beforeSend);
  }
  const src = getScriptSrc(props);
  if (document.head.querySelector(`script[src*="${src}"]`)) return;
  const script = document.createElement("script");
  script.src = src;
  script.defer = true;
  script.dataset.sdkn = name + (props.framework ? `/${props.framework}` : "");
  script.dataset.sdkv = version;
  if (props.disableAutoTrack) {
    script.dataset.disableAutoTrack = "1";
  }
  if (props.endpoint) {
    script.dataset.endpoint = props.endpoint;
  } else if (props.basePath) {
    script.dataset.endpoint = `${props.basePath}/insights`;
  }
  if (props.dsn) {
    script.dataset.dsn = props.dsn;
  }
  script.onerror = () => {
    const errorMessage = isDevelopment() ? "Please check if any ad blockers are enabled and try again." : "Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";
    console.log(
      `[Vercel Web Analytics] Failed to load script from ${src}. ${errorMessage}`
    );
  };
  if (isDevelopment() && props.debug === false) {
    script.dataset.debug = "false";
  }
  document.head.appendChild(script);
}
function pageview({
  route,
  path
}) {
  var _a;
  (_a = window.va) == null ? void 0 : _a.call(window, "pageview", { route, path });
}
function getBasePath() {
  try {
    return import.meta.env.VITE_VERCEL_OBSERVABILITY_BASEPATH;
  } catch {
  }
}
function createComponent(framework = "vue") {
  return defineComponent({
    props: ["dsn", "beforeSend", "debug", "scriptSrc", "endpoint", "mode"],
    setup(props) {
      const route = useRoute();
      inject2({
        ...props,
        basePath: getBasePath(),
        // keep auto-tracking unless we have route support (Nuxt or vue-router).
        disableAutoTrack: Boolean(route),
        framework
      });
      if (route && typeof window !== "undefined") {
        const changeRoute = () => {
          pageview({
            route: computeRoute(route.path, route.params),
            path: route.path
          });
        };
        changeRoute();
        watch(route, changeRoute);
      }
    },
    // Vue component must have a render function, or a template.
    render() {
      return null;
    }
  });
}
var Analytics = createComponent();
export {
  Analytics
};
//# sourceMappingURL=@vercel_analytics_vue.js.map
