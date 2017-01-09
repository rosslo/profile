$(window).load(function(){
var loaded = false;
var checkCssLoad = setInterval(function(){
	if($('#part-2').css('opacity')==='0'){
		$('.loader').hide(0,function(){
			loaded=true;
		});
	}
},50);
//var startY = $(window).height()*4; /*#part-1  .rocket-body-2'*/
// $('html, body').animate({scrollTop: startY},1);
var opendoor=false; //用來判斷是否以滾動過執行opendoor();
var animated = true; //用來避免animate執行scroll的延遲
var scrollRight = true; //scrollRight=true=>right, false=>down;
var ismobile = detectmob();
var vhFixed;
var translateSpeed = 0; //全屏滾動速度
if(ismobile){
	translateSpeed = 800;
	vhFixed = vhFix();
	$('.tip.-web').hide();
	$("body, .work, .work-link").swipe( {
        //Generic swipe handler for all directions
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        	if(direction==="left"){
        		wheelRight(-1);
        	}else if(direction==="right"){
        		wheelRight(1);
        	}
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
        excludedElements: "label, button, input, select, textarea, .noSwipe",
	    threshold:1
      });
}else{
	translateSpeed = 1200;
	vhFixed = true;
	var translateDone = true;
	$('.tip.-mobile').hide();
	$(window).keydown(function(event){
		switch(event.keyCode) {
		  case 38:
		   wheelRight(1);
		  break;
		  case 40:
		   wheelRight(-1);
		  break;
		}
	});
	$("body").mousewheel(function(event, delta) {
		if(translateDone){
			wheelRight(delta);
			translateDone = false;
		}
		event.preventDefault();
	    setTimeout(function(){
  			translateDone = true;
		}, 1200);
	    return false;
	});
}
function wheelRight(delta){
    if(loaded&&vhFixed){
     if(!opendoor){openDoor();}
     else{
	    var HendIndex = 2;//$(".horizontal>li").length-2 //水平part最後一個index，扣除entrance以及長度多1
	    var translateX = parseInt($('.horizontal').css('transform').split(',')[4]) || parseInt($('.horizontal').css('-webkit-transform').split(',')[4]);
	    var HcurIndex = Math.floor(Math.abs(translateX)/($('body').width()-1)); //水平part現在的index
	    var VendIndex = 3; //$(".vertical>li").length-1; //水平part最後一個index，扣除長度多1
	    var translateY = parseInt($('.vertical').css('transform').split(',')[5]) || parseInt($('.vertical').css('-webkit-transform').split(',')[5]);
	    var VcurIndex = 4-Math.floor((Math.abs(translateY)/$(window).height())); //水平part現在的index
	    if(scrollRight){ //判斷是否整個頁面滑動結束，避免連續滑動
		    if(delta===-1 && HcurIndex!==HendIndex){ //-1往下一頁 && 判斷時候是否最後一個part
		      	HcurIndex++;
		      	if(HcurIndex===1){
		      		setTimeout(function(){
		      			showSkills();
					}, translateSpeed);
		      	}
		      	if(HcurIndex===2){
		      		setTimeout(function(){
		      			infoMove(VcurIndex);
					}, translateSpeed);
		      	}
		      	translate3d('.horizontal',"-"+(HcurIndex*33.33).toString()+"%","0","0");
		    }else if(delta===1 && HcurIndex>0){ //1往上一頁 && cur===0時，代表在第一個part
		      	HcurIndex--;
		        translate3d('.horizontal',"-"+(HcurIndex*33.33).toString()+"%","0","0");
		    }else if(delta===-1 && (HcurIndex===HendIndex)){  //-1往下一頁 && 已經在水平part的最後一個
		    	scrollRight=false;
		    }
	    }
		if(!scrollRight){
			if(delta===-1 && VcurIndex<4){
				VcurIndex++;
				translate3d('.horizontal',translateX+"px",(VcurIndex*100).toString()+"%","0");
			}else if(delta===1 && VcurIndex>0){  //1往上一頁 && 不處於垂直part的最下面一個(載入起始位置startY)
				VcurIndex--;
				translate3d('.horizontal',translateX+"px",(VcurIndex*100).toString()+"%","0");
			}else if(delta===1 && VcurIndex===0){  //1往上一頁 && 已經在水平part的最後一個
		    	scrollRight=true;
		    	translate3d('.horizontal',"-"+((HcurIndex-1)*33.33).toString()+"%","0","0");
		    }
		    console.log(VcurIndex);
			var Y = ((4-VcurIndex)*25).toString();
			translate3d('.vertical',"0","-"+Y+"%","0");
			setTimeout(function(){
		      	infoMove(4-VcurIndex);
			}, translateSpeed);
				if(VcurIndex===4){
					if(ismobile){
						$('.rocket').css({"left":($('body').width()/20).toString()+'px',"bottom":($('body').width()/10*3).toString()+'px',"transform":"rotate(45deg) scale(1)","-webkit-transform":"rotate(45deg) scale(1)","-moz-transform":"rotate(45deg) scale(1)","-o-transform":"rotate(45deg) scale(1)"});
					}else{
						$('.rocket').addClass('rocket-move');
					}
					$('.contact-item, .contact-title').css("opacity","1");
				}
		}
      }
      }
}
function translate3d(dom,x,y,z){
	$(dom).css('transform',"translate3d("+x+","+y+","+z+")");
	$(dom).css('-webkit-transform',"translate3d("+x+","+y+","+z+")");
}
function openDoor(){
	var border = document.getElementsByClassName('border');
	var door = document.getElementsByClassName('door');
	var part1 = document.getElementById('part-1');
	var part2 = document.getElementById('part-2');
	$('.entrance').css("transform","scale(1.5)");
	$('.tip').css("display","none");
	door[0].style.top="-80%";
	door[1].style.top="70%";
	part2.style.opacity="1";
	setTimeout(function(){
		$('.entrance').css("display","none");
		$('.box').addClass('box-remove');
	}, 3000);
	setTimeout(function(){
		opendoor=true;
	}, 4000);
}
function infoMove(Vindex){
	$('.info-box').eq(Vindex).addClass('info-move');
}
function showSkills(){
	// if(window.screen.availHeight<window.screen.availWidth){
		$('.skill-level').each(function(){
			var level = $(this).attr('data-level');
			$(this).animate({width:level+"%"},800);
			$(this).css("padding-left","5px");
		});
	// }
}
function vhFix(){
	var sum=$('.skill-list').eq(3).offset().top + $('.skill-list').eq(3).height()-$('.skills-machine').offset().top+parseInt($('.skill-list').eq(0).css('margin-bottom'))*3;
	var radiatorH = $('.skills-machine').height()-sum;
	$('.fire').css('border-width','0 '+($('body').width()/100*19).toString()+'px '+($(window).height()/5).toString()+'px');
	$('head').append("<style>.radiator-box,.radiator-box:before{height:"+radiatorH+"px} .info-box:before, .info-box:after{ height:"+($(window).height()/10).toString()+"px }.info-box:before, .info-box:after{ top:"+(-$(window).height()/10-10).toString()+"px }.rocket-top:after{ border-width:0 "+($('body').width()/100*35).toString()+"px "+($(window).height()/100*35).toString()+"px}</style>");
	$('.rocket').css('left',("-"+$('body').width()/4).toString()+'px');
	return true;
}
function detectmob() {
 if( navigator.userAgent.match(/Android/i)|| navigator.userAgent.match(/webOS/i)|| navigator.userAgent.match(/iPhone/i)|| navigator.userAgent.match(/iPad/i)|| navigator.userAgent.match(/iPod/i)|| navigator.userAgent.match(/BlackBerry/i)|| navigator.userAgent.match(/Windows Phone/i)){
    return true;
  }
 else {
    return false;
  }
}
});