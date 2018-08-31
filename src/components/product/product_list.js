import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import {Pagination, Layout, Collapse} from 'antd';

import {fetchProducts} from "../../actions";
import Header from "../default/header";
import Footer from '../default/footer';
import './product_list.css';

const Panel = Collapse.Panel;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

class ProductList extends Component {
    componentDidMount() {
        this.props.fetchProducts();
    }

    renderProducts() {
        return _.map(this.props.products, product => {
            return (
                <Panel
                    className='collapse__item'
                    key={product.id}
                    header={
                        <div>
                            <h3>{product.name}</h3> <Link to={`/products/${product.id}`}> More</Link>
                        </div>}>
                    <p>{product.description} + {text} + {text} + {text}+ {text}</p>
                </Panel>

            );
        });
    }

    render() {
        return (
            <Layout>
                <Header navSelectedItem='product-list'/>

                <div className='content'>
                    <Collapse className='collapse'>
                        {this.renderProducts()}
                    </Collapse>,
                    <Pagination total={500}/>
                </div>

                <Footer/>
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {products: state.products};
}

export default connect(mapStateToProps, {fetchProducts})(ProductList);