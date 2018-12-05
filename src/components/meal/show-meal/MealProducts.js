import React from 'react';
import {Table} from "antd";
import {Link} from "react-router-dom";

const MealProducts = ({products}) => {
    return (
        <Table
            locale={{emptyText: 'Brak produktów'}}
            title={() => <h3><label>Produkty na porcję</label></h3>}
            bordered={true}
            pagination={false}
            rowKey='id'
            columns={[{
                title: 'Nazwa', dataIndex: 'name',
                render: (text, record) => <Link to={{pathname: `/products/${record.id}`, state: {product: record}}}>{text}</Link>
            }, {
                title: 'Waga',
                dataIndex: 'amount',
                render: (text) => `${text} g`
            }
            ]} dataSource={products} size="default"/>
    )
};

export default MealProducts;