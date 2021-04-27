
$(function(){
    $('#allFotos').on('click', function (e) {
        e.preventDefault();
        loadFotos("js/fahrraerder.json");
        loadFotos("js/autos.json");
        loadFotos("js/flugzeuge.json");
        console.log('Loading,,,,,,,,');
    });
    
  
    
    //////////////////////////// Click auf einem Bild /////////////////

    let butns= `<img class="nextBtn" src="img/next.png" alt="" >`;
    butns += `<img class="prevBtn" src="img/prev.png" alt="" >`;
    $('#container').append(butns);
    
    
    $('#images').on('click', 'img',function () {
        let imgsNum = $('#images').find('img').length;
        for (var i = 0; i < imgsNum; i++) {
             if ($('#images').find('img').hasClass('active')) {
                $('#images').find('img').removeClass('active');
            }

        }
         $(this).addClass('active');      
         var image = $(this).clone();
        
         showImg(image); 
    });



    ///////////////////// Next Button ////////////////////

    $('.nextBtn').on('click', function () {
        
        let imgsNum = $('#images').find('img').length;
          $('#container').find('img.prevBtn').show();  
        $('#bigImg').empty();        
        let img= $('#images img.active').removeClass("active").next().addClass("active");
        let img2 = img.clone();
        
        let prvAll = $('#images img.active').prevAll().length;
        
        if(prvAll=== (imgsNum-1)){
            $('#container').find('img.nextBtn').hide();
        }else{
          $('#container').find('img.nextBtn').show();  
        }
        showImg(img2);
           
    });
    
  
//    //////////////////// Previous Button ////////////////////

    $('#container').on('click','.prevBtn', function () {
        let imgsNum = $('#images').find('img').length;
        let nxtAll = $('#images img.active').nextAll().length;
        $('#container').find('img.nextBtn').show();  
        
        if(nxtAll=== (imgsNum-2)){
            $('#container').find('img.prevBtn').hide();
        }else{
          $('#container').find('img.prevBtn').show();  
        }
        
        $('#bigImg').empty();
        let img= $('#images img.active').removeClass("active").prev().addClass("active");
        let img2 = img.clone();
        showImg(img2);
    });

    
});// end Ready

/**
 * zeige das Bild im großen Bild, wenn es geclicket hat
 * @param {img} img
 * @returns {undefined}
 */
function showImg(img){
    let alt = img.attr('alt');
    img.attr('class','imge');
    currAlt = `<div><h2 class="hh2">${alt}</h2></div>`;       
    $('#bigImg').empty().append(img);  
    $('#bigImg').append(currAlt);
}


/**
 * to load images to Div 
 * @param {string} jsonFile the path to json file
 * @returns {json}
 */
function loadFotos(jsonFile){
    $.ajaxSetup({cache: false});
    $.getJSON(jsonFile)          
        .done(function (Bilder) {
            $.each(Bilder, function (key) {
                let bild = Bilder[key].surc;
                let txt = Bilder[key].alt;
                $(`<img class="imge" src=${bild} alt =${txt}>`)
                        .appendTo('#images').fadeIn(1000);                   
            });
        })           
        .fail(function () {
            $('#content').text('Entschuldigung ,,,, etwas Passiert');
        });
}
//



