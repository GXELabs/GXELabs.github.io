var sidemenu = document.getElementById("sidemenu");
var headertext = document.getElementById("headertext");

function openmenu() {
  sidemenu.style.right = "-37px";
  headertext.style.left = "-30px";
}
function closemenu() {
  sidemenu.style.right = "-237px";
  headertext.style.left = "0px";
}