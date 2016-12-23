$.fn.extend(
    {
        'h5Upload':function(msg){
            $('#fileUpload').change(function(){
                console.dir(this)
                // 通过FileReader读取文件
                var reader = new FileReader()
                reader.readAsDataURL(this.files[0])
                reader.onload = function(){
                    console.log(this)
                    $('#img').attr("src",this.result)
                    $.ajax({
                        method:'post',
                        data:{imgData:this.result},
                        url:'/common/api/file_upload',
                        success:function(res){
                            console.dir(res)
                        },
                        error:function(err){
                            console.dir(err)
                        }
                    })
                }
            })
            this.click(function(){
                $('#fileUpload').click()
            })
            //function doAlert(msg){
            //    alert(msg)
            //}
            //图片压缩待实现
            function compresssImg(){

            }
        }
    }
)
$('#upload').h5Upload("我是upload")
