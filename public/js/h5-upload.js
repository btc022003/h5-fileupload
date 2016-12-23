$.fn.extend(
    {'h5Upload':function(msg){
        this.click(function(){
            doAlert(msg)
        })
        function doAlert(msg){
            alert(msg)
        }
    }
    })
$('#upload').h5Upload("我是upload")
