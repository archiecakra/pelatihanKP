// add tabel
$(document).ready(function() {

  $("#tambah").on("click",function(){
    var barisbaru = $("<tr>");
    var kolom = "";
    var counter = $("#tbpeserta tbody>tr").length + 1;
    kolom += '<td><select class="form-control" id="pel' + counter + '"><option value="oca">Java SE Fundamental (OCA)</option><option value="zend">Zend PHP</option><option value="mikrotik">Mikrotik Basic Essential</option></select> </td>';
    kolom += '<td>KODE_PEL</td>';
    kolom += '<td><input type="text" class="form-control" id="nama' + counter + '" placeholder="Nama Peserta"></td>';
    kolom += '<td><select class="form-control" id="pel' + counter + '"><option value="sesi1">Sesi 1 - 21 Aug 2018</option><option value="sesi2">Sesi 2 - 21 Aug 2018</option><option value="sesi3">Sesi 3 - 21 Aug 2018</option></select></td>';
    kolom += '<td><input type="text" class="form-control" id="cat' + counter + '" placeholder="Masukkan Catatan"></td>';
    kolom += '<td><button type="button" class="hapus btn btn-danger btn-sm"><i class="fa fa-minus"></i></button></td>';

    barisbaru.append(kolom);
    $("#tbpeserta tbody").append(barisbaru);

  });

  $("table.order-list").on("click", ".hapus", function(event){
    $(this).closest("tr").remove();
  });

});


// checkbox
$(function () {
  //submit
  $('#btnFrmSubmit').click(function () {
      /* Checking if more than 0 rows exists */
      if ($("#tbpeserta tbody>tr").length > 0) {
          var info = {};
          info.nama_instansi = $("[id*=nama_instansi]").val();
          info.email_instansi = $("[id*=email_instansi]").val();
          info.alamat_instansi = $("[id*=alamat_instansi]").val();
          info.nomer_instansi = $("[id*=nomer_instansi]").val();
          info.nama_marketing = $("[id*=nama_marketing]").val();
          /* Creating Array object as WireDimDetails to add in user object*/
          var WireDimDetails = new Array();
          $("#tbpeserta tbody tr").each(function () {
              var row = $(this);
              /* Declare and sets the WireDimDetail object with the property which will add in WireDimDetails array object*/
              var WireDimDetail = {};
              var nama_peserta = row.find("[id^=nama]").val();
              /* Checking if control exist or not else assign empty value in sizeMax*/
              var jenis = row.find("[id^=pel]") != "undefined" ? row.find("[id^=pel]").val() : "";
              //var kode = row.find("[id^=kode]").val();
              var catatan = row.find("[id^=cat]").val();
              /*Sets the Values of controls */
              WireDimDetail.nama_peserta = nama_peserta;
              WireDimDetail.jenis = jenis;
              //WireDimDetail.kode = kode;
              WireDimDetail.catatan = catatan;
              /*Add WireDimDetail object in WireDimDetails Array object*/
              WireDimDetails.push(WireDimDetail);
          })
          /*Add WireDimDetails array of object to user object*/
          //user.WireDimDetails = WireDimDetails;
          info.detail = WireDimDetails;
          console.log(info);

          $.ajax({
              type: 'POST',
              url: '../../fungsi/tambah_comp.php',
              data: JSON.stringify({data:info}),
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function(result) {
                 if(result == null){
                  alert("Data Gagal dihapus, silahkan Coba Kembali");
                }else{
                  document.getElementById('testing').value = result;
                }
              }
            });

      }
      return false;
  });

    $('.button-checkbox').each(function () {

        // Settings
        var $widget = $(this),
            $button = $widget.find('button'),
            $checkbox = $widget.find('input:checkbox'),
            color = $button.data('color'),
            settings = {
                on: {
                    icon: 'fa fa-check-square'
                },
                off: {
                    icon: 'far fa-square'
                }
            };

        // Event Handlers
        $button.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });

        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $button.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $button.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$button.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $button
                    .removeClass('btn-default')
                    .addClass('btn-' + color + ' active');
            }
            else {
                $button
                    .removeClass('btn-' + color + ' active')
                    .addClass('btn-default');
            }
        }

        // Initialization
        function init() {

            updateDisplay();

            // Inject the icon if applicable
            if ($button.find('.state-icon').length == 0) {
                $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i>');
            }
        }
        init();
    });
});

// jenis form
function hideIndividu()
{
  document.getElementById("individu").style.display="none";
  document.getElementById("instansi").style.display="unset";
}
function hideInstansi()
{
  document.getElementById("instansi").style.display="none";
  document.getElementById("individu").style.display="unset";
}