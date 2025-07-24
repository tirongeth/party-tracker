(function(){const Se=document.createElement("link").relList;if(Se&&Se.supports&&Se.supports("modulepreload"))return;for(const yt of document.querySelectorAll('link[rel="modulepreload"]'))Qi(yt);new MutationObserver(yt=>{for(const b of yt)if(b.type==="childList")for(const ee of b.addedNodes)ee.tagName==="LINK"&&ee.rel==="modulepreload"&&Qi(ee)}).observe(document,{childList:!0,subtree:!0});function Ur(yt){const b={};return yt.integrity&&(b.integrity=yt.integrity),yt.referrerPolicy&&(b.referrerPolicy=yt.referrerPolicy),yt.crossOrigin==="use-credentials"?b.credentials="include":yt.crossOrigin==="anonymous"?b.credentials="omit":b.credentials="same-origin",b}function Qi(yt){if(yt.ep)return;yt.ep=!0;const b=Ur(yt);fetch(yt.href,b)}})();var rk=(Br,Se)=>()=>(Se||Br((Se={exports:{}}).exports,Se),Se.exports),ok=rk((Br,Mr)=>{(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))e(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&e(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function e(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();const Ur=()=>{};var Qi={};/**
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
*/const yt={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
*/const b=function(i,t){if(!i)throw ee(t)},ee=function(i){return new Error("Firebase Database ("+yt.SDK_VERSION+") INTERNAL ASSERT FAILED: "+i)};/**
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
*/const Xa=function(i){const t=[];let e=0;for(let s=0;s<i.length;s++){let n=i.charCodeAt(s);n<128?t[e++]=n:n<2048?(t[e++]=n>>6|192,t[e++]=n&63|128):(n&64512)===55296&&s+1<i.length&&(i.charCodeAt(s+1)&64512)===56320?(n=65536+((n&1023)<<10)+(i.charCodeAt(++s)&1023),t[e++]=n>>18|240,t[e++]=n>>12&63|128,t[e++]=n>>6&63|128,t[e++]=n&63|128):(t[e++]=n>>12|224,t[e++]=n>>6&63|128,t[e++]=n&63|128)}return t},Bf=function(i){const t=[];let e=0,s=0;for(;e<i.length;){const n=i[e++];if(n<128)t[s++]=String.fromCharCode(n);else if(n>191&&n<224){const r=i[e++];t[s++]=String.fromCharCode((n&31)<<6|r&63)}else if(n>239&&n<365){const r=i[e++],o=i[e++],a=i[e++],c=((n&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;t[s++]=String.fromCharCode(55296+(c>>10)),t[s++]=String.fromCharCode(56320+(c&1023))}else{const r=i[e++],o=i[e++];t[s++]=String.fromCharCode((n&15)<<12|(r&63)<<6|o&63)}}return t.join("")},Hr={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(i,t){if(!Array.isArray(i))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let n=0;n<i.length;n+=3){const r=i[n],o=n+1<i.length,a=o?i[n+1]:0,c=n+2<i.length,l=c?i[n+2]:0,h=r>>2,d=(r&3)<<4|a>>4;let u=(a&15)<<2|l>>6,f=l&63;c||(f=64,o||(u=64)),s.push(e[h],e[d],e[u],e[f])}return s.join("")},encodeString(i,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(i):this.encodeByteArray(Xa(i),t)},decodeString(i,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(i):Bf(this.decodeStringToByteArray(i,t))},decodeStringToByteArray(i,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let n=0;n<i.length;){const r=e[i.charAt(n++)],o=n<i.length?e[i.charAt(n)]:0;++n;const a=n<i.length?e[i.charAt(n)]:64;++n;const c=n<i.length?e[i.charAt(n)]:64;if(++n,r==null||o==null||a==null||c==null)throw new Uf;const l=r<<2|o>>4;if(s.push(l),a!==64){const h=o<<4&240|a>>2;if(s.push(h),c!==64){const d=a<<6&192|c;s.push(d)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let i=0;i<this.ENCODED_VALS.length;i++)this.byteToCharMap_[i]=this.ENCODED_VALS.charAt(i),this.charToByteMap_[this.byteToCharMap_[i]]=i,this.byteToCharMapWebSafe_[i]=this.ENCODED_VALS_WEBSAFE.charAt(i),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]]=i,i>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)]=i,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)]=i)}}};class Uf extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Za=function(i){const t=Xa(i);return Hr.encodeByteArray(t,!0)},cn=function(i){return Za(i).replace(/\./g,"")},ln=function(i){try{return Hr.decodeString(i,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
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
*/function Hf(i){return tc(void 0,i)}function tc(i,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:const e=t;return new Date(e.getTime());case Object:i===void 0&&(i={});break;case Array:i=[];break;default:return t}for(const e in t)!t.hasOwnProperty(e)||!Wf(e)||(i[e]=tc(i[e],t[e]));return i}function Wf(i){return i!=="__proto__"}/**
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
*/function $f(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
*/const zf=()=>$f().__FIREBASE_DEFAULTS__,jf=()=>{if(typeof process>"u"||typeof Qi>"u")return;const i=Qi.__FIREBASE_DEFAULTS__;if(i)return JSON.parse(i)},qf=()=>{if(typeof document>"u")return;let i;try{i=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=i&&ln(i[1]);return t&&JSON.parse(t)},Wr=()=>{try{return Ur()||zf()||jf()||qf()}catch(i){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${i}`);return}},ec=i=>Wr()?.emulatorHosts?.[i],Vf=i=>{const t=ec(i);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const s=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),s]:[t.substring(0,e),s]},ic=()=>Wr()?.config,sc=i=>Wr()?.[`_${i}`];/**
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
*/class hn{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,s)=>{e?this.reject(e):this.resolve(s),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,s))}}}/**
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
*/function bi(i){try{return(i.startsWith("http://")||i.startsWith("https://")?new URL(i).hostname:i).endsWith(".cloudworkstations.dev")}catch{return!1}}async function nc(i){return(await fetch(i,{credentials:"include"})).ok}/**
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
*/function Yf(i,t){if(i.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},s=t||"demo-project",n=i.iat||0,r=i.sub||i.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${s}`,aud:s,iat:n,exp:n+3600,auth_time:n,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...i};return[cn(JSON.stringify(e)),cn(JSON.stringify(o)),""].join(".")}const Xi={};function Kf(){const i={prod:[],emulator:[]};for(const t of Object.keys(Xi))Xi[t]?i.emulator.push(t):i.prod.push(t);return i}function Gf(i){let t=document.getElementById(i),e=!1;return t||(t=document.createElement("div"),t.setAttribute("id",i),e=!0),{created:e,element:t}}let rc=!1;function oc(i,t){if(typeof window>"u"||typeof document>"u"||!bi(window.location.host)||Xi[i]===t||Xi[i]||rc)return;Xi[i]=t;function e(d){return`__firebase__banner__${d}`}const s="__firebase__banner",n=Kf().prod.length>0;function r(){const d=document.getElementById(s);d&&d.remove()}function o(d){d.style.display="flex",d.style.background="#7faaf0",d.style.position="fixed",d.style.bottom="5px",d.style.left="5px",d.style.padding=".5em",d.style.borderRadius="5px",d.style.alignItems="center"}function a(d,u){d.setAttribute("width","24"),d.setAttribute("id",u),d.setAttribute("height","24"),d.setAttribute("viewBox","0 0 24 24"),d.setAttribute("fill","none"),d.style.marginLeft="-6px"}function c(){const d=document.createElement("span");return d.style.cursor="pointer",d.style.marginLeft="16px",d.style.fontSize="24px",d.innerHTML=" &times;",d.onclick=()=>{rc=!0,r()},d}function l(d,u){d.setAttribute("id",u),d.innerText="Learn more",d.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",d.setAttribute("target","__blank"),d.style.paddingLeft="5px",d.style.textDecoration="underline"}function h(){const d=Gf(s),u=e("text"),f=document.getElementById(u)||document.createElement("span"),p=e("learnmore"),m=document.getElementById(p)||document.createElement("a"),_=e("preprendIcon"),v=document.getElementById(_)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(d.created){const I=d.element;o(I),l(m,p);const x=c();a(v,_),I.append(v,f,m,x),document.body.appendChild(I)}n?(f.innerText="Preview backend disconnected.",v.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(v.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,f.innerText="Preview backend running in this workspace."),f.setAttribute("id",u)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",h):h()}/**
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
*/function Mt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function $r(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Mt())}function Jf(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Qf(){const i=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof i=="object"&&i.id!==void 0}function ac(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Xf(){const i=Mt();return i.indexOf("MSIE ")>=0||i.indexOf("Trident/")>=0}function Zf(){return yt.NODE_ADMIN===!0}function tp(){try{return typeof indexedDB=="object"}catch{return!1}}function ep(){return new Promise((i,t)=>{try{let e=!0;const s="validate-browser-context-for-indexeddb-analytics-module",n=self.indexedDB.open(s);n.onsuccess=()=>{n.result.close(),e||self.indexedDB.deleteDatabase(s),i(!0)},n.onupgradeneeded=()=>{e=!1},n.onerror=()=>{t(n.error?.message||"")}}catch(e){t(e)}})}/**
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
*/const ip="FirebaseError";class Pe extends Error{constructor(t,e,s){super(e),this.code=t,this.customData=s,this.name=ip,Object.setPrototypeOf(this,Pe.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Zi.prototype.create)}}class Zi{constructor(t,e,s){this.service=t,this.serviceName=e,this.errors=s}create(t,...e){const s=e[0]||{},n=`${this.service}/${t}`,r=this.errors[t],o=r?sp(r,s):"Error",a=`${this.serviceName}: ${o} (${n}).`;return new Pe(n,a,s)}}function sp(i,t){return i.replace(np,(e,s)=>{const n=t[s];return n!=null?String(n):`<${s}?>`})}const np=/\{\$([^}]+)}/g;/**
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
*/function ts(i){return JSON.parse(i)}function gt(i){return JSON.stringify(i)}/**
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
*/const cc=function(i){let t={},e={},s={},n="";try{const r=i.split(".");t=ts(ln(r[0])||""),e=ts(ln(r[1])||""),n=r[2],s=e.d||{},delete e.d}catch{}return{header:t,claims:e,data:s,signature:n}},rp=function(i){const t=cc(i),e=t.claims;return!!e&&typeof e=="object"&&e.hasOwnProperty("iat")},op=function(i){const t=cc(i).claims;return typeof t=="object"&&t.admin===!0};/**
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
*/function fe(i,t){return Object.prototype.hasOwnProperty.call(i,t)}function wi(i,t){if(Object.prototype.hasOwnProperty.call(i,t))return i[t]}function zr(i){for(const t in i)if(Object.prototype.hasOwnProperty.call(i,t))return!1;return!0}function dn(i,t,e){const s={};for(const n in i)Object.prototype.hasOwnProperty.call(i,n)&&(s[n]=t.call(e,i[n],n,i));return s}function Xe(i,t){if(i===t)return!0;const e=Object.keys(i),s=Object.keys(t);for(const n of e){if(!s.includes(n))return!1;const r=i[n],o=t[n];if(lc(r)&&lc(o)){if(!Xe(r,o))return!1}else if(r!==o)return!1}for(const n of s)if(!e.includes(n))return!1;return!0}function lc(i){return i!==null&&typeof i=="object"}/**
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
*/function xi(i){const t=[];for(const[e,s]of Object.entries(i))Array.isArray(s)?s.forEach(n=>{t.push(encodeURIComponent(e)+"="+encodeURIComponent(n))}):t.push(encodeURIComponent(e)+"="+encodeURIComponent(s));return t.length?"&"+t.join("&"):""}function es(i){const t={};return i.replace(/^\?/,"").split("&").forEach(e=>{if(e){const[s,n]=e.split("=");t[decodeURIComponent(s)]=decodeURIComponent(n)}}),t}function is(i){const t=i.indexOf("?");if(!t)return"";const e=i.indexOf("#",t);return i.substring(t,e>0?e:void 0)}/**
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
*/class ap{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let t=1;t<this.blockSize;++t)this.pad_[t]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(t,e){e||(e=0);const s=this.W_;if(typeof t=="string")for(let d=0;d<16;d++)s[d]=t.charCodeAt(e)<<24|t.charCodeAt(e+1)<<16|t.charCodeAt(e+2)<<8|t.charCodeAt(e+3),e+=4;else for(let d=0;d<16;d++)s[d]=t[e]<<24|t[e+1]<<16|t[e+2]<<8|t[e+3],e+=4;for(let d=16;d<80;d++){const u=s[d-3]^s[d-8]^s[d-14]^s[d-16];s[d]=(u<<1|u>>>31)&4294967295}let n=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,h;for(let d=0;d<80;d++){d<40?d<20?(l=a^r&(o^a),h=1518500249):(l=r^o^a,h=1859775393):d<60?(l=r&o|a&(r|o),h=2400959708):(l=r^o^a,h=3395469782);const u=(n<<5|n>>>27)+l+c+h+s[d]&4294967295;c=a,a=o,o=(r<<30|r>>>2)&4294967295,r=n,n=u}this.chain_[0]=this.chain_[0]+n&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(t,e){if(t==null)return;e===void 0&&(e=t.length);const s=e-this.blockSize;let n=0;const r=this.buf_;let o=this.inbuf_;for(;n<e;){if(o===0)for(;n<=s;)this.compress_(t,n),n+=this.blockSize;if(typeof t=="string"){for(;n<e;)if(r[o]=t.charCodeAt(n),++o,++n,o===this.blockSize){this.compress_(r),o=0;break}}else for(;n<e;)if(r[o]=t[n],++o,++n,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=e}digest(){const t=[];let e=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let n=this.blockSize-1;n>=56;n--)this.buf_[n]=e&255,e/=256;this.compress_(this.buf_);let s=0;for(let n=0;n<5;n++)for(let r=24;r>=0;r-=8)t[s]=this.chain_[n]>>r&255,++s;return t}}function cp(i,t){const e=new lp(i,t);return e.subscribe.bind(e)}class lp{constructor(t,e){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=e,this.task.then(()=>{t(this)}).catch(s=>{this.error(s)})}next(t){this.forEachObserver(e=>{e.next(t)})}error(t){this.forEachObserver(e=>{e.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,e,s){let n;if(t===void 0&&e===void 0&&s===void 0)throw new Error("Missing Observer.");hp(t,["next","error","complete"])?n=t:n={next:t,error:e,complete:s},n.next===void 0&&(n.next=jr),n.error===void 0&&(n.error=jr),n.complete===void 0&&(n.complete=jr);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?n.error(this.finalError):n.complete()}catch{}}),this.observers.push(n),r}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let e=0;e<this.observers.length;e++)this.sendOne(e,t)}sendOne(t,e){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{e(this.observers[t])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function hp(i,t){if(typeof i!="object"||i===null)return!1;for(const e of t)if(e in i&&typeof i[e]=="function")return!0;return!1}function jr(){}function qr(i,t){return`${i} failed: ${t} argument `}/**
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
*/const dp=function(i){const t=[];let e=0;for(let s=0;s<i.length;s++){let n=i.charCodeAt(s);if(n>=55296&&n<=56319){const r=n-55296;s++,b(s<i.length,"Surrogate pair missing trail surrogate.");const o=i.charCodeAt(s)-56320;n=65536+(r<<10)+o}n<128?t[e++]=n:n<2048?(t[e++]=n>>6|192,t[e++]=n&63|128):n<65536?(t[e++]=n>>12|224,t[e++]=n>>6&63|128,t[e++]=n&63|128):(t[e++]=n>>18|240,t[e++]=n>>12&63|128,t[e++]=n>>6&63|128,t[e++]=n&63|128)}return t},un=function(i){let t=0;for(let e=0;e<i.length;e++){const s=i.charCodeAt(e);s<128?t++:s<2048?t+=2:s>=55296&&s<=56319?(t+=4,e++):t+=3}return t};/**
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
*/function Tt(i){return i&&i._delegate?i._delegate:i}class Ze{constructor(t,e,s){this.name=t,this.instanceFactory=e,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
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
*/const ti="[DEFAULT]";/**
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
*/class up{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const s=new hn;if(this.instancesDeferred.set(e,s),this.isInitialized(e)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:e});n&&s.resolve(n)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){const e=this.normalizeInstanceIdentifier(t?.identifier),s=t?.optional??!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(n){if(s)return null;throw n}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(pp(t))try{this.getOrInitializeService({instanceIdentifier:ti})}catch{}for(const[e,s]of this.instancesDeferred.entries()){const n=this.normalizeInstanceIdentifier(e);try{const r=this.getOrInitializeService({instanceIdentifier:n});s.resolve(r)}catch{}}}}clearInstance(t=ti){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=ti){return this.instances.has(t)}getOptions(t=ti){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,s=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const n=this.getOrInitializeService({instanceIdentifier:s,options:e});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);s===a&&o.resolve(n)}return n}onInit(t,e){const s=this.normalizeInstanceIdentifier(e),n=this.onInitCallbacks.get(s)??new Set;n.add(t),this.onInitCallbacks.set(s,n);const r=this.instances.get(s);return r&&t(r,s),()=>{n.delete(t)}}invokeOnInitCallbacks(t,e){const s=this.onInitCallbacks.get(e);if(s)for(const n of s)try{n(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let s=this.instances.get(t);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:fp(t),options:e}),this.instances.set(t,s),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(s,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,s)}catch{}return s||null}normalizeInstanceIdentifier(t=ti){return this.component?this.component.multipleInstances?t:ti:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function fp(i){return i===ti?void 0:i}function pp(i){return i.instantiationMode==="EAGER"}/**
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
*/class gp{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new up(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
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
*/var Z;(function(i){i[i.DEBUG=0]="DEBUG",i[i.VERBOSE=1]="VERBOSE",i[i.INFO=2]="INFO",i[i.WARN=3]="WARN",i[i.ERROR=4]="ERROR",i[i.SILENT=5]="SILENT"})(Z||(Z={}));const mp={debug:Z.DEBUG,verbose:Z.VERBOSE,info:Z.INFO,warn:Z.WARN,error:Z.ERROR,silent:Z.SILENT},_p=Z.INFO,yp={[Z.DEBUG]:"log",[Z.VERBOSE]:"log",[Z.INFO]:"info",[Z.WARN]:"warn",[Z.ERROR]:"error"},vp=(i,t,...e)=>{if(t<i.logLevel)return;const s=new Date().toISOString(),n=yp[t];if(n)console[n](`[${s}]  ${i.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Vr{constructor(t){this.name=t,this._logLevel=_p,this._logHandler=vp,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in Z))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?mp[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,Z.DEBUG,...t),this._logHandler(this,Z.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,Z.VERBOSE,...t),this._logHandler(this,Z.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,Z.INFO,...t),this._logHandler(this,Z.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,Z.WARN,...t),this._logHandler(this,Z.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,Z.ERROR,...t),this._logHandler(this,Z.ERROR,...t)}}const bp=(i,t)=>t.some(e=>i instanceof e);let hc,dc;function wp(){return hc||(hc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function xp(){return dc||(dc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const uc=new WeakMap,Yr=new WeakMap,fc=new WeakMap,Kr=new WeakMap,Gr=new WeakMap;function Ip(i){const t=new Promise((e,s)=>{const n=()=>{i.removeEventListener("success",r),i.removeEventListener("error",o)},r=()=>{e(Me(i.result)),n()},o=()=>{s(i.error),n()};i.addEventListener("success",r),i.addEventListener("error",o)});return t.then(e=>{e instanceof IDBCursor&&uc.set(e,i)}).catch(()=>{}),Gr.set(t,i),t}function Cp(i){if(Yr.has(i))return;const t=new Promise((e,s)=>{const n=()=>{i.removeEventListener("complete",r),i.removeEventListener("error",o),i.removeEventListener("abort",o)},r=()=>{e(),n()},o=()=>{s(i.error||new DOMException("AbortError","AbortError")),n()};i.addEventListener("complete",r),i.addEventListener("error",o),i.addEventListener("abort",o)});Yr.set(i,t)}let Jr={get(i,t,e){if(i instanceof IDBTransaction){if(t==="done")return Yr.get(i);if(t==="objectStoreNames")return i.objectStoreNames||fc.get(i);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return Me(i[t])},set(i,t,e){return i[t]=e,!0},has(i,t){return i instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in i}};function kp(i){Jr=i(Jr)}function Ep(i){return i===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const s=i.call(Qr(this),t,...e);return fc.set(s,t.sort?t.sort():[t]),Me(s)}:xp().includes(i)?function(...t){return i.apply(Qr(this),t),Me(uc.get(this))}:function(...t){return Me(i.apply(Qr(this),t))}}function Tp(i){return typeof i=="function"?Ep(i):(i instanceof IDBTransaction&&Cp(i),bp(i,wp())?new Proxy(i,Jr):i)}function Me(i){if(i instanceof IDBRequest)return Ip(i);if(Kr.has(i))return Kr.get(i);const t=Tp(i);return t!==i&&(Kr.set(i,t),Gr.set(t,i)),t}const Qr=i=>Gr.get(i);function Sp(i,t,{blocked:e,upgrade:s,blocking:n,terminated:r}={}){const o=indexedDB.open(i,t),a=Me(o);return s&&o.addEventListener("upgradeneeded",c=>{s(Me(o.result),c.oldVersion,c.newVersion,Me(o.transaction),c)}),e&&o.addEventListener("blocked",c=>e(c.oldVersion,c.newVersion,c)),a.then(c=>{r&&c.addEventListener("close",()=>r()),n&&c.addEventListener("versionchange",l=>n(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const Pp=["get","getKey","getAll","getAllKeys","count"],Mp=["put","add","delete","clear"],Xr=new Map;function pc(i,t){if(!(i instanceof IDBDatabase&&!(t in i)&&typeof t=="string"))return;if(Xr.get(t))return Xr.get(t);const e=t.replace(/FromIndex$/,""),s=t!==e,n=Mp.includes(e);if(!(e in(s?IDBIndex:IDBObjectStore).prototype)||!(n||Pp.includes(e)))return;const r=async function(o,...a){const c=this.transaction(o,n?"readwrite":"readonly");let l=c.store;return s&&(l=l.index(a.shift())),(await Promise.all([l[e](...a),n&&c.done]))[0]};return Xr.set(t,r),r}kp(i=>({...i,get:(t,e,s)=>pc(t,e)||i.get(t,e,s),has:(t,e)=>!!pc(t,e)||i.has(t,e)}));/**
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
*/class Ap{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Rp(t)){const e=t.getImmediate();return`${e.library}/${e.version}`}else return null}).filter(t=>t).join(" ")}}function Rp(i){return i.getComponent()?.type==="VERSION"}const Zr="@firebase/app",gc="0.14.0";/**
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
*/const pe=new Vr("@firebase/app"),Dp="@firebase/app-compat",Np="@firebase/analytics-compat",Op="@firebase/analytics",Lp="@firebase/app-check-compat",Fp="@firebase/app-check",Bp="@firebase/auth",Up="@firebase/auth-compat",Hp="@firebase/database",Wp="@firebase/data-connect",$p="@firebase/database-compat",zp="@firebase/functions",jp="@firebase/functions-compat",qp="@firebase/installations",Vp="@firebase/installations-compat",Yp="@firebase/messaging",Kp="@firebase/messaging-compat",Gp="@firebase/performance",Jp="@firebase/performance-compat",Qp="@firebase/remote-config",Xp="@firebase/remote-config-compat",Zp="@firebase/storage",tg="@firebase/storage-compat",eg="@firebase/firestore",ig="@firebase/ai",sg="@firebase/firestore-compat",ng="firebase",rg="12.0.0";/**
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
*/const to="[DEFAULT]",og={[Zr]:"fire-core",[Dp]:"fire-core-compat",[Op]:"fire-analytics",[Np]:"fire-analytics-compat",[Fp]:"fire-app-check",[Lp]:"fire-app-check-compat",[Bp]:"fire-auth",[Up]:"fire-auth-compat",[Hp]:"fire-rtdb",[Wp]:"fire-data-connect",[$p]:"fire-rtdb-compat",[zp]:"fire-fn",[jp]:"fire-fn-compat",[qp]:"fire-iid",[Vp]:"fire-iid-compat",[Yp]:"fire-fcm",[Kp]:"fire-fcm-compat",[Gp]:"fire-perf",[Jp]:"fire-perf-compat",[Qp]:"fire-rc",[Xp]:"fire-rc-compat",[Zp]:"fire-gcs",[tg]:"fire-gcs-compat",[eg]:"fire-fst",[sg]:"fire-fst-compat",[ig]:"fire-vertex","fire-js":"fire-js",[ng]:"fire-js-all"};/**
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
*/const ss=new Map,ag=new Map,eo=new Map;function mc(i,t){try{i.container.addComponent(t)}catch(e){pe.debug(`Component ${t.name} failed to register with FirebaseApp ${i.name}`,e)}}function Ii(i){const t=i.name;if(eo.has(t))return pe.debug(`There were multiple attempts to register component ${t}.`),!1;eo.set(t,i);for(const e of ss.values())mc(e,i);for(const e of ag.values())mc(e,i);return!0}function io(i,t){const e=i.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),i.container.getProvider(t)}function jt(i){return i==null?!1:i.settings!==void 0}/**
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
*/const cg={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ae=new Zi("app","Firebase",cg);/**
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
*/class lg{constructor(t,e,s){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new Ze("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Ae.create("app-deleted",{appName:this._name})}}/**
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
*/const Ci=rg;function _c(i,t={}){let e=i;typeof t!="object"&&(t={name:t});const s={name:to,automaticDataCollectionEnabled:!0,...t},n=s.name;if(typeof n!="string"||!n)throw Ae.create("bad-app-name",{appName:String(n)});if(e||(e=ic()),!e)throw Ae.create("no-options");const r=ss.get(n);if(r){if(Xe(e,r.options)&&Xe(s,r.config))return r;throw Ae.create("duplicate-app",{appName:n})}const o=new gp(n);for(const c of eo.values())o.addComponent(c);const a=new lg(e,s,o);return ss.set(n,a),a}function yc(i=to){const t=ss.get(i);if(!t&&i===to&&ic())return _c();if(!t)throw Ae.create("no-app",{appName:i});return t}function vc(){return Array.from(ss.values())}function Re(i,t,e){let s=og[i]??i;e&&(s+=`-${e}`);const n=s.match(/\s|\//),r=t.match(/\s|\//);if(n||r){const o=[`Unable to register library "${s}" with version "${t}":`];n&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),n&&r&&o.push("and"),r&&o.push(`version name "${t}" contains illegal characters (whitespace or "/")`),pe.warn(o.join(" "));return}Ii(new Ze(`${s}-version`,()=>({library:s,version:t}),"VERSION"))}/**
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
*/const hg="firebase-heartbeat-database",dg=1,ns="firebase-heartbeat-store";let so=null;function bc(){return so||(so=Sp(hg,dg,{upgrade:(i,t)=>{switch(t){case 0:try{i.createObjectStore(ns)}catch(e){console.warn(e)}}}}).catch(i=>{throw Ae.create("idb-open",{originalErrorMessage:i.message})})),so}async function ug(i){try{const t=(await bc()).transaction(ns),e=await t.objectStore(ns).get(xc(i));return await t.done,e}catch(t){if(t instanceof Pe)pe.warn(t.message);else{const e=Ae.create("idb-get",{originalErrorMessage:t?.message});pe.warn(e.message)}}}async function wc(i,t){try{const e=(await bc()).transaction(ns,"readwrite");await e.objectStore(ns).put(t,xc(i)),await e.done}catch(e){if(e instanceof Pe)pe.warn(e.message);else{const s=Ae.create("idb-set",{originalErrorMessage:e?.message});pe.warn(s.message)}}}function xc(i){return`${i.name}!${i.options.appId}`}/**
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
*/const fg=1024,pg=30;class gg{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new _g(e),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),e=Ic();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===e||this._heartbeatsCache.heartbeats.some(s=>s.date===e))return;if(this._heartbeatsCache.heartbeats.push({date:e,agent:t}),this._heartbeatsCache.heartbeats.length>pg){const s=yg(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(t){pe.warn(t)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Ic(),{heartbeatsToSend:e,unsentEntries:s}=mg(this._heartbeatsCache.heartbeats),n=cn(JSON.stringify({version:2,heartbeats:e}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),n}catch(t){return pe.warn(t),""}}}function Ic(){return new Date().toISOString().substring(0,10)}function mg(i,t=fg){const e=[];let s=i.slice();for(const n of i){const r=e.find(o=>o.agent===n.agent);if(r){if(r.dates.push(n.date),Cc(e)>t){r.dates.pop();break}}else if(e.push({agent:n.agent,dates:[n.date]}),Cc(e)>t){e.pop();break}s=s.slice(1)}return{heartbeatsToSend:e,unsentEntries:s}}class _g{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return tp()?ep().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await ug(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const e=await this.read();return wc(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??e.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const e=await this.read();return wc(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??e.lastSentHeartbeatDate,heartbeats:[...e.heartbeats,...t.heartbeats]})}else return}}function Cc(i){return cn(JSON.stringify({version:2,heartbeats:i})).length}function yg(i){if(i.length===0)return-1;let t=0,e=i[0].date;for(let s=1;s<i.length;s++)i[s].date<e&&(e=i[s].date,t=s);return t}/**
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
*/function vg(i){Ii(new Ze("platform-logger",t=>new Ap(t),"PRIVATE")),Ii(new Ze("heartbeat",t=>new gg(t),"PRIVATE")),Re(Zr,gc,i),Re(Zr,gc,"esm2020"),Re("fire-js","")}vg("");var bg="firebase",wg="12.0.0";/**
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
*/Re(bg,wg,"app");function kc(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const xg=kc,Ec=new Zi("auth","Firebase",kc());/**
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
*/const fn=new Vr("@firebase/auth");function Ig(i,...t){fn.logLevel<=Z.WARN&&fn.warn(`Auth (${Ci}): ${i}`,...t)}function pn(i,...t){fn.logLevel<=Z.ERROR&&fn.error(`Auth (${Ci}): ${i}`,...t)}/**
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
*/function Vt(i,...t){throw no(i,...t)}function ie(i,...t){return no(i,...t)}function Tc(i,t,e){const s={...xg(),[t]:e};return new Zi("auth","Firebase",s).create(t,{appName:i.name})}function ge(i){return Tc(i,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function no(i,...t){if(typeof i!="string"){const e=t[0],s=[...t.slice(1)];return s[0]&&(s[0].appName=i.name),i._errorFactory.create(e,...s)}return Ec.create(i,...t)}function S(i,t,...e){if(!i)throw no(t,...e)}function me(i){const t="INTERNAL ASSERTION FAILED: "+i;throw pn(t),new Error(t)}function _e(i,t){i||me(t)}/**
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
*/function ro(){return typeof self<"u"&&self.location?.href||""}function Cg(){return Sc()==="http:"||Sc()==="https:"}function Sc(){return typeof self<"u"&&self.location?.protocol||null}/**
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
*/function kg(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Cg()||Qf()||"connection"in navigator)?navigator.onLine:!0}function Eg(){if(typeof navigator>"u")return null;const i=navigator;return i.languages&&i.languages[0]||i.language||null}/**
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
*/class rs{constructor(t,e){this.shortDelay=t,this.longDelay=e,_e(e>t,"Short delay should be less than long delay!"),this.isMobile=$r()||ac()}get(){return kg()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
*/function oo(i,t){_e(i.emulator,"Emulator should always be set here");const{url:e}=i.emulator;return t?`${e}${t.startsWith("/")?t.slice(1):t}`:e}/**
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
*/class Pc{static initialize(t,e,s){this.fetchImpl=t,e&&(this.headersImpl=e),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;me("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;me("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;me("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
*/const Tg={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
*/const Sg=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Pg=new rs(3e4,6e4);function De(i,t){return i.tenantId&&!t.tenantId?{...t,tenantId:i.tenantId}:t}async function Ne(i,t,e,s,n={}){return Mc(i,n,async()=>{let r={},o={};s&&(t==="GET"?o=s:r={body:JSON.stringify(s)});const a=xi({key:i.config.apiKey,...o}).slice(1),c=await i._getAdditionalHeaders();c["Content-Type"]="application/json",i.languageCode&&(c["X-Firebase-Locale"]=i.languageCode);const l={method:t,headers:c,...r};return Jf()||(l.referrerPolicy="no-referrer"),i.emulatorConfig&&bi(i.emulatorConfig.host)&&(l.credentials="include"),Pc.fetch()(await Ac(i,i.config.apiHost,e,a),l)})}async function Mc(i,t,e){i._canInitEmulator=!1;const s={...Tg,...t};try{const n=new Ag(i),r=await Promise.race([e(),n.promise]);n.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw gn(i,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw gn(i,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw gn(i,"email-already-in-use",o);if(c==="USER_DISABLED")throw gn(i,"user-disabled",o);const h=s[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Tc(i,h,l);Vt(i,h)}}catch(n){if(n instanceof Pe)throw n;Vt(i,"network-request-failed",{message:String(n)})}}async function os(i,t,e,s,n={}){const r=await Ne(i,t,e,s,n);return"mfaPendingCredential"in r&&Vt(i,"multi-factor-auth-required",{_serverResponse:r}),r}async function Ac(i,t,e,s){const n=`${t}${e}?${s}`,r=i,o=r.config.emulator?oo(i.config,n):`${i.config.apiScheme}://${n}`;return Sg.includes(e)&&(await r._persistenceManagerAvailable,r._getPersistenceType()==="COOKIE")?r._getPersistence()._getFinalTarget(o).toString():o}function Mg(i){switch(i){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Ag{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(t){this.auth=t,this.timer=null,this.promise=new Promise((e,s)=>{this.timer=setTimeout(()=>s(ie(this.auth,"network-request-failed")),Pg.get())})}}function gn(i,t,e){const s={appName:i.name};e.email&&(s.email=e.email),e.phoneNumber&&(s.phoneNumber=e.phoneNumber);const n=ie(i,t,s);return n.customData._tokenResponse=e,n}function Rc(i){return i!==void 0&&i.enterprise!==void 0}class Rg{constructor(t){if(this.siteKey="",this.recaptchaEnforcementState=[],t.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=t.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=t.recaptchaEnforcementState}getProviderEnforcementState(t){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const e of this.recaptchaEnforcementState)if(e.provider&&e.provider===t)return Mg(e.enforcementState);return null}isProviderEnabled(t){return this.getProviderEnforcementState(t)==="ENFORCE"||this.getProviderEnforcementState(t)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function Dg(i,t){return Ne(i,"GET","/v2/recaptchaConfig",De(i,t))}/**
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
*/async function Ng(i,t){return Ne(i,"POST","/v1/accounts:delete",t)}async function mn(i,t){return Ne(i,"POST","/v1/accounts:lookup",t)}/**
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
*/function as(i){if(i)try{const t=new Date(Number(i));if(!isNaN(t.getTime()))return t.toUTCString()}catch{}}async function Og(i,t=!1){const e=Tt(i),s=await e.getIdToken(t),n=co(s);S(n&&n.exp&&n.auth_time&&n.iat,e.auth,"internal-error");const r=typeof n.firebase=="object"?n.firebase:void 0,o=r?.sign_in_provider;return{claims:n,token:s,authTime:as(ao(n.auth_time)),issuedAtTime:as(ao(n.iat)),expirationTime:as(ao(n.exp)),signInProvider:o||null,signInSecondFactor:r?.sign_in_second_factor||null}}function ao(i){return Number(i)*1e3}function co(i){const[t,e,s]=i.split(".");if(t===void 0||e===void 0||s===void 0)return pn("JWT malformed, contained fewer than 3 sections"),null;try{const n=ln(e);return n?JSON.parse(n):(pn("Failed to decode base64 JWT payload"),null)}catch(n){return pn("Caught error parsing JWT payload as JSON",n?.toString()),null}}function Dc(i){const t=co(i);return S(t,"internal-error"),S(typeof t.exp<"u","internal-error"),S(typeof t.iat<"u","internal-error"),Number(t.exp)-Number(t.iat)}/**
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
*/async function cs(i,t,e=!1){if(e)return t;try{return await t}catch(s){throw s instanceof Pe&&Lg(s)&&i.auth.currentUser===i&&await i.auth.signOut(),s}}function Lg({code:i}){return i==="auth/user-disabled"||i==="auth/user-token-expired"}/**
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
*/class Fg{constructor(t){this.user=t,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(t){if(t){const e=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),e}else{this.errorBackoff=3e4;const e=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,e)}}schedule(t=!1){if(!this.isRunning)return;const e=this.getInterval(t);this.timerId=setTimeout(async()=>{await this.iteration()},e)}async iteration(){try{await this.user.getIdToken(!0)}catch(t){t?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
*/class lo{constructor(t,e){this.createdAt=t,this.lastLoginAt=e,this._initializeTime()}_initializeTime(){this.lastSignInTime=as(this.lastLoginAt),this.creationTime=as(this.createdAt)}_copy(t){this.createdAt=t.createdAt,this.lastLoginAt=t.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
*/async function _n(i){const t=i.auth,e=await i.getIdToken(),s=await cs(i,mn(t,{idToken:e}));S(s?.users.length,t,"internal-error");const n=s.users[0];i._notifyReloadListener(n);const r=n.providerUserInfo?.length?Nc(n.providerUserInfo):[],o=Ug(i.providerData,r),a=i.isAnonymous,c=!(i.email&&n.passwordHash)&&!o?.length,l=a?c:!1,h={uid:n.localId,displayName:n.displayName||null,photoURL:n.photoUrl||null,email:n.email||null,emailVerified:n.emailVerified||!1,phoneNumber:n.phoneNumber||null,tenantId:n.tenantId||null,providerData:o,metadata:new lo(n.createdAt,n.lastLoginAt),isAnonymous:l};Object.assign(i,h)}async function Bg(i){const t=Tt(i);await _n(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function Ug(i,t){return[...i.filter(e=>!t.some(s=>s.providerId===e.providerId)),...t]}function Nc(i){return i.map(({providerId:t,...e})=>({providerId:t,uid:e.rawId||"",displayName:e.displayName||null,email:e.email||null,phoneNumber:e.phoneNumber||null,photoURL:e.photoUrl||null}))}/**
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
*/async function Hg(i,t){const e=await Mc(i,{},async()=>{const s=xi({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:n,apiKey:r}=i.config,o=await Ac(i,n,"/v1/token",`key=${r}`),a=await i._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:s};return i.emulatorConfig&&bi(i.emulatorConfig.host)&&(c.credentials="include"),Pc.fetch()(o,c)});return{accessToken:e.access_token,expiresIn:e.expires_in,refreshToken:e.refresh_token}}async function Wg(i,t){return Ne(i,"POST","/v2/accounts:revokeToken",De(i,t))}/**
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
*/class ki{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(t){S(t.idToken,"internal-error"),S(typeof t.idToken<"u","internal-error"),S(typeof t.refreshToken<"u","internal-error");const e="expiresIn"in t&&typeof t.expiresIn<"u"?Number(t.expiresIn):Dc(t.idToken);this.updateTokensAndExpiration(t.idToken,t.refreshToken,e)}updateFromIdToken(t){S(t.length!==0,"internal-error");const e=Dc(t);this.updateTokensAndExpiration(t,null,e)}async getToken(t,e=!1){return!e&&this.accessToken&&!this.isExpired?this.accessToken:(S(this.refreshToken,t,"user-token-expired"),this.refreshToken?(await this.refresh(t,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(t,e){const{accessToken:s,refreshToken:n,expiresIn:r}=await Hg(t,e);this.updateTokensAndExpiration(s,n,Number(r))}updateTokensAndExpiration(t,e,s){this.refreshToken=e||null,this.accessToken=t||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(t,e){const{refreshToken:s,accessToken:n,expirationTime:r}=e,o=new ki;return s&&(S(typeof s=="string","internal-error",{appName:t}),o.refreshToken=s),n&&(S(typeof n=="string","internal-error",{appName:t}),o.accessToken=n),r&&(S(typeof r=="number","internal-error",{appName:t}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(t){this.accessToken=t.accessToken,this.refreshToken=t.refreshToken,this.expirationTime=t.expirationTime}_clone(){return Object.assign(new ki,this.toJSON())}_performRefresh(){return me("not implemented")}}/**
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
*/function Oe(i,t){S(typeof i=="string"||typeof i>"u","internal-error",{appName:t})}class Yt{constructor({uid:t,auth:e,stsTokenManager:s,...n}){this.providerId="firebase",this.proactiveRefresh=new Fg(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=e,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=n.displayName||null,this.email=n.email||null,this.emailVerified=n.emailVerified||!1,this.phoneNumber=n.phoneNumber||null,this.photoURL=n.photoURL||null,this.isAnonymous=n.isAnonymous||!1,this.tenantId=n.tenantId||null,this.providerData=n.providerData?[...n.providerData]:[],this.metadata=new lo(n.createdAt||void 0,n.lastLoginAt||void 0)}async getIdToken(t){const e=await cs(this,this.stsTokenManager.getToken(this.auth,t));return S(e,this.auth,"internal-error"),this.accessToken!==e&&(this.accessToken=e,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),e}getIdTokenResult(t){return Og(this,t)}reload(){return Bg(this)}_assign(t){this!==t&&(S(this.uid===t.uid,this.auth,"internal-error"),this.displayName=t.displayName,this.photoURL=t.photoURL,this.email=t.email,this.emailVerified=t.emailVerified,this.phoneNumber=t.phoneNumber,this.isAnonymous=t.isAnonymous,this.tenantId=t.tenantId,this.providerData=t.providerData.map(e=>({...e})),this.metadata._copy(t.metadata),this.stsTokenManager._assign(t.stsTokenManager))}_clone(t){const e=new Yt({...this,auth:t,stsTokenManager:this.stsTokenManager._clone()});return e.metadata._copy(this.metadata),e}_onReload(t){S(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=t,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(t){this.reloadListener?this.reloadListener(t):this.reloadUserInfo=t}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(t,e=!1){let s=!1;t.idToken&&t.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(t),s=!0),e&&await _n(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(jt(this.auth.app))return Promise.reject(ge(this.auth));const t=await this.getIdToken();return await cs(this,Ng(this.auth,{idToken:t})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(t=>({...t})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(t,e){const s=e.displayName??void 0,n=e.email??void 0,r=e.phoneNumber??void 0,o=e.photoURL??void 0,a=e.tenantId??void 0,c=e._redirectEventId??void 0,l=e.createdAt??void 0,h=e.lastLoginAt??void 0,{uid:d,emailVerified:u,isAnonymous:f,providerData:p,stsTokenManager:m}=e;S(d&&m,t,"internal-error");const _=ki.fromJSON(this.name,m);S(typeof d=="string",t,"internal-error"),Oe(s,t.name),Oe(n,t.name),S(typeof u=="boolean",t,"internal-error"),S(typeof f=="boolean",t,"internal-error"),Oe(r,t.name),Oe(o,t.name),Oe(a,t.name),Oe(c,t.name),Oe(l,t.name),Oe(h,t.name);const v=new Yt({uid:d,auth:t,email:n,emailVerified:u,displayName:s,isAnonymous:f,photoURL:o,phoneNumber:r,tenantId:a,stsTokenManager:_,createdAt:l,lastLoginAt:h});return p&&Array.isArray(p)&&(v.providerData=p.map(I=>({...I}))),c&&(v._redirectEventId=c),v}static async _fromIdTokenResponse(t,e,s=!1){const n=new ki;n.updateFromServerResponse(e);const r=new Yt({uid:e.localId,auth:t,stsTokenManager:n,isAnonymous:s});return await _n(r),r}static async _fromGetAccountInfoResponse(t,e,s){const n=e.users[0];S(n.localId!==void 0,"internal-error");const r=n.providerUserInfo!==void 0?Nc(n.providerUserInfo):[],o=!(n.email&&n.passwordHash)&&!r?.length,a=new ki;a.updateFromIdToken(s);const c=new Yt({uid:n.localId,auth:t,stsTokenManager:a,isAnonymous:o}),l={uid:n.localId,displayName:n.displayName||null,photoURL:n.photoUrl||null,email:n.email||null,emailVerified:n.emailVerified||!1,phoneNumber:n.phoneNumber||null,tenantId:n.tenantId||null,providerData:r,metadata:new lo(n.createdAt,n.lastLoginAt),isAnonymous:!(n.email&&n.passwordHash)&&!r?.length};return Object.assign(c,l),c}}/**
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
*/const Oc=new Map;function ye(i){_e(i instanceof Function,"Expected a class definition");let t=Oc.get(i);return t?(_e(t instanceof i,"Instance stored in cache mismatched with class"),t):(t=new i,Oc.set(i,t),t)}/**
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
*/class Lc{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(t,e){this.storage[t]=e}async _get(t){const e=this.storage[t];return e===void 0?null:e}async _remove(t){delete this.storage[t]}_addListener(t,e){}_removeListener(t,e){}}Lc.type="NONE";const Fc=Lc;/**
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
*/function yn(i,t,e){return`firebase:${i}:${t}:${e}`}class Ei{constructor(t,e,s){this.persistence=t,this.auth=e,this.userKey=s;const{config:n,name:r}=this.auth;this.fullUserKey=yn(this.userKey,n.apiKey,r),this.fullPersistenceKey=yn("persistence",n.apiKey,r),this.boundEventHandler=e._onStorageEvent.bind(e),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(t){return this.persistence._set(this.fullUserKey,t.toJSON())}async getCurrentUser(){const t=await this.persistence._get(this.fullUserKey);if(!t)return null;if(typeof t=="string"){const e=await mn(this.auth,{idToken:t}).catch(()=>{});return e?Yt._fromGetAccountInfoResponse(this.auth,e,t):null}return Yt._fromJSON(this.auth,t)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(t){if(this.persistence===t)return;const e=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=t,e)return this.setCurrentUser(e)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(t,e,s="authUser"){if(!e.length)return new Ei(ye(Fc),t,s);const n=(await Promise.all(e.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let r=n[0]||ye(Fc);const o=yn(s,t.config.apiKey,t.name);let a=null;for(const l of e)try{const h=await l._get(o);if(h){let d;if(typeof h=="string"){const u=await mn(t,{idToken:h}).catch(()=>{});if(!u)break;d=await Yt._fromGetAccountInfoResponse(t,u,h)}else d=Yt._fromJSON(t,h);l!==r&&(a=d),r=l;break}}catch{}const c=n.filter(l=>l._shouldAllowMigration);return!r._shouldAllowMigration||!c.length?new Ei(r,t,s):(r=c[0],a&&await r._set(o,a.toJSON()),await Promise.all(e.map(async l=>{if(l!==r)try{await l._remove(o)}catch{}})),new Ei(r,t,s))}}/**
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
*/function Bc(i){const t=i.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if($c(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(Uc(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(jc(t))return"Blackberry";if(qc(t))return"Webos";if(Hc(t))return"Safari";if((t.includes("chrome/")||Wc(t))&&!t.includes("edge/"))return"Chrome";if(zc(t))return"Android";{const e=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=i.match(e);if(s?.length===2)return s[1]}return"Other"}function Uc(i=Mt()){return/firefox\//i.test(i)}function Hc(i=Mt()){const t=i.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function Wc(i=Mt()){return/crios\//i.test(i)}function $c(i=Mt()){return/iemobile/i.test(i)}function zc(i=Mt()){return/android/i.test(i)}function jc(i=Mt()){return/blackberry/i.test(i)}function qc(i=Mt()){return/webos/i.test(i)}function ho(i=Mt()){return/iphone|ipad|ipod/i.test(i)||/macintosh/i.test(i)&&/mobile/i.test(i)}function $g(i=Mt()){return ho(i)&&!!window.navigator?.standalone}function zg(){return Xf()&&document.documentMode===10}function Vc(i=Mt()){return ho(i)||zc(i)||qc(i)||jc(i)||/windows phone/i.test(i)||$c(i)}/**
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
*/function Yc(i,t=[]){let e;switch(i){case"Browser":e=Bc(Mt());break;case"Worker":e=`${Bc(Mt())}-${i}`;break;default:e=i}const s=t.length?t.join(","):"FirebaseCore-web";return`${e}/JsCore/${Ci}/${s}`}/**
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
*/class jg{constructor(t){this.auth=t,this.queue=[]}pushCallback(t,e){const s=r=>new Promise((o,a)=>{try{const c=t(r);o(c)}catch(c){a(c)}});s.onAbort=e,this.queue.push(s);const n=this.queue.length-1;return()=>{this.queue[n]=()=>Promise.resolve()}}async runMiddleware(t){if(this.auth.currentUser===t)return;const e=[];try{for(const s of this.queue)await s(t),s.onAbort&&e.push(s.onAbort)}catch(s){e.reverse();for(const n of e)try{n()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s?.message})}}}/**
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
*/async function qg(i,t={}){return Ne(i,"GET","/v2/passwordPolicy",De(i,t))}/**
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
*/const Vg=6;class Yg{constructor(t){const e=t.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=e.minPasswordLength??Vg,e.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=e.maxPasswordLength),e.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=e.containsLowercaseCharacter),e.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=e.containsUppercaseCharacter),e.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=e.containsNumericCharacter),e.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=e.containsNonAlphanumericCharacter),this.enforcementState=t.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=t.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=t.forceUpgradeOnSignin??!1,this.schemaVersion=t.schemaVersion}validatePassword(t){const e={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(t,e),this.validatePasswordCharacterOptions(t,e),e.isValid&&(e.isValid=e.meetsMinPasswordLength??!0),e.isValid&&(e.isValid=e.meetsMaxPasswordLength??!0),e.isValid&&(e.isValid=e.containsLowercaseLetter??!0),e.isValid&&(e.isValid=e.containsUppercaseLetter??!0),e.isValid&&(e.isValid=e.containsNumericCharacter??!0),e.isValid&&(e.isValid=e.containsNonAlphanumericCharacter??!0),e}validatePasswordLengthOptions(t,e){const s=this.customStrengthOptions.minPasswordLength,n=this.customStrengthOptions.maxPasswordLength;s&&(e.meetsMinPasswordLength=t.length>=s),n&&(e.meetsMaxPasswordLength=t.length<=n)}validatePasswordCharacterOptions(t,e){this.updatePasswordCharacterOptionsStatuses(e,!1,!1,!1,!1);let s;for(let n=0;n<t.length;n++)s=t.charAt(n),this.updatePasswordCharacterOptionsStatuses(e,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(t,e,s,n,r){this.customStrengthOptions.containsLowercaseLetter&&(t.containsLowercaseLetter||(t.containsLowercaseLetter=e)),this.customStrengthOptions.containsUppercaseLetter&&(t.containsUppercaseLetter||(t.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(t.containsNumericCharacter||(t.containsNumericCharacter=n)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(t.containsNonAlphanumericCharacter||(t.containsNonAlphanumericCharacter=r))}}/**
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
*/class Kg{constructor(t,e,s,n){this.app=t,this.heartbeatServiceProvider=e,this.appCheckServiceProvider=s,this.config=n,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Kc(this),this.idTokenSubscription=new Kc(this),this.beforeStateQueue=new jg(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Ec,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=t.name,this.clientVersion=n.sdkClientVersion,this._persistenceManagerAvailable=new Promise(r=>this._resolvePersistenceManagerAvailable=r)}_initializeWithPersistence(t,e){return e&&(this._popupRedirectResolver=ye(e)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Ei.create(this,t),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(e),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const t=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!t)){if(this.currentUser&&t&&this.currentUser.uid===t.uid){this._currentUser._assign(t),await this.currentUser.getIdToken();return}await this._updateCurrentUser(t,!0)}}async initializeCurrentUserFromIdToken(t){try{const e=await mn(this,{idToken:t}),s=await Yt._fromGetAccountInfoResponse(this,e,t);await this.directlySetCurrentUser(s)}catch(e){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",e),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(t){if(jt(this.app)){const r=this.app.settings.authIdToken;return r?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(r).then(o,o))}):this.directlySetCurrentUser(null)}const e=await this.assertedPersistence.getCurrentUser();let s=e,n=!1;if(t&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const r=this.redirectUser?._redirectEventId,o=s?._redirectEventId,a=await this.tryRedirectSignIn(t);(!r||r===o)&&a?.user&&(s=a.user,n=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(n)try{await this.beforeStateQueue.runMiddleware(s)}catch(r){s=e,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(r))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return S(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(t){let e=null;try{e=await this._popupRedirectResolver._completeRedirectFn(this,t,!0)}catch{await this._setRedirectUser(null)}return e}async reloadAndSetCurrentUserOrClear(t){try{await _n(t)}catch(e){if(e?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(t)}useDeviceLanguage(){this.languageCode=Eg()}async _delete(){this._deleted=!0}async updateCurrentUser(t){if(jt(this.app))return Promise.reject(ge(this));const e=t?Tt(t):null;return e&&S(e.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(e&&e._clone(this))}async _updateCurrentUser(t,e=!1){if(!this._deleted)return t&&S(this.tenantId===t.tenantId,this,"tenant-id-mismatch"),e||await this.beforeStateQueue.runMiddleware(t),this.queue(async()=>{await this.directlySetCurrentUser(t),this.notifyAuthListeners()})}async signOut(){return jt(this.app)?Promise.reject(ge(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(t){return jt(this.app)?Promise.reject(ge(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ye(t))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(t){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const e=this._getPasswordPolicyInternal();return e.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):e.validatePassword(t)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const t=await qg(this),e=new Yg(t);this.tenantId===null?this._projectPasswordPolicy=e:this._tenantPasswordPolicies[this.tenantId]=e}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(t){this._errorFactory=new Zi("auth","Firebase",t())}onAuthStateChanged(t,e,s){return this.registerStateListener(this.authStateSubscription,t,e,s)}beforeAuthStateChanged(t,e){return this.beforeStateQueue.pushCallback(t,e)}onIdTokenChanged(t,e,s){return this.registerStateListener(this.idTokenSubscription,t,e,s)}authStateReady(){return new Promise((t,e)=>{if(this.currentUser)t();else{const s=this.onAuthStateChanged(()=>{s(),t()},e)}})}async revokeAccessToken(t){if(this.currentUser){const e=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:t,idToken:e};this.tenantId!=null&&(s.tenantId=this.tenantId),await Wg(this,s)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(t,e){const s=await this.getOrInitRedirectPersistenceManager(e);return t===null?s.removeCurrentUser():s.setCurrentUser(t)}async getOrInitRedirectPersistenceManager(t){if(!this.redirectPersistenceManager){const e=t&&ye(t)||this._popupRedirectResolver;S(e,this,"argument-error"),this.redirectPersistenceManager=await Ei.create(this,[ye(e._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(t){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===t?this._currentUser:this.redirectUser?._redirectEventId===t?this.redirectUser:null}async _persistUserIfCurrent(t){if(t===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(t))}_notifyListenersIfCurrent(t){t===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const t=this.currentUser?.uid??null;this.lastNotifiedUid!==t&&(this.lastNotifiedUid=t,this.authStateSubscription.next(this.currentUser))}registerStateListener(t,e,s,n){if(this._deleted)return()=>{};const r=typeof e=="function"?e:e.next.bind(e);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(S(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof e=="function"){const c=t.addObserver(e,s,n);return()=>{o=!0,c()}}else{const c=t.addObserver(e);return()=>{o=!0,c()}}}async directlySetCurrentUser(t){this.currentUser&&this.currentUser!==t&&this._currentUser._stopProactiveRefresh(),t&&this.isProactiveRefreshEnabled&&t._startProactiveRefresh(),this.currentUser=t,t?await this.assertedPersistence.setCurrentUser(t):await this.assertedPersistence.removeCurrentUser()}queue(t){return this.operations=this.operations.then(t,t),this.operations}get assertedPersistence(){return S(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(t){!t||this.frameworks.includes(t)||(this.frameworks.push(t),this.frameworks.sort(),this.clientVersion=Yc(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const e=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();e&&(t["X-Firebase-Client"]=e);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){if(jt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return t?.error&&Ig(`Error while retrieving App Check token: ${t.error}`),t?.token}}function ei(i){return Tt(i)}class Kc{constructor(t){this.auth=t,this.observer=null,this.addObserver=cp(e=>this.observer=e)}get next(){return S(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
*/let vn={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Gg(i){vn=i}function Gc(i){return vn.loadJS(i)}function Jg(){return vn.recaptchaEnterpriseScript}function Qg(){return vn.gapiScript}function Xg(i){return`__${i}${Math.floor(Math.random()*1e6)}`}class Zg{constructor(){this.enterprise=new tm}ready(t){t()}execute(t,e){return Promise.resolve("token")}render(t,e){return""}}class tm{ready(t){t()}execute(t,e){return Promise.resolve("token")}render(t,e){return""}}const em="recaptcha-enterprise",Jc="NO_RECAPTCHA";class im{constructor(t){this.type=em,this.auth=ei(t)}async verify(t="verify",e=!1){async function s(r){if(!e){if(r.tenantId==null&&r._agentRecaptchaConfig!=null)return r._agentRecaptchaConfig.siteKey;if(r.tenantId!=null&&r._tenantRecaptchaConfigs[r.tenantId]!==void 0)return r._tenantRecaptchaConfigs[r.tenantId].siteKey}return new Promise(async(o,a)=>{Dg(r,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const l=new Rg(c);return r.tenantId==null?r._agentRecaptchaConfig=l:r._tenantRecaptchaConfigs[r.tenantId]=l,o(l.siteKey)}}).catch(c=>{a(c)})})}function n(r,o,a){const c=window.grecaptcha;Rc(c)?c.enterprise.ready(()=>{c.enterprise.execute(r,{action:t}).then(l=>{o(l)}).catch(()=>{o(Jc)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Zg().execute("siteKey",{action:"verify"}):new Promise((r,o)=>{s(this.auth).then(a=>{if(!e&&Rc(window.grecaptcha))n(a,r,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=Jg();c.length!==0&&(c+=a),Gc(c).then(()=>{n(a,r,o)}).catch(l=>{o(l)})}}).catch(a=>{o(a)})})}}async function Qc(i,t,e,s=!1,n=!1){const r=new im(i);let o;if(n)o=Jc;else try{o=await r.verify(e)}catch{o=await r.verify(e,!0)}const a={...t};if(e==="mfaSmsEnrollment"||e==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in a){const c=a.phoneEnrollmentInfo.phoneNumber,l=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in a){const c=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return s?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function uo(i,t,e,s,n){if(i._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const r=await Qc(i,t,e,e==="getOobCode");return s(i,r)}else return s(i,t).catch(async r=>{if(r.code==="auth/missing-recaptcha-token"){console.log(`${e} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await Qc(i,t,e,e==="getOobCode");return s(i,o)}else return Promise.reject(r)})}/**
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
*/function sm(i,t){const e=io(i,"auth");if(e.isInitialized()){const s=e.getImmediate(),n=e.getOptions();if(Xe(n,t??{}))return s;Vt(s,"already-initialized")}return e.initialize({options:t})}function nm(i,t){const e=t?.persistence||[],s=(Array.isArray(e)?e:[e]).map(ye);t?.errorMap&&i._updateErrorMap(t.errorMap),i._initializeWithPersistence(s,t?.popupRedirectResolver)}function rm(i,t,e){const s=ei(i);S(/^https?:\/\//.test(t),s,"invalid-emulator-scheme");const n=!1,r=Xc(t),{host:o,port:a}=om(t),c=a===null?"":`:${a}`,l={url:`${r}//${o}${c}/`},h=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:n})});if(!s._canInitEmulator){S(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),S(Xe(l,s.config.emulator)&&Xe(h,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=l,s.emulatorConfig=h,s.settings.appVerificationDisabledForTesting=!0,bi(o)?(nc(`${r}//${o}${c}`),oc("Auth",!0)):am()}function Xc(i){const t=i.indexOf(":");return t<0?"":i.substr(0,t+1)}function om(i){const t=Xc(i),e=/(\/\/)?([^?#/]+)/.exec(i.substr(t.length));if(!e)return{host:"",port:null};const s=e[2].split("@").pop()||"",n=/^(\[[^\]]+\])(:|$)/.exec(s);if(n){const r=n[1];return{host:r,port:Zc(s.substr(r.length+1))}}else{const[r,o]=s.split(":");return{host:r,port:Zc(o)}}}function Zc(i){if(!i)return null;const t=Number(i);return isNaN(t)?null:t}function am(){function i(){const t=document.createElement("p"),e=t.style;t.innerText="Running in emulator mode. Do not use with production credentials.",e.position="fixed",e.width="100%",e.backgroundColor="#ffffff",e.border=".1em solid #000000",e.color="#b50000",e.bottom="0px",e.left="0px",e.margin="0px",e.zIndex="10000",e.textAlign="center",t.classList.add("firebase-emulator-warning"),document.body.appendChild(t)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",i):i())}/**
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
*/class fo{constructor(t,e){this.providerId=t,this.signInMethod=e}toJSON(){return me("not implemented")}_getIdTokenResponse(t){return me("not implemented")}_linkToIdToken(t,e){return me("not implemented")}_getReauthenticationResolver(t){return me("not implemented")}}async function cm(i,t){return Ne(i,"POST","/v1/accounts:signUp",t)}/**
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
*/async function lm(i,t){return os(i,"POST","/v1/accounts:signInWithPassword",De(i,t))}/**
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
*/async function hm(i,t){return os(i,"POST","/v1/accounts:signInWithEmailLink",De(i,t))}async function dm(i,t){return os(i,"POST","/v1/accounts:signInWithEmailLink",De(i,t))}/**
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
*/class ls extends fo{constructor(t,e,s,n=null){super("password",s),this._email=t,this._password=e,this._tenantId=n}static _fromEmailAndPassword(t,e){return new ls(t,e,"password")}static _fromEmailAndCode(t,e,s=null){return new ls(t,e,"emailLink",s)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(t){const e=typeof t=="string"?JSON.parse(t):t;if(e?.email&&e?.password){if(e.signInMethod==="password")return this._fromEmailAndPassword(e.email,e.password);if(e.signInMethod==="emailLink")return this._fromEmailAndCode(e.email,e.password,e.tenantId)}return null}async _getIdTokenResponse(t){switch(this.signInMethod){case"password":const e={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return uo(t,e,"signInWithPassword",lm);case"emailLink":return hm(t,{email:this._email,oobCode:this._password});default:Vt(t,"internal-error")}}async _linkToIdToken(t,e){switch(this.signInMethod){case"password":const s={idToken:e,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return uo(t,s,"signUpPassword",cm);case"emailLink":return dm(t,{idToken:e,email:this._email,oobCode:this._password});default:Vt(t,"internal-error")}}_getReauthenticationResolver(t){return this._getIdTokenResponse(t)}}/**
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
*/async function Ti(i,t){return os(i,"POST","/v1/accounts:signInWithIdp",De(i,t))}/**
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
*/const um="http://localhost";class ii extends fo{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(t){const e=new ii(t.providerId,t.signInMethod);return t.idToken||t.accessToken?(t.idToken&&(e.idToken=t.idToken),t.accessToken&&(e.accessToken=t.accessToken),t.nonce&&!t.pendingToken&&(e.nonce=t.nonce),t.pendingToken&&(e.pendingToken=t.pendingToken)):t.oauthToken&&t.oauthTokenSecret?(e.accessToken=t.oauthToken,e.secret=t.oauthTokenSecret):Vt("argument-error"),e}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(t){const e=typeof t=="string"?JSON.parse(t):t,{providerId:s,signInMethod:n,...r}=e;if(!s||!n)return null;const o=new ii(s,n);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(t){const e=this.buildRequest();return Ti(t,e)}_linkToIdToken(t,e){const s=this.buildRequest();return s.idToken=e,Ti(t,s)}_getReauthenticationResolver(t){const e=this.buildRequest();return e.autoCreate=!1,Ti(t,e)}buildRequest(){const t={requestUri:um,returnSecureToken:!0};if(this.pendingToken)t.pendingToken=this.pendingToken;else{const e={};this.idToken&&(e.id_token=this.idToken),this.accessToken&&(e.access_token=this.accessToken),this.secret&&(e.oauth_token_secret=this.secret),e.providerId=this.providerId,this.nonce&&!this.pendingToken&&(e.nonce=this.nonce),t.postBody=xi(e)}return t}}/**
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
*/function fm(i){switch(i){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function pm(i){const t=es(is(i)).link,e=t?es(is(t)).deep_link_id:null,s=es(is(i)).deep_link_id;return(s?es(is(s)).link:null)||s||e||t||i}class po{constructor(t){const e=es(is(t)),s=e.apiKey??null,n=e.oobCode??null,r=fm(e.mode??null);S(s&&n&&r,"argument-error"),this.apiKey=s,this.operation=r,this.code=n,this.continueUrl=e.continueUrl??null,this.languageCode=e.lang??null,this.tenantId=e.tenantId??null}static parseLink(t){const e=pm(t);try{return new po(e)}catch{return null}}}/**
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
*/class Si{constructor(){this.providerId=Si.PROVIDER_ID}static credential(t,e){return ls._fromEmailAndPassword(t,e)}static credentialWithLink(t,e){const s=po.parseLink(e);return S(s,"argument-error"),ls._fromEmailAndCode(t,s.code,s.tenantId)}}Si.PROVIDER_ID="password",Si.EMAIL_PASSWORD_SIGN_IN_METHOD="password",Si.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
*/class tl{constructor(t){this.providerId=t,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(t){this.defaultLanguageCode=t}setCustomParameters(t){return this.customParameters=t,this}getCustomParameters(){return this.customParameters}}/**
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
*/class hs extends tl{constructor(){super(...arguments),this.scopes=[]}addScope(t){return this.scopes.includes(t)||this.scopes.push(t),this}getScopes(){return[...this.scopes]}}/**
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
*/class Le extends hs{constructor(){super("facebook.com")}static credential(t){return ii._fromParams({providerId:Le.PROVIDER_ID,signInMethod:Le.FACEBOOK_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return Le.credentialFromTaggedObject(t)}static credentialFromError(t){return Le.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return Le.credential(t.oauthAccessToken)}catch{return null}}}Le.FACEBOOK_SIGN_IN_METHOD="facebook.com",Le.PROVIDER_ID="facebook.com";/**
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
*/class Fe extends hs{constructor(){super("google.com"),this.addScope("profile")}static credential(t,e){return ii._fromParams({providerId:Fe.PROVIDER_ID,signInMethod:Fe.GOOGLE_SIGN_IN_METHOD,idToken:t,accessToken:e})}static credentialFromResult(t){return Fe.credentialFromTaggedObject(t)}static credentialFromError(t){return Fe.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthIdToken:e,oauthAccessToken:s}=t;if(!e&&!s)return null;try{return Fe.credential(e,s)}catch{return null}}}Fe.GOOGLE_SIGN_IN_METHOD="google.com",Fe.PROVIDER_ID="google.com";/**
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
*/class Be extends hs{constructor(){super("github.com")}static credential(t){return ii._fromParams({providerId:Be.PROVIDER_ID,signInMethod:Be.GITHUB_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return Be.credentialFromTaggedObject(t)}static credentialFromError(t){return Be.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return Be.credential(t.oauthAccessToken)}catch{return null}}}Be.GITHUB_SIGN_IN_METHOD="github.com",Be.PROVIDER_ID="github.com";/**
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
*/class Ue extends hs{constructor(){super("twitter.com")}static credential(t,e){return ii._fromParams({providerId:Ue.PROVIDER_ID,signInMethod:Ue.TWITTER_SIGN_IN_METHOD,oauthToken:t,oauthTokenSecret:e})}static credentialFromResult(t){return Ue.credentialFromTaggedObject(t)}static credentialFromError(t){return Ue.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthAccessToken:e,oauthTokenSecret:s}=t;if(!e||!s)return null;try{return Ue.credential(e,s)}catch{return null}}}Ue.TWITTER_SIGN_IN_METHOD="twitter.com",Ue.PROVIDER_ID="twitter.com";/**
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
*/async function gm(i,t){return os(i,"POST","/v1/accounts:signUp",De(i,t))}/**
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
*/class si{constructor(t){this.user=t.user,this.providerId=t.providerId,this._tokenResponse=t._tokenResponse,this.operationType=t.operationType}static async _fromIdTokenResponse(t,e,s,n=!1){const r=await Yt._fromIdTokenResponse(t,s,n),o=el(s);return new si({user:r,providerId:o,_tokenResponse:s,operationType:e})}static async _forOperation(t,e,s){await t._updateTokensIfNecessary(s,!0);const n=el(s);return new si({user:t,providerId:n,_tokenResponse:s,operationType:e})}}function el(i){return i.providerId?i.providerId:"phoneNumber"in i?"phone":null}/**
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
*/class bn extends Pe{constructor(t,e,s,n){super(e.code,e.message),this.operationType=s,this.user=n,Object.setPrototypeOf(this,bn.prototype),this.customData={appName:t.name,tenantId:t.tenantId??void 0,_serverResponse:e.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(t,e,s,n){return new bn(t,e,s,n)}}function il(i,t,e,s){return(t==="reauthenticate"?e._getReauthenticationResolver(i):e._getIdTokenResponse(i)).catch(n=>{throw n.code==="auth/multi-factor-auth-required"?bn._fromErrorAndOperation(i,n,t,s):n})}async function mm(i,t,e=!1){const s=await cs(i,t._linkToIdToken(i.auth,await i.getIdToken()),e);return si._forOperation(i,"link",s)}/**
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
*/async function _m(i,t,e=!1){const{auth:s}=i;if(jt(s.app))return Promise.reject(ge(s));const n="reauthenticate";try{const r=await cs(i,il(s,n,t,i),e);S(r.idToken,s,"internal-error");const o=co(r.idToken);S(o,s,"internal-error");const{sub:a}=o;return S(i.uid===a,s,"user-mismatch"),si._forOperation(i,n,r)}catch(r){throw r?.code==="auth/user-not-found"&&Vt(s,"user-mismatch"),r}}/**
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
*/async function sl(i,t,e=!1){if(jt(i.app))return Promise.reject(ge(i));const s="signIn",n=await il(i,s,t),r=await si._fromIdTokenResponse(i,s,n);return e||await i._updateCurrentUser(r.user),r}async function ym(i,t){return sl(ei(i),t)}/**
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
*/async function nl(i){const t=ei(i);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}async function vm(i,t,e){if(jt(i.app))return Promise.reject(ge(i));const s=ei(i),n=await uo(s,{returnSecureToken:!0,email:t,password:e,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",gm).catch(o=>{throw o.code==="auth/password-does-not-meet-requirements"&&nl(i),o}),r=await si._fromIdTokenResponse(s,"signIn",n);return await s._updateCurrentUser(r.user),r}function bm(i,t,e){return jt(i.app)?Promise.reject(ge(i)):ym(Tt(i),Si.credential(t,e)).catch(async s=>{throw s.code==="auth/password-does-not-meet-requirements"&&nl(i),s})}function wm(i,t,e,s){return Tt(i).onIdTokenChanged(t,e,s)}function xm(i,t,e){return Tt(i).beforeAuthStateChanged(t,e)}function Im(i,t,e,s){return Tt(i).onAuthStateChanged(t,e,s)}function Cm(i){return Tt(i).signOut()}const wn="__sak";/**
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
*/class rl{constructor(t,e){this.storageRetriever=t,this.type=e}_isAvailable(){try{return this.storage?(this.storage.setItem(wn,"1"),this.storage.removeItem(wn),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(t,e){return this.storage.setItem(t,JSON.stringify(e)),Promise.resolve()}_get(t){const e=this.storage.getItem(t);return Promise.resolve(e?JSON.parse(e):null)}_remove(t){return this.storage.removeItem(t),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
*/const km=1e3,Em=10;class ol extends rl{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(t,e)=>this.onStorageEvent(t,e),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Vc(),this._shouldAllowMigration=!0}forAllChangedKeys(t){for(const e of Object.keys(this.listeners)){const s=this.storage.getItem(e),n=this.localCache[e];s!==n&&t(e,n,s)}}onStorageEvent(t,e=!1){if(!t.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const s=t.key;e?this.detachListener():this.stopPolling();const n=()=>{const o=this.storage.getItem(s);!e&&this.localCache[s]===o||this.notifyListeners(s,o)},r=this.storage.getItem(s);zg()&&r!==t.newValue&&t.newValue!==t.oldValue?setTimeout(n,Em):n()}notifyListeners(t,e){this.localCache[t]=e;const s=this.listeners[t];if(s)for(const n of Array.from(s))n(e&&JSON.parse(e))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((t,e,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:t,oldValue:e,newValue:s}),!0)})},km)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(t,e){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[t]||(this.listeners[t]=new Set,this.localCache[t]=this.storage.getItem(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(t,e){await super._set(t,e),this.localCache[t]=JSON.stringify(e)}async _get(t){const e=await super._get(t);return this.localCache[t]=JSON.stringify(e),e}async _remove(t){await super._remove(t),delete this.localCache[t]}}ol.type="LOCAL";const Tm=ol;/**
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
*/class al extends rl{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(t,e){}_removeListener(t,e){}}al.type="SESSION";const cl=al;/**
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
*/function Sm(i){return Promise.all(i.map(async t=>{try{return{fulfilled:!0,value:await t}}catch(e){return{fulfilled:!1,reason:e}}}))}/**
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
*/class xn{constructor(t){this.eventTarget=t,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(t){const e=this.receivers.find(n=>n.isListeningto(t));if(e)return e;const s=new xn(t);return this.receivers.push(s),s}isListeningto(t){return this.eventTarget===t}async handleEvent(t){const e=t,{eventId:s,eventType:n,data:r}=e.data,o=this.handlersMap[n];if(!o?.size)return;e.ports[0].postMessage({status:"ack",eventId:s,eventType:n});const a=Array.from(o).map(async l=>l(e.origin,r)),c=await Sm(a);e.ports[0].postMessage({status:"done",eventId:s,eventType:n,response:c})}_subscribe(t,e){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[t]||(this.handlersMap[t]=new Set),this.handlersMap[t].add(e)}_unsubscribe(t,e){this.handlersMap[t]&&e&&this.handlersMap[t].delete(e),(!e||this.handlersMap[t].size===0)&&delete this.handlersMap[t],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}xn.receivers=[];/**
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
*/function go(i="",t=10){let e="";for(let s=0;s<t;s++)e+=Math.floor(Math.random()*10);return i+e}/**
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
*/class Pm{constructor(t){this.target=t,this.handlers=new Set}removeMessageHandler(t){t.messageChannel&&(t.messageChannel.port1.removeEventListener("message",t.onMessage),t.messageChannel.port1.close()),this.handlers.delete(t)}async _send(t,e,s=50){const n=typeof MessageChannel<"u"?new MessageChannel:null;if(!n)throw new Error("connection_unavailable");let r,o;return new Promise((a,c)=>{const l=go("",20);n.port1.start();const h=setTimeout(()=>{c(new Error("unsupported_event"))},s);o={messageChannel:n,onMessage(d){const u=d;if(u.data.eventId===l)switch(u.data.status){case"ack":clearTimeout(h),r=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(u.data.response);break;default:clearTimeout(h),clearTimeout(r),c(new Error("invalid_response"));break}}},this.handlers.add(o),n.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:t,eventId:l,data:e},[n.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
*/function se(){return window}function Mm(i){se().location.href=i}/**
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
*/function ll(){return typeof se().WorkerGlobalScope<"u"&&typeof se().importScripts=="function"}async function Am(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Rm(){return navigator?.serviceWorker?.controller||null}function Dm(){return ll()?self:null}/**
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
*/const hl="firebaseLocalStorageDb",Nm=1,In="firebaseLocalStorage",dl="fbase_key";class ds{constructor(t){this.request=t}toPromise(){return new Promise((t,e)=>{this.request.addEventListener("success",()=>{t(this.request.result)}),this.request.addEventListener("error",()=>{e(this.request.error)})})}}function Cn(i,t){return i.transaction([In],t?"readwrite":"readonly").objectStore(In)}function Om(){const i=indexedDB.deleteDatabase(hl);return new ds(i).toPromise()}function mo(){const i=indexedDB.open(hl,Nm);return new Promise((t,e)=>{i.addEventListener("error",()=>{e(i.error)}),i.addEventListener("upgradeneeded",()=>{const s=i.result;try{s.createObjectStore(In,{keyPath:dl})}catch(n){e(n)}}),i.addEventListener("success",async()=>{const s=i.result;s.objectStoreNames.contains(In)?t(s):(s.close(),await Om(),t(await mo()))})})}async function ul(i,t,e){const s=Cn(i,!0).put({[dl]:t,value:e});return new ds(s).toPromise()}async function Lm(i,t){const e=Cn(i,!1).get(t),s=await new ds(e).toPromise();return s===void 0?null:s.value}function fl(i,t){const e=Cn(i,!0).delete(t);return new ds(e).toPromise()}const Fm=800,Bm=3;class pl{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await mo(),this.db)}async _withRetries(t){let e=0;for(;;)try{const s=await this._openDb();return await t(s)}catch(s){if(e++>Bm)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ll()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=xn._getInstance(Dm()),this.receiver._subscribe("keyChanged",async(t,e)=>({keyProcessed:(await this._poll()).includes(e.key)})),this.receiver._subscribe("ping",async(t,e)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await Am(),!this.activeServiceWorker)return;this.sender=new Pm(this.activeServiceWorker);const t=await this.sender._send("ping",{},800);t&&t[0]?.fulfilled&&t[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(t){if(!(!this.sender||!this.activeServiceWorker||Rm()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:t},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const t=await mo();return await ul(t,wn,"1"),await fl(t,wn),!0}catch{}return!1}async _withPendingWrite(t){this.pendingWrites++;try{await t()}finally{this.pendingWrites--}}async _set(t,e){return this._withPendingWrite(async()=>(await this._withRetries(s=>ul(s,t,e)),this.localCache[t]=e,this.notifyServiceWorker(t)))}async _get(t){const e=await this._withRetries(s=>Lm(s,t));return this.localCache[t]=e,e}async _remove(t){return this._withPendingWrite(async()=>(await this._withRetries(e=>fl(e,t)),delete this.localCache[t],this.notifyServiceWorker(t)))}async _poll(){const t=await this._withRetries(n=>{const r=Cn(n,!1).getAll();return new ds(r).toPromise()});if(!t)return[];if(this.pendingWrites!==0)return[];const e=[],s=new Set;if(t.length!==0)for(const{fbase_key:n,value:r}of t)s.add(n),JSON.stringify(this.localCache[n])!==JSON.stringify(r)&&(this.notifyListeners(n,r),e.push(n));for(const n of Object.keys(this.localCache))this.localCache[n]&&!s.has(n)&&(this.notifyListeners(n,null),e.push(n));return e}notifyListeners(t,e){this.localCache[t]=e;const s=this.listeners[t];if(s)for(const n of Array.from(s))n(e)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Fm)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(t,e){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[t]||(this.listeners[t]=new Set,this._get(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&this.stopPolling()}}pl.type="LOCAL";const Um=pl;new rs(3e4,6e4);/**
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
*/function Hm(i,t){return t?ye(t):(S(i._popupRedirectResolver,i,"argument-error"),i._popupRedirectResolver)}/**
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
*/class _o extends fo{constructor(t){super("custom","custom"),this.params=t}_getIdTokenResponse(t){return Ti(t,this._buildIdpRequest())}_linkToIdToken(t,e){return Ti(t,this._buildIdpRequest(e))}_getReauthenticationResolver(t){return Ti(t,this._buildIdpRequest())}_buildIdpRequest(t){const e={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return t&&(e.idToken=t),e}}function Wm(i){return sl(i.auth,new _o(i),i.bypassAuthState)}function $m(i){const{auth:t,user:e}=i;return S(e,t,"internal-error"),_m(e,new _o(i),i.bypassAuthState)}async function zm(i){const{auth:t,user:e}=i;return S(e,t,"internal-error"),mm(e,new _o(i),i.bypassAuthState)}/**
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
*/class gl{constructor(t,e,s,n,r=!1){this.auth=t,this.resolver=s,this.user=n,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(e)?e:[e]}execute(){return new Promise(async(t,e)=>{this.pendingPromise={resolve:t,reject:e};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(t){const{urlResponse:e,sessionId:s,postBody:n,tenantId:r,error:o,type:a}=t;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:e,sessionId:s,tenantId:r||void 0,postBody:n||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(t){this.reject(t)}getIdpTask(t){switch(t){case"signInViaPopup":case"signInViaRedirect":return Wm;case"linkViaPopup":case"linkViaRedirect":return zm;case"reauthViaPopup":case"reauthViaRedirect":return $m;default:Vt(this.auth,"internal-error")}}resolve(t){_e(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(t),this.unregisterAndCleanUp()}reject(t){_e(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(t),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
*/const jm=new rs(2e3,1e4);class Pi extends gl{constructor(t,e,s,n,r){super(t,e,n,r),this.provider=s,this.authWindow=null,this.pollId=null,Pi.currentPopupAction&&Pi.currentPopupAction.cancel(),Pi.currentPopupAction=this}async executeNotNull(){const t=await this.execute();return S(t,this.auth,"internal-error"),t}async onExecution(){_e(this.filter.length===1,"Popup operations only handle one event");const t=go();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],t),this.authWindow.associatedEvent=t,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(ie(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(ie(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Pi.currentPopupAction=null}pollUserCancellation(){const t=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ie(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(t,jm.get())};t()}}Pi.currentPopupAction=null;/**
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
*/const qm="pendingRedirect",kn=new Map;class Vm extends gl{constructor(t,e,s=!1){super(t,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],e,void 0,s),this.eventId=null}async execute(){let t=kn.get(this.auth._key());if(!t){try{const e=await Ym(this.resolver,this.auth)?await super.execute():null;t=()=>Promise.resolve(e)}catch(e){t=()=>Promise.reject(e)}kn.set(this.auth._key(),t)}return this.bypassAuthState||kn.set(this.auth._key(),()=>Promise.resolve(null)),t()}async onAuthEvent(t){if(t.type==="signInViaRedirect")return super.onAuthEvent(t);if(t.type==="unknown"){this.resolve(null);return}if(t.eventId){const e=await this.auth._redirectUserForId(t.eventId);if(e)return this.user=e,super.onAuthEvent(t);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Ym(i,t){const e=Jm(t),s=Gm(i);if(!await s._isAvailable())return!1;const n=await s._get(e)==="true";return await s._remove(e),n}function Km(i,t){kn.set(i._key(),t)}function Gm(i){return ye(i._redirectPersistence)}function Jm(i){return yn(qm,i.config.apiKey,i.name)}async function Qm(i,t,e=!1){if(jt(i.app))return Promise.reject(ge(i));const s=ei(i),n=Hm(s,t),r=await new Vm(s,n,e).execute();return r&&!e&&(delete r.user._redirectEventId,await s._persistUserIfCurrent(r.user),await s._setRedirectUser(null,t)),r}/**
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
*/const Xm=600*1e3;class Zm{constructor(t){this.auth=t,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(t){this.consumers.add(t),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,t)&&(this.sendToConsumer(this.queuedRedirectEvent,t),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(t){this.consumers.delete(t)}onEvent(t){if(this.hasEventBeenHandled(t))return!1;let e=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(t,s)&&(e=!0,this.sendToConsumer(t,s),this.saveEventToCache(t))}),this.hasHandledPotentialRedirect||!t_(t)||(this.hasHandledPotentialRedirect=!0,e||(this.queuedRedirectEvent=t,e=!0)),e}sendToConsumer(t,e){if(t.error&&!_l(t)){const s=t.error.code?.split("auth/")[1]||"internal-error";e.onError(ie(this.auth,s))}else e.onAuthEvent(t)}isEventForConsumer(t,e){const s=e.eventId===null||!!t.eventId&&t.eventId===e.eventId;return e.filter.includes(t.type)&&s}hasEventBeenHandled(t){return Date.now()-this.lastProcessedEventTime>=Xm&&this.cachedEventUids.clear(),this.cachedEventUids.has(ml(t))}saveEventToCache(t){this.cachedEventUids.add(ml(t)),this.lastProcessedEventTime=Date.now()}}function ml(i){return[i.type,i.eventId,i.sessionId,i.tenantId].filter(t=>t).join("-")}function _l({type:i,error:t}){return i==="unknown"&&t?.code==="auth/no-auth-event"}function t_(i){switch(i.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return _l(i);default:return!1}}/**
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
*/async function e_(i,t={}){return Ne(i,"GET","/v1/projects",t)}/**
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
*/const i_=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,s_=/^https?/;async function n_(i){if(i.config.emulator)return;const{authorizedDomains:t}=await e_(i);for(const e of t)try{if(r_(e))return}catch{}Vt(i,"unauthorized-domain")}function r_(i){const t=ro(),{protocol:e,hostname:s}=new URL(t);if(i.startsWith("chrome-extension://")){const r=new URL(i);return r.hostname===""&&s===""?e==="chrome-extension:"&&i.replace("chrome-extension://","")===t.replace("chrome-extension://",""):e==="chrome-extension:"&&r.hostname===s}if(!s_.test(e))return!1;if(i_.test(i))return s===i;const n=i.replace(/\./g,"\\.");return new RegExp("^(.+\\."+n+"|"+n+")$","i").test(s)}/**
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
*/const o_=new rs(3e4,6e4);function yl(){const i=se().___jsl;if(i?.H){for(const t of Object.keys(i.H))if(i.H[t].r=i.H[t].r||[],i.H[t].L=i.H[t].L||[],i.H[t].r=[...i.H[t].L],i.CP)for(let e=0;e<i.CP.length;e++)i.CP[e]=null}}function a_(i){return new Promise((t,e)=>{function s(){yl(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{yl(),e(ie(i,"network-request-failed"))},timeout:o_.get()})}if(se().gapi?.iframes?.Iframe)t(gapi.iframes.getContext());else if(se().gapi?.load)s();else{const n=Xg("iframefcb");return se()[n]=()=>{gapi.load?s():e(ie(i,"network-request-failed"))},Gc(`${Qg()}?onload=${n}`).catch(r=>e(r))}}).catch(t=>{throw En=null,t})}let En=null;function c_(i){return En=En||a_(i),En}/**
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
*/const l_=new rs(5e3,15e3),h_="__/auth/iframe",d_="emulator/auth/iframe",u_={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},f_=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function p_(i){const t=i.config;S(t.authDomain,i,"auth-domain-config-required");const e=t.emulator?oo(t,d_):`https://${i.config.authDomain}/${h_}`,s={apiKey:t.apiKey,appName:i.name,v:Ci},n=f_.get(i.config.apiHost);n&&(s.eid=n);const r=i._getFrameworks();return r.length&&(s.fw=r.join(",")),`${e}?${xi(s).slice(1)}`}async function g_(i){const t=await c_(i),e=se().gapi;return S(e,i,"internal-error"),t.open({where:document.body,url:p_(i),messageHandlersFilter:e.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:u_,dontclear:!0},s=>new Promise(async(n,r)=>{await s.restyle({setHideOnLeave:!1});const o=ie(i,"network-request-failed"),a=se().setTimeout(()=>{r(o)},l_.get());function c(){se().clearTimeout(a),n(s)}s.ping(c).then(c,()=>{r(o)})}))}/**
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
*/const m_={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},__=500,y_=600,v_="_blank",b_="http://localhost";class vl{constructor(t){this.window=t,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function w_(i,t,e,s=__,n=y_){const r=Math.max((window.screen.availHeight-n)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let a="";const c={...m_,width:s.toString(),height:n.toString(),top:r,left:o},l=Mt().toLowerCase();e&&(a=Wc(l)?v_:e),Uc(l)&&(t=t||b_,c.scrollbars="yes");const h=Object.entries(c).reduce((u,[f,p])=>`${u}${f}=${p},`,"");if($g(l)&&a!=="_self")return x_(t||"",a),new vl(null);const d=window.open(t||"",a,h);S(d,i,"popup-blocked");try{d.focus()}catch{}return new vl(d)}function x_(i,t){const e=document.createElement("a");e.href=i,e.target=t;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),e.dispatchEvent(s)}/**
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
*/const I_="__/auth/handler",C_="emulator/auth/handler",k_=encodeURIComponent("fac");async function bl(i,t,e,s,n,r){S(i.config.authDomain,i,"auth-domain-config-required"),S(i.config.apiKey,i,"invalid-api-key");const o={apiKey:i.config.apiKey,appName:i.name,authType:e,redirectUrl:s,v:Ci,eventId:n};if(t instanceof tl){t.setDefaultLanguage(i.languageCode),o.providerId=t.providerId||"",zr(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(const[h,d]of Object.entries({}))o[h]=d}if(t instanceof hs){const h=t.getScopes().filter(d=>d!=="");h.length>0&&(o.scopes=h.join(","))}i.tenantId&&(o.tid=i.tenantId);const a=o;for(const h of Object.keys(a))a[h]===void 0&&delete a[h];const c=await i._getAppCheckToken(),l=c?`#${k_}=${encodeURIComponent(c)}`:"";return`${E_(i)}?${xi(a).slice(1)}${l}`}function E_({config:i}){return i.emulator?oo(i,C_):`https://${i.authDomain}/${I_}`}/**
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
*/const yo="webStorageSupport";class T_{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=cl,this._completeRedirectFn=Qm,this._overrideRedirectResult=Km}async _openPopup(t,e,s,n){_e(this.eventManagers[t._key()]?.manager,"_initialize() not called before _openPopup()");const r=await bl(t,e,s,ro(),n);return w_(t,r,go())}async _openRedirect(t,e,s,n){await this._originValidation(t);const r=await bl(t,e,s,ro(),n);return Mm(r),new Promise(()=>{})}_initialize(t){const e=t._key();if(this.eventManagers[e]){const{manager:n,promise:r}=this.eventManagers[e];return n?Promise.resolve(n):(_e(r,"If manager is not set, promise should be"),r)}const s=this.initAndGetManager(t);return this.eventManagers[e]={promise:s},s.catch(()=>{delete this.eventManagers[e]}),s}async initAndGetManager(t){const e=await g_(t),s=new Zm(t);return e.register("authEvent",n=>(S(n?.authEvent,t,"invalid-auth-event"),{status:s.onEvent(n.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[t._key()]={manager:s},this.iframes[t._key()]=e,s}_isIframeWebStorageSupported(t,e){this.iframes[t._key()].send(yo,{type:yo},s=>{const n=s?.[0]?.[yo];n!==void 0&&e(!!n),Vt(t,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(t){const e=t._key();return this.originValidationPromises[e]||(this.originValidationPromises[e]=n_(t)),this.originValidationPromises[e]}get _shouldInitProactively(){return Vc()||Hc()||ho()}}const S_=T_;var wl="@firebase/auth",xl="1.11.0";/**
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
*/class P_{constructor(t){this.auth=t,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(t){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(t)}:null}addAuthTokenListener(t){if(this.assertAuthConfigured(),this.internalListeners.has(t))return;const e=this.auth.onIdTokenChanged(s=>{t(s?.stsTokenManager.accessToken||null)});this.internalListeners.set(t,e),this.updateProactiveRefresh()}removeAuthTokenListener(t){this.assertAuthConfigured();const e=this.internalListeners.get(t);e&&(this.internalListeners.delete(t),e(),this.updateProactiveRefresh())}assertAuthConfigured(){S(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
*/function M_(i){switch(i){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function A_(i){Ii(new Ze("auth",(t,{options:e})=>{const s=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat"),r=t.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=s.options;S(o&&!o.includes(":"),"invalid-api-key",{appName:s.name});const c={apiKey:o,authDomain:a,clientPlatform:i,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Yc(i)},l=new Kg(s,n,r,c);return nm(l,e),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,s)=>{t.getProvider("auth-internal").initialize()})),Ii(new Ze("auth-internal",t=>{const e=ei(t.getProvider("auth").getImmediate());return(s=>new P_(s))(e)},"PRIVATE").setInstantiationMode("EXPLICIT")),Re(wl,xl,M_(i)),Re(wl,xl,"esm2020")}/**
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
*/const R_=300,D_=sc("authIdTokenMaxAge")||R_;let Il=null;const N_=i=>async t=>{const e=t&&await t.getIdTokenResult(),s=e&&(new Date().getTime()-Date.parse(e.issuedAtTime))/1e3;if(s&&s>D_)return;const n=e?.token;Il!==n&&(Il=n,await fetch(i,{method:n?"POST":"DELETE",headers:n?{Authorization:`Bearer ${n}`}:{}}))};function O_(i=yc()){const t=io(i,"auth");if(t.isInitialized())return t.getImmediate();const e=sm(i,{popupRedirectResolver:S_,persistence:[Um,Tm,cl]}),s=sc("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(s,location.origin);if(location.origin===r.origin){const o=N_(r.toString());xm(e,o,()=>o(e.currentUser)),wm(e,a=>o(a))}}const n=ec("auth");return n&&rm(e,`http://${n}`),e}function L_(){return document.getElementsByTagName("head")?.[0]??document}Gg({loadJS(i){return new Promise((t,e)=>{const s=document.createElement("script");s.setAttribute("src",i),s.onload=t,s.onerror=n=>{const r=ie("internal-error");r.customData=n,e(r)},s.type="text/javascript",s.charset="UTF-8",L_().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="}),A_("Browser");var Cl={};const kl="@firebase/database",El="1.1.0";/**
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
*/let Tl="";function F_(i){Tl=i}/**
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
*/class B_{constructor(t){this.domStorage_=t,this.prefix_="firebase:"}set(t,e){e==null?this.domStorage_.removeItem(this.prefixedName_(t)):this.domStorage_.setItem(this.prefixedName_(t),gt(e))}get(t){const e=this.domStorage_.getItem(this.prefixedName_(t));return e==null?null:ts(e)}remove(t){this.domStorage_.removeItem(this.prefixedName_(t))}prefixedName_(t){return this.prefix_+t}toString(){return this.domStorage_.toString()}}/**
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
*/class U_{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(t,e){e==null?delete this.cache_[t]:this.cache_[t]=e}get(t){return fe(this.cache_,t)?this.cache_[t]:null}remove(t){delete this.cache_[t]}}/**
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
*/const Sl=function(i){try{if(typeof window<"u"&&typeof window[i]<"u"){const t=window[i];return t.setItem("firebase:sentinel","cache"),t.removeItem("firebase:sentinel"),new B_(t)}}catch{}return new U_},ni=Sl("localStorage"),H_=Sl("sessionStorage");/**
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
*/const Mi=new Vr("@firebase/database"),W_=function(){let i=1;return function(){return i++}}(),Pl=function(i){const t=dp(i),e=new ap;e.update(t);const s=e.digest();return Hr.encodeByteArray(s)},us=function(...i){let t="";for(let e=0;e<i.length;e++){const s=i[e];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?t+=us.apply(null,s):typeof s=="object"?t+=gt(s):t+=s,t+=" "}return t};let fs=null,Ml=!0;const $_=function(i,t){b(!0,"Can't turn on custom loggers persistently."),Mi.logLevel=Z.VERBOSE,fs=Mi.log.bind(Mi)},St=function(...i){if(Ml===!0&&(Ml=!1,fs===null&&H_.get("logging_enabled")===!0&&$_()),fs){const t=us.apply(null,i);fs(t)}},ps=function(i){return function(...t){St(i,...t)}},vo=function(...i){const t="FIREBASE INTERNAL ERROR: "+us(...i);Mi.error(t)},ve=function(...i){const t=`FIREBASE FATAL ERROR: ${us(...i)}`;throw Mi.error(t),new Error(t)},Lt=function(...i){const t="FIREBASE WARNING: "+us(...i);Mi.warn(t)},z_=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Lt("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Al=function(i){return typeof i=="number"&&(i!==i||i===Number.POSITIVE_INFINITY||i===Number.NEGATIVE_INFINITY)},j_=function(i){if(document.readyState==="complete")i();else{let t=!1;const e=function(){if(!document.body){setTimeout(e,Math.floor(10));return}t||(t=!0,i())};document.addEventListener?(document.addEventListener("DOMContentLoaded",e,!1),window.addEventListener("load",e,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&e()}),window.attachEvent("onload",e))}},Ai="[MIN_NAME]",ri="[MAX_NAME]",Ri=function(i,t){if(i===t)return 0;if(i===Ai||t===ri)return-1;if(t===Ai||i===ri)return 1;{const e=Nl(i),s=Nl(t);return e!==null?s!==null?e-s===0?i.length-t.length:e-s:-1:s!==null?1:i<t?-1:1}},q_=function(i,t){return i===t?0:i<t?-1:1},gs=function(i,t){if(t&&i in t)return t[i];throw new Error("Missing required key ("+i+") in object: "+gt(t))},bo=function(i){if(typeof i!="object"||i===null)return gt(i);const t=[];for(const s in i)t.push(s);t.sort();let e="{";for(let s=0;s<t.length;s++)s!==0&&(e+=","),e+=gt(t[s]),e+=":",e+=bo(i[t[s]]);return e+="}",e},Rl=function(i,t){const e=i.length;if(e<=t)return[i];const s=[];for(let n=0;n<e;n+=t)n+t>e?s.push(i.substring(n,e)):s.push(i.substring(n,n+t));return s};function Ft(i,t){for(const e in i)i.hasOwnProperty(e)&&t(e,i[e])}const Dl=function(i){b(!Al(i),"Invalid JSON number");const t=11,e=52,s=(1<<t-1)-1;let n,r,o,a,c;i===0?(r=0,o=0,n=1/i===-1/0?1:0):(n=i<0,i=Math.abs(i),i>=Math.pow(2,1-s)?(a=Math.min(Math.floor(Math.log(i)/Math.LN2),s),r=a+s,o=Math.round(i*Math.pow(2,e-a)-Math.pow(2,e))):(r=0,o=Math.round(i/Math.pow(2,1-s-e))));const l=[];for(c=e;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=t;c;c-=1)l.push(r%2?1:0),r=Math.floor(r/2);l.push(n?1:0),l.reverse();const h=l.join("");let d="";for(c=0;c<64;c+=8){let u=parseInt(h.substr(c,8),2).toString(16);u.length===1&&(u="0"+u),d=d+u}return d.toLowerCase()},V_=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Y_=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function K_(i,t){let e="Unknown Error";i==="too_big"?e="The data requested exceeds the maximum size that can be accessed with a single request.":i==="permission_denied"?e="Client doesn't have permission to access the desired data.":i==="unavailable"&&(e="The service is unavailable");const s=new Error(i+" at "+t._path.toString()+": "+e);return s.code=i.toUpperCase(),s}const G_=new RegExp("^-?(0*)\\d{1,10}$"),J_=-2147483648,Q_=2147483647,Nl=function(i){if(G_.test(i)){const t=Number(i);if(t>=J_&&t<=Q_)return t}return null},Di=function(i){try{i()}catch(t){setTimeout(()=>{const e=t.stack||"";throw Lt("Exception was thrown by user callback.",e),t},Math.floor(0))}},X_=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},ms=function(i,t){const e=setTimeout(i,t);return typeof e=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(e):typeof e=="object"&&e.unref&&e.unref(),e};/**
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
*/class Z_{constructor(t,e){this.appCheckProvider=e,this.appName=t.name,jt(t)&&t.settings.appCheckToken&&(this.serverAppAppCheckToken=t.settings.appCheckToken),this.appCheck=e?.getImmediate({optional:!0}),this.appCheck||e?.get().then(s=>this.appCheck=s)}getToken(t){if(this.serverAppAppCheckToken){if(t)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(t):new Promise((e,s)=>{setTimeout(()=>{this.appCheck?this.getToken(t).then(e,s):e(null)},0)})}addTokenChangeListener(t){this.appCheckProvider?.get().then(e=>e.addTokenListener(t))}notifyForInvalidToken(){Lt(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
*/class ty{constructor(t,e,s){this.appName_=t,this.firebaseOptions_=e,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(n=>this.auth_=n)}getToken(t){return this.auth_?this.auth_.getToken(t).catch(e=>e&&e.code==="auth/token-not-initialized"?(St("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(e)):new Promise((e,s)=>{setTimeout(()=>{this.auth_?this.getToken(t).then(e,s):e(null)},0)})}addTokenChangeListener(t){this.auth_?this.auth_.addAuthTokenListener(t):this.authProvider_.get().then(e=>e.addAuthTokenListener(t))}removeTokenChangeListener(t){this.authProvider_.get().then(e=>e.removeAuthTokenListener(t))}notifyForInvalidToken(){let t='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?t+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?t+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':t+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Lt(t)}}class Tn{constructor(t){this.accessToken=t}getToken(t){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(t){t(this.accessToken)}removeTokenChangeListener(t){}notifyForInvalidToken(){}}Tn.OWNER="owner";/**
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
*/const wo="5",Ol="v",Ll="s",Fl="r",Bl="f",Ul=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Hl="ls",Wl="p",xo="ac",$l="websocket",zl="long_polling";/**
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
*/class jl{constructor(t,e,s,n,r=!1,o="",a=!1,c=!1,l=null){this.secure=e,this.namespace=s,this.webSocketOnly=n,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=l,this._host=t.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=ni.get("host:"+t)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(t){t!==this.internalHost&&(this.internalHost=t,this.isCacheableHost()&&ni.set("host:"+this._host,this.internalHost))}toString(){let t=this.toURLString();return this.persistenceKey&&(t+="<"+this.persistenceKey+">"),t}toURLString(){const t=this.secure?"https://":"http://",e=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${t}${this.host}/${e}`}}function ey(i){return i.host!==i.internalHost||i.isCustomHost()||i.includeNamespaceInQueryParams}function ql(i,t,e){b(typeof t=="string","typeof type must == string"),b(typeof e=="object","typeof params must == object");let s;if(t===$l)s=(i.secure?"wss://":"ws://")+i.internalHost+"/.ws?";else if(t===zl)s=(i.secure?"https://":"http://")+i.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+t);ey(i)&&(e.ns=i.namespace);const n=[];return Ft(e,(r,o)=>{n.push(r+"="+o)}),s+n.join("&")}/**
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
*/class iy{constructor(){this.counters_={}}incrementCounter(t,e=1){fe(this.counters_,t)||(this.counters_[t]=0),this.counters_[t]+=e}get(){return Hf(this.counters_)}}/**
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
*/const Io={},Co={};function ko(i){const t=i.toString();return Io[t]||(Io[t]=new iy),Io[t]}function sy(i,t){const e=i.toString();return Co[e]||(Co[e]=t()),Co[e]}/**
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
*/class ny{constructor(t){this.onMessage_=t,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(t,e){this.closeAfterResponse=t,this.onClose=e,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(t,e){for(this.pendingResponses[t]=e;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let n=0;n<s.length;++n)s[n]&&Di(()=>{this.onMessage_(s[n])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
*/const Vl="start",ry="close",oy="pLPCommand",ay="pRTLPCB",Yl="id",Kl="pw",Gl="ser",cy="cb",ly="seg",hy="ts",dy="d",uy="dframe",Jl=1870,Ql=30,fy=Jl-Ql,py=25e3,gy=3e4;class Ni{constructor(t,e,s,n,r,o,a){this.connId=t,this.repoInfo=e,this.applicationId=s,this.appCheckToken=n,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=ps(t),this.stats_=ko(e),this.urlFn=c=>(this.appCheckToken&&(c[xo]=this.appCheckToken),ql(e,zl,c))}open(t,e){this.curSegmentNum=0,this.onDisconnect_=e,this.myPacketOrderer=new ny(t),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(gy)),j_(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Eo((...r)=>{const[o,a,c,l,h]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Vl)this.id=a,this.password=c;else if(o===ry)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const s={};s[Vl]="t",s[Gl]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[cy]=this.scriptTagHolder.uniqueCallbackIdentifier),s[Ol]=wo,this.transportSessionId&&(s[Ll]=this.transportSessionId),this.lastSessionId&&(s[Hl]=this.lastSessionId),this.applicationId&&(s[Wl]=this.applicationId),this.appCheckToken&&(s[xo]=this.appCheckToken),typeof location<"u"&&location.hostname&&Ul.test(location.hostname)&&(s[Fl]=Bl);const n=this.urlFn(s);this.log_("Connecting via long-poll to "+n),this.scriptTagHolder.addTag(n,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Ni.forceAllow_=!0}static forceDisallow(){Ni.forceDisallow_=!0}static isAvailable(){return Ni.forceAllow_?!0:!Ni.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!V_()&&!Y_()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(t){const e=gt(t);this.bytesSent+=e.length,this.stats_.incrementCounter("bytes_sent",e.length);const s=Za(e),n=Rl(s,fy);for(let r=0;r<n.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,n.length,n[r]),this.curSegmentNum++}addDisconnectPingFrame(t,e){this.myDisconnFrame=document.createElement("iframe");const s={};s[uy]="t",s[Yl]=t,s[Kl]=e,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(t){const e=gt(t).length;this.bytesReceived+=e,this.stats_.incrementCounter("bytes_received",e)}}class Eo{constructor(t,e,s,n){this.onDisconnect=s,this.urlFn=n,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=W_(),window[oy+this.uniqueCallbackIdentifier]=t,window[ay+this.uniqueCallbackIdentifier]=e,this.myIFrame=Eo.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){St("frame writing exception"),a.stack&&St(a.stack),St(a)}}}static createIFrame_(){const t=document.createElement("iframe");if(t.style.display="none",document.body){document.body.appendChild(t);try{t.contentWindow.document||St("No IE domain setting required")}catch{const e=document.domain;t.src="javascript:void((function(){document.open();document.domain='"+e+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return t.contentDocument?t.doc=t.contentDocument:t.contentWindow?t.doc=t.contentWindow.document:t.document&&(t.doc=t.document),t}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const t=this.onDisconnect;t&&(this.onDisconnect=null,t())}startLongPoll(t,e){for(this.myID=t,this.myPW=e,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const t={};t[Yl]=this.myID,t[Kl]=this.myPW,t[Gl]=this.currentSerial;let e=this.urlFn(t),s="",n=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Ql+s.length<=Jl;){const r=this.pendingSegs.shift();s=s+"&"+ly+n+"="+r.seg+"&"+hy+n+"="+r.ts+"&"+dy+n+"="+r.d,n++}return e=e+s,this.addLongPollTag_(e,this.currentSerial),!0}else return!1}enqueueSegment(t,e,s){this.pendingSegs.push({seg:t,ts:e,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(t,e){this.outstandingRequests.add(e);const s=()=>{this.outstandingRequests.delete(e),this.newRequest_()},n=setTimeout(s,Math.floor(py)),r=()=>{clearTimeout(n),s()};this.addTag(t,r)}addTag(t,e){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=t,s.onload=s.onreadystatechange=function(){const n=s.readyState;(!n||n==="loaded"||n==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),e())},s.onerror=()=>{St("Long-poll script failed to load: "+t),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
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
*/const my=16384,_y=45e3;let Sn=null;typeof MozWebSocket<"u"?Sn=MozWebSocket:typeof WebSocket<"u"&&(Sn=WebSocket);class Kt{constructor(t,e,s,n,r,o,a){this.connId=t,this.applicationId=s,this.appCheckToken=n,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=ps(this.connId),this.stats_=ko(e),this.connURL=Kt.connectionURL_(e,o,a,n,s),this.nodeAdmin=e.nodeAdmin}static connectionURL_(t,e,s,n,r){const o={};return o[Ol]=wo,typeof location<"u"&&location.hostname&&Ul.test(location.hostname)&&(o[Fl]=Bl),e&&(o[Ll]=e),s&&(o[Hl]=s),n&&(o[xo]=n),r&&(o[Wl]=r),ql(t,$l,o)}open(t,e){this.onDisconnect=e,this.onMessage=t,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,ni.set("previous_websocket_failure",!0);try{let s;Zf(),this.mySock=new Sn(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const n=s.message||s.data;n&&this.log_(n),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const n=s.message||s.data;n&&this.log_(n),this.onClosed_()}}start(){}static forceDisallow(){Kt.forceDisallow_=!0}static isAvailable(){let t=!1;if(typeof navigator<"u"&&navigator.userAgent){const e=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(e);s&&s.length>1&&parseFloat(s[1])<4.4&&(t=!0)}return!t&&Sn!==null&&!Kt.forceDisallow_}static previouslyFailed(){return ni.isInMemoryStorage||ni.get("previous_websocket_failure")===!0}markConnectionHealthy(){ni.remove("previous_websocket_failure")}appendFrame_(t){if(this.frames.push(t),this.frames.length===this.totalFrames){const e=this.frames.join("");this.frames=null;const s=ts(e);this.onMessage(s)}}handleNewFrameCount_(t){this.totalFrames=t,this.frames=[]}extractFrameCount_(t){if(b(this.frames===null,"We already have a frame buffer"),t.length<=6){const e=Number(t);if(!isNaN(e))return this.handleNewFrameCount_(e),null}return this.handleNewFrameCount_(1),t}handleIncomingFrame(t){if(this.mySock===null)return;const e=t.data;if(this.bytesReceived+=e.length,this.stats_.incrementCounter("bytes_received",e.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(e);else{const s=this.extractFrameCount_(e);s!==null&&this.appendFrame_(s)}}send(t){this.resetKeepAlive();const e=gt(t);this.bytesSent+=e.length,this.stats_.incrementCounter("bytes_sent",e.length);const s=Rl(e,my);s.length>1&&this.sendString_(String(s.length));for(let n=0;n<s.length;n++)this.sendString_(s[n])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(_y))}sendString_(t){try{this.mySock.send(t)}catch(e){this.log_("Exception thrown from WebSocket.send():",e.message||e.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Kt.responsesRequiredToBeHealthy=2,Kt.healthyTimeout=3e4;/**
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
*/class _s{static get ALL_TRANSPORTS(){return[Ni,Kt]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(t){this.initTransports_(t)}initTransports_(t){const e=Kt&&Kt.isAvailable();let s=e&&!Kt.previouslyFailed();if(t.webSocketOnly&&(e||Lt("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[Kt];else{const n=this.transports_=[];for(const r of _s.ALL_TRANSPORTS)r&&r.isAvailable()&&n.push(r);_s.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}_s.globalTransportInitialized_=!1;/**
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
*/const yy=6e4,vy=5e3,by=10*1024,wy=100*1024,To="t",Xl="d",xy="s",Zl="r",Iy="e",th="o",eh="a",ih="n",sh="p",Cy="h";class ky{constructor(t,e,s,n,r,o,a,c,l,h){this.id=t,this.repoInfo_=e,this.applicationId_=s,this.appCheckToken_=n,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=h,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=ps("c:"+this.id+":"),this.transportManager_=new _s(e),this.log_("Connection created"),this.start_()}start_(){const t=this.transportManager_.initialTransport();this.conn_=new t(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=t.responsesRequiredToBeHealthy||0;const e=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(e,s)},Math.floor(0));const n=t.healthyTimeout||0;n>0&&(this.healthyTimeout_=ms(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>wy?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>by?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(n)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(t){return e=>{t===this.conn_?this.onConnectionLost_(e):t===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(t){return e=>{this.state_!==2&&(t===this.rx_?this.onPrimaryMessageReceived_(e):t===this.secondaryConn_?this.onSecondaryMessageReceived_(e):this.log_("message on old connection"))}}sendRequest(t){const e={t:"d",d:t};this.sendData_(e)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(t){if(To in t){const e=t[To];e===eh?this.upgradeIfSecondaryHealthy_():e===Zl?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):e===th&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(t){const e=gs("t",t),s=gs("d",t);if(e==="c")this.onSecondaryControl_(s);else if(e==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+e)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:sh,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:eh,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:ih,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(t){const e=gs("t",t),s=gs("d",t);e==="c"?this.onControl_(s):e==="d"&&this.onDataMessage_(s)}onDataMessage_(t){this.onPrimaryResponse_(),this.onMessage_(t)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(t){const e=gs(To,t);if(Xl in t){const s=t[Xl];if(e===Cy){const n={...s};this.repoInfo_.isUsingEmulator&&(n.h=this.repoInfo_.host),this.onHandshake_(n)}else if(e===ih){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let n=0;n<this.pendingDataMessages.length;++n)this.onDataMessage_(this.pendingDataMessages[n]);this.pendingDataMessages=[],this.tryCleanupConnection()}else e===xy?this.onConnectionShutdown_(s):e===Zl?this.onReset_(s):e===Iy?vo("Server Error: "+s):e===th?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):vo("Unknown control packet command: "+e)}}onHandshake_(t){const e=t.ts,s=t.v,n=t.h;this.sessionId=t.s,this.repoInfo_.host=n,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,e),wo!==s&&Lt("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const t=this.transportManager_.upgradeTransport();t&&this.startUpgrade_(t)}startUpgrade_(t){this.secondaryConn_=new t(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=t.responsesRequiredToBeHealthy||0;const e=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(e,s),ms(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(yy))}onReset_(t){this.log_("Reset packet received.  New host: "+t),this.repoInfo_.host=t,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(t,e){this.log_("Realtime connection established."),this.conn_=t,this.state_=1,this.onReady_&&(this.onReady_(e,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):ms(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(vy))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:sh,d:{}}}))}onSecondaryConnectionLost_(){const t=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===t||this.rx_===t)&&this.close()}onConnectionLost_(t){this.conn_=null,!t&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(ni.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(t){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(t),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(t){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(t)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
*/class nh{put(t,e,s,n){}merge(t,e,s,n){}refreshAuthToken(t){}refreshAppCheckToken(t){}onDisconnectPut(t,e,s){}onDisconnectMerge(t,e,s){}onDisconnectCancel(t,e){}reportStats(t){}}/**
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
*/class rh{constructor(t){this.allowedEvents_=t,this.listeners_={},b(Array.isArray(t)&&t.length>0,"Requires a non-empty array")}trigger(t,...e){if(Array.isArray(this.listeners_[t])){const s=[...this.listeners_[t]];for(let n=0;n<s.length;n++)s[n].callback.apply(s[n].context,e)}}on(t,e,s){this.validateEventType_(t),this.listeners_[t]=this.listeners_[t]||[],this.listeners_[t].push({callback:e,context:s});const n=this.getInitialEvent(t);n&&e.apply(s,n)}off(t,e,s){this.validateEventType_(t);const n=this.listeners_[t]||[];for(let r=0;r<n.length;r++)if(n[r].callback===e&&(!s||s===n[r].context)){n.splice(r,1);return}}validateEventType_(t){b(this.allowedEvents_.find(e=>e===t),"Unknown event: "+t)}}/**
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
*/class Pn extends rh{static getInstance(){return new Pn}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!$r()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(t){return b(t==="online","Unknown event type: "+t),[this.online_]}currentlyOnline(){return this.online_}}/**
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
*/const oh=32,ah=768;class et{constructor(t,e){if(e===void 0){this.pieces_=t.split("/");let s=0;for(let n=0;n<this.pieces_.length;n++)this.pieces_[n].length>0&&(this.pieces_[s]=this.pieces_[n],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=t,this.pieceNum_=e}toString(){let t="";for(let e=this.pieceNum_;e<this.pieces_.length;e++)this.pieces_[e]!==""&&(t+="/"+this.pieces_[e]);return t||"/"}}function Y(){return new et("")}function B(i){return i.pieceNum_>=i.pieces_.length?null:i.pieces_[i.pieceNum_]}function He(i){return i.pieces_.length-i.pieceNum_}function rt(i){let t=i.pieceNum_;return t<i.pieces_.length&&t++,new et(i.pieces_,t)}function ch(i){return i.pieceNum_<i.pieces_.length?i.pieces_[i.pieces_.length-1]:null}function Ey(i){let t="";for(let e=i.pieceNum_;e<i.pieces_.length;e++)i.pieces_[e]!==""&&(t+="/"+encodeURIComponent(String(i.pieces_[e])));return t||"/"}function lh(i,t=0){return i.pieces_.slice(i.pieceNum_+t)}function hh(i){if(i.pieceNum_>=i.pieces_.length)return null;const t=[];for(let e=i.pieceNum_;e<i.pieces_.length-1;e++)t.push(i.pieces_[e]);return new et(t,0)}function mt(i,t){const e=[];for(let s=i.pieceNum_;s<i.pieces_.length;s++)e.push(i.pieces_[s]);if(t instanceof et)for(let s=t.pieceNum_;s<t.pieces_.length;s++)e.push(t.pieces_[s]);else{const s=t.split("/");for(let n=0;n<s.length;n++)s[n].length>0&&e.push(s[n])}return new et(e,0)}function W(i){return i.pieceNum_>=i.pieces_.length}function At(i,t){const e=B(i),s=B(t);if(e===null)return t;if(e===s)return At(rt(i),rt(t));throw new Error("INTERNAL ERROR: innerPath ("+t+") is not within outerPath ("+i+")")}function So(i,t){if(He(i)!==He(t))return!1;for(let e=i.pieceNum_,s=t.pieceNum_;e<=i.pieces_.length;e++,s++)if(i.pieces_[e]!==t.pieces_[s])return!1;return!0}function Gt(i,t){let e=i.pieceNum_,s=t.pieceNum_;if(He(i)>He(t))return!1;for(;e<i.pieces_.length;){if(i.pieces_[e]!==t.pieces_[s])return!1;++e,++s}return!0}class Ty{constructor(t,e){this.errorPrefix_=e,this.parts_=lh(t,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=un(this.parts_[s]);dh(this)}}function Sy(i,t){i.parts_.length>0&&(i.byteLength_+=1),i.parts_.push(t),i.byteLength_+=un(t),dh(i)}function Py(i){const t=i.parts_.pop();i.byteLength_-=un(t),i.parts_.length>0&&(i.byteLength_-=1)}function dh(i){if(i.byteLength_>ah)throw new Error(i.errorPrefix_+"has a key path longer than "+ah+" bytes ("+i.byteLength_+").");if(i.parts_.length>oh)throw new Error(i.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+oh+") or object contains a cycle "+oi(i))}function oi(i){return i.parts_.length===0?"":"in property '"+i.parts_.join(".")+"'"}/**
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
*/class Po extends rh{static getInstance(){return new Po}constructor(){super(["visible"]);let t,e;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(e="visibilitychange",t="hidden"):typeof document.mozHidden<"u"?(e="mozvisibilitychange",t="mozHidden"):typeof document.msHidden<"u"?(e="msvisibilitychange",t="msHidden"):typeof document.webkitHidden<"u"&&(e="webkitvisibilitychange",t="webkitHidden")),this.visible_=!0,e&&document.addEventListener(e,()=>{const s=!document[t];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}getInitialEvent(t){return b(t==="visible","Unknown event type: "+t),[this.visible_]}}/**
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
*/const ys=1e3,My=300*1e3,uh=30*1e3,Ay=1.3,Ry=3e4,Dy="server_kill",fh=3;class be extends nh{constructor(t,e,s,n,r,o,a,c){if(super(),this.repoInfo_=t,this.applicationId_=e,this.onDataUpdate_=s,this.onConnectStatus_=n,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=be.nextPersistentConnectionId_++,this.log_=ps("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=ys,this.maxReconnectDelay_=My,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Po.getInstance().on("visible",this.onVisible_,this),t.host.indexOf("fblocal")===-1&&Pn.getInstance().on("online",this.onOnline_,this)}sendRequest(t,e,s){const n=++this.requestNumber_,r={r:n,a:t,b:e};this.log_(gt(r)),b(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),s&&(this.requestCBHash_[n]=s)}get(t){this.initConnection_();const e=new hn,s={action:"g",request:{p:t._path.toString(),q:t._queryObject},onComplete:r=>{const o=r.d;r.s==="ok"?e.resolve(o):e.reject(o)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const n=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(n),e.promise}listen(t,e,s,n){this.initConnection_();const r=t._queryIdentifier,o=t._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),b(t._queryParams.isDefault()||!t._queryParams.loadsAllData(),"listen() called for non-default but complete query"),b(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:n,hashFn:e,query:t,tag:s};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(t){const e=this.outstandingGets_[t];this.sendRequest("g",e.request,s=>{delete this.outstandingGets_[t],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),e.onComplete&&e.onComplete(s)})}sendListen_(t){const e=t.query,s=e._path.toString(),n=e._queryIdentifier;this.log_("Listen on "+s+" for "+n);const r={p:s},o="q";t.tag&&(r.q=e._queryObject,r.t=t.tag),r.h=t.hashFn(),this.sendRequest(o,r,a=>{const c=a.d,l=a.s;be.warnOnListenWarnings_(c,e),(this.listens.get(s)&&this.listens.get(s).get(n))===t&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(s,n),t.onComplete&&t.onComplete(l,c))})}static warnOnListenWarnings_(t,e){if(t&&typeof t=="object"&&fe(t,"w")){const s=wi(t,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const n='".indexOn": "'+e._queryParams.getIndex().toString()+'"',r=e._path.toString();Lt(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${n} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(t){this.authToken_=t,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(t)}reduceReconnectDelayIfAdminCredential_(t){(t&&t.length===40||op(t))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=uh)}refreshAppCheckToken(t){this.appCheckToken_=t,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const t=this.authToken_,e=rp(t)?"auth":"gauth",s={cred:t};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(e,s,n=>{const r=n.s,o=n.d||"error";this.authToken_===t&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},t=>{const e=t.s,s=t.d||"error";e==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(e,s)})}unlisten(t,e){const s=t._path.toString(),n=t._queryIdentifier;this.log_("Unlisten called for "+s+" "+n),b(t._queryParams.isDefault()||!t._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,n)&&this.connected_&&this.sendUnlisten_(s,n,t._queryObject,e)}sendUnlisten_(t,e,s,n){this.log_("Unlisten on "+t+" for "+e);const r={p:t},o="n";n&&(r.q=s,r.t=n),this.sendRequest(o,r)}onDisconnectPut(t,e,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",t,e,s):this.onDisconnectRequestQueue_.push({pathString:t,action:"o",data:e,onComplete:s})}onDisconnectMerge(t,e,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",t,e,s):this.onDisconnectRequestQueue_.push({pathString:t,action:"om",data:e,onComplete:s})}onDisconnectCancel(t,e){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",t,null,e):this.onDisconnectRequestQueue_.push({pathString:t,action:"oc",data:null,onComplete:e})}sendOnDisconnect_(t,e,s,n){const r={p:e,d:s};this.log_("onDisconnect "+t,r),this.sendRequest(t,r,o=>{n&&setTimeout(()=>{n(o.s,o.d)},Math.floor(0))})}put(t,e,s,n){this.putInternal("p",t,e,s,n)}merge(t,e,s,n){this.putInternal("m",t,e,s,n)}putInternal(t,e,s,n,r){this.initConnection_();const o={p:e,d:s};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:t,request:o,onComplete:n}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+e)}sendPut_(t){const e=this.outstandingPuts_[t].action,s=this.outstandingPuts_[t].request,n=this.outstandingPuts_[t].onComplete;this.outstandingPuts_[t].queued=this.connected_,this.sendRequest(e,s,r=>{this.log_(e+" response",r),delete this.outstandingPuts_[t],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),n&&n(r.s,r.d)})}reportStats(t){if(this.connected_){const e={c:t};this.log_("reportStats",e),this.sendRequest("s",e,s=>{if(s.s!=="ok"){const n=s.d;this.log_("reportStats","Error sending stats: "+n)}})}}onDataMessage_(t){if("r"in t){this.log_("from server: "+gt(t));const e=t.r,s=this.requestCBHash_[e];s&&(delete this.requestCBHash_[e],s(t.b))}else{if("error"in t)throw"A server-side error has occurred: "+t.error;"a"in t&&this.onDataPush_(t.a,t.b)}}onDataPush_(t,e){this.log_("handleServerMessage",t,e),t==="d"?this.onDataUpdate_(e.p,e.d,!1,e.t):t==="m"?this.onDataUpdate_(e.p,e.d,!0,e.t):t==="c"?this.onListenRevoked_(e.p,e.q):t==="ac"?this.onAuthRevoked_(e.s,e.d):t==="apc"?this.onAppCheckRevoked_(e.s,e.d):t==="sd"?this.onSecurityDebugPacket_(e):vo("Unrecognized action received from server: "+gt(t)+`
Are you using the latest client?`)}onReady_(t,e){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(t),this.lastSessionId=e,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(t){b(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(t))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(t){t&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=ys,this.realtime_||this.scheduleConnect_(0)),this.visible_=t}onOnline_(t){t?(this.log_("Browser went online."),this.reconnectDelay_=ys,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Ry&&(this.reconnectDelay_=ys),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const t=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let e=Math.max(0,this.reconnectDelay_-t);e=Math.random()*e,this.log_("Trying to reconnect in "+e+"ms"),this.scheduleConnect_(e),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Ay)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const t=this.onDataMessage_.bind(this),e=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),n=this.id+":"+be.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,s())},l=function(d){b(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:c,sendRequest:l};const h=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,u]=await Promise.all([this.authTokenProvider_.getToken(h),this.appCheckTokenProvider_.getToken(h)]);o?St("getToken() completed but was canceled"):(St("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=u&&u.token,a=new ky(n,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,t,e,s,f=>{Lt(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(Dy)},r))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&Lt(d),c())}}}interrupt(t){St("Interrupting connection for reason: "+t),this.interruptReasons_[t]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(t){St("Resuming connection for reason: "+t),delete this.interruptReasons_[t],zr(this.interruptReasons_)&&(this.reconnectDelay_=ys,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(t){const e=t-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:e})}cancelSentTransactions_(){for(let t=0;t<this.outstandingPuts_.length;t++){const e=this.outstandingPuts_[t];e&&"h"in e.request&&e.queued&&(e.onComplete&&e.onComplete("disconnect"),delete this.outstandingPuts_[t],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(t,e){let s;e?s=e.map(r=>bo(r)).join("$"):s="default";const n=this.removeListen_(t,s);n&&n.onComplete&&n.onComplete("permission_denied")}removeListen_(t,e){const s=new et(t).toString();let n;if(this.listens.has(s)){const r=this.listens.get(s);n=r.get(e),r.delete(e),r.size===0&&this.listens.delete(s)}else n=void 0;return n}onAuthRevoked_(t,e){St("Auth token revoked: "+t+"/"+e),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(t==="invalid_token"||t==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=fh&&(this.reconnectDelay_=uh,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(t,e){St("App check token revoked: "+t+"/"+e),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(t==="invalid_token"||t==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=fh&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(t){this.securityDebugCallback_?this.securityDebugCallback_(t):"msg"in t&&console.log("FIREBASE: "+t.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const t of this.listens.values())for(const e of t.values())this.sendListen_(e);for(let t=0;t<this.outstandingPuts_.length;t++)this.outstandingPuts_[t]&&this.sendPut_(t);for(;this.onDisconnectRequestQueue_.length;){const t=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(t.action,t.pathString,t.data,t.onComplete)}for(let t=0;t<this.outstandingGets_.length;t++)this.outstandingGets_[t]&&this.sendGet_(t)}sendConnectStats_(){const t={};let e="js";t["sdk."+e+"."+Tl.replace(/\./g,"-")]=1,$r()?t["framework.cordova"]=1:ac()&&(t["framework.reactnative"]=1),this.reportStats(t)}shouldReconnect_(){const t=Pn.getInstance().currentlyOnline();return zr(this.interruptReasons_)&&t}}be.nextPersistentConnectionId_=0,be.nextConnectionId_=0;/**
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
*/class U{constructor(t,e){this.name=t,this.node=e}static Wrap(t,e){return new U(t,e)}}/**
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
*/class Mn{getCompare(){return this.compare.bind(this)}indexedValueChanged(t,e){const s=new U(Ai,t),n=new U(Ai,e);return this.compare(s,n)!==0}minPost(){return U.MIN}}/**
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
*/let An;class ph extends Mn{static get __EMPTY_NODE(){return An}static set __EMPTY_NODE(t){An=t}compare(t,e){return Ri(t.name,e.name)}isDefinedOn(t){throw ee("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(t,e){return!1}minPost(){return U.MIN}maxPost(){return new U(ri,An)}makePost(t,e){return b(typeof t=="string","KeyIndex indexValue must always be a string."),new U(t,An)}toString(){return".key"}}const Oi=new ph;/**
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
*/class Rn{constructor(t,e,s,n,r=null){this.isReverse_=n,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!t.isEmpty();)if(t=t,o=e?s(t.key,e):1,n&&(o*=-1),o<0)this.isReverse_?t=t.left:t=t.right;else if(o===0){this.nodeStack_.push(t);break}else this.nodeStack_.push(t),this.isReverse_?t=t.right:t=t.left}getNext(){if(this.nodeStack_.length===0)return null;let t=this.nodeStack_.pop(),e;if(this.resultGenerator_?e=this.resultGenerator_(t.key,t.value):e={key:t.key,value:t.value},this.isReverse_)for(t=t.left;!t.isEmpty();)this.nodeStack_.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack_.push(t),t=t.left;return e}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const t=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(t.key,t.value):{key:t.key,value:t.value}}}class vt{constructor(t,e,s,n,r){this.key=t,this.value=e,this.color=s??vt.RED,this.left=n??Bt.EMPTY_NODE,this.right=r??Bt.EMPTY_NODE}copy(t,e,s,n,r){return new vt(t??this.key,e??this.value,s??this.color,n??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||!!t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,s){let n=this;const r=s(t,n.key);return r<0?n=n.copy(null,null,null,n.left.insert(t,e,s),null):r===0?n=n.copy(null,e,null,null,null):n=n.copy(null,null,null,null,n.right.insert(t,e,s)),n.fixUp_()}removeMin_(){if(this.left.isEmpty())return Bt.EMPTY_NODE;let t=this;return!t.left.isRed_()&&!t.left.left.isRed_()&&(t=t.moveRedLeft_()),t=t.copy(null,null,null,t.left.removeMin_(),null),t.fixUp_()}remove(t,e){let s,n;if(s=this,e(t,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),e(t,s.key)===0){if(s.right.isEmpty())return Bt.EMPTY_NODE;n=s.right.min_(),s=s.copy(n.key,n.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let t=this;return t.right.isRed_()&&!t.left.isRed_()&&(t=t.rotateLeft_()),t.left.isRed_()&&t.left.left.isRed_()&&(t=t.rotateRight_()),t.left.isRed_()&&t.right.isRed_()&&(t=t.colorFlip_()),t}moveRedLeft_(){let t=this.colorFlip_();return t.right.left.isRed_()&&(t=t.copy(null,null,null,null,t.right.rotateRight_()),t=t.rotateLeft_(),t=t.colorFlip_()),t}moveRedRight_(){let t=this.colorFlip_();return t.left.left.isRed_()&&(t=t.rotateRight_(),t=t.colorFlip_()),t}rotateLeft_(){const t=this.copy(null,null,vt.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight_(){const t=this.copy(null,null,vt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip_(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth_(){const t=this.check_();return Math.pow(2,t)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const t=this.left.check_();if(t!==this.right.check_())throw new Error("Black depths differ");return t+(this.isRed_()?0:1)}}vt.RED=!0,vt.BLACK=!1;class Ny{copy(t,e,s,n,r){return this}insert(t,e,s){return new vt(t,e,null)}remove(t,e){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Bt{constructor(t,e=Bt.EMPTY_NODE){this.comparator_=t,this.root_=e}insert(t,e){return new Bt(this.comparator_,this.root_.insert(t,e,this.comparator_).copy(null,null,vt.BLACK,null,null))}remove(t){return new Bt(this.comparator_,this.root_.remove(t,this.comparator_).copy(null,null,vt.BLACK,null,null))}get(t){let e,s=this.root_;for(;!s.isEmpty();){if(e=this.comparator_(t,s.key),e===0)return s.value;e<0?s=s.left:e>0&&(s=s.right)}return null}getPredecessorKey(t){let e,s=this.root_,n=null;for(;!s.isEmpty();)if(e=this.comparator_(t,s.key),e===0){if(s.left.isEmpty())return n?n.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else e<0?s=s.left:e>0&&(n=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(t){return this.root_.inorderTraversal(t)}reverseTraversal(t){return this.root_.reverseTraversal(t)}getIterator(t){return new Rn(this.root_,null,this.comparator_,!1,t)}getIteratorFrom(t,e){return new Rn(this.root_,t,this.comparator_,!1,e)}getReverseIteratorFrom(t,e){return new Rn(this.root_,t,this.comparator_,!0,e)}getReverseIterator(t){return new Rn(this.root_,null,this.comparator_,!0,t)}}Bt.EMPTY_NODE=new Ny;/**
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
*/function Oy(i,t){return Ri(i.name,t.name)}function Mo(i,t){return Ri(i,t)}/**
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
*/let Ao;function Ly(i){Ao=i}const gh=function(i){return typeof i=="number"?"number:"+Dl(i):"string:"+i},mh=function(i){if(i.isLeafNode()){const t=i.val();b(typeof t=="string"||typeof t=="number"||typeof t=="object"&&fe(t,".sv"),"Priority must be a string or number.")}else b(i===Ao||i.isEmpty(),"priority of unexpected type.");b(i===Ao||i.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
*/let _h;class bt{static set __childrenNodeConstructor(t){_h=t}static get __childrenNodeConstructor(){return _h}constructor(t,e=bt.__childrenNodeConstructor.EMPTY_NODE){this.value_=t,this.priorityNode_=e,this.lazyHash_=null,b(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),mh(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(t){return new bt(this.value_,t)}getImmediateChild(t){return t===".priority"?this.priorityNode_:bt.__childrenNodeConstructor.EMPTY_NODE}getChild(t){return W(t)?this:B(t)===".priority"?this.priorityNode_:bt.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(t,e){return null}updateImmediateChild(t,e){return t===".priority"?this.updatePriority(e):e.isEmpty()&&t!==".priority"?this:bt.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(t,e).updatePriority(this.priorityNode_)}updateChild(t,e){const s=B(t);return s===null?e:e.isEmpty()&&s!==".priority"?this:(b(s!==".priority"||He(t)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,bt.__childrenNodeConstructor.EMPTY_NODE.updateChild(rt(t),e)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(t,e){return!1}val(t){return t&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let t="";this.priorityNode_.isEmpty()||(t+="priority:"+gh(this.priorityNode_.val())+":");const e=typeof this.value_;t+=e+":",e==="number"?t+=Dl(this.value_):t+=this.value_,this.lazyHash_=Pl(t)}return this.lazyHash_}getValue(){return this.value_}compareTo(t){return t===bt.__childrenNodeConstructor.EMPTY_NODE?1:t instanceof bt.__childrenNodeConstructor?-1:(b(t.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(t))}compareToLeafNode_(t){const e=typeof t.value_,s=typeof this.value_,n=bt.VALUE_TYPE_ORDER.indexOf(e),r=bt.VALUE_TYPE_ORDER.indexOf(s);return b(n>=0,"Unknown leaf type: "+e),b(r>=0,"Unknown leaf type: "+s),n===r?s==="object"?0:this.value_<t.value_?-1:this.value_===t.value_?0:1:r-n}withIndex(){return this}isIndexed(){return!0}equals(t){if(t===this)return!0;if(t.isLeafNode()){const e=t;return this.value_===e.value_&&this.priorityNode_.equals(e.priorityNode_)}else return!1}}bt.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
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
*/let yh,vh;function Fy(i){yh=i}function By(i){vh=i}class Uy extends Mn{compare(t,e){const s=t.node.getPriority(),n=e.node.getPriority(),r=s.compareTo(n);return r===0?Ri(t.name,e.name):r}isDefinedOn(t){return!t.getPriority().isEmpty()}indexedValueChanged(t,e){return!t.getPriority().equals(e.getPriority())}minPost(){return U.MIN}maxPost(){return new U(ri,new bt("[PRIORITY-POST]",vh))}makePost(t,e){const s=yh(t);return new U(e,new bt("[PRIORITY-POST]",s))}toString(){return".priority"}}const dt=new Uy;/**
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
*/const Hy=Math.log(2);class Wy{constructor(t){const e=r=>parseInt(Math.log(r)/Hy,10),s=r=>parseInt(Array(r+1).join("1"),2);this.count=e(t+1),this.current_=this.count-1;const n=s(this.count);this.bits_=t+1&n}nextBitIsOne(){const t=!(this.bits_&1<<this.current_);return this.current_--,t}}const Dn=function(i,t,e,s){i.sort(t);const n=function(c,l){const h=l-c;let d,u;if(h===0)return null;if(h===1)return d=i[c],u=e?e(d):d,new vt(u,d.node,vt.BLACK,null,null);{const f=parseInt(h/2,10)+c,p=n(c,f),m=n(f+1,l);return d=i[f],u=e?e(d):d,new vt(u,d.node,vt.BLACK,p,m)}},r=function(c){let l=null,h=null,d=i.length;const u=function(p,m){const _=d-p,v=d;d-=p;const I=n(_+1,v),x=i[_],C=e?e(x):x;f(new vt(C,x.node,m,null,I))},f=function(p){l?(l.left=p,l=p):(h=p,l=p)};for(let p=0;p<c.count;++p){const m=c.nextBitIsOne(),_=Math.pow(2,c.count-(p+1));m?u(_,vt.BLACK):(u(_,vt.BLACK),u(_,vt.RED))}return h},o=new Wy(i.length),a=r(o);return new Bt(s||t,a)};/**
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
*/let Ro;const Li={};class we{static get Default(){return b(Li&&dt,"ChildrenNode.ts has not been loaded"),Ro=Ro||new we({".priority":Li},{".priority":dt}),Ro}constructor(t,e){this.indexes_=t,this.indexSet_=e}get(t){const e=wi(this.indexes_,t);if(!e)throw new Error("No index defined for "+t);return e instanceof Bt?e:null}hasIndex(t){return fe(this.indexSet_,t.toString())}addIndex(t,e){b(t!==Oi,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let n=!1;const r=e.getIterator(U.Wrap);let o=r.getNext();for(;o;)n=n||t.isDefinedOn(o.node),s.push(o),o=r.getNext();let a;n?a=Dn(s,t.getCompare()):a=Li;const c=t.toString(),l={...this.indexSet_};l[c]=t;const h={...this.indexes_};return h[c]=a,new we(h,l)}addToIndexes(t,e){const s=dn(this.indexes_,(n,r)=>{const o=wi(this.indexSet_,r);if(b(o,"Missing index implementation for "+r),n===Li)if(o.isDefinedOn(t.node)){const a=[],c=e.getIterator(U.Wrap);let l=c.getNext();for(;l;)l.name!==t.name&&a.push(l),l=c.getNext();return a.push(t),Dn(a,o.getCompare())}else return Li;else{const a=e.get(t.name);let c=n;return a&&(c=c.remove(new U(t.name,a))),c.insert(t,t.node)}});return new we(s,this.indexSet_)}removeFromIndexes(t,e){const s=dn(this.indexes_,n=>{if(n===Li)return n;{const r=e.get(t.name);return r?n.remove(new U(t.name,r)):n}});return new we(s,this.indexSet_)}}/**
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
*/let vs;class P{static get EMPTY_NODE(){return vs||(vs=new P(new Bt(Mo),null,we.Default))}constructor(t,e,s){this.children_=t,this.priorityNode_=e,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&mh(this.priorityNode_),this.children_.isEmpty()&&b(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||vs}updatePriority(t){return this.children_.isEmpty()?this:new P(this.children_,t,this.indexMap_)}getImmediateChild(t){if(t===".priority")return this.getPriority();{const e=this.children_.get(t);return e===null?vs:e}}getChild(t){const e=B(t);return e===null?this:this.getImmediateChild(e).getChild(rt(t))}hasChild(t){return this.children_.get(t)!==null}updateImmediateChild(t,e){if(b(e,"We should always be passing snapshot nodes"),t===".priority")return this.updatePriority(e);{const s=new U(t,e);let n,r;e.isEmpty()?(n=this.children_.remove(t),r=this.indexMap_.removeFromIndexes(s,this.children_)):(n=this.children_.insert(t,e),r=this.indexMap_.addToIndexes(s,this.children_));const o=n.isEmpty()?vs:this.priorityNode_;return new P(n,o,r)}}updateChild(t,e){const s=B(t);if(s===null)return e;{b(B(t)!==".priority"||He(t)===1,".priority must be the last token in a path");const n=this.getImmediateChild(s).updateChild(rt(t),e);return this.updateImmediateChild(s,n)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(t){if(this.isEmpty())return null;const e={};let s=0,n=0,r=!0;if(this.forEachChild(dt,(o,a)=>{e[o]=a.val(t),s++,r&&P.INTEGER_REGEXP_.test(o)?n=Math.max(n,Number(o)):r=!1}),!t&&r&&n<2*s){const o=[];for(const a in e)o[a]=e[a];return o}else return t&&!this.getPriority().isEmpty()&&(e[".priority"]=this.getPriority().val()),e}hash(){if(this.lazyHash_===null){let t="";this.getPriority().isEmpty()||(t+="priority:"+gh(this.getPriority().val())+":"),this.forEachChild(dt,(e,s)=>{const n=s.hash();n!==""&&(t+=":"+e+":"+n)}),this.lazyHash_=t===""?"":Pl(t)}return this.lazyHash_}getPredecessorChildName(t,e,s){const n=this.resolveIndex_(s);if(n){const r=n.getPredecessorKey(new U(t,e));return r?r.name:null}else return this.children_.getPredecessorKey(t)}getFirstChildName(t){const e=this.resolveIndex_(t);if(e){const s=e.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(t){const e=this.getFirstChildName(t);return e?new U(e,this.children_.get(e)):null}getLastChildName(t){const e=this.resolveIndex_(t);if(e){const s=e.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(t){const e=this.getLastChildName(t);return e?new U(e,this.children_.get(e)):null}forEachChild(t,e){const s=this.resolveIndex_(t);return s?s.inorderTraversal(n=>e(n.name,n.node)):this.children_.inorderTraversal(e)}getIterator(t){return this.getIteratorFrom(t.minPost(),t)}getIteratorFrom(t,e){const s=this.resolveIndex_(e);if(s)return s.getIteratorFrom(t,n=>n);{const n=this.children_.getIteratorFrom(t.name,U.Wrap);let r=n.peek();for(;r!=null&&e.compare(r,t)<0;)n.getNext(),r=n.peek();return n}}getReverseIterator(t){return this.getReverseIteratorFrom(t.maxPost(),t)}getReverseIteratorFrom(t,e){const s=this.resolveIndex_(e);if(s)return s.getReverseIteratorFrom(t,n=>n);{const n=this.children_.getReverseIteratorFrom(t.name,U.Wrap);let r=n.peek();for(;r!=null&&e.compare(r,t)>0;)n.getNext(),r=n.peek();return n}}compareTo(t){return this.isEmpty()?t.isEmpty()?0:-1:t.isLeafNode()||t.isEmpty()?1:t===bs?-1:0}withIndex(t){if(t===Oi||this.indexMap_.hasIndex(t))return this;{const e=this.indexMap_.addIndex(t,this.children_);return new P(this.children_,this.priorityNode_,e)}}isIndexed(t){return t===Oi||this.indexMap_.hasIndex(t)}equals(t){if(t===this)return!0;if(t.isLeafNode())return!1;{const e=t;if(this.getPriority().equals(e.getPriority()))if(this.children_.count()===e.children_.count()){const s=this.getIterator(dt),n=e.getIterator(dt);let r=s.getNext(),o=n.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=s.getNext(),o=n.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(t){return t===Oi?null:this.indexMap_.get(t.toString())}}P.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class $y extends P{constructor(){super(new Bt(Mo),P.EMPTY_NODE,we.Default)}compareTo(t){return t===this?0:1}equals(t){return t===this}getPriority(){return this}getImmediateChild(t){return P.EMPTY_NODE}isEmpty(){return!1}}const bs=new $y;Object.defineProperties(U,{MIN:{value:new U(Ai,P.EMPTY_NODE)},MAX:{value:new U(ri,bs)}}),ph.__EMPTY_NODE=P.EMPTY_NODE,bt.__childrenNodeConstructor=P,Ly(bs),By(bs);/**
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
*/const zy=!0;function wt(i,t=null){if(i===null)return P.EMPTY_NODE;if(typeof i=="object"&&".priority"in i&&(t=i[".priority"]),b(t===null||typeof t=="string"||typeof t=="number"||typeof t=="object"&&".sv"in t,"Invalid priority type found: "+typeof t),typeof i=="object"&&".value"in i&&i[".value"]!==null&&(i=i[".value"]),typeof i!="object"||".sv"in i){const e=i;return new bt(e,wt(t))}if(!(i instanceof Array)&&zy){const e=[];let s=!1;if(Ft(i,(r,o)=>{if(r.substring(0,1)!=="."){const a=wt(o);a.isEmpty()||(s=s||!a.getPriority().isEmpty(),e.push(new U(r,a)))}}),e.length===0)return P.EMPTY_NODE;const n=Dn(e,Oy,r=>r.name,Mo);if(s){const r=Dn(e,dt.getCompare());return new P(n,wt(t),new we({".priority":r},{".priority":dt}))}else return new P(n,wt(t),we.Default)}else{let e=P.EMPTY_NODE;return Ft(i,(s,n)=>{if(fe(i,s)&&s.substring(0,1)!=="."){const r=wt(n);(r.isLeafNode()||!r.isEmpty())&&(e=e.updateImmediateChild(s,r))}}),e.updatePriority(wt(t))}}Fy(wt);/**
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
*/class jy extends Mn{constructor(t){super(),this.indexPath_=t,b(!W(t)&&B(t)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(t){return t.getChild(this.indexPath_)}isDefinedOn(t){return!t.getChild(this.indexPath_).isEmpty()}compare(t,e){const s=this.extractChild(t.node),n=this.extractChild(e.node),r=s.compareTo(n);return r===0?Ri(t.name,e.name):r}makePost(t,e){const s=wt(t),n=P.EMPTY_NODE.updateChild(this.indexPath_,s);return new U(e,n)}maxPost(){const t=P.EMPTY_NODE.updateChild(this.indexPath_,bs);return new U(ri,t)}toString(){return lh(this.indexPath_,0).join("/")}}/**
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
*/class qy extends Mn{compare(t,e){const s=t.node.compareTo(e.node);return s===0?Ri(t.name,e.name):s}isDefinedOn(t){return!0}indexedValueChanged(t,e){return!t.equals(e)}minPost(){return U.MIN}maxPost(){return U.MAX}makePost(t,e){const s=wt(t);return new U(e,s)}toString(){return".value"}}const Vy=new qy;/**
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
*/function bh(i){return{type:"value",snapshotNode:i}}function Fi(i,t){return{type:"child_added",snapshotNode:t,childName:i}}function ws(i,t){return{type:"child_removed",snapshotNode:t,childName:i}}function xs(i,t,e){return{type:"child_changed",snapshotNode:t,childName:i,oldSnap:e}}function Yy(i,t){return{type:"child_moved",snapshotNode:t,childName:i}}/**
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
*/class Do{constructor(t){this.index_=t}updateChild(t,e,s,n,r,o){b(t.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=t.getImmediateChild(e);return a.getChild(n).equals(s.getChild(n))&&a.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?t.hasChild(e)?o.trackChildChange(ws(e,a)):b(t.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Fi(e,s)):o.trackChildChange(xs(e,s,a))),t.isLeafNode()&&s.isEmpty())?t:t.updateImmediateChild(e,s).withIndex(this.index_)}updateFullNode(t,e,s){return s!=null&&(t.isLeafNode()||t.forEachChild(dt,(n,r)=>{e.hasChild(n)||s.trackChildChange(ws(n,r))}),e.isLeafNode()||e.forEachChild(dt,(n,r)=>{if(t.hasChild(n)){const o=t.getImmediateChild(n);o.equals(r)||s.trackChildChange(xs(n,r,o))}else s.trackChildChange(Fi(n,r))})),e.withIndex(this.index_)}updatePriority(t,e){return t.isEmpty()?P.EMPTY_NODE:t.updatePriority(e)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
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
*/class Is{constructor(t){this.indexedFilter_=new Do(t.getIndex()),this.index_=t.getIndex(),this.startPost_=Is.getStartPost_(t),this.endPost_=Is.getEndPost_(t),this.startIsInclusive_=!t.startAfterSet_,this.endIsInclusive_=!t.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(t){const e=this.startIsInclusive_?this.index_.compare(this.getStartPost(),t)<=0:this.index_.compare(this.getStartPost(),t)<0,s=this.endIsInclusive_?this.index_.compare(t,this.getEndPost())<=0:this.index_.compare(t,this.getEndPost())<0;return e&&s}updateChild(t,e,s,n,r,o){return this.matches(new U(e,s))||(s=P.EMPTY_NODE),this.indexedFilter_.updateChild(t,e,s,n,r,o)}updateFullNode(t,e,s){e.isLeafNode()&&(e=P.EMPTY_NODE);let n=e.withIndex(this.index_);n=n.updatePriority(P.EMPTY_NODE);const r=this;return e.forEachChild(dt,(o,a)=>{r.matches(new U(o,a))||(n=n.updateImmediateChild(o,P.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(t,n,s)}updatePriority(t,e){return t}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(t){if(t.hasStart()){const e=t.getIndexStartName();return t.getIndex().makePost(t.getIndexStartValue(),e)}else return t.getIndex().minPost()}static getEndPost_(t){if(t.hasEnd()){const e=t.getIndexEndName();return t.getIndex().makePost(t.getIndexEndValue(),e)}else return t.getIndex().maxPost()}}/**
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
*/class Ky{constructor(t){this.withinDirectionalStart=e=>this.reverse_?this.withinEndPost(e):this.withinStartPost(e),this.withinDirectionalEnd=e=>this.reverse_?this.withinStartPost(e):this.withinEndPost(e),this.withinStartPost=e=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),e);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=e=>{const s=this.index_.compare(e,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new Is(t),this.index_=t.getIndex(),this.limit_=t.getLimit(),this.reverse_=!t.isViewFromLeft(),this.startIsInclusive_=!t.startAfterSet_,this.endIsInclusive_=!t.endBeforeSet_}updateChild(t,e,s,n,r,o){return this.rangedFilter_.matches(new U(e,s))||(s=P.EMPTY_NODE),t.getImmediateChild(e).equals(s)?t:t.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(t,e,s,n,r,o):this.fullLimitUpdateChild_(t,e,s,r,o)}updateFullNode(t,e,s){let n;if(e.isLeafNode()||e.isEmpty())n=P.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<e.numChildren()&&e.isIndexed(this.index_)){n=P.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=e.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=e.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))n=n.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{n=e.withIndex(this.index_),n=n.updatePriority(P.EMPTY_NODE);let r;this.reverse_?r=n.getReverseIterator(this.index_):r=n.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:n=n.updateImmediateChild(a.name,P.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(t,n,s)}updatePriority(t,e){return t}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(t,e,s,n,r){let o;if(this.reverse_){const d=this.index_.getCompare();o=(u,f)=>d(f,u)}else o=this.index_.getCompare();const a=t;b(a.numChildren()===this.limit_,"");const c=new U(e,s),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),h=this.rangedFilter_.matches(c);if(a.hasChild(e)){const d=a.getImmediateChild(e);let u=n.getChildAfterChild(this.index_,l,this.reverse_);for(;u!=null&&(u.name===e||a.hasChild(u.name));)u=n.getChildAfterChild(this.index_,u,this.reverse_);const f=u==null?1:o(u,c);if(h&&!s.isEmpty()&&f>=0)return r?.trackChildChange(xs(e,s,d)),a.updateImmediateChild(e,s);{r?.trackChildChange(ws(e,d));const p=a.updateImmediateChild(e,P.EMPTY_NODE);return u!=null&&this.rangedFilter_.matches(u)?(r?.trackChildChange(Fi(u.name,u.node)),p.updateImmediateChild(u.name,u.node)):p}}else return s.isEmpty()?t:h&&o(l,c)>=0?(r!=null&&(r.trackChildChange(ws(l.name,l.node)),r.trackChildChange(Fi(e,s))),a.updateImmediateChild(e,s).updateImmediateChild(l.name,P.EMPTY_NODE)):t}}/**
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
*/class No{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=dt}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return b(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return b(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Ai}hasEnd(){return this.endSet_}getIndexEndValue(){return b(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return b(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:ri}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return b(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===dt}copy(){const t=new No;return t.limitSet_=this.limitSet_,t.limit_=this.limit_,t.startSet_=this.startSet_,t.startAfterSet_=this.startAfterSet_,t.indexStartValue_=this.indexStartValue_,t.startNameSet_=this.startNameSet_,t.indexStartName_=this.indexStartName_,t.endSet_=this.endSet_,t.endBeforeSet_=this.endBeforeSet_,t.indexEndValue_=this.indexEndValue_,t.endNameSet_=this.endNameSet_,t.indexEndName_=this.indexEndName_,t.index_=this.index_,t.viewFrom_=this.viewFrom_,t}}function Gy(i){return i.loadsAllData()?new Do(i.getIndex()):i.hasLimit()?new Ky(i):new Is(i)}function wh(i){const t={};if(i.isDefault())return t;let e;if(i.index_===dt?e="$priority":i.index_===Vy?e="$value":i.index_===Oi?e="$key":(b(i.index_ instanceof jy,"Unrecognized index type!"),e=i.index_.toString()),t.orderBy=gt(e),i.startSet_){const s=i.startAfterSet_?"startAfter":"startAt";t[s]=gt(i.indexStartValue_),i.startNameSet_&&(t[s]+=","+gt(i.indexStartName_))}if(i.endSet_){const s=i.endBeforeSet_?"endBefore":"endAt";t[s]=gt(i.indexEndValue_),i.endNameSet_&&(t[s]+=","+gt(i.indexEndName_))}return i.limitSet_&&(i.isViewFromLeft()?t.limitToFirst=i.limit_:t.limitToLast=i.limit_),t}function xh(i){const t={};if(i.startSet_&&(t.sp=i.indexStartValue_,i.startNameSet_&&(t.sn=i.indexStartName_),t.sin=!i.startAfterSet_),i.endSet_&&(t.ep=i.indexEndValue_,i.endNameSet_&&(t.en=i.indexEndName_),t.ein=!i.endBeforeSet_),i.limitSet_){t.l=i.limit_;let e=i.viewFrom_;e===""&&(i.isViewFromLeft()?e="l":e="r"),t.vf=e}return i.index_!==dt&&(t.i=i.index_.toString()),t}/**
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
*/class Nn extends nh{reportStats(t){throw new Error("Method not implemented.")}static getListenId_(t,e){return e!==void 0?"tag$"+e:(b(t._queryParams.isDefault(),"should have a tag if it's not a default query."),t._path.toString())}constructor(t,e,s,n){super(),this.repoInfo_=t,this.onDataUpdate_=e,this.authTokenProvider_=s,this.appCheckTokenProvider_=n,this.log_=ps("p:rest:"),this.listens_={}}listen(t,e,s,n){const r=t._path.toString();this.log_("Listen called for "+r+" "+t._queryIdentifier);const o=Nn.getListenId_(t,s),a={};this.listens_[o]=a;const c=wh(t._queryParams);this.restRequest_(r+".json",c,(l,h)=>{let d=h;if(l===404&&(d=null,l=null),l===null&&this.onDataUpdate_(r,d,!1,s),wi(this.listens_,o)===a){let u;l?l===401?u="permission_denied":u="rest_error:"+l:u="ok",n(u,null)}})}unlisten(t,e){const s=Nn.getListenId_(t,e);delete this.listens_[s]}get(t){const e=wh(t._queryParams),s=t._path.toString(),n=new hn;return this.restRequest_(s+".json",e,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(s,a,!1,null),n.resolve(a)):n.reject(new Error(a))}),n.promise}refreshAuthToken(t){}restRequest_(t,e={},s){return e.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([n,r])=>{n&&n.accessToken&&(e.auth=n.accessToken),r&&r.token&&(e.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+t+"?ns="+this.repoInfo_.namespace+xi(e);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(s&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=ts(a.responseText)}catch{Lt("Failed to parse JSON response for "+o+": "+a.responseText)}s(null,c)}else a.status!==401&&a.status!==404&&Lt("Got unsuccessful REST response for "+o+" Status: "+a.status),s(a.status);s=null}},a.open("GET",o,!0),a.send()})}}/**
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
*/class Jy{constructor(){this.rootNode_=P.EMPTY_NODE}getNode(t){return this.rootNode_.getChild(t)}updateSnapshot(t,e){this.rootNode_=this.rootNode_.updateChild(t,e)}}/**
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
*/function On(){return{value:null,children:new Map}}function Ih(i,t,e){if(W(t))i.value=e,i.children.clear();else if(i.value!==null)i.value=i.value.updateChild(t,e);else{const s=B(t);i.children.has(s)||i.children.set(s,On());const n=i.children.get(s);t=rt(t),Ih(n,t,e)}}function Oo(i,t,e){i.value!==null?e(t,i.value):Qy(i,(s,n)=>{const r=new et(t.toString()+"/"+s);Oo(n,r,e)})}function Qy(i,t){i.children.forEach((e,s)=>{t(s,e)})}/**
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
*/class Xy{constructor(t){this.collection_=t,this.last_=null}get(){const t=this.collection_.get(),e={...t};return this.last_&&Ft(this.last_,(s,n)=>{e[s]=e[s]-n}),this.last_=t,e}}/**
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
*/const Ch=10*1e3,Zy=30*1e3,tv=300*1e3;class ev{constructor(t,e){this.server_=e,this.statsToReport_={},this.statsListener_=new Xy(t);const s=Ch+(Zy-Ch)*Math.random();ms(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const t=this.statsListener_.get(),e={};let s=!1;Ft(t,(n,r)=>{r>0&&fe(this.statsToReport_,n)&&(e[n]=r,s=!0)}),s&&this.server_.reportStats(e),ms(this.reportStats_.bind(this),Math.floor(Math.random()*2*tv))}}/**
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
*/var Jt;(function(i){i[i.OVERWRITE=0]="OVERWRITE",i[i.MERGE=1]="MERGE",i[i.ACK_USER_WRITE=2]="ACK_USER_WRITE",i[i.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Jt||(Jt={}));function kh(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Lo(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Fo(i){return{fromUser:!1,fromServer:!0,queryId:i,tagged:!0}}/**
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
*/class Ln{constructor(t,e,s){this.path=t,this.affectedTree=e,this.revert=s,this.type=Jt.ACK_USER_WRITE,this.source=kh()}operationForChild(t){if(W(this.path)){if(this.affectedTree.value!=null)return b(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const e=this.affectedTree.subtree(new et(t));return new Ln(Y(),e,this.revert)}}else return b(B(this.path)===t,"operationForChild called for unrelated child."),new Ln(rt(this.path),this.affectedTree,this.revert)}}/**
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
*/class Cs{constructor(t,e){this.source=t,this.path=e,this.type=Jt.LISTEN_COMPLETE}operationForChild(t){return W(this.path)?new Cs(this.source,Y()):new Cs(this.source,rt(this.path))}}/**
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
*/class ai{constructor(t,e,s){this.source=t,this.path=e,this.snap=s,this.type=Jt.OVERWRITE}operationForChild(t){return W(this.path)?new ai(this.source,Y(),this.snap.getImmediateChild(t)):new ai(this.source,rt(this.path),this.snap)}}/**
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
*/class ks{constructor(t,e,s){this.source=t,this.path=e,this.children=s,this.type=Jt.MERGE}operationForChild(t){if(W(this.path)){const e=this.children.subtree(new et(t));return e.isEmpty()?null:e.value?new ai(this.source,Y(),e.value):new ks(this.source,Y(),e)}else return b(B(this.path)===t,"Can't get a merge for a child not on the path of the operation"),new ks(this.source,rt(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
*/class We{constructor(t,e,s){this.node_=t,this.fullyInitialized_=e,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(t){if(W(t))return this.isFullyInitialized()&&!this.filtered_;const e=B(t);return this.isCompleteForChild(e)}isCompleteForChild(t){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(t)}getNode(){return this.node_}}/**
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
*/class iv{constructor(t){this.query_=t,this.index_=this.query_._queryParams.getIndex()}}function sv(i,t,e,s){const n=[],r=[];return t.forEach(o=>{o.type==="child_changed"&&i.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Yy(o.childName,o.snapshotNode))}),Es(i,n,"child_removed",t,s,e),Es(i,n,"child_added",t,s,e),Es(i,n,"child_moved",r,s,e),Es(i,n,"child_changed",t,s,e),Es(i,n,"value",t,s,e),n}function Es(i,t,e,s,n,r){const o=s.filter(a=>a.type===e);o.sort((a,c)=>rv(i,a,c)),o.forEach(a=>{const c=nv(i,a,r);n.forEach(l=>{l.respondsTo(a.type)&&t.push(l.createEvent(c,i.query_))})})}function nv(i,t,e){return t.type==="value"||t.type==="child_removed"||(t.prevName=e.getPredecessorChildName(t.childName,t.snapshotNode,i.index_)),t}function rv(i,t,e){if(t.childName==null||e.childName==null)throw ee("Should only compare child_ events.");const s=new U(t.childName,t.snapshotNode),n=new U(e.childName,e.snapshotNode);return i.index_.compare(s,n)}/**
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
*/function Fn(i,t){return{eventCache:i,serverCache:t}}function Ts(i,t,e,s){return Fn(new We(t,e,s),i.serverCache)}function Eh(i,t,e,s){return Fn(i.eventCache,new We(t,e,s))}function Bn(i){return i.eventCache.isFullyInitialized()?i.eventCache.getNode():null}function ci(i){return i.serverCache.isFullyInitialized()?i.serverCache.getNode():null}/**
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
*/let Bo;const ov=()=>(Bo||(Bo=new Bt(q_)),Bo);class ot{static fromObject(t){let e=new ot(null);return Ft(t,(s,n)=>{e=e.set(new et(s),n)}),e}constructor(t,e=ov()){this.value=t,this.children=e}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(t,e){if(this.value!=null&&e(this.value))return{path:Y(),value:this.value};if(W(t))return null;{const s=B(t),n=this.children.get(s);if(n!==null){const r=n.findRootMostMatchingPathAndValue(rt(t),e);return r!=null?{path:mt(new et(s),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(t){return this.findRootMostMatchingPathAndValue(t,()=>!0)}subtree(t){if(W(t))return this;{const e=B(t),s=this.children.get(e);return s!==null?s.subtree(rt(t)):new ot(null)}}set(t,e){if(W(t))return new ot(e,this.children);{const s=B(t),n=(this.children.get(s)||new ot(null)).set(rt(t),e),r=this.children.insert(s,n);return new ot(this.value,r)}}remove(t){if(W(t))return this.children.isEmpty()?new ot(null):new ot(null,this.children);{const e=B(t),s=this.children.get(e);if(s){const n=s.remove(rt(t));let r;return n.isEmpty()?r=this.children.remove(e):r=this.children.insert(e,n),this.value===null&&r.isEmpty()?new ot(null):new ot(this.value,r)}else return this}}get(t){if(W(t))return this.value;{const e=B(t),s=this.children.get(e);return s?s.get(rt(t)):null}}setTree(t,e){if(W(t))return e;{const s=B(t),n=(this.children.get(s)||new ot(null)).setTree(rt(t),e);let r;return n.isEmpty()?r=this.children.remove(s):r=this.children.insert(s,n),new ot(this.value,r)}}fold(t){return this.fold_(Y(),t)}fold_(t,e){const s={};return this.children.inorderTraversal((n,r)=>{s[n]=r.fold_(mt(t,n),e)}),e(t,this.value,s)}findOnPath(t,e){return this.findOnPath_(t,Y(),e)}findOnPath_(t,e,s){const n=this.value?s(e,this.value):!1;if(n)return n;if(W(t))return null;{const r=B(t),o=this.children.get(r);return o?o.findOnPath_(rt(t),mt(e,r),s):null}}foreachOnPath(t,e){return this.foreachOnPath_(t,Y(),e)}foreachOnPath_(t,e,s){if(W(t))return this;{this.value&&s(e,this.value);const n=B(t),r=this.children.get(n);return r?r.foreachOnPath_(rt(t),mt(e,n),s):new ot(null)}}foreach(t){this.foreach_(Y(),t)}foreach_(t,e){this.children.inorderTraversal((s,n)=>{n.foreach_(mt(t,s),e)}),this.value&&e(t,this.value)}foreachChild(t){this.children.inorderTraversal((e,s)=>{s.value&&t(e,s.value)})}}/**
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
*/class Qt{constructor(t){this.writeTree_=t}static empty(){return new Qt(new ot(null))}}function Ss(i,t,e){if(W(t))return new Qt(new ot(e));{const s=i.writeTree_.findRootMostValueAndPath(t);if(s!=null){const n=s.path;let r=s.value;const o=At(n,t);return r=r.updateChild(o,e),new Qt(i.writeTree_.set(n,r))}else{const n=new ot(e),r=i.writeTree_.setTree(t,n);return new Qt(r)}}}function Th(i,t,e){let s=i;return Ft(e,(n,r)=>{s=Ss(s,mt(t,n),r)}),s}function Sh(i,t){if(W(t))return Qt.empty();{const e=i.writeTree_.setTree(t,new ot(null));return new Qt(e)}}function Uo(i,t){return li(i,t)!=null}function li(i,t){const e=i.writeTree_.findRootMostValueAndPath(t);return e!=null?i.writeTree_.get(e.path).getChild(At(e.path,t)):null}function Ph(i){const t=[],e=i.writeTree_.value;return e!=null?e.isLeafNode()||e.forEachChild(dt,(s,n)=>{t.push(new U(s,n))}):i.writeTree_.children.inorderTraversal((s,n)=>{n.value!=null&&t.push(new U(s,n.value))}),t}function $e(i,t){if(W(t))return i;{const e=li(i,t);return e!=null?new Qt(new ot(e)):new Qt(i.writeTree_.subtree(t))}}function Ho(i){return i.writeTree_.isEmpty()}function Bi(i,t){return Mh(Y(),i.writeTree_,t)}function Mh(i,t,e){if(t.value!=null)return e.updateChild(i,t.value);{let s=null;return t.children.inorderTraversal((n,r)=>{n===".priority"?(b(r.value!==null,"Priority writes must always be leaf nodes"),s=r.value):e=Mh(mt(i,n),r,e)}),!e.getChild(i).isEmpty()&&s!==null&&(e=e.updateChild(mt(i,".priority"),s)),e}}/**
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
*/function Un(i,t){return Oh(t,i)}function av(i,t,e,s,n){b(s>i.lastWriteId,"Stacking an older write on top of newer ones"),n===void 0&&(n=!0),i.allWrites.push({path:t,snap:e,writeId:s,visible:n}),n&&(i.visibleWrites=Ss(i.visibleWrites,t,e)),i.lastWriteId=s}function cv(i,t){for(let e=0;e<i.allWrites.length;e++){const s=i.allWrites[e];if(s.writeId===t)return s}return null}function lv(i,t){const e=i.allWrites.findIndex(a=>a.writeId===t);b(e>=0,"removeWrite called with nonexistent writeId.");const s=i.allWrites[e];i.allWrites.splice(e,1);let n=s.visible,r=!1,o=i.allWrites.length-1;for(;n&&o>=0;){const a=i.allWrites[o];a.visible&&(o>=e&&hv(a,s.path)?n=!1:Gt(s.path,a.path)&&(r=!0)),o--}if(n){if(r)return dv(i),!0;if(s.snap)i.visibleWrites=Sh(i.visibleWrites,s.path);else{const a=s.children;Ft(a,c=>{i.visibleWrites=Sh(i.visibleWrites,mt(s.path,c))})}return!0}else return!1}function hv(i,t){if(i.snap)return Gt(i.path,t);for(const e in i.children)if(i.children.hasOwnProperty(e)&&Gt(mt(i.path,e),t))return!0;return!1}function dv(i){i.visibleWrites=Ah(i.allWrites,uv,Y()),i.allWrites.length>0?i.lastWriteId=i.allWrites[i.allWrites.length-1].writeId:i.lastWriteId=-1}function uv(i){return i.visible}function Ah(i,t,e){let s=Qt.empty();for(let n=0;n<i.length;++n){const r=i[n];if(t(r)){const o=r.path;let a;if(r.snap)Gt(e,o)?(a=At(e,o),s=Ss(s,a,r.snap)):Gt(o,e)&&(a=At(o,e),s=Ss(s,Y(),r.snap.getChild(a)));else if(r.children){if(Gt(e,o))a=At(e,o),s=Th(s,a,r.children);else if(Gt(o,e))if(a=At(o,e),W(a))s=Th(s,Y(),r.children);else{const c=wi(r.children,B(a));if(c){const l=c.getChild(rt(a));s=Ss(s,Y(),l)}}}else throw ee("WriteRecord should have .snap or .children")}}return s}function Rh(i,t,e,s,n){if(!s&&!n){const r=li(i.visibleWrites,t);if(r!=null)return r;{const o=$e(i.visibleWrites,t);if(Ho(o))return e;if(e==null&&!Uo(o,Y()))return null;{const a=e||P.EMPTY_NODE;return Bi(o,a)}}}else{const r=$e(i.visibleWrites,t);if(!n&&Ho(r))return e;if(!n&&e==null&&!Uo(r,Y()))return null;{const o=function(l){return(l.visible||n)&&(!s||!~s.indexOf(l.writeId))&&(Gt(l.path,t)||Gt(t,l.path))},a=Ah(i.allWrites,o,t),c=e||P.EMPTY_NODE;return Bi(a,c)}}}function fv(i,t,e){let s=P.EMPTY_NODE;const n=li(i.visibleWrites,t);if(n)return n.isLeafNode()||n.forEachChild(dt,(r,o)=>{s=s.updateImmediateChild(r,o)}),s;if(e){const r=$e(i.visibleWrites,t);return e.forEachChild(dt,(o,a)=>{const c=Bi($e(r,new et(o)),a);s=s.updateImmediateChild(o,c)}),Ph(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const r=$e(i.visibleWrites,t);return Ph(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function pv(i,t,e,s,n){b(s||n,"Either existingEventSnap or existingServerSnap must exist");const r=mt(t,e);if(Uo(i.visibleWrites,r))return null;{const o=$e(i.visibleWrites,r);return Ho(o)?n.getChild(e):Bi(o,n.getChild(e))}}function gv(i,t,e,s){const n=mt(t,e),r=li(i.visibleWrites,n);if(r!=null)return r;if(s.isCompleteForChild(e)){const o=$e(i.visibleWrites,n);return Bi(o,s.getNode().getImmediateChild(e))}else return null}function mv(i,t){return li(i.visibleWrites,t)}function _v(i,t,e,s,n,r,o){let a;const c=$e(i.visibleWrites,t),l=li(c,Y());if(l!=null)a=l;else if(e!=null)a=Bi(c,e);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const h=[],d=o.getCompare(),u=r?a.getReverseIteratorFrom(s,o):a.getIteratorFrom(s,o);let f=u.getNext();for(;f&&h.length<n;)d(f,s)!==0&&h.push(f),f=u.getNext();return h}else return[]}function yv(){return{visibleWrites:Qt.empty(),allWrites:[],lastWriteId:-1}}function Hn(i,t,e,s){return Rh(i.writeTree,i.treePath,t,e,s)}function Wo(i,t){return fv(i.writeTree,i.treePath,t)}function Dh(i,t,e,s){return pv(i.writeTree,i.treePath,t,e,s)}function Wn(i,t){return mv(i.writeTree,mt(i.treePath,t))}function vv(i,t,e,s,n,r){return _v(i.writeTree,i.treePath,t,e,s,n,r)}function $o(i,t,e){return gv(i.writeTree,i.treePath,t,e)}function Nh(i,t){return Oh(mt(i.treePath,t),i.writeTree)}function Oh(i,t){return{treePath:i,writeTree:t}}/**
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
*/class bv{constructor(){this.changeMap=new Map}trackChildChange(t){const e=t.type,s=t.childName;b(e==="child_added"||e==="child_changed"||e==="child_removed","Only child changes supported for tracking"),b(s!==".priority","Only non-priority child changes can be tracked.");const n=this.changeMap.get(s);if(n){const r=n.type;if(e==="child_added"&&r==="child_removed")this.changeMap.set(s,xs(s,t.snapshotNode,n.snapshotNode));else if(e==="child_removed"&&r==="child_added")this.changeMap.delete(s);else if(e==="child_removed"&&r==="child_changed")this.changeMap.set(s,ws(s,n.oldSnap));else if(e==="child_changed"&&r==="child_added")this.changeMap.set(s,Fi(s,t.snapshotNode));else if(e==="child_changed"&&r==="child_changed")this.changeMap.set(s,xs(s,t.snapshotNode,n.oldSnap));else throw ee("Illegal combination of changes: "+t+" occurred after "+n)}else this.changeMap.set(s,t)}getChanges(){return Array.from(this.changeMap.values())}}/**
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
*/class wv{getCompleteChild(t){return null}getChildAfterChild(t,e,s){return null}}const Lh=new wv;class zo{constructor(t,e,s=null){this.writes_=t,this.viewCache_=e,this.optCompleteServerCache_=s}getCompleteChild(t){const e=this.viewCache_.eventCache;if(e.isCompleteForChild(t))return e.getNode().getImmediateChild(t);{const s=this.optCompleteServerCache_!=null?new We(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return $o(this.writes_,t,s)}}getChildAfterChild(t,e,s){const n=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:ci(this.viewCache_),r=vv(this.writes_,n,e,1,s,t);return r.length===0?null:r[0]}}/**
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
*/function xv(i){return{filter:i}}function Iv(i,t){b(t.eventCache.getNode().isIndexed(i.filter.getIndex()),"Event snap not indexed"),b(t.serverCache.getNode().isIndexed(i.filter.getIndex()),"Server snap not indexed")}function Cv(i,t,e,s,n){const r=new bv;let o,a;if(e.type===Jt.OVERWRITE){const l=e;l.source.fromUser?o=jo(i,t,l.path,l.snap,s,n,r):(b(l.source.fromServer,"Unknown source."),a=l.source.tagged||t.serverCache.isFiltered()&&!W(l.path),o=$n(i,t,l.path,l.snap,s,n,a,r))}else if(e.type===Jt.MERGE){const l=e;l.source.fromUser?o=Ev(i,t,l.path,l.children,s,n,r):(b(l.source.fromServer,"Unknown source."),a=l.source.tagged||t.serverCache.isFiltered(),o=qo(i,t,l.path,l.children,s,n,a,r))}else if(e.type===Jt.ACK_USER_WRITE){const l=e;l.revert?o=Pv(i,t,l.path,s,n,r):o=Tv(i,t,l.path,l.affectedTree,s,n,r)}else if(e.type===Jt.LISTEN_COMPLETE)o=Sv(i,t,e.path,s,r);else throw ee("Unknown operation type: "+e.type);const c=r.getChanges();return kv(t,o,c),{viewCache:o,changes:c}}function kv(i,t,e){const s=t.eventCache;if(s.isFullyInitialized()){const n=s.getNode().isLeafNode()||s.getNode().isEmpty(),r=Bn(i);(e.length>0||!i.eventCache.isFullyInitialized()||n&&!s.getNode().equals(r)||!s.getNode().getPriority().equals(r.getPriority()))&&e.push(bh(Bn(t)))}}function Fh(i,t,e,s,n,r){const o=t.eventCache;if(Wn(s,e)!=null)return t;{let a,c;if(W(e))if(b(t.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),t.serverCache.isFiltered()){const l=ci(t),h=l instanceof P?l:P.EMPTY_NODE,d=Wo(s,h);a=i.filter.updateFullNode(t.eventCache.getNode(),d,r)}else{const l=Hn(s,ci(t));a=i.filter.updateFullNode(t.eventCache.getNode(),l,r)}else{const l=B(e);if(l===".priority"){b(He(e)===1,"Can't have a priority with additional path components");const h=o.getNode();c=t.serverCache.getNode();const d=Dh(s,e,h,c);d!=null?a=i.filter.updatePriority(h,d):a=o.getNode()}else{const h=rt(e);let d;if(o.isCompleteForChild(l)){c=t.serverCache.getNode();const u=Dh(s,e,o.getNode(),c);u!=null?d=o.getNode().getImmediateChild(l).updateChild(h,u):d=o.getNode().getImmediateChild(l)}else d=$o(s,l,t.serverCache);d!=null?a=i.filter.updateChild(o.getNode(),l,d,h,n,r):a=o.getNode()}}return Ts(t,a,o.isFullyInitialized()||W(e),i.filter.filtersNodes())}}function $n(i,t,e,s,n,r,o,a){const c=t.serverCache;let l;const h=o?i.filter:i.filter.getIndexedFilter();if(W(e))l=h.updateFullNode(c.getNode(),s,null);else if(h.filtersNodes()&&!c.isFiltered()){const f=c.getNode().updateChild(e,s);l=h.updateFullNode(c.getNode(),f,null)}else{const f=B(e);if(!c.isCompleteForPath(e)&&He(e)>1)return t;const p=rt(e),m=c.getNode().getImmediateChild(f).updateChild(p,s);f===".priority"?l=h.updatePriority(c.getNode(),m):l=h.updateChild(c.getNode(),f,m,p,Lh,null)}const d=Eh(t,l,c.isFullyInitialized()||W(e),h.filtersNodes()),u=new zo(n,d,r);return Fh(i,d,e,n,u,a)}function jo(i,t,e,s,n,r,o){const a=t.eventCache;let c,l;const h=new zo(n,t,r);if(W(e))l=i.filter.updateFullNode(t.eventCache.getNode(),s,o),c=Ts(t,l,!0,i.filter.filtersNodes());else{const d=B(e);if(d===".priority")l=i.filter.updatePriority(t.eventCache.getNode(),s),c=Ts(t,l,a.isFullyInitialized(),a.isFiltered());else{const u=rt(e),f=a.getNode().getImmediateChild(d);let p;if(W(u))p=s;else{const m=h.getCompleteChild(d);m!=null?ch(u)===".priority"&&m.getChild(hh(u)).isEmpty()?p=m:p=m.updateChild(u,s):p=P.EMPTY_NODE}if(f.equals(p))c=t;else{const m=i.filter.updateChild(a.getNode(),d,p,u,h,o);c=Ts(t,m,a.isFullyInitialized(),i.filter.filtersNodes())}}}return c}function Bh(i,t){return i.eventCache.isCompleteForChild(t)}function Ev(i,t,e,s,n,r,o){let a=t;return s.foreach((c,l)=>{const h=mt(e,c);Bh(t,B(h))&&(a=jo(i,a,h,l,n,r,o))}),s.foreach((c,l)=>{const h=mt(e,c);Bh(t,B(h))||(a=jo(i,a,h,l,n,r,o))}),a}function Uh(i,t,e){return e.foreach((s,n)=>{t=t.updateChild(s,n)}),t}function qo(i,t,e,s,n,r,o,a){if(t.serverCache.getNode().isEmpty()&&!t.serverCache.isFullyInitialized())return t;let c=t,l;W(e)?l=s:l=new ot(null).setTree(e,s);const h=t.serverCache.getNode();return l.children.inorderTraversal((d,u)=>{if(h.hasChild(d)){const f=t.serverCache.getNode().getImmediateChild(d),p=Uh(i,f,u);c=$n(i,c,new et(d),p,n,r,o,a)}}),l.children.inorderTraversal((d,u)=>{const f=!t.serverCache.isCompleteForChild(d)&&u.value===null;if(!h.hasChild(d)&&!f){const p=t.serverCache.getNode().getImmediateChild(d),m=Uh(i,p,u);c=$n(i,c,new et(d),m,n,r,o,a)}}),c}function Tv(i,t,e,s,n,r,o){if(Wn(n,e)!=null)return t;const a=t.serverCache.isFiltered(),c=t.serverCache;if(s.value!=null){if(W(e)&&c.isFullyInitialized()||c.isCompleteForPath(e))return $n(i,t,e,c.getNode().getChild(e),n,r,a,o);if(W(e)){let l=new ot(null);return c.getNode().forEachChild(Oi,(h,d)=>{l=l.set(new et(h),d)}),qo(i,t,e,l,n,r,a,o)}else return t}else{let l=new ot(null);return s.foreach((h,d)=>{const u=mt(e,h);c.isCompleteForPath(u)&&(l=l.set(h,c.getNode().getChild(u)))}),qo(i,t,e,l,n,r,a,o)}}function Sv(i,t,e,s,n){const r=t.serverCache,o=Eh(t,r.getNode(),r.isFullyInitialized()||W(e),r.isFiltered());return Fh(i,o,e,s,Lh,n)}function Pv(i,t,e,s,n,r){let o;if(Wn(s,e)!=null)return t;{const a=new zo(s,t,n),c=t.eventCache.getNode();let l;if(W(e)||B(e)===".priority"){let h;if(t.serverCache.isFullyInitialized())h=Hn(s,ci(t));else{const d=t.serverCache.getNode();b(d instanceof P,"serverChildren would be complete if leaf node"),h=Wo(s,d)}h=h,l=i.filter.updateFullNode(c,h,r)}else{const h=B(e);let d=$o(s,h,t.serverCache);d==null&&t.serverCache.isCompleteForChild(h)&&(d=c.getImmediateChild(h)),d!=null?l=i.filter.updateChild(c,h,d,rt(e),a,r):t.eventCache.getNode().hasChild(h)?l=i.filter.updateChild(c,h,P.EMPTY_NODE,rt(e),a,r):l=c,l.isEmpty()&&t.serverCache.isFullyInitialized()&&(o=Hn(s,ci(t)),o.isLeafNode()&&(l=i.filter.updateFullNode(l,o,r)))}return o=t.serverCache.isFullyInitialized()||Wn(s,Y())!=null,Ts(t,l,o,i.filter.filtersNodes())}}/**
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
*/class Mv{constructor(t,e){this.query_=t,this.eventRegistrations_=[];const s=this.query_._queryParams,n=new Do(s.getIndex()),r=Gy(s);this.processor_=xv(r);const o=e.serverCache,a=e.eventCache,c=n.updateFullNode(P.EMPTY_NODE,o.getNode(),null),l=r.updateFullNode(P.EMPTY_NODE,a.getNode(),null),h=new We(c,o.isFullyInitialized(),n.filtersNodes()),d=new We(l,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Fn(d,h),this.eventGenerator_=new iv(this.query_)}get query(){return this.query_}}function Av(i){return i.viewCache_.serverCache.getNode()}function Rv(i){return Bn(i.viewCache_)}function Dv(i,t){const e=ci(i.viewCache_);return e&&(i.query._queryParams.loadsAllData()||!W(t)&&!e.getImmediateChild(B(t)).isEmpty())?e.getChild(t):null}function Hh(i){return i.eventRegistrations_.length===0}function Nv(i,t){i.eventRegistrations_.push(t)}function Wh(i,t,e){const s=[];if(e){b(t==null,"A cancel should cancel all event registrations.");const n=i.query._path;i.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(e,n);o&&s.push(o)})}if(t){let n=[];for(let r=0;r<i.eventRegistrations_.length;++r){const o=i.eventRegistrations_[r];if(!o.matches(t))n.push(o);else if(t.hasAnyCallback()){n=n.concat(i.eventRegistrations_.slice(r+1));break}}i.eventRegistrations_=n}else i.eventRegistrations_=[];return s}function $h(i,t,e,s){t.type===Jt.MERGE&&t.source.queryId!==null&&(b(ci(i.viewCache_),"We should always have a full cache before handling merges"),b(Bn(i.viewCache_),"Missing event cache, even though we have a server cache"));const n=i.viewCache_,r=Cv(i.processor_,n,t,e,s);return Iv(i.processor_,r.viewCache),b(r.viewCache.serverCache.isFullyInitialized()||!n.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),i.viewCache_=r.viewCache,zh(i,r.changes,r.viewCache.eventCache.getNode(),null)}function Ov(i,t){const e=i.viewCache_.eventCache,s=[];return e.getNode().isLeafNode()||e.getNode().forEachChild(dt,(n,r)=>{s.push(Fi(n,r))}),e.isFullyInitialized()&&s.push(bh(e.getNode())),zh(i,s,e.getNode(),t)}function zh(i,t,e,s){const n=s?[s]:i.eventRegistrations_;return sv(i.eventGenerator_,t,e,n)}/**
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
*/let zn;class jh{constructor(){this.views=new Map}}function Lv(i){b(!zn,"__referenceConstructor has already been defined"),zn=i}function Fv(){return b(zn,"Reference.ts has not been loaded"),zn}function Bv(i){return i.views.size===0}function Vo(i,t,e,s){const n=t.source.queryId;if(n!==null){const r=i.views.get(n);return b(r!=null,"SyncTree gave us an op for an invalid query."),$h(r,t,e,s)}else{let r=[];for(const o of i.views.values())r=r.concat($h(o,t,e,s));return r}}function qh(i,t,e,s,n){const r=t._queryIdentifier,o=i.views.get(r);if(!o){let a=Hn(e,n?s:null),c=!1;a?c=!0:s instanceof P?(a=Wo(e,s),c=!1):(a=P.EMPTY_NODE,c=!1);const l=Fn(new We(a,c,!1),new We(s,n,!1));return new Mv(t,l)}return o}function Uv(i,t,e,s,n,r){const o=qh(i,t,s,n,r);return i.views.has(t._queryIdentifier)||i.views.set(t._queryIdentifier,o),Nv(o,e),Ov(o,e)}function Hv(i,t,e,s){const n=t._queryIdentifier,r=[];let o=[];const a=je(i);if(n==="default")for(const[c,l]of i.views.entries())o=o.concat(Wh(l,e,s)),Hh(l)&&(i.views.delete(c),l.query._queryParams.loadsAllData()||r.push(l.query));else{const c=i.views.get(n);c&&(o=o.concat(Wh(c,e,s)),Hh(c)&&(i.views.delete(n),c.query._queryParams.loadsAllData()||r.push(c.query)))}return a&&!je(i)&&r.push(new(Fv())(t._repo,t._path)),{removed:r,events:o}}function Vh(i){const t=[];for(const e of i.views.values())e.query._queryParams.loadsAllData()||t.push(e);return t}function ze(i,t){let e=null;for(const s of i.views.values())e=e||Dv(s,t);return e}function Yh(i,t){if(t._queryParams.loadsAllData())return jn(i);{const e=t._queryIdentifier;return i.views.get(e)}}function Kh(i,t){return Yh(i,t)!=null}function je(i){return jn(i)!=null}function jn(i){for(const t of i.views.values())if(t.query._queryParams.loadsAllData())return t;return null}/**
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
*/let qn;function Wv(i){b(!qn,"__referenceConstructor has already been defined"),qn=i}function $v(){return b(qn,"Reference.ts has not been loaded"),qn}let zv=1;class Gh{constructor(t){this.listenProvider_=t,this.syncPointTree_=new ot(null),this.pendingWriteTree_=yv(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Jh(i,t,e,s,n){return av(i.pendingWriteTree_,t,e,s,n),n?Ms(i,new ai(kh(),t,e)):[]}function hi(i,t,e=!1){const s=cv(i.pendingWriteTree_,t);if(lv(i.pendingWriteTree_,t)){let n=new ot(null);return s.snap!=null?n=n.set(Y(),!0):Ft(s.children,r=>{n=n.set(new et(r),!0)}),Ms(i,new Ln(s.path,n,e))}else return[]}function Ps(i,t,e){return Ms(i,new ai(Lo(),t,e))}function jv(i,t,e){const s=ot.fromObject(e);return Ms(i,new ks(Lo(),t,s))}function qv(i,t){return Ms(i,new Cs(Lo(),t))}function Vv(i,t,e){const s=Go(i,e);if(s){const n=Jo(s),r=n.path,o=n.queryId,a=At(r,t),c=new Cs(Fo(o),a);return Qo(i,r,c)}else return[]}function Vn(i,t,e,s,n=!1){const r=t._path,o=i.syncPointTree_.get(r);let a=[];if(o&&(t._queryIdentifier==="default"||Kh(o,t))){const c=Hv(o,t,e,s);Bv(o)&&(i.syncPointTree_=i.syncPointTree_.remove(r));const l=c.removed;if(a=c.events,!n){const h=l.findIndex(u=>u._queryParams.loadsAllData())!==-1,d=i.syncPointTree_.findOnPath(r,(u,f)=>je(f));if(h&&!d){const u=i.syncPointTree_.subtree(r);if(!u.isEmpty()){const f=Gv(u);for(let p=0;p<f.length;++p){const m=f[p],_=m.query,v=td(i,m);i.listenProvider_.startListening(Rs(_),As(i,_),v.hashFn,v.onComplete)}}}!d&&l.length>0&&!s&&(h?i.listenProvider_.stopListening(Rs(t),null):l.forEach(u=>{const f=i.queryToTagMap.get(Yn(u));i.listenProvider_.stopListening(Rs(u),f)}))}Jv(i,l)}return a}function Qh(i,t,e,s){const n=Go(i,s);if(n!=null){const r=Jo(n),o=r.path,a=r.queryId,c=At(o,t),l=new ai(Fo(a),c,e);return Qo(i,o,l)}else return[]}function Yv(i,t,e,s){const n=Go(i,s);if(n){const r=Jo(n),o=r.path,a=r.queryId,c=At(o,t),l=ot.fromObject(e),h=new ks(Fo(a),c,l);return Qo(i,o,h)}else return[]}function Yo(i,t,e,s=!1){const n=t._path;let r=null,o=!1;i.syncPointTree_.foreachOnPath(n,(u,f)=>{const p=At(u,n);r=r||ze(f,p),o=o||je(f)});let a=i.syncPointTree_.get(n);a?(o=o||je(a),r=r||ze(a,Y())):(a=new jh,i.syncPointTree_=i.syncPointTree_.set(n,a));let c;r!=null?c=!0:(c=!1,r=P.EMPTY_NODE,i.syncPointTree_.subtree(n).foreachChild((u,f)=>{const p=ze(f,Y());p&&(r=r.updateImmediateChild(u,p))}));const l=Kh(a,t);if(!l&&!t._queryParams.loadsAllData()){const u=Yn(t);b(!i.queryToTagMap.has(u),"View does not exist, but we have a tag");const f=Qv();i.queryToTagMap.set(u,f),i.tagToQueryMap.set(f,u)}const h=Un(i.pendingWriteTree_,n);let d=Uv(a,t,e,h,r,c);if(!l&&!o&&!s){const u=Yh(a,t);d=d.concat(Xv(i,t,u))}return d}function Ko(i,t,e){const s=i.pendingWriteTree_,n=i.syncPointTree_.findOnPath(t,(r,o)=>{const a=At(r,t),c=ze(o,a);if(c)return c});return Rh(s,t,n,e,!0)}function Kv(i,t){const e=t._path;let s=null;i.syncPointTree_.foreachOnPath(e,(l,h)=>{const d=At(l,e);s=s||ze(h,d)});let n=i.syncPointTree_.get(e);n?s=s||ze(n,Y()):(n=new jh,i.syncPointTree_=i.syncPointTree_.set(e,n));const r=s!=null,o=r?new We(s,!0,!1):null,a=Un(i.pendingWriteTree_,t._path),c=qh(n,t,a,r?o.getNode():P.EMPTY_NODE,r);return Rv(c)}function Ms(i,t){return Xh(t,i.syncPointTree_,null,Un(i.pendingWriteTree_,Y()))}function Xh(i,t,e,s){if(W(i.path))return Zh(i,t,e,s);{const n=t.get(Y());e==null&&n!=null&&(e=ze(n,Y()));let r=[];const o=B(i.path),a=i.operationForChild(o),c=t.children.get(o);if(c&&a){const l=e?e.getImmediateChild(o):null,h=Nh(s,o);r=r.concat(Xh(a,c,l,h))}return n&&(r=r.concat(Vo(n,i,s,e))),r}}function Zh(i,t,e,s){const n=t.get(Y());e==null&&n!=null&&(e=ze(n,Y()));let r=[];return t.children.inorderTraversal((o,a)=>{const c=e?e.getImmediateChild(o):null,l=Nh(s,o),h=i.operationForChild(o);h&&(r=r.concat(Zh(h,a,c,l)))}),n&&(r=r.concat(Vo(n,i,s,e))),r}function td(i,t){const e=t.query,s=As(i,e);return{hashFn:()=>(Av(t)||P.EMPTY_NODE).hash(),onComplete:n=>{if(n==="ok")return s?Vv(i,e._path,s):qv(i,e._path);{const r=K_(n,e);return Vn(i,e,null,r)}}}}function As(i,t){const e=Yn(t);return i.queryToTagMap.get(e)}function Yn(i){return i._path.toString()+"$"+i._queryIdentifier}function Go(i,t){return i.tagToQueryMap.get(t)}function Jo(i){const t=i.indexOf("$");return b(t!==-1&&t<i.length-1,"Bad queryKey."),{queryId:i.substr(t+1),path:new et(i.substr(0,t))}}function Qo(i,t,e){const s=i.syncPointTree_.get(t);b(s,"Missing sync point for query tag that we're tracking");const n=Un(i.pendingWriteTree_,t);return Vo(s,e,n,null)}function Gv(i){return i.fold((t,e,s)=>{if(e&&je(e))return[jn(e)];{let n=[];return e&&(n=Vh(e)),Ft(s,(r,o)=>{n=n.concat(o)}),n}})}function Rs(i){return i._queryParams.loadsAllData()&&!i._queryParams.isDefault()?new($v())(i._repo,i._path):i}function Jv(i,t){for(let e=0;e<t.length;++e){const s=t[e];if(!s._queryParams.loadsAllData()){const n=Yn(s),r=i.queryToTagMap.get(n);i.queryToTagMap.delete(n),i.tagToQueryMap.delete(r)}}}function Qv(){return zv++}function Xv(i,t,e){const s=t._path,n=As(i,t),r=td(i,e),o=i.listenProvider_.startListening(Rs(t),n,r.hashFn,r.onComplete),a=i.syncPointTree_.subtree(s);if(n)b(!je(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((l,h,d)=>{if(!W(l)&&h&&je(h))return[jn(h).query];{let u=[];return h&&(u=u.concat(Vh(h).map(f=>f.query))),Ft(d,(f,p)=>{u=u.concat(p)}),u}});for(let l=0;l<c.length;++l){const h=c[l];i.listenProvider_.stopListening(Rs(h),As(i,h))}}return o}/**
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
*/class Xo{constructor(t){this.node_=t}getImmediateChild(t){const e=this.node_.getImmediateChild(t);return new Xo(e)}node(){return this.node_}}class Zo{constructor(t,e){this.syncTree_=t,this.path_=e}getImmediateChild(t){const e=mt(this.path_,t);return new Zo(this.syncTree_,e)}node(){return Ko(this.syncTree_,this.path_)}}const Zv=function(i){return i=i||{},i.timestamp=i.timestamp||new Date().getTime(),i},ed=function(i,t,e){if(!i||typeof i!="object")return i;if(b(".sv"in i,"Unexpected leaf node or priority contents"),typeof i[".sv"]=="string")return tb(i[".sv"],t,e);if(typeof i[".sv"]=="object")return eb(i[".sv"],t);b(!1,"Unexpected server value: "+JSON.stringify(i,null,2))},tb=function(i,t,e){switch(i){case"timestamp":return e.timestamp;default:b(!1,"Unexpected server value: "+i)}},eb=function(i,t,e){i.hasOwnProperty("increment")||b(!1,"Unexpected server value: "+JSON.stringify(i,null,2));const s=i.increment;typeof s!="number"&&b(!1,"Unexpected increment value: "+s);const n=t.node();if(b(n!==null&&typeof n<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!n.isLeafNode())return s;const r=n.getValue();return typeof r!="number"?s:r+s},ib=function(i,t,e,s){return ta(t,new Zo(e,i),s)},id=function(i,t,e){return ta(i,new Xo(t),e)};function ta(i,t,e){const s=i.getPriority().val(),n=ed(s,t.getImmediateChild(".priority"),e);let r;if(i.isLeafNode()){const o=i,a=ed(o.getValue(),t,e);return a!==o.getValue()||n!==o.getPriority().val()?new bt(a,wt(n)):i}else{const o=i;return r=o,n!==o.getPriority().val()&&(r=r.updatePriority(new bt(n))),o.forEachChild(dt,(a,c)=>{const l=ta(c,t.getImmediateChild(a),e);l!==c&&(r=r.updateImmediateChild(a,l))}),r}}/**
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
*/class ea{constructor(t="",e=null,s={children:{},childCount:0}){this.name=t,this.parent=e,this.node=s}}function ia(i,t){let e=t instanceof et?t:new et(t),s=i,n=B(e);for(;n!==null;){const r=wi(s.node.children,n)||{children:{},childCount:0};s=new ea(n,s,r),e=rt(e),n=B(e)}return s}function Ui(i){return i.node.value}function sd(i,t){i.node.value=t,sa(i)}function nd(i){return i.node.childCount>0}function sb(i){return Ui(i)===void 0&&!nd(i)}function Kn(i,t){Ft(i.node.children,(e,s)=>{t(new ea(e,i,s))})}function rd(i,t,e,s){e&&t(i),Kn(i,n=>{rd(n,t,!0)})}function nb(i,t,e){let s=i.parent;for(;s!==null;){if(t(s))return!0;s=s.parent}return!1}function Ds(i){return new et(i.parent===null?i.name:Ds(i.parent)+"/"+i.name)}function sa(i){i.parent!==null&&rb(i.parent,i.name,i)}function rb(i,t,e){const s=sb(e),n=fe(i.node.children,t);s&&n?(delete i.node.children[t],i.node.childCount--,sa(i)):!s&&!n&&(i.node.children[t]=e.node,i.node.childCount++,sa(i))}/**
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
*/const ob=/[\[\].#$\/\u0000-\u001F\u007F]/,ab=/[\[\].#$\u0000-\u001F\u007F]/,na=10*1024*1024,od=function(i){return typeof i=="string"&&i.length!==0&&!ob.test(i)},ad=function(i){return typeof i=="string"&&i.length!==0&&!ab.test(i)},cb=function(i){return i&&(i=i.replace(/^\/*\.info(\/|$)/,"/")),ad(i)},cd=function(i,t,e,s){s&&t===void 0||ra(qr(i,"value"),t,e)},ra=function(i,t,e){const s=e instanceof et?new Ty(e,i):e;if(t===void 0)throw new Error(i+"contains undefined "+oi(s));if(typeof t=="function")throw new Error(i+"contains a function "+oi(s)+" with contents = "+t.toString());if(Al(t))throw new Error(i+"contains "+t.toString()+" "+oi(s));if(typeof t=="string"&&t.length>na/3&&un(t)>na)throw new Error(i+"contains a string greater than "+na+" utf8 bytes "+oi(s)+" ('"+t.substring(0,50)+"...')");if(t&&typeof t=="object"){let n=!1,r=!1;if(Ft(t,(o,a)=>{if(o===".value")n=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!od(o)))throw new Error(i+" contains an invalid key ("+o+") "+oi(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Sy(s,o),ra(i,a,s),Py(s)}),n&&r)throw new Error(i+' contains ".value" child '+oi(s)+" in addition to actual children.")}},ld=function(i,t,e,s){if(!ad(e))throw new Error(qr(i,t)+'was an invalid path = "'+e+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},lb=function(i,t,e,s){e&&(e=e.replace(/^\/*\.info(\/|$)/,"/")),ld(i,t,e)},oa=function(i,t){if(B(t)===".info")throw new Error(i+" failed = Can't modify data under /.info/")},hb=function(i,t){const e=t.path.toString();if(typeof t.repoInfo.host!="string"||t.repoInfo.host.length===0||!od(t.repoInfo.namespace)&&t.repoInfo.host.split(":")[0]!=="localhost"||e.length!==0&&!cb(e))throw new Error(qr(i,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
*/class db{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function aa(i,t){let e=null;for(let s=0;s<t.length;s++){const n=t[s],r=n.getPath();e!==null&&!So(r,e.path)&&(i.eventLists_.push(e),e=null),e===null&&(e={events:[],path:r}),e.events.push(n)}e&&i.eventLists_.push(e)}function hd(i,t,e){aa(i,e),dd(i,s=>So(s,t))}function ne(i,t,e){aa(i,e),dd(i,s=>Gt(s,t)||Gt(t,s))}function dd(i,t){i.recursionDepth_++;let e=!0;for(let s=0;s<i.eventLists_.length;s++){const n=i.eventLists_[s];if(n){const r=n.path;t(r)?(ub(i.eventLists_[s]),i.eventLists_[s]=null):e=!1}}e&&(i.eventLists_=[]),i.recursionDepth_--}function ub(i){for(let t=0;t<i.events.length;t++){const e=i.events[t];if(e!==null){i.events[t]=null;const s=e.getEventRunner();fs&&St("event: "+e.toString()),Di(s)}}}/**
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
*/const fb="repo_interrupt",pb=25;class gb{constructor(t,e,s,n){this.repoInfo_=t,this.forceRestClient_=e,this.authTokenProvider_=s,this.appCheckProvider_=n,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new db,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=On(),this.transactionQueueTree_=new ea,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function mb(i,t,e){if(i.stats_=ko(i.repoInfo_),i.forceRestClient_||X_())i.server_=new Nn(i.repoInfo_,(s,n,r,o)=>{fd(i,s,n,r,o)},i.authTokenProvider_,i.appCheckProvider_),setTimeout(()=>pd(i,!0),0);else{if(typeof e<"u"&&e!==null){if(typeof e!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{gt(e)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}i.persistentConnection_=new be(i.repoInfo_,t,(s,n,r,o)=>{fd(i,s,n,r,o)},s=>{pd(i,s)},s=>{_b(i,s)},i.authTokenProvider_,i.appCheckProvider_,e),i.server_=i.persistentConnection_}i.authTokenProvider_.addTokenChangeListener(s=>{i.server_.refreshAuthToken(s)}),i.appCheckProvider_.addTokenChangeListener(s=>{i.server_.refreshAppCheckToken(s.token)}),i.statsReporter_=sy(i.repoInfo_,()=>new ev(i.stats_,i.server_)),i.infoData_=new Jy,i.infoSyncTree_=new Gh({startListening:(s,n,r,o)=>{let a=[];const c=i.infoData_.getNode(s._path);return c.isEmpty()||(a=Ps(i.infoSyncTree_,s._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),la(i,"connected",!1),i.serverSyncTree_=new Gh({startListening:(s,n,r,o)=>(i.server_.listen(s,r,n,(a,c)=>{const l=o(a,c);ne(i.eventQueue_,s._path,l)}),[]),stopListening:(s,n)=>{i.server_.unlisten(s,n)}})}function ud(i){const t=i.infoData_.getNode(new et(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function ca(i){return Zv({timestamp:ud(i)})}function fd(i,t,e,s,n){i.dataUpdateCount++;const r=new et(t);e=i.interceptServerDataCallback_?i.interceptServerDataCallback_(t,e):e;let o=[];if(n)if(s){const c=dn(e,l=>wt(l));o=Yv(i.serverSyncTree_,r,c,n)}else{const c=wt(e);o=Qh(i.serverSyncTree_,r,c,n)}else if(s){const c=dn(e,l=>wt(l));o=jv(i.serverSyncTree_,r,c)}else{const c=wt(e);o=Ps(i.serverSyncTree_,r,c)}let a=r;o.length>0&&(a=Jn(i,r)),ne(i.eventQueue_,a,o)}function pd(i,t){la(i,"connected",t),t===!1&&bb(i)}function _b(i,t){Ft(t,(e,s)=>{la(i,e,s)})}function la(i,t,e){const s=new et("/.info/"+t),n=wt(e);i.infoData_.updateSnapshot(s,n);const r=Ps(i.infoSyncTree_,s,n);ne(i.eventQueue_,s,r)}function gd(i){return i.nextWriteId_++}function yb(i,t,e){const s=Kv(i.serverSyncTree_,t);return s!=null?Promise.resolve(s):i.server_.get(t).then(n=>{const r=wt(n).withIndex(t._queryParams.getIndex());Yo(i.serverSyncTree_,t,e,!0);let o;if(t._queryParams.loadsAllData())o=Ps(i.serverSyncTree_,t._path,r);else{const a=As(i.serverSyncTree_,t);o=Qh(i.serverSyncTree_,t._path,r,a)}return ne(i.eventQueue_,t._path,o),Vn(i.serverSyncTree_,t,e,null,!0),r},n=>(Gn(i,"get for query "+gt(t)+" failed: "+n),Promise.reject(new Error(n))))}function vb(i,t,e,s,n){Gn(i,"set",{path:t.toString(),value:e,priority:s});const r=ca(i),o=wt(e,s),a=Ko(i.serverSyncTree_,t),c=id(o,a,r),l=gd(i),h=Jh(i.serverSyncTree_,t,c,l,!0);aa(i.eventQueue_,h),i.server_.put(t.toString(),o.val(!0),(u,f)=>{const p=u==="ok";p||Lt("set at "+t+" failed: "+u);const m=hi(i.serverSyncTree_,l,!p);ne(i.eventQueue_,t,m),Ib(i,n,u,f)});const d=wd(i,t);Jn(i,d),ne(i.eventQueue_,d,[])}function bb(i){Gn(i,"onDisconnectEvents");const t=ca(i),e=On();Oo(i.onDisconnect_,Y(),(n,r)=>{const o=ib(n,r,i.serverSyncTree_,t);Ih(e,n,o)});let s=[];Oo(e,Y(),(n,r)=>{s=s.concat(Ps(i.serverSyncTree_,n,r));const o=wd(i,n);Jn(i,o)}),i.onDisconnect_=On(),ne(i.eventQueue_,Y(),s)}function wb(i,t,e){let s;B(t._path)===".info"?s=Yo(i.infoSyncTree_,t,e):s=Yo(i.serverSyncTree_,t,e),hd(i.eventQueue_,t._path,s)}function md(i,t,e){let s;B(t._path)===".info"?s=Vn(i.infoSyncTree_,t,e):s=Vn(i.serverSyncTree_,t,e),hd(i.eventQueue_,t._path,s)}function xb(i){i.persistentConnection_&&i.persistentConnection_.interrupt(fb)}function Gn(i,...t){let e="";i.persistentConnection_&&(e=i.persistentConnection_.id+":"),St(e,...t)}function Ib(i,t,e,s){t&&Di(()=>{if(e==="ok")t(null);else{const n=(e||"error").toUpperCase();let r=n;s&&(r+=": "+s);const o=new Error(r);o.code=n,t(o)}})}function _d(i,t,e){return Ko(i.serverSyncTree_,t,e)||P.EMPTY_NODE}function ha(i,t=i.transactionQueueTree_){if(t||Qn(i,t),Ui(t)){const e=vd(i,t);b(e.length>0,"Sending zero length transaction queue"),e.every(s=>s.status===0)&&Cb(i,Ds(t),e)}else nd(t)&&Kn(t,e=>{ha(i,e)})}function Cb(i,t,e){const s=e.map(l=>l.currentWriteId),n=_d(i,t,s);let r=n;const o=n.hash();for(let l=0;l<e.length;l++){const h=e[l];b(h.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),h.status=1,h.retryCount++;const d=At(t,h.path);r=r.updateChild(d,h.currentOutputSnapshotRaw)}const a=r.val(!0),c=t;i.server_.put(c.toString(),a,l=>{Gn(i,"transaction put response",{path:c.toString(),status:l});let h=[];if(l==="ok"){const d=[];for(let u=0;u<e.length;u++)e[u].status=2,h=h.concat(hi(i.serverSyncTree_,e[u].currentWriteId)),e[u].onComplete&&d.push(()=>e[u].onComplete(null,!0,e[u].currentOutputSnapshotResolved)),e[u].unwatcher();Qn(i,ia(i.transactionQueueTree_,t)),ha(i,i.transactionQueueTree_),ne(i.eventQueue_,t,h);for(let u=0;u<d.length;u++)Di(d[u])}else{if(l==="datastale")for(let d=0;d<e.length;d++)e[d].status===3?e[d].status=4:e[d].status=0;else{Lt("transaction at "+c.toString()+" failed: "+l);for(let d=0;d<e.length;d++)e[d].status=4,e[d].abortReason=l}Jn(i,t)}},o)}function Jn(i,t){const e=yd(i,t),s=Ds(e),n=vd(i,e);return kb(i,n,s),s}function kb(i,t,e){if(t.length===0)return;const s=[];let n=[];const r=t.filter(o=>o.status===0).map(o=>o.currentWriteId);for(let o=0;o<t.length;o++){const a=t[o],c=At(e,a.path);let l=!1,h;if(b(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),a.status===4)l=!0,h=a.abortReason,n=n.concat(hi(i.serverSyncTree_,a.currentWriteId,!0));else if(a.status===0)if(a.retryCount>=pb)l=!0,h="maxretry",n=n.concat(hi(i.serverSyncTree_,a.currentWriteId,!0));else{const d=_d(i,a.path,r);a.currentInputSnapshot=d;const u=t[o].update(d.val());if(u!==void 0){ra("transaction failed: Data returned ",u,a.path);let f=wt(u);typeof u=="object"&&u!=null&&fe(u,".priority")||(f=f.updatePriority(d.getPriority()));const p=a.currentWriteId,m=ca(i),_=id(f,d,m);a.currentOutputSnapshotRaw=f,a.currentOutputSnapshotResolved=_,a.currentWriteId=gd(i),r.splice(r.indexOf(p),1),n=n.concat(Jh(i.serverSyncTree_,a.path,_,a.currentWriteId,a.applyLocally)),n=n.concat(hi(i.serverSyncTree_,p,!0))}else l=!0,h="nodata",n=n.concat(hi(i.serverSyncTree_,a.currentWriteId,!0))}ne(i.eventQueue_,e,n),n=[],l&&(t[o].status=2,function(d){setTimeout(d,Math.floor(0))}(t[o].unwatcher),t[o].onComplete&&(h==="nodata"?s.push(()=>t[o].onComplete(null,!1,t[o].currentInputSnapshot)):s.push(()=>t[o].onComplete(new Error(h),!1,null))))}Qn(i,i.transactionQueueTree_);for(let o=0;o<s.length;o++)Di(s[o]);ha(i,i.transactionQueueTree_)}function yd(i,t){let e,s=i.transactionQueueTree_;for(e=B(t);e!==null&&Ui(s)===void 0;)s=ia(s,e),t=rt(t),e=B(t);return s}function vd(i,t){const e=[];return bd(i,t,e),e.sort((s,n)=>s.order-n.order),e}function bd(i,t,e){const s=Ui(t);if(s)for(let n=0;n<s.length;n++)e.push(s[n]);Kn(t,n=>{bd(i,n,e)})}function Qn(i,t){const e=Ui(t);if(e){let s=0;for(let n=0;n<e.length;n++)e[n].status!==2&&(e[s]=e[n],s++);e.length=s,sd(t,e.length>0?e:void 0)}Kn(t,s=>{Qn(i,s)})}function wd(i,t){const e=Ds(yd(i,t)),s=ia(i.transactionQueueTree_,t);return nb(s,n=>{da(i,n)}),da(i,s),rd(s,n=>{da(i,n)}),e}function da(i,t){const e=Ui(t);if(e){const s=[];let n=[],r=-1;for(let o=0;o<e.length;o++)e[o].status===3||(e[o].status===1?(b(r===o-1,"All SENT items should be at beginning of queue."),r=o,e[o].status=3,e[o].abortReason="set"):(b(e[o].status===0,"Unexpected transaction status in abort"),e[o].unwatcher(),n=n.concat(hi(i.serverSyncTree_,e[o].currentWriteId,!0)),e[o].onComplete&&s.push(e[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?sd(t,void 0):e.length=r+1,ne(i.eventQueue_,Ds(t),n);for(let o=0;o<s.length;o++)Di(s[o])}}/**
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
*/function Eb(i){let t="";const e=i.split("/");for(let s=0;s<e.length;s++)if(e[s].length>0){let n=e[s];try{n=decodeURIComponent(n.replace(/\+/g," "))}catch{}t+="/"+n}return t}function Tb(i){const t={};i.charAt(0)==="?"&&(i=i.substring(1));for(const e of i.split("&")){if(e.length===0)continue;const s=e.split("=");s.length===2?t[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):Lt(`Invalid query segment '${e}' in query '${i}'`)}return t}const xd=function(i,t){const e=Sb(i),s=e.namespace;e.domain==="firebase.com"&&ve(e.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&e.domain!=="localhost"&&ve("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),e.secure||z_();const n=e.scheme==="ws"||e.scheme==="wss";return{repoInfo:new jl(e.host,e.secure,s,n,t,"",s!==e.subdomain),path:new et(e.pathString)}},Sb=function(i){let t="",e="",s="",n="",r="",o=!0,a="https",c=443;if(typeof i=="string"){let l=i.indexOf("//");l>=0&&(a=i.substring(0,l-1),i=i.substring(l+2));let h=i.indexOf("/");h===-1&&(h=i.length);let d=i.indexOf("?");d===-1&&(d=i.length),t=i.substring(0,Math.min(h,d)),h<d&&(n=Eb(i.substring(h,d)));const u=Tb(i.substring(Math.min(i.length,d)));l=t.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(t.substring(l+1),10)):l=t.length;const f=t.slice(0,l);if(f.toLowerCase()==="localhost")e="localhost";else if(f.split(".").length<=2)e=f;else{const p=t.indexOf(".");s=t.substring(0,p).toLowerCase(),e=t.substring(p+1),r=s}"ns"in u&&(r=u.ns)}return{host:t,port:c,domain:e,subdomain:s,secure:o,scheme:a,pathString:n,namespace:r}};/**
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
*/const Id="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",Pb=function(){let i=0;const t=[];return function(e){const s=e===i;i=e;let n;const r=new Array(8);for(n=7;n>=0;n--)r[n]=Id.charAt(e%64),e=Math.floor(e/64);b(e===0,"Cannot push at time == 0");let o=r.join("");if(s){for(n=11;n>=0&&t[n]===63;n--)t[n]=0;t[n]++}else for(n=0;n<12;n++)t[n]=Math.floor(Math.random()*64);for(n=0;n<12;n++)o+=Id.charAt(t[n]);return b(o.length===20,"nextPushId: Length should be 20."),o}}();/**
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
*/class Mb{constructor(t,e,s,n){this.eventType=t,this.eventRegistration=e,this.snapshot=s,this.prevName=n}getPath(){const t=this.snapshot.ref;return this.eventType==="value"?t._path:t.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+gt(this.snapshot.exportVal())}}class Ab{constructor(t,e,s){this.eventRegistration=t,this.error=e,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
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
*/class ua{constructor(t,e){this.snapshotCallback=t,this.cancelCallback=e}onValue(t,e){this.snapshotCallback.call(null,t,e)}onCancel(t){return b(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,t)}get hasCancelCallback(){return!!this.cancelCallback}matches(t){return this.snapshotCallback===t.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===t.snapshotCallback.userCallback&&this.snapshotCallback.context===t.snapshotCallback.context}}/**
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
*/class fa{constructor(t,e,s,n){this._repo=t,this._path=e,this._queryParams=s,this._orderByCalled=n}get key(){return W(this._path)?null:ch(this._path)}get ref(){return new xe(this._repo,this._path)}get _queryIdentifier(){const t=xh(this._queryParams),e=bo(t);return e==="{}"?"default":e}get _queryObject(){return xh(this._queryParams)}isEqual(t){if(t=Tt(t),!(t instanceof fa))return!1;const e=this._repo===t._repo,s=So(this._path,t._path),n=this._queryIdentifier===t._queryIdentifier;return e&&s&&n}toJSON(){return this.toString()}toString(){return this._repo.toString()+Ey(this._path)}}class xe extends fa{constructor(t,e){super(t,e,new No,!1)}get parent(){const t=hh(this._path);return t===null?null:new xe(this._repo,t)}get root(){let t=this;for(;t.parent!==null;)t=t.parent;return t}}class Ns{constructor(t,e,s){this._node=t,this.ref=e,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(t){const e=new et(t),s=Os(this.ref,t);return new Ns(this._node.getChild(e),s,dt)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(t){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(e,s)=>t(new Ns(s,Os(this.ref,e),dt)))}hasChild(t){const e=new et(t);return!this._node.getChild(e).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function N(i,t){return i=Tt(i),i._checkNotDeleted("ref"),t!==void 0?Os(i._root,t):i._root}function Os(i,t){return i=Tt(i),B(i._path)===null?lb("child","path",t):ld("child","path",t),new xe(i._repo,mt(i._path,t))}function Rb(i,t){i=Tt(i),oa("push",i._path),cd("push",t,i._path,!0);const e=ud(i._repo),s=Pb(e),n=Os(i,s),r=Os(i,s);let o;return t!=null?o=Ct(r,t).then(()=>r):o=Promise.resolve(r),n.then=o.then.bind(o),n.catch=o.then.bind(o,void 0),n}function re(i){return oa("remove",i._path),Ct(i,null)}function Ct(i,t){i=Tt(i),oa("set",i._path),cd("set",t,i._path,!1);const e=new hn;return vb(i._repo,i._path,t,null,e.wrapCallback(()=>{})),e.promise}function Hi(i){i=Tt(i);const t=new ua(()=>{}),e=new Ls(t);return yb(i._repo,i,e).then(s=>new Ns(s,new xe(i._repo,i._path),i._queryParams.getIndex()))}class Ls{constructor(t){this.callbackContext=t}respondsTo(t){return t==="value"}createEvent(t,e){const s=e._queryParams.getIndex();return new Mb("value",this,new Ns(t.snapshotNode,new xe(e._repo,e._path),s))}getEventRunner(t){return t.getEventType()==="cancel"?()=>this.callbackContext.onCancel(t.error):()=>this.callbackContext.onValue(t.snapshot,null)}createCancelEvent(t,e){return this.callbackContext.hasCancelCallback?new Ab(this,t,e):null}matches(t){return t instanceof Ls?!t.callbackContext||!this.callbackContext?!0:t.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function Db(i,t,e,s,n){const r=new ua(e,void 0),o=new Ls(r);return wb(i._repo,i,o),()=>md(i._repo,i,o)}function qe(i,t,e,s){return Db(i,"value",t)}function Nb(i,t,e){let s=null;const n=e?new ua(e):null;s=new Ls(n),md(i._repo,i,s)}Lv(xe),Wv(xe);/**
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
*/const Ob="FIREBASE_DATABASE_EMULATOR_HOST",pa={};let Lb=!1;function Fb(i,t,e,s){const n=t.lastIndexOf(":"),r=t.substring(0,n),o=bi(r);i.repoInfo_=new jl(t,o,i.repoInfo_.namespace,i.repoInfo_.webSocketOnly,i.repoInfo_.nodeAdmin,i.repoInfo_.persistenceKey,i.repoInfo_.includeNamespaceInQueryParams,!0,e),s&&(i.authTokenProvider_=s)}function Bb(i,t,e,s,n){let r=s||i.options.databaseURL;r===void 0&&(i.options.projectId||ve("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),St("Using default host for project ",i.options.projectId),r=`${i.options.projectId}-default-rtdb.firebaseio.com`);let o=xd(r,n),a=o.repoInfo,c;typeof process<"u"&&Cl&&(c=Cl[Ob]),c?(r=`http://${c}?ns=${a.namespace}`,o=xd(r,n),a=o.repoInfo):o.repoInfo.secure;const l=new ty(i.name,i.options,t);hb("Invalid Firebase Database URL",o),W(o.path)||ve("Database URL must point to the root of a Firebase Database (not including a child path).");const h=Hb(a,i,l,new Z_(i,e));return new Wb(h,i)}function Ub(i,t){const e=pa[t];(!e||e[i.key]!==i)&&ve(`Database ${t}(${i.repoInfo_}) has already been deleted.`),xb(i),delete e[i.key]}function Hb(i,t,e,s){let n=pa[t.name];n||(n={},pa[t.name]=n);let r=n[i.toURLString()];return r&&ve("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new gb(i,Lb,e,s),n[i.toURLString()]=r,r}class Wb{constructor(t,e){this._repoInternal=t,this.app=e,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(mb(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new xe(this._repo,Y())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Ub(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(t){this._rootInternal===null&&ve("Cannot call "+t+" on a deleted database.")}}function $b(i=yc(),t){const e=io(i,"database").getImmediate({identifier:t});if(!e._instanceStarted){const s=Vf("database");s&&zb(e,...s)}return e}function zb(i,t,e,s={}){i=Tt(i),i._checkNotDeleted("useEmulator");const n=`${t}:${e}`,r=i._repoInternal;if(i._instanceStarted){if(n===i._repoInternal.repoInfo_.host&&Xe(s,r.repoInfo_.emulatorOptions))return;ve("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)s.mockUserToken&&ve('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Tn(Tn.OWNER);else if(s.mockUserToken){const a=typeof s.mockUserToken=="string"?s.mockUserToken:Yf(s.mockUserToken,i.app.options.projectId);o=new Tn(a)}bi(t)&&(nc(t),oc("Database",!0)),Fb(r,n,s,o)}/**
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
*/function jb(i){F_(Ci),Ii(new Ze("database",(t,{instanceIdentifier:e})=>{const s=t.getProvider("app").getImmediate(),n=t.getProvider("auth-internal"),r=t.getProvider("app-check-internal");return Bb(s,n,r,e)},"PUBLIC").setMultipleInstances(!0)),Re(kl,El,i),Re(kl,El,"esm2020")}/**
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
*/const qb={".sv":"timestamp"};function di(){return qb}be.prototype.simpleListen=function(i,t){this.sendRequest("q",{p:i},t)},be.prototype.echo=function(i,t){this.sendRequest("echo",{d:i},t)},jb();const Vb={apiKey:"AIzaSyCuOjiHa8C0jgAte40E774CRJROTWTUdmg",authDomain:"hsg-party-tracker.firebaseapp.com",databaseURL:"https://hsg-party-tracker-default-rtdb.europe-west1.firebasedatabase.app",projectId:"hsg-party-tracker",storageBucket:"hsg-party-tracker.firebasestorage.app",messagingSenderId:"1047483086606",appId:"1:1047483086606:web:a02d77baacd21166fb095f",measurementId:"G-VFS4W30Z7P"};let Xn=null,Cd=null,kd=null,Ed=!1;function Yb(){if(Ed)return console.log("Firebase already initialized"),!0;try{return vc().length?Xn=vc()[0]:Xn=_c(Vb),Cd=O_(Xn),kd=$b(Xn),Ed=!0,console.log("✅ Firebase initialized successfully"),!0}catch(i){return console.error("❌ Firebase initialization error:",i),typeof window<"u"&&window.showNotification&&window.showNotification("Failed to connect to Firebase","error"),!1}}function ga(){return Cd||(console.error("Firebase Auth not initialized. Call initializeFirebase() first."),null)}function Q(){return kd||(console.error("Firebase Database not initialized. Call initializeFirebase() first."),null)}const Zn=(i,t)=>{const e=Q();return e?typeof i=="string"?N(e,i):t!==void 0?N(i,t):N(e,i):null},Td=(i,t)=>i?Ct(i,t):Promise.reject("No ref provided"),Sd=i=>i?Hi(i):Promise.reject("No ref provided"),Fs={currentUser:null,userData:{},partyData:{},partyStartTime:Date.now(),deviceData:{},friendsData:{},friendRequests:[],currentGame:null,gameScores:{team1:0,team2:0},achievements:{firstTimer:!0,responsible:!1,gameMaster:!1,partyAnimal:!1,guardianAngel:!1,hydroHomie:!1,danceMachine:!1,sunriseWarrior:!1},userAchievements:{},locationHistory:[],drinkHistory:[],chartVisible:!0,isSignUp:!1,isInitialized:!1};function O(){return Fs}function oe(i){return Fs[i]}function xt(i,t){Fs[i]=t}function Pd(i){Fs.currentUser=i}function ct(){return Fs.currentUser}const Wi={NETWORK:"network",AUTH:"auth",DATABASE:"database",VALIDATION:"validation",UNKNOWN:"unknown"},tr={"network/offline":"You appear to be offline. Please check your internet connection.","network/timeout":"The request took too long. Please try again.","network/server-error":"Server is having issues. Please try again later.","auth/invalid-email":"Please enter a valid email address.","auth/user-disabled":"This account has been disabled.","auth/user-not-found":"No account found with this email.","auth/wrong-password":"Incorrect password. Please try again.","auth/email-already-in-use":"An account already exists with this email.","auth/weak-password":"Password should be at least 6 characters.","auth/invalid-credential":"Invalid login credentials. Please try again.","auth/too-many-requests":"Too many failed attempts. Please try again later.","auth/network-request-failed":"Network error. Please check your connection.","database/permission-denied":"You don't have permission to perform this action.","database/disconnected":"Lost connection to database. Reconnecting...","database/write-failed":"Failed to save data. Please try again.",unknown:"Something went wrong. Please try again."};function ma(i,t=""){console.error(`Error in ${t}:`,i);const e=Kb(i),s=Gb(i),n=Jb(s,i);return Qb(n),{type:e,code:s,message:n,originalError:i}}function Kb(i){return i?i.code==="network-request-failed"||i.message?.includes("network")||i.message?.includes("fetch")?Wi.NETWORK:i.code?.startsWith("auth/")?Wi.AUTH:i.code?.startsWith("database/")||i.code==="permission-denied"?Wi.DATABASE:i.name==="ValidationError"?Wi.VALIDATION:Wi.UNKNOWN:Wi.UNKNOWN}function Gb(i){return i?.code?i.code:i?.message?.includes("network")?"network/offline":i?.message?.includes("permission")?"database/permission-denied":"unknown"}function Jb(i,t){if(tr[i])return tr[i];if(t?.message&&typeof t.message=="string"){const e=t.message.replace(/Firebase: /g,"").replace(/Error \(auth\/[^)]+\): /g,"").replace(/\.$/,"");return e.includes("(")||e.includes(")")||e.length>100?tr.unknown:e}return tr.unknown}function Qb(i,t){window.showNotification?window.showNotification(i,"error"):alert(`Error: ${i}`)}window.addEventListener("online",()=>{window.showNotification&&window.showNotification("Back online!","success")}),window.addEventListener("offline",()=>{window.showNotification&&window.showNotification("You are offline. Some features may not work.","warning")});function Xb(i,t,e){const s=[];switch(t){case"email":i?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i)||s.push("Please enter a valid email address"):s.push(`${e} is required`);break;case"password":i?i.length<6&&s.push("Password must be at least 6 characters"):s.push(`${e} is required`);break;case"username":i?i.length<3?s.push("Username must be at least 3 characters"):/^[a-zA-Z0-9_]+$/.test(i)||s.push("Username can only contain letters, numbers, and underscores"):s.push(`${e} is required`);break;case"deviceId":i?i.match(/^HSG_[a-zA-Z0-9]+$/)||s.push("Device ID must start with HSG_ followed by letters/numbers"):s.push(`${e} is required`);break}return s}let er=!1;function Zb(){document.getElementById("authContainer").style.display="flex",document.getElementById("userProfile").style.display="none",document.querySelector(".container").style.display="none"}function tw(){document.getElementById("authContainer").style.display="none",document.getElementById("userProfile").style.display="block",document.querySelector(".container").style.display="block"}function Bs(i){const t=document.getElementById("authError");t.textContent=i,t.classList.add("show"),Us(),setTimeout(()=>{t.classList.remove("show")},5e3)}function ew(){document.getElementById("authLoading").classList.add("show"),document.getElementById("authSubmitBtn").disabled=!0}function Us(){document.getElementById("authLoading").classList.remove("show"),document.getElementById("authSubmitBtn").disabled=!1}function iw(){er=!er,er?(document.getElementById("authTitle").textContent="Create Your Account",document.getElementById("authButton").textContent="Sign Up",document.getElementById("usernameGroup").style.display="block",document.getElementById("authToggleText").textContent="Already have an account?",document.getElementById("authToggleLink").textContent="Login"):(document.getElementById("authTitle").textContent="Welcome Back",document.getElementById("authButton").textContent="Login",document.getElementById("usernameGroup").style.display="none",document.getElementById("authToggleText").textContent="Don't have an account?",document.getElementById("authToggleLink").textContent="Sign up")}async function sw(i){i.preventDefault();const t=document.getElementById("authEmail").value.trim(),e=document.getElementById("authPassword").value,s=document.getElementById("authUsername").value.trim();if(!t||!e){Bs("Please fill in all fields");return}if(e.length<6){Bs("Password must be at least 6 characters");return}ew();try{const n=ga(),r=Q();if(!er)await bm(n,t,e),ir("✅ Welcome back!","success");else{if(!s||s.length<3){Bs("Username must be at least 3 characters"),Us();return}if((await Sd(Zn(r,"usernames/"+s.toLowerCase()))).exists()){Bs("Username already taken"),Us();return}const o=(await vm(n,t,e)).user;await Td(Zn(r,"users/"+o.uid),{username:s,email:t,createdAt:new Date().toISOString(),devices:{},friends:{},achievements:{},settings:{notifications:!0,shareLocation:!1,publicProfile:!0}}),await Td(Zn(r,"usernames/"+s.toLowerCase()),o.uid),ir("✅ Account created successfully!","success")}Us()}catch(n){Us();const r=ma(n,"Authentication");Bs(r.message)}}async function nw(){try{const i=ga();await Cm(i),ir("👋 Signed out successfully"),location.reload()}catch(i){const t=ma(i,"Sign Out");ir(t.message,"error")}}function rw(i){const t=ga();Im(t,e=>{e?(Pd(e),i(e)):(Pd(null),Zb())})}async function ow(i){try{const t=Q(),e=(await Sd(Zn(t,"users/"+i.uid))).val()||{},s=e.username||i.email.split("@")[0];document.getElementById("profileName").textContent=s,document.getElementById("profileEmail").textContent=i.email,document.getElementById("settingsUsername").textContent=s,document.getElementById("settingsEmail").textContent=i.email,document.getElementById("username").value=e.username||"",document.getElementById("emailDisplay").value=i.email,document.getElementById("linkedEmail").textContent=i.email;const n=s.charAt(0).toUpperCase();return document.getElementById("profileInitial").textContent=n,xt("userData",e),e}catch(t){throw console.error("Error loading user data:",t),t}}function ir(i,t="success"){const e=document.createElement("div");e.className=`notification ${t}`,e.textContent=i,e.onclick=()=>e.remove(),document.body.appendChild(e),setTimeout(()=>{e.parentNode&&e.remove()},4e3)}function w(i,t="success"){const e=document.createElement("div");e.className=`notification ${t}`,e.textContent=i,e.onclick=()=>e.remove(),document.body.appendChild(e),setTimeout(()=>{e.parentNode&&e.remove()},4e3)}window.showNotification=w;const Hs={};function aw(){const i=ct();if(!i)return;const t=Q();qe(N(t,"users/"+i.uid+"/devices"),e=>{const s=e.val()||{};xt("deviceData",s),hw(),document.getElementById("deviceCount").textContent=Object.keys(s).length,Object.keys(s).forEach(n=>{cw(n)})})}async function Md(){const i=document.getElementById("deviceIdInput").value.trim().toUpperCase(),t=Xb(i,"deviceId","Device ID");if(t.length>0){w(t[0],"error");return}try{const e=Q(),s=ct();if(!(await Hi(N(e,"readings/"+i))).exists()){w("❌ Device not found. Make sure it's connected.","error");return}if(oe("deviceData")[i]){w("ℹ️ Device already paired");return}await Ct(N(e,"users/"+s.uid+"/devices/"+i),{pairedAt:di(),name:"My Breathalyzer"}),document.getElementById("deviceIdInput").value="",w("✅ Device paired successfully!","success")}catch(e){const s=ma(e,"Device Pairing");w(s.message,"error")}}function cw(i){if(Hs[i])return;const t=Q(),e=qe(N(t,"readings/"+i),s=>{const n=s.val();n&&lw(i,n)});Hs[i]=e}function lw(i,t){let e=oe("partyData")||{};e[i]||(e[i]={name:oe("userData").username||"You",bac:0,lastUpdate:Date.now(),location:"Party",trend:"steady",history:[],isOwn:!0});const s=e[i].bac;e[i].bac=t.bac||0,e[i].lastUpdate=Date.now(),e[i].trend=t.bac>s?"up":t.bac<s?"down":"steady",e[i].history.push({time:Date.now(),value:t.bac}),e[i].history.length>50&&e[i].history.shift(),xt("partyData",e),window.updateUI&&window.updateUI(),t.bac>=.08&&w(`⚠️ Your BAC is too high: ${t.bac.toFixed(3)}‰`,"error")}function hw(){const i=document.getElementById("deviceList");if(!i)return;const t=oe("deviceData")||{};if(i.innerHTML="",Object.keys(t).length===0){i.innerHTML='<p style="text-align: center; opacity: 0.7;">No devices paired yet</p>';return}const e=oe("partyData")||{};Object.entries(t).forEach(([s,n])=>{const r=e[s],o=document.createElement("div");o.className="device-item",o.innerHTML=`
            <div class="device-info">
                <h4>${n.name||"Breathalyzer"}</h4>
                <p>ID: ${s}</p>
                <p>Last Reading: ${r?r.bac.toFixed(3)+"‰":"No data"}</p>
            </div>
            <div>
                <button class="btn" onclick="renameDevice('${s}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger" onclick="unpairDevice('${s}')">
                    <i class="fas fa-unlink"></i>
                </button>
            </div>
        `,i.appendChild(o)})}async function Ad(i){if(confirm("Unpair this device?")){const t=Q(),e=ct();if(await re(N(t,"users/"+e.uid+"/devices/"+i)),Hs[i]){const s=Q();Nb(N(s,"readings/"+i),"value",Hs[i]),delete Hs[i]}w("🔓 Device unpaired")}}async function Rd(i){const t=oe("deviceData"),e=prompt("Enter new name for device:",t[i]?.name||"My Breathalyzer");if(e){const s=Q(),n=ct();await Ct(N(s,"users/"+n.uid+"/devices/"+i+"/name"),e),w("✏️ Device renamed")}}window.pairDeviceById=Md,window.unpairDevice=Ad,window.renameDevice=Rd;const $i={beer:{amount:330,alcohol:5,emoji:"🍺"},wine:{amount:150,alcohol:12,emoji:"🍷"},shot:{amount:40,alcohol:40,emoji:"🥃"},cocktail:{amount:200,alcohol:15,emoji:"🍸"},mixed:{amount:250,alcohol:10,emoji:"🥤"},champagne:{amount:150,alcohol:12,emoji:"🥂"},water:{amount:250,alcohol:0,emoji:"💧"},other:{amount:200,alcohol:5,emoji:"🍹"}},ui={SOBER:{max:.02,class:"bac-safe",text:"Sober",emoji:"😊"},BUZZED:{max:.05,class:"bac-caution",text:"Buzzed",emoji:"😎"},IMPAIRED:{max:.08,class:"bac-danger",text:"No Driving!",emoji:"🚫"},DRUNK:{max:1/0,class:"bac-critical",text:"Too Much!",emoji:"🤢"}};function dw(i){return i<ui.SOBER.max?ui.SOBER:i<ui.BUZZED.max?ui.BUZZED:i<ui.IMPAIRED.max?ui.IMPAIRED:ui.DRUNK}function sr(){try{uw(),fw(),pw(),gw(),mw()}catch(i){console.error("UI update failed:",i)}}function uw(){const i=document.getElementById("friendsGrid");if(!i)return;const t=oe("partyData")||{};i.innerHTML="",Object.entries(t).forEach(([e,s])=>{const n=dw(s.bac),r=yw(s.lastUpdate),o=document.createElement("div");o.className="card friend-card",o.onclick=()=>_w(s);const a=s.trend==="up"?"📈":s.trend==="down"?"📉":"➡️",c=s.trend==="up"?"trend-up":s.trend==="down"?"trend-down":"",l=s.isOwn?"👤":s.permission==="guardian"?"🛡️":"👥";o.innerHTML=`
            <div class="friend-avatar">${l}</div>
            <div class="friend-name">${s.name}</div>
            <div class="bac-value ${n.class}">
                ${s.bac.toFixed(3)}‰
                <span class="bac-trend ${c}">${a}</span>
            </div>
            <div class="friend-status">
                <span class="status-badge">${n.emoji} ${n.text}</span>
            </div>
            <div class="location-tag">
                <i class="fas fa-map-marker-alt"></i> ${s.location}
            </div>
            <div class="last-update" style="margin-top: 10px; opacity: 0.7; font-size: 0.9em;">
                Updated ${r}
            </div>
        `,s.bac>=.08&&o.classList.add("pulse"),i.appendChild(o)})}function fw(){const i=oe("partyData")||{},t=Object.values(i),e=t.reduce((c,l)=>c+l.bac,0)/t.length||0,s=document.getElementById("partyAverage");s&&(s.textContent=e.toFixed(3)+"‰");const n=t.filter(c=>c.bac<.02).length,r=document.getElementById("safeFriends");r&&(r.textContent=n);const o=15-Date.now()%(900*1e3)/6e4,a=document.getElementById("hydrationTime");a&&(a.textContent=Math.floor(o)+"m")}function pw(){const i=document.getElementById("leaderboardList");if(!i)return;const t=oe("partyData")||{};i.innerHTML="";const e=Object.values(t).sort((n,r)=>r.bac-n.bac).slice(0,5),s=[n=>`🏆 ${n} is absolutely dominating the party! Living their best life!`,n=>`🥈 ${n} is so close! One more and they could take the crown!`,n=>`🥉 ${n} is holding strong! The podium suits them well!`,n=>`${n} is warming up! The night is still young!`,n=>`${n} is taking it easy... or are they just getting started? 🤔`];e.forEach((n,r)=>{const o=document.createElement("div");o.className="leaderboard-item",o.onclick=()=>{r===0&&window.confetti&&confetti({particleCount:100,spread:70,origin:{y:.6}});const a=s[r]?s[r](n.name):`${n.name} is participating!`;window.showNotification(a)},o.innerHTML=`
            <span class="rank rank-${r+1}">#${r+1}</span>
            <span>${n.name}</span>
            <span>${n.bac.toFixed(3)}‰</span>
        `,i.appendChild(o)})}function gw(){const i=document.getElementById("visualizer");if(i){if(i.children.length===0)for(let t=0;t<20;t++){const e=document.createElement("div");e.className="bar",i.appendChild(e)}i.querySelectorAll(".bar").forEach(t=>{const e=Math.random()*150+20;t.style.height=e+"px"})}}function mw(){const i=oe("partyData")||{},t=Object.values(i).filter(e=>e.bac>=.08);if(t.length>0){const e=document.getElementById("alertBanner"),s=document.getElementById("alertText");if(e&&s){const n=t.map(r=>r.name).join(", ");s.textContent=`⚠️ ${n} need${t.length>1?"":"s"} attention! BAC too high!`,e.classList.contains("show")||e.classList.add("show")}}else{const e=document.getElementById("alertBanner");e&&e.classList.remove("show")}}function _w(i){console.log("Show friend details:",i)}function yw(i){const t=Math.floor((Date.now()-i)/1e3);return t<60?"just now":t<3600?`${Math.floor(t/60)}m ago`:`${Math.floor(t/3600)}h ago`}window.updateUI=sr;let Ws,_a=!1;(window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0)&&(_a=!0);async function Dd(){if("serviceWorker"in navigator)try{const i=await navigator.serviceWorker.register("./service-worker.js");return console.log("ServiceWorker registered:",i),i.addEventListener("updatefound",()=>{const t=i.installing;t.addEventListener("statechange",()=>{t.state==="installed"&&navigator.serviceWorker.controller&&w("New version available! Refresh to update.","info")})}),i}catch(i){return console.error("ServiceWorker registration failed:",i),null}}function Nd(){window.addEventListener("beforeinstallprompt",i=>{i.preventDefault(),Ws=i,_a||vw()}),window.addEventListener("appinstalled",()=>{console.log("PWA was installed"),_a=!0,bw(),w("App installed successfully!","success")})}function vw(){let i=document.getElementById("installButton");if(!i){i=document.createElement("button"),i.id="installButton",i.className="btn btn-primary install-button",i.innerHTML='<i class="fas fa-download"></i> Install App',i.onclick=ww;const t=document.querySelector(".action-buttons");t&&t.appendChild(i)}i.style.display="inline-block"}function bw(){const i=document.getElementById("installButton");i&&(i.style.display="none")}async function ww(){if(!Ws){w("App is already installed or not available for installation","info");return}Ws.prompt();const{outcome:i}=await Ws.userChoice;console.log(`User response to install prompt: ${i}`),console.log(i==="accepted"?"User accepted the install prompt":"User dismissed the install prompt"),Ws=null}function Od(){const i=indexedDB.open("BoozeLensDB",1);i.onerror=()=>{console.error("Failed to open IndexedDB")},i.onsuccess=t=>{t.target.result,console.log("IndexedDB opened successfully")},i.onupgradeneeded=t=>{const e=t.target.result;if(!e.objectStoreNames.contains("drinks")){const s=e.createObjectStore("drinks",{keyPath:"id",autoIncrement:!0});s.createIndex("timestamp","timestamp",{unique:!1}),s.createIndex("synced","synced",{unique:!1})}if(!e.objectStoreNames.contains("readings")){const s=e.createObjectStore("readings",{keyPath:"id",autoIncrement:!0});s.createIndex("timestamp","timestamp",{unique:!1}),s.createIndex("synced","synced",{unique:!1})}}}window.addEventListener("online",()=>{w("Back online! Syncing data...","success"),"serviceWorker"in navigator&&navigator.serviceWorker.controller&&navigator.serviceWorker.ready.then(i=>{"sync"in i&&i.sync.register("sync-all")})}),window.addEventListener("offline",()=>{w("You are offline. Data will be saved locally.","warning")});async function Ld(){const i=document.getElementById("friendSearchInput").value.trim().toLowerCase();if(!i||i.length<3){w("❌ Please enter at least 3 characters","error");return}const t=document.getElementById("searchResults");t.innerHTML="<p>Searching...</p>";try{const e=Q(),s=ct(),n=(await Hi(N(e,"users"))).val()||{},r=[];if(Object.entries(n).forEach(([o,a])=>{o!==s.uid&&a.settings?.publicProfile!==!1&&(a.username?.toLowerCase().includes(i)||a.email?.toLowerCase().includes(i))&&r.push({uid:o,...a})}),r.length===0)t.innerHTML='<p style="text-align: center; opacity: 0.7;">No users found</p>';else{const o=O().friendsData||{};t.innerHTML="<h4>Search Results:</h4>"+r.map(a=>`
                <div class="friend-item">
                    <div class="friend-info">
                        <div class="friend-avatar-small">
                            ${(a.username||a.email).charAt(0).toUpperCase()}
                        </div>
                        <div class="friend-details">
                            <h4>${a.username||"User"}</h4>
                            <p>${a.email||"Phone user"}</p>
                        </div>
                    </div>
                    <div class="friend-actions">
                        ${o[a.uid]?'<span style="color: #00ff88;">✓ Friends</span>':`<button class="btn btn-primary" onclick="sendFriendRequest('${a.uid}')">
                                <i class="fas fa-user-plus"></i> Add Friend
                            </button>`}
                    </div>
                </div>
            `).join("")}}catch(e){console.error("Search error:",e),t.innerHTML='<p style="color: #ff4444;">Search failed. Try again.</p>'}}async function xw(i){try{const t=Q(),e=ct(),s=O().userData;if(O().friendsData[i]){w("ℹ️ Already friends");return}await Ct(N(t,"friendRequests/"+i+"/"+e.uid),{from:s.username||e.email,timestamp:di()}),w("📤 Friend request sent!","success"),Ld()}catch(t){console.error("Friend request error:",t),w("❌ Failed to send request","error")}}function Fd(){const i=document.getElementById("friendRequests"),t=O().friendRequests||[];if(t.length===0){i.innerHTML='<p style="opacity: 0.7;">No pending requests</p>';return}i.innerHTML=t.map(e=>`
        <div class="friend-request">
            <div>
                <strong>${e.from}</strong>
                <small style="opacity: 0.7; margin-left: 10px;">
                    ${$w(e.timestamp)}
                </small>
            </div>
            <div>
                <button class="btn" onclick="acceptFriendRequest('${e.id}')">
                    <i class="fas fa-check"></i> Accept
                </button>
                <button class="btn btn-danger" onclick="declineFriendRequest('${e.id}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `).join("")}async function Iw(i){try{const t=await Cw();if(!t)return;const e=Q(),s=ct();await Ct(N(e,"users/"+s.uid+"/friends/"+i),{permission:t,addedAt:di()}),await Ct(N(e,"users/"+i+"/friends/"+s.uid),{permission:t,addedAt:di()}),await re(N(e,"friendRequests/"+s.uid+"/"+i)),w("✅ Friend added!","success")}catch(t){console.error("Accept friend error:",t),w("❌ Failed to accept request","error")}}async function Cw(){return new Promise(i=>{const t=`
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
        `;document.getElementById("modalBody").innerHTML=t,document.getElementById("modal").classList.add("show"),window.resolvePermission=e=>{window.closeModal(),i(e)}})}async function kw(i){const t=Q(),e=ct();await re(N(t,"friendRequests/"+e.uid+"/"+i)),w("❌ Request declined")}function ya(){const i=document.getElementById("friendsList");if(!i)return;const t=O().friendsData||{};if(i.innerHTML="",Object.keys(t).length===0){i.innerHTML='<p style="text-align: center; opacity: 0.7;">No friends added yet</p>';return}Object.entries(t).forEach(async([e,s])=>{const n=Q(),r=(await Hi(N(n,"users/"+e))).val();if(r){const o=document.createElement("div");o.className="friend-item",o.innerHTML=`
                <div class="friend-info">
                    <div class="friend-avatar-small">
                        ${(r.username||r.email||"U").charAt(0).toUpperCase()}
                    </div>
                    <div class="friend-details">
                        <h4>${r.username||"Friend"}</h4>
                        <p>${r.email||"Phone user"}</p>
                    </div>
                </div>
                <div class="friend-actions">
                    <select class="permission-select" onchange="updateFriendPermission('${e}', this.value)">
                        <option value="observer" ${s.permission==="observer"?"selected":""}>Observer</option>
                        <option value="buddy" ${s.permission==="buddy"?"selected":""}>Buddy</option>
                        <option value="guardian" ${s.permission==="guardian"?"selected":""}>Guardian</option>
                    </select>
                    <button class="btn btn-danger" onclick="removeFriend('${e}')">
                        <i class="fas fa-user-minus"></i>
                    </button>
                </div>
            `,i.appendChild(o)}})}async function Ew(i,t){try{const e=Q(),s=ct();await Ct(N(e,"users/"+s.uid+"/friends/"+i+"/permission"),t),await Ct(N(e,"users/"+i+"/friends/"+s.uid+"/permission"),t),w("✅ Permission updated","success")}catch(e){console.error("Update permission error:",e),w("❌ Failed to update permission","error")}}async function Tw(i){if(confirm("Remove this friend?")){const t=Q(),e=ct();await re(N(t,"users/"+e.uid+"/friends/"+i)),await re(N(t,"users/"+i+"/friends/"+e.uid)),w("👋 Friend removed")}}function Bd(){const i=document.getElementById("chatInput"),t=i.value.trim();if(t){const e=O().userData,s=document.getElementById("chatMessages"),n=document.createElement("div");n.className="chat-message own",n.innerHTML=`
            <div class="chat-author">${e.username||"You"}</div>
            <div>${fi(t)}</div>
        `,s.appendChild(n),s.scrollTop=s.scrollHeight,i.value="";const r=Q(),o=ct();r&&o&&Rb(N(r,"chat"),{uid:o.uid,username:e.username,message:t,timestamp:di()})}}function Sw(i){i.key==="Enter"&&Bd()}function Ud(){w("💧 Time for a water break! Stay hydrated!"),window.confetti&&confetti({particleCount:50,spread:60,colors:["#00d4ff","#0099ff","#0066ff"],origin:{y:.6}});const i=parseInt(localStorage.getItem("hydrationCount")||"0")+1;if(localStorage.setItem("hydrationCount",i),i>=12){const t=O().achievements;t.hydroHomie=!0,va("Hydro Homie")}}function va(i){localStorage.getItem(`achievement_${i}`)||(localStorage.setItem(`achievement_${i}`,"true"),window.confetti&&confetti({particleCount:100,spread:70,origin:{y:.6}}),w(`🏆 Achievement Unlocked: ${i}!`))}function Pw(i){const t=O().locationHistory,e=O().userData;if(t.push({location:i,time:Date.now(),user:e.username}),w(`📍 Checked in at ${i}!`),t.length>=10){const s=O().achievements;s.partyAnimal=!0,va("Party Animal")}window.closeModal()}function Hd(){const i=ba();let t='<div style="position: relative; width: 100%; height: 100%; background: rgba(255,255,255,0.05); border-radius: 20px;">';return i.forEach((e,s)=>{const n=20+s%3*30,r=20+Math.floor(s/3)*30;t+=`
            <div class="location-dot" style="left: ${n}%; top: ${r}%;" title="${e.name}: ${e.count} people">
                <span style="position: absolute; top: -20px; left: -20px; font-size: 0.8em; white-space: nowrap;">${e.name}</span>
            </div>
        `}),t+="</div>",t}function Wd(){document.querySelectorAll(".location-dot").forEach(i=>{i.addEventListener("click",function(){const t=this.getAttribute("title");w(`📍 ${t}`)})})}function ba(){const i=O().partyData||{},t={};return Object.values(i).forEach(e=>{t[e.location]||(t[e.location]={count:0,totalBac:0}),t[e.location].count++,t[e.location].totalBac+=e.bac}),Object.entries(t).map(([e,s])=>({name:e,count:s.count,avgBac:s.totalBac/s.count}))}function Mw(){const i=localStorage.getItem("homeAddress");if(i){const t=encodeURIComponent(i);w("🚕 Opening Uber with your home address..."),navigator.clipboard.writeText(i).then(()=>w("📋 Home address copied to clipboard!")).catch(()=>{}),window.open(`https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${t}`,"_blank")}else w("🚕 Opening Uber app..."),window.open("https://m.uber.com/ul/","_blank")}function Aw(i){switch(i){case"ambulance":confirm("Call emergency services (112)?")&&(window.location.href="tel:112");break;case"campus-security":confirm("Call HSG Campus Security?")&&(window.location.href="tel:+41712242424");break;case"taxi":w("🚕 Opening taxi options..."),setTimeout(()=>{Rw()},500);break}}function Rw(){const i=localStorage.getItem("homeAddress")||"",t=`
        <h2>🚕 Ride Options</h2>
        ${i?`<div style="margin: 20px 0; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 10px;">
            <p><strong>Your Home Address:</strong></p>
            <p>${fi(i)}</p>
            <button class="btn" style="margin-top: 10px;" onclick="navigator.clipboard.writeText('${fi(i)}').then(() => showNotification('📋 Address copied!'))">
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
    `;document.getElementById("modalBody").innerHTML=t,document.getElementById("modal").classList.add("show")}function Dw(i){localStorage.setItem("buddy",i),w(`👥 ${i} is now your buddy!`);const t=O().achievements;t.guardianAngel=!0,va("Guardian Angel"),window.closeModal()}function Nw(){window.showModal("first-aid")}async function Ow(){const i=document.getElementById("username").value.trim();if(!i||i.length<3){w("❌ Username must be at least 3 characters","error");return}try{const t=Q(),e=ct(),s=O().userData;if(i.toLowerCase()!==s.username?.toLowerCase()){const n=await Hi(N(t,"usernames/"+i.toLowerCase()));if(n.exists()&&n.val()!==e.uid){w("❌ Username already taken","error");return}s.username&&await re(N(t,"usernames/"+s.username.toLowerCase())),await Ct(N(t,"usernames/"+i.toLowerCase()),e.uid)}await Ct(N(t,"users/"+e.uid+"/username"),i),w("✅ Profile updated!","success"),s.username=i,document.getElementById("profileName").textContent=i,document.getElementById("settingsUsername").textContent=i,document.getElementById("profileInitial").textContent=i.charAt(0).toUpperCase()}catch(t){console.error("Update profile error:",t),w("❌ Failed to update profile","error")}}async function Lw(){const i=prompt("Enter new password (min 6 characters):");if(i&&i.length>=6)try{await ct().updatePassword(i),w("✅ Password changed successfully","success")}catch(t){console.error("Password change error:",t),t.code==="auth/requires-recent-login"?w("❌ Please sign out and sign in again before changing password","error"):w("❌ Failed to change password","error")}}async function Fw(){const i=document.getElementById("homeAddress").value,t=document.getElementById("emergencyContact").value,e=document.getElementById("medicalInfo").value,s=document.getElementById("safetyNotes").value;try{const n=Q(),r=ct();await Ct(N(n,"users/"+r.uid+"/emergency"),{homeAddress:i,emergencyContact:t,medicalInfo:e,safetyNotes:s,updatedAt:di()}),localStorage.setItem("homeAddress",i),localStorage.setItem("emergencyContact",t),localStorage.setItem("medicalInfo",e),localStorage.setItem("safetyNotes",s),w("✅ Emergency information saved","success"),$d()}catch(n){console.error("Save emergency info error:",n),w("❌ Failed to save emergency info","error")}}async function Bw(){const i=document.getElementById("shareLocation").checked,t=document.getElementById("notifications").checked,e=document.getElementById("publicProfile").checked;try{const s=Q(),n=ct();await Ct(N(s,"users/"+n.uid+"/settings"),{shareLocation:i,notifications:t,publicProfile:e}),localStorage.setItem("shareLocation",i),localStorage.setItem("notifications",t),w("✅ Privacy settings saved","success"),$d()}catch(s){console.error("Save privacy settings error:",s),w("❌ Failed to save settings","error")}}function $d(){const i=document.createElement("div");i.className="settings-saved",i.innerHTML="✅",document.body.appendChild(i),setTimeout(()=>i.remove(),1e3)}function zd(){document.querySelectorAll(".toggle-switch").forEach(i=>{const t=i.querySelector("input");t&&t.checked?i.classList.add("active"):i.classList.remove("active")})}async function Uw(){if(confirm("Delete your account? This cannot be undone!")&&confirm("Are you absolutely sure? All your data will be permanently deleted."))try{const i=Q(),t=ct(),e=O().userData,s=O().friendsData;if(await re(N(i,"users/"+t.uid)),e.username&&await re(N(i,"usernames/"+e.username.toLowerCase())),s)for(const n in s)await re(N(i,"users/"+n+"/friends/"+t.uid));await t.delete(),w("Account deleted. Goodbye!"),location.reload()}catch(i){console.error("Delete account error:",i),i.code==="auth/requires-recent-login"?w("❌ Please sign out and sign in again before deleting account","error"):w("❌ Failed to delete account","error")}}function Hw(){const i=ct(),t=O(),e={user:{email:i?.email,username:t.userData.username},settings:t.userData.settings,emergency:t.userData.emergency,devices:t.deviceData,friends:t.friendsData,drinkHistory:t.drinkHistory,achievements:t.achievements,partyData:t.partyData},s=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=window.URL.createObjectURL(s),r=document.createElement("a");r.href=n,r.download=`hsg_party_tracker_${new Date().toISOString().slice(0,10)}.json`,document.body.appendChild(r),r.click(),document.body.removeChild(r),window.URL.revokeObjectURL(n),w("📥 Data exported successfully!","success")}async function Ww(){const i=document.getElementById("modalDeviceId").value.trim().toUpperCase();if(!i){w("❌ Please enter a Device ID","error");return}try{const t=Q(),e=ct(),s=O().deviceData;if(!(await Hi(N(t,"readings/"+i))).exists()){w("❌ Device not found. Make sure it's connected.","error");return}if(s[i]){w("ℹ️ Device already paired"),window.closeModal();return}await Ct(N(t,"users/"+e.uid+"/devices/"+i),{pairedAt:di(),name:"My Breathalyzer"}),w("✅ Device paired successfully!","success"),window.closeModal()}catch(t){console.error("Pairing error:",t),w("❌ Pairing failed","error")}}function $w(i){const t=Math.floor((Date.now()-i)/1e3);return t<60?"just now":t<3600?`${Math.floor(t/60)}m ago`:`${Math.floor(t/3600)}h ago`}function fi(i){const t=document.createElement("div");return t.textContent=i,t.innerHTML}function zw(i){console.log("Permission resolved:",i)}/*!
* @kurkle/color v0.3.4
* https://github.com/kurkle/color#readme
* (c) 2024 Jukka Kurkela
* Released under the MIT License
*/function $s(i){return i+.5|0}const Ve=(i,t,e)=>Math.max(Math.min(i,e),t);function zs(i){return Ve($s(i*2.55),0,255)}function Ye(i){return Ve($s(i*255),0,255)}function Ie(i){return Ve($s(i/2.55)/100,0,1)}function jd(i){return Ve($s(i*100),0,100)}const qt={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},wa=[..."0123456789ABCDEF"],jw=i=>wa[i&15],qw=i=>wa[(i&240)>>4]+wa[i&15],nr=i=>(i&240)>>4===(i&15),Vw=i=>nr(i.r)&&nr(i.g)&&nr(i.b)&&nr(i.a);function Yw(i){var t=i.length,e;return i[0]==="#"&&(t===4||t===5?e={r:255&qt[i[1]]*17,g:255&qt[i[2]]*17,b:255&qt[i[3]]*17,a:t===5?qt[i[4]]*17:255}:(t===7||t===9)&&(e={r:qt[i[1]]<<4|qt[i[2]],g:qt[i[3]]<<4|qt[i[4]],b:qt[i[5]]<<4|qt[i[6]],a:t===9?qt[i[7]]<<4|qt[i[8]]:255})),e}const Kw=(i,t)=>i<255?t(i):"";function Gw(i){var t=Vw(i)?jw:qw;return i?"#"+t(i.r)+t(i.g)+t(i.b)+Kw(i.a,t):void 0}const Jw=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function qd(i,t,e){const s=t*Math.min(e,1-e),n=(r,o=(r+i/30)%12)=>e-s*Math.max(Math.min(o-3,9-o,1),-1);return[n(0),n(8),n(4)]}function Qw(i,t,e){const s=(n,r=(n+i/60)%6)=>e-e*t*Math.max(Math.min(r,4-r,1),0);return[s(5),s(3),s(1)]}function Xw(i,t,e){const s=qd(i,1,.5);let n;for(t+e>1&&(n=1/(t+e),t*=n,e*=n),n=0;n<3;n++)s[n]*=1-t-e,s[n]+=t;return s}function Zw(i,t,e,s,n){return i===n?(t-e)/s+(t<e?6:0):t===n?(e-i)/s+2:(i-t)/s+4}function xa(i){const t=i.r/255,e=i.g/255,s=i.b/255,n=Math.max(t,e,s),r=Math.min(t,e,s),o=(n+r)/2;let a,c,l;return n!==r&&(l=n-r,c=o>.5?l/(2-n-r):l/(n+r),a=Zw(t,e,s,l,n),a=a*60+.5),[a|0,c||0,o]}function Ia(i,t,e,s){return(Array.isArray(t)?i(t[0],t[1],t[2]):i(t,e,s)).map(Ye)}function Ca(i,t,e){return Ia(qd,i,t,e)}function t0(i,t,e){return Ia(Xw,i,t,e)}function e0(i,t,e){return Ia(Qw,i,t,e)}function Vd(i){return(i%360+360)%360}function i0(i){const t=Jw.exec(i);let e=255,s;if(!t)return;t[5]!==s&&(e=t[6]?zs(+t[5]):Ye(+t[5]));const n=Vd(+t[2]),r=+t[3]/100,o=+t[4]/100;return t[1]==="hwb"?s=t0(n,r,o):t[1]==="hsv"?s=e0(n,r,o):s=Ca(n,r,o),{r:s[0],g:s[1],b:s[2],a:e}}function s0(i,t){var e=xa(i);e[0]=Vd(e[0]+t),e=Ca(e),i.r=e[0],i.g=e[1],i.b=e[2]}function n0(i){if(!i)return;const t=xa(i),e=t[0],s=jd(t[1]),n=jd(t[2]);return i.a<255?`hsla(${e}, ${s}%, ${n}%, ${Ie(i.a)})`:`hsl(${e}, ${s}%, ${n}%)`}const Yd={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},Kd={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function r0(){const i={},t=Object.keys(Kd),e=Object.keys(Yd);let s,n,r,o,a;for(s=0;s<t.length;s++){for(o=a=t[s],n=0;n<e.length;n++)r=e[n],a=a.replace(r,Yd[r]);r=parseInt(Kd[o],16),i[a]=[r>>16&255,r>>8&255,r&255]}return i}let rr;function o0(i){rr||(rr=r0(),rr.transparent=[0,0,0,0]);const t=rr[i.toLowerCase()];return t&&{r:t[0],g:t[1],b:t[2],a:t.length===4?t[3]:255}}const a0=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function c0(i){const t=a0.exec(i);let e=255,s,n,r;if(t){if(t[7]!==s){const o=+t[7];e=t[8]?zs(o):Ve(o*255,0,255)}return s=+t[1],n=+t[3],r=+t[5],s=255&(t[2]?zs(s):Ve(s,0,255)),n=255&(t[4]?zs(n):Ve(n,0,255)),r=255&(t[6]?zs(r):Ve(r,0,255)),{r:s,g:n,b:r,a:e}}}function l0(i){return i&&(i.a<255?`rgba(${i.r}, ${i.g}, ${i.b}, ${Ie(i.a)})`:`rgb(${i.r}, ${i.g}, ${i.b})`)}const ka=i=>i<=.0031308?i*12.92:Math.pow(i,1/2.4)*1.055-.055,zi=i=>i<=.04045?i/12.92:Math.pow((i+.055)/1.055,2.4);function h0(i,t,e){const s=zi(Ie(i.r)),n=zi(Ie(i.g)),r=zi(Ie(i.b));return{r:Ye(ka(s+e*(zi(Ie(t.r))-s))),g:Ye(ka(n+e*(zi(Ie(t.g))-n))),b:Ye(ka(r+e*(zi(Ie(t.b))-r))),a:i.a+e*(t.a-i.a)}}function or(i,t,e){if(i){let s=xa(i);s[t]=Math.max(0,Math.min(s[t]+s[t]*e,t===0?360:1)),s=Ca(s),i.r=s[0],i.g=s[1],i.b=s[2]}}function Gd(i,t){return i&&Object.assign(t||{},i)}function Jd(i){var t={r:0,g:0,b:0,a:255};return Array.isArray(i)?i.length>=3&&(t={r:i[0],g:i[1],b:i[2],a:255},i.length>3&&(t.a=Ye(i[3]))):(t=Gd(i,{r:0,g:0,b:0,a:1}),t.a=Ye(t.a)),t}function d0(i){return i.charAt(0)==="r"?c0(i):i0(i)}class js{constructor(t){if(t instanceof js)return t;const e=typeof t;let s;e==="object"?s=Jd(t):e==="string"&&(s=Yw(t)||o0(t)||d0(t)),this._rgb=s,this._valid=!!s}get valid(){return this._valid}get rgb(){var t=Gd(this._rgb);return t&&(t.a=Ie(t.a)),t}set rgb(t){this._rgb=Jd(t)}rgbString(){return this._valid?l0(this._rgb):void 0}hexString(){return this._valid?Gw(this._rgb):void 0}hslString(){return this._valid?n0(this._rgb):void 0}mix(t,e){if(t){const s=this.rgb,n=t.rgb;let r;const o=e===r?.5:e,a=2*o-1,c=s.a-n.a,l=((a*c===-1?a:(a+c)/(1+a*c))+1)/2;r=1-l,s.r=255&l*s.r+r*n.r+.5,s.g=255&l*s.g+r*n.g+.5,s.b=255&l*s.b+r*n.b+.5,s.a=o*s.a+(1-o)*n.a,this.rgb=s}return this}interpolate(t,e){return t&&(this._rgb=h0(this._rgb,t._rgb,e)),this}clone(){return new js(this.rgb)}alpha(t){return this._rgb.a=Ye(t),this}clearer(t){const e=this._rgb;return e.a*=1-t,this}greyscale(){const t=this._rgb,e=$s(t.r*.3+t.g*.59+t.b*.11);return t.r=t.g=t.b=e,this}opaquer(t){const e=this._rgb;return e.a*=1+t,this}negate(){const t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return or(this._rgb,2,t),this}darken(t){return or(this._rgb,2,-t),this}saturate(t){return or(this._rgb,1,t),this}desaturate(t){return or(this._rgb,1,-t),this}rotate(t){return s0(this._rgb,t),this}}/*!
* Chart.js v4.5.0
* https://www.chartjs.org
* (c) 2025 Chart.js Contributors
* Released under the MIT License
*/function Ce(){}const u0=(()=>{let i=0;return()=>i++})();function Rt(i){return i==null}function kt(i){if(Array.isArray&&Array.isArray(i))return!0;const t=Object.prototype.toString.call(i);return t.slice(0,7)==="[object"&&t.slice(-6)==="Array]"}function K(i){return i!==null&&Object.prototype.toString.call(i)==="[object Object]"}function ji(i){return(typeof i=="number"||i instanceof Number)&&isFinite(+i)}function ae(i,t){return ji(i)?i:t}function tt(i,t){return typeof i>"u"?t:i}const f0=(i,t)=>typeof i=="string"&&i.endsWith("%")?parseFloat(i)/100:+i/t,Qd=(i,t)=>typeof i=="string"&&i.endsWith("%")?parseFloat(i)/100*t:+i;function lt(i,t,e){if(i&&typeof i.call=="function")return i.apply(e,t)}function X(i,t,e,s){let n,r,o;if(kt(i))for(r=i.length,n=0;n<r;n++)t.call(e,i[n],n);else if(K(i))for(o=Object.keys(i),r=o.length,n=0;n<r;n++)t.call(e,i[o[n]],o[n])}function ar(i,t){let e,s,n,r;if(!i||!t||i.length!==t.length)return!1;for(e=0,s=i.length;e<s;++e)if(n=i[e],r=t[e],n.datasetIndex!==r.datasetIndex||n.index!==r.index)return!1;return!0}function cr(i){if(kt(i))return i.map(cr);if(K(i)){const t=Object.create(null),e=Object.keys(i),s=e.length;let n=0;for(;n<s;++n)t[e[n]]=cr(i[e[n]]);return t}return i}function Xd(i){return["__proto__","prototype","constructor"].indexOf(i)===-1}function p0(i,t,e,s){if(!Xd(i))return;const n=t[i],r=e[i];K(n)&&K(r)?qs(n,r,s):t[i]=cr(r)}function qs(i,t,e){const s=kt(t)?t:[t],n=s.length;if(!K(i))return i;e=e||{};const r=e.merger||p0;let o;for(let a=0;a<n;++a){if(o=s[a],!K(o))continue;const c=Object.keys(o);for(let l=0,h=c.length;l<h;++l)r(c[l],i,o,e)}return i}function lr(i,t){return qs(i,t,{merger:g0})}function g0(i,t,e){if(!Xd(i))return;const s=t[i],n=e[i];K(s)&&K(n)?lr(s,n):Object.prototype.hasOwnProperty.call(t,i)||(t[i]=cr(n))}const Zd={"":i=>i,x:i=>i.x,y:i=>i.y};function m0(i){const t=i.split("."),e=[];let s="";for(const n of t)s+=n,s.endsWith("\\")?s=s.slice(0,-1)+".":(e.push(s),s="");return e}function _0(i){const t=m0(i);return e=>{for(const s of t){if(s==="")break;e=e&&e[s]}return e}}function Vs(i,t){return(Zd[t]||(Zd[t]=_0(t)))(i)}function Ea(i){return i.charAt(0).toUpperCase()+i.slice(1)}const hr=i=>typeof i<"u",Ke=i=>typeof i=="function",tu=(i,t)=>{if(i.size!==t.size)return!1;for(const e of i)if(!t.has(e))return!1;return!0};function y0(i){return i.type==="mouseup"||i.type==="click"||i.type==="contextmenu"}const at=Math.PI,ft=2*at,dr=Number.POSITIVE_INFINITY,v0=at/180,_t=at/2,pi=at/4,eu=at*2/3,iu=Math.sign;function b0(i){const t=[],e=Math.sqrt(i);let s;for(s=1;s<e;s++)i%s===0&&(t.push(s),t.push(i/s));return e===(e|0)&&t.push(e),t.sort((n,r)=>n-r).pop(),t}function w0(i){return typeof i=="symbol"||typeof i=="object"&&i!==null&&!(Symbol.toPrimitive in i||"toString"in i||"valueOf"in i)}function su(i){return!w0(i)&&!isNaN(parseFloat(i))&&isFinite(i)}function qi(i){return i*(at/180)}function x0(i){return i*(180/at)}function nu(i,t){const e=t.x-i.x,s=t.y-i.y,n=Math.sqrt(e*e+s*s);let r=Math.atan2(s,e);return r<-.5*at&&(r+=ft),{angle:r,distance:n}}function I0(i,t){return Math.sqrt(Math.pow(t.x-i.x,2)+Math.pow(t.y-i.y,2))}function ce(i){return(i%ft+ft)%ft}function ur(i,t,e,s){const n=ce(i),r=ce(t),o=ce(e),a=ce(r-n),c=ce(o-n),l=ce(n-r),h=ce(n-o);return n===r||n===o||s&&r===o||a>c&&l<h}function le(i,t,e){return Math.max(t,Math.min(e,i))}function C0(i){return le(i,-32768,32767)}function Ys(i,t,e,s=1e-6){return i>=Math.min(t,e)-s&&i<=Math.max(t,e)+s}function ru(i,t,e){e=e||(o=>i[o]<t);let s=i.length-1,n=0,r;for(;s-n>1;)r=n+s>>1,e(r)?n=r:s=r;return{lo:n,hi:s}}const k0=(i,t,e,s)=>ru(i,e,s?n=>{const r=i[n][t];return r<e||r===e&&i[n+1][t]===e}:n=>i[n][t]<e),E0=(i,t,e)=>ru(i,e,s=>i[s][t]>=e),ou=["push","pop","shift","splice","unshift"];function T0(i,t){if(i._chartjs){i._chartjs.listeners.push(t);return}Object.defineProperty(i,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),ou.forEach(e=>{const s="_onData"+Ea(e),n=i[e];Object.defineProperty(i,e,{configurable:!0,enumerable:!1,value(...r){const o=n.apply(this,r);return i._chartjs.listeners.forEach(a=>{typeof a[s]=="function"&&a[s](...r)}),o}})})}function au(i,t){const e=i._chartjs;if(!e)return;const s=e.listeners,n=s.indexOf(t);n!==-1&&s.splice(n,1),!(s.length>0)&&(ou.forEach(r=>{delete i[r]}),delete i._chartjs)}const cu=function(){return typeof window>"u"?function(i){return i()}:window.requestAnimationFrame}();function lu(i,t){let e=[],s=!1;return function(...n){e=n,s||(s=!0,cu.call(window,()=>{s=!1,i.apply(t,e)}))}}function S0(i,t){let e;return function(...s){return t?(clearTimeout(e),e=setTimeout(i,t,s)):i.apply(this,s),t}}const hu=i=>i==="start"?"left":i==="end"?"right":"center",$t=(i,t,e)=>i==="start"?t:i==="end"?e:(t+e)/2,P0=(i,t,e,s)=>i===(s?"left":"right")?e:i==="center"?(t+e)/2:t,fr=i=>i===0||i===1,du=(i,t,e)=>-(Math.pow(2,10*(i-=1))*Math.sin((i-t)*ft/e)),uu=(i,t,e)=>Math.pow(2,-10*i)*Math.sin((i-t)*ft/e)+1,Ks={linear:i=>i,easeInQuad:i=>i*i,easeOutQuad:i=>-i*(i-2),easeInOutQuad:i=>(i/=.5)<1?.5*i*i:-.5*(--i*(i-2)-1),easeInCubic:i=>i*i*i,easeOutCubic:i=>(i-=1)*i*i+1,easeInOutCubic:i=>(i/=.5)<1?.5*i*i*i:.5*((i-=2)*i*i+2),easeInQuart:i=>i*i*i*i,easeOutQuart:i=>-((i-=1)*i*i*i-1),easeInOutQuart:i=>(i/=.5)<1?.5*i*i*i*i:-.5*((i-=2)*i*i*i-2),easeInQuint:i=>i*i*i*i*i,easeOutQuint:i=>(i-=1)*i*i*i*i+1,easeInOutQuint:i=>(i/=.5)<1?.5*i*i*i*i*i:.5*((i-=2)*i*i*i*i+2),easeInSine:i=>-Math.cos(i*_t)+1,easeOutSine:i=>Math.sin(i*_t),easeInOutSine:i=>-.5*(Math.cos(at*i)-1),easeInExpo:i=>i===0?0:Math.pow(2,10*(i-1)),easeOutExpo:i=>i===1?1:-Math.pow(2,-10*i)+1,easeInOutExpo:i=>fr(i)?i:i<.5?.5*Math.pow(2,10*(i*2-1)):.5*(-Math.pow(2,-10*(i*2-1))+2),easeInCirc:i=>i>=1?i:-(Math.sqrt(1-i*i)-1),easeOutCirc:i=>Math.sqrt(1-(i-=1)*i),easeInOutCirc:i=>(i/=.5)<1?-.5*(Math.sqrt(1-i*i)-1):.5*(Math.sqrt(1-(i-=2)*i)+1),easeInElastic:i=>fr(i)?i:du(i,.075,.3),easeOutElastic:i=>fr(i)?i:uu(i,.075,.3),easeInOutElastic(i){return fr(i)?i:i<.5?.5*du(i*2,.1125,.45):.5+.5*uu(i*2-1,.1125,.45)},easeInBack(i){return i*i*((1.70158+1)*i-1.70158)},easeOutBack(i){return(i-=1)*i*((1.70158+1)*i+1.70158)+1},easeInOutBack(i){let t=1.70158;return(i/=.5)<1?.5*(i*i*(((t*=1.525)+1)*i-t)):.5*((i-=2)*i*(((t*=1.525)+1)*i+t)+2)},easeInBounce:i=>1-Ks.easeOutBounce(1-i),easeOutBounce(i){return i<1/2.75?7.5625*i*i:i<2/2.75?7.5625*(i-=1.5/2.75)*i+.75:i<2.5/2.75?7.5625*(i-=2.25/2.75)*i+.9375:7.5625*(i-=2.625/2.75)*i+.984375},easeInOutBounce:i=>i<.5?Ks.easeInBounce(i*2)*.5:Ks.easeOutBounce(i*2-1)*.5+.5};function fu(i){if(i&&typeof i=="object"){const t=i.toString();return t==="[object CanvasPattern]"||t==="[object CanvasGradient]"}return!1}function pu(i){return fu(i)?i:new js(i)}function Ta(i){return fu(i)?i:new js(i).saturate(.5).darken(.1).hexString()}const M0=["x","y","borderWidth","radius","tension"],A0=["color","borderColor","backgroundColor"];function R0(i){i.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),i.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>t!=="onProgress"&&t!=="onComplete"&&t!=="fn"}),i.set("animations",{colors:{type:"color",properties:A0},numbers:{type:"number",properties:M0}}),i.describe("animations",{_fallback:"animation"}),i.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>t|0}}}})}function D0(i){i.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const gu=new Map;function N0(i,t){t=t||{};const e=i+JSON.stringify(t);let s=gu.get(e);return s||(s=new Intl.NumberFormat(i,t),gu.set(e,s)),s}function O0(i,t,e){return N0(t,e).format(i)}var L0={formatters:{values(i){return kt(i)?i:""+i}}};function F0(i){i.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,e)=>e.lineWidth,tickColor:(t,e)=>e.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:L0.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),i.route("scale.ticks","color","","color"),i.route("scale.grid","color","","borderColor"),i.route("scale.border","color","","borderColor"),i.route("scale.title","color","","color"),i.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&t!=="callback"&&t!=="parser",_indexable:t=>t!=="borderDash"&&t!=="tickBorderDash"&&t!=="dash"}),i.describe("scales",{_fallback:"scale"}),i.describe("scale.ticks",{_scriptable:t=>t!=="backdropPadding"&&t!=="callback",_indexable:t=>t!=="backdropPadding"})}const gi=Object.create(null),Sa=Object.create(null);function Gs(i,t){if(!t)return i;const e=t.split(".");for(let s=0,n=e.length;s<n;++s){const r=e[s];i=i[r]||(i[r]=Object.create(null))}return i}function Pa(i,t,e){return typeof t=="string"?qs(Gs(i,t),e):qs(Gs(i,""),t)}class B0{constructor(t,e){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=s=>s.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(s,n)=>Ta(n.backgroundColor),this.hoverBorderColor=(s,n)=>Ta(n.borderColor),this.hoverColor=(s,n)=>Ta(n.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t),this.apply(e)}set(t,e){return Pa(this,t,e)}get(t){return Gs(this,t)}describe(t,e){return Pa(Sa,t,e)}override(t,e){return Pa(gi,t,e)}route(t,e,s,n){const r=Gs(this,t),o=Gs(this,s),a="_"+e;Object.defineProperties(r,{[a]:{value:r[e],writable:!0},[e]:{enumerable:!0,get(){const c=this[a],l=o[n];return K(c)?Object.assign({},l,c):tt(c,l)},set(c){this[a]=c}}})}apply(t){t.forEach(e=>e(this))}}var ut=new B0({_scriptable:i=>!i.startsWith("on"),_indexable:i=>i!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[R0,D0,F0]);function U0(i){return!i||Rt(i.size)||Rt(i.family)?null:(i.style?i.style+" ":"")+(i.weight?i.weight+" ":"")+i.size+"px "+i.family}function mu(i,t,e,s,n){let r=t[n];return r||(r=t[n]=i.measureText(n).width,e.push(n)),r>s&&(s=r),s}function mi(i,t,e){const s=i.currentDevicePixelRatio,n=e!==0?Math.max(e/2,.5):0;return Math.round((t-n)*s)/s+n}function _u(i,t){!t&&!i||(t=t||i.getContext("2d"),t.save(),t.resetTransform(),t.clearRect(0,0,i.width,i.height),t.restore())}function yu(i,t,e,s){vu(i,t,e,s,null)}function vu(i,t,e,s,n){let r,o,a,c,l,h,d,u;const f=t.pointStyle,p=t.rotation,m=t.radius;let _=(p||0)*v0;if(f&&typeof f=="object"&&(r=f.toString(),r==="[object HTMLImageElement]"||r==="[object HTMLCanvasElement]")){i.save(),i.translate(e,s),i.rotate(_),i.drawImage(f,-f.width/2,-f.height/2,f.width,f.height),i.restore();return}if(!(isNaN(m)||m<=0)){switch(i.beginPath(),f){default:n?i.ellipse(e,s,n/2,m,0,0,ft):i.arc(e,s,m,0,ft),i.closePath();break;case"triangle":h=n?n/2:m,i.moveTo(e+Math.sin(_)*h,s-Math.cos(_)*m),_+=eu,i.lineTo(e+Math.sin(_)*h,s-Math.cos(_)*m),_+=eu,i.lineTo(e+Math.sin(_)*h,s-Math.cos(_)*m),i.closePath();break;case"rectRounded":l=m*.516,c=m-l,o=Math.cos(_+pi)*c,d=Math.cos(_+pi)*(n?n/2-l:c),a=Math.sin(_+pi)*c,u=Math.sin(_+pi)*(n?n/2-l:c),i.arc(e-d,s-a,l,_-at,_-_t),i.arc(e+u,s-o,l,_-_t,_),i.arc(e+d,s+a,l,_,_+_t),i.arc(e-u,s+o,l,_+_t,_+at),i.closePath();break;case"rect":if(!p){c=Math.SQRT1_2*m,h=n?n/2:c,i.rect(e-h,s-c,2*h,2*c);break}_+=pi;case"rectRot":d=Math.cos(_)*(n?n/2:m),o=Math.cos(_)*m,a=Math.sin(_)*m,u=Math.sin(_)*(n?n/2:m),i.moveTo(e-d,s-a),i.lineTo(e+u,s-o),i.lineTo(e+d,s+a),i.lineTo(e-u,s+o),i.closePath();break;case"crossRot":_+=pi;case"cross":d=Math.cos(_)*(n?n/2:m),o=Math.cos(_)*m,a=Math.sin(_)*m,u=Math.sin(_)*(n?n/2:m),i.moveTo(e-d,s-a),i.lineTo(e+d,s+a),i.moveTo(e+u,s-o),i.lineTo(e-u,s+o);break;case"star":d=Math.cos(_)*(n?n/2:m),o=Math.cos(_)*m,a=Math.sin(_)*m,u=Math.sin(_)*(n?n/2:m),i.moveTo(e-d,s-a),i.lineTo(e+d,s+a),i.moveTo(e+u,s-o),i.lineTo(e-u,s+o),_+=pi,d=Math.cos(_)*(n?n/2:m),o=Math.cos(_)*m,a=Math.sin(_)*m,u=Math.sin(_)*(n?n/2:m),i.moveTo(e-d,s-a),i.lineTo(e+d,s+a),i.moveTo(e+u,s-o),i.lineTo(e-u,s+o);break;case"line":o=n?n/2:Math.cos(_)*m,a=Math.sin(_)*m,i.moveTo(e-o,s-a),i.lineTo(e+o,s+a);break;case"dash":i.moveTo(e,s),i.lineTo(e+Math.cos(_)*(n?n/2:m),s+Math.sin(_)*m);break;case!1:i.closePath();break}i.fill(),t.borderWidth>0&&i.stroke()}}function bu(i,t,e){return e=e||.5,!t||i&&i.x>t.left-e&&i.x<t.right+e&&i.y>t.top-e&&i.y<t.bottom+e}function Ma(i,t){i.save(),i.beginPath(),i.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),i.clip()}function Aa(i){i.restore()}function H0(i,t){t.translation&&i.translate(t.translation[0],t.translation[1]),Rt(t.rotation)||i.rotate(t.rotation),t.color&&(i.fillStyle=t.color),t.textAlign&&(i.textAlign=t.textAlign),t.textBaseline&&(i.textBaseline=t.textBaseline)}function W0(i,t,e,s,n){if(n.strikethrough||n.underline){const r=i.measureText(s),o=t-r.actualBoundingBoxLeft,a=t+r.actualBoundingBoxRight,c=e-r.actualBoundingBoxAscent,l=e+r.actualBoundingBoxDescent,h=n.strikethrough?(c+l)/2:l;i.strokeStyle=i.fillStyle,i.beginPath(),i.lineWidth=n.decorationWidth||2,i.moveTo(o,h),i.lineTo(a,h),i.stroke()}}function $0(i,t){const e=i.fillStyle;i.fillStyle=t.color,i.fillRect(t.left,t.top,t.width,t.height),i.fillStyle=e}function pr(i,t,e,s,n,r={}){const o=kt(t)?t:[t],a=r.strokeWidth>0&&r.strokeColor!=="";let c,l;for(i.save(),i.font=n.string,H0(i,r),c=0;c<o.length;++c)l=o[c],r.backdrop&&$0(i,r.backdrop),a&&(r.strokeColor&&(i.strokeStyle=r.strokeColor),Rt(r.strokeWidth)||(i.lineWidth=r.strokeWidth),i.strokeText(l,e,s,r.maxWidth)),i.fillText(l,e,s,r.maxWidth),W0(i,e,s,l,r),s+=Number(n.lineHeight);i.restore()}function Ra(i,t){const{x:e,y:s,w:n,h:r,radius:o}=t;i.arc(e+o.topLeft,s+o.topLeft,o.topLeft,1.5*at,at,!0),i.lineTo(e,s+r-o.bottomLeft),i.arc(e+o.bottomLeft,s+r-o.bottomLeft,o.bottomLeft,at,_t,!0),i.lineTo(e+n-o.bottomRight,s+r),i.arc(e+n-o.bottomRight,s+r-o.bottomRight,o.bottomRight,_t,0,!0),i.lineTo(e+n,s+o.topRight),i.arc(e+n-o.topRight,s+o.topRight,o.topRight,0,-_t,!0),i.lineTo(e+o.topLeft,s)}const z0=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,j0=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function q0(i,t){const e=(""+i).match(z0);if(!e||e[1]==="normal")return t*1.2;switch(i=+e[2],e[3]){case"px":return i;case"%":i/=100;break}return t*i}const V0=i=>+i||0;function Da(i,t){const e={},s=K(t),n=s?Object.keys(t):t,r=K(i)?s?o=>tt(i[o],i[t[o]]):o=>i[o]:()=>i;for(const o of n)e[o]=V0(r(o));return e}function Y0(i){return Da(i,{top:"y",right:"x",bottom:"y",left:"x"})}function Js(i){return Da(i,["topLeft","topRight","bottomLeft","bottomRight"])}function Xt(i){const t=Y0(i);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function Ut(i,t){i=i||{},t=t||ut.font;let e=tt(i.size,t.size);typeof e=="string"&&(e=parseInt(e,10));let s=tt(i.style,t.style);s&&!(""+s).match(j0)&&(console.warn('Invalid font style specified: "'+s+'"'),s=void 0);const n={family:tt(i.family,t.family),lineHeight:q0(tt(i.lineHeight,t.lineHeight),e),size:e,style:s,weight:tt(i.weight,t.weight),string:""};return n.string=U0(n),n}function gr(i,t,e,s){let n,r,o;for(n=0,r=i.length;n<r;++n)if(o=i[n],o!==void 0&&o!==void 0)return o}function K0(i,t,e){const{min:s,max:n}=i,r=Qd(t,(n-s)/2),o=(a,c)=>e&&a===0?0:a+c;return{min:o(s,-Math.abs(r)),max:o(n,r)}}function Vi(i,t){return Object.assign(Object.create(i),t)}function Na(i,t=[""],e,s,n=()=>i[0]){const r=e||i;typeof s>"u"&&(s=ku("_fallback",i));const o={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:i,_rootScopes:r,_fallback:s,_getTarget:n,override:a=>Na([a,...i],t,r,s)};return new Proxy(o,{deleteProperty(a,c){return delete a[c],delete a._keys,delete i[0][c],!0},get(a,c){return xu(a,c,()=>ix(c,t,i,a))},getOwnPropertyDescriptor(a,c){return Reflect.getOwnPropertyDescriptor(a._scopes[0],c)},getPrototypeOf(){return Reflect.getPrototypeOf(i[0])},has(a,c){return Eu(a).includes(c)},ownKeys(a){return Eu(a)},set(a,c,l){const h=a._storage||(a._storage=n());return a[c]=h[c]=l,delete a._keys,!0}})}function Yi(i,t,e,s){const n={_cacheable:!1,_proxy:i,_context:t,_subProxy:e,_stack:new Set,_descriptors:wu(i,s),setContext:r=>Yi(i,r,e,s),override:r=>Yi(i.override(r),t,e,s)};return new Proxy(n,{deleteProperty(r,o){return delete r[o],delete i[o],!0},get(r,o,a){return xu(r,o,()=>J0(r,o,a))},getOwnPropertyDescriptor(r,o){return r._descriptors.allKeys?Reflect.has(i,o)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(i,o)},getPrototypeOf(){return Reflect.getPrototypeOf(i)},has(r,o){return Reflect.has(i,o)},ownKeys(){return Reflect.ownKeys(i)},set(r,o,a){return i[o]=a,delete r[o],!0}})}function wu(i,t={scriptable:!0,indexable:!0}){const{_scriptable:e=t.scriptable,_indexable:s=t.indexable,_allKeys:n=t.allKeys}=i;return{allKeys:n,scriptable:e,indexable:s,isScriptable:Ke(e)?e:()=>e,isIndexable:Ke(s)?s:()=>s}}const G0=(i,t)=>i?i+Ea(t):t,Oa=(i,t)=>K(t)&&i!=="adapters"&&(Object.getPrototypeOf(t)===null||t.constructor===Object);function xu(i,t,e){if(Object.prototype.hasOwnProperty.call(i,t)||t==="constructor")return i[t];const s=e();return i[t]=s,s}function J0(i,t,e){const{_proxy:s,_context:n,_subProxy:r,_descriptors:o}=i;let a=s[t];return Ke(a)&&o.isScriptable(t)&&(a=Q0(t,a,i,e)),kt(a)&&a.length&&(a=X0(t,a,i,o.isIndexable)),Oa(t,a)&&(a=Yi(a,n,r&&r[t],o)),a}function Q0(i,t,e,s){const{_proxy:n,_context:r,_subProxy:o,_stack:a}=e;if(a.has(i))throw new Error("Recursion detected: "+Array.from(a).join("->")+"->"+i);a.add(i);let c=t(r,o||s);return a.delete(i),Oa(i,c)&&(c=La(n._scopes,n,i,c)),c}function X0(i,t,e,s){const{_proxy:n,_context:r,_subProxy:o,_descriptors:a}=e;if(typeof r.index<"u"&&s(i))return t[r.index%t.length];if(K(t[0])){const c=t,l=n._scopes.filter(h=>h!==c);t=[];for(const h of c){const d=La(l,n,i,h);t.push(Yi(d,r,o&&o[i],a))}}return t}function Iu(i,t,e){return Ke(i)?i(t,e):i}const Z0=(i,t)=>i===!0?t:typeof i=="string"?Vs(t,i):void 0;function tx(i,t,e,s,n){for(const r of t){const o=Z0(e,r);if(o){i.add(o);const a=Iu(o._fallback,e,n);if(typeof a<"u"&&a!==e&&a!==s)return a}else if(o===!1&&typeof s<"u"&&e!==s)return null}return!1}function La(i,t,e,s){const n=t._rootScopes,r=Iu(t._fallback,e,s),o=[...i,...n],a=new Set;a.add(s);let c=Cu(a,o,e,r||e,s);return c===null||typeof r<"u"&&r!==e&&(c=Cu(a,o,r,c,s),c===null)?!1:Na(Array.from(a),[""],n,r,()=>ex(t,e,s))}function Cu(i,t,e,s,n){for(;e;)e=tx(i,t,e,s,n);return e}function ex(i,t,e){const s=i._getTarget();t in s||(s[t]={});const n=s[t];return kt(n)&&K(e)?e:n||{}}function ix(i,t,e,s){let n;for(const r of t)if(n=ku(G0(r,i),e),typeof n<"u")return Oa(i,n)?La(e,s,i,n):n}function ku(i,t){for(const e of t){if(!e)continue;const s=e[i];if(typeof s<"u")return s}}function Eu(i){let t=i._keys;return t||(t=i._keys=sx(i._scopes)),t}function sx(i){const t=new Set;for(const e of i)for(const s of Object.keys(e).filter(n=>!n.startsWith("_")))t.add(s);return Array.from(t)}function Fa(){return typeof window<"u"&&typeof document<"u"}function Ba(i){let t=i.parentNode;return t&&t.toString()==="[object ShadowRoot]"&&(t=t.host),t}function mr(i,t,e){let s;return typeof i=="string"?(s=parseInt(i,10),i.indexOf("%")!==-1&&(s=s/100*t.parentNode[e])):s=i,s}const _r=i=>i.ownerDocument.defaultView.getComputedStyle(i,null);function nx(i,t){return _r(i).getPropertyValue(t)}const rx=["top","right","bottom","left"];function _i(i,t,e){const s={};e=e?"-"+e:"";for(let n=0;n<4;n++){const r=rx[n];s[r]=parseFloat(i[t+"-"+r+e])||0}return s.width=s.left+s.right,s.height=s.top+s.bottom,s}const ox=(i,t,e)=>(i>0||t>0)&&(!e||!e.shadowRoot);function ax(i,t){const e=i.touches,s=e&&e.length?e[0]:i,{offsetX:n,offsetY:r}=s;let o=!1,a,c;if(ox(n,r,i.target))a=n,c=r;else{const l=t.getBoundingClientRect();a=s.clientX-l.left,c=s.clientY-l.top,o=!0}return{x:a,y:c,box:o}}function yi(i,t){if("native"in i)return i;const{canvas:e,currentDevicePixelRatio:s}=t,n=_r(e),r=n.boxSizing==="border-box",o=_i(n,"padding"),a=_i(n,"border","width"),{x:c,y:l,box:h}=ax(i,e),d=o.left+(h&&a.left),u=o.top+(h&&a.top);let{width:f,height:p}=t;return r&&(f-=o.width+a.width,p-=o.height+a.height),{x:Math.round((c-d)/f*e.width/s),y:Math.round((l-u)/p*e.height/s)}}function cx(i,t,e){let s,n;if(t===void 0||e===void 0){const r=i&&Ba(i);if(!r)t=i.clientWidth,e=i.clientHeight;else{const o=r.getBoundingClientRect(),a=_r(r),c=_i(a,"border","width"),l=_i(a,"padding");t=o.width-l.width-c.width,e=o.height-l.height-c.height,s=mr(a.maxWidth,r,"clientWidth"),n=mr(a.maxHeight,r,"clientHeight")}}return{width:t,height:e,maxWidth:s||dr,maxHeight:n||dr}}const yr=i=>Math.round(i*10)/10;function lx(i,t,e,s){const n=_r(i),r=_i(n,"margin"),o=mr(n.maxWidth,i,"clientWidth")||dr,a=mr(n.maxHeight,i,"clientHeight")||dr,c=cx(i,t,e);let{width:l,height:h}=c;if(n.boxSizing==="content-box"){const d=_i(n,"border","width"),u=_i(n,"padding");l-=u.width+d.width,h-=u.height+d.height}return l=Math.max(0,l-r.width),h=Math.max(0,s?l/s:h-r.height),l=yr(Math.min(l,o,c.maxWidth)),h=yr(Math.min(h,a,c.maxHeight)),l&&!h&&(h=yr(l/2)),(t!==void 0||e!==void 0)&&s&&c.height&&h>c.height&&(h=c.height,l=yr(Math.floor(h*s))),{width:l,height:h}}function Tu(i,t,e){const s=t||1,n=Math.floor(i.height*s),r=Math.floor(i.width*s);i.height=Math.floor(i.height),i.width=Math.floor(i.width);const o=i.canvas;return o.style&&(e||!o.style.height&&!o.style.width)&&(o.style.height=`${i.height}px`,o.style.width=`${i.width}px`),i.currentDevicePixelRatio!==s||o.height!==n||o.width!==r?(i.currentDevicePixelRatio=s,o.height=n,o.width=r,i.ctx.setTransform(s,0,0,s,0,0),!0):!1}const hx=function(){let i=!1;try{const t={get passive(){return i=!0,!1}};Fa()&&(window.addEventListener("test",null,t),window.removeEventListener("test",null,t))}catch{}return i}();function Su(i,t){const e=nx(i,t),s=e&&e.match(/^(\d+)(\.\d+)?px$/);return s?+s[1]:void 0}const dx=function(i,t){return{x(e){return i+i+t-e},setWidth(e){t=e},textAlign(e){return e==="center"?e:e==="right"?"left":"right"},xPlus(e,s){return e-s},leftForLtr(e,s){return e-s}}},ux=function(){return{x(i){return i},setWidth(i){},textAlign(i){return i},xPlus(i,t){return i+t},leftForLtr(i,t){return i}}};function Ki(i,t,e){return i?dx(t,e):ux()}function Pu(i,t){let e,s;(t==="ltr"||t==="rtl")&&(e=i.canvas.style,s=[e.getPropertyValue("direction"),e.getPropertyPriority("direction")],e.setProperty("direction",t,"important"),i.prevTextDirection=s)}function Mu(i,t){t!==void 0&&(delete i.prevTextDirection,i.canvas.style.setProperty("direction",t[0],t[1]))}function vr(i,t,e){return i.options.clip?i[e]:t[e]}function fx(i,t){const{xScale:e,yScale:s}=i;return e&&s?{left:vr(e,t,"left"),right:vr(e,t,"right"),top:vr(s,t,"top"),bottom:vr(s,t,"bottom")}:t}function px(i,t){const e=t._clip;if(e.disabled)return!1;const s=fx(t,i.chartArea);return{left:e.left===!1?0:s.left-(e.left===!0?0:e.left),right:e.right===!1?i.width:s.right+(e.right===!0?0:e.right),top:e.top===!1?0:s.top-(e.top===!0?0:e.top),bottom:e.bottom===!1?i.height:s.bottom+(e.bottom===!0?0:e.bottom)}}/*!
* Chart.js v4.5.0
* https://www.chartjs.org
* (c) 2025 Chart.js Contributors
* Released under the MIT License
*/class gx{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,e,s,n){const r=e.listeners[n],o=e.duration;r.forEach(a=>a({chart:t,initial:e.initial,numSteps:o,currentStep:Math.min(s-e.start,o)}))}_refresh(){this._request||(this._running=!0,this._request=cu.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(t=Date.now()){let e=0;this._charts.forEach((s,n)=>{if(!s.running||!s.items.length)return;const r=s.items;let o=r.length-1,a=!1,c;for(;o>=0;--o)c=r[o],c._active?(c._total>s.duration&&(s.duration=c._total),c.tick(t),a=!0):(r[o]=r[r.length-1],r.pop());a&&(n.draw(),this._notify(n,s,t,"progress")),r.length||(s.running=!1,this._notify(n,s,t,"complete"),s.initial=!1),e+=r.length}),this._lastDate=t,e===0&&(this._running=!1)}_getAnims(t){const e=this._charts;let s=e.get(t);return s||(s={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},e.set(t,s)),s}listen(t,e,s){this._getAnims(t).listeners[e].push(s)}add(t,e){!e||!e.length||this._getAnims(t).items.push(...e)}has(t){return this._getAnims(t).items.length>0}start(t){const e=this._charts.get(t);e&&(e.running=!0,e.start=Date.now(),e.duration=e.items.reduce((s,n)=>Math.max(s,n._duration),0),this._refresh())}running(t){if(!this._running)return!1;const e=this._charts.get(t);return!(!e||!e.running||!e.items.length)}stop(t){const e=this._charts.get(t);if(!e||!e.items.length)return;const s=e.items;let n=s.length-1;for(;n>=0;--n)s[n].cancel();e.items=[],this._notify(t,e,Date.now(),"complete")}remove(t){return this._charts.delete(t)}}var ke=new gx;const Au="transparent",mx={boolean(i,t,e){return e>.5?t:i},color(i,t,e){const s=pu(i||Au),n=s.valid&&pu(t||Au);return n&&n.valid?n.mix(s,e).hexString():t},number(i,t,e){return i+(t-i)*e}};class _x{constructor(t,e,s,n){const r=e[s];n=gr([t.to,n,r,t.from]);const o=gr([t.from,r,n]);this._active=!0,this._fn=t.fn||mx[t.type||typeof o],this._easing=Ks[t.easing]||Ks.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=e,this._prop=s,this._from=o,this._to=n,this._promises=void 0}active(){return this._active}update(t,e,s){if(this._active){this._notify(!1);const n=this._target[this._prop],r=s-this._start,o=this._duration-r;this._start=s,this._duration=Math.floor(Math.max(o,t.duration)),this._total+=r,this._loop=!!t.loop,this._to=gr([t.to,e,n,t.from]),this._from=gr([t.from,n,e])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){const e=t-this._start,s=this._duration,n=this._prop,r=this._from,o=this._loop,a=this._to;let c;if(this._active=r!==a&&(o||e<s),!this._active){this._target[n]=a,this._notify(!0);return}if(e<0){this._target[n]=r;return}c=e/s%2,c=o&&c>1?2-c:c,c=this._easing(Math.min(1,Math.max(0,c))),this._target[n]=this._fn(r,a,c)}wait(){const t=this._promises||(this._promises=[]);return new Promise((e,s)=>{t.push({res:e,rej:s})})}_notify(t){const e=t?"res":"rej",s=this._promises||[];for(let n=0;n<s.length;n++)s[n][e]()}}class Ru{constructor(t,e){this._chart=t,this._properties=new Map,this.configure(e)}configure(t){if(!K(t))return;const e=Object.keys(ut.animation),s=this._properties;Object.getOwnPropertyNames(t).forEach(n=>{const r=t[n];if(!K(r))return;const o={};for(const a of e)o[a]=r[a];(kt(r.properties)&&r.properties||[n]).forEach(a=>{(a===n||!s.has(a))&&s.set(a,o)})})}_animateOptions(t,e){const s=e.options,n=vx(t,s);if(!n)return[];const r=this._createAnimations(n,s);return s.$shared&&yx(t.options.$animations,s).then(()=>{t.options=s},()=>{}),r}_createAnimations(t,e){const s=this._properties,n=[],r=t.$animations||(t.$animations={}),o=Object.keys(e),a=Date.now();let c;for(c=o.length-1;c>=0;--c){const l=o[c];if(l.charAt(0)==="$")continue;if(l==="options"){n.push(...this._animateOptions(t,e));continue}const h=e[l];let d=r[l];const u=s.get(l);if(d)if(u&&d.active()){d.update(u,h,a);continue}else d.cancel();if(!u||!u.duration){t[l]=h;continue}r[l]=d=new _x(u,t,l,h),n.push(d)}return n}update(t,e){if(this._properties.size===0){Object.assign(t,e);return}const s=this._createAnimations(t,e);if(s.length)return ke.add(this._chart,s),!0}}function yx(i,t){const e=[],s=Object.keys(t);for(let n=0;n<s.length;n++){const r=i[s[n]];r&&r.active()&&e.push(r.wait())}return Promise.all(e)}function vx(i,t){if(!t)return;let e=i.options;if(!e){i.options=t;return}return e.$shared&&(i.options=e=Object.assign({},e,{$shared:!1,$animations:{}})),e}function Du(i,t){const e=i&&i.options||{},s=e.reverse,n=e.min===void 0?t:0,r=e.max===void 0?t:0;return{start:s?r:n,end:s?n:r}}function bx(i,t,e){if(e===!1)return!1;const s=Du(i,e),n=Du(t,e);return{top:n.end,right:s.end,bottom:n.start,left:s.start}}function wx(i){let t,e,s,n;return K(i)?(t=i.top,e=i.right,s=i.bottom,n=i.left):t=e=s=n=i,{top:t,right:e,bottom:s,left:n,disabled:i===!1}}function Nu(i,t){const e=[],s=i._getSortedDatasetMetas(t);let n,r;for(n=0,r=s.length;n<r;++n)e.push(s[n].index);return e}function Ou(i,t,e,s={}){const n=i.keys,r=s.mode==="single";let o,a,c,l;if(t===null)return;let h=!1;for(o=0,a=n.length;o<a;++o){if(c=+n[o],c===e){if(h=!0,s.all)continue;break}l=i.values[c],ji(l)&&(r||t===0||iu(t)===iu(l))&&(t+=l)}return!h&&!s.all?0:t}function xx(i,t){const{iScale:e,vScale:s}=t,n=e.axis==="x"?"x":"y",r=s.axis==="x"?"x":"y",o=Object.keys(i),a=new Array(o.length);let c,l,h;for(c=0,l=o.length;c<l;++c)h=o[c],a[c]={[n]:h,[r]:i[h]};return a}function Ua(i,t){const e=i&&i.options.stacked;return e||e===void 0&&t.stack!==void 0}function Ix(i,t,e){return`${i.id}.${t.id}.${e.stack||e.type}`}function Cx(i){const{min:t,max:e,minDefined:s,maxDefined:n}=i.getUserBounds();return{min:s?t:Number.NEGATIVE_INFINITY,max:n?e:Number.POSITIVE_INFINITY}}function kx(i,t,e){const s=i[t]||(i[t]={});return s[e]||(s[e]={})}function Lu(i,t,e,s){for(const n of t.getMatchingVisibleMetas(s).reverse()){const r=i[n.index];if(e&&r>0||!e&&r<0)return n.index}return null}function Fu(i,t){const{chart:e,_cachedMeta:s}=i,n=e._stacks||(e._stacks={}),{iScale:r,vScale:o,index:a}=s,c=r.axis,l=o.axis,h=Ix(r,o,s),d=t.length;let u;for(let f=0;f<d;++f){const p=t[f],{[c]:m,[l]:_}=p,v=p._stacks||(p._stacks={});u=v[l]=kx(n,h,m),u[a]=_,u._top=Lu(u,o,!0,s.type),u._bottom=Lu(u,o,!1,s.type);const I=u._visualValues||(u._visualValues={});I[a]=_}}function Ha(i,t){const e=i.scales;return Object.keys(e).filter(s=>e[s].axis===t).shift()}function Ex(i,t){return Vi(i,{active:!1,dataset:void 0,datasetIndex:t,index:t,mode:"default",type:"dataset"})}function Tx(i,t,e){return Vi(i,{active:!1,dataIndex:t,parsed:void 0,raw:void 0,element:e,index:t,mode:"default",type:"data"})}function Qs(i,t){const e=i.controller.index,s=i.vScale&&i.vScale.axis;if(s){t=t||i._parsed;for(const n of t){const r=n._stacks;if(!r||r[s]===void 0||r[s][e]===void 0)return;delete r[s][e],r[s]._visualValues!==void 0&&r[s]._visualValues[e]!==void 0&&delete r[s]._visualValues[e]}}}const Wa=i=>i==="reset"||i==="none",Bu=(i,t)=>t?i:Object.assign({},i),Sx=(i,t,e)=>i&&!t.hidden&&t._stacked&&{keys:Nu(e,!0),values:null};class Uu{static defaults={};static datasetElementType=null;static dataElementType=null;constructor(t,e){this.chart=t,this._ctx=t.ctx,this.index=e,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=Ua(t.vScale,t),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(t){this.index!==t&&Qs(this._cachedMeta),this.index=t}linkScales(){const t=this.chart,e=this._cachedMeta,s=this.getDataset(),n=(d,u,f,p)=>d==="x"?u:d==="r"?p:f,r=e.xAxisID=tt(s.xAxisID,Ha(t,"x")),o=e.yAxisID=tt(s.yAxisID,Ha(t,"y")),a=e.rAxisID=tt(s.rAxisID,Ha(t,"r")),c=e.indexAxis,l=e.iAxisID=n(c,r,o,a),h=e.vAxisID=n(c,o,r,a);e.xScale=this.getScaleForId(r),e.yScale=this.getScaleForId(o),e.rScale=this.getScaleForId(a),e.iScale=this.getScaleForId(l),e.vScale=this.getScaleForId(h)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){const e=this._cachedMeta;return t===e.iScale?e.vScale:e.iScale}reset(){this._update("reset")}_destroy(){const t=this._cachedMeta;this._data&&au(this._data,this),t._stacked&&Qs(t)}_dataCheck(){const t=this.getDataset(),e=t.data||(t.data=[]),s=this._data;if(K(e)){const n=this._cachedMeta;this._data=xx(e,n)}else if(s!==e){if(s){au(s,this);const n=this._cachedMeta;Qs(n),n._parsed=[]}e&&Object.isExtensible(e)&&T0(e,this),this._syncList=[],this._data=e}}addElements(){const t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){const e=this._cachedMeta,s=this.getDataset();let n=!1;this._dataCheck();const r=e._stacked;e._stacked=Ua(e.vScale,e),e.stack!==s.stack&&(n=!0,Qs(e),e.stack=s.stack),this._resyncElements(t),(n||r!==e._stacked)&&(Fu(this,e._parsed),e._stacked=Ua(e.vScale,e))}configure(){const t=this.chart.config,e=t.datasetScopeKeys(this._type),s=t.getOptionScopes(this.getDataset(),e,!0);this.options=t.createResolver(s,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,e){const{_cachedMeta:s,_data:n}=this,{iScale:r,_stacked:o}=s,a=r.axis;let c=t===0&&e===n.length?!0:s._sorted,l=t>0&&s._parsed[t-1],h,d,u;if(this._parsing===!1)s._parsed=n,s._sorted=!0,u=n;else{kt(n[t])?u=this.parseArrayData(s,n,t,e):K(n[t])?u=this.parseObjectData(s,n,t,e):u=this.parsePrimitiveData(s,n,t,e);const f=()=>d[a]===null||l&&d[a]<l[a];for(h=0;h<e;++h)s._parsed[h+t]=d=u[h],c&&(f()&&(c=!1),l=d);s._sorted=c}o&&Fu(this,u)}parsePrimitiveData(t,e,s,n){const{iScale:r,vScale:o}=t,a=r.axis,c=o.axis,l=r.getLabels(),h=r===o,d=new Array(n);let u,f,p;for(u=0,f=n;u<f;++u)p=u+s,d[u]={[a]:h||r.parse(l[p],p),[c]:o.parse(e[p],p)};return d}parseArrayData(t,e,s,n){const{xScale:r,yScale:o}=t,a=new Array(n);let c,l,h,d;for(c=0,l=n;c<l;++c)h=c+s,d=e[h],a[c]={x:r.parse(d[0],h),y:o.parse(d[1],h)};return a}parseObjectData(t,e,s,n){const{xScale:r,yScale:o}=t,{xAxisKey:a="x",yAxisKey:c="y"}=this._parsing,l=new Array(n);let h,d,u,f;for(h=0,d=n;h<d;++h)u=h+s,f=e[u],l[h]={x:r.parse(Vs(f,a),u),y:o.parse(Vs(f,c),u)};return l}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,e,s){const n=this.chart,r=this._cachedMeta,o=e[t.axis],a={keys:Nu(n,!0),values:e._stacks[t.axis]._visualValues};return Ou(a,o,r.index,{mode:s})}updateRangeFromParsed(t,e,s,n){const r=s[e.axis];let o=r===null?NaN:r;const a=n&&s._stacks[e.axis];n&&a&&(n.values=a,o=Ou(n,r,this._cachedMeta.index)),t.min=Math.min(t.min,o),t.max=Math.max(t.max,o)}getMinMax(t,e){const s=this._cachedMeta,n=s._parsed,r=s._sorted&&t===s.iScale,o=n.length,a=this._getOtherScale(t),c=Sx(e,s,this.chart),l={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:h,max:d}=Cx(a);let u,f;function p(){f=n[u];const m=f[a.axis];return!ji(f[t.axis])||h>m||d<m}for(u=0;u<o&&!(!p()&&(this.updateRangeFromParsed(l,t,f,c),r));++u);if(r){for(u=o-1;u>=0;--u)if(!p()){this.updateRangeFromParsed(l,t,f,c);break}}return l}getAllParsedValues(t){const e=this._cachedMeta._parsed,s=[];let n,r,o;for(n=0,r=e.length;n<r;++n)o=e[n][t.axis],ji(o)&&s.push(o);return s}getMaxOverflow(){return!1}getLabelAndValue(t){const e=this._cachedMeta,s=e.iScale,n=e.vScale,r=this.getParsed(t);return{label:s?""+s.getLabelForValue(r[s.axis]):"",value:n?""+n.getLabelForValue(r[n.axis]):""}}_update(t){const e=this._cachedMeta;this.update(t||"default"),e._clip=wx(tt(this.options.clip,bx(e.xScale,e.yScale,this.getMaxOverflow())))}update(t){}draw(){const t=this._ctx,e=this.chart,s=this._cachedMeta,n=s.data||[],r=e.chartArea,o=[],a=this._drawStart||0,c=this._drawCount||n.length-a,l=this.options.drawActiveElementsOnTop;let h;for(s.dataset&&s.dataset.draw(t,r,a,c),h=a;h<a+c;++h){const d=n[h];d.hidden||(d.active&&l?o.push(d):d.draw(t,r))}for(h=0;h<o.length;++h)o[h].draw(t,r)}getStyle(t,e){const s=e?"active":"default";return t===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(s):this.resolveDataElementOptions(t||0,s)}getContext(t,e,s){const n=this.getDataset();let r;if(t>=0&&t<this._cachedMeta.data.length){const o=this._cachedMeta.data[t];r=o.$context||(o.$context=Tx(this.getContext(),t,o)),r.parsed=this.getParsed(t),r.raw=n.data[t],r.index=r.dataIndex=t}else r=this.$context||(this.$context=Ex(this.chart.getContext(),this.index)),r.dataset=n,r.index=r.datasetIndex=this.index;return r.active=!!e,r.mode=s,r}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,e){return this._resolveElementOptions(this.dataElementType.id,e,t)}_resolveElementOptions(t,e="default",s){const n=e==="active",r=this._cachedDataOpts,o=t+"-"+e,a=r[o],c=this.enableOptionSharing&&hr(s);if(a)return Bu(a,c);const l=this.chart.config,h=l.datasetElementScopeKeys(this._type,t),d=n?[`${t}Hover`,"hover",t,""]:[t,""],u=l.getOptionScopes(this.getDataset(),h),f=Object.keys(ut.elements[t]),p=()=>this.getContext(s,n,e),m=l.resolveNamedOptions(u,f,p,d);return m.$shared&&(m.$shared=c,r[o]=Object.freeze(Bu(m,c))),m}_resolveAnimations(t,e,s){const n=this.chart,r=this._cachedDataOpts,o=`animation-${e}`,a=r[o];if(a)return a;let c;if(n.options.animation!==!1){const h=this.chart.config,d=h.datasetAnimationScopeKeys(this._type,e),u=h.getOptionScopes(this.getDataset(),d);c=h.createResolver(u,this.getContext(t,s,e))}const l=new Ru(n,c&&c.animations);return c&&c._cacheable&&(r[o]=Object.freeze(l)),l}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,e){return!e||Wa(t)||this.chart._animationsDisabled}_getSharedOptions(t,e){const s=this.resolveDataElementOptions(t,e),n=this._sharedOptions,r=this.getSharedOptions(s),o=this.includeOptions(e,r)||r!==n;return this.updateSharedOptions(r,e,s),{sharedOptions:r,includeOptions:o}}updateElement(t,e,s,n){Wa(n)?Object.assign(t,s):this._resolveAnimations(e,n).update(t,s)}updateSharedOptions(t,e,s){t&&!Wa(e)&&this._resolveAnimations(void 0,e).update(t,s)}_setStyle(t,e,s,n){t.active=n;const r=this.getStyle(e,n);this._resolveAnimations(e,s,n).update(t,{options:!n&&this.getSharedOptions(r)||r})}removeHoverStyle(t,e,s){this._setStyle(t,s,"active",!1)}setHoverStyle(t,e,s){this._setStyle(t,s,"active",!0)}_removeDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){const e=this._data,s=this._cachedMeta.data;for(const[a,c,l]of this._syncList)this[a](c,l);this._syncList=[];const n=s.length,r=e.length,o=Math.min(r,n);o&&this.parse(0,o),r>n?this._insertElements(n,r-n,t):r<n&&this._removeElements(r,n-r)}_insertElements(t,e,s=!0){const n=this._cachedMeta,r=n.data,o=t+e;let a;const c=l=>{for(l.length+=e,a=l.length-1;a>=o;a--)l[a]=l[a-e]};for(c(r),a=t;a<o;++a)r[a]=new this.dataElementType;this._parsing&&c(n._parsed),this.parse(t,e),s&&this.updateElements(r,t,e,"reset")}updateElements(t,e,s,n){}_removeElements(t,e){const s=this._cachedMeta;if(this._parsing){const n=s._parsed.splice(t,e);s._stacked&&Qs(s,n)}s.data.splice(t,e)}_sync(t){if(this._parsing)this._syncList.push(t);else{const[e,s,n]=t;this[e](s,n)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){const t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,e){e&&this._sync(["_removeElements",t,e]);const s=arguments.length-2;s&&this._sync(["_insertElements",t,s])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}function Px(i,t,e){let s=1,n=1,r=0,o=0;if(t<ft){const a=i,c=a+t,l=Math.cos(a),h=Math.sin(a),d=Math.cos(c),u=Math.sin(c),f=(x,C,E)=>ur(x,a,c,!0)?1:Math.max(C,C*e,E,E*e),p=(x,C,E)=>ur(x,a,c,!0)?-1:Math.min(C,C*e,E,E*e),m=f(0,l,d),_=f(_t,h,u),v=p(at,l,d),I=p(at+_t,h,u);s=(m-v)/2,n=(_-I)/2,r=-(m+v)/2,o=-(_+I)/2}return{ratioX:s,ratioY:n,offsetX:r,offsetY:o}}class Mx extends Uu{static id="doughnut";static defaults={datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"};static descriptors={_scriptable:t=>t!=="spacing",_indexable:t=>t!=="spacing"&&!t.startsWith("borderDash")&&!t.startsWith("hoverBorderDash")};static overrides={aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const e=t.data;if(e.labels.length&&e.datasets.length){const{labels:{pointStyle:s,color:n}}=t.legend.options;return e.labels.map((r,o)=>{const a=t.getDatasetMeta(0).controller.getStyle(o);return{text:r,fillStyle:a.backgroundColor,strokeStyle:a.borderColor,fontColor:n,lineWidth:a.borderWidth,pointStyle:s,hidden:!t.getDataVisibility(o),index:o}})}return[]}},onClick(t,e,s){s.chart.toggleDataVisibility(e.index),s.chart.update()}}}};constructor(t,e){super(t,e),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(t,e){const s=this.getDataset().data,n=this._cachedMeta;if(this._parsing===!1)n._parsed=s;else{let r=c=>+s[c];if(K(s[t])){const{key:c="value"}=this._parsing;r=l=>+Vs(s[l],c)}let o,a;for(o=t,a=t+e;o<a;++o)n._parsed[o]=r(o)}}_getRotation(){return qi(this.options.rotation-90)}_getCircumference(){return qi(this.options.circumference)}_getRotationExtents(){let t=ft,e=-ft;for(let s=0;s<this.chart.data.datasets.length;++s)if(this.chart.isDatasetVisible(s)&&this.chart.getDatasetMeta(s).type===this._type){const n=this.chart.getDatasetMeta(s).controller,r=n._getRotation(),o=n._getCircumference();t=Math.min(t,r),e=Math.max(e,r+o)}return{rotation:t,circumference:e-t}}update(t){const e=this.chart,{chartArea:s}=e,n=this._cachedMeta,r=n.data,o=this.getMaxBorderWidth()+this.getMaxOffset(r)+this.options.spacing,a=Math.max((Math.min(s.width,s.height)-o)/2,0),c=Math.min(f0(this.options.cutout,a),1),l=this._getRingWeight(this.index),{circumference:h,rotation:d}=this._getRotationExtents(),{ratioX:u,ratioY:f,offsetX:p,offsetY:m}=Px(d,h,c),_=(s.width-o)/u,v=(s.height-o)/f,I=Math.max(Math.min(_,v)/2,0),x=Qd(this.options.radius,I),C=Math.max(x*c,0),E=(x-C)/this._getVisibleDatasetWeightTotal();this.offsetX=p*x,this.offsetY=m*x,n.total=this.calculateTotal(),this.outerRadius=x-E*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-E*l,0),this.updateElements(r,0,r.length,t)}_circumference(t,e){const s=this.options,n=this._cachedMeta,r=this._getCircumference();return e&&s.animation.animateRotate||!this.chart.getDataVisibility(t)||n._parsed[t]===null||n.data[t].hidden?0:this.calculateCircumference(n._parsed[t]*r/ft)}updateElements(t,e,s,n){const r=n==="reset",o=this.chart,a=o.chartArea,c=o.options.animation,l=(a.left+a.right)/2,h=(a.top+a.bottom)/2,d=r&&c.animateScale,u=d?0:this.innerRadius,f=d?0:this.outerRadius,{sharedOptions:p,includeOptions:m}=this._getSharedOptions(e,n);let _=this._getRotation(),v;for(v=0;v<e;++v)_+=this._circumference(v,r);for(v=e;v<e+s;++v){const I=this._circumference(v,r),x=t[v],C={x:l+this.offsetX,y:h+this.offsetY,startAngle:_,endAngle:_+I,circumference:I,outerRadius:f,innerRadius:u};m&&(C.options=p||this.resolveDataElementOptions(v,x.active?"active":n)),_+=I,this.updateElement(x,v,C,n)}}calculateTotal(){const t=this._cachedMeta,e=t.data;let s=0,n;for(n=0;n<e.length;n++){const r=t._parsed[n];r!==null&&!isNaN(r)&&this.chart.getDataVisibility(n)&&!e[n].hidden&&(s+=Math.abs(r))}return s}calculateCircumference(t){const e=this._cachedMeta.total;return e>0&&!isNaN(t)?ft*(Math.abs(t)/e):0}getLabelAndValue(t){const e=this._cachedMeta,s=this.chart,n=s.data.labels||[],r=O0(e._parsed[t],s.options.locale);return{label:n[t]||"",value:r}}getMaxBorderWidth(t){let e=0;const s=this.chart;let n,r,o,a,c;if(!t){for(n=0,r=s.data.datasets.length;n<r;++n)if(s.isDatasetVisible(n)){o=s.getDatasetMeta(n),t=o.data,a=o.controller;break}}if(!t)return 0;for(n=0,r=t.length;n<r;++n)c=a.resolveDataElementOptions(n),c.borderAlign!=="inner"&&(e=Math.max(e,c.borderWidth||0,c.hoverBorderWidth||0));return e}getMaxOffset(t){let e=0;for(let s=0,n=t.length;s<n;++s){const r=this.resolveDataElementOptions(s);e=Math.max(e,r.offset||0,r.hoverOffset||0)}return e}_getRingWeightOffset(t){let e=0;for(let s=0;s<t;++s)this.chart.isDatasetVisible(s)&&(e+=this._getRingWeight(s));return e}_getRingWeight(t){return Math.max(tt(this.chart.data.datasets[t].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}function Ax(i,t,e,s){const{controller:n,data:r,_sorted:o}=i,a=n._cachedMeta.iScale,c=i.dataset&&i.dataset.options?i.dataset.options.spanGaps:null;if(a&&t===a.axis&&t!=="r"&&o&&r.length){const l=a._reversePixels?E0:k0;if(s){if(n._sharedOptions){const h=r[0],d=typeof h.getRange=="function"&&h.getRange(t);if(d){const u=l(r,t,e-d),f=l(r,t,e+d);return{lo:u.lo,hi:f.hi}}}}else{const h=l(r,t,e);if(c){const{vScale:d}=n._cachedMeta,{_parsed:u}=i,f=u.slice(0,h.lo+1).reverse().findIndex(m=>!Rt(m[d.axis]));h.lo-=Math.max(0,f);const p=u.slice(h.hi).findIndex(m=>!Rt(m[d.axis]));h.hi+=Math.max(0,p)}return h}}return{lo:0,hi:r.length-1}}function br(i,t,e,s,n){const r=i.getSortedVisibleDatasetMetas(),o=e[t];for(let a=0,c=r.length;a<c;++a){const{index:l,data:h}=r[a],{lo:d,hi:u}=Ax(r[a],t,o,n);for(let f=d;f<=u;++f){const p=h[f];p.skip||s(p,l,f)}}}function Rx(i){const t=i.indexOf("x")!==-1,e=i.indexOf("y")!==-1;return function(s,n){const r=t?Math.abs(s.x-n.x):0,o=e?Math.abs(s.y-n.y):0;return Math.sqrt(Math.pow(r,2)+Math.pow(o,2))}}function $a(i,t,e,s,n){const r=[];return!n&&!i.isPointInArea(t)||br(i,e,t,function(o,a,c){!n&&!bu(o,i.chartArea,0)||o.inRange(t.x,t.y,s)&&r.push({element:o,datasetIndex:a,index:c})},!0),r}function Dx(i,t,e,s){let n=[];function r(o,a,c){const{startAngle:l,endAngle:h}=o.getProps(["startAngle","endAngle"],s),{angle:d}=nu(o,{x:t.x,y:t.y});ur(d,l,h)&&n.push({element:o,datasetIndex:a,index:c})}return br(i,e,t,r),n}function Nx(i,t,e,s,n,r){let o=[];const a=Rx(e);let c=Number.POSITIVE_INFINITY;function l(h,d,u){const f=h.inRange(t.x,t.y,n);if(s&&!f)return;const p=h.getCenterPoint(n);if(!(r||i.isPointInArea(p))&&!f)return;const m=a(t,p);m<c?(o=[{element:h,datasetIndex:d,index:u}],c=m):m===c&&o.push({element:h,datasetIndex:d,index:u})}return br(i,e,t,l),o}function za(i,t,e,s,n,r){return!r&&!i.isPointInArea(t)?[]:e==="r"&&!s?Dx(i,t,e,n):Nx(i,t,e,s,n,r)}function Hu(i,t,e,s,n){const r=[],o=e==="x"?"inXRange":"inYRange";let a=!1;return br(i,e,t,(c,l,h)=>{c[o]&&c[o](t[e],n)&&(r.push({element:c,datasetIndex:l,index:h}),a=a||c.inRange(t.x,t.y,n))}),s&&!a?[]:r}var Ox={modes:{index(i,t,e,s){const n=yi(t,i),r=e.axis||"x",o=e.includeInvisible||!1,a=e.intersect?$a(i,n,r,s,o):za(i,n,r,!1,s,o),c=[];return a.length?(i.getSortedVisibleDatasetMetas().forEach(l=>{const h=a[0].index,d=l.data[h];d&&!d.skip&&c.push({element:d,datasetIndex:l.index,index:h})}),c):[]},dataset(i,t,e,s){const n=yi(t,i),r=e.axis||"xy",o=e.includeInvisible||!1;let a=e.intersect?$a(i,n,r,s,o):za(i,n,r,!1,s,o);if(a.length>0){const c=a[0].datasetIndex,l=i.getDatasetMeta(c).data;a=[];for(let h=0;h<l.length;++h)a.push({element:l[h],datasetIndex:c,index:h})}return a},point(i,t,e,s){const n=yi(t,i),r=e.axis||"xy",o=e.includeInvisible||!1;return $a(i,n,r,s,o)},nearest(i,t,e,s){const n=yi(t,i),r=e.axis||"xy",o=e.includeInvisible||!1;return za(i,n,r,e.intersect,s,o)},x(i,t,e,s){const n=yi(t,i);return Hu(i,n,"x",e.intersect,s)},y(i,t,e,s){const n=yi(t,i);return Hu(i,n,"y",e.intersect,s)}}};const Wu=["left","top","right","bottom"];function Xs(i,t){return i.filter(e=>e.pos===t)}function $u(i,t){return i.filter(e=>Wu.indexOf(e.pos)===-1&&e.box.axis===t)}function Zs(i,t){return i.sort((e,s)=>{const n=t?s:e,r=t?e:s;return n.weight===r.weight?n.index-r.index:n.weight-r.weight})}function Lx(i){const t=[];let e,s,n,r,o,a;for(e=0,s=(i||[]).length;e<s;++e)n=i[e],{position:r,options:{stack:o,stackWeight:a=1}}=n,t.push({index:e,box:n,pos:r,horizontal:n.isHorizontal(),weight:n.weight,stack:o&&r+o,stackWeight:a});return t}function Fx(i){const t={};for(const e of i){const{stack:s,pos:n,stackWeight:r}=e;if(!s||!Wu.includes(n))continue;const o=t[s]||(t[s]={count:0,placed:0,weight:0,size:0});o.count++,o.weight+=r}return t}function Bx(i,t){const e=Fx(i),{vBoxMaxWidth:s,hBoxMaxHeight:n}=t;let r,o,a;for(r=0,o=i.length;r<o;++r){a=i[r];const{fullSize:c}=a.box,l=e[a.stack],h=l&&a.stackWeight/l.weight;a.horizontal?(a.width=h?h*s:c&&t.availableWidth,a.height=n):(a.width=s,a.height=h?h*n:c&&t.availableHeight)}return e}function Ux(i){const t=Lx(i),e=Zs(t.filter(l=>l.box.fullSize),!0),s=Zs(Xs(t,"left"),!0),n=Zs(Xs(t,"right")),r=Zs(Xs(t,"top"),!0),o=Zs(Xs(t,"bottom")),a=$u(t,"x"),c=$u(t,"y");return{fullSize:e,leftAndTop:s.concat(r),rightAndBottom:n.concat(c).concat(o).concat(a),chartArea:Xs(t,"chartArea"),vertical:s.concat(n).concat(c),horizontal:r.concat(o).concat(a)}}function zu(i,t,e,s){return Math.max(i[e],t[e])+Math.max(i[s],t[s])}function ju(i,t){i.top=Math.max(i.top,t.top),i.left=Math.max(i.left,t.left),i.bottom=Math.max(i.bottom,t.bottom),i.right=Math.max(i.right,t.right)}function Hx(i,t,e,s){const{pos:n,box:r}=e,o=i.maxPadding;if(!K(n)){e.size&&(i[n]-=e.size);const d=s[e.stack]||{size:0,count:1};d.size=Math.max(d.size,e.horizontal?r.height:r.width),e.size=d.size/d.count,i[n]+=e.size}r.getPadding&&ju(o,r.getPadding());const a=Math.max(0,t.outerWidth-zu(o,i,"left","right")),c=Math.max(0,t.outerHeight-zu(o,i,"top","bottom")),l=a!==i.w,h=c!==i.h;return i.w=a,i.h=c,e.horizontal?{same:l,other:h}:{same:h,other:l}}function Wx(i){const t=i.maxPadding;function e(s){const n=Math.max(t[s]-i[s],0);return i[s]+=n,n}i.y+=e("top"),i.x+=e("left"),e("right"),e("bottom")}function $x(i,t){const e=t.maxPadding;function s(n){const r={left:0,top:0,right:0,bottom:0};return n.forEach(o=>{r[o]=Math.max(t[o],e[o])}),r}return s(i?["left","right"]:["top","bottom"])}function tn(i,t,e,s){const n=[];let r,o,a,c,l,h;for(r=0,o=i.length,l=0;r<o;++r){a=i[r],c=a.box,c.update(a.width||t.w,a.height||t.h,$x(a.horizontal,t));const{same:d,other:u}=Hx(t,e,a,s);l|=d&&n.length,h=h||u,c.fullSize||n.push(a)}return l&&tn(n,t,e,s)||h}function wr(i,t,e,s,n){i.top=e,i.left=t,i.right=t+s,i.bottom=e+n,i.width=s,i.height=n}function qu(i,t,e,s){const n=e.padding;let{x:r,y:o}=t;for(const a of i){const c=a.box,l=s[a.stack]||{placed:0,weight:1},h=a.stackWeight/l.weight||1;if(a.horizontal){const d=t.w*h,u=l.size||c.height;hr(l.start)&&(o=l.start),c.fullSize?wr(c,n.left,o,e.outerWidth-n.right-n.left,u):wr(c,t.left+l.placed,o,d,u),l.start=o,l.placed+=d,o=c.bottom}else{const d=t.h*h,u=l.size||c.width;hr(l.start)&&(r=l.start),c.fullSize?wr(c,r,n.top,u,e.outerHeight-n.bottom-n.top):wr(c,r,t.top+l.placed,u,d),l.start=r,l.placed+=d,r=c.right}}t.x=r,t.y=o}var Ge={addBox(i,t){i.boxes||(i.boxes=[]),t.fullSize=t.fullSize||!1,t.position=t.position||"top",t.weight=t.weight||0,t._layers=t._layers||function(){return[{z:0,draw(e){t.draw(e)}}]},i.boxes.push(t)},removeBox(i,t){const e=i.boxes?i.boxes.indexOf(t):-1;e!==-1&&i.boxes.splice(e,1)},configure(i,t,e){t.fullSize=e.fullSize,t.position=e.position,t.weight=e.weight},update(i,t,e,s){if(!i)return;const n=Xt(i.options.layout.padding),r=Math.max(t-n.width,0),o=Math.max(e-n.height,0),a=Ux(i.boxes),c=a.vertical,l=a.horizontal;X(i.boxes,m=>{typeof m.beforeLayout=="function"&&m.beforeLayout()});const h=c.reduce((m,_)=>_.box.options&&_.box.options.display===!1?m:m+1,0)||1,d=Object.freeze({outerWidth:t,outerHeight:e,padding:n,availableWidth:r,availableHeight:o,vBoxMaxWidth:r/2/h,hBoxMaxHeight:o/2}),u=Object.assign({},n);ju(u,Xt(s));const f=Object.assign({maxPadding:u,w:r,h:o,x:n.left,y:n.top},n),p=Bx(c.concat(l),d);tn(a.fullSize,f,d,p),tn(c,f,d,p),tn(l,f,d,p)&&tn(c,f,d,p),Wx(f),qu(a.leftAndTop,f,d,p),f.x+=f.w,f.y+=f.h,qu(a.rightAndBottom,f,d,p),i.chartArea={left:f.left,top:f.top,right:f.left+f.w,bottom:f.top+f.h,height:f.h,width:f.w},X(a.chartArea,m=>{const _=m.box;Object.assign(_,i.chartArea),_.update(f.w,f.h,{left:0,top:0,right:0,bottom:0})})}};class Vu{acquireContext(t,e){}releaseContext(t){return!1}addEventListener(t,e,s){}removeEventListener(t,e,s){}getDevicePixelRatio(){return 1}getMaximumSize(t,e,s,n){return e=Math.max(0,e||t.width),s=s||t.height,{width:e,height:Math.max(0,n?Math.floor(e/n):s)}}isAttached(t){return!0}updateConfig(t){}}class zx extends Vu{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}}const xr="$chartjs",jx={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},Yu=i=>i===null||i==="";function qx(i,t){const e=i.style,s=i.getAttribute("height"),n=i.getAttribute("width");if(i[xr]={initial:{height:s,width:n,style:{display:e.display,height:e.height,width:e.width}}},e.display=e.display||"block",e.boxSizing=e.boxSizing||"border-box",Yu(n)){const r=Su(i,"width");r!==void 0&&(i.width=r)}if(Yu(s))if(i.style.height==="")i.height=i.width/(t||2);else{const r=Su(i,"height");r!==void 0&&(i.height=r)}return i}const Ku=hx?{passive:!0}:!1;function Vx(i,t,e){i&&i.addEventListener(t,e,Ku)}function Yx(i,t,e){i&&i.canvas&&i.canvas.removeEventListener(t,e,Ku)}function Kx(i,t){const e=jx[i.type]||i.type,{x:s,y:n}=yi(i,t);return{type:e,chart:t,native:i,x:s!==void 0?s:null,y:n!==void 0?n:null}}function Ir(i,t){for(const e of i)if(e===t||e.contains(t))return!0}function Gx(i,t,e){const s=i.canvas,n=new MutationObserver(r=>{let o=!1;for(const a of r)o=o||Ir(a.addedNodes,s),o=o&&!Ir(a.removedNodes,s);o&&e()});return n.observe(document,{childList:!0,subtree:!0}),n}function Jx(i,t,e){const s=i.canvas,n=new MutationObserver(r=>{let o=!1;for(const a of r)o=o||Ir(a.removedNodes,s),o=o&&!Ir(a.addedNodes,s);o&&e()});return n.observe(document,{childList:!0,subtree:!0}),n}const en=new Map;let Gu=0;function Ju(){const i=window.devicePixelRatio;i!==Gu&&(Gu=i,en.forEach((t,e)=>{e.currentDevicePixelRatio!==i&&t()}))}function Qx(i,t){en.size||window.addEventListener("resize",Ju),en.set(i,t)}function Xx(i){en.delete(i),en.size||window.removeEventListener("resize",Ju)}function Zx(i,t,e){const s=i.canvas,n=s&&Ba(s);if(!n)return;const r=lu((a,c)=>{const l=n.clientWidth;e(a,c),l<n.clientWidth&&e()},window),o=new ResizeObserver(a=>{const c=a[0],l=c.contentRect.width,h=c.contentRect.height;l===0&&h===0||r(l,h)});return o.observe(n),Qx(i,r),o}function ja(i,t,e){e&&e.disconnect(),t==="resize"&&Xx(i)}function tI(i,t,e){const s=i.canvas,n=lu(r=>{i.ctx!==null&&e(Kx(r,i))},i);return Vx(s,t,n),n}class eI extends Vu{acquireContext(t,e){const s=t&&t.getContext&&t.getContext("2d");return s&&s.canvas===t?(qx(t,e),s):null}releaseContext(t){const e=t.canvas;if(!e[xr])return!1;const s=e[xr].initial;["height","width"].forEach(r=>{const o=s[r];Rt(o)?e.removeAttribute(r):e.setAttribute(r,o)});const n=s.style||{};return Object.keys(n).forEach(r=>{e.style[r]=n[r]}),e.width=e.width,delete e[xr],!0}addEventListener(t,e,s){this.removeEventListener(t,e);const n=t.$proxies||(t.$proxies={}),r={attach:Gx,detach:Jx,resize:Zx}[e]||tI;n[e]=r(t,e,s)}removeEventListener(t,e){const s=t.$proxies||(t.$proxies={}),n=s[e];n&&(({attach:ja,detach:ja,resize:ja}[e]||Yx)(t,e,n),s[e]=void 0)}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,e,s,n){return lx(t,e,s,n)}isAttached(t){const e=t&&Ba(t);return!!(e&&e.isConnected)}}function iI(i){return!Fa()||typeof OffscreenCanvas<"u"&&i instanceof OffscreenCanvas?zx:eI}class sn{static defaults={};static defaultRoutes=void 0;x;y;active=!1;options;$animations;tooltipPosition(t){const{x:e,y:s}=this.getProps(["x","y"],t);return{x:e,y:s}}hasValue(){return su(this.x)&&su(this.y)}getProps(t,e){const s=this.$animations;if(!e||!s)return this;const n={};return t.forEach(r=>{n[r]=s[r]&&s[r].active()?s[r]._to:this[r]}),n}}function sI(i,t){const e=i.options.ticks,s=nI(i),n=Math.min(e.maxTicksLimit||s,s),r=e.major.enabled?oI(t):[],o=r.length,a=r[0],c=r[o-1],l=[];if(o>n)return aI(t,l,r,o/n),l;const h=rI(r,t,n);if(o>0){let d,u;const f=o>1?Math.round((c-a)/(o-1)):null;for(Cr(t,l,h,Rt(f)?0:a-f,a),d=0,u=o-1;d<u;d++)Cr(t,l,h,r[d],r[d+1]);return Cr(t,l,h,c,Rt(f)?t.length:c+f),l}return Cr(t,l,h),l}function nI(i){const t=i.options.offset,e=i._tickSize(),s=i._length/e+(t?0:1),n=i._maxLength/e;return Math.floor(Math.min(s,n))}function rI(i,t,e){const s=cI(i),n=t.length/e;if(!s)return Math.max(n,1);const r=b0(s);for(let o=0,a=r.length-1;o<a;o++){const c=r[o];if(c>n)return c}return Math.max(n,1)}function oI(i){const t=[];let e,s;for(e=0,s=i.length;e<s;e++)i[e].major&&t.push(e);return t}function aI(i,t,e,s){let n=0,r=e[0],o;for(s=Math.ceil(s),o=0;o<i.length;o++)o===r&&(t.push(i[o]),n++,r=e[n*s])}function Cr(i,t,e,s,n){const r=tt(s,0),o=Math.min(tt(n,i.length),i.length);let a=0,c,l,h;for(e=Math.ceil(e),n&&(c=n-s,e=c/Math.floor(c/e)),h=r;h<0;)a++,h=Math.round(r+a*e);for(l=Math.max(r,0);l<o;l++)l===h&&(t.push(i[l]),a++,h=Math.round(r+a*e))}function cI(i){const t=i.length;let e,s;if(t<2)return!1;for(s=i[0],e=1;e<t;++e)if(i[e]-i[e-1]!==s)return!1;return s}const lI=i=>i==="left"?"right":i==="right"?"left":i,Qu=(i,t,e)=>t==="top"||t==="left"?i[t]+e:i[t]-e,Xu=(i,t)=>Math.min(t||i,i);function Zu(i,t){const e=[],s=i.length/t,n=i.length;let r=0;for(;r<n;r+=s)e.push(i[Math.floor(r)]);return e}function hI(i,t,e){const s=i.ticks.length,n=Math.min(t,s-1),r=i._startPixel,o=i._endPixel,a=1e-6;let c=i.getPixelForTick(n),l;if(!(e&&(s===1?l=Math.max(c-r,o-c):t===0?l=(i.getPixelForTick(1)-c)/2:l=(c-i.getPixelForTick(n-1))/2,c+=n<t?l:-l,c<r-a||c>o+a)))return c}function dI(i,t){X(i,e=>{const s=e.gc,n=s.length/2;let r;if(n>t){for(r=0;r<n;++r)delete e.data[s[r]];s.splice(0,n)}})}function nn(i){return i.drawTicks?i.tickLength:0}function tf(i,t){if(!i.display)return 0;const e=Ut(i.font,t),s=Xt(i.padding);return(kt(i.text)?i.text.length:1)*e.lineHeight+s.height}function uI(i,t){return Vi(i,{scale:t,type:"scale"})}function fI(i,t,e){return Vi(i,{tick:e,index:t,type:"tick"})}function pI(i,t,e){let s=hu(i);return(e&&t!=="right"||!e&&t==="right")&&(s=lI(s)),s}function gI(i,t,e,s){const{top:n,left:r,bottom:o,right:a,chart:c}=i,{chartArea:l,scales:h}=c;let d=0,u,f,p;const m=o-n,_=a-r;if(i.isHorizontal()){if(f=$t(s,r,a),K(e)){const v=Object.keys(e)[0],I=e[v];p=h[v].getPixelForValue(I)+m-t}else e==="center"?p=(l.bottom+l.top)/2+m-t:p=Qu(i,e,t);u=a-r}else{if(K(e)){const v=Object.keys(e)[0],I=e[v];f=h[v].getPixelForValue(I)-_+t}else e==="center"?f=(l.left+l.right)/2-_+t:f=Qu(i,e,t);p=$t(s,o,n),d=e==="left"?-_t:_t}return{titleX:f,titleY:p,maxWidth:u,rotation:d}}class qa extends sn{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,e){return t}getUserBounds(){let{_userMin:t,_userMax:e,_suggestedMin:s,_suggestedMax:n}=this;return t=ae(t,Number.POSITIVE_INFINITY),e=ae(e,Number.NEGATIVE_INFINITY),s=ae(s,Number.POSITIVE_INFINITY),n=ae(n,Number.NEGATIVE_INFINITY),{min:ae(t,s),max:ae(e,n),minDefined:ji(t),maxDefined:ji(e)}}getMinMax(t){let{min:e,max:s,minDefined:n,maxDefined:r}=this.getUserBounds(),o;if(n&&r)return{min:e,max:s};const a=this.getMatchingVisibleMetas();for(let c=0,l=a.length;c<l;++c)o=a[c].controller.getMinMax(this,t),n||(e=Math.min(e,o.min)),r||(s=Math.max(s,o.max));return e=r&&e>s?s:e,s=n&&e>s?e:s,{min:ae(e,ae(s,e)),max:ae(s,ae(e,s))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}getLabelItems(t=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(t))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){lt(this.options.beforeUpdate,[this])}update(t,e,s){const{beginAtZero:n,grace:r,ticks:o}=this.options,a=o.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=e,this._margins=s=Object.assign({left:0,right:0,top:0,bottom:0},s),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+s.left+s.right:this.height+s.top+s.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=K0(this,r,n),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const c=a<this.ticks.length;this._convertTicksToLabels(c?Zu(this.ticks,a):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),o.display&&(o.autoSkip||o.source==="auto")&&(this.ticks=sI(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),c&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t=this.options.reverse,e,s;this.isHorizontal()?(e=this.left,s=this.right):(e=this.top,s=this.bottom,t=!t),this._startPixel=e,this._endPixel=s,this._reversePixels=t,this._length=s-e,this._alignToPixels=this.options.alignToPixels}afterUpdate(){lt(this.options.afterUpdate,[this])}beforeSetDimensions(){lt(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){lt(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),lt(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){lt(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){const e=this.options.ticks;let s,n,r;for(s=0,n=t.length;s<n;s++)r=t[s],r.label=lt(e.callback,[r.value,s,t],this)}afterTickToLabelConversion(){lt(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){lt(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const t=this.options,e=t.ticks,s=Xu(this.ticks.length,t.ticks.maxTicksLimit),n=e.minRotation||0,r=e.maxRotation;let o=n,a,c,l;if(!this._isVisible()||!e.display||n>=r||s<=1||!this.isHorizontal()){this.labelRotation=n;return}const h=this._getLabelSizes(),d=h.widest.width,u=h.highest.height,f=le(this.chart.width-d,0,this.maxWidth);a=t.offset?this.maxWidth/s:f/(s-1),d+6>a&&(a=f/(s-(t.offset?.5:1)),c=this.maxHeight-nn(t.grid)-e.padding-tf(t.title,this.chart.options.font),l=Math.sqrt(d*d+u*u),o=x0(Math.min(Math.asin(le((h.highest.height+6)/a,-1,1)),Math.asin(le(c/l,-1,1))-Math.asin(le(u/l,-1,1)))),o=Math.max(n,Math.min(r,o))),this.labelRotation=o}afterCalculateLabelRotation(){lt(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){lt(this.options.beforeFit,[this])}fit(){const t={width:0,height:0},{chart:e,options:{ticks:s,title:n,grid:r}}=this,o=this._isVisible(),a=this.isHorizontal();if(o){const c=tf(n,e.options.font);if(a?(t.width=this.maxWidth,t.height=nn(r)+c):(t.height=this.maxHeight,t.width=nn(r)+c),s.display&&this.ticks.length){const{first:l,last:h,widest:d,highest:u}=this._getLabelSizes(),f=s.padding*2,p=qi(this.labelRotation),m=Math.cos(p),_=Math.sin(p);if(a){const v=s.mirror?0:_*d.width+m*u.height;t.height=Math.min(this.maxHeight,t.height+v+f)}else{const v=s.mirror?0:m*d.width+_*u.height;t.width=Math.min(this.maxWidth,t.width+v+f)}this._calculatePadding(l,h,_,m)}}this._handleMargins(),a?(this.width=this._length=e.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=e.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,e,s,n){const{ticks:{align:r,padding:o},position:a}=this.options,c=this.labelRotation!==0,l=a!=="top"&&this.axis==="x";if(this.isHorizontal()){const h=this.getPixelForTick(0)-this.left,d=this.right-this.getPixelForTick(this.ticks.length-1);let u=0,f=0;c?l?(u=n*t.width,f=s*e.height):(u=s*t.height,f=n*e.width):r==="start"?f=e.width:r==="end"?u=t.width:r!=="inner"&&(u=t.width/2,f=e.width/2),this.paddingLeft=Math.max((u-h+o)*this.width/(this.width-h),0),this.paddingRight=Math.max((f-d+o)*this.width/(this.width-d),0)}else{let h=e.height/2,d=t.height/2;r==="start"?(h=0,d=t.height):r==="end"&&(h=e.height,d=0),this.paddingTop=h+o,this.paddingBottom=d+o}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){lt(this.options.afterFit,[this])}isHorizontal(){const{axis:t,position:e}=this.options;return e==="top"||e==="bottom"||t==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){this.beforeTickToLabelConversion(),this.generateTickLabels(t);let e,s;for(e=0,s=t.length;e<s;e++)Rt(t[e].label)&&(t.splice(e,1),s--,e--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){const e=this.options.ticks.sampleSize;let s=this.ticks;e<s.length&&(s=Zu(s,e)),this._labelSizes=t=this._computeLabelSizes(s,s.length,this.options.ticks.maxTicksLimit)}return t}_computeLabelSizes(t,e,s){const{ctx:n,_longestTextCache:r}=this,o=[],a=[],c=Math.floor(e/Xu(e,s));let l=0,h=0,d,u,f,p,m,_,v,I,x,C,E;for(d=0;d<e;d+=c){if(p=t[d].label,m=this._resolveTickFontOptions(d),n.font=_=m.string,v=r[_]=r[_]||{data:{},gc:[]},I=m.lineHeight,x=C=0,!Rt(p)&&!kt(p))x=mu(n,v.data,v.gc,x,p),C=I;else if(kt(p))for(u=0,f=p.length;u<f;++u)E=p[u],!Rt(E)&&!kt(E)&&(x=mu(n,v.data,v.gc,x,E),C+=I);o.push(x),a.push(C),l=Math.max(x,l),h=Math.max(C,h)}dI(r,e);const L=o.indexOf(l),z=a.indexOf(h),H=it=>({width:o[it]||0,height:a[it]||0});return{first:H(0),last:H(e-1),widest:H(L),highest:H(z),widths:o,heights:a}}getLabelForValue(t){return t}getPixelForValue(t,e){return NaN}getValueForPixel(t){}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);const e=this._startPixel+t*this._length;return C0(this._alignToPixels?mi(this.chart,e,0):e)}getDecimalForPixel(t){const e=(t-this._startPixel)/this._length;return this._reversePixels?1-e:e}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:t,max:e}=this;return t<0&&e<0?e:t>0&&e>0?t:0}getContext(t){const e=this.ticks||[];if(t>=0&&t<e.length){const s=e[t];return s.$context||(s.$context=fI(this.getContext(),t,s))}return this.$context||(this.$context=uI(this.chart.getContext(),this))}_tickSize(){const t=this.options.ticks,e=qi(this.labelRotation),s=Math.abs(Math.cos(e)),n=Math.abs(Math.sin(e)),r=this._getLabelSizes(),o=t.autoSkipPadding||0,a=r?r.widest.width+o:0,c=r?r.highest.height+o:0;return this.isHorizontal()?c*s>a*n?a/s:c/n:c*n<a*s?c/s:a/n}_isVisible(){const t=this.options.display;return t!=="auto"?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){const e=this.axis,s=this.chart,n=this.options,{grid:r,position:o,border:a}=n,c=r.offset,l=this.isHorizontal(),h=this.ticks.length+(c?1:0),d=nn(r),u=[],f=a.setContext(this.getContext()),p=f.display?f.width:0,m=p/2,_=function(F){return mi(s,F,p)};let v,I,x,C,E,L,z,H,it,$,G,q;if(o==="top")v=_(this.bottom),L=this.bottom-d,H=v-m,$=_(t.top)+m,q=t.bottom;else if(o==="bottom")v=_(this.top),$=t.top,q=_(t.bottom)-m,L=v+m,H=this.top+d;else if(o==="left")v=_(this.right),E=this.right-d,z=v-m,it=_(t.left)+m,G=t.right;else if(o==="right")v=_(this.left),it=t.left,G=_(t.right)-m,E=v+m,z=this.left+d;else if(e==="x"){if(o==="center")v=_((t.top+t.bottom)/2+.5);else if(K(o)){const F=Object.keys(o)[0],st=o[F];v=_(this.chart.scales[F].getPixelForValue(st))}$=t.top,q=t.bottom,L=v+m,H=L+d}else if(e==="y"){if(o==="center")v=_((t.left+t.right)/2);else if(K(o)){const F=Object.keys(o)[0],st=o[F];v=_(this.chart.scales[F].getPixelForValue(st))}E=v-m,z=E-d,it=t.left,G=t.right}const Dt=tt(n.ticks.maxTicksLimit,h),Pt=Math.max(1,Math.ceil(h/Dt));for(I=0;I<h;I+=Pt){const F=this.getContext(I),st=r.setContext(F),Nt=a.setContext(F),zt=st.lineWidth,Et=st.color,y=Nt.dash||[],g=Nt.dashOffset,k=st.tickWidth,T=st.tickColor,M=st.tickBorderDash||[],R=st.tickBorderDashOffset;x=hI(this,I,c),x!==void 0&&(C=mi(s,x,zt),l?E=z=it=G=C:L=H=$=q=C,u.push({tx1:E,ty1:L,tx2:z,ty2:H,x1:it,y1:$,x2:G,y2:q,width:zt,color:Et,borderDash:y,borderDashOffset:g,tickWidth:k,tickColor:T,tickBorderDash:M,tickBorderDashOffset:R}))}return this._ticksLength=h,this._borderValue=v,u}_computeLabelItems(t){const e=this.axis,s=this.options,{position:n,ticks:r}=s,o=this.isHorizontal(),a=this.ticks,{align:c,crossAlign:l,padding:h,mirror:d}=r,u=nn(s.grid),f=u+h,p=d?-h:f,m=-qi(this.labelRotation),_=[];let v,I,x,C,E,L,z,H,it,$,G,q,Dt="middle";if(n==="top")L=this.bottom-p,z=this._getXAxisLabelAlignment();else if(n==="bottom")L=this.top+p,z=this._getXAxisLabelAlignment();else if(n==="left"){const F=this._getYAxisLabelAlignment(u);z=F.textAlign,E=F.x}else if(n==="right"){const F=this._getYAxisLabelAlignment(u);z=F.textAlign,E=F.x}else if(e==="x"){if(n==="center")L=(t.top+t.bottom)/2+f;else if(K(n)){const F=Object.keys(n)[0],st=n[F];L=this.chart.scales[F].getPixelForValue(st)+f}z=this._getXAxisLabelAlignment()}else if(e==="y"){if(n==="center")E=(t.left+t.right)/2-f;else if(K(n)){const F=Object.keys(n)[0],st=n[F];E=this.chart.scales[F].getPixelForValue(st)}z=this._getYAxisLabelAlignment(u).textAlign}e==="y"&&(c==="start"?Dt="top":c==="end"&&(Dt="bottom"));const Pt=this._getLabelSizes();for(v=0,I=a.length;v<I;++v){x=a[v],C=x.label;const F=r.setContext(this.getContext(v));H=this.getPixelForTick(v)+r.labelOffset,it=this._resolveTickFontOptions(v),$=it.lineHeight,G=kt(C)?C.length:1;const st=G/2,Nt=F.color,zt=F.textStrokeColor,Et=F.textStrokeWidth;let y=z;o?(E=H,z==="inner"&&(v===I-1?y=this.options.reverse?"left":"right":v===0?y=this.options.reverse?"right":"left":y="center"),n==="top"?l==="near"||m!==0?q=-G*$+$/2:l==="center"?q=-Pt.highest.height/2-st*$+$:q=-Pt.highest.height+$/2:l==="near"||m!==0?q=$/2:l==="center"?q=Pt.highest.height/2-st*$:q=Pt.highest.height-G*$,d&&(q*=-1),m!==0&&!F.showLabelBackdrop&&(E+=$/2*Math.sin(m))):(L=H,q=(1-G)*$/2);let g;if(F.showLabelBackdrop){const k=Xt(F.backdropPadding),T=Pt.heights[v],M=Pt.widths[v];let R=q-k.top,A=0-k.left;switch(Dt){case"middle":R-=T/2;break;case"bottom":R-=T;break}switch(z){case"center":A-=M/2;break;case"right":A-=M;break;case"inner":v===I-1?A-=M:v>0&&(A-=M/2);break}g={left:A,top:R,width:M+k.width,height:T+k.height,color:F.backdropColor}}_.push({label:C,font:it,textOffset:q,options:{rotation:m,color:Nt,strokeColor:zt,strokeWidth:Et,textAlign:y,textBaseline:Dt,translation:[E,L],backdrop:g}})}return _}_getXAxisLabelAlignment(){const{position:t,ticks:e}=this.options;if(-qi(this.labelRotation))return t==="top"?"left":"right";let s="center";return e.align==="start"?s="left":e.align==="end"?s="right":e.align==="inner"&&(s="inner"),s}_getYAxisLabelAlignment(t){const{position:e,ticks:{crossAlign:s,mirror:n,padding:r}}=this.options,o=this._getLabelSizes(),a=t+r,c=o.widest.width;let l,h;return e==="left"?n?(h=this.right+r,s==="near"?l="left":s==="center"?(l="center",h+=c/2):(l="right",h+=c)):(h=this.right-a,s==="near"?l="right":s==="center"?(l="center",h-=c/2):(l="left",h=this.left)):e==="right"?n?(h=this.left+r,s==="near"?l="right":s==="center"?(l="center",h-=c/2):(l="left",h-=c)):(h=this.left+a,s==="near"?l="left":s==="center"?(l="center",h+=c/2):(l="right",h=this.right)):l="right",{textAlign:l,x:h}}_computeLabelArea(){if(this.options.ticks.mirror)return;const t=this.chart,e=this.options.position;if(e==="left"||e==="right")return{top:0,left:this.left,bottom:t.height,right:this.right};if(e==="top"||e==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:t.width}}drawBackground(){const{ctx:t,options:{backgroundColor:e},left:s,top:n,width:r,height:o}=this;e&&(t.save(),t.fillStyle=e,t.fillRect(s,n,r,o),t.restore())}getLineWidthForValue(t){const e=this.options.grid;if(!this._isVisible()||!e.display)return 0;const s=this.ticks.findIndex(n=>n.value===t);return s>=0?e.setContext(this.getContext(s)).lineWidth:0}drawGrid(t){const e=this.options.grid,s=this.ctx,n=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t));let r,o;const a=(c,l,h)=>{!h.width||!h.color||(s.save(),s.lineWidth=h.width,s.strokeStyle=h.color,s.setLineDash(h.borderDash||[]),s.lineDashOffset=h.borderDashOffset,s.beginPath(),s.moveTo(c.x,c.y),s.lineTo(l.x,l.y),s.stroke(),s.restore())};if(e.display)for(r=0,o=n.length;r<o;++r){const c=n[r];e.drawOnChartArea&&a({x:c.x1,y:c.y1},{x:c.x2,y:c.y2},c),e.drawTicks&&a({x:c.tx1,y:c.ty1},{x:c.tx2,y:c.ty2},{color:c.tickColor,width:c.tickWidth,borderDash:c.tickBorderDash,borderDashOffset:c.tickBorderDashOffset})}}drawBorder(){const{chart:t,ctx:e,options:{border:s,grid:n}}=this,r=s.setContext(this.getContext()),o=s.display?r.width:0;if(!o)return;const a=n.setContext(this.getContext(0)).lineWidth,c=this._borderValue;let l,h,d,u;this.isHorizontal()?(l=mi(t,this.left,o)-o/2,h=mi(t,this.right,a)+a/2,d=u=c):(d=mi(t,this.top,o)-o/2,u=mi(t,this.bottom,a)+a/2,l=h=c),e.save(),e.lineWidth=r.width,e.strokeStyle=r.color,e.beginPath(),e.moveTo(l,d),e.lineTo(h,u),e.stroke(),e.restore()}drawLabels(t){if(!this.options.ticks.display)return;const e=this.ctx,s=this._computeLabelArea();s&&Ma(e,s);const n=this.getLabelItems(t);for(const r of n){const o=r.options,a=r.font,c=r.label,l=r.textOffset;pr(e,c,0,l,a,o)}s&&Aa(e)}drawTitle(){const{ctx:t,options:{position:e,title:s,reverse:n}}=this;if(!s.display)return;const r=Ut(s.font),o=Xt(s.padding),a=s.align;let c=r.lineHeight/2;e==="bottom"||e==="center"||K(e)?(c+=o.bottom,kt(s.text)&&(c+=r.lineHeight*(s.text.length-1))):c+=o.top;const{titleX:l,titleY:h,maxWidth:d,rotation:u}=gI(this,c,e,a);pr(t,s.text,0,0,r,{color:s.color,maxWidth:d,rotation:u,textAlign:pI(a,e,n),textBaseline:"middle",translation:[l,h]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){const t=this.options,e=t.ticks&&t.ticks.z||0,s=tt(t.grid&&t.grid.z,-1),n=tt(t.border&&t.border.z,0);return!this._isVisible()||this.draw!==qa.prototype.draw?[{z:e,draw:r=>{this.draw(r)}}]:[{z:s,draw:r=>{this.drawBackground(),this.drawGrid(r),this.drawTitle()}},{z:n,draw:()=>{this.drawBorder()}},{z:e,draw:r=>{this.drawLabels(r)}}]}getMatchingVisibleMetas(t){const e=this.chart.getSortedVisibleDatasetMetas(),s=this.axis+"AxisID",n=[];let r,o;for(r=0,o=e.length;r<o;++r){const a=e[r];a[s]===this.id&&(!t||a.type===t)&&n.push(a)}return n}_resolveTickFontOptions(t){const e=this.options.ticks.setContext(this.getContext(t));return Ut(e.font)}_maxDigits(){const t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}}class kr{constructor(t,e,s){this.type=t,this.scope=e,this.override=s,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){const e=Object.getPrototypeOf(t);let s;yI(e)&&(s=this.register(e));const n=this.items,r=t.id,o=this.scope+"."+r;if(!r)throw new Error("class does not have id: "+t);return r in n||(n[r]=t,mI(t,o,s),this.override&&ut.override(t.id,t.overrides)),o}get(t){return this.items[t]}unregister(t){const e=this.items,s=t.id,n=this.scope;s in e&&delete e[s],n&&s in ut[n]&&(delete ut[n][s],this.override&&delete gi[s])}}function mI(i,t,e){const s=qs(Object.create(null),[e?ut.get(e):{},ut.get(t),i.defaults]);ut.set(t,s),i.defaultRoutes&&_I(t,i.defaultRoutes),i.descriptors&&ut.describe(t,i.descriptors)}function _I(i,t){Object.keys(t).forEach(e=>{const s=e.split("."),n=s.pop(),r=[i].concat(s).join("."),o=t[e].split("."),a=o.pop(),c=o.join(".");ut.route(r,n,c,a)})}function yI(i){return"id"in i&&"defaults"in i}class vI{constructor(){this.controllers=new kr(Uu,"datasets",!0),this.elements=new kr(sn,"elements"),this.plugins=new kr(Object,"plugins"),this.scales=new kr(qa,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,e,s){[...e].forEach(n=>{const r=s||this._getRegistryForType(n);s||r.isForType(n)||r===this.plugins&&n.id?this._exec(t,r,n):X(n,o=>{const a=s||this._getRegistryForType(o);this._exec(t,a,o)})})}_exec(t,e,s){const n=Ea(t);lt(s["before"+n],[],s),e[t](s),lt(s["after"+n],[],s)}_getRegistryForType(t){for(let e=0;e<this._typedRegistries.length;e++){const s=this._typedRegistries[e];if(s.isForType(t))return s}return this.plugins}_get(t,e,s){const n=e.get(t);if(n===void 0)throw new Error('"'+t+'" is not a registered '+s+".");return n}}var he=new vI;class bI{constructor(){this._init=[]}notify(t,e,s,n){e==="beforeInit"&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install"));const r=n?this._descriptors(t).filter(n):this._descriptors(t),o=this._notify(r,t,e,s);return e==="afterDestroy"&&(this._notify(r,t,"stop"),this._notify(this._init,t,"uninstall")),o}_notify(t,e,s,n){n=n||{};for(const r of t){const o=r.plugin,a=o[s],c=[e,n,r.options];if(lt(a,c,o)===!1&&n.cancelable)return!1}return!0}invalidate(){Rt(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;const e=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),e}_createDescriptors(t,e){const s=t&&t.config,n=tt(s.options&&s.options.plugins,{}),r=wI(s);return n===!1&&!e?[]:II(t,r,n,e)}_notifyStateChanges(t){const e=this._oldCache||[],s=this._cache,n=(r,o)=>r.filter(a=>!o.some(c=>a.plugin.id===c.plugin.id));this._notify(n(e,s),t,"stop"),this._notify(n(s,e),t,"start")}}function wI(i){const t={},e=[],s=Object.keys(he.plugins.items);for(let r=0;r<s.length;r++)e.push(he.getPlugin(s[r]));const n=i.plugins||[];for(let r=0;r<n.length;r++){const o=n[r];e.indexOf(o)===-1&&(e.push(o),t[o.id]=!0)}return{plugins:e,localIds:t}}function xI(i,t){return!t&&i===!1?null:i===!0?{}:i}function II(i,{plugins:t,localIds:e},s,n){const r=[],o=i.getContext();for(const a of t){const c=a.id,l=xI(s[c],n);l!==null&&r.push({plugin:a,options:CI(i.config,{plugin:a,local:e[c]},l,o)})}return r}function CI(i,{plugin:t,local:e},s,n){const r=i.pluginScopeKeys(t),o=i.getOptionScopes(s,r);return e&&t.defaults&&o.push(t.defaults),i.createResolver(o,n,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function Va(i,t){const e=ut.datasets[i]||{};return((t.datasets||{})[i]||{}).indexAxis||t.indexAxis||e.indexAxis||"x"}function kI(i,t){let e=i;return i==="_index_"?e=t:i==="_value_"&&(e=t==="x"?"y":"x"),e}function EI(i,t){return i===t?"_index_":"_value_"}function ef(i){if(i==="x"||i==="y"||i==="r")return i}function TI(i){if(i==="top"||i==="bottom")return"x";if(i==="left"||i==="right")return"y"}function Ya(i,...t){if(ef(i))return i;for(const e of t){const s=e.axis||TI(e.position)||i.length>1&&ef(i[0].toLowerCase());if(s)return s}throw new Error(`Cannot determine type of '${i}' axis. Please provide 'axis' or 'position' option.`)}function sf(i,t,e){if(e[t+"AxisID"]===i)return{axis:t}}function SI(i,t){if(t.data&&t.data.datasets){const e=t.data.datasets.filter(s=>s.xAxisID===i||s.yAxisID===i);if(e.length)return sf(i,"x",e[0])||sf(i,"y",e[0])}return{}}function PI(i,t){const e=gi[i.type]||{scales:{}},s=t.scales||{},n=Va(i.type,t),r=Object.create(null);return Object.keys(s).forEach(o=>{const a=s[o];if(!K(a))return console.error(`Invalid scale configuration for scale: ${o}`);if(a._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${o}`);const c=Ya(o,a,SI(o,i),ut.scales[a.type]),l=EI(c,n),h=e.scales||{};r[o]=lr(Object.create(null),[{axis:c},a,h[c],h[l]])}),i.data.datasets.forEach(o=>{const a=o.type||i.type,c=o.indexAxis||Va(a,t),l=(gi[a]||{}).scales||{};Object.keys(l).forEach(h=>{const d=kI(h,c),u=o[d+"AxisID"]||d;r[u]=r[u]||Object.create(null),lr(r[u],[{axis:d},s[u],l[h]])})}),Object.keys(r).forEach(o=>{const a=r[o];lr(a,[ut.scales[a.type],ut.scale])}),r}function nf(i){const t=i.options||(i.options={});t.plugins=tt(t.plugins,{}),t.scales=PI(i,t)}function rf(i){return i=i||{},i.datasets=i.datasets||[],i.labels=i.labels||[],i}function MI(i){return i=i||{},i.data=rf(i.data),nf(i),i}const of=new Map,af=new Set;function Er(i,t){let e=of.get(i);return e||(e=t(),of.set(i,e),af.add(e)),e}const rn=(i,t,e)=>{const s=Vs(t,e);s!==void 0&&i.add(s)};class AI{constructor(t){this._config=MI(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=rf(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){const t=this._config;this.clearCache(),nf(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return Er(t,()=>[[`datasets.${t}`,""]])}datasetAnimationScopeKeys(t,e){return Er(`${t}.transition.${e}`,()=>[[`datasets.${t}.transitions.${e}`,`transitions.${e}`],[`datasets.${t}`,""]])}datasetElementScopeKeys(t,e){return Er(`${t}-${e}`,()=>[[`datasets.${t}.elements.${e}`,`datasets.${t}`,`elements.${e}`,""]])}pluginScopeKeys(t){const e=t.id,s=this.type;return Er(`${s}-plugin-${e}`,()=>[[`plugins.${e}`,...t.additionalOptionScopes||[]]])}_cachedScopes(t,e){const s=this._scopeCache;let n=s.get(t);return(!n||e)&&(n=new Map,s.set(t,n)),n}getOptionScopes(t,e,s){const{options:n,type:r}=this,o=this._cachedScopes(t,s),a=o.get(e);if(a)return a;const c=new Set;e.forEach(h=>{t&&(c.add(t),h.forEach(d=>rn(c,t,d))),h.forEach(d=>rn(c,n,d)),h.forEach(d=>rn(c,gi[r]||{},d)),h.forEach(d=>rn(c,ut,d)),h.forEach(d=>rn(c,Sa,d))});const l=Array.from(c);return l.length===0&&l.push(Object.create(null)),af.has(e)&&o.set(e,l),l}chartOptionScopes(){const{options:t,type:e}=this;return[t,gi[e]||{},ut.datasets[e]||{},{type:e},ut,Sa]}resolveNamedOptions(t,e,s,n=[""]){const r={$shared:!0},{resolver:o,subPrefixes:a}=cf(this._resolverCache,t,n);let c=o;if(DI(o,e)){r.$shared=!1,s=Ke(s)?s():s;const l=this.createResolver(t,s,a);c=Yi(o,s,l)}for(const l of e)r[l]=c[l];return r}createResolver(t,e,s=[""],n){const{resolver:r}=cf(this._resolverCache,t,s);return K(e)?Yi(r,e,void 0,n):r}}function cf(i,t,e){let s=i.get(t);s||(s=new Map,i.set(t,s));const n=e.join();let r=s.get(n);return r||(r={resolver:Na(t,e),subPrefixes:e.filter(o=>!o.toLowerCase().includes("hover"))},s.set(n,r)),r}const RI=i=>K(i)&&Object.getOwnPropertyNames(i).some(t=>Ke(i[t]));function DI(i,t){const{isScriptable:e,isIndexable:s}=wu(i);for(const n of t){const r=e(n),o=s(n),a=(o||r)&&i[n];if(r&&(Ke(a)||RI(a))||o&&kt(a))return!0}return!1}var NI="4.5.0";const OI=["top","bottom","left","right","chartArea"];function lf(i,t){return i==="top"||i==="bottom"||OI.indexOf(i)===-1&&t==="x"}function hf(i,t){return function(e,s){return e[i]===s[i]?e[t]-s[t]:e[i]-s[i]}}function df(i){const t=i.chart,e=t.options.animation;t.notifyPlugins("afterRender"),lt(e&&e.onComplete,[i],t)}function LI(i){const t=i.chart,e=t.options.animation;lt(e&&e.onProgress,[i],t)}function uf(i){return Fa()&&typeof i=="string"?i=document.getElementById(i):i&&i.length&&(i=i[0]),i&&i.canvas&&(i=i.canvas),i}const Tr={},ff=i=>{const t=uf(i);return Object.values(Tr).filter(e=>e.canvas===t).pop()};function FI(i,t,e){const s=Object.keys(i);for(const n of s){const r=+n;if(r>=t){const o=i[n];delete i[n],(e>0||r>t)&&(i[r+e]=o)}}}function BI(i,t,e,s){return!e||i.type==="mouseout"?null:s?t:i}class Ka{static defaults=ut;static instances=Tr;static overrides=gi;static registry=he;static version=NI;static getChart=ff;static register(...t){he.add(...t),pf()}static unregister(...t){he.remove(...t),pf()}constructor(t,e){const s=this.config=new AI(e),n=uf(t),r=ff(n);if(r)throw new Error("Canvas is already in use. Chart with ID '"+r.id+"' must be destroyed before the canvas with ID '"+r.canvas.id+"' can be reused.");const o=s.createResolver(s.chartOptionScopes(),this.getContext());this.platform=new(s.platform||iI(n)),this.platform.updateConfig(s);const a=this.platform.acquireContext(n,o.aspectRatio),c=a&&a.canvas,l=c&&c.height,h=c&&c.width;if(this.id=u0(),this.ctx=a,this.canvas=c,this.width=h,this.height=l,this._options=o,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new bI,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=S0(d=>this.update(d),o.resizeDelay||0),this._dataChanges=[],Tr[this.id]=this,!a||!c){console.error("Failed to create chart: can't acquire context from the given item");return}ke.listen(this,"complete",df),ke.listen(this,"progress",LI),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:t,maintainAspectRatio:e},width:s,height:n,_aspectRatio:r}=this;return Rt(t)?e&&r?r:n?s/n:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}get registry(){return he}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():Tu(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return _u(this.canvas,this.ctx),this}stop(){return ke.stop(this),this}resize(t,e){ke.running(this)?this._resizeBeforeDraw={width:t,height:e}:this._resize(t,e)}_resize(t,e){const s=this.options,n=this.canvas,r=s.maintainAspectRatio&&this.aspectRatio,o=this.platform.getMaximumSize(n,t,e,r),a=s.devicePixelRatio||this.platform.getDevicePixelRatio(),c=this.width?"resize":"attach";this.width=o.width,this.height=o.height,this._aspectRatio=this.aspectRatio,Tu(this,a,!0)&&(this.notifyPlugins("resize",{size:o}),lt(s.onResize,[this,o],this),this.attached&&this._doResize(c)&&this.render())}ensureScalesHaveIDs(){const t=this.options.scales||{};X(t,(e,s)=>{e.id=s})}buildOrUpdateScales(){const t=this.options,e=t.scales,s=this.scales,n=Object.keys(s).reduce((o,a)=>(o[a]=!1,o),{});let r=[];e&&(r=r.concat(Object.keys(e).map(o=>{const a=e[o],c=Ya(o,a),l=c==="r",h=c==="x";return{options:a,dposition:l?"chartArea":h?"bottom":"left",dtype:l?"radialLinear":h?"category":"linear"}}))),X(r,o=>{const a=o.options,c=a.id,l=Ya(c,a),h=tt(a.type,o.dtype);(a.position===void 0||lf(a.position,l)!==lf(o.dposition))&&(a.position=o.dposition),n[c]=!0;let d=null;if(c in s&&s[c].type===h)d=s[c];else{const u=he.getScale(h);d=new u({id:c,type:h,ctx:this.ctx,chart:this}),s[d.id]=d}d.init(a,t)}),X(n,(o,a)=>{o||delete s[a]}),X(s,o=>{Ge.configure(this,o,o.options),Ge.addBox(this,o)})}_updateMetasets(){const t=this._metasets,e=this.data.datasets.length,s=t.length;if(t.sort((n,r)=>n.index-r.index),s>e){for(let n=e;n<s;++n)this._destroyDatasetMeta(n);t.splice(e,s-e)}this._sortedMetasets=t.slice(0).sort(hf("order","index"))}_removeUnreferencedMetasets(){const{_metasets:t,data:{datasets:e}}=this;t.length>e.length&&delete this._stacks,t.forEach((s,n)=>{e.filter(r=>r===s._dataset).length===0&&this._destroyDatasetMeta(n)})}buildOrUpdateControllers(){const t=[],e=this.data.datasets;let s,n;for(this._removeUnreferencedMetasets(),s=0,n=e.length;s<n;s++){const r=e[s];let o=this.getDatasetMeta(s);const a=r.type||this.config.type;if(o.type&&o.type!==a&&(this._destroyDatasetMeta(s),o=this.getDatasetMeta(s)),o.type=a,o.indexAxis=r.indexAxis||Va(a,this.options),o.order=r.order||0,o.index=s,o.label=""+r.label,o.visible=this.isDatasetVisible(s),o.controller)o.controller.updateIndex(s),o.controller.linkScales();else{const c=he.getController(a),{datasetElementType:l,dataElementType:h}=ut.datasets[a];Object.assign(c,{dataElementType:he.getElement(h),datasetElementType:l&&he.getElement(l)}),o.controller=new c(this,s),t.push(o.controller)}}return this._updateMetasets(),t}_resetElements(){X(this.data.datasets,(t,e)=>{this.getDatasetMeta(e).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){const e=this.config;e.update();const s=this._options=e.createResolver(e.chartOptionScopes(),this.getContext()),n=this._animationsDisabled=!s.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0})===!1)return;const r=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let o=0;for(let l=0,h=this.data.datasets.length;l<h;l++){const{controller:d}=this.getDatasetMeta(l),u=!n&&r.indexOf(d)===-1;d.buildOrUpdateElements(u),o=Math.max(+d.getMaxOverflow(),o)}o=this._minPadding=s.layout.autoPadding?o:0,this._updateLayout(o),n||X(r,l=>{l.reset()}),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort(hf("z","_idx"));const{_active:a,_lastEvent:c}=this;c?this._eventHandler(c,!0):a.length&&this._updateHoverStyles(a,a,!0),this.render()}_updateScales(){X(this.scales,t=>{Ge.removeBox(this,t)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const t=this.options,e=new Set(Object.keys(this._listeners)),s=new Set(t.events);(!tu(e,s)||!!this._responsiveListeners!==t.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:t}=this,e=this._getUniformDataChanges()||[];for(const{method:s,start:n,count:r}of e){const o=s==="_removeElements"?-r:r;FI(t,n,o)}}_getUniformDataChanges(){const t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];const e=this.data.datasets.length,s=r=>new Set(t.filter(o=>o[0]===r).map((o,a)=>a+","+o.splice(1).join(","))),n=s(0);for(let r=1;r<e;r++)if(!tu(n,s(r)))return;return Array.from(n).map(r=>r.split(",")).map(r=>({method:r[1],start:+r[2],count:+r[3]}))}_updateLayout(t){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;Ge.update(this,this.width,this.height,t);const e=this.chartArea,s=e.width<=0||e.height<=0;this._layers=[],X(this.boxes,n=>{s&&n.position==="chartArea"||(n.configure&&n.configure(),this._layers.push(...n._layers()))},this),this._layers.forEach((n,r)=>{n._idx=r}),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})!==!1){for(let e=0,s=this.data.datasets.length;e<s;++e)this.getDatasetMeta(e).controller.configure();for(let e=0,s=this.data.datasets.length;e<s;++e)this._updateDataset(e,Ke(t)?t({datasetIndex:e}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,e){const s=this.getDatasetMeta(t),n={meta:s,index:t,mode:e,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",n)!==!1&&(s.controller._update(e),n.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",n))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(ke.has(this)?this.attached&&!ke.running(this)&&ke.start(this):(this.draw(),df({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){const{width:s,height:n}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(s,n)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const e=this._layers;for(t=0;t<e.length&&e[t].z<=0;++t)e[t].draw(this.chartArea);for(this._drawDatasets();t<e.length;++t)e[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){const e=this._sortedMetasets,s=[];let n,r;for(n=0,r=e.length;n<r;++n){const o=e[n];(!t||o.visible)&&s.push(o)}return s}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const t=this.getSortedVisibleDatasetMetas();for(let e=t.length-1;e>=0;--e)this._drawDataset(t[e]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){const e=this.ctx,s={meta:t,index:t.index,cancelable:!0},n=px(this,t);this.notifyPlugins("beforeDatasetDraw",s)!==!1&&(n&&Ma(e,n),t.controller.draw(),n&&Aa(e),s.cancelable=!1,this.notifyPlugins("afterDatasetDraw",s))}isPointInArea(t){return bu(t,this.chartArea,this._minPadding)}getElementsAtEventForMode(t,e,s,n){const r=Ox.modes[e];return typeof r=="function"?r(this,t,s,n):[]}getDatasetMeta(t){const e=this.data.datasets[t],s=this._metasets;let n=s.filter(r=>r&&r._dataset===e).pop();return n||(n={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:e&&e.order||0,index:t,_dataset:e,_parsed:[],_sorted:!1},s.push(n)),n}getContext(){return this.$context||(this.$context=Vi(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){const e=this.data.datasets[t];if(!e)return!1;const s=this.getDatasetMeta(t);return typeof s.hidden=="boolean"?!s.hidden:!e.hidden}setDatasetVisibility(t,e){const s=this.getDatasetMeta(t);s.hidden=!e}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,e,s){const n=s?"show":"hide",r=this.getDatasetMeta(t),o=r.controller._resolveAnimations(void 0,n);hr(e)?(r.data[e].hidden=!s,this.update()):(this.setDatasetVisibility(t,s),o.update(r,{visible:s}),this.update(a=>a.datasetIndex===t?n:void 0))}hide(t,e){this._updateVisibility(t,e,!1)}show(t,e){this._updateVisibility(t,e,!0)}_destroyDatasetMeta(t){const e=this._metasets[t];e&&e.controller&&e.controller._destroy(),delete this._metasets[t]}_stop(){let t,e;for(this.stop(),ke.remove(this),t=0,e=this.data.datasets.length;t<e;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:t,ctx:e}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),_u(t,e),this.platform.releaseContext(e),this.canvas=null,this.ctx=null),delete Tr[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const t=this._listeners,e=this.platform,s=(r,o)=>{e.addEventListener(this,r,o),t[r]=o},n=(r,o,a)=>{r.offsetX=o,r.offsetY=a,this._eventHandler(r)};X(this.options.events,r=>s(r,n))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const t=this._responsiveListeners,e=this.platform,s=(c,l)=>{e.addEventListener(this,c,l),t[c]=l},n=(c,l)=>{t[c]&&(e.removeEventListener(this,c,l),delete t[c])},r=(c,l)=>{this.canvas&&this.resize(c,l)};let o;const a=()=>{n("attach",a),this.attached=!0,this.resize(),s("resize",r),s("detach",o)};o=()=>{this.attached=!1,n("resize",r),this._stop(),this._resize(0,0),s("attach",a)},e.isAttached(this.canvas)?a():o()}unbindEvents(){X(this._listeners,(t,e)=>{this.platform.removeEventListener(this,e,t)}),this._listeners={},X(this._responsiveListeners,(t,e)=>{this.platform.removeEventListener(this,e,t)}),this._responsiveListeners=void 0}updateHoverStyle(t,e,s){const n=s?"set":"remove";let r,o,a,c;for(e==="dataset"&&(r=this.getDatasetMeta(t[0].datasetIndex),r.controller["_"+n+"DatasetHoverStyle"]()),a=0,c=t.length;a<c;++a){o=t[a];const l=o&&this.getDatasetMeta(o.datasetIndex).controller;l&&l[n+"HoverStyle"](o.element,o.datasetIndex,o.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){const e=this._active||[],s=t.map(({datasetIndex:n,index:r})=>{const o=this.getDatasetMeta(n);if(!o)throw new Error("No dataset found at index "+n);return{datasetIndex:n,element:o.data[r],index:r}});!ar(s,e)&&(this._active=s,this._lastEvent=null,this._updateHoverStyles(s,e))}notifyPlugins(t,e,s){return this._plugins.notify(this,t,e,s)}isPluginEnabled(t){return this._plugins._cache.filter(e=>e.plugin.id===t).length===1}_updateHoverStyles(t,e,s){const n=this.options.hover,r=(c,l)=>c.filter(h=>!l.some(d=>h.datasetIndex===d.datasetIndex&&h.index===d.index)),o=r(e,t),a=s?t:r(t,e);o.length&&this.updateHoverStyle(o,n.mode,!1),a.length&&n.mode&&this.updateHoverStyle(a,n.mode,!0)}_eventHandler(t,e){const s={event:t,replay:e,cancelable:!0,inChartArea:this.isPointInArea(t)},n=o=>(o.options.events||this.options.events).includes(t.native.type);if(this.notifyPlugins("beforeEvent",s,n)===!1)return;const r=this._handleEvent(t,e,s.inChartArea);return s.cancelable=!1,this.notifyPlugins("afterEvent",s,n),(r||s.changed)&&this.render(),this}_handleEvent(t,e,s){const{_active:n=[],options:r}=this,o=e,a=this._getActiveElements(t,n,s,o),c=y0(t),l=BI(t,this._lastEvent,s,c);s&&(this._lastEvent=null,lt(r.onHover,[t,a,this],this),c&&lt(r.onClick,[t,a,this],this));const h=!ar(a,n);return(h||e)&&(this._active=a,this._updateHoverStyles(a,n,e)),this._lastEvent=l,h}_getActiveElements(t,e,s,n){if(t.type==="mouseout")return[];if(!s)return e;const r=this.options.hover;return this.getElementsAtEventForMode(t,r.mode,r,n)}}function pf(){return X(Ka.instances,i=>i._plugins.invalidate())}function UI(i,t,e){const{startAngle:s,x:n,y:r,outerRadius:o,innerRadius:a,options:c}=t,{borderWidth:l,borderJoinStyle:h}=c,d=Math.min(l/o,ce(s-e));if(i.beginPath(),i.arc(n,r,o-l/2,s+d/2,e-d/2),a>0){const u=Math.min(l/a,ce(s-e));i.arc(n,r,a+l/2,e-u/2,s+u/2,!0)}else{const u=Math.min(l/2,o*ce(s-e));if(h==="round")i.arc(n,r,u,e-at/2,s+at/2,!0);else if(h==="bevel"){const f=2*u*u,p=-f*Math.cos(e+at/2)+n,m=-f*Math.sin(e+at/2)+r,_=f*Math.cos(s+at/2)+n,v=f*Math.sin(s+at/2)+r;i.lineTo(p,m),i.lineTo(_,v)}}i.closePath(),i.moveTo(0,0),i.rect(0,0,i.canvas.width,i.canvas.height),i.clip("evenodd")}function HI(i,t,e){const{startAngle:s,pixelMargin:n,x:r,y:o,outerRadius:a,innerRadius:c}=t;let l=n/a;i.beginPath(),i.arc(r,o,a,s-l,e+l),c>n?(l=n/c,i.arc(r,o,c,e+l,s-l,!0)):i.arc(r,o,n,e+_t,s-_t),i.closePath(),i.clip()}function WI(i){return Da(i,["outerStart","outerEnd","innerStart","innerEnd"])}function $I(i,t,e,s){const n=WI(i.options.borderRadius),r=(e-t)/2,o=Math.min(r,s*t/2),a=c=>{const l=(e-Math.min(r,c))*s/2;return le(c,0,Math.min(r,l))};return{outerStart:a(n.outerStart),outerEnd:a(n.outerEnd),innerStart:le(n.innerStart,0,o),innerEnd:le(n.innerEnd,0,o)}}function Gi(i,t,e,s){return{x:e+i*Math.cos(t),y:s+i*Math.sin(t)}}function Sr(i,t,e,s,n,r){const{x:o,y:a,startAngle:c,pixelMargin:l,innerRadius:h}=t,d=Math.max(t.outerRadius+s+e-l,0),u=h>0?h+s+e+l:0;let f=0;const p=n-c;if(s){const F=h>0?h-s:0,st=d>0?d-s:0,Nt=(F+st)/2,zt=Nt!==0?p*Nt/(Nt+s):p;f=(p-zt)/2}const m=Math.max(.001,p*d-e/at)/d,_=(p-m)/2,v=c+_+f,I=n-_-f,{outerStart:x,outerEnd:C,innerStart:E,innerEnd:L}=$I(t,u,d,I-v),z=d-x,H=d-C,it=v+x/z,$=I-C/H,G=u+E,q=u+L,Dt=v+E/G,Pt=I-L/q;if(i.beginPath(),r){const F=(it+$)/2;if(i.arc(o,a,d,it,F),i.arc(o,a,d,F,$),C>0){const Et=Gi(H,$,o,a);i.arc(Et.x,Et.y,C,$,I+_t)}const st=Gi(q,I,o,a);if(i.lineTo(st.x,st.y),L>0){const Et=Gi(q,Pt,o,a);i.arc(Et.x,Et.y,L,I+_t,Pt+Math.PI)}const Nt=(I-L/u+(v+E/u))/2;if(i.arc(o,a,u,I-L/u,Nt,!0),i.arc(o,a,u,Nt,v+E/u,!0),E>0){const Et=Gi(G,Dt,o,a);i.arc(Et.x,Et.y,E,Dt+Math.PI,v-_t)}const zt=Gi(z,v,o,a);if(i.lineTo(zt.x,zt.y),x>0){const Et=Gi(z,it,o,a);i.arc(Et.x,Et.y,x,v-_t,it)}}else{i.moveTo(o,a);const F=Math.cos(it)*d+o,st=Math.sin(it)*d+a;i.lineTo(F,st);const Nt=Math.cos($)*d+o,zt=Math.sin($)*d+a;i.lineTo(Nt,zt)}i.closePath()}function zI(i,t,e,s,n){const{fullCircles:r,startAngle:o,circumference:a}=t;let c=t.endAngle;if(r){Sr(i,t,e,s,c,n);for(let l=0;l<r;++l)i.fill();isNaN(a)||(c=o+(a%ft||ft))}return Sr(i,t,e,s,c,n),i.fill(),c}function jI(i,t,e,s,n){const{fullCircles:r,startAngle:o,circumference:a,options:c}=t,{borderWidth:l,borderJoinStyle:h,borderDash:d,borderDashOffset:u,borderRadius:f}=c,p=c.borderAlign==="inner";if(!l)return;i.setLineDash(d||[]),i.lineDashOffset=u,p?(i.lineWidth=l*2,i.lineJoin=h||"round"):(i.lineWidth=l,i.lineJoin=h||"bevel");let m=t.endAngle;if(r){Sr(i,t,e,s,m,n);for(let _=0;_<r;++_)i.stroke();isNaN(a)||(m=o+(a%ft||ft))}p&&HI(i,t,m),c.selfJoin&&m-o>=at&&f===0&&h!=="miter"&&UI(i,t,m),r||(Sr(i,t,e,s,m,n),i.stroke())}class qI extends sn{static id="arc";static defaults={borderAlign:"center",borderColor:"#fff",borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0,selfJoin:!1};static defaultRoutes={backgroundColor:"backgroundColor"};static descriptors={_scriptable:!0,_indexable:t=>t!=="borderDash"};circumference;endAngle;fullCircles;innerRadius;outerRadius;pixelMargin;startAngle;constructor(t){super(),this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,t&&Object.assign(this,t)}inRange(t,e,s){const n=this.getProps(["x","y"],s),{angle:r,distance:o}=nu(n,{x:t,y:e}),{startAngle:a,endAngle:c,innerRadius:l,outerRadius:h,circumference:d}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],s),u=(this.options.spacing+this.options.borderWidth)/2,f=tt(d,c-a),p=ur(r,a,c)&&a!==c,m=f>=ft||p,_=Ys(o,l+u,h+u);return m&&_}getCenterPoint(t){const{x:e,y:s,startAngle:n,endAngle:r,innerRadius:o,outerRadius:a}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],t),{offset:c,spacing:l}=this.options,h=(n+r)/2,d=(o+a+l+c)/2;return{x:e+Math.cos(h)*d,y:s+Math.sin(h)*d}}tooltipPosition(t){return this.getCenterPoint(t)}draw(t){const{options:e,circumference:s}=this,n=(e.offset||0)/4,r=(e.spacing||0)/2,o=e.circular;if(this.pixelMargin=e.borderAlign==="inner"?.33:0,this.fullCircles=s>ft?Math.floor(s/ft):0,s===0||this.innerRadius<0||this.outerRadius<0)return;t.save();const a=(this.startAngle+this.endAngle)/2;t.translate(Math.cos(a)*n,Math.sin(a)*n);const c=1-Math.sin(Math.min(at,s||0)),l=n*c;t.fillStyle=e.backgroundColor,t.strokeStyle=e.borderColor,zI(t,this,l,r,o),jI(t,this,l,r,o),t.restore()}}const gf=(i,t)=>{let{boxHeight:e=t,boxWidth:s=t}=i;return i.usePointStyle&&(e=Math.min(e,t),s=i.pointStyleWidth||Math.min(s,t)),{boxWidth:s,boxHeight:e,itemHeight:Math.max(t,e)}},VI=(i,t)=>i!==null&&t!==null&&i.datasetIndex===t.datasetIndex&&i.index===t.index;class mf extends sn{constructor(t){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e,s){this.maxWidth=t,this.maxHeight=e,this._margins=s,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const t=this.options.labels||{};let e=lt(t.generateLabels,[this.chart],this)||[];t.filter&&(e=e.filter(s=>t.filter(s,this.chart.data))),t.sort&&(e=e.sort((s,n)=>t.sort(s,n,this.chart.data))),this.options.reverse&&e.reverse(),this.legendItems=e}fit(){const{options:t,ctx:e}=this;if(!t.display){this.width=this.height=0;return}const s=t.labels,n=Ut(s.font),r=n.size,o=this._computeTitleHeight(),{boxWidth:a,itemHeight:c}=gf(s,r);let l,h;e.font=n.string,this.isHorizontal()?(l=this.maxWidth,h=this._fitRows(o,r,a,c)+10):(h=this.maxHeight,l=this._fitCols(o,n,a,c)+10),this.width=Math.min(l,t.maxWidth||this.maxWidth),this.height=Math.min(h,t.maxHeight||this.maxHeight)}_fitRows(t,e,s,n){const{ctx:r,maxWidth:o,options:{labels:{padding:a}}}=this,c=this.legendHitBoxes=[],l=this.lineWidths=[0],h=n+a;let d=t;r.textAlign="left",r.textBaseline="middle";let u=-1,f=-h;return this.legendItems.forEach((p,m)=>{const _=s+e/2+r.measureText(p.text).width;(m===0||l[l.length-1]+_+2*a>o)&&(d+=h,l[l.length-(m>0?0:1)]=0,f+=h,u++),c[m]={left:0,top:f,row:u,width:_,height:n},l[l.length-1]+=_+a}),d}_fitCols(t,e,s,n){const{ctx:r,maxHeight:o,options:{labels:{padding:a}}}=this,c=this.legendHitBoxes=[],l=this.columnSizes=[],h=o-t;let d=a,u=0,f=0,p=0,m=0;return this.legendItems.forEach((_,v)=>{const{itemWidth:I,itemHeight:x}=YI(s,e,r,_,n);v>0&&f+x+2*a>h&&(d+=u+a,l.push({width:u,height:f}),p+=u+a,m++,u=f=0),c[v]={left:p,top:f,col:m,width:I,height:x},u=Math.max(u,I),f+=x+a}),d+=u,l.push({width:u,height:f}),d}adjustHitBoxes(){if(!this.options.display)return;const t=this._computeTitleHeight(),{legendHitBoxes:e,options:{align:s,labels:{padding:n},rtl:r}}=this,o=Ki(r,this.left,this.width);if(this.isHorizontal()){let a=0,c=$t(s,this.left+n,this.right-this.lineWidths[a]);for(const l of e)a!==l.row&&(a=l.row,c=$t(s,this.left+n,this.right-this.lineWidths[a])),l.top+=this.top+t+n,l.left=o.leftForLtr(o.x(c),l.width),c+=l.width+n}else{let a=0,c=$t(s,this.top+t+n,this.bottom-this.columnSizes[a].height);for(const l of e)l.col!==a&&(a=l.col,c=$t(s,this.top+t+n,this.bottom-this.columnSizes[a].height)),l.top=c,l.left+=this.left+n,l.left=o.leftForLtr(o.x(l.left),l.width),c+=l.height+n}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){const t=this.ctx;Ma(t,this),this._draw(),Aa(t)}}_draw(){const{options:t,columnSizes:e,lineWidths:s,ctx:n}=this,{align:r,labels:o}=t,a=ut.color,c=Ki(t.rtl,this.left,this.width),l=Ut(o.font),{padding:h}=o,d=l.size,u=d/2;let f;this.drawTitle(),n.textAlign=c.textAlign("left"),n.textBaseline="middle",n.lineWidth=.5,n.font=l.string;const{boxWidth:p,boxHeight:m,itemHeight:_}=gf(o,d),v=function(L,z,H){if(isNaN(p)||p<=0||isNaN(m)||m<0)return;n.save();const it=tt(H.lineWidth,1);if(n.fillStyle=tt(H.fillStyle,a),n.lineCap=tt(H.lineCap,"butt"),n.lineDashOffset=tt(H.lineDashOffset,0),n.lineJoin=tt(H.lineJoin,"miter"),n.lineWidth=it,n.strokeStyle=tt(H.strokeStyle,a),n.setLineDash(tt(H.lineDash,[])),o.usePointStyle){const $={radius:m*Math.SQRT2/2,pointStyle:H.pointStyle,rotation:H.rotation,borderWidth:it},G=c.xPlus(L,p/2),q=z+u;vu(n,$,G,q,o.pointStyleWidth&&p)}else{const $=z+Math.max((d-m)/2,0),G=c.leftForLtr(L,p),q=Js(H.borderRadius);n.beginPath(),Object.values(q).some(Dt=>Dt!==0)?Ra(n,{x:G,y:$,w:p,h:m,radius:q}):n.rect(G,$,p,m),n.fill(),it!==0&&n.stroke()}n.restore()},I=function(L,z,H){pr(n,H.text,L,z+_/2,l,{strikethrough:H.hidden,textAlign:c.textAlign(H.textAlign)})},x=this.isHorizontal(),C=this._computeTitleHeight();x?f={x:$t(r,this.left+h,this.right-s[0]),y:this.top+h+C,line:0}:f={x:this.left+h,y:$t(r,this.top+C+h,this.bottom-e[0].height),line:0},Pu(this.ctx,t.textDirection);const E=_+h;this.legendItems.forEach((L,z)=>{n.strokeStyle=L.fontColor,n.fillStyle=L.fontColor;const H=n.measureText(L.text).width,it=c.textAlign(L.textAlign||(L.textAlign=o.textAlign)),$=p+u+H;let G=f.x,q=f.y;c.setWidth(this.width),x?z>0&&G+$+h>this.right&&(q=f.y+=E,f.line++,G=f.x=$t(r,this.left+h,this.right-s[f.line])):z>0&&q+E>this.bottom&&(G=f.x=G+e[f.line].width+h,f.line++,q=f.y=$t(r,this.top+C+h,this.bottom-e[f.line].height));const Dt=c.x(G);if(v(Dt,q,L),G=P0(it,G+p+u,x?G+$:this.right,t.rtl),I(c.x(G),q,L),x)f.x+=$+h;else if(typeof L.text!="string"){const Pt=l.lineHeight;f.y+=_f(L,Pt)+h}else f.y+=E}),Mu(this.ctx,t.textDirection)}drawTitle(){const t=this.options,e=t.title,s=Ut(e.font),n=Xt(e.padding);if(!e.display)return;const r=Ki(t.rtl,this.left,this.width),o=this.ctx,a=e.position,c=s.size/2,l=n.top+c;let h,d=this.left,u=this.width;if(this.isHorizontal())u=Math.max(...this.lineWidths),h=this.top+l,d=$t(t.align,d,this.right-u);else{const p=this.columnSizes.reduce((m,_)=>Math.max(m,_.height),0);h=l+$t(t.align,this.top,this.bottom-p-t.labels.padding-this._computeTitleHeight())}const f=$t(a,d,d+u);o.textAlign=r.textAlign(hu(a)),o.textBaseline="middle",o.strokeStyle=e.color,o.fillStyle=e.color,o.font=s.string,pr(o,e.text,f,h,s)}_computeTitleHeight(){const t=this.options.title,e=Ut(t.font),s=Xt(t.padding);return t.display?e.lineHeight+s.height:0}_getLegendItemAt(t,e){let s,n,r;if(Ys(t,this.left,this.right)&&Ys(e,this.top,this.bottom)){for(r=this.legendHitBoxes,s=0;s<r.length;++s)if(n=r[s],Ys(t,n.left,n.left+n.width)&&Ys(e,n.top,n.top+n.height))return this.legendItems[s]}return null}handleEvent(t){const e=this.options;if(!JI(t.type,e))return;const s=this._getLegendItemAt(t.x,t.y);if(t.type==="mousemove"||t.type==="mouseout"){const n=this._hoveredItem,r=VI(n,s);n&&!r&&lt(e.onLeave,[t,n,this],this),this._hoveredItem=s,s&&!r&&lt(e.onHover,[t,s,this],this)}else s&&lt(e.onClick,[t,s,this],this)}}function YI(i,t,e,s,n){const r=KI(s,i,t,e),o=GI(n,s,t.lineHeight);return{itemWidth:r,itemHeight:o}}function KI(i,t,e,s){let n=i.text;return n&&typeof n!="string"&&(n=n.reduce((r,o)=>r.length>o.length?r:o)),t+e.size/2+s.measureText(n).width}function GI(i,t,e){let s=i;return typeof t.text!="string"&&(s=_f(t,e)),s}function _f(i,t){const e=i.text?i.text.length:0;return t*e}function JI(i,t){return!!((i==="mousemove"||i==="mouseout")&&(t.onHover||t.onLeave)||t.onClick&&(i==="click"||i==="mouseup"))}var QI={id:"legend",_element:mf,start(i,t,e){const s=i.legend=new mf({ctx:i.ctx,options:e,chart:i});Ge.configure(i,s,e),Ge.addBox(i,s)},stop(i){Ge.removeBox(i,i.legend),delete i.legend},beforeUpdate(i,t,e){const s=i.legend;Ge.configure(i,s,e),s.options=e},afterUpdate(i){const t=i.legend;t.buildLabels(),t.adjustHitBoxes()},afterEvent(i,t){t.replay||i.legend.handleEvent(t.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(i,t,e){const s=t.datasetIndex,n=e.chart;n.isDatasetVisible(s)?(n.hide(s),t.hidden=!0):(n.show(s),t.hidden=!1)},onHover:null,onLeave:null,labels:{color:i=>i.chart.options.color,boxWidth:40,padding:10,generateLabels(i){const t=i.data.datasets,{labels:{usePointStyle:e,pointStyle:s,textAlign:n,color:r,useBorderRadius:o,borderRadius:a}}=i.legend.options;return i._getSortedDatasetMetas().map(c=>{const l=c.controller.getStyle(e?0:void 0),h=Xt(l.borderWidth);return{text:t[c.index].label,fillStyle:l.backgroundColor,fontColor:r,hidden:!c.visible,lineCap:l.borderCapStyle,lineDash:l.borderDash,lineDashOffset:l.borderDashOffset,lineJoin:l.borderJoinStyle,lineWidth:(h.width+h.height)/4,strokeStyle:l.borderColor,pointStyle:s||l.pointStyle,rotation:l.rotation,textAlign:n||l.textAlign,borderRadius:o&&(a||l.borderRadius),datasetIndex:c.index}},this)}},title:{color:i=>i.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:i=>!i.startsWith("on"),labels:{_scriptable:i=>!["generateLabels","filter","sort"].includes(i)}}};const on={average(i){if(!i.length)return!1;let t,e,s=new Set,n=0,r=0;for(t=0,e=i.length;t<e;++t){const o=i[t].element;if(o&&o.hasValue()){const a=o.tooltipPosition();s.add(a.x),n+=a.y,++r}}return r===0||s.size===0?!1:{x:[...s].reduce((o,a)=>o+a)/s.size,y:n/r}},nearest(i,t){if(!i.length)return!1;let e=t.x,s=t.y,n=Number.POSITIVE_INFINITY,r,o,a;for(r=0,o=i.length;r<o;++r){const c=i[r].element;if(c&&c.hasValue()){const l=c.getCenterPoint(),h=I0(t,l);h<n&&(n=h,a=c)}}if(a){const c=a.tooltipPosition();e=c.x,s=c.y}return{x:e,y:s}}};function de(i,t){return t&&(kt(t)?Array.prototype.push.apply(i,t):i.push(t)),i}function Ee(i){return(typeof i=="string"||i instanceof String)&&i.indexOf(`
`)>-1?i.split(`
`):i}function XI(i,t){const{element:e,datasetIndex:s,index:n}=t,r=i.getDatasetMeta(s).controller,{label:o,value:a}=r.getLabelAndValue(n);return{chart:i,label:o,parsed:r.getParsed(n),raw:i.data.datasets[s].data[n],formattedValue:a,dataset:r.getDataset(),dataIndex:n,datasetIndex:s,element:e}}function yf(i,t){const e=i.chart.ctx,{body:s,footer:n,title:r}=i,{boxWidth:o,boxHeight:a}=t,c=Ut(t.bodyFont),l=Ut(t.titleFont),h=Ut(t.footerFont),d=r.length,u=n.length,f=s.length,p=Xt(t.padding);let m=p.height,_=0,v=s.reduce((C,E)=>C+E.before.length+E.lines.length+E.after.length,0);if(v+=i.beforeBody.length+i.afterBody.length,d&&(m+=d*l.lineHeight+(d-1)*t.titleSpacing+t.titleMarginBottom),v){const C=t.displayColors?Math.max(a,c.lineHeight):c.lineHeight;m+=f*C+(v-f)*c.lineHeight+(v-1)*t.bodySpacing}u&&(m+=t.footerMarginTop+u*h.lineHeight+(u-1)*t.footerSpacing);let I=0;const x=function(C){_=Math.max(_,e.measureText(C).width+I)};return e.save(),e.font=l.string,X(i.title,x),e.font=c.string,X(i.beforeBody.concat(i.afterBody),x),I=t.displayColors?o+2+t.boxPadding:0,X(s,C=>{X(C.before,x),X(C.lines,x),X(C.after,x)}),I=0,e.font=h.string,X(i.footer,x),e.restore(),_+=p.width,{width:_,height:m}}function ZI(i,t){const{y:e,height:s}=t;return e<s/2?"top":e>i.height-s/2?"bottom":"center"}function tC(i,t,e,s){const{x:n,width:r}=s,o=e.caretSize+e.caretPadding;if(i==="left"&&n+r+o>t.width||i==="right"&&n-r-o<0)return!0}function eC(i,t,e,s){const{x:n,width:r}=e,{width:o,chartArea:{left:a,right:c}}=i;let l="center";return s==="center"?l=n<=(a+c)/2?"left":"right":n<=r/2?l="left":n>=o-r/2&&(l="right"),tC(l,i,t,e)&&(l="center"),l}function vf(i,t,e){const s=e.yAlign||t.yAlign||ZI(i,e);return{xAlign:e.xAlign||t.xAlign||eC(i,t,e,s),yAlign:s}}function iC(i,t){let{x:e,width:s}=i;return t==="right"?e-=s:t==="center"&&(e-=s/2),e}function sC(i,t,e){let{y:s,height:n}=i;return t==="top"?s+=e:t==="bottom"?s-=n+e:s-=n/2,s}function bf(i,t,e,s){const{caretSize:n,caretPadding:r,cornerRadius:o}=i,{xAlign:a,yAlign:c}=e,l=n+r,{topLeft:h,topRight:d,bottomLeft:u,bottomRight:f}=Js(o);let p=iC(t,a);const m=sC(t,c,l);return c==="center"?a==="left"?p+=l:a==="right"&&(p-=l):a==="left"?p-=Math.max(h,u)+n:a==="right"&&(p+=Math.max(d,f)+n),{x:le(p,0,s.width-t.width),y:le(m,0,s.height-t.height)}}function Pr(i,t,e){const s=Xt(e.padding);return t==="center"?i.x+i.width/2:t==="right"?i.x+i.width-s.right:i.x+s.left}function wf(i){return de([],Ee(i))}function nC(i,t,e){return Vi(i,{tooltip:t,tooltipItems:e,type:"tooltip"})}function xf(i,t){const e=t&&t.dataset&&t.dataset.tooltip&&t.dataset.tooltip.callbacks;return e?i.override(e):i}const If={beforeTitle:Ce,title(i){if(i.length>0){const t=i[0],e=t.chart.data.labels,s=e?e.length:0;if(this&&this.options&&this.options.mode==="dataset")return t.dataset.label||"";if(t.label)return t.label;if(s>0&&t.dataIndex<s)return e[t.dataIndex]}return""},afterTitle:Ce,beforeBody:Ce,beforeLabel:Ce,label(i){if(this&&this.options&&this.options.mode==="dataset")return i.label+": "+i.formattedValue||i.formattedValue;let t=i.dataset.label||"";t&&(t+=": ");const e=i.formattedValue;return Rt(e)||(t+=e),t},labelColor(i){const t=i.chart.getDatasetMeta(i.datasetIndex).controller.getStyle(i.dataIndex);return{borderColor:t.borderColor,backgroundColor:t.backgroundColor,borderWidth:t.borderWidth,borderDash:t.borderDash,borderDashOffset:t.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(i){const t=i.chart.getDatasetMeta(i.datasetIndex).controller.getStyle(i.dataIndex);return{pointStyle:t.pointStyle,rotation:t.rotation}},afterLabel:Ce,afterBody:Ce,beforeFooter:Ce,footer:Ce,afterFooter:Ce};function Ht(i,t,e,s){const n=i[t].call(e,s);return typeof n>"u"?If[t].call(e,s):n}class Cf extends sn{static positioners=on;constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const t=this._cachedAnimations;if(t)return t;const e=this.chart,s=this.options.setContext(this.getContext()),n=s.enabled&&e.options.animation&&s.animations,r=new Ru(this.chart,n);return n._cacheable&&(this._cachedAnimations=Object.freeze(r)),r}getContext(){return this.$context||(this.$context=nC(this.chart.getContext(),this,this._tooltipItems))}getTitle(t,e){const{callbacks:s}=e,n=Ht(s,"beforeTitle",this,t),r=Ht(s,"title",this,t),o=Ht(s,"afterTitle",this,t);let a=[];return a=de(a,Ee(n)),a=de(a,Ee(r)),a=de(a,Ee(o)),a}getBeforeBody(t,e){return wf(Ht(e.callbacks,"beforeBody",this,t))}getBody(t,e){const{callbacks:s}=e,n=[];return X(t,r=>{const o={before:[],lines:[],after:[]},a=xf(s,r);de(o.before,Ee(Ht(a,"beforeLabel",this,r))),de(o.lines,Ht(a,"label",this,r)),de(o.after,Ee(Ht(a,"afterLabel",this,r))),n.push(o)}),n}getAfterBody(t,e){return wf(Ht(e.callbacks,"afterBody",this,t))}getFooter(t,e){const{callbacks:s}=e,n=Ht(s,"beforeFooter",this,t),r=Ht(s,"footer",this,t),o=Ht(s,"afterFooter",this,t);let a=[];return a=de(a,Ee(n)),a=de(a,Ee(r)),a=de(a,Ee(o)),a}_createItems(t){const e=this._active,s=this.chart.data,n=[],r=[],o=[];let a=[],c,l;for(c=0,l=e.length;c<l;++c)a.push(XI(this.chart,e[c]));return t.filter&&(a=a.filter((h,d,u)=>t.filter(h,d,u,s))),t.itemSort&&(a=a.sort((h,d)=>t.itemSort(h,d,s))),X(a,h=>{const d=xf(t.callbacks,h);n.push(Ht(d,"labelColor",this,h)),r.push(Ht(d,"labelPointStyle",this,h)),o.push(Ht(d,"labelTextColor",this,h))}),this.labelColors=n,this.labelPointStyles=r,this.labelTextColors=o,this.dataPoints=a,a}update(t,e){const s=this.options.setContext(this.getContext()),n=this._active;let r,o=[];if(!n.length)this.opacity!==0&&(r={opacity:0});else{const a=on[s.position].call(this,n,this._eventPosition);o=this._createItems(s),this.title=this.getTitle(o,s),this.beforeBody=this.getBeforeBody(o,s),this.body=this.getBody(o,s),this.afterBody=this.getAfterBody(o,s),this.footer=this.getFooter(o,s);const c=this._size=yf(this,s),l=Object.assign({},a,c),h=vf(this.chart,s,l),d=bf(s,l,h,this.chart);this.xAlign=h.xAlign,this.yAlign=h.yAlign,r={opacity:1,x:d.x,y:d.y,width:c.width,height:c.height,caretX:a.x,caretY:a.y}}this._tooltipItems=o,this.$context=void 0,r&&this._resolveAnimations().update(this,r),t&&s.external&&s.external.call(this,{chart:this.chart,tooltip:this,replay:e})}drawCaret(t,e,s,n){const r=this.getCaretPosition(t,s,n);e.lineTo(r.x1,r.y1),e.lineTo(r.x2,r.y2),e.lineTo(r.x3,r.y3)}getCaretPosition(t,e,s){const{xAlign:n,yAlign:r}=this,{caretSize:o,cornerRadius:a}=s,{topLeft:c,topRight:l,bottomLeft:h,bottomRight:d}=Js(a),{x:u,y:f}=t,{width:p,height:m}=e;let _,v,I,x,C,E;return r==="center"?(C=f+m/2,n==="left"?(_=u,v=_-o,x=C+o,E=C-o):(_=u+p,v=_+o,x=C-o,E=C+o),I=_):(n==="left"?v=u+Math.max(c,h)+o:n==="right"?v=u+p-Math.max(l,d)-o:v=this.caretX,r==="top"?(x=f,C=x-o,_=v-o,I=v+o):(x=f+m,C=x+o,_=v+o,I=v-o),E=x),{x1:_,x2:v,x3:I,y1:x,y2:C,y3:E}}drawTitle(t,e,s){const n=this.title,r=n.length;let o,a,c;if(r){const l=Ki(s.rtl,this.x,this.width);for(t.x=Pr(this,s.titleAlign,s),e.textAlign=l.textAlign(s.titleAlign),e.textBaseline="middle",o=Ut(s.titleFont),a=s.titleSpacing,e.fillStyle=s.titleColor,e.font=o.string,c=0;c<r;++c)e.fillText(n[c],l.x(t.x),t.y+o.lineHeight/2),t.y+=o.lineHeight+a,c+1===r&&(t.y+=s.titleMarginBottom-a)}}_drawColorBox(t,e,s,n,r){const o=this.labelColors[s],a=this.labelPointStyles[s],{boxHeight:c,boxWidth:l}=r,h=Ut(r.bodyFont),d=Pr(this,"left",r),u=n.x(d),f=c<h.lineHeight?(h.lineHeight-c)/2:0,p=e.y+f;if(r.usePointStyle){const m={radius:Math.min(l,c)/2,pointStyle:a.pointStyle,rotation:a.rotation,borderWidth:1},_=n.leftForLtr(u,l)+l/2,v=p+c/2;t.strokeStyle=r.multiKeyBackground,t.fillStyle=r.multiKeyBackground,yu(t,m,_,v),t.strokeStyle=o.borderColor,t.fillStyle=o.backgroundColor,yu(t,m,_,v)}else{t.lineWidth=K(o.borderWidth)?Math.max(...Object.values(o.borderWidth)):o.borderWidth||1,t.strokeStyle=o.borderColor,t.setLineDash(o.borderDash||[]),t.lineDashOffset=o.borderDashOffset||0;const m=n.leftForLtr(u,l),_=n.leftForLtr(n.xPlus(u,1),l-2),v=Js(o.borderRadius);Object.values(v).some(I=>I!==0)?(t.beginPath(),t.fillStyle=r.multiKeyBackground,Ra(t,{x:m,y:p,w:l,h:c,radius:v}),t.fill(),t.stroke(),t.fillStyle=o.backgroundColor,t.beginPath(),Ra(t,{x:_,y:p+1,w:l-2,h:c-2,radius:v}),t.fill()):(t.fillStyle=r.multiKeyBackground,t.fillRect(m,p,l,c),t.strokeRect(m,p,l,c),t.fillStyle=o.backgroundColor,t.fillRect(_,p+1,l-2,c-2))}t.fillStyle=this.labelTextColors[s]}drawBody(t,e,s){const{body:n}=this,{bodySpacing:r,bodyAlign:o,displayColors:a,boxHeight:c,boxWidth:l,boxPadding:h}=s,d=Ut(s.bodyFont);let u=d.lineHeight,f=0;const p=Ki(s.rtl,this.x,this.width),m=function(H){e.fillText(H,p.x(t.x+f),t.y+u/2),t.y+=u+r},_=p.textAlign(o);let v,I,x,C,E,L,z;for(e.textAlign=o,e.textBaseline="middle",e.font=d.string,t.x=Pr(this,_,s),e.fillStyle=s.bodyColor,X(this.beforeBody,m),f=a&&_!=="right"?o==="center"?l/2+h:l+2+h:0,C=0,L=n.length;C<L;++C){for(v=n[C],I=this.labelTextColors[C],e.fillStyle=I,X(v.before,m),x=v.lines,a&&x.length&&(this._drawColorBox(e,t,C,p,s),u=Math.max(d.lineHeight,c)),E=0,z=x.length;E<z;++E)m(x[E]),u=d.lineHeight;X(v.after,m)}f=0,u=d.lineHeight,X(this.afterBody,m),t.y-=r}drawFooter(t,e,s){const n=this.footer,r=n.length;let o,a;if(r){const c=Ki(s.rtl,this.x,this.width);for(t.x=Pr(this,s.footerAlign,s),t.y+=s.footerMarginTop,e.textAlign=c.textAlign(s.footerAlign),e.textBaseline="middle",o=Ut(s.footerFont),e.fillStyle=s.footerColor,e.font=o.string,a=0;a<r;++a)e.fillText(n[a],c.x(t.x),t.y+o.lineHeight/2),t.y+=o.lineHeight+s.footerSpacing}}drawBackground(t,e,s,n){const{xAlign:r,yAlign:o}=this,{x:a,y:c}=t,{width:l,height:h}=s,{topLeft:d,topRight:u,bottomLeft:f,bottomRight:p}=Js(n.cornerRadius);e.fillStyle=n.backgroundColor,e.strokeStyle=n.borderColor,e.lineWidth=n.borderWidth,e.beginPath(),e.moveTo(a+d,c),o==="top"&&this.drawCaret(t,e,s,n),e.lineTo(a+l-u,c),e.quadraticCurveTo(a+l,c,a+l,c+u),o==="center"&&r==="right"&&this.drawCaret(t,e,s,n),e.lineTo(a+l,c+h-p),e.quadraticCurveTo(a+l,c+h,a+l-p,c+h),o==="bottom"&&this.drawCaret(t,e,s,n),e.lineTo(a+f,c+h),e.quadraticCurveTo(a,c+h,a,c+h-f),o==="center"&&r==="left"&&this.drawCaret(t,e,s,n),e.lineTo(a,c+d),e.quadraticCurveTo(a,c,a+d,c),e.closePath(),e.fill(),n.borderWidth>0&&e.stroke()}_updateAnimationTarget(t){const e=this.chart,s=this.$animations,n=s&&s.x,r=s&&s.y;if(n||r){const o=on[t.position].call(this,this._active,this._eventPosition);if(!o)return;const a=this._size=yf(this,t),c=Object.assign({},o,this._size),l=vf(e,t,c),h=bf(t,c,l,e);(n._to!==h.x||r._to!==h.y)&&(this.xAlign=l.xAlign,this.yAlign=l.yAlign,this.width=a.width,this.height=a.height,this.caretX=o.x,this.caretY=o.y,this._resolveAnimations().update(this,h))}}_willRender(){return!!this.opacity}draw(t){const e=this.options.setContext(this.getContext());let s=this.opacity;if(!s)return;this._updateAnimationTarget(e);const n={width:this.width,height:this.height},r={x:this.x,y:this.y};s=Math.abs(s)<.001?0:s;const o=Xt(e.padding),a=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;e.enabled&&a&&(t.save(),t.globalAlpha=s,this.drawBackground(r,t,n,e),Pu(t,e.textDirection),r.y+=o.top,this.drawTitle(r,t,e),this.drawBody(r,t,e),this.drawFooter(r,t,e),Mu(t,e.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,e){const s=this._active,n=t.map(({datasetIndex:a,index:c})=>{const l=this.chart.getDatasetMeta(a);if(!l)throw new Error("Cannot find a dataset at index "+a);return{datasetIndex:a,element:l.data[c],index:c}}),r=!ar(s,n),o=this._positionChanged(n,e);(r||o)&&(this._active=n,this._eventPosition=e,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,e,s=!0){if(e&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const n=this.options,r=this._active||[],o=this._getActiveElements(t,r,e,s),a=this._positionChanged(o,t),c=e||!ar(o,r)||a;return c&&(this._active=o,(n.enabled||n.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,e))),c}_getActiveElements(t,e,s,n){const r=this.options;if(t.type==="mouseout")return[];if(!n)return e.filter(a=>this.chart.data.datasets[a.datasetIndex]&&this.chart.getDatasetMeta(a.datasetIndex).controller.getParsed(a.index)!==void 0);const o=this.chart.getElementsAtEventForMode(t,r.mode,r,s);return r.reverse&&o.reverse(),o}_positionChanged(t,e){const{caretX:s,caretY:n,options:r}=this,o=on[r.position].call(this,t,e);return o!==!1&&(s!==o.x||n!==o.y)}}var rC={id:"tooltip",_element:Cf,positioners:on,afterInit(i,t,e){e&&(i.tooltip=new Cf({chart:i,options:e}))},beforeUpdate(i,t,e){i.tooltip&&i.tooltip.initialize(e)},reset(i,t,e){i.tooltip&&i.tooltip.initialize(e)},afterDraw(i){const t=i.tooltip;if(t&&t._willRender()){const e={tooltip:t};if(i.notifyPlugins("beforeTooltipDraw",{...e,cancelable:!0})===!1)return;t.draw(i.ctx),i.notifyPlugins("afterTooltipDraw",e)}},afterEvent(i,t){if(i.tooltip){const e=t.replay;i.tooltip.handleEvent(t.event,e,t.inChartArea)&&(t.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(i,t)=>t.bodyFont.size,boxWidth:(i,t)=>t.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:If},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:i=>i!=="filter"&&i!=="itemSort"&&i!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]},Mr={};(function i(t,e,s,n){var r=!!(t.Worker&&t.Blob&&t.Promise&&t.OffscreenCanvas&&t.OffscreenCanvasRenderingContext2D&&t.HTMLCanvasElement&&t.HTMLCanvasElement.prototype.transferControlToOffscreen&&t.URL&&t.URL.createObjectURL),o=typeof Path2D=="function"&&typeof DOMMatrix=="function",a=function(){if(!t.OffscreenCanvas)return!1;var y=new OffscreenCanvas(1,1),g=y.getContext("2d");g.fillRect(0,0,1,1);var k=y.transferToImageBitmap();try{g.createPattern(k,"no-repeat")}catch{return!1}return!0}();function c(){}function l(y){var g=e.exports.Promise,k=g!==void 0?g:t.Promise;return typeof k=="function"?new k(y):(y(c,c),null)}var h=function(y,g){return{transform:function(k){if(y)return k;if(g.has(k))return g.get(k);var T=new OffscreenCanvas(k.width,k.height),M=T.getContext("2d");return M.drawImage(k,0,0),g.set(k,T),T},clear:function(){g.clear()}}}(a,new Map),d=function(){var y=Math.floor(16.666666666666668),g,k,T={},M=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(g=function(R){var A=Math.random();return T[A]=requestAnimationFrame(function D(j){M===j||M+y-1<j?(M=j,delete T[A],R()):T[A]=requestAnimationFrame(D)}),A},k=function(R){T[R]&&cancelAnimationFrame(T[R])}):(g=function(R){return setTimeout(R,y)},k=function(R){return clearTimeout(R)}),{frame:g,cancel:k}}(),u=function(){var y,g,k={};function T(M){function R(A,D){M.postMessage({options:A||{},callback:D})}M.init=function(A){var D=A.transferControlToOffscreen();M.postMessage({canvas:D},[D])},M.fire=function(A,D,j){if(g)return R(A,null),g;var J=Math.random().toString(36).slice(2);return g=l(function(It){function nt(pt){pt.data.callback===J&&(delete k[J],M.removeEventListener("message",nt),g=null,h.clear(),j(),It())}M.addEventListener("message",nt),R(A,J),k[J]=nt.bind(null,{data:{callback:J}})}),g},M.reset=function(){M.postMessage({reset:!0});for(var A in k)k[A](),delete k[A]}}return function(){if(y)return y;if(!s&&r){var M=["var CONFETTI, SIZE = {}, module = {};","("+i.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{y=new Worker(URL.createObjectURL(new Blob([M])))}catch(R){return typeof console!==void 0&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",R),null}T(y)}return y}}(),f={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function p(y,g){return g?g(y):y}function m(y){return y!=null}function _(y,g,k){return p(y&&m(y[g])?y[g]:f[g],k)}function v(y){return y<0?0:Math.floor(y)}function I(y,g){return Math.floor(Math.random()*(g-y))+y}function x(y){return parseInt(y,16)}function C(y){return y.map(E)}function E(y){var g=String(y).replace(/[^0-9a-f]/gi,"");return g.length<6&&(g=g[0]+g[0]+g[1]+g[1]+g[2]+g[2]),{r:x(g.substring(0,2)),g:x(g.substring(2,4)),b:x(g.substring(4,6))}}function L(y){var g=_(y,"origin",Object);return g.x=_(g,"x",Number),g.y=_(g,"y",Number),g}function z(y){y.width=document.documentElement.clientWidth,y.height=document.documentElement.clientHeight}function H(y){var g=y.getBoundingClientRect();y.width=g.width,y.height=g.height}function it(y){var g=document.createElement("canvas");return g.style.position="fixed",g.style.top="0px",g.style.left="0px",g.style.pointerEvents="none",g.style.zIndex=y,g}function $(y,g,k,T,M,R,A,D,j){y.save(),y.translate(g,k),y.rotate(R),y.scale(T,M),y.arc(0,0,1,A,D,j),y.restore()}function G(y){var g=y.angle*(Math.PI/180),k=y.spread*(Math.PI/180);return{x:y.x,y:y.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:y.startVelocity*.5+Math.random()*y.startVelocity,angle2D:-g+(.5*k-Math.random()*k),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:y.color,shape:y.shape,tick:0,totalTicks:y.ticks,decay:y.decay,drift:y.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:y.gravity*3,ovalScalar:.6,scalar:y.scalar,flat:y.flat}}function q(y,g){g.x+=Math.cos(g.angle2D)*g.velocity+g.drift,g.y+=Math.sin(g.angle2D)*g.velocity+g.gravity,g.velocity*=g.decay,g.flat?(g.wobble=0,g.wobbleX=g.x+10*g.scalar,g.wobbleY=g.y+10*g.scalar,g.tiltSin=0,g.tiltCos=0,g.random=1):(g.wobble+=g.wobbleSpeed,g.wobbleX=g.x+10*g.scalar*Math.cos(g.wobble),g.wobbleY=g.y+10*g.scalar*Math.sin(g.wobble),g.tiltAngle+=.1,g.tiltSin=Math.sin(g.tiltAngle),g.tiltCos=Math.cos(g.tiltAngle),g.random=Math.random()+2);var k=g.tick++/g.totalTicks,T=g.x+g.random*g.tiltCos,M=g.y+g.random*g.tiltSin,R=g.wobbleX+g.random*g.tiltCos,A=g.wobbleY+g.random*g.tiltSin;if(y.fillStyle="rgba("+g.color.r+", "+g.color.g+", "+g.color.b+", "+(1-k)+")",y.beginPath(),o&&g.shape.type==="path"&&typeof g.shape.path=="string"&&Array.isArray(g.shape.matrix))y.fill(Nt(g.shape.path,g.shape.matrix,g.x,g.y,Math.abs(R-T)*.1,Math.abs(A-M)*.1,Math.PI/10*g.wobble));else if(g.shape.type==="bitmap"){var D=Math.PI/10*g.wobble,j=Math.abs(R-T)*.1,J=Math.abs(A-M)*.1,It=g.shape.bitmap.width*g.scalar,nt=g.shape.bitmap.height*g.scalar,pt=new DOMMatrix([Math.cos(D)*j,Math.sin(D)*j,-Math.sin(D)*J,Math.cos(D)*J,g.x,g.y]);pt.multiplySelf(new DOMMatrix(g.shape.matrix));var Ot=y.createPattern(h.transform(g.shape.bitmap),"no-repeat");Ot.setTransform(pt),y.globalAlpha=1-k,y.fillStyle=Ot,y.fillRect(g.x-It/2,g.y-nt/2,It,nt),y.globalAlpha=1}else if(g.shape==="circle")y.ellipse?y.ellipse(g.x,g.y,Math.abs(R-T)*g.ovalScalar,Math.abs(A-M)*g.ovalScalar,Math.PI/10*g.wobble,0,2*Math.PI):$(y,g.x,g.y,Math.abs(R-T)*g.ovalScalar,Math.abs(A-M)*g.ovalScalar,Math.PI/10*g.wobble,0,2*Math.PI);else if(g.shape==="star")for(var V=Math.PI/2*3,Wt=4*g.scalar,Zt=8*g.scalar,te=g.x,Te=g.y,vi=5,ue=Math.PI/vi;vi--;)te=g.x+Math.cos(V)*Zt,Te=g.y+Math.sin(V)*Zt,y.lineTo(te,Te),V+=ue,te=g.x+Math.cos(V)*Wt,Te=g.y+Math.sin(V)*Wt,y.lineTo(te,Te),V+=ue;else y.moveTo(Math.floor(g.x),Math.floor(g.y)),y.lineTo(Math.floor(g.wobbleX),Math.floor(M)),y.lineTo(Math.floor(R),Math.floor(A)),y.lineTo(Math.floor(T),Math.floor(g.wobbleY));return y.closePath(),y.fill(),g.tick<g.totalTicks}function Dt(y,g,k,T,M){var R=g.slice(),A=y.getContext("2d"),D,j,J=l(function(It){function nt(){D=j=null,A.clearRect(0,0,T.width,T.height),h.clear(),M(),It()}function pt(){s&&!(T.width===n.width&&T.height===n.height)&&(T.width=y.width=n.width,T.height=y.height=n.height),!T.width&&!T.height&&(k(y),T.width=y.width,T.height=y.height),A.clearRect(0,0,T.width,T.height),R=R.filter(function(Ot){return q(A,Ot)}),R.length?D=d.frame(pt):nt()}D=d.frame(pt),j=nt});return{addFettis:function(It){return R=R.concat(It),J},canvas:y,promise:J,reset:function(){D&&d.cancel(D),j&&j()}}}function Pt(y,g){var k=!y,T=!!_(g||{},"resize"),M=!1,R=_(g,"disableForReducedMotion",Boolean),A=r&&!!_(g||{},"useWorker"),D=A?u():null,j=k?z:H,J=y&&D?!!y.__confetti_initialized:!1,It=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,nt;function pt(V,Wt,Zt){for(var te=_(V,"particleCount",v),Te=_(V,"angle",Number),vi=_(V,"spread",Number),ue=_(V,"startVelocity",Number),QC=_(V,"decay",Number),XC=_(V,"gravity",Number),ZC=_(V,"drift",Number),Nf=_(V,"colors",C),tk=_(V,"ticks",Number),Of=_(V,"shapes"),ek=_(V,"scalar"),ik=!!_(V,"flat"),Lf=L(V),Ff=te,Qa=[],sk=y.width*Lf.x,nk=y.height*Lf.y;Ff--;)Qa.push(G({x:sk,y:nk,angle:Te,spread:vi,startVelocity:ue,color:Nf[Ff%Nf.length],shape:Of[I(0,Of.length)],ticks:tk,decay:QC,gravity:XC,drift:ZC,scalar:ek,flat:ik}));return nt?nt.addFettis(Qa):(nt=Dt(y,Qa,j,Wt,Zt),nt.promise)}function Ot(V){var Wt=R||_(V,"disableForReducedMotion",Boolean),Zt=_(V,"zIndex",Number);if(Wt&&It)return l(function(ue){ue()});k&&nt?y=nt.canvas:k&&!y&&(y=it(Zt),document.body.appendChild(y)),T&&!J&&j(y);var te={width:y.width,height:y.height};D&&!J&&D.init(y),J=!0,D&&(y.__confetti_initialized=!0);function Te(){if(D){var ue={getBoundingClientRect:function(){if(!k)return y.getBoundingClientRect()}};j(ue),D.postMessage({resize:{width:ue.width,height:ue.height}});return}te.width=te.height=null}function vi(){nt=null,T&&(M=!1,t.removeEventListener("resize",Te)),k&&y&&(document.body.contains(y)&&document.body.removeChild(y),y=null,J=!1)}return T&&!M&&(M=!0,t.addEventListener("resize",Te,!1)),D?D.fire(V,te,vi):pt(V,te,vi)}return Ot.reset=function(){D&&D.reset(),nt&&nt.reset()},Ot}var F;function st(){return F||(F=Pt(null,{useWorker:!0,resize:!0})),F}function Nt(y,g,k,T,M,R,A){var D=new Path2D(y),j=new Path2D;j.addPath(D,new DOMMatrix(g));var J=new Path2D;return J.addPath(j,new DOMMatrix([Math.cos(A)*M,Math.sin(A)*M,-Math.sin(A)*R,Math.cos(A)*R,k,T])),J}function zt(y){if(!o)throw new Error("path confetti are not supported in this browser");var g,k;typeof y=="string"?g=y:(g=y.path,k=y.matrix);var T=new Path2D(g),M=document.createElement("canvas"),R=M.getContext("2d");if(!k){for(var A=1e3,D=A,j=A,J=0,It=0,nt,pt,Ot=0;Ot<A;Ot+=2)for(var V=0;V<A;V+=2)R.isPointInPath(T,Ot,V,"nonzero")&&(D=Math.min(D,Ot),j=Math.min(j,V),J=Math.max(J,Ot),It=Math.max(It,V));nt=J-D,pt=It-j;var Wt=10,Zt=Math.min(Wt/nt,Wt/pt);k=[Zt,0,0,Zt,-Math.round(nt/2+D)*Zt,-Math.round(pt/2+j)*Zt]}return{type:"path",path:g,matrix:k}}function Et(y){var g,k=1,T="#000000",M='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof y=="string"?g=y:(g=y.text,k="scalar"in y?y.scalar:k,M="fontFamily"in y?y.fontFamily:M,T="color"in y?y.color:T);var R=10*k,A=""+R+"px "+M,D=new OffscreenCanvas(R,R),j=D.getContext("2d");j.font=A;var J=j.measureText(g),It=Math.ceil(J.actualBoundingBoxRight+J.actualBoundingBoxLeft),nt=Math.ceil(J.actualBoundingBoxAscent+J.actualBoundingBoxDescent),pt=2,Ot=J.actualBoundingBoxLeft+pt,V=J.actualBoundingBoxAscent+pt;It+=pt+pt,nt+=pt+pt,D=new OffscreenCanvas(It,nt),j=D.getContext("2d"),j.font=A,j.fillStyle=T,j.fillText(g,Ot,V);var Wt=1/k;return{type:"bitmap",bitmap:D.transferToImageBitmap(),matrix:[Wt,0,0,Wt,-It*Wt/2,-nt*Wt/2]}}e.exports=function(){return st().apply(this,arguments)},e.exports.reset=function(){st().reset()},e.exports.create=Pt,e.exports.shapeFromPath=zt,e.exports.shapeFromText=Et})(function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}}(),Mr,!1);const Ji=Mr.exports;Mr.exports.create,Ka.register(Mx,qI,rC,QI);let Je=null;async function oC(){try{const i=document.getElementById("drinkType").value,t=parseInt(document.getElementById("drinkAmount").value)||0,e=parseFloat(document.getElementById("alcoholPercent").value)||0;if(t<=0){w("❌ Please enter a valid amount","error");return}const s={id:Date.now(),type:i,amount:t,alcoholPercent:e,pureAlcohol:(t*e/100).toFixed(1),time:new Date,emoji:$i[i].emoji};let n=O().drinkHistory||[];n.unshift(s),xt("drinkHistory",n),Or(),Ar(),Rr(),Dr(),Nr();const r=Q(),o=ct();if(r&&o)try{await Ct(N(r,"users/"+o.uid+"/drinks/"+s.id),{...s,time:s.time.toISOString()})}catch(a){console.warn("Firebase save failed (non-critical):",a)}typeof onDrinkLogged=="function"&&onDrinkLogged(i,n),i==="water"?(typeof window.confetti=="function"&&window.confetti({particleCount:50,spread:60,colors:["#00d4ff","#0099ff","#0066ff"],origin:{y:.6}}),w("💧 Great job staying hydrated!","success")):w(`${s.emoji} Drink logged!`),document.getElementById("drinkAmount").value=$i[i].amount,document.getElementById("alcoholPercent").value=$i[i].alcohol}catch(i){console.error("Error logging drink:",i),w("❌ Failed to log drink","error")}}function Ar(){try{const i=O().drinkHistory||[],t=Date.now()-36e5,e=i.filter(h=>h.type!=="water").length,s=i.filter(h=>h.type==="water").length,n=i.reduce((h,d)=>h+parseFloat(d.pureAlcohol||0),0),r=i.filter(h=>new Date(h.time).getTime()>t&&h.type!=="water").length,o=document.getElementById("totalDrinks");o&&(o.textContent=e);const a=document.getElementById("totalWater");a&&(a.textContent=s);const c=document.getElementById("totalAlcohol");c&&(c.textContent=n.toFixed(0)+"ml");const l=document.getElementById("drinkRate");l&&(l.textContent=r+"/hr")}catch(i){console.error("Error updating drink stats:",i)}}function Rr(){try{const i=document.getElementById("drinkHistory");if(!i)return;const t=O().drinkHistory||[];if(t.length===0){i.innerHTML='<p style="text-align: center; opacity: 0.7;">No drinks logged yet</p>';return}i.innerHTML=t.slice(0,20).map(e=>`
            <div class="buddy-card" style="margin: 10px 0;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div style="font-size: 2em;">${e.emoji}</div>
                        <div>
                            <div style="font-weight: bold;">${e.type.charAt(0).toUpperCase()+e.type.slice(1)}</div>
                            <div style="opacity: 0.7; font-size: 0.9em;">
                                ${e.amount}ml • ${e.alcoholPercent}% • ${e.pureAlcohol}ml pure
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 0.9em;">${Ga(e.time)}</div>
                        <button class="btn" style="padding: 5px 10px; margin-top: 5px;" onclick="removeDrink(${e.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join("")}catch(i){console.error("Error updating drink history:",i)}}function Dr(){try{const i=document.getElementById("drinkChart"),t=O().chartVisible;if(!i||!t)return;const e=O().drinkHistory||[],s={};if(e.forEach(a=>{s[a.type]||(s[a.type]=0),s[a.type]++}),Object.keys(s).length===0){Je&&(Je.destroy(),Je=null);return}const n=Object.keys(s),r=Object.values(s),o=n.map(a=>$i[a]?.emoji||"🍹");Je?(Je.data.labels=n.map((a,c)=>`${o[c]} ${a}`),Je.data.datasets[0].data=r,Je.update()):Je=new Ka(i,{type:"doughnut",data:{labels:n.map((a,c)=>`${o[c]} ${a}`),datasets:[{data:r,backgroundColor:["#00ff88","#00d4ff","#ff00ff","#ffcc00","#ff4444","#0099ff","#00ccff","#ff0088"],borderColor:"rgba(255, 255, 255, 0.1)",borderWidth:2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",labels:{color:"#fff",padding:10,font:{size:window.innerWidth<768?10:12}}}}}})}catch(i){console.error("Error updating drink chart:",i)}}function Nr(){const i=document.getElementById("emergencySummary");if(!i)return;const t=O().drinkHistory||[],e=t.reduce((a,c)=>a+parseFloat(c.pureAlcohol),0),s=t.length>0?((Date.now()-t[t.length-1].time)/36e5).toFixed(1):0,n={};t.forEach(a=>{n[a.type]||(n[a.type]=0),n[a.type]++});const r=localStorage.getItem("medicalInfo")||"None provided",o=localStorage.getItem("safetyNotes")||"None provided";i.innerHTML=`
        <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 15px; margin: 10px 0;">
            <p><strong>Time Period:</strong> ${s} hours</p>
            <p><strong>Total Pure Alcohol:</strong> ${e.toFixed(0)}ml</p>
            <p><strong>Drink Breakdown:</strong></p>
            <ul style="margin-left: 20px;">
                ${Object.entries(n).map(([a,c])=>`<li>${$i[a].emoji} ${a}: ${c}</li>`).join("")}
            </ul>
            <p><strong>Last Drink:</strong> ${t.length>0?Ga(t[0].time):"None"}</p>
            <p><strong>Estimated BAC:</strong> ${Ef().toFixed(3)}‰</p>
            <p><strong>Medical Info:</strong> ${fi(r)}</p>
            <p><strong>Safety Notes:</strong> ${fi(o)}</p>
        </div>
    `}function aC(i){let t=O().drinkHistory||[];t=t.filter(e=>e.id!==i),xt("drinkHistory",t),Or(),Ar(),Rr(),Dr(),Nr(),w("🗑️ Drink removed")}function cC(){let i=O().chartVisible;i=!i,xt("chartVisible",i);const t=document.getElementById("chartWrapper"),e=document.getElementById("chartToggleText");i?(t.classList.remove("collapsed"),e.textContent="Hide Chart"):(t.classList.add("collapsed"),e.textContent="Show Chart")}function lC(){try{const i=O().drinkHistory||[],t=O().userData,e=ct(),s={timestamp:new Date().toISOString(),estimatedBAC:Ef().toFixed(3),drinkHistory:i,totalAlcohol:i.reduce((o,a)=>o+parseFloat(a.pureAlcohol||0),0),userData:{name:t.username||e?.email||"Unknown",address:localStorage.getItem("homeAddress")||"Not provided",emergencyContact:localStorage.getItem("emergencyContact")||"Not provided",medicalInfo:localStorage.getItem("medicalInfo")||"None",safetyNotes:localStorage.getItem("safetyNotes")||"None"}},n=`EMERGENCY MEDICAL REPORT
========================
Generated: ${new Date().toLocaleString()}
Patient: ${s.userData.name}
Address: ${s.userData.address}
Emergency Contact: ${s.userData.emergencyContact}

MEDICAL INFORMATION
-------------------
${s.userData.medicalInfo}

SAFETY NOTES
------------
${s.userData.safetyNotes}

ALCOHOL CONSUMPTION SUMMARY
---------------------------
Estimated BAC: ${s.estimatedBAC}‰
Total Pure Alcohol: ${s.totalAlcohol.toFixed(0)}ml
Number of Drinks: ${i.filter(o=>o.type!=="water").length}
Water Consumed: ${i.filter(o=>o.type==="water").length} glasses

DETAILED DRINK LOG
------------------
${i.map(o=>`${Ga(o.time)}: ${o.emoji} ${o.type} - ${o.amount}ml @ ${o.alcoholPercent}%`).join(`
`)}

MEDICAL NOTES
-------------
- Monitor for signs of alcohol poisoning
- Ensure airway remains clear
- Check vitals regularly
- Consider IV fluids if dehydrated`,r=`
            <h2>🚨 Emergency Medical Report</h2>
            <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 15px; margin: 20px 0; max-height: 400px; overflow-y: auto;">
                <pre style="white-space: pre-wrap; font-family: monospace; font-size: 0.9em;">${fi(n)}</pre>
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
        `;window.currentEmergencyReport=n,document.getElementById("modalBody").innerHTML=r,document.getElementById("modal").classList.add("show")}catch(i){console.error("Error generating emergency report:",i),w("❌ Error generating report","error")}}function kf(){window.currentEmergencyReport&&navigator.clipboard.writeText(window.currentEmergencyReport).then(()=>w("📋 Report copied to clipboard!","success")).catch(()=>{const i=document.createElement("textarea");i.value=window.currentEmergencyReport,document.body.appendChild(i),i.select(),document.execCommand("copy"),document.body.removeChild(i),w("📋 Report copied!","success")})}function hC(){try{const i=new Blob([window.currentEmergencyReport],{type:"text/plain"}),t=window.URL.createObjectURL(i),e=document.createElement("a");e.href=t,e.download=`emergency_report_${new Date().toISOString().slice(0,10)}.txt`,document.body.appendChild(e),e.click(),document.body.removeChild(e),window.URL.revokeObjectURL(t),w("📥 Report downloaded!","success")}catch(i){console.error("Download error:",i),w("❌ Download failed - use copy instead","error")}}function dC(){navigator.share&&window.currentEmergencyReport?navigator.share({title:"Emergency Medical Report",text:window.currentEmergencyReport}).then(()=>w("📤 Report shared!","success")).catch(()=>w("❌ Sharing cancelled")):(kf(),w("📋 Report copied - share manually"))}function uC(){if(confirm("Clear all drink history? This cannot be undone!")){xt("drinkHistory",[]),Or(),Ar(),Rr(),Dr(),Nr();const i=Q(),t=ct();i&&t&&re(N(i,"users/"+t.uid+"/drinks")),w("🗑️ Drink history cleared")}}function Or(){const i=O().drinkHistory||[];localStorage.setItem("drinkHistory",JSON.stringify(i))}function fC(){const i=localStorage.getItem("drinkHistory");if(i)try{const t=JSON.parse(i);t.forEach(e=>{e.time=new Date(e.time)}),xt("drinkHistory",t)}catch(t){console.error("Failed to load drink history:",t)}}function Ga(i){const t=new Date,e=new Date(i),s=Math.floor((t-e)/6e4);return s<1?"Just now":s<60?`${s}m ago`:s<1440?`${Math.floor(s/60)}h ago`:e.toLocaleDateString()}function Ef(){const i=O().drinkHistory||[],t=i.reduce((n,r)=>n+parseFloat(r.pureAlcohol),0),e=i.length>0?(Date.now()-i[i.length-1].time)/36e5:0,s=t*.789;return Math.max(0,s/(70*1e3*.68)*100-.015*e)}const Lr={neverHaveIEver:["Never have I ever skipped a lecture for a party","Never have I ever kissed someone at a HSG party","Never have I ever failed an exam because of partying","Never have I ever woken up in the library","Never have I ever used ChatGPT for an assignment","Never have I ever been to a professor's office hours drunk","Never have I ever stolen food from a dorm kitchen","Never have I ever dated someone from my study group","Never have I ever fallen asleep during a presentation","Never have I ever pretended to be sick to avoid a group project"],truths:["What's your most embarrassing HSG moment?","Who's your secret crush on campus?","What's the worst grade you've ever gotten?","Have you ever cheated on an exam?","What's your biggest fear about graduation?","Which professor do you have a crush on?","What's the craziest thing you've done at HSG?"],dares:["Text your crush right now!","Do 20 pushups","Sing the HSG anthem","Call a random contact and say 'I love you'","Post an embarrassing photo on Instagram","Dance without music for 1 minute","Let someone go through your phone for 30 seconds"],trivia:[{question:"When was HSG founded?",options:["1898","1923","1945","1967"],correct:0},{question:"What does HSG stand for?",options:["High School Gymnasium","Hochschule St. Gallen","Higher Studies Group","Helvetic Study Group"],correct:1},{question:"How many students attend HSG?",options:["5,000","9,000","12,000","15,000"],correct:1},{question:"What's the most popular major at HSG?",options:["Law","Business Administration","Computer Science","International Affairs"],correct:1}]},ht={flipTimer:null,flipTime:0,bestFlipTime:null,triviaScore:0,currentTriviaIndex:0};function pC(i){xt("currentGame",i);const t=document.createElement("div");t.className="game-overlay",t.id="gameOverlay";let e="";switch(i){case"never-have-i-ever":e=gC();break;case"truth-or-dare":e=mC();break;case"kings-cup":e=_C();break;case"beer-pong":e=yC();break;case"flip-cup":e=vC();break;case"trivia":e=bC();break}t.innerHTML=`
        <div class="game-container">
            <div class="game-header">
                <div class="game-title">${AC(i)}</div>
                <div class="close-game" onclick="closeGame()">×</div>
            </div>
            ${e}
        </div>
    `,document.body.appendChild(t),setTimeout(()=>t.classList.add("show"),10),wC(i),Ji&&Ji({particleCount:100,spread:70,origin:{y:.6}})}function Tf(){const i=document.getElementById("gameOverlay");i&&(i.classList.remove("show"),setTimeout(()=>i.remove(),500)),xt("currentGame",null)}function gC(){return`
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
    `}function mC(){return`
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
    `}function _C(){return`
        <div style="text-align: center;">
            <div style="font-size: 6em; margin: 20px 0;" id="currentCard">🎴</div>
            <button class="btn btn-primary" onclick="drawCard()">
                <i class="fas fa-clone"></i> Draw Card
            </button>
        </div>
        <div class="question-card" id="gameQuestion">
            Click "Draw Card" to start!
        </div>
    `}function yC(){return`
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
    `}function vC(){return`
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
    `}function bC(){return`
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
    `}function wC(i){switch(i){case"beer-pong":xt("gameScores",{team1:0,team2:0}),Ja();break;case"trivia":ht.triviaScore=0,ht.currentTriviaIndex=0,document.getElementById("triviaScore").textContent="0";break}}function xC(){const i=Lr.neverHaveIEver,t=Math.floor(Math.random()*i.length);document.getElementById("gameQuestion").textContent=i[t]}function IC(){const i=Lr.truths,t=Math.floor(Math.random()*i.length);document.getElementById("gameQuestion").textContent=i[t],Sf()}function CC(){const i=Lr.dares,t=Math.floor(Math.random()*i.length);document.getElementById("gameQuestion").textContent=i[t],Sf()}function Sf(){const i=O().partyData||{},t=Object.values(i).map(n=>n.name);t.length===0&&t.push("You");const e=Math.floor(Math.random()*t.length),s=t[e];document.getElementById("playerName").textContent=`${s}'s turn!`}function kC(){const i=["A","2","3","4","5","6","7","8","9","10","J","Q","K"],t=["♠️","♥️","♦️","♣️"],e=i[Math.floor(Math.random()*i.length)],s=t[Math.floor(Math.random()*t.length)];document.getElementById("currentCard").textContent=e+s;const n={A:"🍉 Waterfall - Everyone drinks!",2:"👉 You - Choose someone to drink",3:"👈 Me - You drink!",4:"👯 Floor - Last to touch floor drinks",5:"🙋 Guys - All guys drink",6:"💃 Chicks - All girls drink",7:"🌈 Heaven - Last to raise hand drinks",8:"🤝 Mate - Choose a drinking buddy",9:"🎵 Rhyme - Say a word, others rhyme",10:"📏 Categories - Name things in category",J:"👑 Make a Rule",Q:"❓ Questions - Ask questions only",K:"🏆 King's Cup - Pour into center cup"};document.getElementById("gameQuestion").textContent=n[e]}function EC(i){let t=O().gameScores||{team1:0,team2:0};t[i]++,xt("gameScores",t),Ja(),t[i]>=10&&(document.getElementById("gameStatus").textContent=`${i==="team1"?"Team 1":"Team 2"} Wins! 🏆`,Ji&&Ji({particleCount:200,spread:70,origin:{y:.6}}))}function Ja(){const i=O().gameScores||{team1:0,team2:0};document.getElementById("team1Score").textContent=i.team1,document.getElementById("team2Score").textContent=i.team2}function TC(){xt("gameScores",{team1:0,team2:0}),Ja(),document.getElementById("gameStatus").textContent=""}function SC(){const i=document.getElementById("timerBtn");ht.flipTimer?(clearInterval(ht.flipTimer),ht.flipTimer=null,i.innerHTML='<i class="fas fa-play"></i> Start Timer',(!ht.bestFlipTime||ht.flipTime<ht.bestFlipTime)&&(ht.bestFlipTime=ht.flipTime,document.getElementById("bestTime").textContent=`Best Time: ${Pf(ht.bestFlipTime)}`,Ji&&Ji({particleCount:100,spread:70,origin:{y:.6}}))):(ht.flipTime=0,ht.flipTimer=setInterval(()=>{ht.flipTime++,document.getElementById("flipTimer").textContent=Pf(ht.flipTime)},10),i.innerHTML='<i class="fas fa-pause"></i> Stop Timer')}function PC(){ht.flipTimer&&(clearInterval(ht.flipTimer),ht.flipTimer=null),ht.flipTime=0,document.getElementById("flipTimer").textContent="00:00",document.getElementById("timerBtn").innerHTML='<i class="fas fa-play"></i> Start Timer'}function Pf(i){const t=Math.floor(i/6e3),e=Math.floor(i%6e3/100),s=i%100;return`${t.toString().padStart(2,"0")}:${e.toString().padStart(2,"0")}.${s.toString().padStart(2,"0")}`}function Mf(){const i=Lr.trivia,t=i[ht.currentTriviaIndex%i.length];document.getElementById("gameQuestion").textContent=t.question;const e=t.options.map((s,n)=>`<button class="btn" style="width: 100%; margin: 10px 0;" onclick="answerTrivia(${n}, ${t.correct})">${s}</button>`).join("");document.getElementById("triviaOptions").innerHTML=e,ht.currentTriviaIndex++}function MC(i,t){const e=document.getElementById("triviaOptions").querySelectorAll("button");i===t?(ht.triviaScore++,document.getElementById("triviaScore").textContent=ht.triviaScore,e[i].style.background="linear-gradient(45deg, #00ff88, #00d4ff)",w("✅ Correct! +1 point")):(e[i].style.background="linear-gradient(45deg, #ff4444, #ff0088)",e[t].style.background="linear-gradient(45deg, #00ff88, #00d4ff)",w("❌ Wrong answer!")),e.forEach(s=>s.disabled=!0),setTimeout(Mf,2e3)}function AC(i){return{"never-have-i-ever":"🙊 Never Have I Ever","truth-or-dare":"🎯 Truth or Dare","kings-cup":"👑 King's Cup","beer-pong":"🏓 Beer Pong","flip-cup":"🥤 Flip Cup",trivia:"🧠 HSG Trivia"}[i]||"Party Game"}const Af={firstTimer:{name:"First Timer",icon:"🎉",description:"Joined your first party!",requirement:1,progress:0,unlocked:!1,category:"beginner"},responsible:{name:"Responsible",icon:"😇",description:"Stayed under 0.05 BAC all night",requirement:1,progress:0,unlocked:!1,category:"safety"},gameMaster:{name:"Game Master",icon:"🏆",description:"Win 5 party games",requirement:5,progress:0,unlocked:!1,category:"games"},partyAnimal:{name:"Party Animal",icon:"📍",description:"Check in at 10 parties",requirement:10,progress:0,unlocked:!1,category:"social"},guardianAngel:{name:"Guardian Angel",icon:"🦸",description:"Help 3 friends get home safe",requirement:3,progress:0,unlocked:!1,category:"safety"},hydroHomie:{name:"Hydro Homie",icon:"💧",description:"Stay hydrated for 3 hours",requirement:12,progress:0,unlocked:!1,category:"health"},danceMachine:{name:"Dance Machine",icon:"🕺",description:"Log 50 songs danced to",requirement:50,progress:0,unlocked:!1,category:"fun"},sunriseWarrior:{name:"Sunrise Warrior",icon:"🌅",description:"Party until sunrise (6+ hours)",requirement:1,progress:0,unlocked:!1,category:"endurance"},socialButterfly:{name:"Social Butterfly",icon:"🦋",description:"Add 20 friends",requirement:20,progress:0,unlocked:!1,category:"social"},safetyFirst:{name:"Safety First",icon:"🛡️",description:"Use emergency services 0 times in 10 parties",requirement:10,progress:0,unlocked:!1,category:"safety"},mixologist:{name:"Mixologist",icon:"🍸",description:"Try 15 different drink types",requirement:15,progress:0,unlocked:!1,category:"drinks"},designated:{name:"Designated Hero",icon:"🚗",description:"Be the designated driver 5 times",requirement:5,progress:0,unlocked:!1,category:"safety"}};let Qe={};function RC(){const i=ct();if(!i)return;const t=Q(),e=N(t,`users/${i.uid}/achievements`);qe(e,s=>{const n=s.val()||{};Object.keys(Af).forEach(r=>{Qe[r]={...Af[r],...n[r]}}),xt("userAchievements",Qe),Fr()})}function DC(i){const t=ct();if(!t)return;const e=Q(),s=Qe[i];s&&Ct(N(e,`users/${t.uid}/achievements/${i}`),{progress:s.progress,unlocked:s.unlocked,unlockedAt:s.unlockedAt||null})}function an(i,t=1){if(!Qe[i])return;const e=Qe[i];e.unlocked||(e.progress=Math.min(e.progress+t,e.requirement),e.progress>=e.requirement&&(e.unlocked=!0,e.unlockedAt=Date.now(),NC(e),Rf()),DC(i),Fr())}function Fr(){const i=document.querySelector(".achievements-grid");i&&(i.innerHTML="",Object.entries(Qe).sort(([,t],[,e])=>t.unlocked&&!e.unlocked?-1:!t.unlocked&&e.unlocked?1:t.category.localeCompare(e.category)).forEach(([t,e])=>{const s=document.createElement("div");s.className=`achievement ${e.unlocked?"unlocked":""}`,s.setAttribute("data-achievement",t);const n=e.progress/e.requirement*100;s.innerHTML=`
            <div class="achievement-icon">${e.icon}</div>
            <div class="achievement-name">${e.name}</div>
            <div class="achievement-description">${e.description}</div>
            ${e.unlocked?`
                <div class="achievement-unlocked-date">
                    Unlocked ${new Date(e.unlockedAt).toLocaleDateString()}
                </div>
            `:`
                <div class="achievement-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${n}%"></div>
                    </div>
                    <div class="progress-text">${e.progress}/${e.requirement}</div>
                </div>
            `}
        `,i.appendChild(s)}),Rf())}function Rf(){const i=Object.keys(Qe).length,t=Object.values(Qe).filter(e=>e.unlocked).length;document.querySelectorAll("[data-achievement-stats]").forEach(e=>{e.textContent=`${t}/${i}`})}function NC(i){typeof confetti=="function"&&confetti({particleCount:100,spread:70,origin:{y:.6}});const t=document.createElement("div");t.className="achievement-notification",t.innerHTML=`
        <div class="achievement-popup">
            <div class="achievement-popup-icon">${i.icon}</div>
            <div class="achievement-popup-content">
                <div class="achievement-popup-title">Achievement Unlocked!</div>
                <div class="achievement-popup-name">${i.name}</div>
                <div class="achievement-popup-description">${i.description}</div>
            </div>
        </div>
    `,document.body.appendChild(t),setTimeout(()=>{t.classList.add("show")},100),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>{t.remove()},500)},5e3)}function OC(){const i=O(),t=i.partyData||{},e=i.friendsData||{},s=i.partyStartTime;Object.values(t).every(n=>n.bac<.05)&&Date.now()-s>36e5&&an("responsible"),Date.now()-s>216e5&&an("sunriseWarrior"),Object.keys(e).length>=20&&an("socialButterfly",Object.keys(e).length)}function LC(){an("firstTimer")}function FC(){window.toggleAuthMode=iw,window.signOut=nw,window.updateUI=sr,window.switchSection=jC,window.toggleMobileMenu=qC,window.showNotification=w,window.showModal=GC,window.closeModal=Df,window.searchFriends=Ld,window.sendFriendRequest=xw,window.acceptFriendRequest=Iw,window.declineFriendRequest=kw,window.updateFriendPermission=Ew,window.removeFriend=Tw,window.sendMessage=Bd,window.handleChatEnter=Sw,window.showHydrationReminder=Ud,window.checkInLocation=Pw,window.callUber=Mw,window.callEmergency=Aw,window.selectBuddy=Dw,window.showFirstAid=Nw,window.updateProfile=Ow,window.changePassword=Lw,window.saveEmergencyInfo=Fw,window.savePrivacySettings=Bw,window.exportData=Hw,window.pairDeviceFromModal=Ww,window.resolvePermission=zw,window.logDrink=oC,window.toggleChart=cC,window.removeDrink=aC,window.showEmergencyReport=lC,window.copyEmergencyReport=kf,window.downloadEmergencyReport=hC,window.shareEmergencyReport=dC,window.clearDrinkHistory=uC,window.deleteAccount=Uw,window.startGame=pC,window.closeGame=Tf,window.nextNeverHaveIEver=xC,window.showTruth=IC,window.showDare=CC,window.drawCard=kC,window.addScore=EC,window.resetBeerPong=TC,window.toggleFlipTimer=SC,window.resetFlipTimer=PC,window.nextTrivia=Mf,window.answerTrivia=MC,window.getActiveLocations=ba,window.createLocationMap=Hd,window.initializeLocationMap=Wd,window.updateFriendRequests=Fd,window.updateFriendsList=ya,window.escapeHtml=fi,window.updateAchievements=Fr,window.updateAchievementProgress=an,window.checkAchievements=OC,window.pairDeviceById=Md,window.unpairDevice=Ad,window.renameDevice=Rd}document.addEventListener("DOMContentLoaded",()=>{console.log("🚀 Starting BoozeLens app initialization..."),FC(),"serviceWorker"in navigator&&navigator.serviceWorker.getRegistrations().then(e=>{if(e.length>0){e.forEach(s=>{s.unregister(),console.log("Unregistered old service worker:",s.scope)}),setTimeout(()=>{window.location.reload()},1e3);return}});try{Dd&&Dd().catch(e=>{console.warn("Service worker registration failed:",e)}),Nd&&Nd(),Od&&Od()}catch(e){console.warn("PWA initialization error (non-critical):",e)}if(!Yb()){console.error("Firebase failed to initialize!"),w("❌ Failed to connect to Firebase","error");return}const i=document.getElementById("authForm");i&&i.addEventListener("submit",sw),rw(BC),VC(),setInterval(()=>{YC()},500),fC();const t=document.getElementById("drinkType");t&&t.addEventListener("change",function(){const e=$i[this.value];document.getElementById("drinkAmount").value=e.amount,document.getElementById("alcoholPercent").value=e.alcohol}),document.querySelectorAll(".toggle-switch input").forEach(e=>{e.addEventListener("change",function(){const s=this.closest(".toggle-switch");this.checked?s.classList.add("active"):s.classList.remove("active")})}),setInterval(()=>{new Date().getMinutes()%15===0&&Ud()},6e4),window.onclick=e=>{e.target.className==="modal show"&&Df(),e.target.className==="game-overlay show"&&Tf()},window.addEventListener("beforeunload",()=>{Or()}),window.addEventListener("unhandledrejection",e=>{console.error("Unhandled promise rejection:",e.reason),e.reason&&e.reason.code&&e.reason.code.includes("auth")&&w("⚠️ Authentication issue. Try refreshing.","error")}),console.log("✅ App initialization complete!")});async function BC(i){console.log("User authenticated:",i.email);try{tw(),await ow(i),aw(),RC(),UC(),JC(),LC(),sr();const t=O().userData.username||i.email.split("@")[0];w(`🎉 Welcome, ${t}!`,"success")}catch(t){console.error("Error during authentication:",t),w("⚠️ Error loading profile","error")}}function UC(){const i=Q(),t=ct();!i||!t||(qe(N(i,"users/"+t.uid+"/friends"),e=>{const s=e.val()||{};xt("friendsData",s),ya(),document.getElementById("friendCount").textContent=Object.keys(s).length,Object.keys(s).forEach(n=>{HC(n)})}),qe(N(i,"friendRequests/"+t.uid),e=>{const s=e.val()||{},n=Object.entries(s).map(([r,o])=>({id:r,...o}));xt("friendRequests",n),Fd()}),qe(N(i,".info/connected"),e=>{const s=e.val();KC(s)}))}function HC(i){const t=Q();(O().friendsData[i]?.permission||"observer")!=="none"&&qe(N(t,"users/"+i),e=>{const s=e.val();s&&WC(i,s)})}function WC(i,t){const e=O().friendsData[i]?.permission||"observer";(e==="guardian"||e==="buddy")&&Object.keys(t.devices||{}).forEach(s=>{let n=O().partyData;n[s]||(n[s]={name:t.username,bac:0,lastUpdate:Date.now(),location:"Unknown",trend:"steady",history:[],isFriend:!0,friendId:i,permission:e},xt("partyData",n)),$C(s)})}function $C(i){const t=Q();qe(N(t,"readings/"+i),e=>{const s=e.val();s&&zC(i,s)})}function zC(i,t){let e=O().partyData||{};const s=O().userData;e[i]||(e[i]={name:s.username||"You",bac:0,lastUpdate:Date.now(),location:"Party",trend:"steady",history:[],isOwn:!0});const n=e[i].bac;e[i].bac=t.bac||0,e[i].lastUpdate=Date.now(),e[i].trend=t.bac>n?"up":t.bac<n?"down":"steady",e[i].history.push({time:Date.now(),value:t.bac}),e[i].history.length>50&&e[i].history.shift(),xt("partyData",e),sr(),t.bac>=.08&&w(`⚠️ Your BAC is too high: ${t.bac.toFixed(3)}‰`,"error")}function jC(i){try{document.querySelectorAll(".section").forEach(s=>s.classList.remove("active")),document.querySelectorAll(".nav-item").forEach(s=>s.classList.remove("active"));const t=document.getElementById(i);t&&t.classList.add("active"),document.querySelectorAll(".nav-item").forEach(s=>{s.onclick&&s.onclick.toString().includes(i)&&s.classList.add("active")});const e=document.getElementById("navMenu");e&&e.classList.remove("show"),i==="achievements"?Fr():i==="drinks"?(Ar(),Dr(),Rr(),Nr()):i==="devices"||(i==="friends"?ya():i==="settings"&&zd())}catch(t){console.error("Section switch failed:",t)}}function qC(){const i=document.getElementById("navMenu");i&&i.classList.toggle("show")}function VC(){try{const i=document.getElementById("particles");if(!i)return;for(let t=0;t<50;t++){const e=document.createElement("div");e.className="particle",e.style.left=Math.random()*100+"%",e.style.animationDelay=Math.random()*20+"s",e.style.animationDuration=15+Math.random()*10+"s",i.appendChild(e)}}catch(i){console.error("Particle creation failed:",i)}}function YC(){const i=document.getElementById("visualizer");if(!(!i||!document.getElementById("dashboard").classList.contains("active"))){if(i.children.length===0)for(let t=0;t<20;t++){const e=document.createElement("div");e.className="bar",i.appendChild(e)}i.querySelectorAll(".bar").forEach(t=>{const e=Math.random()*150+20;t.style.height=e+"px"})}}function KC(i){const t=document.getElementById("connectionStatus"),e=document.querySelector(".status-dot");t&&e&&(i?(t.textContent="Connected",e.style.background="#00ff88"):(t.textContent="Offline",e.style.background="#ff4444"))}function GC(i,t=null){const e=document.getElementById("modal"),s=document.getElementById("modalBody");let n="";switch(i){case"pair-device":n=`
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
            `;break;case"checkin":n=`
                <h2>📍 Check In</h2>
                <p>Select your current location:</p>
                <div class="location-map" id="locationMap">
                    <!-- Simulated map -->
                </div>
                <div style="margin: 20px 0;">
                    ${["Dorm A - Room Party","Student Bar","Library Cafe","Sports Center","Main Campus","Off Campus"].map(c=>`<button class="btn" style="width: 100%; margin: 10px 0;" onclick="checkInLocation('${c}')">${c}</button>`).join("")}
                </div>
                <button class="btn" onclick="closeModal()">Cancel</button>
            `;break;case"emergency":n=`
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
            `;break;case"first-aid":n=`
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
            `;break;case"buddy-system":const r=O().partyData;n=`
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
            `;break;case"safe-friends":const o=O().partyData,a=Object.values(o).filter(c=>c.bac<.02);n=`
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
            `;break;case"locations":n=`
                <h2>📍 Active Party Locations</h2>
                <div class="location-map" style="height: 400px;">
                    ${Hd()}
                </div>
                <div style="margin: 20px 0;">
                    ${ba().map(c=>`
                        <div class="buddy-card" style="margin: 10px 0;">
                            <div><strong>${c.name}</strong></div>
                            <div>${c.count} people</div>
                            <div>Avg BAC: ${c.avgBac.toFixed(3)}‰</div>
                        </div>
                    `).join("")}
                </div>
                <button class="btn" onclick="closeModal()">Close</button>
            `;break}s.innerHTML=n,e.classList.add("show"),(i==="checkin"||i==="locations")&&setTimeout(Wd,100)}function Df(){document.getElementById("modal").classList.remove("show")}function JC(){const i=O().userData;if(i.settings){const t=i.settings;t.shareLocation!==void 0&&(document.getElementById("shareLocation").checked=t.shareLocation),t.notifications!==void 0&&(document.getElementById("notifications").checked=t.notifications),t.publicProfile!==void 0&&(document.getElementById("publicProfile").checked=t.publicProfile)}if(i.emergency){const t=i.emergency;t.homeAddress&&(document.getElementById("homeAddress").value=t.homeAddress,localStorage.setItem("homeAddress",t.homeAddress)),t.emergencyContact&&(document.getElementById("emergencyContact").value=t.emergencyContact,localStorage.setItem("emergencyContact",t.emergencyContact)),t.medicalInfo&&(document.getElementById("medicalInfo").value=t.medicalInfo,localStorage.setItem("medicalInfo",t.medicalInfo)),t.safetyNotes&&(document.getElementById("safetyNotes").value=t.safetyNotes,localStorage.setItem("safetyNotes",t.safetyNotes))}zd()}});ok();
//# sourceMappingURL=index-DEHNkM1m.js.map
