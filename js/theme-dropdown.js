const anchorEl=document.body.querySelector("#theming-anchor");let themeMenu=document.body.querySelector("#theming-menu"),rootPath="/",cssPath=rootPath+"css/brands/",variableFilePrefix="gsgds-tokens-",styleguideFilePrefix="styleguide-";const filePath=cssPath+variableFilePrefix;let fileSuffix=4;fetch(cssPath).then((e=>e.text())).then((function(e){(new DOMParser).parseFromString(e,"text/html").querySelectorAll(".icon-text-css").forEach((e=>{const t=e.href.split(filePath);if(2!=t.length)return;const r=t.pop();let n=document.createElement("md-menu-item"),i=document.createElement("div");i.setAttribute("slot","headline"),i.setAttribute("data-theme",filePath+r),i.setAttribute("data-vars",cssPath+styleguideFilePrefix+r),i.textContent=r.slice(0,-fileSuffix),n.appendChild(i),themeMenu.appendChild(n)})),document.querySelectorAll("#theming-menu div").forEach((function(e){e.addEventListener("click",(e=>{let t=e.target;const r=t.getAttribute("data-theme"),n=t.getAttribute("data-vars");console.log(r),document.querySelector("[data-theme]").setAttribute("href",r),document.querySelector("[data-vars]").setAttribute("href",n)}))}))})),anchorEl.addEventListener("click",(()=>{themeMenu.show()}));