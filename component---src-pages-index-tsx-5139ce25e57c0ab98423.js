"use strict";(self.webpackChunkcat_logic=self.webpackChunkcat_logic||[]).push([[691],{2324:function(e,t,n){n.r(t),n.d(t,{Head:function(){return f},default:function(){return g}});var l=n(7294),i=n(2788);const a={textDecoration:"none"};function r(e){let{children:t,href:n}=e;return l.createElement("a",{href:n,style:a},t)}const o={listStyleType:"none"};function c(e){return l.createElement("li",{style:o},e.children)}var d={background:"#F9F9F9",foreground:"#333333",highlight:"#512DA8",link:"#0D47A1",linkVisited:"#B4CFF9",accent:"#C9C9C9"};const u=i.default.ul.withConfig({displayName:"WikiList__List",componentId:"sc-1a7y300-0"})(["padding:1rem;border:1px solid ",";border-radius:.5rem;"],d.accent);function s(e){let{items:t}=e;return l.createElement(u,null,t.map((e=>l.createElement(c,{key:e.id},l.createElement(r,{href:e.path},e.title)))))}const m=i.default.main.withConfig({displayName:"pages__StyledMain",componentId:"sc-yqi7ko-0"})(["padding:9rem;background-color:",";color:",";h1{margin-top:0;margin-bottom:64;max-width:400;}a{color:",";}"],d.background,d.foreground,d.link);function g(e){let{data:t}=e;const{edges:n,totalCount:i}=t.allMarkdownRemark,a=n.map(((e,t)=>{var n,l,i,a;let{node:r}=e;return{id:t.toString(),path:"./wiki"+(null===(n=r.fields)||void 0===n?void 0:n.slug),title:null!==(l=null===(i=r.headings)||void 0===i||null===(a=i.at(0))||void 0===a?void 0:a.value)&&void 0!==l?l:"(Untitled)"}}));return l.createElement(m,null,l.createElement("h1",null,"WORK IN PROGRESS"),l.createElement("h2",null,i," Pages"),l.createElement(s,{items:a}))}const f=()=>l.createElement("title",null,"Home Page")}}]);
//# sourceMappingURL=component---src-pages-index-tsx-5139ce25e57c0ab98423.js.map