# samplingkorg
file HTML samplingkorg
$(document).ready(function() {
	$('form').on('submit', function(event){
		event.preventDefault();
		
		var formData = new FormData($('form')[0]);
		
		var $u = document.getElementById('sesi').value;

		if($u == 0){
			alert("Only member can upload files here");
		}else{
		
			$('.msg').hide();
			$('.progress').show();
			
			$.ajax({
				xhr : function() {
					var xhr = new window.XMLHttpRequest();
					xhr.upload.addEventListener('progress', function(e){
						if(e.lengthComputable){
							console.log('Bytes Loaded : ' + e.loaded);
							console.log('Total Size : ' + e.total);
							console.log('Persen : ' + (e.loaded / e.total));
							
							var percent = Math.round((e.loaded / e.total) * 100);
							
							$('#progressBar').attr('aria-valuenow', percent).css('width', percent + '%').text(percent + '%');
						}
					});
					return xhr;
				},
				
				type : 'POST',
				url : 'upload.php',
				data : formData,
				processData : false,
				contentType : false,
				success : function(response){
					$('form')[0].reset();
					$('.progress').hide();
					if(response == ""){
						alert('File gagal di upload');
					}else{
						$('.msg').show();
						var msg = response;
						$('.msg').html(msg);
					}
				}
			});
		}
	});
});
