"use strict";(self.webpackChunkcat_logic=self.webpackChunkcat_logic||[]).push([[691],{4221:function(e,t,n){function i(e){return Array.isArray?Array.isArray(e):"[object Array]"===d(e)}n.r(t),n.d(t,{default:function(){return Q}});const r=1/0;function s(e){return null==e?"":function(e){if("string"==typeof e)return e;let t=e+"";return"0"==t&&1/e==-r?"-0":t}(e)}function o(e){return"string"==typeof e}function c(e){return"number"==typeof e}function a(e){return!0===e||!1===e||function(e){return l(e)&&null!==e}(e)&&"[object Boolean]"==d(e)}function l(e){return"object"==typeof e}function h(e){return null!=e}function u(e){return!e.trim().length}function d(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":Object.prototype.toString.call(e)}const g=e=>`Missing ${e} property in key`,f=e=>`Property 'weight' in key '${e}' must be a positive integer`,p=Object.prototype.hasOwnProperty;class m{constructor(e){this._keys=[],this._keyMap={};let t=0;e.forEach((e=>{let n=y(e);t+=n.weight,this._keys.push(n),this._keyMap[n.id]=n,t+=n.weight})),this._keys.forEach((e=>{e.weight/=t}))}get(e){return this._keyMap[e]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}}function y(e){let t=null,n=null,r=null,s=1,c=null;if(o(e)||i(e))r=e,t=v(e),n=x(e);else{if(!p.call(e,"name"))throw new Error(g("name"));const i=e.name;if(r=i,p.call(e,"weight")&&(s=e.weight,s<=0))throw new Error(f(i));t=v(i),n=x(i),c=e.getFn}return{path:t,id:n,weight:s,src:r,getFn:c}}function v(e){return i(e)?e:e.split(".")}function x(e){return i(e)?e.join("."):e}var M={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(e,t)=>e.score===t.score?e.idx<t.idx?-1:1:e.score<t.score?-1:1,includeMatches:!1,findAllMatches:!1,minMatchCharLength:1,location:0,threshold:.6,distance:100,...{useExtendedSearch:!1,getFn:function(e,t){let n=[],r=!1;const l=(e,t,u)=>{if(h(e))if(t[u]){const d=e[t[u]];if(!h(d))return;if(u===t.length-1&&(o(d)||c(d)||a(d)))n.push(s(d));else if(i(d)){r=!0;for(let e=0,n=d.length;e<n;e+=1)l(d[e],t,u+1)}else t.length&&l(d,t,u+1)}else n.push(e)};return l(e,o(t)?t.split("."):t,0),r?n:n[0]},ignoreLocation:!1,ignoreFieldNorm:!1,fieldNormWeight:1}};const k=/[^ ]+/g;class w{constructor({getFn:e=M.getFn,fieldNormWeight:t=M.fieldNormWeight}={}){this.norm=function(e=1,t=3){const n=new Map,i=Math.pow(10,t);return{get(t){const r=t.match(k).length;if(n.has(r))return n.get(r);const s=1/Math.pow(r,.5*e),o=parseFloat(Math.round(s*i)/i);return n.set(r,o),o},clear(){n.clear()}}}(t,3),this.getFn=e,this.isCreated=!1,this.setIndexRecords()}setSources(e=[]){this.docs=e}setIndexRecords(e=[]){this.records=e}setKeys(e=[]){this.keys=e,this._keysMap={},e.forEach(((e,t)=>{this._keysMap[e.id]=t}))}create(){!this.isCreated&&this.docs.length&&(this.isCreated=!0,o(this.docs[0])?this.docs.forEach(((e,t)=>{this._addString(e,t)})):this.docs.forEach(((e,t)=>{this._addObject(e,t)})),this.norm.clear())}add(e){const t=this.size();o(e)?this._addString(e,t):this._addObject(e,t)}removeAt(e){this.records.splice(e,1);for(let t=e,n=this.size();t<n;t+=1)this.records[t].i-=1}getValueForItemAtKeyId(e,t){return e[this._keysMap[t]]}size(){return this.records.length}_addString(e,t){if(!h(e)||u(e))return;let n={v:e,i:t,n:this.norm.get(e)};this.records.push(n)}_addObject(e,t){let n={i:t,$:{}};this.keys.forEach(((t,r)=>{let s=t.getFn?t.getFn(e):this.getFn(e,t.path);if(h(s))if(i(s)){let e=[];const t=[{nestedArrIndex:-1,value:s}];for(;t.length;){const{nestedArrIndex:n,value:r}=t.pop();if(h(r))if(o(r)&&!u(r)){let t={v:r,i:n,n:this.norm.get(r)};e.push(t)}else i(r)&&r.forEach(((e,n)=>{t.push({nestedArrIndex:n,value:e})}))}n.$[r]=e}else if(o(s)&&!u(s)){let e={v:s,n:this.norm.get(s)};n.$[r]=e}})),this.records.push(n)}toJSON(){return{keys:this.keys,records:this.records}}}function _(e,t,{getFn:n=M.getFn,fieldNormWeight:i=M.fieldNormWeight}={}){const r=new w({getFn:n,fieldNormWeight:i});return r.setKeys(e.map(y)),r.setSources(t),r.create(),r}function b(e,{errors:t=0,currentLocation:n=0,expectedLocation:i=0,distance:r=M.distance,ignoreLocation:s=M.ignoreLocation}={}){const o=t/e.length;if(s)return o;const c=Math.abs(i-n);return r?o+c/r:c?1:o}const C=32;function L(e,t,n,{location:i=M.location,distance:r=M.distance,threshold:s=M.threshold,findAllMatches:o=M.findAllMatches,minMatchCharLength:c=M.minMatchCharLength,includeMatches:a=M.includeMatches,ignoreLocation:l=M.ignoreLocation}={}){if(t.length>C)throw new Error(`Pattern length exceeds max of ${C}.`);const h=t.length,u=e.length,d=Math.max(0,Math.min(i,u));let g=s,f=d;const p=c>1||a,m=p?Array(u):[];let y;for(;(y=e.indexOf(t,f))>-1;){let e=b(t,{currentLocation:y,expectedLocation:d,distance:r,ignoreLocation:l});if(g=Math.min(e,g),f=y+h,p){let e=0;for(;e<h;)m[y+e]=1,e+=1}}f=-1;let v=[],x=1,k=h+u;const w=1<<h-1;for(let M=0;M<h;M+=1){let i=0,s=k;for(;i<s;){b(t,{errors:M,currentLocation:d+s,expectedLocation:d,distance:r,ignoreLocation:l})<=g?i=s:k=s,s=Math.floor((k-i)/2+i)}k=s;let c=Math.max(1,d-s+1),a=o?u:Math.min(d+s,u)+h,y=Array(a+2);y[a+1]=(1<<M)-1;for(let o=a;o>=c;o-=1){let i=o-1,s=n[e.charAt(i)];if(p&&(m[i]=+!!s),y[o]=(y[o+1]<<1|1)&s,M&&(y[o]|=(v[o+1]|v[o])<<1|1|v[o+1]),y[o]&w&&(x=b(t,{errors:M,currentLocation:i,expectedLocation:d,distance:r,ignoreLocation:l}),x<=g)){if(g=x,f=i,f<=d)break;c=Math.max(1,2*d-f)}}if(b(t,{errors:M+1,currentLocation:d,expectedLocation:d,distance:r,ignoreLocation:l})>g)break;v=y}const _={isMatch:f>=0,score:Math.max(.001,x)};if(p){const e=function(e=[],t=M.minMatchCharLength){let n=[],i=-1,r=-1,s=0;for(let o=e.length;s<o;s+=1){let o=e[s];o&&-1===i?i=s:o||-1===i||(r=s-1,r-i+1>=t&&n.push([i,r]),i=-1)}return e[s-1]&&s-i>=t&&n.push([i,s-1]),n}(m,c);e.length?a&&(_.indices=e):_.isMatch=!1}return _}function E(e){let t={};for(let n=0,i=e.length;n<i;n+=1){const r=e.charAt(n);t[r]=(t[r]||0)|1<<i-n-1}return t}class I{constructor(e,{location:t=M.location,threshold:n=M.threshold,distance:i=M.distance,includeMatches:r=M.includeMatches,findAllMatches:s=M.findAllMatches,minMatchCharLength:o=M.minMatchCharLength,isCaseSensitive:c=M.isCaseSensitive,ignoreLocation:a=M.ignoreLocation}={}){if(this.options={location:t,threshold:n,distance:i,includeMatches:r,findAllMatches:s,minMatchCharLength:o,isCaseSensitive:c,ignoreLocation:a},this.pattern=c?e:e.toLowerCase(),this.chunks=[],!this.pattern.length)return;const l=(e,t)=>{this.chunks.push({pattern:e,alphabet:E(e),startIndex:t})},h=this.pattern.length;if(h>C){let e=0;const t=h%C,n=h-t;for(;e<n;)l(this.pattern.substr(e,C),e),e+=C;if(t){const e=h-C;l(this.pattern.substr(e),e)}}else l(this.pattern,0)}searchIn(e){const{isCaseSensitive:t,includeMatches:n}=this.options;if(t||(e=e.toLowerCase()),this.pattern===e){let t={isMatch:!0,score:0};return n&&(t.indices=[[0,e.length-1]]),t}const{location:i,distance:r,threshold:s,findAllMatches:o,minMatchCharLength:c,ignoreLocation:a}=this.options;let l=[],h=0,u=!1;this.chunks.forEach((({pattern:t,alphabet:d,startIndex:g})=>{const{isMatch:f,score:p,indices:m}=L(e,t,d,{location:i+g,distance:r,threshold:s,findAllMatches:o,minMatchCharLength:c,includeMatches:n,ignoreLocation:a});f&&(u=!0),h+=p,f&&m&&(l=[...l,...m])}));let d={isMatch:u,score:u?h/this.chunks.length:1};return u&&n&&(d.indices=l),d}}class S{constructor(e){this.pattern=e}static isMultiMatch(e){return F(e,this.multiRegex)}static isSingleMatch(e){return F(e,this.singleRegex)}search(){}}function F(e,t){const n=e.match(t);return n?n[1]:null}class N extends S{constructor(e,{location:t=M.location,threshold:n=M.threshold,distance:i=M.distance,includeMatches:r=M.includeMatches,findAllMatches:s=M.findAllMatches,minMatchCharLength:o=M.minMatchCharLength,isCaseSensitive:c=M.isCaseSensitive,ignoreLocation:a=M.ignoreLocation}={}){super(e),this._bitapSearch=new I(e,{location:t,threshold:n,distance:i,includeMatches:r,findAllMatches:s,minMatchCharLength:o,isCaseSensitive:c,ignoreLocation:a})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(e){return this._bitapSearch.searchIn(e)}}class A extends S{constructor(e){super(e)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(e){let t,n=0;const i=[],r=this.pattern.length;for(;(t=e.indexOf(this.pattern,n))>-1;)n=t+r,i.push([t,n-1]);const s=!!i.length;return{isMatch:s,score:s?0:1,indices:i}}}const $=[class extends S{constructor(e){super(e)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(e){const t=e===this.pattern;return{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}}},A,class extends S{constructor(e){super(e)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(e){const t=e.startsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}}},class extends S{constructor(e){super(e)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(e){const t=!e.startsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},class extends S{constructor(e){super(e)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(e){const t=!e.endsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},class extends S{constructor(e){super(e)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(e){const t=e.endsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[e.length-this.pattern.length,e.length-1]}}},class extends S{constructor(e){super(e)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(e){const t=-1===e.indexOf(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},N],j=$.length,O=/ +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/;const R=new Set([N.type,A.type]);class W{constructor(e,{isCaseSensitive:t=M.isCaseSensitive,includeMatches:n=M.includeMatches,minMatchCharLength:i=M.minMatchCharLength,ignoreLocation:r=M.ignoreLocation,findAllMatches:s=M.findAllMatches,location:o=M.location,threshold:c=M.threshold,distance:a=M.distance}={}){this.query=null,this.options={isCaseSensitive:t,includeMatches:n,minMatchCharLength:i,findAllMatches:s,ignoreLocation:r,location:o,threshold:c,distance:a},this.pattern=t?e:e.toLowerCase(),this.query=function(e,t={}){return e.split("|").map((e=>{let n=e.trim().split(O).filter((e=>e&&!!e.trim())),i=[];for(let r=0,s=n.length;r<s;r+=1){const e=n[r];let s=!1,o=-1;for(;!s&&++o<j;){const n=$[o];let r=n.isMultiMatch(e);r&&(i.push(new n(r,t)),s=!0)}if(!s)for(o=-1;++o<j;){const n=$[o];let r=n.isSingleMatch(e);if(r){i.push(new n(r,t));break}}}return i}))}(this.pattern,this.options)}static condition(e,t){return t.useExtendedSearch}searchIn(e){const t=this.query;if(!t)return{isMatch:!1,score:1};const{includeMatches:n,isCaseSensitive:i}=this.options;e=i?e:e.toLowerCase();let r=0,s=[],o=0;for(let c=0,a=t.length;c<a;c+=1){const i=t[c];s.length=0,r=0;for(let t=0,c=i.length;t<c;t+=1){const c=i[t],{isMatch:a,indices:l,score:h}=c.search(e);if(!a){o=0,r=0,s.length=0;break}if(r+=1,o+=h,n){const e=c.constructor.type;R.has(e)?s=[...s,...l]:s.push(l)}}if(r){let e={isMatch:!0,score:o/r};return n&&(e.indices=s),e}}return{isMatch:!1,score:1}}}const z=[];function P(e,t){for(let n=0,i=z.length;n<i;n+=1){let i=z[n];if(i.condition(e,t))return new i(e,t)}return new I(e,t)}const D="$and",Z="$or",H="$path",B="$val",K=e=>!(!e[D]&&!e[Z]),J=e=>({[D]:Object.keys(e).map((t=>({[t]:e[t]})))});function T(e,t,{auto:n=!0}={}){const r=e=>{let s=Object.keys(e);const c=(e=>!!e[H])(e);if(!c&&s.length>1&&!K(e))return r(J(e));if((e=>!i(e)&&l(e)&&!K(e))(e)){const i=c?e[H]:s[0],r=c?e[B]:e[i];if(!o(r))throw new Error((e=>`Invalid value for key ${e}`)(i));const a={keyId:x(i),pattern:r};return n&&(a.searcher=P(r,t)),a}let a={children:[],operator:s[0]};return s.forEach((t=>{const n=e[t];i(n)&&n.forEach((e=>{a.children.push(r(e))}))})),a};return K(e)||(e=J(e)),r(e)}function q(e,t){const n=e.matches;t.matches=[],h(n)&&n.forEach((e=>{if(!h(e.indices)||!e.indices.length)return;const{indices:n,value:i}=e;let r={indices:n,value:i};e.key&&(r.key=e.key.src),e.idx>-1&&(r.refIndex=e.idx),t.matches.push(r)}))}function G(e,t){t.score=e.score}class Q{constructor(e,t={},n){this.options={...M,...t},this.options.useExtendedSearch,this._keyStore=new m(this.options.keys),this.setCollection(e,n)}setCollection(e,t){if(this._docs=e,t&&!(t instanceof w))throw new Error("Incorrect 'index' type");this._myIndex=t||_(this.options.keys,this._docs,{getFn:this.options.getFn,fieldNormWeight:this.options.fieldNormWeight})}add(e){h(e)&&(this._docs.push(e),this._myIndex.add(e))}remove(e=(()=>!1)){const t=[];for(let n=0,i=this._docs.length;n<i;n+=1){const r=this._docs[n];e(r,n)&&(this.removeAt(n),n-=1,i-=1,t.push(r))}return t}removeAt(e){this._docs.splice(e,1),this._myIndex.removeAt(e)}getIndex(){return this._myIndex}search(e,{limit:t=-1}={}){const{includeMatches:n,includeScore:i,shouldSort:r,sortFn:s,ignoreFieldNorm:a}=this.options;let l=o(e)?o(this._docs[0])?this._searchStringList(e):this._searchObjectList(e):this._searchLogical(e);return function(e,{ignoreFieldNorm:t=M.ignoreFieldNorm}){e.forEach((e=>{let n=1;e.matches.forEach((({key:e,norm:i,score:r})=>{const s=e?e.weight:null;n*=Math.pow(0===r&&s?Number.EPSILON:r,(s||1)*(t?1:i))})),e.score=n}))}(l,{ignoreFieldNorm:a}),r&&l.sort(s),c(t)&&t>-1&&(l=l.slice(0,t)),function(e,t,{includeMatches:n=M.includeMatches,includeScore:i=M.includeScore}={}){const r=[];return n&&r.push(q),i&&r.push(G),e.map((e=>{const{idx:n}=e,i={item:t[n],refIndex:n};return r.length&&r.forEach((t=>{t(e,i)})),i}))}(l,this._docs,{includeMatches:n,includeScore:i})}_searchStringList(e){const t=P(e,this.options),{records:n}=this._myIndex,i=[];return n.forEach((({v:e,i:n,n:r})=>{if(!h(e))return;const{isMatch:s,score:o,indices:c}=t.searchIn(e);s&&i.push({item:e,idx:n,matches:[{score:o,value:e,norm:r,indices:c}]})})),i}_searchLogical(e){const t=T(e,this.options),n=(e,t,i)=>{if(!e.children){const{keyId:n,searcher:r}=e,s=this._findMatches({key:this._keyStore.get(n),value:this._myIndex.getValueForItemAtKeyId(t,n),searcher:r});return s&&s.length?[{idx:i,item:t,matches:s}]:[]}const r=[];for(let s=0,o=e.children.length;s<o;s+=1){const o=e.children[s],c=n(o,t,i);if(c.length)r.push(...c);else if(e.operator===D)return[]}return r},i=this._myIndex.records,r={},s=[];return i.forEach((({$:e,i:i})=>{if(h(e)){let o=n(t,e,i);o.length&&(r[i]||(r[i]={idx:i,item:e,matches:[]},s.push(r[i])),o.forEach((({matches:e})=>{r[i].matches.push(...e)})))}})),s}_searchObjectList(e){const t=P(e,this.options),{keys:n,records:i}=this._myIndex,r=[];return i.forEach((({$:e,i:i})=>{if(!h(e))return;let s=[];n.forEach(((n,i)=>{s.push(...this._findMatches({key:n,value:e[i],searcher:t}))})),s.length&&r.push({idx:i,item:e,matches:s})})),r}_findMatches({key:e,value:t,searcher:n}){if(!h(t))return[];let r=[];if(i(t))t.forEach((({v:t,i:i,n:s})=>{if(!h(t))return;const{isMatch:o,score:c,indices:a}=n.searchIn(t);o&&r.push({score:c,key:e,value:t,idx:i,norm:s,indices:a})}));else{const{v:i,n:s}=t,{isMatch:o,score:c,indices:a}=n.searchIn(i);o&&r.push({score:c,key:e,value:i,norm:s,indices:a})}return r}}Q.version="6.6.2",Q.createIndex=_,Q.parseIndex=function(e,{getFn:t=M.getFn,fieldNormWeight:n=M.fieldNormWeight}={}){const{keys:i,records:r}=e,s=new w({getFn:t,fieldNormWeight:n});return s.setKeys(i),s.setIndexRecords(r),s},Q.config=M,Q.parseQuery=T,function(...e){z.push(...e)}(W)},4477:function(e,t,n){n.d(t,{Z:function(){return s}});var i=n(7294);const r=n(2788).default.a.withConfig({displayName:"Link__A",componentId:"sc-k1di17-0"})(["text-decoration:none;&:hover{text-decoration:underline;}"]);function s(e){let{children:t,href:n}=e;return i.createElement(r,{href:n},t)}},7399:function(e,t){t.Z={larger:"min-width: 700px"}},9261:function(e,t){t.Z={colors:{foreground:"#333333",highlight:"#512DA8",link:"#0D47A1",linkVisited:"#B4CFF9",accent:"#C9C9C9",background2:"#F5F5F5",backgroundHighlight:"#D0D0D0"},fonts:{body:"-apple-system, Roboto, sans-serif, serif",heading:"-apple-system, Roboto, sans-serif, serif"}}},6391:function(e,t,n){n.r(t),n.d(t,{Head:function(){return F},default:function(){return S}});var i=n(7294);function r(e){return e.startsWith("/")?"./wiki"+e:"./wiki/"+e}var s=n(9053),o=n(2788),c=n(7399),a=n(9261);const l=o.default.div.withConfig({displayName:"HomeLogo__Container",componentId:"sc-6vrj5a-0"})(["height:20rem;display:flex;align-items:center;"]),h=o.default.iframe.withConfig({displayName:"HomeLogo__LogoFrame",componentId:"sc-6vrj5a-1"})(["border:none;width:100%;height:7rem;"]);function u(){return i.createElement(l,null,i.createElement(h,{src:"https://edunga1.github.io/canvas-floating-alphabet/?w=CAT%20%20LOGIC&t=1&s=5&i=1"}))}const d=o.default.div.withConfig({displayName:"SearchBox__InputBorder",componentId:"sc-h3dp41-0"})(["max-width:fit-content;font-size:0;padding:2px;--bg-size:400%;--color-one:hsl(15 90% 55%);--color-two:hsl(40 95% 55%);background:linear-gradient( 90deg,var(--color-one),var(--color-two),var(--color-one) ) 0 0 / var(--bg-size) 100%;@media (prefers-reduced-motion:no-preference){animation:move-bg 8s linear infinite;@keyframes move-bg{to{background-position:var(--bg-size) 0;}}}"]),g=o.default.input.withConfig({displayName:"SearchBox__Input",componentId:"sc-h3dp41-1"})(["border:none;outline:none;min-width:1rem;height:1.5rem;"]);function f(e){let{onChange:t,holder:n=""}=e;return i.createElement(d,null,i.createElement(g,{type:"text",onChange:e=>t(e.target.value),placeholder:n}))}var p=n(4477);const m={listStyleType:"none"};function y(e){return i.createElement("li",{style:m},e.children)}const v=o.default.p.withConfig({displayName:"ColorfulParagraph__P",componentId:"sc-lbd1ai-0"})(["font-weight:bold;--bg-size:400%;--color-one:hsl(15 90% 55%);--color-two:hsl(40 95% 55%);background:linear-gradient( 90deg,var(--color-one),var(--color-two),var(--color-one) ) 0 0 / var(--bg-size) 100%;color:transparent;background-clip:text;-webkit-background-clip:text;@media (prefers-reduced-motion:no-preference){animation:move-bg 8s linear infinite;@keyframes move-bg{to{background-position:var(--bg-size) 0;}}}"]);function x(e){let{children:t}=e;return i.createElement(v,null,t)}const M=o.default.small.withConfig({displayName:"Small__S",componentId:"sc-1njkf8x-0"})(["margin-left:.5rem;color:",";word-break:keep-all;"],a.Z.colors.foreground);function k(e){let{children:t}=e;return i.createElement(M,null,t)}const w=o.default.div.withConfig({displayName:"WikiCatalog__Container",componentId:"sc-km0gld-0"})(["width:100%;display:flex;"]),_=o.default.ul.withConfig({displayName:"WikiCatalog__List",componentId:"sc-km0gld-1"})(["margin:0;padding:0;> *{padding:.3rem 0;}"]);function b(e){let{items:t,fallback:n}=e;const r=t.length>0;return i.createElement(w,null,r?i.createElement(_,null,t.map(((e,t)=>i.createElement(y,{key:t},i.createElement(p.Z,{href:e.path},e.title),e.head&&i.createElement("i",null,i.createElement(k,null,e.head)))))):i.createElement(x,null,n))}const C=o.default.div.withConfig({displayName:"Home__Container",componentId:"sc-jzp8wo-0"})(["padding-top:10%;color:",";overflow:hidden;display:grid;a{color:",";}@media (","){padding:1rem 1rem 3rem 1rem;}"],a.Z.colors.foreground,a.Z.colors.link,c.Z.larger),L=o.default.div.withConfig({displayName:"Home__MainContainer",componentId:"sc-jzp8wo-1"})(["width:100%;max-width:40rem;margin:0 auto;padding:0 1rem;display:grid;"]),E=o.default.div.withConfig({displayName:"Home__Counter",componentId:"sc-jzp8wo-2"})(["font-size:0.8rem;color:",";"],a.Z.fonts.body);function I(e){let{items:t,setQuery:n}=e;return i.createElement(C,null,i.createElement(L,null,i.createElement(u,null),i.createElement(f,{onChange:n,holder:"I guess..."}),i.createElement(E,null,t.length," docs"),i.createElement(b,{items:t,fallback:"No results found :("})))}function S(e){let{data:t}=e;const n=t.allFile.nodes.concat().map((e=>{var t,n,i,s,o,c,a;let{childMarkdownRemark:l,fields:h}=e;return{path:r(null!==(t=null==l||null===(n=l.fields)||void 0===n?void 0:n.slug)&&void 0!==t?t:""),title:null!==(i=null==l||null===(s=l.headings)||void 0===s||null===(o=s.at(0))||void 0===o?void 0:o.value)&&void 0!==i?i:"(Untitled)",head:null!==(c=null==l||null===(a=l.fields)||void 0===a?void 0:a.head)&&void 0!==c?c:"",created:null!=h&&h.gitLogLatestDate?new Date(h.gitLogLatestDate):void 0}})).sort(((e,t)=>{var n,i,r,s;const o=null!==(n=null===(i=e.created)||void 0===i?void 0:i.getTime())&&void 0!==n?n:0;return(null!==(r=null===(s=t.created)||void 0===s?void 0:s.getTime())&&void 0!==r?r:0)-o}));const[o,c]=i.useState(n),[a,l]=i.useState(""),h=(0,s.useGatsbyPluginFusejs)(a,t.fusejs);return i.useEffect((()=>{c(a?function(e){return e.map((e=>{var t;return{path:r(e.item.name),title:null!==(t=e.item.title)&&void 0!==t?t:"(Untitled)",head:""}}))}(h):n)}),[a]),i.createElement(I,{items:o,setQuery:l})}const F=()=>i.createElement("title",null,"Cat Logic - Home")},9053:function(e,t,n){var i,r=Object.create,s=Object.defineProperty,o=Object.getOwnPropertyDescriptor,c=Object.getOwnPropertyNames,a=Object.getPrototypeOf,l=Object.prototype.hasOwnProperty,h=(e,t,n,i)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let r of c(t))l.call(e,r)||r===n||s(e,r,{get:()=>t[r],enumerable:!(i=o(t,r))||i.enumerable});return e},u={};((e,t)=>{for(var n in t)s(e,n,{get:t[n],enumerable:!0})})(u,{default:()=>m,useFusejs:()=>f,useGatsbyPluginFusejs:()=>p}),e.exports=(i=u,h(s({},"__esModule",{value:!0}),i));var d=((e,t,n)=>(n=null!=e?r(a(e)):{},h(!t&&e&&e.__esModule?n:s(n,"default",{value:e,enumerable:!0}),e)))(n(4221)),g=n(7294);function f(e,t,n,i,r,s){const[o,c]=(0,g.useState)(null);return(0,g.useEffect)((()=>{if(!t||!n)return void c(null);const e=new d.default(t,i,d.default.parseIndex(n,r));c(e)}),[t,n]),(0,g.useMemo)((()=>e&&o&&o?.search(e,s)||[]),[e,o])}function p(e,t,n,i,r){const[s,o]=(0,g.useState)(null);return(0,g.useEffect)((()=>{if(!t?.data||!t?.index)return void o(null);const e=new d.default(t.data,n,d.default.parseIndex(JSON.parse(t.index),i));o(e)}),[t]),(0,g.useMemo)((()=>e&&s&&s?.search(e,r)||[]),[e,s])}var m=f}}]);
//# sourceMappingURL=component---src-pages-index-tsx-2f15f58b98233e9b17cc.js.map