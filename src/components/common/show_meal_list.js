import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {List, Icon} from 'antd';
import './show_meal_list.css';


const IconText = ({type, text}) => (
    <span>
    <Icon type={type} style={{marginRight: 8}}/>
        {text}
  </span>
);

class ShowMealList extends Component {

    render() {
        const {currentPage, totalElements, content} = this.props.meals;

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
                        key={item.id} className='listItem'
                        actions={[<IconText type="star-o" text="156"/>, <IconText type="like-o" text="156"/>,
                            <IconText type="message" text="2"/>]}
                        extra={
                            <div className='list__image--container'>
                                <Link to={`/meals/${item.id}`}>
                                    <img width={272} alt="logo" src={item.imageUrl} className='list__image'/>
                                </Link>
                            </div>}
                    >
                        <List.Item.Meta
                            title={<Link to={`/meals/${item.id}`}><b>{item.name}</b></Link>}
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