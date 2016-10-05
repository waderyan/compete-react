import React from 'react';

class College extends React.Component {

    constructor() {
        super();
        this.styles = {
            productName: {
                fontSize: '32px'
            },
            wins: {
                fontSize: '24px'
            }
        }
        
    }

    render() {
        const product = this.props.product;

        return <div>
            <div className="row">
                <div className="col-md-12">
                    <p style={this.styles.wins}>Wins: {product.wins}</p>
                </div>
            </div>
            <div className="row">
                <div style={product.styles} className="col-md-12">
                    <img width="100%" src={product.logo} />
                </div>
            </div>
        </div>;
    }
}

export default College;