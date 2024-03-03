"use strict";(self.webpackChunkcat_logic=self.webpackChunkcat_logic||[]).push([[179],{3798:function(e,t,n){n.r(t),n.d(t,{Head:function(){return C},default:function(){return y}});var i=n(7294),r=n(2788);const l=r.default.div.withConfig({displayName:"Toc__Container",componentId:"sc-1f76i2s-0"})(["box-sizing:border-box;background-color:#f5f5f5;padding:1rem 1rem 1rem 0;border:1px solid #e0e0e0;ul{list-style:none;padding-left:1rem;margin:0;font-size:.8rem;p{margin:0;}}a{text-decoration:none;}"]);function o(e){let{contents:t}=e;return i.createElement(l,{dangerouslySetInnerHTML:{__html:t}})}const a=r.default.div.withConfig({displayName:"WikiContent__Container",componentId:"sc-q3jb6a-0"})(["overflow:auto;a{text-decoration:none;}code:not(pre code){background-color:#f5f5f5;border-radius:.5rem;padding:.2rem .4rem;}pre:has(code){font-size:85%;background-color:#f5f5f5;border-radius:.5rem;padding:1rem;overflow:auto;}img{max-width:100%;}blockquote{border-left:4px solid #ddd;padding-left:1rem;margin-left:0;font-style:italic;}"]);function d(e){let{contents:t}=e;return i.createElement(a,{dangerouslySetInnerHTML:{__html:t}})}var c=n(7399);const s=r.default.div.withConfig({displayName:"Comments__Container",componentId:"sc-1ajj4d9-0"})(["padding-top:20rem;"]);function m(){const e=i.createRef();return(0,i.useEffect)((()=>{var t;if(0===(null===(t=e.current)||void 0===t?void 0:t.children.length)){var n;const t=document.createElement("script");t.setAttribute("src","https://utteranc.es/client.js"),t.setAttribute("crossorigin","anonymous"),t.setAttribute("async","true"),t.setAttribute("repo","edunga1/cat-logic-comments"),t.setAttribute("issue-term","pathname"),t.setAttribute("theme","github-light"),null===(n=e.current)||void 0===n||n.appendChild(t)}}),[]),i.createElement(s,null,i.createElement("hr",null),i.createElement("div",{ref:e}))}const u=r.default.div.withConfig({displayName:"Wiki__Container",componentId:"sc-16q9onf-0"})(["display:grid;grid-template-columns:1fr;width:fit-content;@media (","){grid-template-columns:minmax(300px,1fr) minmax(400px,1000px);}"],c.Z.larger),f=r.default.div.withConfig({displayName:"Wiki__Side",componentId:"sc-16q9onf-1"})(["display:none;@media (","){display:block;}"],c.Z.larger),p=r.default.div.withConfig({displayName:"Wiki__Main",componentId:"sc-16q9onf-2"})(["padding:0 1rem;overflow:auto;"]),g=r.default.h3.withConfig({displayName:"Wiki__RelatedLinksHeader",componentId:"sc-16q9onf-3"})(["margin:0;padding:1rem 0 0 1rem;font-size:1rem;"]),h=r.default.ul.withConfig({displayName:"Wiki__RelatedLinks",componentId:"sc-16q9onf-4"})(["list-style:none;padding-left:1rem;margin:0;> li{padding:0;line-height:1;}"]);function k(e){let{title:t,tableOfContents:n,relatedLinksToc:r,wikiContents:l}=e;const a=r.map(((e,t)=>i.createElement("li",{key:t},e))),c=i.createElement("div",null,i.createElement(g,null,"Related Links"),i.createElement(h,null,a));return i.createElement(u,null,i.createElement(f,null,r.length>0?c:null),i.createElement(p,null,i.createElement("h1",null,t),i.createElement(o,{contents:n}),i.createElement(d,{contents:l}),i.createElement(m,null)))}function v(e){return e.replace(/<h1.*?>(.*?)<\/h1>/,"")}const b={fontSize:"0.5em",marginRight:"0.5em"};function y(e){var t;let{data:n}=e;const{tableOfContents:r,html:l}=null!==(t=n.markdownRemark)&&void 0!==t?t:{},o=_(n),a=function(e){var t,n;const i=(null===(t=e.markdownRemark)||void 0===t||null===(n=t.fields)||void 0===n?void 0:n.relatedDocs)||[];return i.filter((e=>e.similarity<1)).sort(((e,t)=>t.similarity-e.similarity)).slice(0,5)}(n),d=a.map((e=>{const t=e.slug;return i.createElement("a",{key:t,href:"../"+t,style:b},t)}));return i.createElement(k,{title:o,tableOfContents:r||"",relatedLinksToc:d,wikiContents:v(l||"")})}function C(e){let{data:t}=e;const n=_(t);return i.createElement("title",null,"Cat Logic",n&&" - "+n)}function _(e){var t,n;const{headings:i}=null!==(t=e.markdownRemark)&&void 0!==t?t:{};return(null==i||null===(n=i[0])||void 0===n?void 0:n.value)||void 0}},7399:function(e,t){t.Z={larger:"min-width: 700px"}}}]);
//# sourceMappingURL=component---src-components-gatsby-templates-wiki-tsx-63f09b7aa96ab51a95d2.js.map