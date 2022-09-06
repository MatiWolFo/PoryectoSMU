
const showMenu = false;
//SHOW HIDE MENU FUNCTION
function showHideMenu(){
    if(showMenu){
        document.getElementById("nav").classList ="";
        showMenu = false;
    }else{
        document.getElementById("nav").classList ="responsive";
        showMenu = true;
    }};
//HIDE NAVBAR ONCE SELECTED
function select(){
    document.getElementById("nav").classList = "";
    showMenu = false;
}