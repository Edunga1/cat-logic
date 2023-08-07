"use strict";(self.webpackChunkcat_logic=self.webpackChunkcat_logic||[]).push([[691],{4221:function(e,t,n){function s(e){return Array.isArray?Array.isArray(e):"[object Array]"===d(e)}n.r(t),n.d(t,{default:function(){return Z}});const r=1/0;function i(e){return null==e?"":function(e){if("string"==typeof e)return e;let t=e+"";return"0"==t&&1/e==-r?"-0":t}(e)}function c(e){return"string"==typeof e}function o(e){return"number"==typeof e}function a(e){return!0===e||!1===e||function(e){return h(e)&&null!==e}(e)&&"[object Boolean]"==d(e)}function h(e){return"object"==typeof e}function l(e){return null!=e}function u(e){return!e.trim().length}function d(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":Object.prototype.toString.call(e)}const g=e=>`Missing ${e} property in key`,f=e=>`Property 'weight' in key '${e}' must be a positive integer`,p=Object.prototype.hasOwnProperty;class m{constructor(e){this._keys=[],this._keyMap={};let t=0;e.forEach((e=>{let n=y(e);t+=n.weight,this._keys.push(n),this._keyMap[n.id]=n,t+=n.weight})),this._keys.forEach((e=>{e.weight/=t}))}get(e){return this._keyMap[e]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}}function y(e){let t=null,n=null,r=null,i=1,o=null;if(c(e)||s(e))r=e,t=M(e),n=x(e);else{if(!p.call(e,"name"))throw new Error(g("name"));const s=e.name;if(r=s,p.call(e,"weight")&&(i=e.weight,i<=0))throw new Error(f(s));t=M(s),n=x(s),o=e.getFn}return{path:t,id:n,weight:i,src:r,getFn:o}}function M(e){return s(e)?e:e.split(".")}function x(e){return s(e)?e.join("."):e}var v={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(e,t)=>e.score===t.score?e.idx<t.idx?-1:1:e.score<t.score?-1:1,includeMatches:!1,findAllMatches:!1,minMatchCharLength:1,location:0,threshold:.6,distance:100,...{useExtendedSearch:!1,getFn:function(e,t){let n=[],r=!1;const h=(e,t,u)=>{if(l(e))if(t[u]){const d=e[t[u]];if(!l(d))return;if(u===t.length-1&&(c(d)||o(d)||a(d)))n.push(i(d));else if(s(d)){r=!0;for(let e=0,n=d.length;e<n;e+=1)h(d[e],t,u+1)}else t.length&&h(d,t,u+1)}else n.push(e)};return h(e,c(t)?t.split("."):t,0),r?n:n[0]},ignoreLocation:!1,ignoreFieldNorm:!1,fieldNormWeight:1}};const k=/[^ ]+/g;class L{constructor({getFn:e=v.getFn,fieldNormWeight:t=v.fieldNormWeight}={}){this.norm=function(e=1,t=3){const n=new Map,s=Math.pow(10,t);return{get(t){const r=t.match(k).length;if(n.has(r))return n.get(r);const i=1/Math.pow(r,.5*e),c=parseFloat(Math.round(i*s)/s);return n.set(r,c),c},clear(){n.clear()}}}(t,3),this.getFn=e,this.isCreated=!1,this.setIndexRecords()}setSources(e=[]){this.docs=e}setIndexRecords(e=[]){this.records=e}setKeys(e=[]){this.keys=e,this._keysMap={},e.forEach(((e,t)=>{this._keysMap[e.id]=t}))}create(){!this.isCreated&&this.docs.length&&(this.isCreated=!0,c(this.docs[0])?this.docs.forEach(((e,t)=>{this._addString(e,t)})):this.docs.forEach(((e,t)=>{this._addObject(e,t)})),this.norm.clear())}add(e){const t=this.size();c(e)?this._addString(e,t):this._addObject(e,t)}removeAt(e){this.records.splice(e,1);for(let t=e,n=this.size();t<n;t+=1)this.records[t].i-=1}getValueForItemAtKeyId(e,t){return e[this._keysMap[t]]}size(){return this.records.length}_addString(e,t){if(!l(e)||u(e))return;let n={v:e,i:t,n:this.norm.get(e)};this.records.push(n)}_addObject(e,t){let n={i:t,$:{}};this.keys.forEach(((t,r)=>{let i=t.getFn?t.getFn(e):this.getFn(e,t.path);if(l(i))if(s(i)){let e=[];const t=[{nestedArrIndex:-1,value:i}];for(;t.length;){const{nestedArrIndex:n,value:r}=t.pop();if(l(r))if(c(r)&&!u(r)){let t={v:r,i:n,n:this.norm.get(r)};e.push(t)}else s(r)&&r.forEach(((e,n)=>{t.push({nestedArrIndex:n,value:e})}))}n.$[r]=e}else if(c(i)&&!u(i)){let e={v:i,n:this.norm.get(i)};n.$[r]=e}})),this.records.push(n)}toJSON(){return{keys:this.keys,records:this.records}}}function _(e,t,{getFn:n=v.getFn,fieldNormWeight:s=v.fieldNormWeight}={}){const r=new L({getFn:n,fieldNormWeight:s});return r.setKeys(e.map(y)),r.setSources(t),r.create(),r}function b(e,{errors:t=0,currentLocation:n=0,expectedLocation:s=0,distance:r=v.distance,ignoreLocation:i=v.ignoreLocation}={}){const c=t/e.length;if(i)return c;const o=Math.abs(s-n);return r?c+o/r:o?1:c}const S=32;function w(e,t,n,{location:s=v.location,distance:r=v.distance,threshold:i=v.threshold,findAllMatches:c=v.findAllMatches,minMatchCharLength:o=v.minMatchCharLength,includeMatches:a=v.includeMatches,ignoreLocation:h=v.ignoreLocation}={}){if(t.length>S)throw new Error(`Pattern length exceeds max of ${S}.`);const l=t.length,u=e.length,d=Math.max(0,Math.min(s,u));let g=i,f=d;const p=o>1||a,m=p?Array(u):[];let y;for(;(y=e.indexOf(t,f))>-1;){let e=b(t,{currentLocation:y,expectedLocation:d,distance:r,ignoreLocation:h});if(g=Math.min(e,g),f=y+l,p){let e=0;for(;e<l;)m[y+e]=1,e+=1}}f=-1;let M=[],x=1,k=l+u;const L=1<<l-1;for(let v=0;v<l;v+=1){let s=0,i=k;for(;s<i;){b(t,{errors:v,currentLocation:d+i,expectedLocation:d,distance:r,ignoreLocation:h})<=g?s=i:k=i,i=Math.floor((k-s)/2+s)}k=i;let o=Math.max(1,d-i+1),a=c?u:Math.min(d+i,u)+l,y=Array(a+2);y[a+1]=(1<<v)-1;for(let c=a;c>=o;c-=1){let s=c-1,i=n[e.charAt(s)];if(p&&(m[s]=+!!i),y[c]=(y[c+1]<<1|1)&i,v&&(y[c]|=(M[c+1]|M[c])<<1|1|M[c+1]),y[c]&L&&(x=b(t,{errors:v,currentLocation:s,expectedLocation:d,distance:r,ignoreLocation:h}),x<=g)){if(g=x,f=s,f<=d)break;o=Math.max(1,2*d-f)}}if(b(t,{errors:v+1,currentLocation:d,expectedLocation:d,distance:r,ignoreLocation:h})>g)break;M=y}const _={isMatch:f>=0,score:Math.max(.001,x)};if(p){const e=function(e=[],t=v.minMatchCharLength){let n=[],s=-1,r=-1,i=0;for(let c=e.length;i<c;i+=1){let c=e[i];c&&-1===s?s=i:c||-1===s||(r=i-1,r-s+1>=t&&n.push([s,r]),s=-1)}return e[i-1]&&i-s>=t&&n.push([s,i-1]),n}(m,o);e.length?a&&(_.indices=e):_.isMatch=!1}return _}function C(e){let t={};for(let n=0,s=e.length;n<s;n+=1){const r=e.charAt(n);t[r]=(t[r]||0)|1<<s-n-1}return t}class E{constructor(e,{location:t=v.location,threshold:n=v.threshold,distance:s=v.distance,includeMatches:r=v.includeMatches,findAllMatches:i=v.findAllMatches,minMatchCharLength:c=v.minMatchCharLength,isCaseSensitive:o=v.isCaseSensitive,ignoreLocation:a=v.ignoreLocation}={}){if(this.options={location:t,threshold:n,distance:s,includeMatches:r,findAllMatches:i,minMatchCharLength:c,isCaseSensitive:o,ignoreLocation:a},this.pattern=o?e:e.toLowerCase(),this.chunks=[],!this.pattern.length)return;const h=(e,t)=>{this.chunks.push({pattern:e,alphabet:C(e),startIndex:t})},l=this.pattern.length;if(l>S){let e=0;const t=l%S,n=l-t;for(;e<n;)h(this.pattern.substr(e,S),e),e+=S;if(t){const e=l-S;h(this.pattern.substr(e),e)}}else h(this.pattern,0)}searchIn(e){const{isCaseSensitive:t,includeMatches:n}=this.options;if(t||(e=e.toLowerCase()),this.pattern===e){let t={isMatch:!0,score:0};return n&&(t.indices=[[0,e.length-1]]),t}const{location:s,distance:r,threshold:i,findAllMatches:c,minMatchCharLength:o,ignoreLocation:a}=this.options;let h=[],l=0,u=!1;this.chunks.forEach((({pattern:t,alphabet:d,startIndex:g})=>{const{isMatch:f,score:p,indices:m}=w(e,t,d,{location:s+g,distance:r,threshold:i,findAllMatches:c,minMatchCharLength:o,includeMatches:n,ignoreLocation:a});f&&(u=!0),l+=p,f&&m&&(h=[...h,...m])}));let d={isMatch:u,score:u?l/this.chunks.length:1};return u&&n&&(d.indices=h),d}}class I{constructor(e){this.pattern=e}static isMultiMatch(e){return F(e,this.multiRegex)}static isSingleMatch(e){return F(e,this.singleRegex)}search(){}}function F(e,t){const n=e.match(t);return n?n[1]:null}class A extends I{constructor(e,{location:t=v.location,threshold:n=v.threshold,distance:s=v.distance,includeMatches:r=v.includeMatches,findAllMatches:i=v.findAllMatches,minMatchCharLength:c=v.minMatchCharLength,isCaseSensitive:o=v.isCaseSensitive,ignoreLocation:a=v.ignoreLocation}={}){super(e),this._bitapSearch=new E(e,{location:t,threshold:n,distance:s,includeMatches:r,findAllMatches:i,minMatchCharLength:c,isCaseSensitive:o,ignoreLocation:a})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(e){return this._bitapSearch.searchIn(e)}}class $ extends I{constructor(e){super(e)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(e){let t,n=0;const s=[],r=this.pattern.length;for(;(t=e.indexOf(this.pattern,n))>-1;)n=t+r,s.push([t,n-1]);const i=!!s.length;return{isMatch:i,score:i?0:1,indices:s}}}const O=[class extends I{constructor(e){super(e)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(e){const t=e===this.pattern;return{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}}},$,class extends I{constructor(e){super(e)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(e){const t=e.startsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}}},class extends I{constructor(e){super(e)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(e){const t=!e.startsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},class extends I{constructor(e){super(e)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(e){const t=!e.endsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},class extends I{constructor(e){super(e)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(e){const t=e.endsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[e.length-this.pattern.length,e.length-1]}}},class extends I{constructor(e){super(e)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(e){const t=-1===e.indexOf(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},A],j=O.length,N=/ +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/;const R=new Set([A.type,$.type]);class W{constructor(e,{isCaseSensitive:t=v.isCaseSensitive,includeMatches:n=v.includeMatches,minMatchCharLength:s=v.minMatchCharLength,ignoreLocation:r=v.ignoreLocation,findAllMatches:i=v.findAllMatches,location:c=v.location,threshold:o=v.threshold,distance:a=v.distance}={}){this.query=null,this.options={isCaseSensitive:t,includeMatches:n,minMatchCharLength:s,findAllMatches:i,ignoreLocation:r,location:c,threshold:o,distance:a},this.pattern=t?e:e.toLowerCase(),this.query=function(e,t={}){return e.split("|").map((e=>{let n=e.trim().split(N).filter((e=>e&&!!e.trim())),s=[];for(let r=0,i=n.length;r<i;r+=1){const e=n[r];let i=!1,c=-1;for(;!i&&++c<j;){const n=O[c];let r=n.isMultiMatch(e);r&&(s.push(new n(r,t)),i=!0)}if(!i)for(c=-1;++c<j;){const n=O[c];let r=n.isSingleMatch(e);if(r){s.push(new n(r,t));break}}}return s}))}(this.pattern,this.options)}static condition(e,t){return t.useExtendedSearch}searchIn(e){const t=this.query;if(!t)return{isMatch:!1,score:1};const{includeMatches:n,isCaseSensitive:s}=this.options;e=s?e:e.toLowerCase();let r=0,i=[],c=0;for(let o=0,a=t.length;o<a;o+=1){const s=t[o];i.length=0,r=0;for(let t=0,o=s.length;t<o;t+=1){const o=s[t],{isMatch:a,indices:h,score:l}=o.search(e);if(!a){c=0,r=0,i.length=0;break}if(r+=1,c+=l,n){const e=o.constructor.type;R.has(e)?i=[...i,...h]:i.push(h)}}if(r){let e={isMatch:!0,score:c/r};return n&&(e.indices=i),e}}return{isMatch:!1,score:1}}}const P=[];function z(e,t){for(let n=0,s=P.length;n<s;n+=1){let s=P[n];if(s.condition(e,t))return new s(e,t)}return new E(e,t)}const K="$and",q="$or",D="$path",J="$val",U=e=>!(!e[K]&&!e[q]),V=e=>({[K]:Object.keys(e).map((t=>({[t]:e[t]})))});function B(e,t,{auto:n=!0}={}){const r=e=>{let i=Object.keys(e);const o=(e=>!!e[D])(e);if(!o&&i.length>1&&!U(e))return r(V(e));if((e=>!s(e)&&h(e)&&!U(e))(e)){const s=o?e[D]:i[0],r=o?e[J]:e[s];if(!c(r))throw new Error((e=>`Invalid value for key ${e}`)(s));const a={keyId:x(s),pattern:r};return n&&(a.searcher=z(r,t)),a}let a={children:[],operator:i[0]};return i.forEach((t=>{const n=e[t];s(n)&&n.forEach((e=>{a.children.push(r(e))}))})),a};return U(e)||(e=V(e)),r(e)}function G(e,t){const n=e.matches;t.matches=[],l(n)&&n.forEach((e=>{if(!l(e.indices)||!e.indices.length)return;const{indices:n,value:s}=e;let r={indices:n,value:s};e.key&&(r.key=e.key.src),e.idx>-1&&(r.refIndex=e.idx),t.matches.push(r)}))}function H(e,t){t.score=e.score}class Z{constructor(e,t={},n){this.options={...v,...t},this.options.useExtendedSearch,this._keyStore=new m(this.options.keys),this.setCollection(e,n)}setCollection(e,t){if(this._docs=e,t&&!(t instanceof L))throw new Error("Incorrect 'index' type");this._myIndex=t||_(this.options.keys,this._docs,{getFn:this.options.getFn,fieldNormWeight:this.options.fieldNormWeight})}add(e){l(e)&&(this._docs.push(e),this._myIndex.add(e))}remove(e=(()=>!1)){const t=[];for(let n=0,s=this._docs.length;n<s;n+=1){const r=this._docs[n];e(r,n)&&(this.removeAt(n),n-=1,s-=1,t.push(r))}return t}removeAt(e){this._docs.splice(e,1),this._myIndex.removeAt(e)}getIndex(){return this._myIndex}search(e,{limit:t=-1}={}){const{includeMatches:n,includeScore:s,shouldSort:r,sortFn:i,ignoreFieldNorm:a}=this.options;let h=c(e)?c(this._docs[0])?this._searchStringList(e):this._searchObjectList(e):this._searchLogical(e);return function(e,{ignoreFieldNorm:t=v.ignoreFieldNorm}){e.forEach((e=>{let n=1;e.matches.forEach((({key:e,norm:s,score:r})=>{const i=e?e.weight:null;n*=Math.pow(0===r&&i?Number.EPSILON:r,(i||1)*(t?1:s))})),e.score=n}))}(h,{ignoreFieldNorm:a}),r&&h.sort(i),o(t)&&t>-1&&(h=h.slice(0,t)),function(e,t,{includeMatches:n=v.includeMatches,includeScore:s=v.includeScore}={}){const r=[];return n&&r.push(G),s&&r.push(H),e.map((e=>{const{idx:n}=e,s={item:t[n],refIndex:n};return r.length&&r.forEach((t=>{t(e,s)})),s}))}(h,this._docs,{includeMatches:n,includeScore:s})}_searchStringList(e){const t=z(e,this.options),{records:n}=this._myIndex,s=[];return n.forEach((({v:e,i:n,n:r})=>{if(!l(e))return;const{isMatch:i,score:c,indices:o}=t.searchIn(e);i&&s.push({item:e,idx:n,matches:[{score:c,value:e,norm:r,indices:o}]})})),s}_searchLogical(e){const t=B(e,this.options),n=(e,t,s)=>{if(!e.children){const{keyId:n,searcher:r}=e,i=this._findMatches({key:this._keyStore.get(n),value:this._myIndex.getValueForItemAtKeyId(t,n),searcher:r});return i&&i.length?[{idx:s,item:t,matches:i}]:[]}const r=[];for(let i=0,c=e.children.length;i<c;i+=1){const c=e.children[i],o=n(c,t,s);if(o.length)r.push(...o);else if(e.operator===K)return[]}return r},s=this._myIndex.records,r={},i=[];return s.forEach((({$:e,i:s})=>{if(l(e)){let c=n(t,e,s);c.length&&(r[s]||(r[s]={idx:s,item:e,matches:[]},i.push(r[s])),c.forEach((({matches:e})=>{r[s].matches.push(...e)})))}})),i}_searchObjectList(e){const t=z(e,this.options),{keys:n,records:s}=this._myIndex,r=[];return s.forEach((({$:e,i:s})=>{if(!l(e))return;let i=[];n.forEach(((n,s)=>{i.push(...this._findMatches({key:n,value:e[s],searcher:t}))})),i.length&&r.push({idx:s,item:e,matches:i})})),r}_findMatches({key:e,value:t,searcher:n}){if(!l(t))return[];let r=[];if(s(t))t.forEach((({v:t,i:s,n:i})=>{if(!l(t))return;const{isMatch:c,score:o,indices:a}=n.searchIn(t);c&&r.push({score:o,key:e,value:t,idx:s,norm:i,indices:a})}));else{const{v:s,n:i}=t,{isMatch:c,score:o,indices:a}=n.searchIn(s);c&&r.push({score:o,key:e,value:s,norm:i,indices:a})}return r}}Z.version="6.6.2",Z.createIndex=_,Z.parseIndex=function(e,{getFn:t=v.getFn,fieldNormWeight:n=v.fieldNormWeight}={}){const{keys:s,records:r}=e,i=new L({getFn:t,fieldNormWeight:n});return i.setKeys(s),i.setIndexRecords(r),i},Z.config=v,Z.parseQuery=B,function(...e){P.push(...e)}(W)},8097:function(e,t,n){n.r(t),n.d(t,{Head:function(){return M},default:function(){return y}});var s=n(7294),r=n(2788);const i={textDecoration:"none"};function c(e){let{children:t,href:n}=e;return s.createElement("a",{href:n,style:i},t)}const o={listStyleType:"none"};function a(e){return s.createElement("li",{style:o},e.children)}var h={background:"#F9F9F9",foreground:"#333333",highlight:"#512DA8",link:"#0D47A1",linkVisited:"#B4CFF9",accent:"#C9C9C9"},l=n(7399);const u=r.default.ul.withConfig({displayName:"WikiList__List",componentId:"sc-1a7y300-0"})(["padding:0 1rem;width:100%;max-width:600px;> *{padding:.3rem 0;:not(:last-child){border-bottom:1px solid ","55;}}@media (","){border:1px solid ",";border-radius:.5rem;}"],h.accent,l.Z.larger,h.accent);function d(e){let{items:t}=e;return s.createElement(u,null,t.map((e=>s.createElement(a,{key:e.id},s.createElement(c,{href:e.path},e.title)))))}var g=n(8289),f=n(9053);function p(e){let{onChange:t}=e;return s.createElement("div",null,s.createElement("input",{type:"text",onChange:e=>t(e.target.value)}))}const m=r.default.main.withConfig({displayName:"pages__StyledMain",componentId:"sc-yqi7ko-0"})(["background-color:",";color:",";overflow:hidden;display:grid;place-items:center;a{color:",";}@media (","){padding:9rem 1rem 3rem 1rem;}"],h.background,h.foreground,h.link,l.Z.larger);function y(e){let{data:t}=e;const{nodes:n}=t.allFile,r=n.map(((e,t)=>{var n,s,r,i,c;let{childMarkdownRemark:o}=e;return{id:t.toString(),path:(0,g.n)(null!==(n=null==o||null===(s=o.fields)||void 0===s?void 0:s.slug)&&void 0!==n?n:""),title:null!==(r=null==o||null===(i=o.headings)||void 0===i||null===(c=i.at(0))||void 0===c?void 0:c.value)&&void 0!==r?r:"(Untitled)"}})),[i,c]=s.useState(r),[o,a]=s.useState(""),h=(0,f.useGatsbyPluginFusejs)(o,t.fusejs);return s.useEffect((()=>{c(o?function(e){return e.map(((e,t)=>{var n;return{id:t.toString(),path:(0,g.n)(e.item.name),title:null!==(n=e.item.title)&&void 0!==n?n:"(Untitled)"}}))}(h):r)}),[o]),s.createElement(m,null,s.createElement(p,{onChange:a}),s.createElement(d,{items:i}))}const M=()=>s.createElement("title",null,"Cat Logic - Home")},9053:function(e,t,n){var s,r=Object.create,i=Object.defineProperty,c=Object.getOwnPropertyDescriptor,o=Object.getOwnPropertyNames,a=Object.getPrototypeOf,h=Object.prototype.hasOwnProperty,l=(e,t,n,s)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let r of o(t))h.call(e,r)||r===n||i(e,r,{get:()=>t[r],enumerable:!(s=c(t,r))||s.enumerable});return e},u={};((e,t)=>{for(var n in t)i(e,n,{get:t[n],enumerable:!0})})(u,{default:()=>m,useFusejs:()=>f,useGatsbyPluginFusejs:()=>p}),e.exports=(s=u,l(i({},"__esModule",{value:!0}),s));var d=((e,t,n)=>(n=null!=e?r(a(e)):{},l(!t&&e&&e.__esModule?n:i(n,"default",{value:e,enumerable:!0}),e)))(n(4221)),g=n(7294);function f(e,t,n,s,r,i){const[c,o]=(0,g.useState)(null);return(0,g.useEffect)((()=>{if(!t||!n)return void o(null);const e=new d.default(t,s,d.default.parseIndex(n,r));o(e)}),[t,n]),(0,g.useMemo)((()=>e&&c&&c?.search(e,i)||[]),[e,c])}function p(e,t,n,s,r){const[i,c]=(0,g.useState)(null);return(0,g.useEffect)((()=>{if(!t?.data||!t?.index)return void c(null);const e=new d.default(t.data,n,d.default.parseIndex(JSON.parse(t.index),s));c(e)}),[t]),(0,g.useMemo)((()=>e&&i&&i?.search(e,r)||[]),[e,i])}var m=f}}]);
//# sourceMappingURL=component---src-pages-index-tsx-de300a0884b46faafdc6.js.map