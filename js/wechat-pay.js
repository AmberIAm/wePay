var x = 15;
function payMsg() {
    if(x > 0) {
        $(".pay-seconds").html(x + " 秒后" + "<a class='pay-auto' href='http://shop.96877.net/product.do'>自动跳转</a>" + "<span class='pay-elli'>...</span>");
        x--;
    } else {
        window.location.href = "http://shop.96877.net/product.do";
    }
}

var orid = $("#orid").text();
$(function(){
    setInterval(function() {
        $.ajax({
            type: "post",
            url: "js/test.json",
            data: {
                orid: orid,
            },
            dataType: "json",
            success: function(data) {
                if(data.trade_state == "SUCCESS") {
                    $(".notice").css('display', 'block');
                    $(".pay-status").text(data.trade_state_desc);
                    payMsg();
                } else if(data.trade_state == "NOTPAY") {
                    $(".notice").css('display', 'block');
                    $(".pay-status").text(data.trade_state_desc);
                } else if(data.trade_state == "CLOSED") {
                    $(".notice").css('display', 'block');
                    $(".pay-status").text(data.trade_state_desc + "！ ");
                    payMsg();
                } else if(data.trade_state == "USERPAYING") {
                    $(".notice").css('display', 'block');
                    $(".pay-status").text(data.trade_state_desc + "...");
                } else if(data.trade_state == "PAYERROR") {
                    $(".notice").css('display', 'block');
                    $(".pay-status").text(data.trade_state_desc + "！ ");
                    payMsg();
                }
            },
            error: function() {
                alert("出现异常!");
            }
        });
    },1000)
})
    



