import React, { Component } from 'react';

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = { 
            topText: "",
            bottomText: "",
            rndmImgs: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
         }
         this.handleChange = this.handleChange.bind(this)
         this.genMeme = this.genMeme.bind(this)
    }

    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({allMemeImgs: memes})
            })
    }

    handleChange(event){
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    genMeme(event){
        event.preventDefault()
        const imgIndex = Math.floor(Math.random()*this.state.allMemeImgs.length)
        const memeImg = this.state.allMemeImgs[imgIndex].url
        this.setState({
            rndmImgs: memeImg
        })
    }
    render() { 
        return ( 
            <div>
                <form className="meme-form" onSubmit={this.genMeme}>
                    <input 
                        type="text" 
                        name="topText"
                        placeholder="Top Text" 
                        value={this.state.topText}
                        onChange={this.handleChange}
                    />
                    <input 
                        type="text" 
                        name="bottomText"
                        placeholder="Bottom Text" 
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    />
                    <button>Generate</button>
                </form>
                <div className="meme">
                    <img 
                        src={this.state.rndmImgs}
                        alt=""
                    />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
         )
    }
}
 
export default MemeGenerator