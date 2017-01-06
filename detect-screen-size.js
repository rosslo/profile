var head = document.getElementsByTagName("head")[0];
var css = document.createElement("link");
css.type = "text/css";
css.rel = "stylesheet";
if(window.screen.availHeight>window.screen.availWidth){
	css.href = "higher.css";
	console.log('higher');
}
else{
	css.href = "wider.css";
	console.log('wider');
}
head.appendChild(css);