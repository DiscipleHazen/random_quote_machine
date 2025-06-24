import './App.css';
import React from 'react';

class QuoteBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      quote: '',
      author: ' '
    }
    this.fetchQuote = this.fetchQuote.bind(this);
  }
  
  fetchQuote = () => {
    fetch("http://api.quotable.io/random?size=1")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
        quote: data.content,
        author: data.author
      });
      })
      .catch(error => {
        console.error("Error fetching quotes:", error);
      });
  }
  componentDidMount() {
    this.fetchQuote();
  }

  render() {
    const link = `https://twitter.com/intent/tweet?text=${this.state.quote + " - " + this.state.author}`;
    return (
      <div>
        <div id="quote-box" className="quote-box">
          <p className="quote-title">Quote</p>
          <p id="text" className="quote-text">{this.state.quote}</p>
          <p id="author" className="quote-author">Author: {this.state.author}</p>
          <a id="tweet-quote" href="https://twitter.com/intent/tweet?text=Check out these quotes!&url=https://disciplehazen.github.io/random_quote_machine" className="twitter-share-button" data-size="large" data-show-count="false">Tweet</a>
          <button type="button" id="new-quote" className="new-quote" onClick={this.fetchQuote}>New Quote</button>
        </div>
      </div>
      )
    }
}

function App() {
  return (
    <div className="App">
      
        <h1 id="title">Random Quote Machine</h1>
        <QuoteBox />
        
    </div>
  );
}

export default App;
