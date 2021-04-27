class Navbar{

    constructor(){
        console.log("Navbar constructed");
        $("Navbar").html(this.render());
    }

    render(){

        return `<div> 
            This is the navbar
        </div>`
    }

}