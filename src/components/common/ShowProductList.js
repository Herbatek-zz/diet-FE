import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {List} from 'antd';

const {Item} = List;

class ShowProductList extends Component {

    render() {
        const {currentPage, totalElements, list, isLoading} = this.props;
        return (
            <List
                locale={{emptyText: 'Lista produktów jest pusta'}}
                loading={isLoading}
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: this.props.onChange,
                    total: totalElements,
                    current: currentPage + 1,
                    pageSize: 5,
                }}
                dataSource={Object.values(list)}
                renderItem={item => (
                    <Item className='listItem'
                        key={item.id}
                        extra={
                            <div className='list__image--container'>
                                <Link to={`/products/${item.id}`}>
                                    <img width={272} alt="logo" src={item.imageUrl} className='list__image'/>
                                </Link>
                            </div>}
                    >
                        <List.Item.Meta
                            title={<Link to={`/products/${item.id}`}><b>{item.name}</b></Link>}
                            description={item.description.substring(0, 256) + (item.description.length > 256 ? '...' : '')}
                        />
                        {item.content}
                    </Item>
                )}
            />
        )
    }
}

export default ShowProductList;