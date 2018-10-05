import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {List, Icon} from 'antd';


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
                        key={item.id}
                        actions={[<IconText type="star-o" text="156"/>, <IconText type="like-o" text="156"/>,
                            <IconText type="message" text="2"/>]}
                        extra={
                            <div className='list__image--container'>
                                <img width={272} alt="logo" src={item.imageUrl} className='list__image'/>
                            </div>}
                    >
                        <List.Item.Meta
                            title={<Link to={`/meals/${item.id}`}>{item.name}</Link>}
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        )
    }
}

export default ShowMealList;