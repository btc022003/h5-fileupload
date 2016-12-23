$.fn.extend(
    {
        'h5Upload':function(msg){
            $('#fileUpload').change(function(){
                // 通过FileReader读取文件
                var reader = new FileReader()
                reader.readAsDataURL(this.files[0])
                reader.onload = function(){
                    //$('#img').attr("src",this.result)
                    var $img = $('<li><img><i class="del fa fa-remove"></i></li>')
                    $img.find('img').attr('src',this.result)
                    $('#h5ImgUploadList').append($img)
                    $img.load(function(){
                        console.dir(this)
                    })
                    //$.ajax({
                    //    method:'post',
                    //    data:{imgData:this.result},
                    //    url:'/common/api/file_upload',
                    //    success:function(res){
                    //        console.dir(res)
                    //    },
                    //    error:function(err){
                    //        console.dir(err)
                    //    }
                    //})
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
