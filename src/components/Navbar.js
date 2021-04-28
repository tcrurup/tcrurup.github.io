class Navbar extends Component{

    render(){  
        console.log("rendering navbar")
        fetch('./navbar.html').then( response => console.log(response) ) 
        return `<div class='nav-bar'> 

        </div>`
    }
}