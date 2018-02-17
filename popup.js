console.log("I am running");
document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('button').addEventListener('click', main);      
});
function main() {
    
    document.getElementById("test").innerHTML = "HI";
}