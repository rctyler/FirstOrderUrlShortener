// DOM Ready ============================================
$(document).ready(function() {
    $('nav a').parents('li,ul').removeClass('active')
    
    var localPath = this.location.pathname;
    if ( localPath === '/')
       localPath = "/index.html";
       
    $('nav a[href="' + localPath + '"]').parent().addClass('active');
    
    if (sessionStorage.longUrl) {
        $("#inputLongUrl").val(sessionStorage.longUrl);    
    }
    
    $('#inputLongUrl').on('input', function() { 
        sessionStorage.longUrl = $(this).val();
    });
});