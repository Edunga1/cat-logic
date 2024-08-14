"use strict";(self.webpackChunkcat_logic=self.webpackChunkcat_logic||[]).push([[179],{4477:function(e,t,n){n.d(t,{Z:function(){return l}});var i=n(7294);const o=n(2788).default.a.withConfig({displayName:"Link__A",componentId:"sc-k1di17-0"})(["text-decoration:none;&:hover{text-decoration:underline;}"]);function l(e){let{children:t,href:n}=e;return i.createElement(o,{href:n},t)}},375:function(e,t,n){n.r(t),n.d(t,{Head:function(){return W},default:function(){return q}});var i=n(7294),o=n(2788),l=n(9261);const r=o.default.div.withConfig({displayName:"Toc__Container",componentId:"sc-1f76i2s-0"})(["box-sizing:border-box;padding:1rem 1rem 1rem 0;border-top:1px solid #e0e0e0;border-bottom:1px solid #e0e0e0;ul{list-style:none;padding-left:1rem;margin:0;font-size:.8rem;p{margin:0;}}a{text-decoration:none;&:hover{color:",";}}"],l.Z.colors.highlight);function a(e){let{className:t,contents:n}=e;return i.createElement(r,{className:t,dangerouslySetInnerHTML:{__html:n}})}const d=o.default.div.withConfig({displayName:"WikiContent__Container",componentId:"sc-q3jb6a-0"})(["overflow:auto;overflow-wrap:break-word;color:",";font-size:.8rem;a{text-decoration-style:dotted;&:visited{color:",";}}code:not(pre code){background-color:#f5f5f5;border-radius:.5rem;padding:.2rem .4rem;word-break:break-word;}pre:has(code){font-size:85%;background-color:#f5f5f5;border-radius:.5rem;padding:1rem;overflow:auto;}img{max-width:100%;}blockquote{border-left:4px solid #ddd;padding-left:1rem;margin-left:0;font-style:italic;}table{width:100%;border-collapse:collapse;td,th{padding:.2rem .5rem;}thead{background-color:",";}tbody{font-size:.8rem;tr:nth-child(even){background-color:",";}tr:hover{background-color:",";}}}"],l.Z.colors.foreground,l.Z.colors.linkVisited,l.Z.colors.background2,l.Z.colors.background2,l.Z.colors.backgroundHighlight);function c(e){let{contents:t}=e;return i.createElement(d,{dangerouslySetInnerHTML:{__html:t}})}var s=n(7399),m=n(4477);const u=o.default.div.withConfig({displayName:"Comments__Container",componentId:"sc-1ajj4d9-0"})(["padding-top:20rem;"]);function f(){const e=i.createRef();return(0,i.useEffect)((()=>{var t;if(0===(null===(t=e.current)||void 0===t?void 0:t.children.length)){var n;const t=document.createElement("script");t.setAttribute("src","https://utteranc.es/client.js"),t.setAttribute("crossorigin","anonymous"),t.setAttribute("async","true"),t.setAttribute("repo","edunga1/cat-logic-comments"),t.setAttribute("issue-term","pathname"),t.setAttribute("theme","github-light"),null===(n=e.current)||void 0===n||n.appendChild(t)}}),[]),i.createElement(u,null,i.createElement("hr",null),i.createElement("div",{ref:e}))}const g=o.default.div.withConfig({displayName:"GrassPoint__Container",componentId:"sc-vhet8f-0"})(["width:.5rem;height:.5rem;background-color:",";> span{font-size:.5rem;top:1rem;white-space:nowrap;transform:rotate(-15deg);position:inherit;cursor:default;user-select:none;}"],(e=>e.highlighted?"rgba(200,200,200,.5)":"rgba(192,222,191,.5)"));const h=o.default.div.withConfig({displayName:"GrassActivity__Container",componentId:"sc-1d932e2-0"})(["height:3rem;overflow:hidden;border-top:1px dotted rgba(0,0,0,0.1);border-bottom:1px dotted rgba(0,0,0,0.1);padding:0.5rem 0;margin-bottom:1rem;"]),p=o.default.div.withConfig({displayName:"GrassActivity__PointContainer",componentId:"sc-1d932e2-1"})(["width:calc(100% - .5rem);height:100%;position:relative;display:flex;"]),v=(0,o.default)((function(e){let{label:t,highlighted:n,className:o}=e;return i.createElement(g,{className:o,highlighted:n},i.createElement("span",null,t))})).withConfig({displayName:"GrassActivity__GrassPointWrapper",componentId:"sc-1d932e2-2"})(["position:absolute;left:","%;z-index:",";"],(e=>e.left.toFixed(2)),(e=>e.fixed?0:1));function y(e){let{dates:t,range:n}=e;const o=t.sort(((e,t)=>e.getTime()-t.getTime())),l=function(e,t){function n(){return void 0!==t?t>e[0]?b(new Date,10):t:b(new Date,10)}const i=[];0===e.length?(i.push(n()),i.push(new Date)):1===e.length&&i.unshift(n());return i}(null!=n?n:[],o.at(0)),r=function(e,t){const n=e[e.length-1].getTime()-e[0].getTime(),i=e.map((t=>new w(t,(t.getTime()-e[0].getTime())/n,!0,t.toLocaleDateString())));return t.filter((t=>t>=e[0]&&t<=e[e.length-1])).sort(((e,t)=>e.getTime()-t.getTime())).reduce(((t,i)=>{const o=new w(i,(i.getTime()-e[0].getTime())/n,!1);return t.splice(t.length-1,0,o),t}),i)}(l,o);return i.createElement(h,null,i.createElement(p,null,r.map(((e,t)=>i.createElement(v,{key:t,left:100*e.rate,label:e.label})))))}function b(e,t){return new Date(e.setDate(e.getDate()-t))}let w=function(e,t,n,i){this.date=e,this.rate=t,this.isFixed=n,this.label=i};const k=o.default.div.withConfig({displayName:"HomeLink__Container",componentId:"sc-1f7ngt2-0"})(["font-size:1.5rem;text-align:right;a{color:",';opacity:0.2;font-weight:700;&:hover{text-decoration:none;}&:after{content:"»";margin-left:.1rem;}}'],l.Z.colors.foreground);function C(e){let{slug:t}=e;const[n,o]=i.useState("");return i.useEffect((()=>{o(function(e,t){const n=new URL(e);return n.pathname.replace("wiki"+t,"")}(window.location.href,t))})),i.createElement(k,null,i.createElement(m.Z,{href:n},"CAT"))}const _=o.default.div.withConfig({displayName:"GitHubCommitLink__Container",componentId:"sc-13f81rm-0"})(["font-size:.7rem;color:",";a{color:",";text-decoration:none;}"],l.Z.colors.lowlight,l.Z.colors.lowlight);function E(e){let{lastModified:t,gitHubRepositoryUrl:n,hash:o}=e;const l=t.toLocaleString(),r=n&&o?i.createElement("a",{href:n+"/commit/"+o},l):i.createElement("span",null,l);return i.createElement(_,null,r)}var x=n(7702);const N=o.default.div.withConfig({displayName:"Wiki__Main",componentId:"sc-16q9onf-0"})(["padding:0 1rem;overflow:auto;"]),I=o.default.h3.withConfig({displayName:"Wiki__RelatedLinksHeader",componentId:"sc-16q9onf-1"})(["margin:0;padding:1rem 0 0 1rem;font-size:1rem;"]),Z=o.default.ul.withConfig({displayName:"Wiki__RelatedLinks",componentId:"sc-16q9onf-2"})(["list-style:none;padding-left:1rem;margin:0;> li{padding:0;line-height:1;}"]),T=o.default.div.withConfig({displayName:"Wiki__TitleContainer",componentId:"sc-16q9onf-3"})(["display:flex;margin:1rem 0;gap:.5rem;"]),D=o.default.h1.withConfig({displayName:"Wiki__Title",componentId:"sc-16q9onf-4"})(["margin:0;font-size:1.5rem;font-weight:700;color:",";"],l.Z.colors.foreground),L=o.default.div.withConfig({displayName:"Wiki__TitleBottom",componentId:"sc-16q9onf-5"})(["display:flex;justify-content:flex-end;"]),R=(0,o.default)(a).withConfig({displayName:"Wiki__TocMain",componentId:"sc-16q9onf-6"})(["display:block;@media (","){display:none;}"],s.Z.larger),A=(0,o.default)(a).withConfig({displayName:"Wiki__TocSide",componentId:"sc-16q9onf-7"})(["margin-top:2rem;max-width:20rem;"]);function H(e){let{title:t,tableOfContents:n,relatedLinksToc:o,wikiContents:l,slug:r,lastModified:a,lastCommitHash:d,gitHubRepositoryUrl:s,activityDates:u}=e;const g=o.map(((e,t)=>i.createElement("li",{key:t},e))),h=i.createElement("div",null,i.createElement(I,null,"Related Links"),i.createElement(Z,null,g)),p=a?i.createElement(E,{lastModified:a,gitHubRepositoryUrl:s,hash:d}):null;return i.createElement(x.Z,null,i.createElement(N,null,i.createElement(T,null,i.createElement(C,{slug:r}),i.createElement(m.Z,{href:"."},i.createElement(D,null,t))),i.createElement(y,{dates:u||[]}),i.createElement(L,null,p),i.createElement(R,{contents:n}),i.createElement(c,{contents:l}),i.createElement(f,null)),o.length>0?h:null,i.createElement(A,{contents:n}))}function M(e){return e.replace(/<h1.*?>(.*?)<\/h1>/,"")}const z={fontSize:"0.5em",marginRight:"0.5em"};function q(e){var t,n,o,l,r,a;let{data:d}=e;const{tableOfContents:c,html:s,fields:m}=null!==(t=null===(n=d.file)||void 0===n?void 0:n.childMarkdownRemark)&&void 0!==t?t:{},u=(null===(o=d.file)||void 0===o||null===(l=o.fields)||void 0===l?void 0:l.gitLogs)||[],f=function(e){var t,n;const i=(null===(t=e.file)||void 0===t||null===(n=t.fields)||void 0===n?void 0:n.gitLogs)||[];return i.map((e=>e&&e.date&&new Date(e.date)||null)).filter((e=>null!==e)).map((e=>e))}(d),{hash:g,date:h}=u[0]||{},p=j(d),v=function(e){var t,n,i;const o=(null===(t=e.file)||void 0===t||null===(n=t.childMarkdownRemark)||void 0===n||null===(i=n.fields)||void 0===i?void 0:i.relatedDocs)||[];return o.filter((e=>e.similarity<1)).sort(((e,t)=>t.similarity-e.similarity)).slice(0,5)}(d),y=v.map((e=>{const t=e.slug;return i.createElement("a",{key:t,href:"../"+t,style:z},t)})),b=(null===(r=d.site)||void 0===r||null===(a=r.siteMetadata)||void 0===a?void 0:a.gitHubRepositoryUrl)||void 0;return i.createElement(H,{title:p,tableOfContents:c||"",relatedLinksToc:y,wikiContents:M(s||""),slug:(null==m?void 0:m.slug)||"",lastModified:h?new Date(h):void 0,lastCommitHash:g||void 0,gitHubRepositoryUrl:b,activityDates:f})}function W(e){let{data:t}=e;const n=j(t);return i.createElement("title",null,"Cat Logic",n&&" - "+n)}function j(e){var t,n,i;const{headings:o}=null!==(t=null===(n=e.file)||void 0===n?void 0:n.childMarkdownRemark)&&void 0!==t?t:{};return(null==o||null===(i=o[0])||void 0===i?void 0:i.value)||void 0}},7702:function(e,t,n){n.d(t,{Z:function(){return s}});var i=n(7294),o=n(2788),l=n(7399),r=n(9261);const a=o.default.div.withConfig({displayName:"PageLayout__Container",componentId:"sc-11jfopf-0"})(["padding-top:10%;color:",";overflow:hidden;display:grid;grid-template-columns:1fr;position:relative;a{color:",";}@media (","){padding:1rem 1rem 3rem 1rem;grid-template-columns:.5fr minmax(auto,40rem) 10rem;> :nth-child(1){grid-column:2;}> :nth-child(2){grid-column:3;position:fixed;}}"],r.Z.colors.foreground,r.Z.colors.link,l.Z.larger),d=o.default.div.withConfig({displayName:"PageLayout__Main",componentId:"sc-11jfopf-1"})(["width:100%;padding:0 1rem;display:grid;"]),c=o.default.div.withConfig({displayName:"PageLayout__Side",componentId:"sc-11jfopf-2"})(["display:none;@media (","){display:block;padding:0 1rem;}"],l.Z.larger);function s(e){let{children:t}=e;const[n,o]=Array.isArray(t)?[t[0],t.slice(1)]:[t,null];return i.createElement(a,null,i.createElement(d,null,n),i.createElement(c,null,o))}},7399:function(e,t){t.Z={larger:"min-width: 700px"}},9261:function(e,t){t.Z={colors:{foreground:"#333333",highlight:"#512DA8",lowlight:"#BDBDBD",link:"#0D47A1",linkVisited:"#B4CFF9",accent:"#C9C9C9",background2:"#F5F5F5",backgroundHighlight:"#D0D0D0"},fonts:{body:"-apple-system, Roboto, sans-serif, serif",heading:"-apple-system, Roboto, sans-serif, serif"}}}}]);
//# sourceMappingURL=component---src-components-gatsby-templates-wiki-tsx-f51d22eb48d28ee3ffc2.js.map