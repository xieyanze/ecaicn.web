$(function(){
	Pagesize();
})

function Pagesize(){
	if($(window).width() > 1280){
		$("body").attr("class","width1200");
	}else{
		$("body").attr("class","width960");
	}
	$("#loading").css("height",$(window).height());
}
$(window).resize(function(){
	Pagesize();
})

window.onload = function() {
	Pagesize();
}


$.fn.focus = function(options) {
	var defaults = {
		type:         'fade',
		btn:          '.focus_btn',
		leftBtn:      '.left_btn',
		rightBtn:     '.right_btn',
		btnActive:    'click',
		picBox:       '.focus_pic',
		num:          '1',
		conWidth:     '100%',
		conHeidth:    '100%',
		time:         '4500',
		speed:        '500',
		play:         '1'
	};
	var obj     =     $.extend(defaults, options);
	var self    =     $(this);
	var picUl   =     self.find(obj.picBox+">ul");
	var picLi   =     picUl.find(">li");
	var btnLi   =     self.find(obj.btn+">ul>li");
	var leftBtn =     self.find(obj.leftBtn);
	var rightBtn=     self.find(obj.rightBtn);
	var len     =     Math.ceil(picLi.length/obj.num);
	var index   =     0;
	var timer;
	var moveX;
	self.bind('movestart', function(e) {
			if ((e.distX > e.distY && e.distX < -e.distY) ||
				(e.distX < e.distY && e.distX > -e.distY)) {
				e.preventDefault();
			}
		}).bind('move', function(e) {
		moveX = e.distX;
	})
	.bind('moveend', function() {
	if(moveX > 5){
		index--;
		if(index==-1){index=len-1;}
		show(obj.type,obj.btn,index,obj.picBox,obj.conWidth,obj.conHeidth);
	}else if(moveX < 5){
		index++;
		if(index==len){index=0;}
		show(obj.type,obj.btn,index,obj.picBox,obj.conWidth,obj.conHeidth);
	}
	});

	var bigWidth,moveWidth,bigHeight,moveHeidth
	if(obj.conWidth != "100%"){
		bigWidth = obj.conWidth*len*obj.num;
		moveWidth = obj.conWidth*obj.num;
	}else{
		picUl.css("width",100*len+"%")
		picLi.css("width",100/len+"%")
	}
	if(obj.conHeight != "100%"){
		bigHeight = obj.conHeidth*len*obj.num;
		moveHeidth = obj.conHeidth*obj.num;
	}


	if(obj.type == "up"){
		if(obj.conHeight != "100%"){
			picUl.css("height",bigHeight);
		}
	}else if(obj.type == "left"){
		if(obj.conWidth != "100%"){
			picUl.css("width",bigWidth);
		}
	}

	btnLi.bind(obj.btnActive,function(){
		if(index != btnLi.index(this)){
			index = btnLi.index(this);
			show(obj.type,obj.btn,index,obj.picBox,obj.conWidth,obj.conHeidth);
		}
	})

	leftBtn.click(function(){
		index--;
		if(index==-1){index=len-1;}
		show(obj.type,obj.btn,index,obj.picBox,obj.conWidth,obj.conHeidth);
	})

	rightBtn.click(function(){
		index++;
		if(index==len){index=0;}
		show(obj.type,obj.btn,index,obj.picBox,obj.conWidth,obj.conHeidth);
	})

if(obj.play==1){
	self.hover(function(){
		clearInterval(timer);
	},function(){
		clearInterval(timer);
		timer = setInterval(function(){
		index++;
		if(index==len){index=0;}
		show(obj.type,obj.btn,index,obj.picBox,obj.conWidth,obj.conHeidth);
		 } , obj.time);
	}).trigger("mouseleave");
}

	function show(type,btn,index,picBox,conWidth,conHeidth){
		if(conWidth == "100%"){
			$(picBox+" ul").stop(false,true).animate({"marginLeft":-index*100 +"%"},500);
			$(btn+" li").removeClass("active").eq(index).addClass("active");
		}else{
		if(type == "up"){
			$(picBox+" ul").stop(false,true).animate({"marginTop":-index*conHeidth},300);
			$(btn+" li").removeClass("active").eq(index).addClass("active");
		}else if(type == "left"){
			$(picBox+" ul").stop(false,true).animate({"marginLeft":-index*conWidth},500);
			$(btn+" li").removeClass("active").eq(index).addClass("active");
		}else if(type == "fade"){
			$(picBox+" li").stop(false,true).fadeOut();
			$(picBox+" li").eq(index).stop(false,true).fadeIn();
			$(btn+" li").removeClass("active").eq(index).addClass("active");
		}
		}
	}
}
