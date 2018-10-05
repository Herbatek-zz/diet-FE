import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {List} from 'antd';


class ShowProductList extends Component {

    render() {
        const {currentPage, totalElements, content} = this.props.products;

        return (
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: this.props.onChange,
                    total: totalElements,
                    current: currentPage + 1,
                    pageSize: 5,
                }}
                dataSource={Object.values(content)}
                renderItem={item => (
                    <List.Item
                        key={item.id}
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
        )
    }
}

export default ShowProductList;