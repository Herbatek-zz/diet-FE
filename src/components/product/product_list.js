import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {List, Icon, Input} from 'antd';

import {fetchProducts, searchProducts, setMenuItem} from "../../actions";
import './product_list.css';


const IconText = ({type, text}) => (
    <span>
    <Icon type={type} style={{marginRight: 8}}/>
        {text}
  </span>
);

class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searched: false,
            value: ''
        }
    }

    componentDidMount() {
        this.props.setMenuItem('product-list');
        this.props.fetchProducts(0);
    }

    onChange = (page) => {
        this.props.fetchProducts(page - 1);
    };

    render() {
        const {currentPage, totalElements, content} = this.props.products;
        const {Search} = Input;
        const {value} = this.state;

        return (
            <div className='content'>
                <div className='content__wrap--productList'>
                    <div className='productsList__menu'>
                        <h1>Products</h1>
                        <Search
                            placeholder="Search products"
                            onSearch={value => {
                                this.props.searchProducts(value, 0);
                                this.setState({
                                    searched: true
                                });
                            }}
                            onChange={(e) => this.setState({value: e.target.value})}
                            value={value}
                            enterButton
                            size="large"
                        />
                    </div>
                    <div className='products__list'>
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: this.onChange,
                                total: totalElements,
                                current: currentPage + 1,
                                pageSize: 5,
                            }}
                            dataSource={Object.values(content)}
                            renderItem={item => (
                                <List.Item
                                    key={item.id}
                                    actions={[<IconText type="star-o" text="156"/>, <IconText type="like-o" text="156"/>,
                                        <IconText type="message" text="2"/>]}
                                    extra={
                                        <div className='list__image--container'>
                                            <img width={272} alt="logo" src={item.imageUrl} className='list__image'/>
                                        </div>}
                                >
                                    <List.Item.Meta
                                        title={<Link to={`/products/${item.id}`}>{item.name}</Link>}
                                        description={item.description}
                                    />
                                    {item.content}
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({products}) => {
    return {
        products
    }
};

export default connect(mapStateToProps, {fetchProducts, searchProducts, setMenuItem})(ProductList);