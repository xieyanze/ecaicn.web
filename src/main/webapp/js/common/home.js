$(document).ready(function (page){
	
	$("A", $("div.centerl_foot,div.page_center2_left")).click(function() {
		var flowCode = $(this).attr("flowCode");
		// 根据流程Code加载流程信息版本，节点信息
		if(dum.common.isNull(flowCode)) {
			return;
		}
		dum.forword("/home/server.do?flowCode="+flowCode);
		
	});
});