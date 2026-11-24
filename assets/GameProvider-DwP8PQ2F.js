import{n as e,t}from"./rolldown-runtime-WkwZ5CU-.js";var n=t((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.for(`react.view_transition`),m=Symbol.iterator;function h(e){return typeof e!=`object`||!e?null:(e=m&&e[m]||e[`@@iterator`],typeof e==`function`?e:null)}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_=Object.assign,v={};function y(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function b(){}b.prototype=y.prototype;function x(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}var S=x.prototype=new b;S.constructor=x,_(S,y.prototype),S.isPureReactComponent=!0;var C=Array.isArray;function w(){}var T={H:null,A:null,T:null,S:null},ee=Object.prototype.hasOwnProperty;function te(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function E(e,t){return te(e.type,t,e.props)}function D(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function ne(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var O=/\/+/g;function k(e,t){return typeof e==`object`&&e&&e.key!=null?ne(``+e.key):t.toString(36)}function A(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(w,w):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function j(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,j(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+k(e,0):a,C(o)?(i=``,c!=null&&(i=c.replace(O,`$&/`)+`/`),j(o,r,i,``,function(e){return e})):o!=null&&(D(o)&&(o=E(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(O,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(C(e))for(var u=0;u<e.length;u++)a=e[u],s=l+k(a,u),c+=j(a,r,i,s,o);else if(u=h(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+k(a,u++),c+=j(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return j(A(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function M(e,t,n){if(e==null)return e;var r=[],i=0;return j(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function N(e){if(e._status===-1){var t=e._result,n=t();n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t,n.status===void 0&&(n.status=`fulfilled`,n.value=t))},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t,n.status===void 0&&(n.status=`rejected`,n.reason=t))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var re=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)};function ie(e){var t=T.T,n={};n.types=t===null?null:t.types,T.T=n;try{var r=e(),i=T.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(w,re)}catch(e){re(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),T.T=t}}function ae(e){var t=T.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else ie(ae.bind(null,e))}var oe={map:M,forEach:function(e,t,n){M(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return M(e,function(){t++}),t},toArray:function(e){return M(e,function(e){return e})||[]},only:function(e){if(!D(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=oe,e.Component=y,e.Fragment=r,e.Profiler=a,e.PureComponent=x,e.StrictMode=i,e.Suspense=l,e.ViewTransition=p,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=T,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return T.H.useMemoCache(e)}},e.addTransitionType=ae,e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=_({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!ee.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return te(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)ee.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return te(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=D,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:N}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=ie,e.unstable_useCacheRefresh=function(){return T.H.useCacheRefresh()},e.use=function(e){return T.H.use(e)},e.useActionState=function(e,t,n){return T.H.useActionState(e,t,n)},e.useCallback=function(e,t){return T.H.useCallback(e,t)},e.useContext=function(e){return T.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return T.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return T.H.useEffect(e,t)},e.useEffectEvent=function(e){return T.H.useEffectEvent(e)},e.useId=function(){return T.H.useId()},e.useImperativeHandle=function(e,t,n){return T.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return T.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return T.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return T.H.useMemo(e,t)},e.useOptimistic=function(e,t){return T.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return T.H.useReducer(e,t,n)},e.useRef=function(e){return T.H.useRef(e)},e.useState=function(e){return T.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return T.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return T.H.useTransition()},e.version=`19.3.1`})),r=t(((e,t)=>{t.exports=n()})),i=t((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),a=t(((e,t)=>{t.exports=i()})),o=e(r(),1),s=o.createContext(null);function c(e){return o.useContext(s)}function l(e){let t=c();return o.useCallback(n=>t.navigate({...n,from:n.from??e?.from}),[e?.from,t])}function u(e){var t,n,r=``;if(typeof e==`string`||typeof e==`number`)r+=e;else if(typeof e==`object`){if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(n=u(e[t]))&&(r&&(r+=` `),r+=n)}else for(n in e)e[n]&&(r&&(r+=` `),r+=n)}return r}function d(){for(var e,t,n=0,r=``,i=arguments.length;n<i;n++)(e=arguments[n])&&(t=u(e))&&(r&&(r+=` `),r+=t);return r}var f=(e,t)=>{let n=Array(e.length+t.length);for(let t=0;t<e.length;t++)n[t]=e[t];for(let r=0;r<t.length;r++)n[e.length+r]=t[r];return n},p=(e,t)=>({classGroupId:e,validator:t}),m=(e=new Map,t=null,n)=>({nextPart:e,validators:t,classGroupId:n}),h=`-`,g=[],_=`arbitrary..`,v=e=>{let t=x(e),{conflictingClassGroups:n,conflictingClassGroupModifiers:r}=e;return{getClassGroupId:e=>{if(e.startsWith(`[`)&&e.endsWith(`]`))return b(e);let n=e.split(h);return y(n,+(n[0]===``&&n.length>1),t)},getConflictingClassGroupIds:(e,t)=>{if(t){let t=r[e],i=n[e];return t?i?f(i,t):t:i||g}return n[e]||g}}},y=(e,t,n)=>{if(e.length-t===0)return n.classGroupId;let r=e[t],i=n.nextPart.get(r);if(i){let n=y(e,t+1,i);if(n)return n}let a=n.validators;if(a===null)return;let o=t===0?e.join(h):e.slice(t).join(h),s=a.length;for(let e=0;e<s;e++){let t=a[e];if(t.validator(o))return t.classGroupId}},b=e=>e.slice(1,-1).indexOf(`:`)===-1?void 0:(()=>{let t=e.slice(1,-1),n=t.indexOf(`:`),r=t.slice(0,n);return r?_+r:void 0})(),x=e=>{let{theme:t,classGroups:n}=e;return S(n,t)},S=(e,t)=>{let n=m();for(let r in e){let i=e[r];C(i,n,r,t)}return n},C=(e,t,n,r)=>{let i=e.length;for(let a=0;a<i;a++){let i=e[a];w(i,t,n,r)}},w=(e,t,n,r)=>{typeof e==`string`?T(e,t,n):typeof e==`function`?ee(e,t,n,r):te(e,t,n,r)},T=(e,t,n)=>{let r=e===``?t:E(t,e);r.classGroupId=n},ee=(e,t,n,r)=>{D(e)?C(e(r),t,n,r):(t.validators===null&&(t.validators=[]),t.validators.push(p(n,e)))},te=(e,t,n,r)=>{let i=Object.entries(e),a=i.length;for(let e=0;e<a;e++){let[a,o]=i[e];C(o,E(t,a),n,r)}},E=(e,t)=>{let n=e,r=t.split(h),i=r.length;for(let e=0;e<i;e++){let t=r[e],i=n.nextPart.get(t);i||(i=m(),n.nextPart.set(t,i)),n=i}return n},D=e=>`isThemeGetter`in e&&e.isThemeGetter===!0,ne=e=>{if(e<1)return{get:()=>void 0,set:()=>{}};let t=0,n=Object.create(null),r=Object.create(null),i=(i,a)=>{n[i]=a,t++,t>e&&(t=0,r=n,n=Object.create(null))};return{get(e){let t=n[e];if(t!==void 0)return t;if((t=r[e])!==void 0)return i(e,t),t},set(e,t){e in n?n[e]=t:i(e,t)}}},O=`!`,k=`:`,A=[],j=(e,t,n,r,i)=>({modifiers:e,hasImportantModifier:t,baseClassName:n,maybePostfixModifierPosition:r,isExternal:i}),M=e=>{let{prefix:t,experimentalParseClassName:n}=e,r=e=>{let t=[],n=0,r=0,i=0,a,o=e.length;for(let s=0;s<o;s++){let c=e[s];if(n===0&&r===0){if(c===k){t.push(e.slice(i,s)),i=s+1;continue}if(c===`/`){a=s;continue}}if(c===`[`)n++;else if(c===`]`)n--;else if(c===`(`)r++;else if(c===`)`)r--;else if(c===`\\`)s++;else if(c===`"`||c===`'`)for(;++s<o;){let t=e[s];if(t===`\\`)s++;else if(t===c)break}}let s=t.length===0?e:e.slice(i),c=s,l=!1;s.endsWith(O)?(c=s.slice(0,-1),l=!0):s.startsWith(O)&&(c=s.slice(1),l=!0);let u=l&&s.startsWith(O)?1:0,d=a&&a>i?a-i-u:void 0;return j(t,l,c,d)};if(t){let e=t+k,n=r;r=t=>t.startsWith(e)?n(t.slice(e.length)):j(A,!1,t,void 0,!0)}if(n){let e=r;r=t=>n({className:t,parseClassName:e})}return r},N=e=>{let t=new Map;return e.orderSensitiveModifiers.forEach((e,n)=>{t.set(e,1e6+n)}),e=>{let n=[],r=[];for(let i=0;i<e.length;i++){let a=e[i],o=a[0]===`[`,s=t.has(a);o||s?(r.length>0&&(r.sort(),n.push(...r),r=[]),n.push(a)):r.push(a)}return r.length>0&&(r.sort(),n.push(...r)),n}},re=e=>({cache:ne(e.cacheSize),parseClassName:M(e),sortModifiers:N(e),postfixLookupClassGroupIds:ie(e),...v(e)}),ie=e=>{let t=Object.create(null),n=e.postfixLookupClassGroups;if(n)for(let e=0;e<n.length;e++)t[n[e]]=!0;return t},ae=/\s+/,oe=(e,t)=>{let{parseClassName:n,getClassGroupId:r,getConflictingClassGroupIds:i,sortModifiers:a,postfixLookupClassGroupIds:o}=t,s=[],c=e.trim().split(ae),l=``;for(let e=c.length-1;e>=0;--e){let t=c[e],{isExternal:u,modifiers:d,hasImportantModifier:f,baseClassName:p,maybePostfixModifierPosition:m}=n(t);if(u){l=t+(l.length>0?` `+l:l);continue}let h=!!m,g;if(h){g=r(p.substring(0,m));let e=g&&o[g]?r(p):void 0;e&&e!==g&&(g=e,h=!1)}else g=r(p);if(!g){if(!h||(g=r(p),!g)){l=t+(l.length>0?` `+l:l);continue}h=!1}let _=d.length===0?``:d.length===1?d[0]:a(d).join(`:`),v=f?_+O:_,y=v+g;if(s.indexOf(y)>-1)continue;s.push(y);let b=i(g,h);for(let e=0;e<b.length;++e){let t=b[e];s.push(v+t)}l=t+(l.length>0?` `+l:l)}return l},P=(...e)=>{let t=0,n,r,i=``;for(;t<e.length;)(n=e[t++])&&(r=F(n))&&(i&&(i+=` `),i+=r);return i},F=e=>{if(typeof e==`string`)return e;let t,n=``;for(let r=0;r<e.length;r++)e[r]&&(t=F(e[r]))&&(n&&(n+=` `),n+=t);return n},se=(e,...t)=>{let n,r,i,a,o=o=>(n=re(t.reduce((e,t)=>t(e),e())),r=n.cache.get,i=n.cache.set,a=s,s(o)),s=e=>{let t=r(e);if(t)return t;let a=oe(e,n);return i(e,a),a};return a=o,(...e)=>a(P(...e))},ce=[],I=e=>{let t=t=>t[e]||ce;return t.isThemeGetter=!0,t.themeKey=e,t},L=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,le=/^\((?:(\w[\w-]*):)?(.+)\)$/i,ue=/^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,de=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,fe=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|Q|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^--spacing\(.+\)|^0$/,R=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark|contrast-color|device-cmyk|--alpha)\(.+\)$/i,pe=/^(?:_*[+-]?(?:\d|\.\d)|[\w-]+\(|_*(?:inherit|initial|revert(?:-layer)?|unset)_*$)/i,me=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,he=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,z=e=>ue.test(e),B=e=>!!e&&!Number.isNaN(Number(e)),V=e=>!!e&&Number.isInteger(Number(e)),ge=e=>e.endsWith(`%`)&&B(e.slice(0,-1)),H=e=>de.test(e),_e=()=>!0,ve=e=>fe.test(e)&&!R.test(e),ye=e=>pe.test(e)&&!R.test(e),be=()=>!1,xe=e=>me.test(e),Se=e=>he.test(e),Ce=e=>!U(e)&&!G(e),we=e=>e.startsWith(`@container`)&&(e[10]===`/`&&e[11]!==void 0||e[11]===`s`&&e[16]!==void 0&&e.startsWith(`-size/`,10)||e[11]===`n`&&e[18]!==void 0&&e.startsWith(`-normal/`,10)),Te=e=>K(e,Ue,be),U=e=>L.test(e),W=e=>K(e,We,ve),Ee=e=>K(e,Ge,ye),De=e=>K(e,Ke,B),Oe=e=>K(e,Je,_e),ke=e=>K(e,qe,be),Ae=e=>K(e,Ve,be),je=e=>K(e,He,Se),Me=e=>K(e,Ye,xe),G=e=>le.test(e),Ne=e=>q(e,We),Pe=e=>q(e,Ge,!0),Fe=e=>q(e,qe),Ie=e=>q(e,Ve),Le=e=>q(e,Ue),Re=e=>q(e,He),ze=e=>q(e,Ye,!0),Be=e=>q(e,Je,!0),K=(e,t,n)=>{let r=L.exec(e);return r?r[1]?t(r[1]):n(r[2]):!1},q=(e,t,n=!1)=>{let r=le.exec(e);return r?r[1]?t(r[1]):n:!1},Ve=e=>e===`position`||e===`percentage`,He=e=>e===`image`||e===`url`,Ue=e=>e===`length`||e===`size`||e===`bg-size`,We=e=>e===`length`,Ge=e=>e!==`color`,Ke=e=>e===`number`,qe=e=>e===`family-name`,Je=e=>e===`number`||e===`weight`,Ye=e=>e===`shadow`,Xe=se(()=>{let e=I(`color`),t=I(`font`),n=I(`text`),r=I(`font-weight`),i=I(`tracking`),a=I(`leading`),o=I(`breakpoint`),s=I(`container`),c=I(`spacing`),l=I(`radius`),u=I(`shadow`),d=I(`inset-shadow`),f=I(`text-shadow`),p=I(`drop-shadow`),m=I(`blur`),h=I(`perspective`),g=I(`aspect`),_=I(`ease`),v=I(`animate`),y=()=>[`auto`,`avoid`,`all`,`avoid-page`,`page`,`left`,`right`,`column`],b=()=>[`center`,`top`,`bottom`,`left`,`right`,`top-left`,`left-top`,`top-right`,`right-top`,`bottom-right`,`right-bottom`,`bottom-left`,`left-bottom`],x=()=>[...b(),G,U],S=()=>[`auto`,`hidden`,`clip`,`visible`,`scroll`],C=()=>[`auto`,`contain`,`none`],w=()=>[G,U,c],T=()=>[z,`full`,`auto`,...w()],ee=()=>[V,`none`,`subgrid`,G,U],te=()=>[`auto`,{span:[`full`,V,G,U]},V,G,U],E=()=>[V,`auto`,G,U],D=()=>[`auto`,`min`,`max`,`fr`,G,U],ne=()=>[`start`,`end`,`center`,`between`,`around`,`evenly`,`stretch`,`baseline`,`center-safe`,`end-safe`],O=()=>[`start`,`end`,`center`,`stretch`,`center-safe`,`end-safe`],k=()=>[`auto`,...w()],A=()=>[z,`auto`,`full`,`dvw`,`dvh`,`lvw`,`lvh`,`svw`,`svh`,`min`,`max`,`fit`,...w()],j=()=>[s,z,`screen`,`full`,`dvw`,`lvw`,`svw`,`min`,`max`,`fit`,...w()],M=()=>[z,`screen`,`full`,`lh`,`dvh`,`lvh`,`svh`,`min`,`max`,`fit`,...w()],N=()=>[e,G,U],re=()=>[...b(),Ie,Ae,{position:[G,U]}],ie=()=>[`no-repeat`,{repeat:[``,`x`,`y`,`space`,`round`]}],ae=()=>[`auto`,`cover`,`contain`,Le,Te,{size:[G,U]}],oe=()=>[ge,Ne,W],P=()=>[``,`none`,`full`,l,G,U],F=()=>[``,B,Ne,W],se=()=>[`solid`,`dashed`,`dotted`,`double`],ce=()=>[`normal`,`multiply`,`screen`,`overlay`,`darken`,`lighten`,`color-dodge`,`color-burn`,`hard-light`,`soft-light`,`difference`,`exclusion`,`hue`,`saturation`,`color`,`luminosity`],L=()=>[B,ge,Pe,Ee],le=()=>[``,`none`,m,G,U],ue=()=>[`none`,B,G,U],de=()=>[`none`,B,G,U],fe=()=>[B,G,U],R=()=>[z,`full`,...w()];return{cacheSize:500,theme:{animate:[`spin`,`ping`,`pulse`,`bounce`],aspect:[`video`],blur:[H],breakpoint:[H],color:[_e],container:[H],"drop-shadow":[H],ease:[`in`,`out`,`in-out`],font:[Ce],"font-weight":[`thin`,`extralight`,`light`,`normal`,`medium`,`semibold`,`bold`,`extrabold`,`black`],"inset-shadow":[H],leading:[`none`,`tight`,`snug`,`normal`,`relaxed`,`loose`],perspective:[`dramatic`,`near`,`normal`,`midrange`,`distant`,`none`],radius:[H],shadow:[H],spacing:[`px`,B],text:[H],"text-shadow":[H],tracking:[`tighter`,`tight`,`normal`,`wide`,`wider`,`widest`]},classGroups:{aspect:[{aspect:[`auto`,`square`,z,U,G,g]}],container:[`container`],"container-type":[{"@container":[``,`normal`,`size`,G,U]}],"container-named":[we],columns:[{columns:[B,`auto`,U,G,s]}],"break-after":[{"break-after":y()}],"break-before":[{"break-before":y()}],"break-inside":[{"break-inside":[`auto`,`avoid`,`avoid-page`,`avoid-column`]}],"box-decoration":[{"box-decoration":[`slice`,`clone`]}],box:[{box:[`border`,`content`]}],display:[`block`,`inline-block`,`inline`,`flex`,`inline-flex`,`table`,`inline-table`,`table-caption`,`table-cell`,`table-column`,`table-column-group`,`table-footer-group`,`table-header-group`,`table-row-group`,`table-row`,`flow-root`,`grid`,`inline-grid`,`contents`,`list-item`,`hidden`],sr:[`sr-only`],"not-sr":[`not-sr-only`],float:[{float:[`right`,`left`,`none`,`start`,`end`]}],clear:[{clear:[`left`,`right`,`both`,`none`,`start`,`end`]}],isolation:[`isolate`,`isolation-auto`],"object-fit":[{object:[`contain`,`cover`,`fill`,`none`,`scale-down`]}],"object-position":[{object:x()}],overflow:[{overflow:S()}],"overflow-x":[{"overflow-x":S()}],"overflow-y":[{"overflow-y":S()}],overscroll:[{overscroll:C()}],"overscroll-x":[{"overscroll-x":C()}],"overscroll-y":[{"overscroll-y":C()}],position:[`static`,`fixed`,`absolute`,`relative`,`sticky`],inset:[{inset:T()}],"inset-x":[{"inset-x":T()}],"inset-y":[{"inset-y":T()}],start:[{"inset-s":T(),start:T()}],end:[{"inset-e":T(),end:T()}],"inset-bs":[{"inset-bs":T()}],"inset-be":[{"inset-be":T()}],top:[{top:T()}],right:[{right:T()}],bottom:[{bottom:T()}],left:[{left:T()}],visibility:[`visible`,`invisible`,`collapse`],z:[{z:[V,`auto`,G,U]}],basis:[{basis:[z,`full`,`auto`,s,...w()]}],"flex-direction":[{flex:[`row`,`row-reverse`,`col`,`col-reverse`]}],"flex-wrap":[{flex:[`nowrap`,`wrap`,`wrap-reverse`]}],flex:[{flex:[B,z,`auto`,`initial`,`none`,G,U]}],grow:[{grow:[``,B,G,U]}],shrink:[{shrink:[``,B,G,U]}],order:[{order:[V,`first`,`last`,`none`,G,U]}],"grid-cols":[{"grid-cols":ee()}],"col-start-end":[{col:te()}],"col-start":[{"col-start":E()}],"col-end":[{"col-end":E()}],"grid-rows":[{"grid-rows":ee()}],"row-start-end":[{row:te()}],"row-start":[{"row-start":E()}],"row-end":[{"row-end":E()}],"grid-flow":[{"grid-flow":[`row`,`col`,`dense`,`row-dense`,`col-dense`]}],"auto-cols":[{"auto-cols":D()}],"auto-rows":[{"auto-rows":D()}],gap:[{gap:w()}],"gap-x":[{"gap-x":w()}],"gap-y":[{"gap-y":w()}],"justify-content":[{justify:[...ne(),`normal`]}],"justify-items":[{"justify-items":[...O(),`normal`]}],"justify-self":[{"justify-self":[`auto`,...O()]}],"align-content":[{content:[`normal`,...ne()]}],"align-items":[{items:[...O(),{baseline:[``,`last`]}]}],"align-self":[{self:[`auto`,...O(),{baseline:[``,`last`]}]}],"place-content":[{"place-content":ne()}],"place-items":[{"place-items":[...O(),`baseline`]}],"place-self":[{"place-self":[`auto`,...O()]}],p:[{p:w()}],px:[{px:w()}],py:[{py:w()}],ps:[{ps:w()}],pe:[{pe:w()}],pbs:[{pbs:w()}],pbe:[{pbe:w()}],pt:[{pt:w()}],pr:[{pr:w()}],pb:[{pb:w()}],pl:[{pl:w()}],m:[{m:k()}],mx:[{mx:k()}],my:[{my:k()}],ms:[{ms:k()}],me:[{me:k()}],mbs:[{mbs:k()}],mbe:[{mbe:k()}],mt:[{mt:k()}],mr:[{mr:k()}],mb:[{mb:k()}],ml:[{ml:k()}],"space-x":[{"space-x":w()}],"space-x-reverse":[`space-x-reverse`],"space-y":[{"space-y":w()}],"space-y-reverse":[`space-y-reverse`],size:[{size:A()}],"inline-size":[{inline:[`auto`,...j()]}],"min-inline-size":[{"min-inline":[`auto`,...j()]}],"max-inline-size":[{"max-inline":[`none`,...j()]}],"block-size":[{block:[`auto`,...M()]}],"min-block-size":[{"min-block":[`auto`,...M()]}],"max-block-size":[{"max-block":[`none`,...M()]}],w:[{w:[s,`screen`,...A()]}],"min-w":[{"min-w":[s,`screen`,`none`,...A()]}],"max-w":[{"max-w":[s,`screen`,`none`,`prose`,{screen:[o]},...A()]}],h:[{h:[`screen`,`lh`,...A()]}],"min-h":[{"min-h":[`screen`,`lh`,`none`,...A()]}],"max-h":[{"max-h":[`screen`,`lh`,`none`,...A()]}],"font-size":[{text:[`base`,n,Ne,W]}],"font-smoothing":[`antialiased`,`subpixel-antialiased`],"font-style":[`italic`,`not-italic`],"font-weight":[{font:[r,Be,Oe]}],"font-stretch":[{"font-stretch":[`ultra-condensed`,`extra-condensed`,`condensed`,`semi-condensed`,`normal`,`semi-expanded`,`expanded`,`extra-expanded`,`ultra-expanded`,ge,U]}],"font-family":[{font:[Fe,ke,t]}],"font-features":[{"font-features":[U]}],"fvn-normal":[`normal-nums`],"fvn-ordinal":[`ordinal`],"fvn-slashed-zero":[`slashed-zero`],"fvn-figure":[`lining-nums`,`oldstyle-nums`],"fvn-spacing":[`proportional-nums`,`tabular-nums`],"fvn-fraction":[`diagonal-fractions`,`stacked-fractions`],tracking:[{tracking:[i,G,U]}],"line-clamp":[{"line-clamp":[B,`none`,G,U]}],leading:[{leading:[`none`,a,...w()]}],"list-image":[{"list-image":[`none`,G,U]}],"list-style-position":[{list:[`inside`,`outside`]}],"list-style-type":[{list:[`disc`,`decimal`,`none`,G,U]}],"text-alignment":[{text:[`left`,`center`,`right`,`justify`,`start`,`end`]}],"placeholder-color":[{placeholder:N()}],"text-color":[{text:N()}],"text-decoration":[`underline`,`overline`,`line-through`,`no-underline`],"text-decoration-style":[{decoration:[...se(),`wavy`]}],"text-decoration-thickness":[{decoration:[B,`from-font`,`auto`,Ne,Ie,W]}],"text-decoration-color":[{decoration:N()}],"underline-offset":[{"underline-offset":[B,`auto`,G,U]}],"text-transform":[`uppercase`,`lowercase`,`capitalize`,`normal-case`],"text-overflow":[`truncate`,`text-ellipsis`,`text-clip`],"text-wrap":[{text:[`wrap`,`nowrap`,`balance`,`pretty`]}],indent:[{indent:w()}],"tab-size":[{tab:[V,G,U]}],"vertical-align":[{align:[`baseline`,`top`,`middle`,`bottom`,`text-top`,`text-bottom`,`sub`,`super`,G,U]}],whitespace:[{whitespace:[`normal`,`nowrap`,`pre`,`pre-line`,`pre-wrap`,`break-spaces`]}],break:[{break:[`normal`,`words`,`all`,`keep`]}],wrap:[{wrap:[`break-word`,`anywhere`,`normal`]}],hyphens:[{hyphens:[`none`,`manual`,`auto`]}],content:[{content:[`none`,G,U]}],"bg-attachment":[{bg:[`fixed`,`local`,`scroll`]}],"bg-clip":[{"bg-clip":[`border`,`padding`,`content`,`text`]}],"bg-origin":[{"bg-origin":[`border`,`padding`,`content`]}],"bg-position":[{bg:re()}],"bg-repeat":[{bg:ie()}],"bg-size":[{bg:ae()}],"bg-image":[{bg:[`none`,{linear:[{to:[`t`,`tr`,`r`,`br`,`b`,`bl`,`l`,`tl`]},V,G,U],radial:[``,G,U],conic:[``,V,G,U]},Re,je]}],"bg-color":[{bg:N()}],"gradient-from-pos":[{from:oe()}],"gradient-via-pos":[{via:oe()}],"gradient-to-pos":[{to:oe()}],"gradient-from":[{from:N()}],"gradient-via":[{via:N()}],"gradient-to":[{to:N()}],rounded:[{rounded:P()}],"rounded-s":[{"rounded-s":P()}],"rounded-e":[{"rounded-e":P()}],"rounded-t":[{"rounded-t":P()}],"rounded-r":[{"rounded-r":P()}],"rounded-b":[{"rounded-b":P()}],"rounded-l":[{"rounded-l":P()}],"rounded-ss":[{"rounded-ss":P()}],"rounded-se":[{"rounded-se":P()}],"rounded-ee":[{"rounded-ee":P()}],"rounded-es":[{"rounded-es":P()}],"rounded-tl":[{"rounded-tl":P()}],"rounded-tr":[{"rounded-tr":P()}],"rounded-br":[{"rounded-br":P()}],"rounded-bl":[{"rounded-bl":P()}],"border-w":[{border:F()}],"border-w-x":[{"border-x":F()}],"border-w-y":[{"border-y":F()}],"border-w-s":[{"border-s":F()}],"border-w-e":[{"border-e":F()}],"border-w-bs":[{"border-bs":F()}],"border-w-be":[{"border-be":F()}],"border-w-t":[{"border-t":F()}],"border-w-r":[{"border-r":F()}],"border-w-b":[{"border-b":F()}],"border-w-l":[{"border-l":F()}],"divide-x":[{"divide-x":F()}],"divide-x-reverse":[`divide-x-reverse`],"divide-y":[{"divide-y":F()}],"divide-y-reverse":[`divide-y-reverse`],"border-style":[{border:[...se(),`hidden`,`none`]}],"divide-style":[{divide:[...se(),`hidden`,`none`]}],"border-color":[{border:N()}],"border-color-x":[{"border-x":N()}],"border-color-y":[{"border-y":N()}],"border-color-s":[{"border-s":N()}],"border-color-e":[{"border-e":N()}],"border-color-bs":[{"border-bs":N()}],"border-color-be":[{"border-be":N()}],"border-color-t":[{"border-t":N()}],"border-color-r":[{"border-r":N()}],"border-color-b":[{"border-b":N()}],"border-color-l":[{"border-l":N()}],"divide-color":[{divide:N()}],"outline-style":[{outline:[...se(),`none`,`hidden`]}],"outline-offset":[{"outline-offset":[B,G,U]}],"outline-w":[{outline:[``,B,Ne,W]}],"outline-color":[{outline:N()}],shadow:[{shadow:[``,`inner`,`none`,u,ze,Me]}],"shadow-color":[{shadow:N()}],"inset-shadow":[{"inset-shadow":[`none`,d,ze,Me]}],"inset-shadow-color":[{"inset-shadow":N()}],"ring-w":[{ring:F()}],"ring-w-inset":[`ring-inset`],"ring-color":[{ring:N()}],"ring-offset-w":[{"ring-offset":[B,W]}],"ring-offset-color":[{"ring-offset":N()}],"inset-ring-w":[{"inset-ring":F()}],"inset-ring-color":[{"inset-ring":N()}],"text-shadow":[{"text-shadow":[`none`,f,ze,Me]}],"text-shadow-color":[{"text-shadow":N()}],opacity:[{opacity:[B,G,U]}],"mix-blend":[{"mix-blend":[...ce(),`plus-darker`,`plus-lighter`]}],"bg-blend":[{"bg-blend":ce()}],"mask-clip":[{"mask-clip":[`border`,`padding`,`content`,`fill`,`stroke`,`view`]},`mask-no-clip`],"mask-composite":[{mask:[`add`,`subtract`,`intersect`,`exclude`]}],"mask-image-linear-pos":[{"mask-linear":[B]}],"mask-image-linear-from-pos":[{"mask-linear-from":L()}],"mask-image-linear-to-pos":[{"mask-linear-to":L()}],"mask-image-linear-from-color":[{"mask-linear-from":N()}],"mask-image-linear-to-color":[{"mask-linear-to":N()}],"mask-image-t-from-pos":[{"mask-t-from":L()}],"mask-image-t-to-pos":[{"mask-t-to":L()}],"mask-image-t-from-color":[{"mask-t-from":N()}],"mask-image-t-to-color":[{"mask-t-to":N()}],"mask-image-r-from-pos":[{"mask-r-from":L()}],"mask-image-r-to-pos":[{"mask-r-to":L()}],"mask-image-r-from-color":[{"mask-r-from":N()}],"mask-image-r-to-color":[{"mask-r-to":N()}],"mask-image-b-from-pos":[{"mask-b-from":L()}],"mask-image-b-to-pos":[{"mask-b-to":L()}],"mask-image-b-from-color":[{"mask-b-from":N()}],"mask-image-b-to-color":[{"mask-b-to":N()}],"mask-image-l-from-pos":[{"mask-l-from":L()}],"mask-image-l-to-pos":[{"mask-l-to":L()}],"mask-image-l-from-color":[{"mask-l-from":N()}],"mask-image-l-to-color":[{"mask-l-to":N()}],"mask-image-x-from-pos":[{"mask-x-from":L()}],"mask-image-x-to-pos":[{"mask-x-to":L()}],"mask-image-x-from-color":[{"mask-x-from":N()}],"mask-image-x-to-color":[{"mask-x-to":N()}],"mask-image-y-from-pos":[{"mask-y-from":L()}],"mask-image-y-to-pos":[{"mask-y-to":L()}],"mask-image-y-from-color":[{"mask-y-from":N()}],"mask-image-y-to-color":[{"mask-y-to":N()}],"mask-image-radial":[{"mask-radial":[G,U]}],"mask-image-radial-from-pos":[{"mask-radial-from":L()}],"mask-image-radial-to-pos":[{"mask-radial-to":L()}],"mask-image-radial-from-color":[{"mask-radial-from":N()}],"mask-image-radial-to-color":[{"mask-radial-to":N()}],"mask-image-radial-shape":[{mask:[`circle`,`ellipse`]}],"mask-image-radial-size":[{"mask-radial":[{closest:[`side`,`corner`],farthest:[`side`,`corner`]}]}],"mask-image-radial-pos":[{"mask-radial-at":b()}],"mask-image-conic-pos":[{"mask-conic":[B]}],"mask-image-conic-from-pos":[{"mask-conic-from":L()}],"mask-image-conic-to-pos":[{"mask-conic-to":L()}],"mask-image-conic-from-color":[{"mask-conic-from":N()}],"mask-image-conic-to-color":[{"mask-conic-to":N()}],"mask-mode":[{mask:[`alpha`,`luminance`,`match`]}],"mask-origin":[{"mask-origin":[`border`,`padding`,`content`,`fill`,`stroke`,`view`]}],"mask-position":[{mask:re()}],"mask-repeat":[{mask:ie()}],"mask-size":[{mask:ae()}],"mask-type":[{"mask-type":[`alpha`,`luminance`]}],"mask-image":[{mask:[`none`,G,U]}],filter:[{filter:[``,`none`,G,U]}],blur:[{blur:le()}],brightness:[{brightness:[B,G,U]}],contrast:[{contrast:[B,G,U]}],"drop-shadow":[{"drop-shadow":[``,`none`,p,ze,Me]}],"drop-shadow-color":[{"drop-shadow":N()}],grayscale:[{grayscale:[``,B,G,U]}],"hue-rotate":[{"hue-rotate":[B,G,U]}],invert:[{invert:[``,B,G,U]}],saturate:[{saturate:[B,G,U]}],sepia:[{sepia:[``,B,G,U]}],"backdrop-filter":[{"backdrop-filter":[``,`none`,G,U]}],"backdrop-blur":[{"backdrop-blur":le()}],"backdrop-brightness":[{"backdrop-brightness":[B,G,U]}],"backdrop-contrast":[{"backdrop-contrast":[B,G,U]}],"backdrop-grayscale":[{"backdrop-grayscale":[``,B,G,U]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[B,G,U]}],"backdrop-invert":[{"backdrop-invert":[``,B,G,U]}],"backdrop-opacity":[{"backdrop-opacity":[B,G,U]}],"backdrop-saturate":[{"backdrop-saturate":[B,G,U]}],"backdrop-sepia":[{"backdrop-sepia":[``,B,G,U]}],"border-collapse":[{border:[`collapse`,`separate`]}],"border-spacing":[{"border-spacing":w()}],"border-spacing-x":[{"border-spacing-x":w()}],"border-spacing-y":[{"border-spacing-y":w()}],"table-layout":[{table:[`auto`,`fixed`]}],caption:[{caption:[`top`,`bottom`]}],transition:[{transition:[``,`all`,`colors`,`opacity`,`shadow`,`transform`,`none`,G,U]}],"transition-behavior":[{transition:[`normal`,`discrete`]}],duration:[{duration:[B,`initial`,G,U]}],ease:[{ease:[`linear`,`initial`,_,G,U]}],delay:[{delay:[B,G,U]}],animate:[{animate:[`none`,v,G,U]}],backface:[{backface:[`hidden`,`visible`]}],perspective:[{perspective:[h,G,U]}],"perspective-origin":[{"perspective-origin":x()}],rotate:[{rotate:ue()}],"rotate-x":[{"rotate-x":ue()}],"rotate-y":[{"rotate-y":ue()}],"rotate-z":[{"rotate-z":ue()}],scale:[{scale:de()}],"scale-x":[{"scale-x":de()}],"scale-y":[{"scale-y":de()}],"scale-z":[{"scale-z":de()}],"scale-3d":[`scale-3d`],skew:[{skew:fe()}],"skew-x":[{"skew-x":fe()}],"skew-y":[{"skew-y":fe()}],transform:[{transform:[G,U,``,`none`,`gpu`,`cpu`]}],"transform-origin":[{origin:x()}],"transform-style":[{transform:[`3d`,`flat`]}],translate:[{translate:R()}],"translate-x":[{"translate-x":R()}],"translate-y":[{"translate-y":R()}],"translate-z":[{"translate-z":R()}],"translate-none":[`translate-none`],zoom:[{zoom:[V,G,U]}],accent:[{accent:N()}],appearance:[{appearance:[`none`,`auto`]}],"caret-color":[{caret:N()}],"color-scheme":[{scheme:[`normal`,`dark`,`light`,`light-dark`,`only-dark`,`only-light`]}],cursor:[{cursor:[`auto`,`default`,`pointer`,`wait`,`text`,`move`,`help`,`not-allowed`,`none`,`context-menu`,`progress`,`cell`,`crosshair`,`vertical-text`,`alias`,`copy`,`no-drop`,`grab`,`grabbing`,`all-scroll`,`col-resize`,`row-resize`,`n-resize`,`e-resize`,`s-resize`,`w-resize`,`ne-resize`,`nw-resize`,`se-resize`,`sw-resize`,`ew-resize`,`ns-resize`,`nesw-resize`,`nwse-resize`,`zoom-in`,`zoom-out`,G,U]}],"field-sizing":[{"field-sizing":[`fixed`,`content`]}],"pointer-events":[{"pointer-events":[`auto`,`none`]}],resize:[{resize:[`none`,``,`y`,`x`]}],"scroll-behavior":[{scroll:[`auto`,`smooth`]}],"scrollbar-thumb-color":[{"scrollbar-thumb":N()}],"scrollbar-track-color":[{"scrollbar-track":N()}],"scrollbar-gutter":[{"scrollbar-gutter":[`auto`,`stable`,`both`]}],"scrollbar-w":[{scrollbar:[`auto`,`thin`,`none`]}],"scroll-m":[{"scroll-m":w()}],"scroll-mx":[{"scroll-mx":w()}],"scroll-my":[{"scroll-my":w()}],"scroll-ms":[{"scroll-ms":w()}],"scroll-me":[{"scroll-me":w()}],"scroll-mbs":[{"scroll-mbs":w()}],"scroll-mbe":[{"scroll-mbe":w()}],"scroll-mt":[{"scroll-mt":w()}],"scroll-mr":[{"scroll-mr":w()}],"scroll-mb":[{"scroll-mb":w()}],"scroll-ml":[{"scroll-ml":w()}],"scroll-p":[{"scroll-p":w()}],"scroll-px":[{"scroll-px":w()}],"scroll-py":[{"scroll-py":w()}],"scroll-ps":[{"scroll-ps":w()}],"scroll-pe":[{"scroll-pe":w()}],"scroll-pbs":[{"scroll-pbs":w()}],"scroll-pbe":[{"scroll-pbe":w()}],"scroll-pt":[{"scroll-pt":w()}],"scroll-pr":[{"scroll-pr":w()}],"scroll-pb":[{"scroll-pb":w()}],"scroll-pl":[{"scroll-pl":w()}],"snap-align":[{snap:[`start`,`end`,`center`,`align-none`]}],"snap-stop":[{snap:[`normal`,`always`]}],"snap-type":[{snap:[`none`,`x`,`y`,`both`]}],"snap-strictness":[{snap:[`mandatory`,`proximity`]}],touch:[{touch:[`auto`,`none`,`manipulation`]}],"touch-x":[{"touch-pan":[`x`,`left`,`right`]}],"touch-y":[{"touch-pan":[`y`,`up`,`down`]}],"touch-pz":[`touch-pinch-zoom`],select:[{select:[`none`,`text`,`all`,`auto`]}],"will-change":[{"will-change":[`auto`,`scroll`,`contents`,`transform`,G,U]}],fill:[{fill:[`none`,...N()]}],"stroke-w":[{stroke:[B,Ne,W,De]}],stroke:[{stroke:[`none`,...N()]}],"forced-color-adjust":[{"forced-color-adjust":[`auto`,`none`]}]},conflictingClassGroups:{"container-named":[`container-type`],overflow:[`overflow-x`,`overflow-y`],overscroll:[`overscroll-x`,`overscroll-y`],inset:[`inset-x`,`inset-y`,`inset-bs`,`inset-be`,`start`,`end`,`top`,`right`,`bottom`,`left`],"inset-x":[`start`,`end`,`right`,`left`],"inset-y":[`inset-bs`,`inset-be`,`top`,`bottom`],flex:[`basis`,`grow`,`shrink`],gap:[`gap-x`,`gap-y`],"place-content":[`align-content`,`justify-content`],"place-items":[`align-items`,`justify-items`],"place-self":[`align-self`,`justify-self`],p:[`px`,`py`,`ps`,`pe`,`pbs`,`pbe`,`pt`,`pr`,`pb`,`pl`],px:[`ps`,`pe`,`pr`,`pl`],py:[`pbs`,`pbe`,`pt`,`pb`],m:[`mx`,`my`,`ms`,`me`,`mbs`,`mbe`,`mt`,`mr`,`mb`,`ml`],mx:[`ms`,`me`,`mr`,`ml`],my:[`mbs`,`mbe`,`mt`,`mb`],size:[`w`,`h`],"fvn-normal":[`fvn-ordinal`,`fvn-slashed-zero`,`fvn-figure`,`fvn-spacing`,`fvn-fraction`],"fvn-ordinal":[`fvn-normal`],"fvn-slashed-zero":[`fvn-normal`],"fvn-figure":[`fvn-normal`],"fvn-spacing":[`fvn-normal`],"fvn-fraction":[`fvn-normal`],"line-clamp":[`display`,`overflow`],sr:`not-sr.position.size.w.h.p.px.py.ps.pe.pbs.pbe.pt.pr.pb.pl.m.mx.my.ms.me.mbs.mbe.mt.mr.mb.ml.overflow.overflow-x.overflow-y.whitespace`.split(`.`),"not-sr":[`sr`],rounded:[`rounded-s`,`rounded-e`,`rounded-t`,`rounded-r`,`rounded-b`,`rounded-l`,`rounded-ss`,`rounded-se`,`rounded-ee`,`rounded-es`,`rounded-tl`,`rounded-tr`,`rounded-br`,`rounded-bl`],"rounded-s":[`rounded-ss`,`rounded-es`],"rounded-e":[`rounded-se`,`rounded-ee`],"rounded-t":[`rounded-tl`,`rounded-tr`],"rounded-r":[`rounded-tr`,`rounded-br`],"rounded-b":[`rounded-br`,`rounded-bl`],"rounded-l":[`rounded-tl`,`rounded-bl`],"border-spacing":[`border-spacing-x`,`border-spacing-y`],"border-w":[`border-w-x`,`border-w-y`,`border-w-s`,`border-w-e`,`border-w-bs`,`border-w-be`,`border-w-t`,`border-w-r`,`border-w-b`,`border-w-l`],"border-w-x":[`border-w-s`,`border-w-e`,`border-w-r`,`border-w-l`],"border-w-y":[`border-w-bs`,`border-w-be`,`border-w-t`,`border-w-b`],"border-color":[`border-color-x`,`border-color-y`,`border-color-s`,`border-color-e`,`border-color-bs`,`border-color-be`,`border-color-t`,`border-color-r`,`border-color-b`,`border-color-l`],"border-color-x":[`border-color-s`,`border-color-e`,`border-color-r`,`border-color-l`],"border-color-y":[`border-color-bs`,`border-color-be`,`border-color-t`,`border-color-b`],"mask-image-x-from-pos":[`mask-image-r-from-pos`,`mask-image-l-from-pos`],"mask-image-x-to-pos":[`mask-image-r-to-pos`,`mask-image-l-to-pos`],"mask-image-x-from-color":[`mask-image-r-from-color`,`mask-image-l-from-color`],"mask-image-x-to-color":[`mask-image-r-to-color`,`mask-image-l-to-color`],"mask-image-y-from-pos":[`mask-image-t-from-pos`,`mask-image-b-from-pos`],"mask-image-y-to-pos":[`mask-image-t-to-pos`,`mask-image-b-to-pos`],"mask-image-y-from-color":[`mask-image-t-from-color`,`mask-image-b-from-color`],"mask-image-y-to-color":[`mask-image-t-to-color`,`mask-image-b-to-color`],translate:[`translate-x`,`translate-y`,`translate-none`],"translate-none":[`translate`,`translate-x`,`translate-y`,`translate-z`],"scroll-m":[`scroll-mx`,`scroll-my`,`scroll-ms`,`scroll-me`,`scroll-mbs`,`scroll-mbe`,`scroll-mt`,`scroll-mr`,`scroll-mb`,`scroll-ml`],"scroll-mx":[`scroll-ms`,`scroll-me`,`scroll-mr`,`scroll-ml`],"scroll-my":[`scroll-mbs`,`scroll-mbe`,`scroll-mt`,`scroll-mb`],"scroll-p":[`scroll-px`,`scroll-py`,`scroll-ps`,`scroll-pe`,`scroll-pbs`,`scroll-pbe`,`scroll-pt`,`scroll-pr`,`scroll-pb`,`scroll-pl`],"scroll-px":[`scroll-ps`,`scroll-pe`,`scroll-pr`,`scroll-pl`],"scroll-py":[`scroll-pbs`,`scroll-pbe`,`scroll-pt`,`scroll-pb`],touch:[`touch-x`,`touch-y`,`touch-pz`],"touch-x":[`touch`],"touch-y":[`touch`],"touch-pz":[`touch`]},conflictingClassGroupModifiers:{"font-size":[`leading`]},postfixLookupClassGroups:[`container-type`],orderSensitiveModifiers:[`*`,`**`,`after`,`backdrop`,`before`,`details-content`,`file`,`first-letter`,`first-line`,`marker`,`placeholder`,`selection`]}});function Ze(...e){return Xe(d(e))}var Qe=a(),$e=(0,o.createContext)(null),et=`cquest.theme`,tt=`dark`;function nt(e){return e===`dark`||e===`light`?e:tt}function rt({children:e}){let[t,n]=(0,o.useState)(()=>{if(typeof window>`u`)return`system`;try{let e=window.localStorage.getItem(et);if(e===`dark`||e===`light`)return e}catch{}return`system`}),[r,i]=(0,o.useState)(tt);(0,o.useEffect)(()=>{let e=nt(t);i(e);let n=document.documentElement;n.classList.toggle(`dark`,e===`dark`),n.style.colorScheme=e},[t]);let a=(0,o.useCallback)(e=>{n(e);try{window.localStorage.setItem(et,e)}catch{}},[]),s=(0,o.useCallback)(()=>{n(e=>{let t=nt(e)===`dark`?`light`:`dark`;try{window.localStorage.setItem(et,t)}catch{}return t})},[]),c=(0,o.useMemo)(()=>({theme:t,resolved:r,isDark:r===`dark`,setTheme:a,toggleTheme:s}),[t,r,a,s]);return(0,Qe.jsx)($e.Provider,{value:c,children:e})}function it(){let e=(0,o.useContext)($e);if(!e)throw Error(`useTheme must be used inside ThemeProvider`);return e}var at=`cquest.store.v1`,ot=`cquest.draft.v1.`;function st(e=0){return Math.floor(Math.sqrt(Math.max(0,e)/100))+1}function ct(e){return(e-1)**2*100}function lt(e=0){let t=st(e),n=ct(t),r=ct(t+1),i=Math.max(1,r-n);return{level:t,floor:n,ceiling:r,into:Math.max(0,e-n),needed:r-e,pct:Math.min(100,Math.round((e-n)/i*100))}}function ut(){return{xp:0,coins:0,stars:0,missions:{},achievements:{},streak:{count:0,best:0,last:null},startedAt:new Date().toISOString()}}function dt(e,t){return{id:`save-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`,name:e||`Operator`,glyph:t||`✦`,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),progress:ut()}}function ft(){if(typeof window>`u`)return{saves:[],activeId:null,settings:{sound:!0}};try{let e=window.localStorage.getItem(at);if(!e)return{saves:[],activeId:null,settings:{sound:!0}};let t=JSON.parse(e);return{saves:Array.isArray(t.saves)?t.saves:[],activeId:t.activeId||null,settings:{sound:t.settings?.sound!==!1}}}catch{return{saves:[],activeId:null,settings:{sound:!0}}}}function pt(e){if(typeof window<`u`)try{window.localStorage.setItem(at,JSON.stringify({saves:e.saves,activeId:e.activeId,settings:e.settings}))}catch{}}function mt(e,t){if(typeof window>`u`)return null;try{return window.localStorage.getItem(ot+e+`.`+t)}catch{return null}}function ht(e,t,n){if(typeof window<`u`)try{window.localStorage.setItem(ot+e+`.`+t,n)}catch{}}function gt(e){return JSON.stringify({format:`cquest-save`,version:1,save:e},null,2)}function _t(e){let t=JSON.parse(e),n=t?.save||t;if(!n||typeof n!=`object`||!n.progress)throw Error(`That file isn't a C//QUEST save.`);return{id:`save-${Date.now().toString(36)}`,name:n.name||`Imported`,glyph:n.glyph||`✦`,createdAt:n.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString(),progress:{...ut(),...n.progress}}}var J=(e,t=``)=>`#include <stdio.h>\n${t}\nint main() {\n  // ${e}\n  \n  return 0;\n}\n`,vt=(e,t)=>`#include <stdio.h>\n\n${e}\n\nint main() {\n  // ${t}\n  \n  return 0;\n}\n`,yt={cyan:{text:`text-brand-ink`,border:`border-[#C6E9A8]`,bg:`bg-[#58CC02]`,soft:`bg-brand-tint`,ring:`ring-[#58CC02]/30`,gradient:`from-[#58CC02]/20 via-[#58CC02]/5 to-transparent`,glow:`shadow-[0_5px_0_#46A302]`,dot:`bg-[#58CC02]`},violet:{text:`text-grape`,border:`border-grape/40`,bg:`bg-[#CE82FF]`,soft:`bg-grape/16`,ring:`ring-[#CE82FF]/40`,gradient:`from-[#CE82FF]/20 via-[#CE82FF]/5 to-transparent`,glow:`shadow-[0_5px_0_#B267E8]`,dot:`bg-[#CE82FF]`},emerald:{text:`text-sun-ink`,border:`border-sun/45`,bg:`bg-[#FFD900]`,soft:`bg-sun/15`,ring:`ring-[#FFD900]/50`,gradient:`from-[#FFD900]/25 via-[#FFD900]/5 to-transparent`,glow:`shadow-[0_5px_0_#E0BE00]`,dot:`bg-[#FFD900]`},amber:{text:`text-tangerine-ink`,border:`border-tangerine/40`,bg:`bg-[#FF9600]`,soft:`bg-tangerine/15`,ring:`ring-[#FF9600]/40`,gradient:`from-[#FF9600]/20 via-[#FF9600]/5 to-transparent`,glow:`shadow-[0_5px_0_#E08200]`,dot:`bg-[#FF9600]`},blue:{text:`text-aqua`,border:`border-aqua/45`,bg:`bg-[#1CB0F6]`,soft:`bg-aqua/15`,ring:`ring-[#1CB0F6]/40`,gradient:`from-[#1CB0F6]/20 via-[#1CB0F6]/5 to-transparent`,glow:`shadow-[0_5px_0_#1197D6]`,dot:`bg-[#1CB0F6]`},rose:{text:`text-coral`,border:`border-coral/40`,bg:`bg-[#FF4B4B]`,soft:`bg-coral/12`,ring:`ring-[#FF4B4B]/40`,gradient:`from-[#FF4B4B]/20 via-[#FF4B4B]/5 to-transparent`,glow:`shadow-[0_5px_0_#E33A3A]`,dot:`bg-[#FF4B4B]`}},Y=[{id:`w1`,index:1,name:`First Light`,subtitle:`Output, variables, types`,blurb:`A dead terminal wakes up in an abandoned lab. Speak to it in the only language it remembers.`,accent:`cyan`,missions:[{id:`w1m1`,order:1,title:`Wake the terminal`,tagline:`Your first C program`,skill:`printf`,story:`The lab's terminal has been dark for eleven years. A single line of text is enough to bring it back online.`,objective:`Print exactly: Hello, World!`,concept:{title:`printf writes to the screen`,points:[`Every C program begins at main() and runs the statements inside it, top to bottom.`,`printf("...") sends text to standard output. The \\n at the end means 'new line'.`],snippet:`#include <stdio.h>

int main() {
  printf("Hello, World!\\n");
  return 0;
}`,analogy:`printf is a loudspeaker. Whatever you put in the quotes is what the machine says out loud.`},fieldNote:`In every project you'll ever build, printing is your first debugging tool. If a value looks wrong, print it.`,starter:J(`Print: Hello, World!`),solution:`#include <stdio.h>

int main() {
  printf("Hello, World!\\n");
  return 0;
}
`,checks:[{type:`output`,mode:`contains`,value:`Hello, World!`}],hints:[`Your code runs inside main(). Everything you want to happen goes between its braces.`,`Use printf("..."); and put the text inside the double quotes.`,`Exactly this: printf("Hello, World!\\n");`],reward:{xp:40,coins:12}},{id:`w1m2`,order:2,title:`Set the clock`,tagline:`Variables hold values`,skill:`int variables`,story:`The lab clock reads 2147 but the terminal shows a blank. Give the machine a number it can remember.`,objective:`Create an int called year holding 2147, then print: Year: 2147`,concept:{title:`A variable is a labelled box`,points:[`int year = 2147; creates a box named year and stores the whole number 2147 in it.`,`printf("Year: %d\\n", year); drops the value of year where %d sits.`],snippet:`int year = 2147;
printf("Year: %d\\n", year);`,analogy:`%d is a placeholder on a form. You hand printf the box, and it writes what's inside.`},fieldNote:`Real programs are mostly named values flowing between steps. Naming them clearly is half the job.`,starter:J(`Create int year = 2147, then print: Year: 2147`),solution:`#include <stdio.h>

int main() {
  int year = 2147;
  printf("Year: %d\\n", year);
  return 0;
}
`,checks:[{type:`output`,mode:`contains`,value:`Year: 2147`}],hints:[`Declare the variable first: int year = 2147;`,`Then pass it to printf as a second argument, separated by a comma.`,`printf("Year: %d\\n", year);`],reward:{xp:45,coins:14}},{id:`w1m3`,order:3,title:`Calibrate the gauges`,tagline:`int, double and char`,skill:`data types`,story:`Three gauges are unlabelled. One counts lives, one holds an energy reading with a decimal, one stores a single letter.`,objective:`Declare lives = 3 (int), energy = 87.5 (double), grade = 'A' (char). Print each on its own line as shown in the briefing.`,concept:{title:`Different data needs different types`,points:[`int holds whole numbers, double holds decimals, char holds one character.`,`Each type has its own placeholder: %d, %f (or %.1f) and %c.`],snippet:`int lives = 3;
double energy = 87.5;
char grade = 'A';
printf("Lives: %d\\n", lives);
printf("Energy: %.1f\\n", energy);
printf("Grade: %c\\n", grade);`,analogy:`Types are container shapes. Pouring a decimal into an int box truncates it silently.`},fieldNote:`Choosing the right type early prevents a whole class of bugs: integer division, overflow, lost precision.`,starter:J(`Print "Lives: 3", "Energy: 87.5", "Grade: A" using int, double and char variables`),solution:`#include <stdio.h>

int main() {
  int lives = 3;
  double energy = 87.5;
  char grade = 'A';
  printf("Lives: %d\\n", lives);
  printf("Energy: %.1f\\n", energy);
  printf("Grade: %c\\n", grade);
  return 0;
}
`,checks:[{type:`output`,mode:`contains`,value:`Lives: 3`},{type:`output`,mode:`contains`,value:`Energy: 87.5`},{type:`output`,mode:`contains`,value:`Grade: A`}],hints:[`Use double for 87.5 — an int would store 87 and lose the .5.`,`Use %.1f to print exactly one decimal place, and %c for the character.`,`Three printf calls, one per gauge, each on its own line.`],reward:{xp:55,coins:16}},{id:`w1m4`,order:4,title:`Damage report`,tagline:`Arithmetic and precedence`,skill:`operators`,story:`The console needs a single number: base damage 12, bonus 7, plus 3 overcharge. Order matters.`,objective:`Compute base * bonus + 3 and print: Total: 87`,concept:{title:`C does maths with operator precedence`,points:[`* and / run before + and -, exactly like school algebra.`,`int / int throws away the remainder. 9 / 2 is 4, not 4.5.`],snippet:`int total = base * bonus + 3;
printf("Total: %d\\n", total);`,analogy:`Precedence is the order of operations. Brackets are how you overrule it.`},fieldNote:`Integer division is the single most common first-year bug. Whenever you see 0 where you expected a decimal, suspect it.`,starter:J(`Compute base * bonus + 3 where base = 12 and bonus = 7, then print: Total: 87`),solution:`#include <stdio.h>

int main() {
  int base = 12;
  int bonus = 7;
  int total = base * bonus + 3;
  printf("Total: %d\\n", total);
  return 0;
}
`,checks:[{type:`output`,mode:`contains`,value:`Total: 87`}],hints:[`12 * 7 is computed before adding 3, so you get 87.`,`Store the result in an int, then print it with %d.`,`int total = base * bonus + 3;`],reward:{xp:60,coins:18}},{id:`w1m5`,order:5,title:`BOSS: Reactor calibration`,tagline:`Average three readings`,skill:`boss · mixed arithmetic`,boss:!0,story:`The reactor core is drifting. Three readings must be averaged with real precision, not truncated.`,objective:`Average 91, 84 and 79 as a double, then print: Average: 84.67`,concept:{title:`Mix int and double on purpose`,points:[`(a + b + c) / 3 would do integer division and print 84. Dividing by 3.0 keeps the decimals.`,`%.2f rounds the output to two decimal places.`],snippet:`double average = (a + b + c) / 3.0;
printf("Average: %.2f\\n", average);`,analogy:`Adding .0 to the divisor is like switching the whole calculation into decimal mode.`},fieldNote:`Averages, percentages and scores are where integer division quietly destroys results. Write 3.0 on purpose.`,starter:J(`Average 91, 84 and 79, then print: Average: 84.67`),solution:`#include <stdio.h>

int main() {
  int a = 91;
  int b = 84;
  int c = 79;
  double average = (a + b + c) / 3.0;
  printf("Average: %.2f\\n", average);
  return 0;
}
`,checks:[{type:`output`,mode:`contains`,value:`Average: 84.67`}],hints:[`Divide by 3.0 instead of 3 so the result keeps its decimals.`,`Store the result in a double, not an int.`,`printf("Average: %.2f\\n", average); gives you 84.67.`],reward:{xp:120,coins:40}}]},{id:`w2`,index:2,name:`Signal District`,subtitle:`Conditions and decisions`,blurb:`Every alley in the district runs on a rule. Learn to make the machine choose.`,accent:`violet`,missions:[{id:`w2m1`,order:1,title:`Overheat alarm`,tagline:`if / else`,skill:`if-else`,story:`The cooling tower reports 118 degrees. Above 100 it must scream OVERHEAT, otherwise it stays quiet.`,objective:`If temperature is above 100 print OVERHEAT, else print STABLE.`,concept:{title:`if runs code only when a condition is true`,points:[`if (temperature > 100) { ... } else { ... } picks exactly one branch.`,`A condition is any expression that evaluates to non-zero (true) or zero (false).`],snippet:`if (temperature > 100) {
  printf("OVERHEAT\\n");
} else {
  printf("STABLE\\n");
}`,analogy:`An if is a fork in the corridor. The condition decides which way you walk.`},fieldNote:`Validation lives here: reject bad input, guard divisions, choose a path. Most real logic is branches.`,starter:J(`If temperature (118) is above 100 print OVERHEAT, else print STABLE`),solution:`#include <stdio.h>

int main() {
  int temperature = 118;
  if (temperature > 100) {
    printf("OVERHEAT\\n");
  } else {
    printf("STABLE\\n");
  }
  return 0;
}
`,checks:[{type:`output`,mode:`exact`,value:`OVERHEAT`}],hints:[`Start with: int temperature = 118;`,`Wrap each printf in braces so it belongs to its branch.`,`Only the OVERHEAT branch should print, because 118 > 100 is true.`],reward:{xp:50,coins:14}},{id:`w2m2`,order:2,title:`Grade the cohort`,tagline:`else if ladders`,skill:`else-if`,story:`A marker bot needs to turn a score into a letter. 90+ is A, 80+ is B, 70+ is C, everything else fails.`,objective:`For score = 87 print: Grade: B`,concept:{title:`else if checks conditions in order`,points:[`The first condition that is true wins, and the rest are skipped.`,`Because of that, each test only needs the remaining range: score >= 80, not score < 90 && score >= 80.`],snippet:`if (score >= 90) printf("Grade: A\\n");
else if (score >= 80) printf("Grade: B\\n");
else if (score >= 70) printf("Grade: C\\n");
else printf("Grade: F\\n");`,analogy:`An else-if ladder is a sieve: each rung catches the values that didn't fit above it.`},fieldNote:`This exact ladder shows up in every grading, pricing tier and permission check you'll write.`,starter:J(`Turn score 87 into a letter grade and print: Grade: B`),solution:`#include <stdio.h>

int main() {
  int score = 87;
  if (score >= 90) {
    printf("Grade: A\\n");
  } else if (score >= 80) {
    printf("Grade: B\\n");
  } else if (score >= 70) {
    printf("Grade: C\\n");
  } else {
    printf("Grade: F\\n");
  }
  return 0;
}
`,checks:[{type:`output`,mode:`exact`,value:`Grade: B`}],hints:[`87 is not >= 90, so the first branch is skipped.`,`It is >= 80, so the second branch prints.`,`Use >= (greater or equal), not >, or 80 itself would fail.`],reward:{xp:55,coins:15}},{id:`w2m3`,order:3,title:`Access gate`,tagline:`&& and ||`,skill:`logical operators`,story:`The gate opens only when the badge is valid AND the clearance level is at least 5.`,objective:`With id_valid = 1 and level = 7 print: ACCESS GRANTED`,concept:{title:`Combine conditions with && and ||`,points:[`&& means both sides must be true. || means at least one must be true. ! flips a condition.`,`C short-circuits: in a && b, if a is false, b is never evaluated.`],snippet:`if (id_valid && level >= 5) {
  printf("ACCESS GRANTED\\n");
}`,analogy:`&& is two keys in two locks. || is one key in either lock.`},fieldNote:`Guarding with && is how you avoid crashes: check the pointer is valid and the index is in range before using them.`,starter:J(`Open the gate when id_valid is 1 AND level >= 5. Print ACCESS GRANTED`),solution:`#include <stdio.h>

int main() {
  int id_valid = 1;
  int level = 7;
  if (id_valid && level >= 5) {
    printf("ACCESS GRANTED\\n");
  } else {
    printf("DENIED\\n");
  }
  return 0;
}
`,checks:[{type:`output`,mode:`exact`,value:`ACCESS GRANTED`}],hints:[`Both conditions go inside one if, joined by &&.`,`id_valid is 1, which counts as true in C.`,`if (id_valid && level >= 5)`],reward:{xp:60,coins:17}},{id:`w2m4`,order:4,title:`Deeper reading`,tagline:`Nested conditions`,skill:`nesting`,story:`Compare two sensor readings, then inspect the larger one: is it even or odd?`,objective:`With a = 42 and b = 17 print: Larger: 42 then Even`,concept:{title:`if inside if`,points:[`Once you know which value is larger, you can ask a second question about it.`,`The inner if only runs when the outer branch was taken.`],snippet:`if (a > b) {
  printf("Larger: %d\\n", a);
  if (a % 2 == 0) printf("Even\\n");
  else printf("Odd\\n");
}`,analogy:`First you pick the taller twin, then you check whether that twin is wearing a hat.`},fieldNote:`Nesting is fine two levels deep. Beyond that, extract a function — your future self will thank you.`,starter:J(`Find the larger of a = 42 and b = 17, print it, then print Even or Odd`),solution:`#include <stdio.h>

int main() {
  int a = 42;
  int b = 17;
  if (a > b) {
    printf("Larger: %d\\n", a);
    if (a % 2 == 0) {
      printf("Even\\n");
    } else {
      printf("Odd\\n");
    }
  } else {
    printf("Larger: %d\\n", b);
  }
  return 0;
}
`,checks:[{type:`output`,mode:`exact`,value:`Larger: 42
Even`}],hints:[`Use a % 2 == 0 to test for even numbers.`,`The even/odd check lives inside the branch where a is larger.`,`Print the label and the value in one printf: printf("Larger: %d\\n", a);`],reward:{xp:65,coins:18}},{id:`w2m5`,order:5,title:`BOSS: The Calendar Gate`,tagline:`Leap year logic`,skill:`boss · compound logic`,boss:!0,story:`The district's calendar is broken. A year is a leap year when it divides by 4, except centuries — unless they divide by 400.`,objective:`For year = 2024 print: 2024 is a leap year`,concept:{title:`Real rules need grouped logic`,points:[`(year % 4 == 0 && year % 100 != 0) || year % 400 == 0`,`Brackets decide the grouping: the century exception belongs to the first half only.`],snippet:`if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
  printf("%d is a leap year\\n", year);
}`,analogy:`The rule is a checklist with a footnote. Brackets make sure the footnote attaches to the right line.`},fieldNote:`Turning a written spec into grouped conditions is the core of translating requirements into code.`,starter:J(`Print whether 2024 is a leap year using the full rule`),solution:`#include <stdio.h>

int main() {
  int year = 2024;
  if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    printf("%d is a leap year\\n", year);
  } else {
    printf("%d is not a leap year\\n", year);
  }
  return 0;
}
`,checks:[{type:`output`,mode:`exact`,value:`2024 is a leap year`}],hints:[`Test divisibility with year % 4 == 0.`,`Group the century rule in its own brackets: (year % 4 == 0 && year % 100 != 0).`,`Then OR it with the 400 rule: || year % 400 == 0.`],reward:{xp:130,coins:42}}]},{id:`w3`,index:3,name:`Loop Citadel`,subtitle:`Repetition and accumulation`,blurb:`The citadel is built from repeating corridors. Learn to walk them without writing the same line twice.`,accent:`emerald`,missions:[{id:`w3m1`,order:1,title:`Count the steps`,tagline:`for loops`,skill:`for`,story:`Five lamps line the entrance. Light them in order, one number at a time.`,objective:`Print 1 to 5, each on its own line.`,concept:{title:`for packs three things into one line`,points:[`for (int i = 1; i <= 5; i++) means: start at 1, keep going while i <= 5, add 1 after each pass.`,`The loop body runs once per value of i.`],snippet:`for (int i = 1; i <= 5; i++) {
  printf("%d\\n", i);
}`,analogy:`A for loop is a turnstile with a counter: enter, do the work, tick, repeat.`},fieldNote:`Almost every array, list and file you process in a real project is walked by a for loop.`,starter:J(`Print the numbers 1 through 5, one per line`),solution:`#include <stdio.h>

int main() {
  for (int i = 1; i <= 5; i++) {
    printf("%d\\n", i);
  }
  return 0;
}
`,checks:[{type:`output`,mode:`exact`,value:`1
2
3
4
5`}],hints:[`Start i at 1 and stop when i is no longer <= 5.`,`i++ adds one after each pass.`,`printf("%d\\n", i) inside the braces.`],reward:{xp:60,coins:16}},{id:`w3m2`,order:2,title:`Countdown`,tagline:`while loops`,skill:`while`,story:`The launch sequencer counts down from five, then releases the lock.`,objective:`Print 5 4 3 2 1 then Liftoff!, each on its own line.`,concept:{title:`while repeats until the condition fails`,points:[`while (n > 0) keeps running as long as n is positive.`,`You must change something inside the loop, or it never ends.`],snippet:`while (n > 0) {
  printf("%d\\n", n);
  n--;
}
printf("Liftoff!\\n");`,analogy:`A while loop is a door that keeps opening until you turn the handle the other way.`},fieldNote:`Use while when you don't know how many iterations you need — reading input, waiting for a condition.`,starter:J(`Count down from 5 to 1, then print "Liftoff!"`),solution:`#include <stdio.h>

int main() {
  int n = 5;
  while (n > 0) {
    printf("%d\\n", n);
    n--;
  }
  printf("Liftoff!\\n");
  return 0;
}
`,checks:[{type:`output`,mode:`exact`,value:`5
4
3
2
1
Liftoff!`}],hints:[`Decrement n inside the loop with n--.`,`Liftoff prints after the loop, not inside it.`,`Otherwise you'll print Liftoff five times.`],reward:{xp:65,coins:17}},{id:`w3m3`,order:3,title:`Accumulate`,tagline:`Running totals`,skill:`accumulator pattern`,story:`The citadel's ledger needs the total of the first ten steps.`,objective:`Sum 1 through 10 and print: Sum: 55`,concept:{title:`Start at zero, add as you go`,points:[`int sum = 0; before the loop, then sum += i inside it.`,`The variable must be declared outside the loop or it resets every pass.`],snippet:`int sum = 0;
for (int i = 1; i <= 10; i++) {
  sum += i;
}
printf("Sum: %d\\n", sum);`,analogy:`A running total is a bucket. The loop keeps pouring one more unit in.`},fieldNote:`Totals, counts, averages, scores: the accumulator pattern is the backbone of data processing.`,starter:J(`Sum the numbers 1 through 10 and print: Sum: 55`),solution:`#include <stdio.h>

int main() {
  int sum = 0;
  for (int i = 1; i <= 10; i++) {
    sum += i;
  }
  printf("Sum: %d\\n", sum);
  return 0;
}
`,checks:[{type:`output`,mode:`exact`,value:`Sum: 55`}],hints:[`Declare int sum = 0; before the loop starts.`,`Add inside the loop with sum += i;`,`Print after the loop closes.`],reward:{xp:70,coins:19}},{id:`w3m4`,order:4,title:`Tower of stars`,tagline:`Nested loops`,skill:`nested loops`,story:`Each floor of the tower is one star longer than the floor below it.`,objective:`Print a 5-row triangle of stars.`,concept:{title:`A loop inside a loop`,points:[`The outer loop walks the rows. The inner loop prints the stars for that row.`,`The inner loop's limit depends on the outer counter: col <= row.`],snippet:`for (int row = 1; row <= 5; row++) {
  for (int col = 1; col <= row; col++) printf("*");
  printf("\\n");
}`,analogy:`Rows of seats: you walk each row, and for every row you touch each seat in it.`},fieldNote:`Grids, tables, matrices and image pixels are all nested loops. This is the shape of that work.`,starter:J(`Print 5 rows: *, **, ***, ****, *****`),solution:`#include <stdio.h>

int main() {
  for (int row = 1; row <= 5; row++) {
    for (int col = 1; col <= row; col++) {
      printf("*");
    }
    printf("\\n");
  }
  return 0;
}
`,checks:[{type:`output`,mode:`exact`,value:`*
**
***
****
*****`}],hints:[`The newline belongs to the outer loop, after the inner loop finishes.`,`The inner loop runs from 1 to row, so row 3 prints three stars.`,`If the triangle is one long line, move printf("\\n") outside the inner loop.`],reward:{xp:80,coins:22}},{id:`w3m5`,order:5,title:`BOSS: FizzBuzz Gate`,tagline:`The classic interview gate`,skill:`boss · loops + conditions`,boss:!0,story:`The citadel's gatekeeper asks the oldest question in programming. Multiples of 3 say Fizz, of 5 say Buzz, of both say FizzBuzz.`,objective:`Print FizzBuzz for 1 to 15, one value per line.`,concept:{title:`Check the most specific case first`,points:[`A number divisible by both 3 and 5 must be tested before either alone.`,`i % 15 == 0 is the same test as divisible by 3 and 5.`],snippet:`if (i % 15 == 0) printf("FizzBuzz\\n");
else if (i % 3 == 0) printf("Fizz\\n");
else if (i % 5 == 0) printf("Buzz\\n");
else printf("%d\\n", i);`,analogy:`Answer the hardest question first, or the easier one will answer for it.`},fieldNote:`Ordering conditions from most to least specific is a habit that prevents real logic bugs.`,starter:J(`FizzBuzz from 1 to 15`),solution:`#include <stdio.h>

int main() {
  for (int i = 1; i <= 15; i++) {
    if (i % 15 == 0) {
      printf("FizzBuzz\\n");
    } else if (i % 3 == 0) {
      printf("Fizz\\n");
    } else if (i % 5 == 0) {
      printf("Buzz\\n");
    } else {
      printf("%d\\n", i);
    }
  }
  return 0;
}
`,checks:[{type:`output`,mode:`exact`,value:`1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz`}],hints:[`Loop i from 1 to 15.`,`Test i % 15 first, otherwise 15 prints Fizz or Buzz only.`,`The final else prints the number itself with %d.`],reward:{xp:150,coins:48}}]},{id:`w4`,index:4,name:`Function Forge`,subtitle:`Functions and recursion`,blurb:`Here the citadel's machines are built. Break a big problem into small, named parts.`,accent:`amber`,missions:[{id:`w4m1`,order:1,title:`Forge a function`,tagline:`Define and call`,skill:`functions`,story:`The forge needs a reusable tool: one that squares any number you hand it.`,objective:`Write int square(int n) and print square(4).`,concept:{title:`A function is a named machine`,points:[`int square(int n) { return n * n; } takes one input, gives one output.`,`Define it above main(), then call it like any value: square(4).`],snippet:`int square(int n) {
  return n * n;
}

int main() {
  printf("%d\\n", square(4));
}`,analogy:`A function is a vending machine: you put something in, one thing comes out, same every time.`},fieldNote:`Functions are how real codebases stay readable. If you can name it, you can test it.`,starter:vt(`int square(int n) {
  // return n multiplied by itself
}`,`Print square(4)`),solution:`#include <stdio.h>

int square(int n) {
  return n * n;
}

int main() {
  printf("%d\\n", square(4));
  return 0;
}
`,checks:[{type:`output`,mode:`exact`,value:`16`}],hints:[`The function needs a return statement: return n * n;`,`Call it inside printf as the value for %d.`,`square(4) evaluates to 16 before printf prints it.`],reward:{xp:70,coins:18}},{id:`w4m2`,order:2,title:`Two inputs`,tagline:`Parameters`,skill:`parameters`,story:`The forge now needs a tool that takes two numbers and adds them.`,objective:`Write int add(int a, int b) and print add(7, 35).`,concept:{title:`Parameters are ordered`,points:[`Each parameter gets its own type and name: int add(int a, int b).`,`Arguments are matched by position, so add(7, 35) puts 7 in a and 35 in b.`],snippet:`int add(int a, int b) {
  return a + b;
}`,analogy:`Parameters are slots in a machine's control panel. The order you plug things in matters.`},fieldNote:`Mismatched argument order is a real bug class. Name parameters so the order is obvious.`,starter:vt(`int add(int a, int b) {
  // return the sum
}`,`Print add(7, 35)`),solution:`#include <stdio.h>

int add(int a, int b) {
  return a + b;
}

int main() {
  printf("%d\\n", add(7, 35));
  return 0;
}
`,checks:[{type:`output`,mode:`exact`,value:`42`}],hints:[`Two parameters means two commas in the definition.`,`The body is just return a + b;`,`Call it as add(7, 35).`],reward:{xp:75,coins:19}},{id:`w4m3`,order:3,title:`Early exit`,tagline:`Return inside if`,skill:`return`,story:`The forge's comparator should answer immediately once it knows the answer.`,objective:`Write int max(int a, int b) that returns the larger value, then print max(19, 42).`,concept:{title:`return ends the function immediately`,points:[`Once a return runs, nothing after it in that function executes.`,`That lets you handle the obvious case first and let the rest of the body be the fallback.`],snippet:`int max(int a, int b) {
  if (a > b) return a;
  return b;
}`,analogy:`A return is walking out of the room. Everything after it in the room is abandoned.`},fieldNote:`Early returns flatten nested code. Guard clauses at the top of a function are standard practice.`,starter:vt(`int max(int a, int b) {
  // return the larger value
}`,`Print max(19, 42)`),solution:`#include <stdio.h>

int max(int a, int b) {
  if (a > b) {
    return a;
  }
  return b;
}

int main() {
  printf("%d\\n", max(19, 42));
  return 0;
}
`,checks:[{type:`output`,mode:`exact`,value:`42`}],hints:[`If a is bigger, return it right away.`,`If you reach the end of the function, b must be the larger one.`,`Make sure the second return isn't inside the if.`],reward:{xp:80,coins:20}},{id:`w4m4`,order:4,title:`Recursion engine`,tagline:`A function that calls itself`,skill:`recursion`,story:`The forge's oldest machine computes factorials by unfolding itself until it hits one.`,objective:`Write a recursive factorial and print factorial(5).`,concept:{title:`Base case, then shrink`,points:[`factorial(5) = 5 * factorial(4), down to factorial(1) = 1.`,`The base case stops the chain. Without it, the call stack overflows.`],snippet:`int factorial(int n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`,analogy:`Recursion is a stack of sticky notes: each one waits until the note below it is answered.`},fieldNote:`Recursion is the natural fit for trees, nested structures and divide-and-conquer algorithms.`,starter:vt(`int factorial(int n) {
  // base case, then n * factorial(n - 1)
}`,`Print factorial(5)`),solution:`#include <stdio.h>

int factorial(int n) {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

int main() {
  printf("%d\\n", factorial(5));
  return 0;
}
`,checks:[{type:`output`,mode:`exact`,value:`120`}],hints:[`Start with the stopping case: if (n <= 1) return 1;`,`Otherwise return n * factorial(n - 1);`,`Without the base case the call stack overflows and the run fails.`],reward:{xp:95,coins:24}},{id:`w4m5`,order:5,title:`BOSS: Fibonacci Core`,tagline:`Two recursive calls`,skill:`boss · recursion`,boss:!0,story:`The core computes each number as the sum of the two before it. It is slow, elegant and the classic first recursion exam question.`,objective:`Print fib(10) using recursion. The answer is 55.`,concept:{title:`Branching recursion`,points:[`fib(n) = fib(n - 1) + fib(n - 2), with fib(0) = 0 and fib(1) = 1.`,`Two recursive calls mean the work doubles at each level — this is why memoisation exists.`],snippet:`int fib(int n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}`,analogy:`Each call asks two smaller questions. The tree of questions grows fast.`},fieldNote:`Understanding this cost is exactly what leads to dynamic programming later in your degree.`,starter:vt(`int fib(int n) {
  // base case, then fib(n - 1) + fib(n - 2)
}`,`Print fib(10)`),solution:`#include <stdio.h>

int fib(int n) {
  if (n <= 1) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}

int main() {
  printf("%d\\n", fib(10));
  return 0;
}
`,checks:[{type:`output`,mode:`exact`,value:`55`}],hints:[`Two base cases collapse into one: if (n <= 1) return n;`,`The recursive step adds the previous two results.`,`fib(10) = 55. If you get 89 you printed fib(11).`],reward:{xp:170,coins:50}}]},{id:`w5`,index:5,name:`Array Archives`,subtitle:`Arrays and strings`,blurb:`Shelves of identical drawers, numbered from zero. The archive holds every record you'll ever need.`,accent:`blue`,missions:[{id:`w5m1`,order:1,title:`Open a drawer`,tagline:`Indexing arrays`,skill:`arrays`,story:`Five score drawers sit in a row. Reach into the third one.`,objective:`Store {10, 20, 30, 40, 50} in an int array and print the third value as: Third: 30`,concept:{title:`Arrays are numbered from zero`,points:[`int scores[5] = {10, 20, 30, 40, 50}; creates five ints in a row.`,`The third value is scores[2] because counting starts at 0.`],snippet:`int scores[5] = {10, 20, 30, 40, 50};
printf("Third: %d\\n", scores[2]);`,analogy:`Index 0 is the first drawer. Off-by-one is the most common bug in this world.`},fieldNote:`Every array, buffer and string in C is indexed from 0. Getting comfortable here prevents a thousand bugs.`,starter:J(`Create an array {10, 20, 30, 40, 50} and print the third value: Third: 30`),solution:`#include <stdio.h>

int main() {
  int scores[5] = {10, 20, 30, 40, 50};
  printf("Third: %d\\n", scores[2]);
  return 0;
}
`,checks:[{type:`output`,mode:`exact`,value:`Third: 30`}],hints:[`Declare it with a size and an initialiser list.`,`The third drawer is index 2, not 3.`,`printf("Third: %d\\n", scores[2]);`],reward:{xp:80,coins:20}},{id:`w5m2`,order:2,title:`Sum the archive`,tagline:`Arrays and loops together`,skill:`array traversal`,story:`The archive needs a total of every score on the shelf.`,objective:`Sum {10, 20, 30, 40, 50} with a loop and print: Total: 150`,concept:{title:`Walk the array with an index`,points:[`A for loop from 0 to 4 visits every slot: i < 5, not i <= 5.`,`Going one past the end reads memory you don't own.`],snippet:`for (int i = 0; i < 5; i++) {
  sum += scores[i];
}`,analogy:`You don't need to know what's in the drawers to add them up, just how many there are.`},fieldNote:`Loop bounds are where buffer overflows are born. Say the range out loud: zero to length minus one.`,starter:J(`Sum the array {10, 20, 30, 40, 50} and print: Total: 150`),solution:`#include <stdio.h>

int main() {
  int scores[5] = {10, 20, 30, 40, 50};
  int sum = 0;
  for (int i = 0; i < 5; i++) {
    sum += scores[i];
  }
  printf("Total: %d\\n", sum);
  return 0;
}
`,checks:[{type:`output`,mode:`exact`,value:`Total: 150`}],hints:[`Start sum at 0 before the loop.`,`Use i < 5 so the last index is 4.`,`Add with sum += scores[i];`],reward:{xp:85,coins:21}},{id:`w5m3`,order:3,title:`Find the peak`,tagline:`Max in an array`,skill:`search pattern`,story:`One reading in the archive is the highest. The machine needs to know which.`,objective:`Find the largest value in {4, 19, 7, 23, 11} and print: Max: 23`,concept:{title:`Assume the first is the best, then compare`,points:[`Start with max = values[0], then loop from index 1.`,`Only replace max when you find something strictly larger.`],snippet:`int max = values[0];
for (int i = 1; i < 5; i++) {
  if (values[i] > max) max = values[i];
}`,analogy:`Keep the champion on the podium. A challenger only replaces them by winning.`},fieldNote:`This 'best so far' pattern becomes min, longest, highest scoring and top-N in real applications.`,starter:J(`Find the largest of {4, 19, 7, 23, 11} and print: Max: 23`),solution:`#include <stdio.h>

int main() {
  int values[5] = {4, 19, 7, 23, 11};
  int max = values[0];
  for (int i = 1; i < 5; i++) {
    if (values[i] > max) {
      max = values[i];
    }
  }
  printf("Max: %d\\n", max);
  return 0;
}
`,checks:[{type:`output`,mode:`exact`,value:`Max: 23`}],hints:[`Start max at values[0], not 0 — the array could be all negative.`,`Loop from i = 1 since you already have the first value.`,`Replace max only when values[i] > max.`],reward:{xp:90,coins:23}},{id:`w5m4`,order:4,title:`Strings are char arrays`,tagline:`Text in C`,skill:`strings`,story:`A name plate needs its text and its length. In C, a string is just characters with a zero at the end.`,objective:`Print Agent: Nova and Length: 4`,concept:{title:`The terminating zero`,points:[`char agent[] = "Nova"; stores N, o, v, a and a hidden \\0.`,`printf("%s") and strlen both stop at that zero. No zero means runaway memory reads.`],snippet:`char agent[] = "Nova";
printf("Agent: %s\\n", agent);
printf("Length: %d\\n", strlen(agent));`,analogy:`The zero is a full stop. Without punctuation, the reader keeps going into the next sentence.`},fieldNote:`Every text bug you'll meet in C traces back to buffers and terminators. Respect the zero.`,starter:J(`Print Agent: Nova and Length: 4 using a char array`),solution:`#include <stdio.h>
#include <string.h>

int main() {
  char agent[] = "Nova";
  printf("Agent: %s\\n", agent);
  printf("Length: %d\\n", strlen(agent));
  return 0;
}
`,checks:[{type:`output`,mode:`contains`,value:`Agent: Nova`},{type:`output`,mode:`contains`,value:`Length: 4`}],hints:[`char agent[] = "Nova"; lets the compiler size the array for you.`,`Use %s to print the whole string.`,`strlen(agent) returns 4 — the terminating zero isn't counted.`],reward:{xp:95,coins:24}},{id:`w5m5`,order:5,title:`BOSS: Reverse the archive`,tagline:`Backwards through a string`,skill:`boss · string traversal`,boss:!0,story:`The archive's final lock reads the word backwards. Print orbit reversed, one character at a time.`,objective:`Reverse the string orbit and print: tibro`,concept:{title:`Count down from the last index`,points:[`The last character of a 5-letter word sits at index 4, which is strlen(word) - 1.`,`Counting down with i-- and stopping at i >= 0 reverses any string.`],snippet:`int len = strlen(word);
for (int i = len - 1; i >= 0; i--) {
  printf("%c", word[i]);
}`,analogy:`Reading a sentence from the last word to the first, without moving the words themselves.`},fieldNote:`Reverse, palindrome and rotation checks are standard lab exercises and interview warm-ups.`,starter:J(`Reverse the string "orbit" and print it`),solution:`#include <stdio.h>
#include <string.h>

int main() {
  char word[] = "orbit";
  int len = strlen(word);
  for (int i = len - 1; i >= 0; i--) {
    printf("%c", word[i]);
  }
  printf("\\n");
  return 0;
}
`,checks:[{type:`output`,mode:`exact`,value:`tibro`}],hints:[`Start the loop at strlen(word) - 1, not at strlen(word).`,`Print each character with %c, not %s.`,`The loop must keep going while i >= 0.`],reward:{xp:180,coins:52}}]},{id:`w6`,index:6,name:`Pointer Wastes`,subtitle:`Addresses and memory`,blurb:`The last world is built from addresses. Every variable has one. Learn to follow it.`,accent:`rose`,missions:[{id:`w6m1`,order:1,title:`Follow the address`,tagline:`& and *`,skill:`pointers`,story:`The wastes only speak in addresses. Ask a variable where it lives, then read what's inside.`,objective:`Store 42 in energy, point p at it, then print *p.`,concept:{title:`& takes an address, * follows one`,points:[`int *p = &energy; stores the address of energy in p.`,`*p reads the value living at that address — the same 42.`],snippet:`int energy = 42;
int *p = &energy;
printf("%d\\n", *p);`,analogy:`& is writing down a house address. * is walking to that address and looking inside.`},fieldNote:`Pointers are how C passes big data cheaply and how every data structure in your degree is built.`,starter:J(`Store 42 in energy, point p at it, print *p`),solution:`#include <stdio.h>

int main() {
  int energy = 42;
  int *p = &energy;
  printf("%d\\n", *p);
  return 0;
}
`,checks:[{type:`output`,mode:`exact`,value:`42`}],hints:[`Declare the pointer as int *p;`,`Initialise it with the address: int *p = &energy;`,`Print the pointed-to value with *p, not p.`],reward:{xp:100,coins:26}},{id:`w6m2`,order:2,title:`Write through a pointer`,tagline:`Mutating through *`,skill:`dereference assignment`,story:`The shield generator is behind a locked panel. The only way in is through its address.`,objective:`With shield = 10 and a pointer p to it, add 5 through *p, then print: Shield: 15`,concept:{title:`*p = ... writes to the original`,points:[`*p = *p + 5; changes the variable p points at, not a copy.`,`This is why functions take pointers when they need to modify your variable.`],snippet:`int shield = 10;
int *p = &shield;
*p = *p + 5;`,analogy:`You're editing the original document, not a photocopy.`},fieldNote:`Pass-by-pointer is how C functions return more than one value or update a caller's data.`,starter:J(`Set shield to 10, point p at it, add 5 through *p, print: Shield: 15`),solution:`#include <stdio.h>

int main() {
  int shield = 10;
  int *p = &shield;
  *p = *p + 5;
  printf("Shield: %d\\n", shield);
  return 0;
}
`,checks:[{type:`output`,mode:`exact`,value:`Shield: 15`}],hints:[`The assignment target is *p, not p.`,`*p = *p + 5; reads through the pointer and writes back.`,`Print shield (not *p) to prove the original changed.`],reward:{xp:105,coins:28}},{id:`w6m3`,order:3,title:`Swap protocol`,tagline:`Pointers into functions`,skill:`pass by reference`,story:`Two values are stuck in the wrong order. A function can only fix them if it holds their addresses.`,objective:`Swap x = 9 and y = 2 using void swap(int *a, int *b), then print: x=2 y=9`,concept:{title:`Pass the address, change the original`,points:[`C passes arguments by value. Passing &x gives the function a way back to x.`,`Inside swap, *a and *b are the caller's variables.`],snippet:`void swap(int *a, int *b) {
  int temp = *a;
  *a = *b;
  *b = temp;
}`,analogy:`Handing someone your locker key instead of a photo of what's inside.`},fieldNote:`Every sorting algorithm you'll write in second year relies on exactly this swap.`,starter:vt(`void swap(int *a, int *b) {
  // use a temp int and the * operator
}`,`Swap x = 9 and y = 2 with swap(&x, &y), then print: x=2 y=9`),solution:`#include <stdio.h>

void swap(int *a, int *b) {
  int temp = *a;
  *a = *b;
  *b = temp;
}

int main() {
  int x = 9;
  int y = 2;
  swap(&x, &y);
  printf("x=%d y=%d\\n", x, y);
  return 0;
}
`,checks:[{type:`output`,mode:`exact`,value:`x=2 y=9`}],hints:[`Save one value in temp before overwriting it.`,`Write through the pointers: *a = *b;`,`Call it with addresses: swap(&x, &y);`],reward:{xp:115,coins:30}},{id:`w6m4`,order:4,title:`Pointer arithmetic`,tagline:`Arrays are addresses`,skill:`pointer arithmetic`,story:`An array is just its first address. Walk two steps forward and see what's there.`,objective:`With data = {3, 6, 9, 12} and p = data, print *(p + 2).`,concept:{title:`Adding to a pointer moves by elements`,points:[`The name of an array is the address of its first element, so p = data works.`,`p + 2 moves two ints forward, which is the same as data[2].`],snippet:`int data[4] = {3, 6, 9, 12};
int *p = data;
printf("%d\\n", *(p + 2));`,analogy:`Pointer arithmetic counts in whole houses, not in metres.`},fieldNote:`data[i] is literally defined as *(data + i). Knowing that makes C stop feeling magical.`,starter:J(`Point p at data = {3, 6, 9, 12} and print *(p + 2)`),solution:`#include <stdio.h>

int main() {
  int data[4] = {3, 6, 9, 12};
  int *p = data;
  printf("%d\\n", *(p + 2));
  return 0;
}
`,checks:[{type:`output`,mode:`exact`,value:`9`}],hints:[`You don't need & for an array: int *p = data;`,`p + 2 is an address; *(p + 2) is the value there.`,`That's the third element, 9.`],reward:{xp:125,coins:32}},{id:`w6m5`,order:5,title:`BOSS: The Memory Keeper`,tagline:`Walk the whole array`,skill:`boss · pointer iteration`,boss:!0,story:`The keeper accepts one number: the total of every value in the array, read only through a pointer.`,objective:`Sum {5, 8, 10, 12, 5} using a pointer and print: Sum: 40`,concept:{title:`Dereference inside the loop`,points:[`p + i gives the address of element i, so *(p + i) is its value.`,`The accumulator still starts at 0 and lives outside the loop.`],snippet:`int *p = data;
int sum = 0;
for (int i = 0; i < 5; i++) {
  sum += *(p + i);
}`,analogy:`You hold one address and count doors down the corridor instead of writing down all five.`},fieldNote:`This is the mental model behind every buffer, packet and dynamic array you will ever touch.`,starter:J(`Sum {5, 8, 10, 12, 5} through a pointer and print: Sum: 40`),solution:`#include <stdio.h>

int main() {
  int data[5] = {5, 8, 10, 12, 5};
  int *p = data;
  int sum = 0;
  for (int i = 0; i < 5; i++) {
    sum += *(p + i);
  }
  printf("Sum: %d\\n", sum);
  return 0;
}
`,checks:[{type:`output`,mode:`exact`,value:`Sum: 40`}],hints:[`Set the pointer once, before the loop: int *p = data;`,`Inside the loop add *(p + i), not p + i.`,`The sum needs to start at 0 outside the loop.`],reward:{xp:220,coins:60}}]}],bt=Y.flatMap(e=>e.missions.map(t=>({...t,world:e.id,worldName:e.name})));function xt(e){return bt.find(t=>t.id===e)||null}function St(e){return Y.find(t=>t.id===e)||null}function Ct(e,t){return!!t?.mastery?.[`world-${e}`]}function wt(e,t){let n=Y.findIndex(t=>t.id===e);if(n<=0)return!0;let r=Y[n-1];return r.missions.every(e=>!!t?.missions?.[e.id])&&Ct(r.id,t)}function Tt(e){for(let t of Y)if(!wt(t.id,e)||t.missions.some(t=>!e?.missions?.[t.id])||!Ct(t.id,e))return t;return Y[Y.length-1]}function Et(e,t){return!xt(e)||t?.missions?.[e]||t?.mastery?.[`topic-${e}`]?!1:Ot(e,t)}function Dt(e,t){let n=St(e);return!!n&&n.missions.every(e=>!!t?.missions?.[e.id])}function Ot(e,t){let n=xt(e);if(!n||!wt(n.world,t))return!1;let r=St(n.world),i=r.missions.findIndex(t=>t.id===e);return i===0||!!t?.missions?.[r.missions[i-1].id]}function kt(e){let t=Tt(e);return t&&(t.missions.find(t=>!e?.missions?.[t.id])||t.missions[t.missions.length-1])||null}function At(e,t){let n=e.missions.filter(e=>t?.missions?.[e.id]).length;return{done:n,total:e.missions.length,pct:Math.round(n/e.missions.length*100)}}function jt(e){let t=bt.findIndex(t=>t.id===e);return t>=0&&bt[t+1]||null}var Mt=bt.filter(e=>e.boss).map(e=>e.id),Nt=[{id:`first_light`,name:`First Light`,description:`Complete your first mission`,icon:`Sparkles`,test:e=>Object.keys(e.missions).length>=1},{id:`momentum`,name:`Momentum`,description:`Complete 5 missions`,icon:`Zap`,test:e=>Object.keys(e.missions).length>=5},{id:`operator`,name:`Operator`,description:`Complete 12 missions`,icon:`CircuitBoard`,test:e=>Object.keys(e.missions).length>=12},{id:`flawless`,name:`Flawless Five`,description:`Earn 3 stars on five missions`,icon:`Star`,test:e=>Object.values(e.missions).filter(e=>e.stars>=3).length>=5},{id:`boss_down`,name:`Boss Down`,description:`Clear a world boss`,icon:`Skull`,test:e=>Mt.some(t=>e.missions[t])},{id:`zone_clear`,name:`Zone Clear`,description:`Clear every mission in a world`,icon:`Map`,test:e=>Y.some(t=>t.missions.every(t=>e.missions[t.id]))},{id:`perfect_world`,name:`Perfect Zone`,description:`Earn 3 stars on every mission in one world`,icon:`Crown`,test:e=>Y.some(t=>t.missions.every(t=>(e.missions[t.id]?.stars||0)>=3))},{id:`streak_3`,name:`Warm Circuit`,description:`Play 3 days in a row`,icon:`Flame`,test:e=>(e.streak?.best||0)>=3},{id:`streak_7`,name:`Locked In`,description:`Play 7 days in a row`,icon:`Flame`,test:e=>(e.streak?.best||0)>=7},{id:`pointer_adept`,name:`Pointer Adept`,description:`Complete a pointer mission`,icon:`ArrowLeftRight`,test:e=>Object.keys(e.missions).some(e=>xt(e)?.world===`w6`)},{id:`proven`,name:`Already Knew It`,description:`Pass a topic skip test`,icon:`Zap`,test:e=>Object.keys(e.mastery||{}).some(e=>e.startsWith(`topic-`))},{id:`world_scholar`,name:`World Scholar`,description:`Clear a World Mastery Challenge`,icon:`Crown`,test:e=>Object.keys(e.mastery||{}).some(e=>e.startsWith(`world-`))},{id:`mastery_complete`,name:`Master of C`,description:`Pass all six World Mastery Challenges`,icon:`Trophy`,test:e=>Y.every(t=>e.mastery?.[`world-${t.id}`])},{id:`completionist`,name:`Systems Complete`,description:`Complete all 30 missions`,icon:`Trophy`,test:e=>Object.keys(e.missions).length>=30}];function Pt(e,t={}){let n={...t},r=[];for(let t of Nt)!n[t.id]&&t.test(e)&&(n[t.id]=new Date().toISOString(),r.push(t));return{unlocked:n,newly:r}}function Ft(e,t,n){let r=e.progress||{},i=r.missions?.[t],a=Math.max(i?.stars||0,n.stars||0),o=Math.max(0,a-(i?.stars||0)),s={...r,xp:(r.xp||0)+(n.xp||0),coins:(r.coins||0)+(n.coins||0),stars:(r.stars||0)+o,missions:{...r.missions||{},[t]:{stars:a,attempts:n.attempts||1,hints:n.hints||0,completedAt:new Date().toISOString()}},streak:It(r.streak)},{unlocked:c,newly:l}=Pt(s,r.achievements||{});return s.achievements=c,{save:{...e,progress:s,updatedAt:new Date().toISOString()},newly:l}}function It(e){let t=new Date,n=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}-${String(t.getDate()).padStart(2,`0`)}`,r=new Date;r.setDate(r.getDate()-1);let i=`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,`0`)}-${String(r.getDate()).padStart(2,`0`)}`,a=e||{count:0,best:0,last:null};if(a.last===n)return a;let o=a.last===i?(a.count||0)+1:1;return{count:o,best:Math.max(a.best||0,o),last:n}}var X=e=>`#include <stdio.h>\n\nint main() {\n  // ${e}\n  \n  return 0;\n}\n`,Z=e=>[{type:`output`,mode:`exact`,value:e}],Q=(e,t)=>({id:`topic-${e}`,kind:`topic`,missionId:e,...t}),Lt=(e,t)=>({id:`world-${e}`,kind:`world`,worldId:e,...t}),Rt={w1m1:Q(`w1m1`,{title:`Lab banner`,brief:`Practical 1: write a program to print the name of your laboratory and your university on separate lines, exactly as the lab manual shows.`,prompt:`Print two lines: C PROGRAMMING LAB, then Savitribai Phule Pune University.`,concepts:[`printf`,`escape sequences`,`statement order`],starter:X(`print the two banner lines`),checks:Z(`C PROGRAMMING LAB
Savitribai Phule Pune University`),hints:[`One printf can print one line; use \\n where the line should break.`,`C is case sensitive: C PROGRAMMING LAB must be in capitals.`,`printf("C PROGRAMMING LAB\\n"); then printf("Savitribai Phule Pune University\\n");`],solution:`#include <stdio.h>

int main() {
  printf("C PROGRAMMING LAB\\n");
  printf("Savitribai Phule Pune University\\n");
  return 0;
}
`,reward:{xp:70,coins:15},revisit:[`w1m1`]}),w1m2:Q(`w1m2`,{title:`Student record`,brief:`Practical 2: declare variables for a student's roll number and marks, assign them, and print the record.`,prompt:`Use roll number 23107 and marks 87. Print Roll: 23107 and Marks: 87.`,concepts:[`int variables`,`%d`,`declaration vs assignment`],starter:X(`declare roll and marks, then print both`),checks:Z(`Roll: 23107
Marks: 87`),hints:[`Declare both variables before you print anything: int roll = 23107;`,`Use %d once per integer, and pass the variable after the format string.`,`printf("Roll: %d\\n", roll); and printf("Marks: %d\\n", marks);`],solution:`#include <stdio.h>

int main() {
  int roll = 23107;
  int marks = 87;
  printf("Roll: %d\\n", roll);
  printf("Marks: %d\\n", marks);
  return 0;
}
`,reward:{xp:70,coins:15},revisit:[`w1m2`]}),w1m3:Q(`w1m3`,{title:`Salary slip`,brief:`Practical 3: a salary slip mixes a decimal amount, a decimal bonus and a single-letter grade. Store each in the correct type.`,prompt:`Salary 25000.50, bonus 2500.25, grade 'A'. Print each with two decimals or as a character.`,concepts:[`double`,`char`,`%.2f`,`%c`],starter:X(`store salary, bonus and grade, then print them`),checks:Z(`Salary: 25000.50
Bonus: 2500.25
Grade: A`),hints:[`25000.50 cannot live in an int — it needs double.`,`%.2f keeps exactly two decimal places; %c prints a char.`,`char grade = 'A'; uses single quotes, not double quotes.`],solution:`#include <stdio.h>

int main() {
  double salary = 25000.50;
  double bonus = 2500.25;
  char grade = 'A';
  printf("Salary: %.2f\\n", salary);
  printf("Bonus: %.2f\\n", bonus);
  printf("Grade: %c\\n", grade);
  return 0;
}
`,reward:{xp:75,coins:16},revisit:[`w1m3`]}),w1m4:Q(`w1m4`,{title:`Simple calculator`,brief:`Practical 4: implement a calculator for two numbers using all five arithmetic operators. x = 17 and y = 5 come from the lab sheet.`,prompt:`Print Sum, Difference, Product, Quotient and Remainder — one per line, in that order.`,concepts:[`arithmetic operators`,`integer division`,`modulus`],starter:X(`x = 17, y = 5: print all five results`),checks:Z(`Sum: 22
Difference: 12
Product: 85
Quotient: 3
Remainder: 2`),hints:[`The five operators are + - * / and %.`,`17 / 5 gives 3 because both numbers are ints — that is exactly what the lab expects here.`,`Remainder comes from the modulus operator: x % y.`],solution:`#include <stdio.h>

int main() {
  int x = 17;
  int y = 5;
  printf("Sum: %d\\n", x + y);
  printf("Difference: %d\\n", x - y);
  printf("Product: %d\\n", x * y);
  printf("Quotient: %d\\n", x / y);
  printf("Remainder: %d\\n", x % y);
  return 0;
}
`,reward:{xp:85,coins:18},revisit:[`w1m4`]}),w1m5:Q(`w1m5`,{title:`Percentage report`,brief:`Practical 5: three subject marks out of 100 each — 78, 85 and 92. Compute the total and the percentage.`,prompt:`Print Total: 255 and Percentage: 85.00 with two decimals.`,concepts:[`accumulation`,`double division`,`%.2f`],starter:X(`total three marks, then compute percentage`),checks:Z(`Total: 255
Percentage: 85.00`),hints:[`Add the three marks into an int total.`,`Percentage = total / 300.0 * 100. Dividing by an int truncates.`,`printf("Percentage: %.2f\\n", percentage);`],solution:`#include <stdio.h>

int main() {
  int m1 = 78;
  int m2 = 85;
  int m3 = 92;
  int total = m1 + m2 + m3;
  double percentage = total / 300.0 * 100;
  printf("Total: %d\\n", total);
  printf("Percentage: %.2f\\n", percentage);
  return 0;
}
`,reward:{xp:95,coins:20},revisit:[`w1m5`]}),w2m1:Q(`w2m1`,{title:`Even or odd`,brief:`Practical 6: check whether a number entered in the lab is even or odd using the modulus operator.`,prompt:`For 47 print exactly: 47 is odd`,concepts:[`if / else`,`%`,`equality`],starter:X(`check whether 47 is even or odd`),checks:Z(`47 is odd`),hints:[`A number is even when n % 2 == 0.`,`The else branch handles every other case.`,`printf("%d is odd\\n", n); inside the else.`],solution:`#include <stdio.h>

int main() {
  int n = 47;
  if (n % 2 == 0) {
    printf("%d is even\\n", n);
  } else {
    printf("%d is odd\\n", n);
  }
  return 0;
}
`,reward:{xp:80,coins:16},revisit:[`w2m1`]}),w2m2:Q(`w2m2`,{title:`Largest of three`,brief:`Practical 7: the classic first-year question — find the largest of three numbers using an if-else ladder.`,prompt:`a = 25, b = 78, c = 43. Print: Largest: 78`,concepts:[`else-if ladder`,`comparisons`,`ordering conditions`],starter:X(`find the largest of 25, 78 and 43`),checks:Z(`Largest: 78`),hints:[`Test a against both others first: if (a >= b && a >= c).`,`Then test b against c in the middle rung.`,`The last else needs no condition — it is the only one left.`],solution:`#include <stdio.h>

int main() {
  int a = 25;
  int b = 78;
  int c = 43;
  if (a >= b && a >= c) {
    printf("Largest: %d\\n", a);
  } else if (b >= a && b >= c) {
    printf("Largest: %d\\n", b);
  } else {
    printf("Largest: %d\\n", c);
  }
  return 0;
}
`,reward:{xp:85,coins:17},revisit:[`w2m2`]}),w2m3:Q(`w2m3`,{title:`Grade calculation`,brief:`Practical 8: convert a percentage into the university's grade bands — 75+ Distinction, 60+ First Class, 50+ Second Class, 40+ Pass, otherwise Fail.`,prompt:`For 68 print Percentage: 68.00 then Grade: First Class`,concepts:[`else-if ladder`,`boundaries`,`%.2f`],starter:X(`percentage 68.00: print the grade band`),checks:Z(`Percentage: 68.00
Grade: First Class`),hints:[`Start with the highest band: if (pct >= 75).`,`68 is not >= 75 but it is >= 60, so the second rung catches it.`,`Print the percentage first with %.2f, then the grade.`],solution:`#include <stdio.h>

int main() {
  double pct = 68.00;
  printf("Percentage: %.2f\\n", pct);
  if (pct >= 75) {
    printf("Grade: Distinction\\n");
  } else if (pct >= 60) {
    printf("Grade: First Class\\n");
  } else if (pct >= 50) {
    printf("Grade: Second Class\\n");
  } else if (pct >= 40) {
    printf("Grade: Pass\\n");
  } else {
    printf("Grade: Fail\\n");
  }
  return 0;
}
`,reward:{xp:90,coins:18},revisit:[`w2m3`]}),w2m4:Q(`w2m4`,{title:`Temperature conversion`,brief:`Practical 9: convert Celsius to Fahrenheit with the formula F = C * 9 / 5 + 32, keeping two decimal places.`,prompt:`For 37 C print Celsius: 37.00 then Fahrenheit: 98.60`,concepts:[`floating point arithmetic`,`operator precedence`,`%.2f`],starter:X(`convert 37 C to Fahrenheit`),checks:Z(`Celsius: 37.00
Fahrenheit: 98.60`),hints:[`Divide by 5.0, not 5, or the whole expression becomes integer arithmetic.`,`Store Celsius in a double so it prints with decimals.`,`double f = c * 9 / 5.0 + 32;`],solution:`#include <stdio.h>

int main() {
  double c = 37;
  double f = c * 9 / 5.0 + 32;
  printf("Celsius: %.2f\\n", c);
  printf("Fahrenheit: %.2f\\n", f);
  return 0;
}
`,reward:{xp:85,coins:17},revisit:[`w2m4`]}),w2m5:Q(`w2m5`,{title:`Leap year check`,brief:`Practical 10: apply the full leap-year rule, including the century exception, to a year from the lab sheet.`,prompt:`For 2100 print exactly: 2100 is not a leap year`,concepts:[`compound conditions`,`brackets`,`&& / ||`],starter:X(`is 2100 a leap year?`),checks:Z(`2100 is not a leap year`),hints:[`2100 divides by 4, so the simple rule would wrongly call it a leap year.`,`The century exception belongs to the first half: (y % 4 == 0 && y % 100 != 0).`,`OR that whole group with y % 400 == 0.`],solution:`#include <stdio.h>

int main() {
  int y = 2100;
  if ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0) {
    printf("%d is a leap year\\n", y);
  } else {
    printf("%d is not a leap year\\n", y);
  }
  return 0;
}
`,reward:{xp:105,coins:21},revisit:[`w2m5`]}),w3m1:Q(`w3m1`,{title:`Multiplication table`,brief:`Practical 11: print the multiplication table of 7 from 1 to 5 using a for loop.`,prompt:`Each line reads 7 x n = result.`,concepts:[`for loop`,`loop counter`,`formatted output`],starter:X(`table of 7, first five rows`),checks:Z(`7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
7 x 4 = 28
7 x 5 = 35`),hints:[`Loop i from 1 to 5 inclusive.`,`Print with three placeholders: printf("7 x %d = %d\\n", i, 7 * i);`,`The loop condition must be i <= 5, not i < 5.`],solution:`#include <stdio.h>

int main() {
  for (int i = 1; i <= 5; i++) {
    printf("7 x %d = %d\\n", i, 7 * i);
  }
  return 0;
}
`,reward:{xp:85,coins:17},revisit:[`w3m1`]}),w3m2:Q(`w3m2`,{title:`Sum of digits`,brief:`Practical 12: find the sum of the digits of a number using a while loop and the modulus operator.`,prompt:`For 472 print: Sum of digits: 13`,concepts:[`while loop`,`% 10`,`integer division`],starter:X(`sum the digits of 472`),checks:Z(`Sum of digits: 13`),hints:[`n % 10 gives the last digit; add it to your total.`,`n / 10 removes that digit — integer division drops the remainder.`,`Keep looping while n > 0, using a copy so the original stays intact.`],solution:`#include <stdio.h>

int main() {
  int n = 472;
  int sum = 0;
  while (n > 0) {
    sum += n % 10;
    n = n / 10;
  }
  printf("Sum of digits: %d\\n", sum);
  return 0;
}
`,reward:{xp:95,coins:19},revisit:[`w3m2`]}),w3m3:Q(`w3m3`,{title:`Factorial`,brief:`Practical 13: compute the factorial of 6 with a running product inside a loop.`,prompt:`Print: Factorial: 720`,concepts:[`accumulator pattern`,`for loop`,`products`],starter:X(`factorial of 6`),checks:Z(`Factorial: 720`),hints:[`A product accumulator must start at 1, not 0.`,`Multiply in the loop: factorial = factorial * i;`,`Loop i from 1 to 6.`],solution:`#include <stdio.h>

int main() {
  int fact = 1;
  for (int i = 1; i <= 6; i++) {
    fact = fact * i;
  }
  printf("Factorial: %d\\n", fact);
  return 0;
}
`,reward:{xp:90,coins:18},revisit:[`w3m3`]}),w3m4:Q(`w3m4`,{title:`Number triangle`,brief:`Practical 14: the standard pattern-printing question — a right triangle of numbers, four rows deep.`,prompt:`Row n prints the numbers 1 to n separated by single spaces.`,concepts:[`nested loops`,`row / column counters`,`pattern printing`],starter:X(`print a 4-row number triangle`),checks:Z(`1
1 2
1 2 3
1 2 3 4`),hints:[`The outer loop walks rows 1 to 4; the inner loop prints columns 1 to row.`,`Print the newline after the inner loop has finished, inside the outer loop.`,`Use printf("%d ", col) then a separate printf("\\n").`],solution:`#include <stdio.h>

int main() {
  for (int row = 1; row <= 4; row++) {
    for (int col = 1; col <= row; col++) {
      printf("%d ", col);
    }
    printf("\\n");
  }
  return 0;
}
`,reward:{xp:105,coins:21},revisit:[`w3m4`]}),w3m5:Q(`w3m5`,{title:`Prime check`,brief:`Practical 15: test whether 29 is prime by trying every divisor from 2 upwards.`,prompt:`Print exactly: 29 is prime`,concepts:[`loops + conditions`,`divisibility`,`flag variables`],starter:X(`check whether 29 is prime`),checks:Z(`29 is prime`),hints:[`Start a flag at 1 (assume prime) and set it to 0 when you find a divisor.`,`Loop d from 2 while d < n; if n % d == 0 it is not prime.`,`Print based on the flag after the loop ends.`],solution:`#include <stdio.h>

int main() {
  int n = 29;
  int prime = 1;
  for (int d = 2; d < n; d++) {
    if (n % d == 0) {
      prime = 0;
    }
  }
  if (prime) {
    printf("%d is prime\\n", n);
  } else {
    printf("%d is not prime\\n", n);
  }
  return 0;
}
`,reward:{xp:110,coins:22},revisit:[`w3m5`]}),w4m1:Q(`w4m1`,{title:`Area function`,brief:`Practical 16: write a function that returns the area of a rectangle, then call it from main.`,prompt:`int areaRect(int l, int b) with l = 14, b = 9. Print: Area: 126`,concepts:[`function definition`,`parameters`,`return`],starter:X(`define int areaRect(int l, int b) and print areaRect(14, 9)`),checks:[...Z(`Area: 126`),{type:`code`,value:`int\\s+areaRect\\s*\\(`}],hints:[`Define the function above main(), with its return type written first.`,`The body is a single return statement: return l * b;`,`Call it inside printf: printf("Area: %d\\n", areaRect(14, 9));`],solution:`#include <stdio.h>

int areaRect(int l, int b) {
  return l * b;
}

int main() {
  printf("Area: %d\\n", areaRect(14, 9));
  return 0;
}
`,reward:{xp:95,coins:19},revisit:[`w4m1`]}),w4m2:Q(`w4m2`,{title:`Digits function`,brief:`Practical 17: move the sum-of-digits logic into a reusable function that takes the number as a parameter.`,prompt:`int digitSum(int n) with n = 4726. Print: Digit sum: 19`,concepts:[`parameters`,`return values`,`loops inside functions`],starter:X(`define int digitSum(int n) and print digitSum(4726)`),checks:[...Z(`Digit sum: 19`),{type:`code`,value:`int\\s+digitSum\\s*\\(`}],hints:[`The function needs a local total and a loop over n % 10 and n / 10.`,`Do not print inside the function — return the number.`,`printf("Digit sum: %d\\n", digitSum(4726));`],solution:`#include <stdio.h>

int digitSum(int n) {
  int sum = 0;
  while (n > 0) {
    sum += n % 10;
    n = n / 10;
  }
  return sum;
}

int main() {
  printf("Digit sum: %d\\n", digitSum(4726));
  return 0;
}
`,reward:{xp:100,coins:20},revisit:[`w4m2`]}),w4m3:Q(`w4m3`,{title:`Largest of three, as a function`,brief:`Practical 18: rewrite the largest-of-three logic as a function with three parameters.`,prompt:`int largest(int a, int b, int c) with 12, 45, 38. Print: Largest: 45`,concepts:[`multiple parameters`,`early return`,`function reuse`],starter:X(`define int largest(int a, int b, int c) and print largest(12, 45, 38)`),checks:[...Z(`Largest: 45`),{type:`code`,value:`int\\s+largest\\s*\\(`}],hints:[`You can return the answer as soon as you know it.`,`Compare a then b; if neither wins, c is the largest.`,`Make sure the final return is not inside the if.`],solution:`#include <stdio.h>

int largest(int a, int b, int c) {
  if (a >= b && a >= c) {
    return a;
  }
  if (b >= c) {
    return b;
  }
  return c;
}

int main() {
  printf("Largest: %d\\n", largest(12, 45, 38));
  return 0;
}
`,reward:{xp:105,coins:21},revisit:[`w4m3`]}),w4m4:Q(`w4m4`,{title:`Recursive sum`,brief:`Practical 19: write a recursive function for the sum of the first n natural numbers and call it with 10.`,prompt:`int sumTo(int n) returning 1 + 2 + ... + n. Print: Sum: 55`,concepts:[`recursion`,`base case`,`recursive step`],starter:X(`define int sumTo(int n) recursively and print sumTo(10)`),checks:[...Z(`Sum: 55`),{type:`code`,value:`sumTo\\s*\\(\\s*n\\s*-\\s*1`}],hints:[`Base case: if (n <= 0) return 0;`,`Recursive step: return n + sumTo(n - 1);`,`Without the base case the call stack overflows.`],solution:`#include <stdio.h>

int sumTo(int n) {
  if (n <= 0) {
    return 0;
  }
  return n + sumTo(n - 1);
}

int main() {
  printf("Sum: %d\\n", sumTo(10));
  return 0;
}
`,reward:{xp:110,coins:22},revisit:[`w4m4`]}),w4m5:Q(`w4m5`,{title:`Recursive GCD`,brief:`Practical 20: Euclid's algorithm is the standard recursion example in first-year C. Find the GCD of 48 and 18.`,prompt:`int gcd(int a, int b). Print: GCD: 6`,concepts:[`recursion`,`modulus`,`function contracts`],starter:X(`define int gcd(int a, int b) and print gcd(48, 18)`),checks:[...Z(`GCD: 6`),{type:`code`,value:`gcd\\s*\\(\\s*b\\s*,\\s*a\\s*%\\s*b`}],hints:[`Base case: when b is 0, a is the answer.`,`Otherwise recurse with gcd(b, a % b).`,`The order of the arguments swaps on purpose.`],solution:`#include <stdio.h>

int gcd(int a, int b) {
  if (b == 0) {
    return a;
  }
  return gcd(b, a % b);
}

int main() {
  printf("GCD: %d\\n", gcd(48, 18));
  return 0;
}
`,reward:{xp:125,coins:25},revisit:[`w4m5`]}),w5m1:Q(`w5m1`,{title:`Average of marks`,brief:`Practical 21: store five subject marks in an array, sum them with a loop, then print the average.`,prompt:`Marks {45, 67, 89, 34, 56}. Print: Average: 58.20`,concepts:[`arrays`,`array traversal`,`double division`],starter:X(`average {45, 67, 89, 34, 56}`),checks:Z(`Average: 58.20`),hints:[`Declare int marks[5] = {45, 67, 89, 34, 56};`,`Loop i from 0 while i < 5 and add marks[i].`,`Divide by 5.0 so the average keeps its decimals, and print with %.2f.`],solution:`#include <stdio.h>

int main() {
  int marks[5] = {45, 67, 89, 34, 56};
  int total = 0;
  for (int i = 0; i < 5; i++) {
    total += marks[i];
  }
  double average = total / 5.0;
  printf("Average: %.2f\\n", average);
  return 0;
}
`,reward:{xp:100,coins:20},revisit:[`w5m1`]}),w5m2:Q(`w5m2`,{title:`Reverse an array`,brief:`Practical 22: read an array from the lab sheet and print it in reverse order using a countdown loop.`,prompt:`Array {11, 22, 33, 44, 55}. Print: 55 44 33 22 11`,concepts:[`array indices`,`reverse traversal`,`spacing`],starter:X(`print {11, 22, 33, 44, 55} backwards`),checks:Z(`55 44 33 22 11`),hints:[`The last valid index is 4, which is length - 1.`,`Loop from i = 4 down to 0 with i--.`,`Print each with printf("%d ", values[i]); — trailing spaces are ignored.`],solution:`#include <stdio.h>

int main() {
  int values[5] = {11, 22, 33, 44, 55};
  for (int i = 4; i >= 0; i--) {
    printf("%d ", values[i]);
  }
  printf("\\n");
  return 0;
}
`,reward:{xp:105,coins:21},revisit:[`w5m2`]}),w5m3:Q(`w5m3`,{title:`Second largest`,brief:`Practical 23: find the second largest element of an array without sorting it first.`,prompt:`Array {12, 35, 1, 10, 34, 1}. Print: Second largest: 34`,concepts:[`best-so-far pattern`,`two-track comparison`,`array search`],starter:X(`second largest of {12, 35, 1, 10, 34, 1}`),checks:Z(`Second largest: 34`),hints:[`Keep two values: best and runner-up.`,`When a value beats best, the old best becomes the runner-up.`,`When it only beats the runner-up, replace just that one.`],solution:`#include <stdio.h>

int main() {
  int v[6] = {12, 35, 1, 10, 34, 1};
  int best = -1;
  int second = -1;
  for (int i = 0; i < 6; i++) {
    if (v[i] > best) {
      second = best;
      best = v[i];
    } else if (v[i] > second && v[i] != best) {
      second = v[i];
    }
  }
  printf("Second largest: %d\\n", second);
  return 0;
}
`,reward:{xp:120,coins:24},revisit:[`w5m3`]}),w5m4:Q(`w5m4`,{title:`Palindrome string`,brief:`Practical 24: check whether a word reads the same forwards and backwards, comparing characters from both ends.`,prompt:`Word "madam". Print exactly: madam is a palindrome`,concepts:[`char arrays`,`strlen`,`two-pointer comparison`],starter:X(`check whether "madam" is a palindrome`),checks:Z(`madam is a palindrome`),hints:[`Include <string.h> for strlen.`,`Compare word[i] with word[len - 1 - i] for i from 0.`,`Set a flag to 0 on the first mismatch and stop.`],solution:`#include <stdio.h>
#include <string.h>

int main() {
  char word[] = "madam";
  int len = strlen(word);
  int palindrome = 1;
  for (int i = 0; i < len / 2; i++) {
    if (word[i] != word[len - 1 - i]) {
      palindrome = 0;
    }
  }
  if (palindrome) {
    printf("%s is a palindrome\\n", word);
  } else {
    printf("%s is not a palindrome\\n", word);
  }
  return 0;
}
`,reward:{xp:125,coins:25},revisit:[`w5m4`]}),w5m5:Q(`w5m5`,{title:`Count vowels`,brief:`Practical 25: count how many vowels appear in a word, treating both cases as vowels.`,prompt:`Word "Programming". Print: Vowels: 3`,concepts:[`string traversal`,`character comparison`,`counting`],starter:X(`count the vowels in "Programming"`),checks:Z(`Vowels: 3`),hints:[`Walk the string with a for loop up to strlen(word).`,`Compare against both the lowercase and uppercase vowel.`,`A helper condition like (c == 'a' || c == 'e' ...) gets long — that is fine here.`],solution:`#include <stdio.h>
#include <string.h>

int main() {
  char word[] = "Programming";
  int count = 0;
  int len = strlen(word);
  for (int i = 0; i < len; i++) {
    char c = word[i];
    if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u' ||
        c == 'A' || c == 'E' || c == 'I' || c == 'O' || c == 'U') {
      count++;
    }
  }
  printf("Vowels: %d\\n", count);
  return 0;
}
`,reward:{xp:120,coins:24},revisit:[`w5m5`]}),w6m1:Q(`w6m1`,{title:`Sum through pointers`,brief:`Practical 26: add two numbers using only pointers — no direct use of the variables in the arithmetic.`,prompt:`a = 10, b = 20 with pointers p and q. Print: Sum: 30`,concepts:[`address-of`,`dereference`,`pointer types`],starter:X(`sum 10 and 20 through pointers`),checks:Z(`Sum: 30`),hints:[`Take addresses with &a and &b.`,`Add the pointed-to values: *p + *q.`,`printf("Sum: %d\\n", *p + *q);`],solution:`#include <stdio.h>

int main() {
  int a = 10;
  int b = 20;
  int *p = &a;
  int *q = &b;
  printf("Sum: %d\\n", *p + *q);
  return 0;
}
`,reward:{xp:115,coins:23},revisit:[`w6m1`]}),w6m2:Q(`w6m2`,{title:`Increment by reference`,brief:`Practical 27: write a function that increments a caller's variable. In C that means passing its address.`,prompt:`count = 5, call increment(&count). Print: Count: 6`,concepts:[`pass by pointer`,`void functions`,`caller state`],starter:X(`void increment(int *n) and increment(&count)`),checks:[...Z(`Count: 6`),{type:`code`,value:`\\*\\s*n\\s*=\\s*\\*\\s*n\\s*\\+`}],hints:[`The parameter is a pointer: void increment(int *n).`,`Modify the original with *n = *n + 1;`,`Call it with the address: increment(&count);`],solution:`#include <stdio.h>

void increment(int *n) {
  *n = *n + 1;
}

int main() {
  int count = 5;
  increment(&count);
  printf("Count: %d\\n", count);
  return 0;
}
`,reward:{xp:120,coins:24},revisit:[`w6m2`]}),w6m3:Q(`w6m3`,{title:`Swap with pointers`,brief:`Practical 28: the standard swap question — exchange two values using a temporary variable and pointers.`,prompt:`x = 25, y = 50, then swap(&x, &y). Print: x=50 y=25`,concepts:[`pointers`,`temporary variable`,`side effects`],starter:X(`swap 25 and 50 through pointers`),checks:Z(`x=50 y=25`),hints:[`You cannot swap with two pointers alone — you need one temp int.`,`temp = *a; *a = *b; *b = temp;`,`Pass addresses: swap(&x, &y);`],solution:`#include <stdio.h>

void swap(int *a, int *b) {
  int temp = *a;
  *a = *b;
  *b = temp;
}

int main() {
  int x = 25;
  int y = 50;
  swap(&x, &y);
  printf("x=%d y=%d\\n", x, y);
  return 0;
}
`,reward:{xp:120,coins:24},revisit:[`w6m3`]}),w6m4:Q(`w6m4`,{title:`Array sum by pointer arithmetic`,brief:`Practical 29: total an array by moving a pointer through it instead of indexing.`,prompt:`Array {2, 4, 6, 8, 10}. Print: Sum: 30`,concepts:[`pointer arithmetic`,`array decay`,`dereference in a loop`],starter:X(`sum {2, 4, 6, 8, 10} with a pointer`),checks:Z(`Sum: 30`),hints:[`int *p = data; points at the first element.`,`*(p + i) is element i, exactly like data[i].`,`Add all five values into a total that starts at 0.`],solution:`#include <stdio.h>

int main() {
  int data[5] = {2, 4, 6, 8, 10};
  int *p = data;
  int sum = 0;
  for (int i = 0; i < 5; i++) {
    sum += *(p + i);
  }
  printf("Sum: %d\\n", sum);
  return 0;
}
`,reward:{xp:125,coins:25},revisit:[`w6m4`]}),w6m5:Q(`w6m5`,{title:`Largest via pointer`,brief:`Practical 30: find the largest element of an array using only pointer dereferences.`,prompt:`Array {7, 3, 9, 1, 5}. Print: Max: 9`,concepts:[`pointers`,`best-so-far`,`dereference comparisons`],starter:X(`largest of {7, 3, 9, 1, 5} through a pointer`),checks:Z(`Max: 9`),hints:[`Start max at the first element: *p.`,`Compare *(p + i) on each pass.`,`Replace max only when the new value is strictly larger.`],solution:`#include <stdio.h>

int main() {
  int data[5] = {7, 3, 9, 1, 5};
  int *p = data;
  int max = *p;
  for (int i = 1; i < 5; i++) {
    if (*(p + i) > max) {
      max = *(p + i);
    }
  }
  printf("Max: %d\\n", max);
  return 0;
}
`,reward:{xp:130,coins:26},revisit:[`w6m5`]})},zt={w1:Lt(`w1`,{title:`Payroll slip`,brief:`Semester assessment, World 1: a company pays basic pay plus DA and HRA, then deducts tax. Everything is decimal money, so the formatting matters as much as the maths.`,given:[`basic = 20000`,`DA = 10% of basic`,`HRA = 15% of basic`,`tax = 5% of gross`],prompt:`Print Gross: 25000.00 and Net: 23750.00 — two decimals each.`,concepts:[`variables and types`,`percentage arithmetic`,`%.2f`],starter:X(`basic 20000, DA 10%, HRA 15%, tax 5%: print gross and net`),checks:Z(`Gross: 25000.00
Net: 23750.00`),hints:[`Gross = basic + 10% of basic + 15% of basic.`,`Tax is 5% of the gross, not of the basic pay.`,`Keep every money value in a double and print with %.2f.`],solution:`#include <stdio.h>

int main() {
  double basic = 20000;
  double gross = basic + basic * 10 / 100.0 + basic * 15 / 100.0;
  double net = gross - gross * 5 / 100.0;
  printf("Gross: %.2f\\n", gross);
  printf("Net: %.2f\\n", net);
  return 0;
}
`,reward:{xp:260,coins:55}}),w2:Lt(`w2`,{title:`Electricity bill`,brief:`Semester assessment, World 2: a slab-based bill is the classic else-if question. Each block of units has its own rate.`,given:[`275 units used`,`first 100 units at 3.50`,`next 100 units at 4.50`,`remaining units at 6.50`],prompt:`Print: Bill: 1287.50`,concepts:[`else-if ladders`,`slab boundaries`,`decimal arithmetic`],starter:X(`275 units: 100 @ 3.50, 100 @ 4.50, rest @ 6.50`),checks:Z(`Bill: 1287.50`),hints:[`Split the units into three groups before you multiply anything.`,`The third group is units - 200, and only exists above 200 units.`,`100 * 3.5 + 100 * 4.5 + 75 * 6.5.`],solution:`#include <stdio.h>

int main() {
  int units = 275;
  double bill = 0;
  if (units > 200) {
    bill = 100 * 3.5 + 100 * 4.5 + (units - 200) * 6.5;
  } else if (units > 100) {
    bill = 100 * 3.5 + (units - 100) * 4.5;
  } else {
    bill = units * 3.5;
  }
  printf("Bill: %.2f\\n", bill);
  return 0;
}
`,reward:{xp:280,coins:60}}),w3:Lt(`w3`,{title:`Prime range report`,brief:`Semester assessment, World 3: nested loops plus conditions. Report how many primes exist up to 50 and what they add up to.`,given:[`range 1 to 50`,`a prime has no divisor other than 1 and itself`],prompt:`Print Count: 15 and Sum: 328.`,concepts:[`nested loops`,`prime testing`,`accumulators`],starter:X(`count and sum the primes from 1 to 50`),checks:Z(`Count: 15
Sum: 328`),hints:[`Loop n from 2 to 50, and inside it test divisors d from 2.`,`Only add n to the sum when the inner loop found no divisor.`,`A flag per number is easier than trying to break out cleverly.`],solution:`#include <stdio.h>

int main() {
  int count = 0;
  int sum = 0;
  for (int n = 2; n <= 50; n++) {
    int prime = 1;
    for (int d = 2; d < n; d++) {
      if (n % d == 0) {
        prime = 0;
      }
    }
    if (prime) {
      count++;
      sum += n;
    }
  }
  printf("Count: %d\\n", count);
  printf("Sum: %d\\n", sum);
  return 0;
}
`,reward:{xp:300,coins:65}}),w4:Lt(`w4`,{title:`Function toolbox`,brief:`Semester assessment, World 4: build two reusable functions and combine them in main — one for a series total, one for a primality test.`,given:[`n = 10`,`sumSquares(n) returns 1² + 2² + ... + n²`,`isPrime(x) returns 1 or 0`],prompt:`Print Sum of squares: 385 and Primes: 4 (the primes up to 10 are 2, 3, 5, 7).`,concepts:[`functions`,`return values`,`loops inside functions`],starter:X(`int sumSquares(int n) and int isPrime(int x), then print both results for 10`),checks:[...Z(`Sum of squares: 385
Primes: 4`),{type:`code`,value:`int\\s+sumSquares\\s*\\(`},{type:`code`,value:`int\\s+isPrime\\s*\\(`}],hints:[`sumSquares needs a total and a loop from 1 to n, adding i * i.`,`isPrime can loop d from 2 while d < x and return 0 on the first divisor.`,`Count primes in main by calling isPrime for each number from 2 to 10.`],solution:`#include <stdio.h>

int sumSquares(int n) {
  int total = 0;
  for (int i = 1; i <= n; i++) {
    total += i * i;
  }
  return total;
}

int isPrime(int x) {
  if (x < 2) {
    return 0;
  }
  for (int d = 2; d < x; d++) {
    if (x % d == 0) {
      return 0;
    }
  }
  return 1;
}

int main() {
  int count = 0;
  for (int i = 2; i <= 10; i++) {
    if (isPrime(i)) {
      count++;
    }
  }
  printf("Sum of squares: %d\\n", sumSquares(10));
  printf("Primes: %d\\n", count);
  return 0;
}
`,reward:{xp:320,coins:70}}),w5:Lt(`w5`,{title:`Marksheet report`,brief:`Semester assessment, World 5: arrays plus everything before them. Produce a full report for a five-subject marksheet.`,given:[`marks {56, 78, 90, 45, 67}`,`pass mark 40`,`average to two decimals`],prompt:`Print Total: 336, Average: 67.20, Highest: 90, Lowest: 45, Passed: 5 — each on its own line.`,concepts:[`arrays`,`traversal`,`best/worst so far`,`counting`],starter:X(`report on {56, 78, 90, 45, 67}`),checks:Z(`Total: 336
Average: 67.20
Highest: 90
Lowest: 45
Passed: 5`),hints:[`One pass can collect the total, the highest and the lowest at the same time.`,`Start highest and lowest at marks[0], not at 0 — marks could all be high.`,`Count a pass whenever marks[i] >= 40.`],solution:`#include <stdio.h>

int main() {
  int marks[5] = {56, 78, 90, 45, 67};
  int total = 0;
  int highest = marks[0];
  int lowest = marks[0];
  int passed = 0;
  for (int i = 0; i < 5; i++) {
    total += marks[i];
    if (marks[i] > highest) {
      highest = marks[i];
    }
    if (marks[i] < lowest) {
      lowest = marks[i];
    }
    if (marks[i] >= 40) {
      passed++;
    }
  }
  printf("Total: %d\\n", total);
  printf("Average: %.2f\\n", total / 5.0);
  printf("Highest: %d\\n", highest);
  printf("Lowest: %d\\n", lowest);
  printf("Passed: %d\\n", passed);
  return 0;
}
`,reward:{xp:340,coins:75}}),w6:Lt(`w6`,{title:`Pointer audit`,brief:`Semester assessment, World 6: the whole final world in one program. Read the array only through a pointer, find the maximum the same way, then swap the first and last elements.`,given:[`values {12, 45, 7, 30, 22}`,`no indexing: use p, p + i and *`],prompt:`Print Sum: 116, Max: 45, then the swapped array as 22 45 7 30 12.`,concepts:[`pointers`,`pointer arithmetic`,`swapping through addresses`],starter:X(`sum, max and swap first/last of {12, 45, 7, 30, 22} using pointers`),checks:Z(`Sum: 116
Max: 45
22 45 7 30 12`),hints:[`int *p = values; gives you the first element's address.`,`Inside the loop use *(p + i); the swap needs a temp int.`,`Swap *(p + 0) with *(p + 4) before printing the array.`],solution:`#include <stdio.h>

int main() {
  int values[5] = {12, 45, 7, 30, 22};
  int *p = values;
  int sum = 0;
  int max = *p;
  for (int i = 0; i < 5; i++) {
    sum += *(p + i);
    if (*(p + i) > max) {
      max = *(p + i);
    }
  }
  int temp = *p;
  *p = *(p + 4);
  *(p + 4) = temp;
  printf("Sum: %d\\n", sum);
  printf("Max: %d\\n", max);
  for (int i = 0; i < 5; i++) {
    printf("%d ", *(p + i));
  }
  printf("\\n");
  return 0;
}
`,reward:{xp:380,coins:85}})},Bt=[...Object.values(Rt),...Object.values(zt)].reduce((e,t)=>(e[t.id]=t,e),{});function Vt(e){return Bt[e]||null}function Ht(e,t,{attempts:n=1,hints:r=0}={}){let i=e.progress||{};if(!t||i.mastery?.[t.id])return{save:e,newly:[],already:!0,xp:0,coins:0,stars:0};let a=n<=1&&r===0,o=a?1.25:r>=2?.8:1,s=Math.round(t.reward.xp*o),c=Math.round(t.reward.coins*(a?1.2:1)),l=t.kind===`world`?n<=1?3:n<=3?2:1:0,u={...i.missions||{}};t.kind===`topic`&&t.missionId&&!u[t.missionId]&&(u[t.missionId]={stars:0,attempts:n,hints:r,skipped:!0,completedAt:new Date().toISOString()});let d={...i,xp:(i.xp||0)+s,coins:(i.coins||0)+c,stars:(i.stars||0)+l,missions:u,mastery:{...i.mastery||{},[t.id]:{passedAt:new Date().toISOString(),attempts:n,hints:r,stars:l}}},{unlocked:f,newly:p}=Pt(d,i.achievements||{});return d.achievements=f,{save:{...e,progress:d,updatedAt:new Date().toISOString()},newly:p,already:!1,xp:s,coins:c,stars:l}}var Ut=null,Wt=!0;function Gt(e){Wt=!!e}function Kt(){if(!Wt||typeof window>`u`)return null;try{let e=window.AudioContext||window.webkitAudioContext;return e?(Ut||=new e,Ut.state===`suspended`&&Ut.resume(),Ut):null}catch{return null}}function $({freq:e=440,dur:t=.12,type:n=`sine`,gain:r=.05,delay:i=0,slideTo:a=null}){let o=Kt();if(!o)return;let s=o.currentTime+i,c=o.createOscillator(),l=o.createGain();c.type=n,c.frequency.setValueAtTime(e,s),a&&c.frequency.exponentialRampToValueAtTime(a,s+t),l.gain.setValueAtTime(1e-4,s),l.gain.exponentialRampToValueAtTime(r,s+.012),l.gain.exponentialRampToValueAtTime(1e-4,s+t),c.connect(l).connect(o.destination),c.start(s),c.stop(s+t+.02)}var qt={hover(){$({freq:620,dur:.04,type:`triangle`,gain:.012})},click(){$({freq:340,dur:.06,type:`triangle`,gain:.03,slideTo:460})},run(){$({freq:300,dur:.07,type:`square`,gain:.02}),$({freq:520,dur:.09,type:`triangle`,gain:.022,delay:.06})},success(){[523,659,784,1047].forEach((e,t)=>{$({freq:e,dur:.16,type:`triangle`,gain:.035,delay:t*.07})})},fail(){$({freq:220,dur:.18,type:`sine`,gain:.035,slideTo:160})},star(){$({freq:880,dur:.1,type:`triangle`,gain:.03,slideTo:1320})},unlock(){[392,523,784].forEach((e,t)=>{$({freq:e,dur:.2,type:`sine`,gain:.03,delay:t*.08})})}},Jt=(0,o.createContext)(null),Yt={saves:[],activeId:null,settings:{sound:!0}};function Xt({children:e}){let[t,n]=(0,o.useState)(Yt),[r,i]=(0,o.useState)(!1);(0,o.useEffect)(()=>{let e=ft();n(e),Gt(e.settings?.sound!==!1),i(!0)},[]),(0,o.useEffect)(()=>{r&&pt(t)},[t,r]);let a=(0,o.useMemo)(()=>t.saves.find(e=>e.id===t.activeId)||null,[t.saves,t.activeId]),s=(0,o.useCallback)((e,t)=>{let r=dt(e,t);return n(e=>({...e,saves:[r,...e.saves],activeId:r.id})),r},[]),c=(0,o.useCallback)(e=>{n(t=>({...t,activeId:e}))},[]),l=(0,o.useCallback)(e=>{n(t=>{let n=t.saves.filter(t=>t.id!==e);return{...t,saves:n,activeId:t.activeId===e?n[0]?.id||null:t.activeId}})},[]),u=(0,o.useCallback)((e,t)=>{if(!a)return{newly:[]};let{save:r,newly:i}=Ft(a,e,t);return n(e=>({...e,saves:e.saves.map(e=>e.id===r.id?r:e)})),{newly:i}},[a]),d=(0,o.useCallback)((e,t)=>{if(!a)return{newly:[],already:!0};let r=Ht(a,e,t);return r.already||n(e=>({...e,saves:e.saves.map(e=>e.id===r.save.id?r.save:e)})),r},[a]),f=(0,o.useCallback)(e=>{let t=_t(e);return n(e=>({...e,saves:[t,...e.saves],activeId:t.id})),t},[]),p=(0,o.useCallback)(()=>{n(e=>{let t=e.settings?.sound===!1;return Gt(t),{...e,settings:{...e.settings,sound:t}}})},[]),m=(0,o.useMemo)(()=>({ready:r,saves:t.saves,activeSave:a,activeId:t.activeId,soundOn:t.settings?.sound!==!1,progress:a?.progress||null,level:lt(a?.progress?.xp||0),createSave:s,selectSave:c,deleteSave:l,completeMission:u,completeMastery:d,importSave:f,toggleSound:p}),[r,t.saves,a,t.activeId,t.settings,s,c,l,u,d,f,p]);return(0,Qe.jsx)(Jt.Provider,{value:m,children:e})}function Zt(){let e=(0,o.useContext)(Jt);if(!e)throw Error(`useGame must be used inside GameProvider`);return e}export{Ze as C,s as D,c as E,a as O,it as S,l as T,At as _,Nt as a,ht as b,Tt as c,Ot as d,Ct as f,Dt as g,jt as h,Vt as i,r as k,Et as l,xt as m,Zt as n,yt as o,wt as p,qt as r,Y as s,Xt as t,kt as u,mt as v,d as w,rt as x,gt as y};