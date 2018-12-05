import React from 'react';
import {Link} from "react-router-dom";
import {Button, Icon, Popconfirm, Table} from "antd";
import connect from "react-redux/es/connect/connect";
import {removeProductFromCart} from "../../actions";

const ProductsTable = (props) => {
    return (
        <Table
            className='cart-table'
            locale={{emptyText: <label>Nie dodałeś żadnych produktów</label>}}
            title={() => <h3><label>Produkty</label></h3>}
            bordered={true}
            pagination={false}
            rowKey='id'
            columns={[{
                title: 'Nazwa',
                dataIndex: 'name',
                render: (text, record) => <Link to={{
                    pathname: `/products/${record.id}`,
                    state: {product: record}
                }}>{text}</Link>
            }, {
                title: 'Waga',
                dataIndex: 'amount',
                width: '16%',
                render: (text) => `${text} g`
            }, {
                width: '20%',
                title: '',
                dataIndex: 'id',
                render: (text) =>
                    <Popconfirm title={'Czy na pewno chcesz usunąć ten produkt z koszyka?'}
                                placement='bottomRight' okText='Tak' cancelText='Nie'
                                icon={<Icon type='question-circle-o' style={{color: 'red'}}/>}
                                onConfirm={() => props.removeProductFromCart(text, props.currentDate)}>
                        <Button type='danger'>Usuń</Button>
                    </Popconfirm>
            }]} dataSource={props.products} size="default"/>
    )
};

export default connect(null, {removeProductFromCart})(ProductsTable)