import React from 'react';
import $ from 'jquery';
import Product from './product';
import _ from 'lodash';




class ProductData {

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
                new ProductData('VS Family', 'media/vs_icons.png', 'media/wrestling_vs_wins.gif', 0, [8, 5, 6], {
                        marginTop: '15%'
                    }),
                new ProductData('Webstorm', 'media/ws_icon.png', 'media/wrestling_ws_wins.gif', 0, [8, 5, 6])
            ]
        };
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
     * @param {string} winner - product that won.
     */
    updateWinRecord(winner) {
        winner.wins++;

        this.setState({
            products: this.state.products,
            wrestling: false,
            winner: winner
        });
    }


    handleClick() {
        const URL = 'http://localhost:3000/wrestle';

        $.ajax({
            url: URL,
            method: 'POST',
            dataType: 'json',
            data: {
                xProduct: this.state.products[0],
                yProduct: this.state.products[1]
            },
            error: (data) => {
                alert('Server error!')
            },
            success: (winner) => {

                this.setState({
                    products: this.state.products,
                    wrestling: true,
                    winner: winner
                });

                setTimeout(() => {
                    this.updateWinRecord(winner);
                }, 3000);
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
                var winner = <p style={this.styles.winner}>{this.state.winner.name} Wins!</p>;
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


export default App;

