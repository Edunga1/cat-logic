"use strict";(self.webpackChunkcat_logic=self.webpackChunkcat_logic||[]).push([[803],{7399:function(e,t){t.Z={larger:"min-width: 700px"}},6559:function(e,t,n){n.r(t),n.d(t,{default:function(){return b}});var i=n(7294);var r=n(2788);const o=r.default.div.withConfig({displayName:"Toc__Container",componentId:"sc-1f76i2s-0"})(["box-sizing:border-box;background-color:#f5f5f5;padding:1rem 1rem 1rem 0;ul{list-style:none;padding-left:1rem;margin:0;font-size:.8rem;p{margin:0;}}a{text-decoration:none;}"]);function a(e){let{contents:t}=e;return i.createElement(o,{dangerouslySetInnerHTML:{__html:t}})}const l=r.default.div.withConfig({displayName:"WikiContent__Container",componentId:"sc-q3jb6a-0"})(["overflow:auto;a{text-decoration:none;}pre{font-size:85%;background-color:#f5f5f5;border-radius:.5rem;padding:1rem;overflow:auto;}"]);function c(e){let{contents:t}=e;return i.createElement(l,{dangerouslySetInnerHTML:{__html:t}})}var d=n(7399);const s=r.default.div.withConfig({displayName:"Comments__Container",componentId:"sc-1ajj4d9-0"})(["padding-top:20rem;"]);function m(){const e=i.createRef();return(0,i.useEffect)((()=>{var t;if(0===(null===(t=e.current)||void 0===t?void 0:t.children.length)){var n;const t=document.createElement("script");t.setAttribute("src","https://utteranc.es/client.js"),t.setAttribute("crossorigin","anonymous"),t.setAttribute("async","true"),t.setAttribute("repo","edunga1/cat-logic-comments"),t.setAttribute("issue-term","pathname"),t.setAttribute("theme","github-light"),null===(n=e.current)||void 0===n||n.appendChild(t)}}),[]),i.createElement(s,null,i.createElement("hr",null),i.createElement("div",{ref:e}))}const u=r.default.div.withConfig({displayName:"Wiki__Container",componentId:"sc-16q9onf-0"})(["display:grid;grid-template-columns:1fr;width:fit-content;@media (","){grid-template-columns:minmax(300px,1fr) minmax(400px,1000px);}"],d.Z.larger),f=r.default.div.withConfig({displayName:"Wiki__Side",componentId:"sc-16q9onf-1"})(["display:none;& > div:nth-child(2){padding-top:1rem;}@media (","){display:block;}"],d.Z.larger),p=r.default.div.withConfig({displayName:"Wiki__Main",componentId:"sc-16q9onf-2"})(["padding:0 1rem;overflow:auto;@media (","){& > div:nth-child(2){display:none;}}"],d.Z.larger);function g(e){let{title:t,tableOfContents:n,relatedLinksToc:r,wikiContents:o}=e;return i.createElement(u,null,i.createElement(f,null,i.createElement(a,{contents:n}),i.createElement("span",null,r)),i.createElement(p,null,i.createElement("h1",null,t),i.createElement(a,{contents:n}),i.createElement(c,{contents:o}),i.createElement(m,null)))}function h(e){return e.replace(/<h1.*?>(.*?)<\/h1>/,"")}const v={fontSize:"0.5em",marginRight:"0.5em"};function b(e){var t,n;let{data:r}=e;const{headings:o,tableOfContents:a,html:l}=null!==(t=r.markdownRemark)&&void 0!==t?t:{},c=(l&&function(e){const t=/<a href="\/([^"]+)">/g,n=[];let i;for(;i=t.exec(e);){const e=i[1];e.endsWith(".md")&&n.push(e.substring(e.lastIndexOf("/")+1,e.length-3))}return n}(l)||[]).map((e=>i.createElement("a",{key:e,href:"../"+e,style:v},e)));return i.createElement(g,{title:(null==o||null===(n=o[0])||void 0===n?void 0:n.value)||void 0,tableOfContents:a||"",relatedLinksToc:c,wikiContents:h(l||"")})}}}]);
//# sourceMappingURL=component---src-pages-wiki-markdown-remark-fields-slug-tsx-212fcad28152c3005b7e.js.map