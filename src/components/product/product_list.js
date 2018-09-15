import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {List, Icon} from 'antd';

import {fetchProducts, setMenuItem} from "../../actions";
import './product_list.css';

const IconText = ({type, text}) => (
    <span>
    <Icon type={type} style={{marginRight: 8}}/>
        {text}
  </span>
);

class ProductList extends Component {
    componentDidMount() {
        this.props.setMenuItem('product-list');
        this.props.fetchProducts(0);
    }

    onChange = (page) => {
        this.props.fetchProducts(page - 1);
    };

    render() {
        const {currentPage, totalElements, content} = this.props.products;

        return (
            <div className='content'>
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
        );
    }
}

const mapStateToProps = ({products}) => {
    return {
        products
    }
};

export default connect(mapStateToProps, {fetchProducts, setMenuItem})(ProductList);