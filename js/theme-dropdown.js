const anchorEl=document.body.querySelector("#theming-anchor");let themeMenu=document.body.querySelector("#theming-menu"),rootPath="/",listPath=rootPath+"css/list/list.txt",cssPath=rootPath+"css/brands/",variableFilePrefix="gsgds-tokens-",styleguideFilePrefix="styleguide-";const filePath=cssPath+variableFilePrefix;let fileSuffix=4;fetch(listPath).then((e=>e.text())).then((function(e){e.split(/\r?\n/).forEach((e=>{let t=document.createElement("md-menu-item"),a=document.createElement("div");a.setAttribute("slot","headline"),a.setAttribute("data-theme-name",e),a.setAttribute("data-theme",filePath+e+".css"),a.setAttribute("data-vars",cssPath+styleguideFilePrefix+e+".css"),a.textContent=e,t.appendChild(a),themeMenu.appendChild(t)})),document.querySelectorAll("#theming-menu div").forEach((function(e){e.addEventListener("click",(e=>{let t=e.target;const a=t.getAttribute("data-theme"),n=t.getAttribute("data-vars"),r=t.getAttribute("data-theme-name");console.log(a),document.querySelector("[data-theme]").setAttribute("href",a),document.querySelector("[data-vars]").setAttribute("href",n),document.querySelector("#theming-anchor .theming-anchor__label").textContent=r}))}))})),anchorEl.addEventListener("click",(()=>{themeMenu.show()}));