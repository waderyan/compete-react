import React from 'react';
import $ from 'jquery';
import Product from './product';
import lodash from 'lodash';



class Product {

    constructor(name, logo, animation, wins, factors, styles) {
        this.name = name;
        this.logo = logo;
        this.animation = animation;
        this.factors = factors;
        this.wins = wins;
        this.styles = styles || {};
    }

}

class App extends React.Component {
    
    constructor() {
        super();
        this.state = {
            products: [
                new Product('vscode', 'media/byu.png', 'media/wrestling_byu_wins.gif', 0, {
                        bicep: 8,
                        wrist: 5,
                        savvy: 6
                    }, {
                        marginTop: '15%'
                    }),
                new Product('webstorm', 'media/utah.png', 'media/wrestling_utah_wins.gif', 0, {
                        bicep: 8,
                        wrist: 5,
                        savvy: 6
                    })
            ]
        }
        this.styles = {
            logos: {
                marginTop: "2%",
                marginBottom: "2%"
            },
            winner: {
                fontSize: "32px",
                textAlign: 'center',
                marginTop: "5%"
            },
            wrestleBtn: {
                textAlign: 'center'
            },
            wrestling: {
                marginTop: '5%'
            }
        }
    }

    /**
     * Updates the win record for the winning product. 
     * 
     * @param {string} winningproduct -pproductl that won. 
     */
    updateWinRecord(winner) {
        winner.wins++;

        this.setState({
            products: this.state.products,
            wrestling: false,
            winner: winner
        });
    }

    /**
     * Starts the wrestling animation. 
     * 
     * @param {string} winningproduct - product that won. 
     */
    startWrestling(winningProduct) {
        let winner;

        lodash.forEach(this.state.products, (product) => {
            if (winningproduct === product.name) {
                winner = product;
            }
        });

        this.setState({
            products: this.state.products,
            wrestling: true,
            winner: winner
        });

        setTimeout(() => {
            this.updateWinRecord(winner);
        }, 3000);
    }

    handleClick() {
        const URL = 'http://localhost:3001/wrestle';

        $.ajax({
            url: URL,
            method: 'POST',
            dataType: 'json',
            data: {
                xProduct: this.state.products[0],
                yProduct: this.state.products[1]
            },
            success: (data) => {
                this.startWrestling(data.winner);
            }
        });
    }

    render() {
        let s = this.state;

        if (s.winner) {
            if (s.wrestling) {
                var wrestling = <img width="100%" src={this.state.winner.animation + '?' + new Date().getTime()} />;
            }
            if (!s.wrestling) {
                var winner = <p style={this.styles.winner}>{capitalize(this.state.winner.name)} Wins!</p>;
            } 
        }

        return <div className="container">
            <div style={this.styles.logos} className="row">
                <div className="col-md-4 col-md-offset-1">
                    <Product product={this.state.products[1]} />
                </div>
                <div className="col-md-4 col-md-offset-2">
                    <Product product={this.state.products[0]} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-2 col-md-offset-5">
                    <div style={this.styles.wrestleBtn}>
                        <button onClick={this.handleClick.bind(this)} className="btn btn-primary btn-lg">Arm Wrestle</button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div style={this.styles.wrestling} className="col-md-6 col-md-offset-3">
                    {wrestling}
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    {winner}
                </div>
            </div>
        </div>;
    }
}


function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export default App;

