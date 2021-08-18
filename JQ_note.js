//post done fail always
const userinfo = {
    custName: this.username,
    custPhone: this.userphone,
    custId: this.userfacebookID,
    id: this.getUrlParameter("id")
};
			
$.post('<p:formGuard url="/rest/ts20From/addTs20Register"/>', userinfo)
	.done(resp => {    
	})
	.fail(err => {    
	})
	.always(() => {
		alert( "finished" );
	});

//get url para 
    getUrlParameter(val){   	      	
    //URL (WEB)https://doc.tstartel.com/TS20/preorder?id=WEB/APP
		let searchParams = new URLSearchParams(window.location.search)
			return searchParams.get(val);  
   	},

//get url pageID
const ctapgId = '${CURRENT_PAGE}';
//send google Analytics
function sendGoogleAna(btnLabel) {
	ga('send', 'event', ctapgId, 'page_click', btnLabel);
}

//連結是否開新視窗  new:是  self:否
function showNewWindow(url_target,url){
	if(url_target == 'self'){
		location.href = url;
	}else{
		window.open(url);
	}
}

//IP卡控流程
let cta_visit =null
let userIp = '${pageContext.request.remoteAddr}';  //取得用戶IP  --> pageContext.request.remoteAddr
let pathname = window.document.location.pathname;  //取得用戶訪問頁面路徑
let formatTime = new Date().toISOString().substring(0, 10);
//IP settiong 1=>set on
const expiresSet= parseInt(${attr.t6});
if (expiresSet==1){
	// 設置 cta_visit，讓用戶第二次訪問時有值
	cta_visit  = cws_cookieUtil_getCookieValue("cta_visit");  // 第一次訪問時，cta_visit值為null

	// 創建cookie $.cookie( cookie名稱, cookie值 , { expires: 天數 , domain: 有效頁面域名 , path: 有效頁面路徑 });
	//expires: 天數 inHalfDay= 0.5 in30Min=1/48
	$.cookie('cta_visit', userIp+'_'+formatTime , { expires: 1, domain: '.tstartel.com' , path: pathname});
}else {
	$.removeCookie('cta_visit',{ domain: '.tstartel.com' , path: pathname });
	cta_visit  = null;
}
//IP顯示控制，第一次訪問顯示
if( cta_visit == null || cta_visit === ''){
	window.setTimeout(function() {
		//show popup
		if ($(settings.objModalPopupBtn).attr(settings.objModalDataAttr)) {
			let strDataPopupName = $(settings.objModalPopupBtn).attr(settings.objModalDataAttr);
			// Fade In Modal Pop Up
			$(".overlay, #" + strDataPopupName).fadeIn();
		}
	}, parseInt(${attr.t1}) * 1000);//控制出現秒數毫秒為單位，1000*10表示10秒
}
