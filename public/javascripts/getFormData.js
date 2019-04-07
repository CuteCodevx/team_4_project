$(document).ready(function() {


    $('#methodOption1').on('click',function(event){
        // alert('jQuery-----disable');
        // $('#additional2Option0').attr('disabled','true');
        // $('#additional2Option1').attr('disabled','true');
        // $('#additional2Option2').attr('disabled','disabled');
        // $('#additional2Option3').attr('disabled','disabled');
        // $('#additional2Option4').attr('checked','checked');
        $('#method1Div').show();
        $('#method2Div').hide();


        // alert('disable finished');
    });

    $('#methodOption2').on('click',function(event){
        // alert('jQuery-----disable');
        // $('#additional2Option0').attr('disabled','true');
        // $('#additional2Option1').attr('disabled','true');
        // $('#additional2Option2').attr('disabled','disabled');
        // $('#additional2Option3').attr('disabled','disabled');
        // $('#additional2Option4').attr('checked','checked');
        $('#method2Div').show();
        $('#method1Div').hide();
        // $('#method1Table').hide();

        // alert('disable finished');
    });




    // $('form').on('submit', function(event) {
    //
    //     event.preventDefault();
    //
    //     var d={};
    //
    //     // [{name: "a1", value: "xx"},{name: "a2", value: "xx"}],
    //     var wholeForm = $('form').serializeArray();
    //
    //     $.each(wholeForm, function() {
    //         d[this.name] = this.value;
    //     });
    //
    //     alert(JSON.stringify(d));
    //
    //     $.ajax({
    //         type: 'post',
    //         url: '/c1',
    //         data: d,
    //         // success: function(data) {
    //         //     //do something with the data via front-end framework
    //         //     location.reload();
    //         // }
    //     });
    //
    //     return false;
    //
    // });
});