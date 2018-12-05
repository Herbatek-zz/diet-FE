import React from 'react';
import {Table} from "antd";
import {Link} from "react-router-dom";

const AllProductsTable = (props) => {
    return (
        <Table
            className='cart-table'
            locale={{emptyText: <label>Brak produktów</label>}}
            title={() => <h3><label>Potrzebne produkty</label></h3>}
            bordered={true}
            pagination={false}
            rowKey='id'
            columns={[{
                title: <label>Nazwa</label>, dataIndex: 'name',
                render: (text, record) => <Link to={{
                    pathname: `/products/${record.id}`,
                    state: {product: record}
                }}>{text}</Link>
            }, {
                title: <label>Waga</label>,
                dataIndex: 'amount',
                width: '16%',
                render: (text) => `${text} g`
            }
            ]} dataSource={props.allProducts} size="default"/>
    )
};

export default AllProductsTable