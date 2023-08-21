(()=>{"use strict";var e={307:(e,t,n)=>{n.r(t)},0:function(e,t,n){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=a(n(205));class i extends r.default{renderFooter(){}render(){const e=this.createContainer();return this.container.append(e),this.renderFooter(),this.container}}t.default=i},977:function(e,t,n){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=a(n(205)),i=[{id:"main",text:"Main Page"},{id:"login",text:"Login Page"},{id:"registration",text:"Registration Page"}];class o extends r.default{renderPageButtons(){const e=this.createContainer(),t=document.createElement("div");i.forEach((e=>{const n=document.createElement("a");n.href=`#${e.id}`,n.innerText=e.text,t.append(n)})),e.append(t),this.container.append(e)}render(){return this.renderPageButtons(),this.container}}t.default=o},607:function(e,t,n){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=a(n(894));n(307),(new r.default).run()},894:function(e,t,n){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=a(n(0)),i=a(n(977)),o=a(n(810)),s=a(n(253)),d=a(n(149));t.default=class{renderNewPage(e){const t=document.querySelector(`#${this.defaultPageId}`),n=document.querySelector(".footer");t&&t.remove();let a=null;if("main"===e?a=new s.default(e):"login"===e?a=new o.default(e):"registration"===e&&(a=new d.default(e)),a){const e=a.render();e.id=this.defaultPageId,this.container.insertBefore(e,n)}}enableRouting(){window.addEventListener("hashchange",(()=>{const e=window.location.hash.slice(1);this.renderNewPage(e)}))}constructor(){this.container=document.body,this.defaultPageId="current-page",this.initialPage=new s.default("main"),this.header=new i.default("header","header"),this.footer=new r.default("footer","footer")}run(){let e;this.container.append(this.header.render()),this.container.append(this.footer.render()),e=window.location.hash?window.location.hash.slice(1):"main",this.renderNewPage(e),this.enableRouting()}}},810:function(e,t,n){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=a(n(213));class i extends r.default{constructor(){super(...arguments),this.TextObject={MainTitle:"Login Page"}}createPageButtons(e,t){const n=document.createElement("div"),a=document.createElement("a");return n.className="login__btn",a.href=e,a.innerText=t,n.append(a),n}renderLogin(e,t,n,a){const r=document.createElement("input");return r.className=e,r.type=t,r.id=n,r.placeholder=a,r}render(){const e=document.createElement("div");e.className="container";const t=document.createElement("div");t.className="login__wrapper";const n=document.createElement("form");n.className="login",t.append(n);const a=document.createElement("div");a.className="login__btns";let r=this.createPageButtons("#login","Log in");a.append(r),r.classList.add("login__btn_active"),r=this.createPageButtons("#registration","Sign up"),a.append(r),n.append(a);const i=document.createElement("div");i.className="login__text";let o=document.createElement("p");o.className="text_bold",o.innerText="Welcome back",i.append(o),o=document.createElement("p"),o.innerText="We're so exited to see you again!",i.append(o),n.append(i);const s=document.createElement("div");s.className="input",n.append(s);let d=this.renderLogin("input__email","email","username","Email");s.append(d);const c=document.createElement("div");c.className="input",n.append(c),d=this.renderLogin("input__password","text","password","Password"),c.append(d),e.append(t);const l=document.createElement("div");l.className="login__submit_wrapper",n.append(l);const u=document.createElement("button");return u.className="login__submit",u.type="submit",u.id="login-submit",u.textContent="Log in",l.append(u),this.container.append(e),this.container}}t.default=i},253:function(e,t,n){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=a(n(213));class i extends r.default{render(){const e=this.createHeaderTitle("Main");return this.container.append(e),this.container}}t.default=i},149:function(e,t,n){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=a(n(213));class i extends r.default{constructor(){super(...arguments),this.TextObject={MainTitle:"Registration Page"}}createPageButtons(e,t){const n=document.createElement("div"),a=document.createElement("a");return n.className="login__btn",a.href=e,a.innerText=t,n.append(a),n}renderLogin(e,t,n,a){const r=document.createElement("input");return r.className=e,r.type=t,r.id=n,r.placeholder=a,r}render(){const e=document.createElement("div");e.className="container";const t=document.createElement("div");t.className="login__wrapper";const n=document.createElement("form");n.className="login",t.append(n);const a=document.createElement("div");a.className="login__btns";let r=this.createPageButtons("#login","Log in");a.append(r),r=this.createPageButtons("#registration","Sign up"),a.append(r),r.classList.add("login__btn_active"),n.append(a);const i=document.createElement("div");i.className="input",n.append(i);let o=this.renderLogin("input__email","email","username","Email");e.append(t);const s=document.createElement("div");s.className="input",n.append(s),o=this.renderLogin("input__password","text","password","Password"),s.append(o);const d=document.createElement("div");d.className="input",n.append(d),o=this.renderLogin("input__name","text","name","Name"),d.append(o),o=this.renderLogin("input__name","text","surname","Surname"),d.append(o);const c=document.createElement("div");c.className="input",n.append(c),o=this.renderLogin("input__info","date","date","01.01.1970"),c.append(o),o=this.renderLogin("input__info","radio","gender","male"),o.name="gender",o.value="male",c.append(o);let l=document.createElement("span");l.innerText="Male",c.append(l),o=this.renderLogin("input__info","radio","gender","male"),o.name="gender",o.value="male",c.append(o),l=l=document.createElement("span"),l.innerText="Female",c.append(l);const u=document.createElement("div");u.className="input",n.append(u),l=document.createElement("p"),l.innerText="Shipping adress",u.append(l),o=this.renderLogin("input__adress","text","shipping-street","Street"),u.append(o),o=this.renderLogin("input__adress","text","shipping-city","City"),u.append(o),o=this.renderLogin("input__adress","text","shipping-code","Postal code"),u.append(o),o=this.renderLogin("input__adress","text","shipping-country","Counrtry"),u.append(o);const p=document.createElement("div");p.className="input",n.append(p),l=document.createElement("p"),l.innerText="Billing adress",p.append(l),o=this.renderLogin("input__adress","text","billing-street","Street"),p.append(o),o=this.renderLogin("input__adress","text","billing-city","City"),p.append(o),o=this.renderLogin("input__adress","text","billing-code","Postal code"),p.append(o),o=this.renderLogin("input__adress","text","billing-country","Counrtry"),p.append(o);const m=document.createElement("button");return m.className="login__btn",m.type="submit",m.id="login-submit",m.textContent="Sign up",n.append(m),this.container.append(e),this.container}}t.default=i},205:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(e,t){this.container=document.createElement(e),this.container.className=t}createContainer(){const e=document.createElement("div");e.className="container";const t=document.createElement("div"),n=document.createElement("img");return n.src="./images/image (1).png",n.alt="AutoCar",t.append(n),e.append(t),e}render(){return this.container}}},213:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(e){this.TextObject={},this.container=document.createElement("div"),this.container.id=e}createHeaderTitle(e){const t=document.createElement("h1");return t.innerText=e,t}render(){return this.container}}}},t={};function n(a){var r=t[a];if(void 0!==r)return r.exports;var i=t[a]={exports:{}};return e[a].call(i.exports,i,i.exports,n),i.exports}n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n(607)})();