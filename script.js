$(document).ready(function(){
var startY = $('#part-1').offset().top; /*#part-1  .rocket-body-2'*/
$('html, body').animate({scrollTop: startY},1);
var opendoor=false; //用來判斷是否以滾動過執行opendoor();
var animated = true; //用來避免animate執行scroll的延遲
var scrollRight = true; //scrollRight=true=>right, false=>down;
var ismobile = detectmob();
if(ismobile){
	$("body").on("swiperight",wheelRight(-1));
	$("body").on("swipeleft",wheelRight(1));
}else{
	$("body").mousewheel(function(event, delta) {
		wheelRight(delta);
		event.preventDefault();
	    return false;
	});
}
function wheelRight(delta){
   //$("body").mousewheel(function(event, delta) {
     //this.scrollLeft -= (delta * 50);
     if(!opendoor){openDoor();}
     else{
	    var horizontalNum = $(".horizontal>li").length; //水平的part數量
	    var vw100=$('body').width(); //100vw的值多少
	    var cur = parseInt($('.horizontal').css('transform').split(',')[4]);
	    var X=cur; //X軸將移動距離的儲存變數，初始為現在位置
	    if(Math.abs(cur)%vw100===0 && scrollRight){ //判斷是否整個頁面滑動結束，避免連續滑動
		    if(delta===-1 && (Math.abs(cur)/vw100<horizontalNum-1)){ //-1往下一頁 && 判斷時候是否最後一個part
		      	X=cur-vw100;
		      	if(Math.abs(cur)/vw100===horizontalNum-3){
		      		setTimeout(function(){
		      			showSkills();
				}, 1200);
		      	}
		      	if(Math.abs(cur)/vw100===horizontalNum-2){
		      		setTimeout(function(){
		      			infoMove();
				}, 1200);
		      	}
		    }else if(delta===1 && cur<0){ //1往上一頁 && cur===0時，代表在第一個part
		      	X=cur+vw100;
		    }else if(delta===-1 && (Math.abs(cur)/vw100===horizontalNum-1)){  //-1往下一頁 && 已經在水平part的最後一個
		    	scrollRight=false;
		    }
		    $('.horizontal').css('transform','translateX('+X+'px)');
	    }
		var vh100=$(window).height(); //100vh的值多少
		var Y = $(window).scrollTop(); //Y軸將移動距離的儲存變數，初始為現在位置
		if(!scrollRight&&animated){
			if(delta===-1){
				Y-=vh100;
			}else if(delta===1 && Y!=startY){  //1往上一頁 && 不處於垂直part的最下面一個(載入起始位置startY)
				Y+=vh100;
			}else if(delta===1 && (Math.abs(cur)/vw100===horizontalNum-1)){  //1往上一頁 && 已經在水平part的最後一個
		    	scrollRight=true;
		    	console.log('you want left');
		    }
			animated=false;
			$('html,body').animate({scrollTop: Y}, 800, function(){
				animated=true;
				infoMove();
				if(Y===0){
					$('.rocket').addClass('rocket-move');
					$('.contact-item, .contact-title').css("opacity","1");
				}
			});
		}
      }
 //  });
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
function infoMove(){
	var index = $(window).scrollTop()/$(window).height()-1;
	if(window.screen.availHeight>window.screen.availWidth){
		if(index===3){
			$('.info-box').eq(3).addClass('info-less-move');
		}else if(index===1){
			$('.info-box').eq(1).addClass('info-less-move');
		}
		else{
			$('.info-box').eq(index).addClass('info-move');
		}
	}else{
		$('.info-box').eq(index).addClass('info-move');
	}
}
function showSkills(){
	$('.skill-level').each(function(){
		var level = $(this).attr('data-level');
		if(window.screen.availHeight>window.screen.availWidth){
			level = level / 2;
			$(this).css("margin-right",50-level+"%");
		}
		$(this).animate({width:level+"%"},800);
		$(this).css("padding-left","5px");
	});
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
