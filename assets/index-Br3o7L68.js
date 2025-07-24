var tp=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports);var ES=tp((SS,cs)=>{(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const np=()=>{};var ac={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mh={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w=function(n,e){if(!n)throw $n(e)},$n=function(n){return new Error("Firebase Database ("+Mh.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dh=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},ip=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],o=n[t++],a=n[t++],c=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{const r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},$o={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,a=o?n[s+1]:0,c=s+2<n.length,l=c?n[s+2]:0,h=r>>2,d=(r&3)<<4|a>>4;let u=(a&15)<<2|l>>6,f=l&63;c||(f=64,o||(u=64)),i.push(t[h],t[d],t[u],t[f])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Dh(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):ip(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const l=s<n.length?t[n.charAt(s)]:64;++s;const d=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||a==null||l==null||d==null)throw new sp;const u=r<<2|a>>4;if(i.push(u),l!==64){const f=a<<4&240|l>>2;if(i.push(f),d!==64){const p=l<<6&192|d;i.push(p)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class sp extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Oh=function(n){const e=Dh(n);return $o.encodeByteArray(e,!0)},Ls=function(n){return Oh(n).replace(/\./g,"")},Fs=function(n){try{return $o.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rp(n){return Nh(void 0,n)}function Nh(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!op(t)||(n[t]=Nh(n[t],e[t]));return n}function op(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ap(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cp=()=>ap().__FIREBASE_DEFAULTS__,lp=()=>{if(typeof process>"u"||typeof ac>"u")return;const n=ac.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},hp=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Fs(n[1]);return e&&JSON.parse(e)},zo=()=>{try{return np()||cp()||lp()||hp()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Lh=n=>zo()?.emulatorHosts?.[n],dp=n=>{const e=Lh(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},Fh=()=>zo()?.config,Bh=n=>zo()?.[`_${n}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gr{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Uh(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function up(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Ls(JSON.stringify(t)),Ls(JSON.stringify(o)),""].join(".")}const mi={};function fp(){const n={prod:[],emulator:[]};for(const e of Object.keys(mi))mi[e]?n.emulator.push(e):n.prod.push(e);return n}function pp(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let cc=!1;function Hh(n,e){if(typeof window>"u"||typeof document>"u"||!zn(window.location.host)||mi[n]===e||mi[n]||cc)return;mi[n]=e;function t(u){return`__firebase__banner__${u}`}const i="__firebase__banner",r=fp().prod.length>0;function o(){const u=document.getElementById(i);u&&u.remove()}function a(u){u.style.display="flex",u.style.background="#7faaf0",u.style.position="fixed",u.style.bottom="5px",u.style.left="5px",u.style.padding=".5em",u.style.borderRadius="5px",u.style.alignItems="center"}function c(u,f){u.setAttribute("width","24"),u.setAttribute("id",f),u.setAttribute("height","24"),u.setAttribute("viewBox","0 0 24 24"),u.setAttribute("fill","none"),u.style.marginLeft="-6px"}function l(){const u=document.createElement("span");return u.style.cursor="pointer",u.style.marginLeft="16px",u.style.fontSize="24px",u.innerHTML=" &times;",u.onclick=()=>{cc=!0,o()},u}function h(u,f){u.setAttribute("id",f),u.innerText="Learn more",u.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",u.setAttribute("target","__blank"),u.style.paddingLeft="5px",u.style.textDecoration="underline"}function d(){const u=pp(i),f=t("text"),p=document.getElementById(f)||document.createElement("span"),_=t("learnmore"),m=document.getElementById(_)||document.createElement("a"),v=t("preprendIcon"),b=document.getElementById(v)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(u.created){const E=u.element;a(E),h(m,_);const I=l();c(b,v),E.append(b,p,m,I),document.body.appendChild(E)}r?(p.innerText="Preview backend disconnected.",b.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(b.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,p.innerText="Preview backend running in this workspace."),p.setAttribute("id",f)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",d):d()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oe(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Vo(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Oe())}function gp(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function mp(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Wh(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function _p(){const n=Oe();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function yp(){return Mh.NODE_ADMIN===!0}function vp(){try{return typeof indexedDB=="object"}catch{return!1}}function bp(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wp="FirebaseError";class Yt extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=wp,Object.setPrototypeOf(this,Yt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Gi.prototype.create)}}class Gi{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?Ep(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new Yt(s,a,i)}}function Ep(n,e){return n.replace(Cp,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const Cp=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ai(n){return JSON.parse(n)}function ye(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $h=function(n){let e={},t={},i={},s="";try{const r=n.split(".");e=Ai(Fs(r[0])||""),t=Ai(Fs(r[1])||""),s=r[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},Ip=function(n){const e=$h(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},Sp=function(n){const e=$h(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tt(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function Nn(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function uo(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Bs(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function hn(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],o=e[s];if(lc(r)&&lc(o)){if(!hn(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function lc(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vn(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function ci(n){const e={};return n.replace(/^\?/,"").split("&").forEach(i=>{if(i){const[s,r]=i.split("=");e[decodeURIComponent(s)]=decodeURIComponent(r)}}),e}function li(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tp{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)i[d]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let d=0;d<16;d++)i[d]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let d=16;d<80;d++){const u=i[d-3]^i[d-8]^i[d-14]^i[d-16];i[d]=(u<<1|u>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,h;for(let d=0;d<80;d++){d<40?d<20?(l=a^r&(o^a),h=1518500249):(l=r^o^a,h=1859775393):d<60?(l=r&o|a&(r|o),h=2400959708):(l=r^o^a,h=3395469782);const u=(s<<5|s>>>27)+l+c+h+i[d]&4294967295;c=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=u}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<t;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<t;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function kp(n,e){const t=new xp(n,e);return t.subscribe.bind(t)}class xp{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");Ap(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=$r),s.error===void 0&&(s.error=$r),s.complete===void 0&&(s.complete=$r);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Ap(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function $r(){}function jo(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rp=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,w(i<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},mr=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Me(n){return n&&n._delegate?n._delegate:n}class dn{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pp{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new gr;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Dp(e))try{this.getOrInitializeService({instanceIdentifier:nn})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=nn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=nn){return this.instances.has(e)}getOptions(e=nn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,t){const i=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Mp(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=nn){return this.component?this.component.multipleInstances?e:nn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Mp(n){return n===nn?void 0:n}function Dp(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Op{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Pp(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Z;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Z||(Z={}));const Np={debug:Z.DEBUG,verbose:Z.VERBOSE,info:Z.INFO,warn:Z.WARN,error:Z.ERROR,silent:Z.SILENT},Lp=Z.INFO,Fp={[Z.DEBUG]:"log",[Z.VERBOSE]:"log",[Z.INFO]:"info",[Z.WARN]:"warn",[Z.ERROR]:"error"},Bp=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=Fp[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class qo{constructor(e){this.name=e,this._logLevel=Lp,this._logHandler=Bp,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Z))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Np[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Z.DEBUG,...e),this._logHandler(this,Z.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Z.VERBOSE,...e),this._logHandler(this,Z.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Z.INFO,...e),this._logHandler(this,Z.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Z.WARN,...e),this._logHandler(this,Z.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Z.ERROR,...e),this._logHandler(this,Z.ERROR,...e)}}const Up=(n,e)=>e.some(t=>n instanceof t);let hc,dc;function Hp(){return hc||(hc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Wp(){return dc||(dc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const zh=new WeakMap,fo=new WeakMap,Vh=new WeakMap,zr=new WeakMap,Go=new WeakMap;function $p(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(Lt(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&zh.set(t,n)}).catch(()=>{}),Go.set(e,n),e}function zp(n){if(fo.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});fo.set(n,e)}let po={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return fo.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Vh.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Lt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Vp(n){po=n(po)}function jp(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(Vr(this),e,...t);return Vh.set(i,e.sort?e.sort():[e]),Lt(i)}:Wp().includes(n)?function(...e){return n.apply(Vr(this),e),Lt(zh.get(this))}:function(...e){return Lt(n.apply(Vr(this),e))}}function qp(n){return typeof n=="function"?jp(n):(n instanceof IDBTransaction&&zp(n),Up(n,Hp())?new Proxy(n,po):n)}function Lt(n){if(n instanceof IDBRequest)return $p(n);if(zr.has(n))return zr.get(n);const e=qp(n);return e!==n&&(zr.set(n,e),Go.set(e,n)),e}const Vr=n=>Go.get(n);function Gp(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,e),a=Lt(o);return i&&o.addEventListener("upgradeneeded",c=>{i(Lt(o.result),c.oldVersion,c.newVersion,Lt(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),a.then(c=>{r&&c.addEventListener("close",()=>r()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const Yp=["get","getKey","getAll","getAllKeys","count"],Kp=["put","add","delete","clear"],jr=new Map;function uc(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(jr.get(e))return jr.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=Kp.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Yp.includes(t)))return;const r=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let l=c.store;return i&&(l=l.index(a.shift())),(await Promise.all([l[t](...a),s&&c.done]))[0]};return jr.set(e,r),r}Vp(n=>({...n,get:(e,t,i)=>uc(e,t)||n.get(e,t,i),has:(e,t)=>!!uc(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xp{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Qp(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function Qp(n){return n.getComponent()?.type==="VERSION"}const go="@firebase/app",fc="0.14.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Et=new qo("@firebase/app"),Jp="@firebase/app-compat",Zp="@firebase/analytics-compat",eg="@firebase/analytics",tg="@firebase/app-check-compat",ng="@firebase/app-check",ig="@firebase/auth",sg="@firebase/auth-compat",rg="@firebase/database",og="@firebase/data-connect",ag="@firebase/database-compat",cg="@firebase/functions",lg="@firebase/functions-compat",hg="@firebase/installations",dg="@firebase/installations-compat",ug="@firebase/messaging",fg="@firebase/messaging-compat",pg="@firebase/performance",gg="@firebase/performance-compat",mg="@firebase/remote-config",_g="@firebase/remote-config-compat",yg="@firebase/storage",vg="@firebase/storage-compat",bg="@firebase/firestore",wg="@firebase/ai",Eg="@firebase/firestore-compat",Cg="firebase",Ig="12.0.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mo="[DEFAULT]",Sg={[go]:"fire-core",[Jp]:"fire-core-compat",[eg]:"fire-analytics",[Zp]:"fire-analytics-compat",[ng]:"fire-app-check",[tg]:"fire-app-check-compat",[ig]:"fire-auth",[sg]:"fire-auth-compat",[rg]:"fire-rtdb",[og]:"fire-data-connect",[ag]:"fire-rtdb-compat",[cg]:"fire-fn",[lg]:"fire-fn-compat",[hg]:"fire-iid",[dg]:"fire-iid-compat",[ug]:"fire-fcm",[fg]:"fire-fcm-compat",[pg]:"fire-perf",[gg]:"fire-perf-compat",[mg]:"fire-rc",[_g]:"fire-rc-compat",[yg]:"fire-gcs",[vg]:"fire-gcs-compat",[bg]:"fire-fst",[Eg]:"fire-fst-compat",[wg]:"fire-vertex","fire-js":"fire-js",[Cg]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ri=new Map,Tg=new Map,_o=new Map;function pc(n,e){try{n.container.addComponent(e)}catch(t){Et.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Ln(n){const e=n.name;if(_o.has(e))return Et.debug(`There were multiple attempts to register component ${e}.`),!1;_o.set(e,n);for(const t of Ri.values())pc(t,n);for(const t of Tg.values())pc(t,n);return!0}function Yo(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function je(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kg={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ft=new Gi("app","Firebase",kg);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xg{constructor(e,t,i){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new dn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ft.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jn=Ig;function jh(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i={name:mo,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw Ft.create("bad-app-name",{appName:String(s)});if(t||(t=Fh()),!t)throw Ft.create("no-options");const r=Ri.get(s);if(r){if(hn(t,r.options)&&hn(i,r.config))return r;throw Ft.create("duplicate-app",{appName:s})}const o=new Op(s);for(const c of _o.values())o.addComponent(c);const a=new xg(t,i,o);return Ri.set(s,a),a}function qh(n=mo){const e=Ri.get(n);if(!e&&n===mo&&Fh())return jh();if(!e)throw Ft.create("no-app",{appName:n});return e}function gc(){return Array.from(Ri.values())}function Bt(n,e,t){let i=Sg[n]??n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Et.warn(o.join(" "));return}Ln(new dn(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ag="firebase-heartbeat-database",Rg=1,Pi="firebase-heartbeat-store";let qr=null;function Gh(){return qr||(qr=Gp(Ag,Rg,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Pi)}catch(t){console.warn(t)}}}}).catch(n=>{throw Ft.create("idb-open",{originalErrorMessage:n.message})})),qr}async function Pg(n){try{const t=(await Gh()).transaction(Pi),i=await t.objectStore(Pi).get(Yh(n));return await t.done,i}catch(e){if(e instanceof Yt)Et.warn(e.message);else{const t=Ft.create("idb-get",{originalErrorMessage:e?.message});Et.warn(t.message)}}}async function mc(n,e){try{const i=(await Gh()).transaction(Pi,"readwrite");await i.objectStore(Pi).put(e,Yh(n)),await i.done}catch(t){if(t instanceof Yt)Et.warn(t.message);else{const i=Ft.create("idb-set",{originalErrorMessage:t?.message});Et.warn(i.message)}}}function Yh(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mg=1024,Dg=30;class Og{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Lg(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=_c();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:t}),this._heartbeatsCache.heartbeats.length>Dg){const s=Fg(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Et.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=_c(),{heartbeatsToSend:t,unsentEntries:i}=Ng(this._heartbeatsCache.heartbeats),s=Ls(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return Et.warn(e),""}}}function _c(){return new Date().toISOString().substring(0,10)}function Ng(n,e=Mg){const t=[];let i=n.slice();for(const s of n){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),yc(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),yc(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class Lg{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return vp()?bp().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Pg(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return mc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return mc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function yc(n){return Ls(JSON.stringify({version:2,heartbeats:n})).length}function Fg(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let i=1;i<n.length;i++)n[i].date<t&&(t=n[i].date,e=i);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bg(n){Ln(new dn("platform-logger",e=>new Xp(e),"PRIVATE")),Ln(new dn("heartbeat",e=>new Og(e),"PRIVATE")),Bt(go,fc,n),Bt(go,fc,"esm2020"),Bt("fire-js","")}Bg("");var Ug="firebase",Hg="12.0.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Bt(Ug,Hg,"app");function Kh(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Wg=Kh,Xh=new Gi("auth","Firebase",Kh());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Us=new qo("@firebase/auth");function $g(n,...e){Us.logLevel<=Z.WARN&&Us.warn(`Auth (${jn}): ${n}`,...e)}function ks(n,...e){Us.logLevel<=Z.ERROR&&Us.error(`Auth (${jn}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function et(n,...e){throw Ko(n,...e)}function at(n,...e){return Ko(n,...e)}function Qh(n,e,t){const i={...Wg(),[e]:t};return new Gi("auth","Firebase",i).create(e,{appName:n.name})}function bt(n){return Qh(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ko(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return Xh.create(n,...e)}function x(n,e,...t){if(!n)throw Ko(e,...t)}function _t(n){const e="INTERNAL ASSERTION FAILED: "+n;throw ks(e),new Error(e)}function Ct(n,e){n||_t(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yo(){return typeof self<"u"&&self.location?.href||""}function zg(){return vc()==="http:"||vc()==="https:"}function vc(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vg(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(zg()||mp()||"connection"in navigator)?navigator.onLine:!0}function jg(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yi{constructor(e,t){this.shortDelay=e,this.longDelay=t,Ct(t>e,"Short delay should be less than long delay!"),this.isMobile=Vo()||Wh()}get(){return Vg()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xo(n,e){Ct(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jh{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;_t("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;_t("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;_t("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qg={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gg=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Yg=new Yi(3e4,6e4);function Kt(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function Xt(n,e,t,i,s={}){return Zh(n,s,async()=>{let r={},o={};i&&(e==="GET"?o=i:r={body:JSON.stringify(i)});const a=Vn({key:n.config.apiKey,...o}).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const l={method:e,headers:c,...r};return gp()||(l.referrerPolicy="no-referrer"),n.emulatorConfig&&zn(n.emulatorConfig.host)&&(l.credentials="include"),Jh.fetch()(await ed(n,n.config.apiHost,t,a),l)})}async function Zh(n,e,t){n._canInitEmulator=!1;const i={...qg,...e};try{const s=new Xg(n),r=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw ls(n,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw ls(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw ls(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw ls(n,"user-disabled",o);const h=i[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Qh(n,h,l);et(n,h)}}catch(s){if(s instanceof Yt)throw s;et(n,"network-request-failed",{message:String(s)})}}async function Ki(n,e,t,i,s={}){const r=await Xt(n,e,t,i,s);return"mfaPendingCredential"in r&&et(n,"multi-factor-auth-required",{_serverResponse:r}),r}async function ed(n,e,t,i){const s=`${e}${t}?${i}`,r=n,o=r.config.emulator?Xo(n.config,s):`${n.config.apiScheme}://${s}`;return Gg.includes(t)&&(await r._persistenceManagerAvailable,r._getPersistenceType()==="COOKIE")?r._getPersistence()._getFinalTarget(o).toString():o}function Kg(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Xg{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(at(this.auth,"network-request-failed")),Yg.get())})}}function ls(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const s=at(n,e,i);return s.customData._tokenResponse=t,s}function bc(n){return n!==void 0&&n.enterprise!==void 0}class Qg{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Kg(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function Jg(n,e){return Xt(n,"GET","/v2/recaptchaConfig",Kt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zg(n,e){return Xt(n,"POST","/v1/accounts:delete",e)}async function Hs(n,e){return Xt(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _i(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function em(n,e=!1){const t=Me(n),i=await t.getIdToken(e),s=Qo(i);x(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r?.sign_in_provider;return{claims:s,token:i,authTime:_i(Gr(s.auth_time)),issuedAtTime:_i(Gr(s.iat)),expirationTime:_i(Gr(s.exp)),signInProvider:o||null,signInSecondFactor:r?.sign_in_second_factor||null}}function Gr(n){return Number(n)*1e3}function Qo(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return ks("JWT malformed, contained fewer than 3 sections"),null;try{const s=Fs(t);return s?JSON.parse(s):(ks("Failed to decode base64 JWT payload"),null)}catch(s){return ks("Caught error parsing JWT payload as JSON",s?.toString()),null}}function wc(n){const e=Qo(n);return x(e,"internal-error"),x(typeof e.exp<"u","internal-error"),x(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mi(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof Yt&&tm(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function tm({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nm{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const i=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vo{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=_i(this.lastLoginAt),this.creationTime=_i(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ws(n){const e=n.auth,t=await n.getIdToken(),i=await Mi(n,Hs(e,{idToken:t}));x(i?.users.length,e,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const r=s.providerUserInfo?.length?td(s.providerUserInfo):[],o=sm(n.providerData,r),a=n.isAnonymous,c=!(n.email&&s.passwordHash)&&!o?.length,l=a?c:!1,h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new vo(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(n,h)}async function im(n){const e=Me(n);await Ws(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function sm(n,e){return[...n.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function td(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rm(n,e){const t=await Zh(n,{},async()=>{const i=Vn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=n.config,o=await ed(n,s,"/v1/token",`key=${r}`),a=await n._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:i};return n.emulatorConfig&&zn(n.emulatorConfig.host)&&(c.credentials="include"),Jh.fetch()(o,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function om(n,e){return Xt(n,"POST","/v2/accounts:revokeToken",Kt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){x(e.idToken,"internal-error"),x(typeof e.idToken<"u","internal-error"),x(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):wc(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){x(e.length!==0,"internal-error");const t=wc(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(x(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:s,expiresIn:r}=await rm(e,t);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:s,expirationTime:r}=t,o=new xn;return i&&(x(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),s&&(x(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(x(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new xn,this.toJSON())}_performRefresh(){return _t("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xt(n,e){x(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Xe{constructor({uid:e,auth:t,stsTokenManager:i,...s}){this.providerId="firebase",this.proactiveRefresh=new nm(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new vo(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Mi(this,this.stsTokenManager.getToken(this.auth,e));return x(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return em(this,e)}reload(){return im(this)}_assign(e){this!==e&&(x(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Xe({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){x(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await Ws(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(je(this.auth.app))return Promise.reject(bt(this.auth));const e=await this.getIdToken();return await Mi(this,Zg(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const i=t.displayName??void 0,s=t.email??void 0,r=t.phoneNumber??void 0,o=t.photoURL??void 0,a=t.tenantId??void 0,c=t._redirectEventId??void 0,l=t.createdAt??void 0,h=t.lastLoginAt??void 0,{uid:d,emailVerified:u,isAnonymous:f,providerData:p,stsTokenManager:_}=t;x(d&&_,e,"internal-error");const m=xn.fromJSON(this.name,_);x(typeof d=="string",e,"internal-error"),xt(i,e.name),xt(s,e.name),x(typeof u=="boolean",e,"internal-error"),x(typeof f=="boolean",e,"internal-error"),xt(r,e.name),xt(o,e.name),xt(a,e.name),xt(c,e.name),xt(l,e.name),xt(h,e.name);const v=new Xe({uid:d,auth:e,email:s,emailVerified:u,displayName:i,isAnonymous:f,photoURL:o,phoneNumber:r,tenantId:a,stsTokenManager:m,createdAt:l,lastLoginAt:h});return p&&Array.isArray(p)&&(v.providerData=p.map(b=>({...b}))),c&&(v._redirectEventId=c),v}static async _fromIdTokenResponse(e,t,i=!1){const s=new xn;s.updateFromServerResponse(t);const r=new Xe({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await Ws(r),r}static async _fromGetAccountInfoResponse(e,t,i){const s=t.users[0];x(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?td(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!r?.length,a=new xn;a.updateFromIdToken(i);const c=new Xe({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new vo(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!r?.length};return Object.assign(c,l),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ec=new Map;function yt(n){Ct(n instanceof Function,"Expected a class definition");let e=Ec.get(n);return e?(Ct(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Ec.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nd{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}nd.type="NONE";const Cc=nd;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xs(n,e,t){return`firebase:${n}:${e}:${t}`}class An{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=xs(this.userKey,s.apiKey,r),this.fullPersistenceKey=xs("persistence",s.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Hs(this.auth,{idToken:e}).catch(()=>{});return t?Xe._fromGetAccountInfoResponse(this.auth,t,e):null}return Xe._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new An(yt(Cc),e,i);const s=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let r=s[0]||yt(Cc);const o=xs(i,e.config.apiKey,e.name);let a=null;for(const l of t)try{const h=await l._get(o);if(h){let d;if(typeof h=="string"){const u=await Hs(e,{idToken:h}).catch(()=>{});if(!u)break;d=await Xe._fromGetAccountInfoResponse(e,u,h)}else d=Xe._fromJSON(e,h);l!==r&&(a=d),r=l;break}}catch{}const c=s.filter(l=>l._shouldAllowMigration);return!r._shouldAllowMigration||!c.length?new An(r,e,i):(r=c[0],a&&await r._set(o,a.toJSON()),await Promise.all(t.map(async l=>{if(l!==r)try{await l._remove(o)}catch{}})),new An(r,e,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ic(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(od(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(id(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(cd(e))return"Blackberry";if(ld(e))return"Webos";if(sd(e))return"Safari";if((e.includes("chrome/")||rd(e))&&!e.includes("edge/"))return"Chrome";if(ad(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if(i?.length===2)return i[1]}return"Other"}function id(n=Oe()){return/firefox\//i.test(n)}function sd(n=Oe()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function rd(n=Oe()){return/crios\//i.test(n)}function od(n=Oe()){return/iemobile/i.test(n)}function ad(n=Oe()){return/android/i.test(n)}function cd(n=Oe()){return/blackberry/i.test(n)}function ld(n=Oe()){return/webos/i.test(n)}function Jo(n=Oe()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function am(n=Oe()){return Jo(n)&&!!window.navigator?.standalone}function cm(){return _p()&&document.documentMode===10}function hd(n=Oe()){return Jo(n)||ad(n)||ld(n)||cd(n)||/windows phone/i.test(n)||od(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dd(n,e=[]){let t;switch(n){case"Browser":t=Ic(Oe());break;case"Worker":t=`${Ic(Oe())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${jn}/${i}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lm{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=r=>new Promise((o,a)=>{try{const c=e(r);o(c)}catch(c){a(c)}});i.onAbort=t,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hm(n,e={}){return Xt(n,"GET","/v2/passwordPolicy",Kt(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dm=6;class um{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??dm,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fm{constructor(e,t,i,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Sc(this),this.idTokenSubscription=new Sc(this),this.beforeStateQueue=new lm(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Xh,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(r=>this._resolvePersistenceManagerAvailable=r)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=yt(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await An.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Hs(this,{idToken:e}),i=await Xe._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(je(this.app)){const r=this.app.settings.authIdToken;return r?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(r).then(o,o))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let i=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const r=this.redirectUser?._redirectEventId,o=i?._redirectEventId,a=await this.tryRedirectSignIn(e);(!r||r===o)&&a?.user&&(i=a.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(r){i=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(r))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return x(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Ws(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=jg()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(je(this.app))return Promise.reject(bt(this));const t=e?Me(e):null;return t&&x(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&x(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return je(this.app)?Promise.reject(bt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return je(this.app)?Promise.reject(bt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(yt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await hm(this),t=new um(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Gi("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await om(this,i)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&yt(e)||this._popupRedirectResolver;x(t,this,"argument-error"),this.redirectPersistenceManager=await An.create(this,[yt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,s){if(this._deleted)return()=>{};const r=typeof t=="function"?t:t.next.bind(t);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(x(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,i,s);return()=>{o=!0,c()}}else{const c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return x(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=dd(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const i=await this._getAppCheckToken();return i&&(e["X-Firebase-AppCheck"]=i),e}async _getAppCheckToken(){if(je(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&$g(`Error while retrieving App Check token: ${e.error}`),e?.token}}function bn(n){return Me(n)}class Sc{constructor(e){this.auth=e,this.observer=null,this.addObserver=kp(t=>this.observer=t)}get next(){return x(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let _r={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function pm(n){_r=n}function ud(n){return _r.loadJS(n)}function gm(){return _r.recaptchaEnterpriseScript}function mm(){return _r.gapiScript}function _m(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class ym{constructor(){this.enterprise=new vm}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class vm{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const bm="recaptcha-enterprise",fd="NO_RECAPTCHA";class wm{constructor(e){this.type=bm,this.auth=bn(e)}async verify(e="verify",t=!1){async function i(r){if(!t){if(r.tenantId==null&&r._agentRecaptchaConfig!=null)return r._agentRecaptchaConfig.siteKey;if(r.tenantId!=null&&r._tenantRecaptchaConfigs[r.tenantId]!==void 0)return r._tenantRecaptchaConfigs[r.tenantId].siteKey}return new Promise(async(o,a)=>{Jg(r,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const l=new Qg(c);return r.tenantId==null?r._agentRecaptchaConfig=l:r._tenantRecaptchaConfigs[r.tenantId]=l,o(l.siteKey)}}).catch(c=>{a(c)})})}function s(r,o,a){const c=window.grecaptcha;bc(c)?c.enterprise.ready(()=>{c.enterprise.execute(r,{action:e}).then(l=>{o(l)}).catch(()=>{o(fd)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new ym().execute("siteKey",{action:"verify"}):new Promise((r,o)=>{i(this.auth).then(a=>{if(!t&&bc(window.grecaptcha))s(a,r,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=gm();c.length!==0&&(c+=a),ud(c).then(()=>{s(a,r,o)}).catch(l=>{o(l)})}}).catch(a=>{o(a)})})}}async function Tc(n,e,t,i=!1,s=!1){const r=new wm(n);let o;if(s)o=fd;else try{o=await r.verify(t)}catch{o=await r.verify(t,!0)}const a={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in a){const c=a.phoneEnrollmentInfo.phoneNumber,l=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in a){const c=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return i?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function bo(n,e,t,i,s){if(n._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const r=await Tc(n,e,t,t==="getOobCode");return i(n,r)}else return i(n,e).catch(async r=>{if(r.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await Tc(n,e,t,t==="getOobCode");return i(n,o)}else return Promise.reject(r)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Em(n,e){const t=Yo(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),r=t.getOptions();if(hn(r,e??{}))return s;et(s,"already-initialized")}return t.initialize({options:e})}function Cm(n,e){const t=e?.persistence||[],i=(Array.isArray(t)?t:[t]).map(yt);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e?.popupRedirectResolver)}function Im(n,e,t){const i=bn(n);x(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=pd(e),{host:o,port:a}=Sm(e),c=a===null?"":`:${a}`,l={url:`${r}//${o}${c}/`},h=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!i._canInitEmulator){x(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),x(hn(l,i.config.emulator)&&hn(h,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=l,i.emulatorConfig=h,i.settings.appVerificationDisabledForTesting=!0,zn(o)?(Uh(`${r}//${o}${c}`),Hh("Auth",!0)):Tm()}function pd(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Sm(n){const e=pd(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:kc(i.substr(r.length+1))}}else{const[r,o]=i.split(":");return{host:r,port:kc(o)}}}function kc(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Tm(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zo{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return _t("not implemented")}_getIdTokenResponse(e){return _t("not implemented")}_linkToIdToken(e,t){return _t("not implemented")}_getReauthenticationResolver(e){return _t("not implemented")}}async function km(n,e){return Xt(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xm(n,e){return Ki(n,"POST","/v1/accounts:signInWithPassword",Kt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Am(n,e){return Ki(n,"POST","/v1/accounts:signInWithEmailLink",Kt(n,e))}async function Rm(n,e){return Ki(n,"POST","/v1/accounts:signInWithEmailLink",Kt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Di extends Zo{constructor(e,t,i,s=null){super("password",i),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new Di(e,t,"password")}static _fromEmailAndCode(e,t,i=null){return new Di(e,t,"emailLink",i)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return bo(e,t,"signInWithPassword",xm);case"emailLink":return Am(e,{email:this._email,oobCode:this._password});default:et(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const i={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return bo(e,i,"signUpPassword",km);case"emailLink":return Rm(e,{idToken:t,email:this._email,oobCode:this._password});default:et(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rn(n,e){return Ki(n,"POST","/v1/accounts:signInWithIdp",Kt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pm="http://localhost";class un extends Zo{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new un(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):et("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s,...r}=t;if(!i||!s)return null;const o=new un(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Rn(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,Rn(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Rn(e,t)}buildRequest(){const e={requestUri:Pm,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Vn(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mm(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Dm(n){const e=ci(li(n)).link,t=e?ci(li(e)).deep_link_id:null,i=ci(li(n)).deep_link_id;return(i?ci(li(i)).link:null)||i||t||e||n}class ea{constructor(e){const t=ci(li(e)),i=t.apiKey??null,s=t.oobCode??null,r=Mm(t.mode??null);x(i&&s&&r,"argument-error"),this.apiKey=i,this.operation=r,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=Dm(e);try{return new ea(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qn{constructor(){this.providerId=qn.PROVIDER_ID}static credential(e,t){return Di._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const i=ea.parseLink(t);return x(i,"argument-error"),Di._fromEmailAndCode(e,i.code,i.tenantId)}}qn.PROVIDER_ID="password";qn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";qn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gd{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xi extends gd{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt extends Xi{constructor(){super("facebook.com")}static credential(e){return un._fromParams({providerId:Rt.PROVIDER_ID,signInMethod:Rt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Rt.credentialFromTaggedObject(e)}static credentialFromError(e){return Rt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Rt.credential(e.oauthAccessToken)}catch{return null}}}Rt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Rt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt extends Xi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return un._fromParams({providerId:Pt.PROVIDER_ID,signInMethod:Pt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Pt.credentialFromTaggedObject(e)}static credentialFromError(e){return Pt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return Pt.credential(t,i)}catch{return null}}}Pt.GOOGLE_SIGN_IN_METHOD="google.com";Pt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt extends Xi{constructor(){super("github.com")}static credential(e){return un._fromParams({providerId:Mt.PROVIDER_ID,signInMethod:Mt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Mt.credentialFromTaggedObject(e)}static credentialFromError(e){return Mt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Mt.credential(e.oauthAccessToken)}catch{return null}}}Mt.GITHUB_SIGN_IN_METHOD="github.com";Mt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt extends Xi{constructor(){super("twitter.com")}static credential(e,t){return un._fromParams({providerId:Dt.PROVIDER_ID,signInMethod:Dt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Dt.credentialFromTaggedObject(e)}static credentialFromError(e){return Dt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return Dt.credential(t,i)}catch{return null}}}Dt.TWITTER_SIGN_IN_METHOD="twitter.com";Dt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Om(n,e){return Ki(n,"POST","/v1/accounts:signUp",Kt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,s=!1){const r=await Xe._fromIdTokenResponse(e,i,s),o=xc(i);return new fn({user:r,providerId:o,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const s=xc(i);return new fn({user:e,providerId:s,_tokenResponse:i,operationType:t})}}function xc(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $s extends Yt{constructor(e,t,i,s){super(t.code,t.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,$s.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,s){return new $s(e,t,i,s)}}function md(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?$s._fromErrorAndOperation(n,r,e,i):r})}async function Nm(n,e,t=!1){const i=await Mi(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return fn._forOperation(n,"link",i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lm(n,e,t=!1){const{auth:i}=n;if(je(i.app))return Promise.reject(bt(i));const s="reauthenticate";try{const r=await Mi(n,md(i,s,e,n),t);x(r.idToken,i,"internal-error");const o=Qo(r.idToken);x(o,i,"internal-error");const{sub:a}=o;return x(n.uid===a,i,"user-mismatch"),fn._forOperation(n,s,r)}catch(r){throw r?.code==="auth/user-not-found"&&et(i,"user-mismatch"),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _d(n,e,t=!1){if(je(n.app))return Promise.reject(bt(n));const i="signIn",s=await md(n,i,e),r=await fn._fromIdTokenResponse(n,i,s);return t||await n._updateCurrentUser(r.user),r}async function Fm(n,e){return _d(bn(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yd(n){const e=bn(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Bm(n,e,t){if(je(n.app))return Promise.reject(bt(n));const i=bn(n),o=await bo(i,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Om).catch(c=>{throw c.code==="auth/password-does-not-meet-requirements"&&yd(n),c}),a=await fn._fromIdTokenResponse(i,"signIn",o);return await i._updateCurrentUser(a.user),a}function Um(n,e,t){return je(n.app)?Promise.reject(bt(n)):Fm(Me(n),qn.credential(e,t)).catch(async i=>{throw i.code==="auth/password-does-not-meet-requirements"&&yd(n),i})}function Hm(n,e,t,i){return Me(n).onIdTokenChanged(e,t,i)}function Wm(n,e,t){return Me(n).beforeAuthStateChanged(e,t)}function $m(n,e,t,i){return Me(n).onAuthStateChanged(e,t,i)}function zm(n){return Me(n).signOut()}const zs="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vd{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(zs,"1"),this.storage.removeItem(zs),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vm=1e3,jm=10;class bd extends vd{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=hd(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),s=this.localCache[t];i!==s&&e(t,s,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const i=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(i);!t&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);cm()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,jm):s()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},Vm)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}bd.type="LOCAL";const qm=bd;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wd extends vd{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}wd.type="SESSION";const Ed=wd;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gm(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yr{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const i=new yr(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:s,data:r}=t.data,o=this.handlersMap[s];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const a=Array.from(o).map(async l=>l(t.origin,r)),c=await Gm(a);t.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}yr.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ta(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ym{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((a,c)=>{const l=ta("",20);s.port1.start();const h=setTimeout(()=>{c(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(d){const u=d;if(u.data.eventId===l)switch(u.data.status){case"ack":clearTimeout(h),r=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(u.data.response);break;default:clearTimeout(h),clearTimeout(r),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ct(){return window}function Km(n){ct().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cd(){return typeof ct().WorkerGlobalScope<"u"&&typeof ct().importScripts=="function"}async function Xm(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Qm(){return navigator?.serviceWorker?.controller||null}function Jm(){return Cd()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Id="firebaseLocalStorageDb",Zm=1,Vs="firebaseLocalStorage",Sd="fbase_key";class Qi{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function vr(n,e){return n.transaction([Vs],e?"readwrite":"readonly").objectStore(Vs)}function e_(){const n=indexedDB.deleteDatabase(Id);return new Qi(n).toPromise()}function wo(){const n=indexedDB.open(Id,Zm);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(Vs,{keyPath:Sd})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(Vs)?e(i):(i.close(),await e_(),e(await wo()))})})}async function Ac(n,e,t){const i=vr(n,!0).put({[Sd]:e,value:t});return new Qi(i).toPromise()}async function t_(n,e){const t=vr(n,!1).get(e),i=await new Qi(t).toPromise();return i===void 0?null:i.value}function Rc(n,e){const t=vr(n,!0).delete(e);return new Qi(t).toPromise()}const n_=800,i_=3;class Td{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await wo(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>i_)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Cd()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=yr._getInstance(Jm()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await Xm(),!this.activeServiceWorker)return;this.sender=new Ym(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Qm()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await wo();return await Ac(e,zs,"1"),await Rc(e,zs),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>Ac(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>t_(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Rc(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=vr(s,!1).getAll();return new Qi(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),n_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Td.type="LOCAL";const s_=Td;new Yi(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function r_(n,e){return e?yt(e):(x(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na extends Zo{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Rn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Rn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Rn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function o_(n){return _d(n.auth,new na(n),n.bypassAuthState)}function a_(n){const{auth:e,user:t}=n;return x(t,e,"internal-error"),Lm(t,new na(n),n.bypassAuthState)}async function c_(n){const{auth:e,user:t}=n;return x(t,e,"internal-error"),Nm(t,new na(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kd{constructor(e,t,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:s,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:t,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return o_;case"linkViaPopup":case"linkViaRedirect":return c_;case"reauthViaPopup":case"reauthViaRedirect":return a_;default:et(this.auth,"internal-error")}}resolve(e){Ct(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ct(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const l_=new Yi(2e3,1e4);class Tn extends kd{constructor(e,t,i,s,r){super(e,t,s,r),this.provider=i,this.authWindow=null,this.pollId=null,Tn.currentPopupAction&&Tn.currentPopupAction.cancel(),Tn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return x(e,this.auth,"internal-error"),e}async onExecution(){Ct(this.filter.length===1,"Popup operations only handle one event");const e=ta();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(at(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(at(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Tn.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(at(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,l_.get())};e()}}Tn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const h_="pendingRedirect",As=new Map;class d_ extends kd{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=As.get(this.auth._key());if(!e){try{const i=await u_(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}As.set(this.auth._key(),e)}return this.bypassAuthState||As.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function u_(n,e){const t=g_(e),i=p_(n);if(!await i._isAvailable())return!1;const s=await i._get(t)==="true";return await i._remove(t),s}function f_(n,e){As.set(n._key(),e)}function p_(n){return yt(n._redirectPersistence)}function g_(n){return xs(h_,n.config.apiKey,n.name)}async function m_(n,e,t=!1){if(je(n.app))return Promise.reject(bt(n));const i=bn(n),s=r_(i,e),o=await new d_(i,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const __=600*1e3;class y_{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!v_(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!xd(e)){const i=e.error.code?.split("auth/")[1]||"internal-error";t.onError(at(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=__&&this.cachedEventUids.clear(),this.cachedEventUids.has(Pc(e))}saveEventToCache(e){this.cachedEventUids.add(Pc(e)),this.lastProcessedEventTime=Date.now()}}function Pc(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function xd({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function v_(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return xd(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function b_(n,e={}){return Xt(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w_=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,E_=/^https?/;async function C_(n){if(n.config.emulator)return;const{authorizedDomains:e}=await b_(n);for(const t of e)try{if(I_(t))return}catch{}et(n,"unauthorized-domain")}function I_(n){const e=yo(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===i}if(!E_.test(t))return!1;if(w_.test(n))return i===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S_=new Yi(3e4,6e4);function Mc(){const n=ct().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function T_(n){return new Promise((e,t)=>{function i(){Mc(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Mc(),t(at(n,"network-request-failed"))},timeout:S_.get()})}if(ct().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(ct().gapi?.load)i();else{const s=_m("iframefcb");return ct()[s]=()=>{gapi.load?i():t(at(n,"network-request-failed"))},ud(`${mm()}?onload=${s}`).catch(r=>t(r))}}).catch(e=>{throw Rs=null,e})}let Rs=null;function k_(n){return Rs=Rs||T_(n),Rs}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x_=new Yi(5e3,15e3),A_="__/auth/iframe",R_="emulator/auth/iframe",P_={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},M_=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function D_(n){const e=n.config;x(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Xo(e,R_):`https://${n.config.authDomain}/${A_}`,i={apiKey:e.apiKey,appName:n.name,v:jn},s=M_.get(n.config.apiHost);s&&(i.eid=s);const r=n._getFrameworks();return r.length&&(i.fw=r.join(",")),`${t}?${Vn(i).slice(1)}`}async function O_(n){const e=await k_(n),t=ct().gapi;return x(t,n,"internal-error"),e.open({where:document.body,url:D_(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:P_,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const o=at(n,"network-request-failed"),a=ct().setTimeout(()=>{r(o)},x_.get());function c(){ct().clearTimeout(a),s(i)}i.ping(c).then(c,()=>{r(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N_={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},L_=500,F_=600,B_="_blank",U_="http://localhost";class Dc{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function H_(n,e,t,i=L_,s=F_){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const c={...N_,width:i.toString(),height:s.toString(),top:r,left:o},l=Oe().toLowerCase();t&&(a=rd(l)?B_:t),id(l)&&(e=e||U_,c.scrollbars="yes");const h=Object.entries(c).reduce((u,[f,p])=>`${u}${f}=${p},`,"");if(am(l)&&a!=="_self")return W_(e||"",a),new Dc(null);const d=window.open(e||"",a,h);x(d,n,"popup-blocked");try{d.focus()}catch{}return new Dc(d)}function W_(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $_="__/auth/handler",z_="emulator/auth/handler",V_=encodeURIComponent("fac");async function Oc(n,e,t,i,s,r){x(n.config.authDomain,n,"auth-domain-config-required"),x(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:jn,eventId:s};if(e instanceof gd){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",uo(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,d]of Object.entries({}))o[h]=d}if(e instanceof Xi){const h=e.getScopes().filter(d=>d!=="");h.length>0&&(o.scopes=h.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const h of Object.keys(a))a[h]===void 0&&delete a[h];const c=await n._getAppCheckToken(),l=c?`#${V_}=${encodeURIComponent(c)}`:"";return`${j_(n)}?${Vn(a).slice(1)}${l}`}function j_({config:n}){return n.emulator?Xo(n,z_):`https://${n.authDomain}/${$_}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yr="webStorageSupport";class q_{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Ed,this._completeRedirectFn=m_,this._overrideRedirectResult=f_}async _openPopup(e,t,i,s){Ct(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const r=await Oc(e,t,i,yo(),s);return H_(e,r,ta())}async _openRedirect(e,t,i,s){await this._originValidation(e);const r=await Oc(e,t,i,yo(),s);return Km(r),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:r}=this.eventManagers[t];return s?Promise.resolve(s):(Ct(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await O_(e),i=new y_(e);return t.register("authEvent",s=>(x(s?.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Yr,{type:Yr},s=>{const r=s?.[0]?.[Yr];r!==void 0&&t(!!r),et(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=C_(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return hd()||sd()||Jo()}}const G_=q_;var Nc="@firebase/auth",Lc="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y_{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e(i?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){x(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function K_(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function X_(n){Ln(new dn("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;x(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const c={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:dd(n)},l=new fm(i,s,r,c);return Cm(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),Ln(new dn("auth-internal",e=>{const t=bn(e.getProvider("auth").getImmediate());return(i=>new Y_(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Bt(Nc,Lc,K_(n)),Bt(Nc,Lc,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Q_=300,J_=Bh("authIdTokenMaxAge")||Q_;let Fc=null;const Z_=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>J_)return;const s=t?.token;Fc!==s&&(Fc=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function ey(n=qh()){const e=Yo(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Em(n,{popupRedirectResolver:G_,persistence:[s_,qm,Ed]}),i=Bh("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const o=Z_(r.toString());Wm(t,o,()=>o(t.currentUser)),Hm(t,a=>o(a))}}const s=Lh("auth");return s&&Im(t,`http://${s}`),t}function ty(){return document.getElementsByTagName("head")?.[0]??document}pm({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=s=>{const r=at("internal-error");r.customData=s,t(r)},i.type="text/javascript",i.charset="UTF-8",ty().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});X_("Browser");var Bc={};const Uc="@firebase/database",Hc="1.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ad="";function ny(n){Ad=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iy{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),ye(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Ai(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sy{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return Tt(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rd=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new iy(e)}}catch{}return new sy},on=Rd("localStorage"),ry=Rd("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pn=new qo("@firebase/database"),oy=function(){let n=1;return function(){return n++}}(),Pd=function(n){const e=Rp(n),t=new Tp;t.update(e);const i=t.digest();return $o.encodeByteArray(i)},Ji=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=Ji.apply(null,i):typeof i=="object"?e+=ye(i):e+=i,e+=" "}return e};let yi=null,Wc=!0;const ay=function(n,e){w(!0,"Can't turn on custom loggers persistently."),Pn.logLevel=Z.VERBOSE,yi=Pn.log.bind(Pn)},Re=function(...n){if(Wc===!0&&(Wc=!1,yi===null&&ry.get("logging_enabled")===!0&&ay()),yi){const e=Ji.apply(null,n);yi(e)}},Zi=function(n){return function(...e){Re(n,...e)}},Eo=function(...n){const e="FIREBASE INTERNAL ERROR: "+Ji(...n);Pn.error(e)},It=function(...n){const e=`FIREBASE FATAL ERROR: ${Ji(...n)}`;throw Pn.error(e),new Error(e)},He=function(...n){const e="FIREBASE WARNING: "+Ji(...n);Pn.warn(e)},cy=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&He("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Md=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},ly=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},Fn="[MIN_NAME]",pn="[MAX_NAME]",Gn=function(n,e){if(n===e)return 0;if(n===Fn||e===pn)return-1;if(e===Fn||n===pn)return 1;{const t=$c(n),i=$c(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},hy=function(n,e){return n===e?0:n<e?-1:1},Jn=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+ye(e))},ia=function(n){if(typeof n!="object"||n===null)return ye(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=ye(e[i]),t+=":",t+=ia(n[e[i]]);return t+="}",t},Dd=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function We(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const Od=function(n){w(!Md(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,o,a,c;n===0?(r=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=a+i,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-i-t))));const l=[];for(c=t;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(r%2?1:0),r=Math.floor(r/2);l.push(s?1:0),l.reverse();const h=l.join("");let d="";for(c=0;c<64;c+=8){let u=parseInt(h.substr(c,8),2).toString(16);u.length===1&&(u="0"+u),d=d+u}return d.toLowerCase()},dy=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},uy=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function fy(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const py=new RegExp("^-?(0*)\\d{1,10}$"),gy=-2147483648,my=2147483647,$c=function(n){if(py.test(n)){const e=Number(n);if(e>=gy&&e<=my)return e}return null},Yn=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw He("Exception was thrown by user callback.",t),e},Math.floor(0))}},_y=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},vi=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yy{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,je(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(t=>t.addTokenListener(e))}notifyForInvalidToken(){He(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vy{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(Re("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',He(e)}}class Ps{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Ps.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sa="5",Nd="v",Ld="s",Fd="r",Bd="f",Ud=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Hd="ls",Wd="p",Co="ac",$d="websocket",zd="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vd{constructor(e,t,i,s,r=!1,o="",a=!1,c=!1,l=null){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=on.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&on.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function by(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function jd(n,e,t){w(typeof e=="string","typeof type must == string"),w(typeof t=="object","typeof params must == object");let i;if(e===$d)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===zd)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);by(n)&&(t.ns=n.namespace);const s=[];return We(t,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wy{constructor(){this.counters_={}}incrementCounter(e,t=1){Tt(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return rp(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kr={},Xr={};function ra(n){const e=n.toString();return Kr[e]||(Kr[e]=new wy),Kr[e]}function Ey(n,e){const t=n.toString();return Xr[t]||(Xr[t]=e()),Xr[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cy{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&Yn(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zc="start",Iy="close",Sy="pLPCommand",Ty="pRTLPCB",qd="id",Gd="pw",Yd="ser",ky="cb",xy="seg",Ay="ts",Ry="d",Py="dframe",Kd=1870,Xd=30,My=Kd-Xd,Dy=25e3,Oy=3e4;class kn{constructor(e,t,i,s,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Zi(e),this.stats_=ra(t),this.urlFn=c=>(this.appCheckToken&&(c[Co]=this.appCheckToken),jd(t,zd,c))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new Cy(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Oy)),ly(()=>{if(this.isClosed_)return;this.scriptTagHolder=new oa((...r)=>{const[o,a,c,l,h]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===zc)this.id=a,this.password=c;else if(o===Iy)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[zc]="t",i[Yd]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[ky]=this.scriptTagHolder.uniqueCallbackIdentifier),i[Nd]=sa,this.transportSessionId&&(i[Ld]=this.transportSessionId),this.lastSessionId&&(i[Hd]=this.lastSessionId),this.applicationId&&(i[Wd]=this.applicationId),this.appCheckToken&&(i[Co]=this.appCheckToken),typeof location<"u"&&location.hostname&&Ud.test(location.hostname)&&(i[Fd]=Bd);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){kn.forceAllow_=!0}static forceDisallow(){kn.forceDisallow_=!0}static isAvailable(){return kn.forceAllow_?!0:!kn.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!dy()&&!uy()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=ye(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Oh(t),s=Dd(i,My);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[Py]="t",i[qd]=e,i[Gd]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=ye(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class oa{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=oy(),window[Sy+this.uniqueCallbackIdentifier]=e,window[Ty+this.uniqueCallbackIdentifier]=t,this.myIFrame=oa.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){Re("frame writing exception"),a.stack&&Re(a.stack),Re(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Re("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[qd]=this.myID,e[Gd]=this.myPW,e[Yd]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Xd+i.length<=Kd;){const o=this.pendingSegs.shift();i=i+"&"+xy+s+"="+o.seg+"&"+Ay+s+"="+o.ts+"&"+Ry+s+"="+o.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(Dy)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{Re("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ny=16384,Ly=45e3;let js=null;typeof MozWebSocket<"u"?js=MozWebSocket:typeof WebSocket<"u"&&(js=WebSocket);class Ke{constructor(e,t,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Zi(this.connId),this.stats_=ra(t),this.connURL=Ke.connectionURL_(t,o,a,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const o={};return o[Nd]=sa,typeof location<"u"&&location.hostname&&Ud.test(location.hostname)&&(o[Fd]=Bd),t&&(o[Ld]=t),i&&(o[Hd]=i),s&&(o[Co]=s),r&&(o[Wd]=r),jd(e,$d,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,on.set("previous_websocket_failure",!0);try{let i;yp(),this.mySock=new js(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){Ke.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&js!==null&&!Ke.forceDisallow_}static previouslyFailed(){return on.isInMemoryStorage||on.get("previous_websocket_failure")===!0}markConnectionHealthy(){on.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=Ai(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(w(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=ye(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Dd(t,Ny);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Ly))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Ke.responsesRequiredToBeHealthy=2;Ke.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oi{static get ALL_TRANSPORTS(){return[kn,Ke]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=Ke&&Ke.isAvailable();let i=t&&!Ke.previouslyFailed();if(e.webSocketOnly&&(t||He("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[Ke];else{const s=this.transports_=[];for(const r of Oi.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);Oi.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Oi.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fy=6e4,By=5e3,Uy=10*1024,Hy=100*1024,Qr="t",Vc="d",Wy="s",jc="r",$y="e",qc="o",Gc="a",Yc="n",Kc="p",zy="h";class Vy{constructor(e,t,i,s,r,o,a,c,l,h){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=h,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Zi("c:"+this.id+":"),this.transportManager_=new Oi(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=vi(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Hy?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Uy?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Qr in e){const t=e[Qr];t===Gc?this.upgradeIfSecondaryHealthy_():t===jc?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===qc&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=Jn("t",e),i=Jn("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Kc,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Gc,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Yc,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=Jn("t",e),i=Jn("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=Jn(Qr,e);if(Vc in e){const i=e[Vc];if(t===zy){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===Yc){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===Wy?this.onConnectionShutdown_(i):t===jc?this.onReset_(i):t===$y?Eo("Server Error: "+i):t===qc?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Eo("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),sa!==i&&He("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),vi(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Fy))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):vi(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(By))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Kc,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(on.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qd{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jd{constructor(e){this.allowedEvents_=e,this.listeners_={},w(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){w(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qs extends Jd{static getInstance(){return new qs}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Vo()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return w(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xc=32,Qc=768;class ne{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function G(){return new ne("")}function B(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function zt(n){return n.pieces_.length-n.pieceNum_}function se(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new ne(n.pieces_,e)}function Zd(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function jy(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function eu(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function tu(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new ne(e,0)}function ve(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof ne)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new ne(t,0)}function H(n){return n.pieceNum_>=n.pieces_.length}function De(n,e){const t=B(n),i=B(e);if(t===null)return e;if(t===i)return De(se(n),se(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function aa(n,e){if(zt(n)!==zt(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function Qe(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(zt(n)>zt(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class qy{constructor(e,t){this.errorPrefix_=t,this.parts_=eu(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=mr(this.parts_[i]);nu(this)}}function Gy(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=mr(e),nu(n)}function Yy(n){const e=n.parts_.pop();n.byteLength_-=mr(e),n.parts_.length>0&&(n.byteLength_-=1)}function nu(n){if(n.byteLength_>Qc)throw new Error(n.errorPrefix_+"has a key path longer than "+Qc+" bytes ("+n.byteLength_+").");if(n.parts_.length>Xc)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Xc+") or object contains a cycle "+sn(n))}function sn(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ca extends Jd{static getInstance(){return new ca}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return w(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zn=1e3,Ky=300*1e3,Jc=30*1e3,Xy=1.3,Qy=3e4,Jy="server_kill",Zc=3;class wt extends Qd{constructor(e,t,i,s,r,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=wt.nextPersistentConnectionId_++,this.log_=Zi("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Zn,this.maxReconnectDelay_=Ky,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");ca.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&qs.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(ye(r)),w(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new gr,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),w(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),w(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const c=a.d,l=a.s;wt.warnOnListenWarnings_(c,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&Tt(e,"w")){const i=Nn(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();He(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Sp(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Jc)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=Ip(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),w(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const o={p:t,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+ye(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Eo("Unrecognized action received from server: "+ye(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){w(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Zn,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Zn,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Qy&&(this.reconnectDelay_=Zn),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Xy)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+wt.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,i())},l=function(d){w(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:c,sendRequest:l};const h=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,u]=await Promise.all([this.authTokenProvider_.getToken(h),this.appCheckTokenProvider_.getToken(h)]);o?Re("getToken() completed but was canceled"):(Re("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=u&&u.token,a=new Vy(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,f=>{He(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(Jy)},r))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&He(d),c())}}}interrupt(e){Re("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Re("Resuming connection for reason: "+e),delete this.interruptReasons_[e],uo(this.interruptReasons_)&&(this.reconnectDelay_=Zn,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>ia(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new ne(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){Re("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Zc&&(this.reconnectDelay_=Jc,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){Re("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Zc&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+Ad.replace(/\./g,"-")]=1,Vo()?e["framework.cordova"]=1:Wh()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=qs.getInstance().currentlyOnline();return uo(this.interruptReasons_)&&e}}wt.nextPersistentConnectionId_=0;wt.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new U(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class br{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new U(Fn,e),s=new U(Fn,t);return this.compare(i,s)!==0}minPost(){return U.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hs;class iu extends br{static get __EMPTY_NODE(){return hs}static set __EMPTY_NODE(e){hs=e}compare(e,t){return Gn(e.name,t.name)}isDefinedOn(e){throw $n("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return U.MIN}maxPost(){return new U(pn,hs)}makePost(e,t){return w(typeof e=="string","KeyIndex indexValue must always be a string."),new U(e,hs)}toString(){return".key"}}const Mn=new iu;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ds{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Ce{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??Ce.RED,this.left=s??Be.EMPTY_NODE,this.right=r??Be.EMPTY_NODE}copy(e,t,i,s,r){return new Ce(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return Be.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return Be.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Ce.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Ce.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Ce.RED=!0;Ce.BLACK=!1;class Zy{copy(e,t,i,s,r){return this}insert(e,t,i){return new Ce(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Be{constructor(e,t=Be.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new Be(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,Ce.BLACK,null,null))}remove(e){return new Be(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Ce.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new ds(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new ds(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new ds(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new ds(this.root_,null,this.comparator_,!0,e)}}Be.EMPTY_NODE=new Zy;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ev(n,e){return Gn(n.name,e.name)}function la(n,e){return Gn(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Io;function tv(n){Io=n}const su=function(n){return typeof n=="number"?"number:"+Od(n):"string:"+n},ru=function(n){if(n.isLeafNode()){const e=n.val();w(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Tt(e,".sv"),"Priority must be a string or number.")}else w(n===Io||n.isEmpty(),"priority of unexpected type.");w(n===Io||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let el;class Ee{static set __childrenNodeConstructor(e){el=e}static get __childrenNodeConstructor(){return el}constructor(e,t=Ee.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,w(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),ru(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Ee(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:Ee.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return H(e)?this:B(e)===".priority"?this.priorityNode_:Ee.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:Ee.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=B(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(w(i!==".priority"||zt(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,Ee.__childrenNodeConstructor.EMPTY_NODE.updateChild(se(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+su(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=Od(this.value_):e+=this.value_,this.lazyHash_=Pd(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Ee.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Ee.__childrenNodeConstructor?-1:(w(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=Ee.VALUE_TYPE_ORDER.indexOf(t),r=Ee.VALUE_TYPE_ORDER.indexOf(i);return w(s>=0,"Unknown leaf type: "+t),w(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}Ee.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ou,au;function nv(n){ou=n}function iv(n){au=n}class sv extends br{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?Gn(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return U.MIN}maxPost(){return new U(pn,new Ee("[PRIORITY-POST]",au))}makePost(e,t){const i=ou(e);return new U(t,new Ee("[PRIORITY-POST]",i))}toString(){return".priority"}}const pe=new sv;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rv=Math.log(2);class ov{constructor(e){const t=r=>parseInt(Math.log(r)/rv,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Gs=function(n,e,t,i){n.sort(e);const s=function(c,l){const h=l-c;let d,u;if(h===0)return null;if(h===1)return d=n[c],u=t?t(d):d,new Ce(u,d.node,Ce.BLACK,null,null);{const f=parseInt(h/2,10)+c,p=s(c,f),_=s(f+1,l);return d=n[f],u=t?t(d):d,new Ce(u,d.node,Ce.BLACK,p,_)}},r=function(c){let l=null,h=null,d=n.length;const u=function(p,_){const m=d-p,v=d;d-=p;const b=s(m+1,v),E=n[m],I=t?t(E):E;f(new Ce(I,E.node,_,null,b))},f=function(p){l?(l.left=p,l=p):(h=p,l=p)};for(let p=0;p<c.count;++p){const _=c.nextBitIsOne(),m=Math.pow(2,c.count-(p+1));_?u(m,Ce.BLACK):(u(m,Ce.BLACK),u(m,Ce.RED))}return h},o=new ov(n.length),a=r(o);return new Be(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Jr;const En={};class vt{static get Default(){return w(En&&pe,"ChildrenNode.ts has not been loaded"),Jr=Jr||new vt({".priority":En},{".priority":pe}),Jr}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=Nn(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof Be?t:null}hasIndex(e){return Tt(this.indexSet_,e.toString())}addIndex(e,t){w(e!==Mn,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator(U.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=Gs(i,e.getCompare()):a=En;const c=e.toString(),l={...this.indexSet_};l[c]=e;const h={...this.indexes_};return h[c]=a,new vt(h,l)}addToIndexes(e,t){const i=Bs(this.indexes_,(s,r)=>{const o=Nn(this.indexSet_,r);if(w(o,"Missing index implementation for "+r),s===En)if(o.isDefinedOn(e.node)){const a=[],c=t.getIterator(U.Wrap);let l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),Gs(a,o.getCompare())}else return En;else{const a=t.get(e.name);let c=s;return a&&(c=c.remove(new U(e.name,a))),c.insert(e,e.node)}});return new vt(i,this.indexSet_)}removeFromIndexes(e,t){const i=Bs(this.indexes_,s=>{if(s===En)return s;{const r=t.get(e.name);return r?s.remove(new U(e.name,r)):s}});return new vt(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ei;class A{static get EMPTY_NODE(){return ei||(ei=new A(new Be(la),null,vt.Default))}constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&ru(this.priorityNode_),this.children_.isEmpty()&&w(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||ei}updatePriority(e){return this.children_.isEmpty()?this:new A(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?ei:t}}getChild(e){const t=B(e);return t===null?this:this.getImmediateChild(t).getChild(se(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(w(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new U(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?ei:this.priorityNode_;return new A(s,o,r)}}updateChild(e,t){const i=B(e);if(i===null)return t;{w(B(e)!==".priority"||zt(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(se(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild(pe,(o,a)=>{t[o]=a.val(e),i++,r&&A.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+su(this.getPriority().val())+":"),this.forEachChild(pe,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":Pd(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new U(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new U(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new U(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,U.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,U.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===es?-1:0}withIndex(e){if(e===Mn||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new A(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Mn||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(pe),s=t.getIterator(pe);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Mn?null:this.indexMap_.get(e.toString())}}A.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class av extends A{constructor(){super(new Be(la),A.EMPTY_NODE,vt.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return A.EMPTY_NODE}isEmpty(){return!1}}const es=new av;Object.defineProperties(U,{MIN:{value:new U(Fn,A.EMPTY_NODE)},MAX:{value:new U(pn,es)}});iu.__EMPTY_NODE=A.EMPTY_NODE;Ee.__childrenNodeConstructor=A;tv(es);iv(es);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cv=!0;function Ie(n,e=null){if(n===null)return A.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),w(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new Ee(t,Ie(e))}if(!(n instanceof Array)&&cv){const t=[];let i=!1;if(We(n,(o,a)=>{if(o.substring(0,1)!=="."){const c=Ie(a);c.isEmpty()||(i=i||!c.getPriority().isEmpty(),t.push(new U(o,c)))}}),t.length===0)return A.EMPTY_NODE;const r=Gs(t,ev,o=>o.name,la);if(i){const o=Gs(t,pe.getCompare());return new A(r,Ie(e),new vt({".priority":o},{".priority":pe}))}else return new A(r,Ie(e),vt.Default)}else{let t=A.EMPTY_NODE;return We(n,(i,s)=>{if(Tt(n,i)&&i.substring(0,1)!=="."){const r=Ie(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(Ie(e))}}nv(Ie);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lv extends br{constructor(e){super(),this.indexPath_=e,w(!H(e)&&B(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?Gn(e.name,t.name):r}makePost(e,t){const i=Ie(e),s=A.EMPTY_NODE.updateChild(this.indexPath_,i);return new U(t,s)}maxPost(){const e=A.EMPTY_NODE.updateChild(this.indexPath_,es);return new U(pn,e)}toString(){return eu(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hv extends br{compare(e,t){const i=e.node.compareTo(t.node);return i===0?Gn(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return U.MIN}maxPost(){return U.MAX}makePost(e,t){const i=Ie(e);return new U(t,i)}toString(){return".value"}}const dv=new hv;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cu(n){return{type:"value",snapshotNode:n}}function Bn(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function Ni(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function Li(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function uv(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ha{constructor(e){this.index_=e}updateChild(e,t,i,s,r,o){w(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(Ni(t,a)):w(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Bn(t,i)):o.trackChildChange(Li(t,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(pe,(s,r)=>{t.hasChild(s)||i.trackChildChange(Ni(s,r))}),t.isLeafNode()||t.forEachChild(pe,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(Li(s,r,o))}else i.trackChildChange(Bn(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?A.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fi{constructor(e){this.indexedFilter_=new ha(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Fi.getStartPost_(e),this.endPost_=Fi.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,o){return this.matches(new U(t,i))||(i=A.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=A.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(A.EMPTY_NODE);const r=this;return t.forEachChild(pe,(o,a)=>{r.matches(new U(o,a))||(s=s.updateImmediateChild(o,A.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fv{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Fi(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,o){return this.rangedFilter_.matches(new U(t,i))||(i=A.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,o):this.fullLimitUpdateChild_(e,t,i,r,o)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=A.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=A.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(A.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,A.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let o;if(this.reverse_){const d=this.index_.getCompare();o=(u,f)=>d(f,u)}else o=this.index_.getCompare();const a=e;w(a.numChildren()===this.limit_,"");const c=new U(t,i),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),h=this.rangedFilter_.matches(c);if(a.hasChild(t)){const d=a.getImmediateChild(t);let u=s.getChildAfterChild(this.index_,l,this.reverse_);for(;u!=null&&(u.name===t||a.hasChild(u.name));)u=s.getChildAfterChild(this.index_,u,this.reverse_);const f=u==null?1:o(u,c);if(h&&!i.isEmpty()&&f>=0)return r?.trackChildChange(Li(t,i,d)),a.updateImmediateChild(t,i);{r?.trackChildChange(Ni(t,d));const _=a.updateImmediateChild(t,A.EMPTY_NODE);return u!=null&&this.rangedFilter_.matches(u)?(r?.trackChildChange(Bn(u.name,u.node)),_.updateImmediateChild(u.name,u.node)):_}}else return i.isEmpty()?e:h&&o(l,c)>=0?(r!=null&&(r.trackChildChange(Ni(l.name,l.node)),r.trackChildChange(Bn(t,i))),a.updateImmediateChild(t,i).updateImmediateChild(l.name,A.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class da{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=pe}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return w(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return w(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Fn}hasEnd(){return this.endSet_}getIndexEndValue(){return w(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return w(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:pn}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return w(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===pe}copy(){const e=new da;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function pv(n){return n.loadsAllData()?new ha(n.getIndex()):n.hasLimit()?new fv(n):new Fi(n)}function tl(n){const e={};if(n.isDefault())return e;let t;if(n.index_===pe?t="$priority":n.index_===dv?t="$value":n.index_===Mn?t="$key":(w(n.index_ instanceof lv,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=ye(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=ye(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+ye(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=ye(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+ye(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function nl(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==pe&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ys extends Qd{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(w(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=Zi("p:rest:"),this.listens_={}}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Ys.getListenId_(e,i),a={};this.listens_[o]=a;const c=tl(e._queryParams);this.restRequest_(r+".json",c,(l,h)=>{let d=h;if(l===404&&(d=null,l=null),l===null&&this.onDataUpdate_(r,d,!1,i),Nn(this.listens_,o)===a){let u;l?l===401?u="permission_denied":u="rest_error:"+l:u="ok",s(u,null)}})}unlisten(e,t){const i=Ys.getListenId_(e,t);delete this.listens_[i]}get(e){const t=tl(e._queryParams),i=e._path.toString(),s=new gr;return this.restRequest_(i+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Vn(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=Ai(a.responseText)}catch{He("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,c)}else a.status!==401&&a.status!==404&&He("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gv{constructor(){this.rootNode_=A.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ks(){return{value:null,children:new Map}}function lu(n,e,t){if(H(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=B(e);n.children.has(i)||n.children.set(i,Ks());const s=n.children.get(i);e=se(e),lu(s,e,t)}}function So(n,e,t){n.value!==null?t(e,n.value):mv(n,(i,s)=>{const r=new ne(e.toString()+"/"+i);So(s,r,t)})}function mv(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _v{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&We(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const il=10*1e3,yv=30*1e3,vv=300*1e3;class bv{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new _v(e);const i=il+(yv-il)*Math.random();vi(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;We(e,(s,r)=>{r>0&&Tt(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),vi(this.reportStats_.bind(this),Math.floor(Math.random()*2*vv))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Je;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Je||(Je={}));function hu(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function ua(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function fa(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=Je.ACK_USER_WRITE,this.source=hu()}operationForChild(e){if(H(this.path)){if(this.affectedTree.value!=null)return w(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new ne(e));return new Xs(G(),t,this.revert)}}else return w(B(this.path)===e,"operationForChild called for unrelated child."),new Xs(se(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bi{constructor(e,t){this.source=e,this.path=t,this.type=Je.LISTEN_COMPLETE}operationForChild(e){return H(this.path)?new Bi(this.source,G()):new Bi(this.source,se(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=Je.OVERWRITE}operationForChild(e){return H(this.path)?new gn(this.source,G(),this.snap.getImmediateChild(e)):new gn(this.source,se(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ui{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=Je.MERGE}operationForChild(e){if(H(this.path)){const t=this.children.subtree(new ne(e));return t.isEmpty()?null:t.value?new gn(this.source,G(),t.value):new Ui(this.source,G(),t)}else return w(B(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Ui(this.source,se(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(H(e))return this.isFullyInitialized()&&!this.filtered_;const t=B(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wv{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Ev(n,e,t,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(uv(o.childName,o.snapshotNode))}),ti(n,s,"child_removed",e,i,t),ti(n,s,"child_added",e,i,t),ti(n,s,"child_moved",r,i,t),ti(n,s,"child_changed",e,i,t),ti(n,s,"value",e,i,t),s}function ti(n,e,t,i,s,r){const o=i.filter(a=>a.type===t);o.sort((a,c)=>Iv(n,a,c)),o.forEach(a=>{const c=Cv(n,a,r);s.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,n.query_))})})}function Cv(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function Iv(n,e,t){if(e.childName==null||t.childName==null)throw $n("Should only compare child_ events.");const i=new U(e.childName,e.snapshotNode),s=new U(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wr(n,e){return{eventCache:n,serverCache:e}}function bi(n,e,t,i){return wr(new Vt(e,t,i),n.serverCache)}function du(n,e,t,i){return wr(n.eventCache,new Vt(e,t,i))}function Qs(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function mn(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Zr;const Sv=()=>(Zr||(Zr=new Be(hy)),Zr);class oe{static fromObject(e){let t=new oe(null);return We(e,(i,s)=>{t=t.set(new ne(i),s)}),t}constructor(e,t=Sv()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:G(),value:this.value};if(H(e))return null;{const i=B(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(se(e),t);return r!=null?{path:ve(new ne(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(H(e))return this;{const t=B(e),i=this.children.get(t);return i!==null?i.subtree(se(e)):new oe(null)}}set(e,t){if(H(e))return new oe(t,this.children);{const i=B(e),r=(this.children.get(i)||new oe(null)).set(se(e),t),o=this.children.insert(i,r);return new oe(this.value,o)}}remove(e){if(H(e))return this.children.isEmpty()?new oe(null):new oe(null,this.children);{const t=B(e),i=this.children.get(t);if(i){const s=i.remove(se(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new oe(null):new oe(this.value,r)}else return this}}get(e){if(H(e))return this.value;{const t=B(e),i=this.children.get(t);return i?i.get(se(e)):null}}setTree(e,t){if(H(e))return t;{const i=B(e),r=(this.children.get(i)||new oe(null)).setTree(se(e),t);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new oe(this.value,o)}}fold(e){return this.fold_(G(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(ve(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,G(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(H(e))return null;{const r=B(e),o=this.children.get(r);return o?o.findOnPath_(se(e),ve(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,G(),t)}foreachOnPath_(e,t,i){if(H(e))return this;{this.value&&i(t,this.value);const s=B(e),r=this.children.get(s);return r?r.foreachOnPath_(se(e),ve(t,s),i):new oe(null)}}foreach(e){this.foreach_(G(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(ve(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(e){this.writeTree_=e}static empty(){return new Ze(new oe(null))}}function wi(n,e,t){if(H(e))return new Ze(new oe(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=De(s,e);return r=r.updateChild(o,t),new Ze(n.writeTree_.set(s,r))}else{const s=new oe(t),r=n.writeTree_.setTree(e,s);return new Ze(r)}}}function sl(n,e,t){let i=n;return We(t,(s,r)=>{i=wi(i,ve(e,s),r)}),i}function rl(n,e){if(H(e))return Ze.empty();{const t=n.writeTree_.setTree(e,new oe(null));return new Ze(t)}}function To(n,e){return wn(n,e)!=null}function wn(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(De(t.path,e)):null}function ol(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(pe,(i,s)=>{e.push(new U(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new U(i,s.value))}),e}function Ut(n,e){if(H(e))return n;{const t=wn(n,e);return t!=null?new Ze(new oe(t)):new Ze(n.writeTree_.subtree(e))}}function ko(n){return n.writeTree_.isEmpty()}function Un(n,e){return uu(G(),n.writeTree_,e)}function uu(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(w(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=uu(ve(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(ve(n,".priority"),i)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Er(n,e){return mu(e,n)}function Tv(n,e,t,i,s){w(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=wi(n.visibleWrites,e,t)),n.lastWriteId=i}function kv(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function xv(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);w(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&Av(a,i.path)?s=!1:Qe(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return Rv(n),!0;if(i.snap)n.visibleWrites=rl(n.visibleWrites,i.path);else{const a=i.children;We(a,c=>{n.visibleWrites=rl(n.visibleWrites,ve(i.path,c))})}return!0}else return!1}function Av(n,e){if(n.snap)return Qe(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&Qe(ve(n.path,t),e))return!0;return!1}function Rv(n){n.visibleWrites=fu(n.allWrites,Pv,G()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function Pv(n){return n.visible}function fu(n,e,t){let i=Ze.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const o=r.path;let a;if(r.snap)Qe(t,o)?(a=De(t,o),i=wi(i,a,r.snap)):Qe(o,t)&&(a=De(o,t),i=wi(i,G(),r.snap.getChild(a)));else if(r.children){if(Qe(t,o))a=De(t,o),i=sl(i,a,r.children);else if(Qe(o,t))if(a=De(o,t),H(a))i=sl(i,G(),r.children);else{const c=Nn(r.children,B(a));if(c){const l=c.getChild(se(a));i=wi(i,G(),l)}}}else throw $n("WriteRecord should have .snap or .children")}}return i}function pu(n,e,t,i,s){if(!i&&!s){const r=wn(n.visibleWrites,e);if(r!=null)return r;{const o=Ut(n.visibleWrites,e);if(ko(o))return t;if(t==null&&!To(o,G()))return null;{const a=t||A.EMPTY_NODE;return Un(o,a)}}}else{const r=Ut(n.visibleWrites,e);if(!s&&ko(r))return t;if(!s&&t==null&&!To(r,G()))return null;{const o=function(l){return(l.visible||s)&&(!i||!~i.indexOf(l.writeId))&&(Qe(l.path,e)||Qe(e,l.path))},a=fu(n.allWrites,o,e),c=t||A.EMPTY_NODE;return Un(a,c)}}}function Mv(n,e,t){let i=A.EMPTY_NODE;const s=wn(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(pe,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(t){const r=Ut(n.visibleWrites,e);return t.forEachChild(pe,(o,a)=>{const c=Un(Ut(r,new ne(o)),a);i=i.updateImmediateChild(o,c)}),ol(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=Ut(n.visibleWrites,e);return ol(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function Dv(n,e,t,i,s){w(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=ve(e,t);if(To(n.visibleWrites,r))return null;{const o=Ut(n.visibleWrites,r);return ko(o)?s.getChild(t):Un(o,s.getChild(t))}}function Ov(n,e,t,i){const s=ve(e,t),r=wn(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const o=Ut(n.visibleWrites,s);return Un(o,i.getNode().getImmediateChild(t))}else return null}function Nv(n,e){return wn(n.visibleWrites,e)}function Lv(n,e,t,i,s,r,o){let a;const c=Ut(n.visibleWrites,e),l=wn(c,G());if(l!=null)a=l;else if(t!=null)a=Un(c,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const h=[],d=o.getCompare(),u=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let f=u.getNext();for(;f&&h.length<s;)d(f,i)!==0&&h.push(f),f=u.getNext();return h}else return[]}function Fv(){return{visibleWrites:Ze.empty(),allWrites:[],lastWriteId:-1}}function Js(n,e,t,i){return pu(n.writeTree,n.treePath,e,t,i)}function pa(n,e){return Mv(n.writeTree,n.treePath,e)}function al(n,e,t,i){return Dv(n.writeTree,n.treePath,e,t,i)}function Zs(n,e){return Nv(n.writeTree,ve(n.treePath,e))}function Bv(n,e,t,i,s,r){return Lv(n.writeTree,n.treePath,e,t,i,s,r)}function ga(n,e,t){return Ov(n.writeTree,n.treePath,e,t)}function gu(n,e){return mu(ve(n.treePath,e),n.writeTree)}function mu(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uv{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;w(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),w(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,Li(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,Ni(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,Bn(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,Li(i,e.snapshotNode,s.oldSnap));else throw $n("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hv{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const _u=new Hv;class ma{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new Vt(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return ga(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:mn(this.viewCache_),r=Bv(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wv(n){return{filter:n}}function $v(n,e){w(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),w(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function zv(n,e,t,i,s){const r=new Uv;let o,a;if(t.type===Je.OVERWRITE){const l=t;l.source.fromUser?o=xo(n,e,l.path,l.snap,i,s,r):(w(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!H(l.path),o=er(n,e,l.path,l.snap,i,s,a,r))}else if(t.type===Je.MERGE){const l=t;l.source.fromUser?o=jv(n,e,l.path,l.children,i,s,r):(w(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=Ao(n,e,l.path,l.children,i,s,a,r))}else if(t.type===Je.ACK_USER_WRITE){const l=t;l.revert?o=Yv(n,e,l.path,i,s,r):o=qv(n,e,l.path,l.affectedTree,i,s,r)}else if(t.type===Je.LISTEN_COMPLETE)o=Gv(n,e,t.path,i,r);else throw $n("Unknown operation type: "+t.type);const c=r.getChanges();return Vv(e,o,c),{viewCache:o,changes:c}}function Vv(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=Qs(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(cu(Qs(e)))}}function yu(n,e,t,i,s,r){const o=e.eventCache;if(Zs(i,t)!=null)return e;{let a,c;if(H(t))if(w(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const l=mn(e),h=l instanceof A?l:A.EMPTY_NODE,d=pa(i,h);a=n.filter.updateFullNode(e.eventCache.getNode(),d,r)}else{const l=Js(i,mn(e));a=n.filter.updateFullNode(e.eventCache.getNode(),l,r)}else{const l=B(t);if(l===".priority"){w(zt(t)===1,"Can't have a priority with additional path components");const h=o.getNode();c=e.serverCache.getNode();const d=al(i,t,h,c);d!=null?a=n.filter.updatePriority(h,d):a=o.getNode()}else{const h=se(t);let d;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();const u=al(i,t,o.getNode(),c);u!=null?d=o.getNode().getImmediateChild(l).updateChild(h,u):d=o.getNode().getImmediateChild(l)}else d=ga(i,l,e.serverCache);d!=null?a=n.filter.updateChild(o.getNode(),l,d,h,s,r):a=o.getNode()}}return bi(e,a,o.isFullyInitialized()||H(t),n.filter.filtersNodes())}}function er(n,e,t,i,s,r,o,a){const c=e.serverCache;let l;const h=o?n.filter:n.filter.getIndexedFilter();if(H(t))l=h.updateFullNode(c.getNode(),i,null);else if(h.filtersNodes()&&!c.isFiltered()){const f=c.getNode().updateChild(t,i);l=h.updateFullNode(c.getNode(),f,null)}else{const f=B(t);if(!c.isCompleteForPath(t)&&zt(t)>1)return e;const p=se(t),m=c.getNode().getImmediateChild(f).updateChild(p,i);f===".priority"?l=h.updatePriority(c.getNode(),m):l=h.updateChild(c.getNode(),f,m,p,_u,null)}const d=du(e,l,c.isFullyInitialized()||H(t),h.filtersNodes()),u=new ma(s,d,r);return yu(n,d,t,s,u,a)}function xo(n,e,t,i,s,r,o){const a=e.eventCache;let c,l;const h=new ma(s,e,r);if(H(t))l=n.filter.updateFullNode(e.eventCache.getNode(),i,o),c=bi(e,l,!0,n.filter.filtersNodes());else{const d=B(t);if(d===".priority")l=n.filter.updatePriority(e.eventCache.getNode(),i),c=bi(e,l,a.isFullyInitialized(),a.isFiltered());else{const u=se(t),f=a.getNode().getImmediateChild(d);let p;if(H(u))p=i;else{const _=h.getCompleteChild(d);_!=null?Zd(u)===".priority"&&_.getChild(tu(u)).isEmpty()?p=_:p=_.updateChild(u,i):p=A.EMPTY_NODE}if(f.equals(p))c=e;else{const _=n.filter.updateChild(a.getNode(),d,p,u,h,o);c=bi(e,_,a.isFullyInitialized(),n.filter.filtersNodes())}}}return c}function cl(n,e){return n.eventCache.isCompleteForChild(e)}function jv(n,e,t,i,s,r,o){let a=e;return i.foreach((c,l)=>{const h=ve(t,c);cl(e,B(h))&&(a=xo(n,a,h,l,s,r,o))}),i.foreach((c,l)=>{const h=ve(t,c);cl(e,B(h))||(a=xo(n,a,h,l,s,r,o))}),a}function ll(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function Ao(n,e,t,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;H(t)?l=i:l=new oe(null).setTree(t,i);const h=e.serverCache.getNode();return l.children.inorderTraversal((d,u)=>{if(h.hasChild(d)){const f=e.serverCache.getNode().getImmediateChild(d),p=ll(n,f,u);c=er(n,c,new ne(d),p,s,r,o,a)}}),l.children.inorderTraversal((d,u)=>{const f=!e.serverCache.isCompleteForChild(d)&&u.value===null;if(!h.hasChild(d)&&!f){const p=e.serverCache.getNode().getImmediateChild(d),_=ll(n,p,u);c=er(n,c,new ne(d),_,s,r,o,a)}}),c}function qv(n,e,t,i,s,r,o){if(Zs(s,t)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(i.value!=null){if(H(t)&&c.isFullyInitialized()||c.isCompleteForPath(t))return er(n,e,t,c.getNode().getChild(t),s,r,a,o);if(H(t)){let l=new oe(null);return c.getNode().forEachChild(Mn,(h,d)=>{l=l.set(new ne(h),d)}),Ao(n,e,t,l,s,r,a,o)}else return e}else{let l=new oe(null);return i.foreach((h,d)=>{const u=ve(t,h);c.isCompleteForPath(u)&&(l=l.set(h,c.getNode().getChild(u)))}),Ao(n,e,t,l,s,r,a,o)}}function Gv(n,e,t,i,s){const r=e.serverCache,o=du(e,r.getNode(),r.isFullyInitialized()||H(t),r.isFiltered());return yu(n,o,t,i,_u,s)}function Yv(n,e,t,i,s,r){let o;if(Zs(i,t)!=null)return e;{const a=new ma(i,e,s),c=e.eventCache.getNode();let l;if(H(t)||B(t)===".priority"){let h;if(e.serverCache.isFullyInitialized())h=Js(i,mn(e));else{const d=e.serverCache.getNode();w(d instanceof A,"serverChildren would be complete if leaf node"),h=pa(i,d)}h=h,l=n.filter.updateFullNode(c,h,r)}else{const h=B(t);let d=ga(i,h,e.serverCache);d==null&&e.serverCache.isCompleteForChild(h)&&(d=c.getImmediateChild(h)),d!=null?l=n.filter.updateChild(c,h,d,se(t),a,r):e.eventCache.getNode().hasChild(h)?l=n.filter.updateChild(c,h,A.EMPTY_NODE,se(t),a,r):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Js(i,mn(e)),o.isLeafNode()&&(l=n.filter.updateFullNode(l,o,r)))}return o=e.serverCache.isFullyInitialized()||Zs(i,G())!=null,bi(e,l,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kv{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new ha(i.getIndex()),r=pv(i);this.processor_=Wv(r);const o=t.serverCache,a=t.eventCache,c=s.updateFullNode(A.EMPTY_NODE,o.getNode(),null),l=r.updateFullNode(A.EMPTY_NODE,a.getNode(),null),h=new Vt(c,o.isFullyInitialized(),s.filtersNodes()),d=new Vt(l,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=wr(d,h),this.eventGenerator_=new wv(this.query_)}get query(){return this.query_}}function Xv(n){return n.viewCache_.serverCache.getNode()}function Qv(n){return Qs(n.viewCache_)}function Jv(n,e){const t=mn(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!H(e)&&!t.getImmediateChild(B(e)).isEmpty())?t.getChild(e):null}function hl(n){return n.eventRegistrations_.length===0}function Zv(n,e){n.eventRegistrations_.push(e)}function dl(n,e,t){const i=[];if(t){w(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function ul(n,e,t,i){e.type===Je.MERGE&&e.source.queryId!==null&&(w(mn(n.viewCache_),"We should always have a full cache before handling merges"),w(Qs(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=zv(n.processor_,s,e,t,i);return $v(n.processor_,r.viewCache),w(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,vu(n,r.changes,r.viewCache.eventCache.getNode(),null)}function eb(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(pe,(r,o)=>{i.push(Bn(r,o))}),t.isFullyInitialized()&&i.push(cu(t.getNode())),vu(n,i,t.getNode(),e)}function vu(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return Ev(n.eventGenerator_,e,t,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tr;class bu{constructor(){this.views=new Map}}function tb(n){w(!tr,"__referenceConstructor has already been defined"),tr=n}function nb(){return w(tr,"Reference.ts has not been loaded"),tr}function ib(n){return n.views.size===0}function _a(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return w(r!=null,"SyncTree gave us an op for an invalid query."),ul(r,e,t,i)}else{let r=[];for(const o of n.views.values())r=r.concat(ul(o,e,t,i));return r}}function wu(n,e,t,i,s){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=Js(t,s?i:null),c=!1;a?c=!0:i instanceof A?(a=pa(t,i),c=!1):(a=A.EMPTY_NODE,c=!1);const l=wr(new Vt(a,c,!1),new Vt(i,s,!1));return new Kv(e,l)}return o}function sb(n,e,t,i,s,r){const o=wu(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),Zv(o,t),eb(o,t)}function rb(n,e,t,i){const s=e._queryIdentifier,r=[];let o=[];const a=jt(n);if(s==="default")for(const[c,l]of n.views.entries())o=o.concat(dl(l,t,i)),hl(l)&&(n.views.delete(c),l.query._queryParams.loadsAllData()||r.push(l.query));else{const c=n.views.get(s);c&&(o=o.concat(dl(c,t,i)),hl(c)&&(n.views.delete(s),c.query._queryParams.loadsAllData()||r.push(c.query)))}return a&&!jt(n)&&r.push(new(nb())(e._repo,e._path)),{removed:r,events:o}}function Eu(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function Ht(n,e){let t=null;for(const i of n.views.values())t=t||Jv(i,e);return t}function Cu(n,e){if(e._queryParams.loadsAllData())return Cr(n);{const i=e._queryIdentifier;return n.views.get(i)}}function Iu(n,e){return Cu(n,e)!=null}function jt(n){return Cr(n)!=null}function Cr(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nr;function ob(n){w(!nr,"__referenceConstructor has already been defined"),nr=n}function ab(){return w(nr,"Reference.ts has not been loaded"),nr}let cb=1;class fl{constructor(e){this.listenProvider_=e,this.syncPointTree_=new oe(null),this.pendingWriteTree_=Fv(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Su(n,e,t,i,s){return Tv(n.pendingWriteTree_,e,t,i,s),s?ns(n,new gn(hu(),e,t)):[]}function an(n,e,t=!1){const i=kv(n.pendingWriteTree_,e);if(xv(n.pendingWriteTree_,e)){let r=new oe(null);return i.snap!=null?r=r.set(G(),!0):We(i.children,o=>{r=r.set(new ne(o),!0)}),ns(n,new Xs(i.path,r,t))}else return[]}function ts(n,e,t){return ns(n,new gn(ua(),e,t))}function lb(n,e,t){const i=oe.fromObject(t);return ns(n,new Ui(ua(),e,i))}function hb(n,e){return ns(n,new Bi(ua(),e))}function db(n,e,t){const i=va(n,t);if(i){const s=ba(i),r=s.path,o=s.queryId,a=De(r,e),c=new Bi(fa(o),a);return wa(n,r,c)}else return[]}function ir(n,e,t,i,s=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||Iu(o,e))){const c=rb(o,e,t,i);ib(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const l=c.removed;if(a=c.events,!s){const h=l.findIndex(u=>u._queryParams.loadsAllData())!==-1,d=n.syncPointTree_.findOnPath(r,(u,f)=>jt(f));if(h&&!d){const u=n.syncPointTree_.subtree(r);if(!u.isEmpty()){const f=pb(u);for(let p=0;p<f.length;++p){const _=f[p],m=_.query,v=Au(n,_);n.listenProvider_.startListening(Ei(m),Hi(n,m),v.hashFn,v.onComplete)}}}!d&&l.length>0&&!i&&(h?n.listenProvider_.stopListening(Ei(e),null):l.forEach(u=>{const f=n.queryToTagMap.get(Ir(u));n.listenProvider_.stopListening(Ei(u),f)}))}gb(n,l)}return a}function Tu(n,e,t,i){const s=va(n,i);if(s!=null){const r=ba(s),o=r.path,a=r.queryId,c=De(o,e),l=new gn(fa(a),c,t);return wa(n,o,l)}else return[]}function ub(n,e,t,i){const s=va(n,i);if(s){const r=ba(s),o=r.path,a=r.queryId,c=De(o,e),l=oe.fromObject(t),h=new Ui(fa(a),c,l);return wa(n,o,h)}else return[]}function Ro(n,e,t,i=!1){const s=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(s,(u,f)=>{const p=De(u,s);r=r||Ht(f,p),o=o||jt(f)});let a=n.syncPointTree_.get(s);a?(o=o||jt(a),r=r||Ht(a,G())):(a=new bu,n.syncPointTree_=n.syncPointTree_.set(s,a));let c;r!=null?c=!0:(c=!1,r=A.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((f,p)=>{const _=Ht(p,G());_&&(r=r.updateImmediateChild(f,_))}));const l=Iu(a,e);if(!l&&!e._queryParams.loadsAllData()){const u=Ir(e);w(!n.queryToTagMap.has(u),"View does not exist, but we have a tag");const f=mb();n.queryToTagMap.set(u,f),n.tagToQueryMap.set(f,u)}const h=Er(n.pendingWriteTree_,s);let d=sb(a,e,t,h,r,c);if(!l&&!o&&!i){const u=Cu(a,e);d=d.concat(_b(n,e,u))}return d}function ya(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const c=De(o,e),l=Ht(a,c);if(l)return l});return pu(s,e,r,t,!0)}function fb(n,e){const t=e._path;let i=null;n.syncPointTree_.foreachOnPath(t,(l,h)=>{const d=De(l,t);i=i||Ht(h,d)});let s=n.syncPointTree_.get(t);s?i=i||Ht(s,G()):(s=new bu,n.syncPointTree_=n.syncPointTree_.set(t,s));const r=i!=null,o=r?new Vt(i,!0,!1):null,a=Er(n.pendingWriteTree_,e._path),c=wu(s,e,a,r?o.getNode():A.EMPTY_NODE,r);return Qv(c)}function ns(n,e){return ku(e,n.syncPointTree_,null,Er(n.pendingWriteTree_,G()))}function ku(n,e,t,i){if(H(n.path))return xu(n,e,t,i);{const s=e.get(G());t==null&&s!=null&&(t=Ht(s,G()));let r=[];const o=B(n.path),a=n.operationForChild(o),c=e.children.get(o);if(c&&a){const l=t?t.getImmediateChild(o):null,h=gu(i,o);r=r.concat(ku(a,c,l,h))}return s&&(r=r.concat(_a(s,n,i,t))),r}}function xu(n,e,t,i){const s=e.get(G());t==null&&s!=null&&(t=Ht(s,G()));let r=[];return e.children.inorderTraversal((o,a)=>{const c=t?t.getImmediateChild(o):null,l=gu(i,o),h=n.operationForChild(o);h&&(r=r.concat(xu(h,a,c,l)))}),s&&(r=r.concat(_a(s,n,i,t))),r}function Au(n,e){const t=e.query,i=Hi(n,t);return{hashFn:()=>(Xv(e)||A.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?db(n,t._path,i):hb(n,t._path);{const r=fy(s,t);return ir(n,t,null,r)}}}}function Hi(n,e){const t=Ir(e);return n.queryToTagMap.get(t)}function Ir(n){return n._path.toString()+"$"+n._queryIdentifier}function va(n,e){return n.tagToQueryMap.get(e)}function ba(n){const e=n.indexOf("$");return w(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new ne(n.substr(0,e))}}function wa(n,e,t){const i=n.syncPointTree_.get(e);w(i,"Missing sync point for query tag that we're tracking");const s=Er(n.pendingWriteTree_,e);return _a(i,t,s,null)}function pb(n){return n.fold((e,t,i)=>{if(t&&jt(t))return[Cr(t)];{let s=[];return t&&(s=Eu(t)),We(i,(r,o)=>{s=s.concat(o)}),s}})}function Ei(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(ab())(n._repo,n._path):n}function gb(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=Ir(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function mb(){return cb++}function _b(n,e,t){const i=e._path,s=Hi(n,e),r=Au(n,t),o=n.listenProvider_.startListening(Ei(e),s,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(i);if(s)w(!jt(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((l,h,d)=>{if(!H(l)&&h&&jt(h))return[Cr(h).query];{let u=[];return h&&(u=u.concat(Eu(h).map(f=>f.query))),We(d,(f,p)=>{u=u.concat(p)}),u}});for(let l=0;l<c.length;++l){const h=c[l];n.listenProvider_.stopListening(Ei(h),Hi(n,h))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ea{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Ea(t)}node(){return this.node_}}class Ca{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=ve(this.path_,e);return new Ca(this.syncTree_,t)}node(){return ya(this.syncTree_,this.path_)}}const yb=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},pl=function(n,e,t){if(!n||typeof n!="object")return n;if(w(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return vb(n[".sv"],e,t);if(typeof n[".sv"]=="object")return bb(n[".sv"],e);w(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},vb=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:w(!1,"Unexpected server value: "+n)}},bb=function(n,e,t){n.hasOwnProperty("increment")||w(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&w(!1,"Unexpected increment value: "+i);const s=e.node();if(w(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},wb=function(n,e,t,i){return Ia(e,new Ca(t,n),i)},Ru=function(n,e,t){return Ia(n,new Ea(e),t)};function Ia(n,e,t){const i=n.getPriority().val(),s=pl(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=pl(o.getValue(),e,t);return a!==o.getValue()||s!==o.getPriority().val()?new Ee(a,Ie(s)):n}else{const o=n;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new Ee(s))),o.forEachChild(pe,(a,c)=>{const l=Ia(c,e.getImmediateChild(a),t);l!==c&&(r=r.updateImmediateChild(a,l))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sa{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function Ta(n,e){let t=e instanceof ne?e:new ne(e),i=n,s=B(t);for(;s!==null;){const r=Nn(i.node.children,s)||{children:{},childCount:0};i=new Sa(s,i,r),t=se(t),s=B(t)}return i}function Kn(n){return n.node.value}function Pu(n,e){n.node.value=e,Po(n)}function Mu(n){return n.node.childCount>0}function Eb(n){return Kn(n)===void 0&&!Mu(n)}function Sr(n,e){We(n.node.children,(t,i)=>{e(new Sa(t,n,i))})}function Du(n,e,t,i){t&&e(n),Sr(n,s=>{Du(s,e,!0)})}function Cb(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function is(n){return new ne(n.parent===null?n.name:is(n.parent)+"/"+n.name)}function Po(n){n.parent!==null&&Ib(n.parent,n.name,n)}function Ib(n,e,t){const i=Eb(t),s=Tt(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,Po(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,Po(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sb=/[\[\].#$\/\u0000-\u001F\u007F]/,Tb=/[\[\].#$\u0000-\u001F\u007F]/,eo=10*1024*1024,Ou=function(n){return typeof n=="string"&&n.length!==0&&!Sb.test(n)},Nu=function(n){return typeof n=="string"&&n.length!==0&&!Tb.test(n)},kb=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Nu(n)},Lu=function(n,e,t,i){i&&e===void 0||ka(jo(n,"value"),e,t)},ka=function(n,e,t){const i=t instanceof ne?new qy(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+sn(i));if(typeof e=="function")throw new Error(n+"contains a function "+sn(i)+" with contents = "+e.toString());if(Md(e))throw new Error(n+"contains "+e.toString()+" "+sn(i));if(typeof e=="string"&&e.length>eo/3&&mr(e)>eo)throw new Error(n+"contains a string greater than "+eo+" utf8 bytes "+sn(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(We(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Ou(o)))throw new Error(n+" contains an invalid key ("+o+") "+sn(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Gy(i,o),ka(n,a,i),Yy(i)}),s&&r)throw new Error(n+' contains ".value" child '+sn(i)+" in addition to actual children.")}},Fu=function(n,e,t,i){if(!Nu(t))throw new Error(jo(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},xb=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Fu(n,e,t)},xa=function(n,e){if(B(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},Ab=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Ou(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!kb(t))throw new Error(jo(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rb{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Aa(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!aa(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function Bu(n,e,t){Aa(n,t),Uu(n,i=>aa(i,e))}function ht(n,e,t){Aa(n,t),Uu(n,i=>Qe(i,e)||Qe(e,i))}function Uu(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(Pb(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function Pb(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();yi&&Re("event: "+t.toString()),Yn(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mb="repo_interrupt",Db=25;class Ob{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Rb,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Ks(),this.transactionQueueTree_=new Sa,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Nb(n,e,t){if(n.stats_=ra(n.repoInfo_),n.forceRestClient_||_y())n.server_=new Ys(n.repoInfo_,(i,s,r,o)=>{gl(n,i,s,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>ml(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{ye(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new wt(n.repoInfo_,e,(i,s,r,o)=>{gl(n,i,s,r,o)},i=>{ml(n,i)},i=>{Lb(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=Ey(n.repoInfo_,()=>new bv(n.stats_,n.server_)),n.infoData_=new gv,n.infoSyncTree_=new fl({startListening:(i,s,r,o)=>{let a=[];const c=n.infoData_.getNode(i._path);return c.isEmpty()||(a=ts(n.infoSyncTree_,i._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Pa(n,"connected",!1),n.serverSyncTree_=new fl({startListening:(i,s,r,o)=>(n.server_.listen(i,r,s,(a,c)=>{const l=o(a,c);ht(n.eventQueue_,i._path,l)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function Hu(n){const t=n.infoData_.getNode(new ne(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function Ra(n){return yb({timestamp:Hu(n)})}function gl(n,e,t,i,s){n.dataUpdateCount++;const r=new ne(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(i){const c=Bs(t,l=>Ie(l));o=ub(n.serverSyncTree_,r,c,s)}else{const c=Ie(t);o=Tu(n.serverSyncTree_,r,c,s)}else if(i){const c=Bs(t,l=>Ie(l));o=lb(n.serverSyncTree_,r,c)}else{const c=Ie(t);o=ts(n.serverSyncTree_,r,c)}let a=r;o.length>0&&(a=kr(n,r)),ht(n.eventQueue_,a,o)}function ml(n,e){Pa(n,"connected",e),e===!1&&Ub(n)}function Lb(n,e){We(e,(t,i)=>{Pa(n,t,i)})}function Pa(n,e,t){const i=new ne("/.info/"+e),s=Ie(t);n.infoData_.updateSnapshot(i,s);const r=ts(n.infoSyncTree_,i,s);ht(n.eventQueue_,i,r)}function Wu(n){return n.nextWriteId_++}function Fb(n,e,t){const i=fb(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(s=>{const r=Ie(s).withIndex(e._queryParams.getIndex());Ro(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=ts(n.serverSyncTree_,e._path,r);else{const a=Hi(n.serverSyncTree_,e);o=Tu(n.serverSyncTree_,e._path,r,a)}return ht(n.eventQueue_,e._path,o),ir(n.serverSyncTree_,e,t,null,!0),r},s=>(Tr(n,"get for query "+ye(e)+" failed: "+s),Promise.reject(new Error(s))))}function Bb(n,e,t,i,s){Tr(n,"set",{path:e.toString(),value:t,priority:i});const r=Ra(n),o=Ie(t,i),a=ya(n.serverSyncTree_,e),c=Ru(o,a,r),l=Wu(n),h=Su(n.serverSyncTree_,e,c,l,!0);Aa(n.eventQueue_,h),n.server_.put(e.toString(),o.val(!0),(u,f)=>{const p=u==="ok";p||He("set at "+e+" failed: "+u);const _=an(n.serverSyncTree_,l,!p);ht(n.eventQueue_,e,_),$b(n,s,u,f)});const d=Gu(n,e);kr(n,d),ht(n.eventQueue_,d,[])}function Ub(n){Tr(n,"onDisconnectEvents");const e=Ra(n),t=Ks();So(n.onDisconnect_,G(),(s,r)=>{const o=wb(s,r,n.serverSyncTree_,e);lu(t,s,o)});let i=[];So(t,G(),(s,r)=>{i=i.concat(ts(n.serverSyncTree_,s,r));const o=Gu(n,s);kr(n,o)}),n.onDisconnect_=Ks(),ht(n.eventQueue_,G(),i)}function Hb(n,e,t){let i;B(e._path)===".info"?i=Ro(n.infoSyncTree_,e,t):i=Ro(n.serverSyncTree_,e,t),Bu(n.eventQueue_,e._path,i)}function $u(n,e,t){let i;B(e._path)===".info"?i=ir(n.infoSyncTree_,e,t):i=ir(n.serverSyncTree_,e,t),Bu(n.eventQueue_,e._path,i)}function Wb(n){n.persistentConnection_&&n.persistentConnection_.interrupt(Mb)}function Tr(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),Re(t,...e)}function $b(n,e,t,i){e&&Yn(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function zu(n,e,t){return ya(n.serverSyncTree_,e,t)||A.EMPTY_NODE}function Ma(n,e=n.transactionQueueTree_){if(e||xr(n,e),Kn(e)){const t=ju(n,e);w(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&zb(n,is(e),t)}else Mu(e)&&Sr(e,t=>{Ma(n,t)})}function zb(n,e,t){const i=t.map(l=>l.currentWriteId),s=zu(n,e,i);let r=s;const o=s.hash();for(let l=0;l<t.length;l++){const h=t[l];w(h.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),h.status=1,h.retryCount++;const d=De(e,h.path);r=r.updateChild(d,h.currentOutputSnapshotRaw)}const a=r.val(!0),c=e;n.server_.put(c.toString(),a,l=>{Tr(n,"transaction put response",{path:c.toString(),status:l});let h=[];if(l==="ok"){const d=[];for(let u=0;u<t.length;u++)t[u].status=2,h=h.concat(an(n.serverSyncTree_,t[u].currentWriteId)),t[u].onComplete&&d.push(()=>t[u].onComplete(null,!0,t[u].currentOutputSnapshotResolved)),t[u].unwatcher();xr(n,Ta(n.transactionQueueTree_,e)),Ma(n,n.transactionQueueTree_),ht(n.eventQueue_,e,h);for(let u=0;u<d.length;u++)Yn(d[u])}else{if(l==="datastale")for(let d=0;d<t.length;d++)t[d].status===3?t[d].status=4:t[d].status=0;else{He("transaction at "+c.toString()+" failed: "+l);for(let d=0;d<t.length;d++)t[d].status=4,t[d].abortReason=l}kr(n,e)}},o)}function kr(n,e){const t=Vu(n,e),i=is(t),s=ju(n,t);return Vb(n,s,i),i}function Vb(n,e,t){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],l=De(t,c.path);let h=!1,d;if(w(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)h=!0,d=c.abortReason,s=s.concat(an(n.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=Db)h=!0,d="maxretry",s=s.concat(an(n.serverSyncTree_,c.currentWriteId,!0));else{const u=zu(n,c.path,o);c.currentInputSnapshot=u;const f=e[a].update(u.val());if(f!==void 0){ka("transaction failed: Data returned ",f,c.path);let p=Ie(f);typeof f=="object"&&f!=null&&Tt(f,".priority")||(p=p.updatePriority(u.getPriority()));const m=c.currentWriteId,v=Ra(n),b=Ru(p,u,v);c.currentOutputSnapshotRaw=p,c.currentOutputSnapshotResolved=b,c.currentWriteId=Wu(n),o.splice(o.indexOf(m),1),s=s.concat(Su(n.serverSyncTree_,c.path,b,c.currentWriteId,c.applyLocally)),s=s.concat(an(n.serverSyncTree_,m,!0))}else h=!0,d="nodata",s=s.concat(an(n.serverSyncTree_,c.currentWriteId,!0))}ht(n.eventQueue_,t,s),s=[],h&&(e[a].status=2,function(u){setTimeout(u,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(d),!1,null))))}xr(n,n.transactionQueueTree_);for(let a=0;a<i.length;a++)Yn(i[a]);Ma(n,n.transactionQueueTree_)}function Vu(n,e){let t,i=n.transactionQueueTree_;for(t=B(e);t!==null&&Kn(i)===void 0;)i=Ta(i,t),e=se(e),t=B(e);return i}function ju(n,e){const t=[];return qu(n,e,t),t.sort((i,s)=>i.order-s.order),t}function qu(n,e,t){const i=Kn(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);Sr(e,s=>{qu(n,s,t)})}function xr(n,e){const t=Kn(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,Pu(e,t.length>0?t:void 0)}Sr(e,i=>{xr(n,i)})}function Gu(n,e){const t=is(Vu(n,e)),i=Ta(n.transactionQueueTree_,e);return Cb(i,s=>{to(n,s)}),to(n,i),Du(i,s=>{to(n,s)}),t}function to(n,e){const t=Kn(e);if(t){const i=[];let s=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(w(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(w(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(an(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Pu(e,void 0):t.length=r+1,ht(n.eventQueue_,is(e),s);for(let o=0;o<i.length;o++)Yn(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jb(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function qb(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):He(`Invalid query segment '${t}' in query '${n}'`)}return e}const _l=function(n,e){const t=Gb(n),i=t.namespace;t.domain==="firebase.com"&&It(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&It("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||cy();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Vd(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new ne(t.pathString)}},Gb=function(n){let e="",t="",i="",s="",r="",o=!0,a="https",c=443;if(typeof n=="string"){let l=n.indexOf("//");l>=0&&(a=n.substring(0,l-1),n=n.substring(l+2));let h=n.indexOf("/");h===-1&&(h=n.length);let d=n.indexOf("?");d===-1&&(d=n.length),e=n.substring(0,Math.min(h,d)),h<d&&(s=jb(n.substring(h,d)));const u=qb(n.substring(Math.min(n.length,d)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;const f=e.slice(0,l);if(f.toLowerCase()==="localhost")t="localhost";else if(f.split(".").length<=2)t=f;else{const p=e.indexOf(".");i=e.substring(0,p).toLowerCase(),t=e.substring(p+1),r=i}"ns"in u&&(r=u.ns)}return{host:e,port:c,domain:t,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yl="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",Yb=function(){let n=0;const e=[];return function(t){const i=t===n;n=t;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=yl.charAt(t%64),t=Math.floor(t/64);w(t===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=yl.charAt(e[s]);return w(o.length===20,"nextPushId: Length should be 20."),o}}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kb{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+ye(this.snapshot.exportVal())}}class Xb{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Da{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return w(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oa{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return H(this._path)?null:Zd(this._path)}get ref(){return new kt(this._repo,this._path)}get _queryIdentifier(){const e=nl(this._queryParams),t=ia(e);return t==="{}"?"default":t}get _queryObject(){return nl(this._queryParams)}isEqual(e){if(e=Me(e),!(e instanceof Oa))return!1;const t=this._repo===e._repo,i=aa(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+jy(this._path)}}class kt extends Oa{constructor(e,t){super(e,t,new da,!1)}get parent(){const e=tu(this._path);return e===null?null:new kt(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Wi{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new ne(e),i=$i(this.ref,e);return new Wi(this._node.getChild(t),i,pe)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new Wi(s,$i(this.ref,i),pe)))}hasChild(e){const t=new ne(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function N(n,e){return n=Me(n),n._checkNotDeleted("ref"),e!==void 0?$i(n._root,e):n._root}function $i(n,e){return n=Me(n),B(n._path)===null?xb("child","path",e):Fu("child","path",e),new kt(n._repo,ve(n._path,e))}function Qb(n,e){n=Me(n),xa("push",n._path),Lu("push",e,n._path,!0);const t=Hu(n._repo),i=Yb(t),s=$i(n,i),r=$i(n,i);let o;return e!=null?o=xe(r,e).then(()=>r):o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function lt(n){return xa("remove",n._path),xe(n,null)}function xe(n,e){n=Me(n),xa("set",n._path),Lu("set",e,n._path,!1);const t=new gr;return Bb(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function Xn(n){n=Me(n);const e=new Da(()=>{}),t=new ss(e);return Fb(n._repo,n,t).then(i=>new Wi(i,new kt(n._repo,n._path),n._queryParams.getIndex()))}class ss{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new Kb("value",this,new Wi(e.snapshotNode,new kt(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Xb(this,e,t):null}matches(e){return e instanceof ss?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function Jb(n,e,t,i,s){const r=new Da(t,void 0),o=new ss(r);return Hb(n._repo,n,o),()=>$u(n._repo,n,o)}function Wt(n,e,t,i){return Jb(n,"value",e)}function Zb(n,e,t){let i=null;const s=t?new Da(t):null;i=new ss(s),$u(n._repo,n,i)}tb(kt);ob(kt);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ew="FIREBASE_DATABASE_EMULATOR_HOST",Mo={};let tw=!1;function nw(n,e,t,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=zn(r);n.repoInfo_=new Vd(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),i&&(n.authTokenProvider_=i)}function iw(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||It("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Re("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=_l(r,s),a=o.repoInfo,c;typeof process<"u"&&Bc&&(c=Bc[ew]),c?(r=`http://${c}?ns=${a.namespace}`,o=_l(r,s),a=o.repoInfo):o.repoInfo.secure;const l=new vy(n.name,n.options,e);Ab("Invalid Firebase Database URL",o),H(o.path)||It("Database URL must point to the root of a Firebase Database (not including a child path).");const h=rw(a,n,l,new yy(n,t));return new ow(h,n)}function sw(n,e){const t=Mo[e];(!t||t[n.key]!==n)&&It(`Database ${e}(${n.repoInfo_}) has already been deleted.`),Wb(n),delete t[n.key]}function rw(n,e,t,i){let s=Mo[e.name];s||(s={},Mo[e.name]=s);let r=s[n.toURLString()];return r&&It("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new Ob(n,tw,t,i),s[n.toURLString()]=r,r}class ow{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Nb(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new kt(this._repo,G())),this._rootInternal}_delete(){return this._rootInternal!==null&&(sw(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&It("Cannot call "+e+" on a deleted database.")}}function aw(n=qh(),e){const t=Yo(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=dp("database");i&&cw(t,...i)}return t}function cw(n,e,t,i={}){n=Me(n),n._checkNotDeleted("useEmulator");const s=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(s===n._repoInternal.repoInfo_.host&&hn(i,r.repoInfo_.emulatorOptions))return;It("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&It('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Ps(Ps.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:up(i.mockUserToken,n.app.options.projectId);o=new Ps(a)}zn(e)&&(Uh(e),Hh("Database",!0)),nw(r,s,i,o)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lw(n){ny(jn),Ln(new dn("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return iw(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),Bt(Uc,Hc,n),Bt(Uc,Hc,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hw={".sv":"timestamp"};function _n(){return hw}wt.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};wt.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};lw();const dw={apiKey:"AIzaSyCuOjiHa8C0jgAte40E774CRJROTWTUdmg",authDomain:"hsg-party-tracker.firebaseapp.com",databaseURL:"https://hsg-party-tracker-default-rtdb.europe-west1.firebasedatabase.app",projectId:"hsg-party-tracker",storageBucket:"hsg-party-tracker.firebasestorage.app",messagingSenderId:"1047483086606",appId:"1:1047483086606:web:a02d77baacd21166fb095f",measurementId:"G-VFS4W30Z7P"};let us=null,Do=null,Oo=null,vl=!1;function uw(){if(vl)return console.log("Firebase already initialized"),!0;try{return gc().length?us=gc()[0]:us=jh(dw),Do=ey(us),Oo=aw(us),vl=!0,console.log("✅ Firebase initialized successfully"),!0}catch(n){return console.error("❌ Firebase initialization error:",n),typeof window<"u"&&window.showNotification&&window.showNotification("Failed to connect to Firebase","error"),!1}}function Na(){return Do||(console.error("Firebase Auth not initialized. Call initializeFirebase() first."),null)}function J(){return Oo||(console.error("Firebase Database not initialized. Call initializeFirebase() first."),null)}const Ms=(n,e)=>{const t=J();return t?typeof n=="string"?N(t,n):e!==void 0?N(n,e):N(t,n):null},bl=(n,e)=>n?xe(n,e):Promise.reject("No ref provided"),Yu=n=>n?Xn(n):Promise.reject("No ref provided"),rs={currentUser:null,userData:{},partyData:{},partyStartTime:Date.now(),deviceData:{},friendsData:{},friendRequests:[],currentGame:null,gameScores:{team1:0,team2:0},achievements:{firstTimer:!0,responsible:!1,gameMaster:!1,partyAnimal:!1,guardianAngel:!1,hydroHomie:!1,danceMachine:!1,sunriseWarrior:!1},userAchievements:{},locationHistory:[],drinkHistory:[],chartVisible:!0,isSignUp:!1,isInitialized:!1};function L(){return rs}function dt(n){return rs[n]}function Se(n,e){rs[n]=e}function wl(n){rs.currentUser=n}function le(){return rs.currentUser}const Cn={NETWORK:"network",AUTH:"auth",DATABASE:"database",VALIDATION:"validation",UNKNOWN:"unknown"},fs={"network/offline":"You appear to be offline. Please check your internet connection.","network/timeout":"The request took too long. Please try again.","network/server-error":"Server is having issues. Please try again later.","auth/invalid-email":"Please enter a valid email address.","auth/user-disabled":"This account has been disabled.","auth/user-not-found":"No account found with this email.","auth/wrong-password":"Incorrect password. Please try again.","auth/email-already-in-use":"An account already exists with this email.","auth/weak-password":"Password should be at least 6 characters.","auth/invalid-credential":"Invalid login credentials. Please try again.","auth/too-many-requests":"Too many failed attempts. Please try again later.","auth/network-request-failed":"Network error. Please check your connection.","database/permission-denied":"You don't have permission to perform this action.","database/disconnected":"Lost connection to database. Reconnecting...","database/write-failed":"Failed to save data. Please try again.",unknown:"Something went wrong. Please try again."};function La(n,e=""){console.error(`Error in ${e}:`,n);const t=fw(n),i=pw(n),s=gw(i,n);return mw(s),{type:t,code:i,message:s,originalError:n}}function fw(n){return n?n.code==="network-request-failed"||n.message?.includes("network")||n.message?.includes("fetch")?Cn.NETWORK:n.code?.startsWith("auth/")?Cn.AUTH:n.code?.startsWith("database/")||n.code==="permission-denied"?Cn.DATABASE:n.name==="ValidationError"?Cn.VALIDATION:Cn.UNKNOWN:Cn.UNKNOWN}function pw(n){return n?.code?n.code:n?.message?.includes("network")?"network/offline":n?.message?.includes("permission")?"database/permission-denied":"unknown"}function gw(n,e){if(fs[n])return fs[n];if(e?.message&&typeof e.message=="string"){const t=e.message.replace(/Firebase: /g,"").replace(/Error \(auth\/[^)]+\): /g,"").replace(/\.$/,"");return t.includes("(")||t.includes(")")||t.length>100?fs.unknown:t}return fs.unknown}function mw(n,e){window.showNotification?window.showNotification(n,"error"):alert(`Error: ${n}`)}window.addEventListener("online",()=>{window.showNotification&&window.showNotification("Back online!","success")});window.addEventListener("offline",()=>{window.showNotification&&window.showNotification("You are offline. Some features may not work.","warning")});function _w(n,e,t){const i=[];switch(e){case"email":n?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n)||i.push("Please enter a valid email address"):i.push(`${t} is required`);break;case"password":n?n.length<6&&i.push("Password must be at least 6 characters"):i.push(`${t} is required`);break;case"username":n?n.length<3?i.push("Username must be at least 3 characters"):/^[a-zA-Z0-9_]+$/.test(n)||i.push("Username can only contain letters, numbers, and underscores"):i.push(`${t} is required`);break;case"deviceId":n?n.match(/^HSG_[a-zA-Z0-9]+$/)||i.push("Device ID must start with HSG_ followed by letters/numbers"):i.push(`${t} is required`);break}return i}let Ds=!1;function yw(){document.getElementById("authContainer").style.display="flex",document.getElementById("userProfile").style.display="none",document.querySelector(".container").style.display="none"}function vw(){document.getElementById("authContainer").style.display="none",document.getElementById("userProfile").style.display="block",document.querySelector(".container").style.display="block"}function ni(n){const e=document.getElementById("authError");e.textContent=n,e.classList.add("show"),hi(),setTimeout(()=>{e.classList.remove("show")},5e3)}function bw(){document.getElementById("authLoading").classList.add("show"),document.getElementById("authSubmitBtn").disabled=!0}function hi(){document.getElementById("authLoading").classList.remove("show"),document.getElementById("authSubmitBtn").disabled=!1}function ww(){Ds=!Ds,Ds?(document.getElementById("authTitle").textContent="Create Your Account",document.getElementById("authButton").textContent="Sign Up",document.getElementById("usernameGroup").style.display="block",document.getElementById("authToggleText").textContent="Already have an account?",document.getElementById("authToggleLink").textContent="Login"):(document.getElementById("authTitle").textContent="Welcome Back",document.getElementById("authButton").textContent="Login",document.getElementById("usernameGroup").style.display="none",document.getElementById("authToggleText").textContent="Don't have an account?",document.getElementById("authToggleLink").textContent="Sign up")}async function Ew(n){n.preventDefault();const e=document.getElementById("authEmail").value.trim(),t=document.getElementById("authPassword").value,i=document.getElementById("authUsername").value.trim();if(!e||!t){ni("Please fill in all fields");return}if(t.length<6){ni("Password must be at least 6 characters");return}bw();try{const s=Na(),r=J();if(!Ds)await Um(s,e,t),sr("✅ Welcome back!","success");else{if(!i||i.length<3){ni("Username must be at least 3 characters"),hi();return}if((await Yu(Ms(r,"usernames/"+i.toLowerCase()))).exists()){ni("Username already taken"),hi();return}const c=(await Bm(s,e,t)).user;await bl(Ms(r,"users/"+c.uid),{username:i,email:e,createdAt:new Date().toISOString(),devices:{},friends:{},achievements:{},settings:{notifications:!0,shareLocation:!1,publicProfile:!0}}),await bl(Ms(r,"usernames/"+i.toLowerCase()),c.uid),sr("✅ Account created successfully!","success")}hi()}catch(s){hi();const r=La(s,"Authentication");ni(r.message)}}async function Cw(){try{const n=Na();await zm(n),sr("👋 Signed out successfully"),location.reload()}catch(n){const e=La(n,"Sign Out");sr(e.message,"error")}}function Iw(n){const e=Na();$m(e,t=>{t?(wl(t),n(t)):(wl(null),yw())})}async function Sw(n){try{const e=J(),i=(await Yu(Ms(e,"users/"+n.uid))).val()||{},s=i.username||n.email.split("@")[0];document.getElementById("profileName").textContent=s,document.getElementById("profileEmail").textContent=n.email,document.getElementById("settingsUsername").textContent=s,document.getElementById("settingsEmail").textContent=n.email,document.getElementById("username").value=i.username||"",document.getElementById("emailDisplay").value=n.email,document.getElementById("linkedEmail").textContent=n.email;const r=s.charAt(0).toUpperCase();return document.getElementById("profileInitial").textContent=r,Se("userData",i),i}catch(e){throw console.error("Error loading user data:",e),e}}function sr(n,e="success"){const t=document.createElement("div");t.className=`notification ${e}`,t.textContent=n,t.onclick=()=>t.remove(),document.body.appendChild(t),setTimeout(()=>{t.parentNode&&t.remove()},4e3)}function C(n,e="success"){const t=document.createElement("div");t.className=`notification ${e}`,t.textContent=n,t.onclick=()=>t.remove(),document.body.appendChild(t),setTimeout(()=>{t.parentNode&&t.remove()},4e3)}window.showNotification=C;const Ci={};function Tw(){const n=le();if(!n)return;const e=J();Wt(N(e,"users/"+n.uid+"/devices"),t=>{const i=t.val()||{};Se("deviceData",i),Aw(),document.getElementById("deviceCount").textContent=Object.keys(i).length,Object.keys(i).forEach(s=>{kw(s)})})}async function Ku(){const n=document.getElementById("deviceIdInput").value.trim().toUpperCase(),e=_w(n,"deviceId","Device ID");if(e.length>0){C(e[0],"error");return}try{const t=J(),i=le();if(!(await Xn(N(t,"readings/"+n))).exists()){C("❌ Device not found. Make sure it's connected.","error");return}if(dt("deviceData")[n]){C("ℹ️ Device already paired");return}await xe(N(t,"users/"+i.uid+"/devices/"+n),{pairedAt:_n(),name:"My Breathalyzer"}),document.getElementById("deviceIdInput").value="",C("✅ Device paired successfully!","success")}catch(t){const i=La(t,"Device Pairing");C(i.message,"error")}}function kw(n){if(Ci[n])return;const e=J(),t=Wt(N(e,"readings/"+n),i=>{const s=i.val();s&&xw(n,s)});Ci[n]=t}function xw(n,e){let t=dt("partyData")||{};t[n]||(t[n]={name:dt("userData").username||"You",bac:0,lastUpdate:Date.now(),location:"Party",trend:"steady",history:[],isOwn:!0});const i=t[n].bac;t[n].bac=e.bac||0,t[n].lastUpdate=Date.now(),t[n].trend=e.bac>i?"up":e.bac<i?"down":"steady",t[n].history.push({time:Date.now(),value:e.bac}),t[n].history.length>50&&t[n].history.shift(),Se("partyData",t),window.updateUI&&window.updateUI(),e.bac>=.08&&C(`⚠️ Your BAC is too high: ${e.bac.toFixed(3)}‰`,"error")}function Aw(){const n=document.getElementById("deviceList");if(!n)return;const e=dt("deviceData")||{};if(n.innerHTML="",Object.keys(e).length===0){n.innerHTML='<p style="text-align: center; opacity: 0.7;">No devices paired yet</p>';return}const t=dt("partyData")||{};Object.entries(e).forEach(([i,s])=>{const r=t[i],o=document.createElement("div");o.className="device-item",o.innerHTML=`
            <div class="device-info">
                <h4>${s.name||"Breathalyzer"}</h4>
                <p>ID: ${i}</p>
                <p>Last Reading: ${r?r.bac.toFixed(3)+"‰":"No data"}</p>
            </div>
            <div>
                <button class="btn" onclick="renameDevice('${i}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger" onclick="unpairDevice('${i}')">
                    <i class="fas fa-unlink"></i>
                </button>
            </div>
        `,n.appendChild(o)})}async function Xu(n){if(confirm("Unpair this device?")){const e=J(),t=le();if(await lt(N(e,"users/"+t.uid+"/devices/"+n)),Ci[n]){const i=J();Zb(N(i,"readings/"+n),"value",Ci[n]),delete Ci[n]}C("🔓 Device unpaired")}}async function Qu(n){const e=dt("deviceData"),t=prompt("Enter new name for device:",e[n]?.name||"My Breathalyzer");if(t){const i=J(),s=le();await xe(N(i,"users/"+s.uid+"/devices/"+n+"/name"),t),C("✏️ Device renamed")}}window.pairDeviceById=Ku;window.unpairDevice=Xu;window.renameDevice=Qu;const Dn={beer:{amount:330,alcohol:5,emoji:"🍺"},wine:{amount:150,alcohol:12,emoji:"🍷"},shot:{amount:40,alcohol:40,emoji:"🥃"},cocktail:{amount:200,alcohol:15,emoji:"🍸"},mixed:{amount:250,alcohol:10,emoji:"🥤"},champagne:{amount:150,alcohol:12,emoji:"🥂"},water:{amount:250,alcohol:0,emoji:"💧"},other:{amount:200,alcohol:5,emoji:"🍹"}},Jt={SOBER:{max:.02,class:"bac-safe",text:"Sober",emoji:"😊"},BUZZED:{max:.05,class:"bac-caution",text:"Buzzed",emoji:"😎"},IMPAIRED:{max:.08,class:"bac-danger",text:"No Driving!",emoji:"🚫"},DRUNK:{max:1/0,class:"bac-critical",text:"Too Much!",emoji:"🤢"}};function Rw(n){return n<Jt.SOBER.max?Jt.SOBER:n<Jt.BUZZED.max?Jt.BUZZED:n<Jt.IMPAIRED.max?Jt.IMPAIRED:Jt.DRUNK}function Ar(){try{Pw(),Mw(),Dw(),Ow(),Nw()}catch(n){console.error("UI update failed:",n)}}function Pw(){const n=document.getElementById("friendsGrid");if(!n)return;const e=dt("partyData")||{};n.innerHTML="",Object.entries(e).forEach(([t,i])=>{const s=Rw(i.bac),r=Fw(i.lastUpdate),o=document.createElement("div");o.className="card friend-card",o.onclick=()=>Lw(i);const a=i.trend==="up"?"📈":i.trend==="down"?"📉":"➡️",c=i.trend==="up"?"trend-up":i.trend==="down"?"trend-down":"",l=i.isOwn?"👤":i.permission==="guardian"?"🛡️":"👥";o.innerHTML=`
            <div class="friend-avatar">${l}</div>
            <div class="friend-name">${i.name}</div>
            <div class="bac-value ${s.class}">
                ${i.bac.toFixed(3)}‰
                <span class="bac-trend ${c}">${a}</span>
            </div>
            <div class="friend-status">
                <span class="status-badge">${s.emoji} ${s.text}</span>
            </div>
            <div class="location-tag">
                <i class="fas fa-map-marker-alt"></i> ${i.location}
            </div>
            <div class="last-update" style="margin-top: 10px; opacity: 0.7; font-size: 0.9em;">
                Updated ${r}
            </div>
        `,i.bac>=.08&&o.classList.add("pulse"),n.appendChild(o)})}function Mw(){const n=dt("partyData")||{},e=Object.values(n),t=e.reduce((c,l)=>c+l.bac,0)/e.length||0,i=document.getElementById("partyAverage");i&&(i.textContent=t.toFixed(3)+"‰");const s=e.filter(c=>c.bac<.02).length,r=document.getElementById("safeFriends");r&&(r.textContent=s);const o=15-Date.now()%(900*1e3)/6e4,a=document.getElementById("hydrationTime");a&&(a.textContent=Math.floor(o)+"m")}function Dw(){const n=document.getElementById("leaderboardList");if(!n)return;const e=dt("partyData")||{};n.innerHTML="",Object.values(e).sort((i,s)=>i.bac-s.bac).slice(0,5).forEach((i,s)=>{const r=document.createElement("div");r.className="leaderboard-item",r.onclick=()=>{window.confetti&&confetti({particleCount:100,spread:70,origin:{y:.6}}),window.showNotification(`${i.name} is winning! 🏆`)},r.innerHTML=`
            <span class="rank rank-${s+1}">#${s+1}</span>
            <span>${i.name}</span>
            <span>${i.bac.toFixed(3)}‰</span>
        `,n.appendChild(r)})}function Ow(){const n=document.getElementById("visualizer");if(n){if(n.children.length===0)for(let e=0;e<20;e++){const t=document.createElement("div");t.className="bar",n.appendChild(t)}n.querySelectorAll(".bar").forEach(e=>{const t=Math.random()*150+20;e.style.height=t+"px"})}}function Nw(){const n=dt("partyData")||{},e=Object.values(n).filter(t=>t.bac>=.08);if(e.length>0){const t=document.getElementById("alertBanner"),i=document.getElementById("alertText");if(t&&i){const s=e.map(r=>r.name).join(", ");i.textContent=`⚠️ ${s} need${e.length>1?"":"s"} attention! BAC too high!`,t.classList.contains("show")||t.classList.add("show")}}else{const t=document.getElementById("alertBanner");t&&t.classList.remove("show")}}function Lw(n){console.log("Show friend details:",n)}function Fw(n){const e=Math.floor((Date.now()-n)/1e3);return e<60?"just now":e<3600?`${Math.floor(e/60)}m ago`:`${Math.floor(e/3600)}h ago`}window.updateUI=Ar;let di,No=!1;(window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0)&&(No=!0);async function El(){if("serviceWorker"in navigator)try{const n=await navigator.serviceWorker.register("./service-worker.js");return console.log("ServiceWorker registered:",n),n.addEventListener("updatefound",()=>{const e=n.installing;e.addEventListener("statechange",()=>{e.state==="installed"&&navigator.serviceWorker.controller&&C("New version available! Refresh to update.","info")})}),n}catch(n){return console.error("ServiceWorker registration failed:",n),null}}function Cl(){window.addEventListener("beforeinstallprompt",n=>{n.preventDefault(),di=n,No||Bw()}),window.addEventListener("appinstalled",()=>{console.log("PWA was installed"),No=!0,Uw(),C("App installed successfully!","success")})}function Bw(){let n=document.getElementById("installButton");if(!n){n=document.createElement("button"),n.id="installButton",n.className="btn btn-primary install-button",n.innerHTML='<i class="fas fa-download"></i> Install App',n.onclick=Hw;const e=document.querySelector(".action-buttons");e&&e.appendChild(n)}n.style.display="inline-block"}function Uw(){const n=document.getElementById("installButton");n&&(n.style.display="none")}async function Hw(){if(!di){C("App is already installed or not available for installation","info");return}di.prompt();const{outcome:n}=await di.userChoice;console.log(`User response to install prompt: ${n}`),console.log(n==="accepted"?"User accepted the install prompt":"User dismissed the install prompt"),di=null}function Il(){const n=indexedDB.open("BoozeLensDB",1);n.onerror=()=>{console.error("Failed to open IndexedDB")},n.onsuccess=e=>{e.target.result,console.log("IndexedDB opened successfully")},n.onupgradeneeded=e=>{const t=e.target.result;if(!t.objectStoreNames.contains("drinks")){const i=t.createObjectStore("drinks",{keyPath:"id",autoIncrement:!0});i.createIndex("timestamp","timestamp",{unique:!1}),i.createIndex("synced","synced",{unique:!1})}if(!t.objectStoreNames.contains("readings")){const i=t.createObjectStore("readings",{keyPath:"id",autoIncrement:!0});i.createIndex("timestamp","timestamp",{unique:!1}),i.createIndex("synced","synced",{unique:!1})}}}window.addEventListener("online",()=>{C("Back online! Syncing data...","success"),"serviceWorker"in navigator&&navigator.serviceWorker.controller&&navigator.serviceWorker.ready.then(n=>{"sync"in n&&n.sync.register("sync-all")})});window.addEventListener("offline",()=>{C("You are offline. Data will be saved locally.","warning")});async function Ju(){const n=document.getElementById("friendSearchInput").value.trim().toLowerCase();if(!n||n.length<3){C("❌ Please enter at least 3 characters","error");return}const e=document.getElementById("searchResults");e.innerHTML="<p>Searching...</p>";try{const t=J(),i=le(),r=(await Xn(N(t,"users"))).val()||{},o=[];if(Object.entries(r).forEach(([a,c])=>{a!==i.uid&&c.settings?.publicProfile!==!1&&(c.username?.toLowerCase().includes(n)||c.email?.toLowerCase().includes(n))&&o.push({uid:a,...c})}),o.length===0)e.innerHTML='<p style="text-align: center; opacity: 0.7;">No users found</p>';else{const a=L().friendsData||{};e.innerHTML="<h4>Search Results:</h4>"+o.map(c=>`
                <div class="friend-item">
                    <div class="friend-info">
                        <div class="friend-avatar-small">
                            ${(c.username||c.email).charAt(0).toUpperCase()}
                        </div>
                        <div class="friend-details">
                            <h4>${c.username||"User"}</h4>
                            <p>${c.email||"Phone user"}</p>
                        </div>
                    </div>
                    <div class="friend-actions">
                        ${a[c.uid]?'<span style="color: #00ff88;">✓ Friends</span>':`<button class="btn btn-primary" onclick="sendFriendRequest('${c.uid}')">
                                <i class="fas fa-user-plus"></i> Add Friend
                            </button>`}
                    </div>
                </div>
            `).join("")}}catch(t){console.error("Search error:",t),e.innerHTML='<p style="color: #ff4444;">Search failed. Try again.</p>'}}async function Ww(n){try{const e=J(),t=le(),i=L().userData;if(L().friendsData[n]){C("ℹ️ Already friends");return}await xe(N(e,"friendRequests/"+n+"/"+t.uid),{from:i.username||t.email,timestamp:_n()}),C("📤 Friend request sent!","success"),Ju()}catch(e){console.error("Friend request error:",e),C("❌ Failed to send request","error")}}function Zu(){const n=document.getElementById("friendRequests"),e=L().friendRequests||[];if(e.length===0){n.innerHTML='<p style="opacity: 0.7;">No pending requests</p>';return}n.innerHTML=e.map(t=>`
        <div class="friend-request">
            <div>
                <strong>${t.from}</strong>
                <small style="opacity: 0.7; margin-left: 10px;">
                    ${a0(t.timestamp)}
                </small>
            </div>
            <div>
                <button class="btn" onclick="acceptFriendRequest('${t.id}')">
                    <i class="fas fa-check"></i> Accept
                </button>
                <button class="btn btn-danger" onclick="declineFriendRequest('${t.id}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `).join("")}async function $w(n){try{const e=await zw();if(!e)return;const t=J(),i=le();await xe(N(t,"users/"+i.uid+"/friends/"+n),{permission:e,addedAt:_n()}),await xe(N(t,"users/"+n+"/friends/"+i.uid),{permission:e,addedAt:_n()}),await lt(N(t,"friendRequests/"+i.uid+"/"+n)),C("✅ Friend added!","success")}catch(e){console.error("Accept friend error:",e),C("❌ Failed to accept request","error")}}async function zw(){return new Promise(n=>{const e=`
            <h2>Set Friend Permissions</h2>
            <p>Choose what this friend can see:</p>
            <div style="margin: 20px 0;">
                <div class="friend-item" style="cursor: pointer; margin: 10px 0;" onclick="resolvePermission('observer')">
                    <div>
                        <h4>👀 Observer</h4>
                        <p>Can see if you're at a party (no BAC data)</p>
                    </div>
                </div>
                <div class="friend-item" style="cursor: pointer; margin: 10px 0;" onclick="resolvePermission('buddy')">
                    <div>
                        <h4>🤝 Buddy</h4>
                        <p>Can see your BAC and get notifications</p>
                    </div>
                </div>
                <div class="friend-item" style="cursor: pointer; margin: 10px 0;" onclick="resolvePermission('guardian')">
                    <div>
                        <h4>🛡️ Guardian</h4>
                        <p>Full access including emergency info</p>
                    </div>
                </div>
            </div>
            <button class="btn" onclick="resolvePermission(null)">Cancel</button>
        `;document.getElementById("modalBody").innerHTML=e,document.getElementById("modal").classList.add("show"),window.resolvePermission=t=>{window.closeModal(),n(t)}})}async function Vw(n){const e=J(),t=le();await lt(N(e,"friendRequests/"+t.uid+"/"+n)),C("❌ Request declined")}function Fa(){const n=document.getElementById("friendsList");if(!n)return;const e=L().friendsData||{};if(n.innerHTML="",Object.keys(e).length===0){n.innerHTML='<p style="text-align: center; opacity: 0.7;">No friends added yet</p>';return}Object.entries(e).forEach(async([t,i])=>{const s=J(),o=(await Xn(N(s,"users/"+t))).val();if(o){const a=document.createElement("div");a.className="friend-item",a.innerHTML=`
                <div class="friend-info">
                    <div class="friend-avatar-small">
                        ${(o.username||o.email||"U").charAt(0).toUpperCase()}
                    </div>
                    <div class="friend-details">
                        <h4>${o.username||"Friend"}</h4>
                        <p>${o.email||"Phone user"}</p>
                    </div>
                </div>
                <div class="friend-actions">
                    <select class="permission-select" onchange="updateFriendPermission('${t}', this.value)">
                        <option value="observer" ${i.permission==="observer"?"selected":""}>Observer</option>
                        <option value="buddy" ${i.permission==="buddy"?"selected":""}>Buddy</option>
                        <option value="guardian" ${i.permission==="guardian"?"selected":""}>Guardian</option>
                    </select>
                    <button class="btn btn-danger" onclick="removeFriend('${t}')">
                        <i class="fas fa-user-minus"></i>
                    </button>
                </div>
            `,n.appendChild(a)}})}async function jw(n,e){try{const t=J(),i=le();await xe(N(t,"users/"+i.uid+"/friends/"+n+"/permission"),e),await xe(N(t,"users/"+n+"/friends/"+i.uid+"/permission"),e),C("✅ Permission updated","success")}catch(t){console.error("Update permission error:",t),C("❌ Failed to update permission","error")}}async function qw(n){if(confirm("Remove this friend?")){const e=J(),t=le();await lt(N(e,"users/"+t.uid+"/friends/"+n)),await lt(N(e,"users/"+n+"/friends/"+t.uid)),C("👋 Friend removed")}}function ef(){const n=document.getElementById("chatInput"),e=n.value.trim();if(e){const t=L().userData,i=document.getElementById("chatMessages"),s=document.createElement("div");s.className="chat-message own",s.innerHTML=`
            <div class="chat-author">${t.username||"You"}</div>
            <div>${yn(e)}</div>
        `,i.appendChild(s),i.scrollTop=i.scrollHeight,n.value="";const r=J(),o=le();r&&o&&Qb(N(r,"chat"),{uid:o.uid,username:t.username,message:e,timestamp:_n()})}}function Gw(n){n.key==="Enter"&&ef()}function tf(){C("💧 Time for a water break! Stay hydrated!"),window.confetti&&confetti({particleCount:50,spread:60,colors:["#00d4ff","#0099ff","#0066ff"],origin:{y:.6}});const n=parseInt(localStorage.getItem("hydrationCount")||"0")+1;if(localStorage.setItem("hydrationCount",n),n>=12){const e=L().achievements;e.hydroHomie=!0,Ba("Hydro Homie")}}function Ba(n){localStorage.getItem(`achievement_${n}`)||(localStorage.setItem(`achievement_${n}`,"true"),window.confetti&&confetti({particleCount:100,spread:70,origin:{y:.6}}),C(`🏆 Achievement Unlocked: ${n}!`))}function Yw(n){const e=L().locationHistory,t=L().userData;if(e.push({location:n,time:Date.now(),user:t.username}),C(`📍 Checked in at ${n}!`),e.length>=10){const i=L().achievements;i.partyAnimal=!0,Ba("Party Animal")}window.closeModal()}function nf(){const n=Ua();let e='<div style="position: relative; width: 100%; height: 100%; background: rgba(255,255,255,0.05); border-radius: 20px;">';return n.forEach((t,i)=>{const s=20+i%3*30,r=20+Math.floor(i/3)*30;e+=`
            <div class="location-dot" style="left: ${s}%; top: ${r}%;" title="${t.name}: ${t.count} people">
                <span style="position: absolute; top: -20px; left: -20px; font-size: 0.8em; white-space: nowrap;">${t.name}</span>
            </div>
        `}),e+="</div>",e}function sf(){document.querySelectorAll(".location-dot").forEach(e=>{e.addEventListener("click",function(){const t=this.getAttribute("title");C(`📍 ${t}`)})})}function Ua(){const n=L().partyData||{},e={};return Object.values(n).forEach(t=>{e[t.location]||(e[t.location]={count:0,totalBac:0}),e[t.location].count++,e[t.location].totalBac+=t.bac}),Object.entries(e).map(([t,i])=>({name:t,count:i.count,avgBac:i.totalBac/i.count}))}function Kw(){const n=localStorage.getItem("homeAddress");if(n){const e=encodeURIComponent(n);C("🚕 Opening Uber with your home address..."),navigator.clipboard.writeText(n).then(()=>C("📋 Home address copied to clipboard!")).catch(()=>{}),window.open(`https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${e}`,"_blank")}else C("🚕 Opening Uber app..."),window.open("https://m.uber.com/ul/","_blank")}function Xw(n){switch(n){case"ambulance":confirm("Call emergency services (112)?")&&(window.location.href="tel:112");break;case"campus-security":confirm("Call HSG Campus Security?")&&(window.location.href="tel:+41712242424");break;case"taxi":C("🚕 Opening taxi options..."),setTimeout(()=>{Qw()},500);break}}function Qw(){const n=localStorage.getItem("homeAddress")||"",e=`
        <h2>🚕 Ride Options</h2>
        ${n?`<div style="margin: 20px 0; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 10px;">
            <p><strong>Your Home Address:</strong></p>
            <p>${yn(n)}</p>
            <button class="btn" style="margin-top: 10px;" onclick="navigator.clipboard.writeText('${yn(n)}').then(() => showNotification('📋 Address copied!'))">
                <i class="fas fa-copy"></i> Copy Address
            </button>
        </div>`:""}
        <div style="margin: 20px 0;">
            <button class="btn" style="width: 100%; margin: 10px 0;" onclick="callUber()">
                <i class="fab fa-uber"></i> Uber
            </button>
            <button class="btn" style="width: 100%; margin: 10px 0;" onclick="window.location.href='tel:+41712222222'">
                <i class="fas fa-taxi"></i> Local Taxi
            </button>
            <button class="btn" style="width: 100%; margin: 10px 0;" onclick="callSoberFriend()">
                <i class="fas fa-user-friends"></i> Call Sober Friend
            </button>
        </div>
        <button class="btn" onclick="closeModal()">Cancel</button>
    `;document.getElementById("modalBody").innerHTML=e,document.getElementById("modal").classList.add("show")}function Jw(n){localStorage.setItem("buddy",n),C(`👥 ${n} is now your buddy!`);const e=L().achievements;e.guardianAngel=!0,Ba("Guardian Angel"),window.closeModal()}function Zw(){window.showModal("first-aid")}async function e0(){const n=document.getElementById("username").value.trim();if(!n||n.length<3){C("❌ Username must be at least 3 characters","error");return}try{const e=J(),t=le(),i=L().userData;if(n.toLowerCase()!==i.username?.toLowerCase()){const s=await Xn(N(e,"usernames/"+n.toLowerCase()));if(s.exists()&&s.val()!==t.uid){C("❌ Username already taken","error");return}i.username&&await lt(N(e,"usernames/"+i.username.toLowerCase())),await xe(N(e,"usernames/"+n.toLowerCase()),t.uid)}await xe(N(e,"users/"+t.uid+"/username"),n),C("✅ Profile updated!","success"),i.username=n,document.getElementById("profileName").textContent=n,document.getElementById("settingsUsername").textContent=n,document.getElementById("profileInitial").textContent=n.charAt(0).toUpperCase()}catch(e){console.error("Update profile error:",e),C("❌ Failed to update profile","error")}}async function t0(){const n=prompt("Enter new password (min 6 characters):");if(n&&n.length>=6)try{await le().updatePassword(n),C("✅ Password changed successfully","success")}catch(e){console.error("Password change error:",e),e.code==="auth/requires-recent-login"?C("❌ Please sign out and sign in again before changing password","error"):C("❌ Failed to change password","error")}}async function n0(){const n=document.getElementById("homeAddress").value,e=document.getElementById("emergencyContact").value,t=document.getElementById("medicalInfo").value,i=document.getElementById("safetyNotes").value;try{const s=J(),r=le();await xe(N(s,"users/"+r.uid+"/emergency"),{homeAddress:n,emergencyContact:e,medicalInfo:t,safetyNotes:i,updatedAt:_n()}),localStorage.setItem("homeAddress",n),localStorage.setItem("emergencyContact",e),localStorage.setItem("medicalInfo",t),localStorage.setItem("safetyNotes",i),C("✅ Emergency information saved","success"),rf()}catch(s){console.error("Save emergency info error:",s),C("❌ Failed to save emergency info","error")}}async function i0(){const n=document.getElementById("shareLocation").checked,e=document.getElementById("notifications").checked,t=document.getElementById("publicProfile").checked;try{const i=J(),s=le();await xe(N(i,"users/"+s.uid+"/settings"),{shareLocation:n,notifications:e,publicProfile:t}),localStorage.setItem("shareLocation",n),localStorage.setItem("notifications",e),C("✅ Privacy settings saved","success"),rf()}catch(i){console.error("Save privacy settings error:",i),C("❌ Failed to save settings","error")}}function rf(){const n=document.createElement("div");n.className="settings-saved",n.innerHTML="✅",document.body.appendChild(n),setTimeout(()=>n.remove(),1e3)}function of(){document.querySelectorAll(".toggle-switch").forEach(n=>{const e=n.querySelector("input");e&&e.checked?n.classList.add("active"):n.classList.remove("active")})}async function s0(){if(confirm("Delete your account? This cannot be undone!")&&confirm("Are you absolutely sure? All your data will be permanently deleted."))try{const n=J(),e=le(),t=L().userData,i=L().friendsData;if(await lt(N(n,"users/"+e.uid)),t.username&&await lt(N(n,"usernames/"+t.username.toLowerCase())),i)for(const s in i)await lt(N(n,"users/"+s+"/friends/"+e.uid));await e.delete(),C("Account deleted. Goodbye!"),location.reload()}catch(n){console.error("Delete account error:",n),n.code==="auth/requires-recent-login"?C("❌ Please sign out and sign in again before deleting account","error"):C("❌ Failed to delete account","error")}}function r0(){const n=le(),e=L(),t={user:{email:n?.email,username:e.userData.username},settings:e.userData.settings,emergency:e.userData.emergency,devices:e.deviceData,friends:e.friendsData,drinkHistory:e.drinkHistory,achievements:e.achievements,partyData:e.partyData},i=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),s=window.URL.createObjectURL(i),r=document.createElement("a");r.href=s,r.download=`hsg_party_tracker_${new Date().toISOString().slice(0,10)}.json`,document.body.appendChild(r),r.click(),document.body.removeChild(r),window.URL.revokeObjectURL(s),C("📥 Data exported successfully!","success")}async function o0(){const n=document.getElementById("modalDeviceId").value.trim().toUpperCase();if(!n){C("❌ Please enter a Device ID","error");return}try{const e=J(),t=le(),i=L().deviceData;if(!(await Xn(N(e,"readings/"+n))).exists()){C("❌ Device not found. Make sure it's connected.","error");return}if(i[n]){C("ℹ️ Device already paired"),window.closeModal();return}await xe(N(e,"users/"+t.uid+"/devices/"+n),{pairedAt:_n(),name:"My Breathalyzer"}),C("✅ Device paired successfully!","success"),window.closeModal()}catch(e){console.error("Pairing error:",e),C("❌ Pairing failed","error")}}function a0(n){const e=Math.floor((Date.now()-n)/1e3);return e<60?"just now":e<3600?`${Math.floor(e/60)}m ago`:`${Math.floor(e/3600)}h ago`}function yn(n){const e=document.createElement("div");return e.textContent=n,e.innerHTML}function c0(n){console.log("Permission resolved:",n)}/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */function os(n){return n+.5|0}const Ot=(n,e,t)=>Math.max(Math.min(n,t),e);function ui(n){return Ot(os(n*2.55),0,255)}function $t(n){return Ot(os(n*255),0,255)}function mt(n){return Ot(os(n/2.55)/100,0,1)}function Sl(n){return Ot(os(n*100),0,100)}const Ve={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},Lo=[..."0123456789ABCDEF"],l0=n=>Lo[n&15],h0=n=>Lo[(n&240)>>4]+Lo[n&15],ps=n=>(n&240)>>4===(n&15),d0=n=>ps(n.r)&&ps(n.g)&&ps(n.b)&&ps(n.a);function u0(n){var e=n.length,t;return n[0]==="#"&&(e===4||e===5?t={r:255&Ve[n[1]]*17,g:255&Ve[n[2]]*17,b:255&Ve[n[3]]*17,a:e===5?Ve[n[4]]*17:255}:(e===7||e===9)&&(t={r:Ve[n[1]]<<4|Ve[n[2]],g:Ve[n[3]]<<4|Ve[n[4]],b:Ve[n[5]]<<4|Ve[n[6]],a:e===9?Ve[n[7]]<<4|Ve[n[8]]:255})),t}const f0=(n,e)=>n<255?e(n):"";function p0(n){var e=d0(n)?l0:h0;return n?"#"+e(n.r)+e(n.g)+e(n.b)+f0(n.a,e):void 0}const g0=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function af(n,e,t){const i=e*Math.min(t,1-t),s=(r,o=(r+n/30)%12)=>t-i*Math.max(Math.min(o-3,9-o,1),-1);return[s(0),s(8),s(4)]}function m0(n,e,t){const i=(s,r=(s+n/60)%6)=>t-t*e*Math.max(Math.min(r,4-r,1),0);return[i(5),i(3),i(1)]}function _0(n,e,t){const i=af(n,1,.5);let s;for(e+t>1&&(s=1/(e+t),e*=s,t*=s),s=0;s<3;s++)i[s]*=1-e-t,i[s]+=e;return i}function y0(n,e,t,i,s){return n===s?(e-t)/i+(e<t?6:0):e===s?(t-n)/i+2:(n-e)/i+4}function Ha(n){const t=n.r/255,i=n.g/255,s=n.b/255,r=Math.max(t,i,s),o=Math.min(t,i,s),a=(r+o)/2;let c,l,h;return r!==o&&(h=r-o,l=a>.5?h/(2-r-o):h/(r+o),c=y0(t,i,s,h,r),c=c*60+.5),[c|0,l||0,a]}function Wa(n,e,t,i){return(Array.isArray(e)?n(e[0],e[1],e[2]):n(e,t,i)).map($t)}function $a(n,e,t){return Wa(af,n,e,t)}function v0(n,e,t){return Wa(_0,n,e,t)}function b0(n,e,t){return Wa(m0,n,e,t)}function cf(n){return(n%360+360)%360}function w0(n){const e=g0.exec(n);let t=255,i;if(!e)return;e[5]!==i&&(t=e[6]?ui(+e[5]):$t(+e[5]));const s=cf(+e[2]),r=+e[3]/100,o=+e[4]/100;return e[1]==="hwb"?i=v0(s,r,o):e[1]==="hsv"?i=b0(s,r,o):i=$a(s,r,o),{r:i[0],g:i[1],b:i[2],a:t}}function E0(n,e){var t=Ha(n);t[0]=cf(t[0]+e),t=$a(t),n.r=t[0],n.g=t[1],n.b=t[2]}function C0(n){if(!n)return;const e=Ha(n),t=e[0],i=Sl(e[1]),s=Sl(e[2]);return n.a<255?`hsla(${t}, ${i}%, ${s}%, ${mt(n.a)})`:`hsl(${t}, ${i}%, ${s}%)`}const Tl={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},kl={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function I0(){const n={},e=Object.keys(kl),t=Object.keys(Tl);let i,s,r,o,a;for(i=0;i<e.length;i++){for(o=a=e[i],s=0;s<t.length;s++)r=t[s],a=a.replace(r,Tl[r]);r=parseInt(kl[o],16),n[a]=[r>>16&255,r>>8&255,r&255]}return n}let gs;function S0(n){gs||(gs=I0(),gs.transparent=[0,0,0,0]);const e=gs[n.toLowerCase()];return e&&{r:e[0],g:e[1],b:e[2],a:e.length===4?e[3]:255}}const T0=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function k0(n){const e=T0.exec(n);let t=255,i,s,r;if(e){if(e[7]!==i){const o=+e[7];t=e[8]?ui(o):Ot(o*255,0,255)}return i=+e[1],s=+e[3],r=+e[5],i=255&(e[2]?ui(i):Ot(i,0,255)),s=255&(e[4]?ui(s):Ot(s,0,255)),r=255&(e[6]?ui(r):Ot(r,0,255)),{r:i,g:s,b:r,a:t}}}function x0(n){return n&&(n.a<255?`rgba(${n.r}, ${n.g}, ${n.b}, ${mt(n.a)})`:`rgb(${n.r}, ${n.g}, ${n.b})`)}const no=n=>n<=.0031308?n*12.92:Math.pow(n,1/2.4)*1.055-.055,In=n=>n<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4);function A0(n,e,t){const i=In(mt(n.r)),s=In(mt(n.g)),r=In(mt(n.b));return{r:$t(no(i+t*(In(mt(e.r))-i))),g:$t(no(s+t*(In(mt(e.g))-s))),b:$t(no(r+t*(In(mt(e.b))-r))),a:n.a+t*(e.a-n.a)}}function ms(n,e,t){if(n){let i=Ha(n);i[e]=Math.max(0,Math.min(i[e]+i[e]*t,e===0?360:1)),i=$a(i),n.r=i[0],n.g=i[1],n.b=i[2]}}function lf(n,e){return n&&Object.assign(e||{},n)}function xl(n){var e={r:0,g:0,b:0,a:255};return Array.isArray(n)?n.length>=3&&(e={r:n[0],g:n[1],b:n[2],a:255},n.length>3&&(e.a=$t(n[3]))):(e=lf(n,{r:0,g:0,b:0,a:1}),e.a=$t(e.a)),e}function R0(n){return n.charAt(0)==="r"?k0(n):w0(n)}class zi{constructor(e){if(e instanceof zi)return e;const t=typeof e;let i;t==="object"?i=xl(e):t==="string"&&(i=u0(e)||S0(e)||R0(e)),this._rgb=i,this._valid=!!i}get valid(){return this._valid}get rgb(){var e=lf(this._rgb);return e&&(e.a=mt(e.a)),e}set rgb(e){this._rgb=xl(e)}rgbString(){return this._valid?x0(this._rgb):void 0}hexString(){return this._valid?p0(this._rgb):void 0}hslString(){return this._valid?C0(this._rgb):void 0}mix(e,t){if(e){const i=this.rgb,s=e.rgb;let r;const o=t===r?.5:t,a=2*o-1,c=i.a-s.a,l=((a*c===-1?a:(a+c)/(1+a*c))+1)/2;r=1-l,i.r=255&l*i.r+r*s.r+.5,i.g=255&l*i.g+r*s.g+.5,i.b=255&l*i.b+r*s.b+.5,i.a=o*i.a+(1-o)*s.a,this.rgb=i}return this}interpolate(e,t){return e&&(this._rgb=A0(this._rgb,e._rgb,t)),this}clone(){return new zi(this.rgb)}alpha(e){return this._rgb.a=$t(e),this}clearer(e){const t=this._rgb;return t.a*=1-e,this}greyscale(){const e=this._rgb,t=os(e.r*.3+e.g*.59+e.b*.11);return e.r=e.g=e.b=t,this}opaquer(e){const t=this._rgb;return t.a*=1+e,this}negate(){const e=this._rgb;return e.r=255-e.r,e.g=255-e.g,e.b=255-e.b,this}lighten(e){return ms(this._rgb,2,e),this}darken(e){return ms(this._rgb,2,-e),this}saturate(e){return ms(this._rgb,1,e),this}desaturate(e){return ms(this._rgb,1,-e),this}rotate(e){return E0(this._rgb,e),this}}/*!
 * Chart.js v4.5.0
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */function ft(){}const P0=(()=>{let n=0;return()=>n++})();function Pe(n){return n==null}function ke(n){if(Array.isArray&&Array.isArray(n))return!0;const e=Object.prototype.toString.call(n);return e.slice(0,7)==="[object"&&e.slice(-6)==="Array]"}function Y(n){return n!==null&&Object.prototype.toString.call(n)==="[object Object]"}function St(n){return(typeof n=="number"||n instanceof Number)&&isFinite(+n)}function it(n,e){return St(n)?n:e}function Q(n,e){return typeof n>"u"?e:n}const M0=(n,e)=>typeof n=="string"&&n.endsWith("%")?parseFloat(n)/100:+n/e,hf=(n,e)=>typeof n=="string"&&n.endsWith("%")?parseFloat(n)/100*e:+n;function ae(n,e,t){if(n&&typeof n.call=="function")return n.apply(t,e)}function X(n,e,t,i){let s,r,o;if(ke(n))for(r=n.length,s=0;s<r;s++)e.call(t,n[s],s);else if(Y(n))for(o=Object.keys(n),r=o.length,s=0;s<r;s++)e.call(t,n[o[s]],o[s])}function rr(n,e){let t,i,s,r;if(!n||!e||n.length!==e.length)return!1;for(t=0,i=n.length;t<i;++t)if(s=n[t],r=e[t],s.datasetIndex!==r.datasetIndex||s.index!==r.index)return!1;return!0}function or(n){if(ke(n))return n.map(or);if(Y(n)){const e=Object.create(null),t=Object.keys(n),i=t.length;let s=0;for(;s<i;++s)e[t[s]]=or(n[t[s]]);return e}return n}function df(n){return["__proto__","prototype","constructor"].indexOf(n)===-1}function D0(n,e,t,i){if(!df(n))return;const s=e[n],r=t[n];Y(s)&&Y(r)?Vi(s,r,i):e[n]=or(r)}function Vi(n,e,t){const i=ke(e)?e:[e],s=i.length;if(!Y(n))return n;t=t||{};const r=t.merger||D0;let o;for(let a=0;a<s;++a){if(o=i[a],!Y(o))continue;const c=Object.keys(o);for(let l=0,h=c.length;l<h;++l)r(c[l],n,o,t)}return n}function Ii(n,e){return Vi(n,e,{merger:O0})}function O0(n,e,t){if(!df(n))return;const i=e[n],s=t[n];Y(i)&&Y(s)?Ii(i,s):Object.prototype.hasOwnProperty.call(e,n)||(e[n]=or(s))}const Al={"":n=>n,x:n=>n.x,y:n=>n.y};function N0(n){const e=n.split("."),t=[];let i="";for(const s of e)i+=s,i.endsWith("\\")?i=i.slice(0,-1)+".":(t.push(i),i="");return t}function L0(n){const e=N0(n);return t=>{for(const i of e){if(i==="")break;t=t&&t[i]}return t}}function ji(n,e){return(Al[e]||(Al[e]=L0(e)))(n)}function za(n){return n.charAt(0).toUpperCase()+n.slice(1)}const ar=n=>typeof n<"u",qt=n=>typeof n=="function",Rl=(n,e)=>{if(n.size!==e.size)return!1;for(const t of n)if(!e.has(t))return!1;return!0};function F0(n){return n.type==="mouseup"||n.type==="click"||n.type==="contextmenu"}const ce=Math.PI,me=2*ce,cr=Number.POSITIVE_INFINITY,B0=ce/180,be=ce/2,Zt=ce/4,Pl=ce*2/3,Ml=Math.sign;function U0(n){const e=[],t=Math.sqrt(n);let i;for(i=1;i<t;i++)n%i===0&&(e.push(i),e.push(n/i));return t===(t|0)&&e.push(t),e.sort((s,r)=>s-r).pop(),e}function H0(n){return typeof n=="symbol"||typeof n=="object"&&n!==null&&!(Symbol.toPrimitive in n||"toString"in n||"valueOf"in n)}function lr(n){return!H0(n)&&!isNaN(parseFloat(n))&&isFinite(n)}function cn(n){return n*(ce/180)}function W0(n){return n*(180/ce)}function uf(n,e){const t=e.x-n.x,i=e.y-n.y,s=Math.sqrt(t*t+i*i);let r=Math.atan2(i,t);return r<-.5*ce&&(r+=me),{angle:r,distance:s}}function $0(n,e){return Math.sqrt(Math.pow(e.x-n.x,2)+Math.pow(e.y-n.y,2))}function ot(n){return(n%me+me)%me}function hr(n,e,t,i){const s=ot(n),r=ot(e),o=ot(t),a=ot(r-s),c=ot(o-s),l=ot(s-r),h=ot(s-o);return s===r||s===o||i&&r===o||a>c&&l<h}function qe(n,e,t){return Math.max(e,Math.min(t,n))}function z0(n){return qe(n,-32768,32767)}function fi(n,e,t,i=1e-6){return n>=Math.min(e,t)-i&&n<=Math.max(e,t)+i}function Va(n,e,t){t=t||(o=>n[o]<e);let i=n.length-1,s=0,r;for(;i-s>1;)r=s+i>>1,t(r)?s=r:i=r;return{lo:s,hi:i}}const Fo=(n,e,t,i)=>Va(n,t,i?s=>{const r=n[s][e];return r<t||r===t&&n[s+1][e]===t}:s=>n[s][e]<t),V0=(n,e,t)=>Va(n,t,i=>n[i][e]>=t);function j0(n,e,t){let i=0,s=n.length;for(;i<s&&n[i]<e;)i++;for(;s>i&&n[s-1]>t;)s--;return i>0||s<n.length?n.slice(i,s):n}const ff=["push","pop","shift","splice","unshift"];function q0(n,e){if(n._chartjs){n._chartjs.listeners.push(e);return}Object.defineProperty(n,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[e]}}),ff.forEach(t=>{const i="_onData"+za(t),s=n[t];Object.defineProperty(n,t,{configurable:!0,enumerable:!1,value(...r){const o=s.apply(this,r);return n._chartjs.listeners.forEach(a=>{typeof a[i]=="function"&&a[i](...r)}),o}})})}function Dl(n,e){const t=n._chartjs;if(!t)return;const i=t.listeners,s=i.indexOf(e);s!==-1&&i.splice(s,1),!(i.length>0)&&(ff.forEach(r=>{delete n[r]}),delete n._chartjs)}function G0(n){const e=new Set(n);return e.size===n.length?n:Array.from(e)}const pf=function(){return typeof window>"u"?function(n){return n()}:window.requestAnimationFrame}();function gf(n,e){let t=[],i=!1;return function(...s){t=s,i||(i=!0,pf.call(window,()=>{i=!1,n.apply(e,t)}))}}function Y0(n,e){let t;return function(...i){return e?(clearTimeout(t),t=setTimeout(n,e,i)):n.apply(this,i),e}}const mf=n=>n==="start"?"left":n==="end"?"right":"center",ze=(n,e,t)=>n==="start"?e:n==="end"?t:(e+t)/2,K0=(n,e,t,i)=>n===(i?"left":"right")?t:n==="center"?(e+t)/2:e,_s=n=>n===0||n===1,Ol=(n,e,t)=>-(Math.pow(2,10*(n-=1))*Math.sin((n-e)*me/t)),Nl=(n,e,t)=>Math.pow(2,-10*n)*Math.sin((n-e)*me/t)+1,Si={linear:n=>n,easeInQuad:n=>n*n,easeOutQuad:n=>-n*(n-2),easeInOutQuad:n=>(n/=.5)<1?.5*n*n:-.5*(--n*(n-2)-1),easeInCubic:n=>n*n*n,easeOutCubic:n=>(n-=1)*n*n+1,easeInOutCubic:n=>(n/=.5)<1?.5*n*n*n:.5*((n-=2)*n*n+2),easeInQuart:n=>n*n*n*n,easeOutQuart:n=>-((n-=1)*n*n*n-1),easeInOutQuart:n=>(n/=.5)<1?.5*n*n*n*n:-.5*((n-=2)*n*n*n-2),easeInQuint:n=>n*n*n*n*n,easeOutQuint:n=>(n-=1)*n*n*n*n+1,easeInOutQuint:n=>(n/=.5)<1?.5*n*n*n*n*n:.5*((n-=2)*n*n*n*n+2),easeInSine:n=>-Math.cos(n*be)+1,easeOutSine:n=>Math.sin(n*be),easeInOutSine:n=>-.5*(Math.cos(ce*n)-1),easeInExpo:n=>n===0?0:Math.pow(2,10*(n-1)),easeOutExpo:n=>n===1?1:-Math.pow(2,-10*n)+1,easeInOutExpo:n=>_s(n)?n:n<.5?.5*Math.pow(2,10*(n*2-1)):.5*(-Math.pow(2,-10*(n*2-1))+2),easeInCirc:n=>n>=1?n:-(Math.sqrt(1-n*n)-1),easeOutCirc:n=>Math.sqrt(1-(n-=1)*n),easeInOutCirc:n=>(n/=.5)<1?-.5*(Math.sqrt(1-n*n)-1):.5*(Math.sqrt(1-(n-=2)*n)+1),easeInElastic:n=>_s(n)?n:Ol(n,.075,.3),easeOutElastic:n=>_s(n)?n:Nl(n,.075,.3),easeInOutElastic(n){return _s(n)?n:n<.5?.5*Ol(n*2,.1125,.45):.5+.5*Nl(n*2-1,.1125,.45)},easeInBack(n){return n*n*((1.70158+1)*n-1.70158)},easeOutBack(n){return(n-=1)*n*((1.70158+1)*n+1.70158)+1},easeInOutBack(n){let e=1.70158;return(n/=.5)<1?.5*(n*n*(((e*=1.525)+1)*n-e)):.5*((n-=2)*n*(((e*=1.525)+1)*n+e)+2)},easeInBounce:n=>1-Si.easeOutBounce(1-n),easeOutBounce(n){return n<1/2.75?7.5625*n*n:n<2/2.75?7.5625*(n-=1.5/2.75)*n+.75:n<2.5/2.75?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375},easeInOutBounce:n=>n<.5?Si.easeInBounce(n*2)*.5:Si.easeOutBounce(n*2-1)*.5+.5};function _f(n){if(n&&typeof n=="object"){const e=n.toString();return e==="[object CanvasPattern]"||e==="[object CanvasGradient]"}return!1}function Ll(n){return _f(n)?n:new zi(n)}function io(n){return _f(n)?n:new zi(n).saturate(.5).darken(.1).hexString()}const X0=["x","y","borderWidth","radius","tension"],Q0=["color","borderColor","backgroundColor"];function J0(n){n.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),n.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:e=>e!=="onProgress"&&e!=="onComplete"&&e!=="fn"}),n.set("animations",{colors:{type:"color",properties:Q0},numbers:{type:"number",properties:X0}}),n.describe("animations",{_fallback:"animation"}),n.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:e=>e|0}}}})}function Z0(n){n.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const Fl=new Map;function eE(n,e){e=e||{};const t=n+JSON.stringify(e);let i=Fl.get(t);return i||(i=new Intl.NumberFormat(n,e),Fl.set(t,i)),i}function tE(n,e,t){return eE(e,t).format(n)}const nE={values(n){return ke(n)?n:""+n}};var iE={formatters:nE};function sE(n){n.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(e,t)=>t.lineWidth,tickColor:(e,t)=>t.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:iE.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),n.route("scale.ticks","color","","color"),n.route("scale.grid","color","","borderColor"),n.route("scale.border","color","","borderColor"),n.route("scale.title","color","","color"),n.describe("scale",{_fallback:!1,_scriptable:e=>!e.startsWith("before")&&!e.startsWith("after")&&e!=="callback"&&e!=="parser",_indexable:e=>e!=="borderDash"&&e!=="tickBorderDash"&&e!=="dash"}),n.describe("scales",{_fallback:"scale"}),n.describe("scale.ticks",{_scriptable:e=>e!=="backdropPadding"&&e!=="callback",_indexable:e=>e!=="backdropPadding"})}const vn=Object.create(null),Bo=Object.create(null);function Ti(n,e){if(!e)return n;const t=e.split(".");for(let i=0,s=t.length;i<s;++i){const r=t[i];n=n[r]||(n[r]=Object.create(null))}return n}function so(n,e,t){return typeof e=="string"?Vi(Ti(n,e),t):Vi(Ti(n,""),e)}class rE{constructor(e,t){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=i=>i.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(i,s)=>io(s.backgroundColor),this.hoverBorderColor=(i,s)=>io(s.borderColor),this.hoverColor=(i,s)=>io(s.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(e),this.apply(t)}set(e,t){return so(this,e,t)}get(e){return Ti(this,e)}describe(e,t){return so(Bo,e,t)}override(e,t){return so(vn,e,t)}route(e,t,i,s){const r=Ti(this,e),o=Ti(this,i),a="_"+t;Object.defineProperties(r,{[a]:{value:r[t],writable:!0},[t]:{enumerable:!0,get(){const c=this[a],l=o[s];return Y(c)?Object.assign({},l,c):Q(c,l)},set(c){this[a]=c}}})}apply(e){e.forEach(t=>t(this))}}var ge=new rE({_scriptable:n=>!n.startsWith("on"),_indexable:n=>n!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[J0,Z0,sE]);function oE(n){return!n||Pe(n.size)||Pe(n.family)?null:(n.style?n.style+" ":"")+(n.weight?n.weight+" ":"")+n.size+"px "+n.family}function Bl(n,e,t,i,s){let r=e[s];return r||(r=e[s]=n.measureText(s).width,t.push(s)),r>i&&(i=r),i}function en(n,e,t){const i=n.currentDevicePixelRatio,s=t!==0?Math.max(t/2,.5):0;return Math.round((e-s)*i)/i+s}function Ul(n,e){!e&&!n||(e=e||n.getContext("2d"),e.save(),e.resetTransform(),e.clearRect(0,0,n.width,n.height),e.restore())}function Hl(n,e,t,i){yf(n,e,t,i,null)}function yf(n,e,t,i,s){let r,o,a,c,l,h,d,u;const f=e.pointStyle,p=e.rotation,_=e.radius;let m=(p||0)*B0;if(f&&typeof f=="object"&&(r=f.toString(),r==="[object HTMLImageElement]"||r==="[object HTMLCanvasElement]")){n.save(),n.translate(t,i),n.rotate(m),n.drawImage(f,-f.width/2,-f.height/2,f.width,f.height),n.restore();return}if(!(isNaN(_)||_<=0)){switch(n.beginPath(),f){default:s?n.ellipse(t,i,s/2,_,0,0,me):n.arc(t,i,_,0,me),n.closePath();break;case"triangle":h=s?s/2:_,n.moveTo(t+Math.sin(m)*h,i-Math.cos(m)*_),m+=Pl,n.lineTo(t+Math.sin(m)*h,i-Math.cos(m)*_),m+=Pl,n.lineTo(t+Math.sin(m)*h,i-Math.cos(m)*_),n.closePath();break;case"rectRounded":l=_*.516,c=_-l,o=Math.cos(m+Zt)*c,d=Math.cos(m+Zt)*(s?s/2-l:c),a=Math.sin(m+Zt)*c,u=Math.sin(m+Zt)*(s?s/2-l:c),n.arc(t-d,i-a,l,m-ce,m-be),n.arc(t+u,i-o,l,m-be,m),n.arc(t+d,i+a,l,m,m+be),n.arc(t-u,i+o,l,m+be,m+ce),n.closePath();break;case"rect":if(!p){c=Math.SQRT1_2*_,h=s?s/2:c,n.rect(t-h,i-c,2*h,2*c);break}m+=Zt;case"rectRot":d=Math.cos(m)*(s?s/2:_),o=Math.cos(m)*_,a=Math.sin(m)*_,u=Math.sin(m)*(s?s/2:_),n.moveTo(t-d,i-a),n.lineTo(t+u,i-o),n.lineTo(t+d,i+a),n.lineTo(t-u,i+o),n.closePath();break;case"crossRot":m+=Zt;case"cross":d=Math.cos(m)*(s?s/2:_),o=Math.cos(m)*_,a=Math.sin(m)*_,u=Math.sin(m)*(s?s/2:_),n.moveTo(t-d,i-a),n.lineTo(t+d,i+a),n.moveTo(t+u,i-o),n.lineTo(t-u,i+o);break;case"star":d=Math.cos(m)*(s?s/2:_),o=Math.cos(m)*_,a=Math.sin(m)*_,u=Math.sin(m)*(s?s/2:_),n.moveTo(t-d,i-a),n.lineTo(t+d,i+a),n.moveTo(t+u,i-o),n.lineTo(t-u,i+o),m+=Zt,d=Math.cos(m)*(s?s/2:_),o=Math.cos(m)*_,a=Math.sin(m)*_,u=Math.sin(m)*(s?s/2:_),n.moveTo(t-d,i-a),n.lineTo(t+d,i+a),n.moveTo(t+u,i-o),n.lineTo(t-u,i+o);break;case"line":o=s?s/2:Math.cos(m)*_,a=Math.sin(m)*_,n.moveTo(t-o,i-a),n.lineTo(t+o,i+a);break;case"dash":n.moveTo(t,i),n.lineTo(t+Math.cos(m)*(s?s/2:_),i+Math.sin(m)*_);break;case!1:n.closePath();break}n.fill(),e.borderWidth>0&&n.stroke()}}function vf(n,e,t){return t=t||.5,!e||n&&n.x>e.left-t&&n.x<e.right+t&&n.y>e.top-t&&n.y<e.bottom+t}function ja(n,e){n.save(),n.beginPath(),n.rect(e.left,e.top,e.right-e.left,e.bottom-e.top),n.clip()}function qa(n){n.restore()}function aE(n,e){e.translation&&n.translate(e.translation[0],e.translation[1]),Pe(e.rotation)||n.rotate(e.rotation),e.color&&(n.fillStyle=e.color),e.textAlign&&(n.textAlign=e.textAlign),e.textBaseline&&(n.textBaseline=e.textBaseline)}function cE(n,e,t,i,s){if(s.strikethrough||s.underline){const r=n.measureText(i),o=e-r.actualBoundingBoxLeft,a=e+r.actualBoundingBoxRight,c=t-r.actualBoundingBoxAscent,l=t+r.actualBoundingBoxDescent,h=s.strikethrough?(c+l)/2:l;n.strokeStyle=n.fillStyle,n.beginPath(),n.lineWidth=s.decorationWidth||2,n.moveTo(o,h),n.lineTo(a,h),n.stroke()}}function lE(n,e){const t=n.fillStyle;n.fillStyle=e.color,n.fillRect(e.left,e.top,e.width,e.height),n.fillStyle=t}function dr(n,e,t,i,s,r={}){const o=ke(e)?e:[e],a=r.strokeWidth>0&&r.strokeColor!=="";let c,l;for(n.save(),n.font=s.string,aE(n,r),c=0;c<o.length;++c)l=o[c],r.backdrop&&lE(n,r.backdrop),a&&(r.strokeColor&&(n.strokeStyle=r.strokeColor),Pe(r.strokeWidth)||(n.lineWidth=r.strokeWidth),n.strokeText(l,t,i,r.maxWidth)),n.fillText(l,t,i,r.maxWidth),cE(n,t,i,l,r),i+=Number(s.lineHeight);n.restore()}function Uo(n,e){const{x:t,y:i,w:s,h:r,radius:o}=e;n.arc(t+o.topLeft,i+o.topLeft,o.topLeft,1.5*ce,ce,!0),n.lineTo(t,i+r-o.bottomLeft),n.arc(t+o.bottomLeft,i+r-o.bottomLeft,o.bottomLeft,ce,be,!0),n.lineTo(t+s-o.bottomRight,i+r),n.arc(t+s-o.bottomRight,i+r-o.bottomRight,o.bottomRight,be,0,!0),n.lineTo(t+s,i+o.topRight),n.arc(t+s-o.topRight,i+o.topRight,o.topRight,0,-be,!0),n.lineTo(t+o.topLeft,i)}const hE=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,dE=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function uE(n,e){const t=(""+n).match(hE);if(!t||t[1]==="normal")return e*1.2;switch(n=+t[2],t[3]){case"px":return n;case"%":n/=100;break}return e*n}const fE=n=>+n||0;function Ga(n,e){const t={},i=Y(e),s=i?Object.keys(e):e,r=Y(n)?i?o=>Q(n[o],n[e[o]]):o=>n[o]:()=>n;for(const o of s)t[o]=fE(r(o));return t}function pE(n){return Ga(n,{top:"y",right:"x",bottom:"y",left:"x"})}function ki(n){return Ga(n,["topLeft","topRight","bottomLeft","bottomRight"])}function tt(n){const e=pE(n);return e.width=e.left+e.right,e.height=e.top+e.bottom,e}function Ue(n,e){n=n||{},e=e||ge.font;let t=Q(n.size,e.size);typeof t=="string"&&(t=parseInt(t,10));let i=Q(n.style,e.style);i&&!(""+i).match(dE)&&(console.warn('Invalid font style specified: "'+i+'"'),i=void 0);const s={family:Q(n.family,e.family),lineHeight:uE(Q(n.lineHeight,e.lineHeight),t),size:t,style:i,weight:Q(n.weight,e.weight),string:""};return s.string=oE(s),s}function ys(n,e,t,i){let s,r,o;for(s=0,r=n.length;s<r;++s)if(o=n[s],o!==void 0&&o!==void 0)return o}function gE(n,e,t){const{min:i,max:s}=n,r=hf(e,(s-i)/2),o=(a,c)=>t&&a===0?0:a+c;return{min:o(i,-Math.abs(r)),max:o(s,r)}}function Qn(n,e){return Object.assign(Object.create(n),e)}function Ya(n,e=[""],t,i,s=()=>n[0]){const r=t||n;typeof i>"u"&&(i=Cf("_fallback",n));const o={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:n,_rootScopes:r,_fallback:i,_getTarget:s,override:a=>Ya([a,...n],e,r,i)};return new Proxy(o,{deleteProperty(a,c){return delete a[c],delete a._keys,delete n[0][c],!0},get(a,c){return wf(a,c,()=>CE(c,e,n,a))},getOwnPropertyDescriptor(a,c){return Reflect.getOwnPropertyDescriptor(a._scopes[0],c)},getPrototypeOf(){return Reflect.getPrototypeOf(n[0])},has(a,c){return $l(a).includes(c)},ownKeys(a){return $l(a)},set(a,c,l){const h=a._storage||(a._storage=s());return a[c]=h[c]=l,delete a._keys,!0}})}function Hn(n,e,t,i){const s={_cacheable:!1,_proxy:n,_context:e,_subProxy:t,_stack:new Set,_descriptors:bf(n,i),setContext:r=>Hn(n,r,t,i),override:r=>Hn(n.override(r),e,t,i)};return new Proxy(s,{deleteProperty(r,o){return delete r[o],delete n[o],!0},get(r,o,a){return wf(r,o,()=>_E(r,o,a))},getOwnPropertyDescriptor(r,o){return r._descriptors.allKeys?Reflect.has(n,o)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(n,o)},getPrototypeOf(){return Reflect.getPrototypeOf(n)},has(r,o){return Reflect.has(n,o)},ownKeys(){return Reflect.ownKeys(n)},set(r,o,a){return n[o]=a,delete r[o],!0}})}function bf(n,e={scriptable:!0,indexable:!0}){const{_scriptable:t=e.scriptable,_indexable:i=e.indexable,_allKeys:s=e.allKeys}=n;return{allKeys:s,scriptable:t,indexable:i,isScriptable:qt(t)?t:()=>t,isIndexable:qt(i)?i:()=>i}}const mE=(n,e)=>n?n+za(e):e,Ka=(n,e)=>Y(e)&&n!=="adapters"&&(Object.getPrototypeOf(e)===null||e.constructor===Object);function wf(n,e,t){if(Object.prototype.hasOwnProperty.call(n,e)||e==="constructor")return n[e];const i=t();return n[e]=i,i}function _E(n,e,t){const{_proxy:i,_context:s,_subProxy:r,_descriptors:o}=n;let a=i[e];return qt(a)&&o.isScriptable(e)&&(a=yE(e,a,n,t)),ke(a)&&a.length&&(a=vE(e,a,n,o.isIndexable)),Ka(e,a)&&(a=Hn(a,s,r&&r[e],o)),a}function yE(n,e,t,i){const{_proxy:s,_context:r,_subProxy:o,_stack:a}=t;if(a.has(n))throw new Error("Recursion detected: "+Array.from(a).join("->")+"->"+n);a.add(n);let c=e(r,o||i);return a.delete(n),Ka(n,c)&&(c=Xa(s._scopes,s,n,c)),c}function vE(n,e,t,i){const{_proxy:s,_context:r,_subProxy:o,_descriptors:a}=t;if(typeof r.index<"u"&&i(n))return e[r.index%e.length];if(Y(e[0])){const c=e,l=s._scopes.filter(h=>h!==c);e=[];for(const h of c){const d=Xa(l,s,n,h);e.push(Hn(d,r,o&&o[n],a))}}return e}function Ef(n,e,t){return qt(n)?n(e,t):n}const bE=(n,e)=>n===!0?e:typeof n=="string"?ji(e,n):void 0;function wE(n,e,t,i,s){for(const r of e){const o=bE(t,r);if(o){n.add(o);const a=Ef(o._fallback,t,s);if(typeof a<"u"&&a!==t&&a!==i)return a}else if(o===!1&&typeof i<"u"&&t!==i)return null}return!1}function Xa(n,e,t,i){const s=e._rootScopes,r=Ef(e._fallback,t,i),o=[...n,...s],a=new Set;a.add(i);let c=Wl(a,o,t,r||t,i);return c===null||typeof r<"u"&&r!==t&&(c=Wl(a,o,r,c,i),c===null)?!1:Ya(Array.from(a),[""],s,r,()=>EE(e,t,i))}function Wl(n,e,t,i,s){for(;t;)t=wE(n,e,t,i,s);return t}function EE(n,e,t){const i=n._getTarget();e in i||(i[e]={});const s=i[e];return ke(s)&&Y(t)?t:s||{}}function CE(n,e,t,i){let s;for(const r of e)if(s=Cf(mE(r,n),t),typeof s<"u")return Ka(n,s)?Xa(t,i,n,s):s}function Cf(n,e){for(const t of e){if(!t)continue;const i=t[n];if(typeof i<"u")return i}}function $l(n){let e=n._keys;return e||(e=n._keys=IE(n._scopes)),e}function IE(n){const e=new Set;for(const t of n)for(const i of Object.keys(t).filter(s=>!s.startsWith("_")))e.add(i);return Array.from(e)}function Qa(){return typeof window<"u"&&typeof document<"u"}function Ja(n){let e=n.parentNode;return e&&e.toString()==="[object ShadowRoot]"&&(e=e.host),e}function ur(n,e,t){let i;return typeof n=="string"?(i=parseInt(n,10),n.indexOf("%")!==-1&&(i=i/100*e.parentNode[t])):i=n,i}const Rr=n=>n.ownerDocument.defaultView.getComputedStyle(n,null);function SE(n,e){return Rr(n).getPropertyValue(e)}const TE=["top","right","bottom","left"];function ln(n,e,t){const i={};t=t?"-"+t:"";for(let s=0;s<4;s++){const r=TE[s];i[r]=parseFloat(n[e+"-"+r+t])||0}return i.width=i.left+i.right,i.height=i.top+i.bottom,i}const kE=(n,e,t)=>(n>0||e>0)&&(!t||!t.shadowRoot);function xE(n,e){const t=n.touches,i=t&&t.length?t[0]:n,{offsetX:s,offsetY:r}=i;let o=!1,a,c;if(kE(s,r,n.target))a=s,c=r;else{const l=e.getBoundingClientRect();a=i.clientX-l.left,c=i.clientY-l.top,o=!0}return{x:a,y:c,box:o}}function rn(n,e){if("native"in n)return n;const{canvas:t,currentDevicePixelRatio:i}=e,s=Rr(t),r=s.boxSizing==="border-box",o=ln(s,"padding"),a=ln(s,"border","width"),{x:c,y:l,box:h}=xE(n,t),d=o.left+(h&&a.left),u=o.top+(h&&a.top);let{width:f,height:p}=e;return r&&(f-=o.width+a.width,p-=o.height+a.height),{x:Math.round((c-d)/f*t.width/i),y:Math.round((l-u)/p*t.height/i)}}function AE(n,e,t){let i,s;if(e===void 0||t===void 0){const r=n&&Ja(n);if(!r)e=n.clientWidth,t=n.clientHeight;else{const o=r.getBoundingClientRect(),a=Rr(r),c=ln(a,"border","width"),l=ln(a,"padding");e=o.width-l.width-c.width,t=o.height-l.height-c.height,i=ur(a.maxWidth,r,"clientWidth"),s=ur(a.maxHeight,r,"clientHeight")}}return{width:e,height:t,maxWidth:i||cr,maxHeight:s||cr}}const vs=n=>Math.round(n*10)/10;function RE(n,e,t,i){const s=Rr(n),r=ln(s,"margin"),o=ur(s.maxWidth,n,"clientWidth")||cr,a=ur(s.maxHeight,n,"clientHeight")||cr,c=AE(n,e,t);let{width:l,height:h}=c;if(s.boxSizing==="content-box"){const u=ln(s,"border","width"),f=ln(s,"padding");l-=f.width+u.width,h-=f.height+u.height}return l=Math.max(0,l-r.width),h=Math.max(0,i?l/i:h-r.height),l=vs(Math.min(l,o,c.maxWidth)),h=vs(Math.min(h,a,c.maxHeight)),l&&!h&&(h=vs(l/2)),(e!==void 0||t!==void 0)&&i&&c.height&&h>c.height&&(h=c.height,l=vs(Math.floor(h*i))),{width:l,height:h}}function zl(n,e,t){const i=e||1,s=Math.floor(n.height*i),r=Math.floor(n.width*i);n.height=Math.floor(n.height),n.width=Math.floor(n.width);const o=n.canvas;return o.style&&(t||!o.style.height&&!o.style.width)&&(o.style.height=`${n.height}px`,o.style.width=`${n.width}px`),n.currentDevicePixelRatio!==i||o.height!==s||o.width!==r?(n.currentDevicePixelRatio=i,o.height=s,o.width=r,n.ctx.setTransform(i,0,0,i,0,0),!0):!1}const PE=function(){let n=!1;try{const e={get passive(){return n=!0,!1}};Qa()&&(window.addEventListener("test",null,e),window.removeEventListener("test",null,e))}catch{}return n}();function Vl(n,e){const t=SE(n,e),i=t&&t.match(/^(\d+)(\.\d+)?px$/);return i?+i[1]:void 0}const ME=function(n,e){return{x(t){return n+n+e-t},setWidth(t){e=t},textAlign(t){return t==="center"?t:t==="right"?"left":"right"},xPlus(t,i){return t-i},leftForLtr(t,i){return t-i}}},DE=function(){return{x(n){return n},setWidth(n){},textAlign(n){return n},xPlus(n,e){return n+e},leftForLtr(n,e){return n}}};function On(n,e,t){return n?ME(e,t):DE()}function If(n,e){let t,i;(e==="ltr"||e==="rtl")&&(t=n.canvas.style,i=[t.getPropertyValue("direction"),t.getPropertyPriority("direction")],t.setProperty("direction",e,"important"),n.prevTextDirection=i)}function Sf(n,e){e!==void 0&&(delete n.prevTextDirection,n.canvas.style.setProperty("direction",e[0],e[1]))}function bs(n,e,t){return n.options.clip?n[t]:e[t]}function OE(n,e){const{xScale:t,yScale:i}=n;return t&&i?{left:bs(t,e,"left"),right:bs(t,e,"right"),top:bs(i,e,"top"),bottom:bs(i,e,"bottom")}:e}function NE(n,e){const t=e._clip;if(t.disabled)return!1;const i=OE(e,n.chartArea);return{left:t.left===!1?0:i.left-(t.left===!0?0:t.left),right:t.right===!1?n.width:i.right+(t.right===!0?0:t.right),top:t.top===!1?0:i.top-(t.top===!0?0:t.top),bottom:t.bottom===!1?n.height:i.bottom+(t.bottom===!0?0:t.bottom)}}/*!
 * Chart.js v4.5.0
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */class LE{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(e,t,i,s){const r=t.listeners[s],o=t.duration;r.forEach(a=>a({chart:e,initial:t.initial,numSteps:o,currentStep:Math.min(i-t.start,o)}))}_refresh(){this._request||(this._running=!0,this._request=pf.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(e=Date.now()){let t=0;this._charts.forEach((i,s)=>{if(!i.running||!i.items.length)return;const r=i.items;let o=r.length-1,a=!1,c;for(;o>=0;--o)c=r[o],c._active?(c._total>i.duration&&(i.duration=c._total),c.tick(e),a=!0):(r[o]=r[r.length-1],r.pop());a&&(s.draw(),this._notify(s,i,e,"progress")),r.length||(i.running=!1,this._notify(s,i,e,"complete"),i.initial=!1),t+=r.length}),this._lastDate=e,t===0&&(this._running=!1)}_getAnims(e){const t=this._charts;let i=t.get(e);return i||(i={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},t.set(e,i)),i}listen(e,t,i){this._getAnims(e).listeners[t].push(i)}add(e,t){!t||!t.length||this._getAnims(e).items.push(...t)}has(e){return this._getAnims(e).items.length>0}start(e){const t=this._charts.get(e);t&&(t.running=!0,t.start=Date.now(),t.duration=t.items.reduce((i,s)=>Math.max(i,s._duration),0),this._refresh())}running(e){if(!this._running)return!1;const t=this._charts.get(e);return!(!t||!t.running||!t.items.length)}stop(e){const t=this._charts.get(e);if(!t||!t.items.length)return;const i=t.items;let s=i.length-1;for(;s>=0;--s)i[s].cancel();t.items=[],this._notify(e,t,Date.now(),"complete")}remove(e){return this._charts.delete(e)}}var pt=new LE;const jl="transparent",FE={boolean(n,e,t){return t>.5?e:n},color(n,e,t){const i=Ll(n||jl),s=i.valid&&Ll(e||jl);return s&&s.valid?s.mix(i,t).hexString():e},number(n,e,t){return n+(e-n)*t}};class BE{constructor(e,t,i,s){const r=t[i];s=ys([e.to,s,r,e.from]);const o=ys([e.from,r,s]);this._active=!0,this._fn=e.fn||FE[e.type||typeof o],this._easing=Si[e.easing]||Si.linear,this._start=Math.floor(Date.now()+(e.delay||0)),this._duration=this._total=Math.floor(e.duration),this._loop=!!e.loop,this._target=t,this._prop=i,this._from=o,this._to=s,this._promises=void 0}active(){return this._active}update(e,t,i){if(this._active){this._notify(!1);const s=this._target[this._prop],r=i-this._start,o=this._duration-r;this._start=i,this._duration=Math.floor(Math.max(o,e.duration)),this._total+=r,this._loop=!!e.loop,this._to=ys([e.to,t,s,e.from]),this._from=ys([e.from,s,t])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(e){const t=e-this._start,i=this._duration,s=this._prop,r=this._from,o=this._loop,a=this._to;let c;if(this._active=r!==a&&(o||t<i),!this._active){this._target[s]=a,this._notify(!0);return}if(t<0){this._target[s]=r;return}c=t/i%2,c=o&&c>1?2-c:c,c=this._easing(Math.min(1,Math.max(0,c))),this._target[s]=this._fn(r,a,c)}wait(){const e=this._promises||(this._promises=[]);return new Promise((t,i)=>{e.push({res:t,rej:i})})}_notify(e){const t=e?"res":"rej",i=this._promises||[];for(let s=0;s<i.length;s++)i[s][t]()}}class Tf{constructor(e,t){this._chart=e,this._properties=new Map,this.configure(t)}configure(e){if(!Y(e))return;const t=Object.keys(ge.animation),i=this._properties;Object.getOwnPropertyNames(e).forEach(s=>{const r=e[s];if(!Y(r))return;const o={};for(const a of t)o[a]=r[a];(ke(r.properties)&&r.properties||[s]).forEach(a=>{(a===s||!i.has(a))&&i.set(a,o)})})}_animateOptions(e,t){const i=t.options,s=HE(e,i);if(!s)return[];const r=this._createAnimations(s,i);return i.$shared&&UE(e.options.$animations,i).then(()=>{e.options=i},()=>{}),r}_createAnimations(e,t){const i=this._properties,s=[],r=e.$animations||(e.$animations={}),o=Object.keys(t),a=Date.now();let c;for(c=o.length-1;c>=0;--c){const l=o[c];if(l.charAt(0)==="$")continue;if(l==="options"){s.push(...this._animateOptions(e,t));continue}const h=t[l];let d=r[l];const u=i.get(l);if(d)if(u&&d.active()){d.update(u,h,a);continue}else d.cancel();if(!u||!u.duration){e[l]=h;continue}r[l]=d=new BE(u,e,l,h),s.push(d)}return s}update(e,t){if(this._properties.size===0){Object.assign(e,t);return}const i=this._createAnimations(e,t);if(i.length)return pt.add(this._chart,i),!0}}function UE(n,e){const t=[],i=Object.keys(e);for(let s=0;s<i.length;s++){const r=n[i[s]];r&&r.active()&&t.push(r.wait())}return Promise.all(t)}function HE(n,e){if(!e)return;let t=n.options;if(!t){n.options=e;return}return t.$shared&&(n.options=t=Object.assign({},t,{$shared:!1,$animations:{}})),t}function ql(n,e){const t=n&&n.options||{},i=t.reverse,s=t.min===void 0?e:0,r=t.max===void 0?e:0;return{start:i?r:s,end:i?s:r}}function WE(n,e,t){if(t===!1)return!1;const i=ql(n,t),s=ql(e,t);return{top:s.end,right:i.end,bottom:s.start,left:i.start}}function $E(n){let e,t,i,s;return Y(n)?(e=n.top,t=n.right,i=n.bottom,s=n.left):e=t=i=s=n,{top:e,right:t,bottom:i,left:s,disabled:n===!1}}function kf(n,e){const t=[],i=n._getSortedDatasetMetas(e);let s,r;for(s=0,r=i.length;s<r;++s)t.push(i[s].index);return t}function Gl(n,e,t,i={}){const s=n.keys,r=i.mode==="single";let o,a,c,l;if(e===null)return;let h=!1;for(o=0,a=s.length;o<a;++o){if(c=+s[o],c===t){if(h=!0,i.all)continue;break}l=n.values[c],St(l)&&(r||e===0||Ml(e)===Ml(l))&&(e+=l)}return!h&&!i.all?0:e}function zE(n,e){const{iScale:t,vScale:i}=e,s=t.axis==="x"?"x":"y",r=i.axis==="x"?"x":"y",o=Object.keys(n),a=new Array(o.length);let c,l,h;for(c=0,l=o.length;c<l;++c)h=o[c],a[c]={[s]:h,[r]:n[h]};return a}function ro(n,e){const t=n&&n.options.stacked;return t||t===void 0&&e.stack!==void 0}function VE(n,e,t){return`${n.id}.${e.id}.${t.stack||t.type}`}function jE(n){const{min:e,max:t,minDefined:i,maxDefined:s}=n.getUserBounds();return{min:i?e:Number.NEGATIVE_INFINITY,max:s?t:Number.POSITIVE_INFINITY}}function qE(n,e,t){const i=n[e]||(n[e]={});return i[t]||(i[t]={})}function Yl(n,e,t,i){for(const s of e.getMatchingVisibleMetas(i).reverse()){const r=n[s.index];if(t&&r>0||!t&&r<0)return s.index}return null}function Kl(n,e){const{chart:t,_cachedMeta:i}=n,s=t._stacks||(t._stacks={}),{iScale:r,vScale:o,index:a}=i,c=r.axis,l=o.axis,h=VE(r,o,i),d=e.length;let u;for(let f=0;f<d;++f){const p=e[f],{[c]:_,[l]:m}=p,v=p._stacks||(p._stacks={});u=v[l]=qE(s,h,_),u[a]=m,u._top=Yl(u,o,!0,i.type),u._bottom=Yl(u,o,!1,i.type);const b=u._visualValues||(u._visualValues={});b[a]=m}}function oo(n,e){const t=n.scales;return Object.keys(t).filter(i=>t[i].axis===e).shift()}function GE(n,e){return Qn(n,{active:!1,dataset:void 0,datasetIndex:e,index:e,mode:"default",type:"dataset"})}function YE(n,e,t){return Qn(n,{active:!1,dataIndex:e,parsed:void 0,raw:void 0,element:t,index:e,mode:"default",type:"data"})}function ii(n,e){const t=n.controller.index,i=n.vScale&&n.vScale.axis;if(i){e=e||n._parsed;for(const s of e){const r=s._stacks;if(!r||r[i]===void 0||r[i][t]===void 0)return;delete r[i][t],r[i]._visualValues!==void 0&&r[i]._visualValues[t]!==void 0&&delete r[i]._visualValues[t]}}}const ao=n=>n==="reset"||n==="none",Xl=(n,e)=>e?n:Object.assign({},n),KE=(n,e,t)=>n&&!e.hidden&&e._stacked&&{keys:kf(t,!0),values:null};class xf{static defaults={};static datasetElementType=null;static dataElementType=null;constructor(e,t){this.chart=e,this._ctx=e.ctx,this.index=t,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const e=this._cachedMeta;this.configure(),this.linkScales(),e._stacked=ro(e.vScale,e),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(e){this.index!==e&&ii(this._cachedMeta),this.index=e}linkScales(){const e=this.chart,t=this._cachedMeta,i=this.getDataset(),s=(d,u,f,p)=>d==="x"?u:d==="r"?p:f,r=t.xAxisID=Q(i.xAxisID,oo(e,"x")),o=t.yAxisID=Q(i.yAxisID,oo(e,"y")),a=t.rAxisID=Q(i.rAxisID,oo(e,"r")),c=t.indexAxis,l=t.iAxisID=s(c,r,o,a),h=t.vAxisID=s(c,o,r,a);t.xScale=this.getScaleForId(r),t.yScale=this.getScaleForId(o),t.rScale=this.getScaleForId(a),t.iScale=this.getScaleForId(l),t.vScale=this.getScaleForId(h)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(e){return this.chart.scales[e]}_getOtherScale(e){const t=this._cachedMeta;return e===t.iScale?t.vScale:t.iScale}reset(){this._update("reset")}_destroy(){const e=this._cachedMeta;this._data&&Dl(this._data,this),e._stacked&&ii(e)}_dataCheck(){const e=this.getDataset(),t=e.data||(e.data=[]),i=this._data;if(Y(t)){const s=this._cachedMeta;this._data=zE(t,s)}else if(i!==t){if(i){Dl(i,this);const s=this._cachedMeta;ii(s),s._parsed=[]}t&&Object.isExtensible(t)&&q0(t,this),this._syncList=[],this._data=t}}addElements(){const e=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(e.dataset=new this.datasetElementType)}buildOrUpdateElements(e){const t=this._cachedMeta,i=this.getDataset();let s=!1;this._dataCheck();const r=t._stacked;t._stacked=ro(t.vScale,t),t.stack!==i.stack&&(s=!0,ii(t),t.stack=i.stack),this._resyncElements(e),(s||r!==t._stacked)&&(Kl(this,t._parsed),t._stacked=ro(t.vScale,t))}configure(){const e=this.chart.config,t=e.datasetScopeKeys(this._type),i=e.getOptionScopes(this.getDataset(),t,!0);this.options=e.createResolver(i,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(e,t){const{_cachedMeta:i,_data:s}=this,{iScale:r,_stacked:o}=i,a=r.axis;let c=e===0&&t===s.length?!0:i._sorted,l=e>0&&i._parsed[e-1],h,d,u;if(this._parsing===!1)i._parsed=s,i._sorted=!0,u=s;else{ke(s[e])?u=this.parseArrayData(i,s,e,t):Y(s[e])?u=this.parseObjectData(i,s,e,t):u=this.parsePrimitiveData(i,s,e,t);const f=()=>d[a]===null||l&&d[a]<l[a];for(h=0;h<t;++h)i._parsed[h+e]=d=u[h],c&&(f()&&(c=!1),l=d);i._sorted=c}o&&Kl(this,u)}parsePrimitiveData(e,t,i,s){const{iScale:r,vScale:o}=e,a=r.axis,c=o.axis,l=r.getLabels(),h=r===o,d=new Array(s);let u,f,p;for(u=0,f=s;u<f;++u)p=u+i,d[u]={[a]:h||r.parse(l[p],p),[c]:o.parse(t[p],p)};return d}parseArrayData(e,t,i,s){const{xScale:r,yScale:o}=e,a=new Array(s);let c,l,h,d;for(c=0,l=s;c<l;++c)h=c+i,d=t[h],a[c]={x:r.parse(d[0],h),y:o.parse(d[1],h)};return a}parseObjectData(e,t,i,s){const{xScale:r,yScale:o}=e,{xAxisKey:a="x",yAxisKey:c="y"}=this._parsing,l=new Array(s);let h,d,u,f;for(h=0,d=s;h<d;++h)u=h+i,f=t[u],l[h]={x:r.parse(ji(f,a),u),y:o.parse(ji(f,c),u)};return l}getParsed(e){return this._cachedMeta._parsed[e]}getDataElement(e){return this._cachedMeta.data[e]}applyStack(e,t,i){const s=this.chart,r=this._cachedMeta,o=t[e.axis],a={keys:kf(s,!0),values:t._stacks[e.axis]._visualValues};return Gl(a,o,r.index,{mode:i})}updateRangeFromParsed(e,t,i,s){const r=i[t.axis];let o=r===null?NaN:r;const a=s&&i._stacks[t.axis];s&&a&&(s.values=a,o=Gl(s,r,this._cachedMeta.index)),e.min=Math.min(e.min,o),e.max=Math.max(e.max,o)}getMinMax(e,t){const i=this._cachedMeta,s=i._parsed,r=i._sorted&&e===i.iScale,o=s.length,a=this._getOtherScale(e),c=KE(t,i,this.chart),l={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:h,max:d}=jE(a);let u,f;function p(){f=s[u];const _=f[a.axis];return!St(f[e.axis])||h>_||d<_}for(u=0;u<o&&!(!p()&&(this.updateRangeFromParsed(l,e,f,c),r));++u);if(r){for(u=o-1;u>=0;--u)if(!p()){this.updateRangeFromParsed(l,e,f,c);break}}return l}getAllParsedValues(e){const t=this._cachedMeta._parsed,i=[];let s,r,o;for(s=0,r=t.length;s<r;++s)o=t[s][e.axis],St(o)&&i.push(o);return i}getMaxOverflow(){return!1}getLabelAndValue(e){const t=this._cachedMeta,i=t.iScale,s=t.vScale,r=this.getParsed(e);return{label:i?""+i.getLabelForValue(r[i.axis]):"",value:s?""+s.getLabelForValue(r[s.axis]):""}}_update(e){const t=this._cachedMeta;this.update(e||"default"),t._clip=$E(Q(this.options.clip,WE(t.xScale,t.yScale,this.getMaxOverflow())))}update(e){}draw(){const e=this._ctx,t=this.chart,i=this._cachedMeta,s=i.data||[],r=t.chartArea,o=[],a=this._drawStart||0,c=this._drawCount||s.length-a,l=this.options.drawActiveElementsOnTop;let h;for(i.dataset&&i.dataset.draw(e,r,a,c),h=a;h<a+c;++h){const d=s[h];d.hidden||(d.active&&l?o.push(d):d.draw(e,r))}for(h=0;h<o.length;++h)o[h].draw(e,r)}getStyle(e,t){const i=t?"active":"default";return e===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(i):this.resolveDataElementOptions(e||0,i)}getContext(e,t,i){const s=this.getDataset();let r;if(e>=0&&e<this._cachedMeta.data.length){const o=this._cachedMeta.data[e];r=o.$context||(o.$context=YE(this.getContext(),e,o)),r.parsed=this.getParsed(e),r.raw=s.data[e],r.index=r.dataIndex=e}else r=this.$context||(this.$context=GE(this.chart.getContext(),this.index)),r.dataset=s,r.index=r.datasetIndex=this.index;return r.active=!!t,r.mode=i,r}resolveDatasetElementOptions(e){return this._resolveElementOptions(this.datasetElementType.id,e)}resolveDataElementOptions(e,t){return this._resolveElementOptions(this.dataElementType.id,t,e)}_resolveElementOptions(e,t="default",i){const s=t==="active",r=this._cachedDataOpts,o=e+"-"+t,a=r[o],c=this.enableOptionSharing&&ar(i);if(a)return Xl(a,c);const l=this.chart.config,h=l.datasetElementScopeKeys(this._type,e),d=s?[`${e}Hover`,"hover",e,""]:[e,""],u=l.getOptionScopes(this.getDataset(),h),f=Object.keys(ge.elements[e]),p=()=>this.getContext(i,s,t),_=l.resolveNamedOptions(u,f,p,d);return _.$shared&&(_.$shared=c,r[o]=Object.freeze(Xl(_,c))),_}_resolveAnimations(e,t,i){const s=this.chart,r=this._cachedDataOpts,o=`animation-${t}`,a=r[o];if(a)return a;let c;if(s.options.animation!==!1){const h=this.chart.config,d=h.datasetAnimationScopeKeys(this._type,t),u=h.getOptionScopes(this.getDataset(),d);c=h.createResolver(u,this.getContext(e,i,t))}const l=new Tf(s,c&&c.animations);return c&&c._cacheable&&(r[o]=Object.freeze(l)),l}getSharedOptions(e){if(e.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},e))}includeOptions(e,t){return!t||ao(e)||this.chart._animationsDisabled}_getSharedOptions(e,t){const i=this.resolveDataElementOptions(e,t),s=this._sharedOptions,r=this.getSharedOptions(i),o=this.includeOptions(t,r)||r!==s;return this.updateSharedOptions(r,t,i),{sharedOptions:r,includeOptions:o}}updateElement(e,t,i,s){ao(s)?Object.assign(e,i):this._resolveAnimations(t,s).update(e,i)}updateSharedOptions(e,t,i){e&&!ao(t)&&this._resolveAnimations(void 0,t).update(e,i)}_setStyle(e,t,i,s){e.active=s;const r=this.getStyle(t,s);this._resolveAnimations(t,i,s).update(e,{options:!s&&this.getSharedOptions(r)||r})}removeHoverStyle(e,t,i){this._setStyle(e,i,"active",!1)}setHoverStyle(e,t,i){this._setStyle(e,i,"active",!0)}_removeDatasetHoverStyle(){const e=this._cachedMeta.dataset;e&&this._setStyle(e,void 0,"active",!1)}_setDatasetHoverStyle(){const e=this._cachedMeta.dataset;e&&this._setStyle(e,void 0,"active",!0)}_resyncElements(e){const t=this._data,i=this._cachedMeta.data;for(const[a,c,l]of this._syncList)this[a](c,l);this._syncList=[];const s=i.length,r=t.length,o=Math.min(r,s);o&&this.parse(0,o),r>s?this._insertElements(s,r-s,e):r<s&&this._removeElements(r,s-r)}_insertElements(e,t,i=!0){const s=this._cachedMeta,r=s.data,o=e+t;let a;const c=l=>{for(l.length+=t,a=l.length-1;a>=o;a--)l[a]=l[a-t]};for(c(r),a=e;a<o;++a)r[a]=new this.dataElementType;this._parsing&&c(s._parsed),this.parse(e,t),i&&this.updateElements(r,e,t,"reset")}updateElements(e,t,i,s){}_removeElements(e,t){const i=this._cachedMeta;if(this._parsing){const s=i._parsed.splice(e,t);i._stacked&&ii(i,s)}i.data.splice(e,t)}_sync(e){if(this._parsing)this._syncList.push(e);else{const[t,i,s]=e;this[t](i,s)}this.chart._dataChanges.push([this.index,...e])}_onDataPush(){const e=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-e,e])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(e,t){t&&this._sync(["_removeElements",e,t]);const i=arguments.length-2;i&&this._sync(["_insertElements",e,i])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}function XE(n,e,t){let i=1,s=1,r=0,o=0;if(e<me){const a=n,c=a+e,l=Math.cos(a),h=Math.sin(a),d=Math.cos(c),u=Math.sin(c),f=(E,I,T)=>hr(E,a,c,!0)?1:Math.max(I,I*t,T,T*t),p=(E,I,T)=>hr(E,a,c,!0)?-1:Math.min(I,I*t,T,T*t),_=f(0,l,d),m=f(be,h,u),v=p(ce,l,d),b=p(ce+be,h,u);i=(_-v)/2,s=(m-b)/2,r=-(_+v)/2,o=-(m+b)/2}return{ratioX:i,ratioY:s,offsetX:r,offsetY:o}}class QE extends xf{static id="doughnut";static defaults={datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"};static descriptors={_scriptable:e=>e!=="spacing",_indexable:e=>e!=="spacing"&&!e.startsWith("borderDash")&&!e.startsWith("hoverBorderDash")};static overrides={aspectRatio:1,plugins:{legend:{labels:{generateLabels(e){const t=e.data;if(t.labels.length&&t.datasets.length){const{labels:{pointStyle:i,color:s}}=e.legend.options;return t.labels.map((r,o)=>{const c=e.getDatasetMeta(0).controller.getStyle(o);return{text:r,fillStyle:c.backgroundColor,strokeStyle:c.borderColor,fontColor:s,lineWidth:c.borderWidth,pointStyle:i,hidden:!e.getDataVisibility(o),index:o}})}return[]}},onClick(e,t,i){i.chart.toggleDataVisibility(t.index),i.chart.update()}}}};constructor(e,t){super(e,t),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(e,t){const i=this.getDataset().data,s=this._cachedMeta;if(this._parsing===!1)s._parsed=i;else{let r=c=>+i[c];if(Y(i[e])){const{key:c="value"}=this._parsing;r=l=>+ji(i[l],c)}let o,a;for(o=e,a=e+t;o<a;++o)s._parsed[o]=r(o)}}_getRotation(){return cn(this.options.rotation-90)}_getCircumference(){return cn(this.options.circumference)}_getRotationExtents(){let e=me,t=-me;for(let i=0;i<this.chart.data.datasets.length;++i)if(this.chart.isDatasetVisible(i)&&this.chart.getDatasetMeta(i).type===this._type){const s=this.chart.getDatasetMeta(i).controller,r=s._getRotation(),o=s._getCircumference();e=Math.min(e,r),t=Math.max(t,r+o)}return{rotation:e,circumference:t-e}}update(e){const t=this.chart,{chartArea:i}=t,s=this._cachedMeta,r=s.data,o=this.getMaxBorderWidth()+this.getMaxOffset(r)+this.options.spacing,a=Math.max((Math.min(i.width,i.height)-o)/2,0),c=Math.min(M0(this.options.cutout,a),1),l=this._getRingWeight(this.index),{circumference:h,rotation:d}=this._getRotationExtents(),{ratioX:u,ratioY:f,offsetX:p,offsetY:_}=XE(d,h,c),m=(i.width-o)/u,v=(i.height-o)/f,b=Math.max(Math.min(m,v)/2,0),E=hf(this.options.radius,b),I=Math.max(E*c,0),T=(E-I)/this._getVisibleDatasetWeightTotal();this.offsetX=p*E,this.offsetY=_*E,s.total=this.calculateTotal(),this.outerRadius=E-T*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-T*l,0),this.updateElements(r,0,r.length,e)}_circumference(e,t){const i=this.options,s=this._cachedMeta,r=this._getCircumference();return t&&i.animation.animateRotate||!this.chart.getDataVisibility(e)||s._parsed[e]===null||s.data[e].hidden?0:this.calculateCircumference(s._parsed[e]*r/me)}updateElements(e,t,i,s){const r=s==="reset",o=this.chart,a=o.chartArea,l=o.options.animation,h=(a.left+a.right)/2,d=(a.top+a.bottom)/2,u=r&&l.animateScale,f=u?0:this.innerRadius,p=u?0:this.outerRadius,{sharedOptions:_,includeOptions:m}=this._getSharedOptions(t,s);let v=this._getRotation(),b;for(b=0;b<t;++b)v+=this._circumference(b,r);for(b=t;b<t+i;++b){const E=this._circumference(b,r),I=e[b],T={x:h+this.offsetX,y:d+this.offsetY,startAngle:v,endAngle:v+E,circumference:E,outerRadius:p,innerRadius:f};m&&(T.options=_||this.resolveDataElementOptions(b,I.active?"active":s)),v+=E,this.updateElement(I,b,T,s)}}calculateTotal(){const e=this._cachedMeta,t=e.data;let i=0,s;for(s=0;s<t.length;s++){const r=e._parsed[s];r!==null&&!isNaN(r)&&this.chart.getDataVisibility(s)&&!t[s].hidden&&(i+=Math.abs(r))}return i}calculateCircumference(e){const t=this._cachedMeta.total;return t>0&&!isNaN(e)?me*(Math.abs(e)/t):0}getLabelAndValue(e){const t=this._cachedMeta,i=this.chart,s=i.data.labels||[],r=tE(t._parsed[e],i.options.locale);return{label:s[e]||"",value:r}}getMaxBorderWidth(e){let t=0;const i=this.chart;let s,r,o,a,c;if(!e){for(s=0,r=i.data.datasets.length;s<r;++s)if(i.isDatasetVisible(s)){o=i.getDatasetMeta(s),e=o.data,a=o.controller;break}}if(!e)return 0;for(s=0,r=e.length;s<r;++s)c=a.resolveDataElementOptions(s),c.borderAlign!=="inner"&&(t=Math.max(t,c.borderWidth||0,c.hoverBorderWidth||0));return t}getMaxOffset(e){let t=0;for(let i=0,s=e.length;i<s;++i){const r=this.resolveDataElementOptions(i);t=Math.max(t,r.offset||0,r.hoverOffset||0)}return t}_getRingWeightOffset(e){let t=0;for(let i=0;i<e;++i)this.chart.isDatasetVisible(i)&&(t+=this._getRingWeight(i));return t}_getRingWeight(e){return Math.max(Q(this.chart.data.datasets[e].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}function tn(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class Za{static override(e){Object.assign(Za.prototype,e)}options;constructor(e){this.options=e||{}}init(){}formats(){return tn()}parse(){return tn()}format(){return tn()}add(){return tn()}diff(){return tn()}startOf(){return tn()}endOf(){return tn()}}var JE={_date:Za};function ZE(n,e,t,i){const{controller:s,data:r,_sorted:o}=n,a=s._cachedMeta.iScale,c=n.dataset&&n.dataset.options?n.dataset.options.spanGaps:null;if(a&&e===a.axis&&e!=="r"&&o&&r.length){const l=a._reversePixels?V0:Fo;if(i){if(s._sharedOptions){const h=r[0],d=typeof h.getRange=="function"&&h.getRange(e);if(d){const u=l(r,e,t-d),f=l(r,e,t+d);return{lo:u.lo,hi:f.hi}}}}else{const h=l(r,e,t);if(c){const{vScale:d}=s._cachedMeta,{_parsed:u}=n,f=u.slice(0,h.lo+1).reverse().findIndex(_=>!Pe(_[d.axis]));h.lo-=Math.max(0,f);const p=u.slice(h.hi).findIndex(_=>!Pe(_[d.axis]));h.hi+=Math.max(0,p)}return h}}return{lo:0,hi:r.length-1}}function Pr(n,e,t,i,s){const r=n.getSortedVisibleDatasetMetas(),o=t[e];for(let a=0,c=r.length;a<c;++a){const{index:l,data:h}=r[a],{lo:d,hi:u}=ZE(r[a],e,o,s);for(let f=d;f<=u;++f){const p=h[f];p.skip||i(p,l,f)}}}function eC(n){const e=n.indexOf("x")!==-1,t=n.indexOf("y")!==-1;return function(i,s){const r=e?Math.abs(i.x-s.x):0,o=t?Math.abs(i.y-s.y):0;return Math.sqrt(Math.pow(r,2)+Math.pow(o,2))}}function co(n,e,t,i,s){const r=[];return!s&&!n.isPointInArea(e)||Pr(n,t,e,function(a,c,l){!s&&!vf(a,n.chartArea,0)||a.inRange(e.x,e.y,i)&&r.push({element:a,datasetIndex:c,index:l})},!0),r}function tC(n,e,t,i){let s=[];function r(o,a,c){const{startAngle:l,endAngle:h}=o.getProps(["startAngle","endAngle"],i),{angle:d}=uf(o,{x:e.x,y:e.y});hr(d,l,h)&&s.push({element:o,datasetIndex:a,index:c})}return Pr(n,t,e,r),s}function nC(n,e,t,i,s,r){let o=[];const a=eC(t);let c=Number.POSITIVE_INFINITY;function l(h,d,u){const f=h.inRange(e.x,e.y,s);if(i&&!f)return;const p=h.getCenterPoint(s);if(!(!!r||n.isPointInArea(p))&&!f)return;const m=a(e,p);m<c?(o=[{element:h,datasetIndex:d,index:u}],c=m):m===c&&o.push({element:h,datasetIndex:d,index:u})}return Pr(n,t,e,l),o}function lo(n,e,t,i,s,r){return!r&&!n.isPointInArea(e)?[]:t==="r"&&!i?tC(n,e,t,s):nC(n,e,t,i,s,r)}function Ql(n,e,t,i,s){const r=[],o=t==="x"?"inXRange":"inYRange";let a=!1;return Pr(n,t,e,(c,l,h)=>{c[o]&&c[o](e[t],s)&&(r.push({element:c,datasetIndex:l,index:h}),a=a||c.inRange(e.x,e.y,s))}),i&&!a?[]:r}var iC={modes:{index(n,e,t,i){const s=rn(e,n),r=t.axis||"x",o=t.includeInvisible||!1,a=t.intersect?co(n,s,r,i,o):lo(n,s,r,!1,i,o),c=[];return a.length?(n.getSortedVisibleDatasetMetas().forEach(l=>{const h=a[0].index,d=l.data[h];d&&!d.skip&&c.push({element:d,datasetIndex:l.index,index:h})}),c):[]},dataset(n,e,t,i){const s=rn(e,n),r=t.axis||"xy",o=t.includeInvisible||!1;let a=t.intersect?co(n,s,r,i,o):lo(n,s,r,!1,i,o);if(a.length>0){const c=a[0].datasetIndex,l=n.getDatasetMeta(c).data;a=[];for(let h=0;h<l.length;++h)a.push({element:l[h],datasetIndex:c,index:h})}return a},point(n,e,t,i){const s=rn(e,n),r=t.axis||"xy",o=t.includeInvisible||!1;return co(n,s,r,i,o)},nearest(n,e,t,i){const s=rn(e,n),r=t.axis||"xy",o=t.includeInvisible||!1;return lo(n,s,r,t.intersect,i,o)},x(n,e,t,i){const s=rn(e,n);return Ql(n,s,"x",t.intersect,i)},y(n,e,t,i){const s=rn(e,n);return Ql(n,s,"y",t.intersect,i)}}};const Af=["left","top","right","bottom"];function si(n,e){return n.filter(t=>t.pos===e)}function Jl(n,e){return n.filter(t=>Af.indexOf(t.pos)===-1&&t.box.axis===e)}function ri(n,e){return n.sort((t,i)=>{const s=e?i:t,r=e?t:i;return s.weight===r.weight?s.index-r.index:s.weight-r.weight})}function sC(n){const e=[];let t,i,s,r,o,a;for(t=0,i=(n||[]).length;t<i;++t)s=n[t],{position:r,options:{stack:o,stackWeight:a=1}}=s,e.push({index:t,box:s,pos:r,horizontal:s.isHorizontal(),weight:s.weight,stack:o&&r+o,stackWeight:a});return e}function rC(n){const e={};for(const t of n){const{stack:i,pos:s,stackWeight:r}=t;if(!i||!Af.includes(s))continue;const o=e[i]||(e[i]={count:0,placed:0,weight:0,size:0});o.count++,o.weight+=r}return e}function oC(n,e){const t=rC(n),{vBoxMaxWidth:i,hBoxMaxHeight:s}=e;let r,o,a;for(r=0,o=n.length;r<o;++r){a=n[r];const{fullSize:c}=a.box,l=t[a.stack],h=l&&a.stackWeight/l.weight;a.horizontal?(a.width=h?h*i:c&&e.availableWidth,a.height=s):(a.width=i,a.height=h?h*s:c&&e.availableHeight)}return t}function aC(n){const e=sC(n),t=ri(e.filter(l=>l.box.fullSize),!0),i=ri(si(e,"left"),!0),s=ri(si(e,"right")),r=ri(si(e,"top"),!0),o=ri(si(e,"bottom")),a=Jl(e,"x"),c=Jl(e,"y");return{fullSize:t,leftAndTop:i.concat(r),rightAndBottom:s.concat(c).concat(o).concat(a),chartArea:si(e,"chartArea"),vertical:i.concat(s).concat(c),horizontal:r.concat(o).concat(a)}}function Zl(n,e,t,i){return Math.max(n[t],e[t])+Math.max(n[i],e[i])}function Rf(n,e){n.top=Math.max(n.top,e.top),n.left=Math.max(n.left,e.left),n.bottom=Math.max(n.bottom,e.bottom),n.right=Math.max(n.right,e.right)}function cC(n,e,t,i){const{pos:s,box:r}=t,o=n.maxPadding;if(!Y(s)){t.size&&(n[s]-=t.size);const d=i[t.stack]||{size:0,count:1};d.size=Math.max(d.size,t.horizontal?r.height:r.width),t.size=d.size/d.count,n[s]+=t.size}r.getPadding&&Rf(o,r.getPadding());const a=Math.max(0,e.outerWidth-Zl(o,n,"left","right")),c=Math.max(0,e.outerHeight-Zl(o,n,"top","bottom")),l=a!==n.w,h=c!==n.h;return n.w=a,n.h=c,t.horizontal?{same:l,other:h}:{same:h,other:l}}function lC(n){const e=n.maxPadding;function t(i){const s=Math.max(e[i]-n[i],0);return n[i]+=s,s}n.y+=t("top"),n.x+=t("left"),t("right"),t("bottom")}function hC(n,e){const t=e.maxPadding;function i(s){const r={left:0,top:0,right:0,bottom:0};return s.forEach(o=>{r[o]=Math.max(e[o],t[o])}),r}return i(n?["left","right"]:["top","bottom"])}function pi(n,e,t,i){const s=[];let r,o,a,c,l,h;for(r=0,o=n.length,l=0;r<o;++r){a=n[r],c=a.box,c.update(a.width||e.w,a.height||e.h,hC(a.horizontal,e));const{same:d,other:u}=cC(e,t,a,i);l|=d&&s.length,h=h||u,c.fullSize||s.push(a)}return l&&pi(s,e,t,i)||h}function ws(n,e,t,i,s){n.top=t,n.left=e,n.right=e+i,n.bottom=t+s,n.width=i,n.height=s}function eh(n,e,t,i){const s=t.padding;let{x:r,y:o}=e;for(const a of n){const c=a.box,l=i[a.stack]||{placed:0,weight:1},h=a.stackWeight/l.weight||1;if(a.horizontal){const d=e.w*h,u=l.size||c.height;ar(l.start)&&(o=l.start),c.fullSize?ws(c,s.left,o,t.outerWidth-s.right-s.left,u):ws(c,e.left+l.placed,o,d,u),l.start=o,l.placed+=d,o=c.bottom}else{const d=e.h*h,u=l.size||c.width;ar(l.start)&&(r=l.start),c.fullSize?ws(c,r,s.top,u,t.outerHeight-s.bottom-s.top):ws(c,r,e.top+l.placed,u,d),l.start=r,l.placed+=d,r=c.right}}e.x=r,e.y=o}var Nt={addBox(n,e){n.boxes||(n.boxes=[]),e.fullSize=e.fullSize||!1,e.position=e.position||"top",e.weight=e.weight||0,e._layers=e._layers||function(){return[{z:0,draw(t){e.draw(t)}}]},n.boxes.push(e)},removeBox(n,e){const t=n.boxes?n.boxes.indexOf(e):-1;t!==-1&&n.boxes.splice(t,1)},configure(n,e,t){e.fullSize=t.fullSize,e.position=t.position,e.weight=t.weight},update(n,e,t,i){if(!n)return;const s=tt(n.options.layout.padding),r=Math.max(e-s.width,0),o=Math.max(t-s.height,0),a=aC(n.boxes),c=a.vertical,l=a.horizontal;X(n.boxes,_=>{typeof _.beforeLayout=="function"&&_.beforeLayout()});const h=c.reduce((_,m)=>m.box.options&&m.box.options.display===!1?_:_+1,0)||1,d=Object.freeze({outerWidth:e,outerHeight:t,padding:s,availableWidth:r,availableHeight:o,vBoxMaxWidth:r/2/h,hBoxMaxHeight:o/2}),u=Object.assign({},s);Rf(u,tt(i));const f=Object.assign({maxPadding:u,w:r,h:o,x:s.left,y:s.top},s),p=oC(c.concat(l),d);pi(a.fullSize,f,d,p),pi(c,f,d,p),pi(l,f,d,p)&&pi(c,f,d,p),lC(f),eh(a.leftAndTop,f,d,p),f.x+=f.w,f.y+=f.h,eh(a.rightAndBottom,f,d,p),n.chartArea={left:f.left,top:f.top,right:f.left+f.w,bottom:f.top+f.h,height:f.h,width:f.w},X(a.chartArea,_=>{const m=_.box;Object.assign(m,n.chartArea),m.update(f.w,f.h,{left:0,top:0,right:0,bottom:0})})}};class Pf{acquireContext(e,t){}releaseContext(e){return!1}addEventListener(e,t,i){}removeEventListener(e,t,i){}getDevicePixelRatio(){return 1}getMaximumSize(e,t,i,s){return t=Math.max(0,t||e.width),i=i||e.height,{width:t,height:Math.max(0,s?Math.floor(t/s):i)}}isAttached(e){return!0}updateConfig(e){}}class dC extends Pf{acquireContext(e){return e&&e.getContext&&e.getContext("2d")||null}updateConfig(e){e.options.animation=!1}}const Os="$chartjs",uC={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},th=n=>n===null||n==="";function fC(n,e){const t=n.style,i=n.getAttribute("height"),s=n.getAttribute("width");if(n[Os]={initial:{height:i,width:s,style:{display:t.display,height:t.height,width:t.width}}},t.display=t.display||"block",t.boxSizing=t.boxSizing||"border-box",th(s)){const r=Vl(n,"width");r!==void 0&&(n.width=r)}if(th(i))if(n.style.height==="")n.height=n.width/(e||2);else{const r=Vl(n,"height");r!==void 0&&(n.height=r)}return n}const Mf=PE?{passive:!0}:!1;function pC(n,e,t){n&&n.addEventListener(e,t,Mf)}function gC(n,e,t){n&&n.canvas&&n.canvas.removeEventListener(e,t,Mf)}function mC(n,e){const t=uC[n.type]||n.type,{x:i,y:s}=rn(n,e);return{type:t,chart:e,native:n,x:i!==void 0?i:null,y:s!==void 0?s:null}}function fr(n,e){for(const t of n)if(t===e||t.contains(e))return!0}function _C(n,e,t){const i=n.canvas,s=new MutationObserver(r=>{let o=!1;for(const a of r)o=o||fr(a.addedNodes,i),o=o&&!fr(a.removedNodes,i);o&&t()});return s.observe(document,{childList:!0,subtree:!0}),s}function yC(n,e,t){const i=n.canvas,s=new MutationObserver(r=>{let o=!1;for(const a of r)o=o||fr(a.removedNodes,i),o=o&&!fr(a.addedNodes,i);o&&t()});return s.observe(document,{childList:!0,subtree:!0}),s}const qi=new Map;let nh=0;function Df(){const n=window.devicePixelRatio;n!==nh&&(nh=n,qi.forEach((e,t)=>{t.currentDevicePixelRatio!==n&&e()}))}function vC(n,e){qi.size||window.addEventListener("resize",Df),qi.set(n,e)}function bC(n){qi.delete(n),qi.size||window.removeEventListener("resize",Df)}function wC(n,e,t){const i=n.canvas,s=i&&Ja(i);if(!s)return;const r=gf((a,c)=>{const l=s.clientWidth;t(a,c),l<s.clientWidth&&t()},window),o=new ResizeObserver(a=>{const c=a[0],l=c.contentRect.width,h=c.contentRect.height;l===0&&h===0||r(l,h)});return o.observe(s),vC(n,r),o}function ho(n,e,t){t&&t.disconnect(),e==="resize"&&bC(n)}function EC(n,e,t){const i=n.canvas,s=gf(r=>{n.ctx!==null&&t(mC(r,n))},n);return pC(i,e,s),s}class CC extends Pf{acquireContext(e,t){const i=e&&e.getContext&&e.getContext("2d");return i&&i.canvas===e?(fC(e,t),i):null}releaseContext(e){const t=e.canvas;if(!t[Os])return!1;const i=t[Os].initial;["height","width"].forEach(r=>{const o=i[r];Pe(o)?t.removeAttribute(r):t.setAttribute(r,o)});const s=i.style||{};return Object.keys(s).forEach(r=>{t.style[r]=s[r]}),t.width=t.width,delete t[Os],!0}addEventListener(e,t,i){this.removeEventListener(e,t);const s=e.$proxies||(e.$proxies={}),o={attach:_C,detach:yC,resize:wC}[t]||EC;s[t]=o(e,t,i)}removeEventListener(e,t){const i=e.$proxies||(e.$proxies={}),s=i[t];if(!s)return;({attach:ho,detach:ho,resize:ho}[t]||gC)(e,t,s),i[t]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(e,t,i,s){return RE(e,t,i,s)}isAttached(e){const t=e&&Ja(e);return!!(t&&t.isConnected)}}function IC(n){return!Qa()||typeof OffscreenCanvas<"u"&&n instanceof OffscreenCanvas?dC:CC}class as{static defaults={};static defaultRoutes=void 0;x;y;active=!1;options;$animations;tooltipPosition(e){const{x:t,y:i}=this.getProps(["x","y"],e);return{x:t,y:i}}hasValue(){return lr(this.x)&&lr(this.y)}getProps(e,t){const i=this.$animations;if(!t||!i)return this;const s={};return e.forEach(r=>{s[r]=i[r]&&i[r].active()?i[r]._to:this[r]}),s}}function SC(n,e){const t=n.options.ticks,i=TC(n),s=Math.min(t.maxTicksLimit||i,i),r=t.major.enabled?xC(e):[],o=r.length,a=r[0],c=r[o-1],l=[];if(o>s)return AC(e,l,r,o/s),l;const h=kC(r,e,s);if(o>0){let d,u;const f=o>1?Math.round((c-a)/(o-1)):null;for(Es(e,l,h,Pe(f)?0:a-f,a),d=0,u=o-1;d<u;d++)Es(e,l,h,r[d],r[d+1]);return Es(e,l,h,c,Pe(f)?e.length:c+f),l}return Es(e,l,h),l}function TC(n){const e=n.options.offset,t=n._tickSize(),i=n._length/t+(e?0:1),s=n._maxLength/t;return Math.floor(Math.min(i,s))}function kC(n,e,t){const i=RC(n),s=e.length/t;if(!i)return Math.max(s,1);const r=U0(i);for(let o=0,a=r.length-1;o<a;o++){const c=r[o];if(c>s)return c}return Math.max(s,1)}function xC(n){const e=[];let t,i;for(t=0,i=n.length;t<i;t++)n[t].major&&e.push(t);return e}function AC(n,e,t,i){let s=0,r=t[0],o;for(i=Math.ceil(i),o=0;o<n.length;o++)o===r&&(e.push(n[o]),s++,r=t[s*i])}function Es(n,e,t,i,s){const r=Q(i,0),o=Math.min(Q(s,n.length),n.length);let a=0,c,l,h;for(t=Math.ceil(t),s&&(c=s-i,t=c/Math.floor(c/t)),h=r;h<0;)a++,h=Math.round(r+a*t);for(l=Math.max(r,0);l<o;l++)l===h&&(e.push(n[l]),a++,h=Math.round(r+a*t))}function RC(n){const e=n.length;let t,i;if(e<2)return!1;for(i=n[0],t=1;t<e;++t)if(n[t]-n[t-1]!==i)return!1;return i}const PC=n=>n==="left"?"right":n==="right"?"left":n,ih=(n,e,t)=>e==="top"||e==="left"?n[e]+t:n[e]-t,sh=(n,e)=>Math.min(e||n,n);function rh(n,e){const t=[],i=n.length/e,s=n.length;let r=0;for(;r<s;r+=i)t.push(n[Math.floor(r)]);return t}function MC(n,e,t){const i=n.ticks.length,s=Math.min(e,i-1),r=n._startPixel,o=n._endPixel,a=1e-6;let c=n.getPixelForTick(s),l;if(!(t&&(i===1?l=Math.max(c-r,o-c):e===0?l=(n.getPixelForTick(1)-c)/2:l=(c-n.getPixelForTick(s-1))/2,c+=s<e?l:-l,c<r-a||c>o+a)))return c}function DC(n,e){X(n,t=>{const i=t.gc,s=i.length/2;let r;if(s>e){for(r=0;r<s;++r)delete t.data[i[r]];i.splice(0,s)}})}function oi(n){return n.drawTicks?n.tickLength:0}function oh(n,e){if(!n.display)return 0;const t=Ue(n.font,e),i=tt(n.padding);return(ke(n.text)?n.text.length:1)*t.lineHeight+i.height}function OC(n,e){return Qn(n,{scale:e,type:"scale"})}function NC(n,e,t){return Qn(n,{tick:t,index:e,type:"tick"})}function LC(n,e,t){let i=mf(n);return(t&&e!=="right"||!t&&e==="right")&&(i=PC(i)),i}function FC(n,e,t,i){const{top:s,left:r,bottom:o,right:a,chart:c}=n,{chartArea:l,scales:h}=c;let d=0,u,f,p;const _=o-s,m=a-r;if(n.isHorizontal()){if(f=ze(i,r,a),Y(t)){const v=Object.keys(t)[0],b=t[v];p=h[v].getPixelForValue(b)+_-e}else t==="center"?p=(l.bottom+l.top)/2+_-e:p=ih(n,t,e);u=a-r}else{if(Y(t)){const v=Object.keys(t)[0],b=t[v];f=h[v].getPixelForValue(b)-m+e}else t==="center"?f=(l.left+l.right)/2-m+e:f=ih(n,t,e);p=ze(i,o,s),d=t==="left"?-be:be}return{titleX:f,titleY:p,maxWidth:u,rotation:d}}class Mr extends as{constructor(e){super(),this.id=e.id,this.type=e.type,this.options=void 0,this.ctx=e.ctx,this.chart=e.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(e){this.options=e.setContext(this.getContext()),this.axis=e.axis,this._userMin=this.parse(e.min),this._userMax=this.parse(e.max),this._suggestedMin=this.parse(e.suggestedMin),this._suggestedMax=this.parse(e.suggestedMax)}parse(e,t){return e}getUserBounds(){let{_userMin:e,_userMax:t,_suggestedMin:i,_suggestedMax:s}=this;return e=it(e,Number.POSITIVE_INFINITY),t=it(t,Number.NEGATIVE_INFINITY),i=it(i,Number.POSITIVE_INFINITY),s=it(s,Number.NEGATIVE_INFINITY),{min:it(e,i),max:it(t,s),minDefined:St(e),maxDefined:St(t)}}getMinMax(e){let{min:t,max:i,minDefined:s,maxDefined:r}=this.getUserBounds(),o;if(s&&r)return{min:t,max:i};const a=this.getMatchingVisibleMetas();for(let c=0,l=a.length;c<l;++c)o=a[c].controller.getMinMax(this,e),s||(t=Math.min(t,o.min)),r||(i=Math.max(i,o.max));return t=r&&t>i?i:t,i=s&&t>i?t:i,{min:it(t,it(i,t)),max:it(i,it(t,i))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const e=this.chart.data;return this.options.labels||(this.isHorizontal()?e.xLabels:e.yLabels)||e.labels||[]}getLabelItems(e=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(e))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){ae(this.options.beforeUpdate,[this])}update(e,t,i){const{beginAtZero:s,grace:r,ticks:o}=this.options,a=o.sampleSize;this.beforeUpdate(),this.maxWidth=e,this.maxHeight=t,this._margins=i=Object.assign({left:0,right:0,top:0,bottom:0},i),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+i.left+i.right:this.height+i.top+i.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=gE(this,r,s),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const c=a<this.ticks.length;this._convertTicksToLabels(c?rh(this.ticks,a):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),o.display&&(o.autoSkip||o.source==="auto")&&(this.ticks=SC(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),c&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let e=this.options.reverse,t,i;this.isHorizontal()?(t=this.left,i=this.right):(t=this.top,i=this.bottom,e=!e),this._startPixel=t,this._endPixel=i,this._reversePixels=e,this._length=i-t,this._alignToPixels=this.options.alignToPixels}afterUpdate(){ae(this.options.afterUpdate,[this])}beforeSetDimensions(){ae(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){ae(this.options.afterSetDimensions,[this])}_callHooks(e){this.chart.notifyPlugins(e,this.getContext()),ae(this.options[e],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){ae(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(e){const t=this.options.ticks;let i,s,r;for(i=0,s=e.length;i<s;i++)r=e[i],r.label=ae(t.callback,[r.value,i,e],this)}afterTickToLabelConversion(){ae(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){ae(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const e=this.options,t=e.ticks,i=sh(this.ticks.length,e.ticks.maxTicksLimit),s=t.minRotation||0,r=t.maxRotation;let o=s,a,c,l;if(!this._isVisible()||!t.display||s>=r||i<=1||!this.isHorizontal()){this.labelRotation=s;return}const h=this._getLabelSizes(),d=h.widest.width,u=h.highest.height,f=qe(this.chart.width-d,0,this.maxWidth);a=e.offset?this.maxWidth/i:f/(i-1),d+6>a&&(a=f/(i-(e.offset?.5:1)),c=this.maxHeight-oi(e.grid)-t.padding-oh(e.title,this.chart.options.font),l=Math.sqrt(d*d+u*u),o=W0(Math.min(Math.asin(qe((h.highest.height+6)/a,-1,1)),Math.asin(qe(c/l,-1,1))-Math.asin(qe(u/l,-1,1)))),o=Math.max(s,Math.min(r,o))),this.labelRotation=o}afterCalculateLabelRotation(){ae(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){ae(this.options.beforeFit,[this])}fit(){const e={width:0,height:0},{chart:t,options:{ticks:i,title:s,grid:r}}=this,o=this._isVisible(),a=this.isHorizontal();if(o){const c=oh(s,t.options.font);if(a?(e.width=this.maxWidth,e.height=oi(r)+c):(e.height=this.maxHeight,e.width=oi(r)+c),i.display&&this.ticks.length){const{first:l,last:h,widest:d,highest:u}=this._getLabelSizes(),f=i.padding*2,p=cn(this.labelRotation),_=Math.cos(p),m=Math.sin(p);if(a){const v=i.mirror?0:m*d.width+_*u.height;e.height=Math.min(this.maxHeight,e.height+v+f)}else{const v=i.mirror?0:_*d.width+m*u.height;e.width=Math.min(this.maxWidth,e.width+v+f)}this._calculatePadding(l,h,m,_)}}this._handleMargins(),a?(this.width=this._length=t.width-this._margins.left-this._margins.right,this.height=e.height):(this.width=e.width,this.height=this._length=t.height-this._margins.top-this._margins.bottom)}_calculatePadding(e,t,i,s){const{ticks:{align:r,padding:o},position:a}=this.options,c=this.labelRotation!==0,l=a!=="top"&&this.axis==="x";if(this.isHorizontal()){const h=this.getPixelForTick(0)-this.left,d=this.right-this.getPixelForTick(this.ticks.length-1);let u=0,f=0;c?l?(u=s*e.width,f=i*t.height):(u=i*e.height,f=s*t.width):r==="start"?f=t.width:r==="end"?u=e.width:r!=="inner"&&(u=e.width/2,f=t.width/2),this.paddingLeft=Math.max((u-h+o)*this.width/(this.width-h),0),this.paddingRight=Math.max((f-d+o)*this.width/(this.width-d),0)}else{let h=t.height/2,d=e.height/2;r==="start"?(h=0,d=e.height):r==="end"&&(h=t.height,d=0),this.paddingTop=h+o,this.paddingBottom=d+o}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){ae(this.options.afterFit,[this])}isHorizontal(){const{axis:e,position:t}=this.options;return t==="top"||t==="bottom"||e==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(e){this.beforeTickToLabelConversion(),this.generateTickLabels(e);let t,i;for(t=0,i=e.length;t<i;t++)Pe(e[t].label)&&(e.splice(t,1),i--,t--);this.afterTickToLabelConversion()}_getLabelSizes(){let e=this._labelSizes;if(!e){const t=this.options.ticks.sampleSize;let i=this.ticks;t<i.length&&(i=rh(i,t)),this._labelSizes=e=this._computeLabelSizes(i,i.length,this.options.ticks.maxTicksLimit)}return e}_computeLabelSizes(e,t,i){const{ctx:s,_longestTextCache:r}=this,o=[],a=[],c=Math.floor(t/sh(t,i));let l=0,h=0,d,u,f,p,_,m,v,b,E,I,T;for(d=0;d<t;d+=c){if(p=e[d].label,_=this._resolveTickFontOptions(d),s.font=m=_.string,v=r[m]=r[m]||{data:{},gc:[]},b=_.lineHeight,E=I=0,!Pe(p)&&!ke(p))E=Bl(s,v.data,v.gc,E,p),I=b;else if(ke(p))for(u=0,f=p.length;u<f;++u)T=p[u],!Pe(T)&&!ke(T)&&(E=Bl(s,v.data,v.gc,E,T),I+=b);o.push(E),a.push(I),l=Math.max(E,l),h=Math.max(I,h)}DC(r,t);const O=o.indexOf(l),$=a.indexOf(h),F=ee=>({width:o[ee]||0,height:a[ee]||0});return{first:F(0),last:F(t-1),widest:F(O),highest:F($),widths:o,heights:a}}getLabelForValue(e){return e}getPixelForValue(e,t){return NaN}getValueForPixel(e){}getPixelForTick(e){const t=this.ticks;return e<0||e>t.length-1?null:this.getPixelForValue(t[e].value)}getPixelForDecimal(e){this._reversePixels&&(e=1-e);const t=this._startPixel+e*this._length;return z0(this._alignToPixels?en(this.chart,t,0):t)}getDecimalForPixel(e){const t=(e-this._startPixel)/this._length;return this._reversePixels?1-t:t}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:e,max:t}=this;return e<0&&t<0?t:e>0&&t>0?e:0}getContext(e){const t=this.ticks||[];if(e>=0&&e<t.length){const i=t[e];return i.$context||(i.$context=NC(this.getContext(),e,i))}return this.$context||(this.$context=OC(this.chart.getContext(),this))}_tickSize(){const e=this.options.ticks,t=cn(this.labelRotation),i=Math.abs(Math.cos(t)),s=Math.abs(Math.sin(t)),r=this._getLabelSizes(),o=e.autoSkipPadding||0,a=r?r.widest.width+o:0,c=r?r.highest.height+o:0;return this.isHorizontal()?c*i>a*s?a/i:c/s:c*s<a*i?c/i:a/s}_isVisible(){const e=this.options.display;return e!=="auto"?!!e:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(e){const t=this.axis,i=this.chart,s=this.options,{grid:r,position:o,border:a}=s,c=r.offset,l=this.isHorizontal(),d=this.ticks.length+(c?1:0),u=oi(r),f=[],p=a.setContext(this.getContext()),_=p.display?p.width:0,m=_/2,v=function(te){return en(i,te,_)};let b,E,I,T,O,$,F,ee,z,K,V,_e;if(o==="top")b=v(this.bottom),$=this.bottom-u,ee=b-m,K=v(e.top)+m,_e=e.bottom;else if(o==="bottom")b=v(this.top),K=e.top,_e=v(e.bottom)-m,$=b+m,ee=this.top+u;else if(o==="left")b=v(this.right),O=this.right-u,F=b-m,z=v(e.left)+m,V=e.right;else if(o==="right")b=v(this.left),z=e.left,V=v(e.right)-m,O=b+m,F=this.left+u;else if(t==="x"){if(o==="center")b=v((e.top+e.bottom)/2+.5);else if(Y(o)){const te=Object.keys(o)[0],he=o[te];b=v(this.chart.scales[te].getPixelForValue(he))}K=e.top,_e=e.bottom,$=b+m,ee=$+u}else if(t==="y"){if(o==="center")b=v((e.left+e.right)/2);else if(Y(o)){const te=Object.keys(o)[0],he=o[te];b=v(this.chart.scales[te].getPixelForValue(he))}O=b-m,F=O-u,z=e.left,V=e.right}const Ae=Q(s.ticks.maxTicksLimit,d),q=Math.max(1,Math.ceil(d/Ae));for(E=0;E<d;E+=q){const te=this.getContext(E),he=r.setContext(te),$e=a.setContext(te),we=he.lineWidth,y=he.color,g=$e.dash||[],S=$e.dashOffset,k=he.tickWidth,R=he.tickColor,M=he.tickBorderDash||[],D=he.tickBorderDashOffset;I=MC(this,E,c),I!==void 0&&(T=en(i,I,we),l?O=F=z=V=T:$=ee=K=_e=T,f.push({tx1:O,ty1:$,tx2:F,ty2:ee,x1:z,y1:K,x2:V,y2:_e,width:we,color:y,borderDash:g,borderDashOffset:S,tickWidth:k,tickColor:R,tickBorderDash:M,tickBorderDashOffset:D}))}return this._ticksLength=d,this._borderValue=b,f}_computeLabelItems(e){const t=this.axis,i=this.options,{position:s,ticks:r}=i,o=this.isHorizontal(),a=this.ticks,{align:c,crossAlign:l,padding:h,mirror:d}=r,u=oi(i.grid),f=u+h,p=d?-h:f,_=-cn(this.labelRotation),m=[];let v,b,E,I,T,O,$,F,ee,z,K,V,_e="middle";if(s==="top")O=this.bottom-p,$=this._getXAxisLabelAlignment();else if(s==="bottom")O=this.top+p,$=this._getXAxisLabelAlignment();else if(s==="left"){const q=this._getYAxisLabelAlignment(u);$=q.textAlign,T=q.x}else if(s==="right"){const q=this._getYAxisLabelAlignment(u);$=q.textAlign,T=q.x}else if(t==="x"){if(s==="center")O=(e.top+e.bottom)/2+f;else if(Y(s)){const q=Object.keys(s)[0],te=s[q];O=this.chart.scales[q].getPixelForValue(te)+f}$=this._getXAxisLabelAlignment()}else if(t==="y"){if(s==="center")T=(e.left+e.right)/2-f;else if(Y(s)){const q=Object.keys(s)[0],te=s[q];T=this.chart.scales[q].getPixelForValue(te)}$=this._getYAxisLabelAlignment(u).textAlign}t==="y"&&(c==="start"?_e="top":c==="end"&&(_e="bottom"));const Ae=this._getLabelSizes();for(v=0,b=a.length;v<b;++v){E=a[v],I=E.label;const q=r.setContext(this.getContext(v));F=this.getPixelForTick(v)+r.labelOffset,ee=this._resolveTickFontOptions(v),z=ee.lineHeight,K=ke(I)?I.length:1;const te=K/2,he=q.color,$e=q.textStrokeColor,we=q.textStrokeWidth;let y=$;o?(T=F,$==="inner"&&(v===b-1?y=this.options.reverse?"left":"right":v===0?y=this.options.reverse?"right":"left":y="center"),s==="top"?l==="near"||_!==0?V=-K*z+z/2:l==="center"?V=-Ae.highest.height/2-te*z+z:V=-Ae.highest.height+z/2:l==="near"||_!==0?V=z/2:l==="center"?V=Ae.highest.height/2-te*z:V=Ae.highest.height-K*z,d&&(V*=-1),_!==0&&!q.showLabelBackdrop&&(T+=z/2*Math.sin(_))):(O=F,V=(1-K)*z/2);let g;if(q.showLabelBackdrop){const S=tt(q.backdropPadding),k=Ae.heights[v],R=Ae.widths[v];let M=V-S.top,D=0-S.left;switch(_e){case"middle":M-=k/2;break;case"bottom":M-=k;break}switch($){case"center":D-=R/2;break;case"right":D-=R;break;case"inner":v===b-1?D-=R:v>0&&(D-=R/2);break}g={left:D,top:M,width:R+S.width,height:k+S.height,color:q.backdropColor}}m.push({label:I,font:ee,textOffset:V,options:{rotation:_,color:he,strokeColor:$e,strokeWidth:we,textAlign:y,textBaseline:_e,translation:[T,O],backdrop:g}})}return m}_getXAxisLabelAlignment(){const{position:e,ticks:t}=this.options;if(-cn(this.labelRotation))return e==="top"?"left":"right";let s="center";return t.align==="start"?s="left":t.align==="end"?s="right":t.align==="inner"&&(s="inner"),s}_getYAxisLabelAlignment(e){const{position:t,ticks:{crossAlign:i,mirror:s,padding:r}}=this.options,o=this._getLabelSizes(),a=e+r,c=o.widest.width;let l,h;return t==="left"?s?(h=this.right+r,i==="near"?l="left":i==="center"?(l="center",h+=c/2):(l="right",h+=c)):(h=this.right-a,i==="near"?l="right":i==="center"?(l="center",h-=c/2):(l="left",h=this.left)):t==="right"?s?(h=this.left+r,i==="near"?l="right":i==="center"?(l="center",h-=c/2):(l="left",h-=c)):(h=this.left+a,i==="near"?l="left":i==="center"?(l="center",h+=c/2):(l="right",h=this.right)):l="right",{textAlign:l,x:h}}_computeLabelArea(){if(this.options.ticks.mirror)return;const e=this.chart,t=this.options.position;if(t==="left"||t==="right")return{top:0,left:this.left,bottom:e.height,right:this.right};if(t==="top"||t==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:e.width}}drawBackground(){const{ctx:e,options:{backgroundColor:t},left:i,top:s,width:r,height:o}=this;t&&(e.save(),e.fillStyle=t,e.fillRect(i,s,r,o),e.restore())}getLineWidthForValue(e){const t=this.options.grid;if(!this._isVisible()||!t.display)return 0;const s=this.ticks.findIndex(r=>r.value===e);return s>=0?t.setContext(this.getContext(s)).lineWidth:0}drawGrid(e){const t=this.options.grid,i=this.ctx,s=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(e));let r,o;const a=(c,l,h)=>{!h.width||!h.color||(i.save(),i.lineWidth=h.width,i.strokeStyle=h.color,i.setLineDash(h.borderDash||[]),i.lineDashOffset=h.borderDashOffset,i.beginPath(),i.moveTo(c.x,c.y),i.lineTo(l.x,l.y),i.stroke(),i.restore())};if(t.display)for(r=0,o=s.length;r<o;++r){const c=s[r];t.drawOnChartArea&&a({x:c.x1,y:c.y1},{x:c.x2,y:c.y2},c),t.drawTicks&&a({x:c.tx1,y:c.ty1},{x:c.tx2,y:c.ty2},{color:c.tickColor,width:c.tickWidth,borderDash:c.tickBorderDash,borderDashOffset:c.tickBorderDashOffset})}}drawBorder(){const{chart:e,ctx:t,options:{border:i,grid:s}}=this,r=i.setContext(this.getContext()),o=i.display?r.width:0;if(!o)return;const a=s.setContext(this.getContext(0)).lineWidth,c=this._borderValue;let l,h,d,u;this.isHorizontal()?(l=en(e,this.left,o)-o/2,h=en(e,this.right,a)+a/2,d=u=c):(d=en(e,this.top,o)-o/2,u=en(e,this.bottom,a)+a/2,l=h=c),t.save(),t.lineWidth=r.width,t.strokeStyle=r.color,t.beginPath(),t.moveTo(l,d),t.lineTo(h,u),t.stroke(),t.restore()}drawLabels(e){if(!this.options.ticks.display)return;const i=this.ctx,s=this._computeLabelArea();s&&ja(i,s);const r=this.getLabelItems(e);for(const o of r){const a=o.options,c=o.font,l=o.label,h=o.textOffset;dr(i,l,0,h,c,a)}s&&qa(i)}drawTitle(){const{ctx:e,options:{position:t,title:i,reverse:s}}=this;if(!i.display)return;const r=Ue(i.font),o=tt(i.padding),a=i.align;let c=r.lineHeight/2;t==="bottom"||t==="center"||Y(t)?(c+=o.bottom,ke(i.text)&&(c+=r.lineHeight*(i.text.length-1))):c+=o.top;const{titleX:l,titleY:h,maxWidth:d,rotation:u}=FC(this,c,t,a);dr(e,i.text,0,0,r,{color:i.color,maxWidth:d,rotation:u,textAlign:LC(a,t,s),textBaseline:"middle",translation:[l,h]})}draw(e){this._isVisible()&&(this.drawBackground(),this.drawGrid(e),this.drawBorder(),this.drawTitle(),this.drawLabels(e))}_layers(){const e=this.options,t=e.ticks&&e.ticks.z||0,i=Q(e.grid&&e.grid.z,-1),s=Q(e.border&&e.border.z,0);return!this._isVisible()||this.draw!==Mr.prototype.draw?[{z:t,draw:r=>{this.draw(r)}}]:[{z:i,draw:r=>{this.drawBackground(),this.drawGrid(r),this.drawTitle()}},{z:s,draw:()=>{this.drawBorder()}},{z:t,draw:r=>{this.drawLabels(r)}}]}getMatchingVisibleMetas(e){const t=this.chart.getSortedVisibleDatasetMetas(),i=this.axis+"AxisID",s=[];let r,o;for(r=0,o=t.length;r<o;++r){const a=t[r];a[i]===this.id&&(!e||a.type===e)&&s.push(a)}return s}_resolveTickFontOptions(e){const t=this.options.ticks.setContext(this.getContext(e));return Ue(t.font)}_maxDigits(){const e=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/e}}class Cs{constructor(e,t,i){this.type=e,this.scope=t,this.override=i,this.items=Object.create(null)}isForType(e){return Object.prototype.isPrototypeOf.call(this.type.prototype,e.prototype)}register(e){const t=Object.getPrototypeOf(e);let i;HC(t)&&(i=this.register(t));const s=this.items,r=e.id,o=this.scope+"."+r;if(!r)throw new Error("class does not have id: "+e);return r in s||(s[r]=e,BC(e,o,i),this.override&&ge.override(e.id,e.overrides)),o}get(e){return this.items[e]}unregister(e){const t=this.items,i=e.id,s=this.scope;i in t&&delete t[i],s&&i in ge[s]&&(delete ge[s][i],this.override&&delete vn[i])}}function BC(n,e,t){const i=Vi(Object.create(null),[t?ge.get(t):{},ge.get(e),n.defaults]);ge.set(e,i),n.defaultRoutes&&UC(e,n.defaultRoutes),n.descriptors&&ge.describe(e,n.descriptors)}function UC(n,e){Object.keys(e).forEach(t=>{const i=t.split("."),s=i.pop(),r=[n].concat(i).join("."),o=e[t].split("."),a=o.pop(),c=o.join(".");ge.route(r,s,c,a)})}function HC(n){return"id"in n&&"defaults"in n}class WC{constructor(){this.controllers=new Cs(xf,"datasets",!0),this.elements=new Cs(as,"elements"),this.plugins=new Cs(Object,"plugins"),this.scales=new Cs(Mr,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...e){this._each("register",e)}remove(...e){this._each("unregister",e)}addControllers(...e){this._each("register",e,this.controllers)}addElements(...e){this._each("register",e,this.elements)}addPlugins(...e){this._each("register",e,this.plugins)}addScales(...e){this._each("register",e,this.scales)}getController(e){return this._get(e,this.controllers,"controller")}getElement(e){return this._get(e,this.elements,"element")}getPlugin(e){return this._get(e,this.plugins,"plugin")}getScale(e){return this._get(e,this.scales,"scale")}removeControllers(...e){this._each("unregister",e,this.controllers)}removeElements(...e){this._each("unregister",e,this.elements)}removePlugins(...e){this._each("unregister",e,this.plugins)}removeScales(...e){this._each("unregister",e,this.scales)}_each(e,t,i){[...t].forEach(s=>{const r=i||this._getRegistryForType(s);i||r.isForType(s)||r===this.plugins&&s.id?this._exec(e,r,s):X(s,o=>{const a=i||this._getRegistryForType(o);this._exec(e,a,o)})})}_exec(e,t,i){const s=za(e);ae(i["before"+s],[],i),t[e](i),ae(i["after"+s],[],i)}_getRegistryForType(e){for(let t=0;t<this._typedRegistries.length;t++){const i=this._typedRegistries[t];if(i.isForType(e))return i}return this.plugins}_get(e,t,i){const s=t.get(e);if(s===void 0)throw new Error('"'+e+'" is not a registered '+i+".");return s}}var rt=new WC;class $C{constructor(){this._init=[]}notify(e,t,i,s){t==="beforeInit"&&(this._init=this._createDescriptors(e,!0),this._notify(this._init,e,"install"));const r=s?this._descriptors(e).filter(s):this._descriptors(e),o=this._notify(r,e,t,i);return t==="afterDestroy"&&(this._notify(r,e,"stop"),this._notify(this._init,e,"uninstall")),o}_notify(e,t,i,s){s=s||{};for(const r of e){const o=r.plugin,a=o[i],c=[t,s,r.options];if(ae(a,c,o)===!1&&s.cancelable)return!1}return!0}invalidate(){Pe(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(e){if(this._cache)return this._cache;const t=this._cache=this._createDescriptors(e);return this._notifyStateChanges(e),t}_createDescriptors(e,t){const i=e&&e.config,s=Q(i.options&&i.options.plugins,{}),r=zC(i);return s===!1&&!t?[]:jC(e,r,s,t)}_notifyStateChanges(e){const t=this._oldCache||[],i=this._cache,s=(r,o)=>r.filter(a=>!o.some(c=>a.plugin.id===c.plugin.id));this._notify(s(t,i),e,"stop"),this._notify(s(i,t),e,"start")}}function zC(n){const e={},t=[],i=Object.keys(rt.plugins.items);for(let r=0;r<i.length;r++)t.push(rt.getPlugin(i[r]));const s=n.plugins||[];for(let r=0;r<s.length;r++){const o=s[r];t.indexOf(o)===-1&&(t.push(o),e[o.id]=!0)}return{plugins:t,localIds:e}}function VC(n,e){return!e&&n===!1?null:n===!0?{}:n}function jC(n,{plugins:e,localIds:t},i,s){const r=[],o=n.getContext();for(const a of e){const c=a.id,l=VC(i[c],s);l!==null&&r.push({plugin:a,options:qC(n.config,{plugin:a,local:t[c]},l,o)})}return r}function qC(n,{plugin:e,local:t},i,s){const r=n.pluginScopeKeys(e),o=n.getOptionScopes(i,r);return t&&e.defaults&&o.push(e.defaults),n.createResolver(o,s,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function Ho(n,e){const t=ge.datasets[n]||{};return((e.datasets||{})[n]||{}).indexAxis||e.indexAxis||t.indexAxis||"x"}function GC(n,e){let t=n;return n==="_index_"?t=e:n==="_value_"&&(t=e==="x"?"y":"x"),t}function YC(n,e){return n===e?"_index_":"_value_"}function ah(n){if(n==="x"||n==="y"||n==="r")return n}function KC(n){if(n==="top"||n==="bottom")return"x";if(n==="left"||n==="right")return"y"}function Wo(n,...e){if(ah(n))return n;for(const t of e){const i=t.axis||KC(t.position)||n.length>1&&ah(n[0].toLowerCase());if(i)return i}throw new Error(`Cannot determine type of '${n}' axis. Please provide 'axis' or 'position' option.`)}function ch(n,e,t){if(t[e+"AxisID"]===n)return{axis:e}}function XC(n,e){if(e.data&&e.data.datasets){const t=e.data.datasets.filter(i=>i.xAxisID===n||i.yAxisID===n);if(t.length)return ch(n,"x",t[0])||ch(n,"y",t[0])}return{}}function QC(n,e){const t=vn[n.type]||{scales:{}},i=e.scales||{},s=Ho(n.type,e),r=Object.create(null);return Object.keys(i).forEach(o=>{const a=i[o];if(!Y(a))return console.error(`Invalid scale configuration for scale: ${o}`);if(a._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${o}`);const c=Wo(o,a,XC(o,n),ge.scales[a.type]),l=YC(c,s),h=t.scales||{};r[o]=Ii(Object.create(null),[{axis:c},a,h[c],h[l]])}),n.data.datasets.forEach(o=>{const a=o.type||n.type,c=o.indexAxis||Ho(a,e),h=(vn[a]||{}).scales||{};Object.keys(h).forEach(d=>{const u=GC(d,c),f=o[u+"AxisID"]||u;r[f]=r[f]||Object.create(null),Ii(r[f],[{axis:u},i[f],h[d]])})}),Object.keys(r).forEach(o=>{const a=r[o];Ii(a,[ge.scales[a.type],ge.scale])}),r}function Of(n){const e=n.options||(n.options={});e.plugins=Q(e.plugins,{}),e.scales=QC(n,e)}function Nf(n){return n=n||{},n.datasets=n.datasets||[],n.labels=n.labels||[],n}function JC(n){return n=n||{},n.data=Nf(n.data),Of(n),n}const lh=new Map,Lf=new Set;function Is(n,e){let t=lh.get(n);return t||(t=e(),lh.set(n,t),Lf.add(t)),t}const ai=(n,e,t)=>{const i=ji(e,t);i!==void 0&&n.add(i)};class ZC{constructor(e){this._config=JC(e),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(e){this._config.type=e}get data(){return this._config.data}set data(e){this._config.data=Nf(e)}get options(){return this._config.options}set options(e){this._config.options=e}get plugins(){return this._config.plugins}update(){const e=this._config;this.clearCache(),Of(e)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(e){return Is(e,()=>[[`datasets.${e}`,""]])}datasetAnimationScopeKeys(e,t){return Is(`${e}.transition.${t}`,()=>[[`datasets.${e}.transitions.${t}`,`transitions.${t}`],[`datasets.${e}`,""]])}datasetElementScopeKeys(e,t){return Is(`${e}-${t}`,()=>[[`datasets.${e}.elements.${t}`,`datasets.${e}`,`elements.${t}`,""]])}pluginScopeKeys(e){const t=e.id,i=this.type;return Is(`${i}-plugin-${t}`,()=>[[`plugins.${t}`,...e.additionalOptionScopes||[]]])}_cachedScopes(e,t){const i=this._scopeCache;let s=i.get(e);return(!s||t)&&(s=new Map,i.set(e,s)),s}getOptionScopes(e,t,i){const{options:s,type:r}=this,o=this._cachedScopes(e,i),a=o.get(t);if(a)return a;const c=new Set;t.forEach(h=>{e&&(c.add(e),h.forEach(d=>ai(c,e,d))),h.forEach(d=>ai(c,s,d)),h.forEach(d=>ai(c,vn[r]||{},d)),h.forEach(d=>ai(c,ge,d)),h.forEach(d=>ai(c,Bo,d))});const l=Array.from(c);return l.length===0&&l.push(Object.create(null)),Lf.has(t)&&o.set(t,l),l}chartOptionScopes(){const{options:e,type:t}=this;return[e,vn[t]||{},ge.datasets[t]||{},{type:t},ge,Bo]}resolveNamedOptions(e,t,i,s=[""]){const r={$shared:!0},{resolver:o,subPrefixes:a}=hh(this._resolverCache,e,s);let c=o;if(tI(o,t)){r.$shared=!1,i=qt(i)?i():i;const l=this.createResolver(e,i,a);c=Hn(o,i,l)}for(const l of t)r[l]=c[l];return r}createResolver(e,t,i=[""],s){const{resolver:r}=hh(this._resolverCache,e,i);return Y(t)?Hn(r,t,void 0,s):r}}function hh(n,e,t){let i=n.get(e);i||(i=new Map,n.set(e,i));const s=t.join();let r=i.get(s);return r||(r={resolver:Ya(e,t),subPrefixes:t.filter(a=>!a.toLowerCase().includes("hover"))},i.set(s,r)),r}const eI=n=>Y(n)&&Object.getOwnPropertyNames(n).some(e=>qt(n[e]));function tI(n,e){const{isScriptable:t,isIndexable:i}=bf(n);for(const s of e){const r=t(s),o=i(s),a=(o||r)&&n[s];if(r&&(qt(a)||eI(a))||o&&ke(a))return!0}return!1}var nI="4.5.0";const iI=["top","bottom","left","right","chartArea"];function dh(n,e){return n==="top"||n==="bottom"||iI.indexOf(n)===-1&&e==="x"}function uh(n,e){return function(t,i){return t[n]===i[n]?t[e]-i[e]:t[n]-i[n]}}function fh(n){const e=n.chart,t=e.options.animation;e.notifyPlugins("afterRender"),ae(t&&t.onComplete,[n],e)}function sI(n){const e=n.chart,t=e.options.animation;ae(t&&t.onProgress,[n],e)}function Ff(n){return Qa()&&typeof n=="string"?n=document.getElementById(n):n&&n.length&&(n=n[0]),n&&n.canvas&&(n=n.canvas),n}const Ns={},ph=n=>{const e=Ff(n);return Object.values(Ns).filter(t=>t.canvas===e).pop()};function rI(n,e,t){const i=Object.keys(n);for(const s of i){const r=+s;if(r>=e){const o=n[s];delete n[s],(t>0||r>e)&&(n[r+t]=o)}}}function oI(n,e,t,i){return!t||n.type==="mouseout"?null:i?e:n}class ec{static defaults=ge;static instances=Ns;static overrides=vn;static registry=rt;static version=nI;static getChart=ph;static register(...e){rt.add(...e),gh()}static unregister(...e){rt.remove(...e),gh()}constructor(e,t){const i=this.config=new ZC(t),s=Ff(e),r=ph(s);if(r)throw new Error("Canvas is already in use. Chart with ID '"+r.id+"' must be destroyed before the canvas with ID '"+r.canvas.id+"' can be reused.");const o=i.createResolver(i.chartOptionScopes(),this.getContext());this.platform=new(i.platform||IC(s)),this.platform.updateConfig(i);const a=this.platform.acquireContext(s,o.aspectRatio),c=a&&a.canvas,l=c&&c.height,h=c&&c.width;if(this.id=P0(),this.ctx=a,this.canvas=c,this.width=h,this.height=l,this._options=o,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new $C,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=Y0(d=>this.update(d),o.resizeDelay||0),this._dataChanges=[],Ns[this.id]=this,!a||!c){console.error("Failed to create chart: can't acquire context from the given item");return}pt.listen(this,"complete",fh),pt.listen(this,"progress",sI),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:e,maintainAspectRatio:t},width:i,height:s,_aspectRatio:r}=this;return Pe(e)?t&&r?r:s?i/s:null:e}get data(){return this.config.data}set data(e){this.config.data=e}get options(){return this._options}set options(e){this.config.options=e}get registry(){return rt}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():zl(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return Ul(this.canvas,this.ctx),this}stop(){return pt.stop(this),this}resize(e,t){pt.running(this)?this._resizeBeforeDraw={width:e,height:t}:this._resize(e,t)}_resize(e,t){const i=this.options,s=this.canvas,r=i.maintainAspectRatio&&this.aspectRatio,o=this.platform.getMaximumSize(s,e,t,r),a=i.devicePixelRatio||this.platform.getDevicePixelRatio(),c=this.width?"resize":"attach";this.width=o.width,this.height=o.height,this._aspectRatio=this.aspectRatio,zl(this,a,!0)&&(this.notifyPlugins("resize",{size:o}),ae(i.onResize,[this,o],this),this.attached&&this._doResize(c)&&this.render())}ensureScalesHaveIDs(){const t=this.options.scales||{};X(t,(i,s)=>{i.id=s})}buildOrUpdateScales(){const e=this.options,t=e.scales,i=this.scales,s=Object.keys(i).reduce((o,a)=>(o[a]=!1,o),{});let r=[];t&&(r=r.concat(Object.keys(t).map(o=>{const a=t[o],c=Wo(o,a),l=c==="r",h=c==="x";return{options:a,dposition:l?"chartArea":h?"bottom":"left",dtype:l?"radialLinear":h?"category":"linear"}}))),X(r,o=>{const a=o.options,c=a.id,l=Wo(c,a),h=Q(a.type,o.dtype);(a.position===void 0||dh(a.position,l)!==dh(o.dposition))&&(a.position=o.dposition),s[c]=!0;let d=null;if(c in i&&i[c].type===h)d=i[c];else{const u=rt.getScale(h);d=new u({id:c,type:h,ctx:this.ctx,chart:this}),i[d.id]=d}d.init(a,e)}),X(s,(o,a)=>{o||delete i[a]}),X(i,o=>{Nt.configure(this,o,o.options),Nt.addBox(this,o)})}_updateMetasets(){const e=this._metasets,t=this.data.datasets.length,i=e.length;if(e.sort((s,r)=>s.index-r.index),i>t){for(let s=t;s<i;++s)this._destroyDatasetMeta(s);e.splice(t,i-t)}this._sortedMetasets=e.slice(0).sort(uh("order","index"))}_removeUnreferencedMetasets(){const{_metasets:e,data:{datasets:t}}=this;e.length>t.length&&delete this._stacks,e.forEach((i,s)=>{t.filter(r=>r===i._dataset).length===0&&this._destroyDatasetMeta(s)})}buildOrUpdateControllers(){const e=[],t=this.data.datasets;let i,s;for(this._removeUnreferencedMetasets(),i=0,s=t.length;i<s;i++){const r=t[i];let o=this.getDatasetMeta(i);const a=r.type||this.config.type;if(o.type&&o.type!==a&&(this._destroyDatasetMeta(i),o=this.getDatasetMeta(i)),o.type=a,o.indexAxis=r.indexAxis||Ho(a,this.options),o.order=r.order||0,o.index=i,o.label=""+r.label,o.visible=this.isDatasetVisible(i),o.controller)o.controller.updateIndex(i),o.controller.linkScales();else{const c=rt.getController(a),{datasetElementType:l,dataElementType:h}=ge.datasets[a];Object.assign(c,{dataElementType:rt.getElement(h),datasetElementType:l&&rt.getElement(l)}),o.controller=new c(this,i),e.push(o.controller)}}return this._updateMetasets(),e}_resetElements(){X(this.data.datasets,(e,t)=>{this.getDatasetMeta(t).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(e){const t=this.config;t.update();const i=this._options=t.createResolver(t.chartOptionScopes(),this.getContext()),s=this._animationsDisabled=!i.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:e,cancelable:!0})===!1)return;const r=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let o=0;for(let l=0,h=this.data.datasets.length;l<h;l++){const{controller:d}=this.getDatasetMeta(l),u=!s&&r.indexOf(d)===-1;d.buildOrUpdateElements(u),o=Math.max(+d.getMaxOverflow(),o)}o=this._minPadding=i.layout.autoPadding?o:0,this._updateLayout(o),s||X(r,l=>{l.reset()}),this._updateDatasets(e),this.notifyPlugins("afterUpdate",{mode:e}),this._layers.sort(uh("z","_idx"));const{_active:a,_lastEvent:c}=this;c?this._eventHandler(c,!0):a.length&&this._updateHoverStyles(a,a,!0),this.render()}_updateScales(){X(this.scales,e=>{Nt.removeBox(this,e)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const e=this.options,t=new Set(Object.keys(this._listeners)),i=new Set(e.events);(!Rl(t,i)||!!this._responsiveListeners!==e.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:e}=this,t=this._getUniformDataChanges()||[];for(const{method:i,start:s,count:r}of t){const o=i==="_removeElements"?-r:r;rI(e,s,o)}}_getUniformDataChanges(){const e=this._dataChanges;if(!e||!e.length)return;this._dataChanges=[];const t=this.data.datasets.length,i=r=>new Set(e.filter(o=>o[0]===r).map((o,a)=>a+","+o.splice(1).join(","))),s=i(0);for(let r=1;r<t;r++)if(!Rl(s,i(r)))return;return Array.from(s).map(r=>r.split(",")).map(r=>({method:r[1],start:+r[2],count:+r[3]}))}_updateLayout(e){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;Nt.update(this,this.width,this.height,e);const t=this.chartArea,i=t.width<=0||t.height<=0;this._layers=[],X(this.boxes,s=>{i&&s.position==="chartArea"||(s.configure&&s.configure(),this._layers.push(...s._layers()))},this),this._layers.forEach((s,r)=>{s._idx=r}),this.notifyPlugins("afterLayout")}_updateDatasets(e){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:e,cancelable:!0})!==!1){for(let t=0,i=this.data.datasets.length;t<i;++t)this.getDatasetMeta(t).controller.configure();for(let t=0,i=this.data.datasets.length;t<i;++t)this._updateDataset(t,qt(e)?e({datasetIndex:t}):e);this.notifyPlugins("afterDatasetsUpdate",{mode:e})}}_updateDataset(e,t){const i=this.getDatasetMeta(e),s={meta:i,index:e,mode:t,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",s)!==!1&&(i.controller._update(t),s.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",s))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(pt.has(this)?this.attached&&!pt.running(this)&&pt.start(this):(this.draw(),fh({chart:this})))}draw(){let e;if(this._resizeBeforeDraw){const{width:i,height:s}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(i,s)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const t=this._layers;for(e=0;e<t.length&&t[e].z<=0;++e)t[e].draw(this.chartArea);for(this._drawDatasets();e<t.length;++e)t[e].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(e){const t=this._sortedMetasets,i=[];let s,r;for(s=0,r=t.length;s<r;++s){const o=t[s];(!e||o.visible)&&i.push(o)}return i}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const e=this.getSortedVisibleDatasetMetas();for(let t=e.length-1;t>=0;--t)this._drawDataset(e[t]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(e){const t=this.ctx,i={meta:e,index:e.index,cancelable:!0},s=NE(this,e);this.notifyPlugins("beforeDatasetDraw",i)!==!1&&(s&&ja(t,s),e.controller.draw(),s&&qa(t),i.cancelable=!1,this.notifyPlugins("afterDatasetDraw",i))}isPointInArea(e){return vf(e,this.chartArea,this._minPadding)}getElementsAtEventForMode(e,t,i,s){const r=iC.modes[t];return typeof r=="function"?r(this,e,i,s):[]}getDatasetMeta(e){const t=this.data.datasets[e],i=this._metasets;let s=i.filter(r=>r&&r._dataset===t).pop();return s||(s={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:t&&t.order||0,index:e,_dataset:t,_parsed:[],_sorted:!1},i.push(s)),s}getContext(){return this.$context||(this.$context=Qn(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(e){const t=this.data.datasets[e];if(!t)return!1;const i=this.getDatasetMeta(e);return typeof i.hidden=="boolean"?!i.hidden:!t.hidden}setDatasetVisibility(e,t){const i=this.getDatasetMeta(e);i.hidden=!t}toggleDataVisibility(e){this._hiddenIndices[e]=!this._hiddenIndices[e]}getDataVisibility(e){return!this._hiddenIndices[e]}_updateVisibility(e,t,i){const s=i?"show":"hide",r=this.getDatasetMeta(e),o=r.controller._resolveAnimations(void 0,s);ar(t)?(r.data[t].hidden=!i,this.update()):(this.setDatasetVisibility(e,i),o.update(r,{visible:i}),this.update(a=>a.datasetIndex===e?s:void 0))}hide(e,t){this._updateVisibility(e,t,!1)}show(e,t){this._updateVisibility(e,t,!0)}_destroyDatasetMeta(e){const t=this._metasets[e];t&&t.controller&&t.controller._destroy(),delete this._metasets[e]}_stop(){let e,t;for(this.stop(),pt.remove(this),e=0,t=this.data.datasets.length;e<t;++e)this._destroyDatasetMeta(e)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:e,ctx:t}=this;this._stop(),this.config.clearCache(),e&&(this.unbindEvents(),Ul(e,t),this.platform.releaseContext(t),this.canvas=null,this.ctx=null),delete Ns[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...e){return this.canvas.toDataURL(...e)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const e=this._listeners,t=this.platform,i=(r,o)=>{t.addEventListener(this,r,o),e[r]=o},s=(r,o,a)=>{r.offsetX=o,r.offsetY=a,this._eventHandler(r)};X(this.options.events,r=>i(r,s))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const e=this._responsiveListeners,t=this.platform,i=(c,l)=>{t.addEventListener(this,c,l),e[c]=l},s=(c,l)=>{e[c]&&(t.removeEventListener(this,c,l),delete e[c])},r=(c,l)=>{this.canvas&&this.resize(c,l)};let o;const a=()=>{s("attach",a),this.attached=!0,this.resize(),i("resize",r),i("detach",o)};o=()=>{this.attached=!1,s("resize",r),this._stop(),this._resize(0,0),i("attach",a)},t.isAttached(this.canvas)?a():o()}unbindEvents(){X(this._listeners,(e,t)=>{this.platform.removeEventListener(this,t,e)}),this._listeners={},X(this._responsiveListeners,(e,t)=>{this.platform.removeEventListener(this,t,e)}),this._responsiveListeners=void 0}updateHoverStyle(e,t,i){const s=i?"set":"remove";let r,o,a,c;for(t==="dataset"&&(r=this.getDatasetMeta(e[0].datasetIndex),r.controller["_"+s+"DatasetHoverStyle"]()),a=0,c=e.length;a<c;++a){o=e[a];const l=o&&this.getDatasetMeta(o.datasetIndex).controller;l&&l[s+"HoverStyle"](o.element,o.datasetIndex,o.index)}}getActiveElements(){return this._active||[]}setActiveElements(e){const t=this._active||[],i=e.map(({datasetIndex:r,index:o})=>{const a=this.getDatasetMeta(r);if(!a)throw new Error("No dataset found at index "+r);return{datasetIndex:r,element:a.data[o],index:o}});!rr(i,t)&&(this._active=i,this._lastEvent=null,this._updateHoverStyles(i,t))}notifyPlugins(e,t,i){return this._plugins.notify(this,e,t,i)}isPluginEnabled(e){return this._plugins._cache.filter(t=>t.plugin.id===e).length===1}_updateHoverStyles(e,t,i){const s=this.options.hover,r=(c,l)=>c.filter(h=>!l.some(d=>h.datasetIndex===d.datasetIndex&&h.index===d.index)),o=r(t,e),a=i?e:r(e,t);o.length&&this.updateHoverStyle(o,s.mode,!1),a.length&&s.mode&&this.updateHoverStyle(a,s.mode,!0)}_eventHandler(e,t){const i={event:e,replay:t,cancelable:!0,inChartArea:this.isPointInArea(e)},s=o=>(o.options.events||this.options.events).includes(e.native.type);if(this.notifyPlugins("beforeEvent",i,s)===!1)return;const r=this._handleEvent(e,t,i.inChartArea);return i.cancelable=!1,this.notifyPlugins("afterEvent",i,s),(r||i.changed)&&this.render(),this}_handleEvent(e,t,i){const{_active:s=[],options:r}=this,o=t,a=this._getActiveElements(e,s,i,o),c=F0(e),l=oI(e,this._lastEvent,i,c);i&&(this._lastEvent=null,ae(r.onHover,[e,a,this],this),c&&ae(r.onClick,[e,a,this],this));const h=!rr(a,s);return(h||t)&&(this._active=a,this._updateHoverStyles(a,s,t)),this._lastEvent=l,h}_getActiveElements(e,t,i,s){if(e.type==="mouseout")return[];if(!i)return t;const r=this.options.hover;return this.getElementsAtEventForMode(e,r.mode,r,s)}}function gh(){return X(ec.instances,n=>n._plugins.invalidate())}function aI(n,e,t){const{startAngle:i,x:s,y:r,outerRadius:o,innerRadius:a,options:c}=e,{borderWidth:l,borderJoinStyle:h}=c,d=Math.min(l/o,ot(i-t));if(n.beginPath(),n.arc(s,r,o-l/2,i+d/2,t-d/2),a>0){const u=Math.min(l/a,ot(i-t));n.arc(s,r,a+l/2,t-u/2,i+u/2,!0)}else{const u=Math.min(l/2,o*ot(i-t));if(h==="round")n.arc(s,r,u,t-ce/2,i+ce/2,!0);else if(h==="bevel"){const f=2*u*u,p=-f*Math.cos(t+ce/2)+s,_=-f*Math.sin(t+ce/2)+r,m=f*Math.cos(i+ce/2)+s,v=f*Math.sin(i+ce/2)+r;n.lineTo(p,_),n.lineTo(m,v)}}n.closePath(),n.moveTo(0,0),n.rect(0,0,n.canvas.width,n.canvas.height),n.clip("evenodd")}function cI(n,e,t){const{startAngle:i,pixelMargin:s,x:r,y:o,outerRadius:a,innerRadius:c}=e;let l=s/a;n.beginPath(),n.arc(r,o,a,i-l,t+l),c>s?(l=s/c,n.arc(r,o,c,t+l,i-l,!0)):n.arc(r,o,s,t+be,i-be),n.closePath(),n.clip()}function lI(n){return Ga(n,["outerStart","outerEnd","innerStart","innerEnd"])}function hI(n,e,t,i){const s=lI(n.options.borderRadius),r=(t-e)/2,o=Math.min(r,i*e/2),a=c=>{const l=(t-Math.min(r,c))*i/2;return qe(c,0,Math.min(r,l))};return{outerStart:a(s.outerStart),outerEnd:a(s.outerEnd),innerStart:qe(s.innerStart,0,o),innerEnd:qe(s.innerEnd,0,o)}}function Sn(n,e,t,i){return{x:t+n*Math.cos(e),y:i+n*Math.sin(e)}}function pr(n,e,t,i,s,r){const{x:o,y:a,startAngle:c,pixelMargin:l,innerRadius:h}=e,d=Math.max(e.outerRadius+i+t-l,0),u=h>0?h+i+t+l:0;let f=0;const p=s-c;if(i){const q=h>0?h-i:0,te=d>0?d-i:0,he=(q+te)/2,$e=he!==0?p*he/(he+i):p;f=(p-$e)/2}const _=Math.max(.001,p*d-t/ce)/d,m=(p-_)/2,v=c+m+f,b=s-m-f,{outerStart:E,outerEnd:I,innerStart:T,innerEnd:O}=hI(e,u,d,b-v),$=d-E,F=d-I,ee=v+E/$,z=b-I/F,K=u+T,V=u+O,_e=v+T/K,Ae=b-O/V;if(n.beginPath(),r){const q=(ee+z)/2;if(n.arc(o,a,d,ee,q),n.arc(o,a,d,q,z),I>0){const we=Sn(F,z,o,a);n.arc(we.x,we.y,I,z,b+be)}const te=Sn(V,b,o,a);if(n.lineTo(te.x,te.y),O>0){const we=Sn(V,Ae,o,a);n.arc(we.x,we.y,O,b+be,Ae+Math.PI)}const he=(b-O/u+(v+T/u))/2;if(n.arc(o,a,u,b-O/u,he,!0),n.arc(o,a,u,he,v+T/u,!0),T>0){const we=Sn(K,_e,o,a);n.arc(we.x,we.y,T,_e+Math.PI,v-be)}const $e=Sn($,v,o,a);if(n.lineTo($e.x,$e.y),E>0){const we=Sn($,ee,o,a);n.arc(we.x,we.y,E,v-be,ee)}}else{n.moveTo(o,a);const q=Math.cos(ee)*d+o,te=Math.sin(ee)*d+a;n.lineTo(q,te);const he=Math.cos(z)*d+o,$e=Math.sin(z)*d+a;n.lineTo(he,$e)}n.closePath()}function dI(n,e,t,i,s){const{fullCircles:r,startAngle:o,circumference:a}=e;let c=e.endAngle;if(r){pr(n,e,t,i,c,s);for(let l=0;l<r;++l)n.fill();isNaN(a)||(c=o+(a%me||me))}return pr(n,e,t,i,c,s),n.fill(),c}function uI(n,e,t,i,s){const{fullCircles:r,startAngle:o,circumference:a,options:c}=e,{borderWidth:l,borderJoinStyle:h,borderDash:d,borderDashOffset:u,borderRadius:f}=c,p=c.borderAlign==="inner";if(!l)return;n.setLineDash(d||[]),n.lineDashOffset=u,p?(n.lineWidth=l*2,n.lineJoin=h||"round"):(n.lineWidth=l,n.lineJoin=h||"bevel");let _=e.endAngle;if(r){pr(n,e,t,i,_,s);for(let m=0;m<r;++m)n.stroke();isNaN(a)||(_=o+(a%me||me))}p&&cI(n,e,_),c.selfJoin&&_-o>=ce&&f===0&&h!=="miter"&&aI(n,e,_),r||(pr(n,e,t,i,_,s),n.stroke())}class fI extends as{static id="arc";static defaults={borderAlign:"center",borderColor:"#fff",borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0,selfJoin:!1};static defaultRoutes={backgroundColor:"backgroundColor"};static descriptors={_scriptable:!0,_indexable:e=>e!=="borderDash"};circumference;endAngle;fullCircles;innerRadius;outerRadius;pixelMargin;startAngle;constructor(e){super(),this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,e&&Object.assign(this,e)}inRange(e,t,i){const s=this.getProps(["x","y"],i),{angle:r,distance:o}=uf(s,{x:e,y:t}),{startAngle:a,endAngle:c,innerRadius:l,outerRadius:h,circumference:d}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],i),u=(this.options.spacing+this.options.borderWidth)/2,f=Q(d,c-a),p=hr(r,a,c)&&a!==c,_=f>=me||p,m=fi(o,l+u,h+u);return _&&m}getCenterPoint(e){const{x:t,y:i,startAngle:s,endAngle:r,innerRadius:o,outerRadius:a}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],e),{offset:c,spacing:l}=this.options,h=(s+r)/2,d=(o+a+l+c)/2;return{x:t+Math.cos(h)*d,y:i+Math.sin(h)*d}}tooltipPosition(e){return this.getCenterPoint(e)}draw(e){const{options:t,circumference:i}=this,s=(t.offset||0)/4,r=(t.spacing||0)/2,o=t.circular;if(this.pixelMargin=t.borderAlign==="inner"?.33:0,this.fullCircles=i>me?Math.floor(i/me):0,i===0||this.innerRadius<0||this.outerRadius<0)return;e.save();const a=(this.startAngle+this.endAngle)/2;e.translate(Math.cos(a)*s,Math.sin(a)*s);const c=1-Math.sin(Math.min(ce,i||0)),l=s*c;e.fillStyle=t.backgroundColor,e.strokeStyle=t.borderColor,dI(e,this,l,r,o),uI(e,this,l,r,o),e.restore()}}const mh=(n,e)=>{let{boxHeight:t=e,boxWidth:i=e}=n;return n.usePointStyle&&(t=Math.min(t,e),i=n.pointStyleWidth||Math.min(i,e)),{boxWidth:i,boxHeight:t,itemHeight:Math.max(e,t)}},pI=(n,e)=>n!==null&&e!==null&&n.datasetIndex===e.datasetIndex&&n.index===e.index;class _h extends as{constructor(e){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=e.chart,this.options=e.options,this.ctx=e.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(e,t,i){this.maxWidth=e,this.maxHeight=t,this._margins=i,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const e=this.options.labels||{};let t=ae(e.generateLabels,[this.chart],this)||[];e.filter&&(t=t.filter(i=>e.filter(i,this.chart.data))),e.sort&&(t=t.sort((i,s)=>e.sort(i,s,this.chart.data))),this.options.reverse&&t.reverse(),this.legendItems=t}fit(){const{options:e,ctx:t}=this;if(!e.display){this.width=this.height=0;return}const i=e.labels,s=Ue(i.font),r=s.size,o=this._computeTitleHeight(),{boxWidth:a,itemHeight:c}=mh(i,r);let l,h;t.font=s.string,this.isHorizontal()?(l=this.maxWidth,h=this._fitRows(o,r,a,c)+10):(h=this.maxHeight,l=this._fitCols(o,s,a,c)+10),this.width=Math.min(l,e.maxWidth||this.maxWidth),this.height=Math.min(h,e.maxHeight||this.maxHeight)}_fitRows(e,t,i,s){const{ctx:r,maxWidth:o,options:{labels:{padding:a}}}=this,c=this.legendHitBoxes=[],l=this.lineWidths=[0],h=s+a;let d=e;r.textAlign="left",r.textBaseline="middle";let u=-1,f=-h;return this.legendItems.forEach((p,_)=>{const m=i+t/2+r.measureText(p.text).width;(_===0||l[l.length-1]+m+2*a>o)&&(d+=h,l[l.length-(_>0?0:1)]=0,f+=h,u++),c[_]={left:0,top:f,row:u,width:m,height:s},l[l.length-1]+=m+a}),d}_fitCols(e,t,i,s){const{ctx:r,maxHeight:o,options:{labels:{padding:a}}}=this,c=this.legendHitBoxes=[],l=this.columnSizes=[],h=o-e;let d=a,u=0,f=0,p=0,_=0;return this.legendItems.forEach((m,v)=>{const{itemWidth:b,itemHeight:E}=gI(i,t,r,m,s);v>0&&f+E+2*a>h&&(d+=u+a,l.push({width:u,height:f}),p+=u+a,_++,u=f=0),c[v]={left:p,top:f,col:_,width:b,height:E},u=Math.max(u,b),f+=E+a}),d+=u,l.push({width:u,height:f}),d}adjustHitBoxes(){if(!this.options.display)return;const e=this._computeTitleHeight(),{legendHitBoxes:t,options:{align:i,labels:{padding:s},rtl:r}}=this,o=On(r,this.left,this.width);if(this.isHorizontal()){let a=0,c=ze(i,this.left+s,this.right-this.lineWidths[a]);for(const l of t)a!==l.row&&(a=l.row,c=ze(i,this.left+s,this.right-this.lineWidths[a])),l.top+=this.top+e+s,l.left=o.leftForLtr(o.x(c),l.width),c+=l.width+s}else{let a=0,c=ze(i,this.top+e+s,this.bottom-this.columnSizes[a].height);for(const l of t)l.col!==a&&(a=l.col,c=ze(i,this.top+e+s,this.bottom-this.columnSizes[a].height)),l.top=c,l.left+=this.left+s,l.left=o.leftForLtr(o.x(l.left),l.width),c+=l.height+s}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){const e=this.ctx;ja(e,this),this._draw(),qa(e)}}_draw(){const{options:e,columnSizes:t,lineWidths:i,ctx:s}=this,{align:r,labels:o}=e,a=ge.color,c=On(e.rtl,this.left,this.width),l=Ue(o.font),{padding:h}=o,d=l.size,u=d/2;let f;this.drawTitle(),s.textAlign=c.textAlign("left"),s.textBaseline="middle",s.lineWidth=.5,s.font=l.string;const{boxWidth:p,boxHeight:_,itemHeight:m}=mh(o,d),v=function(O,$,F){if(isNaN(p)||p<=0||isNaN(_)||_<0)return;s.save();const ee=Q(F.lineWidth,1);if(s.fillStyle=Q(F.fillStyle,a),s.lineCap=Q(F.lineCap,"butt"),s.lineDashOffset=Q(F.lineDashOffset,0),s.lineJoin=Q(F.lineJoin,"miter"),s.lineWidth=ee,s.strokeStyle=Q(F.strokeStyle,a),s.setLineDash(Q(F.lineDash,[])),o.usePointStyle){const z={radius:_*Math.SQRT2/2,pointStyle:F.pointStyle,rotation:F.rotation,borderWidth:ee},K=c.xPlus(O,p/2),V=$+u;yf(s,z,K,V,o.pointStyleWidth&&p)}else{const z=$+Math.max((d-_)/2,0),K=c.leftForLtr(O,p),V=ki(F.borderRadius);s.beginPath(),Object.values(V).some(_e=>_e!==0)?Uo(s,{x:K,y:z,w:p,h:_,radius:V}):s.rect(K,z,p,_),s.fill(),ee!==0&&s.stroke()}s.restore()},b=function(O,$,F){dr(s,F.text,O,$+m/2,l,{strikethrough:F.hidden,textAlign:c.textAlign(F.textAlign)})},E=this.isHorizontal(),I=this._computeTitleHeight();E?f={x:ze(r,this.left+h,this.right-i[0]),y:this.top+h+I,line:0}:f={x:this.left+h,y:ze(r,this.top+I+h,this.bottom-t[0].height),line:0},If(this.ctx,e.textDirection);const T=m+h;this.legendItems.forEach((O,$)=>{s.strokeStyle=O.fontColor,s.fillStyle=O.fontColor;const F=s.measureText(O.text).width,ee=c.textAlign(O.textAlign||(O.textAlign=o.textAlign)),z=p+u+F;let K=f.x,V=f.y;c.setWidth(this.width),E?$>0&&K+z+h>this.right&&(V=f.y+=T,f.line++,K=f.x=ze(r,this.left+h,this.right-i[f.line])):$>0&&V+T>this.bottom&&(K=f.x=K+t[f.line].width+h,f.line++,V=f.y=ze(r,this.top+I+h,this.bottom-t[f.line].height));const _e=c.x(K);if(v(_e,V,O),K=K0(ee,K+p+u,E?K+z:this.right,e.rtl),b(c.x(K),V,O),E)f.x+=z+h;else if(typeof O.text!="string"){const Ae=l.lineHeight;f.y+=Bf(O,Ae)+h}else f.y+=T}),Sf(this.ctx,e.textDirection)}drawTitle(){const e=this.options,t=e.title,i=Ue(t.font),s=tt(t.padding);if(!t.display)return;const r=On(e.rtl,this.left,this.width),o=this.ctx,a=t.position,c=i.size/2,l=s.top+c;let h,d=this.left,u=this.width;if(this.isHorizontal())u=Math.max(...this.lineWidths),h=this.top+l,d=ze(e.align,d,this.right-u);else{const p=this.columnSizes.reduce((_,m)=>Math.max(_,m.height),0);h=l+ze(e.align,this.top,this.bottom-p-e.labels.padding-this._computeTitleHeight())}const f=ze(a,d,d+u);o.textAlign=r.textAlign(mf(a)),o.textBaseline="middle",o.strokeStyle=t.color,o.fillStyle=t.color,o.font=i.string,dr(o,t.text,f,h,i)}_computeTitleHeight(){const e=this.options.title,t=Ue(e.font),i=tt(e.padding);return e.display?t.lineHeight+i.height:0}_getLegendItemAt(e,t){let i,s,r;if(fi(e,this.left,this.right)&&fi(t,this.top,this.bottom)){for(r=this.legendHitBoxes,i=0;i<r.length;++i)if(s=r[i],fi(e,s.left,s.left+s.width)&&fi(t,s.top,s.top+s.height))return this.legendItems[i]}return null}handleEvent(e){const t=this.options;if(!yI(e.type,t))return;const i=this._getLegendItemAt(e.x,e.y);if(e.type==="mousemove"||e.type==="mouseout"){const s=this._hoveredItem,r=pI(s,i);s&&!r&&ae(t.onLeave,[e,s,this],this),this._hoveredItem=i,i&&!r&&ae(t.onHover,[e,i,this],this)}else i&&ae(t.onClick,[e,i,this],this)}}function gI(n,e,t,i,s){const r=mI(i,n,e,t),o=_I(s,i,e.lineHeight);return{itemWidth:r,itemHeight:o}}function mI(n,e,t,i){let s=n.text;return s&&typeof s!="string"&&(s=s.reduce((r,o)=>r.length>o.length?r:o)),e+t.size/2+i.measureText(s).width}function _I(n,e,t){let i=n;return typeof e.text!="string"&&(i=Bf(e,t)),i}function Bf(n,e){const t=n.text?n.text.length:0;return e*t}function yI(n,e){return!!((n==="mousemove"||n==="mouseout")&&(e.onHover||e.onLeave)||e.onClick&&(n==="click"||n==="mouseup"))}var vI={id:"legend",_element:_h,start(n,e,t){const i=n.legend=new _h({ctx:n.ctx,options:t,chart:n});Nt.configure(n,i,t),Nt.addBox(n,i)},stop(n){Nt.removeBox(n,n.legend),delete n.legend},beforeUpdate(n,e,t){const i=n.legend;Nt.configure(n,i,t),i.options=t},afterUpdate(n){const e=n.legend;e.buildLabels(),e.adjustHitBoxes()},afterEvent(n,e){e.replay||n.legend.handleEvent(e.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(n,e,t){const i=e.datasetIndex,s=t.chart;s.isDatasetVisible(i)?(s.hide(i),e.hidden=!0):(s.show(i),e.hidden=!1)},onHover:null,onLeave:null,labels:{color:n=>n.chart.options.color,boxWidth:40,padding:10,generateLabels(n){const e=n.data.datasets,{labels:{usePointStyle:t,pointStyle:i,textAlign:s,color:r,useBorderRadius:o,borderRadius:a}}=n.legend.options;return n._getSortedDatasetMetas().map(c=>{const l=c.controller.getStyle(t?0:void 0),h=tt(l.borderWidth);return{text:e[c.index].label,fillStyle:l.backgroundColor,fontColor:r,hidden:!c.visible,lineCap:l.borderCapStyle,lineDash:l.borderDash,lineDashOffset:l.borderDashOffset,lineJoin:l.borderJoinStyle,lineWidth:(h.width+h.height)/4,strokeStyle:l.borderColor,pointStyle:i||l.pointStyle,rotation:l.rotation,textAlign:s||l.textAlign,borderRadius:o&&(a||l.borderRadius),datasetIndex:c.index}},this)}},title:{color:n=>n.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:n=>!n.startsWith("on"),labels:{_scriptable:n=>!["generateLabels","filter","sort"].includes(n)}}};const gi={average(n){if(!n.length)return!1;let e,t,i=new Set,s=0,r=0;for(e=0,t=n.length;e<t;++e){const a=n[e].element;if(a&&a.hasValue()){const c=a.tooltipPosition();i.add(c.x),s+=c.y,++r}}return r===0||i.size===0?!1:{x:[...i].reduce((a,c)=>a+c)/i.size,y:s/r}},nearest(n,e){if(!n.length)return!1;let t=e.x,i=e.y,s=Number.POSITIVE_INFINITY,r,o,a;for(r=0,o=n.length;r<o;++r){const c=n[r].element;if(c&&c.hasValue()){const l=c.getCenterPoint(),h=$0(e,l);h<s&&(s=h,a=c)}}if(a){const c=a.tooltipPosition();t=c.x,i=c.y}return{x:t,y:i}}};function st(n,e){return e&&(ke(e)?Array.prototype.push.apply(n,e):n.push(e)),n}function gt(n){return(typeof n=="string"||n instanceof String)&&n.indexOf(`
`)>-1?n.split(`
`):n}function bI(n,e){const{element:t,datasetIndex:i,index:s}=e,r=n.getDatasetMeta(i).controller,{label:o,value:a}=r.getLabelAndValue(s);return{chart:n,label:o,parsed:r.getParsed(s),raw:n.data.datasets[i].data[s],formattedValue:a,dataset:r.getDataset(),dataIndex:s,datasetIndex:i,element:t}}function yh(n,e){const t=n.chart.ctx,{body:i,footer:s,title:r}=n,{boxWidth:o,boxHeight:a}=e,c=Ue(e.bodyFont),l=Ue(e.titleFont),h=Ue(e.footerFont),d=r.length,u=s.length,f=i.length,p=tt(e.padding);let _=p.height,m=0,v=i.reduce((I,T)=>I+T.before.length+T.lines.length+T.after.length,0);if(v+=n.beforeBody.length+n.afterBody.length,d&&(_+=d*l.lineHeight+(d-1)*e.titleSpacing+e.titleMarginBottom),v){const I=e.displayColors?Math.max(a,c.lineHeight):c.lineHeight;_+=f*I+(v-f)*c.lineHeight+(v-1)*e.bodySpacing}u&&(_+=e.footerMarginTop+u*h.lineHeight+(u-1)*e.footerSpacing);let b=0;const E=function(I){m=Math.max(m,t.measureText(I).width+b)};return t.save(),t.font=l.string,X(n.title,E),t.font=c.string,X(n.beforeBody.concat(n.afterBody),E),b=e.displayColors?o+2+e.boxPadding:0,X(i,I=>{X(I.before,E),X(I.lines,E),X(I.after,E)}),b=0,t.font=h.string,X(n.footer,E),t.restore(),m+=p.width,{width:m,height:_}}function wI(n,e){const{y:t,height:i}=e;return t<i/2?"top":t>n.height-i/2?"bottom":"center"}function EI(n,e,t,i){const{x:s,width:r}=i,o=t.caretSize+t.caretPadding;if(n==="left"&&s+r+o>e.width||n==="right"&&s-r-o<0)return!0}function CI(n,e,t,i){const{x:s,width:r}=t,{width:o,chartArea:{left:a,right:c}}=n;let l="center";return i==="center"?l=s<=(a+c)/2?"left":"right":s<=r/2?l="left":s>=o-r/2&&(l="right"),EI(l,n,e,t)&&(l="center"),l}function vh(n,e,t){const i=t.yAlign||e.yAlign||wI(n,t);return{xAlign:t.xAlign||e.xAlign||CI(n,e,t,i),yAlign:i}}function II(n,e){let{x:t,width:i}=n;return e==="right"?t-=i:e==="center"&&(t-=i/2),t}function SI(n,e,t){let{y:i,height:s}=n;return e==="top"?i+=t:e==="bottom"?i-=s+t:i-=s/2,i}function bh(n,e,t,i){const{caretSize:s,caretPadding:r,cornerRadius:o}=n,{xAlign:a,yAlign:c}=t,l=s+r,{topLeft:h,topRight:d,bottomLeft:u,bottomRight:f}=ki(o);let p=II(e,a);const _=SI(e,c,l);return c==="center"?a==="left"?p+=l:a==="right"&&(p-=l):a==="left"?p-=Math.max(h,u)+s:a==="right"&&(p+=Math.max(d,f)+s),{x:qe(p,0,i.width-e.width),y:qe(_,0,i.height-e.height)}}function Ss(n,e,t){const i=tt(t.padding);return e==="center"?n.x+n.width/2:e==="right"?n.x+n.width-i.right:n.x+i.left}function wh(n){return st([],gt(n))}function TI(n,e,t){return Qn(n,{tooltip:e,tooltipItems:t,type:"tooltip"})}function Eh(n,e){const t=e&&e.dataset&&e.dataset.tooltip&&e.dataset.tooltip.callbacks;return t?n.override(t):n}const Uf={beforeTitle:ft,title(n){if(n.length>0){const e=n[0],t=e.chart.data.labels,i=t?t.length:0;if(this&&this.options&&this.options.mode==="dataset")return e.dataset.label||"";if(e.label)return e.label;if(i>0&&e.dataIndex<i)return t[e.dataIndex]}return""},afterTitle:ft,beforeBody:ft,beforeLabel:ft,label(n){if(this&&this.options&&this.options.mode==="dataset")return n.label+": "+n.formattedValue||n.formattedValue;let e=n.dataset.label||"";e&&(e+=": ");const t=n.formattedValue;return Pe(t)||(e+=t),e},labelColor(n){const t=n.chart.getDatasetMeta(n.datasetIndex).controller.getStyle(n.dataIndex);return{borderColor:t.borderColor,backgroundColor:t.backgroundColor,borderWidth:t.borderWidth,borderDash:t.borderDash,borderDashOffset:t.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(n){const t=n.chart.getDatasetMeta(n.datasetIndex).controller.getStyle(n.dataIndex);return{pointStyle:t.pointStyle,rotation:t.rotation}},afterLabel:ft,afterBody:ft,beforeFooter:ft,footer:ft,afterFooter:ft};function Le(n,e,t,i){const s=n[e].call(t,i);return typeof s>"u"?Uf[e].call(t,i):s}class Ch extends as{static positioners=gi;constructor(e){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=e.chart,this.options=e.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(e){this.options=e,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const e=this._cachedAnimations;if(e)return e;const t=this.chart,i=this.options.setContext(this.getContext()),s=i.enabled&&t.options.animation&&i.animations,r=new Tf(this.chart,s);return s._cacheable&&(this._cachedAnimations=Object.freeze(r)),r}getContext(){return this.$context||(this.$context=TI(this.chart.getContext(),this,this._tooltipItems))}getTitle(e,t){const{callbacks:i}=t,s=Le(i,"beforeTitle",this,e),r=Le(i,"title",this,e),o=Le(i,"afterTitle",this,e);let a=[];return a=st(a,gt(s)),a=st(a,gt(r)),a=st(a,gt(o)),a}getBeforeBody(e,t){return wh(Le(t.callbacks,"beforeBody",this,e))}getBody(e,t){const{callbacks:i}=t,s=[];return X(e,r=>{const o={before:[],lines:[],after:[]},a=Eh(i,r);st(o.before,gt(Le(a,"beforeLabel",this,r))),st(o.lines,Le(a,"label",this,r)),st(o.after,gt(Le(a,"afterLabel",this,r))),s.push(o)}),s}getAfterBody(e,t){return wh(Le(t.callbacks,"afterBody",this,e))}getFooter(e,t){const{callbacks:i}=t,s=Le(i,"beforeFooter",this,e),r=Le(i,"footer",this,e),o=Le(i,"afterFooter",this,e);let a=[];return a=st(a,gt(s)),a=st(a,gt(r)),a=st(a,gt(o)),a}_createItems(e){const t=this._active,i=this.chart.data,s=[],r=[],o=[];let a=[],c,l;for(c=0,l=t.length;c<l;++c)a.push(bI(this.chart,t[c]));return e.filter&&(a=a.filter((h,d,u)=>e.filter(h,d,u,i))),e.itemSort&&(a=a.sort((h,d)=>e.itemSort(h,d,i))),X(a,h=>{const d=Eh(e.callbacks,h);s.push(Le(d,"labelColor",this,h)),r.push(Le(d,"labelPointStyle",this,h)),o.push(Le(d,"labelTextColor",this,h))}),this.labelColors=s,this.labelPointStyles=r,this.labelTextColors=o,this.dataPoints=a,a}update(e,t){const i=this.options.setContext(this.getContext()),s=this._active;let r,o=[];if(!s.length)this.opacity!==0&&(r={opacity:0});else{const a=gi[i.position].call(this,s,this._eventPosition);o=this._createItems(i),this.title=this.getTitle(o,i),this.beforeBody=this.getBeforeBody(o,i),this.body=this.getBody(o,i),this.afterBody=this.getAfterBody(o,i),this.footer=this.getFooter(o,i);const c=this._size=yh(this,i),l=Object.assign({},a,c),h=vh(this.chart,i,l),d=bh(i,l,h,this.chart);this.xAlign=h.xAlign,this.yAlign=h.yAlign,r={opacity:1,x:d.x,y:d.y,width:c.width,height:c.height,caretX:a.x,caretY:a.y}}this._tooltipItems=o,this.$context=void 0,r&&this._resolveAnimations().update(this,r),e&&i.external&&i.external.call(this,{chart:this.chart,tooltip:this,replay:t})}drawCaret(e,t,i,s){const r=this.getCaretPosition(e,i,s);t.lineTo(r.x1,r.y1),t.lineTo(r.x2,r.y2),t.lineTo(r.x3,r.y3)}getCaretPosition(e,t,i){const{xAlign:s,yAlign:r}=this,{caretSize:o,cornerRadius:a}=i,{topLeft:c,topRight:l,bottomLeft:h,bottomRight:d}=ki(a),{x:u,y:f}=e,{width:p,height:_}=t;let m,v,b,E,I,T;return r==="center"?(I=f+_/2,s==="left"?(m=u,v=m-o,E=I+o,T=I-o):(m=u+p,v=m+o,E=I-o,T=I+o),b=m):(s==="left"?v=u+Math.max(c,h)+o:s==="right"?v=u+p-Math.max(l,d)-o:v=this.caretX,r==="top"?(E=f,I=E-o,m=v-o,b=v+o):(E=f+_,I=E+o,m=v+o,b=v-o),T=E),{x1:m,x2:v,x3:b,y1:E,y2:I,y3:T}}drawTitle(e,t,i){const s=this.title,r=s.length;let o,a,c;if(r){const l=On(i.rtl,this.x,this.width);for(e.x=Ss(this,i.titleAlign,i),t.textAlign=l.textAlign(i.titleAlign),t.textBaseline="middle",o=Ue(i.titleFont),a=i.titleSpacing,t.fillStyle=i.titleColor,t.font=o.string,c=0;c<r;++c)t.fillText(s[c],l.x(e.x),e.y+o.lineHeight/2),e.y+=o.lineHeight+a,c+1===r&&(e.y+=i.titleMarginBottom-a)}}_drawColorBox(e,t,i,s,r){const o=this.labelColors[i],a=this.labelPointStyles[i],{boxHeight:c,boxWidth:l}=r,h=Ue(r.bodyFont),d=Ss(this,"left",r),u=s.x(d),f=c<h.lineHeight?(h.lineHeight-c)/2:0,p=t.y+f;if(r.usePointStyle){const _={radius:Math.min(l,c)/2,pointStyle:a.pointStyle,rotation:a.rotation,borderWidth:1},m=s.leftForLtr(u,l)+l/2,v=p+c/2;e.strokeStyle=r.multiKeyBackground,e.fillStyle=r.multiKeyBackground,Hl(e,_,m,v),e.strokeStyle=o.borderColor,e.fillStyle=o.backgroundColor,Hl(e,_,m,v)}else{e.lineWidth=Y(o.borderWidth)?Math.max(...Object.values(o.borderWidth)):o.borderWidth||1,e.strokeStyle=o.borderColor,e.setLineDash(o.borderDash||[]),e.lineDashOffset=o.borderDashOffset||0;const _=s.leftForLtr(u,l),m=s.leftForLtr(s.xPlus(u,1),l-2),v=ki(o.borderRadius);Object.values(v).some(b=>b!==0)?(e.beginPath(),e.fillStyle=r.multiKeyBackground,Uo(e,{x:_,y:p,w:l,h:c,radius:v}),e.fill(),e.stroke(),e.fillStyle=o.backgroundColor,e.beginPath(),Uo(e,{x:m,y:p+1,w:l-2,h:c-2,radius:v}),e.fill()):(e.fillStyle=r.multiKeyBackground,e.fillRect(_,p,l,c),e.strokeRect(_,p,l,c),e.fillStyle=o.backgroundColor,e.fillRect(m,p+1,l-2,c-2))}e.fillStyle=this.labelTextColors[i]}drawBody(e,t,i){const{body:s}=this,{bodySpacing:r,bodyAlign:o,displayColors:a,boxHeight:c,boxWidth:l,boxPadding:h}=i,d=Ue(i.bodyFont);let u=d.lineHeight,f=0;const p=On(i.rtl,this.x,this.width),_=function(F){t.fillText(F,p.x(e.x+f),e.y+u/2),e.y+=u+r},m=p.textAlign(o);let v,b,E,I,T,O,$;for(t.textAlign=o,t.textBaseline="middle",t.font=d.string,e.x=Ss(this,m,i),t.fillStyle=i.bodyColor,X(this.beforeBody,_),f=a&&m!=="right"?o==="center"?l/2+h:l+2+h:0,I=0,O=s.length;I<O;++I){for(v=s[I],b=this.labelTextColors[I],t.fillStyle=b,X(v.before,_),E=v.lines,a&&E.length&&(this._drawColorBox(t,e,I,p,i),u=Math.max(d.lineHeight,c)),T=0,$=E.length;T<$;++T)_(E[T]),u=d.lineHeight;X(v.after,_)}f=0,u=d.lineHeight,X(this.afterBody,_),e.y-=r}drawFooter(e,t,i){const s=this.footer,r=s.length;let o,a;if(r){const c=On(i.rtl,this.x,this.width);for(e.x=Ss(this,i.footerAlign,i),e.y+=i.footerMarginTop,t.textAlign=c.textAlign(i.footerAlign),t.textBaseline="middle",o=Ue(i.footerFont),t.fillStyle=i.footerColor,t.font=o.string,a=0;a<r;++a)t.fillText(s[a],c.x(e.x),e.y+o.lineHeight/2),e.y+=o.lineHeight+i.footerSpacing}}drawBackground(e,t,i,s){const{xAlign:r,yAlign:o}=this,{x:a,y:c}=e,{width:l,height:h}=i,{topLeft:d,topRight:u,bottomLeft:f,bottomRight:p}=ki(s.cornerRadius);t.fillStyle=s.backgroundColor,t.strokeStyle=s.borderColor,t.lineWidth=s.borderWidth,t.beginPath(),t.moveTo(a+d,c),o==="top"&&this.drawCaret(e,t,i,s),t.lineTo(a+l-u,c),t.quadraticCurveTo(a+l,c,a+l,c+u),o==="center"&&r==="right"&&this.drawCaret(e,t,i,s),t.lineTo(a+l,c+h-p),t.quadraticCurveTo(a+l,c+h,a+l-p,c+h),o==="bottom"&&this.drawCaret(e,t,i,s),t.lineTo(a+f,c+h),t.quadraticCurveTo(a,c+h,a,c+h-f),o==="center"&&r==="left"&&this.drawCaret(e,t,i,s),t.lineTo(a,c+d),t.quadraticCurveTo(a,c,a+d,c),t.closePath(),t.fill(),s.borderWidth>0&&t.stroke()}_updateAnimationTarget(e){const t=this.chart,i=this.$animations,s=i&&i.x,r=i&&i.y;if(s||r){const o=gi[e.position].call(this,this._active,this._eventPosition);if(!o)return;const a=this._size=yh(this,e),c=Object.assign({},o,this._size),l=vh(t,e,c),h=bh(e,c,l,t);(s._to!==h.x||r._to!==h.y)&&(this.xAlign=l.xAlign,this.yAlign=l.yAlign,this.width=a.width,this.height=a.height,this.caretX=o.x,this.caretY=o.y,this._resolveAnimations().update(this,h))}}_willRender(){return!!this.opacity}draw(e){const t=this.options.setContext(this.getContext());let i=this.opacity;if(!i)return;this._updateAnimationTarget(t);const s={width:this.width,height:this.height},r={x:this.x,y:this.y};i=Math.abs(i)<.001?0:i;const o=tt(t.padding),a=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;t.enabled&&a&&(e.save(),e.globalAlpha=i,this.drawBackground(r,e,s,t),If(e,t.textDirection),r.y+=o.top,this.drawTitle(r,e,t),this.drawBody(r,e,t),this.drawFooter(r,e,t),Sf(e,t.textDirection),e.restore())}getActiveElements(){return this._active||[]}setActiveElements(e,t){const i=this._active,s=e.map(({datasetIndex:a,index:c})=>{const l=this.chart.getDatasetMeta(a);if(!l)throw new Error("Cannot find a dataset at index "+a);return{datasetIndex:a,element:l.data[c],index:c}}),r=!rr(i,s),o=this._positionChanged(s,t);(r||o)&&(this._active=s,this._eventPosition=t,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(e,t,i=!0){if(t&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const s=this.options,r=this._active||[],o=this._getActiveElements(e,r,t,i),a=this._positionChanged(o,e),c=t||!rr(o,r)||a;return c&&(this._active=o,(s.enabled||s.external)&&(this._eventPosition={x:e.x,y:e.y},this.update(!0,t))),c}_getActiveElements(e,t,i,s){const r=this.options;if(e.type==="mouseout")return[];if(!s)return t.filter(a=>this.chart.data.datasets[a.datasetIndex]&&this.chart.getDatasetMeta(a.datasetIndex).controller.getParsed(a.index)!==void 0);const o=this.chart.getElementsAtEventForMode(e,r.mode,r,i);return r.reverse&&o.reverse(),o}_positionChanged(e,t){const{caretX:i,caretY:s,options:r}=this,o=gi[r.position].call(this,e,t);return o!==!1&&(i!==o.x||s!==o.y)}}var kI={id:"tooltip",_element:Ch,positioners:gi,afterInit(n,e,t){t&&(n.tooltip=new Ch({chart:n,options:t}))},beforeUpdate(n,e,t){n.tooltip&&n.tooltip.initialize(t)},reset(n,e,t){n.tooltip&&n.tooltip.initialize(t)},afterDraw(n){const e=n.tooltip;if(e&&e._willRender()){const t={tooltip:e};if(n.notifyPlugins("beforeTooltipDraw",{...t,cancelable:!0})===!1)return;e.draw(n.ctx),n.notifyPlugins("afterTooltipDraw",t)}},afterEvent(n,e){if(n.tooltip){const t=e.replay;n.tooltip.handleEvent(e.event,t,e.inChartArea)&&(e.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(n,e)=>e.bodyFont.size,boxWidth:(n,e)=>e.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:Uf},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:n=>n!=="filter"&&n!=="itemSort"&&n!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]};const Dr={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},Fe=Object.keys(Dr);function Ih(n,e){return n-e}function Sh(n,e){if(Pe(e))return null;const t=n._adapter,{parser:i,round:s,isoWeekday:r}=n._parseOpts;let o=e;return typeof i=="function"&&(o=i(o)),St(o)||(o=typeof i=="string"?t.parse(o,i):t.parse(o)),o===null?null:(s&&(o=s==="week"&&(lr(r)||r===!0)?t.startOf(o,"isoWeek",r):t.startOf(o,s)),+o)}function Th(n,e,t,i){const s=Fe.length;for(let r=Fe.indexOf(n);r<s-1;++r){const o=Dr[Fe[r]],a=o.steps?o.steps:Number.MAX_SAFE_INTEGER;if(o.common&&Math.ceil((t-e)/(a*o.size))<=i)return Fe[r]}return Fe[s-1]}function xI(n,e,t,i,s){for(let r=Fe.length-1;r>=Fe.indexOf(t);r--){const o=Fe[r];if(Dr[o].common&&n._adapter.diff(s,i,o)>=e-1)return o}return Fe[t?Fe.indexOf(t):0]}function AI(n){for(let e=Fe.indexOf(n)+1,t=Fe.length;e<t;++e)if(Dr[Fe[e]].common)return Fe[e]}function kh(n,e,t){if(!t)n[e]=!0;else if(t.length){const{lo:i,hi:s}=Va(t,e),r=t[i]>=e?t[i]:t[s];n[r]=!0}}function RI(n,e,t,i){const s=n._adapter,r=+s.startOf(e[0].value,i),o=e[e.length-1].value;let a,c;for(a=r;a<=o;a=+s.add(a,1,i))c=t[a],c>=0&&(e[c].major=!0);return e}function xh(n,e,t){const i=[],s={},r=e.length;let o,a;for(o=0;o<r;++o)a=e[o],s[a]=o,i.push({value:a,major:!1});return r===0||!t?i:RI(n,i,s,t)}class Ah extends Mr{static id="time";static defaults={bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}};constructor(e){super(e),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(e,t={}){const i=e.time||(e.time={}),s=this._adapter=new JE._date(e.adapters.date);s.init(t),Ii(i.displayFormats,s.formats()),this._parseOpts={parser:i.parser,round:i.round,isoWeekday:i.isoWeekday},super.init(e),this._normalized=t.normalized}parse(e,t){return e===void 0?null:Sh(this,e)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const e=this.options,t=this._adapter,i=e.time.unit||"day";let{min:s,max:r,minDefined:o,maxDefined:a}=this.getUserBounds();function c(l){!o&&!isNaN(l.min)&&(s=Math.min(s,l.min)),!a&&!isNaN(l.max)&&(r=Math.max(r,l.max))}(!o||!a)&&(c(this._getLabelBounds()),(e.bounds!=="ticks"||e.ticks.source!=="labels")&&c(this.getMinMax(!1))),s=St(s)&&!isNaN(s)?s:+t.startOf(Date.now(),i),r=St(r)&&!isNaN(r)?r:+t.endOf(Date.now(),i)+1,this.min=Math.min(s,r-1),this.max=Math.max(s+1,r)}_getLabelBounds(){const e=this.getLabelTimestamps();let t=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY;return e.length&&(t=e[0],i=e[e.length-1]),{min:t,max:i}}buildTicks(){const e=this.options,t=e.time,i=e.ticks,s=i.source==="labels"?this.getLabelTimestamps():this._generate();e.bounds==="ticks"&&s.length&&(this.min=this._userMin||s[0],this.max=this._userMax||s[s.length-1]);const r=this.min,o=this.max,a=j0(s,r,o);return this._unit=t.unit||(i.autoSkip?Th(t.minUnit,this.min,this.max,this._getLabelCapacity(r)):xI(this,a.length,t.minUnit,this.min,this.max)),this._majorUnit=!i.major.enabled||this._unit==="year"?void 0:AI(this._unit),this.initOffsets(s),e.reverse&&a.reverse(),xh(this,a,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(e=>+e.value))}initOffsets(e=[]){let t=0,i=0,s,r;this.options.offset&&e.length&&(s=this.getDecimalForValue(e[0]),e.length===1?t=1-s:t=(this.getDecimalForValue(e[1])-s)/2,r=this.getDecimalForValue(e[e.length-1]),e.length===1?i=r:i=(r-this.getDecimalForValue(e[e.length-2]))/2);const o=e.length<3?.5:.25;t=qe(t,0,o),i=qe(i,0,o),this._offsets={start:t,end:i,factor:1/(t+1+i)}}_generate(){const e=this._adapter,t=this.min,i=this.max,s=this.options,r=s.time,o=r.unit||Th(r.minUnit,t,i,this._getLabelCapacity(t)),a=Q(s.ticks.stepSize,1),c=o==="week"?r.isoWeekday:!1,l=lr(c)||c===!0,h={};let d=t,u,f;if(l&&(d=+e.startOf(d,"isoWeek",c)),d=+e.startOf(d,l?"day":o),e.diff(i,t,o)>1e5*a)throw new Error(t+" and "+i+" are too far apart with stepSize of "+a+" "+o);const p=s.ticks.source==="data"&&this.getDataTimestamps();for(u=d,f=0;u<i;u=+e.add(u,a,o),f++)kh(h,u,p);return(u===i||s.bounds==="ticks"||f===1)&&kh(h,u,p),Object.keys(h).sort(Ih).map(_=>+_)}getLabelForValue(e){const t=this._adapter,i=this.options.time;return i.tooltipFormat?t.format(e,i.tooltipFormat):t.format(e,i.displayFormats.datetime)}format(e,t){const s=this.options.time.displayFormats,r=this._unit,o=t||s[r];return this._adapter.format(e,o)}_tickFormatFunction(e,t,i,s){const r=this.options,o=r.ticks.callback;if(o)return ae(o,[e,t,i],this);const a=r.time.displayFormats,c=this._unit,l=this._majorUnit,h=c&&a[c],d=l&&a[l],u=i[t],f=l&&d&&u&&u.major;return this._adapter.format(e,s||(f?d:h))}generateTickLabels(e){let t,i,s;for(t=0,i=e.length;t<i;++t)s=e[t],s.label=this._tickFormatFunction(s.value,t,e)}getDecimalForValue(e){return e===null?NaN:(e-this.min)/(this.max-this.min)}getPixelForValue(e){const t=this._offsets,i=this.getDecimalForValue(e);return this.getPixelForDecimal((t.start+i)*t.factor)}getValueForPixel(e){const t=this._offsets,i=this.getDecimalForPixel(e)/t.factor-t.end;return this.min+i*(this.max-this.min)}_getLabelSize(e){const t=this.options.ticks,i=this.ctx.measureText(e).width,s=cn(this.isHorizontal()?t.maxRotation:t.minRotation),r=Math.cos(s),o=Math.sin(s),a=this._resolveTickFontOptions(0).size;return{w:i*r+a*o,h:i*o+a*r}}_getLabelCapacity(e){const t=this.options.time,i=t.displayFormats,s=i[t.unit]||i.millisecond,r=this._tickFormatFunction(e,0,xh(this,[e],this._majorUnit),s),o=this._getLabelSize(r),a=Math.floor(this.isHorizontal()?this.width/o.w:this.height/o.h)-1;return a>0?a:1}getDataTimestamps(){let e=this._cache.data||[],t,i;if(e.length)return e;const s=this.getMatchingVisibleMetas();if(this._normalized&&s.length)return this._cache.data=s[0].controller.getAllParsedValues(this);for(t=0,i=s.length;t<i;++t)e=e.concat(s[t].controller.getAllParsedValues(this));return this._cache.data=this.normalize(e)}getLabelTimestamps(){const e=this._cache.labels||[];let t,i;if(e.length)return e;const s=this.getLabels();for(t=0,i=s.length;t<i;++t)e.push(Sh(this,s[t]));return this._cache.labels=this._normalized?e:this.normalize(e)}normalize(e){return G0(e.sort(Ih))}}function Ts(n,e,t){let i=0,s=n.length-1,r,o,a,c;t?(e>=n[i].pos&&e<=n[s].pos&&({lo:i,hi:s}=Fo(n,"pos",e)),{pos:r,time:a}=n[i],{pos:o,time:c}=n[s]):(e>=n[i].time&&e<=n[s].time&&({lo:i,hi:s}=Fo(n,"time",e)),{time:r,pos:a}=n[i],{time:o,pos:c}=n[s]);const l=o-r;return l?a+(c-a)*(e-r)/l:a}class IS extends Ah{static id="timeseries";static defaults=Ah.defaults;constructor(e){super(e),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const e=this._getTimestampsForTable(),t=this._table=this.buildLookupTable(e);this._minPos=Ts(t,this.min),this._tableRange=Ts(t,this.max)-this._minPos,super.initOffsets(e)}buildLookupTable(e){const{min:t,max:i}=this,s=[],r=[];let o,a,c,l,h;for(o=0,a=e.length;o<a;++o)l=e[o],l>=t&&l<=i&&s.push(l);if(s.length<2)return[{time:t,pos:0},{time:i,pos:1}];for(o=0,a=s.length;o<a;++o)h=s[o+1],c=s[o-1],l=s[o],Math.round((h+c)/2)!==l&&r.push({time:l,pos:o/(a-1)});return r}_generate(){const e=this.min,t=this.max;let i=super.getDataTimestamps();return(!i.includes(e)||!i.length)&&i.splice(0,0,e),(!i.includes(t)||i.length===1)&&i.push(t),i.sort((s,r)=>s-r)}_getTimestampsForTable(){let e=this._cache.all||[];if(e.length)return e;const t=this.getDataTimestamps(),i=this.getLabelTimestamps();return t.length&&i.length?e=this.normalize(t.concat(i)):e=t.length?t:i,e=this._cache.all=e,e}getDecimalForValue(e){return(Ts(this._table,e)-this._minPos)/this._tableRange}getValueForPixel(e){const t=this._offsets,i=this.getDecimalForPixel(e)/t.factor-t.end;return Ts(this._table,i*this._tableRange+this._minPos,!0)}}var cs={};(function n(e,t,i,s){var r=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),o=typeof Path2D=="function"&&typeof DOMMatrix=="function",a=function(){if(!e.OffscreenCanvas)return!1;var y=new OffscreenCanvas(1,1),g=y.getContext("2d");g.fillRect(0,0,1,1);var S=y.transferToImageBitmap();try{g.createPattern(S,"no-repeat")}catch{return!1}return!0}();function c(){}function l(y){var g=t.exports.Promise,S=g!==void 0?g:e.Promise;return typeof S=="function"?new S(y):(y(c,c),null)}var h=function(y,g){return{transform:function(S){if(y)return S;if(g.has(S))return g.get(S);var k=new OffscreenCanvas(S.width,S.height),R=k.getContext("2d");return R.drawImage(S,0,0),g.set(S,k),k},clear:function(){g.clear()}}}(a,new Map),d=function(){var y=Math.floor(16.666666666666668),g,S,k={},R=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(g=function(M){var D=Math.random();return k[D]=requestAnimationFrame(function P(W){R===W||R+y-1<W?(R=W,delete k[D],M()):k[D]=requestAnimationFrame(P)}),D},S=function(M){k[M]&&cancelAnimationFrame(k[M])}):(g=function(M){return setTimeout(M,y)},S=function(M){return clearTimeout(M)}),{frame:g,cancel:S}}(),u=function(){var y,g,S={};function k(R){function M(D,P){R.postMessage({options:D||{},callback:P})}R.init=function(P){var W=P.transferControlToOffscreen();R.postMessage({canvas:W},[W])},R.fire=function(P,W,ie){if(g)return M(P,null),g;var ue=Math.random().toString(36).slice(2);return g=l(function(re){function fe(Te){Te.data.callback===ue&&(delete S[ue],R.removeEventListener("message",fe),g=null,h.clear(),ie(),re())}R.addEventListener("message",fe),M(P,ue),S[ue]=fe.bind(null,{data:{callback:ue}})}),g},R.reset=function(){R.postMessage({reset:!0});for(var P in S)S[P](),delete S[P]}}return function(){if(y)return y;if(!i&&r){var R=["var CONFETTI, SIZE = {}, module = {};","("+n.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{y=new Worker(URL.createObjectURL(new Blob([R])))}catch(M){return typeof console!==void 0&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",M),null}k(y)}return y}}(),f={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function p(y,g){return g?g(y):y}function _(y){return y!=null}function m(y,g,S){return p(y&&_(y[g])?y[g]:f[g],S)}function v(y){return y<0?0:Math.floor(y)}function b(y,g){return Math.floor(Math.random()*(g-y))+y}function E(y){return parseInt(y,16)}function I(y){return y.map(T)}function T(y){var g=String(y).replace(/[^0-9a-f]/gi,"");return g.length<6&&(g=g[0]+g[0]+g[1]+g[1]+g[2]+g[2]),{r:E(g.substring(0,2)),g:E(g.substring(2,4)),b:E(g.substring(4,6))}}function O(y){var g=m(y,"origin",Object);return g.x=m(g,"x",Number),g.y=m(g,"y",Number),g}function $(y){y.width=document.documentElement.clientWidth,y.height=document.documentElement.clientHeight}function F(y){var g=y.getBoundingClientRect();y.width=g.width,y.height=g.height}function ee(y){var g=document.createElement("canvas");return g.style.position="fixed",g.style.top="0px",g.style.left="0px",g.style.pointerEvents="none",g.style.zIndex=y,g}function z(y,g,S,k,R,M,D,P,W){y.save(),y.translate(g,S),y.rotate(M),y.scale(k,R),y.arc(0,0,1,D,P,W),y.restore()}function K(y){var g=y.angle*(Math.PI/180),S=y.spread*(Math.PI/180);return{x:y.x,y:y.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:y.startVelocity*.5+Math.random()*y.startVelocity,angle2D:-g+(.5*S-Math.random()*S),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:y.color,shape:y.shape,tick:0,totalTicks:y.ticks,decay:y.decay,drift:y.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:y.gravity*3,ovalScalar:.6,scalar:y.scalar,flat:y.flat}}function V(y,g){g.x+=Math.cos(g.angle2D)*g.velocity+g.drift,g.y+=Math.sin(g.angle2D)*g.velocity+g.gravity,g.velocity*=g.decay,g.flat?(g.wobble=0,g.wobbleX=g.x+10*g.scalar,g.wobbleY=g.y+10*g.scalar,g.tiltSin=0,g.tiltCos=0,g.random=1):(g.wobble+=g.wobbleSpeed,g.wobbleX=g.x+10*g.scalar*Math.cos(g.wobble),g.wobbleY=g.y+10*g.scalar*Math.sin(g.wobble),g.tiltAngle+=.1,g.tiltSin=Math.sin(g.tiltAngle),g.tiltCos=Math.cos(g.tiltAngle),g.random=Math.random()+2);var S=g.tick++/g.totalTicks,k=g.x+g.random*g.tiltCos,R=g.y+g.random*g.tiltSin,M=g.wobbleX+g.random*g.tiltCos,D=g.wobbleY+g.random*g.tiltSin;if(y.fillStyle="rgba("+g.color.r+", "+g.color.g+", "+g.color.b+", "+(1-S)+")",y.beginPath(),o&&g.shape.type==="path"&&typeof g.shape.path=="string"&&Array.isArray(g.shape.matrix))y.fill(he(g.shape.path,g.shape.matrix,g.x,g.y,Math.abs(M-k)*.1,Math.abs(D-R)*.1,Math.PI/10*g.wobble));else if(g.shape.type==="bitmap"){var P=Math.PI/10*g.wobble,W=Math.abs(M-k)*.1,ie=Math.abs(D-R)*.1,ue=g.shape.bitmap.width*g.scalar,re=g.shape.bitmap.height*g.scalar,fe=new DOMMatrix([Math.cos(P)*W,Math.sin(P)*W,-Math.sin(P)*ie,Math.cos(P)*ie,g.x,g.y]);fe.multiplySelf(new DOMMatrix(g.shape.matrix));var Te=y.createPattern(h.transform(g.shape.bitmap),"no-repeat");Te.setTransform(fe),y.globalAlpha=1-S,y.fillStyle=Te,y.fillRect(g.x-ue/2,g.y-re/2,ue,re),y.globalAlpha=1}else if(g.shape==="circle")y.ellipse?y.ellipse(g.x,g.y,Math.abs(M-k)*g.ovalScalar,Math.abs(D-R)*g.ovalScalar,Math.PI/10*g.wobble,0,2*Math.PI):z(y,g.x,g.y,Math.abs(M-k)*g.ovalScalar,Math.abs(D-R)*g.ovalScalar,Math.PI/10*g.wobble,0,2*Math.PI);else if(g.shape==="star")for(var j=Math.PI/2*3,Ne=4*g.scalar,Ge=8*g.scalar,Ye=g.x,ut=g.y,Qt=5,nt=Math.PI/Qt;Qt--;)Ye=g.x+Math.cos(j)*Ge,ut=g.y+Math.sin(j)*Ge,y.lineTo(Ye,ut),j+=nt,Ye=g.x+Math.cos(j)*Ne,ut=g.y+Math.sin(j)*Ne,y.lineTo(Ye,ut),j+=nt;else y.moveTo(Math.floor(g.x),Math.floor(g.y)),y.lineTo(Math.floor(g.wobbleX),Math.floor(R)),y.lineTo(Math.floor(M),Math.floor(D)),y.lineTo(Math.floor(k),Math.floor(g.wobbleY));return y.closePath(),y.fill(),g.tick<g.totalTicks}function _e(y,g,S,k,R){var M=g.slice(),D=y.getContext("2d"),P,W,ie=l(function(ue){function re(){P=W=null,D.clearRect(0,0,k.width,k.height),h.clear(),R(),ue()}function fe(){i&&!(k.width===s.width&&k.height===s.height)&&(k.width=y.width=s.width,k.height=y.height=s.height),!k.width&&!k.height&&(S(y),k.width=y.width,k.height=y.height),D.clearRect(0,0,k.width,k.height),M=M.filter(function(Te){return V(D,Te)}),M.length?P=d.frame(fe):re()}P=d.frame(fe),W=re});return{addFettis:function(ue){return M=M.concat(ue),ie},canvas:y,promise:ie,reset:function(){P&&d.cancel(P),W&&W()}}}function Ae(y,g){var S=!y,k=!!m(g||{},"resize"),R=!1,M=m(g,"disableForReducedMotion",Boolean),D=r&&!!m(g||{},"useWorker"),P=D?u():null,W=S?$:F,ie=y&&P?!!y.__confetti_initialized:!1,ue=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,re;function fe(j,Ne,Ge){for(var Ye=m(j,"particleCount",v),ut=m(j,"angle",Number),Qt=m(j,"spread",Number),nt=m(j,"startVelocity",Number),Gf=m(j,"decay",Number),Yf=m(j,"gravity",Number),Kf=m(j,"drift",Number),ic=m(j,"colors",I),Xf=m(j,"ticks",Number),sc=m(j,"shapes"),Qf=m(j,"scalar"),Jf=!!m(j,"flat"),rc=O(j),oc=Ye,Wr=[],Zf=y.width*rc.x,ep=y.height*rc.y;oc--;)Wr.push(K({x:Zf,y:ep,angle:ut,spread:Qt,startVelocity:nt,color:ic[oc%ic.length],shape:sc[b(0,sc.length)],ticks:Xf,decay:Gf,gravity:Yf,drift:Kf,scalar:Qf,flat:Jf}));return re?re.addFettis(Wr):(re=_e(y,Wr,W,Ne,Ge),re.promise)}function Te(j){var Ne=M||m(j,"disableForReducedMotion",Boolean),Ge=m(j,"zIndex",Number);if(Ne&&ue)return l(function(nt){nt()});S&&re?y=re.canvas:S&&!y&&(y=ee(Ge),document.body.appendChild(y)),k&&!ie&&W(y);var Ye={width:y.width,height:y.height};P&&!ie&&P.init(y),ie=!0,P&&(y.__confetti_initialized=!0);function ut(){if(P){var nt={getBoundingClientRect:function(){if(!S)return y.getBoundingClientRect()}};W(nt),P.postMessage({resize:{width:nt.width,height:nt.height}});return}Ye.width=Ye.height=null}function Qt(){re=null,k&&(R=!1,e.removeEventListener("resize",ut)),S&&y&&(document.body.contains(y)&&document.body.removeChild(y),y=null,ie=!1)}return k&&!R&&(R=!0,e.addEventListener("resize",ut,!1)),P?P.fire(j,Ye,Qt):fe(j,Ye,Qt)}return Te.reset=function(){P&&P.reset(),re&&re.reset()},Te}var q;function te(){return q||(q=Ae(null,{useWorker:!0,resize:!0})),q}function he(y,g,S,k,R,M,D){var P=new Path2D(y),W=new Path2D;W.addPath(P,new DOMMatrix(g));var ie=new Path2D;return ie.addPath(W,new DOMMatrix([Math.cos(D)*R,Math.sin(D)*R,-Math.sin(D)*M,Math.cos(D)*M,S,k])),ie}function $e(y){if(!o)throw new Error("path confetti are not supported in this browser");var g,S;typeof y=="string"?g=y:(g=y.path,S=y.matrix);var k=new Path2D(g),R=document.createElement("canvas"),M=R.getContext("2d");if(!S){for(var D=1e3,P=D,W=D,ie=0,ue=0,re,fe,Te=0;Te<D;Te+=2)for(var j=0;j<D;j+=2)M.isPointInPath(k,Te,j,"nonzero")&&(P=Math.min(P,Te),W=Math.min(W,j),ie=Math.max(ie,Te),ue=Math.max(ue,j));re=ie-P,fe=ue-W;var Ne=10,Ge=Math.min(Ne/re,Ne/fe);S=[Ge,0,0,Ge,-Math.round(re/2+P)*Ge,-Math.round(fe/2+W)*Ge]}return{type:"path",path:g,matrix:S}}function we(y){var g,S=1,k="#000000",R='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof y=="string"?g=y:(g=y.text,S="scalar"in y?y.scalar:S,R="fontFamily"in y?y.fontFamily:R,k="color"in y?y.color:k);var M=10*S,D=""+M+"px "+R,P=new OffscreenCanvas(M,M),W=P.getContext("2d");W.font=D;var ie=W.measureText(g),ue=Math.ceil(ie.actualBoundingBoxRight+ie.actualBoundingBoxLeft),re=Math.ceil(ie.actualBoundingBoxAscent+ie.actualBoundingBoxDescent),fe=2,Te=ie.actualBoundingBoxLeft+fe,j=ie.actualBoundingBoxAscent+fe;ue+=fe+fe,re+=fe+fe,P=new OffscreenCanvas(ue,re),W=P.getContext("2d"),W.font=D,W.fillStyle=k,W.fillText(g,Te,j);var Ne=1/S;return{type:"bitmap",bitmap:P.transferToImageBitmap(),matrix:[Ne,0,0,Ne,-ue*Ne/2,-re*Ne/2]}}t.exports=function(){return te().apply(this,arguments)},t.exports.reset=function(){te().reset()},t.exports.create=Ae,t.exports.shapeFromPath=$e,t.exports.shapeFromText=we})(function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}}(),cs,!1);const Wn=cs.exports;cs.exports.create;ec.register(QE,fI,kI,vI);let At=null;async function PI(){try{const n=document.getElementById("drinkType").value,e=parseInt(document.getElementById("drinkAmount").value)||0,t=parseFloat(document.getElementById("alcoholPercent").value)||0;if(e<=0){C("❌ Please enter a valid amount","error");return}const i={id:Date.now(),type:n,amount:e,alcoholPercent:t,pureAlcohol:(e*t/100).toFixed(1),time:new Date,emoji:Dn[n].emoji};let s=L().drinkHistory||[];s.unshift(i),Se("drinkHistory",s),Br(),Or(),Nr(),Lr(),Fr();const r=J(),o=le();if(r&&o)try{await xe(N(r,"users/"+o.uid+"/drinks/"+i.id),{...i,time:i.time.toISOString()})}catch(a){console.warn("Firebase save failed (non-critical):",a)}typeof onDrinkLogged=="function"&&onDrinkLogged(n,s),n==="water"?(typeof window.confetti=="function"&&window.confetti({particleCount:50,spread:60,colors:["#00d4ff","#0099ff","#0066ff"],origin:{y:.6}}),C("💧 Great job staying hydrated!","success")):C(`${i.emoji} Drink logged!`),document.getElementById("drinkAmount").value=Dn[n].amount,document.getElementById("alcoholPercent").value=Dn[n].alcohol}catch(n){console.error("Error logging drink:",n),C("❌ Failed to log drink","error")}}function Or(){try{const n=L().drinkHistory||[],t=Date.now()-36e5,i=n.filter(d=>d.type!=="water").length,s=n.filter(d=>d.type==="water").length,r=n.reduce((d,u)=>d+parseFloat(u.pureAlcohol||0),0),o=n.filter(d=>new Date(d.time).getTime()>t&&d.type!=="water").length,a=document.getElementById("totalDrinks");a&&(a.textContent=i);const c=document.getElementById("totalWater");c&&(c.textContent=s);const l=document.getElementById("totalAlcohol");l&&(l.textContent=r.toFixed(0)+"ml");const h=document.getElementById("drinkRate");h&&(h.textContent=o+"/hr")}catch(n){console.error("Error updating drink stats:",n)}}function Nr(){try{const n=document.getElementById("drinkHistory");if(!n)return;const e=L().drinkHistory||[];if(e.length===0){n.innerHTML='<p style="text-align: center; opacity: 0.7;">No drinks logged yet</p>';return}n.innerHTML=e.slice(0,20).map(t=>`
            <div class="buddy-card" style="margin: 10px 0;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div style="font-size: 2em;">${t.emoji}</div>
                        <div>
                            <div style="font-weight: bold;">${t.type.charAt(0).toUpperCase()+t.type.slice(1)}</div>
                            <div style="opacity: 0.7; font-size: 0.9em;">
                                ${t.amount}ml • ${t.alcoholPercent}% • ${t.pureAlcohol}ml pure
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 0.9em;">${tc(t.time)}</div>
                        <button class="btn" style="padding: 5px 10px; margin-top: 5px;" onclick="removeDrink(${t.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join("")}catch(n){console.error("Error updating drink history:",n)}}function Lr(){try{const n=document.getElementById("drinkChart"),e=L().chartVisible;if(!n||!e)return;const t=L().drinkHistory||[],i={};if(t.forEach(a=>{i[a.type]||(i[a.type]=0),i[a.type]++}),Object.keys(i).length===0){At&&(At.destroy(),At=null);return}const s=Object.keys(i),r=Object.values(i),o=s.map(a=>Dn[a]?.emoji||"🍹");At?(At.data.labels=s.map((a,c)=>`${o[c]} ${a}`),At.data.datasets[0].data=r,At.update()):At=new ec(n,{type:"doughnut",data:{labels:s.map((a,c)=>`${o[c]} ${a}`),datasets:[{data:r,backgroundColor:["#00ff88","#00d4ff","#ff00ff","#ffcc00","#ff4444","#0099ff","#00ccff","#ff0088"],borderColor:"rgba(255, 255, 255, 0.1)",borderWidth:2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",labels:{color:"#fff",padding:10,font:{size:window.innerWidth<768?10:12}}}}}})}catch(n){console.error("Error updating drink chart:",n)}}function Fr(){const n=document.getElementById("emergencySummary");if(!n)return;const e=L().drinkHistory||[],t=e.reduce((a,c)=>a+parseFloat(c.pureAlcohol),0),i=e.length>0?((Date.now()-e[e.length-1].time)/36e5).toFixed(1):0,s={};e.forEach(a=>{s[a.type]||(s[a.type]=0),s[a.type]++});const r=localStorage.getItem("medicalInfo")||"None provided",o=localStorage.getItem("safetyNotes")||"None provided";n.innerHTML=`
        <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 15px; margin: 10px 0;">
            <p><strong>Time Period:</strong> ${i} hours</p>
            <p><strong>Total Pure Alcohol:</strong> ${t.toFixed(0)}ml</p>
            <p><strong>Drink Breakdown:</strong></p>
            <ul style="margin-left: 20px;">
                ${Object.entries(s).map(([a,c])=>`<li>${Dn[a].emoji} ${a}: ${c}</li>`).join("")}
            </ul>
            <p><strong>Last Drink:</strong> ${e.length>0?tc(e[0].time):"None"}</p>
            <p><strong>Estimated BAC:</strong> ${Wf().toFixed(3)}‰</p>
            <p><strong>Medical Info:</strong> ${yn(r)}</p>
            <p><strong>Safety Notes:</strong> ${yn(o)}</p>
        </div>
    `}function MI(n){let e=L().drinkHistory||[];e=e.filter(t=>t.id!==n),Se("drinkHistory",e),Br(),Or(),Nr(),Lr(),Fr(),C("🗑️ Drink removed")}function DI(){let n=L().chartVisible;n=!n,Se("chartVisible",n);const e=document.getElementById("chartWrapper"),t=document.getElementById("chartToggleText");n?(e.classList.remove("collapsed"),t.textContent="Hide Chart"):(e.classList.add("collapsed"),t.textContent="Show Chart")}function OI(){try{const n=L().drinkHistory||[],e=L().userData,t=le(),i={timestamp:new Date().toISOString(),estimatedBAC:Wf().toFixed(3),drinkHistory:n,totalAlcohol:n.reduce((o,a)=>o+parseFloat(a.pureAlcohol||0),0),userData:{name:e.username||t?.email||"Unknown",address:localStorage.getItem("homeAddress")||"Not provided",emergencyContact:localStorage.getItem("emergencyContact")||"Not provided",medicalInfo:localStorage.getItem("medicalInfo")||"None",safetyNotes:localStorage.getItem("safetyNotes")||"None"}},s=`EMERGENCY MEDICAL REPORT
========================
Generated: ${new Date().toLocaleString()}
Patient: ${i.userData.name}
Address: ${i.userData.address}
Emergency Contact: ${i.userData.emergencyContact}

MEDICAL INFORMATION
-------------------
${i.userData.medicalInfo}

SAFETY NOTES
------------
${i.userData.safetyNotes}

ALCOHOL CONSUMPTION SUMMARY
---------------------------
Estimated BAC: ${i.estimatedBAC}‰
Total Pure Alcohol: ${i.totalAlcohol.toFixed(0)}ml
Number of Drinks: ${n.filter(o=>o.type!=="water").length}
Water Consumed: ${n.filter(o=>o.type==="water").length} glasses

DETAILED DRINK LOG
------------------
${n.map(o=>`${tc(o.time)}: ${o.emoji} ${o.type} - ${o.amount}ml @ ${o.alcoholPercent}%`).join(`
`)}

MEDICAL NOTES
-------------
- Monitor for signs of alcohol poisoning
- Ensure airway remains clear
- Check vitals regularly
- Consider IV fluids if dehydrated`,r=`
            <h2>🚨 Emergency Medical Report</h2>
            <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 15px; margin: 20px 0; max-height: 400px; overflow-y: auto;">
                <pre style="white-space: pre-wrap; font-family: monospace; font-size: 0.9em;">${yn(s)}</pre>
            </div>
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <button class="btn btn-primary" onclick="copyEmergencyReport()">
                    <i class="fas fa-copy"></i> Copy Report
                </button>
                <button class="btn btn-primary" onclick="downloadEmergencyReport()">
                    <i class="fas fa-download"></i> Download
                </button>
                <button class="btn btn-danger" onclick="shareEmergencyReport()">
                    <i class="fas fa-share"></i> Share
                </button>
                <button class="btn" onclick="closeModal()">Close</button>
            </div>
        `;window.currentEmergencyReport=s,document.getElementById("modalBody").innerHTML=r,document.getElementById("modal").classList.add("show")}catch(n){console.error("Error generating emergency report:",n),C("❌ Error generating report","error")}}function Hf(){window.currentEmergencyReport&&navigator.clipboard.writeText(window.currentEmergencyReport).then(()=>C("📋 Report copied to clipboard!","success")).catch(()=>{const n=document.createElement("textarea");n.value=window.currentEmergencyReport,document.body.appendChild(n),n.select(),document.execCommand("copy"),document.body.removeChild(n),C("📋 Report copied!","success")})}function NI(){try{const n=new Blob([window.currentEmergencyReport],{type:"text/plain"}),e=window.URL.createObjectURL(n),t=document.createElement("a");t.href=e,t.download=`emergency_report_${new Date().toISOString().slice(0,10)}.txt`,document.body.appendChild(t),t.click(),document.body.removeChild(t),window.URL.revokeObjectURL(e),C("📥 Report downloaded!","success")}catch(n){console.error("Download error:",n),C("❌ Download failed - use copy instead","error")}}function LI(){navigator.share&&window.currentEmergencyReport?navigator.share({title:"Emergency Medical Report",text:window.currentEmergencyReport}).then(()=>C("📤 Report shared!","success")).catch(()=>C("❌ Sharing cancelled")):(Hf(),C("📋 Report copied - share manually"))}function FI(){if(confirm("Clear all drink history? This cannot be undone!")){Se("drinkHistory",[]),Br(),Or(),Nr(),Lr(),Fr();const n=J(),e=le();n&&e&&lt(N(n,"users/"+e.uid+"/drinks")),C("🗑️ Drink history cleared")}}function Br(){const n=L().drinkHistory||[];localStorage.setItem("drinkHistory",JSON.stringify(n))}function BI(){const n=localStorage.getItem("drinkHistory");if(n)try{const e=JSON.parse(n);e.forEach(t=>{t.time=new Date(t.time)}),Se("drinkHistory",e)}catch(e){console.error("Failed to load drink history:",e)}}function tc(n){const e=new Date,t=new Date(n),i=Math.floor((e-t)/6e4);return i<1?"Just now":i<60?`${i}m ago`:i<1440?`${Math.floor(i/60)}h ago`:t.toLocaleDateString()}function Wf(){const t=L().drinkHistory||[],i=t.reduce((a,c)=>a+parseFloat(c.pureAlcohol),0),s=t.length>0?(Date.now()-t[t.length-1].time)/36e5:0,r=i*.789;return Math.max(0,r/(70*1e3*.68)*100-.015*s)}const Ur={neverHaveIEver:["Never have I ever skipped a lecture for a party","Never have I ever kissed someone at a HSG party","Never have I ever failed an exam because of partying","Never have I ever woken up in the library","Never have I ever used ChatGPT for an assignment","Never have I ever been to a professor's office hours drunk","Never have I ever stolen food from a dorm kitchen","Never have I ever dated someone from my study group","Never have I ever fallen asleep during a presentation","Never have I ever pretended to be sick to avoid a group project"],truths:["What's your most embarrassing HSG moment?","Who's your secret crush on campus?","What's the worst grade you've ever gotten?","Have you ever cheated on an exam?","What's your biggest fear about graduation?","Which professor do you have a crush on?","What's the craziest thing you've done at HSG?"],dares:["Text your crush right now!","Do 20 pushups","Sing the HSG anthem","Call a random contact and say 'I love you'","Post an embarrassing photo on Instagram","Dance without music for 1 minute","Let someone go through your phone for 30 seconds"],trivia:[{question:"When was HSG founded?",options:["1898","1923","1945","1967"],correct:0},{question:"What does HSG stand for?",options:["High School Gymnasium","Hochschule St. Gallen","Higher Studies Group","Helvetic Study Group"],correct:1},{question:"How many students attend HSG?",options:["5,000","9,000","12,000","15,000"],correct:1},{question:"What's the most popular major at HSG?",options:["Law","Business Administration","Computer Science","International Affairs"],correct:1}]},de={flipTimer:null,flipTime:0,bestFlipTime:null,triviaScore:0,currentTriviaIndex:0};function UI(n){Se("currentGame",n);const e=document.createElement("div");e.className="game-overlay",e.id="gameOverlay";let t="";switch(n){case"never-have-i-ever":t=HI();break;case"truth-or-dare":t=WI();break;case"kings-cup":t=$I();break;case"beer-pong":t=zI();break;case"flip-cup":t=VI();break;case"trivia":t=jI();break}e.innerHTML=`
        <div class="game-container">
            <div class="game-header">
                <div class="game-title">${nS(n)}</div>
                <div class="close-game" onclick="closeGame()">×</div>
            </div>
            ${t}
        </div>
    `,document.body.appendChild(e),setTimeout(()=>e.classList.add("show"),10),qI(n),Wn&&Wn({particleCount:100,spread:70,origin:{y:.6}})}function $f(){const n=document.getElementById("gameOverlay");n&&(n.classList.remove("show"),setTimeout(()=>n.remove(),500)),Se("currentGame",null)}function HI(){return`
        <div class="question-card" id="gameQuestion">
            Click "Next Question" to start!
        </div>
        <div style="text-align: center; margin: 30px 0;">
            <button class="btn btn-primary" onclick="nextNeverHaveIEver()">
                <i class="fas fa-arrow-right"></i> Next Question
            </button>
        </div>
        <div style="text-align: center; opacity: 0.7;">
            <p>Drink if you've done it! 🍻</p>
        </div>
    `}function WI(){return`
        <div style="text-align: center; margin: 30px 0;">
            <button class="btn btn-primary" style="margin: 10px;" onclick="showTruth()">
                <i class="fas fa-comment"></i> Truth
            </button>
            <button class="btn btn-danger" style="margin: 10px;" onclick="showDare()">
                <i class="fas fa-fire"></i> Dare
            </button>
        </div>
        <div class="question-card" id="gameQuestion">
            Choose Truth or Dare!
        </div>
        <div id="playerName" style="text-align: center; font-size: 1.5em; margin-top: 20px;"></div>
    `}function $I(){return`
        <div style="text-align: center;">
            <div style="font-size: 6em; margin: 20px 0;" id="currentCard">🎴</div>
            <button class="btn btn-primary" onclick="drawCard()">
                <i class="fas fa-clone"></i> Draw Card
            </button>
        </div>
        <div class="question-card" id="gameQuestion">
            Click "Draw Card" to start!
        </div>
    `}function zI(){return`
        <div class="score-display">
            <div class="team-score">
                <div class="team-name">Team 1</div>
                <div class="team-points" id="team1Score">0</div>
                <button class="btn" onclick="addScore('team1')">+1</button>
            </div>
            <div class="team-score">
                <div class="team-name">Team 2</div>
                <div class="team-points" id="team2Score">0</div>
                <button class="btn" onclick="addScore('team2')">+1</button>
            </div>
        </div>
        <div style="text-align: center; margin: 30px 0;">
            <button class="btn btn-primary" onclick="resetBeerPong()">
                <i class="fas fa-redo"></i> New Game
            </button>
        </div>
        <div id="gameStatus" style="text-align: center; font-size: 1.5em; margin-top: 20px;"></div>
    `}function VI(){return`
        <div class="timer-display" id="flipTimer">00:00</div>
        <div style="text-align: center; margin: 30px 0;">
            <button class="btn btn-primary" id="timerBtn" onclick="toggleFlipTimer()">
                <i class="fas fa-play"></i> Start Timer
            </button>
            <button class="btn" onclick="resetFlipTimer()">
                <i class="fas fa-redo"></i> Reset
            </button>
        </div>
        <div id="bestTime" style="text-align: center; font-size: 1.2em; margin-top: 20px;">
            Best Time: --:--
        </div>
    `}function jI(){return`
        <div class="question-card" id="gameQuestion">
            Click "Next Question" to start HSG Trivia!
        </div>
        <div id="triviaOptions" style="margin: 20px 0;"></div>
        <div style="text-align: center; margin: 30px 0;">
            <button class="btn btn-primary" onclick="nextTrivia()">
                <i class="fas fa-arrow-right"></i> Next Question
            </button>
        </div>
        <div class="score-display">
            <div class="team-score">
                <div class="team-name">Score</div>
                <div class="team-points" id="triviaScore">0</div>
            </div>
        </div>
    `}function qI(n){switch(n){case"beer-pong":Se("gameScores",{team1:0,team2:0}),nc();break;case"trivia":de.triviaScore=0,de.currentTriviaIndex=0,document.getElementById("triviaScore").textContent="0";break}}function GI(){const n=Ur.neverHaveIEver,e=Math.floor(Math.random()*n.length);document.getElementById("gameQuestion").textContent=n[e]}function YI(){const n=Ur.truths,e=Math.floor(Math.random()*n.length);document.getElementById("gameQuestion").textContent=n[e],zf()}function KI(){const n=Ur.dares,e=Math.floor(Math.random()*n.length);document.getElementById("gameQuestion").textContent=n[e],zf()}function zf(){const n=L().partyData||{},e=Object.values(n).map(s=>s.name);e.length===0&&e.push("You");const t=Math.floor(Math.random()*e.length),i=e[t];document.getElementById("playerName").textContent=`${i}'s turn!`}function XI(){const n=["A","2","3","4","5","6","7","8","9","10","J","Q","K"],e=["♠️","♥️","♦️","♣️"],t=n[Math.floor(Math.random()*n.length)],i=e[Math.floor(Math.random()*e.length)];document.getElementById("currentCard").textContent=t+i;const s={A:"🍉 Waterfall - Everyone drinks!",2:"👉 You - Choose someone to drink",3:"👈 Me - You drink!",4:"👯 Floor - Last to touch floor drinks",5:"🙋 Guys - All guys drink",6:"💃 Chicks - All girls drink",7:"🌈 Heaven - Last to raise hand drinks",8:"🤝 Mate - Choose a drinking buddy",9:"🎵 Rhyme - Say a word, others rhyme",10:"📏 Categories - Name things in category",J:"👑 Make a Rule",Q:"❓ Questions - Ask questions only",K:"🏆 King's Cup - Pour into center cup"};document.getElementById("gameQuestion").textContent=s[t]}function QI(n){let e=L().gameScores||{team1:0,team2:0};e[n]++,Se("gameScores",e),nc(),e[n]>=10&&(document.getElementById("gameStatus").textContent=`${n==="team1"?"Team 1":"Team 2"} Wins! 🏆`,Wn&&Wn({particleCount:200,spread:70,origin:{y:.6}}))}function nc(){const n=L().gameScores||{team1:0,team2:0};document.getElementById("team1Score").textContent=n.team1,document.getElementById("team2Score").textContent=n.team2}function JI(){Se("gameScores",{team1:0,team2:0}),nc(),document.getElementById("gameStatus").textContent=""}function ZI(){const n=document.getElementById("timerBtn");de.flipTimer?(clearInterval(de.flipTimer),de.flipTimer=null,n.innerHTML='<i class="fas fa-play"></i> Start Timer',(!de.bestFlipTime||de.flipTime<de.bestFlipTime)&&(de.bestFlipTime=de.flipTime,document.getElementById("bestTime").textContent=`Best Time: ${Rh(de.bestFlipTime)}`,Wn&&Wn({particleCount:100,spread:70,origin:{y:.6}}))):(de.flipTime=0,de.flipTimer=setInterval(()=>{de.flipTime++,document.getElementById("flipTimer").textContent=Rh(de.flipTime)},10),n.innerHTML='<i class="fas fa-pause"></i> Stop Timer')}function eS(){de.flipTimer&&(clearInterval(de.flipTimer),de.flipTimer=null),de.flipTime=0,document.getElementById("flipTimer").textContent="00:00",document.getElementById("timerBtn").innerHTML='<i class="fas fa-play"></i> Start Timer'}function Rh(n){const e=Math.floor(n/6e3),t=Math.floor(n%6e3/100),i=n%100;return`${e.toString().padStart(2,"0")}:${t.toString().padStart(2,"0")}.${i.toString().padStart(2,"0")}`}function Vf(){const n=Ur.trivia,e=n[de.currentTriviaIndex%n.length];document.getElementById("gameQuestion").textContent=e.question;const t=e.options.map((i,s)=>`<button class="btn" style="width: 100%; margin: 10px 0;" onclick="answerTrivia(${s}, ${e.correct})">${i}</button>`).join("");document.getElementById("triviaOptions").innerHTML=t,de.currentTriviaIndex++}function tS(n,e){const t=document.getElementById("triviaOptions").querySelectorAll("button");n===e?(de.triviaScore++,document.getElementById("triviaScore").textContent=de.triviaScore,t[n].style.background="linear-gradient(45deg, #00ff88, #00d4ff)",C("✅ Correct! +1 point")):(t[n].style.background="linear-gradient(45deg, #ff4444, #ff0088)",t[e].style.background="linear-gradient(45deg, #00ff88, #00d4ff)",C("❌ Wrong answer!")),t.forEach(i=>i.disabled=!0),setTimeout(Vf,2e3)}function nS(n){return{"never-have-i-ever":"🙊 Never Have I Ever","truth-or-dare":"🎯 Truth or Dare","kings-cup":"👑 King's Cup","beer-pong":"🏓 Beer Pong","flip-cup":"🥤 Flip Cup",trivia:"🧠 HSG Trivia"}[n]||"Party Game"}const Ph={firstTimer:{name:"First Timer",icon:"🎉",description:"Joined your first party!",requirement:1,progress:0,unlocked:!1,category:"beginner"},responsible:{name:"Responsible",icon:"😇",description:"Stayed under 0.05 BAC all night",requirement:1,progress:0,unlocked:!1,category:"safety"},gameMaster:{name:"Game Master",icon:"🏆",description:"Win 5 party games",requirement:5,progress:0,unlocked:!1,category:"games"},partyAnimal:{name:"Party Animal",icon:"📍",description:"Check in at 10 parties",requirement:10,progress:0,unlocked:!1,category:"social"},guardianAngel:{name:"Guardian Angel",icon:"🦸",description:"Help 3 friends get home safe",requirement:3,progress:0,unlocked:!1,category:"safety"},hydroHomie:{name:"Hydro Homie",icon:"💧",description:"Stay hydrated for 3 hours",requirement:12,progress:0,unlocked:!1,category:"health"},danceMachine:{name:"Dance Machine",icon:"🕺",description:"Log 50 songs danced to",requirement:50,progress:0,unlocked:!1,category:"fun"},sunriseWarrior:{name:"Sunrise Warrior",icon:"🌅",description:"Party until sunrise (6+ hours)",requirement:1,progress:0,unlocked:!1,category:"endurance"},socialButterfly:{name:"Social Butterfly",icon:"🦋",description:"Add 20 friends",requirement:20,progress:0,unlocked:!1,category:"social"},safetyFirst:{name:"Safety First",icon:"🛡️",description:"Use emergency services 0 times in 10 parties",requirement:10,progress:0,unlocked:!1,category:"safety"},mixologist:{name:"Mixologist",icon:"🍸",description:"Try 15 different drink types",requirement:15,progress:0,unlocked:!1,category:"drinks"},designated:{name:"Designated Hero",icon:"🚗",description:"Be the designated driver 5 times",requirement:5,progress:0,unlocked:!1,category:"safety"}};let Gt={};function iS(){const n=le();if(!n)return;const e=J(),t=N(e,`users/${n.uid}/achievements`);Wt(t,i=>{const s=i.val()||{};Object.keys(Ph).forEach(r=>{Gt[r]={...Ph[r],...s[r]}}),Se("userAchievements",Gt),Hr()})}function sS(n){const e=le();if(!e)return;const t=J(),i=Gt[n];i&&xe(N(t,`users/${e.uid}/achievements/${n}`),{progress:i.progress,unlocked:i.unlocked,unlockedAt:i.unlockedAt||null})}function xi(n,e=1){if(!Gt[n])return;const t=Gt[n];t.unlocked||(t.progress=Math.min(t.progress+e,t.requirement),t.progress>=t.requirement&&(t.unlocked=!0,t.unlockedAt=Date.now(),rS(t),jf()),sS(n),Hr())}function Hr(){const n=document.querySelector(".achievements-grid");if(!n)return;n.innerHTML="",Object.entries(Gt).sort(([,t],[,i])=>t.unlocked&&!i.unlocked?-1:!t.unlocked&&i.unlocked?1:t.category.localeCompare(i.category)).forEach(([t,i])=>{const s=document.createElement("div");s.className=`achievement ${i.unlocked?"unlocked":""}`,s.setAttribute("data-achievement",t);const r=i.progress/i.requirement*100;s.innerHTML=`
            <div class="achievement-icon">${i.icon}</div>
            <div class="achievement-name">${i.name}</div>
            <div class="achievement-description">${i.description}</div>
            ${i.unlocked?`
                <div class="achievement-unlocked-date">
                    Unlocked ${new Date(i.unlockedAt).toLocaleDateString()}
                </div>
            `:`
                <div class="achievement-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${r}%"></div>
                    </div>
                    <div class="progress-text">${i.progress}/${i.requirement}</div>
                </div>
            `}
        `,n.appendChild(s)}),jf()}function jf(){const n=Object.keys(Gt).length,e=Object.values(Gt).filter(i=>i.unlocked).length;document.querySelectorAll("[data-achievement-stats]").forEach(i=>{i.textContent=`${e}/${n}`})}function rS(n){typeof confetti=="function"&&confetti({particleCount:100,spread:70,origin:{y:.6}});const e=document.createElement("div");e.className="achievement-notification",e.innerHTML=`
        <div class="achievement-popup">
            <div class="achievement-popup-icon">${n.icon}</div>
            <div class="achievement-popup-content">
                <div class="achievement-popup-title">Achievement Unlocked!</div>
                <div class="achievement-popup-name">${n.name}</div>
                <div class="achievement-popup-description">${n.description}</div>
            </div>
        </div>
    `,document.body.appendChild(e),setTimeout(()=>{e.classList.add("show")},100),setTimeout(()=>{e.classList.remove("show"),setTimeout(()=>{e.remove()},500)},5e3)}function oS(){const n=L(),e=n.partyData||{},t=n.friendsData||{},i=n.partyStartTime;Object.values(e).every(r=>r.bac<.05)&&Date.now()-i>36e5&&xi("responsible"),Date.now()-i>216e5&&xi("sunriseWarrior"),Object.keys(t).length>=20&&xi("socialButterfly",Object.keys(t).length)}function aS(){xi("firstTimer")}function cS(){window.toggleAuthMode=ww,window.signOut=Cw,window.updateUI=Ar,window.switchSection=gS,window.toggleMobileMenu=mS,window.showNotification=C,window.showModal=bS,window.closeModal=qf,window.searchFriends=Ju,window.sendFriendRequest=Ww,window.acceptFriendRequest=$w,window.declineFriendRequest=Vw,window.updateFriendPermission=jw,window.removeFriend=qw,window.sendMessage=ef,window.handleChatEnter=Gw,window.showHydrationReminder=tf,window.checkInLocation=Yw,window.callUber=Kw,window.callEmergency=Xw,window.selectBuddy=Jw,window.showFirstAid=Zw,window.updateProfile=e0,window.changePassword=t0,window.saveEmergencyInfo=n0,window.savePrivacySettings=i0,window.exportData=r0,window.pairDeviceFromModal=o0,window.resolvePermission=c0,window.logDrink=PI,window.toggleChart=DI,window.removeDrink=MI,window.showEmergencyReport=OI,window.copyEmergencyReport=Hf,window.downloadEmergencyReport=NI,window.shareEmergencyReport=LI,window.clearDrinkHistory=FI,window.deleteAccount=s0,window.startGame=UI,window.closeGame=$f,window.nextNeverHaveIEver=GI,window.showTruth=YI,window.showDare=KI,window.drawCard=XI,window.addScore=QI,window.resetBeerPong=JI,window.toggleFlipTimer=ZI,window.resetFlipTimer=eS,window.nextTrivia=Vf,window.answerTrivia=tS,window.getActiveLocations=Ua,window.createLocationMap=nf,window.initializeLocationMap=sf,window.updateFriendRequests=Zu,window.updateFriendsList=Fa,window.escapeHtml=yn,window.updateAchievements=Hr,window.updateAchievementProgress=xi,window.checkAchievements=oS,window.pairDeviceById=Ku,window.unpairDevice=Xu,window.renameDevice=Qu}document.addEventListener("DOMContentLoaded",()=>{console.log("🚀 Starting BoozeLens app initialization..."),cS(),"serviceWorker"in navigator&&navigator.serviceWorker.getRegistrations().then(i=>{if(i.length>0){i.forEach(s=>{s.unregister(),console.log("Unregistered old service worker:",s.scope)}),setTimeout(()=>{window.location.reload()},1e3);return}});try{El&&El().catch(i=>{console.warn("Service worker registration failed:",i)}),Cl&&Cl(),Il&&Il()}catch(i){console.warn("PWA initialization error (non-critical):",i)}if(!uw()){console.error("Firebase failed to initialize!"),C("❌ Failed to connect to Firebase","error");return}const e=document.getElementById("authForm");e&&e.addEventListener("submit",Ew),Iw(lS),_S(),setInterval(()=>{yS()},500),BI();const t=document.getElementById("drinkType");t&&t.addEventListener("change",function(){const i=Dn[this.value];document.getElementById("drinkAmount").value=i.amount,document.getElementById("alcoholPercent").value=i.alcohol}),document.querySelectorAll(".toggle-switch input").forEach(i=>{i.addEventListener("change",function(){const s=this.closest(".toggle-switch");this.checked?s.classList.add("active"):s.classList.remove("active")})}),setInterval(()=>{new Date().getMinutes()%15===0&&tf()},6e4),window.onclick=i=>{i.target.className==="modal show"&&qf(),i.target.className==="game-overlay show"&&$f()},window.addEventListener("beforeunload",()=>{Br()}),window.addEventListener("unhandledrejection",i=>{console.error("Unhandled promise rejection:",i.reason),i.reason&&i.reason.code&&i.reason.code.includes("auth")&&C("⚠️ Authentication issue. Try refreshing.","error")}),console.log("✅ App initialization complete!")});async function lS(n){console.log("User authenticated:",n.email);try{vw(),await Sw(n),Tw(),iS(),hS(),wS(),aS(),Ar();const t=L().userData.username||n.email.split("@")[0];C(`🎉 Welcome, ${t}!`,"success")}catch(e){console.error("Error during authentication:",e),C("⚠️ Error loading profile","error")}}function hS(){const n=J(),e=le();!n||!e||(Wt(N(n,"users/"+e.uid+"/friends"),t=>{const i=t.val()||{};Se("friendsData",i),Fa(),document.getElementById("friendCount").textContent=Object.keys(i).length,Object.keys(i).forEach(s=>{dS(s)})}),Wt(N(n,"friendRequests/"+e.uid),t=>{const i=t.val()||{},s=Object.entries(i).map(([r,o])=>({id:r,...o}));Se("friendRequests",s),Zu()}),Wt(N(n,".info/connected"),t=>{const i=t.val();vS(i)}))}function dS(n){const e=J();(L().friendsData[n]?.permission||"observer")!=="none"&&Wt(N(e,"users/"+n),s=>{const r=s.val();r&&uS(n,r)})}function uS(n,e){const i=L().friendsData[n]?.permission||"observer";(i==="guardian"||i==="buddy")&&Object.keys(e.devices||{}).forEach(s=>{let r=L().partyData;r[s]||(r[s]={name:e.username,bac:0,lastUpdate:Date.now(),location:"Unknown",trend:"steady",history:[],isFriend:!0,friendId:n,permission:i},Se("partyData",r)),fS(s)})}function fS(n){const e=J();Wt(N(e,"readings/"+n),t=>{const i=t.val();i&&pS(n,i)})}function pS(n,e){let t=L().partyData||{};const i=L().userData;t[n]||(t[n]={name:i.username||"You",bac:0,lastUpdate:Date.now(),location:"Party",trend:"steady",history:[],isOwn:!0});const s=t[n].bac;t[n].bac=e.bac||0,t[n].lastUpdate=Date.now(),t[n].trend=e.bac>s?"up":e.bac<s?"down":"steady",t[n].history.push({time:Date.now(),value:e.bac}),t[n].history.length>50&&t[n].history.shift(),Se("partyData",t),Ar(),e.bac>=.08&&C(`⚠️ Your BAC is too high: ${e.bac.toFixed(3)}‰`,"error")}function gS(n){try{document.querySelectorAll(".section").forEach(s=>s.classList.remove("active")),document.querySelectorAll(".nav-item").forEach(s=>s.classList.remove("active"));const e=document.getElementById(n);e&&e.classList.add("active"),document.querySelectorAll(".nav-item").forEach(s=>{s.onclick&&s.onclick.toString().includes(n)&&s.classList.add("active")});const i=document.getElementById("navMenu");i&&i.classList.remove("show"),n==="achievements"?Hr():n==="drinks"?(Or(),Lr(),Nr(),Fr()):n==="devices"||(n==="friends"?Fa():n==="settings"&&of())}catch(e){console.error("Section switch failed:",e)}}function mS(){const n=document.getElementById("navMenu");n&&n.classList.toggle("show")}function _S(){try{const n=document.getElementById("particles");if(!n)return;for(let e=0;e<50;e++){const t=document.createElement("div");t.className="particle",t.style.left=Math.random()*100+"%",t.style.animationDelay=Math.random()*20+"s",t.style.animationDuration=15+Math.random()*10+"s",n.appendChild(t)}}catch(n){console.error("Particle creation failed:",n)}}function yS(){const n=document.getElementById("visualizer");if(!(!n||!document.getElementById("dashboard").classList.contains("active"))){if(n.children.length===0)for(let e=0;e<20;e++){const t=document.createElement("div");t.className="bar",n.appendChild(t)}n.querySelectorAll(".bar").forEach(e=>{const t=Math.random()*150+20;e.style.height=t+"px"})}}function vS(n){const e=document.getElementById("connectionStatus"),t=document.querySelector(".status-dot");e&&t&&(n?(e.textContent="Connected",t.style.background="#00ff88"):(e.textContent="Offline",t.style.background="#ff4444"))}function bS(n,e=null){const t=document.getElementById("modal"),i=document.getElementById("modalBody");let s="";switch(n){case"pair-device":s=`
                <h2>📱 Pair New Device</h2>
                <p>After setting up your breathalyzer, enter the Device ID shown on its screen:</p>
                
                <div class="form-group" style="margin: 20px 0;">
                    <input type="text" id="modalDeviceId" placeholder="Enter Device ID (e.g., HSG_abc123)" style="text-transform: uppercase;">
                </div>
                
                <button class="btn btn-primary" onclick="pairDeviceFromModal()">
                    <i class="fas fa-link"></i> Pair Device
                </button>
                <button class="btn" onclick="closeModal()">Cancel</button>
                
                <div class="info-box" style="margin-top: 20px;">
                    <p><strong>Can't find your Device ID?</strong></p>
                    <ol>
                        <li>Power on your device</li>
                        <li>Double-flip the switch for setup mode</li>
                        <li>Connect to the device's WiFi</li>
                        <li>Complete setup to see your Device ID</li>
                    </ol>
                </div>
            `;break;case"checkin":s=`
                <h2>📍 Check In</h2>
                <p>Select your current location:</p>
                <div class="location-map" id="locationMap">
                    <!-- Simulated map -->
                </div>
                <div style="margin: 20px 0;">
                    ${["Dorm A - Room Party","Student Bar","Library Cafe","Sports Center","Main Campus","Off Campus"].map(c=>`<button class="btn" style="width: 100%; margin: 10px 0;" onclick="checkInLocation('${c}')">${c}</button>`).join("")}
                </div>
                <button class="btn" onclick="closeModal()">Cancel</button>
            `;break;case"emergency":s=`
                <h2>🚨 Emergency Contacts</h2>
                <div style="margin: 20px 0;">
                    <p><strong>Ambulance:</strong> 112</p>
                    <p><strong>HSG Security:</strong> +41 71 224 2424</p>
                    <p><strong>Poison Control:</strong> 145</p>
                    <p><strong>Mental Health Crisis:</strong> 143</p>
                </div>
                <button class="btn btn-danger" onclick="window.location.href='tel:112'">
                    <i class="fas fa-phone"></i> Call 112 Now
                </button>
                <button class="btn" onclick="showFirstAid()">
                    <i class="fas fa-medkit"></i> First Aid Guide
                </button>
                <button class="btn" onclick="closeModal()">Close</button>
            `;break;case"first-aid":s=`
                <h2>🏥 First Aid Guide</h2>
                <div class="first-aid-card">
                    <h3>Signs of Alcohol Poisoning:</h3>
                    <ul>
                        <li>Confusion, stupor</li>
                        <li>Vomiting</li>
                        <li>Seizures</li>
                        <li>Slow or irregular breathing</li>
                        <li>Unconsciousness</li>
                    </ul>
                </div>
                <div class="first-aid-card">
                    <h3>What to Do:</h3>
                    <div class="first-aid-step" data-step="1">Call 112 immediately</div>
                    <div class="first-aid-step" data-step="2">Keep them awake and sitting up</div>
                    <div class="first-aid-step" data-step="3">Give them water if conscious</div>
                    <div class="first-aid-step" data-step="4">Keep them warm</div>
                    <div class="first-aid-step" data-step="5">Stay with them</div>
                </div>
                <button class="btn btn-danger" onclick="window.location.href='tel:112'">Emergency Call</button>
                <button class="btn" onclick="closeModal()">Close</button>
            `;break;case"buddy-system":const r=L().partyData;s=`
                <h2>👥 Buddy System</h2>
                <p>Choose your buddy for tonight:</p>
                <div class="buddy-list">
                    ${Object.values(r).map(c=>`
                        <div class="buddy-card" onclick="selectBuddy('${c.name}')">
                            <div style="font-size: 2em; margin-bottom: 10px;">${c.isOwn?"👤":"👥"}</div>
                            <div>${c.name}</div>
                        </div>
                    `).join("")}
                </div>
                <button class="btn" onclick="closeModal()">Close</button>
            `;break;case"safe-friends":const o=L().partyData,a=Object.values(o).filter(c=>c.bac<.02);s=`
                <h2>✅ Friends Safe to Drive</h2>
                <div style="margin: 20px 0;">
                    ${a.length>0?a.map(c=>`
                        <div class="buddy-card" style="margin: 10px 0;">
                            <div>${c.name}</div>
                            <div>BAC: ${c.bac.toFixed(3)}‰</div>
                        </div>
                    `).join(""):"<p>No friends are currently safe to drive.</p>"}
                </div>
                <button class="btn" onclick="closeModal()">Close</button>
            `;break;case"locations":s=`
                <h2>📍 Active Party Locations</h2>
                <div class="location-map" style="height: 400px;">
                    ${nf()}
                </div>
                <div style="margin: 20px 0;">
                    ${Ua().map(c=>`
                        <div class="buddy-card" style="margin: 10px 0;">
                            <div><strong>${c.name}</strong></div>
                            <div>${c.count} people</div>
                            <div>Avg BAC: ${c.avgBac.toFixed(3)}‰</div>
                        </div>
                    `).join("")}
                </div>
                <button class="btn" onclick="closeModal()">Close</button>
            `;break}i.innerHTML=s,t.classList.add("show"),(n==="checkin"||n==="locations")&&setTimeout(sf,100)}function qf(){document.getElementById("modal").classList.remove("show")}function wS(){const n=L().userData;if(n.settings){const e=n.settings;e.shareLocation!==void 0&&(document.getElementById("shareLocation").checked=e.shareLocation),e.notifications!==void 0&&(document.getElementById("notifications").checked=e.notifications),e.publicProfile!==void 0&&(document.getElementById("publicProfile").checked=e.publicProfile)}if(n.emergency){const e=n.emergency;e.homeAddress&&(document.getElementById("homeAddress").value=e.homeAddress,localStorage.setItem("homeAddress",e.homeAddress)),e.emergencyContact&&(document.getElementById("emergencyContact").value=e.emergencyContact,localStorage.setItem("emergencyContact",e.emergencyContact)),e.medicalInfo&&(document.getElementById("medicalInfo").value=e.medicalInfo,localStorage.setItem("medicalInfo",e.medicalInfo)),e.safetyNotes&&(document.getElementById("safetyNotes").value=e.safetyNotes,localStorage.setItem("safetyNotes",e.safetyNotes))}of()}});export default ES();
//# sourceMappingURL=index-Br3o7L68.js.map
