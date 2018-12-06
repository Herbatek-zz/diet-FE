import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {List} from 'antd';
import './show_list.css';

class ShowMealList extends Component {
    render() {
        const {isLoading, totalElements, currentPage, mealsList} = this.props;
        return (
            <List
                locale={{emptyText: 'Lista posiłków jest pusta'}}
                loading={isLoading}
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: this.props.onChange,
                    total: totalElements,
                    current: currentPage + 1,
                    pageSize: 5,
                }}
                dataSource={Object.values(mealsList)}
                renderItem={item => (
                    <List.Item
                        key={item.id} className='listItem'
                        extra={
                            <div className='list__image--container'>
                                <Link to={{pathname: `/meals/${item.id}`, state: {meal: item}}}>
                                    <img width={272} alt="logo" src={item.imageUrl} className='list__image'/>
                                </Link>
                            </div>}
                    >
                        <List.Item.Meta
                            title={<Link to={{pathname: `/meals/${item.id}`, state: {meal: item}}}><b>{item.name}</b></Link>}
                            description={item.description.substring(0, 256) + (item.description.length > 256 ? '...' : '')}
                        />
                        {item.content}
                    </List.Item>
                )}

            />
        )
    }
}

export default ShowMealList;
