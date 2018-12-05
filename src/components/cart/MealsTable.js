import React from 'react';
import {Link} from "react-router-dom";
import {Button, Icon, Popconfirm, Table} from "antd";
import connect from "react-redux/es/connect/connect";
import {removeMealFromCart} from "../../actions";

const MealsTable = (props) => {
    return (
        <Table
            className='cart-table'
            locale={{emptyText: <label>Nie dodałeś żadnych prosiłków</label>}}
            title={() => <h3><label>Posiłki</label></h3>}
            bordered={true}
            pagination={false}
            rowKey='id'
            columns={[{
                title: 'Nazwa', dataIndex: 'name',
                render: (text, record) => <Link to={{
                    pathname: `/meals/${record.id}`,
                    state: {meal: record}
                }}>{text}</Link>
            }, {
                title: 'Waga',
                dataIndex: 'amount',
                width: '16%',
                render: (text) => `${text} g`
            }, {
                title: '',
                dataIndex: 'id',
                width: '20%',
                render: (text) =>
                    <Popconfirm title={'Czy na pewno chcesz usunąć ten posiłek z koszyka?'}
                                placement='bottomRight' okText='Tak' cancelText='Nie'
                                icon={<Icon type='question-circle-o' style={{color: 'red'}}/>}
                                onConfirm={() => props.removeMealFromCart(text, props.currentDate)}>
                        <Button type='danger'>Usuń</Button>
                    </Popconfirm>
            }]} dataSource={props.meals} size="default"/>
    )
};

export default connect(null, {removeMealFromCart})(MealsTable)