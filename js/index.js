let srchbool = true;
var searchterm;
var alrt = "please enter a valid STRING";
//var url="https://en.wikipedia.org/w/api.php?action=opensearch&search="+searchterm+"&callback=?";

// to open search bar
$(".srchbtn").click(function() {
  if (srchbool === true) {
    $(".f1").css("width", "70%");
    $(".f1").focus();
    $(".cnclbtn").show();
    $(".gobtn").show();
    $(".srchbtn").hide();
    srchbool = false;
  }
});
//***********************************************

// to clear input field on [single click] cancel icon
$(".cnclbtn").click(function() {
  if (srchbool === false) {
    $(".an").removeClass("animated zoomOut");
    $(".an").addClass("animated fadeInDown");
    $(".an").show("slow");
    // $(".an").addClass('animated fadeInDown');
    $(".cntn").html("");
    $(".f1").val("");
    $(".f1").focus();
  }
});
//***********************************

// to close search bar on double click cancel icon

$(".cnclbtn").dblclick(function() {
  $(".an").removeClass("animated zoomOut");
  $(".an").addClass("animated fadeInDown");
  $(".an").show("slow");
  //$(".an").addClass('animated fadeInDown');
  if (srchbool === false) {
    $(".an").show();
    $(".cntn").html("");
    $(".f1").css("width", "0%");
    $(".f1").val("");
    $(".cnclbtn").hide();
    $(".gobtn").hide();
    $(".srchbtn").show();
    srchbool = true;
  }
});
//*******************************************************
// search wiki for the specified entry
$(".gobtn").click(function() {
  if ($(".f1").val() === "") {
    console.log("enter a valid string");
    $(".cntn").html("");
    $(".cntn").append(
      '<div class="alert alert-danger mt-3" role="alert">' + alrt + "</div>"
    );
    console.log("enter a valid string");
  } else {
    searchterm = $(".f1").val();

    $.ajax({
      type: "GET",
      url:
        "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
        searchterm +
        "&limit=30&callback=?",
      dataType: "json",
      success: function(data) {
        //     $(".an").addClass('animated zoomOut');
        //   $(".an").hide(1000);
        //   $(".cntn").html("");

        //when no match is found...display an alert msg********
        if (data[1].length === 0) {
          $(".cntn").html("");
          $(".cntn").append(
            '<div class="alert alert-danger mt-3" role="alert">' +
              alrt +
              "</div>"
          );
          console.log("enter a valid string");
        } else {
          //when match is found display resut******************************************************************
          $(".an").removeClass("animated fadeInDown");
          $(".an").addClass("animated zoomOut");
          $(".an").hide(1500);
          $(".cntn").html("");
          for (var i = 0; i < data[1].length; i++) {
            if(data[2][i]==""){
              $(".cntn").append(
              '<div class="card mb-3"><div class="card-title card-header"><h4><a target="_blank" href="'+
                data[3][i]+'">'+data[1][i]+'</a></h4></div></div>');
              i++;
            }
            $(".cntn").append(
              '<div class="card mb-3"><div class="card-title card-header"><h4><a target="_blank" href="' +
                data[3][i] +
                '">' +
                data[1][i] +
                '</a></h4></div><div class="card-body"><p class="card-text"><a target="_blank" href="' +
                data[3][i] +
                '">' +
                data[2][i] +
                "</a></p></div></div>"
            );
          }
        }
      },
      error: function(error) {
        console.log("error");
      }
    });
  }
});

// on pressing enterkey **********************************************
$("#search").keypress(function(e) {
  if (e.which == 13) {
    console.log("enterkey pressed");
    $(".gobtn").click();
  }
});