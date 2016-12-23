$.fn.extend(
    {
        'h5Upload':function(){
            var imgList = [] //保存图片的数据

            //点击打开文件夹按钮 开始选择文件
            this.find('#fileOpenFolder').click(function(){
                $('#fileUpload').click()
            })
            var that = this
            //向服务器端上传文件
            this.find('#fileUploadAll').click(function(){
                if(imgList.length == 0){
                    console.log('请选择要上传的图片文件')
                    return false
                }
                //把多张图片用@分割上传服务器端
                var data = ''
                that.find('img').each(function(){
                    data += $(this).attr("src")+"@"
                })

                $.ajax({
                    method:'post',
                    data:{imgData:data},
                    url:'/common/api/file_upload',
                    success:function(res){
                        console.dir(res)
                    },
                    error:function(err){
                        console.dir(err)
                    }
                })
            })


            // 添加删除图片效果,点击删除按钮后删除指定位置的图片
            $('#h5ImgUploadList').on('click','.del',function(){
                var currentImgIndex = $('#h5ImgUploadList .del').index(this)
                imgList.splice(currentImgIndex,1)
                initImgHtml()
            })

            $('#fileUpload').change(function(){
                imgList.push(this.files[0])
                initImgHtml()
            })

            //图片选择之后渲染页面内容
            function initImgHtml(){
                $('#h5ImgUploadList').html('')
                imgList.forEach(function(imgData){
                    var reader = new FileReader()
                    reader.readAsDataURL(imgData)
                    reader.onload = function(){
                        var $img = $('<li><img><i class="del fa fa-remove"></i></li>')
                        $img.find('img').attr('src',this.result)
                        $('#h5ImgUploadList').append($img)
                        $img.load(function(){
                            console.dir(this)
                        })
                    }
                })
            }
        }
    }
)
$('#upload').h5Upload()
