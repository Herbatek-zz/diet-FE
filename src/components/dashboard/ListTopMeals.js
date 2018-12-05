import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Table} from "antd";

import {fetchTopMeals} from "../../actions";
import MyIcon from "../common/MyIcon";

class MealTop extends Component {

    componentDidMount() {
        this.props.fetchTopMeals();
    }

    title = () =>
        <h3>
            <label>
                <MyIcon type="icon-rank" style={{fontSize: '20px', paddingRight: '4px'}}/>
                Ranking posiłków
            </label>
        </h3>;

    render() {
        const {list, isLoading} = this.props.topMeals;
        return (
            <Table className='dashboard__table'
                   locale={{emptyText: 'Nie znaleziono najlepszych posiłków'}}
                   loading={isLoading}
                   showHeader={false}
                   title={this.title}
                   bordered={false}
                   pagination={false}
                   rowKey='id'
                   dataSource={list}
                   size='middle'
                   columns={[{
                       title: 'Nazwa', dataIndex: 'name',
                       render: (text, record, index) =>
                           <Link to={`/meals/${record.id}`} className='top-table__text'>
                               {index === 0 ?
                                   <MyIcon type="icon-rankedfirst" className='top-list__icon top-list__icon--first'/>
                                   : index === 1 ?
                                       <MyIcon type="icon-rankedfirst" className='top-list__icon top-list__icon--second'/>
                                       : index === 2 ?
                                           <MyIcon type="icon-rankedfirst" className='top-list__icon top-list__icon--third'/>
                                           : `${++index}.`}{text}
                           </Link>
                   }]}/>
        )
    }
}

const mapStateToProps = ({topMeals}) => {
    return {
        topMeals
    }
};

export default connect(mapStateToProps, {fetchTopMeals: fetchTopMeals})(MealTop);