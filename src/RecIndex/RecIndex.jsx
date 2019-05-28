import React, { Component } from 'react';
import NewModal from '../NewModal/NewModal';
import IdModal from '../IdModal/IdModal'
// import SearchForm from '../SearchForm/SearchForm';
import '../App.css';


// Rec INDEX COMPONENT
class RecIndex extends Component {
    constructor(props){
        super(props);
        this.state = {
            allRec: [],
            filteredRec: [],
            news: []
        }
    }

    componentDidMount = () => {
        this.getAllRec();
        this.fetchNews();
    }

    getAllRec = async () => {
        try {
            const response = await fetch(`http://localhost:8080/recs`, {
                credentials: "include"
            });

            const parsedResponse = await response.json();
            console.log(parsedResponse);
            this.setState({
                allRec: parsedResponse,
                filteredRec: parsedResponse
            });
            
        } catch(err) {
            console.log(err)
        }
    };

    // The de-facto unbiased shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.
    // See https://github.com/coolaj86/knuth-shuffle
    shuffle = (array) => {
        let currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      };
  
      // Need to refine gay search and create a variable that subs in today's date into the request URL
      // Also would like to randomize order of state arrays eventually
      fetchNews = async () => {
        const url = 'https://newsapi.org/v2/everything?' +
            'q=gay OR queer OR lesbian OR transgender&' +
            'from=2019-05-28&' +
            'sortBy=relevancy&' +
            'pageSize=10&' +
            'apiKey=64c3c945a2f24a298dfbfb57e9fd47a9';
        const req = new Request(url);
        const todaysNews = await fetch(req);
        const todaysNewsParsed = await todaysNews.json();
        this.setState({
            allRec: [...this.state.allRec, ...todaysNewsParsed.articles],
            filteredRec: this.shuffle([...this.state.allRec, ...todaysNewsParsed.articles]),
            news: [...todaysNewsParsed.articles]
        });
      }

    handleNewsButton = (e) => {
        this.setState({
            filteredRec: this.state.news
        });
    }

      // Category buttons
    handleButton = (e) => {
        const filteredRec = this.state.allRec.filter((rec) => {
            return rec.type === e.currentTarget.name
        })
        this.setState({
            filteredRec: filteredRec
        })

        // loop through this.state.allRec 
        // if Rec.type === e.currentTarget.name
        // return Rec
    }

    // CREATE ROUTE
    // Why does the browser need to be refreshed in order to display newly created Rec?
    handleSubmit = async (formData) => {
        // Nice to have: prompt user to fill out all inputs if they haven't
        console.log(formData, 'formData');
        const newRec = await fetch(`http://localhost:8080/recs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        console.log(newRec, 'newRec');
        const parsedResponse = await newRec.json();
        if (newRec.status === 200){
            this.setState({
                Rec: [...this.state.allRec, parsedResponse]
            })
        } else {
            console.log('Status of request is not 200!')
        }
    }



    // SEARCH FUNCTIONALITY (search for keywords, creators, etc.) IS A NICE-TO-HAVE

    // handleSearch = async (search) => {
    //     try {
    //         const response = await fetch(`http://localhost:3000/Rec`);

    //         if (response.status !== 200){
    //             throw Error(response.statusText);
    //         }
    //         const RecJSON = await response.json();
    //         const filteredRec = await RecJSON.data.filter((Rec) => {
    //             return Rec.type === search.search;
    //         })
    //         this.setState({
    //             Rec: filteredRec
    //         });
            
    //     } catch(err) {
    //         console.log(err)
    //     }
    // };


    render(){
        const RecList = this.state.filteredRec.map((item) => {
                return (<div className="rec-item" key={item._id}>
                        {
                            item.creator ?

                            <div>
                                <div className = "gradient">
                                    <img className = "rec-img" src={item.imageUrl} alt={item.description}></img>
                                </div>
                                
                                <div className="rec-text">
                                    <div className="rec-title">
                                        {item.title} 
                                    </div>
                                    
                                    <div className="rec-description">
                                        {item.creator}
                                    </div>

                                    <IdModal item = {item}/>

                                </div>
                            </div>

                            :
                               
                            <div> 
                                <div className = "img-container">
                                    <div className = "gradient">
                                        <img className = "rec-img" src={item.urlToImage} alt={item.description}></img>
                                    </div>
                                </div>

                                <div className="rec-text">
                                    <div className="rec-title">
                                        {item.title} 
                                    </div>
                               
                                    <div className = "rec-description">
                                        {item.author}
                                    </div>

                                    <IdModal item = {item}/>

                                </div>

                            </div>

                        }
                </div>
                )
            }
            );
        
        return (
            <div className="App">

            <p>Curated LGTBQIA+ Rec recommendations; <br></br>
            for queers by queers.</p> 

            {/* <NewRecForm handleSubmit = {this.handleSubmit}/> */}

            <div className="button-container">
                <button className="type" name="News" onClick = {this.handleNewsButton}>News</button>
                <button className="type" name="book" onClick = {this.handleButton}>Books</button>
                <button className="type" name="show" onClick = {this.handleButton}>Shows</button>
                <button className="type" name="comic" onClick = {this.handleButton}>Comics</button>
                <button className="type" name="movie" onClick = {this.handleButton}>Movies</button>
                <button className="type" name="album" onClick = {this.handleButton}>Albums</button>
                <button className="type" name="other" onClick = {this.handleButton}>Other</button>
                <button className="type" name="all" onClick = {this.componentDidMount}>All</button>
            </div>
            {/* <SearchForm handleSearch = {this.handleSearch}/> */}

                    <div className = "rec-container">
                        
                            {RecList}
                        
                    </div>
  
                <div className="about-container">
                    <div className="about-column">

                    <hr className="line"></hr>
                        <div className="about-header">ABOUT QUEER REX</div>

                        
                        <p className="about-text"> Despite there being more LGTBQIA+ content out than ever before, it can 
                            still be challenging to find "the good stuff." 
                            Queer Rex is a curated collection of the best queer media available today,
                            recommended by people whose lives have been impacted by how they see 
                            themselves represented in shows, books, and music they love. </p>


                        <p className="about-text"> Of course, Queer Rex can only be excellent if many different queer voices recommend 
                            a big variety of queer stories and perspectives. If you're queer and love 
                            seeing yourself and your loved ones represented in amazing content, please take the
                            time to contribute to the project! <br></br>

                            THANK YOU!!! 💖💖💖</p>


                        <NewModal handleSubmit = {this.handleSubmit}/>
                        <hr className="line"></hr>

                    </div>
                </div>
                
            
            
            </div>
          );
    }
}

export default RecIndex;