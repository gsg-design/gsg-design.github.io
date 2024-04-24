const anchorEl=document.body.querySelector("#theming-anchor");let themeMenu=document.body.querySelector("#theming-menu"),rootPath="/",cssPath=rootPath+"css/brands/",variableFilePrefix="gsgds-tokens-",styleguideFilePrefix="styleguide-";const filePath=cssPath+variableFilePrefix;let fileSuffix=4;fetch(cssPath).then((e=>e.text())).then((function(e){(new DOMParser).parseFromString(e,"text/html").querySelectorAll(".icon-text-css").forEach((e=>{const t=e.href.split(filePath);if(2!=t.length)return;const n=t.pop();let r=document.createElement("md-menu-item"),i=document.createElement("div");i.setAttribute("slot","headline"),i.setAttribute("data-theme-name",n),i.setAttribute("data-theme",filePath+n),i.setAttribute("data-vars",cssPath+styleguideFilePrefix+n),i.textContent=n.slice(0,-fileSuffix),r.appendChild(i),themeMenu.appendChild(r)})),document.querySelectorAll("#theming-menu div").forEach((function(e){e.addEventListener("click",(e=>{let t=e.target;const n=t.getAttribute("data-theme"),r=t.getAttribute("data-vars"),i=t.getAttribute("data-theme-name");console.log(n),document.querySelector("[data-theme]").setAttribute("href",n),document.querySelector("[data-vars]").setAttribute("href",r),document.querySelector("#theming-anchor .theming-anchor__label").textContent=i.slice(0,-fileSuffix)}))}))})),anchorEl.addEventListener("click",(()=>{themeMenu.show()}));